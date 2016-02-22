"use strict";

var templateSystem = require('./template.js');
var utils = require('./util.js');

var homework1 = (function(template, $, utils) {
	// exercitiu 1
	var ex1 = function() {

        $.ajax({
            type: "POST",
            url: 'ajax/homework1.php',
            dataType: "json",
            data: {action:'ex1'},
            success: function (data) {
                console.log("===========  Homework1 - Ex1 ================");
                console.log("Cel mai mic numar pozitiv	= ",	data['lowest']);
                console.log("Numarul de pasi			= ",	data['step']);
                console.log("=============================================");
                template.tables.base();
                template.tables.content(
                    ["Cel mai mic numar pozitiv","Numarul de pasi"],
                    [data['lowest'],data['step']]);
            }
        });




	};

	var ex2 = function() {

        $.ajax({
            type: "POST",
            url: 'ajax/homework1.php',
            dataType: "json",
            data: {action:'ex2'},
            success: function (data) {
                console.log("===========  Homework1 - Ex2 ================");
                console.log("Numarul de pasi	= ",		data['step']);
                console.log("Operand stanga		= ",		data['leftOperand']);
                console.log("Operand dreapta	= ",		data['rightOperand']);
                console.log("a					= ",		data['a']);
                console.log("b					= ",		data['c']);
                console.log("c					= ",		data['c']);
                console.log("=============================================");

                template.tables.base();
                template.tables.content(
                    ["Suma operand stanga","Suma operand dreapta", "Numarul de pasi","a","b","c"],
                    [data['leftOperand'], data['rightOperand'], data['step'], data['a'], data['b'], data['c']]);
            }
        });

	};
	//exercitiu 3
	var ex3 = function() {


	};

	var ex4 = function() {
		var input = $('#input'); // va retine inputul dom
		var inputContainer; // va tine inputul dat din texarea
		var regexArray; // aici va tine regulile regexului pentru array
		var regexArrayCompile;
		var n = 10; // random arary gen
		var arr = []; // random container array
		// daca exista inputu dom
		if (input.length) {
			// daca exista o valoare in input
			if(input.val().length) {
				inputContainer = input.val();
				// defineste regulele regexului pentru arrray
				// e.g [12.23,515,32,412]
				// fara spatiu
				regexArray = /[0-9]*\.?[0-9]+/g;
				regexArrayCompile = /\[([0-9]*\.?[0-9]+\,|\s?|[0-9]*\.?[0-9]+)+\]/g;
				arrayInputOutput(inputContainer, regexArray, regexArrayCompile);
			}
		}// if


		// RANDOM
		arr = util.RandomArray(n);
		console.log("===========  Homework1 - Ex4 ================");
		console.log("The random gen array ===> ",			arr);
		console.log("=============================================");

		template.tables.base();
		template.tables.content(["Parsed Array"],[arr]);
	}; // ex4

	// functie privata care se ocupa cu parsarea/validarea si afisarea array-ul de la input.
	 var arrayInputOutput = function(inputContainer, regexArray, regexArrayCompile) {
		var holder; // holder va tine rezultatul dupa exec la regex mai jos
		var n;
		var flagP = true;
		var parsedArray = []; // aici va fi array-ul parsat din input
		if (regexArrayCompile.test(inputContainer)) {
				while ((holder = regexArray.exec(inputContainer)) !== null) {
					if (isNaN((n = parseFloat(holder[0]))) === true) {
						flagP = false;
						break;
					} else {
						parsedArray.push(n);
					}
				}// while

				if (flagP === true) {
					console.log("===========  Homework1 - Ex4 ================");
					console.log("The parsed array ===> ",			parsedArray);
					console.log("=============================================");

					template.tables.base();
					template.tables.content(
						["Input array","Parsed Array"],
						[inputContainer,parsedArray]
					);
				} else {
					template.messages.red("Can't parse the corespoding array element");
					console.log("Element Array =>	", holder[0]);
				}
			} else {//regexArrayCompile
				template.messages.red("Can't parse the array");
				console.log("Input array =>	", inputContainer);
			}
	};

	// exportam toate functiile publice
	return {
		Ex1:ex1,
		Ex2:ex2,
		Ex3:ex3,
		Ex4:ex4
	};

})(templateSystem, jQuery, utils);
module.exports = homework1;
