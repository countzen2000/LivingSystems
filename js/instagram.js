var instagram = (function () {
  var feed;
  var init = function () {
    var template = '<a href="{{link}}" style="padding: 0; margin: 0;"><img class="instagram_images" style="width:20vw; padding:0; margin: 0;" src="{{image}}" /></a>';

    feed = new Instafeed({
      clientId: 'c376a60eb0ae432dba6453fffd22da3c',
      target: 'instagram_feed',
      limit: 5,
      resolution: "low_resolution",
      sortBy: "most-recent",
      get: 'tagged',
      tagName: "machinesforliving",
      template: template
    });
    feed.run();
  };

  return {
    init: init
  };
}());