/*
    APP
*/
$(document).ready(function (){
    /*
        Generate plateau
    */
    generatePlateau(60, 60);

    /*
        Listener start gol
    */    
    $cache
        .get('#start-gol')
        .click (function (event){
            event.preventDefault();

            $cache
                .get('#plateau')
                .addClass('disabled');
        });           
});
    