const {splitJson} = require('./splitJson');

describe("分割 JSON 测试",function() {
    it("splitJson",function() {
        let testData = [
            {
                input:JSON.stringify({
                    a:1
                })+JSON.stringify({b:1}),
                expect:JSON.stringify({a:1})
            }

        ]

        testData.forEach((ele) => {
            expect(splitJson(ele.input)).toBe(ele.expect);
        })
    });
});