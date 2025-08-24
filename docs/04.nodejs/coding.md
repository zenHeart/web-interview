# Node.js编程题✅

本章节涵盖Node.js开发中的典型编程题，包括热更新实现、日志系统设计等实际应用场景。

## 什么是热更新，Node.js如何实现热更新？ {#P0-hot-update}

<Answer>

### 核心概念

热更新(Hot Reload)是指在应用运行时动态更新代码，无需重启整个应用程序。在Node.js中，热更新主要通过监听文件变化、清除模块缓存、重新加载模块来实现。

### 实现原理

#### 1. 文件监听机制

* 使用`fs.watch()`或第三方库如`chokidar`监听文件变化
* 检测`.js`、`.json`等模块文件的修改、删除事件

#### 2. 模块缓存管理

* Node.js使用`require.cache`缓存已加载的模块
* 热更新时需要删除对应模块的缓存
* 重新`require()`模块获取最新代码

#### 3. 依赖关系处理

* 清理被修改模块的依赖模块缓存
* 处理循环依赖的情况
* 保持应用状态的一致性

**示例实现:**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import hotReload from '!!raw-loader!./answers/coding/hot-reload.mjs';

<Tabs>
<TabItem value="hot-reload-demo" label="热更新实现">

<Sandpack
  template="node"
  options={{
    showConsole: true,
    editorHeight: 600
  }}
  files={{
    "/index.js": hotReload,
  }}
/>

</TabItem>
<TabItem value="implementation-details" label="实现细节">

**基础热更新流程:**

```javascript
// 1. 监听文件变化
const watcher = chokidar.watch('./src', {
  ignoreInitial: true
});

watcher.on('change', (filePath) => {
  // 2. 清除模块缓存
  delete require.cache[require.resolve(filePath)];
  
  // 3. 重新加载模块
  const newModule = require(filePath);
  
  // 4. 触发更新回调
  onModuleChange(newModule);
});
```

**HTTP服务器热更新:**

```javascript
// 路由热更新示例
const server = http.createServer((req, res) => {
  // 每次请求时获取最新的路由模块
  const currentRouter = hotReload.require('./router');
  currentRouter.handle(req, res);
});
```

</TabItem>
</Tabs>

**应用场景:**

**开发环境:**

* 提升开发效率，无需频繁重启应用
* 保持应用状态，如WebSocket连接、内存数据
* 快速验证代码修改效果

**生产环境:**

* 配置文件热更新，如数据库连接配置
* 业务规则热更新，如价格策略、权限配置
* 模板文件热更新，如邮件模板、页面模板

**注意事项:**

* **内存泄漏**: 未正确清理的定时器、事件监听器会导致内存泄漏
* **状态一致性**: 模块更新可能导致应用状态不一致
* **依赖管理**: 复杂的依赖关系需要仔细处理
* **错误处理**: 新代码可能包含语法错误，需要优雅处理

### 面试官视角

该题考察候选人对Node.js模块系统和文件监听的理解：

* **要点清单**: 理解require.cache机制；掌握文件监听API；能设计热更新方案；了解注意事项
* **加分项**: 有实际热更新开发经验；了解生产环境应用；能处理复杂依赖关系；考虑性能和稳定性
* **常见失误**: 只知道基本概念；不了解缓存清理；忽视内存泄漏；缺乏错误处理

### 延伸阅读

