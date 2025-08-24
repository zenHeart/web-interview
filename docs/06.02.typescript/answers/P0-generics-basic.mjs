// TypeScript泛型系统comprehensive示例

console.log('🔧 TypeScript泛型系统全面演示');

// 1. 基础泛型函数演示
const demoBasicGenerics = () => {
  console.log('\n=== 基础泛型函数 ===');
  
  // 模拟泛型identity函数的效果
  const identity = (arg) => arg;
  
  console.log('identity("hello"):', identity("hello"));
  console.log('identity(42):', identity(42));
  console.log('identity(true):', identity(true));
  console.log('identity([1,2,3]):', identity([1, 2, 3]));
  
  // 泛型函数的类型推断效果
  const numbers = [1, 2, 3, 4, 5];
  const strings = ["a", "b", "c"];
  
  const firstNumber = identity(numbers[0]);
  const firstString = identity(strings[0]);
  
  console.log('firstNumber:', firstNumber, typeof firstNumber);
  console.log('firstString:', firstString, typeof firstString);
};

// 2. 泛型约束演示
const demoGenericConstraints = () => {
  console.log('\n=== 泛型约束演示 ===');
  
  // 模拟Lengthwise约束的效果
  const loggingIdentity = (arg) => {
    if (arg && typeof arg.length === 'number') {
      console.log(`参数长度: ${arg.length}, 值:`, arg);
      return arg;
    } else {
      console.log('参数没有length属性:', arg);
      return arg;
    }
  };
  
  // 有length属性的类型
  console.log('字符串测试:');
  loggingIdentity("hello world");
  
  console.log('数组测试:');
  loggingIdentity([1, 2, 3, 4, 5]);
  
  console.log('类数组对象测试:');
  loggingIdentity({ 0: 'a', 1: 'b', 2: 'c', length: 3 });
  
  // 没有length属性的类型
  console.log('数字测试（没有length）:');
  loggingIdentity(123);
  
  console.log('对象测试（没有length）:');
  loggingIdentity({ name: 'Alice', age: 25 });
};

// 3. keyof约束演示
const demoKeyofConstraint = () => {
  console.log('\n=== keyof约束演示 ===');
  
  // 模拟getProperty函数的效果
  const getProperty = (obj, key) => {
    if (key in obj) {
      console.log(`获取属性 ${key}:`, obj[key]);
      return obj[key];
    } else {
      console.log(`属性 ${key} 不存在于对象中`);
      return undefined;
    }
  };
  
  const person = {
    name: "Alice",
    age: 25,
    city: "New York",
    email: "alice@example.com"
  };
  
  console.log('person对象:', person);
  console.log('有效属性访问:');
  getProperty(person, "name");
  getProperty(person, "age");
  getProperty(person, "city");
  
  console.log('无效属性访问:');
  getProperty(person, "salary");
  getProperty(person, "phone");
};

