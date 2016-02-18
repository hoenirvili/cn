var homework1 = (function() {

	var ex1 = function() {
		var h = 1
		var lowest;
		var step=0;
		while(1+h != 1.0) {
			h = h/10
			step++
			lowest = h;
		}
		console.log("Cel mai mic numar pozitiv ", lowest);
		console.log("Numarul de pasi ", step);
	};
	
	return {
		Ex1:ex1
	};

})();


module.exports = homework1;
