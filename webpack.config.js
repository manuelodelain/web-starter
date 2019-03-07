const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const CopyPlugin = require('copy-webpack-plugin');

const ImageminPlugin = require('imagemin-webpack');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require("imagemin-gifsicle");
const imageminOptipng = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");

const HtmlWebpackPlugin = require('html-webpack-plugin')

const mode = process.env.NODE_ENV;

const config = {
  mode,
  entry: [
    path.resolve(__dirname, './dev/js/main.js'),
    path.resolve(__dirname, './dev/sass/main.scss'),
  ],
  output: {
    filename: 'assets/js/scripts.[contenthash].js',
    path: path.resolve(__dirname, './web'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          mode === 'development' ? "style-loader" : MiniCssExtractPlugin.loader,
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
    new HtmlWebpackPlugin({
      template: './app/templates/inject/scripts-template.twig',
      filename: '../app/templates/inject/scripts.twig',
      inject: false,
      generatedWarning: 'dynamically generated - do not modify',
    }),
    new HtmlWebpackPlugin({
      template: './app/templates/inject/styles-template.twig',
      filename: '../app/templates/inject/styles.twig',
      inject: false,
      generatedWarning: 'dynamically generated - do not modify'
    })
  ],
};

if (mode === 'development') {
  config.devServer = {
    contentBase:  path.resolve(__dirname, './web/'),
    // publicPath: '/assets/js/',
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
      filename: mode === 'development' ? "assets/css/[name].css" : "assets/css/[name].[contenthash].css",
    }),
    new ImageminPlugin({
      name: "assets/img/[name].[ext]",
      imageminOptions: {
        plugins: [
          imageminGifsicle({
            interlaced: true
          }),
          imageminMozjpeg({
            quality: 70,
            progressive: true
          }),
          imageminOptipng({
            optimizationLevel: 5
          }),
          imageminSvgo({
            removeViewBox: true
          })
        ]
      }
    })
  );

  config.optimization = {
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          filename: 'assets/js/vendors.[contenthash].js',
        }
      },
    },
    minimizer: [
      new CleanWebpackPlugin([
        'web/**/*.*'
      ], {
        root: path.resolve(__dirname, './'),
        exclude: []
      }),
      new OptimizeCssAssetsPlugin({}),
    ]
  };
}

module.exports = config;