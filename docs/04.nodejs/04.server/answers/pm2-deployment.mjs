// PM2部署Node.js应用演示
const fs = require('fs').promises;
const path = require('path');
const { spawn, exec } = require('child_process');
const util = require('util');
const execAsync = util.promisify(exec);

/**
 * 1. PM2配置文件生成器
 */
class PM2ConfigGenerator {
  constructor() {
    this.defaultConfig = {
      name: 'my-app',
      script: './app.js',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      env_development: {
        NODE_ENV: 'development',
        PORT: 3001
      },
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      pid_file: './logs/pid'
    };
  }

  // 生成基础配置
  generateBasicConfig(options = {}) {
    const config = { ...this.defaultConfig, ...options };
    return {
      apps: [config]
    };
  }

  // 生成集群配置
  generateClusterConfig(options = {}) {
    const config = {
      ...this.defaultConfig,
      instances: options.instances || 'max',
      exec_mode: 'cluster',
      instance_var: 'INSTANCE_ID',
      ...options
    };

    return {
      apps: [config]
    };
  }

  // 生成多应用配置
  generateMultiAppConfig(apps = []) {
    return {
      apps: apps.map(app => ({
        ...this.defaultConfig,
        ...app
      }))
    };
  }

  // 生成生产环境配置
  generateProductionConfig(options = {}) {
    const config = {
      ...this.defaultConfig,
      instances: 4,
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '500M',
      node_args: '--max-old-space-size=4096',
      env: {
        NODE_ENV: 'production',
        PORT: 80
      },
      post_update: ['npm install', 'npm run build'],
      restart_delay: 4000,
      max_restarts: 10,
      min_uptime: '10s',
      ...options
    };

    return {
      apps: [config]
    };
  }

  // 保存配置到文件
  async saveConfig(config, filename = 'ecosystem.config.js') {
    const content = `module.exports = ${JSON.stringify(config, null, 2)};`;
    await fs.writeFile(filename, content, 'utf8');
    console.log(`PM2配置已保存到: ${filename}`);
    return filename;
  }
}

/**
 * 2. PM2部署管理器
 */
class PM2DeploymentManager {
  constructor() {
    this.configGenerator = new PM2ConfigGenerator();
  }

  // 检查PM2是否已安装
  async checkPM2Installed() {
    try {
      const { stdout } = await execAsync('pm2 --version');
      console.log(`PM2已安装，版本: ${stdout.trim()}`);
      return true;
    } catch (error) {
      console.log('PM2未安装，请运行: npm install -g pm2');
      return false;
    }
  }

  // 启动应用
  async startApp(configFile = 'ecosystem.config.js') {
    try {
      console.log('正在启动应用...');
      const { stdout, stderr } = await execAsync(`pm2 start ${configFile}`);
      
      if (stderr && !stderr.includes('PM2')) {
        throw new Error(stderr);
      }
      
      console.log('应用启动成功:');
      console.log(stdout);
      
      // 显示进程列表
      await this.showProcessList();
    } catch (error) {
      console.error('启动应用失败:', error.message);
    }
  }

  // 停止应用
  async stopApp(appName = 'all') {
    try {
      console.log(`正在停止应用: ${appName}`);
      const { stdout } = await execAsync(`pm2 stop ${appName}`);
      console.log(stdout);
    } catch (error) {
      console.error('停止应用失败:', error.message);
    }
  }

  // 重启应用
  async restartApp(appName = 'all') {
    try {
      console.log(`正在重启应用: ${appName}`);
      const { stdout } = await execAsync(`pm2 restart ${appName}`);
      console.log(stdout);
    } catch (error) {
      console.error('重启应用失败:', error.message);
    }
  }

  // 重载应用（零停机重启）
  async reloadApp(appName = 'all') {
    try {
      console.log(`正在重载应用: ${appName}`);
      const { stdout } = await execAsync(`pm2 reload ${appName}`);
      console.log(stdout);
    } catch (error) {
      console.error('重载应用失败:', error.message);
    }
  }

