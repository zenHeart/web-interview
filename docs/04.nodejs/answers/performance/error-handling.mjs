// Node.js 错误类型和捕获示例
const fs = require('fs').promises;
const EventEmitter = require('events');

// 1. JavaScript 标准错误类型
function demonstrateJSErrors() {
  console.log('=== JavaScript 标准错误类型 ===');
  
  try {
    // SyntaxError - 语法错误
    console.log('SyntaxError 示例:');
    // eval('let x = ;'); // 取消注释会抛出 SyntaxError
    
    // TypeError - 类型错误
    console.log('TypeError 示例:');
    const obj = null;
    // obj.someMethod(); // 取消注释会抛出 TypeError
    
    // ReferenceError - 引用错误
    console.log('ReferenceError 示例:');
    // console.log(undefinedVariable); // 取消注释会抛出 ReferenceError
    
    // RangeError - 范围错误
    console.log('RangeError 示例:');
    const arr = new Array(-1); // 会抛出 RangeError
    
  } catch (error) {
    console.log(`捕获到错误: ${error.name} - ${error.message}`);
  }
}

// 2. Node.js 系统错误
async function demonstrateSystemErrors() {
  console.log('\n=== Node.js 系统错误 ===');
  
  try {
    // ENOENT - 文件或目录不存在
    await fs.readFile('nonexistent-file.txt', 'utf8');
  } catch (error) {
    console.log(`系统错误: ${error.code} - ${error.message}`);
    console.log(`错误路径: ${error.path}`);
    console.log(`系统调用: ${error.syscall}`);
  }
  
  try {
    // EACCES - 权限拒绝
    await fs.access('/root/restricted-file', fs.constants.F_OK);
  } catch (error) {
    if (error.code === 'EACCES') {
      console.log('权限被拒绝');
    }
  }
}

// 3. Promise 错误处理
async function demonstratePromiseErrors() {
  console.log('\n=== Promise 错误处理 ===');
  
  // Promise.reject() 错误
  try {
    await Promise.reject(new Error('Promise rejected'));
  } catch (error) {
    console.log(`Promise 错误: ${error.message}`);
  }
  
  // 未处理的 Promise rejection
  const unhandledPromise = Promise.reject(new Error('未处理的 Promise 错误'));
  
  // 捕获未处理的 rejection
  process.on('unhandledRejection', (reason, promise) => {
    console.log('未处理的 Promise rejection:', reason.message);
    console.log('Promise:', promise);
    
    // 在生产环境中应该记录错误并优雅关闭
    // process.exit(1);
  });
}

// 4. EventEmitter 错误处理
function demonstrateEventEmitterErrors() {
  console.log('\n=== EventEmitter 错误处理 ===');
  
  const emitter = new EventEmitter();
  
  // 监听错误事件
  emitter.on('error', (error) => {
    console.log(`EventEmitter 错误: ${error.message}`);
  });
  
  // 触发错误
  emitter.emit('error', new Error('EventEmitter 发生错误'));
  
  // 如果没有错误监听器，会抛出错误
  const emitter2 = new EventEmitter();
  try {
    emitter2.emit('error', new Error('无监听器的错误'));
  } catch (error) {
    console.log(`未监听的 EventEmitter 错误: ${error.message}`);
  }
}

// 5. 自定义错误类
class CustomError extends Error {
  constructor(message, code, statusCode = 500) {
    super(message);
    this.name = 'CustomError';
    this.code = code;
    this.statusCode = statusCode;
    
    // 保持堆栈跟踪
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

class ValidationError extends CustomError {
  constructor(message, field) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function demonstrateCustomErrors() {
  console.log('\n=== 自定义错误类 ===');
  
  try {
    throw new ValidationError('邮箱格式不正确', 'email');
  } catch (error) {
    if (error instanceof ValidationError) {
      console.log(`验证错误: ${error.message}`);
      console.log(`错误字段: ${error.field}`);
      console.log(`状态码: ${error.statusCode}`);
    }
  }
}

// 6. 全局错误处理
function setupGlobalErrorHandlers() {
  console.log('\n=== 全局错误处理设置 ===');
  
  // 捕获未处理的异常
  process.on('uncaughtException', (error) => {
    console.error('未捕获的异常:', error);
    
    // 记录错误后优雅关闭
    console.log('正在关闭服务器...');
    // 在实际应用中，应该：
    // 1. 记录错误到日志系统
    // 2. 通知监控系统  
    // 3. 优雅关闭服务器
    // process.exit(1);
  });
  
  // 捕获未处理的 Promise rejection
  process.on('unhandledRejection', (reason, promise) => {
    console.error('未处理的 Promise rejection:', reason);
    console.log('在 Promise:', promise);
    
    // 抛出异常让 uncaughtException 处理
    // throw reason;
  });
  
  // 进程退出处理
  process.on('SIGINT', () => {
    console.log('\n收到 SIGINT 信号，正在优雅关闭...');
    process.exit(0);
  });
  
  process.on('SIGTERM', () => {
    console.log('收到 SIGTERM 信号，正在优雅关闭...');
    process.exit(0);
  });
}

// 7. 错误监控和日志记录
class ErrorMonitor {
  constructor() {
    this.errorCounts = new Map();
    this.errorHistory = [];
  }
  
  logError(error, context = {}) {
    const errorInfo = {
      timestamp: new Date().toISOString(),
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code,
      context
    };
    
    // 记录错误
    this.errorHistory.push(errorInfo);
    
    // 统计错误次数
    const key = `${error.name}:${error.message}`;
    this.errorCounts.set(key, (this.errorCounts.get(key) || 0) + 1);
    
    console.log('错误已记录:', JSON.stringify(errorInfo, null, 2));
  }
  
  getErrorStats() {
    return {
      totalErrors: this.errorHistory.length,
      errorCounts: Object.fromEntries(this.errorCounts),
      recentErrors: this.errorHistory.slice(-5)
    };
  }
}

// 主函数
async function main() {
  console.log('Node.js 错误处理演示');
  console.log('====================\n');
  
  // 设置全局错误处理
  setupGlobalErrorHandlers();
  
  // 创建错误监控器
  const monitor = new ErrorMonitor();
  
  try {
    // 演示各种错误类型
    demonstrateJSErrors();
    await demonstrateSystemErrors();
    await demonstratePromiseErrors();
    demonstrateEventEmitterErrors();
    demonstrateCustomErrors();
    
    // 模拟一些错误并监控
    setTimeout(() => {
      try {
        throw new Error('定时器错误');
      } catch (error) {
        monitor.logError(error, { source: 'timer' });
      }
    }, 1000);
    
    // 输出错误统计
    setTimeout(() => {
      console.log('\n=== 错误统计 ===');
      console.log(JSON.stringify(monitor.getErrorStats(), null, 2));
    }, 2000);
    
  } catch (error) {
    monitor.logError(error, { source: 'main' });
  }
}

// 执行演示
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  CustomError,
  ValidationError,
  ErrorMonitor,
  demonstrateJSErrors,
  demonstrateSystemErrors,
  demonstratePromiseErrors,
  demonstrateEventEmitterErrors,
  demonstrateCustomErrors,
  setupGlobalErrorHandlers
};
