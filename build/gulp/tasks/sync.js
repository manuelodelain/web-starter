var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync');

gulp.task('sync', function() {
  browserSync({
    browser: 'google chrome',
    minify: false,
    proxy: 'localhost'
  });

  gulp.watch([config.src + '/**/*', '!' + config.sass.dest + '/*.css'], browserSync.reload);
});