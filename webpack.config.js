// Webpack v4
const path = require('path');
module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  watch: true,
  watchOptions: {
    poll: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  resolve: {
    alias: {
      animations: path.resolve(__dirname, 'src/animations/index.js'),
      core: path.resolve(__dirname, 'src/core/index.js'),
      elements: path.resolve(__dirname, 'src/elements/index.js'),
      charts: path.resolve(__dirname, 'src/charts/index.js'),
    }
  }
}