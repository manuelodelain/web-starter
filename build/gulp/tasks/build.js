var gulp = require('gulp');
var config = require('../config');
var options = require('../options');
var minifyCss = require('gulp-minify-css');
 
gulp.task('build', ['styles', 'scripts'], function(){
  if (options.watch){
    gulp.watch(config.sass.src, ['styles']);
  }

  if (options.minify){
    gulp.src(config.sass.dest + '/*.css')
      .pipe(minifyCss())
      .pipe(gulp.dest(config.sass.dest));
  }
});