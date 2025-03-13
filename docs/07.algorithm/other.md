# 杂项

## 大数字符串相加 大数字符串相乘 {#p0-big-number}

计算两个非负大整数(字符串形式的) num1 和 num2 的和
你不能使用任何內建的用于处理大整数的库（比如 BigInteger）， 也不能直接将输入的字符串转换为整数形式。

```js
/**
 * 字符串相加
 * 思路：双指针倒序遍历，逐位相加，有余数加在高一位
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
function addTwoString (num1, num2) {
  const res = []
  let carry = 0
  let i = num1.length - 1
  let j = num2.length - 1
  while (i >= 0 || j >= 0 || carry) {
    const sum = Number(num1[i] || 0) + Number(num2[j] || 0) + carry
    const mod = sum % 10
    res.unshift(mod)
    carry = Math.floor(sum / 10)
    i--
    j--
  }
  return res.join('')
}

/**
 * 字符串相乘
 * @param {string} num1
 * @param {string} num2
 */
function multiplyManyToMany (num1, num2) {
  let res = ''
  for (let i = num2.length - 1; i >= 0; i--) {
    let tempRes = ''
    // 末尾补进位0
    for (let j = 0; j < num2.length - 1 - i; j++) {
      tempRes += '0'
    }
    tempRes = multiplyManyToOne(num1, num2[i]) + tempRes
    res = addTwoString(res, tempRes)
  }
  return res
}

/**
 * 字符串 多乘一
 * @param {string} num1
 * @param {char} x
 * @return {string}
 */
function multiplyManyToOne (num1, x) {
  const res = []
  let carry = 0
  for (let i = num1.length - 1; i >= 0; i--) {
    const product = Number(num1[i]) * Number(x) + carry
    const mod = product % 10
    res.unshift(mod)
    carry = Math.floor(product / 10)
  }
  if (carry) {
    res.unshift(carry)
  }
  return res.join('')
}

// Test
console.log(multiplyManyToOne('123', '5')) // '615'
console.log(multiplyManyToOne('123', '4')) // '492'
console.log(addTwoString('615', '4920')) // '5535'
console.log(multiplyManyToMany('123', '45')) // '5535'
```

## 海量数据下 topk 的问题？

该章节汇总算法常见考点

从10亿个数中找出最大的10000个数是一项非常具有挑战性的任务，需要使用高效的算法和数据结构来处理。

以下是一种基于分治思想的常见方法：

将10亿个数分成1000个小文件，每个文件包含100万个数。
对每个小文件进行排序，选出每个文件中最大的1000个数，并将它们放入一个临时文件中。
将1000个临时文件合并成一个大文件，并再次对其进行排序。
选出最大的10000个数。

这种方法的时间复杂度为O(N*log(N/K))，其中N是所有数据的数量，K是每个小文件中的数据量。由于K相对较小，因此这种方法非常高效。

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
