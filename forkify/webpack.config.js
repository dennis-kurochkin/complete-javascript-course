const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [path.join(__dirname, 'src/js', 'index.js')],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'src', 'index.html')
    })
  ],
  resolve: {
    alias: {
      App: path.resolve(__dirname, 'src/js/'),
      Views: path.resolve(__dirname, 'src/js/views/'),
      Models: path.resolve(__dirname, 'src/js/models/'),
      Controllers: path.resolve(__dirname, 'src/js/controllers/')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};