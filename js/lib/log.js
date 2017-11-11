// tomar mensajes de un JSON externo ¿cargado con requireJS, plugin?
// Guardar en el localstorage el historial de mensajes, distinguiendo entre normales y errores

define(['json!es', 'lodash'], function (es, _) {
    var log = {};    

    log.write = function (key, aux) {
        var message = this.get(key);

        if (message && _.isString(message)) {
            if (message.indexOf("{}") !== -1 && !_.isUndefined(aux)) {
                message = message.replace("{}", aux);
            }
            key = message;
        }
        console.log(key);
    }

    log.get = function (key) {
        return _.get(es, key);
    }

    return log;
});