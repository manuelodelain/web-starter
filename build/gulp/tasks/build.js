var gulp = require('gulp');
var config = require('../config');
var options = require('../options');
 
gulp.task('build', ['clean', 'styles', 'scripts', 'images'], function(){
  if (options.watch){
    gulp.watch(config.sass.src, ['styles']);
    gulp.watch(config.images.src, ['images']);
  }
});