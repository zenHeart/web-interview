// Koa 洋葱模型和异常处理演示
const Koa = require('koa');
const compose = require('koa-compose');

/**
 * 1. 洋葱模型基础演示
 */
function demonstrateOnionModel() {
  console.log('=== Koa 洋葱模型演示 ===');
  
  const app = new Koa();
  
  // 中间件1 - 外层
  app.use(async (ctx, next) => {
    console.log('中间件1 - 进入');
    const start = Date.now();
    
    await next(); // 等待下一个中间件执行完成
    
    const duration = Date.now() - start;
    console.log('中间件1 - 退出');
    console.log(`请求处理时间: ${duration}ms`);
    
    // 在响应头中添加处理时间
    ctx.set('X-Response-Time', `${duration}ms`);
  });
  
  // 中间件2 - 中层
  app.use(async (ctx, next) => {
    console.log('中间件2 - 进入');
    
    // 添加请求日志信息
    ctx.state.requestInfo = {
      method: ctx.method,
      url: ctx.url,
      timestamp: new Date().toISOString()
    };
    
    await next();
    
    console.log('中间件2 - 退出');
    console.log('请求信息:', ctx.state.requestInfo);
  });
  
  // 中间件3 - 内层
  app.use(async (ctx, next) => {
    console.log('中间件3 - 进入');
    
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 100));
    
    await next();
    
    console.log('中间件3 - 退出');
  });
  
  // 路由处理器 - 最内层
  app.use(async (ctx) => {
    console.log('路由处理器 - 处理请求');
    
    ctx.body = {
      message: '洋葱模型演示',
      path: ctx.path,
      method: ctx.method,
      requestInfo: ctx.state.requestInfo
    };
    
    console.log('路由处理器 - 响应已设置');
  });
  
  return app;
}

/**
 * 2. 不使用async/await的洋葱模型实现 (Generator版本)
 */
function demonstrateGeneratorOnionModel() {
  console.log('\n=== Generator版本洋葱模型 ===');
  
  // 简化的Koa实现，使用Generator
  class SimpleKoa {
    constructor() {
      this.middlewares = [];
    }
    
    use(middleware) {
      this.middlewares.push(middleware);
      return this;
    }
    
    // 使用Generator实现的compose函数
    compose(middlewares) {
      return function* (next) {
        let index = -1;
        
        function* dispatch(i) {
          if (i <= index) {
            throw new Error('next() called multiple times');
          }
          index = i;
          
          const middleware = middlewares[i];
          if (!middleware) {
            if (next) yield* next;
            return;
          }
          
          yield* middleware(dispatch.bind(null, i + 1));
        }
        
        yield* dispatch(0);
      };
    }
    
    // 模拟请求处理
    handleRequest(ctx) {
      const composed = this.compose(this.middlewares);
      const generator = composed.call(ctx);
      
      // 手动执行generator
      function runGenerator(gen) {
        const result = gen.next();
        if (!result.done) {
          return runGenerator(gen);
        }
        return result.value;
      }
      
      return runGenerator(generator);
    }
  }
  
  const app = new SimpleKoa();
  
  // Generator中间件
  app.use(function* (next) {
    console.log('Generator中间件1 - 进入');
    yield* next;
    console.log('Generator中间件1 - 退出');
  });
  
  app.use(function* (next) {
    console.log('Generator中间件2 - 进入');
    yield* next;
    console.log('Generator中间件2 - 退出');
  });
  
  app.use(function* () {
    console.log('Generator路由处理器');
    this.body = 'Generator洋葱模型演示';
  });
  
  // 模拟请求
  const ctx = { method: 'GET', url: '/' };
  app.handleRequest(ctx);
  console.log('响应:', ctx.body);
  
  return app;
}

/**
 * 3. Koa异常处理演示
 */
