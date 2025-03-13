function subsequences (s) {
  const results = []
  function backtrack (start, path) {
    results.push(path.join(''))
    for (let i = start; i < s.length; i++) {
      path.push(s[i])
      backtrack(i + 1, path)
      path.pop()
    }
  }
  backtrack(0, [])
  return results
}

module.exports = subsequences
