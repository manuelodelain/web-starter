var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config');
var options = require('../options');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');

var onError = notify.onError(function(error){
  console.log(error);

  return {
    title: 'Error',
    message:  '<%= error.message %>' 
  };
});
 
gulp.task('styles', function () {
  return gulp.src(config.sass.src)
    .pipe(plumber({errorHandler: onError}))
    .pipe(options.debug ? sourcemaps.init() : util.noop())
    .pipe(sass())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(options.debug ? sourcemaps.write() : util.noop())
    .pipe(gulp.dest(config.sass.dest));
});