var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config');
var options = require('../options');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var errorNotif = require('../utils/error-notif');

gulp.task('styles', function () {
  return gulp.src(config.sass.src)
    .pipe(plumber({errorHandler: errorNotif}))
    .pipe(options.debug ? sourcemaps.init() : gutil.noop())
    .pipe(sass())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(options.debug ? sourcemaps.write() : gutil.noop())
    .pipe(gulp.dest(config.sass.dest));
});