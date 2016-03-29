"use strict";
var ts = require("./template.js");
/*
 * Giulitti Salvatore Elio
 */
var h4 = (function(template, $){
	var ex1 = function() {
		// trimite un POST request
		// body-ul va contine data serializata
		// json cu numarul execitiului si numarul temei
		$.ajax({
			type: 'POST',
			url: 'ajax/ajax.php',
			dataType: 'json',
			data: {
				action:	'ex1',
				homework:	4
			},
			
			// procesam aici raspunsul
			success: function(data) {
				console.log("===========  Homework4 - Ex1 ================");
				console.log("A plus B\t= ", data["aplusb"]);
				console.log("=============================================");
				template.messages.green("Successfull compiled");
				template.messages.green("Check console and bottom page");
				template.tables.base();
				template.tables.content(
					["A plus B"],
					[data["aplusb"]]
				);
			}
		});
	};

	return {
		Ex1: ex1
	};
})(ts, jQuery);

module.exports = h4;
