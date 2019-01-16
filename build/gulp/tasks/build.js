var gulp = require('gulp');
var options = require('../options');
var target = require('../config').targets[options.target];
var watch = require('gulp-watch');
var runSequence = require('run-sequence');
 
gulp.task('build', function(cb){
  runSequence('clean', ['static', 'styles', 'scripts', 'images'/*, 'modernizr' */], function(){
    if (options.watch){
        watch(target.sass.src, function(){
          gulp.start('styles');
        });

        watch(target.images.src, function(){
          gulp.start('images');
        });

        watch(target.static.src, function(){
          gulp.start('static');
        });

        gulp.start('sync');
      }

      cb();
  });
});