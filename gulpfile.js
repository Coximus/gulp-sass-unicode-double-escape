'use strict';

var clean = require('gulp-clean'),
    del = require('del'),
    gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sassUnicode = require('./index');
 
gulp.task('assertions', ['build:fail', 'build:pass'], function () {
    return gulp.src('test/**/*.js', {read: false})
        .pipe(mocha({}));
});

gulp.task('build:fail', ['clean'], function() {
   return gulp.src('test/resources/input.scss')
        .pipe(plumber())
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('test/resources/buildFail.css'))
        .pipe(gulp.dest('./'));
});

gulp.task('build:pass', ['clean'], function() {
   return gulp.src('test/resources/input.scss')
        .pipe(plumber())
        .pipe(sass.sync({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sassUnicode())
        .pipe(rename('test/resources/buildPass.css'))
        .pipe(gulp.dest('./'));
});

gulp.task('clean', function() {
    return gulp.src('test/resources/*.css', {read: false})
        .pipe(clean());
});

gulp.task('test', ['assertions'], function() {
    del.sync(['test/resources/*.css']);
});