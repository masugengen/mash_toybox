module.exports = {
  verbose: true,
  transform: {
    '.*\\.(ts)$': '<rootDir>/node_modules/ts-jest'
  },
  moduleFileExtensions: ['js', 'ts'],
  testEnvironment: 'jest-environment-jsdom-global'
};
