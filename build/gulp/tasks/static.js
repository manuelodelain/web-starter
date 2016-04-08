var gulp = require('gulp');
var config = require('../config');
var options = require('../options');
var target = config.targets[options.target];
var newer = require('gulp-newer');

gulp.task('static', function() {
  return gulp.src(target.static.src)
    .pipe(newer(target.static.dest))
    .pipe(gulp.dest(target.static.dest));
});