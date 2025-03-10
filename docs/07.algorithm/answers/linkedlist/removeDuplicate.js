/**
 * 删除链表中连续重复的节点，只保留不重复的节点
 * @param {ListNode} head - 链表头节点
 * @returns {ListNode} - 处理后的链表头节点
 */
function removeDuplicate (head) {
  const dummy = { next: null }
  let current = dummy
  let pointer = head

  while (pointer) {
    const currentValue = pointer.val

    // 如果下一个节点存在且值相同，跳过所有重复节点
    if (pointer.next && currentValue === pointer.next.val) {
      while (pointer && pointer.val === currentValue) {
        pointer = pointer.next
      }
    } else {
      // 当前节点不重复，保留该节点
      current.next = pointer
      current = pointer
      pointer = pointer.next
    }
  }

  // 处理最后一个节点的next指针
  current.next = null
  return dummy.next
}

module.exports = removeDuplicate
