/*
    APP
*/

$(document).ready(function (){            
    setCells();
    paintScenario();        

    // Listener start gol button        
    $cache
        .get('#start-gol')
        .click (function (event){
            event.preventDefault();                        
            start();
        });           
});
    