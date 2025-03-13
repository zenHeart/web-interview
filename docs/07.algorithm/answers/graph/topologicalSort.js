function topologicalSort (graph) {
  const visited = new Set()
  const stack = []
  function dfs (node) {
    if (visited.has(node)) return
    visited.add(node)
    for (const neighbor of graph[node]) {
      dfs(neighbor)
    }
    stack.push(node)
  }
  for (const node in graph) {
    dfs(node)
  }
  return stack.reverse()
}

module.exports = topologicalSort
