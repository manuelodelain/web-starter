const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const mode = process.env.NODE_ENV;

const config = {
  mode,
  entry: [
    path.resolve(__dirname, './dev/js/main.js'),
    path.resolve(__dirname, './dev/sass/main.scss'),
  ],
  output: {
    filename: 'assets/js/scripts.js',
    path: path.resolve(__dirname, './web')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
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
    new CopyPlugin([
      {from: 'static'},
    ]),
  ],
};

if (mode === 'development') {
  config.devServer = {
    contentBase:  path.resolve(__dirname, './web/'),
    publicPath: '/assets/js/',
    host: '0.0.0.0',
    port: '3000',
    proxy: {
      '/': {
        'target': {
          'host': 'starter.test',
          'protocol': 'http:',
          'port': 80
        },
        ignorePath: true,
        changeOrigin: true,
        secure: false
      }
    },
    writeToDisk: true
  };
} else {
  config.plugins.push(
    new MiniCssExtractPlugin({
      filename: "../css/[name].css",
    })
  );

  config.optimization = {
    minimizer: [
      new CleanWebpackPlugin([
        'web/*.*'
      ], {
        root: path.resolve(__dirname, './'),
        exclude: []
      }),
      new OptimizeCssAssetsPlugin({}),
    ]
  };
}

module.exports = config;