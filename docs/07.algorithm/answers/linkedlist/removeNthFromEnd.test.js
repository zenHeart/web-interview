const { arrayToLinkList } = require('./arrayToList')
const removeNthFromEnd = require('./removeNthFromEnd')

describe('删除链表倒数第N个节点', () => {
  test('删除倒数第2个节点', () => {
    const input = arrayToLinkList([1, 2, 3, 4, 5])
    const result = removeNthFromEnd(input, 2)

    // 转换结果为数组验证
    const values = []
    let current = result
    while (current) {
      values.push(current.val)
      current = current.next
    }
    expect(values).toEqual([1, 2, 3, 5])
  })

  test('删除倒数第1个节点', () => {
    const input = arrayToLinkList([1, 2, 3])
    const result = removeNthFromEnd(input, 1)

    const values = []
    let current = result
    while (current) {
      values.push(current.val)
      current = current.next
    }
    expect(values).toEqual([1, 2])
  })

  test('删除倒数最后一个节点 (头节点)', () => {
    const input = arrayToLinkList([1, 2, 3])
    const result = removeNthFromEnd(input, 3)

    const values = []
    let current = result
    while (current) {
      values.push(current.val)
      current = current.next
    }
    expect(values).toEqual([2, 3])
  })

  test('只有一个节点时删除', () => {
    const input = arrayToLinkList([1])
    const result = removeNthFromEnd(input, 1)
    expect(result).toBeNull()
  })

  test('空链表时返回null', () => {
    const input = arrayToLinkList([])
    const result = removeNthFromEnd(input, 1)
    expect(result).toBeNull()
  })
})
