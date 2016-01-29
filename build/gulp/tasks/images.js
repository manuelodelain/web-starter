var gulp = require('gulp');
var options = require('../options');
var target = require('../config').targets[options.target];
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var newer = require('gulp-newer');

gulp.task('images', function() {
  return  gulp.src(target.images.src)
    .pipe(newer(target.images.dest))
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest(target.images.dest));
});