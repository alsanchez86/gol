/*
    APP
*/
$(document).ready(function (){
    /*
        Generate plateau
    */
    generatePlateau(40, 40);

    /*
        Listener start gol
    */
    $('#start-gol')
        .click (function (event){
            event.preventDefault();            
        });           
});
    