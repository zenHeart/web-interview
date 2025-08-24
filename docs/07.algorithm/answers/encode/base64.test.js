const { base64 } = require('./base64.js');

console.log('=== Base64编码测试 ===');

// 测试基本编码解码
const testCases = [
  'Hello World',
  'Base64编码测试',
  'A',
  'AB',
  'ABC',
  'ABCD',
  '',
  '中文测试'
];

testCases.forEach(text => {
  console.log(`\n原文: "${text}"`);
  const encoded = base64.encode(text);
  console.log(`编码: ${encoded}`);
  const decoded = base64.decode(encoded);
  console.log(`解码: "${decoded}"`);
  console.log(`匹配: ${text === decoded ? '✓' : '✗'}`);
});

// 测试与浏览器内置Base64的兼容性
console.log('\n=== 与浏览器Base64兼容性测试 ===');
const browserTests = [
  'Hello',
  'Hello!',
  'Hello World',
  'Base64'
];

browserTests.forEach(text => {
  const myEncoded = base64.encode(text);
  const browserEncoded = Buffer.from(text, 'utf8').toString('base64');
  console.log(`文本: "${text}"`);
  console.log(`我的编码: ${myEncoded}`);
  console.log(`Node.js编码: ${browserEncoded}`);
  console.log(`匹配: ${myEncoded === browserEncoded ? '✓' : '✗'}`);
  console.log('---');
});

// 测试二进制数据编码
console.log('\n=== 二进制数据编码测试 ===');
const binaryData = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
const binaryEncoded = base64.encodeBytes(binaryData);
console.log('二进制数据:', Array.from(binaryData));
console.log('编码结果:', binaryEncoded);
console.log('解码验证:', base64.decode(binaryEncoded));
