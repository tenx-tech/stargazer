const path = require("path");

module.exports = {
  entry: "./src/server.ts",
  target: "node",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js",".node"],
  },
  output: {
    filename: "server.js",
    path: path.resolve(__dirname, "build"),
  },
};
