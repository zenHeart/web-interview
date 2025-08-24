const { 
  addStrings, 
  multiplyStrings, 
  subtractStrings, 
  compareStrings,
  divideStrings 
} = require('./bigNumber.js');

console.log('=== 大数字符串运算测试 ===');

// 测试加法
console.log('\n--- 大数加法测试 ---');
const addTests = [
  ['123', '456'],
  ['999', '1'],
  ['123456789', '987654321'],
  ['0', '123'],
  ['999999999999999999', '1']
];

addTests.forEach(([a, b]) => {
  const result = addStrings(a, b);
  console.log(`${a} + ${b} = ${result}`);
});

// 测试乘法
console.log('\n--- 大数乘法测试 ---');
const multiplyTests = [
  ['123', '456'],
  ['999', '999'],
  ['123', '0'],
  ['1', '123456789'],
  ['12', '34']
];

multiplyTests.forEach(([a, b]) => {
  const result = multiplyStrings(a, b);
  console.log(`${a} × ${b} = ${result}`);
});

// 测试减法
console.log('\n--- 大数减法测试 ---');
const subtractTests = [
  ['456', '123'],
  ['1000', '1'],
  ['123456789', '123456788'],
  ['100', '99'],
  ['1000000000000000000', '999999999999999999']
];

subtractTests.forEach(([a, b]) => {
  try {
    const result = subtractStrings(a, b);
    console.log(`${a} - ${b} = ${result}`);
  } catch (error) {
    console.log(`${a} - ${b} = Error: ${error.message}`);
  }
});

// 测试比较
console.log('\n--- 大数比较测试 ---');
const compareTests = [
  ['123', '456'],
  ['999', '999'],
  ['1000', '999'],
  ['123456789', '123456788']
];

compareTests.forEach(([a, b]) => {
  const result = compareStrings(a, b);
  const symbol = result > 0 ? '>' : result < 0 ? '<' : '=';
  console.log(`${a} ${symbol} ${b}`);
});

// 测试除法
console.log('\n--- 大数除法测试 ---');
const divideTests = [
  ['456', '123'],
  ['1000', '10'],
  ['123456789', '123'],
  ['100', '3'],
  ['50', '100']
];

divideTests.forEach(([a, b]) => {
  try {
    const { quotient, remainder } = divideStrings(a, b);
    console.log(`${a} ÷ ${b} = ${quotient} ... ${remainder}`);
  } catch (error) {
    console.log(`${a} ÷ ${b} = Error: ${error.message}`);
  }
});

// 综合测试：验证四则运算关系
console.log('\n--- 综合验证测试 ---');
const a = '123456789';
const b = '987654321';

console.log(`验证: (${a} + ${b}) - ${b} = ${a}`);
const sum = addStrings(a, b);
const diff = subtractStrings(sum, b);
console.log(`结果: ${diff === a ? '✓' : '✗'} (${diff})`);

console.log(`验证: (${a} × ${b}) ÷ ${b} = ${a}`);
const product = multiplyStrings(a, b);
const { quotient } = divideStrings(product, b);
console.log(`结果: ${quotient === a ? '✓' : '✗'} (${quotient})`);
