const CopyPlugin = require('copy-webpack-plugin');

module.exports = () => {
  return {
    plugins: [
      new CopyPlugin([
        {from: 'static'},
      ])
    ],
  };
};