const permute = require('./permute')

const testData = {
  'example 1': { input: 'abc', output: ['abc', 'acb', 'bac', 'bca', 'cab', 'cba'] },
  'example 2': { input: 'a', output: ['a'] }
}

describe('permute', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      expect(permute(testData[key].input)).toEqual(testData[key].output)
    })
  })
})
