'use strict';

require(['config/require-config'], function () {
    console.log("Loaded config file.");

    require(['jquery', 'tether'], function ($, Tether) {
        window.Tether = Tether; // hack for bootstrap               

        require(['bootstrap'], function () {
            $(function () { // jquery document ready        
                require(['$cache', 'functions'], function ($cache, f) {
                    $cache.get('#btn-start-gol').click(function () {
                        f.start();
                    });

                    $cache.get('#btn-pause-gol').click(function () {
                        f.pause();
                    });

                    $cache.get('#btn-reset-gol').click(function () {
                        f.reset();
                    });

                    $cache.get('#btn-plateau-generator').click(function () {
                        var rows = parseInt($cache.get('#form-rows').val()),
                            columns = parseInt($cache.get('#form-columns').val());

                        if (f.checkPlateauMax(rows, columns)) {
                            log.message('general.max_plateau');
                            return;
                        }

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