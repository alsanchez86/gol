'use strict';

require(['require-config'], function () {
    require(['jquery', 'tether'], function ($, Tether) {
        window.Tether = Tether; // hack for bootstrap               

        require(['bootstrap'], function () {
            // jquery document ready
            $(function () {
                require(['$cache', 'functions', 'log'], function ($cache, f, log) {
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
                        var rows = $cache.get('#form-rows').val(),
                            columns = $cache.get('#form-columns').val();

                        f.setPlateauDimensions(rows, columns).then(function (){
                            // f.setCells().then(function () {
                            //     f.paintScenario();
                            // });
                        });

                        // Cada método se debe ejecutar dentro de un callback del anterior
                        // Podemos hacer que la función devuelva una promesa (.then) de forma que podramos ejecutar código cuando esta se cumpla
                        // f.setPlateau(rows, columns);
                        // f.setCells();
                        // f.paintScenario();
                    });
                });
            });
        });
    });
});