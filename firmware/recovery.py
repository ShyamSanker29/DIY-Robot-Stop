# ---------------------------------------------------------------------------
# Recovery hatch: hold the recovery button while powering on to skip the app and
# land in the REPL. Use this if a bad upload leaves the board stuck in its run
# loop where MicroPico / Thonny can't interrupt it.
#
# main.py imports and calls check() before any other project import, so this
# still works even if a module below fails to import. Keep this file tiny and
# free of project imports for the same reason.
#
# Watch the USB serial console at boot -- check() ALWAYS prints a "[recovery]"
# line showing what it read. If you see nothing at all, main.py isn't running
# yet (MicroPico is holding the port, or the file wasn't uploaded).
#
# Set _RECOVERY_ACTIVE / _RECOVERY_PULL to match the button wiring:
#   button -> 3V3 (needs pull-down):  ACTIVE = 1, PULL = PULL_DOWN
#   button -> GND (needs pull-up):    ACTIVE = 0, PULL = PULL_UP
# ---------------------------------------------------------------------------
from machine import Pin as _Pin
from time import sleep_ms as _sleep_ms

_RECOVERY_PIN = 15                 # GPIO the recovery button is on (GP45 does not exist on Pico 2 W)
_RECOVERY_ACTIVE = 0               # pin level that means "pressed"
_RECOVERY_PULL = _Pin.PULL_UP      # internal pull applied while reading
_RECOVERY_WINDOW_MS = 1200         # watch for the hold this long after power-on
_RECOVERY_HOLD_FRAC = 0.6          # this fraction of samples must read "pressed"


def _recovery_requested():
    pin = _Pin(_RECOVERY_PIN, _Pin.IN, _RECOVERY_PULL)
    samples = 0
    held = 0
    waited = 0

    # Perform initial wait
    print("[recovery] will check recovery in 2s")
    _sleep_ms(2000)

    while waited < _RECOVERY_WINDOW_MS:
        samples += 1
        if pin.value() == _RECOVERY_ACTIVE:
            held += 1
        _sleep_ms(20)
        waited += 20
    print("[recovery] GP%d now=%d held %d/%d samples (need >=%d%%)"
          % (_RECOVERY_PIN, pin.value(), held, samples, int(_RECOVERY_HOLD_FRAC * 100)))
    return samples and held >= samples * _RECOVERY_HOLD_FRAC


def check():
    """Raise SystemExit (dropping to the REPL) if the recovery button is held at
    boot. Call this before any other project import."""
    if _recovery_requested():
        raise SystemExit("[recovery] button held at boot -> app skipped, REPL is available")
