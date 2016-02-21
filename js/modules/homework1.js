"use strict";

var templateSystem = require('./template.js');

var homework1 = (function(template, $) {
	// exercitiu 1
	var ex1 = function() {
		var u = 1;
		var lowest;
		var step=0;

		while(1+u !== 1.0) {
			u = u/10;
			step++;
			lowest = u;
		}

		console.log("===========  Homework1 - Ex1 ================");
		console.log("Cel mai mic numar pozitiv	= ",	lowest);
		console.log("Numarul de pasi			= ",	step);
		console.log("=============================================");

		template.tables.base();
		template.tables.content(
			["Cel mai mic numar pozitiv","Numarul de pasi"],
			[lowest,step]);
	};

	var ex2 = function() {
		var a = 1.0, b,c;
		var u = 1;
		var leftOperand;
		var rightOperand;
		var step = 0;
		while(1 + u !== 1.0) {
			step++;
			u = u/10;
			b = u;
			c = u;
			leftOperand = (a+b)+c;
			rightOperand =a+(b+c);
			if (leftOperand !== rightOperand) {
				break;
			}
			if (step > 20) {
				break;
			}
		}

		console.log("===========  Homework1 - Ex2 ================");
		console.log("Numarul de pasi	= ",		step);
		console.log("Operand stanga		= ",		leftOperand);
		console.log("Operand dreapta	= ",		rightOperand);
		console.log("a					= ",		a);
		console.log("b					= ",		c);
		console.log("c					= ",		c);
		console.log("=============================================");

		template.tables.base();
		template.tables.content(
			["Suma operand stanga","Suma operand dreapta", "Numarul de pasi","a","b","c"],
			[leftOperand, rightOperand, step, a, b, c]);
	};
	//exercitiu 3
	var ex3 = function() {

	};

	var ex4 = function() {
		var input = $('#input'); // va retine inputul dom
		var inputContainer; // va tine inputul dat din texarea
		var holder; // holder va tine rezultatul dupa exec la regex mai jos
		var regexArray; // aici va tine regulile regexului pentru array
		var parsedArray = []; // aici va fi array-ul parsat din input
		var n;
		var flagP = true;
		// daca exista inputu dom
		if (input.length) {
			// daca exista o valoare in input
			if(input.val().length) {
				inputContainer = input.val();
				// defineste regulele regexului pentru arrray
				// e.g [12.23,515,32,412]
				// fara spatiu
				regexArray = /[0-9]*\.?[0-9]+/g;
				while ((holder = regexArray.exec(inputContainer)) !== null) {
					console.log(holder[0]);
					if (isNaN((n = parseFloat(holder[0]))) === false) {
						flagP = false;
						break;
					} else {
						parsedArray.push(n);
					}
				}// while

				if (flagP === true) {
					console.log("The parsed array ===> ",parsedArray);
					template.tables.base();
					template.tables.content(
						["Input array","Parsed Array"],
						[inputContainer,parsedArray]
					);
				} else {
					template.messages.red("Can't parse the corespoding array");
					console.log("Can't parse this array ===>",inputContainer);
				}
			}// if
		}// if
	}; // ex4
		// // daca exista inputul
		// if(input.length){
		// 	// // daca exista o valoarea in input
		// 	// if (input.val().length) {
		// 	// 	// ia acea valoare
		// 	// 	inputContainer = input.val();
		// 	// 	// defineste regulele regexului pentru array
		// 	// 	// e. g. [12.23,512,31,412]
		// 	// 	// fara spatiu
		// 	// 	regexArray = /[0-9]*\.?[0-9]+/g;
		// 	//
		// 	// 	// while((holder = regexArray.exec(inputContainer))  !== null) {
		// 	// 	// 	if parseInt(holder[0])
		// 	// 	// 	{
		// 	// 	//
		// 	// 	// 	// }
		// 	// 	// 	// 	template.messages.red("Can't parse the coresponding array");
		// 	// 	// 	// 	break;
		// 	// 	// 	// } else {
		// 	// 	// 	// 	theActualArray.push(holder[0]);
		// 	// 	// 	// }
		// 	// 	// 	}
		// 	// 	}// if
		// 	// 	console.log(theActualArray);
		// 	} else {
		// 		template.messages.orange("Plase enter some input");
		// 	}

	// exportam toate functiile publice
	return {
		Ex1:ex1,
		Ex2:ex2,
		Ex3:ex3,
		Ex4:ex4
	};

})(templateSystem, jQuery);
module.exports = homework1;
