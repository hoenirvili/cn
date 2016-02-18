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


// here we import all our homeworks modules
var controller = (function (h1) {

	var fn = function(nH, nX, echo){
		switch(nH) {
			case '1':
				switch(nX) {
					case '1':
						h1.Ex1();
						break;
					case '2':
					case '3':
					case '4':
						echo.orange("This exercise is not implemented yet");
						break;
				}
				break;
			case '2':
			case '3':
			case '4':
			case '5':
				echo.orange("This homework is not implemented yet");
				break;
		}
	};

	return {
		fn : fn
	};

})(h1);

module.exports = controller;

},{"./homework1":4}],3:[function(require,module,exports){
var ctrl = require('./controller.js');

var dom = (function($, controller) {
	var submitButton;
	// keep only the vals
	var numberHomework;
	var numberExercise;

	// init function
	var Init = function() {
		submitButton = ($('#button-submit'))?$('#button-submit'): false;
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
			controller.fn(numberHomework, numberExercise, messages);
		} else {
			messages.orange("Please set exercise number and homework");
		}
	};

	//object
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
	
	var removeMessage = function() {
		$(this).remove();
	};

	return {
		Init: Init
	};

})(jQuery, ctrl);


module.exports = dom;

},{"./controller.js":2}],4:[function(require,module,exports){
var homework1 = (function() {

	var ex1 = function() {
		var h = 1
		var lowest;
		var step=0;
		while(1+h != 1.0) {
			h = h/10
			step++
			lowest = h;
		}
		console.log("Cel mai mic numar pozitiv ", lowest);
		console.log("Numarul de pasi ", step);
	};
	
	return {
		Ex1:ex1
	};

})();


module.exports = homework1;

},{}]},{},[3,1]);
