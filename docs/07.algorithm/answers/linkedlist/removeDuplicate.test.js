const removeDuplicate = require('./removeDuplicate')
const { arrayToLinkList } = require('./arrayToList')

describe('removeDuplicate', () => {
  test('should remove all consecutive duplicates and keep non-duplicates', () => {
    const list = arrayToLinkList([1, 1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 7, 8, 8, 9])
    const result = removeDuplicate(list)
    expect(result.val).toBe(2)
  })

  test('should return null when all elements are same', () => {
    const list = arrayToLinkList([1, 1, 1])
    expect(removeDuplicate(list)).toBeNull()
  })

  test('should keep single element', () => {
    const list = arrayToLinkList([1])
    const result = removeDuplicate(list)
    expect(result.val).toBe(1)
  })

  test('should handle duplicates in middle', () => {
    const list = arrayToLinkList([1, 2, 2, 2, 3])
    const result = removeDuplicate(list)

    // 转换结果为数组进行验证
    const values = []
    let current = result
    while (current) {
      values.push(current.val)
      current = current.next
    }
    expect(values).toEqual([1, 3])
  })

  test('should handle multiple groups of duplicates', () => {
    const list = arrayToLinkList([1, 2, 2, 2, 3, 6, 6, 6, 6])
    const result = removeDuplicate(list)

    const values = []
    let current = result
    while (current) {
      values.push(current.val)
      current = current.next
    }
    expect(values).toEqual([1, 3])
  })

  test('should handle duplicates at end', () => {
    const list = arrayToLinkList([1, 3, 3, 3])
    const result = removeDuplicate(list)
    expect(result.val).toBe(1)
    expect(result.next).toBeNull()
  })

  test('should handle empty list', () => {
    const list = arrayToLinkList([])
    expect(removeDuplicate(list)).toBeNull()
  })
})
