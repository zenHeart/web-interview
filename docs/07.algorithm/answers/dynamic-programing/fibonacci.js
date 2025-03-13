function fibonacci (n) {
  if (n <= 1) return n
  let prev = 0; let curr = 1
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr]
  }
  return curr
}

module.exports = fibonacci
