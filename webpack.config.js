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
const buildType = process.env.BUILD_TYPE;

const MODERN_BUILD_TYPE = 'modern';
const LEGACY_BUILD_TYPE = 'legacy';

const merge = require('webpack-merge');

const TerserPlugin = require('terser-webpack-plugin');

const getConfig = (buildType) => {
  let config = merge(
    getBaseConfig(buildType),
    getScriptsConfig(buildType),
  );

  if (mode === 'development') {
    config = merge(config, getDevServerConfig());
  } 
  
  if (mode === 'development' || buildType === MODERN_BUILD_TYPE) {
    config = merge(
      config, 
      getCleanConfig(),
      getStaticConfig(),
      getImageConfig(),
      getSassConfig()
    );
  }

  return config;
};

const getBaseConfig = (buildType) => {
  const entry = [path.resolve(__dirname, './dev/js/main.js')];

  if (mode === 'development' || buildType === MODERN_BUILD_TYPE) {
    entry.push(path.resolve(__dirname, './dev/sass/main.scss'));
  }

  return {
    mode,
    entry,
    output: {
      filename: `assets/js/${buildType === MODERN_BUILD_TYPE ? 'scripts' : 'legacy'}.[contenthash].js`,
      path: path.resolve(__dirname, './web'),
      publicPath: '/',
    },
  }
};

const getSassConfig = () => {
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

const getScriptsConfig = (buildType) => {
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

const getStaticConfig = () => {
  return {
    plugins: [
      new CopyPlugin([
        {from: 'static'},
      ])
    ],
  };
}

const getDevServerConfig = () => {
  return {
    devServer: {
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
    }
  };
};

const getImageConfig = () => {
  return {
    plugins: [
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
    ]
  };
};

const getCleanConfig = () => {
  return {
    optimization: {
      minimizer: [
        new CleanWebpackPlugin([
          'web/**/*.*'
        ], {
          root: path.resolve(__dirname, './'),
          exclude: []
        }),
      ]
    }
  }
};

let config;

if (mode === 'development') {
  config = getConfig(buildType);
} else {
  config = [
    getConfig(MODERN_BUILD_TYPE),
    getConfig(LEGACY_BUILD_TYPE)
  ];
}

module.exports = config;