define([
    '$cache',
    'variables',
    'underscore'
], function ($cache, v, _) {

    var f = {};

    f.setPlateau = function (rows, columns) {
        v.plateau.rows = rows;
        v.plateau.columns = columns;
    };

    f.setCells = function () {
        for (i = 1; i <= v.plateau.rows; i++) { // rows        
            for (u = 1; u <= v.plateau.columns; u++) { // columns    
                var cell = {
                    id: u + "-" + i,
                    x: u,
                    y: i,
                    status: false, //dead
                    cycleStatus: false //dead
                };

                v.plateau.cells.push(cell);
            }
        }
    };

    f.paintScenario = function () {
        // plateau
        $cache
            .get('#plateau')
            .css({
                height: v.plateau.rows + "vw",
                width: v.plateau.columns + "vw"
            });

        // cells
        _.each(
            v.plateau.cells,
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
                        f.cellClick(event);
                    });
            });
    };

    f.paintCellStatus = function (status, id) {
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

    f.cellClick = function (event) {
        if (v.cycle.running) {
            return;
        }

        var id = event.currentTarget.id;
        var cell = _.findWhere(v.plateau.cells, {
            id: id
        });

        cell.status = !cell.status;
        f.paintCellStatus(cell.status, id);
    };

    f.initInterval = function () {
        v.cycle.interval = setInterval(function () {
            var lives = f.goOne();

            if (lives.length === 0 || (!!v.cycle.limit && (v.cycle.current === v.cycle.limit))) {
                console.log('GAME OVER');
                f.reset();
                return;
            }

            v.cycle.current++;
            console.log("Cycle: " + v.cycle.current);

        }, v.cycle.time);
    };

    f.start = function () {
        v.cycle.running = true;
        f.startedUi();
        f.initInterval();
    };

    f.pause = function () {
        v.cycle.running = false;
        f.startedUi();
        clearInterval(v.cycle.interval);
    };

    f.reset = function () {
        v.cycle.running = false;
        v.cycle.current = 0;

        f.startedUi();
        clearInterval(v.cycle.interval);

        _.each(v.plateau.cells, function (cell) {
            cell.cycleStatus = false;
            cell.status = false;
            f.paintCellStatus(cell.status, cell.id);
        });
    };

    f.goOne = function () {
        var lives = _.filter(v.plateau.cells, function (cell) {
            return cell.status;
        });

        if (lives.length > 0) {
            // determine cycleStatus by status
            _.each(lives, function (cell) {
                // get colindantes
                var colindantes = f.getColindantes(cell);

                // check current cell status
                cell.cycleStatus = f.checkCellStatus(cell, colindantes, 'status');

                // check deads colindantes for better performance
                f.checkDeadsColindantes(colindantes);
            });

            // validate cycleStatus by cycleStatus
            _.each(v.plateau.cells, function (cell) {
                if (cell.cycleStatus && cell.status != cell.cycleStatus) {
                    // get colindantes
                    var colindantes = f.getColindantes(cell);

                    // check current cell status
                    cell.cycleStatus = f.checkCellStatus(cell, colindantes, 'cycleStatus');
                }
            });

            f.endOne();
        }

        return lives;
    };

    f.checkDeadsColindantes = function (colindantes) {
        var colindante = {};
        var colindantesColindantes = [];

        for (var i = 0; i < colindantes.length; i++) {
            colindante = colindantes[i];

            if (!colindante.status) {
                colindantesColindantes = f.getColindantes(colindante);
                colindante.cycleStatus = f.checkCellStatus(colindante, colindantesColindantes, 'status');
            }
        }
    };

    f.endOne = function () {
        _.each(
            v.plateau.cells,
            function (cell) {
                cell.status = cell.cycleStatus;
                f.paintCellStatus(cell.status, cell.id);
            }
        );
    };

    f.getColindantes = function (cell) {
        var colindantes = [];

        for (var i = 0; i < v.colindantesAxis.length; i++) {
            var colindante = _.findWhere(
                v.plateau.cells, {
                    x: cell.x + v.colindantesAxis[i].x,
                    y: cell.y + v.colindantesAxis[i].y
                }
            );

            if (_.size(colindante)) {
                colindantes.push(colindante);
            }
        }

        return colindantes;
    };

    f.startedUi = function () {
        if (v.cycle.running) {
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

    f.checkCellStatus = function (cell, colindantes, field) {
        /*    
            Cada celda con uno o ningún vecino          -> muere.
            Cada celda con 3 o más vecinos              -> muere.
            Cada celda con 2 o 3 vecinos                -> vive.        
        */
        return field === 'status' ? f.livesCells(cell, colindantes, field) === 3 : f.livesCells(cell, colindantes, field) <= 3;
    };

    f.livesCells = function (cell, colindantes, field) {
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

    return f;
});