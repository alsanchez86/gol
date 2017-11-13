'use strict';

require(['require-config'], function () {
    require(['jquery', 'tether'], function ($, Tether) {
        window.Tether = Tether; // hack for bootstrap               

        require(['bootstrap'], function () {
            // jquery document ready
            $(function () {
                require(['json!config', '$cache', 'functions', 'log'], function (config, $c, f, log) {
                    log.write('general.load_config');

                    // show config data
                    $c.get('#config-plateau-max-rows').text(config.plateau.rows.max);
                    $c.get('#config-plateau-max-columns').text(config.plateau.columns.max);
                    $c.get('#config-plateau-min-rows').text(config.plateau.rows.min);
                    $c.get('#config-plateau-min-columns').text(config.plateau.columns.min);

                    $c.get('#btn-plateau-generator')
                        .removeClass('disabled')
                        .click(function () {
                            var rows = $c.get('#form-rows').val(),
                                columns = $c.get('#form-columns').val();

                            if (f.exceedPlateauLimits(rows, columns)) {
                                log.write('plateau.invalid_plateau');
                                $c.get('#plateau-generator-control').addClass("has-danger");
                                return;
                            }

                            $c.get('#plateau-generator-control').removeClass("has-danger");
                            f.setPlateauDimensions(rows, columns);
                            f.setCells();
                            f.paintScenario();
                        });

                    $c.get('#btn-start-gol').click(function () {
                        f.start();
                    });

                    $c.get('#btn-pause-gol').click(function () {
                        f.pause();
                    });

                    $c.get('#btn-reset-gol').click(function () {
                        f.reset();
                    });
                });
            });
        });
    });
});