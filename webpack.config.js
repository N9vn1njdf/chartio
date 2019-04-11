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
      charts: path.resolve(__dirname, 'src/charts/'),
      components: path.resolve(__dirname, 'src/components/'),
      animations: path.resolve(__dirname, 'src/animations/'),
      elements: path.resolve(__dirname, 'src/elements/'),
      core: path.resolve(__dirname, 'src/core/'),
    }
  }
}