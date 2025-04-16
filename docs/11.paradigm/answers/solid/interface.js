/**
 * 接口隔离原则要求客户端不应依赖它们不使用的接口，避免构建臃肿的接口。
 * 在模块或服务设计时，应将接口拆分为多个小接口，各自关注单一功能，客户端仅依赖自身需要的那部分接口。
 *
 * 通过将 Reader 和 Writer 分离为独立的接口，客户端 FileManager 仅依赖它需要的功能。
 * 这样可以避免臃肿的接口设计，增强代码的灵活性和可维护性。
 *
 */

// 定义小接口：读操作接口和写操作接口
class Reader {
  read () {
    // 模拟读取数据
    console.log('Reading data...')
  }
}

class Writer {
  write (data) {
    // 模拟写入数据
    console.log(`Writing data: ${data}`)
  }
}

// 客户端可以按需组合
class FileManager extends Reader {
  constructor (writer) {
    super()
    this.writer = writer
  }

  save (data) {
    this.writer.write(data)
  }
}

// 示例使用
const writer = new Writer()
const fileManager = new FileManager(writer)

// 只需要读取数据
fileManager.read()

// 只需要写入数据
fileManager.save('Sample Data')
