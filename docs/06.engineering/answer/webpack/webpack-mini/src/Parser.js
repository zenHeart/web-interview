const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const path = require('path')
const fs = require('fs')
// const { transformFromAst, parse, traverse } = require('@babel/core')

class Parser {
  constructor () {
    this.dependencies = []
  }

  // 解析源代码生成 AST
  parse (source) {
    return parser.parse(source, {
      sourceType: 'module',
      plugins: ['jsx']
    })
  }

  // 从 AST 中获取依赖
  getDependencies (ast, filename) {
    this.dependencies = []
    this.importNameKeyMap = {} // 保存导入的文件字符串与解析路径的映射

    traverse(ast, {
      // 处理 import 语句
      ImportDeclaration: ({ node }) => {
        const dependency = node.source.value
        const resolvedPath = this.resolveDependency(dependency, path.dirname(filename))
        if (resolvedPath) {
          this.dependencies.push(resolvedPath)
          this.importNameKeyMap[dependency] = resolvedPath // 保存映射
        }
      },

      // 处理 require 调用
      CallExpression: ({ node }) => {
        if (
          t.isIdentifier(node.callee) &&
          node.callee.name === 'require' &&
          t.isStringLiteral(node.arguments[0])
        ) {
          const dependency = node.arguments[0].value
          const resolvedPath = this.resolveDependency(dependency, path.dirname(filename))
          if (resolvedPath) {
            this.dependencies.push(resolvedPath)
            this.importNameKeyMap[dependency] = resolvedPath // 保存映射
          }
        }
      }
    })

    return this.dependencies
  }

  // 解析文件路径
  resolveDependency (dependency, context) {
    // 处理相对路径
    if (dependency.startsWith('./') || dependency.startsWith('../')) {
      // 尝试不同的文件扩展名
      const extensions = ['.js', '.jsx', '.ts', '.tsx']
      let resolvedPath = null

      // 如果依赖已经包含扩展名
      if (path.extname(dependency)) {
        resolvedPath = path.resolve(context, dependency)
        if (fs.existsSync(resolvedPath)) {
          return resolvedPath
        }
      }

      // 尝试添加不同的扩展名
      for (const ext of extensions) {
        const pathWithExt = path.resolve(context, dependency + ext)
        if (fs.existsSync(pathWithExt)) {
          return pathWithExt
        }
      }

      // 如果找不到文件，返回 null
      console.warn(`Warning: Cannot resolve dependency "${dependency}" in "${context}"`)
      return null
    }

    // 处理 node_modules 中的模块
    try {
      const resolvedPath = require.resolve(dependency, { paths: [context] })
      return resolvedPath
    } catch (error) {
      console.warn(`Warning: Cannot resolve dependency "${dependency}"`)
      return null
    }
  }
}

module.exports = Parser
