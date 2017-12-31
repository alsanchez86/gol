define(["$cache", "store", "lodash"], function ($c, store, _) {
    /* Private Vars */

    /* Public Vars */
    var plateau = {};

    /* Private Methods */
    function _paintCellStatus(status, id) {
        if (!status) {
            $c.get("#" + id).removeClass("live");
            return;
        }

        $c.get("#" + id).addClass("live");
    }

    function _initInterval() {
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
    }

    /* Public Methods */
    plateau.cellClick = function (event) {
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

    plateau.setInitValues = function () {
        $c.get('#form-rows')
            .attr({
                placeholder: store.get('config.plateau.rows.max'),
                min: store.get('config.plateau.rows.min'),
                max: store.get('config.plateau.rows.max')
            })
            .val(store.get('config.plateau.rows.max'))
            .trigger("change");

        $c.get('#form-columns')
            .attr({
                placeholder: store.get('config.plateau.columns.max'),
                min: store.get('config.plateau.columns.min'),
                max: store.get('config.plateau.columns.max')
            })
            .val(store.get('config.plateau.columns.max'))
            .trigger("change");
    }

    plateau.validatePlateau = function (rows, columns) {
        rows = _.toInteger(rows);
        columns = _.toInteger(columns);

        var mins = rows >= store.get('config.plateau.rows.min') && columns >= store.get('config.plateau.columns.min');
        var maxs = rows <= store.get('config.plateau.rows.max') && columns <= store.get('config.plateau.columns.max');

        return !(mins && maxs);
    }

    plateau.setPlateauDimensions = function (rows, columns) {
        rows = _.toInteger(rows);
        columns = _.toInteger(columns);

        store.set("plateau.rows", rows);
        store.set("plateau.columns", columns);
    }

    plateau.setCells = function () {
        var rows = store.get("plateau.rows"),
            columns = store.get("plateau.columns"),
            cells = [];

        for (i = 1; i <= rows; i++) {
            // columns
            for (u = 1; u <= columns; u++) {
                cells.push({
                    id: u + "-" + i,
                    x: u,
                    y: i,
                    status: false,
                    cycleStatus: false
                });
            }
        }

        store.set("plateau.cells", cells);
    }

    plateau.paintPlateau = function() {
        // plateau
        $c.get("#plateau").css({
            height: store.get("plateau.rows") + "vw",
            width: store.get("plateau.columns") + "vw"
        });

        // cells
        _.forEach(store.get("plateau.cells"), function (cell) {
            $("<div/>")
                .attr({
                    id: cell.id
                })
                .addClass("plateau-cell")
                .appendTo($c.get("#plateau"))
                .click(function (event) {
                    ui.cellClick(event);
                });
        });
    }

    /* Return Module */
    return plateau;
});