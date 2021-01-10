let leftForward = true
let rightForward = true
let voltageLeft = 0
let voltageRight = 0

radio.setGroup(20)
basic.showIcon(IconNames.Tortoise)

input.onButtonPressed(Button.AB, function () {
    leftForward = true
    rightForward = true
    sendLeftSpeed()
    sendRightSpeed()
    showSpeedInfo()
})

input.onButtonPressed(Button.A, function () {
    leftForward = !leftForward
    sendLeftSpeed()
    showSpeedInfo()
})

input.onButtonPressed(Button.B, function () {
    rightForward = !rightForward
    sendRightSpeed()
    showSpeedInfo()
})

function sendLeftSpeed() {
    let speed = 0
    if (voltageLeft > 5) {
        // convert voltage to percent 1023 => 100
        speed = Math.floor(voltageLeft / 10.2)
        // reverse is negative
        if (!leftForward){
            speed = speed * -1
        }
    }
    radio.sendValue("ls", speed)
}

function sendRightSpeed() {
    let speed = 0
    if (voltageRight > 5) {
        // convert voltage to percent 1023 => 100
        speed = Math.floor(voltageRight / 10.2)
        // reverse is negative
        if (!rightForward) {
            speed = speed * -1
        }
    }
    radio.sendValue("rs", speed)
}

function showSpeedInfo(){
    if (voltageLeft < 5 && voltageRight < 5) {
        basic.clearScreen()
        return
    }
    if (leftForward && rightForward) {
        basic.plotLeds(`
        . # . # .
        # # # # #
        . . . . .
        . . . . .
        . . . . .
        `) 
    } else if (!leftForward && !rightForward) {
        basic.plotLeds(`
        . . . . .
        . . . . .
        . . . . .
        # # # # #
        . # . # .
        `) 
    } else if (leftForward && !rightForward) {
        basic.plotLeds(`
        . # . . .
        # # # . .
        . . . . .
        . . # # #
        . . . # .
        `) 
    } else {
        basic.plotLeds(`
        . . . # .
        . . # # #
        . . . . .
        # # # . .
        . # . . .
        `) 
    }
}

basic.forever(function () {
    let oldVoltageLeft = 0
    let oldVoltageRight = 0

	voltageLeft = pins.analogReadPin(AnalogPin.P1)
    voltageRight = pins.analogReadPin(AnalogPin.P2)
    if (voltageLeft != oldVoltageLeft) {
        sendLeftSpeed()
        oldVoltageLeft = voltageLeft
    } 
    if (voltageRight != oldVoltageRight) {
        sendRightSpeed()
        oldVoltageRight = voltageRight
    }
    showSpeedInfo()
    basic.pause(200)
})