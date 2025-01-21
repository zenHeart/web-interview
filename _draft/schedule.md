# 10 天前端面试冲刺计划

## 📌 总体原则

1. **优先级**：高频考点优先（JavaScript > 框架 > 网络 > 性能优化）
2. **实践导向**：每个模块配合手写代码和实战项目
3. **深度优先**：理解原理 > 记忆 API
4. **全链路**：基础 + 框架 + 工程化 + 架构设计

---

## 📅 每日复习计划表

### Day 1-2：HTML/CSS 基础与核心

#### 上午

- **HTML**  
  - 语义化标签（`<>`, `<article>`, `<section>`）  
  - SEO 优化（`<meta>` 标签、`alt` 属性）  
  - DOM 事件机制（捕获、冒泡、委托）  
- **CSS**  
  - 盒模型（`box-sizing`）  
  - BFC/IFC 原理与应用  
  - Flex/Grid 布局对比
  - 性能优化相关属性（will-change、transform）  
  - 移动端适配方案
  - 垂直居中方案（5种以上）  

#### 下午

- **高频题实战**  
  1. 实现圣杯布局/双飞翼布局  
  2. 解释 CSS 选择器优先级计算规则（权重公式）  
  3. 用 CSS 实现三角形（`border` 技巧）  和动态气泡动画

#### 晚上

- **输出总结**  
  - 整理高频面试题答案（HTML/CSS）  
  - 用 Flex 布局实现一个电商商品详情页布局

---

### Day 3-4：JavaScript 核心

#### 上午

- **作用域与闭包**  
  - 数据类型与类型转换
  - 词法作用域 vs 动态作用域  
  - 闭包应用场景（模块化、柯里化、防抖节流）  
  - 防抖、节流的实际应用与性能优化
- **原型与继承**  
  - 原型链示意图（`__proto__` 与 `prototype`）  
  - `new` 操作符实现原理  
  - `class` 语法糖的底层实现  
- 回调函数与回调地狱
- Promise 原理与实现
- Generator 函数原理
- async/await 实现原理
- 浏览器事件循环
- Node.js 事件循环
- 宏任务与微任务
- 异步执行顺序分析
- V8 引擎工作原理
- 垃圾回收机制
- 内存泄漏排查
- 代码执行优化
- 发布订阅模式
- 单例模式
- 代理模式
- 观察者模式

#### 下午

- **高频题实战**  
  1. 手写 `Promise.all`（处理错误场景）  
  2. 实现深拷贝（循环引用、`Date`/`RegExp` 处理）  
  3. 解释事件循环机制（宏任务 vs 微任务）  

#### 晚上

- **输出总结**  
  - 手写代码整理（深拷贝、防抖节流、Promise）  
  - 绘制原型链关系图  

---

### Day 5：浏览器与网络

#### 上午

- **浏览器原理**  
  - 渲染流程（DOM → CSSOM → Render Tree → Layout → Paint）  
  - 重绘（Repaint）与回流（Reflow）优化  
  - Event Loop 与任务队列  
- **网络基础**  
  - HTTP/HTTPS 握手过程  
  - 强缓存（`Cache-Control`）与协商缓存（`ETag`）  
  - 跨域解决方案（CORS、JSONP、PostMessage）  

#### 下午

- **高频题实战**  
  1. 描述从输入 URL 到页面展示的完整流程  
  2. 首屏加载时间优化方案（SSR、预加载、代码分割）  
  3. 手写 JSONP 实现  

#### 晚上

- **输出总结**  
  - 整理浏览器渲染优化清单  
  - 绘制 HTTP 请求流程图  

---

### Day 6-7：前端框架（React/Vue 二选一）

#### React 方向

- **上午**  
  - React 生命周期与 Hooks 原理
  - Fiber 架构与优先级调度机制
  - 性能优化工具：`useMemo`、`useCallback`
- **下午**  
  1. 手写 `useState` 简易实现  
  2. 解释虚拟 DOM Diff 算法（双端对比）  
  3. 性能优化（`memo`、`useMemo`、`useCallback`）  
  4. 服务端渲染

