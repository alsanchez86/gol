// https://github.com/jsoverson/grunt-contrib-jasmine-example

module.exports = function (grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jasmine: {
            src: 'js/**/*.js',
            options: {
                specs: 'specs/**/*.spec.js',
                // template: require('grunt-template-jasmine-requirejs'),
                // templateOptions: {
                //     requireConfigFile: 'js/config/require-config.js'
                // }
            }
        },
        jshint: {
            all: [
                'gruntfile.js',
                'specs/**/*.spec.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // register tasks
    grunt.registerTask('test', ['jshint', 'jasmine']);

    // default task
    grunt.registerTask("default", ["test"]);
};