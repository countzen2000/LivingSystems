var preLoader = (function() {
	var itemsToLoad = [
	'build/resources/images/back1.jpg',
	'build/resources/images/back2.jpg',
	'build/resources/images/back3.jpg',
	'build/resources/images/blank_1x1.png',
	'build/resources/images/footer.png',
	'build/resources/images/background/works_5.png',
	'build/resources/images/clients/bijou.png',
	'build/resources/images/clients/hudson.png',
	'build/resources/images/clients/pino.png',
	'build/resources/images/forms/asterik.png',
	'build/resources/images/system/logo_animation.png',
	'build/resources/images/system/logo_menu.png',
	'build/resources/images/works/edge1.jpg',
	'build/resources/images/works/edge2.jpg',
	'build/resources/images/works/edge3.jpg',
	'build/resources/images/works/edge4.jpg',
	'build/resources/images/works/hudson1.jpg',
	'build/resources/images/works/hudson2.jpg',
	'build/resources/images/works/hudson3.jpg',
	'build/resources/images/works/hudson4.jpg'
	];
	var total = itemsToLoad.length;
	var promiseContainer = [];
	var startCounter = 0;

	//array promises! promises.all and promise.reduce

	var startLoading = function() {
		$('#scrollContent').hide();
		var i;

		for (i = 0; i < total; i++) {
			promiseContainer.push(getter(itemsToLoad[i]).then(onEachLoad, errorLoading));
		}
	};

	var onEachLoad = function() {
		startCounter++;
		console.log(startCounter);
		var percent = (startCounter/total)*100;
		$('#barFront').css('width', percent+"%");
		if (startCounter >= total) {
			setTimeout(onComplete, 200);
		}
	}

	var getter = function(image) {
		var promise = new Promise(function(resolve, fail) {
			$.ajax ({
				url: image,
				success: resolve,
				error: fail
			});
		});

		return promise;
	};

	var errorLoading = function(what) {
		console.log("error with preloader: ", what);
	};

	var onComplete = function() {
		$('#loader_screen').hide(300);
		$('#scrollContent').fadeTo(0,0);
		$('#scrollContent').css('display', 'block');
		$('#scrollContent').fadeTo(500, 1);

		forms.init();
		livingSys.init();
		arrowScroll.init();
		setTimeout(menuSystem.init, 500);
		imageScraper.init();
		twitter.getSomeTweets();
	};

	return {
		startLoading:startLoading,
		onComplete:onComplete
	};
}());