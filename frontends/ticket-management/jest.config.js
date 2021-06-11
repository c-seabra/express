module.exports = {
  modulePathIgnorePatterns: ['/cache', '/dist'],
  preset: 'ts-jest',
  roots: ['<rootDir>/src', '../../packages'],
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  testMatch: ['**/?(*.)+(spec|test).+(ts|tsx|js|jsx)'],
  transform: {
    '^.+\\.(ts|tsx|jsx)$': 'ts-jest',
  },
};
