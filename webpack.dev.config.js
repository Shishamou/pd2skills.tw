var path = require('path');
var webpack = require('webpack');

var publicPath = '/assets';

module.exports = {
  entry: {
    script: './src/index.js',
    assets: './assets/index.js'
  },
  output: {
    path: __dirname + '/docs',
    filename: '[name].js',
    publicPath: ''
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel",
        query:
        {
          presets:['es2015', 'react']
        }
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          // 'url?limit=20480',
          'file?hash=sha512&digest=hex&name=' + publicPath + '/[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  }
};