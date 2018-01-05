/*
    TODO:
    - Guardar en el localstorage el historial de mensajes, distinguiendo entre normales y errores    
*/

define(["require", "exports", "json!es", "lodash", "_$", "store"], function (require, exports, es, _, _$, store) {    
    /* Private Vars */
    var replace = "%%";  
    var store = require('store'); // circular dependency

    /* Public Vars */

    /* Private Methods */

    /* Public Methods */
    /*
        @param key: String (JSON nomenclature) [./lang/es.json]
        @param array: Array. [replace %%]
        @return void
    */
    exports.write = function (key, array) {
        var message = this.getFromJson(key),
            p = _$.get('<p/>'),
            type = "";

        if (message && _.isString(message)) {
            if (message.indexOf(replace) !== -1 && !_.isUndefined(array) && _.isArray(array)) {
                _.forEach(array, function (value) {
                    message = message.replace(replace, _.isArray(value) ? JSON.stringify(value) : value);
                });
            }
            key = message;
        }

        // navigator console
        console.log(key);

        // app console    
        if (key.length > store.get('config.console.max_length_output')){
            key = key.substring(0, store.get('config.console.max_length_output')) + '...';
        }
        
        _$.get("#console-output").prepend("<p class=" + type + '><i class="fa fa-info-circle" aria-hidden="true"></i>&nbsp;' + key + "</p>");
    };

    exports.getFromJson = function (key) {
        return _.get(es, key);
    };
});