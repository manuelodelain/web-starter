var gulp = require('gulp');
var sass = require('gulp-sass');
var options = require('../options');
var target = require('../config').targets[options.target];
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var errorNotif = require('../utils/error-notif');
var gIf = require('gulp-if');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');

gulp.task('styles', function () {
  return gulp.src(target.sass.src)
    .pipe(plumber({errorHandler: errorNotif}))
    .pipe(gIf(process.env.NODE_ENV === 'development', sourcemaps.init()))
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gIf(process.env.NODE_ENV === 'development', sourcemaps.write()))
    .pipe(gIf(options.minify, cleanCSS()))
    .pipe(gulp.dest(target.sass.dest))
    .pipe(browserSync.stream());
});