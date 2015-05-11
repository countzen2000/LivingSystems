arrowScroll = (function(){
	var currentPosition = 0;
	var positionArray = [
		0,
		4000,
		10000,
		'#section4',
		'#section5',
		'#section6',
		'#section7',
		'#section8'
		]

	var gotoNextMenu = function () {
		
		currentPosition = Math.min(whereAreYou()+1, 7);
		
		var targetPos = positionArray[currentPosition];
		if (typeof targetPos  != 'number')
		{
			target = $(targetPos).offset().top;
		} else {
			target = targetPos;
		}
		console.log(target)

		$('html, body').animate({ scrollTop: target }, 750);
	}

	var gotoPreviousMenu = function() {
		
		currentPosition = Math.max(whereAreYou()-1, 0);
		
		var targetPos = positionArray[currentPosition];
		if (typeof targetPos  != 'number')
		{
			target = $(targetPos).offset().top;
		}

		$('html, body').animate({ scrollTop: target }, 750);
	}

	var init = function() {
		$(document).keydown(function(e) {
			currentPosition = whereAreYou();
		    switch(e.which) {
		        case 38: // up
		        	gotoPreviousMenu();
		        	break;

		        case 40: // down
		        	gotoNextMenu();
        			break;

		        default: return; // exit this handler for other keys
		    }
		    e.preventDefault(); // prevent the default action (scroll / move caret)
		});
	}

	var whereAreYou = function() {
		var location = $(window).scrollTop();
		console.log(location)
		var returnValue;
		//if (location <= 0) {
	//		returnValue = 0;
		//} else if (location <= positionArray[1]) {
		if (location <= positionArray[1]) {
			returnValue = 0;
		} else if (location <= positionArray[2]) {
			returnValue = 1;
		} else if (location <= $(positionArray[3]).offset().top) {
			returnValue = 2;
		} else if (location <= $(positionArray[4]).offset().top) {
			returnValue = 3;
		}  else if (location <= $(positionArray[5]).offset().top) {
			returnValue = 4;
		} else if (location <= $(positionArray[6]).offset().top) {
			returnValue = 5;
		} else {
			returnValue = 6;
		}

		console.log(returnValue)

		return returnValue;
	}

		return {
			init:init,
			positionArray:positionArray,
			whereAreYou:whereAreYou
		}
}())