  // 显示进程列表
  async showProcessList() {
    try {
      const { stdout } = await execAsync('pm2 list');
      console.log('当前进程列表:');
      console.log(stdout);
    } catch (error) {
      console.error('获取进程列表失败:', error.message);
    }
  }

  // 显示实时日志
  async showLogs(appName = 'all') {
    console.log(`显示应用日志: ${appName}`);
    console.log('按 Ctrl+C 停止日志显示');
    
    const logProcess = spawn('pm2', ['logs', appName], { stdio: 'inherit' });
    
    return new Promise((resolve) => {
      logProcess.on('close', (code) => {
        console.log(`日志进程退出，代码: ${code}`);
        resolve(code);
      });
    });
  }

  // 监控应用
  async monitorApp() {
    try {
      console.log('启动PM2监控界面...');
      console.log('在浏览器中访问: http://localhost:9615');
      
      const monitorProcess = spawn('pm2', ['web'], { stdio: 'inherit' });
      
      setTimeout(() => {
        console.log('监控服务已启动，10秒后自动停止');
        monitorProcess.kill();
      }, 10000);
      
      return new Promise((resolve) => {
        monitorProcess.on('close', (code) => {
          console.log(`监控进程退出，代码: ${code}`);
          resolve(code);
        });
      });
    } catch (error) {
      console.error('启动监控失败:', error.message);
    }
  }

  // 保存进程快照
  async saveSnapshot() {
    try {
      const { stdout } = await execAsync('pm2 save');
      console.log('进程快照已保存:');
      console.log(stdout);
    } catch (error) {
      console.error('保存快照失败:', error.message);
    }
  }

  // 设置开机自启动
  async setupStartup() {
    try {
      const { stdout } = await execAsync('pm2 startup');
      console.log('开机自启动设置:');
      console.log(stdout);
      console.log('\n请复制上面的命令并以root权限执行');
    } catch (error) {
      console.error('设置开机自启动失败:', error.message);
    }
  }

  // 清理所有进程
  async cleanup() {
    try {
      console.log('清理所有PM2进程...');
      await execAsync('pm2 kill');
      console.log('PM2进程已全部清理');
    } catch (error) {
      console.error('清理失败:', error.message);
    }
  }
}

/**
 * 3. 应用健康检查器
 */
class HealthChecker {
  constructor(options = {}) {
    this.interval = options.interval || 30000; // 30秒检查一次
    this.endpoint = options.endpoint || 'http://localhost:3000/health';
    this.maxFailures = options.maxFailures || 3;
    this.failures = 0;
    this.timer = null;
  }

  // 开始健康检查
  start() {
    console.log(`开始健康检查，间隔: ${this.interval}ms`);
    this.timer = setInterval(() => {
      this.checkHealth();
    }, this.interval);
    
    // 立即执行一次检查
    this.checkHealth();
  }

  // 停止健康检查
  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
      console.log('健康检查已停止');
    }
  }

  // 执行健康检查
  async checkHealth() {
    try {
      const http = require('http');
      const url = new URL(this.endpoint);
      
      const options = {
        hostname: url.hostname,
        port: url.port || 80,
        path: url.pathname,
        method: 'GET',
        timeout: 5000
      };

      const req = http.request(options, (res) => {
        if (res.statusCode === 200) {
          console.log(`✅ 健康检查通过 [${new Date().toISOString()}]`);
          this.failures = 0;
        } else {
          this.handleFailure(`HTTP ${res.statusCode}`);
        }
      });

      req.on('error', (error) => {
        this.handleFailure(error.message);
      });

      req.on('timeout', () => {
        this.handleFailure('请求超时');
        req.destroy();
      });

      req.end();
    } catch (error) {
      this.handleFailure(error.message);
    }
  }

  // 处理检查失败
  handleFailure(reason) {
    this.failures++;
    console.log(`❌ 健康检查失败 (${this.failures}/${this.maxFailures}): ${reason}`);
    
    if (this.failures >= this.maxFailures) {
      console.log('🚨 应用健康检查连续失败，建议重启应用');
      this.failures = 0; // 重置计数器
    }
  }
}

