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
				input: {
					"n": {
						type:"text",
						name:"n"
					},
					"epsilon": {
						type:"text",
						name:"epsilon"
					},
					"s": {
						type: 'textarea',
						name: 'array',
						placeholder: "[x,y,z]"
					},
					"matrice patratica":{
						type: 'textarea',
						name: 'matrice',
						placeholder: "[x,y][x,y]"
					},
				}
			},
            ex2: {
                input: {
                    "A":{
                        type: 'textarea',
                        name: 'matrice',
                        placeholder: "[4,2,2]\n[2,4,2]\n[2,2,4]"
                    },
                    "epsilon": {
                        type:"text",
                        name:"epsilon",
                        placeholder: "10 to (-) what power?"
                    },
                }
            },
            ex3: {
                input: {
                    "A":{
                        type: 'textarea',
                        name: 'matrice',
                        placeholder: "[4,2,2]\n[2,4,2]\n[2,2,4]",
                    },
                    "epsilon": {
                        type:"text",
                        name:"epsilon",
                        placeholder: "10 to (-) what power?"
                    },
                }
            },
            ex4: {
                input: {
                    "A":{
                        type: 'textarea',
                        name: 'matrice',
                        placeholder: "[4,2,2]\n[2,4,2]\n[2,2,4]",
                    },
                    "epsilon": {
                        type:"text",
                        name:"epsilon",
                        placeholder: "10 to (-) what power?"
                    },
                }
            }
		},
		h3: {
			ex1:{
				input:{
					"n": {
						type:"text",
						name:"n"
					},
					"A":{
						type:'textarea',
						name: 'matrice',
						placeholder: "[4,2,2]\n[2,4,2]\n[2,2,4]",
					},
					"epsilon":{
						type:"text",
						name:"epsilon",
						placeholder: "10 to (-) what power?"
					}
				}
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
