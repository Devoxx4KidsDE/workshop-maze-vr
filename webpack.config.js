
var path    = require ('path');
var webpack = require ('webpack');

var config = {
    port: 4000
};

module.exports = {

    entry : 'webpack-dev-server/client?http://localhost:' + config.port,

    output: {
        publicPath: '/',
        filename  : 'app.js'
    },

    devtool: 'source-map',

    debug: true,

    devServer: {
       contentBase: "./app",
        port: config.port
    }
};