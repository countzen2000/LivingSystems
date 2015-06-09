var imageScraper = (function() {
	var scrape = function(stringToSeartchThrough, returnCall, location) {
		var regex = /https?:\/\/t.co\/\w*/;

		var twitter_links = regex.exec(stringToSeartchThrough);

		$.ajaxPrefilter( function (options) {
		  if (options.crossDomain && jQuery.support.cors) {
		    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
		    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
		    //options.url = "https://cors.corsproxy.io/url=" + options.url;
		  }
		});

		if (twitter_links !== null) {
			$.ajax({
			    url: twitter_links,
			    dataType: 'text',
			    success: function(data) {
			    	//lets check if this has a instagram link
			    	console.log(data);
			    	var instagramRegex = /https?:\/\/instagram.com\/.*\/.*(?="><)/;
			    	var instagramLink = instagramRegex.exec(data);
			    	if (instagramLink !== null) {
			    		returnCall(instagramLink+"media", location);
			    		return;
			    	}
			    	var noScriptLink = /https?:\/\/twitter.com\/.+\/.+\/.+\/.+\/[0-9]+(?="><)/;
			      	var noScriptLinkUrl = noScriptLink.exec(data);
			      	//console.log("noScriptLinkUrl: "+noScriptLinkUrl);
			      	if (noScriptLinkUrl === null) {
			      		returnCall(null, location);
			      	} else {
				    	secondScrape(noScriptLinkUrl, returnCall, location);
				    }
			    },
			    error: function(e) {
			    	console.log(e);
			    }
			});
		}
	};

	var secondScrape = function(secondURL, returnCall, location) {
		$.ajax({
		    url: secondURL,
		    dataType: 'text',
		    success: function(data) {
		      	var imageRegEx = /https?:\/\/pbs.twimg.com\/.*\.jpg/;
		      	var imageLink = imageRegEx.exec(data);
		      	returnCall(imageLink[0], location);
		    }

		});
	}

	return {
		scrape:scrape
	};
}());