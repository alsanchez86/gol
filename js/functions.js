/*
    FUNCTIONS
*/

/*
    Generate cells
*/
var setCells = function () {
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

/*
    Paint scenario
*/
var paintScenario = function () {
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

var paintCellStatus = function (status, id) {
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

/*
    Cell click listener
*/
var cellClick = function (event) {
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

/* 
    Start GOL
*/
var initInterval = function () {
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

var start = function () {
    cycle.running = true;
    startedUi();
    initInterval();
};

var pause = function () {
    cycle.running = false;
    startedUi();
    clearInterval(cycle.interval);
};

var reset = function () {
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

var goOne = function () {
    var lives = _.filter(plateau.cells, function (cell) {
        return cell.status;
    });

    if (lives.length > 0) {
        _.each(lives, function (cell) {
            // get colindantes
            var colindantes = getColindantes(cell);

            // check current cell status
            cell.cycleStatus = checkCellStatus(cell, colindantes);

            // check deads colindantes for better performance
            checkDeadsColindantes(colindantes);
        });

        endOne();
    }

    return lives;
};

var checkDeadsColindantes = function (colindantes) {
    var colindante = {};
    var colindantesColindantes = [];

    for (var i = 0; i < colindantes.length; i++) {
        colindante = colindantes[i];

        if (!colindante.status) {
            colindantesColindantes = getColindantes(colindante);
            colindante.cycleStatus = checkCellStatus(colindante, colindantesColindantes);
        }
    }
};

var endOne = function () {
    _.each(
        plateau.cells,
        function (cell) {
            cell.status = cell.cycleStatus;
            paintCellStatus(cell.status, cell.id);
        }
    );
};

var getColindantes = function (cell) {
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

var startedUi = function () {
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

var checkCellStatus = function (cell, colindantes) {
    // celdas vivas
    if (cell.status) {
        return liveCell(cell, colindantes);
    }

    // celdas muertas    
    if (!cell.status) {
        return deadCell(cell, colindantes);
    }
};

/*
    Para un espacio que es 'poblado':
        Cada celda con uno o ningún vecino          -> muere.
        Cada célula con cuatro o más vecinos        -> muere.
        Cada célula con igual o menos de 3 vecinos  -> vive.
*/
var liveCell = function (cell, colindantes) {
    var lives = [];

    _.each(
        colindantes,
        function (element) {
            if (element.status) {
                lives.push(element);
            }
        }
    );

    if (lives.length <= 1 || lives.length >= 4) {
        return false;
    }
    return true;
};

/*       
    Para un espacio que es 'vacío' o 'despoblado':
        Cada celda vacía con tres o más vecinos -> vive.
*/
var deadCell = function (cell, colindantes) {
    var lives = [];

    _.each(
        colindantes,
        function (element) {
            if (element.status) {
                lives.push(element);
            }
        }
    );

    if (lives.length >= 3) {
        return true;
    }

    return false;
};