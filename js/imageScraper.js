var imageScraper = (function() {
	//Lets use Promises.

	var scrape = function(stringToSeartchThrough) {
		var promise = 
			firstAjax(stringToSeartchThrough)
			.then(parseURLresults, failure)
			.then(secondScrape, failure)
			.then(returnImage, failure)
			.catch(failure);

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
		var instagramRegex = /https?:\/\/instagram.com\/.*\/.*(?="><)/;
		var instagramLink = instagramRegex.exec(data);
		if (instagramLink !== null) {
			return instagramLink + "media";
		}
		//Else this is from twitter
		var noScriptLink = /https?:\/\/twitter.com\/.+\/.+\/.+\/.+\/[0-9]+(?="><)/;
		var noScriptLinkUrl = noScriptLink.exec(data);
		
		if (noScriptLinkUrl === null) {
			return null;
		} else {
			//Oh gawd this goes deeper for twitter
			return noScriptLinkUrl;
		}
	};

	var firstAjax = function(stringToSeartchThrough) {
		var promise = new Promise(function(resolve, reject) {
			var regex_for_twitter_links = /https?:\/\/t.co\/\w*/;

			var twitter_links = regex_for_twitter_links.exec(stringToSeartchThrough);
			if (twitter_links !== null) {
				$.ajax({
					url: twitter_links,
					dataType: 'text',
					async: true,
					success: function(data) {
						console.log('firstSuccess');
						resolve(data);
					},
					error: function(e) {
						reject(e);
					}
				});
			} else {
				reject(new Error("No twitter links!"));
			}
		});

		return promise;
	};

	var secondScrape = function(secondURL) {	
		var promise =  new Promise(function(resolve, reject) {
			if (secondURL == null) {
				resolve ("");
			} else if (secondURL.indexOf("media") > 0) {
				resolve(secondURL);
			} else {
				$.ajax({
					url: secondURL,
					dataType: 'text',
					async: true,
					success: function(data) {
						var imageRegEx = /https?:\/\/pbs.twimg.com\/.*\.jpg/;
						var imageLink = imageRegEx.exec(data);
						console.log("2ndSuccess?", secondURL);
						resolve(imageLink[0]);
					},
					error: function(e) {
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
				//options.url = "https://cors.corsproxy.io/url=" + options.url;
			}
		});
	};

	return {
		scrape: scrape,
		init:init
	};
}());