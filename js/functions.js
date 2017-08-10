/*
    FUNCTIONS
*/

/*
    Generate cells
*/
var setCells = function (){    
    for (i = 1; i <= plateau.rows; i++){ // rows        
        for (u = 1; u <= plateau.columns; u++){ // columns           
            plateau.cells.push({
                id:     u + "-" + i,
                x:      u,
                y:      i,
                status: false //dead
            });
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
    _.each(plateau.cells, function (cell) {        
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
    .where({status: true})
    .each(function (cell) {
        checkCellLive(cell);
    });     
};

var checkCellLive = function (cell) {    
    // si la celda no tiene ninguna otra celda viva en alguna de sus 8 casillas colindantes -> muere
    // si la celda tiene 3 o más de alguna de sus 8 casillas colindantes en las que vive una celda -> muere
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