const mergeLinkList = require('./mergeLinkedlist')
const { arrayToLinkList } = require('./arrayToList')

describe('mergeLinkList', () => {
  test('merges two non-empty lists', () => {
    const list1 = arrayToLinkList([1, 2, 3, 4, 5])
    const list2 = arrayToLinkList([3, 4, 7, 8, 9])
    const result = mergeLinkList(list1, list2)

    // Convert result back to array for easy assertion
    const merged = []
    let current = result
    while (current) {
      merged.push(current.val)
      current = current.next
    }

    expect(merged).toEqual([1, 2, 3, 3, 4, 4, 5, 7, 8, 9])
  })

  test('merges when one list is empty', () => {
    const list1 = arrayToLinkList([1])
    const list2 = arrayToLinkList([])
    const result = mergeLinkList(list1, list2)
    expect(result.val).toBe(1)
    expect(result.next).toBeNull()
  })

  test('merges two empty lists', () => {
    const list1 = arrayToLinkList([])
    const list2 = arrayToLinkList([])
    const result = mergeLinkList(list1, list2)
    expect(result).toBeNull()
  })

  test('merges two single-element lists', () => {
    const list1 = arrayToLinkList([2])
    const list2 = arrayToLinkList([1])
    const result = mergeLinkList(list1, list2)
    expect(result.val).toBe(1)
    expect(result.next.val).toBe(2)
    expect(result.next.next).toBeNull()
  })
})
