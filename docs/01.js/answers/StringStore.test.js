describe('JS 字符串存储与索引特性', () => {
  const str = 'A😊B'
  test('length 按 UTF-16 单元计数', () => {
    expect(str.length).toBe(4) // 😊 占两个单元
  })
  test('索引访问高位字符', () => {
    expect(str[1] + str[2]).toBe('😊')
  })
  test('遍历字符与实际字符数', () => {
    const chars = Array.from(str)
    expect(chars).toEqual(['A', '😊', 'B'])
    expect(chars.length).toBe(3)
  })
})
