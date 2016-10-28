var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    // 'webpack/hot/dev-server',
    './src/test',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
      publicPath: '/dist/',
      path: __dirname + '/dist',
      filename: 'test.js'
  },
  debug: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, "./src"),
          path.resolve(__dirname, "../src"),
        ],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'es2017']
        }
      }
    ]
  },
  devServer: {
    contentBase: "./"
  }
};
