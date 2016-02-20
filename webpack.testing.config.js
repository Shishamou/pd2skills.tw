var config = require('./webpack.dev.config.js');

config.entry = {
    testing: './src/testing.js',
};

module.exports = config;