#### Vue 方向

- **上午**  
  - 响应式原理（`Object.defineProperty` vs `Proxy`）  
  - 模板编译
  - Diff 算法（同层比较、key 的作用）  
  - Composition API 设计思想  
  - 运行时优化
- **下午**  
  - Vuex/Pinia 原理
  - Vue-Router 原理
  - 组合式 API 设计
  - 服务端渲染
  1. 手写简易响应式系统  
  2. 解释 `v-model` 实现原理  
  3. 性能优化（`v-if` vs `v-show`、异步组件）  

#### 晚上

- **输出总结**  
  - 框架核心原理对比表格  
  - 手写框架核心功能代码片段  

---

### Day 8：性能优化与工程化

#### 上午

- **性能优化**  
  - Lighthouse 指标解读与优化建议
  - 优化策略与方法
  - 性能监控系统
  - 自动化性能优化
  - Tree Shaking 的原理与实现条件
  - 内存泄漏问题排查与优化工具
  - 代码规范与质量
  - Git 工作流
  - 前端监控体系
  - 安全最佳实践
- **工程化**  
  - Webpack 核心流程（Loader/Plugin 机制）  
  - Babel 转译原理（AST 操作）  

#### 下午

- **高频题实战**
- Webpack 原理与优化
- Vite 原理与应用
- Babel 编译原理
- Tree-shaking 实现
- 解释 Webpack 的 Tree Shaking 实现条件  
- 如何实现一个 Webpack Loader（代码示例）  
- 前端监控系统设计思路（错误捕获、性能上报）  
- 模块化方案演进
- 包管理工具对比
- 持续集成与部署
- 微前端架构设计

#### 晚上

- **输出总结**  
  - 整理 Webpack 优化配置模板  
  - 手写一个基础 Webpack 插件或 Loader 示例
  - 编写 Babel 插件
  - 搭建微前端框架

---

### Day 9：算法与数据结构

#### 上午

- **重点题型**  
  - 数组（双指针、滑动窗口）
  - 链表（反转、环检测）
  - 树（递归与 BFS/DFS）
- **刷题策略**  
  - 字符串匹配（KMP/子串搜索）
  - 排序算法对比（快速排序、归并排序）

#### 下午

- **高频题实战**  
  1. 两数之和（哈希表优化）
  2. 二叉树层序遍历（BFS 实现）
  3. 滑动窗口问题（最大子数组和）

#### 晚上

- **输出总结**  
  - 整理算法模板（双指针、DFS/BFS）  
  - 记录错题本（重点题型反复练习）  

---

### Day 10：模拟面试与复盘

#### 上午

- **全真模拟面试**  
  - 技术面：框架原理 + 系统设计（如设计一个前端埋点系统）  
  - 行为面：项目难点、团队协作案例  
- **工具推荐**  
  - [Pramp](https://www.pramp.com/)（在线模拟面试平台）  

#### 下午

- **查漏补缺**
  - 快速回顾错题本
  - 梳理高频知识点速记卡片（闭包、原型链等）

#### 晚上

- **心态调整**
  - 准备自我介绍（STAR 法则：Situation-Task-Action-Result）
  - 确定行为面试中的亮点项目故事

---

## 📚 推荐学习资料

1. **JavaScript**  
   - 《你不知道的JavaScript》  
   - [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)  
2. **框架**  
   - [React 官方文档](https://react.dev/)  
   - [Vue 官方文档](https://cn.vuejs.org/)  
3. **算法**  
   - [LeetCode 热题 Top 100](https://leetcode.cn/problem-list/2cktkvj/)  
   - 《剑指Offer》  
4. **网络与浏览器**  
   - 《HTTP 权威指南》  
   - [Inside look at modern web browser](https://developers.google.com/web/updates/2018/09/inside-browser-part1)  

---

## 🚨 最后提醒

- **保持手感**：每日代码练习不可少  
- **项目复盘**：用 STAR 法则整理 2-3 个核心项目  
- **保持自信**：面试是双向选择，展示真实的你！

Good Luck! 🍀
