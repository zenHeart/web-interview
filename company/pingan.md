# 平安保险（平安科技）✅

- **业务领域**: 综合金融（寿险、产险、养老险）、平安银行、金融科技、智慧医疗、智能风控
- **技术栈**: Vue 3、React、TypeScript、Node.js、微前端、Hybrid 容器、Flutter
- **团队规模**: 平安科技研发团队数千人，前端团队超300人
- **办公地点**: 深圳（平安金融中心/科技大厦）、上海、北京、成都、武汉
- **公司性质**: 综合金融科技上市公司（Fortune Global 500）
- **薪资水平**: 校招18-35万，社招22-60万

## 岗位类型

- **金融前端开发工程师** - 负责平安金管家、口袋银行 Web/H5/小程序及内部保单作业系统研发
- **前端监控与稳定性架构师** - 负责大前端全局监控 SDK 建设、微前端容器治理及白屏崩溃容灾兜底
- **跨端混合开发工程师** - 负责金融级 App 内嵌 Hybrid WebView 容器适配、离线包同步与 Native 桥接

## 技术特色

- **金融级高可用与全链路监控**: 针对海量保单与交易流程，自研覆盖 JS 运行时异常、接口耗时、白屏探测、资源 404 的全栈监控 SDK。
- **严密的信息安全与合规审计**: 前端对客户身份证、银行卡等敏感情报实施严格的脱敏渲染、动态水印注入与防截屏防篡改策略。
- **超大型企业级微前端治理**: 平安内部数百套独立系统通过统一门户微前端集成，保证各专业子公司系统自治与样式隔离。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **在线性格与能力测评** → **技术笔试** → **技术一面** → **技术二面** → **HR面试**
   - 总流程约3-4周
   - 难度: 3.5/5星
   - 通过率: 约15%

### 社会招聘

1. **简历筛选** → **技术一面（基础语言功底、JS 陷阱与手写）** → **技术二面（架构设计、金融风控与监控）** → **部门总监面** → **HR面试**
   - 总流程约2周
   - 难度: 4/5星
   - 通过率: 约15%

## 题库

### P0 必考知识点

#### `['1', '12', '13'].map(parseInt)` 的执行结果与进制转换底层原理？ {#p0-map-parseint-radix}

<Answer>

### 核心结论

输出结果为：**`[1, NaN, 1]`**。
原因在于 `Array.prototype.map` 向回调函数传递三个参数 `(item, index, array)`，而 `parseInt(string, radix)` 接收两个参数 `(string, radix)`，导致数组下标 `index` 被隐式作为 `parseInt` 的**进制基数（radix）**传入。

---

### 原理解析与逐步推演

```javascript
['1', '12', '13'].map((item, index) => parseInt(item, index))
```

1. **第一轮：`parseInt('1', 0)`**：
   - 规范规定：当 `radix` 为 `0`、`undefined` 或未指定时，若字符串不以 `0x` 开头，则**默认按 10 进制解析**。
   - `parseInt('1', 10)` 结果为 **`1`**。
2. **第二轮：`parseInt('12', 1)`**：
   - 进制基数 `radix` 的合法有效区间为 `2 ~ 36`。
   - 基数传入 `1` 为非法基数，直接返回 **`NaN`**。
3. **第三轮：`parseInt('13', 2)`**：
   - 按 2 进制解析字符串 `'13'`。
   - 二进制只识别字符 `'0'` 和 `'1'`，遇到非法字符 `'3'` 立即终止解析，仅提取前面的 `'1'` 作为二进制数解析。
   - 二进制 `'1'` 转为十进制数值为 **`1`**。

### 正确写法

若需将字符串数组纯粹转为十进制整数，应传入具名纯函数或一元数字转换：
```javascript
['1', '12', '13'].map(Number) // [1, 12, 13]
['1', '12', '13'].map(item => parseInt(item, 10)) // [1, 12, 13]
```

---

### 面试官视角

经典 JS 语法陷阱考题。面试官考察候选人对 ECMAScript 规范细节、函数隐式传参及防御性编程意识。

</Answer>

#### 金融前端全局错误监控与白屏异常上报 SDK 如何设计？ {#p0-frontend-error-monitor-sdk}

<Answer>

### 核心结论

金融应用对前端资金损失与白屏故障“零容忍”。一个完备的监控 SDK 需涵盖**JS 运行时报错、未捕获 Promise reject、静态资源加载 404、白屏检测（Paint Timing / DOM 采样）及用户信息/操作链脱敏上报**。

---

### 核心设计与数据采集

