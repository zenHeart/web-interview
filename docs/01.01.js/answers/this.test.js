/* eslint-disable no-eval */
/* eslint-disable strict */
// 该示例说明 this 的值取决于执行环境而非申明环境。
const { expect } = require('chai')

describe('this 绑定', function () {
  describe('默认绑定', function () {
    const say = function () {
      return this
    }

    it('普通函数调用,返回全局对象', function () {
      expect(say()).to.equal(global)
    })

    it('严格模式为 undefined', function () {
      'use strict'
      const say1 = function () {
        return this
      }
      // eslint-disable-next-line
      expect(say1()).to.undefined
      // 在严格模式下声明的函数默认绑定才为 undefined
      // 严格模式之前申明的函数 this 任为全局对象
      expect(say()).to.equal(global)
    })
  })

  describe('隐式绑定', function () {
    const obj = {
      say: function () {
        return this
      }
    }

    it('对象调用 this 等于对象值', function () {
      expect(obj.say()).to.equal(obj)
    })

    it('逗号表达式将 this 切换为默认调用', function () {
      expect((1, obj.say)()).to.equal(global)
    })

    it('赋值表达式将 this 切换为默认调用', function () {
      const say = obj.say
      expect(say()).to.equal(global)
    })
  })

  describe('显示绑定', function () {
    const obj = {
      say: function () {
        return this
      }
    }

    it('call 修改 this', function () {
      const obj1 = {}
      expect(obj.say.call(obj1)).to.equal(obj1)
    })

    it('apply 修改 this', function () {
      const obj1 = {}
      expect(obj.say.apply(obj1)).to.equal(obj1)
    })

    it('bind 修改 this', function () {
      const obj1 = {}
      const bindSay = obj.say.bind(obj1)
      expect(bindSay()).to.equal(obj1)
    })

    it('显示绑定赋值为 null,undefined 时指向全局对象', function () {
      expect(obj.say.apply(null)).to.equal(global)
      expect(obj.say.apply(undefined)).to.equal(global)
    })

    it('显示绑定赋值原始值时,this 指向原始封装对象', function () {
      expect(obj.say.apply(1)).to.instanceOf(Number)
      expect(obj.say.apply('1')).to.instanceOf(String)
      expect(obj.say.apply(true)).to.instanceOf(Boolean)
      expect(obj.say.apply(Symbol('1'))).to.be.an('Symbol')
    })
  })

  describe('new 绑定', function () {
    function Person (name) {
      this.name = name
      return this
    }

    it('默认 new 构造绑定', function () {
      const tom = new Person('tom')
      const jack = new Person('jack')

      expect(tom).deep.equal({
        name: 'tom'
      })
      expect(jack).deep.equal({
        name: 'jack'
      })
    })
  })

  describe('eval 绑定', function () {
    // 实际上可以等效将 eval 的代码放入当前执行环境则即可知道实际运行结果
    it('eval 采用外层执行环境的 this', function () {
      const obj = {
        say () {
          return eval('this')
        },
        say1 () {
          return (function () {
            return this
          })()
        }
      }
      const res = eval('this')
      const res1 = eval('(function a(){return this})()')

      expect(obj.say()).to.equal(obj)
      // 当函数为赋值调用时退化为默认规则
      expect((1, obj.say)()).to.equal(global)
      // 注意采用函数则退化为默认规则
      expect(obj.say1()).to.equal(global)
      // 由于 eval 在外部定义使用当前执行环境 this
      expect(res).to.equal(this)
      // eval为普通函数调用采用全局 this
      expect(res1).to.equal(global)
    })
  })

  describe('箭头函数', function () {
    let obj

    beforeEach(function () {
      obj = {
        say: function () {
          return (() => this)()
        },
        say1: function () {
          return (function () {
            return this
          })()
        },
        say2: function (callback) {
          return callback()
        }
      }
    })

    it('this 的值由申明时外层执行环境决定', function () {
      expect(obj.say()).to.equal(obj)
      // 说明非箭头函数采用默认绑定规则
      expect(obj.say1()).to.equal(global)
    })

    it('外层执行环境的调用方式会更改箭头函数 this 的值', function () {
      expect((1, obj.say)()).to.equal(global)
    })

    it('显示绑定会更改箭头函数 this 的值', function () {
      const obj1 = {}
      expect(obj.say.call(obj1)).to.equal(obj1)
    })

    it('new 会修改 this 的值', function () {
      // eslint-disable-next-line new-cap
      expect(new obj.say()).to.deep.equal({})
    })

    it('箭头函数 this 的默认绑定值取决于申明环境而非运行环境', function () {
      const cb1 = () => {
        return this
      }
      const cb2 = function () {
        return (() => this)()
      }
      // cb1 绑定当前运行环境的 this 的值
      expect(obj.say2(cb1)).to.equal(this)
      // cb2 中的箭头函数绑定当前运行时环境的 this,而根据默认绑定规则,此时 this 指向 global
      expect(obj.say2(cb2)).to.equal(global)
      // 匿名箭头函数等同于在当前执行环境申明变量所以 this 等于当前执行环境
      expect(obj.say2(() => this)).to.equal(this)
    })

    it('箭头函数在回调模式中 this 的值', function () {
      const func = function (cb) {
        return cb()
      }
      const say = () => this
      expect(func(say)).to.equal(this)
    })
  })

  describe('绑定优先级', function () {
    it('new 优先级高于显示绑定', function () {
      function Person (name) {
        this.name = name
        return this
      }
      const obj = { a: 1 }
      const Person1 = Person.bind(obj)
      const tom = new Person1('tom')

      expect(tom).to.deep.equal({ name: 'tom' })
      expect(Person1('tom')).to.deep.equal({ name: 'tom', ...obj })
    })
  })
})
