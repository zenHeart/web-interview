# HTTP 性能指标采集验证工具

基于 Koa 框架的 HTTP 性能指标采集验证工具，用于模拟不同类型的资源请求，验证 GET 和 POST 请求的全链路性能指标采集。

## 功能特性

* **多种请求类型**: 模拟快速、慢速、大数据、错误等不同类型的请求
* **性能指标采集**: 使用浏览器 Performance API 采集详细的网络性能指标
* **可视化展示**: 实时展示 DNS、TCP、SSL、TTFB 等关键性能指标
* **统计分析**: 自动计算平均值和性能趋势
* **友好界面**: 现代化的 Web 界面，支持实时监控

## 收集的性能指标

### 网络层面指标

* **DNS 查询时间**: 域名解析耗时
* **TCP 连接时间**: TCP 握手耗时  
* **SSL 握手时间**: HTTPS 连接建立耗时
* **首字节时间 (TTFB)**: 从请求发送到收到第一个字节的时间
* **内容下载时间**: 响应体下载耗时
* **总请求时间**: 完整请求的总耗时

### 传输指标

* **传输大小**: 实际网络传输的字节数
* **编码大小**: 响应体的编码后大小
* **压缩率**: 数据压缩效果

## 安装和运行

### 1. 安装依赖

```bash
npm install
```

### 2. 启动服务器

```bash
npm start
```

### 3. 访问验证工具

打开浏览器访问 `http://localhost:3000`

## 使用方法

### 测试不同类型请求

1. **快速 GET 请求** - 模拟响应时间 10-50ms 的快速接口
2. **慢速 GET 请求** - 模拟响应时间 200-500ms 的慢速接口  
3. **大数据 GET** - 模拟返回大量数据的接口
4. **POST 上传** - 模拟文件上传接口
5. **POST 登录** - 模拟用户登录接口
6. **错误请求** - 模拟服务器 500 错误

### 查看性能指标

* **实时统计**: 查看总请求数、平均 DNS 时间、平均 TCP 时间、平均 TTFB 等
* **详细记录**: 查看每个请求的完整性能分解
* **趋势分析**: 通过颜色编码识别慢请求和错误请求

## API 接口

### 模拟接口

```bash
# 快速响应接口
GET http://localhost:3000/api/fast

# 慢速响应接口  
GET http://localhost:3000/api/slow

# 大数据响应接口
GET http://localhost:3000/api/large

# 错误响应接口
GET http://localhost:3000/api/error

# 上传模拟接口
POST http://localhost:3000/api/upload
Content-Type: application/json
{"size": 1024, "filename": "test.jpg"}

# 登录模拟接口
POST http://localhost:3000/api/login
Content-Type: application/json
{"username": "testuser", "password": "123456"}
```

## 性能指标说明

### DNS 查询 (DNS Lookup)

* **测量范围**: `domainLookupStart` 到 `domainLookupEnd`
* **含义**: 将域名解析为 IP 地址的时间
* **优化建议**: 使用 DNS 预解析，选择快速 DNS 服务商

### TCP 连接 (TCP Connection)

* **测量范围**: `connectStart` 到 `connectEnd`
* **含义**: 建立 TCP 连接的时间
* **优化建议**: 使用 HTTP/2，启用连接复用

### SSL 握手 (SSL Handshake)

* **测量范围**: `secureConnectionStart` 到 `connectEnd`
* **含义**: HTTPS 连接建立时的 TLS 握手时间
* **优化建议**: 使用 HSTS，优化证书链

### 首字节时间 (TTFB - Time To First Byte)

* **测量范围**: `requestStart` 到 `responseStart`
* **含义**: 服务器处理请求并返回第一个字节的时间
* **优化建议**: 优化服务器性能，使用 CDN

### 内容下载 (Content Download)

* **测量范围**: `responseStart` 到 `responseEnd`
* **含义**: 下载响应体内容的时间
* **优化建议**: 启用 gzip 压缩，优化资源大小

## 技术实现

### 前端性能采集

使用浏览器原生的 `PerformanceObserver` API：

```javascript
const po = new PerformanceObserver(list => {
  list.getEntries().forEach(entry => {
    if (entry.initiatorType === 'fetch') {
      const dns = entry.domainLookupEnd - entry.domainLookupStart
      const tcp = entry.connectEnd - entry.connectStart
      const ssl = entry.secureConnectionStart > 0
        ? entry.connectEnd - entry.secureConnectionStart
        : 0
      const ttfb = entry.responseStart - entry.requestStart
      const content = entry.responseEnd - entry.responseStart
      // 处理性能数据...
    }
  })
})
po.observe({ type: 'resource', buffered: true })
```

### 后端模拟

使用 Koa 框架模拟不同响应特性的接口：

```javascript
// 慢速响应模拟
router.get('/api/slow', async (ctx) => {
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300))
  ctx.body = { type: 'slow', data: 'Slow response data' }
})
```

## 扩展功能

1. **网络条件模拟**: 模拟 3G/4G 等不同网络环境
2. **批量测试**: 支持并发请求测试
3. **性能基准**: 设置性能基准线和告警
4. **数据导出**: 支持导出性能数据用于分析
5. **历史记录**: 保存和对比历史性能数据

## 注意事项

* 本地请求可能无法准确测量网络层面的指标（DNS、TCP等）
* 建议部署到真实服务器环境进行完整测试
* 浏览器的同源策略可能影响某些指标的采集
* 不同浏览器对 Performance API 的支持程度可能不同

## 许可证

MIT License
