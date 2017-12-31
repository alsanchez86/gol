"use strict";

define(function (require, exports, module) {
    require(["require-config"], function () {
        require(["jquery", "tether"], function ($, Tether) {
            window.Tether = Tether; // hack for bootstrap

            require(["bootstrap"], function () {
                // jquery document ready
                // domReady requirejs plugin is not neccesary here
                $(function () {
                    require(["store"], function (store) {
                        if (store.get('config')) {
                            // config.json is valid
                            require(["ui"], function (ui) {
                                ui.init(); // init user interface
                            });
                        }
                    });
                });
            });
        });
    });
});