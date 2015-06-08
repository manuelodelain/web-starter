var baseSrc = './dev';
var baseDest = './web';

module.exports = {
  src: baseSrc,
  dest: baseDest,
  sass: [
    {
      src: [
        baseSrc + '/sass/**/*.scss'
      ],
      dest: baseDest + '/assets/css'
    }
  ],
  js: [
    {
      entries: [
        baseSrc + '/js/main.js'
      ],
      dest: baseDest + '/assets/js',
      filename: 'scripts'
    }
  ],
  images: [
    {
      src: [
        baseSrc + '/img/**/*.{jpg,gif,png,svg}'
      ],
      dest: baseDest + '/assets/img'
    }
  ]
};