"use strict";

var templateSystem = require('./template.js');
var utils = require('./util.js');

var homework1 = (function (template, $, utils) {
    // exercitiu 1
    var ex1 = function () {

        $.ajax({
            type: "POST",
            url: 'ajax/ajax.php',
            dataType: "json",
            data: {action: 'ex1', homework: 1},
            success: function (data) {
                console.log("===========  Homework1 - Ex1 ================");
                console.log("Cel mai mic numar pozitiv	= ", data['lowest']);
                console.log("Numarul de pasi			= ", data['step']);
                console.log("=============================================");
                template.tables.base();
                template.tables.content(
                    ["Cel mai mic numar pozitiv", "Numarul de pasi"],
                    [data['lowest'], data['step']]);
            }
        });


    };

    var ex2 = function () {

        $.ajax({
            type: "POST",
            url: 'ajax/ajax.php',
            dataType: "json",
            data: {action: 'ex2', homework: 1},
            success: function (data) {
                console.log("===========  Homework1 - Ex2 ================");
                console.log("Numarul de pasi	= ", data['step']);
                console.log("Operand stanga		= ", data['leftOperand']);
                console.log("Operand dreapta	= ", data['rightOperand']);
                console.log("a					= ", data['a']);
                console.log("b					= ", data['c']);
                console.log("c					= ", data['c']);
                console.log("=============================================");

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
            data: {action: 'ex3', homework: 1, x: $('input[name="x"]').val(), p: $('input[name="p"]').val()},
            success: function (data) {
                console.log("===========  Homework1 - Ex3 ================");
                console.log("Tan Lentz computed   = ", data['aprox']);
                console.log("Tan computed   	  = ", data['tan']);
                console.log("pi             	  = ", data['pi']);
                console.log("e					  = ", data['e']);
                console.log("x					  = ", data['x']);
                console.log("=============================================");

                template.tables.base();
                template.tables.content(
                    ["Tangenta Lentz", "Tangenta php", "pi", "e", "x"],
                    [data['aprox'], data['tan'], data['pi'], data['e'], data['x']]);
            }
        });

    };

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
                console.log("===========  Homework1 - Ex3 ================");
                console.log("Vector               = ", data['vector']);
                console.log("Matrice  	          = ", data['matrice']);
                console.log("Vector Fisier        = ", data['vectorf']);
                console.log("Matrice Fisier		  = ", data['matricef']);
                console.log("Vector Random		  = ", data['vectorr']);
                console.log("Matrice Random		  = ", data['matricer']);
                console.log("=============================================");

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

})(templateSystem, jQuery, utils);
module.exports = homework1;
