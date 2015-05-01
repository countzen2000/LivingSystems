menuSystem = (function() {
	var stickyRibbonTop;

	var init = function() {
		//For Hidden menu
		stickyRibbonTop = $('#page-header').offset().top; 

		$('#hiddenMenu').css("top", "-40px");
		$("#menu-icon").click(open);
		$("#closeMenu").click(close);

	    $(window).scroll(handleScroll);

	    $('#clients_menu').click(clicked);
	    $('#work_menu').click(clicked);
	    $('#services_menu').click(clicked);
	    $('#contact_menu').click(clicked);
	    $('#social_menu').click(clicked);
	}

	var open = function() {
			TweenLite.to($('#hiddenMenu') , 1, {autoAlpha: 1, ease: Bounce.easeOut, top: "40px", display:'block'});
			TweenLite.to($('#menu-icon') , 1, {autoAlpha: 0, ease: Bounce.easeOut, right: "-100px", display:'none'});
			//$("#hiddenMenu").css({'display':'block'});
			//$("#menu-icon").css({'display':'none'});
	}

	var close = function() {
			TweenLite.to($('#hiddenMenu') , 1, {autoAlpha: 0, ease: Bounce.easeOut, top: "-40px", display:'none'});
			TweenLite.to($('#menu-icon') , 1, {right: "30px", ease: Bounce.easeOut, autoAlpha: 1, display:'block'});
			//$("#hiddenMenu").css({'display':'none'});
			//$("#menu-icon").css({'display':'block'});
	}

	var clicked = function(event) {
		switch (event.target.id) {
			case "clients_menu":
				scrollTo(arrowScroll.positionArray[3]);
				break;
			case "work_menu":
				scrollTo(arrowScroll.positionArray[4]);
				break;
			case "services_menu":
				scrollTo(arrowScroll.positionArray[5]);
				break;
			case "contact_menu":
				scrollTo(arrowScroll.positionArray[6]);
				break;
			case "social_menu":
				scrollTo(arrowScroll.positionArray[7]);
				break;
		}
	}

	var scrollTo = function(target) {
		targetPos = $(target).offset().top;
		TweenMax.to(window, 1, {scrollTo:{y:targetPos}, ease:Power2.easeOut});
	}

	var handleScroll = function() {
		if( $(window).scrollTop() > stickyRibbonTop ) {
        	$('#page-header').css({position: 'fixed', top: '0px'});
        } else {
        	$('#page-header').css({position: 'static', top: '0px'});
        }
	}

	return {
		init:init,
		open:open,
		close:close
	}
}());