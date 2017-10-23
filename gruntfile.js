module.exports = function (grunt) {
    'use strict'

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jasmine: {
            customTemplate: {
                options: {
                    specs: 'spec/*.js'                    
                }
            }
        }
    });

    // register tasks
    grunt.registerTask("test", ["jasmine"]);

    // default task
    grunt.registerTask("default", ["test"]);
};