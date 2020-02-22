/**
 * 单链表反转
 * 链表结构为 {val:1,next:{val:2,next...}
 * Input: 1->2->3->4->5->NULL
 * Output: 5->4->3->2->1->NULL
 *
 */
const { LinkedList } = require('./linked-list');

module.exports = reverseLinkedList;
function reverseLinkedList(list) {
  let values = [];
  // 按顺序提取链表的值
  let head = list;
  while (head) {
    values.push(head.val);
    head = head.next;
  }
  // 重新遍历链表按照相反顺序赋值
  head = list;
  while (head) {
    head.val = values.pop();
    head = head.next;
  }
  return list;
}

// console.dir(reverseLinkedList(new LinkedList([1, 2, 3, 4, 5])), { depth: 5 });
