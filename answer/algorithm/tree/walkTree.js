module.exports = {
  preOrderTree,
  inOrderTree,
  postOrderTree
};

/**
 * 先序遍历,
 * 1. 根节点
 * 2. 左子树
 * 3. 右子树
 */
function preOrderTree(tree) {
  let res = [];
  res.push(tree.data);
  let leftTree = tree.children && tree.children[0];
  let rightTree = tree.children && tree.children[1];
  if (leftTree) {
    res = res.concat(preOrderTree(leftTree));
  }
  if (rightTree) {
    res = res.concat(preOrderTree(rightTree));
  }
  return res;
}

/**
 * 中序遍历,
 * 1. 左子树
 * 2. 根节点
 * 3. 右子树
 */
function inOrderTree(tree) {
  let res = [];
  let leftTree = tree.children && tree.children[0];
  let rightTree = tree.children && tree.children[1];
  if (leftTree) {
    res = res.concat(preOrderTree(leftTree));
    res.push(tree.data);
  }
  if (rightTree) {
    res = res.concat(preOrderTree(rightTree));
  }
  return res;
}

/**
 * 后序遍历,
 * 1. 左子树
 * 2. 右子树
 * 3. 根节点
 */
function postOrderTree(tree) {
  let res = [];
  let leftTree = tree.children && tree.children[0];
  let rightTree = tree.children && tree.children[1];
  if (leftTree) {
    res = res.concat(preOrderTree(leftTree));
  }
  if (rightTree) {
    res = res.concat(preOrderTree(rightTree));
  }
  res.push(tree.data);
  return res;
}

/**
 * 分层遍历
 * 1. 先根节点
 * 2. 在子节点数据
 * 3. 按照节点层级逐级向下遍历
 * */

function levelOrderTree(tree) {
  // 将对应的层节点存入数组
  let levelNodes = [tree];
  let res = [];
  // 遍历层节点直到为空
  while (levelNodes.length) {
    // 退出一个层节点
    let node = levelNodes.shift();
    res.push(node.data);
    if (node.children) {
      levelNodes = levelNodes.concat(node.children);
    }
  }
  return res;
}
