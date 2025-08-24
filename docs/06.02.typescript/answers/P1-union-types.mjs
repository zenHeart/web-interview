// TypeScript联合类型comprehensive示例

console.log('🔗 TypeScript联合类型全面演示');

// 1. 基础联合类型
const demoBasicUnions = () => {
  console.log('\n=== 基础联合类型 ===');
  
  // 字面量联合类型
  const statuses = ['loading', 'success', 'error'];
  const themes = ['light', 'dark', 'auto'];
  
  console.log('可用状态:', statuses);
  console.log('可用主题:', themes);
  
  // 类型缩减示例
  const processValue = (input) => {
    console.log(`处理输入: ${input} (${typeof input})`);
    
    if (typeof input === 'string') {
      const result = input.toUpperCase();
      console.log(`字符串处理结果: ${result}`);
      return result;
    } else if (typeof input === 'number') {
      const result = input.toString();
      console.log(`数字处理结果: ${result}`);
      return result;
    }
    
    return String(input);
  };
  
  processValue("hello");
  processValue(42);
  processValue(true);
};

// 2. 判别联合类型
const demoDiscriminatedUnions = () => {
  console.log('\n=== 判别联合类型 ===');
  
  // 形状计算示例
  const shapes = [
    { kind: 'circle', radius: 5 },
    { kind: 'rectangle', width: 10, height: 8 },
    { kind: 'triangle', base: 6, height: 4 }
  ];
  
  const getArea = (shape) => {
    switch (shape.kind) {
      case 'circle':
        return Math.PI * shape.radius ** 2;
      case 'rectangle':
        return shape.width * shape.height;
      case 'triangle':
        return (shape.base * shape.height) / 2;
      default:
        console.log('未知形状类型');
        return 0;
    }
  };
  
  shapes.forEach(shape => {
    const area = getArea(shape);
    console.log(`${shape.kind} 面积:`, area.toFixed(2));
  });
};

// 3. 复杂联合类型 - API结果
const demoComplexUnions = () => {
  console.log('\n=== 复杂联合类型 - API结果 ===');
  
  // 模拟不同的API响应
  const apiResults = [
    { success: true, data: { id: 1, name: 'Alice' } },
    { success: false, error: 'User not found', code: 404 },
    { success: true, data: { id: 2, name: 'Bob' } },
    { success: false, error: 'Network error', code: 500 }
  ];
  
  const handleApiResult = (result) => {
    if (result.success) {
      console.log('✅ 成功:', result.data);
      return result.data;
    } else {
      console.log(`❌ 错误 ${result.code}: ${result.error}`);
      return null;
    }
  };
  
  apiResults.forEach((result, index) => {
    console.log(`API请求 ${index + 1}:`);
    handleApiResult(result);
  });
};

// 4. 状态管理中的联合类型
const demoStateManagement = () => {
  console.log('\n=== 状态管理中的联合类型 ===');
  
  const states = [
    { status: 'loading' },
    { status: 'success', data: ['item1', 'item2', 'item3'] },
    { status: 'error', error: 'Failed to fetch data' }
  ];
  
  const renderState = (state) => {
    switch (state.status) {
      case 'loading':
        return '⏳ Loading...';
      case 'success':
        return `✅ Data loaded: ${state.data.join(', ')}`;
      case 'error':
        return `❌ Error: ${state.error}`;
      default:
        return '❓ Unknown state';
    }
  };
  
  states.forEach((state, index) => {
    console.log(`状态 ${index + 1}: ${renderState(state)}`);
  });
};

// 5. 事件处理联合类型
const demoEventUnions = () => {
  console.log('\n=== 事件处理联合类型 ===');
  
  // 模拟不同类型的事件
  const events = [
    { type: 'click', target: 'button', x: 100, y: 200 },
    { type: 'keydown', key: 'Enter', code: 'Enter' },
    { type: 'input', value: 'hello world', target: 'textfield' },
    { type: 'custom', name: 'user-action', data: { userId: 123 } }
  ];
  
  const handleEvent = (event) => {
    switch (event.type) {
      case 'click':
        console.log(`点击事件: ${event.target} at (${event.x}, ${event.y})`);
        break;
      case 'keydown':
        console.log(`按键事件: ${event.key} (${event.code})`);
        break;
      case 'input':
        console.log(`输入事件: "${event.value}" in ${event.target}`);
        break;
      case 'custom':
        console.log(`自定义事件: ${event.name}`, event.data);
        break;
      default:
        console.log('未知事件类型:', event);
    }
  };
  
  events.forEach(event => handleEvent(event));
};

// 6. 类型过滤示例
const demoTypeFiltering = () => {
  console.log('\n=== 类型过滤示例 ===');
  
  const mixedArray = [
    "hello", 42, true, "world", 3.14, false, null, "typescript", 100
  ];
  
  console.log('原始数组:', mixedArray);
  
  // 过滤字符串
  const strings = mixedArray.filter(item => typeof item === 'string');
  console.log('字符串:', strings);
  
  // 过滤数字
  const numbers = mixedArray.filter(item => typeof item === 'number');
  console.log('数字:', numbers);
  
  // 过滤布尔值
  const booleans = mixedArray.filter(item => typeof item === 'boolean');
  console.log('布尔值:', booleans);
  
  // 过滤非空值
  const nonNull = mixedArray.filter(item => item !== null && item !== undefined);
  console.log('非空值:', nonNull);
};

// 执行所有示例
demoBasicUnions();
demoDiscriminatedUnions();
demoComplexUnions();
demoStateManagement();
demoEventUnions();
demoTypeFiltering();

console.log('\n🎉 联合类型演示完成！');
