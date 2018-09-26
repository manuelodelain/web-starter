var gulp = require('gulp');
var options = require('../options');
var target = require('../config').targets[options.target];
var errorNotif = require('../utils/error-notif');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var gIf = require('gulp-if');
var size = require('gulp-size');
var duration = require('gulp-duration');
var babelify = require('babelify');

gulp.task('scripts', function(){
  var bundler = browserify({
    entries: target.js.entries,
    cache: {},
    packageCache: {},
    debug: options.debug
  }).transform(babelify, {
    presets: ['@babel/preset-env'],
    only: ['./dev/js/**'],
    global: true
  });

  if (options.watch){
    bundler = watchify(bundler);
    bundler.on('update', bundle);
  }

  function bundle(){
    return bundler
      .bundle()
      .on('error', errorNotif)
      .pipe(source(target.js.filename + '.js'))
      .pipe(buffer())
      .pipe(gIf(options.minify, uglify()))
      .pipe(duration('bundle time'))
      .pipe(size({
        title: 'bundle size'
      }))
      .pipe(gulp.dest(target.js.dest + '/'));
  }

  return bundle();
});