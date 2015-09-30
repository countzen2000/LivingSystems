var instagram = (function () {
    var feed;
    var init = function () {
        feed = new Instafeed({
            clientId: 'c376a60eb0ae432dba6453fffd22da3c',
            target: 'instagram_feed',
            limit: 3,
            resolution: "low_resolution",
            sortBy: "most-recent",
            get: 'tagged',
            tagName: "machinesforliving"
        });
        feed.run();
    };

    return {
        init: init
    };
}());