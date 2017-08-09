/*
    FUNCTIONS
*/

/*
    Generate cells
*/
var generatePlateau = function (rows, columns) {        
    var cellID = "";

    virtualPlateau = {
        rows:       rows,
        columns:    columns
    };

    $cache
        .get('#plateau')
        .css({
            height: rows + "vw",
            width:  columns + "vw"
        });
    
    for (i = 1; i <= rows; i++){
        for (u = 1; u <= columns; u++){                       
            cellID = u + "-" + i;

            $('<div/>')
                .attr({
                    id: cellID
                })                
                .addClass('plateau-cell')                
                .appendTo(
                    $cache.get('#plateau')
                )                
                .click(function (event){                   
                    cellClick(event);
                });            
        }        
    }        
};
  
/*
    Cell click listener
*/
var cellClick = function (event) {          
    if ($cache.get("#plateau").hasClass('disabled')){
        return;
    }

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