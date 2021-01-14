let directionForward = true // Direction Flag, true = forward / false = reverse
let heading = 0           // heading value, range: -100 - 100. 
                            // Negative values mean turn left
                            // Positive values mean turn right
let speed = 0               // Speed value, range 0 - 100

radio.setGroup(20)
basic.showArrow(ArrowNames.North)

input.onButtonPressed(Button.AB, function () {
})

input.onButtonPressed(Button.A, function () {
    directionForward = !directionForward
    sendSpeed()
    if (directionForward){
        radio.sendValue("fw", 1)
        basic.showArrow(ArrowNames.North)
    } else {
        radio.sendValue("fw", 0)
        basic.showArrow(ArrowNames.South)
    }
})

input.onButtonPressed(Button.B, function () {
    radio.sendValue("info", 1)
})

function sendSpeed() {
    radio.sendValue("sp", speed)
}

function sendHeading() {
    // Lige ud = 0
    // Venstre = -100
    // Højre = 100
    radio.sendValue("hd", heading)
}

let voltageSpeed = 0      // Analog input value,    range: 0-1023
let voltageHeading = 0    // Analog direction value,  range: 0-1023

basic.forever(function () {
    let oldVoltageSpeed = 0
    let oldVoltageHeading = 0
    let oldSpeed = 0
    let oldHeading = 0

	voltageSpeed = pins.analogReadPin(AnalogPin.P2)
    // Has speed input changed since last run
    if (voltageSpeed != oldVoltageSpeed) {
        oldVoltageSpeed = voltageSpeed
        speed = 0
        // calculate speed (0 - 100)
        if (voltageSpeed > 5) {
            // convert voltage to percent 1023 => 100
            speed = Math.floor(voltageSpeed / 10.2)
        }
        // if speed has changed we send it
        if (speed != oldSpeed) {
            oldSpeed = speed
            sendSpeed()
        }
    } 
    voltageHeading = pins.analogReadPin(AnalogPin.P1)
    // Has heading input changed since last run
    if (voltageHeading != oldVoltageHeading) {
        oldVoltageHeading = voltageHeading
        heading = Math.floor(voltageHeading / (5.1)) - 100 // Range: -100 => 100
        sendHeading()
    }
    basic.pause(100)
})