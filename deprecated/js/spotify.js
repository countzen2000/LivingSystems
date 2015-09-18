spotify = (function () {
    /*************************************************************
    	Dependencies
    *************************************************************/
    var jquery = $;
    /*************************************************************
    	Private
    *************************************************************/
    var _id = "e3ece1ddd6da4f83800e2332c515e844"
    var _secret = "bcc7521f4b424cb186d86dd53f4f0b8c ";

    var _authorize = function () {
        var authroizeURL = "https://accounts.spotify.com/authorize/?client_id=" + _id + "&response_type=code&redirect_uri=google.com&scope=user-read-private%20user-read-email"
    }

    /*************************************************************
    	Public
    *************************************************************/

    var songSearch = function (query, successReturn) {
        console.log("Searching: " + query);
        if (query != "") {
            $.ajax({
                url: 'https://api.spotify.com/v1/search',
                data: {
                    q: query,
                    type: 'playlist'
                },
                success: function (response) {
                    successReturn(response);
                }
            });
        }
    };
    
    return {
        songSearch: songSearch
    }
}());

/*
Matthew Testa
Matthew Testa 
OK.  My partner Mike at Ticamide put together a solid playlist on Spotify... can we have the site "fake" like we are listening to this?:

Playlist link:
https://open.spotify.com/user/ticamide/playlist/4bAWPT1xAb0jRqHDupCCsj

Spotify URI:
spotify:user:ticamide:playlist:4bAWPT1xAb0jRqHDupCCsj

Embed Code:
<iframe src="https://embed.spotify.com/?uri=spotify%3Auser%3Aticamide%3Aplaylist%3A4bAWP…" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>

mt@livingsystems.com

sharky2010
Corbu2015

twitter
spotify
Posted on Apr 28
Matthew Testa
Matthew Testa 
just to clarify... 

Spotify

livingsystems
Corbu2015

Twitter
mt@livingsystems.com
sharky2010
*/
