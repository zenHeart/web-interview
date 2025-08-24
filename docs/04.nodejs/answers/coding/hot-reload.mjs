// Node.js 热更新实现示例
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const chokidar = require('chokidar'); // npm install chokidar

/**
 * 简单的模块热更新实现
 */
class SimpleHotReload {
  constructor() {
    this.cache = new Map(); // 模块缓存
    this.watchers = new Map(); // 文件监听器
    this.callbacks = new Map(); // 变更回调
  }

  // 加载模块并监听文件变化
  require(modulePath) {
    const absolutePath = path.resolve(modulePath);
    
    // 如果已经缓存，直接返回
    if (this.cache.has(absolutePath)) {
      return this.cache.get(absolutePath);
    }

    try {
      // 动态导入模块
      delete require.cache[absolutePath];
      const module = require(absolutePath);
      
      // 缓存模块
      this.cache.set(absolutePath, module);
      
      // 监听文件变化
      this.watchFile(absolutePath);
      
      return module;
    } catch (error) {
      console.error(`加载模块失败: ${modulePath}`, error);
      return null;
    }
  }

  // 监听文件变化
  watchFile(filePath) {
    if (this.watchers.has(filePath)) {
      return;
    }

    const watcher = chokidar.watch(filePath, {
      ignoreInitial: true,
      persistent: true
    });

    watcher.on('change', () => {
      console.log(`文件变化检测到: ${filePath}`);
      this.reloadModule(filePath);
    });

    watcher.on('unlink', () => {
      console.log(`文件被删除: ${filePath}`);
      this.unloadModule(filePath);
    });

    this.watchers.set(filePath, watcher);
  }

  // 重新加载模块
  reloadModule(filePath) {
    try {
      // 清除require缓存
      delete require.cache[filePath];
      
      // 重新加载模块
      const newModule = require(filePath);
      const oldModule = this.cache.get(filePath);
      
      // 更新缓存
      this.cache.set(filePath, newModule);
      
      // 触发回调
      const callback = this.callbacks.get(filePath);
      if (callback) {
        callback(newModule, oldModule);
      }
      
      console.log(`模块热更新成功: ${filePath}`);
    } catch (error) {
      console.error(`模块热更新失败: ${filePath}`, error);
    }
  }

  // 卸载模块
  unloadModule(filePath) {
    // 清除缓存
    this.cache.delete(filePath);
    delete require.cache[filePath];
    
    // 关闭文件监听
    const watcher = this.watchers.get(filePath);
    if (watcher) {
      watcher.close();
      this.watchers.delete(filePath);
    }
    
    // 清除回调
    this.callbacks.delete(filePath);
  }

  // 注册模块变更回调
  onModuleChange(modulePath, callback) {
    const absolutePath = path.resolve(modulePath);
    this.callbacks.set(absolutePath, callback);
  }

  // 关闭所有监听器
  destroy() {
    for (const [filePath, watcher] of this.watchers) {
      watcher.close();
    }
    this.watchers.clear();
    this.cache.clear();
    this.callbacks.clear();
  }
}

/**
 * HTTP服务器热更新实现
 */
class HTTPServerHotReload {
  constructor(port = 3000) {
    this.port = port;
    this.server = null;
    this.hotReload = new SimpleHotReload();
  }

  start() {
    // 加载路由模块
    const router = this.hotReload.require('./router');
    
    // 创建HTTP服务器
    const http = require('http');
    this.server = http.createServer((req, res) => {
      try {
        // 获取当前路由模块
        const currentRouter = this.hotReload.cache.get(path.resolve('./router'));
        if (currentRouter && typeof currentRouter.handle === 'function') {
          currentRouter.handle(req, res);
        } else {
          res.writeHead(500);
          res.end('Router module not found or invalid');
        }
      } catch (error) {
        console.error('Request handling error:', error);
        res.writeHead(500);
        res.end('Internal Server Error');
      }
    });

    // 监听路由模块变化
    this.hotReload.onModuleChange('./router', (newRouter, oldRouter) => {
      console.log('路由模块已热更新');
      // 可以在这里执行一些清理工作
      if (oldRouter && typeof oldRouter.cleanup === 'function') {
        oldRouter.cleanup();
      }
    });

    this.server.listen(this.port, () => {
      console.log(`HTTP服务器启动在端口 ${this.port}`);
      console.log('支持热更新，修改 router.js 文件试试');
    });
  }

  stop() {
    if (this.server) {
      this.server.close();
    }
    this.hotReload.destroy();
  }
}

/**
 * 配置文件热更新实现
 */
class ConfigHotReload {
  constructor(configPath) {
    this.configPath = path.resolve(configPath);
    this.config = {};
    this.callbacks = [];
    this.watcher = null;
    
    this.loadConfig();
    this.watchConfig();
  }

  // 加载配置文件
  loadConfig() {
    try {
      const content = fs.readFileSync(this.configPath, 'utf8');
      this.config = JSON.parse(content);
      console.log('配置文件加载成功:', this.configPath);
    } catch (error) {
      console.error('配置文件加载失败:', error);
      this.config = {};
    }
  }