function demonstrateErrorHandling() {
  console.log('\n=== Koa 异常处理演示 ===');
  
  const app = new Koa();
  
  // 全局错误处理中间件
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      console.error('捕获到错误:', error.message);
      
      // 设置错误响应
      ctx.status = error.status || 500;
      ctx.body = {
        error: error.message,
        status: ctx.status,
        timestamp: new Date().toISOString()
      };
      
      // 触发应用级错误事件
      ctx.app.emit('error', error, ctx);
    }
  });
  
  // 请求日志中间件
  app.use(async (ctx, next) => {
    console.log(`收到请求: ${ctx.method} ${ctx.url}`);
    
    try {
      await next();
      console.log(`响应状态: ${ctx.status}`);
    } catch (error) {
      console.log(`请求处理失败: ${error.message}`);
      throw error; // 重新抛出错误让上层处理
    }
  });
  
  // 业务中间件 - 可能抛出错误
  app.use(async (ctx, next) => {
    if (ctx.path === '/error') {
      // 模拟业务错误
      const error = new Error('这是一个业务错误');
      error.status = 400;
      throw error;
    }
    
    if (ctx.path === '/server-error') {
      // 模拟服务器错误
      throw new Error('服务器内部错误');
    }
    
    await next();
  });
  
  // 正常路由
  app.use(async (ctx) => {
    if (ctx.path === '/') {
      ctx.body = { message: '正常响应' };
    } else {
      ctx.status = 404;
      ctx.body = { error: '路由不存在' };
    }
  });
  
  // 监听应用级错误事件
  app.on('error', (error, ctx) => {
    console.log('应用级错误处理:', {
      error: error.message,
      url: ctx?.url,
      method: ctx?.method,
      status: ctx?.status
    });
  });
  
  return app;
}

/**
 * 4. Koa中间件组合和复用
 */
function demonstrateMiddlewareComposition() {
  console.log('\n=== Koa 中间件组合演示 ===');
  
  // 创建可复用的中间件组
  const authMiddleware = async (ctx, next) => {
    const token = ctx.headers.authorization;
    
    if (!token) {
      ctx.status = 401;
      ctx.body = { error: 'No authorization token' };
      return;
    }
    
    if (token === 'Bearer valid-token') {
      ctx.state.user = { id: 1, name: 'Alice' };
      await next();
    } else {
      ctx.status = 401;
      ctx.body = { error: 'Invalid token' };
    }
  };
  
  const validationMiddleware = (schema) => {
    return async (ctx, next) => {
      const { error, value } = schema.validate(ctx.request.body);
      
      if (error) {
        ctx.status = 400;
        ctx.body = { error: error.details[0].message };
        return;
      }
      
      ctx.state.validatedData = value;
      await next();
    };
  };
  
  const loggingMiddleware = async (ctx, next) => {
    const start = Date.now();
    console.log(`-> ${ctx.method} ${ctx.url}`);
    
    await next();
    
    const duration = Date.now() - start;
    console.log(`<- ${ctx.status} (${duration}ms)`);
  };
  
  // 组合中间件
  const apiMiddlewares = compose([
    loggingMiddleware,
    authMiddleware,
    async (ctx, next) => {
      console.log('API中间件执行');
      await next();
    }
  ]);
  
  const app = new Koa();
  
  // 基础路由
  app.use(async (ctx, next) => {
    if (ctx.path === '/public') {
      ctx.body = { message: '公开接口' };
      return;
    }
    await next();
  });
  
  // 需要认证的API路由
  app.use(async (ctx, next) => {
    if (ctx.path.startsWith('/api')) {
      await apiMiddlewares(ctx, next);
    } else {
      await next();
    }
  });
  
  // API路由处理
  app.use(async (ctx) => {
    if (ctx.path === '/api/user') {
      ctx.body = {
        message: '认证成功',
        user: ctx.state.user
      };
    } else {
      ctx.status = 404;
      ctx.body = { error: 'Route not found' };
    }
  });
  
  return app;
}

/**
 * 5. 手动实现简版的koa-compose
 */
function createCompose() {
  return function compose(middleware) {
    if (!Array.isArray(middleware)) {
      throw new TypeError('Middleware stack must be an array!');
    }
    
    for (const fn of middleware) {
      if (typeof fn !== 'function') {
        throw new TypeError('Middleware must be composed of functions!');
      }
    }
    
    return function composedMiddleware(context, next) {
      let index = -1;
      
      function dispatch(i) {
        if (i <= index) {
          return Promise.reject(new Error('next() called multiple times'));
        }
        index = i;
        
        let fn = middleware[i];
        
        if (i === middleware.length) {
          fn = next;
        }
        
        if (!fn) {
          return Promise.resolve();
        }
        
        try {
          return Promise.resolve(fn(context, () => dispatch(i + 1)));
        } catch (err) {
          return Promise.reject(err);
        }
      }
      
      return dispatch(0);
    };
  };
}

