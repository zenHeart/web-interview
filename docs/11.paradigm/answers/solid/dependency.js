/**
 * 依赖倒置原则要求高层模块不依赖于低层模块，而应依赖于抽象，这样可以降低模块之间的耦合度。
 * 通过抽象接口和依赖注入（Dependency Injection）使高层模块在运行时获得所需功能，而非硬编码具体实现。
 * 前端模块化开发中常采用依赖注入框架或设计模式，使各模块独立开发和测试，便于维护和扩展。
 */
// 抽象接口
class Service {
  execute () {
    throw new Error('Method not implemented.')
  }
}

// 具体实现
class ApiService extends Service {
  execute () {
    console.log('Calling API...')
  }
}

// 高层模块通过依赖注入使用抽象接口
class Controller {
  constructor (service) {
    this.service = service
  }

  handleRequest () {
    this.service.execute()
  }
}

const serviceInstance = new ApiService()
const controller = new Controller(serviceInstance)
controller.handleRequest() // 输出：Calling API...
