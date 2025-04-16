/**
 * Express.js框架的中间件系统是职责链模式的一个典型应用：
 */
const express = require('express')
const app = express()

// 日志中间件
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.url}`)
  next() // 传递给下一个中间件
})

// 身份验证中间件
app.use((req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).send('Authentication required')
  }

  // 验证逻辑...
  req.user = { id: 'user123' } // 将用户信息附加到请求对象
  next()
})

// 授权中间件
app.use((req, res, next) => {
  if (!req.user.hasPermission) {
    return res.status(403).send('Permission denied')
  }
  next()
})

// 路由处理
app.get('/api/data', (req, res) => {
  res.json({ data: 'Protected data' })
})

app.listen(3000)
