
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
