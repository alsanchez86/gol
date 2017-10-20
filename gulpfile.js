'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    runSequence = require('run-sequence'),
    fs = require('fs'),
    pkg = JSON.parse(fs.readFileSync('./package.json'));

gulp.task('css:sass', function () {
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

gulp.task('css:min', function () {
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

// Tasks
gulp.task('watch', ['default'], function () {
    gulp.watch([
        pkg.css + 'sass/**/*.scss'
    ], ['default']);
});

gulp.task('dev', [], function (done) {
    runSequence('css:sass', function () {
        done();
    });
});

gulp.task('prod', [], function (done) {
    runSequence('css:sass', 'css:min', function () {
        done();
    });
});

gulp.task('default', ["prod"]);