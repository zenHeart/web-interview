const subsequences = require('./subsequences')

const testData = {
  'example 1': { input: 'abc', output: ['', 'a', 'ab', 'abc', 'ac', 'b', 'bc', 'c'] },
  'example 2': { input: 'a', output: ['', 'a'] }
}

describe('subsequences', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      expect(subsequences(testData[key].input)).toEqual(testData[key].output)
    })
  })
})
