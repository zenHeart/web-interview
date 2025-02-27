function mergeLinkList (link1, link2) {
  const link1Pointer = link1
  const link2Pointer = link2

  // 当两个链表均有值则
  while(link1Pointer.next && link2Pointer.next) {
    if (link1Pointer.next.val > link2Pointer.next.val) {
      const temp = link1Pointer.next
      link1Pointer.next = link2Pointer.next
      link2Pointer.next = temp
    }
    link1Pointer = link1Pointer.next
  }
}
