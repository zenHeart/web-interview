// Node.js 内存优化示例
const { performance, PerformanceObserver } = require('perf_hooks');

// 1. 内存使用监控
function monitorMemoryUsage() {
  console.log('=== 内存使用监控 ===');
  
  const usage = process.memoryUsage();
  const formatBytes = (bytes) => (bytes / 1024 / 1024).toFixed(2) + ' MB';
  
  console.log(`RSS (常驻内存): ${formatBytes(usage.rss)}`);
  console.log(`Heap Used (堆内存使用): ${formatBytes(usage.heapUsed)}`);
  console.log(`Heap Total (堆内存总计): ${formatBytes(usage.heapTotal)}`);
  console.log(`External (外部内存): ${formatBytes(usage.external)}`);
  console.log(`Array Buffers (数组缓冲区): ${formatBytes(usage.arrayBuffers)}`);
  
  // 计算内存使用率
  const heapUsagePercent = ((usage.heapUsed / usage.heapTotal) * 100).toFixed(2);
  console.log(`堆内存使用率: ${heapUsagePercent}%`);
  
  return usage;
}

// 2. 垃圾回收监控
function setupGCMonitoring() {
  console.log('\n=== 垃圾回收监控 ===');
  
  const obs = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach((entry) => {
      console.log(`GC ${entry.name}: ${entry.duration.toFixed(2)}ms`);
      console.log(`GC 类型: ${entry.detail ? entry.detail.kind : 'unknown'}`);
    });
  });
  
  obs.observe({ entryTypes: ['gc'] });
  
  // 主动触发垃圾回收 (需要 --expose-gc 参数)
  if (global.gc) {
    console.log('手动触发垃圾回收...');
    global.gc();
  } else {
    console.log('需要 --expose-gc 参数来启用手动垃圾回收');
  }
  
  return obs;
}

// 3. 内存泄漏演示和检测
class MemoryLeakDemo {
  constructor() {
    this.cache = new Map();
    this.listeners = [];
    this.timers = [];
  }
  
  // 演示常见的内存泄漏场景
  demonstrateMemoryLeaks() {
    console.log('\n=== 内存泄漏演示 ===');
    
    // 1. 缓存无限增长
    this.createUnboundedCache();
    
    // 2. 事件监听器未移除
    this.createUnremovedListeners();
    
    // 3. 定时器未清理
    this.createUnclearedTimers();
    
    // 4. 闭包引用
    this.createClosureReference();
  }
  
  createUnboundedCache() {
    console.log('创建无界限缓存 (模拟内存泄漏)...');
    
    // 模拟无限增长的缓存
    for (let i = 0; i < 10000; i++) {
      this.cache.set(`key_${i}`, {
        data: new Array(100).fill(`value_${i}`),
        timestamp: Date.now()
      });
    }
    
    console.log(`缓存大小: ${this.cache.size}`);
  }
  
  createUnremovedListeners() {
    console.log('创建未移除的事件监听器...');
    
    const EventEmitter = require('events');
    const emitter = new EventEmitter();
    
    // 创建多个未移除的监听器
    for (let i = 0; i < 100; i++) {
      const listener = () => console.log(`Listener ${i}`);
      emitter.on('test', listener);
      this.listeners.push({ emitter, event: 'test', listener });
    }
    
    console.log(`创建了 ${this.listeners.length} 个事件监听器`);
  }
  
  createUnclearedTimers() {
    console.log('创建未清理的定时器...');
    
    // 创建多个定时器但不清理
    for (let i = 0; i < 50; i++) {
      const timer = setInterval(() => {
        // 模拟一些工作
        const data = new Array(1000).fill(Math.random());
      }, 100);
      
      this.timers.push(timer);
    }
    
    console.log(`创建了 ${this.timers.length} 个定时器`);
  }
  
  createClosureReference() {
    console.log('创建闭包引用...');
    
    const largeData = new Array(10000).fill('large data chunk');
    
    // 闭包持有大对象的引用
    this.closureFunction = () => {
      return largeData.length;
    };
    
    console.log('闭包函数已创建，持有大对象引用');
  }
  
  // 清理内存泄漏
  cleanup() {
    console.log('\n=== 清理内存泄漏 ===');
    
    // 清理缓存
    this.cache.clear();
    console.log('缓存已清理');
    
    // 移除事件监听器
    this.listeners.forEach(({ emitter, event, listener }) => {
      emitter.removeListener(event, listener);
    });
    this.listeners = [];
    console.log('事件监听器已清理');
    
    // 清理定时器
    this.timers.forEach(timer => clearInterval(timer));
    this.timers = [];
    console.log('定时器已清理');
    
    // 清理闭包引用
    this.closureFunction = null;
    console.log('闭包引用已清理');
  }
}

// 4. 内存优化最佳实践
class MemoryOptimizer {
  // 对象池模式
  static createObjectPool(createFn, resetFn, initialSize = 10) {
    const pool = [];
    
    // 预填充对象池
    for (let i = 0; i < initialSize; i++) {
      pool.push(createFn());
    }
    
    return {
      get() {
        return pool.length > 0 ? resetFn(pool.pop()) : createFn();
      },
      
      release(obj) {
        if (pool.length < 100) { // 限制池大小
          pool.push(obj);
        }
      },
      
      size() {
        return pool.length;
      }
    };
  }
  
  // 流式处理大文件
  static async processLargeDataStream(data, batchSize = 1000) {
    console.log('\n=== 流式处理演示 ===');
    
    const results = [];
    for (let i = 0; i < data.length; i += batchSize) {
      const batch = data.slice(i, i + batchSize);
      
      // 处理批次数据
      const processed = batch.map(item => item * 2);
      results.push(...processed);
      
      // 在每个批次后检查内存
      if (i % (batchSize * 10) === 0) {
        const usage = process.memoryUsage();
        console.log(`处理进度: ${((i / data.length) * 100).toFixed(1)}%, 堆内存: ${(usage.heapUsed / 1024 / 1024).toFixed(2)}MB`);
        
        // 主动进行垃圾回收
        if (global.gc) {
          global.gc();
        }
      }
    }
    
    return results;
  }
  
