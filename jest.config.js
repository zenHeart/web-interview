module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/docs'],
  //   testMatch: ['**/docs/**/backtracking/*.test.js'], // 更改为你想要的测试文件模式
  //   testMatch: ['**/docs/**/tree/*.test.js'], // 更改为你想要的测试文件模式
  //   testMatch: ['**/docs/**/sort/*.test.js'], // 更改为你想要的测试文件模式
  //   testMatch: ['**/docs/**/dynamic-programing/*.test.js'], // 更改为你想要的测试文件模式
  testMatch: ['**/docs/paradigm/**/*.test.js'], // 更改为你想要的测试文件模式
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testTimeout: 10000, // 对应 Mocha 的 -t 10000
  watchPathIgnorePatterns: ['<rootDir>/node_modules/'], // watch 模式忽略的文件
  verbose: true
}
