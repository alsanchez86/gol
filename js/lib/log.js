// tomar mensajes de un JSON externo ¿cargado con requireJS, plugin?
// Guardar en el localstorage el historial de mensajes, distinguiendo entre normales y errores

define(['helpers', 'underscore'], function (helpers, _) {
    var log = {};
    var _messages = {
        general: {
            load_config: 'Loaded config file.'
        },
        plateau: {
            max_plateau: 'Se ha sobrepasado el máximo de celdas permitidas.',
        },
        store: {
            select_property: "Select a property from the store.",
            errors: {
                hasnt_property: "Error: Property {} dont exists in the store.",
            }          
        }
    }

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
        return helpers.getPropertyValue(_messages, key);
    }

    return log;
});