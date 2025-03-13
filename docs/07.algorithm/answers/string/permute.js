function permute (s) {
  const results = []
  const used = Array(s.length).fill(false)
  function backtrack (path) {
    if (path.length === s.length) {
      results.push(path.join(''))
      return
    }
    for (let i = 0; i < s.length; i++) {
      if (used[i]) continue
      used[i] = true
      path.push(s[i])
      backtrack(path)
      path.pop()
      used[i] = false
    }
  }
  backtrack([])
  return results
}

module.exports = permute
