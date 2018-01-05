define(["exports", "$cache", "store", "lodash", "log", "plateau"], function (exports, $c, store, _, log, plateau) {
    /* Private Vars */

    /* Public Vars */

    /* Private Methods */
    function _showConfig() {
        // show config on ui
        $c.get('#config-plateau-max-rows').text(store.get('config.plateau.rows.max'));
        $c.get('#config-plateau-max-columns').text(store.get('config.plateau.columns.max'));
        $c.get('#config-plateau-min-rows').text(store.get('config.plateau.rows.min'));
        $c.get('#config-plateau-min-columns').text(store.get('config.plateau.columns.min'));
    }

    function _updateUiStatus() {
        var created = store.get('plateau.created');
        var running = store.get('cycle.running');

        // plateau
        $c.get('#plateau').attr('disabled', !created || running);

        // form
        $c.get('#form-rows').attr('disabled', created || running);
        $c.get('#form-columns').attr('disabled', created || running);

        // ui buttons
        $c.get('#btn-plateau-generator').attr('disabled', created || running);
        $c.get('#btn-start-gol').attr('disabled', !created || running);
        $c.get('#btn-pause-gol').attr('disabled', !created || !running);
        $c.get('#btn-reset-gol').attr('disabled', !created || running);
    }

    function _createPlateau() {
        var rows = $c.get('#form-rows').val();
        var columns = $c.get('#form-columns').val();

        if (!plateau.validatePlateau(rows, columns)) {
            log.write('plateau.invalid_plateau');
            $c.get('#plateau-generator-control').addClass("has-danger");
            return;
        }

        $c.get('#plateau-generator-control').removeClass("has-danger");
        plateau.create(rows, columns);        
        _updateUiStatus();
    }

    function _start() {
        if (!store.get('cycle.running')) {            
            plateau.initInterval();
            _updateUiStatus();
        }
    }

    function _reset() {                    
        plateau.erase();
        _updateUiStatus();
    }

    function _registerUiEvents() {
        // btn plateau generator click event        
        $c.get('#btn-plateau-generator').bind('click', function () {
            _createPlateau();
        });

        // btn start click event
        $c.get('#btn-start-gol').bind('click', function () {
            _start();
        });

        // btn pause click event
        $c.get('#btn-pause-gol').bind('click', function () {
            _pause();
        });

        // btn reset click event
        $c.get('#btn-reset-gol').bind('click', function () {
            _reset();
        });
    }

    function _uiInitValues() {
        $c.get('#form-rows')
            .attr({
                placeholder: store.get('config.plateau.rows.max'),
                min: store.get('config.plateau.rows.min'),
                max: store.get('config.plateau.rows.max')
            })
            .val(store.get('config.plateau.rows.max'));

        $c.get('#form-columns')
            .attr({
                placeholder: store.get('config.plateau.columns.max'),
                min: store.get('config.plateau.columns.min'),
                max: store.get('config.plateau.columns.max')
            })
            .val(store.get('config.plateau.columns.max'));
    }

    /* Public Methods */
    exports.init = function () {
        _registerUiEvents();
        _showConfig();
        _uiInitValues();
        _updateUiStatus();
    };

    // No modificar las variables del store directamente desde funciones privadas
    /*
        return {
            setPlateauDimensions = function (rows, columns) {
                store.plateau.rows = rows;
                store.plateau.columns = columns;
            },
            setCells = function () {
                // rows
                for (i = 1; i <= store.plateau.rows; i++) {
                    // columns 
                    for (u = 1; u <= store.plateau.columns; u++) {
                        store.plateau.cells.push({
                            id: u + "-" + i,
                            x: u,
                            y: i,
                            status: false,
                            cycleStatus: false
                        });
                    }
                }
            },
            paintScenario = function () {
                // plateau
                $c.get('#plateau').css({
                    height: store.plateau.rows + "vw",
                    width: store.plateau.columns + "vw"
                });

                // cells
                _.each(
                    store.plateau.cells,
                    function (cell) {
                        $('<div/>')
                            .attr({
                                id: cell.id
                            })
                            .addClass('plateau-cell')
                            .appendTo(
                                $c.get('#plateau')
                            )
                            .click(function (event) {
                                cellClick(event);
                            });
                    });
            },
            cellClick = function (event) {
                if (store.cycle.running) {
                    return;
                }

                var id = event.currentTarget.id;
                var cell = _.findWhere(store.plateau.cells, {
                    id: id
                });

                cell.status = !cell.status;
                paintCellStatus(cell.status, id);
            },
            initInterval = function () {
                store.cycle.interval = setInterval(function () {
                    var lives = goOne();

                    if (lives.length === 0 || (!!store.cycle.limit && (store.cycle.current === store.cycle.limit))) {
                        console.log('GAME OVER');
                        reset();
                        return;
                    }

                    store.cycle.current++;
                    console.log("Cycle: " + store.cycle.current);

                }, store.cycle.time);
            },
            start = function () {
                store.cycle.running = true;
                startedUi();
                initInterval();
            },
            pause = function () {
                store.cycle.running = false;
                startedUi();
                clearInterval(store.cycle.interval);
            },
            reset = function () {
                store.cycle.running = false;
                store.cycle.current = 0;

                startedUi();
                clearInterval(store.cycle.interval);

                _.each(store.plateau.cells, function (cell) {
                    cell.cycleStatus = false;
                    cell.status = false;
                    paintCellStatus(cell.status, cell.id);
                });
            },
            goOne = function () {
                var lives = _.filter(store.plateau.cells, function (cell) {
                    return cell.status;
                });

                if (lives.length > 0) {
                    // determine cycleStatus by status
                    _.each(lives, function (cell) {
                        // get colindantes
                        var colindantes = getColindantes(cell);

                        // check current cell status
                        cell.cycleStatus = checkCellStatus(cell, colindantes, 'status');

                        // check deads colindantes for better performance
                        checkDeadsColindantes(colindantes);
                    });

                    // validate cycleStatus by cycleStatus
                    _.each(store.plateau.cells, function (cell) {
                        if (cell.cycleStatus && cell.status != cell.cycleStatus) {
                            // get colindantes
                            var colindantes = getColindantes(cell);

                            // check current cell status
                            cell.cycleStatus = checkCellStatus(cell, colindantes, 'cycleStatus');
                        }
                    });

                    endOne();
                }

                return lives;
            },
            checkDeadsColindantes = function (colindantes) {
                var colindante = {};
                var colindantesColindantes = [];

                for (var i = 0; i < colindantes.length; i++) {
                    colindante = colindantes[i];

                    if (!colindante.status) {
                        colindantesColindantes = getColindantes(colindante);
                        colindante.cycleStatus = checkCellStatus(colindante, colindantesColindantes, 'status');
                    }
                }
            },
            endOne = function () {
                _.each(
                    store.plateau.cells,
                    function (cell) {
                        cell.status = cell.cycleStatus;
                        paintCellStatus(cell.status, cell.id);
                    }
                );
            },
            getColindantes = function (cell) {
                var colindantes = [];

                for (var i = 0; i < store.colindantesAxis.length; i++) {
                    var colindante = _.findWhere(
                        store.plateau.cells, {
                            x: cell.x + store.colindantesAxis[i].x,
                            y: cell.y + store.colindantesAxis[i].y
                        }
                    );

                    if (_.size(colindante)) {
                        colindantes.push(colindante);
                    }
                }

                return colindantes;
            },
            startedUi = function () {
                if (store.cycle.running) {
                    $c.get('#plateau').attr('disabled', true);
                    $c.get('#btn-start-gol').attr('disabled', true);
                    $c.get('#btn-pause-gol').removeAttr('disabled');
                    return;
                }

                $c.get('#plateau').removeAttr('disabled');
                $c.get('#btn-start-gol').removeAttr('disabled');
                $c.get('#btn-pause-gol').attr('disabled', true);
            },
            checkCellStatus = function (cell, colindantes, field) {                
                // Cada celda con uno o ningún vecino          -> muere.
                // Cada celda con 3 o más vecinos              -> muere.
                // Cada celda con 2 o 3 vecinos                -> vive.        
                
                return field === 'status' ? livesCells(cell, colindantes, field) === 3 : livesCells(cell, colindantes, field) <= 3;
            },
            livesCells = function (cell, colindantes, field) {
                var lives = [];

                _.each(
                    colindantes,
                    function (element) {
                        if (element[field]) {
                            lives.push(element);
                        }
                    }
                );

                return lives.length;
            }
        };
        */
});