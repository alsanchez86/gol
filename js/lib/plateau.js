define(["exports", "_$", "store", "log", "lodash"], function (exports, _$, store, log, _) {
    /* Private Vars */

    /* Public Vars */

    /* Private Methods */
    function _paintCellStatus(status, id) {
        if (!status) {
            _$.get("#" + id).removeClass("live");
            return;
        }

        _$.get("#" + id).addClass("live");
    }

    function _setPlateauDimensions(rows, columns) {
        rows = _.toInteger(rows);
        columns = _.toInteger(columns);

        store.set("plateau.rows", rows);
        store.set("plateau.columns", columns);
    }

    function _setCells() {
        var rows = store.get("plateau.rows"),
            columns = store.get("plateau.columns");

        for (i = 1; i <= rows; i++) {
            // columns
            for (u = 1; u <= columns; u++) {
                store.add('plateau.cells', cell.new({
                    id: u + "-" + i,
                    x: u,
                    y: i,
                    status: false,
                    cycleStatus: false
                }));               
            }
        }

        store.set("plateau.cells", cells);
    }

    function _paintPlateau() {
        // plateau
        _$.get("#plateau").css({
            height: store.get("plateau.rows") + "vw",
            width: store.get("plateau.columns") + "vw"
        });

        // cells       
        if (store.get("plateau.cells").length) {
            _.forEach(store.get("plateau.cells"), function (cell) {
                $("<div/>")
                    .attr({
                        id: cell.id
                    })
                    .addClass("plateau-cell")
                    .appendTo(_$.get("#plateau"))
                    .click(function (event) {
                        ui.cellClick(event);
                    });
            });
        } else {
            _$.get("#plateau").empty();
        }
    }

    function _goOne() {
        // update lives on store        
        store.set('plateau.lives', _.filter(store.get('plateau.cells'), function (cell) {
            return cell.status === true;
        }));

        if (store.get('plateau.lives').length > 0) {
            // determine cycleStatus by status
            _.each(store.get('plateau.lives'), function (cell) {
                // get colindantes
                var colindantes = _getColindantes(cell);
                // check current cell status
                cell.cycleStatus = _checkCellStatus(cell, colindantes, 'status');
                // check deads colindantes for better performance
                _checkDeadsColindantes(colindantes);
            });

            // validate cycleStatus by cycleStatus
            _.each(store.plateau.cells, function (cell) {
                if (cell.cycleStatus && cell.status != cell.cycleStatus) {
                    // get colindantes
                    var colindantes = _getColindantes(cell);
                    // check current cell status
                    cell.cycleStatus = _checkCellStatus(cell, colindantes, 'cycleStatus');
                }
            });
        }
    }

    function _endOne() {
        store.set('cycle.current', store.get('cycle.current') ++);

        _.each(
            store.get('plateau.cells'),
            function (cell) {
                cell.status = cell.cycleStatus;
                _paintCellStatus(cell.status, cell.id);
            }
        );        
    }

    /* Public Methods */
    exports.cellClick = function (event) {
        if (store.get("cycle.running")) {
            return;
        }

        var id = event.currentTarget.id;
        var cell = _.find(store.get("plateau.cells"), {
            id: id
        });

        cell.status = !cell.status;
        _paintCellStatus(cell.status, id);
    }

    exports.validatePlateau = function (rows, columns) {
        rows = _.toInteger(rows);
        columns = _.toInteger(columns);

        var mins = rows >= store.get('config.plateau.rows.min') && columns >= store.get('config.plateau.columns.min');
        var maxs = rows <= store.get('config.plateau.rows.max') && columns <= store.get('config.plateau.columns.max');

        return mins && maxs;
    }

    exports.initInterval = function () {
        store.set('cycle.running', true);
        store.set('store.cycle.interval', setInterval(function () {
            _goOne();

            if (store.get('plateau.lives').length === 0 || (!!store.get('cycle.limit') && (store.get('cycle.current') === store.get('cycle.limit')))) {
                log.write('general.game_over');
                ui.pause();
                return;
            }
            
            _endOne();
        }, store.get('store.cycle.time')));
    }

    exports.create = function (rows, columns) {
        _setPlateauDimensions(rows, columns);
        _setCells();
        _paintPlateau();

        store.set('plateau.created', true);
    }

    exports.erase = function () {
        _setPlateauDimensions(0, 0);
        _setCells();
        _paintPlateau();
        clearInterval(store.get('cycle.interval'));

        store.set('plateau.created', false);
        store.set('cycle.running', false);
        store.set('cycle.current', 0);
    }
});