# Recovery hatch: hold the recovery button while powering on to skip the app and
# land in the REPL. Must be first calls
import recovery
recovery.check()

from time import sleep_ms
import gc
import sys
import machine
from estop import EStop, Button
from http_server import EStopHTTPServer
from hal import EStopHal
from network_ap import AccessPoint
from machine import Pin, I2C

# ==============================================================================
# CONSTANTS
# ==============================================================================
# It is encouraged to configure the following values for your hardware system.
# The following assume a Raspberry Pi Pico 2 W (RP2350A, GP0-GP28 exposed;
# GP23/24/25/29 are used internally by the CYW43 radio and must not be used),
# a relay, and an SH1106-based 128x64 I2C OLED display.
#
# Pin assignments (Pico 2 W physical pin in brackets):
#   GP4  (pin 6)  I2C0 SDA -> OLED SDA        GP27 (pin 32) <- switch_1
#   GP5  (pin 7)  I2C0 SCL -> OLED SCL        GP26 (pin 31) <- switch_2
#   GP3  (pin 5)  relay_out                   GP22 (pin 29) <- switch_3
#   GP15 (pin 20) recovery button (see recovery.py)
#   3V3 (pin 36) / GND -> OLED power
#
# To change button counts, set NUM_ESTOP_SWITCHES below (2 or 3).
#
# Pico 2 W...https://www.raspberrypi.com/products/raspberry-pi-pico-2/
# Display....any 1.3" SH1106 128x64 I2C module (default address 0x3C)
# ==============================================================================

# Relay is active-high
PIN_RELAY_OUT = 3

# E-stop switch inputs. Two supported wiring variants:
#   3 switches -> GP27, GP26, GP22
#   2 switches -> GP27, GP26
# Select the variant with NUM_ESTOP_SWITCHES.
NUM_ESTOP_SWITCHES = 3
ESTOP_SWITCH_PINS = {
    3: (27, 26, 22),
    2: (27, 26),
}

# Display I2C
# GP4/GP5 are I2C0 SDA/SCL on the Pico 2 W (physical pins 6 and 7).
# The SH1106 driver sends the frame one 128-byte page at a time, so 100kHz
# would also work; 400kHz keeps the ~1 s display refresh short. The explicit
# timeout adds headroom over the RP2350 I2C default of 50ms. If you see
# corruption on a long cable, drop freq to 100000.
DISPLAY_I2C = I2C(0, scl=Pin(5), sda=Pin(4), freq=400000, timeout=200000)

# I2C address of the SH1106. Nearly all 1.3" SH1106 modules ship at 0x3C
# (a few are strapped to 0x3D). Run DISPLAY_I2C.scan() to confirm.
DISPLAY_ADDR = 0x3C

# Set True if the text appears upside down for your module's mounting.
DISPLAY_FLIP = False

# Wi-Fi access point the device hosts. Clients connect straight to this network
# and reach the web server at http://<AP IP> (shown on the display).
# AP_PASSWORD must be 8+ chars for WPA2; leave "" for an open network.
AP_SSID = "obs-stop"
AP_PASSWORD = "some_ap_pw_here"

# ==============================================================================
# SRC
# ==============================================================================

def build_button_map(num_switches: int) -> dict:
    """Return the Button -> Pin mapping for the selected switch-count variant."""
    if num_switches not in ESTOP_SWITCH_PINS:
        raise ValueError("NUM_ESTOP_SWITCHES must be one of %s, got %d"
                         % (sorted(ESTOP_SWITCH_PINS), num_switches))
    return {
        Button(i + 1): Pin(gpio, Pin.IN, Pin.PULL_UP)
        for i, gpio in enumerate(ESTOP_SWITCH_PINS[num_switches])
    }


def print_pinout(num_switches: int):
    """Log the GPIO assignments in use so the wiring can be checked from the console."""
    print("[pinout] Raspberry Pi Pico 2 W - %d e-stop switch variant" % num_switches)
    for i, gpio in enumerate(ESTOP_SWITCH_PINS[num_switches]):
        print("[pinout]   switch_%d  -> GP%d (input, pull-up, HIGH = pressed)" % (i + 1, gpio))
    print("[pinout]   relay_out -> GP%d (output, active-high)" % PIN_RELAY_OUT)
    print("[pinout]   OLED SDA  -> GP4 (I2C0), OLED SCL -> GP5 (I2C0), addr 0x%02X" % DISPLAY_ADDR)
    print("[pinout]   OLED VCC  -> 3V3 (pin 36), OLED GND -> GND")
    print("[pinout]   recovery  -> GP%d (hold at boot for REPL)" % recovery._RECOVERY_PIN)


def main():
    # First, construct the HAL with a mapping of buttons to pins. Change
    # NUM_ESTOP_SWITCHES to pick the 2- or 3-switch wiring variant.
    print_pinout(NUM_ESTOP_SWITCHES)
    button_map = build_button_map(NUM_ESTOP_SWITCHES)
    # Bring up the access point first so the display and web server have a
    # network to report. ap.ip is the address clients browse to.
    ap = AccessPoint(AP_SSID, AP_PASSWORD)
    ap.start()

    hal = EStopHal(button_map, PIN_RELAY_OUT, DISPLAY_I2C, display_addr=DISPLAY_ADDR,
                   display_flip=DISPLAY_FLIP, net_ssid=ap.ssid, net_ip=ap.ip)

    # Pass in the HAL and configure the display update rate
    estop = EStop(hal, 1000)

    # Show the SSID / address immediately rather than waiting for the first
    # display interval.
    hal.write_display(estop.get_state())

    # Calling this constructor will attempt to create the socket and bind to it.
    http_server = EStopHTTPServer()

    loop_count = 0
    while True:
        # Get button states
        buttons = hal.get_button_states()

        estop.update(buttons)
        # Non-blocking: accepts any pending connections, pushes the current
        # state to the SSE stream(s), and returns. Only a static-file transfer
        # (index.html / css / js, loaded once per session) still blocks the
        # loop for the length of that transfer -- move poll_data() onto core 1
        # with _thread and hand it a snapshot of estop.get_state() if that
        # latency ever matters.
        http_server.poll_data(estop.get_state())

        # Keep GC pauses small and predictable (~1 s cadence) instead of letting
        # a full collection fire mid-request and stall the loop.
        loop_count += 1
        if loop_count % 50 == 0:
            gc.collect()

        # Fast loop so button -> relay latency stays low between requests.
        sleep_ms(20)


def run_supervised():
    """Run main(), and if it raises, log the traceback and reboot so a transient
    fault (I2C glitch, Wi-Fi hiccup) self-heals instead of leaving the device
    dead. Ctrl-C / a stop from the IDE falls through to the REPL instead."""
    try:
        main()
    except KeyboardInterrupt:
        raise
    except Exception as exc:
        sys.print_exception(exc)
        # Give a connected console a few seconds to catch the traceback.
        sleep_ms(5000)
        machine.reset()


if __name__ == "__main__":
    run_supervised()