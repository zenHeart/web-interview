# LeetCode

## 字符串/数组处理

1. **[3. 无重复字符的最长子串](https://leetcode.cn/problems/longest-substring-without-repeating-characters/)**
   - 难度：中等
   - 考点：滑动窗口、哈希表
   - 应用场景：前端字符串处理、性能优化

暴力
```typescript
function lengthOfLongestSubstring (s: string): number {
  let maxLength = 0

  let currentStr = ''
  for (const char of s) {
    const index = currentStr.indexOf(char)
    if (index >= 0) {
      currentStr = currentStr.slice(index + 1)
    }
    currentStr = `${currentStr}${char}`
    if (currentStr.length > maxLength) {
      maxLength = currentStr.length
    }
  }
  return maxLength
}
```

滑动窗口
```typescript
function lengthOfLongestSubstring (s: string): number {
  const seen = new Map<string, number>()
  let start = 0
  let maxLength = 0

  for (let end = 0; end < s.length; end++) {
    const char = s[end]
    // If we've seen this char and it's after our current start,
    // move start to after the last occurrence
    if (seen.has(char) && seen.get(char)! >= start) {
      start = seen.get(char)! + 1
    }
    seen.set(char, end)
    maxLength = Math.max(maxLength, end - start + 1)
  }

  return maxLength
}
```

记忆技巧：

- 双指针 start / end
- 当遇到重复的，更新 start 到上一次出现的下一位
- 判断重复，记住是动态的窗口，额外判断 lastSeen >= start

2. **[5. 最长回文子串](https://leetcode.cn/problems/longest-palindromic-substring/)**
   - 难度：中等
   - 考点：动态规划、中心扩展
   - 应用场景：文本处理、算法优化

暴力
```typescript
// 暴力 x 2
function isPalindromic (s: string) {
  return s === s.split('').reverse().join('')
}
// 递归
function isPalindrome (s: string, start: number, end: number): boolean {
  if (start >= end) return true
  if (s[start] !== s[end]) return false
  return isPalindrome(s, start + 1, end - 1)
}

function longestPalindrome (s: string): string {
  let longest = ''
  for (let start = 0; start < s.length; start++) {
    let str = s[start]
    for (let end = start + 1; end < s.length; end++) {
      str = `${str}${s[end]}`
      if (isPalindromic(str) && str.length > longest.length) {
        longest = str
      }
    }
  }
  return longest
}
```

中心扩展
```typescript
function longestPalindrome (s: string): string {
  if (s.length < 2) return s

  let start = 0; let maxLength = 1

  function expandAroundCenter (left: number, right: number): void {
    // 从中心向两边扩展，直到不是回文
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      const currentLength = right - left + 1
      if (currentLength > maxLength) {
        start = left
        maxLength = currentLength
      }
      left--
      right++
    }
  }

  // 遍历每个可能的中心点
  for (let i = 0; i < s.length; i++) {
    expandAroundCenter(i, i) // 奇数长度的回文
    expandAroundCenter(i, i + 1) // 偶数长度的回文
  }

  return s.substring(start, start + maxLength)
}
```

动态规划
```typescript
function longestPalindrome (s: string): string {
  const n = s.length
  if (n < 2) return s

  // dp[i][j] 表示 s[i..j] 是否为回文串
  const dp: boolean[][] = Array(n)
    .fill(0)
    .map(() => Array(n).fill(false))

  // 单个字符都是回文串
  for (let i = 0; i < n; i++) {
    dp[i][i] = true
  }

  let start = 0
  let maxLength = 1

  // 枚举子串长度
  for (let len = 2; len <= n; len++) {
    // 枚举起始位置
    for (let i = 0; i < n - len + 1; i++) {
      const j = i + len - 1 // 终止位置

      if (len === 2) {
        dp[i][j] = s[i] === s[j]
      } else {
        dp[i][j] = dp[i + 1][j - 1] && s[i] === s[j]
      }

      if (dp[i][j] && len > maxLength) {
        start = i
        maxLength = len
      }
    }
  }

  return s.substring(start, start + maxLength)
}
```

## 数据结构

3. **[146. LRU 缓存](https://leetcode.cn/problems/lru-cache/)**
   - 难度：中等
   - 考点：哈希表、双向链表
   - 应用场景：前端缓存实现、性能优化

```typescript
class Node {
  key: number
  value: number
  prev: Node | null
  next: Node | null

  constructor (key: number, value: number) {
    this.key = key
    this.value = value
    this.prev = null
    this.next = null
  }
}

class LRUCache {
  private cache: Map<number, Node>
  private capacity: number
  private head: Node
  private tail: Node

  constructor (capacity: number) {
    this.cache = new Map<number, Node>()
    this.capacity = capacity

    this.head = new Node(0, 0)
    this.tail = new Node(0, 0)
    this.head.next = this.tail
    this.tail.prev = this.head
  }

  private removeNode (node: Node) {
        node.prev!.next = node.next
        node.next!.prev = node.prev
  }

  private addToFront (node: Node) {
    node.next = this.head.next
    node.prev = this.head
        this.head.next!.prev = node
        this.head.next = node
  }

  get (key: number): number {
    const node = this.cache.get(key)
    if (!node) return -1

    this.updateUsed(node)
    return node.value
  }

  private updateUsed (node: Node) {
    this.removeNode(node)
    this.addToFront(node)
  }

  put (key: number, value: number): void {
    if (this.cache.has(key)) {
      const node = this.cache.get(key)!
      node.value = value
      this.updateUsed(node)
      return
    }

    const newNode = new Node(key, value)
    this.cache.set(key, newNode)
    this.addToFront(newNode)

    if (this.cache.size > this.capacity) {
      const lru = this.tail.prev!
      this.removeNode(lru)
      this.cache.delete(lru.key)
    }
  }
}
```

4. **[208. 实现 Trie (前缀树)](https://leetcode.cn/problems/implement-trie-prefix-tree/)**
   - 难度：中等
   - 考点：前缀树、字符串查找
   - 应用场景：搜索提示、自动完成

o(n)
```typescript
class Trie {
  data: string[] = []

  constructor () {
  }

  insert (word: string): void {
    this.data.push(word)
  }

  search (word: string): boolean {
    return this.data.includes(word)
  }

  startsWith (prefix: string): boolean {
    return this.data.some(i => i.startsWith(prefix))
  }
}
```

o(1)
```typescript
class TrieNode {
  children: Map<string, TrieNode> = new Map()
  isEndOfWord = false
}

class Trie {
  root: TrieNode = new TrieNode()

  insert (word: string): void {
    let currentNode = this.root
    for (const char of word) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TrieNode())
      }
      currentNode = currentNode.children.get(char)
    }
    currentNode.isEndOfWord = true
  }

  traverse (word: string): TrieNode | null {
    let currentNode = this.root
    for (const char of word) {
      if (!currentNode.children.has(char)) {
        return null
      }
      currentNode = currentNode.children.get(char)
    }
    return currentNode
  }

  search (word: string): boolean {
    const node = this.traverse(word)
    return node !== null && node.isEndOfWord
  }

  startsWith (prefix: string): boolean {
    const node = this.traverse(prefix)
    return node !== null
  }
}
```

## 异步编程

5. **[Promise 实现](https://leetcode.cn/problems/implement-promise-all/)**
   - 难度：中等
   - 考点：Promise、异步编程
   - 应用场景：异步请求处理、并发控制

### Promise.all

```typescript
function promiseAll<T> (promises: Promise<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([])
      return
    }

    const results: T[] = new Array(promises.length)
    let completedCount = 0

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value
          completedCount++

          if (completedCount === promises.length) {
            resolve(results)
          }
        })
        .catch(reject)
    })
  })
}
```

### 限制并发的 Promise

```typescript
async function promiseLimit<T> (
  promises: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  const results: T[] = []
  const executing: Promise<void>[] = []

  for (const [index, promiseFunc] of promises.entries()) {
    const p = Promise.resolve()
      .then(() => promiseFunc())
      .then(
        result => { results[index] = result }
      )
      .finally(() => {
        const i = executing.indexOf(p)
        if (i !== -1) executing.splice(i, 1)
      })

    executing.push(p)

    if (executing.length >= limit) {
      await Promise.race(executing)
    }
  }

  await Promise.all(executing)
  return results
}
```

## 算法思维

6. **[46. 全排列](https://leetcode.cn/problems/permutations/)**
   - 难度：中等
   - 考点：回溯算法
   - 应用场景：组合状态管理、路径规划

暴力 O(n * n!)
```typescript
function permute (nums: number[]): number[][] {
  let current = [[]]
  for (const num of nums) {
    const nextLevel = []
    for (const combo of current) {
      // 对于每个位置（包括末尾）插入新元素
      for (let i = 0; i <= combo.length; i++) {
        nextLevel.push([
          ...combo.slice(0, i),
          num,
          ...combo.slice(i)
        ])
      }
    }
    current = nextLevel
  }
  return current
}
```

回溯算法 O(n!)
```typescript
/*
[]
├── [1]
│   ├── [1,2]
│   │   └── [1,2,3]
│   └── [1,3]
│       └── [1,3,2]
├── [2]
│   ├── [2,1]
│   │   └── [2,1,3]
│   └── [2,3]
│       └── [2,3,1]
└── [3]
    ├── [3,1]
    │   └── [3,1,2]
    └── [3,2]
        └── [3,2,1]
*/
function permute (nums: number[]): number[][] {
  const result: number[][] = []

  function backtrack (path: number[], used: Set<number>) {
    if (path.length === nums.length) {
      result.push([...path])
      return
    }

    // 尝试每个数字
    for (const num of nums) {
      if (used.has(num)) continue

      path.push(num)
      used.add(num)
      backtrack(path, used)
      path.pop()
      used.delete(num)
    }
  }

  backtrack([], new Set())
  return result
}
```

7. **[200. 岛屿数量](https://leetcode.cn/problems/number-of-islands/)**
   - 难度：中等
   - 考点：DFS、BFS
   - 应用场景：图形处理、连通性问题

dfs
```typescript
function numIslands (grid: string[][]): number {
  if (grid.length === 0) return 0

  const rows = grid.length
  const cols = grid[0].length
  let count = 0

  // DFS遍历整个岛屿并标记
  const dfs = (row: number, col: number) => {
    // 边界检查或已访问（水域）
    if (row < 0 || row >= rows || col < 0 || col >= cols || grid[row][col] === '0') {
      return
    }

    grid[row][col] = '0'

    // 四个方向DFS
    dfs(row - 1, col) // 上
    dfs(row + 1, col) // 下
    dfs(row, col - 1) // 左
    dfs(row, col + 1) // 右
  }

  // 遍历网格
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '1') {
        count++
        dfs(row, col)
      }
    }
  }

  return count
}
```

bfs
```typescript
function numIslands (grid: string[][]): number {
  if (grid.length === 0) return 0

  const rows = grid.length
  const cols = grid[0].length
  let count = 0

  // BFS遍历岛屿
  const bfs = (row: number, col: number) => {
    const queue = [[row, col]]
    grid[row][col] = '0'

    while (queue.length) {
      const [currRow, currCol] = queue.shift()!

      // 四个方向
      const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]
      for (const [dx, dy] of directions) {
        const newRow = currRow + dx
        const newCol = currCol + dy

        if (newRow >= 0 && newRow < rows &&
                    newCol >= 0 && newCol < cols &&
                    grid[newRow][newCol] === '1') {
          queue.push([newRow, newCol])
          grid[newRow][newCol] = '0' // 入队时就标记
        }
      }
    }
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '1') {
        count++
        bfs(row, col)
      }
    }
  }

  return count
}
```

## 动态规划

8. **[70. 爬楼梯](https://leetcode.cn/problems/climbing-stairs/)**

假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

- 难度：简单
- 考点：动态规划
- 应用场景：基础算法训练

```typescript
function climbStairs (n: number): number {
  if (n <= 2) {
    return n
  }
  const dp = Array(n).fill(0)
  dp[0] = 1
  dp[1] = 2
  for (let i = 2; i < n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[dp.length - 1]
}
```

## 设计题

9. **[355. 设计推特](https://leetcode.cn/problems/design-twitter/)**
   - 难度：中等
   - 考点：系统设计、数据结构
   - 应用场景：社交媒体功能实现

```typescript
type Tweet = {
    id: number
    userId: number
}
class Twitter {
  private tweets: Tweet[] = []
  private following: Map<number, number[]> = new Map()

  postTweet (userId: number, tweetId: number): void {
    this.tweets.unshift({
      id: tweetId,
      userId
    })
  }

  getNewsFeed (userId: number): number[] {
    const following = this.following.get(userId) || []
    const userList = [
      ...following,
      userId
    ]
    return this.tweets.filter(t => userList.includes(t.userId))
      .map(t => t.id)
      .slice(0, 10)
  }

  follow (followerId: number, followeeId: number): void {
    const following = this.following.has(followerId)
      ? this.following.get(followerId)
      : []
    if (!following.includes(followeeId)) {
      following.push(followeeId)
      this.following.set(followerId, following)
    }
  }

  unfollow (followerId: number, followeeId: number): void {
    const following = this.following.has(followerId)
      ? this.following.get(followerId)
      : []
    if (following.includes(followeeId)) {
      this.following.set(
        followerId,
        following.filter(f => f !== followeeId)
      )
    }

  }
}
```

## 树操作

10. **[236. 二叉树的最近公共祖先](https://leetcode.cn/problems/lowest-common-ancestor-of-a-binary-tree/)**
    - 难度：中等
    - 考点：树的遍历、递归
    - 应用场景：DOM树操作、组件树处理
