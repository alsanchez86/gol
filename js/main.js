define([
        'jquery'
    ],
    function ($) {

        $(document).ready(function () {
            require([
                '$cache',
                'functions'
            ], function ($cache, f) {
                $cache
                    .get('#btn-start-gol')
                    .click(function () {
                        f.start();
                    });

                $cache
                    .get('#btn-pause-gol')
                    .click(function () {
                        f.pause();
                    });

                $cache
                    .get('#btn-reset-gol')
                    .click(function () {
                        f.reset();
                    });

                f.setCells();
                f.paintScenario();
            });
        });
    });