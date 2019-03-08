const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (buildType) => {
  let config = {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
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
            filename: 'assets/js/vendors.[contenthash].js',
          }
        },
      }
    },
  };

  return config;
};