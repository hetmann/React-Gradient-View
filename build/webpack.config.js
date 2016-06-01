var path = require('path');
var react = require('react');
var webpack = require('webpack');
 
module.exports = {
  entry: {
    'gradient': path.resolve(__dirname, './src/gradient.jsx')
  },
  output: { 
    path: path.resolve(__dirname, './lib'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test : /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        include : APP_DIR,
        loader : 'babel',
        query: {
          plugins: ['transform-runtime'],
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new CommonsChunkPlugin({
      name: ['gradient']
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
};