# 顺丰速运（武汉研发中心）✅

## 基本信息

- **业务领域**: 智慧物流生态、供应链协同平台、国际货运追踪、数字化仓储与末端配送
- **技术栈**: Vue3 / React / TypeScript / Node.js / Webpack / Vite / 微前端 (qiankun) / GIS
- **团队规模**: 2,000+ 人（顺丰科技武汉研发中心）
- **办公地点**: 武汉市东湖高新区光谷软件园 F4 栋 / 顺丰科技武汉基地
- **公司性质**: 物流领军上市公司（顺丰控股 002352.SZ）
- **薪资水平**: 15k-30k * 14-16薪 + 年终丰厚绩效 + 员工关怀

---

## 岗位类型

- **高级前端工程师**: 负责智慧供应链管理平台、运单全生命周期追踪看板及客户门户系统研发。
- **物流可视化与 GIS 专家**: 负责智慧运力大屏、车辆轨迹动态回放、自动化立体仓库 3D 数字孪生系统。
- **前端架构师**: 负责跨部门数十个供应链业务系统的微前端整合、统一组件物料库及前端构建部署效能提升。

---

## 技术特色

1. **超大规模智慧物流中转与轨迹可视化**：
   - 面向全国数万个网点与亿级运单，结合 Leaflet/Mapbox 与 Canvas/WebGL，实现海量运输车辆轨迹的高性能平滑动画与聚合展示。
2. **微前端大型集群治理**：
   - 基于微前端方案（qiankun）对庞大的顺丰供应链系统进行微应用拆解，实现仓储、干线、关务、结算等子系统解耦部署与独立演进。
3. **严苛的生产级 Webpack 缓存与工程化控制**：
   - 深度调优 Webpack 代码分割与 `runtimeChunk`，保证业务代码热变更不影响底层公共 Vendor 缓存，极致提升全球节点 CDN 命中率。

---

## 面试流程概览

### 校招流程
1. **在线网申与机试**: 计算机网络、基础算法（链表、树、排序）、JavaScript 语言核心。
2. **专业一面 (45-60min)**: 核心语法机制、事件循环、异步调度、CSS 核心与框架原理。
3. **专业二面 (60min)**: 重点项目落地深度、系统设计（大屏/微前端/长连接）、编码手撕。
4. **HR 面 (30min)**: 综合素质、团队合作、抗压能力与薪资意向。

### 社招流程
1. **技术初试 (60min)**: 针对简历深挖过往供应链/企业级系统设计，现场手撕链式异步调度器与工程化提问。
2. **技术复试 (60min)**: 考察微前端沙箱隔离、大型打包构建性能瓶颈攻坚、跨团队推动力与架构演进。
3. **业务总监/部门技术负责人面 (45min)**: 业务理解度、物流数字化创新思考与团队管理。
4. **HR 面与发薪**: 背景调查与 Offer 审批。

---

## 题库

### P0 核心必考题

#### 1. 手写链式异步任务调度器：实现 `Hello().say('tom').sleep(5).say('jerry').sleep(10).say('tom')`？ {#p0-chain-async-scheduler}

<Answer>
**核心结论**：
该题目是典型的**异步任务队列链式调度（Task Queue / Lazy Man 变体）**。解题核心在于：链式调用（`say`、`sleep`）只负责将待执行的具体动作封装为闭包任务压入内部队列，并返回 `this`；而在当前同步执行栈结束（宏任务微任务之后），通过微任务或异步事件触发队列的顺序消费（基于 `Promise` 或 `async/await` 按序串行调度执行）。

**原理解析与代码手写**：
1. **构建链式调用上下文**：
   - 构造一个类或闭包函数返回带有 `say` 和 `sleep` 方法的对象。
   - 内部维护一个 `tasks` 任务队列数组。
2. **异步触发执行引擎**：
   - 在构造函数或工厂函数返回前，使用 `Promise.resolve().then(...)` 或 `setTimeout(..., 0)` 注册一个延迟执行任务，确保所有的同步链式配置先入队完毕。
3. **串行执行任务**：
   - 依次从队列头部取出任务执行。对于普通的 `say`，同步打印后立即调度下一个；对于 `sleep`，返回一个定时器 Promise，等待指定秒数后再调度下一个任务。

**标准生产级代码实现**：
```typescript
class ChainTaskRunner {
  private queue: Array<() => Promise<void>> = [];

  constructor() {
    // 延迟到同步调用链全部注册完毕后启动调度
    Promise.resolve().then(() => {
      this.runNext();
    });
  }

  public say(name: string): this {
    this.queue.push(async () => {
      console.log(name);
    });
    return this;
  }

  public sleep(seconds: number): this {
    this.queue.push(() => {
      return new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
      });
    });
    return this;
  }

  private async runNext() {
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) {
        await task();
      }
    }
  }
}

// 工厂函数
export function Hello(): ChainTaskRunner {
  return new ChainTaskRunner();
}

// 验证测试
// 1. 同步即时输出
// Hello().say('tom');

// 2. 延迟 5 秒后输出
// Hello().sleep(5).say('tom');

// 3. 复杂链式：先输出 tom，延迟 5s 输出 jerry，再延迟 10s 输出 tom
// Hello().say('tom').sleep(5).say('jerry').sleep(10).say('tom');
```

**面试官视角**：
- 考核候选人对 JavaScript 事件循环异步启动时机的理解，以及对队列设计模式与链式调用的熟练运用。
- 进阶追问：“如果要支持 `sleepFirst(seconds)`，在最开始就要强制优先等待怎么办？”
- 答：“只需在入队时使用 `this.queue.unshift(...)` 将等待任务直接插入到队列最头部即可。”
</Answer>

