// 单一职责原则要求每个类或模块只负责一种功能。
// 拆分用户认证与日志记录逻辑
class AuthService {
  login (username, password) {
    // 验证用户信息，返回认证结果
    return username === 'admin' && password === '1234'
  }
}

class Logger {
  log (message) {
    console.log('LOG:', message)
  }
}

// 前端调用时分别使用不同的服务
const authService = new AuthService()
const logger = new Logger()

if (authService.login('admin', '1234')) {
  logger.log('User logged in successfully.')
}
