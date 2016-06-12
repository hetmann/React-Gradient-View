var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

module.exports = {
  entry: {
    'gradient': path.resolve(__dirname, '../demo/demo.jsx')
  },
  output: {
    path: path.resolve(__dirname, '../demo'),
    filename: 'demo.js',
    sourceMapFilename: "[file].map",
    publicPath: '/demo/'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader : 'babel',
        query: {
          plugins: ['transform-runtime'],
          cacheDirectory: true
        }
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
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
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
};
