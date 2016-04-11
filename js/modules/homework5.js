"use strict";
var ts = require("./template.js");

var h5 = (function(template, $){

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
				homework:	5
			},	
			// procesam aici raspunsul
			success: function(data) {
				console.log("===========  Homework5 - Ex1 ================");
				console.log("Xc1\t= ",      data['resp'][0]);
				console.log("Xc1 Norm\t= ", data['norm'][0]);
                console.log("Xc2\t= ",      data['resp'][1]);
                console.log("Xc2 Norm\t= ", data['norm'][1]);
                console.log("Xc3\t= ",      data['resp'][2]);
                console.log("Xc3 Norm\t= ", data['norm'][2]);
                console.log("Xc4\t= ",      data['resp'][3]);
                console.log("Xc4 Norm\t= ", data['norm'][3]);
				console.log("=============================================");
				template.messages.green("Successfull compiled");
				template.messages.green("Check console and bottom page");
				template.tables.base();
				template.tables.content(
					["Xc1","Xc1 norm","Xc2","Xc2 norm","Xc3","Xc3 norm","Xc4","Xc4 norm"],
					[data['resp'][0],data['norm'][0],data['resp'][1],data['norm'][1],data['resp'][2],data['norm'][2],data['resp'][3],data['norm'][3]]
				);
			}
		});
	};

    return {
        Ex1: ex1,
    };

})(ts, jQuery);
module.exports = h5;
