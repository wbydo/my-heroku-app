module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js'],
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '/^.+\\.ts$/': 'ts-jest',
    '/^.+\\.js$/': 'babel-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: './shared/tsconfig.json',
    },
  },
  testMatch: ['**/tests/**/*.test.ts'],
  // moduleNameMapper: {
  //   '^#/(.+)': '<rootDir>/$1',
  // },
  transformIgnorePatterns: ['node_modules'],
};
