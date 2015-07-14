var forms = (function () {

    /**Private**/
    var buttons;


    /**public**/
    var init = function () {
        buttons = $('.button');
        //change height on mouse over?
        buttons.each(function () {
            $(this).prepend('<span class="helper"/>');
            $(this).attr('data-title', $(this).text());
        });

        buttons.on('mouseenter mousedown mouseup mouseleave', function (e) {
            var event = e.type,
                btn = $(this),
                helper = btn.children('.helper'),
                height;
            if (event == 'mouseenter' || event == 'mouseup') {
                height = btn.outerWidth() * 1;
            } else if (event == 'mousedown') {
                height = btn.outerWidth() * 1;
            } else if (event == 'mouseleave') {
                height = 0;
            }
            helper.height(height);
        });

        $('.form-input#message').focus(function () {
            $(this).data('placeholder', $(this).attr('placeholder'))
            $(this).attr('placeholder', '');
        });
        $('.form-input#message').blur(function () {
            $(this).attr('placeholder', $(this).data('placeholder'));
        });
    };

    var send = function () {

    };

    return {
        init: init
    }
}());