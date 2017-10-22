// https://toddmotto.com/mastering-the-module-pattern/#creating-a-module

var rconfig = function () {
    var lib = 'lib/';
    var bowerPath = '../bower_components/';
    var nodePath = '../node_modules/';
    var callback = function () {
        console.log("Init config file.");
    };

    return {
        baseUrl: 'js',
        paths: {
            jquery: bowerPath + 'jquery/dist/jquery.min',
            tether: bowerPath + 'tether/dist/js/tether.min',
            bootstrap: bowerPath + 'bootstrap/dist/js/bootstrap.min',
            underscore: bowerPath + 'underscore/underscore-min',
            $cache: lib + 'jquery-cache',
            store: lib + 'store',
            functions: lib + 'functions'
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
        callback: callback
    };
}();

requirejs.config(rconfig);