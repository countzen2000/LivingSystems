arrowScroll = (function(){
	var currentPosition = 0;
	var positionArray = [
		'0',
		'7000',
		'13000',
		'#section4',
		'#section5',
		'#section6',
		'#section7',
		'#section8'
		]

	var gotoNextMenu = function () {
		currentPosition++;
		if (currentPosition > positionArray.length-1)
		{
			currentPosition = positionArray.length-1;
		}
		//livingSys.controller.scrollTo(positionArray[currentPosition]);
		//console.log(currentPosition);
		var targetPos = positionArray[currentPosition];
		if (isNaN(targetPos))
		{
			targetPos = $(targetPos).offset().top;
		}
		if (currentPosition < 2) {
			TweenMax.to(window, 2, {scrollTo:{y:targetPos}, ease:Power2.easeOut});
		} else {
			TweenMax.to(window, 1, {scrollTo:{y:targetPos}, ease:Power2.easeOut});
		}
	}

	var gotoPreviousMenu = function() {
		currentPosition--;
		if (currentPosition < 0)
		{
			currentPosition = 0;
		}
		//livingSys.controller.scrollTo(positionArray[currentPosition]);
		//console.log(currentPosition);
		var targetPos = positionArray[currentPosition];
		if (isNaN(targetPos))
		{
			targetPos = $(targetPos).offset().top;
		}

		if (currentPosition < 2) {
			TweenMax.to(window, 2, {scrollTo:{y:targetPos}, ease:Power2.easeOut});
		} else {
			TweenMax.to(window, 1, {scrollTo:{y:targetPos}, ease:Power2.easeOut});
		}
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
		switch (true) {
			case (location == 0):
				returnValue = 0;
				break;
			case (location > 0 && location <= positionArray[1]):
				returnValue =  1;
				break;
			case (location >= positionArray[1]-20 && location <= positionArray[2]):
				returnValue =  2;
				break;
			case (location >= positionArray[2] && location <= $(positionArray[3]).offset().top):
				returnValue = 3;
				break;
			case (location >= $(positionArray[3]).offset().top && location <= $(positionArray[4]).offset().top):
				returnValue = 4;
				break;
			case (location >= $(positionArray[4]).offset().top && location <= $(positionArray[5]).offset().top):
				returnValue = 5;
				break;
			case (location >= $(positionArray[5]).offset().top && location <= $(positionArray[6]).offset().top):
				returnValue = 6;
				break;
			case (location >= $(positionArray[6]).offset().top):
				returnValue = 7;
				break;
		}
		return returnValue;
	}

		return {
			init:init,
			positionArray:positionArray,
			whereAreYou:whereAreYou
		}
}())