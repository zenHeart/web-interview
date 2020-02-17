/**
 * 验证变量提升的性质
 */
const { expect } = require('chai');

describe.skip('验证变量提升机制', function() {
    it('var 变量申明会被提升并且值为 undefined', function() {
        expect(a).to.undefined;
        var a = 1;
        expect(a).to.equal(1);
    });
    it('赋值语句不会出现变量提升', function() {
        let getA = () => a;
        expect(getA).throw(/a is not defined/);
        a = 1;
        expect(a).to.equal(1);
        // 此语句取消全局变量中的 a
        delete a;
    });
    it('函数会出现变量提升', function() {
        expect(foo()).to.equal(1);
        function foo() {
            return 1;
        }
    });
    it('函数会在变量申明之前提升', function() {
        expect(foo()).to.equal(1);
        var foo = 2;
        function foo() {
            return 1;
        }
    });
    it('同名函数提升会按照词法顺序出现覆盖', function() {
        expect(foo()).to.equal(2);
        var foo = 3;
        expect(foo).to.equal(3);
        function foo() {
            return 1;
        }
        function foo() {
            return 12;
        }
    });
});
