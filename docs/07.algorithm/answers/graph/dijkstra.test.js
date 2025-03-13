const dijkstra = require('./dijkstra')

const testData = {
  'example 1': {
    input: {
      graph: {
        A: { B: 1, C: 4 },
        B: { C: 2, D: 5 },
        C: { D: 1 },
        D: {}
      },
      start: 'A'
    },
    output: { A: 0, B: 1, C: 3, D: 4 }
  }
}

describe('dijkstra', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      const { graph, start } = testData[key].input
      expect(dijkstra(graph, start)).toEqual(testData[key].output)
    })
  })
})
