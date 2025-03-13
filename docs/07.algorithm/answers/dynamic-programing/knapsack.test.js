const knapsack = require('./knapsack')

const testData = {
  'example 1': { input: { weights: [2, 3, 4, 5], values: [3, 4, 5, 6], capacity: 5 }, output: 7 },
  'example 2': { input: { weights: [1, 2, 3], values: [6, 10, 12], capacity: 5 }, output: 22 },
  'example 3': { input: { weights: [1, 2, 3], values: [10, 20, 30], capacity: 6 }, output: 60 }
}

describe('knapsack', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      const { weights, values, capacity } = testData[key].input
      expect(knapsack(weights, values, capacity)).toEqual(testData[key].output)
    })
  })
})
