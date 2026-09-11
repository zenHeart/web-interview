# 良质镜像✅

## 基本信息

- **业务领域**: 跨境电商与数字营销、跨端企业协同与智能客服工作台、低代码应用平台
- **技术栈**: Vue3 / React / TypeScript / Electron / React Native / WebSockets / Node.js
- **团队规模**: 100-300 人（核心产研团队坐落于光谷金融港）
- **办公地点**: 武汉市东湖高新区光谷金融港 B15 栋 501
- **公司性质**: 互联网外向型高新技术企业
- **薪资水平**: 高级/资深前端 20k-35k * 15薪（在武汉地区具备极高竞争力）

---

## 岗位类型

- **高级/资深前端工程师**: 负责 PC 桌面端客服工作台、跨平台移动端 H5 及复杂业务看板的架构设计与核心研发。
- **桌面客户端专家 (Electron)**: 负责多会话、多 Tab 架构优化，主导客户端启动冷启动加速、离线资源加载与内存泄漏攻坚。
- **前端架构与低代码工程师**: 负责跨端通用 IMSDK 抽象、工程化基建（TypeScript / CI/CD / Code Review 规范）与低代码平台底层引擎。

---

## 技术特色

1. **跨多宿主环境的通用 IMSDK**：
   - 同一套核心业务代码无缝兼容 Web、React Native 移动端、Node.js 服务端与 Electron 桌面端，通过适配器模式隔离平台专有网络与持久化存储差异。
2. **大型 Electron 多 Tab 内存极致治理**：
   - 面对高并发客服场景下数十个 Tab 同时打开的极端情况，自研基于 LRU 的 Tab 挂起冻结机制与 Chromium 渲染进程回收策略，内存占用降低 60% 以上。
3. **高标准工程规范与代码审查**：
   - 团队核心成员多具备北上广深一线大厂背景，全流程推行 TypeScript 严格模式、深度 Code Review 与持续集成质量把关。

---

## 面试流程概览

### 校招流程
1. **在线笔试**: 基础数据结构与算法、JavaScript 语言核心、CSS 布局。
2. **技术初试 (45min)**: 计算机基础、Vue/React 核心机制、网络协议。
3. **技术复试 (60min)**: 复杂场景设计、工程化实践与手写代码。
4. **HR 终面 (30min)**: 考察综合素质、职业自驱力与团队协作。

### 社招流程
1. **技术初试 (60min)**: 简历项目深挖，考察 IMSDK 架构、长连接协议、跨端适配与 Vue/React 渲染机制差异。
2. **技术复试 (60-75min)**: 架构攻坚深挖，围绕 Electron 多 Tab 内存治理、冷启动优化、高可用重试与低代码平台设计全面展开。
3. **业务负责人/CTO 面 (45min)**: 架构视野、跨项目协作能力与技术决策权衡。
4. **HR 面与录用沟通**: 薪资职级核定、背景调查与 Offer 发放。

---

## 题库

### P0 核心必考题

#### 1. 跨 Web、React Native、Node.js 多端运行的统一 IMSDK 架构与适配器设计？ {#p0-cross-platform-imsdk}

<Answer>
**核心结论**：
实现跨 Web、React Native、Node.js、Electron 多端复用的 IMSDK，核心在于**内核业务逻辑与宿主底层能力解耦**。采用**依赖倒置原则（DIP）与适配器模式（Adapter Pattern）**，将状态机、心跳协议、消息重试序列号等核心业务封装为纯 TypeScript 驱动的平台无关“核心引擎（Core Engine）”，而将底层的“网络传输套接字（Socket Adapter）”、“本地持久化存储（Storage Adapter）”与“环境生命周期监听（Lifecycle Adapter）”抽象为统一接口由外部运行时注入。

**原理解析**：
1. **各平台差异性痛点**：
   - **网络差异**：Web 浏览器原生使用 `window.WebSocket`；Node.js 环境使用 `ws` 库；React Native 在不同平台底层的原生套接字握手存在平台差异。
   - **持久化差异**：Web 使用 `IndexedDB` / `localStorage`；React Native 使用 `AsyncStorage` / SQLite；Node.js 使用 `LevelDB` 或文件系统。
   - **生命周期差异**：浏览器监听页面 `visibilitychange`；React Native 监听 `AppState`（`active` / `background`）；Electron 主进程与渲染进程监听窗口事件。
