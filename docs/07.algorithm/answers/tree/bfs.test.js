const bfs = require('./bfs')
const testData = require('./fixture/testData')

describe('Breadth-First Search (BFS)', () => {
  // Test each case from the test data
  Object.entries(testData).forEach(([testName, { input, expect: expected }]) => {
    test(testName, () => {
      expect(bfs(input)).toEqual(expected.bfs)
    })
  })
})
