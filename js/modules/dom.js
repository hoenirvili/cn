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
