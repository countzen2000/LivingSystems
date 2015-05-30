arrowScroll = (function(){
	var currentPosition = 0;

	var positionArray = [
		0,
		4000,
		10000,
		'#section4',
		'#section5',
		'#section6',
		'#section7',
		'#section8'
		]
		var firstHack = true;

	var gotoNextMenu = function () {

		arrowScroll.currentPosition = Math.min(arrowScroll.currentPosition+1, 7);
		var targetPos = positionArray[arrowScroll.currentPosition];

		if (typeof targetPos  == 'number')
		{
			target = targetPos;
		} else {
			target = $(targetPos).offset().top;
			if (arrowScroll.currentPosition == 4) {
				target= target+40;
			} else if (arrowScroll.currentPosition == 5) {
				target= target + 100;
			}

		}
		console.log(targetPos)
		console.log(target)
		$('html, body').stop().animate({ scrollTop: target }, 2000);
	}

	var gotoPreviousMenu = function() {
		
		arrowScroll.currentPosition = Math.max(arrowScroll.currentPosition-1, 0);
		console.log("currentPosition:"+ arrowScroll.currentPosition);
		var targetPos = positionArray[arrowScroll.currentPosition];
		if (typeof targetPos  == 'number')
		{
			target = targetPos;
		} else {
			target = $(targetPos).offset().top;
			if (arrowScroll.currentPosition == 4) {
				target= target+40;
			} else if (arrowScroll.currentPosition == 5) {
				target= target + 100;
			}

		}
		$('html, body').stop().animate({ scrollTop: target }, 2000);
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

		//Keep Track of where I am
		$(window).scroll(whereAreYou);
	}

	var whereAreYou = function(event) {
		var location = $(window).scrollTop();
		
		if (location < positionArray[1]) {
			arrowScroll.currentPosition = 0;
		} else if (location < positionArray[2]) {
			arrowScroll.currentPosition = 1;
		} else if (location < $(positionArray[3]).offset().top) {
			arrowScroll.currentPosition = 2;
		} else if (location < $(positionArray[4]).offset().top) {
			arrowScroll.currentPosition = 3;
		}  else if (location < $(positionArray[5]).offset().top) {
			arrowScroll.currentPosition = 4;
		} else if (location < $(positionArray[6]).offset().top) {
			arrowScroll.currentPosition = 5;
		} else {
			arrowScroll.currentPosition = 6;
		}

		if (event) {
			event.preventDefault();
		}

	}

		return {
			init:init,
			positionArray:positionArray,
			whereAreYou:whereAreYou,
			currentPosition:currentPosition
		}
}())
forms = (function() {
	
	/**Private**/
	var buttons;


	/**public**/
	var init = function() {
		buttons = $('.button');
		//change height on mouse over?
		buttons.each(function() {
			$(this).prepend('<span class="helper"/>');
			$(this).attr('data-title', $(this).text());
		});

		buttons.on('mouseenter mousedown mouseup mouseleave', function(e) {
			var event = e.type,
				btn = $(this),
				helper = btn.children('.helper'),
				height;
			if (event == 'mouseenter' || event == 'mouseup') {
				height = btn.outerWidth() * 1;
			} else if (event == 'mousedown') {
				height = btn.outerWidth() * 1;
			} else if (event == 'mouseleave') {
				height = 0;
			}
			helper.height(height);
		});
	};

	var send = function() {

	};

	return {
		init:init
	}
}());
/**
 * Created by IntelliJ IDEA.
 *
 * User: phil
 * Date: 15/11/12
 * Time: 11:04 AM
 *
 */
