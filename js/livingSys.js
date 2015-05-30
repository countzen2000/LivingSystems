livingSys = (function() {

    var controller = new ScrollMagic.Controller();

    var setupAnimation = function() {

        // build scene
        var PinText1 = new ScrollMagic.Scene({})
            .setPin("#section1")
            .addTo(controller);

        var tween1 = new TimelineMax()
            .add(
                TweenMax.to("#pin1", 1, {
                    "alpha": 0,
                    top: "-=100"
                })
            )
            .add(
                TweenMax.to("#section1", 1.5, {
                    transformOrigin: "50% 50% 0",
                    scale: .75,
                    alpha: 0
                })
            ).add(
                TweenMax.from("#section2", .75, {
                    transformOrigin: "50% 50% 0",
                    scale: 1.5,
                    alpha: 0
                }, '-1')
            )

        var fadeOutText1 = new ScrollMagic.Scene({
                offset: 200,
                duration: 3000
            })
            .setTween(tween1)
            .addTo(controller);

        var PinScene2 = new ScrollMagic.Scene({})
            .setPin("#section2")
            .addTo(controller);

        var tween2 = new TimelineMax()
            .add(
                TweenMax.fromTo("#pin2", 1, {
                    "alpha": 0,
                    top: "-=100"
                }, {
                    "alpha": 1,
                    top: "50%"
                })
            )
            .add(
                TweenMax.to("#pin2", 2, {})
            )
            .add(
                TweenMax.to("#pin2", 1, {
                    "alpha": 0,
                    top: "-=100"
                })
            )
            .add(
                TweenMax.to("#section2", 1.5, {
                    transformOrigin: "50% 50% 0",
                    scale: .75,
                    "alpha": 0
                })
            ).add(
                TweenMax.from("#section3", .75, {
                    transformOrigin: "50% 50% 0",
                    scale: 1.5,
                    alpha: 0
                })
            )

        var fadeOutText2 = new ScrollMagic.Scene({
                offset: 3200,
                duration: 6000
            })
            .setTween(tween2)
            .addTo(controller);

        var PinScene3 = new ScrollMagic.Scene()
            .setPin("#section3")
            .addTo(controller);

        var tween3 = new TimelineMax()
            .add(
                TweenMax.fromTo("#pin3", 1, {
                    "alpha": 0,
                    top: "-=100"
                }, {
                    "alpha": 1,
                    top: "50%"
                })
            )
            .add(
                TweenMax.to("#pin3", 2, {})
            )
            .add(
                TweenMax.to("#pin3", 1.5, {
                    "alpha": 0,
                    top: "-=100"
                })
            ).add(
                TweenMax.to("#section3", .75, {
                    "alpha": 0
                })
            )

        var fadeOutText3 = new ScrollMagic.Scene({
                offset: 9200,
                duration: 2000
            })
            .setTween(tween3)
            .addTo(controller);

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

    var onResize = function() {

        realign();
        redraw();
        realign();
    }

    var realign = function() {

        $('#section4').offset({
            top: 11200
        });
        $('#section5').offset({
            top: $('#section4').offset().top + $('#section5').height()
        });
        $('#section6').offset({
            top: $('#section5').offset().top + $('#section6').height()
        });
        $('#section7').offset({
            top: $('#section6').offset().top + $('#section7').height()
        });
        //Change this use Viewport height
        $('#section8').offset({
            top: $('#section7').offset().top + $('#section8').height()
        });


    }

    var redraw = function() {
        //This whole section is a bit hacky

        //for works section
        source = $('.work-list > li');

        source.height(source.height() * .99);

        target = $('.works-effect > .overlay');

        target.height(source.height() * .99);
        target.width(source.width());

    }

    var initQuotes = function() {
        var quotes = $('.quote');
        var clientList = $('.client-list li');

        clientList.each(function() {
            $(this).on('mouseenter touchend', function(e) {

                var index = $(this).index();
                var incomingQuote = quotes.eq(index);
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

    /******public functions *****/
    var init = function() {
        setupAnimation()

        initQuotes();

        /*** resizing stuff **/
        $(window).resize(onResize);
        setTimeout(onResize, 250);
        //Hack!! Fix this later
        setTimeout(redraw, 500);
        setTimeout(function() {
            window.scrollTo(0, 0)
        }, 501);
    }

    return {
        init: init,
        controller: controller
    };
}());