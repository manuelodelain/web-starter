const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const BUILD_TYPE = require('./constants').BUILD_TYPE;

const mode = process.env.NODE_ENV;

/**
 * 
 * @param {String} buildType 'modern' or 'legacy'
 */
function getBabelPresetOptions (buildType) {
  const settings = {
    useBuiltIns: 'usage',
    // debug: true,
    corejs: {version: 3, proposals: true}
  };

  if (buildType === BUILD_TYPE.MODERN) {
   settings.targets = {esmodules: true};
   settings.modules = false;
  }

  return ['@babel/preset-env', settings];
}

module.exports = (buildType) => {
  const hash = mode === 'development' ? 'hash' : 'contenthash';

  let config = {
    module: {
      rules: [
        {
          test: /\.js$/,
          // exclude: /node_modules\/(?!(screen-navigator)\/).*/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [getBabelPresetOptions(buildType)]
            }
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: `./app/templates/inject/scripts-${buildType}-template.twig`,
        filename: `../app/templates/inject/scripts-${buildType}.twig`,
        inject: false,
        generatedWarning: 'dynamically generated - do not modify',
      })
    ],
    optimization: {
      minimizer: [
        new TerserPlugin()
      ],
      splitChunks: {
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            filename: `assets/js/vendors.[${hash}].js`,
          }
        },
      }
    },
  };

  return config;
};