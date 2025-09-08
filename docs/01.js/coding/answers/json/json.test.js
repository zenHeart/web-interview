import CustomJson from './json'

describe('JsonStringify', () => {
  function check (val) {
    expect(CustomJson.stringify(val)).toBe(JSON.stringify(val))
  }

  describe('CustomJson.stringify', () => {
    test('基本类型', () => {
      check(1)
      check('abc')
      check(null)
      check(true)
      check(false)
    })

    test('数组', () => {
      check([1, 2, 3])
      check(['a', 'b'])
      check([null, false])
      check([])
    })

    test('对象', () => {
      check({ a: 1, b: 2 })
      check({ x: [1, 2], y: { z: 3 } })
      check({})
    })

    test('嵌套结构', () => {
      check({ a: 1, b: [2, { c: 3 }] })
      check([{ a: 1 }, { b: 2 }])
    })
  })

  describe('CustomJson.parse', () => {
    function checkParse (str) {
      expect(CustomJson.parse(str)).toEqual(JSON.parse(str))
    }

    test('基本类型', () => {
      checkParse('1')
      checkParse('"abc"')
      checkParse('null')
      checkParse('true')
      checkParse('false')
    })

    test('数组', () => {
      checkParse('[1,2,3]')
      checkParse('["a","b"]')
      checkParse('[null,false]')
      checkParse('[]')
    })

    test('对象', () => {
      checkParse('{"a":1,"b":2}')
      checkParse('{"x":[1,2],"y":{"z":3}}')
      checkParse('{}')
    })

    test('嵌套结构', () => {
      checkParse('{"a":1,"b":[2,{"c":3}]}')
      checkParse('[{"a":1},{"b":2}]')
    })
  })
})
