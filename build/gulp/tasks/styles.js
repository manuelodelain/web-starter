var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('../config');
var options = require('../options');
var autoprefixer = require('gulp-autoprefixer');
 
gulp.task('styles', function () {
  gulp.src(config.sass.src)
    .pipe(sass())
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(gulp.dest(config.sass.dest));
});