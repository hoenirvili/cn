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
                n:			$('input[name="n"]').val(),
                epsilon:	$('input[name="epsilon"]').val(),
                arr:		$('textarea[name="array"]').val(),
                matrice:	$('textarea[name="matrice"]').val()
            },
            // procesam aici raspunsul
            success: function(data) {
                console.log("===========  Homework2 - Ex2 ================");
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

// trimite un POST request
        // body-ul va contine data serializata
        // json cu numarul execitiului si numarul temei
        $.ajax({
            type: 'POST',
            url: 'ajax/ajax.php',
            dataType: 'json',
            data: {
                action:		'ex3',
                homework:	2,
                n:			$('input[name="n"]').val(),
                epsilon:	$('input[name="epsilon"]').val(),
                arr:		$('textarea[name="array"]').val(),
                matrice:	$('textarea[name="matrice"]').val()
            },
            // procesam aici raspunsul
            success: function(data) {
                console.log("===========  Homework2 - Ex3 ================");
                console.log("A \t= ", data['A']);
                console.log("Precizia \t\t\t= ", data['epsilon']);
                console.log("Q \t\t= ", data['Q']);
                console.log("R \t\t= ", data['r']);
                console.log("X \t\t= ", data['x']);
                console.log("Qlib \t\t= ", data['Qlib']);
                console.log("Rlib \t\t= ", data['rlib']);
                console.log("Xlib \t\t= ", data['xlib']);
                console.log("TimeH(n=25) \t\t= ", data['timeH']);
                console.log("TimeQr(n=25) \t\t= ", data['timeQr']);
                console.log("=============================================");
                template.messages.green("Successfull compiled");
                template.messages.green("Check console and bottom page");
                template.tables.base();
                template.tables.content(
                    ["A","x","xlib","timeH(n=25)","timeQR(n=25)"],
                    [data['A'],data["x"],data["xlib"],data['timeH'],data['timeQr']]);
            }
        });
	};

	var ex4 = function() {
        $.ajax({
            type: 'POST',
            url: 'ajax/ajax.php',
            dataType: 'json',
            data: {
                action:		'ex4',
                homework:	2,
                n:			$('input[name="n"]').val(),
                epsilon:	$('input[name="epsilon"]').val(),
                arr:		$('textarea[name="array"]').val(),
                matrice:	$('textarea[name="matrice"]').val()
            },
            // procesam aici raspunsul
            success: function(data) {
                console.log("===========  Homework2 - Ex4 ================");
                console.log("A \t= ", data['A']);
                console.log("Precizia \t\t\t= ", data['epsilon']);
                console.log("Q \t\t= ", data['Q']);
                console.log("R \t\t= ", data['r']);
                console.log("X \t\t= ", data['x']);
                console.log("Qlib \t\t= ", data['Qlib']);
                console.log("Rlib \t\t= ", data['rlib']);
                console.log("Xlib \t\t= ", data['xlib']);
                console.log("norm1 \t\t= ", data['norm1']);
                console.log("norm2 \t\t= ", data['norm2']);
                console.log("norm3 \t\t= ", data['norm3']);
                console.log("norm4 \t\t= ", data['norm4']);
                console.log("=============================================");
                template.messages.green("Successfull compiled");
                template.messages.green("Check console and bottom page");
                template.tables.base();
                template.tables.content(
                    ["A","x","Norm","Norm 2","Norm 3","Norm 4"],
                    [data['A'],data["x"],data["norm1"],data['norm2'],data['norm3'],data['norm4']]);
            }
        });
	};

	return {
		Ex1:ex1,
		Ex2:ex2,
		Ex3:ex3,
		Ex4:ex4
	};

})(templateSystem, $);

module.exports = homework2;
