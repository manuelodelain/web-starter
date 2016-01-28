var gulp = require('gulp');
var zip = require('gulp-zip');

gulp.task('export', function () {
  var date = new Date();
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();
  var year = date.getUTCFullYear().toString().substring(2);

  var globs = [
    './web/**',
    '!./web/.htaccess',
    './app/**',
    '!./app/templates/cache',
    '!./app/templates/cache/**',
    '!./app/config.php',
    '!./app/config.SAMPLE.php'
  ];

  return gulp.src(globs, {base: "."})
    .pipe(zip('export_' + month + '-' + day + '-' + year + '_' + date.getTime() + '.zip'))
    .pipe(gulp.dest('./temp/'));
});