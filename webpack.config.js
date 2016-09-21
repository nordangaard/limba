var path = require('path');

// a little helper for fixing paths for various environments
var fixPath = function(pathString) {
  return path.resolve(path.normalize(pathString));
};

module.exports = {
  entry: './app/index.js',
  output: {
    path: fixPath('public/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015']
      }
    }, {
      test: /\.tag$/,
      loader: 'tag',
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loaders: ["style", "css", "sass"]
    }, {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.css', '.scss'],
    modulesDirectories: ['src', 'node_modules']
  },
  watch: true
}
