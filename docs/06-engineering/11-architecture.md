# 架构

## [微前端] 设计原则有哪些？ {#p0-micro-frontend}

《微前端设计与实现》一书中作者卢卡·梅扎利拉提出的关于微前端的实践原则。一共有七条原则， 这些原则可以帮助团队更好地设计和实施微前端架构。

* 围绕业务领域建模：将前端应用程序按照业务领域进行划分，每个微前端子应用负责一个特定的业务领域。这样可以提高团队的独立性和聚焦性，降低开发和维护的复杂性。

* 自动化文化：建立自动化的开发和部署流程，包括自动化测试、持续集成和持续部署。这样可以提高开发效率和质量，并且减少人为错误。

* 隐藏实现细节：将微前端子应用的实现细节隐藏起来，提供简单的接口供其他子应用或者外部系统调用。这样可以减少依赖和耦合，提高系统的灵活性和可扩展性。

* 分布式治理：微前端架构中的各个子应用可以由不同的团队负责开发和维护。需要建立一套分布式治理机制，包括版本控制、协作沟通和问题解决等，保证各个子应用能够有效地协同工作。

* 独立部署：每个微前端子应用都可以独立地进行开发、测试和部署，而不会影响其他子应用。这样可以提高团队的独立性和灵活性，并且减少不同团队之间的交互和依赖。

* 故障隔离：微前端架构中的一个子应用出现故障时，不会影响其他子应用的正常运行。需要建立故障隔离机制，确保故障的影响范围最小化。

* 高度可观察：需要建立合适的监控和日志系统，对微前端架构中的各个子应用进行监测和分析。这样可以提前发现问题并进行及时处理，保证系统的稳定性和可靠性。

## [微前端] 路由加载流程是如何的？{#p0-micro-router}

微前端是一种架构模式，旨在将大型前端应用程序拆分为更小、更容易维护的独立部分。微前端的路由原理可以通过以下步骤概括：

1. 主应用加载：用户访问主应用时，主应用负责加载，并决定加载哪些微前端应用。

2. 路由分发：主应用根据当前URL路径，将请求分发给相应的微前端应用。

3. 微前端应用加载：被分发的微前端应用根据接收到的请求加载自己的代码和资源。

4. 渲染内容：微前端应用接收到请求后，将自己的内容渲染到主应用的容器中。

5. 子应用间通信：如果不同微前端应用之间需要进行通信，可以使用共享的状态管理工具或事件总线。

6. 事件处理：主应用和微前端应用都可以处理路由变化事件，以便更新页面内容。

## Qiankun 是如何做 JS 隔离的 {#p1-qiankun}

Qiankun 是一个基于 Single-SPA 的微前端实现库，它提供了比较完善的 JS 隔离能力，确保微前端应用间的独立运行，避免了全局变量污染、样式冲突等问题。Qiankun 实现 JS 隔离的主要机制包括：

 1. JS 沙箱

Qiankun 使用 JS 沙箱技术为每个子应用创建一个独立的运行环境。沙箱有以下两种类型：

* **快照沙箱（Snapshot Sandbox）**：在子应用启动时，快照并记录当前全局环境的状态，然后在子应用卸载时，恢复全局环境到启动前的状态。这种方式不会对全局对象进行真正的隔离，而是通过记录和恢复的方式避免全局环境被污染。

* **Proxy 沙箱**：通过 `Proxy` 对象创建一个全新的全局对象代理，子应用的所有全局变量修改操作都将在这个代理对象上进行，从而不会影响到真实的全局对象。这种方式提供了更为彻底的隔离效果，是 Qiankun 中推荐的沙箱隔离方式。

 2. 动态执行 JS 代码

Qiankun 通过动态执行 JS 代码的方式加载子应用，避免了脚本直接在全局环境下执行可能导致的变量污染。具体来说，它可以动态获取子应用的 JS 资源，然后在沙箱环境中运行这些代码，确保代码执行的全局变量不会泄露到主应用的全局环境中。

 3. 生命周期隔离

Qiankun 给每个子应用定义了一套生命周期钩子，如 `bootstrap`、`mount`、`unmount` 等，确保在应用加载、激活和卸载的过程中正确管理和隔离资源。通过在 `unmount` 生命周期钩子中正确清理子应用创建的全局监听器、定时器等，进一步保证了不同子应用间的独立性和隔离性。

 4. 样式隔离

虽然主要针对 JS 隔离，Qiankun 也提供了样式隔离机制，通过动态添加和移除样式标签，保证子应用样式的独立性，避免不同子应用间的样式冲突。

