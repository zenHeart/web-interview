const maxDepth = require('./maxDepth')
const testData = {
  empty: {
    input: null,
    expect: 0
  },
  depth1: {
    input: {
      val: 1
    },
    expect: 1
  },
  depth2: {
    input: {
      val: 1,
      left: {
        val: 2
      }
    },
    expect: 2
  },
  depth3: {
    input: {
      val: 1,
      left: {
        val: 2,
        left: {
          val: 3
        }
      },
      right: {
        val: 3
      }
    },
    expect: 3
  },
  rightSideDeeper: {
    input: {
      val: 1,
      left: {
        val: 2
      },
      right: {
        val: 3,
        right: {
          val: 4,
          right: {
            val: 5
          }
        }
      }
    },
    expect: 4
  },
  balancedTree: {
    input: {
      val: 1,
      left: {
        val: 2,
        left: {
          val: 4
        },
        right: {
          val: 5
        }
      },
      right: {
        val: 3,
        left: {
          val: 6
        },
        right: {
          val: 7
        }
      }
    },
    expect: 3
  },
  zigzagPath: {
    input: {
      val: 1,
      left: {
        val: 2,
        right: {
          val: 4,
          left: {
            val: 6
          }
        }
      },
      right: {
        val: 3
      }
    },
    expect: 4
  }
}

describe('maxDepth', () => {
  // Test each case from the test data
  Object.entries(testData).forEach(([testName, { input, expect: expected }]) => {
    test(testName, () => {
      expect(maxDepth(input)).toEqual(expected)
    })
  })
})
