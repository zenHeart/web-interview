# 字节跳动✅

- **业务领域**: 内容平台、短视频、直播、社交、电商、企业协同办公
- **技术栈**: React、Vue 3、TypeScript、Node.js、Next.js、跨端框架（Lynx/Electron）、WebAssembly
- **团队规模**: 前端团队约2000+人
- **办公地点**: 北京、上海、深圳、杭州、广州、成都、武汉
- **公司性质**: 互联网
- **薪资水平**: 校招25-45万，社招35-100万+

## 岗位类型

- **前端开发工程师** - 负责抖音、今日头条、西瓜视频等核心产品的 Web/移动 H5/小程序端研发
- **高级前端工程师** - 负责复杂跨端架构、核心组件库建设、性能攻坚与高可用治理
- **前端架构师** - 负责大前端技术基础设施建设、编译器/工具链定制与前沿技术预研（如 Rust 前端工具、Lynx 原生渲染）
- **全栈开发工程师** - 负责飞书套件、企业内部中后台服务、Node.js BFF 架构与分布式数据服务

## 技术特色

- **极致性能与首屏优化**: 围绕百万级 QPS 与弱网场景，深入实践 SSR/SSG、资源预热、离线缓存与秒开体验。
- **现代前端工程化与工具链**: 内部自研与广泛应用 Rust/Go 工具链（如 Rspack/Rsbuild）、Monorepo 统一代码仓库管理。
- **自研跨端引擎与多端同构**: 自研高性能跨端渲染框架 Lynx，深度融合 Web 生态与原生高性能体验。
- **富文本与在线协作基建**: 飞书团队在 Canvas/SVG 渲染引擎、OT/CRDT 实时协同算法、大文档性能优化上处于业界领先水平。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **在线笔试** → **技术面试2-3轮** → **HR面试**
   - 总流程约3-4周
   - 难度: 4.5/5星
   - 通过率: 约5%

### 社会招聘

1. **简历筛选** → **技术一面** → **技术二面** → **技术三面/交叉面** → **HR面试**
   - 总流程约2-3周
   - 难度: 4.5/5星
   - 通过率: 约8%

## 题库

### P0 必考知识点

#### React Hooks 闭包陷阱产生原因与解决方案？ {#p0-react-hooks-closure}

<Answer>

### 核心结论

React 函数组件在每次渲染时都会生成全新的闭包环境。当 `useEffect`、`useCallback` 或事件监听器捕获了**过时渲染帧（Stale State）**中的状态变量，且未在依赖项数组（`deps`）中声明该状态，就会触发闭包陷阱，导致读取到历史旧值。

---

### 原理解析

1. **Fiber 与快照机制**：函数组件每次执行都是一次快照渲染，局部变量在调用那一刻被捕获固定。
2. **异步回调滞后**：`setTimeout`、`setInterval`、Promise 或 DOM 事件监听器如果在挂载时创建（空依赖 `[]`），其回调函数内部引用的变量将永远停留在初次渲染时刻。

### 解决方案

1. **补充依赖项（ESLint exhaustive-deps）**：在依赖数组中完整列出使用的状态。
2. **函数式更新（Functional Updates）**：使用 `setCount(prev => prev + 1)`，直接读取最新内部状态，避免闭包捕获。
3. **`useRef` 缓存最新引用（useLatest 模式）**：
   ```typescript
   function useLatest<T>(value: T) {
     const ref = useRef(value)
     ref.current = value
     return ref
   }
   ```
4. **`useReducer` 替代复杂状态逻辑**：通过 dispatch 派发 action，解耦渲染闭包与状态逻辑。

---

### 面试官视角

字节跳动极度看重候选人对 React 底层机制的深入理解。面试官通常会先提供一段带闭包陷阱的计时器代码，观察候选人能否在 10 秒内识别 bug，随后考察自定义 Hooks（如 `useInterval`、`useMemoizedFn`）的设计能力。

</Answer>

#### 手写带并发限制的异步调度器（Scheduler） {#p0-async-pool}

<Answer>

### 核心结论

在海量请求（如切片上传、静态资源并发拉取）场景下，无限制并发会导致浏览器网络阻塞、连接雪崩或内存溢出。实现带并发控制的异步池核心在于**维护正在执行的任务集合（Executing Set），借助 `Promise.race` 动态腾出空闲槽位**。

