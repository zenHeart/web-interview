面试 - 模拟

## 技术深度相关

1. 在客服工单系统重构中，您是如何设计整体架构的？重构前后的主要痛点和解决方案是什么？

> 背景是：
>
> 1. 原有工单系统各功能点分布涉及多个不同的后台系统中，比如：工单分类、客服技能、工单字段，工单工作台，修改一个功能可能涉及 3、4 个项目操作。
> 2. 项目更迭过多个团队，原有产品逻辑不清楚，历史包袱较重
> 3. 业务方新增需求在原有逻辑下较难支撑和推进，需要支持不同业务的多租户的模式 multi-tenancy
> 4. 项目技术栈老旧，部分基建功能无法使用，亟需升级

> 重构的手段包括：
>
> 1. 理清历史产品逻辑，与产品和后端头脑风暴，简化路径和概念，分为：业务线、工单类型、工单字段
>     1.a 输出系统性脑图长期规划，迁移节奏
>     1.b 给出工作台交互操作优化建议，减少类似面向资源的类似数据库 CURD 的繁琐后台设置页面（类似 django admin）
>     1.c 缺少设计师支持的情况下，主动输出 Figma 视觉交互文稿
> 2. 架构仍是前后端分离，前端 SPA 应用，但是稍微不同的是
>     2.a 我们项目是内部的第一个可以客服移动端办公接待，比如手机企微打开网页执行客服接待 & 后台设置
>     2.b 首个接入基建最新私有部署最新 sentry 的前端项目，在错误监控之外，可以用上最新的 sentry 的行为分析统计，且接入各种 sentry 的 workflow 插件。
>     2.c 首个接入 Playwright 前端的 E2E 测试，涵盖核心功能：登录，新建工单
>     2.d 提供配套的 SDK 以及 storybook mdx 文档站点以及对应的 CI & CD 流程，方便其他业务线接入工单
>     2.e 提高 lighthouse 页面性能分数，基本实现秒开

1. How did you design the overall architecture in the customer service ticket system reconstruction? What were the main pain points before and after reconstruction, and what were the solutions?

> Background:
>
> 1. The original ticket system features were distributed across multiple systems. For example: ticket classification, customer service skills, ticket fields, ticket workbench - modifying one feature might involve operations in 3-4 projects.
> 2. The project had been handed over through multiple teams, original product logic was unclear, with significant technical debt
> 3. New business requirements were difficult to support under the original logic, needed to support multi-tenancy mode for different business lines
> 4. Project tech stack was outdated, some infrastructure features couldn't be used, urgently needed upgrading

> Reconstruction approaches included:
>
> 1. Clarified historical product logic, brainstormed with product and backend teams, simplified paths and concepts into: business lines, ticket types, ticket fields
>     1.a Output systematic mind maps for long-term planning and migration rhythm
>     1.b Provided workbench interaction optimization suggestions, reduced cumbersome database CRUD-like backend setting pages (similar to django admin)
>     1.c Proactively output Figma visual interaction documents without designer support
> 2. Architecture remained frontend-backend separated, frontend SPA application, but with differences:
>     2.a First internal project supporting mobile customer service operations, like opening web pages via WeChat Work for customer service & backend settings
>     2.b First frontend project to integrate latest private deployment Sentry, enabling behavior analysis statistics beyond error monitoring, and integrating various Sentry workflow plugins
>     2.c First to integrate Playwright frontend E2E testing, covering core functions: login, new ticket creation
>     2.d Provided supporting SDK and storybook mdx documentation site with CI & CD processes, facilitating other business lines' integration
>     2.e Improved lighthouse page performance scores, achieving near-instant loading

2. SDK化支持多端的过程中，如何处理不同框架（Vue2/Vue3/Web/React）的兼容性问题？

