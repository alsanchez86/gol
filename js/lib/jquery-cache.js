/*
    Cache read only
*/
define(["jquery"], function ($) {
    /* Private Vars */

    var _this = {};

    /* Public Vars */
    var cache = {};

    /* Private Methods */
    function _set(selector) {
        _this[selector] = $(selector);
    }

    /* Public Methods */
    cache.get = function (selector, force) {
        if (_this[selector] !== undefined && force === undefined) {
            return _this[selector];
        }

        _set(selector);
        return _this[selector];
    };

    /* Return Module */
    return cache;
});