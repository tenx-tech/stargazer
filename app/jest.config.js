module.exports = {
  preset: "jest-expo",
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
  transform: {
    "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|react-clone-referenced-element|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation))",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
};
