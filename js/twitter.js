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