function invertTree (root) {
  if (!root) return
  const left = invertTree(root.left)
  const right = invertTree(root.right)
  root.left = right
  root.right = left
  return root
}

module.exports = invertTree
