# 小红书✅

- **业务领域**: 生活方式社区、内容电商、推荐流与搜索广告、创作者生态
- **技术栈**: React、Vue 3、TypeScript、React Native、Node.js、WebAssembly、GraphQL
- **团队规模**: 前端团队约500+人
- **办公地点**: 上海（总部）、北京、武汉、广州
- **公司性质**: 互联网
- **薪资水平**: 校招25-42万，社招35-85万+

## 岗位类型

- **前端开发工程师** - 负责小红书 Web 端社区、创作者服务平台、电商商家端及小程序研发
- **高级前端工程师** - 负责双列瀑布流渲染引擎、图像/视频 Web 渲染器、多端容器及首屏性能深度调优
- **大前端架构师** - 负责前端工程化架构、跨端 React Native 基础设施演进及高可用容灾建设

## 技术特色

- **双列无限瀑布流与动态高度重排**: 针对社区海量图文笔记与视频卡片，攻坚自适应高度计算、图片占位预排版与防跳动虚拟瀑布流渲染。
- **现代跨端与多端同构架构**: 深度融合 React Native 与 Web 容器，沉淀一套代码多端投放能力及离线包预加载体系。
- **Service Worker 离线降级与边缘缓存**: 大量采用 Service Worker 拦截笔记静态资源，配合 Cache Storage 打造弱网/无网离线浏览体验。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **在线笔试（算法 + 前端基础）** → **技术一面** → **技术二面** → **HR面试**
   - 总流程约3-4周
   - 难度: 4/5星
   - 通过率: 约6%

### 社会招聘

1. **简历筛选** → **技术一面（同行评审 + 赛码网在线编程）** → **技术二面（直属主管面）** → **技术三面（交叉业务线负责人）** → **CTO/总监面** → **HR面试**
   - 总流程约2-3周
   - 难度: 4.5/5星
   - 通过率: 约8%

## 题库

### P0 必考知识点

#### 小红书 Web 端双列异步瀑布流与无限虚拟滚动如何实现？ {#p0-waterfall-virtual-list}

<Answer>

### 核心结论

小红书核心场景是**双列卡片不定高瀑布流**。传统瀑布流在长距离滚动后会累积上万个 DOM 节点导致内存溢出与掉帧。标准解决方案是**贪心高度插入算法 + 预估高度计算 + 视口绝对定位虚拟回收池（Virtual Waterfall）**。

---

### 关键实现逻辑

1. **双列贪心高度追加**：
   - 维护两个列的高度数组 `[col0Height, col1Height]`。
   - 每张笔记封面通常服务端下发原始宽高比 `aspectRatio`，前端在图片未加载前即可精确算出渲染高度 `height = cardWidth / aspectRatio + textPadding`。
   - 每次将新卡片追加至当前高度较小的一列：
     ```javascript
     const minCol = col0Height <= col1Height ? 0 : 1
     card.style.top = `${colHeights[minCol]}px`
     card.style.left = `${minCol * (cardWidth + gap)}px`
     colHeights[minCol] += card.offsetHeight + gap
     ```
2. **虚拟视口回收与绝对定位**：
   - 监听滚动的 `scrollTop`，设定上下缓冲区（如上下各 1.5 个屏幕高度）。
   - 仅挂载落在 `[scrollTop - buffer, scrollTop + windowHeight + buffer]` 范围内的卡片真实 DOM，离开视口的卡片仅保留其在数组中的位置与高度数据，释放 DOM 与内存。
3. **防止图片闪烁与骨架占位**：
   - 严格依托宽高比预留骨架容器，禁用图片异步加载完成后的重排抖动；配合 `IntersectionObserver` 懒加载真实大图。

---

### 面试官视角

面试官考察候选人对瀑布流重排痛点的理解、服务端数据契约制定（是否要求下发图片宽高）、DOM 虚拟化算法设计及在复杂图文混排场景下的性能调优能力。

</Answer>

#### 实现一个支持异步的中间件洋葱模型调度器（Middleware Runner）？ {#p0-middleware-onion}

<Answer>

### 核心结论

类似 Express/Koa 的中间件机制是处理请求流水线、插件系统的通用范式。实现洋葱模型调度器（Koa Compose 算法）的核心是**利用递归调用 `next()` 并返回 Promise，逐层向内传递并在内层结束后倒序向外回溯**。

