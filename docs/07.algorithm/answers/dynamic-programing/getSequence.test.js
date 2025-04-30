const getSequence = require('./getSequence')

const testData = {
  empty: { input: [], output: [] },
  'one element': { input: [1], output: [0] },
  'order items': { input: [1, 2], output: [0, 1] },
  'reverse order': { input: [2, 1], output: [1] },
  'random order': { input: [3, 2, 1], output: [2] },
  'random order with duplicates': { input: [3, 2, 1, 2], output: [2, 3] },
  'random order with zeros': { input: [1, 2, 3], output: [0, 1, 2] },
  'multiple unordered elements': { input: [1, 3, 2, 5, 4], output: [0, 2, 4] }
}

describe('getSequence', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      expect(getSequence(testData[key].input)).toEqual(testData[key].output)
    })
  })
})
