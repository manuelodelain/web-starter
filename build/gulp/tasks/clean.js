var gulp = require('gulp');
var config = require('../config');
var del = require('del');

gulp.task('clean', function(cb) {
  del([
    config.js.dest + '/*.css',
    config.sass.dest + '/*.js',
  ], cb);
});