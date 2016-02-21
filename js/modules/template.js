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
