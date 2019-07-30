const path = require('path');
const webpack = require('webpack');
const chokidar = require('chokidar');

module.exports = () => {
  return {
    devServer: {
      contentBase:  path.resolve(__dirname, `../../${process.env.WEB_DIR}/`),
      // publicPath: '/assets/js/',
      host: '0.0.0.0',
      port: '3000',
      hot: true,
      writeToDisk: true,
      proxy: {
        '/': {
          'target': {
            'host': 'starter.test',
            'protocol': 'http:',
            'port': 80
          },
          // ignorePath: true,
          changeOrigin: true,
        //   secure: false
        }
      },
      /**
       * Watch for changes to PHP files and reload the page when one changes.
       * @see https://mikeselander.com/hot-reloading-using-webpack-with-php-file-changes/
       */
      before (app, server) {
        const files = [
          path.resolve(__dirname, '../../app/**/*.twig'),
          '!' + path.resolve(__dirname, '../../app/templates/inject/*.twig'),
        ];

        chokidar
          .watch( files, {
            alwaysStat: true,
            atomic: false,
            followSymlinks: false,
            ignoreInitial: true,
            ignorePermissionErrors: true,
            persistent: true,
            usePolling: true
          } )
          .on('all', () => {
            server.sockWrite( server.sockets, "content-changed" );
          });
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  };
};