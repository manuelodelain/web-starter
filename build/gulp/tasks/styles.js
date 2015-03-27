var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config');
var options = require('../options');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
 
gulp.task('styles', function () {
  gulp.src(config.sass.src)
    .pipe(options.debug ? sourcemaps.init() : util.noop())
    .pipe(sass())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(options.debug ? sourcemaps.write() : util.noop())
    .pipe(gulp.dest(config.sass.dest));
});