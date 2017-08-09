/*
    APP
*/
$(document).ready(function (){
    /*
        Generate plateau
    */
    // 1º -> rows
    // 2º -> Columns
    generatePlateau(20, 30);
    generateCells(20, 30);

    /*
        Listener start gol
    */    
    $cache
        .get('#start-gol')
        .click (function (event){
            event.preventDefault();                        
            start();
        });           
});
    