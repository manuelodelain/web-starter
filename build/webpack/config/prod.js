const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: [
    path.resolve(__dirname, '../../../dev/js/main.js'),
    path.resolve(__dirname, '../../../dev/sass/main.scss'),
  ],
  output: {
    filename: 'scripts.js',
    // publicPath: path.resolve(__dirname, '../../../web/'),
    path: path.resolve(__dirname, '../../../web/assets/js/')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader"
        ]
      },
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
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
    })
  ],
  optimization: {
    minimizer: [
      new CleanWebpackPlugin([
        'web/*.*'
      ], {
        root: path.resolve(__dirname, '../../../'),
        exclude: []
      }),
      new OptimizeCssAssetsPlugin({}),
    ]
  },
};