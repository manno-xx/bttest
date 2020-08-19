radio.onReceivedNumber(function (receivedNumber) {
    blinkForAttention()
    signalStrength = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    approximateDistance = Math.round(Math.map(signalStrength, -128, -42, 8, 0))
    basic.showString("" + (approximateDistance))
})
input.onButtonPressed(Button.A, function () {
    BTChannel = BTChannel + 1
    BTChannel = BTChannel % 255
    basic.showString("" + (BTChannel))
})
input.onButtonPressed(Button.B, function () {
    BTChannel = BTChannel - 1
    BTChannel = BTChannel % 255
    basic.showString("" + (BTChannel))
})
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
let blipSprite: game.LedSprite = null
let approximateDistance = 0
let signalStrength = 0
let BTChannel = 0
BTChannel = 1
radio.setGroup(BTChannel)
basic.pause(2000)
basic.forever(function () {
    radio.sendNumber(1)
    basic.pause(5000)
})
