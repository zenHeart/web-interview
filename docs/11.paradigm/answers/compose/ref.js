// 定义一个负责日志记录的类
class Logger {
  log (message) {
    console.log(`[LOG]: ${message}`)
  }
}

// 定义一个用户服务类，它依赖于 Logger 类来记录日志
class UserService {
  constructor () {
    this.logger = new Logger() // UserService "有一个" Logger
  }

  createUser (username) {
    console.log(`Creating user: ${username}`)
    this.logger.log(`User "${username}" created successfully.`) // 将日志记录的职责委托给 Logger 实例
    return { id: Math.random(), username }
  }
}

const userService = new UserService()
const newUser = userService.createUser('Bob')
console.log(newUser)