  // 弱引用使用示例
  static demonstrateWeakReferences() {
    console.log('\n=== WeakMap/WeakSet 使用示例 ===');
    
    // 使用 WeakMap 避免内存泄漏
    const weakCache = new WeakMap();
    const strongCache = new Map();
    
    class User {
      constructor(name) {
        this.name = name;
      }
    }
    
    const users = [
      new User('Alice'),
      new User('Bob'),
      new User('Charlie')
    ];
    
    // 使用 WeakMap 存储用户相关数据
    users.forEach(user => {
      weakCache.set(user, { loginCount: 0, lastLogin: Date.now() });
      strongCache.set(user.name, user);
    });
    
    console.log(`WeakMap 大小: ${weakCache.has(users[0]) ? '包含用户数据' : '不包含用户数据'}`);
    console.log(`强引用缓存大小: ${strongCache.size}`);
    
    // 清除用户引用后，WeakMap 中的数据会被自动回收
    users.length = 0;
    
    // 强制垃圾回收
    if (global.gc) {
      global.gc();
    }
    
    console.log('用户引用清除后，WeakMap 数据将被自动回收');
  }
}

// 5. 内存监控工具
class MemoryMonitor {
  constructor(interval = 5000) {
    this.interval = interval;
    this.monitoring = false;
    this.history = [];
  }
  
  start() {
    if (this.monitoring) return;
    
    this.monitoring = true;
    console.log(`开始内存监控，间隔: ${this.interval}ms`);
    
    this.timer = setInterval(() => {
      const usage = process.memoryUsage();
      const timestamp = Date.now();
      
      this.history.push({ timestamp, usage });
      
      // 保持历史记录在合理范围内
      if (this.history.length > 100) {
        this.history.shift();
      }
      
      // 检测内存增长趋势
      this.checkMemoryGrowth();
    }, this.interval);
  }
  
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.monitoring = false;
      console.log('内存监控已停止');
    }
  }
  
  checkMemoryGrowth() {
    if (this.history.length < 5) return;
    
    const recent = this.history.slice(-5);
    const first = recent[0].usage.heapUsed;
    const last = recent[recent.length - 1].usage.heapUsed;
    const growthRate = ((last - first) / first) * 100;
    
    if (growthRate > 10) {
      console.warn(`警告: 内存增长过快 ${growthRate.toFixed(2)}%`);
      this.logCurrentUsage();
    }
  }
  
  logCurrentUsage() {
    const usage = process.memoryUsage();
    console.log('当前内存使用:');
    console.log(`  RSS: ${(usage.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Heap Used: ${(usage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Heap Total: ${(usage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
  }
  
  getStats() {
    if (this.history.length === 0) return null;
    
    const usages = this.history.map(h => h.usage.heapUsed);
    const min = Math.min(...usages);
    const max = Math.max(...usages);
    const avg = usages.reduce((a, b) => a + b, 0) / usages.length;
    
    return {
      samples: this.history.length,
      minHeapUsed: (min / 1024 / 1024).toFixed(2) + ' MB',
      maxHeapUsed: (max / 1024 / 1024).toFixed(2) + ' MB',
      avgHeapUsed: (avg / 1024 / 1024).toFixed(2) + ' MB'
    };
  }
}

// 主函数演示
async function main() {
  console.log('Node.js 内存优化演示');
  console.log('=====================\n');
  
  // 1. 监控初始内存使用
  const initialUsage = monitorMemoryUsage();
  
  // 2. 设置垃圾回收监控
  const gcObserver = setupGCMonitoring();
  
  // 3. 演示内存泄漏
  const leakDemo = new MemoryLeakDemo();
  leakDemo.demonstrateMemoryLeaks();
  
  console.log('\n内存泄漏创建后:');
  monitorMemoryUsage();
  
  // 4. 清理内存泄漏
  setTimeout(() => {
    leakDemo.cleanup();
    
    if (global.gc) {
      global.gc();
    }
    
    console.log('\n清理后:');
    monitorMemoryUsage();
  }, 2000);
  
  // 5. 演示最佳实践
  setTimeout(async () => {
    // 对象池示例
    const numberPool = MemoryOptimizer.createObjectPool(
      () => ({ value: 0 }),
      (obj) => { obj.value = 0; return obj; }
    );
    
    console.log('\n=== 对象池演示 ===');
    const obj = numberPool.get();
    obj.value = 42;
    numberPool.release(obj);
    console.log(`对象池大小: ${numberPool.size()}`);
    
    // 流式处理演示
    const largeArray = new Array(50000).fill(0).map((_, i) => i);
    await MemoryOptimizer.processLargeDataStream(largeArray);
    
    // 弱引用演示
    MemoryOptimizer.demonstrateWeakReferences();
    
  }, 3000);
  
  // 6. 启动内存监控
  const monitor = new MemoryMonitor(1000);
  monitor.start();
  
  // 10秒后停止监控并输出统计
  setTimeout(() => {
    monitor.stop();
    const stats = monitor.getStats();
    console.log('\n=== 内存监控统计 ===');
    console.log(JSON.stringify(stats, null, 2));
    
    gcObserver.disconnect();
    process.exit(0);
  }, 10000);
}

// 执行演示
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  monitorMemoryUsage,
  setupGCMonitoring,
  MemoryLeakDemo,
  MemoryOptimizer,
  MemoryMonitor
};
