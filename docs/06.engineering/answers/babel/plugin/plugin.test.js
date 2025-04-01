const babel = require('@babel/core')
const fs = require('fs')
const path = require('path')
const todoPlugin = require('./plugin.js')

const testCode = `
// TODO: 需要实现登录功能
function login() {
  // TODO: 添加验证逻辑
  console.log('login');
}

/* TODO: 实现注册功能 */
function register() {
  console.log('register');
}
`

describe('babel-plugin-todo-collector', () => {
  beforeEach(() => {
    // 确保每次测试前删除已存在的 todo.md
    const todoPath = path.join(process.cwd(), 'todo.md')
    if (fs.existsSync(todoPath)) {
      fs.unlinkSync(todoPath)
    }
  })

  it('should collect todos and generate markdown file', () => {
    babel.transform(testCode, {
      filename: 'test.js',
      plugins: [todoPlugin],
      configFile: false, // 禁用 babel.config.js
      babelrc: false // 禁用 .babelrc
    })

    const todoContent = fs.readFileSync(path.join(process.cwd(), 'todo.md'), 'utf-8')

    // 更详细的断言
    expect(todoContent).toContain('[ ]')
    expect(todoContent).toContain('test.js#L')
    expect(todoContent).toContain('需要实现登录功能')
    expect(todoContent).toContain('添加验证逻辑')
    expect(todoContent).toContain('实现注册功能')
  })
})
