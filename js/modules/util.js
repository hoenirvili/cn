"use strict";

var util = (function () {
	
	// configurari pentru fiecare tema in parte
    var inputCfg = {
        h1: {
            ex1: {
                input: ""
            },
            ex2: {
                input: ""
            },
            ex3: {
                input: {
                    "x": {
                        type:"text",
                        name:"x"
                    },
                    "p":
                    {
                        type:"text",
                        name:"p"
                    }
                }
            },
            ex4: {
                input: {
                    Vector: {
                        type: 'textarea',
                        name: 'array',
                        placeholder:"[x,y,z]"
                    },
                    Matrice: {
                        type: 'textarea',
                        name: 'matrice',
                        placeholder:"[x,y][x,y]"
                    }
                }
            },
        },//h1
		h2: {
			ex1: {
				input: ""
			}
		}
    };
	
	// metode publice ale modulului util
    return {
        inputCfg: inputCfg
    };

})();

// exportam modulul util
module.exports = util;
