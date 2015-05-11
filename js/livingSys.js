livingSys = (function() {
	
	var controller = new ScrollMagic.Controller();
	var scrollTime = 2.0;
	var scrollDistance = 170;

	var setupAnimation = function() {

		// build scene
		var PinText1 = new ScrollMagic.Scene({})
						.setPin("#section1")
						.addTo(controller);
		//PinText1.addIndicators();

		var tween1 = new TimelineMax()
			.add(
				TweenMax.to("#pin1", 1, {"alpha":0, top: "-=100"})
			)
			.add(
				TweenMax.to("#section1", 1.5, {transformOrigin: "50% 50% 0", scale: .75, alpha:0})
			).add(
				TweenMax.from("#section2", .75, {transformOrigin: "50% 50% 0", scale: 1.5, alpha:0}, '-1')
			)

		var fadeOutText1 = new ScrollMagic.Scene({offset: 200, duration: 3000})
						.setTween(tween1)
						.addTo(controller);
		//fadeOutText1.addIndicators();

		var PinScene2 = new ScrollMagic.Scene({})
					.setPin("#section2")
					.addTo(controller);
		//PinScene2.addIndicators();

		var tween2 = new TimelineMax()
			.add(
				TweenMax.fromTo("#pin2", 1, {"alpha":0, top: "-=100"}, {"alpha":1, top: "50%"})
			)
			.add (
				TweenMax.to("#pin2", 2, {})
			)
			.add(
				TweenMax.to("#pin2", 1, {"alpha":0, top: "-=100"})
			)
			.add(
				TweenMax.to("#section2", 1.5, {transformOrigin: "50% 50% 0", scale: .75, "alpha":0})
			).add(
				TweenMax.from("#section3", .75, {transformOrigin: "50% 50% 0", scale: 1.5, alpha:0})
			)

		var fadeOutText2 = new ScrollMagic.Scene({offset: 3200, duration: 6000})
						.setTween(tween2)
						.addTo(controller);
		//fadeOutText2.addIndicators();

		var PinScene3 = new ScrollMagic.Scene()
					.setPin("#section3")
					.addTo(controller);
		//PinScene3.addIndicators();

		var tween3 = new TimelineMax()
			.add(
				TweenMax.fromTo("#pin3", 1, {"alpha":0, top: "-=100"}, {"alpha":1, top: "50%"})
			)
			.add (
				TweenMax.to("#pin3", 2, {})
			)
			.add(
				TweenMax.to("#pin3", 1.5, {"alpha":0, top: "-=100"})
			).add(
				TweenMax.to("#section3", .75, {"alpha":0})
			)

		var fadeOutText3 = new ScrollMagic.Scene({offset: 9200, duration: 2000})
						.setTween(tween3)
						.addTo(controller);
		//fadeOutText3.addIndicators();

	}

	var onSection4MouseOver = function(event) {
		if ($("#Section4Description_next").css("opacity") == 1) {
			previous = $("#Section4Description_next");
			next = $("#Section4Description");	
		} else {
			next = $("#Section4Description_next");
			previous = $("#Section4Description");	
		}
		

		//previous.appendHtml(next.html());
		target = previous.offset().top;
		TweenMax.to(previous, 1, {top: -100, alpha:0});
		next.offset({top: next.offset().top + next.height()});
		next.css("display","block");
		next.css("opacity","0");
		TweenMax.to(next, 1, {top:0, alpha:1});
	}

	var onResize = function() {
		
		realign();
		redraw();
		realign();
	}

	var realign = function() {
		//$('#section6').height($('#section6').height() + 50);
		//$('#section8').height(600);
		$('#section4').offset({top: 11200});
		$('#section5').offset({top: $('#section4').offset().top + $('#section5').height()});
		$('#section6').offset({top: $('#section5').offset().top + $('#section6').height()});
		$('#section7').offset({top: $('#section6').offset().top + $('#section7').height()});
		$('#section8').offset({top: $('#section7').offset().top + $('#section8').height() + 300});
		
		//var section4 = $('#section4').offset().top;
		//$('#page-header').offset({top: section4});
	}

	var redraw = function() {
		//This whole section is a bit hacky

		//for works section
		source = $('.work-list > li');

		source.height(source.height() * .99);

		target = $('.works-effect > .overlay');

		target.height(source.height() * .99);
		target.width(source.width());

		//Fix for section 5
		//var container = $("#section5_top");
		//var work_container = $("#work-list-container");

		//var parent = container.parent();

		//container.offset({top:parent.offset().top + parent.height()/2 - container.height()/2- parent.height()*.1});
		//work_container.offset({top:parent.offset().top + parent.height() - work_container.height()*.8});


	}

/******public functioncs *****/
	var init = function() {
		setupAnimation();

		/*$(window).on("mousewheel DOMMouseScroll", function(event){

			event.preventDefault();	

			var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
			var scrollTop = $(window).scrollTop();
			var finalScroll = scrollTop - parseInt(delta*scrollDistance);

			TweenMax.to($(window), scrollTime, {
				scrollTo : { y: finalScroll, autoKill:true },
					ease: Power1.easeOut,
					overwrite: 5							
				});

		});*/

		/**Mouse over stuff **/
		//$(".client-list img").mouseover(onSection4MouseOver);

		/*** resizing stuff **/
		$(window).resize(onResize);
		setTimeout(onResize, 500);
		//Hack!! Fix this later
		setTimeout(redraw, 1000);
		setTimeout(function(){window.scrollTo(0,0)}, 1001);
	}

	return {
		init: init,
		controller: controller
	};
}());