const { expect } = require('chai');

describe('IIFE', function () {
  it('函数表达式标识符可省略', function () {
    const a = function () { return 1; };
  });

  it('函数表达式没有提升', function () {
    // eslint-disable-next-line
    try { b; } catch (e) {
      expect(e).to.match(/b is not defined/);
    }
    const a = function b () { return 1; };
  });

  it('函数表达式标识符作用域为函数中', function () {
    const a = function b () {
      return b;
    };
    // eslint-disable-next-line
    const getB = () => b;
    expect(getB).to.throw(/b is not defined/);
    expect(a()).to.instanceOf(Function);
  });

  it('具名函数表达式的名称为函数名', function () {
    const a = function b () {
      return b;
    };
    expect(a.name).to.equal('b');
  });

  it('匿名函数表达式的名称继承变量名', function () {
    const a = function () {
      // eslint-disable-next-line
      return b;
    };
    expect(a.name).to.equal('a');
  });
});
