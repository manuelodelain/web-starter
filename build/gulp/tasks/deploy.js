var gulp = require('gulp');
var options = require('../options');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');
var fs = require('fs');
var config = require('../config');

gulp.task('deploy', function(cb) {

  var path = './build/gulp/ftp-config.json';

  function runTask(file){
    var target = options.prod ? 'prod' : 'staging';
    var ftpConfig = JSON.parse(file)[target];
    var conn = ftp.create({
      host: ftpConfig.host,
      user: ftpConfig.user,
      password: ftpConfig.password,
      parallel: 10,
      log: gutil.log
    });

    gulp.src(config.distFiles, {base: '.', buffer: false})
      .pipe(conn.newer(ftpConfig.dest))
      .pipe(conn.dest(ftpConfig.dest))
      .on('end', cb);
  }

  function onError(error){
    if (error.code === 'ENOENT'){
      gutil.log(gutil.colors.red('Warning:'), 'Please configure ftp access with the file ' + path);
    }else{
      throw error;
    }

    cb();
  }

  fs.readFile(path, 'utf8', function(error, data){
    if (!error){
      return runTask(data);
    }else{
      onError(error);
    }
  });
});
