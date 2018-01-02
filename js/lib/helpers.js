define(["exports", "lodash"], function (exports, _) {    
    /*
        @param obj: Object
        @param key: String (JSON nomenclature)
        @return String or Undefined
    */
    exports.getPropertyValue = function (obj, key) {
        if (!key || !_.isString(key)) {
            return;
        }

        var parts = key.split(".");

        for (var i = 0; i < parts.length; i++) {
            obj = obj[parts[i]];
        }
        return obj;
    };
});