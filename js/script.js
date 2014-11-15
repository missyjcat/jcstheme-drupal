(function (jcsUtils, $) {

    var headerComponent = {

        /**
         * Given an el, class, and scroll height, add class to el when window
         * reaches scroll height. Remove it when window is above scroll height.
         * Optional testEndHeight which removes class after a certain height.
         * 
         * @param  {String} elQuery el to add class to - can be class or ID
         * @param  {String} testClass classname to add when testHeight is 
         *          triggered
         * @param  {Number} testHeight vert pos to trigger class
         * @param  {String} testEndHeight element to test for vert pos
         */
        addClassOnScroll: function(elQuery, testClass, testHeight, testEndHeight) {
            if ($(elQuery).length) {

                var TESTHEIGHT = testHeight || ($(elQuery).offset().top);

                var intervalId = setInterval( function() {

                    // Getting cross-browser compatible value of vertical
                    // position of scrollbar
                    vertPos = (window.pageYOffset !== undefined) ? 
                            window.pageYOffset : document.documentElement.scrollTop;
                    
                    if (vertPos > TESTHEIGHT && !($(elQuery).hasClass(testClass))) {
                        $(elQuery).addClass(testClass);
                    } else if (vertPos < TESTHEIGHT && $(elQuery).hasClass(testClass)) {
                        $(elQuery).removeClass(testClass);
                    }

                    if (testEndHeight) {
                        if (vertPos > testEndHeight) {
                            $(elQuery).removeClass(testClass);
                        }
                    }

                }, 50);

                return intervalId;

            }
        },

        /**
         * Given an el and some content, inject content into el when testHeight
         * is scrolled to. Optional testEndHeight to remove content after.
         * If `clearContent` is set to true, content will be cleared. If false
         * then content will be restored to what it was before. The default is
         * false.
         * 
         * @param  {String} elQuery - el to add class to - can be class or ID
         * @param  {String} content classname to add when testHeight is 
         *          triggered
         * @param  {Number} testHeight vert pos to trigger class
         * @param {Boolean} clearContent If true, content will be cleared. Default
         *                               is false.
         * @param  {String} testEndHeight element to test for vert pos
         */
        changeContentOnScroll: function(elQuery, content, testHeight, testEndHeight) {
            if ($(elQuery).length) {

                var TESTHEIGHT = testHeight || ($(elQuery).offset().top);
                var TESTENDHEIGHT = testEndHeight || $(document).height();

                var intervalId = setInterval( function() {

                        // Getting cross-browser compatible value of vertical
                        // position of scrollbar
                        vertPos = (window.pageYOffset !== undefined) ? 
                                window.pageYOffset : document.documentElement.scrollTop;
                        
                        if (vertPos > TESTHEIGHT && $(elQuery).html() !== content && vertPos < TESTENDHEIGHT) {
                            $(elQuery).html(content);
                        } 
                        // else if (vertPos < TESTHEIGHT && $(elQuery).html() === content) {
                        //     clearInterval(intervalId);
                        // }

                        // if (testEndHeight) {
                        //     if (vertPos > testEndHeight) {
                        //         clearInterval(intervalId);
                        //     }
                        // }

                    }, 50);

                return intervalId;
            }
        }

    };

    $(document).ready( function() {
        /**
         * Storing procedural initialization of scroll behaviors but storing
         * interval Ids in an array so we can clear them later when we call
         * again upon window resize.
         */
        
        var activeSetIntervalIds = [];
        
        var initializeScroll = function() {

            intervalIdsArray = [];

            // Collapsing the main header
            intervalIdsArray.push(headerComponent.addClassOnScroll('.header--collapsed', 'is-shown', 90));

            // When header collapses, making sure the page adjusts to make up for the jump
            // headerComponent.addClassOnScroll('.page', 'extrapadding', 100);

            // These control the highlighting of the portfolio menu as the user scrolls on
            // the home page
            if ($('.portfoliomenu').length) {

                intervalIdsArray.push(headerComponent.addClassOnScroll(
                        '.portfoliomenu--stickyheader',
                        'is-shown',
                        $('.portfoliomenu').offset().top - 39));

                intervalIdsArray.push(headerComponent.addClassOnScroll(
                        '.design-menu-item', 
                        'color--orange',
                        $('.portfeed--design').offset().top - 200,
                        $('.portfeed--otherprojects').offset().top - 200));

                intervalIdsArray.push(headerComponent.addClassOnScroll(
                        '.otherprojects-menu-item', 
                        'color--reddish', 
                        $('.portfeed--otherprojects').offset().top - 200));

                intervalIdsArray.push(headerComponent.addClassOnScroll(
                        '.webdevelopment-menu-item',
                        'color--lightgreen',
                        $('.portfeed--webdevelopment').offset().top - 200,
                        $('.portfeed--design').offset().top - 200));

                // Apply the active class on the homepage only if we hit the portfolio section
                intervalIdsArray.push(headerComponent.addClassOnScroll(
                        '.portfolio-menu-item',
                        'active',
                        $('.portfoliomenu').offset().top - 100));

                return intervalIdsArray;

            }
        };

        activeSetIntervalIds = activeSetIntervalIds.concat(initializeScroll());

        /**
         * If we're in mobile mode, tell the user what they're seeing in the
         * portfolio as they are scrolling
         */
        
        var initializeContentOnScroll = function() {

            var intervalIdsArray = [];

            if ($('.portfoliomenu').length) {
                intervalIdsArray.push(headerComponent.changeContentOnScroll(
                        '.portfolio-descriptor', 
                        ' ',
                        1,
                        $('.portfeed--webdevelopment').offset().top - 200));

                intervalIdsArray.push(headerComponent.changeContentOnScroll(
                        '.portfolio-descriptor', 
                        '<span class="color--orange">DESIGN</span>',
                        $('.portfeed--design').offset().top - 200,
                        $('.portfeed--otherprojects').offset().top - 200));

                intervalIdsArray.push(headerComponent.changeContentOnScroll(
                        '.portfolio-descriptor', 
                        '<span class="color--reddish">OTHER</span>', 
                        $('.portfeed--otherprojects').offset().top - 200));

                intervalIdsArray.push(headerComponent.changeContentOnScroll(
                        '.portfolio-descriptor',
                        '<span class="color--lightgreen">WEBDEV</span>',
                        $('.portfeed--webdevelopment').offset().top - 200,
                        $('.portfeed--design').offset().top - 200));

                return intervalIdsArray;
            }

        };

        activeSetIntervalIds = activeSetIntervalIds.concat(initializeContentOnScroll());

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

            if ($(window).width() <= 945) {
                $('.header--collapsed').addClass('js-mobile');
            } else {
                $('.header--collapsed').removeClass('js-mobile');
            }

        };

        doPositioning();


        $(window).resize( function() {
            
            // When window resizes, readjust the header scroll behavior
            for (var i = 0; i < activeSetIntervalIds.length; i++) {
                clearInterval(activeSetIntervalIds[i]);
            }

            activeSetIntervalIds.length = 0;
            activeSetIntervalIds = activeSetIntervalIds.concat(initializeScroll());
            activeSetIntervalIds = activeSetIntervalIds.concat(initializeContentOnScroll());

            // When winow resizes, reposition the datelist and cateogrylist
            doPositioning();
        });

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

	$('.webdevelopment-menu-item').click( function() {
	    $('html,body').animate({
		scrollTop: ($('.portfeed--webdevelopment').offset().top - 200) + 'px'
	    });
	});

	$('.design-menu-item').click( function() {
	    $('html,body').animate({
		scrollTop: ($('.portfeed--design').offset().top - 190) + 'px'
	    });
	});

	$('.otherprojects-menu-item').click( function() {
	    $('html,body').animate({
		scrollTop: ($('.portfeed--otherprojects').offset().top - 190) + 'px'
	    });
	});

        $('.carrot').click( function() {
            $('.js-mobile ul').slideToggle('fast');
        });

        $('.js-mobile ul li a').click( function() {
            $('.js-mobile ul').slideToggle('fast');
        });

        /**
         * When user clicks on the portfolio menu item, scroll to the portfolio
         * section of the homepage
         */
        if (window.location.pathname === '/') {
            if (window.location.hash === '#portfolio') {
                $(window).scrollTop($('.portfoliomenu').offset().top - 38);
            }
        }

        /**
         * PORTFOLIO IMAGES
         * When portfolio pages load, target each portfolio image and change
         * the link source to the full res version of the image. Each thumbnail
         * just has 'xxl' in the name, so we are just taking out that to link
         * to the full image.
         *
         * Then also add rel="shadowbox" so that we can open the image with the
         * shadowbox plugin.
         *
         * Maybe one day just do this in Drupal.
         */
        
        $('.portimages__container a').each( function() {
            var href = $(this).attr('href');
            var regex = /xxlarge_/g;
            href = href.replace(regex, '');
            $(this).attr('href', href);
            $(this).attr('rel', 'shadowbox[gallery]');
        });

        // Initiate shadowbox plugin
        Shadowbox.init();

    });

})(window.jcsUtils = window.jcsUtils || {}, jQuery);
