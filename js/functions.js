/*
    FUNCTIONS
*/

/*
    Generate plateau
*/
var generatePlateau = function (rows, columns) {            
    // Save
    virtualPlateau.rows     = rows;
    virtualPlateau.columns  = columns;

    // DOM
    $cache
        .get('#plateau')
        .css({
            height: rows    + "vw",
            width:  columns + "vw"
        });       
};

/*
    Generate cells
*/
var generateCells = function (rows, columns){
    // Generate cells
    for (i = 1; i <= rows; i++){ // rows        
        for (u = 1; u <= columns; u++){ // columns
            generateCell(u, i);                        
        }        
    }        
}

/*
    Generate cell
*/
var generateCell = function (u, i) {            
    var cell = {
        id:     u + "-" + i,
        x:      u,
        y:      i,
        status: 0 //dead
    };    

    // Save
    virtualPlateau.cells.push(cell);    

    // DOM
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
};

/*
    Cell click listener
*/
var cellClick = function (event) {          
    // App started
    if (started){
        return;
    }  

    // Get virtual cell
    var cell = _.findWhere(virtualPlateau.cells, {id: event.currentTarget.id});
    
    debugger;

    // Update virtual cell
    $cache.get("#" + event.currentTarget.id)

    // Paint
    if ($cache.get("#" + event.currentTarget.id).hasClass('live')){        
        $cache
            .get("#" + event.currentTarget.id)
            .removeClass('live');
        return;
    }    

    $cache
        .get("#" + event.currentTarget.id)
        .addClass('live');
};

/* 
    Start GOL
*/
var start = function (){
    if (started){
        return;
    } 

    started = 1;

    $cache
        .get('#plateau')
        .addClass('disabled');

    console.log(virtualPlateau);
};