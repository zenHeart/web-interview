// TypeScript基础类型示例 - Node.js环境展示

// 1. 原始类型展示
const demoBasicTypes = () => {
  console.log('=== 原始类型示例 ===');
  
  const userName = "TypeScript";
  const version = 4.5;
  const isStrict = true;
  const userId = Symbol("userId");
  const bigNumber = 123n;
  
  console.log('userName:', userName, typeof userName);
  console.log('version:', version, typeof version);
  console.log('isStrict:', isStrict, typeof isStrict);
  console.log('userId:', userId, typeof userId);
  console.log('bigNumber:', bigNumber, typeof bigNumber);
};

// 2. 特殊类型演示
const demoSpecialTypes = () => {
  console.log('\n=== 特殊类型示例 ===');
  
  // any类型 - 可以是任何值
  let anything = "can be anything";
  console.log('anything (string):', anything);
  anything = 42;
  console.log('anything (number):', anything);
  anything = true;
  console.log('anything (boolean):', anything);
  
  // unknown类型 - 类型安全的any
  let uncertain = "type-safe any";
  console.log('uncertain:', uncertain);
  
  // 类型检查示例
  if (typeof uncertain === 'string') {
    console.log('uncertain length:', uncertain.length);
  }
};

// 3. null和undefined演示
const demoNullish = () => {
  console.log('\n=== null和undefined示例 ===');
  
  let empty = null;
  let notSet = undefined;
  
  console.log('empty:', empty, typeof empty);
  console.log('notSet:', notSet, typeof notSet);
  console.log('empty == notSet:', empty == notSet);
  console.log('empty === notSet:', empty === notSet);
};

// 4. 类型检查函数
const processValue = (value) => {
  console.log('\n=== 类型检查示例 ===');
  console.log('Processing value:', value);
  
  if (typeof value === 'string') {
    const result = value.toUpperCase();
    console.log('String result:', result);
    return result;
  } else if (typeof value === 'number') {
    const result = value.toString();
    console.log('Number result:', result);
    return result;
  } else {
    console.log('Unknown type:', typeof value);
    return String(value);
  }
};

// 执行所有示例
console.log('🚀 TypeScript基础类型示例');
demoBasicTypes();
demoSpecialTypes();
demoNullish();

// 测试类型检查函数
processValue("hello world");
processValue(42);
processValue(true);
