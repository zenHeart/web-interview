/**
 * 链表 k 个元素为一组进行翻转
 * linked list: 1->2->3->4->5
 * k = 2, you should return: 2->1->4->3->5
 * k = 3, you should return: 3->2->1->4->5
 */
const { LinkedList } = require('./linked-list')

module.exports = reverseKGroup

// 解题思路采用 k 个数组存储值,然后反向推出即可
// 此处假设输入合法不对 k 做校验
function reverseKGroup (list, k) {
  const values = Array(k)
    .fill(0)
    .map(() => [])
  // 按顺序提取链表的值
  let head = list
  let i = 0
  while (head) {
    // 按顺序注意推入对应数组
    values[i % k].push(head.val)
    head = head.next
    i++
  }

  // 重新遍历链表按照相反顺序赋值
  head = list
  // 获得列表长度
  const listLength = i
  // 不能除尽说明最后一层的元素需要按正常顺序推入
  const lastLayer = []
  if (listLength % k) {
    // 推出最后一层元素保存到一个新数组,保持原数值的顺序
    for (i = 0; i < listLength % k; i++) {
      lastLayer.push(values[i].pop())
    }
  }

  // 先逆序推出剩余层元素,再按顺序推出最后一层元素即可
  i = 0
  while (head) {
    // 逆序计算当前位置
    const index = k - (i % k) - 1
    // 确保所有层推完
    if (values[index] && values[0].length) {
      head.val = values[index].shift()
      i++
    } else {
      // 按顺序推出最后一层
      head.val = lastLayer.shift()
    }
    head = head.next
  }
  return list
}
const link = new LinkedList([1, 2, 3, 4, 5])
console.dir(reverseKGroup(link, 4), { depth: 5 })
