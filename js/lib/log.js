// tomar mensajes de un JSON externo ¿cargado con requireJS, plugin?
// Guardar en el localstorage el historial de mensajes, distinguiendo entre normales y errores

define(function () {
    var log = {};
    var _messages = {
        general: {
            load_config: 'Loaded config file.'
        },
        plateau: {
            max_plateau: 'Se ha sobrepasado el máximo de celdas permitidas.',
        },
        store: {
            has_property: "Dont exist property {} in the store.",
            select_property: "Select a property from the store"
        }
    }

    log.write = function (key) {
        var message = this.get(key);

        if (message) {
            if (message.indexOf("{}") !== -1) {
                message.replace("{}", key);
            }
            key = message;
        }

        console.log(key);
    }

    log.get = function (key) {
        if (!key) {
            return;
        }

        var splited,
            candidate,
            messages;

        messages = _messages;
        splited = key.split('.');

        for (var i = 0; i < splited.length - 1; i++) {
            candidate = messages[splited[i]];

            if (!candidate) {
                return;
            }
            messages = candidate;
        }
        return messages[splited[i]];
    }

    return log;
});