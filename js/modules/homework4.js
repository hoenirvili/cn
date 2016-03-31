"use strict";
var ts = require("./template.js");

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

    var ex2 = function() {

        $.ajax({
            type: 'POST',
            url: 'ajax/ajax.php',
            dataType: 'json',
            data: {
                action:	'ex2',
                homework:	4
            },
            // procesam aici raspunsul
            success: function(data) {
                console.log("===========  Homework4 - Ex2 ================");
                console.log("A x B\t= ", data["aorib"]);
                console.log("=============================================");
                template.messages.green("Successfull compiled");
                template.messages.green("Check console and bottom page");
                template.tables.base();
                template.tables.content(
                    ["A x B"],
                    [data["aorib"]]
                );
            }
        });

    };
    var ex3 = function() {

        $.ajax({
            type: 'POST',
            url: 'ajax/ajax.php',
            dataType: 'json',
            data: {
                action:	'ex3',
                homework:	4
            },
            // procesam aici raspunsul
            success: function(data) {
                console.log("===========  Homework4 - Ex3 ================");
                console.log("A * x\t= ", data["axb"]);
                console.log("=============================================");
                template.messages.green("Successfull compiled");
                template.messages.green("Check console and bottom page");
                template.tables.base();
                template.tables.content(
                    ["A * x"],
                    [data["axb"]]
                );
            }
        });

    };
    return {
        Ex1: ex1,
        Ex2: ex2,
        Ex3: ex3
    };

})(ts, jQuery);

module.exports = h4;
