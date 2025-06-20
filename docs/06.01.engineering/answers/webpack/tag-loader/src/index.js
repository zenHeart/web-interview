// 测试不同的 console 方法
console.log('这是一条普通日志');
console.info('这是一条信息日志');
console.warn('这是一条警告日志');
console.error('这是一条错误日志');
console.debug('这是一条调试日志');

// 测试带多个参数的情况
console.log('用户信息:', { name: '张三', age: 25 });

// 测试带模板字符串的情况
const name = '李四';
console.log(`欢迎 ${name} 访问我们的网站`);

// 测试在函数中的日志
function example() {
  console.log('这是来自 example 函数的日志');
  console.warn('这是来自 example 函数的警告');
}

example();
