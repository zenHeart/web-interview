const {expect} = require('chai');

describe('IIFE',function() {
	it('函数表达式标识符可省略',function() {
		let a=function(){return 1};
	})
	it('函数表达式没有提升',function() {
		try{b}catch(e){
			expect(e).to.match(/b is not defined/)
		}
		var a= function b(){return 1};
	})
	it('函数表达式标识符作用域为函数中',function() {
		let a = function b() {
			return b;
		}
		let getB=() => b;
		expect(getB).to.throw(/b is not defined/);
		expect(a()).to.instanceOf(Function);
	})
	it('具名函数表达式的名称为函数名',function() {
		let a = function b() {
			return b;
		}
		expect(a.name).to.equal('b')
	})
	it('匿名函数表达式的名称继承变量名',function() {
		let a = function () {
			return b;
		}
		expect(a.name).to.equal('a')
	})
})