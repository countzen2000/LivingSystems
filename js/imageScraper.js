var imageScraper = (function() {
	//Lets use Promises.
	var scrape = function(stringToSeartchThrough) {

		var regex_for_twitter_links = /https?:\/\/t.co\/\w*/;
		var twitter_links = regex_for_twitter_links.exec(stringToSeartchThrough);
		var promise;

		if (twitter_links != undefined) {
			console.log("twitter_links", twitter_links[0]);
			promise =
				firstAjax(twitter_links[0])
				.then(parseURLresults, failure)
				.then(secondScrape, failure)
				.then(returnImage, failure)
				.catch(failure);
		} else {
			console.log("nothing to scrape");
			promise = Promise.resolve("build/resources/images/blank_1x1.png");
		}

		return promise;
	};

	var returnImage = function(result) {

		var promise = new Promise(function(resolve, reject) {
			if (result === null || typeof result == undefined) {
				reject("Bad Result!");
			} else {
				resolve(result);
				console.log("returnImage", result);
			}
		});

		return promise;
	};

	var failure = function(error) {
		console.log("At image scraper:", error);
	};


	var parseURLresults = function(data) {
		
		//lets check if this has a instagram link
		var instagramRegex = /https?:\/\/instagram.com\/.*\/.*(?=")/;
		var instagramLink = instagramRegex.exec(data);
		if (instagramLink !== null) {
			console.log("instagramLink", instagramLink)
			return instagramLink + "media";
		}

		var noScriptLink;
		//Else this is from twitter
		if (data.indexOf("<noscript>") > -1) {
			noScriptLink = /https?:\/\/twitter.com\/.+\/.+\/.+\/.+\/[0-9]+(?="><)/;
		} else {
			noScriptLink = /https?:\/\/pbs.twimg.com\/media\/.*(.jpg)/;
		}

		var noScriptLinkUrl = noScriptLink.exec(data);

		if (noScriptLinkUrl === null) {
			return null;
		} else {
			if (Array.isArray(noScriptLinkUrl)) {
				return noScriptLinkUrl[0];
			} else {
				return noScriptLinkUrl;
			}

		}
	};

	var firstAjax = function(stringToSeartchThrough) {
		var promise = new Promise(function(resolve, reject) {
			console.log(stringToSeartchThrough);
			if (stringToSeartchThrough !== null) {
				$.ajax({
					url: stringToSeartchThrough,
					dataType: 'text',
					success: function(data) {
						console.log('firstSuccess', data);
						resolve(data);
					},
					error: function(e) {
						console.log("at first scrape err");
						reject(e);
					}
				});
			} else {
				reject(new Error("No twitter Image links in: " + stringToSeartchThrough));
			}
		});

		return promise;
	};

	var secondScrape = function(secondURL) {
		var promise = new Promise(function(resolve, reject) {
			if (secondURL == null) {
				console.log("no second URL", secondURL)
				resolve("build/resources/images/blank_1x1.png");
			} else if (secondURL.indexOf("media") > 0) {
				console.log("secondURL is a media", secondURL)
				resolve(secondURL);
			} else {
				$.ajax({
					url: secondURL,
					dataType: 'text',
					success: function(data) {
						var imageRegEx = /https?:\/\/pbs.twimg.com\/.*\.jpg/;
						var imageLink = imageRegEx.exec(data);
						console.log("2ndSuccess?", imageLink[0], secondURL);
						resolve(imageLink[0]);
					},
					error: function(e) {
						console.log("at 2nd scrape err");
						reject(e);
					}
				});
			}
		});

		return promise;
	}

	var init = function() {
		$.ajaxPrefilter(function(options) {
			if (options.crossDomain && jQuery.support.cors) {
				var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
				options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
				//options.url = "http://crossorigin.me/" + options.url;
			}
		});
	};

	return {
		scrape: scrape,
		init: init
	};
}());