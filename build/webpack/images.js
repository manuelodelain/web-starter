const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = () => {
  return {
    // module: {
    //   rules: [
    //     {
    //       test: /\.(jpe?g|png|gif|svg)$/,
    //       use: [
    //         {
    //           loader: 'file-loader',
    //           options: {
    //             outputPath: 'assets/img'
    //           }
    //         }
    //       ]
    //     }
    //   ],
    // },
    plugins: [
      new ImageminPlugin({
        test: 'assets/img/**',
        name: 'assets/img/[name].[ext]',
        svgo: { removeViewBox: true },
      })
    ]
  };
};