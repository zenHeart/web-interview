const fibonacci = require('./fibonacci')

const testData = {
  'fibonacci 0': { input: 0, output: 0 },
  'fibonacci 1': { input: 1, output: 1 },
  'fibonacci 2': { input: 2, output: 1 },
  'fibonacci 3': { input: 3, output: 2 },
  'fibonacci 4': { input: 4, output: 3 },
  'fibonacci 5': { input: 5, output: 5 },
  'fibonacci 6': { input: 6, output: 8 },
  'fibonacci 7': { input: 7, output: 13 }
}

describe('fibonacci', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      expect(fibonacci(testData[key].input)).toEqual(testData[key].output)
    })
  })
})
