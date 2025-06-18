const chai = require('chai')
const get = require('lodash/get')

/**
 * get(object, path, [defaultValue])
 */
function customGet (object, path, defaultValue) {
  // 1. flat path
  const paths = path.split('.').reduce((res, currrentKey) => {
    if (currrentKey.includes('[')) {
      res.push(...currrentKey.replaceAll(']', '').split('['))
    } else {
      res.push(currrentKey)
    }
    return res
  }, []).filter(el => el !== '')

  // 2. loop get value
  let current = object
  let index = 0
  while (current != null && index < paths.length) {
    current = current?.[paths[index]]
    index++
  }

  // 3. return value
  return current || defaultValue
}

const TestData = {
  'undefined object': [undefined, 'a.b.c', undefined],
  'undefined use default': [{}, 'a.b.c', 'default'],
  empyt: [{}, 'a.b.c'],
  'empyt use default': [{}, 'a.b.c', 3],
  'obj key': [{ a: 1 }, 'a', 3],
  'obj array key': [{ a: [1, 2] }, 'a[0]', 3],
  'array key': [[{ a: 1 }], '[0]'],
  'nest array key': [[[{ a: 1 }]], '[0][0]'],
  'obj nest array key': [{ a: [[[], [1]], 2] }, 'a[0][0][1]'],
  'obj nest key': [{ a: { b: { c: [{ d: [12, { f: 1 }] }] } } }, 'a.b.c[0].d[2].f', 3],
  'obj undefined key': [{ a: 1 }, 'b.c[0]'],
  'obj undefined key use default': [{ a: 1 }, 'b.c[0]', 12]
}

describe('test lodash get', function () {
  for (const key in TestData) {
    const [object, path, defaultValue] = TestData[key]
    it(key, function () {
      chai.expect(customGet(object, path, defaultValue)).to.deep.equal(get(object, path, defaultValue))
    })
  }
})
