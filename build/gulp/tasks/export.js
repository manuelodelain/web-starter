var gulp = require('gulp');
var zip = require('gulp-zip');
var options = require('../options');
var fs = require('fs');
var exec = require('child_process').exec;
var mkdirp = require('mkdirp');

gulp.task('export', function (cb) {
  var date = new Date();
  var month = date.getUTCMonth() + 1;
  var day = date.getUTCDate();
  var year = date.getUTCFullYear().toString().substring(2);

  var folder = './exports/';
  var subFolder = options.dist ? 'dist/' : 'archive/';

  var filePrefix = options.dist ? 'dist' : 'archive';
  // var fileNamePattern = filePrefix + '_' + month + '-' + day + '-' + year + '_*.zip';
  // var fileVersion = 1;
  // var fileExists = true;
  // var fileName;
  // var filePath;

  // // get file name
  // while (fileExists){
  //   fileName = fileNamePattern.replace('*', fileVersion);
  //   filePath = folder + subFolder + fileName;

  //   try {
  //     fs.statSync(filePath);

  //     // files exists
  //     fileVersion++;
  //     fileExists = true;
  //   }catch (e) {
  //     // file doesn't exist
  //       fileExists = false;
  //   }
  // }
  var fileName = filePrefix + '_' + month + '-' + day + '-' + year + '_' + date.getTime() + '.zip'; 
  var filePath = folder + subFolder + fileName;

  if (options.dist){
    // dist export
    
    var globs = [
      './web/**',
      '!./web/.htaccess',
      './app/**',
      '!./app/templates/cache',
      '!./app/templates/cache/**',
      '!./app/config.php',
      '!./app/config.SAMPLE.php'
    ];

    return gulp.src(globs, {base: "."})
      .pipe(zip(fileName))
      .pipe(gulp.dest(folder + subFolder));
    }else{
      // archive export
      
      // create folders if needed 
      mkdirp.sync(folder + subFolder);

      var command = 'git archive -0 --format=zip master -o ' + filePath;

      exec(command, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
    }
});

