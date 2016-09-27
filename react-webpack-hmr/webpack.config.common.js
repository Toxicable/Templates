var path         = require('path');
var webpack      = require('webpack');
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
      './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    module: {
        loaders: [
            { test: /\.js$/, loaders: ['react-hot-loader', 'babel-loader'], include: path.join(__dirname, 'src')},
            { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader', include: path.join(__dirname, 'src')},
            { test: /\.scss/, loader: 'style-loader!css-loader!postcss-loader!sass-loader', include: path.join(__dirname, 'src')},
        ]
    },
    postcss: function () {
        return {
            defaults: [precss, autoprefixer],
            cleaner:  [autoprefixer({ browsers: [] })]
        };
    }
};