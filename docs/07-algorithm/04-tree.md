# 树

## 树的先序,中序,后续?

## 二叉树BFS遍历

```js
// BFS遍历
function bfs(root: TreeNode | null): number[] {
    if (!root) return []
    const queue: any[] = [root]
    const res: any[] = []
    while (queue.length) {
        let node = queue.shift()
        // 主要逻辑
        res.push(node.val)
        // 子结点入队
        if (node.left) {
            queue.push(node.left)
        }
        if (node.right) {
            queue.push(node.right)
        }
    }
    return res
}

// 二叉树锯齿状层序遍历， 时间复杂度 O(N)，空间复杂度 O(logN) 至 O(N)
function zigzagLevelOrder(root: TreeNode | null): number[][] {
    if (!root) return []
    const res = []
    const queue: any[] = [root]
    let isReverse = false // 方向开关
    while (queue.length) {
        let n = queue.length
        let level = []
        while (n--) {
            let node = queue.shift()
            // 在临时结果 level 中处理排序最简便，不要影响 queue 入队出队
            isReverse ? level.unshift(node.val) : level.push(node.val)
            if (node.left) {
                queue.push(node.left)
            }
            if (node.right) {
                queue.push(node.right)
            }
        }
        res.push(level)
        isReverse = !isReverse // 每一层切换开关
    }
    return res
}

// Test 构造二叉树测试
export class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val || 0;
    this.left = left || null;
    this.right = right || null;
  }
}
/**
 * 序列化构造树
 * 完全二叉树中，父结点序号为 n，子结点为 2n+1、2n+2 （序号从0开始）
 * @param nums Array<number | null> 完全二叉树的BFS遍历序列，空位补 null
 * @returns TreeNode 树的根结点
 */
export function createTree(nums: Array<number | null>): TreeNode | null {
  const nodes = nums.map(val => val === null ? null : new TreeNode(val))
  let i = 0 // 父结点序号
  let j = 1 // 左子结点序号
  while (j < nums.length) {
    let root = nodes[i]
    if (!root) continue
    root.left = nodes[j]
    root.right = nodes[j + 1]
    i += 1
    j += 2
  }
  return nodes[0]
}
const root = createTree([1, 2, 3, null, null, 4, 5])
console.log(bfs(root)) // [1, 2, 3, 4, 5]

```

## 二叉树的最大深度

给定一个二叉树，找出其最大深度。
答案 考察递归

```js
function maxDepth(root) {
    if (!root) return 0;
    return Math.max(maxDepth(root.left),maxDepth(root.right)) + 1;};

```
