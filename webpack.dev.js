const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    // static: './wwwroot/dist',
    static: path.join(__dirname, 'wwwroot/dist'),
    // hot: true,
    hot: true,
    watchFiles: ['src/**/*'], // Watch for changes in the src directory
  },
});
