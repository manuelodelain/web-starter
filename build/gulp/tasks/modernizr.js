var gulp = require('gulp');
var modernizr = require('gulp-modernizr');
var config = require('../config');
var options = require('../options');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gIf = require('gulp-if');
 
gulp.task('modernizr', function() {
  var basename = 'modernizr-custom';
  var libFolder = '/assets/js/lib';

  var stream = gulp
    .src(config.src + '/**/*.{scss,js}')
    .pipe(modernizr({
      excludeTests: ['svg', 'hidden', 'opacity', 'search'],
      options : ['setClasses']
    }))
    .pipe(rename({
      basename: basename
    }))
    .pipe(gulp.dest(config.dest + libFolder));

    if (options.minify){
      stream
        .pipe(uglify())
        .pipe(rename({
          basename: basename,
          suffix: '.min'
        }))
        .pipe(gulp.dest(config.dest + libFolder));
    }

  return stream;
});