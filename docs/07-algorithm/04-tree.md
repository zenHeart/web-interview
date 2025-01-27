# 树

## 深度遍历广度遍历的区别？ {#p0-dfs-bfs}

深度遍历（Depth-First Search，DFS）和广度遍历（Breadth-First Search，BFS）是两种常用的图遍历算法，用于访问和搜索图或树中的节点。它们在遍历顺序和搜索策略上有所不同。

深度遍历（DFS）：

* 深度遍历从一个节点开始，递归地访问该节点的子节点，直到达到最深的节点，然后回溯到上一级节点，继续访问其未访问的子节点。
* 在深度遍历中，我们首先访问根节点，然后依次访问每个子节点。对于每个子节点，再依次访问其子节点，直到到达叶子节点。
* 深度遍历可以通过递归或使用栈来实现。

广度遍历（BFS）：

* 广度遍历从一个节点开始，首先访问该节点的所有相邻节点，然后逐层访问其他节点，直到访问完所有节点。
* 在广度遍历中，我们首先访问根节点，然后依次访问与根节点相邻的节点。然后，再依次访问与这些节点相邻的节点，以此类推，直到遍历完所有节点。
* 广度遍历可以通过使用队列来实现，即先进先出（FIFO）的数据结构。

区别：

* 深度遍历优先访问节点的子节点，然后再访问子节点的子节点，以此类推，直到到达最深的节点。而广度遍历优先访问当前层级的所有节点，然后再访问下一层级的节点。
* 在树或图结构中，深度遍历更适合查找目标节点在较深层级的情况，而广度遍历更适合查找目标节点在较浅层级的情况。
* 深度遍历可能会在较深层级上陷入递归或栈的调用，而广度遍历则需要使用队列来存储和访问节点，因此占用的内存空间较大。
* 深度遍历通常使用递归实现，而广度遍历通常使用迭代和队列实现。

选择使用深度遍历还是广度遍历取决于具体的应用场景和需求。如果需要快速到达目标节点且目标节点位于较浅的层级，可以选择广度遍历。如果需要深度探索并处理树或图中的节点，可以选择深度遍历。

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
function maxDepth (root) {
  if (!root) return 0
  return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
}
```
