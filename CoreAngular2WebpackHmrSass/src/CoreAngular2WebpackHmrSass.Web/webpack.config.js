var path = require('path');
var webpack = require('webpack');
var merge = require('extendify')({ isDeep: true, arrays: 'concat' });
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var currentEnv = process.env.ASPNETCORE_ENVIRONMENT == 'prod' ? 'prod' : 'dev'

var currentEnvConfig = require('./webpack.config.' + currentEnv)

common = {
    resolve: {
        extensions: [ '', '.js', '.ts' ]
    },
    module: {
        loaders: [
            { test: /\.ts$/, include: /App/, loader: 'ts-loader' },
            { test: /\.html$/, loader: 'raw-loader' },
            { test: /\.css/, loader: currentEnv !== 'dev' ? ExtractTextPlugin.extract('css') : 'css' },
            { test: /\.scss$/, loader: currentEnv !== 'dev' ? ExtractTextPlugin.extract('style!css?sourceMap!sass?sourceMap') : 'style!css?sourceMap!sass?sourceMap' },
            { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file?name=assets/[name].[hash].[ext]'}
        ]
    },
    entry: {
        main: './App/main.ts',
        //vendor: ['./App/vendor.ts'],
        //pollfills: ['./App/polyfills.ts']
    },
    output: {
        path: '/dist/',//path.join(__dirname, 'wwwroot', 'dist'),
        filename: '[name].js',
        publicPath: '/dist/'
    },
    plugins: [
        //new webpack.optimize.CommonsChunkPlugin({
        //    name:
        //        ['main',
        //            'vendor'
        //            //'polyfills']
        //]}),
        new ExtractTextPlugin('styles.css')       
    ]
};

module.exports = merge(common, currentEnvConfig);
