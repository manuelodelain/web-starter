const path = require('path');

var WebpackNotifierPlugin = require('webpack-notifier');

const BUILD_TYPE = require('./constants').BUILD_TYPE;

const mode = process.env.NODE_ENV;

module.exports = (buildType) => {
  const entry = [path.resolve(__dirname, '../../dev/js/main.js')];

  if (mode === 'development' || buildType === BUILD_TYPE.MODERN) {
    entry.push(path.resolve(__dirname, '../../dev/sass/main.scss'));
  }

  return {
    mode,
    entry,
    output: {
      filename: `assets/js/${buildType === BUILD_TYPE.MODERN ? 'scripts' : 'legacy'}.[contenthash].js`,
      path: path.resolve(__dirname, '../../public'),
      publicPath: '/',
    },
    resolve: {
      modules: [path.resolve(__dirname, '../../dev/js'), 'node_modules']
    },
    plugins: [
      new WebpackNotifierPlugin()
    ]
  }
};