通过以上机制，Qiankun 能够有效实现微前端架构中子应用的 JS 隔离，加强了应用间的独立性和安全性，使得不同子应用可以无缝集成在一起，同时又能够保持各自的运行环境独立不受影响。

在微前端架构中，JavaScript 隔离是核心之一，用以确保各个子应用间代码运行时不互相干扰、变量不冲突，以及能够安全地卸载应用。为了实现这一目标，主要采用以下几种方法：

 1. 使用沙箱技术

* **`iframe`**：最直接的隔离方式是将子应用运行在`iframe`中。这种方式提供了良好的隔离性，因为`iframe`内部有自己独立的执行环境，包括 JavaScript 运行环境和 DOM 环境。但`iframe`的使用可能会导致性能问题，且父子通信复杂。
* **JavaScript Sandboxing**：通过创建一个独立的 JavaScript 执行环境，比如使用 Web Workers，或者更高级的沙箱库（如 Google 的 Caja），以在主页环境隔离执行 JavaScript 代码。

 2. 命名空间和模块化

* **命名空间**：通过命名空间（Namespace）封装每个子应用的代码，确保全局变量和函数不会与其他应用冲突。
* **模块化**：利用 ES Modules 或 CommonJS 等模块化标准，使代码封装在模块中运行，通过 import/export 管理依赖，减少全局变量的使用，从而实现隔离。

 3. 状态管理隔离

* 虽然主要关注 JavaScript 代码的隔离，但在单页应用中，子应用间状态管理（如使用 Redux、Vuex 等状态管理库）也可能导致隔离问题。可以为每个子应用创建独立的状态树，只通过明确定义的接口来共享必要的状态信息。

 4. 使用微前端框架或库

* **模块联邦（Module Federation）**：Webpack 的模块联邦功能允许不同的前端应用共享 JavaScript 模块，同时保持应用间的隔离。它可以动态地加载另一个应用导出的模块，而不需要将它们打包进单个文件里。
* **专门的微前端框架**：如 Single-SPA、Qiankun 等，这些框架提供了一套完整的解决方案，用于管理微前端应用的加载、卸载以及相互隔离，部分内部采用了类似沙箱的技术实现隔离。

 5. 服务端渲染（SSR）隔离

* 通过服务端渲染各个微前端应用，再将渲染好的静态 HTML 集成到主应用中。这样，每个子应用的 JavaScript 在客户端激活（Hydration）之前是隔离的。SSR 可以减少初次加载时间，同时具备部分隔离性，尤其是在初次加载阶段。

实施 JavaScript 隔离时，需要根据具体项目需求、技术栈和团队的熟练度来选取合适的隔离策略，以确保子应用之间的高度独立性和可维护性。

## 为何通常在 微前端 应用隔离， 不选择 iframe 方案 {#micro-frontend}

在微前端架构中，虽然`iframe`能提供很好的应用隔离（包括 JavaScript 和 CSS 隔离），确保微前端应用之间不会相互干扰，但一般不把它作为首选方案，原因包括：

 1. 性能开销

`iframe`会创建一个全新的浏览器上下文环境，每个`iframe`都有自己的文档对象模型（DOM）树、全局执行环境等。如果一个页面中嵌入了多个`iframe`，就会导致额外的内存和 CPU 资源消耗，特别是在性能有限的设备上更为显著。

 2. 应用集成和交互问题

`iframe`自然隔离了父子页面的环境，这虽然提供了隔离，但同时也使得主应用与子应用之间的交云难度增加。虽然可以通过`postMessage`等 API 实现跨`iframe`通信，但这种方式相比于直接 JavaScript 调用来说，更为复杂，交互效率也较低。

 3. UI 体验一致性

在`iframe`中运行的应用在视觉上可能与主应用难以实现无缝集成。`iframe`内外的样式、字体等一致性需要额外的处理。此外，`iframe`可能带来额外的滚动条，影响用户体验。

 4. SEO 问题

如果微前端的某些内容是通过`iframe`呈现的，那么这部分内容对于搜索引擎是不可见的，这可能会对应用的 SEO 产生负面影响。

 5. 安全问题

虽然`iframe`可以提供一定程度的隔离，但它也可能引入点击劫持等安全风险。此外，过多地使用`iframe`也可能增加网站被恶意脚本攻击的表面。

因此，虽然`iframe`是一种可行的应用隔离方法，它的这些局限性使得开发者在选择微前端技术方案时，往往会考虑其他提供更轻量级隔离、更好集成与交互体验的方案，如使用 JavaScript 沙箱、CSS 隔离技术、Web Components 等。这些方法虽然隔离性可能不如`iframe`彻底，但在整体的应用性能、用户体验和开发效率上通常会有更好的表现。