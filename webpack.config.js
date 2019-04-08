// Webpack v4
const path = require('path');
module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'chart.js'
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
      elements: path.resolve(__dirname, 'src/core/elements/index.js'),
      charts: path.resolve(__dirname, 'src/charts/index.js'),
      components: path.resolve(__dirname, 'src/components/index.js'),
    }
  }
}