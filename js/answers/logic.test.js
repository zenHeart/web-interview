describe.skip('测试逻辑运算符优先级',function() {
    it('test || 优先级大于三目运算符',function() {
        //注意 || 运算符优先级大于三目运算符
        expect(1||0?true:false).toEqual(true);
    })
})