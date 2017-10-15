define(function () {
    var functions = {};

    functions.setCells = function () {
        for (i = 1; i <= plateau.rows; i++) { // rows        
            for (u = 1; u <= plateau.columns; u++) { // columns    
                var cell = {
                    id: u + "-" + i,
                    x: u,
                    y: i,
                    status: false, //dead
                    cycleStatus: false //dead
                };

                plateau.cells.push(cell);
            }
        }
    };

    functions.paintScenario = function () {
        // plateau
        $cache
            .get('#plateau')
            .css({
                height: plateau.rows + "vw",
                width: plateau.columns + "vw"
            });

        // cells
        _.each(
            plateau.cells,
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
    };

    functions.paintCellStatus = function (status, id) {
        if (!status) {
            $cache
                .get("#" + id)
                .removeClass('live');
            return;
        }

        $cache
            .get("#" + id)
            .addClass('live');
    };

    functions.cellClick = function (event) {
        if (cycle.running) {
            return;
        }

        var id = event.currentTarget.id;
        var cell = _.findWhere(plateau.cells, {
            id: id
        });

        cell.status = !cell.status;
        paintCellStatus(cell.status, id);
    };

    functions.initInterval = function () {
        cycle.interval = setInterval(function () {
            var lives = goOne();

            if (lives.length === 0 || (!!cycle.limit && (cycle.current === cycle.limit))) {
                console.log('GAME OVER');
                reset();
                return;
            }

            cycle.current++;
            console.log("Cycle: " + cycle.current);

        }, cycle.time);
    };

    functions.start = function () {
        cycle.running = true;
        startedUi();
        initInterval();
    };

    functions.pause = function () {
        cycle.running = false;
        startedUi();
        clearInterval(cycle.interval);
    };

    functions.reset = function () {
        cycle.running = false;
        cycle.current = 0;
        startedUi();
        clearInterval(cycle.interval);

        _.each(plateau.cells, function (cell) {
            cell.cycleStatus = false;
            cell.status = false;
            paintCellStatus(cell.status, cell.id);
        });
    };

    functions.goOne = function () {
        var lives = _.filter(plateau.cells, function (cell) {
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
            _.each(plateau.cells, function (cell) {
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
    };

    functions.checkDeadsColindantes = function (colindantes) {
        var colindante = {};
        var colindantesColindantes = [];

        for (var i = 0; i < colindantes.length; i++) {
            colindante = colindantes[i];

            if (!colindante.status) {
                colindantesColindantes = getColindantes(colindante);
                colindante.cycleStatus = checkCellStatus(colindante, colindantesColindantes, 'status');
            }
        }
    };

    functions.endOne = function () {
        _.each(
            plateau.cells,
            function (cell) {
                cell.status = cell.cycleStatus;
                paintCellStatus(cell.status, cell.id);
            }
        );
    };

    functions.getColindantes = function (cell) {
        var colindantes = [];

        for (var i = 0; i < colindantesAxis.length; i++) {
            var colindante = _.findWhere(
                plateau.cells, {
                    x: cell.x + colindantesAxis[i].x,
                    y: cell.y + colindantesAxis[i].y
                }
            );

            if (_.size(colindante)) {
                colindantes.push(colindante);
            }
        }

        return colindantes;
    };

    functions.startedUi = function () {
        if (cycle.running) {
            // plateau
            $cache
                .get('#plateau')
                .attr('disabled', true);

            // start button
            $cache
                .get('#btn-start-gol')
                .attr('disabled', true);

            // pause button
            $cache
                .get('#btn-pause-gol')
                .removeAttr('disabled');

            return;
        }

        // plateau
        $cache
            .get('#plateau')
            .removeAttr('disabled');

        // start button
        $cache
            .get('#btn-start-gol')
            .removeAttr('disabled');

        // pause button
        $cache
            .get('#btn-pause-gol')
            .attr('disabled', true);
    };

    functions.checkCellStatus = function (cell, colindantes, field) {
        /*    
            Cada celda con uno o ningún vecino          -> muere.
            Cada celda con 3 o más vecinos              -> muere.
            Cada celda con 2 o 3 vecinos                -> vive.        
        */
        return field === 'status' ? livesCells(cell, colindantes, field) === 3 : livesCells(cell, colindantes, field) <= 3;
    };

    functions.livesCells = function (cell, colindantes, field) {
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
    };
});