// Express 中间件工作原理演示
const express = require('express');
const app = express();

// 模拟数据库
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' },
  { id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', role: 'user' }
];

/**
 * 1. 基础中间件示例
 */
function basicLoggingMiddleware(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // 必须调用next()传递控制权
}

/**
 * 2. 认证中间件 - 责任链模式实现
 */
function authenticate(req, res, next) {
  const token = req.headers.authorization;
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  // 模拟token验证
  if (token === 'Bearer valid-token') {
    req.user = { id: 1, name: 'Alice', role: 'admin' };
    next(); // 验证通过，继续下一个中间件
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
}

/**
 * 3. 权限检查中间件工厂函数
 */
function authorize(requiredRole) {
  return function(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    
    if (req.user.role !== requiredRole && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
}

/**
 * 4. 错误处理中间件
 */
function errorHandler(err, req, res, next) {
  console.error('Error occurred:', err);
  
  // 如果响应已经发送，将错误传递给默认的Express错误处理器
  if (res.headersSent) {
    return next(err);
  }
  
  // 根据错误类型返回不同的状态码
  let statusCode = 500;
  let message = 'Internal Server Error';
  
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Unauthorized';
  }
  
  res.status(statusCode).json({
    error: message,
    timestamp: new Date().toISOString(),
    path: req.path
  });
}

/**
 * 5. 请求验证中间件
 */
function validateUserInput(req, res, next) {
  const { name, email } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    const error = new Error('Name is required and must be a non-empty string');
    error.name = 'ValidationError';
    return next(error);
  }
  
  if (!email || !email.includes('@')) {
    const error = new Error('Valid email is required');
    error.name = 'ValidationError';
    return next(error);
  }
  
  // 验证通过，继续执行
  next();
}

/**
 * 6. 响应时间统计中间件
 */
function responseTime(req, res, next) {
  const start = Date.now();
  
  // 监听响应完成事件
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Request to ${req.path} took ${duration}ms`);
  });
  
  next();
}

/**
 * 7. CORS中间件实现
 */
function corsMiddleware(options = {}) {
  const {
    origin = '*',
    methods = 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders = 'Content-Type,Authorization',
    credentials = false
  } = options;
  
  return function(req, res, next) {
    // 设置CORS头
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Methods', methods);
    res.header('Access-Control-Allow-Headers', allowedHeaders);
    
    if (credentials) {
      res.header('Access-Control-Allow-Credentials', 'true');
    }
    
    // 处理预检请求
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    
    next();
  };
}

/**
 * 8. 缓存中间件
 */
const cache = new Map();

function cacheMiddleware(duration = 300000) { // 默认5分钟
  return function(req, res, next) {
    // 只缓存GET请求
    if (req.method !== 'GET') {
      return next();
    }
    
    const key = req.originalUrl;
    const cached = cache.get(key);
    
    if (cached && Date.now() - cached.timestamp < duration) {
      console.log(`Cache hit for ${key}`);
      return res.json(cached.data);
    }
    
    // 保存原始的res.json方法
    const originalJson = res.json;
    
    // 重写res.json方法以缓存响应
    res.json = function(data) {
      cache.set(key, {
        data: data,
        timestamp: Date.now()
      });
      
      console.log(`Cached response for ${key}`);
      return originalJson.call(this, data);
    };
    
    next();
  };
}

/**
 * 9. 中间件执行顺序演示
 */
function middlewareOrderDemo() {
  console.log('=== Express 中间件执行顺序演示 ===');
  
  // 全局中间件 - 按顺序执行
  app.use(corsMiddleware());
  app.use(responseTime);
  app.use(basicLoggingMiddleware);
  app.use(express.json()); // 解析JSON请求体
  
  // 路由级中间件
  app.get('/users', 
    cacheMiddleware(60000), // 缓存1分钟
    (req, res) => {
      res.json(users);
    }
  );
  
  // 需要认证的路由
  app.get('/profile',
    authenticate,
    (req, res) => {
      res.json(req.user);
    }
  );
  
  // 需要管理员权限的路由
  app.delete('/users/:id',
    authenticate,
    authorize('admin'),
    (req, res) => {
      const userId = parseInt(req.params.id);
      const userIndex = users.findIndex(u => u.id === userId);
      
      if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      users.splice(userIndex, 1);
      res.json({ message: 'User deleted successfully' });
    }
  );
  
  // 带验证的POST路由
  app.post('/users',
    authenticate,
    authorize('admin'),
    validateUserInput,
    (req, res) => {
      const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        role: req.body.role || 'user'
      };
      
      users.push(newUser);
      res.status(201).json(newUser);
    }
  );
  
  // 触发错误的路由
  app.get('/error', (req, res, next) => {
    const error = new Error('This is a test error');
    error.name = 'TestError';
    next(error); // 传递错误给错误处理中间件
  });
  
  // 错误处理中间件必须放在最后
  app.use(errorHandler);
  
  // 404处理
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Route not found',
      path: req.originalUrl
    });
  });
}

/**
 * 10. 自定义中间件类 - 更高级的封装
 */
class MiddlewareManager {
  constructor() {
    this.middlewares = [];
  }
  
  use(middleware) {
    this.middlewares.push(middleware);
    return this;
  }
  
  // 创建一个处理函数，按顺序执行所有中间件
  getHandler() {
    return (req, res) => {
      let index = 0;
      
      const next = (error) => {
        if (error) {
          // 查找错误处理中间件
          const errorMiddleware = this.middlewares.find(mw => mw.length === 4);
          if (errorMiddleware) {
            return errorMiddleware(error, req, res, () => {});
          }
          throw error;
        }
        
        if (index >= this.middlewares.length) {
          return; // 所有中间件执行完毕
        }
        
        const middleware = this.middlewares[index++];
        
        try {
          if (middleware.length === 4) {
            // 跳过错误处理中间件
            next();
          } else {
            middleware(req, res, next);
          }
        } catch (err) {
          next(err);
        }
      };
      
      next();
    };
  }
}

/**
 * 演示自定义中间件管理器
 */
function demonstrateMiddlewareManager() {
  const manager = new MiddlewareManager();
  
  manager
    .use((req, res, next) => {
      console.log('Middleware 1: Request received');
      next();
    })
    .use((req, res, next) => {
      console.log('Middleware 2: Processing request');
      req.processed = true;
      next();
    })
    .use((req, res, next) => {
      console.log('Middleware 3: Finalizing');
      res.json({ processed: req.processed });
    });
  
  return manager.getHandler();
}

// 启动演示服务器
function startServer() {
  middlewareOrderDemo();
  
  // 自定义路由使用中间件管理器
  const customHandler = demonstrateMiddlewareManager();
  app.get('/custom', customHandler);
  
  const PORT = process.env.PORT || 3000;
  
  const server = app.listen(PORT, () => {
    console.log(`🚀 Express middleware demo server started on port ${PORT}`);
    console.log('\n📝 可以测试的路由:');
    console.log(`  GET  http://localhost:${PORT}/users`);
    console.log(`  GET  http://localhost:${PORT}/profile (需要 Authorization: Bearer valid-token)`);
    console.log(`  POST http://localhost:${PORT}/users (需要认证和管理员权限)`);
    console.log(`  DELETE http://localhost:${PORT}/users/1 (需要认证和管理员权限)`);
    console.log(`  GET  http://localhost:${PORT}/error (测试错误处理)`);
    console.log(`  GET  http://localhost:${PORT}/custom (自定义中间件管理器)`);
    console.log('\n💡 测试命令示例:');
    console.log('  curl http://localhost:3000/users');
    console.log('  curl -H "Authorization: Bearer valid-token" http://localhost:3000/profile');
    
    // 演示完成后自动关闭服务器
    setTimeout(() => {
      console.log('\n✅ 演示完成，关闭服务器');
      server.close();
    }, 30000);
  });
  
  return server;
}

