define(['log', 'helpers'], function (log, helpers) {
    var store = {},
        _this = {
            cycle: {
                current: 0,
                limit: 0,
                time: 500,
                interval: null,
                running: false
            },
            plateau: {
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

    // si ya existe la propiedad en el store, actualizarla
    // si no existe la propiedad en el store, crearla
    store.set = function (key, value) {        
        if (!key || !_.isString(key)) {
            return;
        }

        var parts = key.split('.');

        for (var i = 0; i < parts.length; i++) {            
            if (i == (parts.length - 1)){
                _this[parts[i]] = value;
            }
        }
    }

    store.get = function (key) {
        var value = helpers.getPropertyValue(_this, key);

        if (typeof value === "undefined"){
            log.write("store.errors.hasnt_property", key);            
        }           
        return value;
    }

    return store;
});