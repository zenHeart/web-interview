const kruskal = require('./kruskal')

const testData = {
  'example 1': {
    input: {
      graph: {
        A: { B: 1, C: 4 },
        B: { A: 1, C: 2, D: 5 },
        C: { A: 4, B: 2, D: 1 },
        D: { B: 5, C: 1 }
      }
    },
    output: [['A', 'B', 1], ['C', 'D', 1], ['B', 'C', 2]]
  }
}

describe('kruskal', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      const { graph } = testData[key].input
      expect(kruskal(graph)).toEqual(testData[key].output)
    })
  })
})
