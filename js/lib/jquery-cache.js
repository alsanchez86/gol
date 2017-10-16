define(['jquery'], function ($) {
    return {
        store: {},
        get: function (selector, force) {
            if (this.store[selector] !== undefined && force === undefined) {
                return this.store[selector];
            }

            this.store[selector] = $(selector);
            return this.store[selector];
        }
    };
});