// Node.js 负载监控示例
const os = require('os');
const cluster = require('cluster');

// 1. CPU 负载监控
function getCPULoad() {
  console.log('=== CPU 负载信息 ===');
  
  // 获取CPU核心数
  const cpuCount = os.cpus().length;
  console.log(`CPU 核心数: ${cpuCount}`);
  
  // 获取系统负载平均值
  const loadavg = os.loadavg();
  console.log(`系统负载 (1分钟): ${loadavg[0].toFixed(2)}`);
  console.log(`系统负载 (5分钟): ${loadavg[1].toFixed(2)}`);
  console.log(`系统负载 (15分钟): ${loadavg[2].toFixed(2)}`);
  
  // 负载率计算 (负载/核心数)
  const loadRate = (loadavg[0] / cpuCount * 100).toFixed(2);
  console.log(`负载率: ${loadRate}%`);
}

// 2. 内存使用监控
function getMemoryUsage() {
  console.log('\n=== 内存使用信息 ===');
  
  // 系统内存
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  
  console.log(`系统总内存: ${(totalMem / 1024 / 1024 / 1024).toFixed(2)} GB`);
  console.log(`系统空闲内存: ${(freeMem / 1024 / 1024 / 1024).toFixed(2)} GB`);
  console.log(`系统已用内存: ${(usedMem / 1024 / 1024 / 1024).toFixed(2)} GB`);
  console.log(`内存使用率: ${(usedMem / totalMem * 100).toFixed(2)}%`);
  
  // Node.js 进程内存
  const memUsage = process.memoryUsage();
  console.log('\n--- Node.js 进程内存 ---');
  console.log(`RSS (物理内存): ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Heap Used (堆已用): ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Heap Total (堆总计): ${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`External (外部内存): ${(memUsage.external / 1024 / 1024).toFixed(2)} MB`);
}

// 3. 进程负载监控
function getProcessLoad() {
  console.log('\n=== 进程负载信息 ===');
  
  // 进程运行时间
  const uptime = process.uptime();
  console.log(`进程运行时间: ${(uptime / 3600).toFixed(2)} 小时`);
  
  // CPU 使用时间
  const cpuUsage = process.cpuUsage();
  console.log(`用户 CPU 时间: ${(cpuUsage.user / 1000).toFixed(2)} ms`);
  console.log(`系统 CPU 时间: ${(cpuUsage.system / 1000).toFixed(2)} ms`);
  
  // 事件循环延迟(简单估算)
  const start = Date.now();
  setImmediate(() => {
    const delay = Date.now() - start;
    console.log(`事件循环延迟: ${delay} ms`);
  });
}

// 4. 实时监控函数
function startMonitoring(interval = 5000) {
  console.log(`开始监控，间隔: ${interval}ms`);
  console.log('按 Ctrl+C 停止监控\n');
  
  const monitor = () => {
    console.clear();
    console.log(`=== Node.js 负载监控 (${new Date().toLocaleString()}) ===`);
    
    getCPULoad();
    getMemoryUsage();
    getProcessLoad();
    
    console.log('\n' + '='.repeat(50));
  };
  
  // 立即执行一次
  monitor();
  
  // 定时监控
  const timer = setInterval(monitor, interval);
  
  // 优雅关闭
  process.on('SIGINT', () => {
    clearInterval(timer);
    console.log('\n监控已停止');
    process.exit(0);
  });
}

// 执行监控
if (require.main === module) {
  startMonitoring(3000);
}

module.exports = {
  getCPULoad,
  getMemoryUsage,
  getProcessLoad,
  startMonitoring
};
