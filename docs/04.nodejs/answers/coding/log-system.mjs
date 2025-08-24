// Node.js 日志系统设计实现
const fs = require('fs');
const path = require('path');
const util = require('util');
const EventEmitter = require('events');

/**
 * 日志级别定义
 */
const LOG_LEVELS = {
  ERROR: { name: 'ERROR', value: 0, color: '\x1b[31m' }, // 红色
  WARN: { name: 'WARN', value: 1, color: '\x1b[33m' },  // 黄色
  INFO: { name: 'INFO', value: 2, color: '\x1b[32m' },  // 绿色
  DEBUG: { name: 'DEBUG', value: 3, color: '\x1b[36m' }, // 青色
  TRACE: { name: 'TRACE', value: 4, color: '\x1b[37m' }  // 白色
};

const RESET_COLOR = '\x1b[0m';

/**
 * 日志格式化器
 */
class LogFormatter {
  constructor(options = {}) {
    this.template = options.template || '[{timestamp}] [{level}] [{category}] {message}';
    this.timestampFormat = options.timestampFormat || 'iso';
    this.colorize = options.colorize !== false;
  }

  format(logEntry) {
    const { level, message, category, timestamp, metadata } = logEntry;
    
    let formattedMessage = this.template
      .replace('{timestamp}', this.formatTimestamp(timestamp))
      .replace('{level}', level.name)
      .replace('{category}', category || 'APP')
      .replace('{message}', this.formatMessage(message));

    // 添加元数据
    if (metadata && Object.keys(metadata).length > 0) {
      formattedMessage += ' | ' + JSON.stringify(metadata);
    }

    // 添加颜色
    if (this.colorize && process.stdout.isTTY) {
      formattedMessage = level.color + formattedMessage + RESET_COLOR;
    }

    return formattedMessage;
  }

  formatTimestamp(timestamp) {
    switch (this.timestampFormat) {
      case 'iso':
        return timestamp.toISOString();
      case 'locale':
        return timestamp.toLocaleString();
      case 'epoch':
        return timestamp.getTime().toString();
      default:
        return timestamp.toISOString();
    }
  }

  formatMessage(message) {
    if (typeof message === 'string') {
      return message;
    }
    if (message instanceof Error) {
      return `${message.message}\n${message.stack}`;
    }
    return util.inspect(message, { depth: 3, colors: false });
  }
}

/**
 * 日志传输器基类
 */
class LogTransport extends EventEmitter {
  constructor(options = {}) {
    super();
    this.level = options.level || LOG_LEVELS.INFO;
    this.formatter = options.formatter || new LogFormatter(options);
    this.silent = options.silent || false;
  }

  shouldLog(level) {
    return !this.silent && level.value <= this.level.value;
  }

  log(logEntry) {
    throw new Error('log method must be implemented by subclass');
  }
}

/**
 * 控制台传输器
 */
class ConsoleTransport extends LogTransport {
  constructor(options = {}) {
    super(options);
    this.stream = options.stream || (
      options.level && options.level.value <= LOG_LEVELS.WARN.value
        ? process.stderr
        : process.stdout
    );
  }

  log(logEntry) {
    if (!this.shouldLog(logEntry.level)) {
      return;
    }

    const formatted = this.formatter.format(logEntry);
    this.stream.write(formatted + '\n');
    this.emit('logged', logEntry);
  }
}

/**
 * 文件传输器
 */
class FileTransport extends LogTransport {
  constructor(options = {}) {
    super(options);
    this.filename = options.filename || 'app.log';
    this.maxSize = options.maxSize || 10 * 1024 * 1024; // 10MB
    this.maxFiles = options.maxFiles || 5;
    this.dirname = options.dirname || './logs';
    this.writeStream = null;
    this.currentSize = 0;

    this.ensureDirectory();
    this.createWriteStream();
  }

  ensureDirectory() {
    if (!fs.existsSync(this.dirname)) {
      fs.mkdirSync(this.dirname, { recursive: true });
    }
  }

  createWriteStream() {
    const filepath = path.join(this.dirname, this.filename);
    
    // 检查现有文件大小
    try {
      const stats = fs.statSync(filepath);
      this.currentSize = stats.size;
    } catch (error) {
      this.currentSize = 0;
    }

    this.writeStream = fs.createWriteStream(filepath, { flags: 'a' });
    
    this.writeStream.on('error', (error) => {
      this.emit('error', error);
    });
  }

  log(logEntry) {
    if (!this.shouldLog(logEntry.level)) {
      return;
    }

    const formatted = this.formatter.format(logEntry) + '\n';
    const messageSize = Buffer.byteLength(formatted, 'utf8');

    // 检查是否需要轮转日志文件
    if (this.currentSize + messageSize > this.maxSize) {
      this.rotateLogFile();
    }

    this.writeStream.write(formatted);
    this.currentSize += messageSize;
    this.emit('logged', logEntry);
  }

