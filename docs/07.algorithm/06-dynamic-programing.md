
## 模式

## Pattern

### Dynamic Programming (DP)

Problem solving approach:

1. Define subproblems
2. Implement parts that need to be executed repeatedly to solve subproblems
3. Identify and solve boundary conditions

Classic examples:

1. Knapsack Problem
2. Longest Common Subsequence (LCS)
3. Matrix Chain Multiplication
4. [LeetCode Coin Change](https://leetcode-cn.com/problems/coin-change/)
5. All-Pairs Shortest Path in Graphs

## 路径规划

一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。
机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角。
问总共有多少条不同的路径？
输入：m = 3, n = 7
输出：28

```js

// 递归解法，时间复杂度 O(2^n) 
function uniquePaths(m: number, n: number): number {
    function fn(i: number, j: number): number {
        if (i === 0 || j === 0) {
            return 1;
        }
        return fn(i - 1, j) + fn(i, j - 1);
    }
    return fn(m - 1, n - 1);
}

// 动态规划解法， 时间复杂度 O(mn), 空间复杂度 O(mn)
function uniquePaths3(m: number, n: number): number {
    const cache: number[][] = [];
    for (let i = 0; i < m; i++) {
        cache[i] ||= [];
        for (let j = 0; j < n; j++) {
            if (i === 0 || j === 0) {
                cache[i][j] = 1;
            } else if (!cache[i][j]) {
                cache[i][j] = cache[i - 1][j] + cache[i][j - 1];
            }
        }
    }
    return cache[m - 1][n - 1];
}

// 动态规划 + 状态压缩, 时间复杂度 O(mn), 空间复杂度 O(n) 。用一维数组缓存每一列已经计算过的最大值。 
function uniquePaths4(m: number, n: number): number {
    const cache: number[] = [];
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 || j === 0) {
                cache[j] = 1;
            } else {
                // 一维数组 cache 默认存储的是上一行的值。如果左侧格子已计算，则覆盖更新 cache 对应的列。
                // 所以计算 f(i, j)时 cache[j]为上侧格子的值 f(i-1, j)，cache[j-1]为刚覆盖更新的左侧格子的值 f(i, j-1)
                cache[j] += cache[j - 1];
            }
        }
    }
    return cache[n - 1];
}
```
