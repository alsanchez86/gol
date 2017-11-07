require.config(
    (function () {
        var _this = {
            lib: 'lib/',
            bowerPath: '../bower_components/',
            nodePath: '../node_modules/',
            callback: function () {
                console.log("Init config file.");
            }
        };

        return {
            waitSeconds: 30,
            baseUrl: 'js',
            paths: {
                jquery: _this.bowerPath + 'jquery/dist/jquery.min',
                tether: _this.bowerPath + 'tether/dist/js/tether.min',
                bootstrap: _this.bowerPath + 'bootstrap/dist/js/bootstrap.min',
                lodash: _this.bowerPath + 'lodash/dist/lodash.min',
                $cache: _this.lib + 'jquery-cache',
                store: _this.lib + 'store',
                functions: _this.lib + 'functions',
                helpers: _this.lib + 'helpers',
                log: _this.lib + 'log',
                app: 'app',
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
                helpers: {
                    deps: ['lodash']
                },
                store: {
                    deps: ['log', 'helpers']
                },
                functions: {
                    deps: ['$cache', 'store', 'lodash', 'log']
                },
                log: {
                    deps: ['helpers', 'lodash']
                },
                app: {
                    deps: ['jquery', 'tether', 'bootstrap', '$cache', 'functions', 'log']
                },
            },
            callback: _this.callback
        };
    })()
);