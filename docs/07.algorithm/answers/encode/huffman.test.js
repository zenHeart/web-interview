const { HuffmanCoder } = require('./huffman.js');

const coder = new HuffmanCoder();

console.log('=== 霍夫曼编码测试 ===');

// 测试基本编码解码
const testText = 'this is an example for huffman encoding';
console.log(`原文: "${testText}"`);

const { encoded, tree, codes } = coder.encode(testText);

console.log('\n=== 编码表 ===');
const sortedCodes = Array.from(codes.entries()).sort((a, b) => a[1].length - b[1].length);
sortedCodes.forEach(([char, code]) => {
  const displayChar = char === ' ' ? '[空格]' : char;
  console.log(`${displayChar}: ${code}`);
});

console.log(`\n编码结果: ${encoded}`);

const decoded = coder.decode(encoded, tree);
console.log(`解码结果: "${decoded}"`);
console.log(`解码正确: ${testText === decoded ? '✓' : '✗'}`);

// 计算压缩效果
const info = coder.getCompressionInfo(testText, encoded);
console.log('\n=== 压缩效果 ===');
console.log(`原始大小: ${info.originalSize} bits`);
console.log(`压缩后大小: ${info.compressedSize} bits`);
console.log(`压缩比: ${info.compressionRatio}%`);

// 测试其他文本
console.log('\n=== 其他测试案例 ===');

const testCases = [
  'aaaaaa',
  'abcdef',
  'aaabbc',
  'hello world',
  'a'
];

testCases.forEach(text => {
  console.log(`\n测试文本: "${text}"`);
  const result = coder.encode(text);
  const decodedText = coder.decode(result.encoded, result.tree);
  const compressionInfo = coder.getCompressionInfo(text, result.encoded);
  
  console.log(`编码: ${result.encoded}`);
  console.log(`解码正确: ${text === decodedText ? '✓' : '✗'}`);
  console.log(`压缩比: ${compressionInfo.compressionRatio}%`);
});

// 边界情况测试
console.log('\n=== 边界情况测试 ===');
const emptyResult = coder.encode('');
console.log('空字符串编码:', emptyResult.encoded);
console.log('空字符串解码:', coder.decode(emptyResult.encoded, emptyResult.tree));