---

### 规范代码实现

```javascript
class MiddlewareApp {
  constructor() {
    this.middlewares = []
  }

  use(fn) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be a function')
    this.middlewares.push(fn)
    return this
  }

  run(context = {}) {
    let index = -1
    const dispatch = (i) => {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      const fn = this.middlewares[i]
      if (!fn) return Promise.resolve()

      try {
        return Promise.resolve(fn(context, () => dispatch(i + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return dispatch(0)
  }
}

// 使用示例
const app = new MiddlewareApp()
app.use(async (ctx, next) => {
  console.log('1 - Start')
  await next()
  console.log('1 - End')
})
app.use(async (ctx, next) => {
  console.log('2 - Start')
  await new Promise(resolve => setTimeout(resolve, 100))
  console.log('2 - Middle')
  await next()
  console.log('2 - End')
})

app.run()
// 输出顺序：
// 1 - Start -> 2 - Start -> 2 - Middle -> 2 - End -> 1 - End
```

---

### 面试官视角

考查候选人对异步编程、Promise 链式传递、闭包状态拦截与防御性编程（如防止单个中间件内多次重复调用 `next()`）的掌握深度。

</Answer>

### P1 高频知识点

#### 安全访问嵌套对象属性 `lodash.get` 的优雅实现？ {#p1-lodash-get}

<Answer>

### 核心结论

在前端处理深层嵌套接口数据（如 `user.info.addresses[0].city`）时，直接链式访问易抛出 `TypeError: Cannot read properties of undefined`。手写 `lodash.get` 需支持**字符串路径（带方括号下标转换）、路径数组解析与默认兜底值**。

---

### 规范手写实现

```javascript
function get(object, path, defaultValue = undefined) {
  // 1. 边界防御
  if (object == null) return defaultValue

  // 2. 规范化路径：将 a[0].b 统一转换为 ['a', '0', 'b']
  const keys = Array.isArray(path)
    ? path
    : String(path)
        .replace(/\[(\w+)\]/g, '.$1') // 将 [0] 替换为 .0
        .replace(/^\./, '')           // 移除开头的点
        .split('.')

  // 3. 循环遍历提取属性
  let current = object
  for (const key of keys) {
    if (current == null) return defaultValue
    current = current[key]
  }

  // 4. 若最终值为 undefined 则回退默认值
  return current === undefined ? defaultValue : current
}

// 测试用例
const data = { a: [{ b: { c: 3 } }] }
console.log(get(data, 'a[0].b.c')) // 3
console.log(get(data, ['a', '0', 'b', 'c'])) // 3
console.log(get(data, 'a.b.c', 'default')) // 'default'
```

---

### 延伸阅读

- [Lodash.get 官方规范实现](https://github.com/lodash/lodash/blob/master/get.js)
- [可选链操作符 Optional Chaining (?.) 浏览器支持与 Babel 转译](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining)

</Answer>

## 考察重点速览

- **必考知识点**: 原生 JavaScript 深入理解、异步编程（Promise/洋葱模型）、跨端通信机制、瀑布流与虚拟滚动。
- **高频面试题**: 瀑布流布局防抖与高度计算、`lodash.get` 实现、Service Worker 离线存储策略、项目难点深度复盘。
- **编程挑战**: 赛码网在线算法编码（中等难度）、手写中间件系统、复杂深层路径提取、DOM 事件与手势模拟。

## 备考建议

**针对性准备策略**
- **业务场景契合度**: 深入分析小红书社区内容展现（双列瀑布流、长图浏览、离线浏览、点赞收藏实时动效）的实现机制。
- **在线编程实战**: 小红书技术面试每一轮都紧扣赛码网在线手写题，务必熟悉纯手写无自动补全的编码环境。

**推荐准备资源**
- [小红书技术团队技术博客](https://www.xiaohongshu.com/)
- [Koa 核心源码精读](https://github.com/koajs/koa)

**差异化准备建议**
- **校招生**: 重点考察 JS 语言底层基础、算法熟练度与自驱力，需提前熟悉常见手写题。
- **社招生**: 深入考察复杂中后台架构、跨端多技术栈融合落地、高并发 C 端渲染优化与团队梯队管理能力。

