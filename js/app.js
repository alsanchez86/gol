"use strict";

require(["require-config"], function () {
    require(["jquery", "tether"], function ($, Tether) {
        window.Tether = Tether; // hack for bootstrap

        require(["bootstrap"], function () {
            // jquery document ready
            $(function () {
                require(["ui"], function (ui) {
                    ui.init();
                });
            });
        });
    });
});