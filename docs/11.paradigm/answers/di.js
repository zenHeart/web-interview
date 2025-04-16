class Container {
  constructor () {
    this.services = new Map()
  }

  register (name, implementation) {
    this.services.set(name, implementation)
  }

  resolve (name) {
    const Service = this.services.get(name)
    return new Service()
  }
}

// 使用
class Logger {
  log (msg) {
    console.log(msg)
  }
}
class UserService {
  constructor (logger) {
    this.logger = logger
  }

  static inject = ['logger']
  createUser (name) {
    this.logger.log(`创建用户：${name}`)
  }
}

// 模拟注入
const container = new Container()
container.register('logger', Logger)

// 自动注入依赖
function inject (cls) {
  const deps = cls.inject.map(dep => container.resolve(dep))
  return new cls(...deps)
}

const userService = inject(UserService)
userService.createUser('Alice')
