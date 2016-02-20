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
