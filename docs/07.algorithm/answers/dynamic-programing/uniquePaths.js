// 递归解法，时间复杂度 O(2^n)
function uniquePaths (m, n) {
  function fn (i, j) {
    if (i === 0 || j === 0) {
      return 1
    }
    return fn(i - 1, j) + fn(i, j - 1)
  }
  return fn(m - 1, n - 1)
}

// 动态规划解法， 时间复杂度 O(mn), 空间复杂度 O(mn)
function uniquePaths2 (m, n) {
  const cache = []
  for (let i = 0; i < m; i++) {
    cache[i] ||= []
    for (let j = 0; j < n; j++) {
      if (i === 0 || j === 0) {
        cache[i][j] = 1
      } else if (!cache[i][j]) {
        cache[i][j] = cache[i - 1][j] + cache[i][j - 1]
      }
    }
  }
  return cache[m - 1][n - 1]
}

// 动态规划 + 状态压缩, 时间复杂度 O(mn), 空间复杂度 O(n) 。用一维数组缓存每一列已经计算过的最大值。
function uniquPaths3 (m, n) {
  const cache = []
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (i === 0 || j === 0) {
        cache[j] = 1
      } else {
        // 一维数组 cache 默认存储的是上一行的值。如果左侧格子已计算，则覆盖更新 cache 对应的列。
        // 所以计算 f(i, j)时 cache[j]为上侧格子的值 f(i-1, j)，cache[j-1]为刚覆盖更新的左侧格子的值 f(i, j-1)
        cache[j] += cache[j - 1]
      }
    }
  }
  return cache[n - 1]
}
module.exports = {
  uniquePaths,
  uniquePaths2,
  uniquPaths3
}
