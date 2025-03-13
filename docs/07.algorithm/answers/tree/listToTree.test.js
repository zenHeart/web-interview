const listToTree = require('./listToTree')

describe('listToTree', () => {
  it('should convert empty list to empty array', () => {
    const list = []
    const result = listToTree(list)
    expect(result).toEqual([])
  })

  it('should handle a list with only root nodes', () => {
    const list = [
      { id: 1, name: 'Root 1', parent: null },
      { id: 2, name: 'Root 2', parent: null }
    ]

    const result = listToTree(list)
    expect(result[0].id).toEqual(1)
    expect(result[1].id).toEqual(2)
    expect(result[0].children).toEqual([])
    expect(result[1].children).toEqual([])
  })

  it('should build a simple tree with one level of children', () => {
    const list = [
      { id: 1, name: 'Root', parent: null },
      { id: 2, name: 'Child 1', parent: 1 },
      { id: 3, name: 'Child 2', parent: 1 }
    ]

    const result = listToTree(list)

    expect(result[0].id).toEqual(1)
    expect(result[0].name).toEqual('Root')
    expect(result[0].children[0].id).toEqual(2)
    expect(result[0].children[1].id).toEqual(3)
  })

  it('should build a complex tree with multiple levels', () => {
    const list = [
      { id: 1, name: 'Root', parent: null },
      { id: 2, name: 'Child 1', parent: 1 },
      { id: 3, name: 'Child 2', parent: 1 },
      { id: 4, name: 'Grandchild 1', parent: 2 },
      { id: 5, name: 'Grandchild 2', parent: 3 }
    ]

    const result = listToTree(list)

    expect(result[0].children[0].children[0].id).toEqual(4)
    expect(result[0].children[1].children[0].id).toEqual(5)
  })

  it('should handle multiple roots with their own hierarchies', () => {
    const list = [
      { id: 1, name: 'Root 1', parent: null },
      { id: 2, name: 'Root 2', parent: null },
      { id: 3, name: 'Child of Root 1', parent: 1 },
      { id: 4, name: 'Child of Root 2', parent: 2 }
    ]

    const result = listToTree(list)

    expect(result[0].id).toEqual(1)
    expect(result[0].children[0].id).toEqual(3)
    expect(result[1].id).toEqual(2)
    expect(result[1].children[0].id).toEqual(4)
  })

  it('should ignore items with non-existent parent ids', () => {
    const list = [
      { id: 1, name: 'Root', parent: null },
      { id: 2, name: 'Child', parent: 1 },
      { id: 3, name: 'Orphan', parent: 999 } // non-existent parent
    ]

    const result = listToTree(list)

    expect(result).toHaveLength(1)
    expect(result[0].children).toHaveLength(1)
    // The orphan node should not appear in the tree
  })
})
