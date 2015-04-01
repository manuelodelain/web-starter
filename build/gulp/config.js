var baseSrc = './dev';
var baseDest = './web';

module.exports = {
  sass: {
    src: [
      baseSrc + '/sass/**/*.scss'
    ],
    dest: baseDest + '/css'
  },
  autoprefixer: {
    browsers: ['last 2 versions'],
    cascade: false
  },
  js: {
    entries: [
      baseSrc + '/js/main.js'
    ],
    dest: baseDest + '/js',
    filename: 'scripts'
  },
};