// 4. 泛型类演示
const demoGenericClass = () => {
  console.log('\n=== 泛型类演示 ===');
  
  // 模拟泛型Repository类
  class GenericRepository {
    constructor() {
      this.items = [];
    }
    
    add(item) {
      this.items.push(item);
      console.log('添加项目:', item);
    }
    
    getById(predicate) {
      const found = this.items.find(predicate);
      console.log('查找结果:', found);
      return found;
    }
    
    getAll() {
      console.log('所有项目:', this.items);
      return [...this.items];
    }
    
    update(predicate, newItem) {
      const index = this.items.findIndex(predicate);
      if (index >= 0) {
        console.log(`更新项目 ${index}:`, this.items[index], '->', newItem);
        this.items[index] = newItem;
        return true;
      } else {
        console.log('未找到要更新的项目');
        return false;
      }
    }
    
    delete(predicate) {
      const index = this.items.findIndex(predicate);
      if (index >= 0) {
        const deleted = this.items.splice(index, 1)[0];
        console.log('删除项目:', deleted);
        return true;
      } else {
        console.log('未找到要删除的项目');
        return false;
      }
    }
  }
  
  // 用户存储库
  console.log('=== 用户存储库演示 ===');
  const userRepo = new GenericRepository();
  
  userRepo.add({ id: 1, name: 'Alice', email: 'alice@example.com' });
  userRepo.add({ id: 2, name: 'Bob', email: 'bob@example.com' });
  userRepo.add({ id: 3, name: 'Charlie', email: 'charlie@example.com' });
  
  userRepo.getAll();
  userRepo.getById(user => user.name === 'Alice');
  userRepo.update(user => user.id === 2, { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com' });
  userRepo.delete(user => user.id === 3);
  userRepo.getAll();
  
  // 产品存储库
  console.log('\n=== 产品存储库演示 ===');
  const productRepo = new GenericRepository();
  
  productRepo.add({ id: 'p1', name: 'Laptop', price: 999.99 });
  productRepo.add({ id: 'p2', name: 'Mouse', price: 25.99 });
  productRepo.add({ id: 'p3', name: 'Keyboard', price: 79.99 });
  
  productRepo.getById(product => product.price < 30);
  productRepo.getAll();
};

// 5. 多个泛型参数演示
const demoMultipleTypeParams = () => {
  console.log('\n=== 多个泛型参数演示 ===');
  
  // 模拟KeyValuePair
  const createPair = (key, value) => {
    const pair = { key, value };
    console.log(`创建键值对: ${typeof key} -> ${typeof value}`, pair);
    return pair;
  };
  
  console.log('不同类型的键值对:');
  createPair("name", "Alice");
  createPair("age", 25);
  createPair(1, "first");
  createPair(true, ["a", "b", "c"]);
  createPair("config", { mode: "development", debug: true });
};

// 6. 泛型工具函数演示
const demoGenericUtils = () => {
  console.log('\n=== 泛型工具函数演示 ===');
  
  // 模拟泛型工具类
  const GenericUtils = {
    map: (array, transform) => {
      console.log('映射前:', array);
      const result = array.map(transform);
      console.log('映射后:', result);
      return result;
    },
    
    filter: (array, predicate) => {
      console.log('过滤前:', array);
      const result = array.filter(predicate);
      console.log('过滤后:', result);
      return result;
    },
    
    reduce: (array, reducer, initialValue) => {
      console.log('归约输入:', array, '初始值:', initialValue);
      const result = array.reduce(reducer, initialValue);
      console.log('归约结果:', result);
      return result;
    },
    
    groupBy: (array, keySelector) => {
      console.log('分组输入:', array);
      const groups = array.reduce((acc, item) => {
        const key = keySelector(item);
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});
      console.log('分组结果:', groups);
      return groups;
    }
  };
  
  const users = [
    { id: 1, name: 'Alice', department: 'Engineering', age: 25 },
    { id: 2, name: 'Bob', department: 'Sales', age: 30 },
    { id: 3, name: 'Charlie', department: 'Engineering', age: 28 },
    { id: 4, name: 'Diana', department: 'Marketing', age: 26 },
    { id: 5, name: 'Eve', department: 'Sales', age: 32 }
  ];
  
  console.log('原始用户数据:', users);
  
  // 提取用户名
  GenericUtils.map(users, user => user.name);
  
  // 过滤工程师
  GenericUtils.filter(users, user => user.department === 'Engineering');
  
  // 计算平均年龄
  GenericUtils.reduce(users, (sum, user) => sum + user.age, 0) / users.length;
  
  // 按部门分组
  GenericUtils.groupBy(users, user => user.department);
};

// 7. 异步结果处理演示
const demoAsyncResult = () => {
  console.log('\n=== 异步结果处理演示 ===');
  
  class AsyncResult {
    constructor(value, error) {
      this.value = value;
      this.error = error;
    }
    
    static success(value) {
      console.log('创建成功结果:', value);
      return new AsyncResult(value, null);
    }
    
    static failure(error) {
      console.log('创建失败结果:', error);
      return new AsyncResult(null, error);
    }
    
    isSuccess() {
      return this.error === null;
    }
    
    getValue() {
      return this.value;
    }
    
    getError() {
      return this.error;
    }
    
    map(transform) {
      if (this.isSuccess() && this.value !== null) {
        const transformed = transform(this.value);
        console.log('转换成功:', this.value, '->', transformed);
        return AsyncResult.success(transformed);
      }
      console.log('转换跳过（因为是错误结果）');
      return AsyncResult.failure(this.error);
    }
    
    flatMap(transform) {
      if (this.isSuccess() && this.value !== null) {
        return transform(this.value);
      }
      return AsyncResult.failure(this.error);
    }
  }
  
  // 模拟异步操作
  const fetchUser = (id) => {
    console.log(`模拟获取用户 ${id}`);
    if (id > 0 && id <= 3) {
      return AsyncResult.success({ id, name: `User${id}`, email: `user${id}@example.com` });
    } else {
      return AsyncResult.failure(new Error(`User ${id} not found`));
    }
  };
  
  const processUser = (user) => {
    console.log('处理用户:', user);
    return AsyncResult.success(`Processed: ${user.name}`);
  };
  
  // 测试成功情况
  console.log('=== 成功情况 ===');
  const result1 = fetchUser(1);
  const processed1 = result1.flatMap(processUser);
  console.log('最终结果:', processed1.getValue());
  
  // 测试失败情况
  console.log('\n=== 失败情况 ===');
  const result2 = fetchUser(999);
  const processed2 = result2.flatMap(processUser);
  console.log('错误信息:', processed2.getError()?.message);
  
  // 测试链式调用
  console.log('\n=== 链式转换 ===');
  const result3 = fetchUser(2)
    .map(user => user.name.toUpperCase())
    .map(name => `Welcome, ${name}!`);
  
  if (result3.isSuccess()) {
    console.log('链式转换结果:', result3.getValue());
  }
};

// 执行所有示例
demoBasicGenerics();
demoGenericConstraints();
demoKeyofConstraint();
demoGenericClass();
demoMultipleTypeParams();
demoGenericUtils();
demoAsyncResult();

console.log('\n🎉 泛型系统演示完成！');
