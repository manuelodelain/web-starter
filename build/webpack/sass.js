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
              loader: mode === 'development' ? "style-loader" : MiniCssExtractPlugin.loader,
              options: {
                sourceMap: mode === 'development'
              }
            },
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'postcss-loader', options: { 
              sourceMap: true,
              plugins: [
                require('autoprefixer')
              ]
            } },
            { loader: 'sass-loader', options: { sourceMap: true } }
          ]
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: mode === 'development' ? "assets/css/[name].css" : "assets/css/[name].[contenthash].css",
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

