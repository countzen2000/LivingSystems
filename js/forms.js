forms = (function() {
	
	/**Private**/
	var buttons;


	/**public**/
	var init = function() {
		buttons = $('.button');
		//change height on mouse over?
		buttons.each(function() {
			$(this).prepend('<span class="helper"/>');
			$(this).attr('data-title', $(this).text());
		});

		buttons.on('mouseenter mousedown mouseup mouseleave', function(e) {
			var event = e.type,
				btn = $(this),
				helper = btn.children('.helper'),
				height;
			if (event == 'mouseenter' || event == 'mouseup') {
				height = btn.outerWidth() * .71;
			} else if (event == 'mousedown') {
				height = btn.outerWidth() * .85;
			} else if (event == 'mouseleave') {
				height = 0;
			}
			helper.height(height);
		});
	};

	var send = function() {

	};

	return {
		init:init
	}
}());