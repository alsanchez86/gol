define([
        'lib/jquery-cache',
        'lib/functions'
    ],
    function ($cache, f) {
        $(function () {
            $(document).ready(function () {
                f.setCells();
                f.paintScenario();

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
            });
        });
    });