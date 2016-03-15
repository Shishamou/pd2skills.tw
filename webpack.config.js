var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        script: './src/index.js',
        assets: './assets.js'
    },
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: '[name].js',
        publicPath: '/bundle/'
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
                    'file?hash=sha512&digest=hex&name=/[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
        }),
    ]
};
