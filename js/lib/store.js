/*
    TODO:
    
    - Implementar con REDUX. Puede que ya no sea necesario este módulo.
*/

define(["exports", "log", "lodash", "json!config"], function (exports, log, _, config) {
    /* Private Vars */
    var _this = {
        config: (function () {
            if (typeof config === 'object' && config.plateau.rows && config.plateau.columns) {
                return config;
            }
            return false;
        })(),
        cycle: {
            current: 0,
            limit: 0,
            time: 500,
            interval: null,
            running: false
        },
        plateau: {
            created: false,
            rows: 0,
            columns: 0,
            cells: []
        },
        colindantesAxis: [{
                id: 1,
                x: -1,
                y: -1
            },
            {
                id: 2,
                x: 0,
                y: -1
            },
            {
                id: 3,
                x: +1,
                y: -1
            },
            {
                id: 4,
                x: -1,
                y: 0
            },
            {
                id: 5,
                x: +1,
                y: 0
            },
            {
                id: 6,
                x: -1,
                y: +1
            },
            {
                id: 7,
                x: 0,
                y: +1
            },
            {
                id: 8,
                x: +1,
                y: +1
            }
        ]
    };

    /* Public Vars */

    /* Private Methods */

    /* Public Methods */
    exports.set = function (key, value) {
        _.set(_this, key, value);
        log.write("store.setting_property", [key, value]);
    }

    exports.get = function (key) {
        return _.get(_this, key);
    }

    exports.remove = function (key) {
        if (_.unset(_this, key)) {
            log.write("store.remove_property", [key]);
        }
    }
});