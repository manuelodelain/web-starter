const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV;

module.exports = () => {
  let config = {
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr:  mode === 'development',
                sourceMap: mode === 'development',
                reloadAll: true, // fix HMR who is only reload the latest css files in the DOM
              }
            },
            { loader: 'css-loader', options: {sourceMap: mode === 'development'} },
            { loader: 'postcss-loader', options: { 
              sourceMap: mode === 'development',
              plugins: [
                require('autoprefixer')
              ]
            } },
            { loader: 'sass-loader', options: {sourceMap: mode === 'development'} }
          ]
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: mode === 'development' ? 'assets/css/[name].css' : 'assets/css/[name].[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template: './app/templates/inject/styles-template.twig',
        filename: '../app/templates/inject/styles.twig',
        inject: false,
        generatedWarning: 'dynamically generated - do not modify'
      })
    ],
    optimization: {
      minimizer: [
        new OptimizeCssAssetsPlugin({})
      ]
    }
  };

  return config;
};

