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
		var input = $('#input');
		var inputContainer;
		if (input.length)
			if (input.val().length) {
				inputContainer = input.val();
				var re = /\[+(([0-9]*\.[0-9]+|[0-9]+)\,*)+\]/g;
				var str = '[1,2312,3123123,0]';
				var m;
				// (TODO)make this work validate arrays.
				while ((m = re.exec(str)) !== null) {
    				if (m.index === re.lastIndex) {
        			re.lastIndex++;
					console.log(re.lastIndex);
					}
				}
			}
			else
				template.messages.orange("Plase enter some input");
	};

	// exportam toate functiile publice
	return {
		Ex1:ex1,
		Ex2:ex2,
		Ex3:ex3,
		Ex4:ex4
	};

})(templateSystem, jQuery);
module.exports = homework1;
