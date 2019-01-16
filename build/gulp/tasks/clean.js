var gulp = require('gulp');
var options = require('../options');
var target = require('../config').targets[options.target];
var del = require('del');

gulp.task('clean', function(cb) {
  var patterns = [];

  if (process.env.NODE_ENV === 'development'){
    patterns.push(target.sass.dest + '/*');
    patterns.push(target.js.dest + '/*.js');
  }else{
    patterns = patterns.concat(target.clean.src);
  }

  return del(patterns, cb);
});