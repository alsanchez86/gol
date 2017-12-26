/*
    TODO:
    
    - Guardar en el localstorage el historial de mensajes, distinguiendo entre normales y errores
*/

define(["json!es", "lodash", "$cache"], function (es, _, $c) {
    /* Private Vars */
    var replace = "%%";
    
    /* Public Vars */
    var log = {};

    /* Private Methods */       

    /* Public Methods */
    /*
        @param key: String (JSON nomenclature) [./lang/es.json]
        @param array: Array. [replace %%]
        @return void
    */
    log.write = function (key, array) {
        var message = this.getFromJson(key),
            type = "";

        if (message && _.isString(message)) {
            if (
                message.indexOf(replace) !== -1 &&
                !_.isUndefined(array) &&
                _.isArray(array)
            ) {
                _.forEach(array, function (value) {
                    message = message.replace(
                        replace,
                        _.isArray(value) ? JSON.stringify(value) : value
                    );
                });
            }
            key = message;
        }
        
        // navigator console
        console.log(key);

        // app console
        $c
            .get("#console-output")
            .html(
                "<p class=" +
                type +
                '><i class="fa fa-info-circle" aria-hidden="true"></i>&nbsp;' +
                key +
                "</p>" +
                $c.get("#console-output").html()
            );
    };

    log.getFromJson = function (key) {
        return _.get(es, key);
    };

    return log;
});