define(['log'], function (log) {
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

    store.set = function (property, value) {
        console.log(this);
    }

    store.get = function (key) {
        if (!key) {
            log.write("store.select_property");
            return;
        }

        var splited,
            candidate,
            _store;

        _store = _this;
        splited = key.split('.');

        for (var i = 0; i < splited.length - 1; i++) {
            candidate = _store[splited[i]];

            if (!candidate) {
                log.write("store.has_property", key);
                return;
            }
            _store = candidate;
        }
        return _store[splited[i]];
    }

    return store;
});