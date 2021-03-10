module.exports = {
  moduleNameMapper: {
    '\\.(css)$': 'identity-obj-proxy',
  },
  rootDir: 'src',
  setupFilesAfterEnv: [
    '../node_modules/@testing-library/jest-dom/dist/index.js',
  ],
  transform: {
    '^.+\\.(j|t)sx?$': 'babel-jest',
  },
};
