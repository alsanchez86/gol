requirejs(['config/require-config'], function () {
    require(['jquery', 'tether'], function (Tether) {
        window.Tether = Tether;
        require(['bootstrap', 'underscore', 'main']);
    });
});