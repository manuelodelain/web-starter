var gulp = require('gulp');
var config = require('../config');
var options = require('../options');
var target = require('../config').targets[options.target];
var del = require('del');

gulp.task('clean', function(cb) {
  var patterns = [
    target.sass.dest + '/*', 
    target.js.dest + '/*.js'
  ];

  if (!options.debug){
    // patterns.push(target.images.dest + '/*');
    // delete complete folder
    patterns.push(config.dest);
  }

  return del(patterns, cb);
});