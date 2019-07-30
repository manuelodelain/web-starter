const gulp = require('gulp');
const zip = require('gulp-zip');
const exec = require('child_process').exec;
const mkdirp = require('mkdirp');
const distFiles = [
  './app/**',
  '!./app/var/**',
  './public/**',
  '!./public/.htaccess',
];
const isDist = process.env.EXPORT_TYPE === 'dist';

function task (cb) {
  const date = new Date();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear().toString().substring(2);

  const folder = './exports/';
  const subFolder = isDist ? 'dist/' : 'archive/';

  const filePrefix = isDist ? 'dist' : 'archive';
  const fileName = filePrefix + '_' + month + '-' + day + '-' + year + '_' + date.getTime() + '.zip'; 
  const filePath = folder + subFolder + fileName;

  // dist export
  if (isDist){

    return gulp.src(distFiles, {base: "."})
      .pipe(zip(fileName))
      .pipe(gulp.dest(folder + subFolder));

  // archive export
  }else{
      
      // create folders if needed 
      mkdirp.sync(folder + subFolder);

      const command = 'git archive -0 --format=zip master -o ' + filePath;

      exec(command, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
  }
  
};

exports.exportTask = task;

