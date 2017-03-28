var webpack = require('webpack');
var config = require('./webpack.dev.config.js');

config.plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
  }),
];

module.exports = config;