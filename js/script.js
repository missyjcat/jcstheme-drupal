(function (jcsUtils, $) {

    var headerComponent = {

        /**
         * Initialize show/hide behavior for a header element of the site
         * @param  {String} elClass - el to add class to
         * @param  {String} testClass - classname to add when testHeight is 
         *          triggered
         * @param  {Number} testHeight - vert pos to trigger class
         * @param  {String} testEl - element to test for vert pos
         */
        init: function(elClass, testClass, testHeight) {

            var TESTHEIGHT = testHeight || ($(elClass).offset().top - 50);

            window.setInterval( function() {

                // Getting cross-browser compatible value of vertical
                // position of scrollbar
                vertPos = (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop;
                
                if (vertPos > TESTHEIGHT && !($(elClass).hasClass(testClass))) {
                    $(elClass).addClass(testClass);
                } else if (vertPos < TESTHEIGHT && $(elClass).hasClass(testClass)) {
                    $(elClass).removeClass(testClass);
                }
            }, 200);
        }

    };

    jcsUtils.headerComponent = headerComponent;

})(window.jcsUtils = window.jcsUtils || {}, jQuery);

/**
 * Initializing components
 */

jcsUtils.headerComponent.init('.header', 'header--collapsed', 100);
jcsUtils.headerComponent.init('.aboutme__description__text', 'aboutme__description__text--collapsedheader', 100);
jcsUtils.headerComponent.init('.aboutme__photo', 'aboutme__photo--collapsedheader', 100);
jcsUtils.headerComponent.init('.portfoliomenu', 'portfoliomenu--stickyheader');