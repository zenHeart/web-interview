function printBinary (n) {
  if (n === 0) return []

  const result = []
  function backtrack (path = []) {
    if (path.length === n) {
      result.push(path.join(''))
      return
    }
    backtrack([...path, '0'])
    backtrack([...path, '1'])
  }
  backtrack()
  return result
}

module.exports = printBinary
