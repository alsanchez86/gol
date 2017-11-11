require.config(
    (function () {
        var _this = {
            lib: 'lib/',
            bowerPath: '../bower_components/',
            nodePath: '../node_modules/',
            root: '../',
            lang: '../lang/',
            callback: function () {
                console.log("Init config file.");
            }
        };

        return {
            waitSeconds: 30,
            baseUrl: 'js',
            paths: {
                config: _this.root + 'config.json',
                es: _this.lang + 'es.json',
                text: _this.bowerPath + 'requirejs-plugins/lib/text',
                json: _this.bowerPath + 'requirejs-plugins/src/json',
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