// 随机创建一个高度为 n 二叉树
function createBTree (n) {
  if (!Number.isInteger(n) || n < 0) {
    throw new TypeError('输入必须为正整数');
  }

  const node = new Node(randomData());
  if (n > 1) {
    node.children = [createBTree(n - 1), createBTree(n - 1)];
  }
  return node;
}

// 返回 0,99 的随机数
function randomData () {
  return ~~(Math.random() * 100);
}

class Node {
  constructor (data) {
    this.data = data;
    this.children = null;
  }
}
