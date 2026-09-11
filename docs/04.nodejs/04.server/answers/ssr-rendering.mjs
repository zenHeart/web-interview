// Server-Side Rendering (SSR) 演示
const http = require('http');
const fs = require('fs').promises;
const path = require('path');

/**
 * 1. 基础的HTML模板渲染
 */
class TemplateRenderer {
  constructor() {
    this.templates = new Map();
  }

  // 加载模板
  async loadTemplate(name, filePath) {
    try {
      const template = await fs.readFile(filePath, 'utf8');
      this.templates.set(name, template);
      return template;
    } catch (error) {
      console.error(`加载模板失败: ${filePath}`, error);
      throw error;
    }
  }

  // 渲染模板
  render(templateName, data = {}) {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(`模板不存在: ${templateName}`);
    }

    // 简单的模板替换
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? String(data[key]) : '';
    });
  }

  // 支持条件渲染和循环的高级模板引擎
  renderAdvanced(templateName, data = {}) {
    let template = this.templates.get(templateName);
    if (!template) {
      throw new Error(`模板不存在: ${templateName}`);
    }

    // 处理条件渲染 {{#if condition}}...{{/if}}
    template = template.replace(/\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, condition, content) => {
      return data[condition] ? content : '';
    });

    // 处理循环 {{#each items}}...{{/each}}
    template = template.replace(/\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, arrayKey, itemTemplate) => {
      const array = data[arrayKey];
      if (!Array.isArray(array)) {
        return '';
      }

      return array.map(item => {
        return itemTemplate.replace(/\{\{(\w+)\}\}/g, (match, key) => {
          return item[key] !== undefined ? String(item[key]) : '';
        });
      }).join('');
    });

    // 处理普通变量替换
    template = template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] !== undefined ? String(data[key]) : '';
    });

    return template;
  }
}

/**
 * 2. React风格的虚拟DOM SSR演示
 */
class VirtualDOM {
  static createElement(tag, props = {}, ...children) {
    return {
      tag,
      props,
      children: children.flat()
    };
  }

  static renderToString(vdom) {
    if (typeof vdom === 'string' || typeof vdom === 'number') {
      return String(vdom);
    }

    if (!vdom || !vdom.tag) {
      return '';
    }

    const { tag, props = {}, children = [] } = vdom;
    
    // 构建属性字符串
    const propsString = Object.entries(props)
      .filter(([key, value]) => value !== null && value !== undefined)
      .map(([key, value]) => {
        // 处理特殊属性
        if (key === 'className') {
          key = 'class';
        }
        return `${key}="${String(value)}"`;
      })
      .join(' ');

    const propsAttr = propsString ? ` ${propsString}` : '';

    // 自闭合标签
    const voidTags = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'];
    if (voidTags.includes(tag)) {
      return `<${tag}${propsAttr} />`;
    }

    // 渲染子元素
    const childrenString = children
      .map(child => VirtualDOM.renderToString(child))
      .join('');

    return `<${tag}${propsAttr}>${childrenString}</${tag}>`;
  }
}

// 便捷函数
const h = VirtualDOM.createElement;

/**
 * 3. 组件化的SSR实现
 */
class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
  }

  render() {
    throw new Error('render method must be implemented');
  }

  static renderToString(ComponentClass, props = {}) {
    const instance = new ComponentClass(props);
    const vdom = instance.render();
    return VirtualDOM.renderToString(vdom);
  }
}

// 示例组件：用户卡片
class UserCard extends Component {
  render() {
    const { user } = this.props;
    
    return h('div', { className: 'user-card' },
      h('img', { 
        src: user.avatar || '/default-avatar.png', 
        alt: `${user.name}'s avatar`,
        className: 'user-avatar'
      }),
      h('div', { className: 'user-info' },
        h('h3', { className: 'user-name' }, user.name),
        h('p', { className: 'user-email' }, user.email),
        user.bio && h('p', { className: 'user-bio' }, user.bio)
      )
    );
  }
}

// 用户列表组件
class UserList extends Component {
  render() {
    const { users, title } = this.props;
    
    return h('div', { className: 'user-list' },
      h('h2', {}, title || '用户列表'),
      h('div', { className: 'users' },
        ...users.map(user => 
          Component.renderToString(UserCard, { user })
        )
      )
    );
  }
}

