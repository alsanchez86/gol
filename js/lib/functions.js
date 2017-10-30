define(['$cache', 'store', 'underscore'], function ($cache, store, _) {
    // Los métodos del módulo que solamente se accedan desde el propio módulo, convertirlos en privado   
    var functions = {};
    
    store.set('cycle.current', 3);    

    functions.paintCellStatus = function (status, id) {
        if (!status) {
            $cache.get("#" + id).removeClass('live');
            return;
        }
        $cache.get("#" + id).addClass('live');
    }

    // No modificar las variables del store directamente desde funciones privadas
    /*
    return {
        setPlateau = function (rows, columns) {
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
            $cache.get('#plateau').css({
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
                            $cache.get('#plateau')
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
                $cache.get('#plateau').attr('disabled', true);
                $cache.get('#btn-start-gol').attr('disabled', true);
                $cache.get('#btn-pause-gol').removeAttr('disabled');
                return;
            }

            $cache.get('#plateau').removeAttr('disabled');
            $cache.get('#btn-start-gol').removeAttr('disabled');
            $cache.get('#btn-pause-gol').attr('disabled', true);
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