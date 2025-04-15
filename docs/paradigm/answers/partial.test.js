const partial = require('./partial')

describe('partial function', () => {
  test('should return the result when all arguments are provided', () => {
    const add = (a, b, c) => a + b + c
    expect(partial(add, 1, 2, 3)).toBe(6)
  })

  test('should return a function when fewer arguments are provided', () => {
    const add = (a, b, c) => a + b + c
    const add1 = partial(add, 1)
    expect(typeof add1).toBe('function')
    expect(add1(2, 3)).toBe(6)
  })

  test('should work with multiple partial applications', () => {
    const add = (a, b, c, d) => a + b + c + d
    const add1 = partial(add, 1)
    const add12 = add1(2)
    const add123 = add12(3)
    expect(add123(4)).toBe(10)
  })

  test('should handle functions with no arguments', () => {
    const noArgs = () => 42
    expect(partial(noArgs)).toBe(42)
  })

  test('should handle more arguments than needed', () => {
    const add = (a, b) => a + b
    expect(partial(add, 1, 2, 3, 4)).toBe(3)
  })

  // Tests for placeholder functionality
  test('should handle placeholder in the middle', () => {
    const formatName = (first, middle, last) => `${first} ${middle} ${last}`
    const partialFormat = partial(formatName, 'John', undefined, 'Doe')
    expect(partialFormat('Middle')).toBe('John Middle Doe')
  })

  test('should handle placeholder at the beginning', () => {
    const subtract = (a, b, c) => a - b - c
    const partialSubtract = partial(subtract, undefined, 3, 2)
    expect(partialSubtract(10)).toBe(5) // 10 - 3 - 2 = 5
  })

  test('should handle multiple placeholders', () => {
    const add = (a, b, c, d) => a + b + c + d
    const partialAdd = partial(add, 1, undefined, 3, undefined)
    expect(partialAdd(2, 4)).toBe(10) // 1 + 2 + 3 + 4 = 10
  })

  test('should fill placeholders in order', () => {
    const subtract = (a, b, c, d) => a - b - c - d
    const partialSubtract = partial(subtract, undefined, 2, undefined, 4)
    expect(partialSubtract(10, 1)).toBe(3) // 10 - 2 - 1 - 4 = 3
  })

  test('should allow filling placeholders in multiple steps', () => {
    const add = (a, b, c, d, e) => a + b + c + d + e
    const step1 = partial(add, 1, undefined, 3, undefined, 5)
    const step2 = step1(2) // Fills first undefined (b)
    expect(step2(4)).toBe(15) // 1 + 2 + 3 + 4 + 5 = 15
  })

  test('should work with all placeholders', () => {
    const add = (a, b, c) => a + b + c
    const allPlaceholders = partial(add, undefined, undefined, undefined)
    expect(allPlaceholders(1, 2, 3)).toBe(6)
  })
})
