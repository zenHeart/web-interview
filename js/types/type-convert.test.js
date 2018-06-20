describe("转成整形",function() {
    it("parseInt",function() {
        let testData = [
            {
                input:["10"],
                expect:10 //传入一个字符串默认转换为 10 进制 10
            },
            {
                input:["0x10"],
                expect:16 //0x 开头将 16 进制变为 10 进制,类似 c 语言
            },
            {
                input:["010"],
                expect:10 //0 开头仍为 10 进制,注意此处,并未显示 8 进制,取决于环境!!!
            },
            {
                input:["1212a"],
                expect:1212 //开头为合法数字,取出对应整数位
            },
            {
                input:["0x11g"],
                expect:17 //开头为合法数字,取出对应整数位,结合进制规则换算为 16
            },
            {
                input:["a1"],
                expect:NaN //开头非数字字符,返回 NaN
            },
            {
                input:["1",0],
                expect:1  //传入的第二项为空默认为 10 进制,包括 null,false,undefined 等
            },
            {
                input:["1",1],
                expect:NaN  //传入参数若不在 2-36 之间且非空则返回 NaN
            },
            {
                input:["11",4],
                expect:5  //在 2-36 之间按照对应进制计算后返回整数
            },
            {
                input:[1.1e23],
                expect:1  //传入非字符串,采用科学计数法表示时,返回无法预料,猜测是第一位非零整数
            },
            {
                input:[0.42e-23],
                expect:4  //同上
            },
        ]

        testData.forEach((ele) => {
            if(isNaN(ele.expect)) {
                expect(isNaN(parseInt.apply(this,ele.input))).toBe(true);
            } else {
                expect(parseInt.apply(this,ele.input)).toBe(ele.expect)
            }
        })
    });
});