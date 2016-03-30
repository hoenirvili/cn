"use strict";

var templateSystem 	= require('./template.js');

var homework1 = (function (template, $) {
    // exercitiu 1
    var ex1 = function () {
        $.ajax({
			type: "POST",
			url: 'ajax/ajax.php',
			dataType: "json",
			data: {
				action: 'ex1',
				homework: 1
			},
            success: function (data) {
				console.log("===========  Homework1 - Ex1 ================");
				console.log("Cel mai mic numar pozitiv\t= ", data['lowest']);
				console.log("Numarul de pasi\t\t\t= ", data['step']);
				console.log("=============================================");
				template.messages.green("Successfull compiled");
				template.messages.green("Check console and bottom page");
				template.tables.base();
				template.tables.content(
                    ["Cel mai mic numar pozitiv", "Numarul de pasi"],
                    [data['lowest'], data['step']]);
            }
        });


    };
	// exercitiu 2
    var ex2 = function () {

        $.ajax({
			type: "POST",
			url: 'ajax/ajax.php',
			dataType: "json",
			data: {
				action: 'ex2',
				homework: 1
			},
            success: function (data) {
				console.log("===========  Homework1 - Ex2 ================");
				console.log("Numarul de pasi\t = ", data['step']);
				console.log("Operand stanga\t = ", data['leftOperand']);
				console.log("Operand dreapta\t =", data['rightOperand']);
				console.log("a\t\t = ", data['a']);
				console.log("b\t\t = ", data['c']);
				console.log("c\t\t = ", data['c']);
				console.log("=============================================");
				template.messages.green("Successfull compiled");
				template.messages.green("Check console and bottom page");
                template.tables.base();
                template.tables.content(
                    ["Suma operand stanga", "Suma operand dreapta", "Numarul de pasi", "a", "b", "c"],
                    [data['leftOperand'], data['rightOperand'], data['step'], data['a'], data['b'], data['c']]);
            }
        });

    };

    //exercitiu 3
    var ex3 = function () {

        $.ajax({
            type: "POST",
            url: 'ajax/ajax.php',
            dataType: "json",
            data: {
				action: 'ex3',
				homework: 1,
				x: $('input[name="x"]').val(),
				p: $('input[name="p"]').val()
			},
            success: function (data) {
				console.log("===========  Homework1 - Ex3 ================");
				console.log("Tan Lentz computed\t = ", data['aprox']);
				console.log("Tan computed\t\t = ", data['tan']);
				console.log("pi\t\t\t = ", data['pi']);
				console.log("e\t\t\t = ", data['e']);
				console.log("x\t\t\t = ", data['x']);
				console.log("=============================================");
				template.messages.green("Successfull compiled");
				template.messages.green("Check console and bottom page");
				template.tables.base();
				template.tables.content(
                    ["Tangenta Lentz", "Tangenta php", "pi", "e", "x"],
                    [data['aprox'], data['tan'], data['pi'], data['e'], data['x']]);
            }
        });
    };
	// exercitiu 4
    var ex4 = function () {

        $.ajax({
            type: "POST",
            url: 'ajax/ajax.php',
            dataType: "json",
            data: {
                action: 'ex4',
                homework: 1,
                arr: $('textarea[name="array"]').val(),
                matrice: $('textarea[name="matrice"]').val()
            },
            success: function (data) {
				console.log("===========  Homework1 - Ex4 ================");
				console.log("Vector\t\t = ", data['vector']);
				console.log("Matrice\t\t = ", data['matrice']);
				console.log("Vector Fisier\t = ", data['vectorf']);
				console.log("Matrice Fisier\t = ", data['matricef']);
				console.log("Vector Random\t = ", data['vectorr']);
				console.log("Matrice Random\t = ", data['matricer']);
				console.log("=============================================");
				template.messages.green("Successfull compiled");
				template.messages.green("Check console and bottom page");
                template.tables.base();
                template.tables.content(
                    ["Vector", "Matrice", "Vector Fisier", "Matrice Fisier", "Vector Random", "Matrice Random"],
					[data['vector'], data['matrice'], data['vectorf'], data['matricef'], data['vectorr'], data['matricer']]
                );
            }
        });

    };


    // exportam toate functiile publice
    return {
        Ex1: ex1,
        Ex2: ex2,
        Ex3: ex3,
        Ex4: ex4
    };
// importam modulele folosite in modulul homework1
})(templateSystem, jQuery);

// exportam modulul homework1
module.exports = homework1;
