'use strict';

var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    cleanCSS    = require('gulp-clean-css'),
    rename      = require('gulp-rename'),        
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    fs          = require('fs'),
    pkg         = JSON.parse(fs.readFileSync('./package.json'));

gulp.task('css:sass', function() {
    return gulp.src([
        pkg.css + 'sass/app.scss'
    ])
    .pipe(
        sass.sync()
        .on('error', sass.logError)
    )
    .pipe(
        gulp.dest(pkg.dist + 'css/')
    );
});

gulp.task('css:min', function() {
    return gulp.src([            
        pkg.dist + 'css/app.css'            
    ])
    .pipe(
        cleanCSS({
            compatibility: 'ie8'
        })
    )
    .pipe(
        rename({
            suffix: '.min'
        })
    )
    .pipe(
        gulp.dest(pkg.dist + 'css/')
    );
});

gulp.task('js:libs', function() {
    return gulp.src([            
        // jquery
        pkg.bower_components + 'jquery/dist/jquery.min.js',

        // tether
        pkg.bower_components + 'tether/dist/js/tether.min.js',

        // bootstrap
        pkg.bower_components + 'bootstrap/dist/js/bootstrap.min.js',

        // underscore
        pkg.bower_components + 'underscore/underscore-min.js'
    ])
    .pipe(
        concat("libs.js")
    )
    .pipe(
        gulp.dest(pkg.dist + 'js/')
    );
});

gulp.task('js:common', function() {
    return gulp.src([            
        pkg.js + 'jquery-cache.js',            
        pkg.js + 'variables.js',            
        pkg.js + 'functions.js',
        pkg.js + 'app.js'
    ])
    .pipe(
        concat("common.js")
    )
    .pipe(
        gulp.dest(pkg.dist + 'js/')
    );
});

gulp.task('js:concat', function() {           
    return gulp.src([
        pkg.dist + 'js/libs.js',
        pkg.dist + 'js/common.js'            
    ])        
    .pipe(
        concat("app.js")
    )
    .pipe(
        gulp.dest(pkg.dist + 'js/')
    );       
});

gulp.task('js:min', function() {
    return gulp.src([                        
        pkg.dist + 'js/**/*.js',
        '!' + pkg.dist + 'js/**/*.min.js'
    ])
    .pipe(
        uglify()
            .on('error', function(e){
                console.log(e);
            })
    )
    .pipe(
        rename({
            suffix: '.min'
        })
    )
    .pipe(
        gulp.dest(pkg.dist + 'js/')
    );
});

// ----- TASKS ----- //
gulp.task('watch', ['default'], function() {
    gulp.watch([
        pkg.js +  '**/*.js',
        pkg.css +  'sass/**/*.scss'
    ], ['default']);
});

gulp.task('dev', [], function(done) {    
    runSequence('js:all', 'css:sass', function() {
        done();
    });
});

gulp.task('prod', [], function(done) {    
    runSequence('js:libs', 'js:common', 'js:concat', 'js:min', 'css:sass', 'css:min', function() {
        done();
    });
});

gulp.task('default', ["prod"]);
