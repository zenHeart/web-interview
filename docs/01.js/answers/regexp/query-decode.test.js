const decode = require('./query-decode')

describe('URL 查询字段解码', () => {
  test('基础解析', () => {
    const url = 'https://a.com?p=1&q=test'
    expect(decode(url)).toEqual({ p: '1', q: 'test' })
  })

  test('URL 编码与 + 作为空格', () => {
    const url = 'https://a.com?kw=hello%20world&x=1+2'
    expect(decode(url)).toEqual({ kw: 'hello world', x: '1 2' })
  })

  test('重复 key 解析为数组', () => {
    const url = 'https://a.com?a=1&a=2&b=3'
    expect(decode(url)).toEqual({ a: ['1', '2'], b: '3' })
  })

  test('无查询参数返回空对象', () => {
    expect(decode('https://a.com')).toEqual({})
    expect(decode('https://a.com?')).toEqual({})
  })
})


