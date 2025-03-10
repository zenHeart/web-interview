// 数组转换为链表
exports.arrayToLinkList = function arrayToLinkList (arr) {
  // 1. 知道使用哨兵节点，简化边界处理，直接返回 next
  const dummy = { next: null }
  let cur = dummy
  for (let i = 0; i < arr.length; i++) {
    const node = { val: arr[i], next: null }
    cur.next = node
    cur = node
  }
  return dummy.next
}
