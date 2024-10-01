const { expect } = require('chai');
describe('原型链测试', function () {
  describe('构造函数测试', function () {
    it('当返回的为其他对象时,继承返回对象的原型链', function () {
      function Foo () {
        this.foo = 'foo';
      }
      function Bar () {
        return new Foo();
      }

      const bar = new Bar();
      expect(bar)
        .instanceOf(Foo)
        .deep.eq({
          foo: 'foo'
        });
    });
  });
});
