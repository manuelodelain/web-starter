var gulp = require('gulp');
var options = require('../options');
var config = require('../config');
var target = config.targets[options.target];
var browserSync = require('browser-sync');
var watch = require('gulp-watch');

gulp.task('sync', function() {
  browserSync({
    minify: false,
    open: false,
    proxy: target.sync.proxy
  });

  var patterns = [
    config.dest + '/**/*',
    '!' + target.sass.dest + '/*.css',
    './app/**/*'
  ];

  watch(patterns, browserSync.reload);
});