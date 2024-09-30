/**
 * 链表相邻节点交换
 * 链表结构为 {val:1,next:{val:2,next...}
 * Input: 1->2->3->4
 * Output: 2->1->4->3
 *
 */
const { LinkedList } = require('./linked-list');

module.exports = swapPairs;

/**
 *
 * 解题思路采用两个数组保存奇数位置和偶数位置的链表值
 * 然后按照偶数位置,奇数位置逐一推出数据即可
 */
function swapPairs(list) {
  let oddNodeValues = [];
  let evenNodeValues = [];
  // 遍历链表
  let head = list;
  let position = 1;
  while (head) {
    // 判断为奇数位置则推入元素
    if (position % 2) {
      oddNodeValues.push(head.val);
    } else {
      evenNodeValues.push(head.val);
    }
    position++;
    head = head.next;
  }
  // 重新遍历链表按照相反顺序赋值
  head = list;
  position = 1;
  while (head) {
    if (position % 2 && evenNodeValues.length) {
      head.val = evenNodeValues.shift();
    } else {
      head.val = oddNodeValues.shift();
    }
    position++;
    head = head.next;
  }
  return list;
}

console.dir(swapPairs(new LinkedList([1, 2, 3, 4, 5])), { depth: 5 });
