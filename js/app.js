'use strict';

require(['config/require-config'], function () {
    console.log("Loaded config file.");

    require(['jquery', 'tether'], function ($, Tether) {
        window.Tether = Tether; // hack for bootstrap               

        require(['bootstrap'], function () {
            $(function () { // jquery document ready        
                require(['$cache', 'functions'], function ($cache, f) {
                    // add eventListener
                    $cache.get('#btn-start-gol').click(function () {
                        f.start();
                    });

                    // add eventListener
                    $cache.get('#btn-pause-gol').click(function () {
                        f.pause();
                    });

                    // add eventListener
                    $cache.get('#btn-reset-gol').click(function () {
                        f.reset();
                    });

                    // add eventListener
                    $cache.get('#btn-plateau-generator').click(function () {
                        var rows = parseInt($cache.get('#form-rows').val()),
                            columns = parseInt($cache.get('#form-columns').val());

                        // cada método se debe ejecutar dentro de un callback del anterior
                        f.setPlateau(rows, columns);
                        f.setCells();
                        f.paintScenario();
                    });
                });
            });
        });
    });
});