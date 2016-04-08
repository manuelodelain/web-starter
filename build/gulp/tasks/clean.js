var gulp = require('gulp');
var config = require('../config');
var options = require('../options');
var target = require('../config').targets[options.target];
var del = require('del');

gulp.task('clean', function(cb) {
  var patterns = [];

  if (options.debug){
    patterns.push(target.sass.dest + '/*');
    patterns.push(target.js.dest + '/*.js');
  }else{
    patterns.concat(target.clean.src);
  }

  return del(patterns, cb);
});