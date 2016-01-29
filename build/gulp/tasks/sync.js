var gulp = require('gulp');
var options = require('../options');
var target = require('../config').targets[options.target];
var browserSync = require('browser-sync');
var watch = require('gulp-watch');

gulp.task('sync', function() {
  browserSync({
    minify: false,
    open: false,
    proxy: target.sync.proxy
  });

  var patterns = [
    target.js.dest + '/*.js',
    // '!' + target.sass.dest + '/*.css',
    target.images.dest + '/*.{jpg,gif,png,svg}',
    './app/templates/**/*.twig',
    './app/data/**'
  ];

  watch(patterns, browserSync.reload);
});