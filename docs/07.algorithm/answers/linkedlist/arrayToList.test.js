const { arrayToLinkList } = require('./arrayToList.js')
const TestData = {
  empty: {
    input: [],
    expected: null
  },
  'one element': {
    input: [1],
    expected: { val: 1, next: null }
  },
  'multi element': {
    input: [1, 2, 3, 4, 5],
    expected: { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } }
  }
}

describe('arrayToLinkList', function () {
  for (const key in TestData) {
    it(key, function () {
      const result = arrayToLinkList(TestData[key].input)
      expect(result).toEqual(TestData[key].expected)
    })
  }
}
)
