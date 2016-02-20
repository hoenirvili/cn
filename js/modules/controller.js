var h1 = require('./homework1');
var h2 = require('./homework2.js');

// here we import all our homeworks modules
var controller = (function (h1, h2) {
	var fn = function(nH, nX, template){
		switch(nH) {
			case '1':
				switch(nX) {
					case '1':
						h1.Ex1();
						template.messages.green("Successfull compiled");
						template.messages.green("Check console and bootom page");
						break;
					case '2':
						template.messages.green("Successfull compiled");
						template.messages.green("Check console and botom page");
						h1.Ex2();
						break;
					case '3':
					case '4':
						template.messages.orange("This exercise is not implemented yet");
						break;
				}
				break;
			case '2':
			case '3':
			case '4':
			case '5':
				template.messages.orange("This homework is not implemented yet");
				break;
		}
	};
	return {
		fn : fn
	};

})(h1,h2);

module.exports = controller;
