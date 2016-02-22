"use strict";
var util = (function () {

    var inputCfg = {
        h1: {
            ex1: {
                input: ""
            },
            ex2: {
                input: ""
            },
            ex3: {
                input: ""
            },
            ex4: {
                input: {
                    Input: {
                        type: 'textarea',
                        name: 'input',
                    }
                }
            },
        }
    };
    var randomArrayInputOutput = function (n) {
        var array = [];
        var i;
        for (i = 0; i < n; i++) {
            array.push(randomGenInt(15, 200));
        }
        return array;

    };
    // returneaza un numar Int arbitrar din intervaulul [min,max];
    var randomGenInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // returneaza un numar flaot arbitrar din intervaulul [min,max];
    var randomGenFloat = function (min, max) {
        return Math.random() * (max - min) + min;
    };

    return {
        RandomArray: randomArrayInputOutput,
        RandomGenInt: randomGenInt,
        RandomGenFloat: randomGenFloat,
        inputCfg: inputCfg
    };
})();

module.exports = util;