const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');

const BUILD_TYPE = require('./constants').BUILD_TYPE;

const mode = process.env.NODE_ENV;

module.exports = (buildType) => {
  const entry = [];
  const fileName = buildType === BUILD_TYPE.MODERN ? 'scripts' : 'legacy';
  const hash = mode === 'development' ? 'hash' : 'contenthash';

  // add polyfills
  if (buildType === BUILD_TYPE.LEGACY) {
    // entry.push('intersection-observer');
    // entry.push('whatwg-fetch');
  }

  // main entry
  entry.push(path.resolve(__dirname, '../../assets/js/main.js'));

  // css
  if (mode === 'development' || buildType === BUILD_TYPE.MODERN) {
    entry.push(path.resolve(__dirname, '../../assets/sass/main.scss'));
  }

  return {
    mode,
    entry,
    output: {
      filename: `assets/js/${fileName}.[${hash}].js`,
      path: path.resolve(__dirname, '../../public'),
      publicPath: '/',
    },
    resolve: {
      alias: {
        'assets': path.resolve(__dirname, '../../assets'),
      },
      modules: [path.resolve(__dirname, '../../assets/js'), 'node_modules']
    },
    plugins: [
      new WebpackNotifierPlugin()
    ]
  }
};