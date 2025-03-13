const topologicalSort = require('./topologicalSort')

const testData = {
  'example 1': {
    input: {
      graph: {
        A: ['B', 'C'],
        B: ['D'],
        C: ['D'],
        D: []
      }
    },
    output: ['A', 'C', 'B', 'D']
  }
}

describe('topologicalSort', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      const { graph } = testData[key].input
      expect(topologicalSort(graph)).toEqual(testData[key].output)
    })
  })
})
