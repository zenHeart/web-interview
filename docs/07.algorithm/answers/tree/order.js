module.exports = {
  preOrderTree,
  inOrderTree,
  postOrderTree
}

/**
 * 先序遍历,
 * 1. 根节点
 * 2. 左子树
 * 3. 右子树
 */
function preOrderTree (tree) {
  // Check if tree is null or undefined
  if (!tree) return []

  let res = []
  res.push(tree.value)
  const leftTree = tree.left
  const rightTree = tree.right
  if (leftTree) {
    res = res.concat(preOrderTree(leftTree))
  }
  if (rightTree) {
    res = res.concat(preOrderTree(rightTree))
  }
  return res
}

/**
 * 中序遍历,
 * 1. 左子树
 * 2. 根节点
 * 3. 右子树
 */
function inOrderTree (tree) {
  // Check if tree is null or undefined
  if (!tree) return []

  let res = []
  const leftTree = tree.left
  const rightTree = tree.right
  if (leftTree) {
    res = res.concat(inOrderTree(leftTree))
  }
  res.push(tree.value)
  if (rightTree) {
    res = res.concat(inOrderTree(rightTree))
  }
  return res
}

/**
 * 后序遍历,
 * 1. 左子树
 * 2. 右子树
 * 3. 根节点
 */
function postOrderTree (tree) {
  // Check if tree is null or undefined
  if (!tree) return []

  let res = []
  const leftTree = tree.left
  const rightTree = tree.right
  if (leftTree) {
    res = res.concat(postOrderTree(leftTree))
  }
  if (rightTree) {
    res = res.concat(postOrderTree(rightTree))
  }
  res.push(tree.value)
  return res
}
