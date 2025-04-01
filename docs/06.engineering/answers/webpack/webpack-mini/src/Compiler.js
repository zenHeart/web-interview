const path = require('path')
const fs = require('fs')
const Parser = require('./Parser')
const Module = require('./Module')
const Chunk = require('./Chunk')
const Template = require('./Template')

class Compiler {
  constructor (options) {
    this.options = options
    this.modules = new Map() // 存储所有模块
    this.chunks = new Map() // 存储所有 chunk
    this.moduleId = 0 // 初始化模块 ID 计数器
    this.hooks = {
      entryOption: new Hook(),
      beforeCompile: new Hook(),
      compile: new Hook(),
      afterCompile: new Hook(),
      emit: new Hook(),
      done: new Hook()
    }
  }

  // 开始编译
  run () {
    try {
      this.hooks.beforeCompile.call()
      this.hooks.compile.call()

      // 1. 从入口文件开始构建模块依赖图
      const entryModule = this.buildModule(this.options.entry)
      // 2. 生成 chunk
      const chunk = new Chunk(entryModule)
      chunk.addModule(entryModule) // 确保入口模块被添加到 chunk
      this.chunks.set('main', chunk)

      // 3. 生成资源
      this.hooks.emit.call()
      this.emitAssets()

      this.hooks.done.call()
    } catch (error) {
      console.error('Compilation failed:', error)
      throw error
    }
  }

  // 构建单个模块
  buildModule (filename) {
    // 如果模块已经存在，直接返回
    if (this.modules.has(filename)) {
      return this.modules.get(filename)
    }

    try {
      // 读取文件内容
      const source = fs.readFileSync(filename, 'utf-8')

      // 创建模块实例
      const module = new Module(filename, source)
      module.id = this.moduleId++ // 为模块分配唯一 ID

      // 解析模块依赖
      const parser = new Parser()
      const ast = parser.parse(source)
      const dependencies = parser.getDependencies(ast, filename)
      dependencies.forEach(dep => {
        if (dep) { // 只处理成功解析的依赖
          try {
            const depModule = this.buildModule(dep)
            module.addDependency(depModule) // 添加依赖并更新映射
          } catch (error) {
            console.error(`Error building module ${dep}:`, error)
          }
        }
      })

      // 使用 importNameKeyMap 更新模块的映射
      module.mapping = module.getMapping(parser)

      // 应用 loader
      this.applyLoaders(module)

      this.modules.set(filename, module)
      return module
    } catch (error) {
      console.error(`Error processing module ${filename}:`, error)
      throw error
    }
  }

  // 应用 loader
  applyLoaders (module) {
    const loaders = this.options.module.rules
    let source = module.source

    loaders.forEach(rule => {
      if (rule.test.test(module.filename)) {
        rule.use.forEach(loader => {
          try {
            source = loader(source)
          } catch (error) {
            console.error(`Error applying loader to ${module.filename}:`, error)
          }
        })
      }
    })

    module.source = source
  }

  // 生成资源
  emitAssets () {
    const outputPath = this.options.output.path
    const filename = this.options.output.filename

    try {
      // 确保输出目录存在
      // if (!fs.existsSync(outputPath)) {
      //   fs.mkdirSync(outputPath, { recursive: true })
      // }

      // 生成资源
      this.chunks.forEach((chunk, name) => {
        const template = new Template()
        const source = template.render(chunk)

        // 写入文件
        const filepath = path.join(outputPath, filename.replace('[name]', name))
        console.log(filepath, source)

      //   fs.writeFileSync(filepath, source)
      })
    } catch (error) {
      console.error('Error emitting assets:', error)
      throw error
    }
  }
}

// 简单的 Hook 实现
class Hook {
  constructor () {
    this.taps = []
  }

  tap (name, fn) {
    this.taps.push(fn)
  }

  call (...args) {
    this.taps.forEach(tap => tap(...args))
  }
}

module.exports = Compiler
