require('./custom-call-bind-apply'); // 引入测试用例

const { expect, should, assert } = require('chai');

describe('测试自定义 call apply bind 方法', function () {
  describe('customCall', function () {
    it('this 传入对象', function () {
      const obj = {
        foo: 'foo',
        getFoo () {
          return this.foo;
        }
      };
      const obj1 = {
        foo: 'foo1'
      };

      expect(obj.getFoo.call(obj1)).to.eq('foo1');
      expect(obj.getFoo.customCall(obj1)).to.eq('foo1');
    });

    it('this 传入对象,并传入参数', function () {
      const obj = {
        foo: 'foo',
        concatFoo (str) {
          return this.foo + str;
        }
      };
      const obj1 = {
        foo: 'foo1'
      };

      expect(obj.concatFoo.call(obj1, 'bar')).to.eq('foo1bar');
      expect(obj.concatFoo.customCall(obj1, 'bar')).to.eq('foo1bar');
    });

    it('this 为 null,undefined', function () {
      function fun () {
        return this === global;
      }

      expect(fun.customCall(null)).to.true;
      expect(fun.customCall(undefined)).to.true;
      // eslint-disable-next-line
      expect(fun.call(null)).to.true;
      // eslint-disable-next-line
      expect(fun.call(undefined)).to.true;
    });
    // TODO: 完善 call 使用如下测试用例通过
    it.skip('this 传入字符串', function () {
      function fun () {
        return this instanceof String;
      }

      expect(fun.customCall('')).to.true;
      expect(fun.call('')).to.true;
    });
    it.skip('this 传入 bool', function () {
      function fun () {
        return this instanceof Boolean;
      }

      expect(fun.customCall(false)).to.true;
      expect(fun.call(false)).to.true;
    });
    it.skip('this 传入数值', function () {
      function fun () {
        return this instanceof Number;
      }

      expect(fun.customCall(1)).to.true;
      expect(fun.call(1)).to.true;
    });
  });

  describe('customApply', function () {
    it('this 传入对象', function () {
      const obj = {
        foo: 'foo',
        getFoo () {
          return this.foo;
        }
      };
      const obj1 = {
        foo: 'foo1'
      };

      expect(obj.getFoo.apply(obj1)).to.eq('foo1');
      expect(obj.getFoo.customApply(obj1)).to.eq('foo1');
    });

    it('this 传入对象,并传入参数', function () {
      const obj = {
        foo: 'foo',
        concatFoo (str) {
          return this.foo + str;
        }
      };
      const obj1 = {
        foo: 'foo1'
      };

      expect(obj.concatFoo.apply(obj1, ['bar'])).to.eq('foo1bar');
      expect(obj.concatFoo.customApply(obj1, ['bar'])).to.eq('foo1bar');
    });

    it('this 为 null,undefined', function () {
      function fun () {
        return this === global;
      }

      expect(fun.customApply(null)).to.true;
      expect(fun.customApply(undefined)).to.true;
      expect(fun.apply(null)).to.true;
      expect(fun.apply(undefined)).to.true;
    });

    it('传入参数非对象需抛出类型错误', function () {
      function fun () {
        return this === global;
      }

      expect(() => fun.customApply(null, 1)).to.throw(TypeError);
      expect(() => fun.customApply(null, '')).to.throw(TypeError);
      expect(() => fun.apply(null, 1)).to.throw(TypeError);
      expect(() => fun.apply(null, '')).to.throw(TypeError);
    });
    // TODO: 补充实现基础类型作为 this 值传入时, 在 apply 函数中的实现
  });

  describe('customBind', function () {
    it('this 传入对象', function () {
      const obj = {
        foo: 'foo',
        getFoo () {
          return this.foo;
        }
      };
      const obj1 = {
        foo: 'foo1'
      };

      expect(obj.getFoo.apply(obj1)).to.eq('foo1');
      expect(obj.getFoo.customApply(obj1)).to.eq('foo1');
    });

    it('this 传入对象,并传入参数', function () {
      const obj = {
        foo: 'foo',
        concatFoo (str) {
          return this.foo + str;
        }
      };
      const obj1 = {
        foo: 'foo1'
      };

      expect(obj.concatFoo.apply(obj1, ['bar'])).to.eq('foo1bar');
      expect(obj.concatFoo.customApply(obj1, ['bar'])).to.eq('foo1bar');
    });

    it('this 为 null,undefined', function () {
      function fun () {
        return this === global;
      }

      expect(fun.customApply(null)).to.true;
      expect(fun.customApply(undefined)).to.true;
      expect(fun.apply(null)).to.true;
      expect(fun.apply(undefined)).to.true;
    });

    it('传入参数非对象需抛出类型错误', function () {
      function fun () {
        return this === global;
      }

      expect(() => fun.customApply(null, 1)).to.throw(TypeError);
      expect(() => fun.customApply(null, '')).to.throw(TypeError);
      expect(() => fun.apply(null, 1)).to.throw(TypeError);
      expect(() => fun.apply(null, '')).to.throw(TypeError);
    });
    // TODO: 补充实现基础类型作为 this 值传入时, 在 apply 函数中的实现
  });
});
