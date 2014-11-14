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
                    vertPos = (window.pageYOffset !== undefined) ? 
                            window.pageYOffset : document.documentElement.scrollTop;
                    
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

                }, 50);

            }
        }

    };

    $(document).ready( function() {
        /**
         * Initializing components
         */

        // Collapsing the main header
        headerComponent.init('.header--collapsed', 'is-shown', 90);

        // When header collapses, making sure the page adjusts to make up for the jump
        // headerComponent.init('.page', 'extrapadding', 100);

        // These control the highlighting of the portfolio menu as the user scrolls on
        // the home page
        if ($('.portfoliomenu').length) {

            headerComponent.init(
                    '.portfoliomenu--stickyheader',
                    'is-shown',
                    $('.portfoliomenu').offset().top - 39);

            headerComponent.init(
                    '.visualdesign-menu-item', 
                    'color--orange',
                    $('.portfeed--visualdesign').offset().top - 200,
                    $('.portfeed--printdesign').offset().top - 200);

            headerComponent.init(
                    '.printdesign-menu-item', 
                    'color--reddish', 
                    $('.portfeed--printdesign').offset().top - 200,
                    $('.portfeed--webdevelopment').offset().top - 200);

            headerComponent.init(
                    '.webdevelopment-menu-item',
                    'color--lightgreen',
                    $('.portfeed--webdevelopment').offset().top - 200);

            // Apply the active class on the homepage only if we hit the portfolio section
            headerComponent.init(
                    '.portfolio-menu-item',
                    'active',
                    $('.portfoliomenu').offset().top - 100);
        }

        /**
         * Removing the "active" class from portfolio when we hit the homepage
         */
        
        if ($('.portfolio-menu-item').hasClass('active') &&
                    $('body').hasClass('is-front')) {
            $('.portfolio-menu-item').removeClass('active');
        }

        if (window.location.hash === '#portfolio') {
            $('.portfolio-menu-item').addClass('active');
        }

        /**
         * Applying the "active" class in menu items for certain node types
         */
        
        if ($('body').hasClass('node-type-portfolio-piece')) {
            $('.portfolio-menu-item').addClass('active');
        }

        if ($('body').hasClass('pathone-blog')) {
            $('.blog-menu-item').addClass('active');
        }

        /**
         * This sucks, but move the page title after the blog header for certain pages
         */
        $('.page-blog-categories .page-title, .page-blog-date .page-title').prependTo('.blogindex--wrapper');

        /**
         * Positioning the datelist and categories list below the menu titles
         */
        var doPositioning = function() {

            if ($('.datelist').length) {
                var elsArray  = [
                    ['.datelist', '.blogheader__filters__dates'],
                    ['.categorylist', '.blogheader__filters__categories']
                ];

                for (var i = 0; i < elsArray.length; i++) {
                    var list = $(elsArray[i][0]);
                    var menuPos = $(elsArray[i][1]).offset();

                    list.css({
                        top: menuPos.top + 41 + 'px',
                        left: menuPos.left + 'px'
                    });
                }                
            }

        };

        doPositioning();

        $(window).resize( function() {
            doPositioning();
        });

        /**
         * Adding click listeners
         */
        
        $('.js-dates').click( function() {
            $('.datelist').slideToggle('fast');
        });

        $('.js-categories').click( function() {
            $('.categorylist').slideToggle('fast');
        });

        $('.portfolio-menu-item').click( function(event) {
            event.preventDefault();
            if (window.location.pathname !== '/') {
                window.location = '/#portfolio';
            } else {
                $('html,body').animate({
                    scrollTop: ($('.portfoliomenu').offset().top - 38) + 'px'
                });
            }
        });

        $('.carrot').click( function() {
            $('.header--collapsed').addClass('js-mobile');
            $('.js-mobile ul').slideToggle('fast');
        });

        $('.js-mobile li').click( function() {
            $('.js-mobile ul').slideToggle('fast');
        })

        /**
         * When user clicks on the portfolio menu item, scroll to the portfolio
         * section of the homepage
         */
        if (window.location.pathname === '/') {
            if (window.location.hash === '#portfolio') {
                $(window).scrollTop($('.portfoliomenu').offset().top - 38);
            }
        }

    });

})(window.jcsUtils = window.jcsUtils || {}, jQuery);
