var gulp = require('gulp');
var del = require('del');

gulp.task('clean-exports', function(cb) {
  return del(['./exports/**/.DS_Store'], cb);
});