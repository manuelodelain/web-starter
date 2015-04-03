var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config');
var options = require('../options');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var errorNotif = require('../utils/error-notif');
var gIf = require('gulp-if');
var minifyCss = require('gulp-minify-css');
var browserSync = require('browser-sync');

gulp.task('styles', function () {
  return gulp.src(config.sass.src)
    .pipe(plumber({errorHandler: errorNotif}))
    .pipe(gIf(options.debug, sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gIf(options.debug, sourcemaps.write()))
    .pipe(gIf(options.minify, minifyCss()))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(gIf(options.watch, browserSync.reload({stream: true})));
});