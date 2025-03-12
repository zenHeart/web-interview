const invertTree = require('./invertTree')
const testData = {
  empty: {
    input: null,
    expect: undefined
  },
  single: {
    input: {
      val: 1
    },
    expect: {
      val: 1
    }
  },
  two: {
    input: {
      val: 1,
      left: {
        val: 2
      }
    },
    expect: {
      val: 1,
      right: {
        val: 2
      }
    }
  },
  three: {
    input: {
      val: 1,
      left: {
        val: 2,
        left: {
          val: 3
        }
      }
    },
    expect: {
      val: 1,
      right: {
        val: 2,
        right: {
          val: 3
        }
      }
    }
  }

}

describe('invertTree', () => {
  // Test each case from the test data
  Object.entries(testData).forEach(([testName, { input, expect: expected }]) => {
    test(testName, () => {
      expect(invertTree(input)).toEqual(expected)
    })
  })
})
