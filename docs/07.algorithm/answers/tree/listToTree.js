function listToTree (list) {
  const map = {}
  const roots = []

  // 首先将每个节点按照 id 存入 map
  for (const item of list) {
    map[item.id] = { ...item, children: [] }
  }

  for (const item of list) {
    if (item.parent === null) {
      // 顶级节点
      roots.push(map[item.id])
    } else if (map[item.parent]) {
      // 非顶级节点，找到父节点并添加到其 children 数组中
      map[item.parent].children.push(map[item.id])
    }
  }

  return roots
}

module.exports = listToTree
