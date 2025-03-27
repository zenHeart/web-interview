class Module {
  constructor (filename, source) {
    this.filename = filename
    this.source = source
    this.dependencies = []
    this.mapping = {} // 添加 mapping 属性
  }

  // 添加依赖
  addDependency (module) {
    this.dependencies.push(module)
    this.mapping[module.filename] = module.id // 更新映射为模块 ID
  }

  // 获取模块的源代码
  getSource () {
    return this.source
  }

  // 获取模块的依赖
  getDependencies () {
    return this.dependencies
  }

  // 获取模块的依赖映射
  getMapping (parser) {
    const relativeMapping = {}
    for (const [importNameKey, absolutePath] of Object.entries(parser.importNameKeyMap)) {
      const moduleId = this.mapping[absolutePath]
      if (moduleId !== undefined) {
        relativeMapping[importNameKey] = moduleId // 使用 importNameKey 作为键
      }
    }
    return relativeMapping
  }
}

module.exports = Module
