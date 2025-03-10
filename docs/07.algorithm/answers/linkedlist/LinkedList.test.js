const { LinkedList } = require('./LinkedList')

describe('LinkedList', () => {
  describe('构造函数', () => {
    test('创建空链表', () => {
      const list = new LinkedList([])
      expect(list.head).toBeNull()
      expect(list.tail).toBeNull()
    })

    test('使用单个值创建链表', () => {
      const list = new LinkedList(1)
      expect(list.head.val).toBe(1)
      expect(list.tail.val).toBe(1)
      expect(list.head.next).toBeNull()
    })

    test('使用数组创建链表', () => {
      const list = new LinkedList([1, 2, 3])
      expect(list.head.val).toBe(1)
      expect(list.head.next.val).toBe(2)
      expect(list.tail.val).toBe(3)
      expect(list.tail.next).toBeNull()
    })
  })

  describe('add 方法', () => {
    test('向链表添加节点', () => {
      const list = new LinkedList([1, 2])
      list.add(3)
      expect(list.tail.val).toBe(3)
      expect(list.head.next.next.val).toBe(3)
    })
  })

  describe('delete 方法', () => {
    test('删除中间节点', () => {
      const list = new LinkedList([1, 2, 3])
      list.delete(2)
      expect(list.head.next.val).toBe(3)
    })

    test('删除头节点', () => {
      const list = new LinkedList([1, 2, 3])
      list.delete(1)
      expect(list.head.val).toBe(2)
    })

    test('删除尾节点', () => {
      const list = new LinkedList([1, 2, 3])
      list.delete(3)
      expect(list.tail.val).toBe(2)
    })
  })

  describe('deleteValues 方法', () => {
    test('删除多个值', () => {
      const list = new LinkedList([1, 2, 3, 2, 4])
      list.deleteValues([2, 3])
      expect(list.head.val).toBe(1)
      expect(list.head.next.val).toBe(4)
    })
  })

  describe('find 方法', () => {
    test('查找存在的值', () => {
      const list = new LinkedList([1, 2, 3])
      const node = list.find(2)
      expect(node.val).toBe(2)
    })

    test('查找不存在的值', () => {
      const list = new LinkedList([1, 2, 3])
      const node = list.find(4)
      expect(node).toBeNull()
    })
  })
})
