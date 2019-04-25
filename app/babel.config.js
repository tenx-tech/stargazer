"use strict";

module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./"],
        alias: {
          "@src": "./src",
        },
      },
    ],
  ],
};