// 模拟中间件测试
function simulateMiddlewareFlow() {
  console.log('\n=== 中间件执行流程模拟 ===');
  
  // 模拟请求对象
  const mockReq = {
    method: 'GET',
    url: '/users',
    headers: { 'authorization': 'Bearer valid-token' },
    user: null
  };
  
  // 模拟响应对象
  const mockRes = {
    status: (code) => {
      mockRes.statusCode = code;
      return mockRes;
    },
    json: (data) => {
      console.log(`响应 [${mockRes.statusCode || 200}]:`, JSON.stringify(data, null, 2));
      return mockRes;
    }
  };
  
  // 执行中间件链
  console.log('1. 开始执行中间件链...');
  
  basicLoggingMiddleware(mockReq, mockRes, () => {
    console.log('2. 日志中间件执行完成');
    
    authenticate(mockReq, mockRes, () => {
      console.log('3. 认证中间件执行完成，用户:', mockReq.user);
      
      // 模拟路由处理器
      console.log('4. 执行路由处理器');
      mockRes.json({ message: '中间件链执行成功', user: mockReq.user });
    });
  });
}

// 如果直接运行此文件
if (require.main === module) {
  console.log('Express 中间件工作原理演示');
  console.log('================================');
  
  // 首先运行模拟演示
  simulateMiddlewareFlow();
  
  // 然后启动实际服务器
  setTimeout(() => {
    startServer();
  }, 2000);
}

module.exports = {
  basicLoggingMiddleware,
  authenticate,
  authorize,
  errorHandler,
  validateUserInput,
  responseTime,
  corsMiddleware,
  cacheMiddleware,
  MiddlewareManager,
  startServer,
  simulateMiddlewareFlow
};
