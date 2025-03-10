function mergeLinkList (l1, l2) {
  const dummy = { next: null }
  let current = dummy
  let pl1 = l1
  let pl2 = l2
  while (pl1 && pl2) {
    if (pl1.val < pl2.val) {
      current.next = pl1
      pl1 = pl1.next
    } else {
      current.next = pl2
      pl2 = pl2.next
    }
    current = current.next
  }

  if (pl1) {
    current.next = pl1
  } else {
    current.next = pl2
  }
  return dummy.next
}

module.exports = mergeLinkList
