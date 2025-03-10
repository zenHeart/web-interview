/**
 * 单链表反转
 */
const { arrayToLinkList } = require('./arrayToList')
const reverseLinkedList = require('./reverseList')

describe('链表反转', () => {
  test('多节点链表反转', () => {
    const input = arrayToLinkList([1, 2, 3, 4, 5])
    const result = reverseLinkedList(input)

    // 将结果转换为数组进行验证
    const values = []
    let current = result
    while (current) {
      values.push(current.val)
      current = current.next
    }
    expect(values).toEqual([5, 4, 3, 2, 1])
  })

  test('单个节点反转', () => {
    const input = arrayToLinkList([1])
    const result = reverseLinkedList(input)
    expect(result.val).toBe(1)
    expect(result.next).toBeNull()
  })

  test('空链表反转', () => {
    const input = arrayToLinkList([])
    const result = reverseLinkedList(input)
    expect(result).toBeNull()
  })
})
