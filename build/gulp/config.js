var baseSrc = './dev';
var baseDest = './web';

module.exports = {
  src: baseSrc,
  dest: baseDest,
  sass: {
    src: [
      baseSrc + '/sass/**/*.scss'
    ],
    dest: baseDest + '/css'
  },
  js: {
    entries: [
      baseSrc + '/js/main.js'
    ],
    dest: baseDest + '/js',
    filename: 'scripts'
  },
  images: {
    src: [
      baseSrc + '/img/**'
    ],
    dest: baseDest + '/img'
  }
};