> 我们调研了多种方案，包括 web-component，vue-comapt 包，react-native-web 等可能
> 最终考虑到现有的条件采用 SDK 针对不同平台进行 rollup 配置预先分别打包
>
> vue3 版本兼容的项目可以直接引入源码使用
> 对于 vue2 和普通 web 环境，我们提供了一个工厂函数，该函数负责组件的创建和挂载，内部使用 Vue3 的 createApp API 处理渲染逻辑。这种方式虽然会引入完整的 Vue3 运行时，但由于 Vue3 体积优化和 tree-shaking，最终打包体积仍在可接受范围内
> SDK 分 model 和 UI view 层，解耦开来使得大部分 model 层代码都能共享和兼容
> 写了一套 渲染节点和事件的两层抽象逻辑，并分别写了 Vue 和 React 两个框架的 adapter，兼容性则简化成仅需适配渲染对应节点即可
> 而针对文档站点，支持了 react-native-web 的渲染，使得 live code 也可以看到 react-native 的渲染情况
> 类似 .ios.js / .android.ios.js loader 的加载，支持了 .vue / .react 的框架差异加载
> 部分兼容内联代码，在打包的时候，针对不同框架的输出，根据编译器宏指令剔除其他框架的代码
>
> 后续我们也看到社区有更多更成熟稳定的方案，比如
> 2.a mitosis 库，可以写一个类 react 的组件写法，编译成不同框架的组件代码
> 2.b universal app 的兴起，Expo 框架，加速了 react-native 统一框架下支持移动端和网页端的进展

2. How did you handle compatibility issues across different frameworks (Vue2/Vue3/Web/React) during SDK multi-platform support?

> We researched multiple solutions, including web-components, vue-compat package, react-native-web, etc.
> Ultimately, considering existing conditions, we chose to use SDK with Rollup configuration to pre-build for different platforms
>
> Vue3 compatible projects can directly import and use source code
> For Vue2 and regular web environments, we provided a factory function responsible for component creation and mounting, internally using Vue3's createApp API for rendering logic. While this approach includes the complete Vue3 runtime, the final bundle size remains acceptable due to Vue3's size optimization and tree-shaking
> The SDK is divided into model and UI view layers, decoupled so that most model layer code can be shared and compatible
> We wrote a two-layer abstraction logic for rendering nodes and events, and wrote separate Vue and React framework adapters, simplifying compatibility to just adapting corresponding node rendering
> For the documentation site, we supported react-native-web rendering, allowing live code to show react-native rendering
> Similar to .ios.js / .android.ios.js loader loading, we supported .vue / .react framework difference loading
> Some compatibility inline code, during bundling, uses compiler macro directives to eliminate other framework code based on different framework outputs
>
> Subsequently, we saw more mature and stable solutions from the community, such as:
> 2.a mitosis library, allowing writing React-like component syntax that compiles into different framework component code
> 2.b rise of universal apps, Expo framework, accelerating react-native's progress in supporting mobile and web under a unified framework

3. ChatUI建设中，跨平台（React Native和Vue）统一消息类型的技术方案是怎样的？

> 见 2. 但是有些许不一样
> 消息 IM 会在不同视角下有不同逻辑：平台客服、三方客服、质检、消费者、创作者，需要做不同角色适配，方法其实也是类似原则：小逻辑通过 props 或者 role 差异，大逻辑通过新组件差异加载。
> 历史上，我们的消息类型一度扩展到 200+ 之外，其实消息类型无非分几类：
>
> 1. 系统类型，消息类型语义对其他系统有约定
> 2. 业务场景卡片定制
> 3. 其他如：可见性、渲染差异
> 而实际上 2 的场景是最多的，每次一次产品提出新卡片，导致前后端改动的地方特别多，代码侵入多，逐渐膨胀不好维护。
> 针对消息类型差异，我们：
> 1. 设计了统一的富文本渲染协议，支持跨平台的消息展示
> 2. 采用单一角色原则，将消息类型（type）和功能性字段分离
> 3. 与后端约定了标准的预留字段格式和事件通信接口，便于后续扩展

3. What was the technical approach for unifying message types across platforms (React Native and Vue) in ChatUI construction?

> See 2, but with some differences
> IM messages have different logic in different views: platform customer service, third-party customer service, quality inspection, consumer, creator, requiring different role adaptations. The method follows similar principles: small logic through props or role differences, large logic through new component differential loading.
> Historically, our message types expanded beyond 200+, but message types essentially fall into several categories:
>
> 1. System types, message type semantics have conventions with other systems
> 2. Business scenario card customization
> 3. Others such as: visibility, rendering differences
> Actually, scenario 2 is most common, each time product proposes new cards, causing many changes in frontend and backend, code becomes invasive, gradually bloating and hard to maintain.
> For message type differences, we:
> 1. Designed unified rich text rendering protocol supporting cross-platform message display
> 2. Adopted single role principle, separating message type and functional fields
> 3. Agreed with backend on standard reserved field format and event communication interface for future expansion

