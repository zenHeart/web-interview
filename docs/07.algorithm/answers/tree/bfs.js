/**
 * 广度优先遍历
 */
function bfs (root) {
  const res = []
  if (!root) return res
  const queue = [root]
  while (queue.length) {
    const node = queue.shift()
    res.push(node.value)
    if (node.children?.length) queue.push(...node.children)
  }
  return res
}

module.exports = bfs
