/**
 * @param {Function} cb 传入处理函数
 * 返回处理函数的结果组成的数组
 */

Array.prototype.selfMap = function selfMap(cb) {
	let result = [];

	for(let i =0;i<this.length;i++) {
		result.push(cb(this[i],i,this));
	}
	return result;
};
console.log([1,2,3].selfMap(ele => ele*ele))

