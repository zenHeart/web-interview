const { preOrderTree, inOrderTree, postOrderTree } = require('./order')
const testData = require('./fixture/order')

describe('Tree Traversal', () => {
  // Test preOrderTree
  describe('preOrderTree', () => {
    Object.entries(testData).forEach(([testName, { input, expect: expected }]) => {
      test(testName, () => {
        expect(preOrderTree(input)).toEqual(expected.preOrder || [])
      })
    })
  })

  // Test inOrderTree
  describe('inOrderTree', () => {
    Object.entries(testData).forEach(([testName, { input, expect: expected }]) => {
      test(testName, () => {
        expect(inOrderTree(input)).toEqual(expected.inOrder || [])
      })
    })
  })

  // Test postOrderTree
  describe('postOrderTree', () => {
    Object.entries(testData).forEach(([testName, { input, expect: expected }]) => {
      test(testName, () => {
        expect(postOrderTree(input)).toEqual(expected.postOrder || [])
      })
    })
  })
})
