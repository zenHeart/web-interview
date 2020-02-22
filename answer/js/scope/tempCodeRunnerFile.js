// 1. 利用闭包创建私有变量
function Person(name) {
	let age = 0;
	this.name = name
	this.setAge = function(age) {
		age = age
	}
	this.getAge = function() {
		return age;
	}
}
let tom = new Person('tom')
tom.setAge(10);
tom.getAge();