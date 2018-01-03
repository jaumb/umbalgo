const webpack = require('webpack');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const srcPath = path.resolve(__dirname, 'src');
const outPath = path.resolve(__dirname, 'client');

const build = {
  context: __dirname,

  entry: './src/index.js',

  devtool: !isProduction ? 'inline-source-map' : false,

  output: {
    filename: 'client.min.js',
    chunkFilename: '[name].client.min.js',
    path: outPath,
    publicPath: outPath
  },

  plugins: !isProduction ? [] : [
    new webpack.optimize.UglifyJsPlugin({ sourcemap: false }),
    new webpack.optimize.OccurrenceOrderPlugin(true)
  ],

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader', 'eslint-loader'],
      include: srcPath
    }]
  },

  resolve: require('./webpack.resolve.js')
};

module.exports = build;
