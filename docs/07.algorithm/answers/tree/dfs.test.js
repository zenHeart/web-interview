const dfs = require('./dfs')
const testData = require('./fixture/testData')

describe('DFS', () => {
  // Test each case from the test data
  Object.entries(testData).forEach(([testName, { input, expect: expected }]) => {
    test(testName, () => {
      expect(dfs(input)).toEqual(expected.dfs)
    })
  })
})
