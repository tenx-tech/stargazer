const path = require('path');

module.exports = {
  entry: './server.ts',
  target: "node",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'build')
  },
};