var gulp = require('gulp');
var config = require('../config');
var options = require('../options');
var errorNotif = require('../utils/error-notif');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var gIf = require('gulp-if');

gulp.task('scripts', function(){
  var bundler = browserify({
    entries: config.js.entries,
    debug: options.debug
  });

  if (options.watch){
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  function bundle(){
    return bundler.bundle()
      .on('error', errorNotif)
      .pipe(source(config.js.dest + '/' + config.js.filename + '.js'))
      .pipe(gIf(options.debug, buffer()))
      .pipe(gIf(options.debug, sourcemaps.init({loadMaps: true})))
      .pipe(gIf(options.debug, sourcemaps.write('./')))
      .pipe(gIf(options.minify, buffer()))
      .pipe(gIf(options.minify, uglify()))
      .pipe(gulp.dest('./'));
  }

  return bundle();
});