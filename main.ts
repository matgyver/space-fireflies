function PlaySound () {
    music.playSoundEffect(music.createSoundEffect(WaveShape.Square, 1600, 1, 255, 0, 300, SoundExpressionEffect.None, InterpolationCurve.Curve), SoundExpressionPlayMode.InBackground)
    basic.pause(50)
    music.stopAllSounds()
}
function TempBar () {
    led.plotBarGraph(
    input.temperature(),
    35
    )
}
function flash () {
    radio.sendString("flash")
    basic.showLeds(`
        . . # . .
        . # # # .
        . . # . .
        . . # . .
        . # . # .
        `)
    for (let index = 0; index < 10; index++) {
        bright += -25
        led.setBrightness(bright)
        basic.pause(40)
    }
    basic.clearScreen()
    bright = 255
    led.setBrightness(bright)
    basic.pause(blink)
}
function TempAdj () {
    blink = pins.map(
    input.temperature(),
    16,
    30,
    950,
    150
    )
}
radio.onReceivedString(function (receivedString) {
    if (receivedString == "flash") {
        if (clock < 6) {
            clock += 1
        }
    }
})
let clock = 0
let blink = 0
let bright = 0
radio.setGroup(9)
radio.setTransmitPower(7)
music.setBuiltInSpeakerEnabled(true)
music.setVolume(127)
bright = 255
TempBar()
basic.forever(function () {
    if (clock >= 6) {
        TempAdj()
        PlaySound()
        flash()
        clock = 0
    } else {
        clock += 1
    }
    serial.writeValue("Clock=", clock)
})
