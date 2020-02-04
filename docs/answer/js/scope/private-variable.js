// 1. 利用闭包创建私有变量
function Person(name) {
	let age =undefined;
	this.name = name
	this.setAge = function(num) {
		age = num
	}
	this.getAge = function() {
		console.log('---',age);
		return age;
	}
}
let tom = new Person('tom')
tom.setAge(20);
console.log(tom.getAge());

