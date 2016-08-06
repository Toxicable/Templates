var webpack = require('webpack');

module.exports = {
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),      
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            minimize: true,
            mangle: false // Due to https://github.com/angular/angular/issues/6678
        }),
        new webpack.DefinePlugin({
          'process.env': {
              'ENV': 'prod'
          }
      })
    ]
};
