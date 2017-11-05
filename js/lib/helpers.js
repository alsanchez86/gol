define(['underscore'], function (_) {
    var helpers = {};

    /*
        @param obj: Object
        @param key: String (JSON nomenclature)
        @return String or Undefined
    */
    helpers.getPropertyValue = function (obj, key) {
        if (!key || !_.isString(key)) {
            return;
        }

        var parts = key.split('.');

        for (var i = 0; i < parts.length; i++) {
            obj = obj[parts[i]];
        }
        return obj;
    }

    return helpers;
});