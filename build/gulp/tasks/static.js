var gulp = require('gulp');
var config = require('../config');
var options = require('../options');
var newer = require('gulp-newer');

gulp.task('static', ['clean'], function() {
  return gulp.src([
      config.static + '/**/*', 
      config.static + '/**/.htaccess',
      '!' + config.static + '/assets/img',
      '!' + config.static + '/assets/img/**/*'
    ])
    .pipe(newer(config.dest))
    .pipe(gulp.dest(config.dest));
});