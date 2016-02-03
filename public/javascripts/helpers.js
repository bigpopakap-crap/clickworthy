(function() {

    window.K_HELPERS = window.K_HELPERS || {};

    /*
     * JQuery helper to serialize a from to JSON
     * Copied from: https://jsfiddle.net/gabrieleromanato/bynaK/
     */
    (function ($) {
        $.fn.serializeFormJSON = function () {

            var o = {};
            var a = this.serializeArray();
            $.each(a, function () {
                if (o[this.name]) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;
        };
    })(jQuery);

    window.K_HELPERS.MIXPANEL = {

        /*
         * Polls mixpanel until it is loaded, and then executes the
         * requested function
         */
        mixpanelQueue : function(doStuffFn) {
            (function() {
                var intervalId = setInterval(function() {
                    console.log('waiting: ' + intervalId);
                    if (mixpanel.__loaded) {
                        console.log('yay! loaded!: ' + intervalId);
                        clearInterval(intervalId);
                        doStuffFn();
                    }
                }, 100);
            })();
        }

    }

    /*
     *
     *
     * IMPORTANT! THIS FUNCTION
     * IS DUPLICATED ON THE SERVER AND CLIENT...
     * ALL CHANGES SHOULD BE MADE IN BOTH PLACES
     *
     *
     * Copied from
     * http://stackoverflow.com/questions/3452546/javascript-regex-how-to-get-youtube-video-id-from-url
     */
    window.K_HELPERS.youtube_parser = function(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

})();