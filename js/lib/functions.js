define(['lib/jquery-cache', 'lib/variables', 'underscore'], function ($cache, vars, _) {
    var functions = {};

    functions.setCells = function () {
        for (i = 1; i <= vars.plateau.rows; i++) { // rows        
            for (u = 1; u <= vars.plateau.columns; u++) { // columns    
                var cell = {
                    id: u + "-" + i,
                    x: u,
                    y: i,
                    status: false, //dead
                    cycleStatus: false //dead
                };

                vars.plateau.cells.push(cell);
            }
        }
    };

    functions.paintScenario = function () {
        // plateau
        $cache
            .get('#plateau')
            .css({
                height: vars.plateau.rows + "vw",
                width: vars.plateau.columns + "vw"
            });

        // cells
        _.each(
            vars.plateau.cells,
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
                        functions.cellClick(event);
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
        if (vars.cycle.running) {
            return;
        }

        var id = event.currentTarget.id;
        var cell = _.findWhere(vars.plateau.cells, {
            id: id
        });

        cell.status = !cell.status;
        functions.paintCellStatus(cell.status, id);
    };

    functions.initInterval = function () {
        vars.cycle.interval = setInterval(function () {
            var lives = functions.goOne();

            if (lives.length === 0 || (!!vars.cycle.limit && (vars.cycle.current === vars.cycle.limit))) {
                console.log('GAME OVER');
                functions.reset();
                return;
            }

            vars.cycle.current++;
            console.log("Cycle: " + vars.cycle.current);

        }, vars.cycle.time);
    };

    functions.start = function () {
        vars.cycle.running = true;
        functions.startedUi();
        functions.initInterval();
    };

    functions.pause = function () {
        vars.cycle.running = false;
        functions.startedUi();
        clearInterval(vars.cycle.interval);
    };

    functions.reset = function () {
        vars.cycle.running = false;
        vars.cycle.current = 0;

        functions.startedUi();
        clearInterval(vars.cycle.interval);

        _.each(vars.plateau.cells, function (cell) {
            cell.cycleStatus = false;
            cell.status = false;
            functions.paintCellStatus(cell.status, cell.id);
        });
    };

    functions.goOne = function () {
        var lives = _.filter(vars.plateau.cells, function (cell) {
            return cell.status;
        });

        if (lives.length > 0) {
            // determine cycleStatus by status
            _.each(lives, function (cell) {
                // get colindantes
                var colindantes = functions.getColindantes(cell);

                // check current cell status
                cell.cycleStatus = functions.checkCellStatus(cell, colindantes, 'status');

                // check deads colindantes for better performance
                functions.checkDeadsColindantes(colindantes);
            });

            // validate cycleStatus by cycleStatus
            _.each(vars.plateau.cells, function (cell) {
                if (cell.cycleStatus && cell.status != cell.cycleStatus) {
                    // get colindantes
                    var colindantes = functions.getColindantes(cell);

                    // check current cell status
                    cell.cycleStatus = functions.checkCellStatus(cell, colindantes, 'cycleStatus');
                }
            });

            functions.endOne();
        }

        return lives;
    };

    functions.checkDeadsColindantes = function (colindantes) {
        var colindante = {};
        var colindantesColindantes = [];

        for (var i = 0; i < colindantes.length; i++) {
            colindante = colindantes[i];

            if (!colindante.status) {
                colindantesColindantes = functions.getColindantes(colindante);
                colindante.cycleStatus = functions.checkCellStatus(colindante, colindantesColindantes, 'status');
            }
        }
    };

    functions.endOne = function () {
        _.each(
            vars.plateau.cells,
            function (cell) {
                cell.status = cell.cycleStatus;
                functions.paintCellStatus(cell.status, cell.id);
            }
        );
    };

    functions.getColindantes = function (cell) {
        var colindantes = [];

        for (var i = 0; i < vars.colindantesAxis.length; i++) {
            var colindante = _.findWhere(
                vars.plateau.cells, {
                    x: cell.x + vars.colindantesAxis[i].x,
                    y: cell.y + vars.colindantesAxis[i].y
                }
            );

            if (_.size(colindante)) {
                colindantes.push(colindante);
            }
        }

        return colindantes;
    };

    functions.startedUi = function () {
        if (vars.cycle.running) {
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
        return field === 'status' ? functions.livesCells(cell, colindantes, field) === 3 : functions.livesCells(cell, colindantes, field) <= 3;
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

    return functions;
});