(function ($) {

    var self = this, container, running=false, currentY = 0, targetY = 0, oldY = 0, maxScrollTop= 0, minScrollTop, direction, onRenderCallback=null,
            fricton = 0.95, // higher value for slower deceleration
            vy = 0,
            stepAmt = 1,
            minMovement= 0.1,
            ts=0.1;

    var updateScrollTarget = function (amt) {
        targetY += amt;
        vy += (targetY - oldY) * stepAmt;
      
        oldY = targetY;


    }
    var render = function () {
        if (vy < -(minMovement) || vy > minMovement) {

            currentY = (currentY + vy);
            if (currentY > maxScrollTop) {
                currentY = vy = 0;
            } else if (currentY < minScrollTop) {
                    vy = 0;
                    currentY = minScrollTop;
                }
           
            container.scrollTop(-currentY);

            vy *= fricton;
            
         //   vy += ts * (currentY-targetY);
            // scrollTopTweened += settings.tweenSpeed * (scrollTop - scrollTopTweened);
            // currentY += ts * (targetY - currentY);

            if(onRenderCallback){
                onRenderCallback();
            }
        }
    }
    var animateLoop = function () {
        if(! running)return;
        requestAnimFrame(animateLoop);
        render();
        //log("45","animateLoop","animateLoop", "",stop);
    }
    var onWheel = function (e) {
        //e.preventDefault();
        var evt = e.originalEvent;
       
        var delta = evt.detail ? evt.detail * -1 : evt.wheelDelta / 40;
        var dir = delta < 0 ? -1 : 1;
        if (dir != direction) {
            vy = 0;
            direction = dir;
        }

        //reset currentY in case non-wheel scroll has occurred (scrollbar drag, etc.)
        currentY = -container.scrollTop();
        
        updateScrollTarget(delta);
    }

    /*
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     */
    window.requestAnimFrame = (function () {
        return  window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                }; 
              
                
    })();

    /*
     * http://jsbin.com/iqafek/2/edit
     */
    var normalizeWheelDelta = function () {
        // Keep a distribution of observed values, and scale by the
        // 33rd percentile.
        var distribution = [], done = null, scale = 30;
        return function (n) {
            // Zeroes don't count.
            if (n == 0) return n;
            // After 500 samples, we stop sampling and keep current factor.
            if (done != null) return n * done;
            var abs = Math.abs(n);
            // Insert value (sorted in ascending order).
            outer: do { // Just used for break goto
                for (var i = 0; i < distribution.length; ++i) {
                    if (abs <= distribution[i]) {
                        distribution.splice(i, 0, abs);
                        break outer;
                    }
                }
                distribution.push(abs);
            } while (false);
            // Factor is scale divided by 33rd percentile.
            var factor = scale / distribution[Math.floor(distribution.length / 3)];
            if (distribution.length == 500) done = factor;
            return n * factor;
        };
    }();


    $.fn.smoothWheel = function () {
        //  var args = [].splice.call(arguments, 0);
        var options = jQuery.extend({}, arguments[0]);
        return this.each(function (index, elm) {

            if(!('ontouchstart' in window)){
                container = $(this);
                container.bind("mousewheel", onWheel);
                container.bind("DOMMouseScroll", onWheel);

                //set target/old/current Y to match current scroll position to prevent jump to top of container
                targetY = oldY = container.get(0).scrollTop;
                currentY = -targetY;
                
                minScrollTop = container.get(0).clientHeight - container.get(0).scrollHeight;
                if(options.onRender){
                    onRenderCallback = options.onRender;
                }
                if(options.remove){
                    log("122","smoothWheel","remove", "");
                    running=false;
                    container.unbind("mousewheel", onWheel);
                    container.unbind("DOMMouseScroll", onWheel);
                }else if(!running){
                    running=true;
                    animateLoop();
                }

            }
        });
    };


})(jQuery);
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
			TweenLite.to($('#hiddenMenu') , 1, {autoAlpha: 1, ease: Bounce.easeOut, top: "20px", display:'block'});
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
		if (arrowScroll.currentPosition == 4) {
			targetPos= targetPos+40;
		} else if (arrowScroll.currentPosition == 5) {
			targetPos= targetPos + 100;
		}
		
		$('html, body').stop().animate({ scrollTop: targetPos }, 2000);
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
preload = (function() {
	
}())
social = (function() {
	var hashtag = "#machinesforliving";
	var instagram = "@livingsystems";

	var init = function() {
		//initialize Social, and pull stuff.. gonna need some API intergration
		//We have to hit twitter too
	}

	return {
		init:init
	}
}());
spotify = (function() {
    /*************************************************************
    	Dependencies
    *************************************************************/
    var jquery = $;
    /*************************************************************
    	Private
    *************************************************************/
    var _id = "1c7cda79c2d41559568af011418c5a1";
    var _secret = "d160ab20a20f41038fe8c6dac3ba30e5";

    var _authorize = function() {
        var authroizeURL = "https://accounts.spotify.com/authorize/?client_id=" + _id + "&response_type=code&redirect_uri=google.com&scope=user-read-private%20user-read-email"
    }

    /*************************************************************
    	Public
    *************************************************************/

    var songSearch = function(query, successReturn) {
        console.log("Searching: " + query);
        if (query != "") {
            $.ajax({
                url: 'https://api.spotify.com/v1/search',
                data: {
                    q: query,
                    type: 'track'
                },
                success: function(response) {
                    successReturn(response);
                }
            });
        }
    };




    return {
        songSearch: songSearch
    }
}())
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-37524344-3', 'janpaepke.github.io');
ga('send', 'pageview');
twitter = (function() {
/*************************************************************
	Dependencies
*************************************************************/
	var jquery = $;
/*************************************************************
	Private
*************************************************************/
	//var _widget = "592589848784941056"; //billy
	var _widget = "594215394350649344"; //Matthew

	var handleTweets = function(tweets) {
	    var x = tweets.length;
	    var n = 0;
	    var element = document.getElementById('TweetContainer');
	    var html = '<ul class="tweets">';
	    while(n < x) {
			user = tweets[n]
			console.log(user)
			html += '<li class="tweets"><div>' + tweets[n] + '</div></li>';
			console.log(tweets[n])
			n++;
	    }
	    html += '</ul>';
	    element.innerHTML = html;
	}

/*************************************************************
	Public
*************************************************************/


	var getSomeTweets = function() {
		var config1 = {
			"id": _widget,
			"maxTweets": 3,
			"enableLinks": true,
			"showUser": true,
			"showImage": false,
			"showTime": false,
			"lang": 'en',
			"customCallback": handleTweets,
			"showInteraction": false
		};
		twitterFetcher.fetch(config1);
	}

	return {
		getSomeTweets:getSomeTweets
	}
}())
/*********************************************************************
*  #### Twitter Post Fetcher v13.0 ####
*  Coded by Jason Mayes 2015. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals.
    factory();
  }
}(this, function() {
  var domNode = '';
  var maxTweets = 20;
  var parseLinks = true;
  var queue = [];
  var inProgress = false;
  var printTime = true;
  var printUser = true;
  var formatterFunction = null;
  var supportsClassName = true;
  var showRts = true;
  var customCallbackFunction = null;
  var showInteractionLinks = true;
  var showImages = false;
  var targetBlank = true;
  var lang = 'en';
  var permalinks = true;

  function handleTweets(tweets){
    if (customCallbackFunction === null) {
      var x = tweets.length;
      var n = 0;
      var element = document.getElementById(domNode);
      var html = '<ul>';
      while(n < x) {
        html += '<li>' + tweets[n] + '</li>';
        n++;
      }
      html += '</ul>';
      element.innerHTML = html;
    } else {
      customCallbackFunction(tweets);
    }
  }

  function strip(data) {
    return data.replace(/<b[^>]*>(.*?)<\/b>/gi, function(a,s){return s;})
        .replace(/class=".*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,
        '');
  }

  function targetLinksToNewWindow(el) {
    var links = el.getElementsByTagName('a');
    for (var i = links.length - 1; i >= 0; i--) {
      links[i].setAttribute('target', '_blank');
    }
  }

  function getElementsByClassName (node, classname) {
    var a = [];
    var regex = new RegExp('(^| )' + classname + '( |$)');
    var elems = node.getElementsByTagName('*');
    for (var i = 0, j = elems.length; i < j; i++) {
        if(regex.test(elems[i].className)){
          a.push(elems[i]);
        }
    }
    return a;
  }

  function extractImageUrl(image_data) {
    if (image_data !== undefined) {
      var data_src = image_data.innerHTML.match(/data-srcset="([A-z0-9%_\.-]+)/i)[0];
      return decodeURIComponent(data_src).split('"')[1];
    }
  }

  var twitterFetcher = {
    fetch: function(config) {
      if (config.maxTweets === undefined) {
        config.maxTweets = 20;
      }
      if (config.enableLinks === undefined) {
        config.enableLinks = true;
      }
      if (config.showUser === undefined) {
        config.showUser = true;
      }
      if (config.showTime === undefined) {
        config.showTime = true;
      }
      if (config.dateFunction === undefined) {
        config.dateFunction = 'default';
      }
      if (config.showRetweet === undefined) {
        config.showRetweet = true;
      }
      if (config.customCallback === undefined) {
        config.customCallback = null;
      }
      if (config.showInteraction === undefined) {
        config.showInteraction = true;
      }
      if (config.showImages === undefined) {
        config.showImages = false;
      }
      if (config.linksInNewWindow === undefined) {
        config.linksInNewWindow = true;
      }
      if (config.showPermalinks === undefined) {
        config.showPermalinks = true;
      }

      if (inProgress) {
        queue.push(config);
      } else {
        inProgress = true;

        domNode = config.domId;
        maxTweets = config.maxTweets;
        parseLinks = config.enableLinks;
        printUser = config.showUser;
        printTime = config.showTime;
        showRts = config.showRetweet;
        formatterFunction = config.dateFunction;
        customCallbackFunction = config.customCallback;
        showInteractionLinks = config.showInteraction;
        showImages = config.showImages;
        targetBlank = config.linksInNewWindow;
        permalinks = config.showPermalinks;

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'http://cdn.syndication.twimg.com/widgets/timelines/' +
            config.id + '?&lang=' + (config.lang || lang) + '&callback=twitterFetcher.callback&' +
            'suppress_response_codes=true&rnd=' + Math.random();
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    },
    callback: function(data) {
      var div = document.createElement('div');
      div.innerHTML = data.body;
      if (typeof(div.getElementsByClassName) === 'undefined') {
         supportsClassName = false;
      }

      var tweets = [];
      var authors = [];
      var times = [];
      var images = [];
      var rts = [];
      var tids = [];
      var permalinksURL = [];
      var x = 0;

      if (supportsClassName) {
        var tmp = div.getElementsByClassName('tweet');
        while (x < tmp.length) {
          if (tmp[x].getElementsByClassName('retweet-credit').length > 0) {
            rts.push(true);
          } else {
            rts.push(false);
          }
          if (!rts[x] || rts[x] && showRts) {
            tweets.push(tmp[x].getElementsByClassName('e-entry-title')[0]);
            tids.push(tmp[x].getAttribute('data-tweet-id'));
            authors.push(tmp[x].getElementsByClassName('p-author')[0]);
            times.push(tmp[x].getElementsByClassName('dt-updated')[0]);
            permalinksURL.push(tmp[x].getElementsByClassName('permalink')[0]);
            if (tmp[x].getElementsByClassName('inline-media')[0] !== undefined) {
              images.push(tmp[x].getElementsByClassName('inline-media')[0]);
            } else {
              images.push(undefined);
            }
          }
          x++;
        }
      } else {
        var tmp = getElementsByClassName(div, 'tweet');
        while (x < tmp.length) {
          tweets.push(getElementsByClassName(tmp[x], 'e-entry-title')[0]);
          tids.push(tmp[x].getAttribute('data-tweet-id'));
          authors.push(getElementsByClassName(tmp[x], 'p-author')[0]);
          times.push(getElementsByClassName(tmp[x], 'dt-updated')[0]);
          permalinksURL.push(tmp[x].getElementsByClassName('permalink')[0]);
          if (getElementsByClassName(tmp[x], 'inline-media')[0] !== undefined) {
            images.push(getElementsByClassName(tmp[x], 'inline-media')[0]);
          } else {
            images.push(undefined);
          }

          if (getElementsByClassName(tmp[x], 'retweet-credit').length > 0) {
            rts.push(true);
          } else {
            rts.push(false);
          }
          x++;
        }
      }

      if (tweets.length > maxTweets) {
        tweets.splice(maxTweets, (tweets.length - maxTweets));
        authors.splice(maxTweets, (authors.length - maxTweets));
        times.splice(maxTweets, (times.length - maxTweets));
        rts.splice(maxTweets, (rts.length - maxTweets));
        images.splice(maxTweets, (images.length - maxTweets));
        permalinksURL.splice(maxTweets, (permalinksURL.length - maxTweets));
      }

      var arrayTweets = [];
      var x = tweets.length;
      var n = 0;
      while(n < x) {
        if (typeof(formatterFunction) !== 'string') {
          var datetimeText = times[n].getAttribute('datetime');
          var newDate = new Date(times[n].getAttribute('datetime')
              .replace(/-/g,'/').replace('T', ' ').split('+')[0]);
          var dateString = formatterFunction(newDate, datetimeText);
          times[n].setAttribute('aria-label', dateString);

          if (tweets[n].innerText) {
            // IE hack.
            if (supportsClassName) {
              times[n].innerText = dateString;
            } else {
              var h = document.createElement('p');
              var t = document.createTextNode(dateString);
              h.appendChild(t);
              h.setAttribute('aria-label', dateString);
              times[n] = h;
            }
          } else {
            times[n].textContent = dateString;
          }
        }
        var op = '';
        if (parseLinks) {
          if (targetBlank) {
            targetLinksToNewWindow(tweets[n]);
            if (printUser) {
              targetLinksToNewWindow(authors[n]);
            }
          }
          if (printUser) {
            op += '<div class="user">' + strip(authors[n].innerHTML) +
                '</div>';
          }
          op += '<p class="tweet">' + strip(tweets[n].innerHTML) + '</p>';
          if (printTime) {
            if (permalinks) {
              op += '<p class="timePosted"><a href="' + permalinksURL[n] + '">' +
                  times[n].getAttribute('aria-label') + '</a></p>';
            } else {
              op += '<p class="timePosted">' +
                  times[n].getAttribute('aria-label') + '</p>';
            }
          }
        } else {
          if (tweets[n].innerText) {
            if (printUser) {
              op += '<p class="user">' + authors[n].innerText + '</p>';
            }
            op += '<p class="tweet">' +  tweets[n].innerText + '</p>';
            if (printTime) {
              op += '<p class="timePosted">' + times[n].innerText + '</p>';
            }

          } else {
            if (printUser) {
              op += '<p class="user">' + authors[n].textContent + '</p>';
            }
            op += '<p class="tweet">' +  tweets[n].textContent + '</p>';
            if (printTime) {
              op += '<p class="timePosted">' + times[n].textContent + '</p>';
            }
          }
        }
        if (showInteractionLinks) {
          op += '<p class="interact"><a href="https://twitter.com/intent/' +
              'tweet?in_reply_to=' + tids[n] + '" class="twitter_reply_icon"' + (targetBlank ? ' target="_blank">' : '>') +
              'Reply</a><a href="https://twitter.com/intent/retweet?tweet_id=' +
              tids[n] + '" class="twitter_retweet_icon"' + (targetBlank ? ' target="_blank">' : '>') + 'Retweet</a>' +
              '<a href="https://twitter.com/intent/favorite?tweet_id=' +
              tids[n] + '" class="twitter_fav_icon"' + (targetBlank ? ' target="_blank">' : '>') + 'Favorite</a></p>';
        }

        if (showImages && images[n] !== undefined) {
          op += '<div class="media">' +
              '<img src="' + extractImageUrl(images[n]) + '" alt="Image from tweet" />' +
              '</div>';
        }

        arrayTweets.push(op);
        n++;
      }
      handleTweets(arrayTweets);
      inProgress = false;

      if (queue.length > 0) {
        twitterFetcher.fetch(queue[0]);
        queue.splice(0,1);
      }
    }
  };

  // It must be a global variable because it will be called by JSONP.
  window.twitterFetcher = twitterFetcher;

  return twitterFetcher;
}));
