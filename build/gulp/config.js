var baseSrc = './dev';
var baseDest = './web';

module.exports = {
  src: baseSrc,
  dest: baseDest,
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
          baseSrc + '/img/**/*.{jpg,gif,png,svg}', 
          '!' + baseSrc + '/img/sprite/**', 
        ],
        dest: baseDest + '/assets/img'
      },
      sprite: {
        src: [
          baseSrc + '/img/sprite/*.svg'
        ],
        template: './app/templates/partials/sprite-template.twig',
        destFile: 'sprite.twig',
        dest: './app/templates/partials'
      },
      sync: {
        proxy: 'my-project.dev'
      }
    },
    mobile: {}
  }
};