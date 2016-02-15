var h1 = require('./homework1');


// here we import all our homeworks modules
var controller = (function (h1) {

	var fn = function(nH, nX, echo){
		switch(nH) {
			case '1':
				switch(nX) {
					case '1':
						h1.Init();
						break;
					case '2':
					case '3':
					case '4':
						echo.orange("This exercise is not implemented yet");
						break;
				}
				break;
			case '2':
			case '3':
			case '4':
			case '5':
				echo.orange("This homework is not implemented yet");
				break;
		}
	};

	return {
		fn : fn
	};

})(h1);

module.exports = controller;
