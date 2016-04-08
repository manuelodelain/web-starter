var baseStatic = './static';
var baseSrc = './dev';
var baseDest = './web';

module.exports = {
  src: baseSrc,
  dest: baseDest,
  static: baseStatic,
  distFiles: [
    baseDest + '/**',
    '!' + baseDest + '/.htaccess',
    './app/**',
    '!./app/templates/cache',
    '!./app/templates/cache/**',
    '!./app/config.php',
    '!./app/config.SAMPLE.php'
  ],
  targets: {
    default: {
      clean: {
        src: [
          baseDest + '/**/*'
        ]
      },
      static: {
        src: [
          baseStatic + '/**/*',
          baseStatic + '/.htaccess',
          '!' + baseStatic + '/assets/img',
          '!' + baseStatic + '/assets/img/**/*'
          ],
          dest: baseDest
      },
      sass: {
        src: baseSrc + '/sass/**/*.scss',
        dest: baseDest + '/assets/css'
      },
      js: {
        entries: baseSrc + '/js/main.js',
        dest: baseDest + '/assets/js',
        filename: 'scripts'
      },
      images: {
        src: [
          baseStatic + '/assets/img/**/*.{jpg,gif,png,svg}', 
          '!' + baseStatic + '/assets/img/sprite/**', 
        ],
        dest: baseDest + '/assets/img'
      },
      sync: {
        proxy: 'localhost/web-starter/web'
      }
    },
    mobile: {}
  }
};