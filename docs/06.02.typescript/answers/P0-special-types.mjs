// TypeScript特殊类型对比示例

console.log('🔍 TypeScript特殊类型深度对比');

// 1. any类型 - 最不安全的类型
const demoAnyType = () => {
  console.log('\n=== any类型示例 ===');
  
  let anything = "hello";
  console.log('anything (初始):', anything);
  
  // any可以做任何操作，但可能运行时报错
  try {
    console.log('anything.foo.bar:');
    // anything.foo.bar; // 这会在运行时报错，但编译时通过
  } catch (error) {
    console.log('❌ 运行时错误:', error.message);
  }
  
  anything = 42;
  console.log('anything (重新赋值):', anything);
  
  anything = { name: "test", value: 123 };
  console.log('anything (对象):', anything);
};

// 2. unknown类型 - 类型安全的any
const demoUnknownType = () => {
  console.log('\n=== unknown类型示例 ===');
  
  let uncertain = "hello";
  console.log('uncertain:', uncertain);
  
  // unknown必须先进行类型检查
  if (typeof uncertain === 'string') {
    console.log('✅ 类型安全访问 length:', uncertain.length);
  }
  
  uncertain = 42;
  if (typeof uncertain === 'number') {
    console.log('✅ 类型安全访问 toFixed:', uncertain.toFixed(2));
  }
  
  uncertain = { name: "test" };
  if (typeof uncertain === 'object' && uncertain !== null && 'name' in uncertain) {
    console.log('✅ 类型安全访问 name:', uncertain.name);
  }
};

// 3. never类型示例
const demoNeverType = () => {
  console.log('\n=== never类型示例 ===');
  
  // never类型在穷尽检查中的应用
  const processStatus = (status) => {
    switch (status) {
      case 'loading':
        return 'Loading...';
      case 'success':
        return 'Success!';
      case 'error':
        return 'Error occurred';
      default:
        // 在TypeScript中，这里的status会是never类型
        console.log('🚨 未处理的状态:', status);
        return 'Unknown status';
    }
  };
  
  console.log('Status loading:', processStatus('loading'));
  console.log('Status success:', processStatus('success'));
  console.log('Status error:', processStatus('error'));
  console.log('Status unknown:', processStatus('unknown'));
};

// 4. void类型示例
const demoVoidType = () => {
  console.log('\n=== void类型示例 ===');
  
  // void表示没有返回值的函数
  const logAction = () => {
    console.log('执行了某个操作');
    // 可以没有return，或者return undefined
  };
  
  const logWithReturn = () => {
    console.log('执行了另一个操作');
    return; // 等价于return undefined
  };
  
  console.log('logAction返回值:', logAction());
  console.log('logWithReturn返回值:', logWithReturn());
};

// 5. null和undefined的区别
const demoNullUndefined = () => {
  console.log('\n=== null vs undefined示例 ===');
  
  let nullValue = null;
  let undefinedValue = undefined;
  
  console.log('nullValue:', nullValue, typeof nullValue);
  console.log('undefinedValue:', undefinedValue, typeof undefinedValue);
  console.log('null == undefined:', null == undefined);
  console.log('null === undefined:', null === undefined);
  
  // 实际应用场景
  const user = {
    name: "Alice",
    avatar: null,        // 明确表示没有头像
    nickname: undefined  // 表示未设置昵称
  };
  
  console.log('用户信息:', user);
  
  if (user.avatar === null) {
    console.log('用户没有设置头像');
  }
  
  if (user.nickname === undefined) {
    console.log('用户没有设置昵称');
  }
};

// 6. 类型守卫示例
const demoTypeGuards = () => {
  console.log('\n=== 类型守卫示例 ===');
  
  const isString = (value) => typeof value === 'string';
  const isNumber = (value) => typeof value === 'number';
  
  const processValue = (value) => {
    if (isString(value)) {
      console.log(`字符串处理: ${value.toUpperCase()}`);
    } else if (isNumber(value)) {
      console.log(`数字处理: ${value.toFixed(2)}`);
    } else {
      console.log(`其他类型: ${typeof value}`);
    }
  };
  
  processValue("hello");
  processValue(3.14159);
  processValue(true);
  processValue(null);
};

// 执行所有示例
demoAnyType();
demoUnknownType();
demoNeverType();
demoVoidType();
demoNullUndefined();
demoTypeGuards();

console.log('\n✨ 特殊类型对比完成！');