  rotateLogFile() {
    this.writeStream.end();

    // 轮转现有文件
    for (let i = this.maxFiles - 1; i >= 1; i--) {
      const oldFile = path.join(this.dirname, `${this.filename}.${i}`);
      const newFile = path.join(this.dirname, `${this.filename}.${i + 1}`);
      
      try {
        if (fs.existsSync(oldFile)) {
          if (i === this.maxFiles - 1) {
            fs.unlinkSync(oldFile); // 删除最老的文件
          } else {
            fs.renameSync(oldFile, newFile);
          }
        }
      } catch (error) {
        this.emit('error', error);
      }
    }

    // 重命名当前文件
    const currentFile = path.join(this.dirname, this.filename);
    const rotatedFile = path.join(this.dirname, `${this.filename}.1`);
    
    try {
      if (fs.existsSync(currentFile)) {
        fs.renameSync(currentFile, rotatedFile);
      }
    } catch (error) {
      this.emit('error', error);
    }

    // 创建新的写入流
    this.currentSize = 0;
    this.createWriteStream();
  }

  close() {
    if (this.writeStream) {
      this.writeStream.end();
    }
  }
}

/**
 * HTTP传输器 - 将日志发送到远程服务器
 */
class HTTPTransport extends LogTransport {
  constructor(options = {}) {
    super(options);
    this.url = options.url || 'http://localhost:3000/logs';
    this.method = options.method || 'POST';
    this.headers = options.headers || { 'Content-Type': 'application/json' };
    this.batchSize = options.batchSize || 10;
    this.flushInterval = options.flushInterval || 5000;
    this.batch = [];
    this.timer = null;

    this.startBatchTimer();
  }

  log(logEntry) {
    if (!this.shouldLog(logEntry.level)) {
      return;
    }

    this.batch.push(logEntry);

    if (this.batch.length >= this.batchSize) {
      this.flush();
    }
  }

  startBatchTimer() {
    this.timer = setInterval(() => {
      if (this.batch.length > 0) {
        this.flush();
      }
    }, this.flushInterval);
  }

  flush() {
    if (this.batch.length === 0) {
      return;
    }

    const logs = this.batch.splice(0);
    const payload = JSON.stringify({ logs });

    // 使用内置http模块发送请求
    const url = new URL(this.url);
    const http = url.protocol === 'https:' ? require('https') : require('http');

    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: this.method,
      headers: {
        ...this.headers,
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = http.request(options, (res) => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        this.emit('error', new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
      } else {
        this.emit('sent', logs);
      }
    });

    req.on('error', (error) => {
      this.emit('error', error);
      // 将失败的日志重新放回批次队列
      this.batch.unshift(...logs);
    });

    req.write(payload);
    req.end();
  }

  close() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.flush();
  }
}

/**
 * 主日志器类
 */
class Logger extends EventEmitter {
  constructor(options = {}) {
    super();
    this.category = options.category || 'default';
    this.transports = options.transports || [];
    this.level = options.level || LOG_LEVELS.INFO;
    this.metadata = options.metadata || {};
  }

  addTransport(transport) {
    this.transports.push(transport);
    transport.on('error', (error) => {
      this.emit('error', error);
    });
    return this;
  }

  removeTransport(transport) {
    const index = this.transports.indexOf(transport);
    if (index !== -1) {
      this.transports.splice(index, 1);
    }
    return this;
  }

  log(level, message, metadata = {}) {
    if (!this.shouldLog(level)) {
      return;
    }

    const logEntry = {
      level,
      message,
      category: this.category,
      timestamp: new Date(),
      metadata: { ...this.metadata, ...metadata }
    };

    // 发送到所有传输器
    this.transports.forEach(transport => {
      try {
        transport.log(logEntry);
      } catch (error) {
        this.emit('error', error);
      }
    });

    this.emit('logged', logEntry);
  }

  shouldLog(level) {
    return level.value <= this.level.value;
  }

  // 便捷方法
  error(message, metadata) {
    return this.log(LOG_LEVELS.ERROR, message, metadata);
  }

  warn(message, metadata) {
    return this.log(LOG_LEVELS.WARN, message, metadata);
  }

  info(message, metadata) {
    return this.log(LOG_LEVELS.INFO, message, metadata);
  }

  debug(message, metadata) {
    return this.log(LOG_LEVELS.DEBUG, message, metadata);
  }

  trace(message, metadata) {
    return this.log(LOG_LEVELS.TRACE, message, metadata);
  }

  // 创建子日志器
  child(options = {}) {
    return new Logger({
      category: options.category || this.category,
      level: options.level || this.level,
      metadata: { ...this.metadata, ...options.metadata },
      transports: this.transports
    });
  }

  // 关闭所有传输器
  close() {
    this.transports.forEach(transport => {
      if (typeof transport.close === 'function') {
        transport.close();
      }
    });
  }
}

/**
 * 日志系统管理器
 */
class LogSystem {
  constructor() {
    this.loggers = new Map();
    this.defaultConfig = {
      level: LOG_LEVELS.INFO,
      transports: [
        new ConsoleTransport({
          level: LOG_LEVELS.DEBUG,
          colorize: true
        })
      ]
    };
  }

