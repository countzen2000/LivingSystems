livingSys = (function() {
	
	var controller = new ScrollMagic.Controller();
	var scrollLocation = [];

	var setupAnimation = function() {

		// build scene
		var PinText1 = new ScrollMagic.Scene({})
						.setPin("#section1")
						.addTo(controller);
		PinText1.addIndicators();

		var tween1 = new TimelineMax()
			.add(
				TweenMax.to("#pin1", 1, {"alpha":0, top: "-=25"})
			)
			.add(
				TweenMax.to("#section1", 1.5, {transformOrigin: "50% 50% 0", scale: .75, alpha:0})
			).add(
				TweenMax.from("#section2", .75, {transformOrigin: "50% 50% 0", scale: 1.5, alpha:0}, '-1')
			)

		var fadeOutText1 = new ScrollMagic.Scene({offset: 200, duration: 6000})
						.setTween(tween1)
						.addTo(controller);
		fadeOutText1.addIndicators();

		var PinScene2 = new ScrollMagic.Scene({})
					.setPin("#section2")
					.addTo(controller);
		PinScene2.addIndicators();

		var tween2 = new TimelineMax()
			.add(
				TweenMax.fromTo("#pin2", 1, {"alpha":0, top: "-=25"}, {"alpha":1, top: "50%"})
			)
			.add (
				TweenMax.to("#pin2", 2, {})
			)
			.add(
				TweenMax.to("#pin2", 1, {"alpha":0, top: "-=25"})
			)
			.add(
				TweenMax.to("#section2", 1.5, {transformOrigin: "50% 50% 0", scale: .75, "alpha":0})
			).add(
				TweenMax.from("#section3", .75, {transformOrigin: "50% 50% 0", scale: 1.5, alpha:0})
			)

		var fadeOutText2 = new ScrollMagic.Scene({offset: 6200, duration: 6000})
						.setTween(tween2)
						.addTo(controller);
		fadeOutText2.addIndicators();

		var PinScene3 = new ScrollMagic.Scene()
					.setPin("#section3")
					.addTo(controller);
		PinScene3.addIndicators();

		var tween3 = new TimelineMax()
			.add(
				TweenMax.fromTo("#pin3", 1, {"alpha":0, top: "-=25"}, {"alpha":1, top: "50%"})
			)
			.add (
				TweenMax.to("#pin3", 2, {})
			)
			.add(
				TweenMax.to("#pin3", 1.5, {"alpha":0, top: "-=25"})
			).add(
				TweenMax.to("#section3", .75, {"alpha":0})
			)

		var fadeOutText3 = new ScrollMagic.Scene({offset: 12200, duration: 6000})
						.setTween(tween3)
						.addTo(controller);
		fadeOutText3.addIndicators();

	}

	var onResize = function() {

		//Fix for section 5
		var container = $("#section5_top");
		var work_container = $("#work-list-container");
		var parent = container.parent();

		container.offset({top:parent.offset().top + parent.height()/2 - container.height()/2-50});
		work_container.offset({top:parent.offset().top +parent.height() - 470});

	}

	var realign = function() {
		//$('#section6').height($('#section6').height() + 50);

		$('#section4').offset({top: 18200});
		$('#section5').offset({top: $('#section4').offset().top + $('#section5').height()});
		$('#section6').offset({top: $('#section5').offset().top + $('#section6').height()+50});
		$('#section7').offset({top: $('#section6').offset().top + $('#section7').height()});
		$('#section8').offset({top: $('#section7').offset().top + $('#section8').height()});
		
		var section4 = $('#section4').offset().top;
		$('#page-header').offset({top: section4});
	}

/******public functioncs *****/
	var init = function() {
		setupAnimation();
		realign();

		/* Scrolling stuff ======================================================== */
		controller.scrollTo(function (newpos) {
			console.log("what in the world?!"+newpos);
			TweenMax.to( window, 2,
					{
						scrollTo: { y: newpos },
						ease: Cubic.easeInOut,
						autoKill: false
					}
				);
		});
		/* Scrolling stuff ======================================================== */

		/*** resizing stuff **/

		$(window).resize(onResize);
		onResize();
	}

	return {
		init: init,
		controller: controller
	};
}());