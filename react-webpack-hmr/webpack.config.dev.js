/**
 * Created by Fabian on 22/09/2016.
 */
var webpack = require('webpack');
var common = require('./webpack.config.common.js');
var webpackMerge = require('webpack-merge');

module.exports = webpackMerge( common, {
    devtool: 'cheap-module-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server',
        './src/index'
    ],
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});