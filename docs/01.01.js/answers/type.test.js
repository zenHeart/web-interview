const { expect } = require('chai')

describe('type', function () {
  describe('test typeof', function () {
    const testData = [
      {
        input: 1,
        expect: 'number'
      },
      {
        input: NaN,
        expect: 'number'
      },
      {
        input: 1e1,
        expect: 'number'
      }, {
        input: true,
        expect: 'boolean'
      }, {
        input: 'a',
        expect: 'string'
      }, {
        input: null,
        expect: 'object'
      }, {
        input: undefined,
        expect: 'undefined'
      }, {
        input: Symbol(1),
        expect: 'symbol'
      }, {
        input: [1, 2, 3],
        expect: 'object'
      }, {
        input: {},
        expect: 'object'
      }, {
        input: () => {},
        expect: 'function'
      }
    ]

    it('test check type function', function () {
      testData.forEach((ele) => {
        expect(typeof ele.input).to.equal(ele.expect)
      })
    })
  })

  describe('显示类型转换', function () {
    describe('转成整形', function () {
      it('parseInt', function () {
        const testData = [
          {
            input: ['10'],
            expect: 10 // 传入一个字符串默认转换为 10 进制 10
          },
          {
            input: ['0x10'],
            expect: 16 // 0x 开头将 16 进制变为 10 进制,类似 c 语言
          },
          {
            input: ['010'],
            expect: 10 // 0 开头仍为 10 进制,注意此处,并未显示 8 进制,取决于环境!!!
          },
          {
            input: ['1212a'],
            expect: 1212 // 开头为合法数字,取出对应整数位
          },
          {
            input: ['0x11g'],
            expect: 17 // 开头为合法数字,取出对应整数位,结合进制规则换算为 16
          },
          {
            input: ['a1'],
            expect: NaN // 开头非数字字符,返回 NaN
          },
          {
            input: ['1', 0],
            expect: 1 // 传入的第二项为空默认为 10 进制,包括 null,false,undefined 等
          },
          {
            input: ['1', 1],
            expect: NaN // 传入参数若不在 2-36 之间且非空则返回 NaN
          },
          {
            input: ['11', 4],
            expect: 5 // 在 2-36 之间按照对应进制计算后返回整数
          },
          {
            input: [1.1e23],
            expect: 1 // 传入非字符串,采用科学计数法表示时,返回无法预料,猜测是第一位非零整数
          },
          {
            input: [0.42e-23],
            expect: 4 // 同上
          }
        ]

        testData.forEach(ele => {
          if (isNaN(ele.expect)) {
            // eslint-disable-next-line
           expect(isNaN(parseInt.apply(this, ele.input))).to.true
          } else {
            expect(parseInt.apply(this, ele.input)).to.equal(ele.expect)
          }
        })
      })
    })

    describe('构造函数', function () {
      it('Object', function () {
        expect(Object(3)).instanceOf(Number)
      })
    })

    describe('对象装换为原始值', function () {
      /**
      * 详见 emacscript 规则
      *  */

      it('object to string', function () {
        const obj = {
          toString: () => ({}),
          valueOf: () => 'obj'
        }
        expect(obj + '').to.equal('obj')
      })

      it('object to number', function () {
        /**
        * 和字符串转换相反
        * 先调用 valueOf 若返回非原始值,调用 toString
        *  */

        const obj = {
          valueOf: () => ({}),
          toString: () => 1
        }
        expect(obj * 1).to.equal(1)
      })
    })

    describe('隐式类型转换', function () {
      describe('对象隐式类型转换', function () {
        const obj = {
          valueOf () {
            return { a: 1 }
          },
          toString () {
            return 'string-obj'
          }
        }

        it('隐式转换规则', function () {
          expect(obj + '').to.eq('string-obj')
        })
      })
    })
  })

  describe('undefined null', function () {
    describe('undefined', function () {
      it('undefined 运算转变为 NaN', function () {
        // eslint-disable-next-line
         expect(undefined + 1).to.NaN
        // eslint-disable-next-line
         expect(undefined + 1).to.NaN
        // eslint-disable-next-line
         expect(undefined - 1).to.NaN
        // eslint-disable-next-line
         expect(undefined / 1).to.NaN
      })
    })

    describe('null', function () {
      it('null 运算转变为 0', function () {
        expect(null + 1).to.eq(1)
        expect(null * 1).to.eq(0)
        expect(null - 1).to.eq(-1)
        expect(null / 1).to.eq(0)
      })
    })
  })

  describe('String', function () {
    it('字符串只读特性', function () {
      const str = 'hello'

      str[0] = 'H'

      expect(str).equal('hello')
    })

    it('原始封装类型', function () {
      const str = 'hello'

      // 注意 str.toUpperCase 的操作 类似 new String(str).toUpperCase 的操作
      expect(str.toUpperCase()).equal('HELLO')
    })
  })

  describe('Number', function () {
    it('0.1 + 0.2 != 0.3', function () {
      // TODO: 需理解 IEEE 754 产生此现象原因
      expect(0.1 + 0.2).not.equal(0.3)
    })

    it('.2 -.1 !== .3 - .2', function () {
      expect(0.2 - 0.1).not.equal(0.3 - 0.2)
    })
  })
})
