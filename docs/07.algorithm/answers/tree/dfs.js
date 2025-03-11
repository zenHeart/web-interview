/**
 * 深度优先遍历
 */
function dfs (root) {
  // 深度优先遍历
  const res = []
  if (!root) return res
  const stack = [root]

  while (stack.length) {
    const node = stack.pop()
    res.push(node.value)
    if (node.children?.length) {
      // Add children in reverse order to maintain proper DFS traversal
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push(node.children[i])
      }
    }
  }

  return res
}

module.exports = dfs
