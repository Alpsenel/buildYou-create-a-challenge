$(document).ready(function() {
    $("#preview").hide();
 $("#mostra").click(function(){
 $("#riga-up").hide();
 $("#preview").show();
 });
 
 $("#nascondi").click(function(){
 $("#riga-up").show();
 $("#preview").hide();
 });
});

var navFirst = $('.navFirst');
var navSecond = $('.navSecond');
var navThird = $('.navThird');

$(navFirst).click(function(){
	$(navFirst).nextAll('a').css({'background-color': 'rgba(254,87,33,0.6)'});
});

function check_year(){
	var selectedDate = new Date($('#example-date-input').val());
	var currentDate = new Date();

	if(selectedDate < currentDate){
		return 'false';
	} else if ( selectedDate == 'Invalid Date'){
		return 'empty'
	} else  {
		return true;
	}
}

function input_control (){
	if ( $('.inputTitle').val() && $('.inputDesc').val() && $('.inputTags').val() != '' && 
		$('#exampleFormControlSelect1 option:checked').val() != 'choose a category') {
		return true;
	} else {
		return false;
	}
}

function checkInputs() {
	if (check_year() == true && input_control() == true ) {
		return true;
	} else if ( input_control() == true && check_year() == 'false' ) {
		return 'oldYear';
	} else if ( input_control() == true && check_year() == 'empty'){
		return 'emptyYear'
	} else if ( input_control() == false && check_year() == true){
		return 'emptyInput'
	} else {
		return false;
	}
}

function date_changed(){
	if (input_control() == true) {
		if (check_year() == true) {
			return true;
		}
	}
}

function skill_select(){
	//var numberOfSkills = $('input[type=checkbox]');
	//for (var i = 0; i < numberOfSkills.length; i++){
	//	if($(numberOfSkills[i]).val() == 'on'){
	//		return true;
	//	} else {
	//		return false;
	//	}
	//}
	if ($( "input[type=checkbox][name=checkBox1]:checked" ).val() || $( "input[type=checkbox][name=checkBox2]:checked" ).val() || $( "input[type=checkbox][name=checkBox3]:checked" ).val() || $( "input[type=checkbox][name=checkBox4]:checked" ).val() || $( "input[type=checkbox][name=checkBox5]:checked" ).val() || $( "input[type=checkbox][name=checkBox6]:checked" ).val() || $( "input[type=checkbox][name=checkBox7]:checked" ).val() || $( "input[type=checkbox][name=checkBox8]:checked" ).val() || $( "input[type=checkbox][name=checkBox9]:checked" ).val() == 'on'){
			return true;
		} else {
			false;
		}
}

$('#example-date-input').change(function(){
	if(date_changed() == true){
		var challengeDeadline = $('#example-date-input').val();
		var stepsDeadline = $('.stepsChallengeDeadline');
		stepsDeadline.text(challengeDeadline);
		navFirst.removeClass('active');
		navFirst.prop( 'aria-selected', false );
		var info = $('#information');
		info.removeClass('active show');
				
		var skills = $('#skills');
		skills.addClass('active show');
		navSecond.prop('aria-selected', true);
		navSecond.addClass('active'); 
		$(navSecond).prev('a').css('background', 'var(--main)');
		$(navSecond).css('background', 'var(--main)');
		
	}
	else {
			console.log('something went wrong');
	} 
});

$(navSecond).click(function(){
	if (checkInputs() == true ){
		console.log('everything ok!');
		navSecond.prop('disabled', false);
		$(navSecond).css( { 'background-color' : 'var(--main)' } );
		$(navSecond).prev('a').css( { 'background-color' : 'var(--main)' } );
		$(navSecond).next('a').css(  'background-color' , 'rgba(254, 87, 33, 0.6)'  );
	} else if(checkInputs() == 'oldYear') {
		console.log('year must be greater than current date !');
		navSecond.prop('disabled', true);
	} 
	else if(checkInputs() == 'emptyYear') {
		console.log('year must not be empty !');
		navSecond.prop('disabled', true);
	} 
	else if(checkInputs() == 'emptyInput') {
		console.log('inputs must not be empty !');
		navSecond.prop('disabled', true);
	} else {
		console.log('please fill the inputs');
		navSecond.prop('disabled', true);
	}
});

$(navThird).click(function(){
	if (skill_select() == true){
		$(navThird).prevAll('a').css('background-color', 'var(--main)' );
		$(navThird).css( { 'background-color' : 'var(--main)' , 'color' : 'white' } );
		console.log('everything ok in skills!');
		navThird.prop('disabled', false);
	} else {
		console.log('please select at least 1 skill !');
		navThird.prop('disabled', true);
	}
});

