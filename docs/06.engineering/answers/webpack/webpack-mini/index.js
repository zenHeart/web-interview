const path = require('path')
const Compiler = require('./src/Compiler')
const babel = require('@babel/core')

// 示例 loader
const babelLoader = (source) => {
  // 使用 @babel/core 将 ES6 模块转换为 CommonJS 模块
  const result = babel.transformSync(source, {
    presets: [
      ['@babel/preset-env', {
        modules: 'commonjs', // 将 ES6 模块转换为 CommonJS
        targets: {
          node: 'current'
        }
      }]
    ]
  })
  return result.code
}

// 示例 plugin
class ExamplePlugin {
  apply (compiler) {
    compiler.hooks.emit.tap('ExamplePlugin', (compilation) => {
      console.log('ExamplePlugin: 资源生成完成')
    })
  }
}

// 创建编译器实例
const compiler = new Compiler({
  entry: path.resolve(__dirname, './fixture/entry.js'), // 修复路径
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [babelLoader]
      }
    ]
  }
})

// 应用插件
new ExamplePlugin().apply(compiler)

// 开始编译
compiler.run()
