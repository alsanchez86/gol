define(['jquery'], function ($) {
    // cache read only
    var cache = {};
    var _this = {};

    _this.set = function (selector) {
        cache[selector] = $(selector);
    }

    cache.get = function (selector, force) {
        if (cache[selector] !== undefined && force === undefined) {
            return cache[selector];
        }

        _this.set(selector);
        return cache[selector];
    }
    return cache;
});