const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/js', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  }
};