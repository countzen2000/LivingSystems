var twitter = (function () {
    /*************************************************************
    	Dependencies
    *************************************************************/
    var jquery = $;
    /*************************************************************
    	Private
    *************************************************************/
    var _widget = "594215394350649344"; //Matthew

    var tweetsArray = [];
    var imagesArray = [];
    var counter = 0;

    var handleTweets = function (tweets) {
        var x = tweets.length;
        var n = 0;
        var promiseArray = [];

        while (n < x) {
            tweetsArray.push(tweets[n]);
            promiseArray.push(imageScraper.scrape(tweets[n]));
            n++;
        }

        Promise.all(promiseArray).then(returnCall);
    };

    var returnCall = function (images) {
        console.log("returnCall", images);
        imagesArray = images;

        build();
    };

    var build = function () {
        var element = document.getElementById('TweetContainer');
        var html = '<ul class="tweets">';
        var i;

        //Now we add Spotify
        html +=
            '<li class="tweets">' +
            '<div>' +
            '<iframe src="https://embed.spotify.com/?uri=spotify:user:ticamide:playlist:4bAWPT1xAb0jRqHDupCCsj&theme=white&view=coverart" width="280" height="360" frameborder="0" allowtransparency="true"></iframe>' +
            '</div></li>';

        //Now add twitter
        for (i = 0; i < tweetsArray.length; i++) {
            html +=
                '<li class="tweets">' +
                '<div>' +
                '<div class="image_holder">' +
                '<img width=280 height=240 src="' + imagesArray[i] + '"></div>' +
                '<div class="tweetHolder">' + tweetsArray[i] + '</div>' +
                '</div></li>';
        }
        html += '</ul>';
        element.innerHTML = html;
    };

    var onErr = function (error) {
        console.log("Error in twitter.js", error);
    }

    /*************************************************************
    	Public
    *************************************************************/


    var getSomeTweets = function () {
        var config = {
            "id": _widget,
            "maxTweets": 2,
            "enableLinks": true,
            "showUser": true,
            "showImage": false,
            "showTime": false,
            "lang": 'en',
            "customCallback": handleTweets,
            "showInteraction": false
        };

        twitterFetcher.fetch(config);
    };

    return {
        getSomeTweets: getSomeTweets
    };
}());
