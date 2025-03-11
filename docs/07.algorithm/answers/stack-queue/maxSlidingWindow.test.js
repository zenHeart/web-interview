const maxSlidingWindow = require('./maxSlidingWindow')

describe('maxSlidingWindow', () => {
  test('should return empty array when input array is empty', () => {
    expect(maxSlidingWindow([], 1)).toEqual([])
  })

  test('should handle window size of 1', () => {
    expect(maxSlidingWindow([1, 2, 3], 1)).toEqual([1, 2, 3])
  })

  test('should find maximum in sliding window of size 3', () => {
    expect(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)).toEqual([3, 3, 5, 5, 6, 7])
  })

  test('should handle array with negative numbers', () => {
    expect(maxSlidingWindow([-7, -8, 7, 5, 7, 1, 6, 0], 4)).toEqual([7, 7, 7, 7, 7])
  })

  test('should handle window size equal to array length', () => {
    expect(maxSlidingWindow([1, 2, 3, 4], 4)).toEqual([4])
  })

  test('should handle array with duplicate numbers', () => {
    expect(maxSlidingWindow([1, 1, 1, 1, 1], 2)).toEqual([1, 1, 1, 1])
  })

  test('should handle array with decreasing sequence', () => {
    expect(maxSlidingWindow([5, 4, 3, 2, 1], 3)).toEqual([5, 4, 3])
  })
})
