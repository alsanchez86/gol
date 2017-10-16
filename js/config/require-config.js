var bowerPath = '../bower_components/',
    nodePath = '../node_modules/',
    rconfig = {
        baseUrl: 'js',
        paths: {
            jquery: bowerPath + 'jquery/dist/jquery.min',
            tether: bowerPath + 'tether/dist/js/tether.min',
            bootstrap: bowerPath + 'bootstrap/dist/js/bootstrap.min',
            underscore: bowerPath + 'underscore/underscore-min',
            $cache: 'lib/jquery-cache',
            store: 'lib/store',
            functions: 'lib/functions'
        }
    };

requirejs.config(rconfig);