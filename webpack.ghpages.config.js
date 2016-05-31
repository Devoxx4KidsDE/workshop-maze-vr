
const path = require ('path');
const webpack = require ('webpack');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const CopyWebpackPlugin = require ('copy-webpack-plugin');
const CleanWebpackPlugin = require ('clean-webpack-plugin');


const srcDir = 'app';
const distDir = 'build';

module.exports = {

    context: path.resolve (__dirname, srcDir),
    entry: './index.webpack.js',

    devtool: 'cheap-source-map',

    output: {
        path: distDir,
        publicPath: `https://Devoxx4KidsDE.github.io/workshop-maze-vr/${distDir}`,
        filename: 'maze-editor.bundle.js'
    },

    plugins: [
        new webpack.ProvidePlugin ({
            'THREE': 'three'
        }),
        new HtmlWebpackPlugin ({
            filename: 'index.html',
            template: 'index.webpack.html'
        }),
        new CopyWebpackPlugin ([
            {from: 'ui'      , to:'ui'},
            {from: 'css'     , to:'css'},
            {from: 'textures', to:'textures'}
        ]),
        new CleanWebpackPlugin ([ distDir ])
    ],

    module: {
        loaders: [
            {test: /.js$/, exclude: /node_modules/, loader: 'babel'}
        ]
    }
};
