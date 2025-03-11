module.exports = {
  'empty tree': {
    input: null,
    expect: {
      bfs: [],
      dfs: []
    }
  },
  'single node tree': {
    input: { value: 1, children: [] },
    expect: {
      bfs: [1],
      dfs: [1]
    }
  },
  'two level tree': {
    input: {
      value: 1,
      children: [
        { value: 2, children: [] },
        { value: 3, children: [] }
      ]
    },
    expect: {
      bfs: [1, 2, 3],
      dfs: [1, 2, 3]
    }
  },
  'three level balanced tree': {
    input: {
      value: 1,
      children: [
        {
          value: 2,
          children: [
            { value: 4, children: [] },
            { value: 5, children: [] }
          ]
        },
        {
          value: 3,
          children: [
            { value: 6, children: [] },
            { value: 7, children: [] }
          ]
        }
      ]
    },
    expect: {
      bfs: [1, 2, 3, 4, 5, 6, 7],
      dfs: [1, 2, 4, 5, 3, 6, 7]
    }
  },
  'unbalanced tree': {
    input: {
      value: 1,
      children: [
        { value: 2, children: [] },
        {
          value: 3,
          children: [
            {
              value: 4,
              children: [
                { value: 5, children: [] }
              ]
            }
          ]
        }
      ]
    },
    expect: {
      bfs: [1, 2, 3, 4, 5],
      dfs: [1, 2, 3, 4, 5]
    }
  },
  'tree with multiple children': {
    input: {
      value: 1,
      children: [
        { value: 2, children: [] },
        { value: 3, children: [] },
        { value: 4, children: [] },
        { value: 5, children: [] }
      ]
    },
    expect: {
      bfs: [1, 2, 3, 4, 5],
      dfs: [1, 2, 3, 4, 5]
    }
  }
}
