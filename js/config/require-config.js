var bowerPath   = '../bower_components/';
var nodePath    = '../node_modules/';

requirejs.config({
    baseUrl: 'js',
    paths: {
        jquery: bowerPath + 'jquery/dist/jquery.min',
        tether: bowerPath + 'tether/dist/js/tether.min',
        bootstrap: bowerPath + 'bootstrap/dist/js/bootstrap.min',
        underscore: bowerPath + 'underscore/underscore-min'
    }
});