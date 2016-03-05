"use strict";

// Toate modulele care le vom importa in modulul dom
var ctrl 	= require('./controller.js');
var tplate 	= require('./template.js');
var utils 	= require('./util.js');

var dom = (function ($, controller, template, utils) {
	// variabile globale ale modulului
	var submitButton, 			// butonul de submit
		numberHomework, 		// numarul temei
		numberExercise, 		// numarul exercitiului
		$input = $('#input'); 	// inputul <div class="input"></div>


	// Init function care va fi singura functie exportat de modulul.
	// Initializarea modulului, pregatirea butonului de compile/submit +
	// atasarea de eventuri.
	var Init = function () {
		submitButton = ($('#button-submit').length) ? $('#button-submit') : false;
		var $homeworkSelect = ($('#numberHomework').length) ? $('#numberHomework') : false;
		var $exerciseSelect = ($('#numberExercise').length) ? $('#numberExercise') : false;
		// when document is fully loaded
		$(document).ready(function () {
			// if button exists
			if (submitButton)
				// adauga event la click, executand callbackul la onSubmit
				$(submitButton).on("click", onSubmit);
			
			if ($homeworkSelect)
				$homeworkSelect.on('change', selectChange);

			if ($exerciseSelect)
				$exerciseSelect.on('change', selectChange);
			});
	};//init

    var selectChange = function () {
		var inputs, // tempalte pentru input in functie de tema
			key, // index pentru atribute din util.inputCfg
			inp, // container pentru obiecte din util.inputCfg
			placeholder; // stocheaza atributul placeholder din util.inputCfg

		// adaugam valorile corespunzatoare
		numberHomework = $('#numberHomework').val();
		numberExercise = $('#numberExercise').val();
		// in prima faza un html gol
		$input.html("");
		// primeste configul din modulul util.
		// fiecare config e diferit pentru fiecare exercitiu in parte
		inputs = utils.inputCfg['h' + numberHomework]['ex' + numberExercise]['input'];
		// testeaza daca trebuie adaugat un cam nou.
		if (inputs) {
			for (key in inputs) {
				// stocheaza atributele x, p din obiectul input:{}
				inp = inputs[key];
				// stocheaza trageturile din atributul placeholder
				if (inp['placeholder'])
					placeholder = " placeholder='" + inp['placeholder'] + "' ";
				else
					placeholder = "";
				// daca containerul e de tip text
				if (inp['type'] === 'text')
					// introdu in html
					$input.append(
						'<label>' + key + '</label>'+
						'<input '+ placeholder + ' class="form-control" name="' + inp['name'] + '" type="' + inp['type'] + '"/>'
					);
				// daca containerul e de tip textarea
				if (inp['type'] === 'textarea')
					// introdu in html
					$input.append(
					 '<label>' + key + '</label><textarea '+placeholder+
					' class="form-control" name="' + inp['name'] + '"></textarea>'
					);
			}// for
		}// if
	};// function

	// cand s-a dat click pe buttonul de submit
	var onSubmit = function () {
		if ($('.table-container').length)
			$('.table-container').remove();
			// stoccheaza doar variabilele
		numberHomework = $('#numberHomework').val();
		numberExercise = $('#numberExercise').val();
		// daca sunt valori 
		if (numberExercise && numberHomework) {
			// executa controllerul
			controller.fn(numberHomework, numberExercise, template);
		} else {
			// afiseaza un mesaj corespunzator
			template.messages.orange("Please set exercise number and homework");
		}
    };

	return {
		Init: Init
	};
	
// importa toate modulele de sus de care am dat require
})(jQuery, ctrl, tplate, utils);

// exportam modulul dom
module.exports = dom;
