const solveNQueens = require('./solveNQueens')
const testData = {
  empty: {
    input: [],
    expect: []
  },
  // add n queens test case data
  n1: {
    input: [1],
    expect: [['Q']]
  },
  n2: {
    input: [2],
    expect: []
  },
  n3: {
    input: [3],
    expect: []
  },
  n4: {
    input: [4],
    expect: [
      ['.Q..', '...Q', 'Q...', '..Q.'],
      ['..Q.', 'Q...', '...Q', '.Q..']
    ]
  },
  n5: {
    input: [5],
    expect: [
      ['Q....', '..Q..', '....Q', '.Q...', '...Q.'],
      ['Q....', '...Q.', '.Q...', '....Q', '..Q..'],
      ['.Q...', '...Q.', 'Q....', '..Q..', '....Q'],
      ['.Q...', '....Q', '..Q..', 'Q....', '...Q.'],
      ['..Q..', 'Q....', '...Q.', '.Q...', '....Q'],
      ['..Q..', '....Q', '.Q...', '...Q.', 'Q....'],
      ['...Q.', 'Q....', '..Q..', '....Q', '.Q...'],
      ['...Q.', '.Q...', '....Q', '..Q..', 'Q....'],
      ['....Q', '.Q...', '...Q.', 'Q....', '..Q..'],
      ['....Q', '..Q..', 'Q....', '...Q.', '.Q...']
    ]
  }
}

describe('solveNQueens', () => {
  for (const unitTestName in testData) {
    it(unitTestName, function () {
      const data = testData[unitTestName]
      const res = solveNQueens(...data.input)
      expect(res).toEqual(data.expect)
    })
  }
})