3. 智能客服系统的技术架构是怎样的？如何实现拦截率的提升？
4. 自研小程序模拟器的整体架构是怎样的？为什么选择使用CDP和OOPIFs方案？
5. B端组件库的设计理念是什么？如何平衡通用性和业务定制化需求？

## 技术视野相关

1. 对前端领域未来的发展趋势有什么看法？
2. 在技术选型时，您会考虑哪些关键因素？

## 杂项

1. 浏览器渲染原理相关，如何优化关键渲染路径？

> 优化策略：
>
> 1. CSS 优化
>    - 将关键 CSS 内联到 HTML 中
>    - 异步加载非关键 CSS（使用 media queries 或 loadCSS）
>    - 简化选择器，减少嵌套
> 2. JavaScript 优化
>    - 使用 async/defer 异步加载非关键 JS
>    - 避免同步 JavaScript 对 DOM 的操作
>    - 代码分割，只加载首屏需要的 JS
> 3. DOM 优化
>    - 减少 DOM 深度和节点数量
>    - 避免强制同步布局（forced reflow）
>    - 使用 DocumentFragment 进行批量 DOM 操作
> 4. 资源优化
>    - 使用 preload/prefetch 预加载关键资源
>    - 合理使用浏览器缓存
>    - 图片懒加载和响应式图片

2. JavaScript引擎的工作原理，如何进行代码优化？

> 代码优化策略：
>
> 1. 类型优化
>    - 保持变量类型稳定，避免类型转换
>    - 使用类型数组（TypedArray）处理二进制数据
>    - 适当使用 TypeScript 等类型系统
> 2. 内存优化
>    - 避免内存泄漏，及时清理不用的引用
>    - 使用对象池复用对象，减少 GC 压力
>    - 合理使用 WeakMap/WeakSet 处理临时引用
> 3. 执行优化
>    - 避免使用 eval 和 with
>    - 减少作用域链查找，使用局部变量缓存
>    - 避免频繁创建闭包
> 4. 编译优化
>    - 利用 V8 的隐藏类（Hidden Class）机制
>    - 保持对象属性顺序一致
>    - 避免动态添加对象属性

## 性能优化相关

1. Electron应用中的白屏和卡顿问题，具体是由什么原因造成的？您的解决方案是什么？

> 主要原因：
>
> 1. 启动白屏
>    - 主进程初始化时间过长
>    - 渲染进程加载资源过多
>    - preload 脚本执行耗时
> 2. 运行卡顿
>    - 主进程和渲染进程通信频繁
>    - 密集计算阻塞主线程
>
> 解决方案：
>
> 1. 启动优化
>    - 实现启动页（splash screen）
> 2. 运行优化
>    - 使用 IPC 消息队列，避免频繁通信
>    - 密集计算使用 Web Worker

1. What causes white screen and lag issues in Electron applications? What are your solutions?

> Main causes:
>
> 1. Startup white screen
>    - Long main process initialization time
>    - Too many resources loading in renderer process
>    - Time-consuming preload script execution
> 2. Runtime lag
>    - Frequent communication between main and renderer processes
>    - Intensive computation blocking main thread
>
> Solutions:
>
> 1. Startup optimization
>    - Implement splash screen
> 2. Runtime optimization
>    - Use IPC message queue to avoid frequent communication
>    - Use Web Worker for intensive computations

2. 如何监控和优化首屏加载性能？具体的指标和优化手段是什么？

> 关键指标：
>
> 1. FCP (First Contentful Paint)：首次内容绘制
> 2. LCP (Largest Contentful Paint)：最大内容绘制
> 3. TTI (Time to Interactive)：可交互时间
> 4. FID (First Input Delay)：首次输入延迟
> 5. CLS (Cumulative Layout Shift)：累积布局偏移
>
> 优化手段：
>
> 1. 资源优化
>    - 路由懒加载
>    - 图片懒加载和预加载
>    - 合理使用 CDN
> 2. 构建优化
>    - 代码分割（Code Splitting）
>    - Tree Shaking
>    - 压缩资源（gzip/brotli）
> 3. 缓存策略
>    - 服务端缓存
>    - 浏览器缓存
>    - Service Worker 缓存

2. How do you monitor and optimize first screen loading performance? What are the specific metrics and optimization methods?

