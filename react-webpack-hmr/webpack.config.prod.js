/**
 * Created by Fabian on 22/09/2016.
 */
var webpack = require('webpack');
var common = require('./webpack.config.common.js');
var webpackMerge = require('webpack-merge');


module.exports = webpackMerge( common, {
    devtool: 'source-map',
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            minimize: true,
            mangle: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
});