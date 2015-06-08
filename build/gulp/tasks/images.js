var gulp = require('gulp');
var config = require('../config');
var options = require('../options');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var newer = require('gulp-newer');

gulp.task('images', function() {
  config.images.forEach(function(item){
    gulp.src(item.src)
      .pipe(newer(item.dest))
      .pipe(imagemin({
        progressive: true,
        use: [pngquant()]
      }))
      .pipe(gulp.dest(item.dest));
  });
});