/**
 * 6. 演示自定义compose的使用
 */
function demonstrateCustomCompose() {
  console.log('\n=== 自定义Compose演示 ===');
  
  const compose = createCompose();
  
  const middleware1 = async (ctx, next) => {
    console.log('自定义中间件1 - 开始');
    ctx.count = (ctx.count || 0) + 1;
    await next();
    console.log('自定义中间件1 - 结束');
  };
  
  const middleware2 = async (ctx, next) => {
    console.log('自定义中间件2 - 开始');
    ctx.count = (ctx.count || 0) + 1;
    await next();
    console.log('自定义中间件2 - 结束');
  };
  
  const middleware3 = async (ctx, next) => {
    console.log('自定义中间件3 - 开始');
    ctx.count = (ctx.count || 0) + 1;
    console.log(`中间件执行次数: ${ctx.count}`);
    console.log('自定义中间件3 - 结束');
  };
  
  const composedFn = compose([middleware1, middleware2, middleware3]);
  
  // 执行组合后的中间件
  const ctx = {};
  composedFn(ctx).then(() => {
    console.log('所有中间件执行完成');
    console.log('最终ctx:', ctx);
  });
}

/**
 * 7. 完整的Koa应用演示
 */
async function runCompleteDemo() {
  console.log('\n=== 完整Koa应用演示 ===');
  
  const app = demonstrateOnionModel();
  const errorApp = demonstrateErrorHandling();
  const compositionApp = demonstrateMiddlewareComposition();
  
  // 模拟请求处理
  console.log('\n1. 模拟正常请求:');
  await simulateRequest(app, { method: 'GET', url: '/' });
  
  console.log('\n2. 模拟错误请求:');
  await simulateRequest(errorApp, { method: 'GET', url: '/error' });
  
  console.log('\n3. 模拟认证请求:');
  await simulateRequest(compositionApp, { 
    method: 'GET', 
    url: '/api/user',
    headers: { authorization: 'Bearer valid-token' }
  });
}

/**
 * 模拟请求处理函数
 */
async function simulateRequest(app, request) {
  const ctx = {
    method: request.method,
    url: request.url,
    path: new URL(request.url, 'http://localhost').pathname,
    headers: request.headers || {},
    set: function(key, value) {
      this.headers[key.toLowerCase()] = value;
    },
    state: {},
    status: 200,
    body: null
  };
  
  try {
    // 获取应用的中间件并执行
    const composed = app.middleware.length > 0 
      ? compose(app.middleware) 
      : async (ctx) => { ctx.body = 'No middleware'; };
    
    await composed(ctx);
    
    console.log(`响应 [${ctx.status}]:`, JSON.stringify(ctx.body, null, 2));
  } catch (error) {
    console.log(`请求失败:`, error.message);
  }
}

// 主演示函数
async function main() {
  console.log('Koa洋葱模型和异常处理演示');
  console.log('===============================');
  
  // 1. 基础洋葱模型
  demonstrateOnionModel();
  
  // 2. Generator版本
  setTimeout(() => {
    demonstrateGeneratorOnionModel();
  }, 1000);
  
  // 3. 异常处理
  setTimeout(() => {
    demonstrateErrorHandling();
  }, 2000);
  
  // 4. 中间件组合
  setTimeout(() => {
    demonstrateMiddlewareComposition();
  }, 3000);
  
  // 5. 自定义compose
  setTimeout(() => {
    demonstrateCustomCompose();
  }, 4000);
  
  // 6. 完整演示
  setTimeout(() => {
    runCompleteDemo();
  }, 5000);
}

// 如果直接运行此文件
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  demonstrateOnionModel,
  demonstrateGeneratorOnionModel,
  demonstrateErrorHandling,
  demonstrateMiddlewareComposition,
  createCompose,
  demonstrateCustomCompose,
  simulateRequest
};
