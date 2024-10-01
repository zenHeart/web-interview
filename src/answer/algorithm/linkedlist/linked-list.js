/**
 * 该函数用于创建单向链表
 */

class LinkedList {
  constructor (values) {
    // 格式化单个节点或非数组元素为数组
    if (!Array.isArray(values)) {
      values = [values];
    }

    let head = null;
    let backHead = null;
    for (let i = 0; i < values.length; i++) {
      if (i === 0) {
        head = new Node(values[0]);
        backHead = head;
      } else {
        head.next = new Node(values[i]);
        head = head.next;
      }
    }
    this.val = backHead.val;
    this.next = backHead.next;
  }

  // 在末尾追加节点
  add (node) {
    let head = this;
    // 遍历到尾节点 null
    while (head.next) {
      head = head.next;
    }
    // 追加节点
    head.next = node;
    return this;
  }

  // 连接两个链表
  concat (node) {
    let head = this;
    while (head.next) {
      head = head.next;
    }
    head.next = node;
    return this;
  }

  // 删除链表中值等于 val 的所有节点
  removeByVal (val) {
    let head = this;
    let prev = null;
    while (head) {
      if (head.val === val) {
        // 判断是否为链表头部
        if (prev === null) {
          // 如果头节点有后继节点则此后继节点变为头结点
          if (head.next) {
            const newHead = head.next;
            this.val = newHead.val;
            this.next = newHead.next;
            continue;
          } else {
            // 如果没有后继节点则清空当前头的值
            this.val = undefined;
            return this;
          }
        } else {
          // 如果非头结点则前驱指向后继节点即可
          prev.next = head.next;
          head = head.next;
          continue;
        }
      }
      prev = head;
      head = head.next;
    }
    return this;
  }

  // 删除链表第 n 个节点
  removeByNum (n) {
    let i = 1;
    let head = this;
    let prev = null;
    while (head) {
      // 匹配对应位置
      if (i === n) {
        // 判断是否为链表头部
        if (prev === null) {
          // 如果头节点有后继节点则此后继节点变为头结点
          if (head.next) {
            const newHead = head.next;
            this.val = newHead.val;
            this.next = newHead.next;
            return this;
          } else {
            // 如果没有后继节点则清空当前头的值
            this.val = undefined;
            return this;
          }
        } else {
          // 如果非头结点则前驱指向后继节点即可
          prev.next = head.next;
          head = head.next;
          return this;
        }
      } else {
        i++;
        prev = head;
        head = head.next;
      }
    }
  }
}

class Node {
  constructor (val) {
    this.val = val;
    this.next = null;
  }
}

exports.LinkedList = LinkedList;
exports.Node = Node;

console.dir(new LinkedList([1, 2, 3]).removeByNum(3), { depth: 5 });
