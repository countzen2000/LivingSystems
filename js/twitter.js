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
			user = tweets[n];
			html += '<li class="tweets"><div>'+
			'<div class="image_holder"><img width=290 height=260 src="resources/images/twitter/placeholder.jpg"></div><div>' + tweets[n] + '</div></div></li>';
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