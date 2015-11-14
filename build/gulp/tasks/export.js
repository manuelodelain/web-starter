var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('export', function () {
  var date = new Date();
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();
  var year = date.getUTCFullYear().toString().substring(2);

  var globs = [
    './web/**',
    './web/.htaccess'
  ];

  return gulp.src(globs, {base: "."})
    .pipe(zip('export_' + month + '-' + day + '-' + year + '.zip'))
    .pipe(gulp.dest('./temp/'));
});