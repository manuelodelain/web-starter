const ImageminPlugin = require('imagemin-webpack');

const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGifsicle = require("imagemin-gifsicle");
const imageminOptipng = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");

module.exports = () => {
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