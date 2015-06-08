var gulp = require('gulp');
var config = require('../config');
var options = require('../options');
 
gulp.task('build', ['clean', 'styles', 'scripts', 'images'], function(){
  if (options.watch){
    config.sass.forEach(function(item){
      gulp.watch(item.src, ['styles']);
    });

    config.images.forEach(function(item){
      gulp.watch(item.src, ['images']);
    });
  }
});