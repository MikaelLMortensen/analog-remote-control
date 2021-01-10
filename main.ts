/*
    lf : Left Forward - Boolean
    rf : Right Forward - Boolean
    lf : Left Speed (0 - 1023)
    rf : Right Speed (0 - 1023)
*/
let speedStruct = { lf : true, rf:true, ls:0, rs:0 }
radio.setGroup(20)

input.onButtonPressed(Button.AB, function () {
    speedStruct.lf = true
    speedStruct.rf = true
    sendSpeedInfo()
})

input.onButtonPressed(Button.A, function () {
    speedStruct.lf = !speedStruct.lf
    sendSpeedInfo()
})

input.onButtonPressed(Button.B, function () {
    speedStruct.rf = !speedStruct.rf
    sendSpeedInfo()
})

function sendSpeedInfo() {
    let json = JSON.stringify(speedStruct)
    radio.sendString(json)
    showSpeedInfo()
}

function showSpeedInfo(){

    if (speedStruct.lf && speedStruct.rf) {
        basic.plotLeds(`
        . # . # .
        # # # # #
        . . . . .
        . . . . .
        . . . . .
        `) 
    } else if (!speedStruct.lf && !speedStruct.rf) {
        basic.plotLeds(`
        . . . . .
        . . . . .
        . . . . .
        # # # # #
        . # . # .
        `) 
    } else if (speedStruct.lf && !speedStruct.rf) {
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
    let changed = false
    let oldVoltageP1 = 0
    let oldVoltageP2 = 0

	let voltageP1 = pins.analogReadPin(AnalogPin.P1)
    let voltageP2 = pins.analogReadPin(AnalogPin.P2)
    if (voltageP1 != oldVoltageP1) {
        changed = true
    } else if (voltageP2 != oldVoltageP2) {
        changed = true
    }

    if (changed) {
        sendSpeedInfo()        
    }
})