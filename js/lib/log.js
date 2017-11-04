define(function () {
    var log = {};
    var _this = (function () {
        // tomar mensajes de un JSON externo ¿cargado con requireJS, plugin?
        // Guardar en el localstorage el historial de mensajes, distinguiendo entre normales y errores
        return {
            general: {
                max_plateau: 'Se ha sobrepasado el máximo de celdas permitidas.',
                load_config: 'Loaded config file.'
            }
        }
    })();

    log.message = function (key) {
        if (_this[key]) {
            console.log(_this[key]);
        }
    }
    return log;
});