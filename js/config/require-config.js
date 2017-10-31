var rconfig = (function () {    
    var _this = {
        lib: 'lib/',
        bowerPath: '../bower_components/',
        nodePath: '../node_modules/',
        callback = function () {
            console.log("Init config file.");
        }
    };
    
    return {
        baseUrl: 'js',
        paths: {
            jquery: _this.bowerPath + 'jquery/dist/jquery.min',
            tether: _this.bowerPath + 'tether/dist/js/tether.min',
            bootstrap: _this.bowerPath + 'bootstrap/dist/js/bootstrap.min',
            underscore: _this.bowerPath + 'underscore/underscore-min',
            $cache: _this.lib + 'jquery-cache',
            store: _this.lib + 'store',
            functions: _this.lib + 'functions'
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
                deps: ['$cache', 'store', 'underscore', 'log']
            },
        },
        callback: _this.callback
    };
})();

// load rconfig object to requirejs
requirejs.config(rconfig);