2. **架构设计三层分离**：
   - **Interface Layer（抽象契约）**：定义 `ISocketAdapter`、`IStorageAdapter`、`ILifecycleAdapter`。
   - **Core Engine（跨端核心）**：纯逻辑代码，无任何宿主 API 依赖，负责协议封包解包、ACK 消息队列、断线指数退避与状态机流转。
   - **Platform Adapters（宿主适配器）**：
     - `@imsdk/adapter-web`
     - `@imsdk/adapter-react-native`
     - `@imsdk/adapter-node`

**标准生产代码实现（适配器设计模式）**：
```typescript
// 1. 宿主环境抽象接口
export interface ISocketAdapter {
  connect(url: string): void;
  send(data: string | ArrayBuffer): void;
  close(code?: number, reason?: string): void;
  onOpen(callback: () => void): void;
  onMessage(callback: (data: any) => void): void;
  onClose(callback: () => void): void;
  onError(callback: (err: any) => void): void;
}

export interface IStorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

// 2. IMSDK 平台无关核心引擎
export class IMSDKCore {
  constructor(
    private socketAdapter: ISocketAdapter,
    private storageAdapter: IStorageAdapter
  ) {
    this.setupListeners();
  }

  private setupListeners() {
    this.socketAdapter.onOpen(() => {
      console.log('[IMSDK Core] 平台套接字连接建立，启动认证流程');
      this.authenticate();
    });

    this.socketAdapter.onMessage((data) => {
      this.handleIncomingPacket(data);
    });
  }

  public async sendMessage(content: string) {
    const packet = { id: crypto.randomUUID(), content, time: Date.now() };
    // 先写本地存储（离线草稿/待确认队列），再网络发送
    await this.storageAdapter.setItem(`msg_${packet.id}`, JSON.stringify(packet));
    this.socketAdapter.send(JSON.stringify(packet));
  }

  private authenticate() { /* 握手鉴权... */ }
  private handleIncomingPacket(data: any) { /* ACK、去重处理... */ }
}

// 3. Web 平台专属适配器实现
export class BrowserSocketAdapter implements ISocketAdapter {
  private ws: WebSocket | null = null;
  private openCb = () => {};
  private msgCb = (data: any) => {};
  private closeCb = () => {};
  private errCb = (err: any) => {};

  connect(url: string): void {
    this.ws = new WebSocket(url);
    this.ws.onopen = () => this.openCb();
    this.ws.onmessage = (e) => this.msgCb(e.data);
    this.ws.onclose = () => this.closeCb();
    this.ws.onerror = (e) => this.errCb(e);
  }

  send(data: string | ArrayBuffer): void {
    if (this.ws?.readyState === WebSocket.OPEN) this.ws.send(data);
  }

  close(): void { this.ws?.close(); }
  onOpen(cb: () => void): void { this.openCb = cb; }
  onMessage(cb: (d: any) => void): void { this.msgCb = cb; }
  onClose(cb: () => void): void { this.closeCb = cb; }
  onError(cb: (e: any) => void): void { this.errCb = cb; }
}
```

**面试官视角**：
- 考察点：是否掌握软件工程设计原则（开放封闭原则、控制反转与依赖注入），有无大型跨端 SDK 的设计与落地经验。
</Answer>

#### 2. Electron 多 Tab 架构下的内存治理与页面挂起休眠（Tab Discarding）？ {#p0-electron-tab-discarding}

<Answer>
**核心结论**：
在基于 Electron 的客服与多会话桌面应用中，每个打开的 Tab 若均作为一个独立存活的 `WebContentsView` 或 DOM 节点常驻，当用户打开数十个会话 Tab 时，Chromium 的多进程模型与 DOM 树将占用数吉字节（GB）内存，极易引发渲染进程 OOM 崩溃。最佳治理方案是借鉴 Chrome 原生 **Tab Discarding（标签页挂起丢弃）机制**：**对后台长期未激活的 Tab 提取并序列化关键状态，将对应的 `WebContents` 彻底销毁或卸载 DOM；当用户切回该 Tab 时触发毫秒级轻量热恢复**。

**原理解析与实施路径**：
1. **多 Tab 内存激增分析**：
   - 即使 Tab 处于后台隐藏状态，其 JavaScript 堆、Vue 组件实例、DOM 树节点、网络请求图片解码缓存依然占用物理显存与内存。
   - 部分第三方库在后台仍可能运行微小定时器阻止垃圾回收。
