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
    '!./web/.htaccess',
    './app/**',
    '!./app/templates/cache',
    '!./app/config.php',
    '!./app/config.SAMPLE.php'
  ];

  return gulp.src(globs, {
    base: '.',
    buffer: false
  })
    .pipe(conn.newer(ftpConfig.dest))
    .pipe(conn.dest(ftpConfig.dest));
});
