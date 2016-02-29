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
				console.log(data);
			}
		});
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

})(templateSystem, $);

module.exports = homework2;
