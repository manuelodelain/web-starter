var gulp = require('gulp');
var config = require('../config');
var options = require('../options');
var del = require('del');

gulp.task('clean', function(cb) {
  var patterns = [];

  config.sass.forEach(function(item){
    patterns.push(item.dest + '/*');
  });

  config.js.forEach(function(item){
    patterns.push(item.dest + '/*.js');
  });

  if (!options.debug){
    config.images.forEach(function(item){
      patterns.push(item.dest + '/*');
    });
  }

  del(patterns, cb);
});