// 权限管理模型演示
// 展示不同权限模型在前端/Web 开发中的应用

/**
 * DAC (Discretionary Access Control) - 自主访问控制演示
 * 资源所有者可以决定谁能访问资源
 */
class DACFileSystem {
  constructor() {
    this.files = new Map();
    this.users = new Map([
      ['alice', { uid: 1001, groups: ['developers'] }],
      ['bob', { uid: 1002, groups: ['users'] }],
      ['admin', { uid: 0, groups: ['admin', 'developers'] }]
    ]);
  }
  
  createFile(filename, owner, permissions = { owner: 'rwx', group: 'r--', other: '---' }) {
    this.files.set(filename, {
      owner,
      group: this.users.get(owner)?.groups[0] || 'users',
      permissions,
      content: `Content of ${filename}`
    });
    console.log(`创建文件 ${filename}, 所有者: ${owner}, 权限: ${JSON.stringify(permissions)}`);
  }
  
  accessFile(filename, user, operation) {
    const file = this.files.get(filename);
    if (!file) {
      return { allowed: false, reason: '文件不存在' };
    }
    
    const userData = this.users.get(user);
    let permission;
    
    // 确定使用哪个权限组
    if (file.owner === user) {
      permission = file.permissions.owner;
    } else if (userData?.groups.includes(file.group)) {
      permission = file.permissions.group;
    } else {
      permission = file.permissions.other;
    }
    
    // 检查具体操作权限
    const opMap = { read: 'r', write: 'w', execute: 'x' };
    const hasPermission = permission.includes(opMap[operation]);
    
    return {
      allowed: hasPermission,
      reason: hasPermission ? `允许 ${operation}` : `权限不足: 需要 ${operation}, 当前权限: ${permission}`,
      usedPermission: permission
    };
  }
}

/**
 * RBAC (Role-Based Access Control) - 基于角色的访问控制演示
 * 用户通过角色获得权限，适用于企业级应用
 */
class RBACSystem {
  constructor() {
    this.roles = new Map([
      ['admin', { permissions: ['user:create', 'user:read', 'user:update', 'user:delete', 'system:config'] }],
      ['editor', { permissions: ['content:create', 'content:read', 'content:update', 'media:upload'] }],
      ['viewer', { permissions: ['content:read', 'profile:read'] }]
    ]);
    
    this.users = new Map([
      ['alice', { roles: ['admin'] }],
      ['bob', { roles: ['editor'] }],
      ['charlie', { roles: ['viewer'] }],
      ['david', { roles: ['editor', 'viewer'] }] // 多角色
    ]);
  }
  
  getUserPermissions(username) {
    const user = this.users.get(username);
    if (!user) return [];
    
    const permissions = new Set();
    user.roles.forEach(roleName => {
      const role = this.roles.get(roleName);
      if (role) {
        role.permissions.forEach(perm => permissions.add(perm));
      }
    });
    
    return Array.from(permissions);
  }
  
  checkAccess(username, resource, action) {
    const permissions = this.getUserPermissions(username);
    const requiredPermission = `${resource}:${action}`;
    
    return {
      allowed: permissions.includes(requiredPermission),
      userPermissions: permissions,
      requiredPermission
    };
  }
}

/**
 * ABAC (Attribute-Based Access Control) - 基于属性的访问控制演示
 * 根据用户、资源、环境属性动态评估权限
 */
class ABACSystem {
  constructor() {
    this.policies = [
      {
        name: '办公时间访问策略',
        condition: (user, resource, environment) => {
          const hour = environment.currentTime.getHours();
          return hour >= 9 && hour <= 18; // 办公时间 9-18 点
        }
      },
      {
        name: '部门资源访问策略', 
        condition: (user, resource, environment) => {
          return user.department === resource.department;
        }
      },
      {
        name: '敏感资源策略',
        condition: (user, resource, environment) => {
          if (resource.sensitivity === 'high') {
            return user.securityLevel >= 3 && environment.location === 'office';
          }
          return true;
        }
      }
    ];
  }
  
  evaluateAccess(user, resource, environment) {
    const results = this.policies.map(policy => ({
      policy: policy.name,
      result: policy.condition(user, resource, environment)
    }));
    
    const allowed = results.every(r => r.result);
    
    return {
      allowed,
      policyResults: results,
      finalDecision: allowed ? 'ALLOW' : 'DENY'
    };
  }
}

/**
 * Web 应用中的权限实现示例
 */
class WebAppPermissionSystem {
  constructor() {
    // 结合 RBAC + 简单的 ABAC 
    this.rbac = new RBACSystem();
    this.sessions = new Map(); // 模拟用户会话
  }
  
  // 模拟用户登录
  login(username, clientInfo) {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.sessions.set(sessionId, {
      username,
      loginTime: new Date(),
      clientInfo, // IP, User-Agent 等
      lastActivity: new Date()
    });
    return sessionId;
  }
  
  // 中间件：检查 API 访问权限
  checkAPIAccess(sessionId, endpoint, method) {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return { allowed: false, reason: '未认证' };
    }
    
    // 会话超时检查 (ABAC 属性)
    const now = new Date();
    const sessionAge = now - session.loginTime;
    if (sessionAge > 2 * 60 * 60 * 1000) { // 2小时超时
      return { allowed: false, reason: '会话超时' };
    }
    
    // 基于端点的权限映射
    const endpointPermissions = {
      '/api/users': { GET: 'user:read', POST: 'user:create', PUT: 'user:update', DELETE: 'user:delete' },
      '/api/content': { GET: 'content:read', POST: 'content:create', PUT: 'content:update' },
      '/api/admin': { GET: 'system:config', POST: 'system:config' }
    };
    
