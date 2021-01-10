/*
    lf : Left Forward - Boolean
    rf : Right Forward - Boolean
    lf : Left Speed (0 - 1023)
    rf : Right Speed (0 - 1023)
*/
let speedStruct = { lf : true, rf:true, ls:0, rs:0 }
radio.setGroup(20)

input.onButtonPressed(Button.AB, function () {
    radio.sendValue("lf", 1)
    radio.sendValue("rf", 1)
    showSpeedInfo()
})

input.onButtonPressed(Button.A, function () {
    speedStruct.lf = !speedStruct.lf
    if (speedStruct.lf) {
        radio.sendValue("lf", 1)
    } else {
        radio.sendValue("lf", 0)
    }
    showSpeedInfo()
})

input.onButtonPressed(Button.B, function () {
    speedStruct.rf = !speedStruct.rf
    if (speedStruct.rf) {
        radio.sendValue("rf", 1)
    } else {
        radio.sendValue("rf", 0)
    }
    showSpeedInfo()
})

function showSpeedInfo(){
    if (speedStruct.ls < 5 && speedStruct.rs < 5) {
        basic.clearScreen()
        return
    }
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
    let oldVoltageP1 = 0
    let oldVoltageP2 = 0

	let voltageP1 = pins.analogReadPin(AnalogPin.P1)
    let voltageP2 = pins.analogReadPin(AnalogPin.P2)
    if (voltageP1 != oldVoltageP1) {
        radio.sendValue("ls", voltageP1)
        oldVoltageP1 = voltageP1
    } 
    if (voltageP2 != oldVoltageP2) {
        radio.sendValue("rs", voltageP2)
        oldVoltageP2 = voltageP2
    }
})