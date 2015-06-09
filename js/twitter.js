var twitter = (function() {
/*************************************************************
	Dependencies
*************************************************************/
	var jquery = $;
/*************************************************************
	Private
*************************************************************/
	//var _widget = "592589848784941056"; //billy
	var _widget = "594215394350649344"; //Matthew

	var tweetsArray = [];
	var imagesArray = [];
	var counter = 0;

	var handleTweets = function(tweets) {
	    var x = tweets.length;
	    var n = 0;
	   
	    while(n < x) {
			counter++;

			imageScraper.scrape(tweets[n], returnCall, n);
			tweetsArray.push(tweets[n]);
			n++;
	    }
	  
	};

	var returnCall = function (image, location) {
		console.log(image);
		if (image === null) {
			image = "resources/images/twitter/placeholder.jpg";
		}
		imagesArray[location] = image;
		counter--;
		if (counter === 0) {
			build();
		}
	};

	var build = function() {
		//console.log('build');
		var element = document.getElementById('TweetContainer');
	    var html = '<ul class="tweets">';
	    var i;
	    for (i = 0; i < tweetsArray.length; i++) {
	    	html += '<li class="tweets"><div>'+
			'<div class="image_holder"><img width=290 height=260 src="' + imagesArray[i] + '"></div><div class="tweetHolder">' + tweetsArray[i] + '</div></div></li>';
	    }
	    html += '</ul>';
	    element.innerHTML = html;
	};

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
	};

	return {
		getSomeTweets:getSomeTweets
	};
}());