spotify = (function() {
/*************************************************************
	Dependencies
*************************************************************/
	var jquery = $;
/*************************************************************
	Private
*************************************************************/
	var _id = "1c7cda79c2d41559568af011418c5a1";
	var _secret = "d160ab20a20f41038fe8c6dac3ba30e5";

/*************************************************************
	Public
*************************************************************/

	var songSearch = function (query, successReturn) {
		console.log("Searching: "+query);
		if (query != "") {
		    $.ajax({
		        url: 'https://api.spotify.com/v1/search',
		        data: {
		            q: query,
		            type: 'track'
		        },
		        success: function (response) {
		        	successReturn(response);
		        }
		    });
		}
	};

	
	return {
		songSearch:songSearch
	}
}())