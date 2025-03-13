const climbStairs = require('./climbStairs')

const testData = {
  empty: {
    input: 0,
    output: 0
  },
  'stairs 1': {
    input: 1,
    output: 1
  },
  'stairs 2': {
    input: 2,
    output: 2
  },
  'stairs 3': {
    input: 3,
    output: 3
  },
  'stairs 4': {
    input: 4,
    output: 5
  },
  'stairs 5': {
    input: 5,
    output: 8
  },
  'stairs 6': {
    input: 6,
    output: 13
  }
}

describe('climbStairs', () => {
  Object.keys(testData).forEach(key => {
    test(key, () => {
      expect(climbStairs(testData[key].input)).toEqual(testData[key].output)
    })
  })
})