  // 获取或创建日志器
  getLogger(category = 'default', options = {}) {
    if (this.loggers.has(category)) {
      return this.loggers.get(category);
    }

    const config = { ...this.defaultConfig, ...options };
    const logger = new Logger({
      category,
      ...config
    });

    this.loggers.set(category, logger);
    return logger;
  }

  // 配置默认设置
  configure(config) {
    this.defaultConfig = { ...this.defaultConfig, ...config };
    return this;
  }

  // 关闭所有日志器
  shutdown() {
    for (const [category, logger] of this.loggers) {
      logger.close();
    }
    this.loggers.clear();
  }
}

// 创建全局日志系统实例
const logSystem = new LogSystem();

// 演示用法
function demonstrateLogSystem() {
  console.log('=== Node.js 日志系统演示 ===\n');

  // 1. 基础用法演示
  console.log('1. 基础日志记录演示');
  const logger = logSystem.getLogger('demo');

  logger.info('应用启动成功');
  logger.warn('这是一个警告消息');
  logger.error('这是一个错误消息');
  logger.debug('调试信息，可能不会显示');

  // 2. 带元数据的日志
  console.log('\n2. 带元数据的日志记录');
  logger.info('用户登录', {
    userId: '12345',
    ip: '192.168.1.1',
    userAgent: 'Mozilla/5.0...'
  });

  // 3. 错误对象日志
  console.log('\n3. 错误对象日志记录');
  try {
    throw new Error('示例错误');
  } catch (error) {
    logger.error(error);
  }

  // 4. 文件日志传输器
  console.log('\n4. 文件日志传输器演示');
  const fileLogger = new Logger({
    category: 'file-demo',
    transports: [
      new FileTransport({
        filename: 'demo.log',
        level: LOG_LEVELS.INFO,
        maxSize: 1024, // 1KB for demo
        maxFiles: 3
      })
    ]
  });

  // 生成一些日志来演示文件轮转
  for (let i = 1; i <= 20; i++) {
    fileLogger.info(`这是第 ${i} 条日志消息，用于演示文件轮转功能。`.repeat(3));
  }

  // 5. 子日志器演示
  console.log('\n5. 子日志器演示');
  const childLogger = logger.child({
    category: 'auth-service',
    metadata: { service: 'authentication', version: '1.0.0' }
  });

  childLogger.info('认证服务初始化完成');
  childLogger.error('认证失败', { username: 'john_doe', reason: 'invalid_password' });

  // 6. HTTP传输器演示（模拟）
  console.log('\n6. HTTP传输器演示（仅创建，不实际发送）');
  const httpTransport = new HTTPTransport({
    url: 'http://localhost:3000/logs',
    batchSize: 5,
    level: LOG_LEVELS.WARN
  });

  const httpLogger = new Logger({
    category: 'http-demo',
    transports: [httpTransport]
  });

  // 模拟一些日志
  httpLogger.warn('这将被发送到HTTP端点');
  httpLogger.error('HTTP传输器错误测试');

  // 7. 自定义格式化器
  console.log('\n7. 自定义格式化器演示');
  const customFormatter = new LogFormatter({
    template: '{timestamp} | {level} | {message}',
    timestampFormat: 'locale',
    colorize: true
  });

  const customLogger = new Logger({
    category: 'custom',
    transports: [
      new ConsoleTransport({
        formatter: customFormatter,
        level: LOG_LEVELS.DEBUG
      })
    ]
  });

  customLogger.info('使用自定义格式的日志消息');
  customLogger.debug('自定义调试信息');

  // 清理资源
  setTimeout(() => {
    console.log('\n清理演示资源...');
    fileLogger.close();
    httpTransport.close();
    
    // 删除演示日志文件
    try {
      const logDir = './logs';
      if (fs.existsSync(logDir)) {
        const files = fs.readdirSync(logDir);
        files.forEach(file => {
          if (file.startsWith('demo.log')) {
            fs.unlinkSync(path.join(logDir, file));
          }
        });
        fs.rmdirSync(logDir);
      }
    } catch (error) {
      console.error('清理文件时出错:', error);
    }
    
    console.log('日志系统演示完成');
  }, 3000);
}

// Express.js 集成中间件
function createLoggerMiddleware(options = {}) {
  const logger = logSystem.getLogger('http', options);
  
  return (req, res, next) => {
    const start = Date.now();
    
    // 记录请求开始
    logger.info('Request started', {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    // 监听响应完成
    res.on('finish', () => {
      const duration = Date.now() - start;
      const level = res.statusCode >= 400 ? LOG_LEVELS.ERROR : LOG_LEVELS.INFO;
      
      logger.log(level, 'Request completed', {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        contentLength: res.get('content-length')
      });
    });

    next();
  };
}

// 如果直接运行此文件，则执行演示
if (require.main === module) {
  demonstrateLogSystem();
}

module.exports = {
  LOG_LEVELS,
  LogFormatter,
  LogTransport,
  ConsoleTransport,
  FileTransport,
  HTTPTransport,
  Logger,
  LogSystem,
  logSystem,
  createLoggerMiddleware,
  demonstrateLogSystem
};
