var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');

gulp.task('sync', function() {
  browserSync({
    browser: 'google chrome',
    minify: false,
    proxy: 'localhost/web-starter/web'
  });

  var patterns = [];

  config.js.forEach(function(item){
    patterns.push(item.dest + '/*.js');
  });

  config.images.forEach(function(item){
    patterns.push(item.dest + '/*.{jpg,gif,png,svg}');
  });

  // config.sass.forEach(function(item){
  //   patterns.push('!' + item.dest + '/*.css');
  // });
  
  watch(patterns, browserSync.reload);
});