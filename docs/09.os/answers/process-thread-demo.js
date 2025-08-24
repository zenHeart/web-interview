// 进程与线程概念演示（Node.js 环境）
import { Worker, isMainThread, parentPort, workerData } from 'worker_threads';
import { spawn, fork } from 'child_process';
import { cpus } from 'os';

/**
 * 演示 CPU 密集型任务的不同实现方式
 */

// CPU 密集型任务：计算斐波那契数列
function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

/**
 * 方案1: 单线程执行（会阻塞主线程）
 */
async function singleThreadDemo() {
  console.log('=== 单线程执行演示 ===');
  console.log('开始计算...(主线程会被阻塞)');
  
  const start = Date.now();
  const result = fibonacci(40);
  const end = Date.now();
  
  console.log(`结果: ${result}`);
  console.log(`耗时: ${end - start}ms`);
  console.log('主线程恢复响应\n');
}

/**
 * 方案2: Worker 线程执行（不阻塞主线程）
 */
async function workerThreadDemo() {
  console.log('=== Worker 线程执行演示 ===');
  console.log('创建 Worker 线程计算...');
  
  return new Promise((resolve, reject) => {
    const start = Date.now();
    
    // 创建 Worker 线程
    const worker = new Worker(`
      const { parentPort } = require('worker_threads');
      
      function fibonacci(n) {
        if (n < 2) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
      }
      
      const result = fibonacci(40);
      parentPort.postMessage(result);
    `, { eval: true });
    
    worker.on('message', (result) => {
      const end = Date.now();
      console.log(`Worker 结果: ${result}`);
      console.log(`耗时: ${end - start}ms`);
      console.log('主线程始终保持响应\n');
      resolve(result);
    });
    
    worker.on('error', reject);
    
    // 演示主线程可以同时处理其他任务
    let counter = 0;
    const interval = setInterval(() => {
      console.log(`主线程仍在运行... (${++counter})`);
      if (counter >= 3) {
        clearInterval(interval);
      }
    }, 500);
  });
}

/**
 * 方案3: 子进程执行（完全隔离）
 */
async function childProcessDemo() {
  console.log('=== 子进程执行演示 ===');
  console.log('创建子进程计算...');
  
  return new Promise((resolve, reject) => {
    const start = Date.now();
    
    // 使用 spawn 创建子进程
    const child = spawn('node', ['-e', `
      function fibonacci(n) {
        if (n < 2) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
      }
      const result = fibonacci(35); // 稍小的数值，进程创建有开销
      console.log(result);
    `]);
    
    let output = '';
    child.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    child.on('close', (code) => {
      const end = Date.now();
      const result = parseInt(output.trim());
      console.log(`子进程结果: ${result}`);
      console.log(`耗时: ${end - start}ms (包含进程创建开销)`);
      console.log(`进程退出代码: ${code}\n`);
      resolve(result);
    });
    
    child.on('error', reject);
  });
}

/**
 * 演示进程间通信 (IPC)
 */
async function ipcDemo() {
  console.log('=== 进程间通信演示 ===');
  
  return new Promise((resolve, reject) => {
    // 使用 fork 创建子进程，自动建立 IPC 通道
    const child = fork(`data:text/javascript,
      process.on('message', (msg) => {
        if (msg.type === 'calculate') {
          function fibonacci(n) {
            if (n < 2) return n;
            return fibonacci(n - 1) + fibonacci(n - 2);
          }
          
          const result = fibonacci(msg.data);
          process.send({
            type: 'result',
            data: result,
            pid: process.pid
          });
        }
      });
      
      // 发送就绪信号
      process.send({ type: 'ready', pid: process.pid });
    `, [], { silent: true });
    
    child.on('message', (msg) => {
      switch (msg.type) {
        case 'ready':
          console.log(`子进程 ${msg.pid} 就绪`);
          // 发送计算任务
          child.send({ type: 'calculate', data: 35 });
          break;
          
        case 'result':
          console.log(`收到子进程 ${msg.pid} 的结果: ${msg.data}`);
          child.kill();
          resolve(msg.data);
          break;
      }
    });
    
    child.on('error', reject);
  });
}

/**
 * 比较不同方案的特点
 */
function compareApproaches() {
  console.log('=== 方案对比总结 ===');
  
  const comparison = [
    {
      方案: '单线程',
      创建开销: '无',
      内存共享: 'N/A',
      通信方式: 'N/A',
      故障隔离: '无',
      适用场景: '简单计算、IO密集'
    },
    {
      方案: 'Worker线程',
      创建开销: '低',
      内存共享: '有限共享',
      通信方式: 'postMessage',
      故障隔离: '部分隔离',
      适用场景: 'CPU密集、并行计算'
    },
    {
      方案: '子进程',
      创建开销: '高',
      内存共享: '完全隔离',
      通信方式: 'IPC/stdio',
      故障隔离: '完全隔离',
      适用场景: '不同语言、高安全要求'
    }
  ];
  
  console.table(comparison);
  
  console.log('\n前端开发中的选择建议:');
  console.log('1. UI响应性要求高 → Worker线程处理计算');
  console.log('2. 需要调用系统工具 → 子进程 (spawn/exec)');
  console.log('3. 微服务架构 → 多进程 + IPC');
  console.log('4. 简单任务 → 单线程 + 异步');
}

/**
 * 演示资源使用情况
 */
function showResourceUsage() {
  const usage = process.memoryUsage();
  console.log('\n=== 当前进程资源使用 ===');
  console.log(`进程 PID: ${process.pid}`);
  console.log(`RSS (常驻内存): ${(usage.rss / 1024 / 1024).toFixed(2)} MB`);
  console.log(`堆内存已用: ${(usage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`堆内存总计: ${(usage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`外部内存: ${(usage.external / 1024 / 1024).toFixed(2)} MB`);
  console.log(`CPU 核心数: ${cpus().length}`);
}

/**
 * 运行所有演示
 */
async function runAllDemos() {
  try {
    showResourceUsage();
    
    await singleThreadDemo();
    await workerThreadDemo();
    await childProcessDemo();
    await ipcDemo();
    
    compareApproaches();
    
  } catch (error) {
    console.error('演示过程出错:', error.message);
  }
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllDemos();
}

export { fibonacci, singleThreadDemo, workerThreadDemo, childProcessDemo };
