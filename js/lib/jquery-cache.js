define(['jquery'], function ($) {
    // cache read only
    var cache = {};

    cache.get = function (selector, force) {
        if (cache[selector] !== undefined && force === undefined) {
            return cache[selector];
        }

        cache[selector] = $(selector);
        return cache[selector];
    }

    return cache;
});