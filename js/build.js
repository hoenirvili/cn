(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
						template.messages.orange("This homework is not implemented yet");
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

var dom = (function($, controller, template) {
	var submitButton;
	// keep only the vals
	var numberHomework;
	var numberExercise;

	// init function
	var Init = function() {
		submitButton = ($('#button-submit').length)?$('#button-submit'): false;
		// when document is fully loaded
		$(document).ready( function() {
			// if button exists
			if(submitButton)
				// attatch event
				$(submitButton).on("click", onSubmit);
		});
	};//init

	// when button has been submited
	var onSubmit = function() {
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

})(jQuery, ctrl, tplate);


module.exports = dom;

},{"./controller.js":2,"./template.js":6}],4:[function(require,module,exports){
"use strict";

var templateSystem = require('./template.js');

var homework1 = (function(template, $) {
	// exercitiu 1
	var ex1 = function() {
		var u = 1;
		var lowest;
		var step=0;

		while(1+u !== 1.0) {
			u = u/10;
			step++;
			lowest = u;
		}

		console.log("===========  Homework1 - Ex1 ================");
		console.log("Cel mai mic numar pozitiv	= ",	lowest);
		console.log("Numarul de pasi			= ",	step);
		console.log("=============================================");

		template.tables.base();
		template.tables.content(
			["Cel mai mic numar pozitiv","Numarul de pasi"],
			[lowest,step]);
	};

	var ex2 = function() {
		var a = 1.0, b,c;
		var u = 1;
		var leftOperand;
		var rightOperand;
		var step = 0;
		while(1 + u !== 1.0) {
			step++;
			u = u/10;
			b = u;
			c = u;
			leftOperand = (a+b)+c;
			rightOperand =a+(b+c);
			if (leftOperand !== rightOperand) {
				break;
			}
			if (step > 20) {
				break;
			}
		}

		console.log("===========  Homework1 - Ex2 ================");
		console.log("Numarul de pasi	= ",		step);
		console.log("Operand stanga		= ",		leftOperand);
		console.log("Operand dreapta	= ",		rightOperand);
		console.log("a					= ",		a);
		console.log("b					= ",		c);
		console.log("c					= ",		c);
		console.log("=============================================");

		template.tables.base();
		template.tables.content(
			["Suma operand stanga","Suma operand dreapta", "Numarul de pasi","a","b","c"],
			[leftOperand, rightOperand, step, a, b, c]);
	};
	//exercitiu 3
	var ex3 = function() {

	};

	var ex4 = function() {
		var input = $('#input');
		var inputContainer;
		if (input.length)
			if (input.val().length) {
				inputContainer = input.val();
				var re = /\[+(([0-9]*\.[0-9]+|[0-9]+)\,*)+\]/g;
				var str = '[1,2312,3123123,0]';
				var m;
				// (TODO)make this work validate arrays.
				while ((m = re.exec(str)) !== null) {
    				if (m.index === re.lastIndex) {
        			re.lastIndex++;
					console.log(re.lastIndex);
					}
				}
			}
			else
				template.messages.orange("Plase enter some input");
	};

	// exportam toate functiile publice
	return {
		Ex1:ex1,
		Ex2:ex2,
		Ex3:ex3,
		Ex4:ex4
	};

})(templateSystem, jQuery);
module.exports = homework1;

},{"./template.js":6}],5:[function(require,module,exports){
"use strict";
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
			$('.alert').fadeTo(1900, 1).slideUp(500, removeMessage);
		},
		// fail message
		red: function(msg) {
			$('.status').append(
				'<div class=\"alert alert-danger\" role=\"alert\">' + msg + '!</div>'
			);
			$('.alert').fadeTo(1900, 1).slideUp(500, removeMessage);
		},

		//warning message
		orange: function(msg) {
			$('.status').append(
				'<div class=\"alert alert-warning\" role=\"alert\">' + msg + '</div>'
			);
			$('.alert').fadeTo(1900, 1).slideUp(500, removeMessage);
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
			if ($('.table-container').length)
				$('.table-container').remove();
				
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

},{}]},{},[3,1]);
