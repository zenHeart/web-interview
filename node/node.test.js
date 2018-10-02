describe("node 测试",function() {
    describe("基础测试",function() {
        it("let var 区别",function () {
            //变量提升,let 无变量提升
            expect(() =>la).toThrowError(/la.*not defined/);
            expect(va).toBeUndefined();
            let la = 1;
            var va = 1;
        })
    });
});