# 腾讯✅

- **业务领域**: 社交通讯（微信/QQ）、数字内容、互动娱乐（游戏）、金融科技、腾讯云与产业互联网
- **技术栈**: React、Vue、TypeScript、Node.js、小程序开发框架、跨端混合开发（Electron/Hippymvvm）、WebAssembly
- **团队规模**: 前端团队约3000+人（分布于 WXG、IEG、PCG、CSIG、TEG 等事业群）
- **办公地点**: 深圳（总部）、广州、北京、上海、成都、武汉
- **公司性质**: 互联网
- **薪资水平**: 校招24-42万，社招35-90万+

## 岗位类型

- **前端开发工程师** - 负责微信小程序生态、QQ/微信桌面端、腾讯视频、腾讯文档等千万级产品 Web 端研发
- **高级前端工程师** - 负责大前端跨端基建（Hippy/Electron）、组件化规范、性能调优与稳定性监控体系建设
- **全栈开发工程师** - 负责 Node.js BFF 中台、Serverless 云函数、微服务网关与内部研发提效工具链
- **大前端架构师** - 负责事业群级别技术演化、自研渲染引擎优化及核心技术决策

## 技术特色

- **海量并发与高可用架构**: 面对微信、QQ 亿级并发场景，对网络弱网降级、容灾备份、数据监控报警（BadJS/Aegis）有极高标准。
- **跨端混合引擎深度自研**: 深度探索自研跨端框架（Hippy）、Electron 深度内存与启动耗时优化（腾讯文档/新版 QQ）、WebAssembly 高性能计算。
- **小程序与富文本协作基建**: 拥有微信小程序原生渲染框架及腾讯文档 OT 协同编辑引擎核心技术沉淀。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **在线笔试** → **技术一面（基础与算法）** → **技术二面（项目深挖）** → **技术三面（总监面）** → **HR面试**
   - 总流程约3-4周
   - 难度: 4.5/5星
   - 通过率: 约5%

### 社会招聘

1. **简历筛选** → **技术一面（技术功底与源码）** → **技术二面（业务架构与攻坚）** → **技术三面/交叉面（综合视野）** → **HR面试**
   - 总流程约2-3周
   - 难度: 4.5/5星
   - 通过率: 约8%

## 题库

### P0 必考知识点

#### 事件委托（Event Delegation）的底层原理、应用场景及边界缺陷？ {#p0-event-delegation}

<Answer>

### 核心结论

事件委托是利用 **DOM 事件冒泡机制**，将子元素的事件监听器统一绑定至父级容器，由父容器通过 `event.target` 统一分发处理。该模式能大幅降低 DOM 节点绑定的事件监听器数量，从而节约内存，并天然支持动态新增子节点无需重新绑定事件。

---

### 原理解析与实现

DOM 事件流包含三个阶段：**捕获阶段（Capture） → 目标阶段（Target） → 冒泡阶段（Bubble）**。
事件委托依靠冒泡阶段，在父级节点触发回调：

```javascript
function delegate(parentElement, selector, eventType, handler) {
  parentElement.addEventListener(eventType, function (event) {
    let target = event.target
    // 处理嵌套元素向上寻找匹配 selector 的真实节点
    while (target && target !== parentElement) {
      if (target.matches(selector)) {
        handler.call(target, event)
        break
      }
      target = target.parentNode
    }
  })
}
```

### 适用与不适用场景

- **适用**：长列表点击、表格行操作、动态增加/删除列表项。
- **不适用/限制**：
  1. **不冒泡的事件**：`focus`、`blur`（需改用 `focusin`、`focusout`）、`mouseenter`、`mouseleave`（需改用 `mouseover`、`mouseout`）、媒体事件（`play`、`pause`）。
  2. **事件传播被阻断**：若子元素内部调用了 `event.stopPropagation()`，父级将无法接收事件。

---

### 面试官视角

腾讯面试官不仅看候选人能否说出基本原理，更重点考察嵌套复杂子标签时 `event.target` 与 `matches()` 的递归判定，以及不能冒泡事件的替代处理方案。

</Answer>

#### `new` 操作符与 `instanceof` 的底层机制与手写实现？ {#p0-new-instanceof}

<Answer>

### 核心结论

