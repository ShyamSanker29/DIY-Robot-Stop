from estop_common import StopState, Button
from machine import Pin, I2C
import sh1106


class DisplayDriver:
    """Simple driver for the SH1106 based display using micropython libs. Mainly
    to get device-specific code out of the hal class for cleanliness."""
    def __init__(self, i2c: I2C, width: int, height: int, addr: int = 0x3C,
                 flip: bool = False):
        # No hardware reset line is wired on the I2C modules, so res=None.
        self._display = sh1106.SH1106_I2C(width, height, i2c, res=None, addr=addr)
        self._display.sleep(False)
        # SH1106 modules differ in mounting orientation; flip if text is upside down.
        self._display.rotate(flip, update=False)

    def clear(self):
        self._display.fill(0)
        self._display.show()

    def lines(self, lines: list[str]):
        self._display.fill(0)
        for i, line in enumerate(lines):
            self._display.text(line, 0, i * 10)
        self._display.show()


class EStopHal:
    """Where hardware implementations live. Edit this class to modify hardware-specific behavior."""
    def __init__(self, button_map: dict[Button, Pin], relay_pin: int, display_i2c: I2C,
                 display_addr: int = 0x3C, display_flip: bool = False,
                 net_ssid: str = "", net_ip: str = ""):
        # You can change the number of buttons by adding/removing pins from this
        # list.
        self._button_pins = button_map
        self._relay_pin = Pin(relay_pin, Pin.OUT)
        self._display_driver = DisplayDriver(display_i2c, 128, 64, addr=display_addr,
                                             flip=display_flip)
        # Network info shown on every display refresh. Set these after bringing
        # up the access point (see main.py).
        self._net_ssid = net_ssid
        self._net_ip = net_ip

    def set_network_info(self, ssid: str, ip: str):
        self._net_ssid = ssid
        self._net_ip = ip

    def _net_lines(self) -> list[str]:
        # The panel is ~16 chars wide at the default 8x8 font; keep these short.
        lines = []
        if self._net_ssid:
            lines.append(f"AP:{self._net_ssid}"[:16])
        if self._net_ip:
            lines.append(f"Adr:{self._net_ip[:16]}")
        return lines

    def write_display(self, stop_state: StopState):
        display_lines = self._net_lines()
        display_lines.append("STOPPED" if stop_state.stopped else "RUNNING")
        if stop_state.stopped:
            stopped_text = ",".join(str(button_id) for button_id in stop_state.stopped_ids)
            display_lines.append(f"BTNS:{stopped_text}"[:16])

        self._display_driver.lines(display_lines)

    def get_button_states(self) -> list[Button]:
        button_states = []
        for button, pin in self._button_pins.items():
            button.pressed = pin.value() == 1
            button_states.append(button)
        return button_states

    def write_relay(self, stop_state: StopState):
        # Prerequisites: the caller has initialized the relay pin
        self._relay_pin.value(0 if stop_state.stopped else 1)

    def write_bytes_to_websockets(self, data: bytes):
        # Prerequisites: the caller has knowledge of all current WS clients and can send data to them
        # TODO: Write the provided bytes to all connected clients
        pass