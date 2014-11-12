(function (jcsUtils, $) {

    /**
     * Show/hide expanded version of the header for JCS
     */
    
    var headerComponent = function() {

        var init = function() {
            // Check position of window and appear/disappear element
            // when conditions match

            window.setInterval( function() {
                var TESTHEIGHT = 100;
                var vertPos = null;
                
                // Getting cross-browser compatible value of vertical
                // position of scrollbar
                vertPos = (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop;

                if (vertPos > TESTHEIGHT && !($('.header').hasClass('header--collapsed'))) {
                    $('.header').addClass('header--collapsed');
                } else if (vertPos < TESTHEIGHT && $('.header').hasClass('header--collapsed')) {
                    $('.header').removeClass('header--collapsed');
                }
            }, 300);
        };

        return {
            init : init
        };

    };

    jcsUtils.headerComponent = headerComponent;

})(window.jcsUtils = window.jcsUtils || {}, jQuery);

/**
 * Initializing components
 */

jcsUtils.headerComponent().init();