function longestPalindrome (s) {
  const n = s.length
  if (n < 2) return s
  let maxLen = 1; let start = 0
  const dp = Array.from({ length: n }, () => Array(n).fill(false))
  for (let i = 0; i < n; i++) dp[i][i] = true
  for (let j = 1; j < n; j++) {
    for (let i = 0; i < j; i++) {
      if (s[i] === s[j]) {
        if (j - i < 3) {
          dp[i][j] = true
        } else {
          dp[i][j] = dp[i + 1][j - 1]
        }
      }
      if (dp[i][j] && j - i + 1 > maxLen) {
        maxLen = j - i + 1
        start = i
      }
    }
  }
  return s.substring(start, start + maxLen)
}

module.exports = longestPalindrome
