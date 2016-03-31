"use strict";
var h1 = require('./homework1.js');
var h2 = require('./homework2.js');
var h3 = require("./homework3.js");
var h4 = require("./homework4.js");

// here we import all our homeworks modules
var controller = (function (h1, h2, h3, h4) {
	var fn = function(nH, nX, template){
		switch(nH) {
			// tema 1
			case '1':
				switch(nX) {
					case '1':
						h1.Ex1();
						break;
					case '2':
						h1.Ex2();
						break;
					case '3':
						h1.Ex3();
						break;
					case '4':
						h1.Ex4();
						break;
				}
				break;
			// tema 2
			case '2':
				switch (nX) {
					case '1':
						h2.Ex1();
						break;
					case '2':
						h2.Ex2();
						break;
					case '3':
						h2.Ex3();
						break;
					case '4':
                        h2.Ex4();
						break;
				}
				break;
			// tema 3
			case '3':
				switch(nX) {
					case '1':
						h3.Ex1();
						break;
					case '2':
						h3.Ex2();
						break;
					case '3':
					template.messages.orange("This homework is not implemented yet");
					break;
				}
			break;
			// tema 4
			case '4':
				switch(nX) {
					case '1':
						h4.Ex1();
						break;
                    case '2':
                        h4.Ex2();
                        break;
                    case '3':
                        h4.Ex3();
                        break;

				}
			break;
			// tema 5
			case '5':
				template.messages.orange("This homework is not implemented yet");
				break;
			case '6':
				template.messages.orange("This homework is not implemented yet");
				break;
			case '7':
				template.messages.orange("This homework is not implemented yet");
				break;
			case '8':
				template.messages.orange("This homework is not implemented yet");
				break;
		}
	};

	//exportam toate functiile, obiectele publice
	return {
		fn : fn
	};

})(h1,h2,h3, h4);

module.exports = controller;
