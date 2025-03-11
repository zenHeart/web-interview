module.exports = {
  'empty tree': {
    input: null,
    expect: {
      preOrder: [],
      inOrder: [],
      postOrder: []
    }
  },
  'single node tree': {
    input: { value: 1, left: null, right: null },
    expect: {
      preOrder: [1],
      inOrder: [1],
      postOrder: [1]
    }
  },
  'two level tree': {
    input: {
      value: 1,
      left: { value: 2, left: null, right: null },
      right: { value: 3, left: null, right: null }
    },
    expect: {
      preOrder: [1, 2, 3],
      inOrder: [2, 1, 3],
      postOrder: [2, 3, 1]
    }
  },
  'three level balanced tree': {
    input: {
      value: 1,
      left: {
        value: 2,
        left: { value: 4, left: null, right: null },
        right: { value: 5, left: null, right: null }
      },
      right: {
        value: 3,
        left: { value: 6, left: null, right: null },
        right: { value: 7, left: null, right: null }
      }
    },
    expect: {
      preOrder: [1, 2, 4, 5, 3, 6, 7],
      inOrder: [4, 2, 5, 1, 6, 3, 7],
      postOrder: [4, 5, 2, 6, 7, 3, 1]
    }
  },
  'unbalanced tree': {
    input: {
      value: 1,
      left: { value: 2, left: null, right: null },
      right: {
        value: 3,
        left: {
          value: 4,
          left: { value: 5, left: null, right: null },
          right: null
        },
        right: null
      }
    },
    expect: {
      preOrder: [1, 2, 3, 4, 5],
      inOrder: [2, 1, 5, 4, 3],
      postOrder: [2, 5, 4, 3, 1]
    }
  },
  'tree with multiple children': {
    input: {
      value: 1,
      left: { value: 2, left: null, right: null },
      right: {
        value: 3,
        left: { value: 4, left: null, right: null },
        right: { value: 5, left: null, right: null }
      }
    },
    expect: {
      preOrder: [1, 2, 3, 4, 5],
      inOrder: [2, 1, 4, 3, 5],
      postOrder: [2, 4, 5, 3, 1]
    }
  }
}
