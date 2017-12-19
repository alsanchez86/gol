define(['jquery'], function ($) {
    // cache read only
    var cache = {},
        _this = {};

    _this.set = function (selector) {
        _this[selector] = $(selector);
    }

    cache.get = function (selector, force) {
        if (_this[selector] !== undefined && force === undefined) {
            return _this[selector];
        }

        _this.set(selector);
        return _this[selector];
    }
    return cache;
});