/**
 * 4. 性能监控器
 */
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      cpu: [],
      memory: [],
      uptime: []
    };
  }

  // 开始性能监控
  async startMonitoring(duration = 30000) {
    console.log('开始性能监控...');
    const interval = 2000; // 2秒收集一次
    const samples = duration / interval;
    
    for (let i = 0; i < samples; i++) {
      await new Promise(resolve => setTimeout(resolve, interval));
      await this.collectMetrics();
    }
    
    this.generateReport();
  }

  // 收集性能指标
  async collectMetrics() {
    try {
      // 获取CPU使用率
      const cpuUsage = process.cpuUsage();
      const cpuPercent = (cpuUsage.user + cpuUsage.system) / 1000000; // 转换为毫秒
      
      // 获取内存使用
      const memUsage = process.memoryUsage();
      const memPercent = (memUsage.heapUsed / memUsage.heapTotal) * 100;
      
      // 获取运行时间
      const uptime = process.uptime();
      
      this.metrics.cpu.push(cpuPercent);
      this.metrics.memory.push({
        heapUsed: memUsage.heapUsed,
        heapTotal: memUsage.heapTotal,
        percentage: memPercent
      });
      this.metrics.uptime.push(uptime);
      
      console.log(`📊 CPU: ${cpuPercent.toFixed(2)}ms | 内存: ${memPercent.toFixed(1)}% | 运行时间: ${uptime.toFixed(0)}s`);
    } catch (error) {
      console.error('收集性能指标失败:', error.message);
    }
  }

  // 生成性能报告
  generateReport() {
    console.log('\n=== 性能监控报告 ===');
    
    // CPU统计
    const avgCpu = this.metrics.cpu.reduce((a, b) => a + b, 0) / this.metrics.cpu.length;
    const maxCpu = Math.max(...this.metrics.cpu);
    console.log(`CPU 平均使用: ${avgCpu.toFixed(2)}ms | 峰值: ${maxCpu.toFixed(2)}ms`);
    
    // 内存统计
    const memData = this.metrics.memory;
    const avgMemPercent = memData.reduce((a, b) => a + b.percentage, 0) / memData.length;
    const maxMemPercent = Math.max(...memData.map(m => m.percentage));
    const avgHeapUsed = memData.reduce((a, b) => a + b.heapUsed, 0) / memData.length;
    
    console.log(`内存 平均使用: ${avgMemPercent.toFixed(1)}% | 峰值: ${maxMemPercent.toFixed(1)}%`);
    console.log(`堆内存 平均: ${(avgHeapUsed / 1024 / 1024).toFixed(2)}MB`);
    
    // 运行时间
    const currentUptime = this.metrics.uptime[this.metrics.uptime.length - 1];
    console.log(`应用运行时间: ${(currentUptime / 3600).toFixed(2)} 小时`);
  }
}

/**
 * 5. 示例应用服务器
 */
class ExampleApp {
  constructor() {
    this.server = null;
    this.isRunning = false;
  }

  // 创建示例应用
  async createApp() {
    const appCode = `
const http = require('http');
const cluster = require('cluster');

// 健康检查端点
const healthCheck = (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    pid: process.pid
  }));
};

// 主应用逻辑
const server = http.createServer((req, res) => {
  const url = req.url;
  
  if (url === '/health') {
    return healthCheck(req, res);
  }
  
  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(\`
      <!DOCTYPE html>
      <html>
        <head><title>PM2 演示应用</title></head>
        <body>
          <h1>PM2 演示应用</h1>
          <p>进程ID: \${process.pid}</p>
          <p>运行时间: \${process.uptime().toFixed(2)} 秒</p>
          <p><a href="/health">健康检查</a></p>
        </body>
      </html>
    \`);
    return;
  }
  
  if (url === '/crash') {
    // 模拟应用崩溃
    console.log('模拟应用崩溃...');
    process.exit(1);
  }
  
  res.writeHead(404);
  res.end('Not Found');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(\`Worker \${process.pid} started on port \${PORT}\`);
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到SIGTERM信号，正在关闭服务器...');
  server.close(() => {
    process.exit(0);
  });
});
    `.trim();

    await fs.writeFile('demo-app.js', appCode);
    console.log('示例应用已创建: demo-app.js');
  }

