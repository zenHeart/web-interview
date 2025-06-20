class Chunk {
  constructor (entryModule) {
    this.entryModule = entryModule
    this.name = 'main'
    this.modules = new Set([entryModule]) // 初始化时包含入口模块
    this.files = []
    this.rendered = false
  }

  // 添加模块到 chunk
  addModule (module) {
    if (!this.modules.has(module)) {
      this.modules.add(module)
      module.getDependencies().forEach(dep => this.addModule(dep))
    }
  }

  // 获取所有模块
  getModules () {
    // 确保包含所有依赖模块
    this.entryModule.getDependencies().forEach(dep => {
      this.addModule(dep)
    })
    return Array.from(this.modules).sort((a, b) => a.id - b.id) // 按模块 ID 排序
  }

  // 获取入口模块
  getEntryModule () {
    return this.entryModule
  }

  // 获取 chunk 名称
  getName () {
    return this.name
  }

  // 设置 chunk 名称
  setName (name) {
    this.name = name
  }

  // 添加输出文件
  addFile (file) {
    this.files.push(file)
  }

  // 获取输出文件
  getFiles () {
    return this.files
  }

  // 标记为已渲染
  markAsRendered () {
    this.rendered = true
  }

  // 检查是否已渲染
  isRendered () {
    return this.rendered
  }
}

module.exports = Chunk
