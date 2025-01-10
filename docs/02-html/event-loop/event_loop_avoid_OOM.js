function readHugeList () {
  return Array.from({ length: 1e6 }, (_, i) => i)
}
const list = readHugeList()

const nextListItem = function () {
  const item = list.pop()

  if (item) {
    // process the list item...
    setTimeout(nextListItem, 0)
  }
}

nextListItem()
