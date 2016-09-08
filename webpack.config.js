var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: ['./src/scripts/index.jsx'],

  output: {
    path: path.join(__dirname, 'build/scripts'),
    filename: 'index.js',
    //1publicPath: '/assets/scripts/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    // root: [path.resolve('./src/scripts')],
    modulesDirectories: ['node_modules']
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader?presets[]=es2015&presets[]=react'
        ]
      }
    ]
  }
}
