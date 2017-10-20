define(['jquery'], function ($) {
    var store = {};

    return {        
        get: function (selector, force) {
            if (store[selector] !== undefined && force === undefined) {
                return store[selector];
            }

            store[selector] = $(selector);
            return store[selector];
        }
    };
});