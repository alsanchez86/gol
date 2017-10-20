require(['config/require-config'], function (rc) {
    require.config(rc.config);

    require(['jquery', 'tether'], function (Tether) {
        window.Tether = Tether;
        
        require(['bootstrap', 'main'], function (){
            console.log("Loaded main module.");
        });
    });
});