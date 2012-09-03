(function ($) {
    "use strict";
    $.fn.infiniteScroll = function (options) {
        options = $.extend({
            element: document,
            callback: function () {
            },
            threshold: 5,
            spinner: true
        }, options);

        var Scroll = function (opts) {
            this.opts = opts;
            this.callback = opts.callback;
            this.updating = false;
            this.element = $(opts.element);
            this.prevScrollPos = this.element.scrollTop();
            this.element.addClass('infinite-scroll');
            this.onScroll = $.proxy(this.onMoveEvent, this);
            if (opts.spinner) {
                this.addSpinner();
            }
            this.element.bind("scroll", this.onScroll);
        };

        Scroll.prototype = {
            onMoveEvent: function (e) {
                if (this.updating) {
                    return;
                }

                var scrollPos = this.element.scrollTop(),
                    threshold = this.element[0].scrollHeight -
                        (scrollPos + this.element.height()),
                    finished;

                if (threshold < this.opts.threshold) {
                    if (this.opts.spinner) {
                        this.loader.show();
                    }
                    this.updating = true;

                    finished = this.callback();
                    if (this.opts.spinner) {
                        this.loader.hide();
                    }
                    this.updating = false;
                    if (finished === true) {
                        this.destroy();
                    }

                }

                this.prevScrollPos = scrollPos;
            },
            addSpinner: function () {
                this.loader = $("<div class='infinite-scroll-loader'/>");
                this.element.append(this.loader);
            },
            destroy: function () {
                this.element.unbind("scroll", this.onScroll);
                delete this.loader;
            }
        };

        $(this).each(function () {
            return new Scroll(options);
        });
    };
}(jQuery));
