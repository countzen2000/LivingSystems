var livingSys = (function () {
  var onSection4MouseOver = function (event) {
    if ($("#Section4Description_next").css("opacity") == 1) {
      previous = $("#Section4Description_next");
      next = $("#Section4Description");
    } else {
      next = $("#Section4Description_next");
      previous = $("#Section4Description");
    }

    target = previous.offset().top;
    TweenMax.to(previous, 1, {
      top: -100,
      alpha: 0
    });
    next.offset({
      top: next.offset().top + next.height()
    });
    next.css("display", "block");
    next.css("opacity", "0");
    TweenMax.to(next, 1, {
      top: 0,
      alpha: 1
    });
  }

  var onResize = function () {

    redraw();
    realign();
    refreshBackgrounds(".section4");
    refreshBackgrounds(".section5");
    refreshBackgrounds(".section6");
    refreshBackgrounds(".section7");
    refreshBackgrounds(".section8");
  }

  var realign = function () {
    $("#section4").offset({
      top: $("#intro-container").height() - 0
    });
    $("#section5").offset({
       //That's a little hacky
      top: $("#section4").offset().top + $("#section5").height() - 10
    });
    $("#section6").offset({
      top: $("#section5").offset().top + $("#section6").height()
    });
    $("#section7").offset({
      top: $("#section6").offset().top + $("#section7").height()
    });

    $("#section8").offset({
      top: $("#section7").offset().top + $("#section8").height() + 300
    });

  }

  var redraw = function () {
    //This whole section is a bit hacky

    //for works section
    var source = $(".work-list > li");

    source.height(source.height() * .99);

    var target = $(".works-effect > .overlay");

    target.height(source.height() * .99);
    target.width(source.width());

  }

  var initQuotes = function () {
    var quotes = $(".quote");
    var clientList = $(".client-list li");

    clientList.each(function () {
      $(this).on("mouseenter touchend", function (e) {
        var index = $(this).index();
        console.log(e + " : " +index);
        //I should probably put this away somewhere
        //and 0 = 0
        if (index === 2) {
          index = 1;
        }
        if (index === 4) {
          index = 2;
        }
        
        if (index === 6) {
          index = 3;
        }
        var incomingQuote = quotes.eq(index);
        console.log(incomingQuote);
        if (incomingQuote.css("opacity") == 0) {
          TweenMax.fromTo(incomingQuote, 0.35, {
            opacity: 0,
            top: 100
          }, {
            opacity: 1,
            top: 0
          });
          TweenMax.to(incomingQuote.siblings(), 0.35, {
            opacity: 0,
            top: -30
          });
        }
      });
    });

    quotes.first().css("opacity", 1);
  }

  var refreshBackgrounds = function (selector) {
    // Chrome shim to fix http://groups.google.com/a/chromium.org/group/chromium-bugs/browse_thread/thread/1b6a86d6d4cb8b04/739e937fa945a921
    // Remove this once Chrome fixes its bug.
    if (/chrome/.test(navigator.userAgent.toLowerCase())) {
      $(selector).each(function () {
        var $this = $(this);
        if ($this.css("background-image")) {
          var oldBackgroundImage = $this.css("background-image");
          setTimeout(function () {
            $this.css("background-image", oldBackgroundImage);
          }, 1);
        }
      });
    }
  };

  var handleWorkClick = function () {
    $(".works-effect").click(function (e) {
      console.log(e.target.src.indexOf("hudson"));
      if (e.target.src.indexOf("hudson") > 0) {
        window.open("sub/hudson.html");
      } else {
        window.open("sub/edge.html");
      }
    });
  };

  /******public functions *****/
  var init = function () {
    initQuotes();

    /*** resizing stuff **/
    $(window).resize(onResize);
    setTimeout(onResize, 250);
    //Hack!! Fix this later
    //setTimeout(redraw, 500);
    setTimeout(function () {
      window.scrollTo(0, 0)
    }, 501);

    handleWorkClick();
    
    //Video stuff
    $("#video_background").prop("volume", 0.2);
  };

  return {
    init: init,
    refreshBackgrounds: refreshBackgrounds
  };
}());