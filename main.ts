radio.onReceivedNumber(function (receivedNumber) {
    basic.showLeds(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `)
    basic.pause(100)
    strength = Math.round(Math.map(radio.receivedPacket(RadioPacketProperty.SignalStrength), -128, -42, 20, 0))
    basic.showString("" + (strength))
})
let strength = 0
radio.setGroup(1)
basic.showString("" + (input.temperature()))
basic.pause(2000)
basic.forever(function () {
    radio.sendNumber(1)
    basic.pause(5000)
})
