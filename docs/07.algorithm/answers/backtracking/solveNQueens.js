function solveNQueens (n) {
  if (n === 0) return []
  const result = []
  const board = Array.from({ length: n }, () => '.'.repeat(n))
  const columns = new Set()
  const diagonals1 = new Set()
  const diagonals2 = new Set()

  function backtrack (row) {
    if (row === n) {
      result.push([...board]) // 找到一个解
      return
    }
    for (let col = 0; col < n; col++) {
      if (columns.has(col) || diagonals1.has(row - col) || diagonals2.has(row + col)) continue
      board[row] = board[row].substring(0, col) + 'Q' + board[row].substring(col + 1)
      columns.add(col)
      diagonals1.add(row - col)
      diagonals2.add(row + col)
      backtrack(row + 1)
      board[row] = '.'.repeat(n)
      columns.delete(col)
      diagonals1.delete(row - col)
      diagonals2.delete(row + col)
    }
  }

  backtrack(0)
  return result
}

module.exports = solveNQueens
