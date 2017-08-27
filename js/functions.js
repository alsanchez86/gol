/*
    FUNCTIONS
*/

/*
    Generate cells
*/
var setCells = function (){    
    for (i = 1; i <= plateau.rows; i++){ // rows        
        for (u = 1; u <= plateau.columns; u++){ // columns    
            var cell = {
                id:             u + "-" + i,
                x:              u,
                y:              i,
                status:         false, //dead
                cycleStatus:    false //dead
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
            height: plateau.rows    + "vw",
            width:  plateau.columns + "vw"
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
                .click(function (event){                   
                    cellClick(event);
                });
    });   
};

var paintCellStatus = function (status, id) {    
    if (!status){
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
    if (cycle.current > 0) return;

    var id      = event.currentTarget.id;
    var cell    = _.findWhere(plateau.cells, {id: id});

    cell.status = !cell.status; 
    paintCellStatus(cell.status, id);   
};

/* 
    Start GOL
*/
var start = function (){
    if (cycle.current > 0) return;
    
    disableUI(true);      

    var interval = setInterval(function(){        
        goOne();
        cycle.current++;

        if (cycle.current === cycle.limit){
            // reset
            cycle.current = 0; 
            disableUI(false);
            clearInterval(interval);
        } 

    }, cycle.time);    
};

var goOne = function () {    
    _.chain(plateau.cells)
        .where({
            status: true
        })
        .each(function (cell) {
            cell.cycleStatus = checkCellStatus(cell);
        });    
    
    endOne();
};

var endOne = function (){    
    _.each(
        plateau.cells, 
        function (element) {
            // 1.- setear el status de cada celda con su cycleStatus
            element.status = element.cycleStatus;

            // 2.- Pintar el status en el front
            paintCellStatus(element.status, element.id);
        }
    );    
};

var checkCellStatus = function (cell) {    
    /*
    Para un espacio que es 'poblado':
        Cada celda con uno o ningún vecino          -> muere.
        Cada célula con cuatro o más vecinos        -> muere.
        Cada célula con igual o menos de 3 vecinos  -> vive.
    
    Para un espacio que es 'vacío' o 'despoblado':
        Cada celda vacía con tres o más vecinos     -> vive.
    */        

    var colindantes = getColindantes(cell);      

    // Cada celda con uno o ningún vecino -> muere.
    if (ruleOne(cell, colindantes)){
        return false;
    }
};

var ruleOne = function (cell, colindantes) {
    var lives = [];

    // Cada celda con uno o ningún vecino -> muere.
    _.each(
        colindantes, 
        function (element) {
            if (element.status){
                lives.push(element);
            }
        }
    );

    if (lives.length <= 1){
        return false;
    }

    return true;
};

var getColindantes = function (cell){    
    var colindantes = [];

    for(var i = 0; i < colindantesAxis.length; i++){
        var colindante = _.findWhere(
            plateau.cells, 
            {
                x: cell.x + colindantesAxis[i].x,
                y: cell.y + colindantesAxis[i].y
            }
        );

        if (_.size(colindante)){
            colindantes.push(colindante);
        }        
    }

    return colindantes;
};

var disableUI = function (disable) {    
    if (disable){
        // plateau
        $cache
            .get('#plateau')
            .addClass('disabled');

        // start button
        $cache
            .get('#start-gol')
            .addClass('disabled');
        return;    
    }

    // plateau
    $cache
        .get('#plateau')
        .removeClass('disabled');

    // start button
    $cache
        .get('#start-gol')
        .removeClass('disabled');
};