---

### 规范代码实现

```typescript
class PromisePool {
  private limit: number
  private running: number = 0
  private queue: Array<() => Promise<any>> = []

  constructor(limit: number) {
    this.limit = limit
  }

  add<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      const task = async () => {
        try {
          const result = await fn()
          resolve(result)
        } catch (err) {
          reject(err)
        } finally {
          this.running--
          this.runNext()
        }
      }

      if (this.running < this.limit) {
        this.running++
        task()
      } else {
        this.queue.push(task)
      }
    })
  }

  private runNext() {
    if (this.queue.length > 0 && this.running < this.limit) {
      this.running++
      const nextTask = this.queue.shift()!
      nextTask()
    }
  }
}
```

---

### 面试官视角

字节跳动技术一面/二面几乎必出手写题。除代码正确性外，面试官着重考察边界异常处理（如某个 promise reject 后是否导致后续任务挂死）、TypeScript 类型定义完整性以及是否具备高并发场景工程思考。

</Answer>

### P1 高频知识点

#### 抖音/西瓜视频 Web 端长列表与短视频滑动渲染设计？ {#p1-virtual-scroll-feed}

<Answer>

### 核心结论

针对短视频信息流（Feed）与超大数据列表，传统 DOM 渲染会导致节点数超标，触发严重的内存占用与滚动掉帧。核心方案是**虚拟滚动（Virtual List）结合视口前后缓冲池（Buffer Zone）与 DOM 节点复用池（Recycle Pool）**。

---

### 关键设计维度

1. **三屏滑动窗口（Previous - Current - Next）**：
   - 维持视口内当前视频及上下各预加载 1-2 个视频的真实 DOM，其余采用占位容器计算绝对定位偏移（`transform: translateY`）。
2. **资源与解码控制**：
   - 仅当前激活视频开启解码与自动播放；
   - 预加载视频仅下载前缓冲段（range 请求前 1MB）；远离视口的视频及时调用 `video.pause()`、清理 `src` 并释放 MediaSource 内存。
3. **交互手势优化**：
   - 使用 CSS `touch-action: pan-y` 配合 `requestAnimationFrame` 驱动手势平滑过渡，避免 JavaScript 主线程滚动卡顿。

---

### 延伸阅读

- [字节跳动 Web 性能极致优化实践](https://tech.bytedance.com/)
- [DOM 节点复用与无限滚动机制](https://web.dev/virtualize-long-lists-react-window/)

</Answer>

## 考察重点速览

- **必考知识点**: JavaScript 底层机制（事件循环、原型链、垃圾回收）、React/Vue 源码原理与状态调度、网络与 HTTP/2/3 传输协议。
- **高频面试题**: 闭包陷阱、Fiber 调度架构、首屏优化指标（LCP/FID/CLS）、前端工程化工具链（Rspack/Webpack）。
- **编程挑战**: 手写 Promise/Scheduler 并发限制、实现深拷贝（循环引用处理）、虚拟滚动列表、LRU 缓存。

## 备考建议

**针对性准备策略**
- **注重算法与手写能力**: 字节每轮面试均有 1-2 道算法题（LeetCode Medium 级别），需熟练掌握双指针、动态规划、二叉树与链表翻转。
- **项目深度与指标量化**: 准备 1-2 个技术亮点突出的项目，清晰阐述技术选型考量、性能瓶颈量化指标（如 LCP 从 2.8s 优化至 0.9s 的手段）与架构演进。
- **对前沿技术保持敏锐**: 了解 WebAssembly、Rust 前端基建、现代跨端机制等最新技术趋势。

**推荐准备资源**
- [React 官方文档](https://react.dev/)
- [字节跳动技术团队博客](https://tech.bytedance.com/)
- [字节面试真题汇总](https://fe.ecool.fun/)

**差异化准备建议**
- **校招生**: 扎实掌握计算机网络、操作系统、数据结构与算法及 JS 原生核心，展现高学习敏锐度。
- **社招生**: 深入考察大型系统架构设计、复杂工程化治理能力、跨团队协同与技术主导落地经验。

