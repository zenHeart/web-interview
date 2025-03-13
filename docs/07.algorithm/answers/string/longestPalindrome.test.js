const longestPalindrome = require('./longestPalindrome')

const testData = {
  'example 1': { input: 'babad', output: 'bab' },
  'example 2': { input: 'cbbd', output: 'bb' },
  'example 3': { input: 'a', output: 'a' },
  'example 4': { input: 'ac', output: 'a' }
}

describe('longestPalindrome', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      expect(longestPalindrome(testData[key].input)).toEqual(testData[key].output)
    })
  })
})
