radio.onReceivedNumber(function (receivedNumber) {
    blinkForAttention()
    signalStrength = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    approximateDistance = Math.round(Math.map(signalStrength, -128, -42, 8, 0))
    basic.showString("" + (approximateDistance))
    led.plotBarGraph(
    mappedQuality,
    128
    )
})
input.onButtonPressed(Button.A, function () {
    BTChannel = wrapValue(BTChannel - 1, 1, 255)
    basic.showString("" + (BTChannel))
})
// Forces a number between minLimit and maxLimit
// beware: only works with ranges from 0 to positive something
function wrapValue (value: number, minLimit: number, maxLimit: number) {
    if (value < minLimit) {
        return maxLimit - value
    } else if (value > maxLimit) {
        return value - maxLimit
    } else {
        return value
    }
}
input.onButtonPressed(Button.B, function () {
    BTChannel = wrapValue(BTChannel + 1, 1, 255)
    basic.showString("" + (BTChannel))
})
// just some LED flashing to draw attention to the screen before the data appears
function blinkForAttention () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
    blipSprite = game.createSprite(4, 2)
    basic.pause(50)
    for (let index = 0; index < 4; index++) {
        blipSprite.move(-1)
        basic.pause(50)
    }
    blipSprite.delete()
    basic.pause(50)
}
// Just a test for github commits
let blipSprite: game.LedSprite = null
let mappedQuality = 0
let approximateDistance = 0
let signalStrength = 0
let BTChannel = 0
BTChannel = 1
radio.setGroup(BTChannel)
basic.pause(2000)
basic.forever(function () {
    radio.sendNumber(1)
    mappedQuality = Math.map(signalStrength, -42, -128, 0, 128)
    basic.pause(5000)
})
