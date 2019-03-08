const path = require('path');

const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = () => {
  return {
    plugins: [
      new CleanWebpackPlugin([
        'web/**/*.*'
      ], {
        root: path.resolve(__dirname, '../../'),
        exclude: []
      }),
    ]
  }
};