2. **LRU 淘汰与挂起策略**：
   - 内存中限定**最大活跃 Tab 数量**（如最多 3-5 个）。
   - 采用 LRU 队列记录 Tab 访问顺序。当打开第 6 个 Tab 时，最久未被访问的 Tab 进入“休眠”状态：
     1. 调用渲染进程暴露的 `serializeState()` 方法，将该 Tab 当前的输入草稿、滚动条位置、当前会话 ID 保存到主进程内存或本地轻量 SQLite 中；
     2. 将该 Tab 对应的 `BrowserView` 从主窗口分离并执行 `destroy()`，彻底释放 Chromium 渲染内核和 V8 堆内存；
     3. 在 UI 标签栏上依然保留该 Tab 的标题与图标，打上“已休眠”标识。
3. **用户切回时的极速恢复**：
   - 当用户点击处于休眠状态的 Tab 时，主进程动态重新创建 `BrowserView` / 载入骨架，并将保存的轻量快照状态注入，用户感知几乎无卡顿。

**面试官视角**：
- 考察点：候选人对 Electron 底层资源开销与 Chromium 架构特性的深度理解，是否具备大中型桌面端内存控制的实战经验。
</Answer>

---

### P1 高频必会题

#### 1. Vue 3 与 React 18 在响应式原理、渲染调度与更新开销上的本质差异？ {#p1-vue-vs-react-rendering}

<Answer>
**核心结论**：
Vue 3 与 React 18 采用了截然不同的设计哲学：
- **Vue 3 采用“细粒度响应式追踪（Reactivity + Proxy）”**：通过依赖收集精确感知哪个组件依赖了哪个属性，状态变更时**精准局部重新渲染**变动的组件，无需全量递归树；编译期通过 Block Tree、静态标记（PatchFlag）大幅跳过无动态绑定的静态节点。
- **React 18 采用“纯函数快照 + Fiber 异步时间分片调度”**：状态变更（`setState`）默认自顶向下遍历整棵子树重新执行组件函数，借助 **Fiber 双缓冲架构**与 **并发调度器（Scheduler）**将大任务切片为 5ms 的微任务，在浏览器空闲时执行（基于 MessageChannel 模拟 requestIdleCallback），确保高优先级用户交互（输入、点击）优先响应。

**关键维度横向对比**：

| 维度 | Vue 3 | React 18 |
| :--- | :--- | :--- |
| **响应式原理** | ES6 Proxy 代理对象读写拦截，自动依赖收集（`track` / `trigger`） | 不可变数据模型（Immutable），显式调用 `setState` 触发重新执行 |
| **重新渲染粒度** | 组件级精准更新（哪个组件读取了变量就只重跑哪个组件的 render） | 默认以当前组件为根节点，其所有子组件全量递归重新执行（需显式借助 `memo` / `useMemo` 阻断） |
| **调度与时间分片** | 同步批处理（利用微任务队列在当前 Tick 清空更新队列） | 并发并发模式（Concurrent Mode）+ Fiber 时间分片 + 优先级调度器（Lane 模型） |
| **编译期优化** | 极致模板编译优化（PatchFlag、HoistStatic、CacheHandler、Block Tree） | 纯 JSX 编译为 `createElement` 或 `jsxRuntime`，极少依赖编译期做结构预测（注重运行时灵活性） |
| **状态持久化** | 响应式对象本身可变，组件闭包内始终能拿到最新的引用 | 函数快照（Snapshot），容易在异步回调中产生经典“闭包陷阱（Stale Closure）” |

**面试官视角**：
- 考核候选人对两大顶流主流框架的核心设计理念、底层架构选型与性能权衡的宏观与微观认识。
</Answer>

---

## 考察重点速览

1. **跨平台架构设计**：通用 IMSDK 分层解耦、宿主适配器模式、多端统一类型约束。
2. **Electron 客户端性能与内存**：多 Tab 挂起丢弃机制（Tab Discarding）、离线包热更与本地 URL 资源加载选型。
3. **框架渲染与底层调度**：Vue 3 细粒度响应式与 React 18 Fiber 时间分片的核心比对。
4. **高质量工程化**：TypeScript 严格模式、代码审查规范与大型 Web 应用全链路监控。

---

## 备考建议

1. **掌握经典设计模式**：熟练在跨端 SDK 中运用适配器模式、发布订阅模式与单例模式。
2. **准备 Electron 性能指标数据**：围绕内存优化（从 1.5GB 降至 400MB）、冷启动加速（骨架注入/预加载优化）准备可量化的项目亮点。
3. **准备 Vue 与 React 的深度比对**：从“依赖追踪 vs 重新执行”、“编译期 vs 运行时调度”两个根本视角落脚，展现深厚技术功底。

