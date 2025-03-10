function removeNthFromEnd (head, n) {
  const dummy = { next: null }
  dummy.next = head
  // 快慢指针
  let first = dummy
  let second = dummy
  if (head === null) return null
  for (let i = 1; i <= n + 1; i++) {
    first = first?.next
  }
  while (first !== null) {
    first = first?.next
    second = second?.next
  }
  second.next = second.next.next
  return dummy.next
}

module.exports = removeNthFromEnd
