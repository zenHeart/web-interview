
const { expect } = require('chai')

describe('array-method', function () {
  describe('构造器初始化', function () {
    it('Array(el1,el2,..) 初始化', function () {
      // eslint-disable-next-line
      expect(Array(1, 2, 3)).to.deep.equal([1, 2, 3])
    })

    it('Array(el1,el2,..) 最长支持 2^32 -1 ,超过会报错', function () {
      // eslint-disable-next-line
      // 超过 > 2^32 -1 会报错
      expect(() => Array(Math.pow(2, 32))).to.throw('Invalid array length')
      // 负数会报错
      expect(() => Array(-1)).to.throw('Invalid array length')
      // 浮点数会报错
      expect(() => Array(1.3)).to.throw('Invalid array length')
    })
  })

  describe('静态方法', function () {
    it('from', function () {
      // eslint-disable-next-line
     expect(Array(1, 2, 3)).to.deep.equal([1, 2, 3])
    })

    it('fill', function () {
      // eslint-disable-next-line
     // 超过 > 2^32 -1 会报错
      expect(() => Array(Math.pow(2, 32))).to.throw('Invalid array length')
      // 负数会报错
      expect(() => Array(-1)).to.throw('Invalid array length')
      // 浮点数会报错
      expect(() => Array(1.3)).to.throw('Invalid array length')
    })

    // 判断是否为数组
    it('isArray', function () {
      // eslint-disable-next-line
         expect(Array.isArray([1, 2, 3])).to.true
    })

    // 不常用
    it('of', function () {
      // eslint-disable-next-line
         expect(Array.of(1, 2, 3)).to.deep.equal([1, 2, 3])
    })

    it('fromAsync', function () {
      // eslint-disable-next-line
         expect(Array.of(1, 2, 3)).to.deep.equal([1, 2, 3])
    })
  })

  describe('原型方法', function () {
    it('push', function () {})

    it('unshift', function () {})

    it('pop', function () {})

    it('shift', function () {})

    it('splice', function () {})

    it('forEach', function () {})

    it('map', function () {})

    it('reduce', function () {})

    it('find', function () {})

    it('filter', function () {})

    it('includes', function () {})

    it('flat', function () {})
  })
})
