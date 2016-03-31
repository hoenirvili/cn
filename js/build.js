(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
// all includes
var d = require('./dom.js');

// app start 
// self invoking function
(function(dom) {
	// init dom
	dom.Init();
})(d);

},{"./dom.js":3}],2:[function(require,module,exports){
"use strict";
var h1 = require('./homework1.js');
var h2 = require('./homework2.js');
var h3 = require("./homework3.js");
var h4 = require("./homework4.js");

// here we import all our homeworks modules
var controller = (function (h1, h2, h3, h4) {
	var fn = function(nH, nX, template){
		switch(nH) {
			// tema 1
			case '1':
				switch(nX) {
					case '1':
						h1.Ex1();
						break;
					case '2':
						h1.Ex2();
						break;
					case '3':
						h1.Ex3();
						break;
					case '4':
						h1.Ex4();
						break;
				}
				break;
			// tema 2
			case '2':
				switch (nX) {
					case '1':
						h2.Ex1();
						break;
					case '2':
						h2.Ex2();
						break;
					case '3':
						h2.Ex3();
						break;
					case '4':
                        h2.Ex4();
						break;
				}
				break;
			// tema 3
			case '3':
				switch(nX) {
					case '1':
						h3.Ex1();
						break;
					case '2':
						h3.Ex2();
						break;
					case '3':
					template.messages.orange("This homework is not implemented yet");
					break;
				}
			break;
			// tema 4
			case '4':
				switch(nX) {
					case '1':
						h4.Ex1();
						break;
                    case '2':
                        h4.Ex2();
                        break;
                    case '3':
                        h4.Ex3();
                        break;

				}
			break;
			// tema 5
			case '5':
				template.messages.orange("This homework is not implemented yet");
				break;
			case '6':
				template.messages.orange("This homework is not implemented yet");
				break;
			case '7':
				template.messages.orange("This homework is not implemented yet");
				break;
			case '8':
				template.messages.orange("This homework is not implemented yet");
				break;
		}
	};

	//exportam toate functiile, obiectele publice
	return {
		fn : fn
	};

})(h1,h2,h3, h4);

module.exports = controller;

},{"./homework1.js":4,"./homework2.js":5,"./homework3.js":6,"./homework4.js":7}],3:[function(require,module,exports){
"use strict";

// Toate modulele care le vom importa in modulul dom
var ctrl 	= require('./controller.js');
var tplate 	= require('./template.js');
var utils 	= require('./util.js');

var dom = (function ($, controller, template, utils) {
	// variabile globale ale modulului
	var submitButton, 			// butonul de submit
		numberHomework, 		// numarul temei
		numberExercise, 		// numarul exercitiului
		$input = $('#input'); 	// inputul <div class="input"></div>


	// Init function care va fi singura functie exportat de modulul.
	// Initializarea modulului, pregatirea butonului de compile/submit +
	// atasarea de eventuri.
	var Init = function () {
		submitButton = ($('#button-submit').length) ? $('#button-submit') : false;
		var $homeworkSelect = ($('#numberHomework').length) ? $('#numberHomework') : false;
		var $exerciseSelect = ($('#numberExercise').length) ? $('#numberExercise') : false;
		// when document is fully loaded
		$(document).ready(function () {
			// if button exists
			if (submitButton)
				// adauga event la click, executand callbackul la onSubmit
				$(submitButton).on("click", onSubmit);
			
			if ($homeworkSelect)
				$homeworkSelect.on('change', selectChange);

			if ($exerciseSelect)
				$exerciseSelect.on('change', selectChange);
			});
	};//init

    var selectChange = function () {
		var inputs, // tempalte pentru input in functie de tema
			key, // index pentru atribute din util.inputCfg
			inp, // container pentru obiecte din util.inputCfg
            value,// predefined value
			placeholder; // stocheaza atributul placeholder din util.inputCfg

		// adaugam valorile corespunzatoare
		numberHomework = $('#numberHomework').val();
		numberExercise = $('#numberExercise').val();
		// in prima faza un html gol
		$input.html("");
		// primeste configul din modulul util.
		// fiecare config e diferit pentru fiecare exercitiu in parte
		inputs = utils.inputCfg['h' + numberHomework]['ex' + numberExercise]['input'];
		// testeaza daca trebuie adaugat un cam nou.
		if (inputs) {
			for (key in inputs) {
				// stocheaza atributele x, p din obiectul input:{}
				inp = inputs[key];
				// stocheaza trageturile din atributul placeholder
				if (inp['placeholder'])
					placeholder = " placeholder='" + inp['placeholder'] + "' ";
				else
					placeholder = "";

                if (inp['value'])
                    value = inp['value'];
                else
                    value = "";

				// daca containerul e de tip text
				if (inp['type'] === 'text')
					// introdu in html
					$input.append(
						'<label>' + key + '</label>'+
						'<input value="'+value+'" '+ placeholder + ' class="form-control" name="' + inp['name'] + '" type="' + inp['type'] + '"/>'
					);
				// daca containerul e de tip textarea
				if (inp['type'] === 'textarea')
					// introdu in html
					$input.append(
					 '<label>' + key + '</label><textarea '+placeholder+
					' class="form-control" name="' + inp['name'] + '">'+value+'</textarea>'
					);
			}// for
		}// if
	};// function

	// cand s-a dat click pe buttonul de submit
	var onSubmit = function () {
		if ($('.table-container').length)
			$('.table-container').remove();
			// stoccheaza doar variabilele
		numberHomework = $('#numberHomework').val();
		numberExercise = $('#numberExercise').val();
		// daca sunt valori 
		if (numberExercise && numberHomework) {
			// executa controllerul
			controller.fn(numberHomework, numberExercise, template);
		} else {
			// afiseaza un mesaj corespunzator
			template.messages.orange("Please set exercise number and homework");
		}
    };

	return {
		Init: Init
	};
	
// importa toate modulele de sus de care am dat require
})(jQuery, ctrl, tplate, utils);

// exportam modulul dom
module.exports = dom;

},{"./controller.js":2,"./template.js":8,"./util.js":9}],4:[function(require,module,exports){
"use strict";

var templateSystem 	= require('./template.js');

var homework1 = (function (template, $) {
    // exercitiu 1
    var ex1 = function () {
        $.ajax({
			type: "POST",
			url: 'ajax/ajax.php',
			dataType: "json",
			data: {
				action: 'ex1',
				homework: 1
			},
            success: function (data) {
				console.log("===========  Homework1 - Ex1 ================");
				console.log("Cel mai mic numar pozitiv\t= ", data['lowest']);
				console.log("Numarul de pasi\t\t\t= ", data['step']);
				console.log("=============================================");
				template.messages.green("Successfull compiled");
				template.messages.green("Check console and bottom page");
				template.tables.base();
				template.tables.content(
                    ["Cel mai mic numar pozitiv", "Numarul de pasi"],
                    [data['lowest'], data['step']]);
            }
        });


    };
	// exercitiu 2
    var ex2 = function () {

        $.ajax({
			type: "POST",
			url: 'ajax/ajax.php',
			dataType: "json",
			data: {
				action: 'ex2',
				homework: 1
			},
            success: function (data) {
				console.log("===========  Homework1 - Ex2 ================");
				console.log("Numarul de pasi\t = ", data['step']);
				console.log("Operand stanga\t = ", data['leftOperand']);
				console.log("Operand dreapta\t =", data['rightOperand']);
				console.log("a\t\t = ", data['a']);
				console.log("b\t\t = ", data['c']);
				console.log("c\t\t = ", data['c']);
				console.log("=============================================");
				template.messages.green("Successfull compiled");
				template.messages.green("Check console and bottom page");
                template.tables.base();
                template.tables.content(
                    ["Suma operand stanga", "Suma operand dreapta", "Numarul de pasi", "a", "b", "c"],
                    [data['leftOperand'], data['rightOperand'], data['step'], data['a'], data['b'], data['c']]);
            }
        });

    };

    //exercitiu 3
    var ex3 = function () {

        $.ajax({
            type: "POST",
            url: 'ajax/ajax.php',
            dataType: "json",
            data: {
				action: 'ex3',
				homework: 1,
				x: $('input[name="x"]').val(),
				p: $('input[name="p"]').val()
			},
            success: function (data) {
				console.log("===========  Homework1 - Ex3 ================");
				console.log("Tan Lentz computed\t = ", data['aprox']);
				console.log("Tan computed\t\t = ", data['tan']);
				console.log("pi\t\t\t = ", data['pi']);
				console.log("e\t\t\t = ", data['e']);
				console.log("x\t\t\t = ", data['x']);
				console.log("=============================================");
				template.messages.green("Successfull compiled");
				template.messages.green("Check console and bottom page");
				template.tables.base();
				template.tables.content(
                    ["Tangenta Lentz", "Tangenta php", "pi", "e", "x"],
                    [data['aprox'], data['tan'], data['pi'], data['e'], data['x']]);
            }
        });
    };
	// exercitiu 4
    var ex4 = function () {

        $.ajax({
            type: "POST",
            url: 'ajax/ajax.php',
            dataType: "json",
            data: {
                action: 'ex4',
                homework: 1,
                arr: $('textarea[name="array"]').val(),
                matrice: $('textarea[name="matrice"]').val()
            },
            success: function (data) {
				console.log("===========  Homework1 - Ex4 ================");
				console.log("Vector\t\t = ", data['vector']);
				console.log("Matrice\t\t = ", data['matrice']);
				console.log("Vector Fisier\t = ", data['vectorf']);
				console.log("Matrice Fisier\t = ", data['matricef']);
				console.log("Vector Random\t = ", data['vectorr']);
				console.log("Matrice Random\t = ", data['matricer']);
				console.log("=============================================");
				template.messages.green("Successfull compiled");
				template.messages.green("Check console and bottom page");
                template.tables.base();
                template.tables.content(
                    ["Vector", "Matrice", "Vector Fisier", "Matrice Fisier", "Vector Random", "Matrice Random"],
					[data['vector'], data['matrice'], data['vectorf'], data['matricef'], data['vectorr'], data['matricer']]
                );
            }
        });

    };


    // exportam toate functiile publice
    return {
        Ex1: ex1,
        Ex2: ex2,
        Ex3: ex3,
        Ex4: ex4
    };
// importam modulele folosite in modulul homework1
})(templateSystem, jQuery);

// exportam modulul homework1
module.exports = homework1;

},{"./template.js":8}],5:[function(require,module,exports){
"use strict";
if (!window.cfg) {
    window.cfg = {};
}

var templateSystem = require('./template.js');

var homework2 = (function(template, $) {
	var ex1 = function() {
		// trimite un POST request
		// body-ul va contine data serializata
		// json cu numarul execitiului si numarul temei
		$.ajax({
			type: 'POST',
			url: 'ajax/ajax.php',
			dataType: 'json',
			data: {
				action:		'ex1',
				homework:	2,
				n:			$('input[name="n"]').val(),
				epsilon:	$('input[name="epsilon"]').val(),
				arr:		$('textarea[name="array"]').val(),
				matrice:	$('textarea[name="matrice"]').val()
			},
			// procesam aici raspunsul
			success: function(data) {
				console.log("===========  Homework2 - Ex1 ================");
				console.log("Dimensiunea sistemului \t= ", data['n']);
				console.log("Precizia \t\t\t= ", data['epsilon']);
				console.log("matricea \t\t= ", data['A']);
				console.log("vectorul s \t\t= ", data['s']);
				console.log("vectorul b\t\t= ",data['b']);
				console.log("=============================================");
				template.messages.green("Successfull compiled");
				template.messages.green("Check console and bottom page");
				template.tables.base();
				template.tables.content(
					["Dimensiunea sistemului", "Precizia","Matricea","Vectorul S","Vectorul B"],
					[data['n'], data['epsilon'],data['A'], data['s'], data['b']]);
			}
		});
	};

	var ex2 = function() {
// trimite un POST request
        // body-ul va contine data serializata
        // json cu numarul execitiului si numarul temei
        $.ajax({
            type: 'POST',
            url: 'ajax/ajax.php',
            dataType: 'json',
            data: {
                action:		'ex2',
                homework:	2,
                n:			$('input[name="n"]').val(),
                epsilon:	$('input[name="epsilon"]').val(),
                arr:		$('textarea[name="array"]').val(),
                matrice:	$('textarea[name="matrice"]').val()
            },
            // procesam aici raspunsul
            success: function(data) {
                console.log("===========  Homework2 - Ex2 ================");
                console.log("A \t= ", data['A']);
                console.log("Precizia \t\t\t= ", data['epsilon']);
                console.log("Q \t\t= ", data['Q']);
                console.log("R \t\t= ", data['r']);
                console.log("=============================================");
                template.messages.green("Successfull compiled");
                template.messages.green("Check console and bottom page");
                template.tables.base();
                template.tables.content(
                    ["A", "Precizia","Q","R"],
                    [data['A'], data['epsilon'],data['Q'],  data['r']]);
            }
        });
	};

	var ex3 = function() {

// trimite un POST request
        // body-ul va contine data serializata
        // json cu numarul execitiului si numarul temei
        $.ajax({
            type: 'POST',
            url: 'ajax/ajax.php',
            dataType: 'json',
            data: {
                action:		'ex3',
                homework:	2,
                n:			$('input[name="n"]').val(),
                epsilon:	$('input[name="epsilon"]').val(),
                arr:		$('textarea[name="array"]').val(),
                matrice:	$('textarea[name="matrice"]').val()
            },
            // procesam aici raspunsul
            success: function(data) {
                console.log("===========  Homework2 - Ex3 ================");
                console.log("A \t= ", data['A']);
                console.log("Precizia \t\t\t= ", data['epsilon']);
                console.log("Q \t\t= ", data['Q']);
                console.log("R \t\t= ", data['r']);
                console.log("X \t\t= ", data['x']);
                console.log("Qlib \t\t= ", data['Qlib']);
                console.log("Rlib \t\t= ", data['rlib']);
                console.log("Xlib \t\t= ", data['xlib']);
                console.log("TimeH(n=25) \t\t= ", data['timeH']);
                console.log("TimeQr(n=25) \t\t= ", data['timeQr']);
                console.log("=============================================");
                template.messages.green("Successfull compiled");
                template.messages.green("Check console and bottom page");
                template.tables.base();
                template.tables.content(
                    ["A","x","xlib","timeH(n=25)","timeQR(n=25)"],
                    [data['A'],data["x"],data["xlib"],data['timeH'],data['timeQr']]);
            }
        });
	};

	var ex4 = function() {
        $.ajax({
            type: 'POST',
            url: 'ajax/ajax.php',
            dataType: 'json',
            data: {
                action:		'ex4',
                homework:	2,
                n:			$('input[name="n"]').val(),
                epsilon:	$('input[name="epsilon"]').val(),
                arr:		$('textarea[name="array"]').val(),
                matrice:	$('textarea[name="matrice"]').val()
            },
            // procesam aici raspunsul
            success: function(data) {
                console.log("===========  Homework2 - Ex4 ================");
                console.log("A \t= ", data['A']);
                console.log("Precizia \t\t\t= ", data['epsilon']);
                console.log("Q \t\t= ", data['Q']);
                console.log("R \t\t= ", data['r']);
                console.log("X \t\t= ", data['x']);
                console.log("Qlib \t\t= ", data['Qlib']);
                console.log("Rlib \t\t= ", data['rlib']);
                console.log("Xlib \t\t= ", data['xlib']);
                console.log("norm1 \t\t= ", data['norm1']);
                console.log("norm2 \t\t= ", data['norm2']);
                console.log("norm3 \t\t= ", data['norm3']);
                console.log("norm4 \t\t= ", data['norm4']);
                console.log("=============================================");
                template.messages.green("Successfull compiled");
                template.messages.green("Check console and bottom page");
                template.tables.base();
                template.tables.content(
                    ["A","x","Norm","Norm 2","Norm 3","Norm 4"],
                    [data['A'],data["x"],data["norm1"],data['norm2'],data['norm3'],data['norm4']]);
            }
        });
	};

	return {
		Ex1:ex1,
		Ex2:ex2,
		Ex3:ex3,
		Ex4:ex4
	};

})(templateSystem, $);

module.exports = homework2;

},{"./template.js":8}],6:[function(require,module,exports){
"use strict";
var tS = require('./template.js');

var homework3 = (function(template, $) {
	var ex1 = function() {
		// trimite un POST request
		// body-ul va contine data serializata
		// json cu numarul execitiului si numarul temei
		$.ajax({
			type: 'POST',
			url: 'ajax/ajax.php',
			dataType: 'json',
			data: {
				action:		'ex1',
				homework:	3,
				n:			$('input[name="n"]').val(),
				epsilon:	$('input[name="epsilon"]').val(),
				matrice:	$('textarea[name="matrice"]').val()
			},
			// procesam aici raspunsul
			success: function(data) {
                if (data['sts'] === 0) {
                    console.log("===========  Homework3 - Ex1 ================");
                    console.log("N\t= ", data['n']);
                    console.log("Precizia \t\t\t= ", data['epsilon']);
                    console.log("A \t\t= ", data['A']);
                    console.log("Ae \t\t= ", data['Ae']);
                    console.log("Inv \t\t= ", data["invA"]);
                    console.log("=============================================");
                    template.messages.green("Successfull compiled");
                    template.messages.green("Check console and bottom page");
                    template.tables.base();
                    template.tables.content(
                        ["N", "Precizia", "A", "Ae", "Inv"],
                        [data['n'], data['epsilon'], data['A'], data['Ae'], data["invA"]]);
                }else
                {
                    console.log("===========  Homework3 - Ex1 ================");
                    console.log("N\t= ", data['n']);
                    console.log("Precizia \t\t\t= ", data['epsilon']);
                    console.log("A \t\t= ", data['A']);
                    console.log("Ae \t\t= ", data['Ae']);
                    console.log("Inv \t\t= ", data["invA"]);
                    console.log("Det \t\t= ", data["det"]);
                    console.log("Norm \t\t= ", data["norm"]);
                    console.log("=============================================");
                    template.messages.green("Successfull compiled");
                    template.messages.green("Check console and bottom page");
                    template.tables.base();
                    template.tables.content(
                        ["N", "Precizia", "A", "Ae", "Inv","Det","Norm"],
                        [data['n'], data['epsilon'], data['A'], data['Ae'], data["invA"],data["det"],data["norm"]]);
                }
            }

		});
	};

	var ex2 = function() {

	};
	var ex3 = function() {

	};
	return {
		Ex1: ex1,
		Ex2: ex2,
		Ex3: ex3
	};

})(tS,jQuery);
// export module
module.exports = homework3;

},{"./template.js":8}],7:[function(require,module,exports){
"use strict";
var ts = require("./template.js");

var h4 = (function(template, $){

	var ex1 = function() {
		// trimite un POST request
		// body-ul va contine data serializata
		// json cu numarul execitiului si numarul temei
		$.ajax({
			type: 'POST',
			url: 'ajax/ajax.php',
			dataType: 'json',
			data: {
				action:	'ex1',
				homework:	4
			},	
			// procesam aici raspunsul
			success: function(data) {
				console.log("===========  Homework4 - Ex1 ================");
				console.log("A plus B\t= ", data["aplusb"]);
				console.log("=============================================");
				template.messages.green("Successfull compiled");
				template.messages.green("Check console and bottom page");
				template.tables.base();
				template.tables.content(
					["A plus B"],
					[data["aplusb"]]
				);
			}
		});
	};

    var ex2 = function() {

        $.ajax({
            type: 'POST',
            url: 'ajax/ajax.php',
            dataType: 'json',
            data: {
                action:	'ex2',
                homework:	4
            },
            // procesam aici raspunsul
            success: function(data) {
                console.log("===========  Homework4 - Ex2 ================");
                console.log("A x B\t= ", data["aorib"]);
                console.log("=============================================");
                template.messages.green("Successfull compiled");
                template.messages.green("Check console and bottom page");
                template.tables.base();
                template.tables.content(
                    ["A x B"],
                    [data["aorib"]]
                );
            }
        });

    };
    var ex3 = function() {

        $.ajax({
            type: 'POST',
            url: 'ajax/ajax.php',
            dataType: 'json',
            data: {
                action:	'ex3',
                homework:	4
            },
            // procesam aici raspunsul
            success: function(data) {
                console.log("===========  Homework4 - Ex3 ================");
                console.log("A * x\t= ", data["axb"]);
                console.log("=============================================");
                template.messages.green("Successfull compiled");
                template.messages.green("Check console and bottom page");
                template.tables.base();
                template.tables.content(
                    ["A * x"],
                    [data["axb"]]
                );
            }
        });

    };
    return {
        Ex1: ex1,
        Ex2: ex2,
        Ex3: ex3
    };

})(ts, jQuery);

module.exports = h4;

},{"./template.js":8}],8:[function(require,module,exports){
"use strict";

var template = (function($) {
	// messages object for creating
	// message components
	var messages =  {
		// success message
		green: function(msg) {
			$('.status').append(
				'<div class=\"alert alert-success\" role=\"alert\">'+ msg + '!</div>'
			);
			$('.alert').fadeTo(1900, 1).slideUp(900, removeMessage);
		},
		// fail message
		red: function(msg) {
			$('.status').append(
				'<div class=\"alert alert-danger\" role=\"alert\">' + msg + '!</div>'
			);
			$('.alert').fadeTo(1900, 1).slideUp(900, removeMessage);
		},

		//warning message
		orange: function(msg) {
			$('.status').append(
				'<div class=\"alert alert-warning\" role=\"alert\">' + msg + '</div>'
			);
			$('.alert').fadeTo(1900, 1).slideUp(900, removeMessage);
		},

	};

	// remove message with animation set
	var removeMessage = function() {
		$(this).remove();
	};

	// tables object for creating
	// table components
	var tables = {
		// construct skeleton table components
		base: function() {

			$('.table-spot').append(
				'<div class="table-container">'+
				'<h2>Output</h2>'+
				'<table class="table table-bordered table-condensed table-hover">'+
					'<thead>'+
						'<tr>'+
						'</tr>'+
					'</thead>'+
					'<tbody>'+
						'<tr class="success">'+
						'</tr>'+
					'</tbody>'+
				'</table>'+
			'</div>');
		},

		// add content to the table previously created
		content: function(heads, options) {
			var i; // index
			var tableHead = $('.table > thead > tr');
			var tableBody = $('.table > tbody > .success');
			var lenHeads = heads.length;
			var lenOpts = options.length;
			if (tableHead.length && tableHead.length)  {
				// for every col in header insert it
				for (i=0;i<lenHeads; i++ ){
					tableHead.append('<th>'+ heads[i] + '</th>');
				}
				// for every col body insert it
				for (i=0;i<lenOpts; i++) {
					tableBody.append('<td>'+ options[i] +'</td>');
				}

			}else {
				messages.red("Can't construct table");
			}
		},
	
	};
	// exportam toate functiile/obiectele publice
	return {
		messages: messages,
		tables: tables
	};

})(jQuery);


module.exports = template;

},{}],9:[function(require,module,exports){
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
                        type: "text",
                        name: "x"
                    },
                    "p": {
                        type: "text",
                        name: "p"
                    }
                }
            },
            ex4: {
                input: {
                    Vector: {
                        type: 'textarea',
                        name: 'array',
                        placeholder: "[x,y,z]"
                    },
                    Matrice: {
                        type: 'textarea',
                        name: 'matrice',
                        placeholder: "[x,y][x,y]"
                    }
                }
            },
        },//h1
        h2: {
            ex1: {
                input: {
                    "n": {
                        type: "text",
                        name: "n",
                        value: 3
                    },
                    "epsilon": {
                        type: "text",
                        name: "epsilon",
                        value: 2
                    },
                    "s": {
                        type: 'textarea',
                        name: 'array',
                        placeholder: "[x,y,z]",
                        value: "[1,3,4]"
                    },
                    "matrice patratica": {
                        type: 'textarea',
                        name: 'matrice',
                        placeholder: "[x,y][x,y]",
                        value: "[2,2,4]\n[2,4,2]\n[4,4,2]"
                    },
                }
            },
            ex2: {
                input: {
                    "n": {
                        type: "text",
                        name: "n",
                        value: 3
                    },
                    "epsilon": {
                        type: "text",
                        name: "epsilon",
                        value: 2
                    },
                    "s": {
                        type: 'textarea',
                        name: 'array',
                        placeholder: "[x,y,z]",
                        value: "[1,3,4]"
                    },
                    "matrice patratica": {
                        type: 'textarea',
                        name: 'matrice',
                        placeholder: "[x,y][x,y]",
                        value: "[2,2,4]\n[2,4,2]\n[4,4,2]"
                    },
                }
            },
            ex3: {
                input: {
                    "n": {
                        type: "text",
                        name: "n",
                        value: 3
                    },
                    "epsilon": {
                        type: "text",
                        name: "epsilon",
                        value: 2
                    },
                    "s": {
                        type: 'textarea',
                        name: 'array',
                        placeholder: "[x,y,z]",
                        value: "[1,3,4]"
                    },
                    "matrice patratica": {
                        type: 'textarea',
                        name: 'matrice',
                        placeholder: "[x,y][x,y]",
                        value: "[2,2,4]\n[2,4,2]\n[4,4,2]"
                    },
                }
            },
            ex4: {
                input: {
                    "n": {
                        type: "text",
                        name: "n",
                        value: 3
                    },
                    "epsilon": {
                        type: "text",
                        name: "epsilon",
                        value: 2
                    },
                    "s": {
                        type: 'textarea',
                        name: 'array',
                        placeholder: "[x,y,z]",
                        value: "[1,3,4]"
                    },
                    "matrice patratica": {
                        type: 'textarea',
                        name: 'matrice',
                        placeholder: "[x,y][x,y]",
                        value: "[2,2,4]\n[2,4,2]\n[4,4,2]"
                    },
                }
            }
        },
		h3: {
			ex1: {
				input:{
                    "n": {
                        type: "text",
                        name: "n",
                        value: 3
                    },
                    "epsilon": {
                        type: "text",
                        name: "epsilon",
                        value: 2
                    },
                    "matrice patratica": {
                        type: 'textarea',
                        name: 'matrice',
                        placeholder: "[x,y][x,y]",
                        value: "[1,0,2]\n[0,1,0]\n[1,1,1]"
                    },
				}
			},
			ex2: {
				input:{
					"n": {
						type:"text",
						name:"n"
					},
					"A":{
						type:'textarea',
						name: 'matrice',
						placeholder: "[4,2,2]\n[2,4,2]\n[2,2,4]",
					}
				}
			}
		},
		h4: {
			ex1: {
				input:{
					
				}
            },
            ex2: {
                input:{

                }
            },
            ex3: {
                input:{

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

},{}]},{},[3,1,2,8,9,4,5,6,7]);
