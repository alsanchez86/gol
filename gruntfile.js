// https://github.com/jsoverson/grunt-contrib-jasmine-example

module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jasmine: {
            customTemplate: {
                src: [],
                options: {
                    vendor: [],
                    keepRunner: true,
                    // helpers: globalHeadless,
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'js/config/require-config.js',
                        // requireConfig: reqConfig
                    },
                    specs: 'specs/**/*.spec.js'                    
                }
            }
        }        
    });

    // load tasks
    grunt.loadNpmTasks('grunt-contrib-jasmine');    

    // register tasks
    grunt.registerTask('test', ['jasmine']);

    // default task
    grunt.registerTask("default", ["test"]);
};