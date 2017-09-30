/*
    APP
*/

$(document).ready(function () {
    setCells();
    paintScenario();

    // start gol button
    $cache
        .get('#btn-start-gol')
        .click(function () {
            start();
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