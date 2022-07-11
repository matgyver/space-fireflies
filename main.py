def TempBar():
    led.plot_bar_graph(input.temperature(), 35)
def flash():
    global bright
    radio.send_string("flash")
    basic.show_leds("""
        . . # . .
                . # # # .
                . . # . .
                . . # . .
                . # . # .
    """)
    for index in range(10):
        bright += -25
        led.set_brightness(bright)
        basic.pause(40)
    basic.clear_screen()
    bright = 255
    led.set_brightness(bright)
    basic.pause(blink)
def TempAdj():
    global blink
    blink = pins.map(input.temperature(), 16, 30, 950, 150)

def on_received_string(receivedString):
    global clock
    if receivedString == "flash":
        if clock < 12:
            clock += 1
radio.on_received_string(on_received_string)

clock = 0
blink = 0
bright = 0
radio.set_group(17)
radio.set_transmit_power(7)
bright = 255
TempBar()

def on_forever():
    global clock
    if clock >= 12:
        TempAdj()
        flash()
        clock = 0
    else:
        clock += 1
    serial.write_value("Clock=", clock)
basic.forever(on_forever)