> Key metrics:
>
> 1. FCP (First Contentful Paint)
> 2. LCP (Largest Contentful Paint)
> 3. TTI (Time to Interactive)
> 4. FID (First Input Delay)
> 5. CLS (Cumulative Layout Shift)
>
> Optimization methods:
>
> 1. Resource optimization
>    - Route lazy loading
>    - Image lazy loading and preloading
>    - Proper CDN usage
> 2. Build optimization
>    - Code Splitting
>    - Tree Shaking
>    - Resource compression (gzip/brotli)
> 3. Caching strategy
>    - Server-side caching
>    - Browser caching
>    - Service Worker caching

3. 在处理大量实时数据的场景中（如客服工作台），如何优化页面渲染性能？

> 优化策略：
>
> 1. 数据处理
>    - 分页或虚拟滚动
>    - 数据分片处理（Time Slicing）
>    - WebWorker 处理复杂计算
> 2. 渲染优化
>    - 使用 `requestAnimationFrame` 调度更新
>    - DOM 批量更新
>    - 合理使用 `shouldComponentUpdate` / `useMemo`
> 3. 架构优化
>    - 状态管理优化（避免不必要的重渲染）
>    - 组件粒度控制
>    - 使用 Web Components 隔离更新

3. How do you optimize page rendering performance when handling large amounts of real-time data (like in customer service workbench)?

> Optimization strategies:
>
> 1. Data handling
>    - Pagination or virtual scrolling
>    - Data Time Slicing
>    - WebWorker for complex calculations
> 2. Rendering optimization
>    - Use `requestAnimationFrame` for scheduling updates
>    - Batch DOM updates
>    - Proper use of `shouldComponentUpdate` / `useMemo`
> 3. Architecture optimization
>    - State management optimization (avoid unnecessary re-renders)
>    - Component granularity control
>    - Use Web Components for update isolation

4. 内存泄漏问题如何定位和解决？特别是在Electron应用中。

> 定位方法：
>
> 1. Chrome DevTools
>    - Memory 面板堆快照对比
>    - Performance 面板内存走势
>    - Task Manager 进程监控
> 2. Electron 特有工具
>    - process.memoryUsage()
>    - Electron 的 remote debugging
>
> 常见问题和解决：
>
> 1. 事件监听未解绑
>    - 使用 WeakMap/WeakSet
>    - 组件卸载时清理
> 2. 闭包引用
>    - 及时清空不用的引用
>    - 避免过度使用闭包
> 3. 定时器未清理
>    - 统一管理定时器
>    - 组件销毁时清理

4. How do you locate and resolve memory leak issues, especially in Electron applications?

> Location methods:
>
> 1. Chrome DevTools
>    - Memory panel heap snapshots comparison
>    - Performance panel memory trends
>    - Task Manager process monitoring
> 2. Electron-specific tools
>    - process.memoryUsage()
>    - Electron remote debugging
> Common issues and solutions (continued):
> 1. Unbound event listeners
>    - Use WeakMap/WeakSet
>    - Clean up during component unmount
> 2. Closure references
>    - Clear unused references promptly
>    - Avoid excessive use of closures
> 3. Uncleaned timers
>    - Centralized timer management
>    - Clean up during component destruction

5. 在处理大规模数据渲染时，有什么性能优化策略？
>
> 1. 数据处理策略
>    - 虚拟列表（Virtual List）
>    - 无限滚动（Infinite Scroll）
>    - 数据分片加载
> 2. 渲染策略
>    - Web Worker 处理数据
>    - GPU 加速（transform、will-change）
>    - 合理使用 Canvas/WebGL
> 3. 缓存策略
>    - 数据缓存
>    - DOM 缓存
>    - 计算结果缓存

6. 如何进行前端性能监控？如何定位性能问题？

> 监控维度：
>
> 1. 页面性能
>    - Performance API 指标
>    - 自定义业务指标
> 2. 资源性能
>    - Resource Timing API
>    - 资源加载时间
> 3. 错误监控
>    - JS 错误
>    - 接口错误
>    - 资源加载错误
>
> 工具和方法：
>
> 1. 监控平台
>    - Sentry
>    - Google Analytics
>    - 自建监控系统
> 2. 性能分析工具
>    - Chrome DevTools
>    - Lighthouse

## 工程化相关

1. CI/CD流程的具体实现方案是什么？如何确保部署的稳定性？

