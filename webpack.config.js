const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(`${__dirname}`, 'src'),
  entry: `${__dirname}/src/js/client.js`,
  module: {
    rules: [{
      test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }]
      }]
    },
  output: {
    path: `${__dirname}/dist/`,
    filename: 'client.min.js'
  },
  plugins: debug ? [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ] : [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]
}