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
        init: function(elClass, testClass, testHeight, testEndHeight) {
            if ($(elClass).length) {

                var TESTHEIGHT = testHeight || ($(elClass).offset().top);

                window.setInterval( function() {

                    // Getting cross-browser compatible value of vertical
                    // position of scrollbar
                    vertPos = (window.pageYOffset !== undefined) ? window.pageYOffset : document.documentElement.scrollTop;
                    
                    if (vertPos > TESTHEIGHT && !($(elClass).hasClass(testClass))) {
                        $(elClass).addClass(testClass);
                    } else if (vertPos < TESTHEIGHT && $(elClass).hasClass(testClass)) {
                        $(elClass).removeClass(testClass);
                    }

                    if (testEndHeight) {
                        if (vertPos > testEndHeight) {
                            $(elClass).removeClass(testClass);
                        }
                    }

                }, 200);

            }
        }

    };

    // Exposing component for initialization
    jcsUtils.headerComponent = headerComponent;

    /**
     * Applying the "active" class in menu items for certain node types
     */
    
    if ($('body').hasClass('node-type-portfolio-piece')) {
        $('.portfolio-menu-item').addClass('active');
    }

    if ($('body').hasClass('node-type-article')) {
        $('.blog-menu-item').addClass('active');
    }

})(window.jcsUtils = window.jcsUtils || {}, jQuery);

/**
 * Initializing components
 */

// Collapsing the main header
jcsUtils.headerComponent.init('.header', 'header--collapsed', 100);

// When header collapses, making sure the page adjusts to make up for the jump
jcsUtils.headerComponent.init('.page', 'extrapadding', 100);

// When the portfolio menu reaches the top, make it stick
jcsUtils.headerComponent.init('.portfoliomenu', 'portfoliomenu--stickyheader');

// These control the highlighting of the portfolio menu as the user scrolls on
// the home page
jcsUtils.headerComponent.init('.visualdesign-menu-item', 'color--orange', jQuery('.portfeed--visualdesign').offset().top - 200, jQuery('.portfeed--printdesign').offset().top - 200);
jcsUtils.headerComponent.init('.printdesign-menu-item', 'color--reddish', jQuery('.portfeed--printdesign').offset().top - 200, jQuery('.portfeed--webdevelopment').offset().top - 200);
jcsUtils.headerComponent.init('.webdevelopment-menu-item', 'color--lightgreen', jQuery('.portfeed--webdevelopment').offset().top - 200);

