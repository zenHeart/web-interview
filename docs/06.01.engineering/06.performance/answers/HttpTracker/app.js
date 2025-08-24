const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const serve = require('koa-static')
const cors = require('koa-cors')
const path = require('path')

const app = new Koa()
const router = new Router()

// 中间件配置
app.use(cors())
app.use(bodyParser())
app.use(serve(path.join(__dirname, 'public')))

// 模拟不同类型的资源请求
router.get('/api/fast', async (ctx) => {
  // 快速响应 (10-50ms)
  await new Promise(resolve => setTimeout(resolve, 10 + Math.random() * 40))
  ctx.body = { type: 'fast', timestamp: Date.now(), data: 'Fast response data' }
})

router.get('/api/slow', async (ctx) => {
  // 慢速响应 (200-500ms)
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
  ctx.body = { type: 'slow', timestamp: Date.now(), data: 'Slow response data' }
})

router.get('/api/large', async (ctx) => {
  // 大数据响应
  await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100))
  const largeData = Array(1000).fill(0).map((_, i) => ({ id: i, data: `Large data item ${i}` }))
  ctx.body = { type: 'large', timestamp: Date.now(), data: largeData }
})

router.post('/api/upload', async (ctx) => {
  // 模拟上传处理
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200))
  const { size = 0 } = ctx.request.body || {}
  ctx.body = {
    type: 'upload',
    timestamp: Date.now(),
    message: 'Upload processed',
    receivedSize: size
  }
})

router.post('/api/login', async (ctx) => {
  // 模拟登录验证
  await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100))
  const { username } = ctx.request.body || {}
  ctx.body = {
    type: 'login',
    timestamp: Date.now(),
    message: 'Login successful',
    user: username || 'guest'
  }
})

// 模拟错误响应
router.get('/api/error', async (ctx) => {
  await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 50))
  ctx.status = 500
  ctx.body = { type: 'error', message: 'Simulated server error' }
})

// 主页路由
router.get('/', async (ctx) => {
  ctx.redirect('/index.html')
})

app.use(router.routes()).use(router.allowedMethods())

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log('🚀 HTTP 资源请求模拟服务已启动')
  console.log(`📊 服务地址: http://localhost:${PORT}`)
  console.log('� 可用接口:')
  console.log('   GET  /api/fast   - 快速响应')
  console.log('   GET  /api/slow   - 慢速响应')
  console.log('   GET  /api/large  - 大数据响应')
  console.log('   GET  /api/error  - 错误响应')
  console.log('   POST /api/upload - 上传模拟')
  console.log('   POST /api/login  - 登录模拟')
})

module.exports = app
