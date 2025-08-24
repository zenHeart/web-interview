// TypeScript类型断言comprehensive示例

console.log('🎯 TypeScript类型断言全面演示');

// 1. 基础类型断言
const demoBasicAssertions = () => {
  console.log('\n=== 基础类型断言 ===');
  
  // 模拟unknown类型的值
  let someValue = "this is a string";
  console.log('someValue:', someValue);
  
  // 在JavaScript中，我们无法直接演示as语法
  // 但可以展示类型断言的实际应用场景
  
  // 模拟DOM元素类型断言的效果
  const mockCanvas = {
    tagName: 'CANVAS',
    getContext: (type) => {
      if (type === '2d') {
        return { fillRect: () => console.log('Canvas 2D context created') };
      }
      return null;
    }
  };
  
  console.log('模拟canvas元素:', mockCanvas.tagName);
  const ctx = mockCanvas.getContext('2d');
  if (ctx) {
    ctx.fillRect(); // 模拟canvas操作
  }
};

// 2. 常量断言的效果演示
const demoConstAssertion = () => {
  console.log('\n=== 常量断言效果 ===');
  
  // 普通数组 vs 常量断言效果
  const colors1 = ['red', 'green', 'blue'];
  console.log('普通数组:', colors1);
  console.log('可以修改:', colors1.push('yellow'), colors1);
  
  // 模拟常量断言的效果（实际中会是readonly）
  const colors2 = Object.freeze(['red', 'green', 'blue']);
  console.log('冻结数组（模拟as const）:', colors2);
  
  try {
    colors2.push('yellow'); // 这会失败
  } catch (error) {
    console.log('❌ 无法修改冻结数组:', error.message);
  }
  
  // 对象的常量断言效果
  const theme1 = { primary: '#007acc', secondary: '#f1f1f1' };
  console.log('普通对象:', theme1);
  theme1.primary = '#ff0000'; // 可以修改
  console.log('修改后:', theme1);
  
  const theme2 = Object.freeze({ primary: '#007acc', secondary: '#f1f1f1' });
  console.log('冻结对象（模拟as const）:', theme2);
  
  try {
    theme2.primary = '#ff0000'; // 这会静默失败或在严格模式下抛出错误
  } catch (error) {
    console.log('❌ 无法修改冻结对象:', error.message);
  }
  
  console.log('冻结对象依然是:', theme2);
};

// 3. API响应类型断言场景
const demoAPIResponseAssertion = () => {
  console.log('\n=== API响应类型断言 ===');
  
  // 模拟API响应
  const mockApiResponse = {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
  };
  
  // 类型验证函数（模拟类型守卫）
  const isUser = (obj) => {
    return typeof obj === 'object' &&
           obj !== null &&
           typeof obj.id === 'number' &&
           typeof obj.name === 'string' &&
           typeof obj.email === 'string';
  };
  
  console.log('API响应:', mockApiResponse);
  
  if (isUser(mockApiResponse)) {
    console.log('✅ 验证通过，这是一个用户对象');
    console.log(`用户: ${mockApiResponse.name} (${mockApiResponse.email})`);
  } else {
    console.log('❌ 验证失败，不是有效的用户对象');
  }
  
  // 演示错误的API响应
  const invalidResponse = { name: "Bob" }; // 缺少必要字段
  console.log('无效响应:', invalidResponse);
  
  if (isUser(invalidResponse)) {
    console.log('✅ 验证通过');
  } else {
    console.log('❌ 验证失败，缺少必要字段');
  }
};

// 4. 非空断言的应用场景
const demoNonNullAssertion = () => {
  console.log('\n=== 非空断言应用 ===');
  
  // 模拟可能为undefined的值
  const processInput = (input) => {
    if (input === undefined) {
      console.log('⚠️ 输入为undefined，但我们确信它不为空');
      return; // 在实际TypeScript中，这里会用非空断言 input!
    }
    
    console.log(`处理输入: ${input}, 长度: ${input.length}`);
  };
  
  // 安全的处理方式
  const processInputSafe = (input) => {
    if (input !== undefined && input !== null) {
      console.log(`✅ 安全处理输入: ${input}, 长度: ${input.length}`);
    } else {
      console.log('❌ 输入为空，无法处理');
    }
  };
  
  console.log('=== 非空断言风险演示 ===');
  processInput("hello world"); // 正常情况
  processInput(undefined);     // 危险情况
  
  console.log('=== 安全处理方式 ===');
  processInputSafe("hello world");
  processInputSafe(undefined);
  processInputSafe(null);
};

// 5. 类型断言 vs 类型转换
const demoAssertionVsConversion = () => {
  console.log('\n=== 类型断言 vs 类型转换 ===');
  
  const value = "123";
  console.log('原始值:', value, typeof value);
  
  // 类型断言在运行时不改变值（在TypeScript中）
  const assertedNum = value; // 在TS中会是 value as number
  console.log('类型断言结果:', assertedNum, typeof assertedNum);
  console.log('⚠️ 类型断言不改变运行时类型！');
  
  // 类型转换实际改变运行时的值
  const convertedNum = Number(value);
  console.log('类型转换结果:', convertedNum, typeof convertedNum);
  console.log('✅ 类型转换改变了运行时类型！');
  
  // 更多转换示例
  console.log('\n--- 更多转换示例 ---');
  const samples = ["456", "3.14", "abc", ""];
  
  samples.forEach(sample => {
    const converted = Number(sample);
    const parseInted = parseInt(sample);
    const parseFloated = parseFloat(sample);
    
    console.log(`"${sample}" -> Number: ${converted}, parseInt: ${parseInted}, parseFloat: ${parseFloated}`);
  });
};

// 6. 实际应用：安全的类型断言工具
const demoSafeAssertion = () => {
  console.log('\n=== 安全的类型断言工具 ===');
  
  // 安全的类型断言函数
  const safeAssertion = (value, guard, errorMessage) => {
    if (guard(value)) {
      return value;
    }
    throw new Error(errorMessage || 'Type assertion failed');
  };
  
  // 带默认值的断言
  const assertionWithDefault = (value, guard, defaultValue) => {
    return guard(value) ? value : defaultValue;
  };
  
  // 用户类型守卫
  const isUser = (obj) => {
    return typeof obj === 'object' &&
           obj !== null &&
           'id' in obj &&
           'name' in obj &&
           'email' in obj;
  };
  
  const isString = (value) => typeof value === 'string';
  const isNumber = (value) => typeof value === 'number';
  
  // 测试数据
  const testData = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob' }, // 缺少字段
    "hello world",
    42,
    null
  ];
  
  testData.forEach((data, index) => {
    console.log(`\n测试数据 ${index + 1}:`, data);
    
    try {
      const validUser = safeAssertion(data, isUser, 'Invalid user data');
      console.log('✅ 用户验证通过:', validUser.name);
    } catch (error) {
      console.log('❌ 用户验证失败:', error.message);
    }
    
    // 带默认值的断言
    const stringValue = assertionWithDefault(data, isString, "default string");
    console.log('字符串断言结果:', stringValue);
    
    const numberValue = assertionWithDefault(data, isNumber, 0);
    console.log('数字断言结果:', numberValue);
  });
};

// 执行所有示例
demoBasicAssertions();
demoConstAssertion();
demoAPIResponseAssertion();
demoNonNullAssertion();
demoAssertionVsConversion();
demoSafeAssertion();

console.log('\n🎉 类型断言演示完成！');
