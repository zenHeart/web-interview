const {expect} = require('chai');

describe('IIFE',function() {
	it('函数表达式标识符可省略',function() {
		let a=function(){return 1};
		expect(a()).to.equal(2)
	})
})