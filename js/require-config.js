require.config(
    (function () {
        /* Private Vars */
        var _this = {
            lib: "lib/",
            bowerPath: "../bower_components/",
            nodePath: "../node_modules/",
            root: "../",
            lang: "../lang/",
            callback: function () {
                console.log("Loaded require config file.");
            }
        };

        /* Public Vars */
        return {
            waitSeconds: 30,
            baseUrl: "js",
            paths: {
                config: _this.root + "config.json",
                es: _this.lang + "es.json",
                text: _this.bowerPath + "requirejs-plugins/lib/text",
                json: _this.bowerPath + "requirejs-plugins/src/json",
                jquery: _this.bowerPath + "jquery/dist/jquery.min",
                tether: _this.bowerPath + "tether/dist/js/tether.min",
                bootstrap: _this.bowerPath + "bootstrap/dist/js/bootstrap.min",
                lodash: _this.bowerPath + "lodash/dist/lodash.min",
                $cache: _this.lib + "jquery-cache",
                helpers: _this.lib + "helpers",
                log: _this.lib + "log",
                store: _this.lib + "store",
                ui: _this.lib + "ui",
                plateau: _this.lib + "plateau"
            },
            shim: {
                tether: {
                    deps: ["jquery"]
                },
                bootstrap: {
                    deps: ["jquery", "tether"]
                },
                $cache: {
                    deps: ["jquery"]
                },
                lodash: {
                    exports: '_'
                },
                helpers: {
                    deps: ["lodash"]
                },
                log: {
                    deps: ["json", "lodash", "$cache"]
                },
                store: {
                    deps: ["log", "lodash", "json"]
                },
                plateau: {
                    deps: ["$cache", "store", "lodash"]
                },
                ui: {
                    deps: ["$cache", "store", "lodash", "log", "plateau"]
                }                
            },
            callback: _this.callback
        };
    })()
);