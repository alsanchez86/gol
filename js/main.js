define([
        'lib/jquery-cache',
        'lib/variables',
        'lib/functions'
    ],
    function ($cache, vars, func) {
        $(function () {
            $(document).ready(function () {
                func.setCells();
                func.paintScenario();          

                // start gol button
                $cache
                    .get('#btn-start-gol')
                    .click(function () {                        
                        func.start();
                    });
                
                // pause gol button
                $cache
                    .get('#btn-pause-gol')
                    .click(function () {
                        pause();
                    });

                // reset gol button
                $cache
                    .get('#btn-reset-gol')
                    .click(function () {
                        reset();
                    });                
            });
        });
    });