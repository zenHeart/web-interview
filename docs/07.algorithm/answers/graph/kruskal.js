function kruskal (graph) {
  const edges = []
  for (const node in graph) {
    for (const neighbor in graph[node]) {
      edges.push([node, neighbor, graph[node][neighbor]])
    }
  }
  edges.sort((a, b) => a[2] - b[2])

  const parent = {}
  const rank = {}
  for (const node in graph) {
    parent[node] = node
    rank[node] = 0
  }

  function find (node) {
    if (parent[node] !== node) {
      parent[node] = find(parent[node])
    }
    return parent[node]
  }

  function union (node1, node2) {
    const root1 = find(node1)
    const root2 = find(node2)
    if (root1 !== root2) {
      if (rank[root1] > rank[root2]) {
        parent[root2] = root1
      } else if (rank[root1] < rank[root2]) {
        parent[root1] = root2
      } else {
        parent[root2] = root1
        rank[root1]++
      }
    }
  }

  const mst = []
  for (const [node1, node2, weight] of edges) {
    if (find(node1) !== find(node2)) {
      union(node1, node2)
      mst.push([node1, node2, weight])
    }
  }

  return mst
}

module.exports = kruskal
