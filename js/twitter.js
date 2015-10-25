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
    var element = document.getElementById('SocialContainer');
    var html = '<ul class="tweets"><li class="tweets" style="margin:0; padding:0; width: 100vw;"><div id="instagram_feed" ></div></li></ul>';
    var i;

    /*var userData =
      '<div class="user" style="margin:10px;width:calc(100% - 20px);">' +
      '<a href="https://instagram.com/livingsystems/" target="_blank">' +
      '<img alt="" src="https://pbs.twimg.com/profile_images/582852448429031424/FtSsFpYY_normal.png">' +
      '<span><span>livingsystems</span></span>' +
      '<span >#machinesforliving</span>' +
      '</a>' +
      '</div>';
    //Now we add Spotify
    html +=
      '<li class="tweets">' +
      '<div>' +
      '<iframe src="https://embed.spotify.com/?uri=spotify:user:ticamide:playlist:4bAWPT1xAb0jRqHDupCCsj&theme=white&view=coverart" width="280" height="360" frameborder="0" allowtransparency="true"></iframe>' +
      '</div></li>';

    html += '<li class="tweets" style="margin:0; padding:0; width: 100vw;"><div id="instagram_feed" ></div></li></ul>';
    */
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
      "maxTweets": 1,
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