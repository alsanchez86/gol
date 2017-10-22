'use strict';

require(['config/require-config'], function () {   
    console.log("Loaded config file.");

    require(['jquery', 'tether'], function ($, Tether) {
        window.Tether = Tether; // hack for bootstrap               
        
        require(['bootstrap', 'main'], function (){
            console.log("Loaded main module.");
        });        
    });
});