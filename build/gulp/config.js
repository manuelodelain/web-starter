var baseStatic = './static';
var baseSrc = './dev';
var baseDest = './web';

module.exports = {
  src: baseSrc,
  dest: baseDest,
  static: baseStatic,
  targets: {
    default: {
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
      sprite: {
        src: [
          baseStatic + '/assets/img/sprite/*.svg'
        ],
        template: './app/templates/partials/sprite-template.twig',
        destFile: 'sprite.twig',
        dest: './app/templates/partials'
      },
      sync: {
        proxy: 'localhost/web-starter/web'
      }
    },
    mobile: {}
  }
};