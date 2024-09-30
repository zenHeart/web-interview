const { expect } = require('chai');
describe('== 和 ===', function() {
    describe('==', function() {
        it('相同类型规则同 ===', function() {
            // 相同类型采用 ===,此处对象非相同引用返回 false
            expect({ a: 1 } == { a: 1 }).to.false;
        });
        it('基础类型比较则转换为数值比较', function() {
            // 字符串为 16 进制 的 15 所以结果相同
            expect(15 == '0xf').to.true;
            // 注意 NaN 和任何元素比较君返回 false 这是数值比较的特定
            expect(NaN == '0xf' / 0).to.false;
            expect(Infinity == '0xf' / 0).to.true;
            // 注意此处 NaN 为 数值,false 转换为 0 后 NaN !== 0 返回 false
            expect(NaN == false).to.false;

            expect(false == 0).to.true;
            expect(true == 1).to.true;
            expect(true == '1').to.true;
        });

        describe('对象和基础类型比较', function() {
            it('先采用 valueOf 比较值', function() {
                let foo = [1, 2];
                foo.valueOf = () => foo.reduce((sum, ele) => (sum += ele), '');
                expect(12 == foo).to.true;
            });
            it('valueOf 无效退化到 toString', function() {
                let foo = [1, 2];
                foo.toString = () => 1;
                expect(1 == foo).to.true;
            });
        });
    });
    describe('===', function() {
        it('数值的比较', function() {
            expect(NaN === NaN).to.false;
            expect(Infinity === Infinity).to.true;
            expect(Infinity === 1 / 0).to.true;
            expect(-Infinity === -1 / 0).to.true;
        });
    });
});
