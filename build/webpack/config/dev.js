const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, '../../../dev/js/main.js'),
  output: {
    filename: 'scripts.js',
    path: path.resolve(__dirname, '../../../web/assets/js')
  },
  devServer: {
    contentBase:  path.resolve(__dirname, '../../../web/'),
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
    }
  }
};