// 页面布局组件
class Layout extends Component {
  render() {
    const { title, children } = this.props;
    
    return h('html', { lang: 'zh-CN' },
      h('head', {},
        h('meta', { charset: 'utf-8' }),
        h('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
        h('title', {}, title),
        h('style', {}, `
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
          .user-card { 
            border: 1px solid #ddd; 
            border-radius: 8px; 
            padding: 16px; 
            margin-bottom: 16px; 
            display: flex; 
            align-items: center; 
            gap: 12px;
          }
          .user-avatar { 
            width: 60px; 
            height: 60px; 
            border-radius: 50%; 
            object-fit: cover;
          }
          .user-name { margin: 0 0 8px 0; color: #333; }
          .user-email { margin: 0 0 4px 0; color: #666; font-size: 14px; }
          .user-bio { margin: 0; color: #888; font-size: 12px; }
          .header { background: #f5f5f5; padding: 20px; margin-bottom: 20px; }
          .nav { display: flex; gap: 20px; }
          .nav a { text-decoration: none; color: #0066cc; }
          .nav a:hover { text-decoration: underline; }
        `)
      ),
      h('body', {},
        h('div', { className: 'header' },
          h('h1', {}, 'SSR 演示应用'),
          h('nav', { className: 'nav' },
            h('a', { href: '/' }, '首页'),
            h('a', { href: '/users' }, '用户列表'),
            h('a', { href: '/about' }, '关于')
          )
        ),
        h('main', {}, children)
      )
    );
  }
}

/**
 * 4. 路由系统
 */
class Router {
  constructor() {
    this.routes = new Map();
  }

  route(path, handler) {
    this.routes.set(path, handler);
    return this;
  }

  async handle(request, response) {
    const url = new URL(request.url, 'http://localhost');
    const path = url.pathname;
    
    const handler = this.routes.get(path);
    if (handler) {
      try {
        await handler(request, response, url);
      } catch (error) {
        console.error('路由处理错误:', error);
        response.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        response.end('<h1>500 - 服务器内部错误</h1>');
      }
    } else {
      response.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      response.end('<h1>404 - 页面不存在</h1>');
    }
  }
}

/**
 * 5. 数据获取模拟
 */
class DataService {
  static async getUsers() {
    // 模拟异步数据获取
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return [
      {
        id: 1,
        name: '张三',
        email: 'zhangsan@example.com',
        avatar: 'https://via.placeholder.com/60',
        bio: '全栈开发工程师，热爱技术分享'
      },
      {
        id: 2,
        name: '李四',
        email: 'lisi@example.com',
        avatar: 'https://via.placeholder.com/60',
        bio: 'Frontend专家，React和Vue都很熟练'
      },
      {
        id: 3,
        name: '王五',
        email: 'wangwu@example.com',
        avatar: 'https://via.placeholder.com/60',
        bio: '高级后端工程师，专注于高并发系统设计'
      }
    ];
  }

  static async getUserById(id) {
    const users = await this.getUsers();
    return users.find(user => user.id === parseInt(id));
  }
}

/**
 * 6. SSR应用主类
 */
class SSRApp {
  constructor() {
    this.router = new Router();
    this.templateRenderer = new TemplateRenderer();
    
    this.setupRoutes();
  }

  setupRoutes() {
    // 首页路由
    this.router.route('/', async (req, res) => {
      const html = Component.renderToString(Layout, {
        title: 'SSR演示 - 首页',
        children: h('div', {},
          h('h2', {}, '欢迎来到SSR演示应用'),
          h('p', {}, '这是一个使用Node.js实现的服务端渲染演示。'),
          h('ul', {},
            h('li', {}, '⚡ 快速的首屏加载'),
            h('li', {}, '🔍 SEO友好'),
            h('li', {}, '♿ 更好的可访问性'),
            h('li', {}, '📱 支持无JavaScript的客户端')
          ),
          h('a', { 
            href: '/users',
            style: 'display: inline-block; background: #0066cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px;'
          }, '查看用户列表')
        )
      });

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<!DOCTYPE html>' + html);
    });

    // 用户列表路由
    this.router.route('/users', async (req, res) => {
      try {
        // 服务端数据获取
        const users = await DataService.getUsers();
        
        const userListHtml = Component.renderToString(UserList, {
          users,
          title: '用户列表'
        });

        const html = Component.renderToString(Layout, {
          title: 'SSR演示 - 用户列表',
          children: userListHtml
        });

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<!DOCTYPE html>' + html);
      } catch (error) {
        console.error('获取用户数据失败:', error);
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>数据加载失败</h1>');
      }
    });

    // 关于页面路由
    this.router.route('/about', async (req, res) => {
      const html = Component.renderToString(Layout, {
        title: 'SSR演示 - 关于',
        children: h('div', {},
          h('h2', {}, '关于本演示'),
          h('p', {}, '这是一个Node.js服务端渲染(SSR)的完整示例，展示了：'),
          h('ol', {},
            h('li', {}, '虚拟DOM的服务端渲染'),
            h('li', {}, '组件化的页面结构'),
            h('li', {}, '路由系统'),
            h('li', {}, '数据获取和注入'),
            h('li', {}, 'SEO优化的HTML输出')
          ),
          h('h3', {}, '技术特性'),
          h('ul', {},
            h('li', {}, '🚀 零客户端JavaScript依赖'),
            h('li', {}, '📦 轻量级虚拟DOM实现'),
            h('li', {}, '🎨 CSS-in-JS样式支持'),
            h('li', {}, '🔧 模块化的组件系统')
          )
        )
      });

      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<!DOCTYPE html>' + html);
    });

    // API路由 - 返回JSON数据
    this.router.route('/api/users', async (req, res) => {
      try {
        const users = await DataService.getUsers();
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify(users, null, 2));
      } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
      }
    });
  }

  // 启动服务器
  listen(port = 3000) {
    const server = http.createServer((req, res) => {
      console.log(`${req.method} ${req.url}`);
      this.router.handle(req, res);
    });

    server.listen(port, () => {
      console.log(`🚀 SSR服务器启动成功！`);
      console.log(`📡 访问地址: http://localhost:${port}`);
      console.log(`\n📋 可用路由:`);
      console.log(`  🏠 http://localhost:${port}/`);
      console.log(`  👥 http://localhost:${port}/users`);
      console.log(`  ℹ️  http://localhost:${port}/about`);
      console.log(`  📊 http://localhost:${port}/api/users`);
      console.log(`\n💡 这些页面都是在服务端渲染的，查看源代码可以看到完整的HTML！`);
    });

    return server;
  }
}