    const permissionMap = endpointPermissions[endpoint];
    if (!permissionMap) {
      return { allowed: false, reason: '未知端点' };
    }
    
    const requiredPermission = permissionMap[method];
    if (!requiredPermission) {
      return { allowed: false, reason: '不支持的方法' };
    }
    
    // 使用 RBAC 检查权限
    const rbacResult = this.rbac.checkAccess(session.username, 
      requiredPermission.split(':')[0], 
      requiredPermission.split(':')[1]);
    
    return {
      allowed: rbacResult.allowed,
      reason: rbacResult.allowed ? '权限验证通过' : '权限不足',
      requiredPermission,
      userPermissions: rbacResult.userPermissions
    };
  }
}

/**
 * 运行所有演示
 */
function demonstratePermissionModels() {
  console.log('=== 权限管理模型演示 ===\n');
  
  // 1. DAC 演示
  console.log('1. DAC (自主访问控制) 演示');
  console.log('场景: 类Unix文件系统权限\n');
  
  const dac = new DACFileSystem();
  dac.createFile('readme.txt', 'alice', { owner: 'rw-', group: 'r--', other: 'r--' });
  dac.createFile('secret.txt', 'alice', { owner: 'rw-', group: '---', other: '---' });
  
  console.log('访问测试:');
  console.log('alice 读取 readme.txt:', dac.accessFile('readme.txt', 'alice', 'read'));
  console.log('bob 读取 readme.txt:', dac.accessFile('readme.txt', 'bob', 'read'));
  console.log('bob 读取 secret.txt:', dac.accessFile('secret.txt', 'bob', 'read'));
  console.log('');
  
  // 2. RBAC 演示
  console.log('2. RBAC (基于角色) 演示');
  console.log('场景: Web应用用户权限管理\n');
  
  const rbac = new RBACSystem();
  console.log('用户权限:');
  ['alice', 'bob', 'charlie'].forEach(user => {
    console.log(`${user}:`, rbac.getUserPermissions(user));
  });
  
  console.log('\n访问测试:');
  console.log('alice 删除用户:', rbac.checkAccess('alice', 'user', 'delete'));
  console.log('bob 创建内容:', rbac.checkAccess('bob', 'content', 'create'));
  console.log('charlie 创建内容:', rbac.checkAccess('charlie', 'content', 'create'));
  console.log('');
  
  // 3. ABAC 演示
  console.log('3. ABAC (基于属性) 演示');
  console.log('场景: 动态权限策略评估\n');
  
  const abac = new ABACSystem();
  
  const user1 = { name: 'alice', department: 'engineering', securityLevel: 3 };
  const resource1 = { name: 'project-code', department: 'engineering', sensitivity: 'high' };
  const env1 = { currentTime: new Date('2024-01-15T14:30:00'), location: 'office' };
  
  const user2 = { name: 'bob', department: 'marketing', securityLevel: 1 };
  const env2 = { currentTime: new Date('2024-01-15T22:30:00'), location: 'home' };
  
  console.log('Alice 办公时间在办公室访问敏感资源:');
  console.log(abac.evaluateAccess(user1, resource1, env1));
  
  console.log('\nBob 晚上在家访问敏感资源:');
  console.log(abac.evaluateAccess(user2, resource1, env2));
  console.log('');
  
  // 4. Web应用综合示例
  console.log('4. Web应用权限系统演示');
  console.log('场景: API访问权限控制\n');
  
  const webApp = new WebAppPermissionSystem();
  
  // 模拟用户登录
  const aliceSession = webApp.login('alice', { ip: '192.168.1.100', userAgent: 'Chrome' });
  const bobSession = webApp.login('bob', { ip: '192.168.1.101', userAgent: 'Firefox' });
  
  console.log('API访问测试:');
  console.log('Alice GET /api/users:', webApp.checkAPIAccess(aliceSession, '/api/users', 'GET'));
  console.log('Alice DELETE /api/users:', webApp.checkAPIAccess(aliceSession, '/api/users', 'DELETE'));
  console.log('Bob POST /api/content:', webApp.checkAPIAccess(bobSession, '/api/content', 'POST'));
  console.log('Bob GET /api/admin:', webApp.checkAPIAccess(bobSession, '/api/admin', 'GET'));
  
  // 5. 总结对比
  console.log('\n=== 权限模型对比总结 ===');
  
  const comparison = [
    { 模型: 'DAC', 复杂度: '低', 灵活性: '中', 管理成本: '低', 适用场景: '文件系统、小型应用' },
    { 模型: 'MAC', 复杂度: '高', 灵活性: '低', 管理成本: '高', 适用场景: '军工、政府、高安全' },
    { 模型: 'RBAC', 复杂度: '中', 灵活性: '中', 管理成本: '中', 适用场景: '企业应用、权限分级' },
    { 模型: 'ABAC', 复杂度: '高', 灵活性: '高', 管理成本: '高', 适用场景: '复杂业务规则、动态权限' }
  ];
  
  console.table(comparison);
  
  console.log('\n前端开发推荐实践:');
  console.log('1. 小型应用: 简单的基于角色权限');
  console.log('2. 企业应用: RBAC + 路由守卫');  
  console.log('3. 复杂业务: RBAC基础 + ABAC策略');
  console.log('4. 微服务: JWT + 分布式权限服务');
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  demonstratePermissionModels();
}

export { DACFileSystem, RBACSystem, ABACSystem, WebAppPermissionSystem };
