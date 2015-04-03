menuSystem = (function() {
	
	var init = function() {
		//For Hidden menu
		$('#hiddenMenu').css("top", "-40px");

		$("#menu-icon").click(function(){
			TweenLite.to($('#hiddenMenu') , 1, {autoAlpha: 1, ease: Bounce.easeOut, top: "40px", display:'block'});
			TweenLite.to($('#menu-icon') , 1, {autoAlpha: 0, ease: Bounce.easeOut, right: "-100px", display:'none'});
			//$("#hiddenMenu").css({'display':'block'});
			//$("#menu-icon").css({'display':'none'});
		});

		$("#closeMenu").click(function() {
			TweenLite.to($('#hiddenMenu') , 1, {autoAlpha: 0, ease: Bounce.easeOut, top: "-40px", display:'none'});
			TweenLite.to($('#menu-icon') , 1, {right: "30px", ease: Bounce.easeOut, autoAlpha: 1, display:'block'});
			//$("#hiddenMenu").css({'display':'none'});
			//$("#menu-icon").css({'display':'block'});
		});

	   var stickyRibbonTop = $('#page-header').offset().top;

	    $(window).scroll(function(){
			if( $(window).scrollTop() > stickyRibbonTop ) {
	        	$('#page-header').css({position: 'fixed', top: '0px'});
	        } else {
	        	$('#page-header').css({position: 'static', top: '0px'});
	        }
	    });
	}

	var open = function() {

	}

	var close = function() {

	}

	var clicked = function() {

	}

	var handleScroll = function() {
		
	}

	return {
		init:init,
		open:open,
		close:close
	}
}());