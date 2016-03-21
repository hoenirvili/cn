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
                if (data['sts'] == 0) {
                    console.log("===========  Homework3 - Ex1 ================");
                    console.log("N\t= ", data['n']);
                    console.log("Precizia \t\t\t= ", data['epsilon']);
                    console.log("A \t\t= ", data['A']);
                    console.log("Ae \t\t= ", data['Ae']);
                    console.log("Inv \t\t= ", data["invA"]);
                    console.log("=============================================");
                    template.messages.green("Successfull compiled");
                    template.messages.green("Check console and bottom page");
                    template.tables.base();
                    template.tables.content(
                        ["N", "Precizia", "A", "Ae", "Inv"],
                        [data['n'], data['epsilon'], data['A'], data['Ae'], data["invA"]]);
                }else
                {
                    console.log("===========  Homework3 - Ex1 ================");
                    console.log("N\t= ", data['n']);
                    console.log("Precizia \t\t\t= ", data['epsilon']);
                    console.log("A \t\t= ", data['A']);
                    console.log("Ae \t\t= ", data['Ae']);
                    console.log("Inv \t\t= ", data["invA"]);
                    console.log("Det \t\t= ", data["det"]);
                    console.log("Norm \t\t= ", data["norm"]);
                    console.log("=============================================");
                    template.messages.green("Successfull compiled");
                    template.messages.green("Check console and bottom page");
                    template.tables.base();
                    template.tables.content(
                        ["N", "Precizia", "A", "Ae", "Inv","Det","Norm"],
                        [data['n'], data['epsilon'], data['A'], data['Ae'], data["invA"],data["det"],data["norm"]]);
                }
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
