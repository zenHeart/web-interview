/**
 * 该函数用于创建单向链表
 */

class Node {
  constructor (val) {
    this.val = val
    this.next = null
  }
}

class LinkedList {
  _head = null
  _tail = null
  get head () {
    return this._head
  }

  get tail () {
    return this._tail
  }

  constructor (values) {
    // 格式化单个节点或非数组元素为数组
    if (!Array.isArray(values)) {
      values = [values]
    }

    const dummy = { next: null }
    let cur = dummy
    for (let i = 0; i < values.length; i++) {
      const currentNode = new Node(values[i])
      cur.next = currentNode
      cur = currentNode
    }
    this._head = dummy.next
    this._tail = this._head ? cur : this._head
  }

  // 在末尾追加节点
  add (value) {
    const node = new Node(value)
    this._tail.next = node
    this._tail = node
  }

  // 删除值为 value 的节点
  delete (value) {
    const dummy = { next: this.head }
    let cur = dummy
    while (cur) {
      if (cur.next && cur.next.val === value) {
        cur.next = cur.next.next
        break
      }
      cur = cur.next
    }
    this._head = dummy.next
    if (cur.next === null) {
      this._tail = cur
    }
  }

  // 删除所有值为 value 的节点
  deleteValues (values) {
    const dummy = { next: this.head }
    let cur = dummy
    while (cur) {
      if (cur.next && values.includes(cur.next.val)) {
        cur.next = cur.next.next
      } else {
        cur = cur.next
      }
    }
    this._head = dummy.next
    if (!cur?.next) {
      this._tail = cur
    }
  }

  // 返回值为 value 的节点
  find (value) {
    let cur = this.head
    while (cur) {
      if (cur.val === value) {
        return cur
      }
      cur = cur.next
    }
    return null
  }
}

exports.LinkedList = LinkedList
exports.Node = Node
