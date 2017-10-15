define([
        'lib/jquery-cache',
        'lib/functions'
    ],
    function ($cache, func) {
        $(function () {
            $(document).ready(function () {
                func.setCells();
                func.paintScenario();

                $cache
                    .get('#btn-start-gol')
                    .click(function () {
                        func.start();
                    });

                $cache
                    .get('#btn-pause-gol')
                    .click(function () {
                        func.pause();
                    });

                $cache
                    .get('#btn-reset-gol')
                    .click(function () {
                        func.reset();
                    });
            });
        });
    });