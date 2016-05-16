var path = require('path');
var webpack = require('webpack');

var config = {
    port: 8080,
    host: '0.0.0.0'
};

module.exports = {

    entry: [
        './app/app',
        'webpack-dev-server/client?http://localhost:' + config.port
    ],

    output: {
        publicPath: '/',
        filename: 'app.js'
    },

    devtool: 'source-map',

    plugins: [
        new webpack.ProvidePlugin ({
            THREE: 'three'
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'app'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    debug: true,

    devServer: {
        contentBase: './app',
        port: config.port,
        host: config.host
    }
};
