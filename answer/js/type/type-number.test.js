const {expect} = require ('chai');

describe("Number",function() {
	it('0.1 + 0.2 != 0.3',function() {
		// TODO: 需理解 IEEE 754 产生此现象原因
		expect(0.1+0.2).not.equal(0.3)
	})

	it('.2 -.1 !== .3 - .2',function() {
		expect(.2 - .1).not.equal(.3 - .2)
	})
});