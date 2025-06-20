describe('JavaScript 类型', function () {
  describe('原始类型', function () {
    describe('Undefined (未定义)', function () {
      it('表示未初始化的变量，算术运算结果为 NaN', function () {
        let a
        expect(a).toBeUndefined()
        expect(undefined + 1).toBeNaN()
      })
    })

    describe('Null (空值)', function () {
      it('表示有意缺少对象值，算术运算中视为 0', function () {
        const n = null
        expect(n).toBeNull()
        expect(null + 1).toBe(1)
        expect(null * 0).toBe(0)
      })
    })

    describe('Boolean (布尔型)', function () {
      it('表示逻辑实体，值为 true 或 false，支持逻辑运算', function () {
        const t = true
        const f = false
        expect(t).toBe(true)
        expect(typeof f).toBe('boolean')
        expect(t && f).toBe(false)
        expect(t || f).toBe(true)
      })
    })

    describe('String (字符串)', function () {
      it('表示文本数据，不可变，支持连接和模板字面量', function () {
        const str = '你好'
        expect(str).toBe('你好')
        expect(typeof str).toBe('string')
        // 字符串是不可变的
        const newStr = str.toUpperCase()
        expect(newStr).toBe('你好'.toUpperCase()) // 假设环境支持中文大写或验证其行为
        expect(str).toBe('你好') // 原字符串不变
        expect(str + ' 世界').toBe('你好 世界')
        expect(`${str} 世界`).toBe('你好 世界')
      })
    })

    describe('Symbol (符号)', function () {
      it('是唯一且不可变的值，可用作对象属性的键', function () {
        const sym1 = Symbol('描述')
        const sym2 = Symbol('描述')
        expect(sym1).not.toBe(sym2)
        expect(typeof sym1).toBe('symbol')
        const id = Symbol('id')
        const obj = {
          [id]: 123
        }
        expect(obj[id]).toBe(123)
      })
    })

    describe('Number (数字)', function () {
      it('表示数值，包括整数和浮点数，以及 NaN 和 Infinity 等特殊值', function () {
        const intNum = 10
        const floatNum = 10.5
        expect(intNum).toBe(10)
        expect(typeof floatNum).toBe('number')
        expect(0 / 0).toBeNaN()
        expect(1 / 0).toBe(Infinity)
        // 浮点数精度问题 (IEEE 754)
        expect(0.1 + 0.2).not.toBe(0.3)
        expect(0.1 + 0.2).toBeCloseTo(0.3) // 比较浮点数时应使用 toBeCloseTo
      })
    })

    describe('BigInt (大整数)', function () {
      it('表示大于 2^53 - 1 的整数，不能与 Number 类型直接混合运算', function () {
        const bigNum = 9007199254740991n // n 后缀表示 BigInt
        expect(typeof bigNum).toBe('bigint')
        expect(bigNum + 1n).toBe(9007199254740992n)
        const num = 5
        // expect(() => bigNum + num).toThrow() // 这会抛出 TypeError
        expect(bigNum + BigInt(num)).toBe(9007199254740996n)
      })
    })
  })

  describe('引用类型 (对象)', function () {
    describe('Object (对象)', function () {
      it('是键值对的集合', function () {
        const obj = { name: '张三', age: 30 }
        expect(obj.name).toBe('张三')
        expect(typeof obj).toBe('object')
        const obj2 = new Object()
        obj2.prop = 'value'
        expect(obj2.prop).toBe('value')
      })
    })

    describe('Function (函数)', function () {
      it('是可调用的对象，可赋值给变量（一等公民）', function () {
        function greet (name) {
          return `你好, ${name}!`
        }
        expect(greet('世界')).toBe('你好, 世界!')
        expect(typeof greet).toBe('function')
        const add = function (a, b) { return a + b }
        expect(add(2, 3)).toBe(5)
      })
    })

    describe('Date (日期)', function () {
      it('表示特定的时间点', function () {
        const now = new Date()
        expect(now instanceof Date).toBe(true)
        expect(typeof now.getFullYear()).toBe('number')
      })
    })

    describe('Error (错误)', function () {
      it('表示发生的错误，可以被抛出和捕获', function () {
        const err = new Error('出错了')
        expect(err instanceof Error).toBe(true)
        expect(err.message).toBe('出错了')
        let caughtError
        try {
          throw new TypeError('类型无效')
        } catch (e) {
          caughtError = e
        }
        expect(caughtError instanceof TypeError).toBe(true)
        expect(caughtError.message).toBe('类型无效')
      })
    })

    describe('Set (集合)', function () {
      it('存储任何类型的唯一值', function () {
        const mySet = new Set()
        mySet.add(1)
        mySet.add(5)
        mySet.add(5) // 重复值，将被忽略
        mySet.add('一些文本')
        expect(mySet.has(1)).toBe(true)
        expect(mySet.size).toBe(3)
      })
    })

    describe('WeakSet (弱集合)', function () {
      it('存储对象的弱引用集合，且只能存储对象', function () {
        const ws = new WeakSet()
        const obj1 = { id: 1 }
        ws.add(obj1)
        expect(ws.has(obj1)).toBe(true)
        // 如果 obj1 被垃圾回收，ws.has(obj1) 会变为 false
        expect(() => ws.add(123)).toThrow() // 尝试添加非对象会抛出 TypeError
      })
    })

    describe('Map (映射)', function () {
      it('存储键值对，并记住键的原始插入顺序', function () {
        const myMap = new Map()
        const keyString = '一个字符串'
        const keyObj = {}
        myMap.set(keyString, "与 '一个字符串' 关联的值")
        myMap.set(keyObj, '与 keyObj 关联的值')
        expect(myMap.size).toBe(2)
        expect(myMap.get(keyString)).toBe("与 '一个字符串' 关联的值")
        expect(myMap.has(keyObj)).toBe(true)
      })
    })

    describe('WeakMap (弱映射)', function () {
      it('存储键值对，其中键是弱引用的对象，且键必须是对象', function () {
        const wm = new WeakMap()
        const key1 = {}
        wm.set(key1, '值1')
        expect(wm.has(key1)).toBe(true)
        expect(wm.get(key1)).toBe('值1')
        // 如果 key1 被垃圾回收，wm.has(key1) 会变为 false
        expect(() => wm.set('key', 'value')).toThrow() // 键不是对象会抛出 TypeError
      })
    })

    describe('Array (数组)', function () {
      it('是有序的值列表，支持多种操作方法', function () {
        const arr = [1, '二', { three: 3 }]
        expect(arr.length).toBe(3)
        expect(arr[0]).toBe(1)
        expect(Array.isArray(arr)).toBe(true)
        arr.push(4)
        expect(arr).toEqual([1, '二', { three: 3 }, 4])
        const mapped = arr.map(x => typeof x)
        expect(mapped).toEqual(['number', 'string', 'object', 'number'])
      })
    })

    describe('RegExp (正则表达式)', function () {
      it('用于使用模式匹配文本', function () {
        const regex1 = new RegExp('ab+c')
        const regex2 = /ab+c/
        const str = 'abbc'
        expect(regex1.test(str)).toBe(true)
        expect(regex2.test('ac')).toBe(false)
      })
    })

    describe('Proxy (代理)', function () {
      it('用于创建对象的代理，可以拦截并重新定义该对象的基本操作', function () {
        const target = {
          message1: '你好',
          message2: '大家'
        }
        const handler = {
          get: function (target, prop, receiver) {
            if (prop === 'message2') {
              return '世界'
            }
            return Reflect.get(...arguments)
          }
        }
        const proxy = new Proxy(target, handler)
        expect(proxy.message1).toBe('你好')
        expect(proxy.message2).toBe('世界')
      })
    })

    describe('Reflect (反射)', function () {
      it('是一个内置对象，提供拦截 JavaScript 操作的方法', function () {
        const obj = { x: 1, y: 2 }
        expect(Reflect.get(obj, 'x')).toBe(1)
        expect(Reflect.has(obj, 'y')).toBe(true)
        Reflect.set(obj, 'z', 3)
        expect(obj.z).toBe(3)
      })
    })
  })
})
