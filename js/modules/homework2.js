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
				console.log("===========  Homework2 - Ex1 ================");
				console.log("Dimensiunea sistemului \t= ", data['n']);
				console.log("Precizia \t\t\t= ", data['epsilon']);
				console.log("matricea \t\t= ", data['A']);
				console.log("vectorul s \t\t= ", data['s']);
				console.log("vectorul b\t\t= ",data['b']);
				console.log("=============================================");
				template.messages.green("Successfull compiled");
				template.messages.green("Check console and bottom page");
				template.tables.base();
				template.tables.content(
					["Dimensiunea sistemului", "Precizia","Matricea","Vectorul S","Vectorul B"],
					[data['n'], data['epsilon'],data['A'], data['s'], data['b']]);
			}
		});
	};

	var ex2 = function() {
// trimite un POST request
        // body-ul va contine data serializata
        // json cu numarul execitiului si numarul temei
        $.ajax({
            type: 'POST',
            url: 'ajax/ajax.php',
            dataType: 'json',
            data: {
                action:		'ex2',
                homework:	2,
                epsilon:	$('input[name="epsilon"]').val(),
                matrice:	$('textarea[name="matrice"]').val()
            },
            // procesam aici raspunsul
            success: function(data) {
                console.log("===========  Homework2 - Ex1 ================");
                console.log("A \t= ", data['A']);
                console.log("Precizia \t\t\t= ", data['epsilon']);
                console.log("Q \t\t= ", data['Q']);
                console.log("R \t\t= ", data['r']);
                console.log("=============================================");
                template.messages.green("Successfull compiled");
                template.messages.green("Check console and bottom page");
                template.tables.base();
                template.tables.content(
                    ["A", "Precizia","Q","R"],
                    [data['A'], data['epsilon'],data['Q'],  data['r']]);
            }
        });
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
