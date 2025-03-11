const dailyTemperatures = require('./dailyTemperatures')

describe('dailyTemperatures', () => {
  test('should handle example case', () => {
    expect(dailyTemperatures([19, 22, 20, 25, 21, 19, 16, 23, 24]))
      .toEqual([1, 2, 1, 0, 3, 2, 1, 1, 0])
  })

  test('should handle empty array', () => {
    expect(dailyTemperatures([])).toEqual([])
  })

  test('should handle single element array', () => {
    expect(dailyTemperatures([73])).toEqual([0])
  })

  test('should handle decreasing temperatures', () => {
    expect(dailyTemperatures([30, 25, 20, 15, 10])).toEqual([0, 0, 0, 0, 0])
  })

  test('should handle increasing temperatures', () => {
    expect(dailyTemperatures([10, 15, 20, 25, 30])).toEqual([1, 1, 1, 1, 0])
  })

  test('should handle equal temperatures', () => {
    expect(dailyTemperatures([20, 20, 20, 20])).toEqual([0, 0, 0, 0])
  })

  test('should handle temperatures with multiple equal values', () => {
    expect(dailyTemperatures([20, 20, 25, 20, 25, 30]))
      .toEqual([2, 1, 3, 1, 1, 0])
  })
})
