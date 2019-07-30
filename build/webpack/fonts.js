module.exports = () => {
  let config = {
    module: {
      rules: [
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name][hash].[ext]',
                outputPath: 'assets/fonts',
              }
            }
          ]
        }
      ],
    }
  };

  return config;
};