> 实现方案：
>
> 1. CI 流程
>    - 代码提交触发自动化测试（单元测试、E2E测试）
>    - ESLint、Prettier 等代码规范检查
>    - 自动化构建和打包
>    - 生成构建报告和测试覆盖率报告
> 2. CD 流程
>    - 多环境部署策略（开发、测试、预发、生产）
>    - 灰度发布机制
>    - 自动化部署和回滚机制
>
> 稳定性保障：
>
> 1. 构建阶段
>    - 依赖版本锁定（package-lock.json）
>    - 构建缓存优化
>    - 并行构建提速
> 2. 部署阶段
>    - 部署前自动备份
>    - 健康检查机制
>    - 监控告警机制
> 3. 运维阶段
>    - 错误监控和性能监控
>    - 自动化运维工具
>    - 应急预案和回滚机制

1. What is your specific implementation approach for CI/CD? How do you ensure deployment stability?

> Implementation approach:
>
> 1. CI process
>    - Code submission triggers automated testing (unit tests, E2E tests)
>    - ESLint, Prettier code standard checks
>    - Automated build and packaging
>    - Generate build reports and test coverage reports
> 2. CD process
>    - Multi-environment deployment strategy (dev, test, staging, production)
>    - Grayscale release mechanism
>    - Automated deployment and rollback mechanism
>
> Stability assurance:
>
> 1. Build phase
>    - Dependency version locking (package-lock.json)
>    - Build cache optimization
>    - Parallel build acceleration
> 2. Deployment phase
>    - Automatic backup before deployment
>    - Health check mechanism
>    - Monitoring and alert mechanism
> 3. Operations phase
>    - Error monitoring and performance monitoring
>    - Automated operations tools
>    - Emergency plans and rollback mechanisms

2. 在多业务线协同开发时，如何管理和复用公共依赖？

> 管理策略：
>
> 1. 技术架构
>    - Monorepo 管理（使用 pnpm/Lerna）
>    - 统一的构建工具和配置
>    - 微前端架构设计
> 2. 组件设计
>    - 基础组件库
>    - 业务组件库
>    - 工具函数库
> 3. 版本管理
>    - 语义化版本控制
>    - Changeset 管理
>    - 依赖更新策略

2. How do you manage and reuse common dependencies in multi-business line collaborative development?

> Management strategies:
>
> 1. Technical architecture
>    - Monorepo management (using pnpm/Lerna)
>    - Unified build tools and configuration
>    - Micro-frontend architecture design
> 2. Component design
>    - Base component library
>    - Business component library
>    - Utility function library
> 3. Version management
>    - Semantic versioning
>    - Changeset management
>    - Dependency update strategy

## 团队协作相关

1. 在担任多个项目负责人的角色中，如何进行任务优先级管理和资源调度？

> 管理策略：
>
> 1. 任务优先级
>    - 业务价值评估（ROI）
>    - 技术收益评估
>    - 紧急程度评估
> 2. 资源调度
>    - 团队能力矩阵
>    - 项目周期规划
>    - 弹性资源池
> 3. 执行监控
>    - 定期进度同步
>    - 风险预警机制
>    - 资源调整机制

2. 作为产品、设计、研发多方角色，如何平衡各方需求和技术实现？

> 平衡策略：
>
> 1. 需求管理
>    - 需求评审机制
>    - 技术可行性评估
>    - MVP 原则
> 2. 沟通机制
>    - 定期同步会议
>    - 原型评审
>    - 技术方案评审
> 3. 实施过程
>    - 迭代式开发
>    - 及时反馈
>    - 灵活调整

3. 如何评估一个技术方案的可行性和风险？

> 评估维度：
>
> 1. 技术维度
>    - 技术成熟度
>    - 团队技术栈匹配度
>    - 性能和可扩展性
> 2. 业务维度
>    - 业务需求匹配度
>    - 开发和维护成本
>    - 时间投入评估
> 3. 风险维度
>    - 技术风险
>    - 人力资源风险
>    - 进度风险

4. 如何推动技术改造和技术债务的解决？

> 推动策略：
>
> 1. 前期准备
>    - 技术债务评估和分类
>    - ROI 分析
>    - 分步实施计划
> 2. 执行过程
>    - 渐进式改造
>    - 保证业务稳定
>    - 及时验证效果
> 3. 长期机制
>    - 技术评审机制
>    - 代码质量把控
>    - 持续改进流程
