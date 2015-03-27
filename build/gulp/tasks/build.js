var gulp = require('gulp');
var config = require('../config');
var options = require('../options');

gulp.task('build', ['styles'], function(){
  if (options.watch){
    gulp.watch(config.sass.src, ['styles']);
  }
});