- `new` 操作符的本质是：创建一个新对象，将其原型指向构造函数的 `prototype`，绑定 `this` 执行构造函数，并根据返回值类型决定返回新对象还是显式返回的对象。
- `instanceof` 的本质是：沿着对象的原型链（`__proto__`）向上追溯，判断构造函数的 `prototype` 是否出现在该链上。

---

### 规范手写实现

```javascript
// 手写 new 操作符
function myNew(Constructor, ...args) {
  if (typeof Constructor !== 'function') {
    throw new TypeError('Constructor must be a function')
  }
  // 1. 创建以构造函数 prototype 为原型的对象
  const obj = Object.create(Constructor.prototype)
  // 2. 绑定 this 并执行构造函数
  const result = Constructor.apply(obj, args)
  // 3. 若返回值是引用对象则返回该结果，否则返回新创建的对象
  return (typeof result === 'object' && result !== null) || typeof result === 'function'
    ? result
    : obj
}

// 手写 instanceof
function myInstanceof(left, right) {
  if (left === null || (typeof left !== 'object' && typeof left !== 'function')) {
    return false
  }
  let proto = Object.getPrototypeOf(left)
  const prototype = right.prototype
  while (proto !== null) {
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
  return false
}
```

---

### 面试官视角

这是腾讯一面高频考查的核心基础手写题。考点集中在边界判断：构造函数显式返回基本类型 vs 引用类型的返回值取舍；`instanceof` 对基本数据类型直接返回 `false` 以及原型追溯至 `Object.prototype.__proto__ === null` 终止条件。

</Answer>

### P1 高频知识点

#### 现代前端跨域通信方案演进与安全防护？ {#p1-cors-security}

<Answer>

### 核心结论

同源策略（SOP）限制了不同源（协议/域名/端口）之间的 DOM 访问与网络请求。现代 Web 开发中，跨域解决方案首选 **CORS（跨源资源共享）**，在开发环境采用 **DevServer 反向代理**，生产架构采用 **Nginx/网关代理**，特殊跨窗口交互采用 **`postMessage`**。

---

### CORS 核心机制

1. **简单请求 vs 预检请求（Preflight）**：
   - 满足 GET/POST/HEAD、简单标头且 Content-Type 为 `text/plain`、`multipart/form-data`、`application/x-www-form-urlencoded` 为简单请求。
   - 自定义 Header（如 `Authorization`）或 JSON 格式会触发 `OPTIONS` 预检请求，服务端需响应 `Access-Control-Allow-Origin`、`Access-Control-Allow-Methods`、`Access-Control-Allow-Headers` 与 `Access-Control-Max-Age`。
2. **跨域携带 Cookie 凭证**：
   - 前端必须配置 `xhr.withCredentials = true` 或 `fetch(url, { credentials: 'include' })`。
   - 服务端必须设置 `Access-Control-Allow-Credentials: true`，且 `Access-Control-Allow-Origin` **不得配置为通配符 `*`**，必须是明确的域名。

---

### 延伸阅读

- [MDN 跨源资源共享 (CORS) 标准](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS)
- [Web 安全与同源策略防御](https://cheatsheetseries.owasp.org/)

</Answer>

## 考察重点速览

- **必考知识点**: JavaScript 闭包、原型链、事件机制与异步机制（Promise/Async）；HTTP 协议与安全策略（CORS/XSS/CSRF）。
- **高频面试题**: 手写 new/instanceof/Promise、页面生命周期（DOMContentLoaded vs load）、跨域方案、浏览器重排与重绘。
- **编程挑战**: 原生手写实现、算法题（二叉树翻转、链表操作、回溯/动态规划）、组件抽象能力。

## 备考建议

**针对性准备策略**
- **严谨的技术功底与原理剖析**: 腾讯技术面试深度极高，喜欢从一个常见 API 追问至底层 V8 引擎解析及 C++ 抽象层。
- **注重用户体验与性能指标**: 腾讯产品多为国民级应用，回答项目时需强调海量用户下的稳定性、加载耗时与边界防护。

**推荐准备资源**
- [腾讯前端团队技术周刊与博客 (AlloyTeam)](http://www.alloyteam.com/)
- [腾讯云开发者社区](https://cloud.tencent.com/developer)

**差异化准备建议**
- **校招生**: 重点考查扎实的计算机系统基础、算法刷题量（LeetCode Hot 100）及良好的逻辑表达能力。
- **社招生**: 深度考察高并发业务场景实战经验、架构设计、技术选型与跨业务团队沟通协同。

