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
				console.log("===========  Homework2 - Ex1 ================");
				console.log("Dimensiunea sistemului \t= ", data['n']);
				console.log("Precizia \t\t\t= ", data['epsilon']);
				console.log("matricea \t\t= ", data['A']);
				console.log("=============================================");
				template.messages.green("Successfull compiled");
				template.messages.green("Check console and bottom page");
				template.tables.base();
				template.tables.content(
					["Dimensiunea sistemului", "Precizia","Matricea"],
					[data['n'], data['epsilon'],data['A']]);
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