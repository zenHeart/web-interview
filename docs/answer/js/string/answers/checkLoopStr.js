function checkLoopStr(str) {
	return str.split('').reverse().join('') === str;
}

console.log(checkLoopStr('level'));
console.log(checkLoopStr('g'));
console.log(checkLoopStr('ag'));