var addStep = $('.btnAnotherStep');

function steps_date_check_and_compare () {
	var stepDate = $('#example-date-input-steps');
	var givenDate = $('#example-date-input');
	
	var step =new Date(stepDate.val());
	var given = new Date(givenDate.val());
	var curTime = new Date();
	
	if(given < step || curTime > step){
		return 'old';
	} else if ( stepDate.val() == ''){
		return 'empty';
	} else {
		return true;
	}
}

function steps_input_check (){
	var title = $('#stepsTitle').val();
	var desc = $('#stepsDesc').val();
	
	if ( title && desc != ''){
		return true;
	} else {
		return 'emptyInputs';
	}
}

//$('#stepsTitle').change(function(){
//	var titleValue =  $('#stepsTitle').val();
//	if(titleValue ==''){
//		addStep.css('opacity', 0.6);
//	} 
//});
//
//$('#stepsDesc').change(function(){
//	var descValue = $('stepsDesc').val();
//	if($('#stepsTitle').val() != ''){
//		if(descValue ==)
//	}
//});

$('#example-date-input-steps').change(function(){
	var stepDate = $('#example-date-input-steps');
	var givenDate = $('#example-date-input');
	
	var step =new Date(stepDate.val());
	var given = new Date(givenDate.val());
	var currentTime = new Date();
	if (step < given && steps_input_check() == true  && currentTime < step){
		addStep.css('opacity', 1);
		console.log('date is entered last and inputs were filled');
	} else {
		console.log('date is entered last but something missing');
		addStep.css('opacity', 0.6);
	}
});

function steps_date_input_check (){
	if ( steps_date_check_and_compare() == true && steps_input_check() == true){
		return true;
	} else if ( steps_input_check() == true && steps_date_check_and_compare() == 'old') {
		return 'date';
	} else if (steps_input_check() == true && steps_date_check_and_compare() == 'empty') {
		return 'emptyDate';
	} else {
		return 'inputsEmpty';
	}
}




var stepCount = 2;

$('.btnAnotherStep').click(function(){
	anotherStep();					   
});