#### 2. Webpack `optimization.runtimeChunk` 的底层作用与长效缓存（Long Term Cache）失效防范？ {#p0-webpack-runtime-chunk}

<Answer>
**核心结论**：
Webpack 打包生成的各个 Chunk 之间存在依赖关系，Webpack 需要一小段运行时的引导代码（Runtime 代码，负责维护 Chunk 映射表、模块加载器 `__webpack_require__` 与 `import()` 动态加载逻辑）。如果不配置 `runtimeChunk`，这部分运行时代码会被默认注入到入口主文件（如 `app.js`）中。当任意一个异步子模块被修改时，其 Chunk Hash 发生改变，**导致主文件的 Runtime 映射表被动更新，进而导致原本毫无改动的 `app.js` 的文件 Hash 也发生变化，强缓存彻底失效**！配置 `runtimeChunk: 'single'` 可以将运行时引导代码抽离为独立的单文件，彻底切断无辜主文件的连带失效。

**原理解析与配置实操**：
1. **模块哈希连带失效痛点**：
   - 假如有 `app.js`（入口）和异步加载的 `about.js`。
   - `app.js` 内部包含了关于 `about.js` 真实生成文件名的映射：`{ 0: "about.a8f9c.js" }`。
   - 开发者修改了 `about.vue` 的一行文字，构建生成 `about.b2e1d.js`。
   - 由于映射表变了，`app.js` 的源码内容被更改，最终 `app.js` 生成的 Hash 也从 `app.777.js` 变成了 `app.888.js`！用户浏览器被迫全量重新下载整个首屏 `app.js`。
2. **解决方案：抽取独立 Runtime Chunk**：
   ```javascript
   // webpack.config.js
   module.exports = {
     entry: './src/index.js',
     output: {
       filename: '[name].[contenthash:8].js',
       chunkFilename: '[name].[contenthash:8].chunk.js',
     },
     optimization: {
       runtimeChunk: 'single', // 将运行时代码单独提取为一个 runtime.xxx.js 文件
       splitChunks: {
         chunks: 'all',
         cacheGroups: {
           vendor: {
             test: /[\\/]node_modules[\\/]/,
             name: 'vendors',
             chunks: 'all',
           }
         }
       }
     }
   };
   ```
3. **收益对比**：
   - 配置后，变化被严格圈定在 `about.js` 和体积仅数 KB 的 `runtime.js` 两个文件内。
   - 体积庞大的主代码 `app.js` 和第三库依赖包 `vendors.js` 的 ContentHash 保持绝对恒定，继续命中客户端永久强缓存（`Cache-Control: max-age=31536000, immutable`）。

**面试官视角**：
- 考察工程化真实实战深度，是否透彻理解模块构建图谱、Hash 算法（hash vs chunkhash vs contenthash）与浏览器生产级缓存策略。
</Answer>

---

### P1 高频必会题

#### 1. 大型智慧物流系统的微前端沙箱隔离与样式防污染选型？ {#p1-microfrontend-sandbox-css}

<Answer>
**核心结论**：
在物流供应链体系中，存在大量老旧 jQuery/Vue2 子系统与现代 Vue3/React 子系统并存的现状。微前端（如基于 qiankun / Wujie）主要解决两大核心隔离：
1. **JS 沙箱隔离**：
   - **单实例 Proxy 沙箱（LegacySandbox）**：通过 ES6 Proxy 代理 `window` 对象，记录属性变更集，在子应用卸载时回滚。
   - **多实例 Proxy 沙箱（ProxySandbox）**：为每个微应用创建伪造的独立 FakeWindow，子应用的全局变更全部收敛在各自的 FakeWindow 中，支持多个子应用同时在同一页面展示。
2. **样式隔离（CSS Isolation）**：
   - 动态样式前缀（Scoped CSS / PostCSS 自动添加微应用命名空间前缀）。
   - Shadow DOM（`experimentalStyleIsolation: false, strictStyleIsolation: true`）：实现真正的 DOM 级样式完全物理隔离，但对挂载在 `body` 上的浮层弹窗（如 Element 弹窗）需要特殊处理挂载容器。

**面试官视角**：
- 考察点：是否真正操盘过大型微前端项目，能否权衡各类沙箱的兼容性、多实例与弹窗挂载问题。
</Answer>

---

## 真实面经问题清单

1. 自我介绍与过往物流/复杂系统架构亮点。
2. IMSDK 具体职责与核心指标（连接率、消息时延、丢包兜底）。
3. 前端工程化落地与 CI/CD 自动化构建流程优化。
4. Webpack `optimization.runtimeChunk` 的作用与底层原因。
5. 浏览器事件循环模型与宏任务/微任务时序推导。
6. 团队跨部门沟通与技术标准推动经验。
7. AI 辅助编程工具（如 Copilot / Claude Code）在日常工程与效能提速中的应用与思考。
8. 链式异步调度器代码手写（`Hello().say('tom').sleep(5)...`）。

---

## 考察重点速览

1. **JavaScript 异步编程与调度**：队列模型、链式调用、事件循环微任务触发点。
2. **Webpack 生产打包长效缓存**：Runtime 代码提取、ContentHash 机制、模块联邦与分包优化。
3. **企业级架构与协作**：微前端架构、跨团队标准化、系统高可用与稳定性度量。

---

## 备考建议

1. **白板手写异步调度器**：务必能熟练手写 LazyMan / 任务并发控制（Promise 并发限制器）。
2. **理清 Webpack 构建图谱**：清楚掌握 Loader 与 Plugin 的区别、AST 转换与代码分割（SplitChunks）原理。
3. **梳理项目管理与推动软实力**：准备好结构化的沟通协作与技术决策案例（STAR 法则）。