* [Node.js模块系统详解](https://nodejs.org/api/modules.html) — 官方模块系统文档
* [《深入浅出Node.js》](https://book.douban.com/subject/25768396/) — Node.js模块机制深度解析

</Answer>

## 如何设计一个日志系统？ {#P0-log-system}

<Answer>

### 核心概念

日志系统是应用程序的重要基础设施，用于记录、管理和分析应用运行时的各种信息。一个完善的日志系统应该包括日志级别、格式化、传输、轮转等功能。

### 日志系统架构

#### 1. 日志级别管理

* ERROR: 错误信息，需要立即处理
* WARN: 警告信息，需要关注
* INFO: 一般信息，记录重要事件
* DEBUG: 调试信息，开发时使用
* TRACE: 跟踪信息，详细执行流程

#### 2. 日志格式化

* 时间戳: ISO 8601格式或自定义格式
* 级别标识: 清晰的级别标记
* 分类标签: 模块或服务标识
* 消息内容: 实际日志信息
* 元数据: 上下文信息，如用户ID、请求ID

#### 3. 传输器设计

* Console传输器: 控制台输出
* File传输器: 文件存储，支持轮转
* HTTP传输器: 远程日志服务
* Database传输器: 数据库存储

**示例实现:**

import logSystem from '!!raw-loader!./answers/coding/log-system.mjs';

<Tabs>
<TabItem value="log-system-demo" label="日志系统实现">

<Sandpack
  template="node"
  options={{
    showConsole: true,
    editorHeight: 600
  }}
  files={{
    "/index.js": logSystem,
  }}
/>

</TabItem>
<TabItem value="design-patterns" label="设计模式">

**观察者模式:**

```javascript
class Logger extends EventEmitter {
  log(level, message, metadata) {
    const logEntry = { level, message, timestamp: new Date(), metadata };
    
    // 触发事件
    this.emit('logged', logEntry);
    
    // 发送给所有传输器
    this.transports.forEach(transport => {
      transport.log(logEntry);
    });
  }
}
```

**策略模式:**

```javascript
class LogFormatter {
  format(logEntry) {
    // 根据配置选择不同的格式化策略
    return this.formatStrategy.format(logEntry);
  }
}
```

**责任链模式:**

```javascript
class LoggerChain {
  setNext(logger) {
    this.nextLogger = logger;
    return logger;
  }
  
  handle(logEntry) {
    if (this.canHandle(logEntry)) {
      this.process(logEntry);
    }
    if (this.nextLogger) {
      this.nextLogger.handle(logEntry);
    }
  }
}
```

</TabItem>
</Tabs>

### 高级特性

#### 1. 日志轮转

* 按大小轮转: 文件超过指定大小时创建新文件
* 按时间轮转: 按天、小时轮转日志文件
* 压缩归档: 旧日志文件压缩存储
* 自动清理: 删除过期的日志文件

#### 2. 结构化日志

* JSON格式: 便于机器解析和检索
* 统一字段: 标准的字段名称和格式
* 元数据丰富: 包含足够的上下文信息

#### 3. 性能优化

* 异步写入: 避免阻塞主线程
* 批量写入: 减少I/O操作次数
* 缓冲机制: 内存缓冲提升性能
* 采样日志: 高频日志采样记录

#### 4. 监控告警

* 错误统计: 统计错误日志数量和类型
* 性能指标: 记录应用性能数据
* 告警触发: 根据日志内容触发告警
* 健康检查: 日志系统自身的健康监控

**生产环境考虑:**

**安全性:**

* 敏感信息过滤: 避免记录密码、令牌等
* 访问控制: 限制日志文件访问权限
* 数据脱敏: 对个人信息进行脱敏处理

**可靠性:**

* 故障恢复: 传输器故障时的处理机制
* 数据完整性: 确保日志不丢失
* 备份策略: 重要日志的备份方案

**可扩展性:**

* 插件化架构: 支持自定义传输器和格式化器
* 配置管理: 支持动态配置更新
* 多实例支持: 支持分布式应用日志聚合

**集成示例:**

```javascript
// Express.js 集成
const express = require('express');
const { logSystem } = require('./log-system');

const app = express();
const logger = logSystem.getLogger('web');

// 请求日志中间件
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('Request processed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`
    });
  });
  
  next();
});

// 错误处理
app.use((error, req, res, next) => {
  logger.error('Request error', {
    error: error.message,
    stack: error.stack,
    url: req.url
  });
  next(error);
});
```

### 面试官视角

该题考察候选人的系统设计能力：

* **要点清单**: 理解日志系统架构；掌握设计模式应用；考虑性能和可靠性；有实际开发经验
* **加分项**: 有大型系统日志设计经验；了解ELK等日志栈；考虑分布式日志聚合；有监控告警经验
* **常见失误**: 设计过于简单；不考虑性能问题；忽视安全性；缺乏扩展性设计

### 延伸阅读

* [Winston日志库设计](https://github.com/winstonjs/winston) — Node.js主流日志库
* [《高性能日志系统设计》](https://example.com) — 企业级日志系统设计实践

</Answer>
