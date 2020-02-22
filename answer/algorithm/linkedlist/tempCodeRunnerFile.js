/**
 * 检测链表中的环
 * 通过 hash 表判断索引是否被访问
 */
const { LinkedList } = require('./linked-list');

module.exports = hasCycle;
function hasCycle(list) {
  let hashMap = new Map();
  // 按顺序提取链表的值
  let head = list;
  while (head) {
    // 若有节点以存在说明发生循环,直接推出
    if (hashMap.get(head) {
      return true;
    } else {
      // 注意此处无需存储链表的值, true 标记节点已访问
      hashMap.set(head, true);
    }
    head = head.next;
  }
  // 如果循环推出说明无环
  return false;
}

let link = new LinkedList([1, 2, 3]);
console.log(hasCycle(link));
link.add(link);
console.log(hasCycle(link));
