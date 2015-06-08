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
  config.sass.forEach(function(item){
    gulp.src(item.src)
      .pipe(plumber({errorHandler: errorNotif}))
      .pipe(gIf(options.debug, sourcemaps.init()))
      .pipe(sass())
      .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(gIf(options.debug, sourcemaps.write()))
      .pipe(gIf(options.minify, minifyCss()))
      .pipe(gulp.dest(item.dest))
      .pipe(browserSync.stream());
  });
});