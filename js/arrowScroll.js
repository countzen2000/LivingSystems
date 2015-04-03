arrowScroll = (function(){
	var currentPosition = 0;
	var positionArray = [
		'0',
		'2100',
		'3500',
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
			livingSys.controller.scrollTo(positionArray[currentPosition]);
			console.log(currentPosition);
		}

		var gotoPreviousMenu = function() {
			currentPosition--;
			if (currentPosition < 0)
			{
				currentPosition = 0;
			}
			livingSys.controller.scrollTo(positionArray[currentPosition]);
			console.log(currentPosition);
		}

		var init = function() {
			$(document).keydown(function(e) {
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

		return {
			init:init
		}
}())