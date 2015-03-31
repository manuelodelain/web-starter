var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config');
var options = require('../options');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');
 
gulp.task('styles', function () {
  return gulp.src(config.sass.src)
    .pipe(options.debug ? sourcemaps.init() : util.noop())
    .pipe(sass())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(options.debug ? sourcemaps.write() : util.noop())
    .pipe(gulp.dest(config.sass.dest));
});