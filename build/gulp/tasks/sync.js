var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync');

gulp.task('sync', function() {
  browserSync({
    browser: 'google chrome',
    minify: false,
    proxy: 'localhost'
  });

  var patterns = [config.src + '/**/*'];

  config.sass.forEach(function(item){
    patterns.push('!' + item.dest + '/*.css');
  });

  gulp.watch(patterns, browserSync.reload);
});