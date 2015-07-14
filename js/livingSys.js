livingSys = (function () {

    var controller = new ScrollMagic.Controller();

    var setupAnimation = function () {
        //Pin the first set of text
        var PinText1 = new ScrollMagic.Scene({})
            .setPin("#section1")
            .addTo(controller);

        var tween1 = new TimelineMax();
        tween1.add([
            // TweenMax.fromTo("#flash1", .5, { "alpha": 0, top: "50%"}, {delay: 3, "alpha": 0 }),
            TweenMax.to("#text_1", 2, {
                "alpha": 0
            }), //Move and fades opening words out
            TweenMax.to("#pin1", 2, {
                top: "-=100",
                delay: .2
            }), //Move and fades opening words out
            TweenMax.to("#section1", 1.5, {
                delay: .5,
                transformOrigin: "50% 50% 0",
                scale: .75,
                alpha: 0
            }), //Scales and fades out the iniital screen
            TweenMax.from("#section2", .75, {
                delay: 1.3,
                transformOrigin: "50% 50% 0",
                scale: 1.5,
                alpha: 0
            })
        ]);

        var fadeOutText1 = new ScrollMagic.Scene({
                offset: 200,
                duration: 3000
            })
            .setTween(tween1)
            .addTo(controller);

        var PinScene2 = new ScrollMagic.Scene({})
            .setPin("#section2")
            .addTo(controller);

        var tween2 = new TimelineMax();
        tween2.add([
            //TweenMax.fromTo("#flash2", 1, { alpha: 0, top: "50%"}, {delay: 5, alpha: 1, top: "50%" }),
            TweenMax.from("#pin2", 2, {
                top: "-=100",
                delay: .2
            }),
            TweenMax.from("#text_2", 2, {
                "alpha": 0
            }),
            TweenMax.to("#pin2", 2, {
                delay: 4.2,
                top: "-=100"
            }),
            TweenMax.to("#text_2", 2, {
                delay: 4,
                alpha: 0
            }),
            TweenMax.to("#section2", 1.5, {
                delay: 4,
                transformOrigin: "50% 50% 0",
                scale: .75,
                alpha: 0
            }),
            TweenMax.from("#section3", .75, {
                delay: 5,
                transformOrigin: "50% 50% 0",
                scale: 1.5,
                alpha: 0
            })
        ]);

        var fadeOutText2 = new ScrollMagic.Scene({
                offset: 3500,
                duration: 6200
            })
            .setTween(tween2)
            .addTo(controller);

        var PinScene3 = new ScrollMagic.Scene()
            .setPin("#section3")
            .addTo(controller);

        var tween3 = new TimelineMax()
        tween3.add([
            TweenMax.fromTo("#pin3", 2, {
                top: "-=100"
            }, {
                delay: .2,
                top: "50%"
            }),
            TweenMax.fromTo("#text_3", 2, {
                "alpha": 0
            }, {
                "alpha": 1
            })
        ]);
        tween3.add(TweenMax.to("#pin3", 2, {}));
        tween3.add([
            TweenMax.to("#pin3", 1.5, {
                "alpha": 0,
                top: "-=100"
            }),
            TweenMax.to("#section3", .75, {
                delay: 1,
                "alpha": 0
            })
        ]);


        var fadeOutText3 = new ScrollMagic.Scene({
                offset: 9700,
                duration: 3000
            })
            .setTween(tween3)
            .addTo(controller);

    }

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
        refreshBackgrounds('.section5');
    }

    var realign = function () {

        $('#section4').offset({
            top: 12900
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

        $('#section8').offset({
            top: $('#section7').offset().top + $('#section8').height()
        });

    }

    var redraw = function () {
        //This whole section is a bit hacky

        //for works section
        source = $('.work-list > li');

        source.height(source.height() * .99);

        target = $('.works-effect > .overlay');

        target.height(source.height() * .99);
        target.width(source.width());

    }

    var initQuotes = function () {
        var quotes = $('.quote');
        var clientList = $('.client-list li');

        clientList.each(function () {
            $(this).on('mouseenter touchend', function (e) {

                var index = $(this).index();
                if (index === 2) {
                    index = 1;
                }
                if (index === 4) {
                    index = 2;
                }
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
        $('.works-effect').click(function (e) {
            console.log(e.target.src.indexOf('hudson'));
            if (e.target.src.indexOf('hudson') > 0) {
                window.open('sub/hudson.html');
            } else {
                window.open('sub/edge.html');
            }
        });
    };

    /******public functions *****/
    var init = function () {
        setupAnimation()

        initQuotes();

        /*** resizing stuff **/
        $(window).resize(onResize);
        setTimeout(onResize, 250);
        //Hack!! Fix this later
        setTimeout(redraw, 500);
        setTimeout(function () {
            window.scrollTo(0, 0)
        }, 501);

        handleWorkClick();
    }

    return {
        init: init,
        controller: controller,
        refreshBackgrounds: refreshBackgrounds
    };
}());
