var gulp = require('gulp');
var options = require('../options');
var target = require('../config').targets[options.target];
var svgstore = require('gulp-svgstore');
var imagemin = require('gulp-imagemin');
var inject = require('gulp-inject');
var rename = require('gulp-rename');
var cheerio = require('gulp-cheerio');

gulp.task('sprite', function() {
  var svgs = gulp.src(target.sprite.src)
    .pipe(cheerio({
        run: function ($) {
            $('[fill]').removeAttr('fill');
        },
        parserOptions: { xmlMode: true }
    }))
    .pipe(rename({prefix: 'sprite-'}))
    .pipe(imagemin())
    .pipe(svgstore({inlineSvg: true}));

  function fileContents (filePath, file) {
    return file.contents.toString();
  }

  return gulp.src(target.sprite.template)
    .pipe(inject(svgs, { transform: fileContents, removeTags: true }))
    .pipe(rename(target.sprite.destFile))
    .pipe(gulp.dest(target.sprite.dest));
});