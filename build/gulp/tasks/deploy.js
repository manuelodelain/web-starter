var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var ftpConfig = require('../ftp-config.SAMPLE');

gulp.task('deploy', function() {

  var conn = ftp.create({
    host: ftpConfig.host,
    user: ftpConfig.user,
    password: ftpConfig.password,
    parallel: 10,
    log: gutil.log
  });

  var globs = [
    './web/**',
    '!./web/config.php'
  ];

  return gulp.src(globs, {
    base: './web/',
    buffer: false
  })
    .pipe(conn.newer('www/'))
    .pipe(conn.dest('www/'));
});
