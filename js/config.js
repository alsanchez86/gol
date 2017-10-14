requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        tether: '../bower_components/tether/dist/js/tether.min',
        bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
        underscore: '../bower_components/underscore/underscore-min'
    },
    shim: {
        'bootstrap': {
            deps: ['jquery']
        }
    }
});