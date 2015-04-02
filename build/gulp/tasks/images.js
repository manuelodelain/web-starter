var gulp = require('gulp');
var config = require('../config');
var options = require('../options');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var newer = require('gulp-newer');

gulp.task('images', function() {
  return gulp.src(config.images.src)
    .pipe(newer(config.images.dest))
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(config.images.dest));
});