/**
 * 7. 性能监控中间件
 */
function performanceMiddleware() {
  return (req, res, next) => {
    const start = process.hrtime.bigint();
    
    // 重写res.end方法来记录响应时间
    const originalEnd = res.end;
    res.end = function(...args) {
      const duration = process.hrtime.bigint() - start;
      const ms = Number(duration) / 1000000; // 转换为毫秒
      
      console.log(`⏱️  ${req.method} ${req.url} - ${res.statusCode} - ${ms.toFixed(2)}ms`);
      
      return originalEnd.apply(this, args);
    };
    
    if (next) next();
  };
}

/**
 * 8. 演示不同渲染模式的对比
 */
function demonstrateRenderingComparison() {
  console.log('=== 渲染模式对比演示 ===\n');

  const userData = [
    { id: 1, name: '张三', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', email: 'lisi@example.com' }
  ];

  // 1. 客户端渲染(CSR)模拟
  console.log('1. 客户端渲染(CSR)输出:');
  const csrHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>用户列表 - CSR</title>
</head>
<body>
    <div id="root">Loading...</div>
    <script>
        // 客户端获取数据并渲染
        fetch('/api/users')
            .then(res => res.json())
            .then(users => {
                const html = users.map(user => 
                    \`<div class="user">\${user.name} - \${user.email}</div>\`
                ).join('');
                document.getElementById('root').innerHTML = html;
            });
    </script>
</body>
</html>`;
  console.log(csrHtml.trim());

  // 2. 服务端渲染(SSR)输出
  console.log('\n2. 服务端渲染(SSR)输出:');
  const ssrUserList = userData.map(user => 
    `<div class="user">${user.name} - ${user.email}</div>`
  ).join('');
  
  const ssrHtml = `
<!DOCTYPE html>
<html>
<head>
    <title>用户列表 - SSR</title>
</head>
<body>
    <div id="root">
        <h1>用户列表</h1>
        ${ssrUserList}
    </div>
    <script>
        // 可选：客户端激活(hydration)
        console.log('页面已经渲染完成，可以添加交互功能');
    </script>
</body>
</html>`;
  console.log(ssrHtml.trim());

  // 3. 静态生成(SSG)说明
  console.log('\n3. 静态生成(SSG):');
  console.log('在构建时预先生成HTML文件，类似于SSR但在构建阶段完成');
  console.log('优点: 更快的响应速度，可以使用CDN缓存');
  console.log('缺点: 动态数据需要额外处理\n');

  // 4. 渲染性能对比
  console.log('4. 渲染模式性能对比:');
  const comparison = [
    ['指标', 'CSR', 'SSR', 'SSG'],
    ['首屏加载', '慢(需要JS)', '快(立即显示)', '最快(预生成)'],
    ['SEO友好', '差(需爬虫支持)', '好(完整HTML)', '最好(静态HTML)'],
    ['服务器负载', '低', '高', '最低'],
    ['实时数据', '好', '好', '需要额外处理'],
    ['开发复杂度', '低', '中', '中']
  ];

  console.table(comparison.slice(1), comparison[0]);
}

// 主演示函数
function main() {
  console.log('Node.js SSR (服务端渲染) 演示');
  console.log('================================\n');

  // 1. 基础演示
  demonstrateRenderingComparison();

  // 2. 启动SSR应用
  console.log('启动SSR演示应用...\n');
  const app = new SSRApp();
  const server = app.listen(3000);

  // 30秒后自动关闭
  setTimeout(() => {
    console.log('\n🔄 演示结束，关闭服务器');
    server.close();
  }, 30000);

  return server;
}

// 如果直接运行此文件
if (require.main === module) {
  main();
}

module.exports = {
  TemplateRenderer,
  VirtualDOM,
  Component,
  UserCard,
  UserList,
  Layout,
  Router,
  DataService,
  SSRApp,
  performanceMiddleware,
  demonstrateRenderingComparison
};
