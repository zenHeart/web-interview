const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generate = require('@babel/generator').default
const t = require('@babel/types')

// 示例代码： ES6 代码 -> ES5 代码
const sourceCode = `
const greeting = name => {
  console.log(\`Hello, \${name}!\`);
};
`

// 1. 解析（Parser）
// 将源代码解析成 AST
const ast = parser.parse(sourceCode, {
  sourceType: 'module'
})

// 2. 转换（Transform）
// 遍历 AST 并进行转换
traverse(ast, {
  // 访问箭头函数
  ArrowFunctionExpression (path) {
    // 将箭头函数转换为普通函数
    const node = path.node
    const body = node.body

    // 创建新的函数表达式
    const functionExpression = t.functionExpression(
      null, // 函数名，这里为 null 因为是匿名函数
      node.params,
      body,
      false, // generator
      false // async
    )

    // 替换原节点
    path.replaceWith(functionExpression)
  },

  // 访问模板字符串
  TemplateLiteral (path) {
    const { expressions, quasis } = path.node

    // 将模板字符串转换为字符串拼接
    const strings = quasis.map(quasi => quasi.value.raw)
    const nodes = []

    strings.forEach((str, i) => {
      nodes.push(t.stringLiteral(str))
      if (expressions[i]) {
        nodes.push(expressions[i])
      }
    })

    // 使用 + 运算符拼接字符串
    let current = nodes[0]
    for (let i = 1; i < nodes.length; i++) {
      current = t.binaryExpression('+', current, nodes[i])
    }

    path.replaceWith(current)
  }
})

// 3. 生成（Generate）
// 将转换后的 AST 重新生成代码
const output = generate(ast, {}, sourceCode)

console.log('转换前的代码：')
console.log(sourceCode)
console.log('\n转换后的代码：')
console.log(output.code)
