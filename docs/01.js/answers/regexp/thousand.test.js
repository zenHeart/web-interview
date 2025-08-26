const thousand = require('./thousand')

describe('数字千分位格式化', () => {
  test('整数部分分组', () => {
    expect(thousand(1)).toBe('1')
    expect(thousand(12)).toBe('12')
    expect(thousand(123)).toBe('123')
    expect(thousand(1234)).toBe('1,234')
    expect(thousand(1234567)).toBe('1,234,567')
  })

  test('小数部分保留', () => {
    expect(thousand(1234.56)).toBe('1,234.56')
    expect(thousand('1234567.890')).toBe('1,234,567.890')
  })

  test('负数处理', () => {
    expect(thousand(-1234567.89)).toBe('-1,234,567.89')
  })
})