var anotherStep = function(){
	if(steps_date_input_check() == true){
		console.log('everythink ok for step title, desc and date is smaller than selected date in the information panel');
		addStep.css('opacity',1);
		
		var $wrapper = $('<div>', { 
		'class': 'inputsWrapper'
		}).appendTo('#inputContentWrapper');
		
		if(stepCount < 11 ){
			$( '<div>', { 'class': 'row',
					'html' : $('<div>', { 'class': 'col-12', 
										 'html' : $('<div>', { 'class': 'input-group', 
														'html' : $('<input>', {
																	id: 'stepsInput' + stepCount,
							 										'class' : 'form-control',
							 										'type': 'text',
							 										'placeholder': 'insert step ' +stepCount+' title*'})
															 })})
			}).appendTo($wrapper);
			
			$( '<div>', { 'class': 'row',
					'html' : $('<div>', { 'class': 'col-12', 
										 'html' : $('<div>', { 'class': 'input-group', 
														'html' : $('<textarea>', {
																	id: 'stepsDesc' + stepCount,							 									
							 										'cols': 40,
																	'rows' : 5,
							 										'placeholder': 'insert step ' +stepCount+' description'
									})})})
			}).appendTo($wrapper);
			
			//$('#stepsDesc'+stepCount).css('margin-bottom', '15px');
			
		 	$('<div>', {id:'stepsP'+stepCount , 'class': 'row', 
						'html': $('<div>', {'class' : 'col-8', 'html': $('<p>').text('is this the last step of the challenge?')})}).appendTo($wrapper);
			$('<div>', {id:'stepsLabelArea'+ stepCount, 'class': 'col-4', 'html':
						$('<div>', {'class': 'form-check form-check-inline', 'html':
								   $('<label>', {id:'stepsLabel1'+stepCount, 'class': 'form-check-label'
												})//label
								   })//form-check-div
					   }).appendTo('#stepsP'+stepCount);//col-4 area
			
			var stepsRadioBtn = $('<input>', {'class': 'form-check-input','name': 'inlineRadioOptions' ,'value': '', 'type': 'radio', id: 'inlineRadio1'+stepCount});
			$('#stepsLabel1'+stepCount).text('yes');
			stepsRadioBtn.appendTo('#stepsLabel1'+stepCount).addClass('stepsRadioButtons');
			
			
		
						$('<div>', {'class': 'form-check form-check-inline', 'html':
								   $('<label>', {id:'stepsLabel2'+stepCount, 'class': 'form-check-label'
												})//label
								   }).appendTo('#stepsLabelArea'+stepCount);//form-check-div
			
			var stepsRadioBtn = $('<input>', {'class': 'form-check-input','name': 'inlineRadioOptions' , 'type': 'radio','value': '' ,id: 'inlineRadio2'+stepCount});
			
			$('#stepsLabel2'+stepCount).text('no');
			stepsRadioBtn.appendTo('#stepsLabel2'+stepCount).addClass('stepsRadioButtons');
			
			//$('<p>', {'class' : 'pAfterRadio'}).text('please make a choice for last step').appendTo($wrapper);
			
			var $dateInput = $('<div>', {
				'class': 'row', 
				'html':$('<div>', {
								'class': 'col-12',
								'html': $('<div>', {
									'class': 'input-group', 
									'html':  $('<input>', {
										'type': 'date', 
										'class': 'form-control', 
										'placeholder': 'insert step ' +stepCount+' date', 
										id: 'dateInput'+stepCount
										})//date input
									})//input-group
								})//col-12
							});//row
			//var $calendarIcon =$('<button>', {'class': 'btn','html':  $('<i>', {
			//'class': 'fa fa-calendar', 'aria-hidden': true
			//})
			//});
			//$calendarIcon.appendTo($dateInput);
			
			var $anotherStepRow = $('<div>', {id:'addAnotherStep'+stepCount,'class': 'row'});
			
			var $anotherStepRowBtn = $('<div>', {'class': 'col-6', 'html': $('<button>', {
														id: 'addAnotherStep'+stepCount,
														'class': 'btn',
														'type': 'button',
														text : 'add another step'
													})//button
												}).appendTo($anotherStepRow);
			var $anotherStepRowSubStep = $('<div>', {'class': 'col-6', 'html': $('<h6>', {
														'data-toggle': 'modal',
														'data-target': '#add-substep',
														text: 'do you need a more detailed path?   add substeps within this step!'
														})									
													}).appendTo($anotherStepRow);
			$anotherStepRow.css('margin-top','15px');
			
			
			
			
			
	$(`#stepsLabel1${stepCount} input[name='inlineRadioOptions'], #stepsLabel2${stepCount} input[name='inlineRadioOptions']`).change(function(){
					var checking = $('#inlineRadio1'+(stepCount-1)).is(':checked');
					console.log(stepCount);
					if (checking == true){
						console.log('checked radio button is inlineRadio1'+(stepCount-1) + ' and the value is yes');
						
						$('#stepsP'+(stepCount-1)).hide();
						$dateInput.appendTo('#inputContentWrapper');
						var givenDate = $('#example-date-input').val();
						$('#dateInput'+(stepCount-1)).val(givenDate);
						$('#dateInput'+(stepCount-1)).prop('disabled', true);
						
						
						
					} else {
						console.log('checked radio button is inlineRadio2'+(stepCount-1) + ' and the value is no');
						$('#stepsP'+(stepCount-1)).hide();
						$dateInput.appendTo('#inputContentWrapper');		
						$anotherStepRow.appendTo('#inputContentWrapper');
					}
				});
			
		
			
		stepCount++;
		} else {
			console.log('You can create max 10 steps !')
		}
		

		
	} else if ( steps_date_input_check() == 'date'){
		console.log('selected date for step should not be greater than selected date!');
		addStep.css('opacity',0.6);
	} else if (steps_date_input_check() == 'emptyDate'){
		console.log('please select a date for your step deadline');
		addStep.css('opacity',0.6);
	} else {
		console.log('please fill all the input areas');
		addStep.css('opacity',0.6);
	}
}

function check_existince() {
	if( $('#addAnotherStep'+(stepCount-1)) ){
		//	anotherStep();
		return true;
	} else {
		return false;
	}
}

$('.btnDone').click(function(){
	console.log('dsaf');
});



//LATER
//function check_inputs_before_step_button (){
//	var $stepBtn = $('.btnAnotherStep');
//	var $stepsTitle = $stepBtn.prev('input[type=text]');
//	var $stepsDesc = $stepBtn.prev('textarea');
//	var $stepsDate = $stepBtn.prev('input[type=date]');
//	var $newBtnRow = $('#recursive');
//		
//	var $wrapper = $('#inputContentWrapper');
//	
//	if ($stepsTitle.val() || $stepsDesc.val() || $stepsDate.val() != ''){
//		
//		$stepsTitle.appendTo($wrapper);
//		$stepsDesc.appendTo($wrapper);
//		$stepsDate.appendTo($wrapper);
//		$newBtnRow.appendTo($wrapper);
//		
//	}else {
//		alert('please fill all the neccessary fields');
//	}
//}
//


















