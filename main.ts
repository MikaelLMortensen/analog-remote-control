let directionForward = true
let direction = 0
let speed = 0

radio.setGroup(20)
basic.showIcon(IconNames.Tortoise)

input.onButtonPressed(Button.AB, function () {
})

input.onButtonPressed(Button.A, function () {
    directionForward = !directionForward
    sendSpeed()
    showSpeedInfo()
})

input.onButtonPressed(Button.B, function () {
    radio.sendValue("beep", 1)
})

function sendSpeed() {
    radio.sendValue("sp", speed)
}

function sendDirection() {
    // Lige ud = 50
    radio.sendValue("dir", direction)
    showSpeedInfo()
}

function showSpeedInfo(){
    if (voltageSpeed < 5) {
        basic.clearScreen()
        return
    }
    if (directionForward) {
        if (direction < 15) {
            basic.showArrow(ArrowNames.SouthWest)
        } else if (direction >= 15 && direction < 30) {
            basic.showArrow(ArrowNames.West)
        } else if (direction >= 30 && direction < 45) {
            basic.showArrow(ArrowNames.NorthWest)
        } else if (direction >= 45 && direction < 55) {
            basic.showArrow(ArrowNames.North)
        } else if (direction >= 55 && direction < 70) {
            basic.showArrow(ArrowNames.NorthEast)
        } else if (direction >= 70 && direction < 85) {
            basic.showArrow(ArrowNames.East)
        } else if (direction >= 85) {
            basic.showArrow(ArrowNames.SouthEast)
        }
    } else {
        if (direction < 15) {
            basic.showArrow(ArrowNames.NorthEast)
        } else if (direction >= 15 && direction < 30) {
            basic.showArrow(ArrowNames.East)
        } else if (direction >= 30 && direction < 45) {
            basic.showArrow(ArrowNames.SouthEast)
        } else if (direction >= 45 && direction < 55) {
            basic.showArrow(ArrowNames.South)
        } else if (direction >= 55 && direction < 70) {
            basic.showArrow(ArrowNames.SouthWest)
        } else if (direction >= 70 && direction < 85) {
            basic.showArrow(ArrowNames.West)
        } else if (direction >= 85) {
            basic.showArrow(ArrowNames.NorthWest)
        }
    }


}

let voltageSpeed = 0
let voltageDirection = 0

basic.forever(function () {
    let oldVoltageSpeed = 0
    let oldVoltageDirection = 0

	voltageSpeed = pins.analogReadPin(AnalogPin.P2)
    voltageDirection = pins.analogReadPin(AnalogPin.P1)
    if (voltageDirection != oldVoltageSpeed) {
        oldVoltageSpeed = voltageDirection
        speed = 0
        if (voltageSpeed > 5) {
            // convert voltage to percent 1023 => 100
            speed = Math.floor(voltageSpeed / 10.2)
            // reverse is negative
            if (!directionForward){
                speed = speed * -1
            }
        }
        sendSpeed()
    } 
    if (voltageDirection != oldVoltageDirection) {
        oldVoltageDirection = voltageSpeed
        direction = Math.floor(voltageDirection / (10.2))
        sendDirection()
    }
    basic.pause(100)
})