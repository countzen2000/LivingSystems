var menuSystem = (function () {
  var init = function () {
    $('#hiddenMenu').css("top", "-40px");
    $("#open_close_menu").click(open);

    $('#clients_menu').click(clicked);
    $('#work_menu').click(clicked);
    $('#services_menu').click(clicked);
    $('#contact_menu').click(clicked);
    $('#social_menu').click(clicked);
  }

  var open = function () {
    if ($("#hiddenMenu").css('display') == 'none') {
      //open
      TweenMax.to($('#hiddenMenu'), 1, {
        autoAlpha: 1,
        ease: Bounce.easeOut,
        top: "20px",
        display: 'block'
      });
      $("#menu-icon").addClass('rotate');
      $("#menu-icon").removeClass('rotate_open');
    } else {
      //close
      TweenMax.to($('#hiddenMenu'), 1, {
        autoAlpha: 0,
        ease: Bounce.easeOut,
        top: "-40px",
        display: 'none'
      });
      $("#menu-icon").addClass('rotate_open');
      $("#menu-icon").removeClass('rotate');
    }
  }

  var clicked = function (event) {
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

  var scrollTo = function (target) {
    targetPos = $(target).offset().top;
    if (arrowScroll.currentPosition == 4) {
      targetPos = targetPos + 40;
    } else if (arrowScroll.currentPosition == 5) {
      targetPos = targetPos + 100;
    }

    $('html, body').stop().animate({
      scrollTop: targetPos
    }, 2000);
  }

  return {
    init: init,
    open: open
  }
}());