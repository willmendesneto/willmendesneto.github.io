/**
 * Main JS file for Casper behaviours
 */

/*globals jQuery, document */
(function ($) {
    "use strict";

    $(document).ready(function(){

        $(".post-content").fitVids();

        // if ( $(window).width() >720 ) {
        //   $('#post-content-page a').miniPreview({ prefetch: 'pageload' });
        // }

        // Calculates Reading Time
        $('.post-content').readingTime({
            readingTimeTarget: '.post-reading-time',
            wordCountTarget: '.post-word-count',
        });

        // Creates Captions from Alt tags
        $(".post-content img").each(function() {
            // Let's put a caption if there is one
            if($(this).attr("alt"))
              $(this).wrap('<figure class="image"></figure>')
              .after('<figcaption>'+$(this).attr("alt")+'</figcaption>');
        });

    });

}(jQuery));
