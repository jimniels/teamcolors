var webpack = require('webpack');
var path = require('path');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: [
    //1'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    //1'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './src/scripts/entry.jsx'
  ],

  output: {
    path: path.join(__dirname, 'assets/scripts'),
    filename: 'bundle.js',
    //1publicPath: '/assets/scripts/'
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    // root: [path.resolve('./src/scripts')],
    modulesDirectories: [
      'node_modules'
    ]
  },

  plugins: [
    new WebpackNotifierPlugin()
  ],

  module: {
    loaders: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader?presets[]=es2015&presets[]=react'
        ]
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: "json-loader"
      }
    ]
  }
}
