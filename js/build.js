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
var h1 = require('./homework1');
var h2 = require('./homework2.js');

// here we import all our homeworks modules
var controller = (function (h1, h2) {
	var fn = function(nH, nX, template){
		switch(nH) {
			case '1':
				switch(nX) {
					case '1':
						h1.Ex1();
						template.messages.green("Successfull compiled");
						template.messages.green("Check console and bootom page");
						break;
					case '2':
						template.messages.green("Successfull compiled");
						template.messages.green("Check console and botom page");
						h1.Ex2();
						break;
					case '3':
					case '4':
						template.messages.orange("This exercise is not implemented yet");
						break;
				}
				break;
			case '2':
			case '3':
			case '4':
			case '5':
				template.messages.orange("This homework is not implemented yet");
				break;
		}
	};
	return {
		fn : fn
	};

})(h1,h2);

module.exports = controller;

},{"./homework1":4,"./homework2.js":5}],3:[function(require,module,exports){
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
var tableTemplate = require('./template.js');

var homework1 = (function(template) {
	
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

		console.log(template);
		//TODO(error insert tables into DOOM)
		template.tables.base();
		template.tables.content(
			["Cel mai mic numar pozitiv","Numarul de pasi"],
			[lowest,step]
		);
	};

	var ex2 = function() {
		var a = 1.0, b, c;
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
		
	};

	var ex3 = function() {
		
	};

	return {
		Ex1:ex1,
		Ex2:ex2,
		Ex3:ex3,
	};

})(tableTemplate);


module.exports = homework1;

},{"./template.js":6}],5:[function(require,module,exports){
var homework2 = (function() {
	
})();


module.exports = homework2;

},{}],6:[function(require,module,exports){

var template = (function($) {
		//object
	var messages =  {

		// success message
		green: function(msg) {
			$('.status').append(
				'<div class=\"alert alert-success\" role=\"alert\">'+ msg + '!</div>'
			);

			$('.alert').fadeTo(1900, 1).slideUp(500, removeMessage);
			// remove also tables if exists
			if ($('.table-container').length) {
				$('.table-container').remove();
			}

		},
		// fail message
		red: function(msg) {
			$('.status').append(
				'<div class=\"alert alert-danger\" role=\"alert\">' + msg + '!</div>'
			);

			$('.alert').fadeTo(1900, 1).slideUp(500, removeMessage);
			// remove also tables if exists
			if ($('.table-container').length) {
				$('.table-container').remove();
			}

		},

		//warning message
		orange: function(msg) {
			$('.status').append(
				'<div class=\"alert alert-warning\" role=\"alert\">' + msg + '</div>'
			);

			$('.alert').fadeTo(1900, 1).slideUp(500, removeMessage);
			// remove also tables if exists
			if ($('.table-container').length) {
				$('.table-container').remove();
			}

		},

	};

	var removeMessage = function() {
		$(this).remove();

	};

	var tables = {
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
		content: function(heads, options) {
			var i;
			var tableHead = $('.table > thead > tr');
			var tableBody = $('.table > tbody > .success');
			lenHeads = heads.length;
			lenOpts = options.length;
			if (tableHead.length && tableHead.length)  {

				for (i=0;i<lenHeads; i++ ){
					tableHead.append('<th>'+ heads[i] + '</th>');
				}
				for (i=0;i<lenOpts; i++) {
					tableBody.append('<td>'+ options[i] +'</td>');
				}

			}else {
				messages.red("Can't construct table");
			}

		}
	};
	return {
		messages: messages,
		tables: tables
	};

})(jQuery);


module.exports = template;

},{}]},{},[3,1]);