  // 监听配置文件变化
  watchConfig() {
    this.watcher = chokidar.watch(this.configPath, {
      ignoreInitial: true
    });

    this.watcher.on('change', () => {
      console.log('配置文件变化检测到');
      const oldConfig = { ...this.config };
      this.loadConfig();
      
      // 触发变更回调
      this.callbacks.forEach(callback => {
        try {
          callback(this.config, oldConfig);
        } catch (error) {
          console.error('配置变更回调执行失败:', error);
        }
      });
    });
  }

  // 获取配置
  get(key) {
    return key ? this.config[key] : this.config;
  }

  // 注册配置变更回调
  onChange(callback) {
    this.callbacks.push(callback);
  }

  // 销毁监听器
  destroy() {
    if (this.watcher) {
      this.watcher.close();
    }
    this.callbacks = [];
  }
}

// 演示用法
function demonstrateHotReload() {
  console.log('=== Node.js 热更新演示 ===\n');

  // 1. 简单模块热更新演示
  console.log('1. 简单模块热更新演示');
  const hotReload = new SimpleHotReload();
  
  // 创建一个示例模块文件
  const moduleContent = `
// 示例模块 - 计算器
module.exports = {
  add: (a, b) => {
    console.log(\`执行加法: \${a} + \${b} = \${a + b}\`);
    return a + b;
  },
  version: '1.0.0'
};
  `;
  
  fs.writeFileSync('./example-module.js', moduleContent.trim());
  
  // 加载模块
  let calculator = hotReload.require('./example-module.js');
  console.log('初始版本:', calculator.version);
  console.log('执行计算:', calculator.add(2, 3));

  // 监听模块变化
  hotReload.onModuleChange('./example-module.js', (newModule, oldModule) => {
    console.log('模块已更新!');
    console.log('新版本:', newModule.version);
    console.log('旧版本:', oldModule.version);
    calculator = newModule; // 更新引用
  });

  // 2. 配置热更新演示
  setTimeout(() => {
    console.log('\n2. 配置热更新演示');
    
    // 创建配置文件
    const configContent = {
      port: 3000,
      debug: false,
      maxConnections: 100
    };
    
    fs.writeFileSync('./config.json', JSON.stringify(configContent, null, 2));
    
    // 配置热更新
    const config = new ConfigHotReload('./config.json');
    
    config.onChange((newConfig, oldConfig) => {
      console.log('配置已更新!');
      console.log('新配置:', JSON.stringify(newConfig, null, 2));
    });
    
    console.log('当前配置:', JSON.stringify(config.get(), null, 2));
    
    // 3. 演示配置变更
    setTimeout(() => {
      console.log('\n3. 模拟配置文件变更');
      const updatedConfig = {
        port: 8080,
        debug: true,
        maxConnections: 200,
        newFeature: 'enabled'
      };
      
      fs.writeFileSync('./config.json', JSON.stringify(updatedConfig, null, 2));
    }, 2000);
    
    // 4. 演示模块文件变更
    setTimeout(() => {
      console.log('\n4. 模拟模块文件变更');
      const updatedModuleContent = `
// 示例模块 - 增强版计算器
module.exports = {
  add: (a, b) => {
    const result = a + b;
    console.log(\`执行加法: \${a} + \${b} = \${result}\`);
    return result;
  },
  subtract: (a, b) => {
    const result = a - b;
    console.log(\`执行减法: \${a} - \${b} = \${result}\`);
    return result;
  },
  version: '2.0.0'
};
      `;
      
      fs.writeFileSync('./example-module.js', updatedModuleContent.trim());
      
      // 测试更新后的功能
      setTimeout(() => {
        console.log('测试更新后的模块:');
        console.log('加法:', calculator.add(5, 3));
        if (calculator.subtract) {
          console.log('减法:', calculator.subtract(10, 4));
        }
      }, 1000);
    }, 4000);
    
    // 清理资源
    setTimeout(() => {
      console.log('\n清理演示资源...');
      hotReload.destroy();
      config.destroy();
      
      // 删除示例文件
      try {
        fs.unlinkSync('./example-module.js');
        fs.unlinkSync('./config.json');
      } catch (error) {
        // 忽略删除错误
      }
      
      console.log('演示结束');
    }, 8000);
    
  }, 1000);
}

// Express.js 风格的热更新中间件
function createHotReloadMiddleware(options = {}) {
  const { watchDirs = ['./routes', './middleware'], ignored = /node_modules/ } = options;
  const hotReload = new SimpleHotReload();
  
  return {
    // 中间件函数
    middleware: (req, res, next) => {
      // 为每个请求重新加载模块
      req.hotReload = hotReload;
      next();
    },
    
    // 监听指定目录
    watch: () => {
      watchDirs.forEach(dir => {
        const watcher = chokidar.watch(dir, {
          ignored,
          ignoreInitial: false,
          persistent: true
        });
        
        watcher.on('change', (filePath) => {
          console.log(`文件变化: ${filePath}`);
          // 清除该文件及其依赖的缓存
          delete require.cache[path.resolve(filePath)];
        });
      });
    },
    
    // 销毁
    destroy: () => {
      hotReload.destroy();
    }
  };
}

// 如果直接运行此文件，则执行演示
if (require.main === module) {
  demonstrateHotReload();
}

module.exports = {
  SimpleHotReload,
  HTTPServerHotReload,
  ConfigHotReload,
  createHotReloadMiddleware,
  demonstrateHotReload
};
