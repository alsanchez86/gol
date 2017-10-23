// https://toddmotto.com/mastering-the-module-pattern/#creating-a-module

var rconfig = (function () {
    // private properties and methods
    var _lib = 'lib/';
    var _bowerPath = '../bower_components/';
    var _nodePath = '../node_modules/';
    var _callback = function () {
        console.log("Init config file.");
    };

    // object
    return {
        baseUrl: 'js',
        paths: {
            jquery: _bowerPath + 'jquery/dist/jquery.min',
            tether: _bowerPath + 'tether/dist/js/tether.min',
            bootstrap: _bowerPath + 'bootstrap/dist/js/bootstrap.min',
            underscore: _bowerPath + 'underscore/underscore-min',
            $cache: _lib + 'jquery-cache',
            store: _lib + 'store',
            functions: _lib + 'functions'
        },
        shim: {
            tether: {
                deps: ['jquery']
            },
            bootstrap: {
                deps: ['jquery', 'tether']
            },
            $cache: {
                deps: ['jquery']
            },
            functions: {
                deps: ['$cache', 'store', 'underscore']
            },
        },
        callback: _callback
    };
})();

// load rconfig object to requirejs
requirejs.config(rconfig);