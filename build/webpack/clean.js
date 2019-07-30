const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = () => {
  return {
    plugins: [
      new CleanWebpackPlugin({
        cleanStaleWebpackAssets: false
      }),
    ]
  }
};