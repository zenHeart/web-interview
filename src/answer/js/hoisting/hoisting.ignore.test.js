/**
 * 验证变量提升的性质
 */
const { expect } = require('chai');

describe('验证变量提升机制', function() {
    it('var 变量申明会被提升并且值为 undefined', function() {
        expect(a).to.undefined;
        var a = 1;
        expect(a).to.equal(1);
    });
    /* eslint-enable */
    it('函数会出现变量提升', function() {
        expect(foo()).to.equal(1);
        function foo() {
            return 1;
        }
    });
    it('变量申明在函数提升之前', function() {
        expect(foo()).to.eq(1);
        var foo = 2;
        function foo() {
            return 1;
        }
    });
    it('同名函数提升会按照申明顺序出现覆盖', function() {
        expect(foo()).to.equal(12);
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