1. **JS 运行时错误（window.onerror）**：
   ```javascript
   window.onerror = (message, source, lineno, colno, error) => {
     reportError({ type: 'js', message, stack: error?.stack, source, lineno })
   }
   ```
2. **未处理的异步 Promise 异常**：
   ```javascript
   window.addEventListener('unhandledrejection', (event) => {
     reportError({ type: 'promise', reason: event.reason?.message || event.reason })
   })
   ```
3. **静态资源 404 捕获**：
   - 必须在捕获阶段监听（`capture: true`），因为资源错误不冒泡：
   ```javascript
   window.addEventListener('error', (event) => {
     if (event.target && (event.target.src || event.target.href)) {
       reportError({ type: 'resource', tag: event.target.tagName, url: event.target.src || event.target.href })
     }
   }, true)
   ```
4. **白屏快速探测（DOM 关键点采样）**：
   - 页面加载 3 秒后，选取屏幕中心点及四角等 9~16 个关键坐标，调用 `document.elementsFromPoint(x, y)`；若所有点命中的均为根容器标签（如 `#app`、`body`）且无文本或子组件，判定为白屏故障，触发紧急告警。
5. **行为追踪与面包屑（Breadcrumbs）**：
   - 记录用户报错前最近 10 次的点击（Click）、路由跳转（Hash/History）与关键请求（Fetch/XHR），便于快速复现。

---

### 面试官视角

平安科技极度看重生产系统的质量保证。面试官常追问：监控 SDK 自身报错如何避免死循环？（必须使用 try-catch 包裹上报逻辑并限制发送频率）上报接口失败如何兜底？（采用 `navigator.sendBeacon` 或本地 IndexedDB 暂存）。

</Answer>

### P1 高频知识点

#### WebSocket 是否受同源策略限制及生产安全鉴权方案？ {#p1-websocket-cors-auth}

<Answer>

### 核心结论

**WebSocket 不受浏览器同源策略（SOP）限制**，可以自由向任意域名的 WebSocket 服务器发起连接。然而，这带来严重的 **跨站点 WebSocket 劫持（CSWSH - Cross-Site WebSocket Hijacking）** 风险。

---

### 安全防范与鉴权策略

1. **服务端校验 `Origin` 请求头**：
   - 浏览器在建立 WebSocket 连接（HTTP Upgrade 握手阶段）会自动带上当前页面的 `Origin`。
   - 服务端必须维护严格的白名单校验，若 `Origin` 不合法，立即在握手阶段拒绝并返回 403。
2. **连接凭据 Ticket/Token 鉴权（杜绝裸 Cookie）**：
   - 避免直接依赖 Cookie 自动携带进行身份验证。
   - 方案：先通过标准 HTTPS 接口获取一个具备短期时效性的单次校验令牌 `wsTicket`，在发起连接时带在子协议或查询参数中 `wss://api.pingan.com/ws?ticket=abc123xyz`，服务端完成校验后立即作废该 ticket。
3. **传输层全量强制 WSS（TLS 加密）**：
   - 严禁使用明文 `ws://`，全部采用 `wss://` 防止中间人劫持与篡改。

---

### 延伸阅读

- [OWASP 跨站 WebSocket 劫持防御指南](https://owasp.org/www-community/attacks/Cross-Site_WebSocket_Hijacking)
- [MDN parseInt 规范文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

</Answer>

## 考察重点速览

- **必考知识点**: JavaScript 语言规范与底层细节、前端监控体系、WebSocket 通信与安全策略、MVVM 响应式原理。
- **高频面试题**: `map(parseInt)` 执行分析、前端白屏与错误上报 SDK 设计、this 绑定丢失场景与 call/apply/bind 区别、CSS BEM 规范。
- **编程挑战**: 手写简易错误捕获 SDK、实现深拷贝、手写 Promise.allSettled。

## 备考建议

**针对性准备策略**
- **严谨的技术功底与规范意识**: 平安面试非常看重基础语法的熟练度与代码健壮性，准备常见手写题与执行机制。
- **结合金融科技场景答题**: 回答问题时融入数据隐私安全、前端风控、离线缓存与故障监控指标。

**推荐准备资源**
- [平安科技官方技术网站](https://tech.pingan.com/)
- [Sentry 前端错误捕获原理剖析](https://github.com/getsentry/sentry-javascript)

**差异化准备建议**
- **校招生**: 重视 JS 核心概念、DOM 事件机制、常用算法与计算机网络。
- **社招生**: 突出大型中后台系统架构设计、金融级系统稳定性治理与监控告警闭环经验。

