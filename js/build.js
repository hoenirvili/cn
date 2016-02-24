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
var h1 = require('./homework1');
var h2 = require('./homework2.js');

// here we import all our homeworks modules
var controller = (function (h1, h2) {
	var fn = function(nH, nX, template){
		switch(nH) {
			// tema 1
			case '1':
				switch(nX) {
					case '1':
						h1.Ex1();
						template.messages.green("Successfull compiled");
						template.messages.green("Check console and bootom page");
						break;
					case '2':
						h1.Ex2();
						template.messages.green("Successfull compiled");
						template.messages.green("Check console and botom page");
						break;
					case '3':
						template.messages.orange("Check console and botom page");
						h1.Ex3();
						break;
					case '4':
						h1.Ex4();
						template.messages.green("Successfull compiled");
						template.messages.green("Check console and bottom page");
						break;
				}
				break;
			// tema 2
			case '2':
				switch (nX) {
					case '1':
						template.messages.orange("This homework is not implemented yet");
						h2.Ex1();
						break;
					case '2':
						template.messages.orange("This homework is not implemented yet");
						h2.Ex2();
						break;
					case '3':
						template.messages.orange("This homework is not implemented yet");
						h2.Ex3();
						break;
					case '4':
						template.messages.orange("This homework is not implemented yet");
						break;
				}
				break;
			// tema 3
			case '3':
			template.messages.orange("This homework is not implemented yet");
			break;
			// tema 4
			case '4':
			template.messages.orange("This homework is not implemented yet");
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

})(h1,h2);

module.exports = controller;

},{"./homework1":4,"./homework2.js":5}],3:[function(require,module,exports){
"use strict";

var ctrl = require('./controller.js');
var tplate = require('./template.js');
var utils = require('./util.js');
var h1 = require('./homework1.js');
var $input = $('#input');

var dom = (function ($, controller, template, utils) {
    var submitButton;
    // keep only the vals
    var numberHomework;
    var numberExercise;

    // init function
    var Init = function () {
        submitButton = ($('#button-submit').length) ? $('#button-submit') : false;
        var $homeworkSelect = ($('#numberHomework').length) ? $('#numberHomework') : false;
        var $exerciseSelect = ($('#numberExercise').length) ? $('#numberExercise') : false;
        // when document is fully loaded
        $(document).ready(function () {
            // if button exists
            if (submitButton)
            // attatch event
                $(submitButton).on("click", onSubmit);

            if ($homeworkSelect)
                $homeworkSelect.on('change', selectChange);

            if ($exerciseSelect)
                $exerciseSelect.on('change', selectChange);
        });
    };//init

    var selectChange = function () {
        console.log(utils);
        numberHomework = $('#numberHomework').val();
        numberExercise = $('#numberExercise').val();
        $input.html("");
        var inputs = utils.inputCfg['h' + numberHomework]['ex' + numberExercise]['input'];
        //console.log(inputs);
        if (inputs) {
            for (var key in inputs) {
                var inp = inputs[key];
                var placeholder;
                if (inp['placeholder']) {
                    placeholder = " placeholder='" + inp['placeholder'] + "' ";
                }
                else {
                    placeholder = "";
                }
                if (inp['type'] === 'text') {
                    $input.append('<label>' + key + '</label><input '+placeholder+' class="form-control" name="' + inp['name'] + '" type="' + inp['type'] + '"/>');
                }
                if (inp['type'] === 'textarea') {

                    $input.append('<label>' + key + '</label><textarea '+placeholder+' class="form-control" name="' + inp['name'] + '"></textarea>');
                }
            }
        }
    };

    // when button has been submited
    var onSubmit = function () {
        if ($('.table-container').length)
            $('.table-container').remove();
        // keep only the vals
        numberHomework = $('#numberHomework').val();
        numberExercise = $('#numberExercise').val();
        if (numberExercise && numberHomework) {
            controller.fn(numberHomework, numberExercise, template);
        } else {
            template.messages.orange("Please set exercise number and homework");
        }
    };


    return {
        Init: Init
    };

})(jQuery, ctrl, tplate, utils, h1);


module.exports = dom;

},{"./controller.js":2,"./homework1.js":4,"./template.js":6,"./util.js":7}],4:[function(require,module,exports){
"use strict";

var templateSystem = require('./template.js');
var utils = require('./util.js');

var homework1 = (function (template, $, utils) {
    // exercitiu 1
    var ex1 = function () {

        $.ajax({
            type: "POST",
            url: 'ajax/ajax.php',
            dataType: "json",
            data: {action: 'ex1', homework: 1},
            success: function (data) {
                console.log("===========  Homework1 - Ex1 ================");
                console.log("Cel mai mic numar pozitiv	= ", data['lowest']);
                console.log("Numarul de pasi			= ", data['step']);
                console.log("=============================================");
                template.tables.base();
                template.tables.content(
                    ["Cel mai mic numar pozitiv", "Numarul de pasi"],
                    [data['lowest'], data['step']]);
            }
        });


    };

    var ex2 = function () {

        $.ajax({
            type: "POST",
            url: 'ajax/ajax.php',
            dataType: "json",
            data: {action: 'ex2', homework: 1},
            success: function (data) {
                console.log("===========  Homework1 - Ex2 ================");
                console.log("Numarul de pasi	= ", data['step']);
                console.log("Operand stanga		= ", data['leftOperand']);
                console.log("Operand dreapta	= ", data['rightOperand']);
                console.log("a					= ", data['a']);
                console.log("b					= ", data['c']);
                console.log("c					= ", data['c']);
                console.log("=============================================");

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
            data: {action: 'ex3', homework: 1, x: $('input[name="x"]').val(), p: $('input[name="p"]').val()},
            success: function (data) {
                console.log("===========  Homework1 - Ex3 ================");
                console.log("Tan Lentz computed   = ", data['aprox']);
                console.log("Tan computed   	  = ", data['tan']);
                console.log("pi             	  = ", data['pi']);
                console.log("e					  = ", data['e']);
                console.log("x					  = ", data['x']);
                console.log("=============================================");

                template.tables.base();
                template.tables.content(
                    ["Tangenta Lentz", "Tangenta php", "pi", "e", "x"],
                    [data['aprox'], data['tan'], data['pi'], data['e'], data['x']]);
            }
        });

    };

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
                console.log("===========  Homework1 - Ex3 ================");
                console.log("Vector               = ", data['vector']);
                console.log("Matrice  	          = ", data['matrice']);
                console.log("Vector Fisier        = ", data['vectorf']);
                console.log("Matrice Fisier		  = ", data['matricef']);
                console.log("Vector Random		  = ", data['vectorr']);
                console.log("Matrice Random		  = ", data['matricer']);
                console.log("=============================================");

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

})(templateSystem, jQuery, utils);
module.exports = homework1;

},{"./template.js":6,"./util.js":7}],5:[function(require,module,exports){
"use strict";
if (!window.cfg) {
    window.cfg = {};
}

var homework2 = (function() {
	var ex1 = function() {

	};

	var ex2 = function() {

	};

	var ex3 = function() {


	};

	var ex4 = function() {

	};

	return {
		Ex1:ex1,
		Ex2:ex2,
		Ex3:ex3,
		Ex4:ex4
	};

})();

module.exports = homework2;
},{}],6:[function(require,module,exports){
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
		}
	};
	// exportam toate functiile/obiectele publice
	return {
		messages: messages,
		tables: tables
	};

})(jQuery);


module.exports = template;

},{}],7:[function(require,module,exports){
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

},{}]},{},[3,1]);
