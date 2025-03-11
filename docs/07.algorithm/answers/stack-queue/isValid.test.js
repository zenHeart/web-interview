const isValid = require('./isValid')

describe('isValid', () => {
  test('should return true for empty string', () => {
    expect(isValid('')).toBe(true)
  })

  test('should return true for valid simple brackets', () => {
    expect(isValid('()')).toBe(true)
    expect(isValid('[]')).toBe(true)
    expect(isValid('{}')).toBe(true)
  })

  test('should return true for valid nested brackets', () => {
    expect(isValid('([])')).toBe(true)
    expect(isValid('{[]}')).toBe(true)
    expect(isValid('[{}]')).toBe(true)
    expect(isValid('({[]})')).toBe(true)
  })

  test('should return false for invalid brackets', () => {
    expect(isValid('(')).toBe(false)
    expect(isValid(')')).toBe(false)
    expect(isValid('(]')).toBe(false)
    expect(isValid('([)]')).toBe(false)
    expect(isValid('{[}]')).toBe(false)
  })

  test('should return false for mismatched brackets', () => {
    expect(isValid('(((')).toBe(false)
    expect(isValid(')))')).toBe(false)
    expect(isValid('((])')).toBe(false)
  })
})
