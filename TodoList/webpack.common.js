const path = require('path');
const htmlWebPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(png|svg|jpg)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.ttf$/i,
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new htmlWebPlugin({
      template: './src/index.html',
      inject: 'head',
      scriptLoading: 'defer',
    }),
  ],
};
