"use strict";

var ctrl = require('./controller.js');
var tplate = require('./template.js');
var utils=require('./util.js');
var h1=require('./homework1.js');
var $input= $('#input');
var dom = (function($, controller, template,utils,h1) {
	var submitButton;
	// keep only the vals
	var numberHomework;
	var numberExercise;

	// init function
	var Init = function() {
		submitButton = ($('#button-submit').length)?$('#button-submit'): false;
        var $homeworkSelect = ($('#numberHomework').length)?$('#numberHomework'): false;
        var $exerciseSelect = ($('#numberExercise').length)?$('#numberExercise'): false;
		// when document is fully loaded
		$(document).ready( function() {
			// if button exists
			if(submitButton)
				// attatch event
				$(submitButton).on("click", onSubmit);

            if($homeworkSelect)
                $homeworkSelect.on('change',selectChange)

            if($exerciseSelect)
                $exerciseSelect.on('change',selectChange)
		});
	};//init

    var selectChange=function()
    {
        console.log(utils);
        numberHomework = $('#numberHomework').val();
        numberExercise = $('#numberExercise').val();
        $input.html("");
        var inputs=utils.inputCfg['h'+numberHomework]['ex'+numberExercise]['input'];
        //console.log(inputs);
        if(inputs)
        {
            for( var key in inputs)
            {
                var inp=inputs[key];
                if(inp['type']=='text')
                {
                    $input.append('<label>'+key+'</label><input class="form-control" name="'+inp['name']+'" type="'+inp['type']+'"/>')
                }
                if(inp['type']=='textarea')
                {
                    $input.append('<label>'+key+'</label><textarea class="form-control" name="'+inp['name']+'"></textarea>')
                }
            }
        }
    }

	// when button has been submited
	var onSubmit = function() {
		if ($('.table-container').length)
			$('.table-container').remove();
		// keep only the vals
		numberHomework = $('#numberHomework').val();
		numberExercise = $('#numberExercise').val();
		if (numberExercise && numberHomework) {
			controller.fn(numberHomework, numberExercise, template);
		} else {
			template.messages.orange("Please set exercise number and homework");
		}
	};


	return {
		Init: Init
	};

})(jQuery, ctrl, tplate,utils,h1);


module.exports = dom;
