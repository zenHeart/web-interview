const nextGreaterElement = require('./nextGreaterElement')

describe('nextGreaterElement', () => {
  test('should return correct next greater elements', () => {
    expect(nextGreaterElement([2, 1, 2, 4, 3])).toEqual([4, 2, 4, -1, -1])
  })

  test('should handle empty array', () => {
    expect(nextGreaterElement([])).toEqual([])
  })

  test('should handle single element array', () => {
    expect(nextGreaterElement([1])).toEqual([-1])
  })

  test('should handle array with all elements the same', () => {
    expect(nextGreaterElement([1, 1, 1, 1])).toEqual([-1, -1, -1, -1])
  })

  test('should handle array with decreasing elements', () => {
    expect(nextGreaterElement([4, 3, 2, 1])).toEqual([-1, -1, -1, -1])
  })

  test('should handle array with increasing elements', () => {
    expect(nextGreaterElement([1, 2, 3, 4])).toEqual([2, 3, 4, -1])
  })
})
