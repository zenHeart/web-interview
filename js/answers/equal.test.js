const {expect} = require ('chai');

describe('测试 == ',function() {
    it('test number equal string',function() {
        expect(0=='0').to.true;
        expect(0==[]).to.true;
        expect('0'==[]).to.false;
    })

})