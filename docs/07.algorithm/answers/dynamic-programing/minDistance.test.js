const minDistance = require('./minDistance')

const testData = {
  'empty strings': { input: ['', ''], output: 0 },
  'one empty string': { input: ['horse', ''], output: 5 },
  'example 1': { input: ['horse', 'ros'], output: 3 },
  'example 2': { input: ['intention', 'execution'], output: 5 }
}

describe('minDistance', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      expect(minDistance(testData[key].input[0], testData[key].input[1])).toEqual(testData[key].output)
    })
  })
})