  // 创建PM2配置
  async createPM2Config() {
    const generator = new PM2ConfigGenerator();
    const config = generator.generateProductionConfig({
      name: 'demo-app',
      script: 'demo-app.js',
      instances: 2,
      max_memory_restart: '100M'
    });
    
    await generator.saveConfig(config, 'demo.config.js');
  }

  // 清理文件
  async cleanup() {
    try {
      await fs.unlink('demo-app.js');
      await fs.unlink('demo.config.js');
      console.log('演示文件已清理');
    } catch (error) {
      // 忽略文件不存在的错误
    }
  }
}

/**
 * 主演示函数
 */
async function main() {
  console.log('PM2 Node.js 部署演示');
  console.log('=====================\n');

  const deployManager = new PM2DeploymentManager();
  const exampleApp = new ExampleApp();
  const healthChecker = new HealthChecker({
    endpoint: 'http://localhost:3000/health',
    interval: 5000
  });
  const perfMonitor = new PerformanceMonitor();

  try {
    // 1. 检查PM2是否安装
    console.log('1. 检查PM2安装状态');
    const pm2Installed = await deployManager.checkPM2Installed();
    
    if (!pm2Installed) {
      console.log('请先安装PM2: npm install -g pm2');
      return;
    }

    // 2. 创建示例应用和配置
    console.log('\n2. 创建示例应用');
    await exampleApp.createApp();
    await exampleApp.createPM2Config();

    // 3. 演示PM2配置生成
    console.log('\n3. PM2配置示例');
    const generator = new PM2ConfigGenerator();
    
    const basicConfig = generator.generateBasicConfig({
      name: 'basic-app',
      script: 'app.js'
    });
    console.log('基础配置:', JSON.stringify(basicConfig, null, 2));
    
    const clusterConfig = generator.generateClusterConfig({
      name: 'cluster-app',
      instances: 4
    });
    console.log('\n集群配置示例:', JSON.stringify(clusterConfig.apps[0], null, 2));

    // 4. 显示PM2命令用法
    console.log('\n4. PM2常用命令演示:');
    console.log('启动应用: pm2 start demo.config.js');
    console.log('查看列表: pm2 list');
    console.log('查看日志: pm2 logs');
    console.log('重启应用: pm2 restart demo-app');
    console.log('重载应用: pm2 reload demo-app');
    console.log('监控应用: pm2 monit');
    console.log('停止应用: pm2 stop demo-app');
    console.log('删除应用: pm2 delete demo-app');

    // 5. 演示性能监控
    console.log('\n5. 性能监控演示 (10秒)');
    await perfMonitor.startMonitoring(10000);

    // 6. 演示健康检查配置
    console.log('\n6. 健康检查配置示例');
    console.log('健康检查器配置:');
    console.log({
      endpoint: healthChecker.endpoint,
      interval: healthChecker.interval,
      maxFailures: healthChecker.maxFailures
    });

    // 7. PM2生态系统工具介绍
    console.log('\n7. PM2生态系统工具:');
    console.log('- PM2 Plus: 高级监控和管理 (https://app.pm2.io)');
    console.log('- KeyMetrics: 实时性能监控');
    console.log('- PM2 Deploy: 自动化部署');
    console.log('- PM2 Logs: 日志管理和搜索');

  } finally {
    // 清理
    console.log('\n清理演示文件...');
    await exampleApp.cleanup();
    console.log('演示完成！');
  }
}

// 如果直接运行此文件
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  PM2ConfigGenerator,
  PM2DeploymentManager,
  HealthChecker,
  PerformanceMonitor,
  ExampleApp
};
