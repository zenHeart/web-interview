# 小米集团✅

## 基本信息

- **业务领域**: 智能手机、米家智能家居 IoT、小米汽车（SU7/智能座舱）、小米商城、互联网云服务
- **技术栈**: Vue3 / React / TypeScript / Node.js / React Native / 小程序 / WebAssembly / WebGL
- **团队规模**: 35,000+ 人（前端技术团队逾千人，分布于北京、武汉、南京、深圳）
- **办公地点**: 北京总部（小米科技园）、武汉研发总部（光谷小米武汉总部大楼）、南京、深圳
- **公司性质**: 500 强知名上市公司（小米集团 01810.HK）
- **薪资水平**: 校招 18k-30k * 14-16薪；社招 25k-50k * 15-18薪 + 股票期权

---

## 岗位类型

- **Web 前端工程师 (电商/营销)**: 负责小米商城、有品电商、全球海外官网与千万级大促秒杀活动开发。
- **IoT 智能设备前端工程师 (React Native/跨端)**: 负责米家 App 智能硬件扩展插件、设备控制卡片与低功耗蓝牙/局域网设备控制。
- **小米汽车前端工程师**: 负责智能座舱人机交互界面、远程控车移动端 H5 及车企数字化运营平台研发。
- **前端架构师**: 负责大型工程化基础设施、跨端多包 Monorepo 治理、SSR 首屏加速与自动化测试流水线。

---

## 技术特色

1. **“人车家全生态”多端协同体系**：
   - 依托小米澎湃 OS（Xiaomi HyperOS），前端不仅面向标准 Web 浏览器，更深度整合移动端 React Native、车载大屏混合渲染与 IoT 嵌入式轻量容器。
2. **米家千万级硬件扩展插件生态**：
   - 米家 App 内部采用成熟的 React Native 动态下发插件架构，数十万款第三方硬件生态接入，对包体积隔离、插件沙箱安全与版本热更提出极致要求。
3. **全球化电商高并发与性能体验**：
   - 小米网服务全球 100+ 国家和地区，深度运用 Edge SSR 服务端渲染、骨架屏微前端集成、智能多语言异步懒加载与全链路错误监控。

---

## 面试流程概览

### 校招流程
1. **在线笔试**: 计算机基础、前端知识点、数据结构与算法编程题（2-3道）。
2. **专业一面 (50min)**: JavaScript 核心闭包/原型链/异步、CSS 布局、浏览器核心原理。
3. **专业二面 (60min)**: 重点框架底层原理（Vue/React）、项目技术攻坚、现场算法手撕。
4. **HR 终面 (30min)**: 综合素养考核、文化认同与 Offer 意向沟通。

### 社招流程
1. **技术初试 (60min)**: 简历项目深挖，系统考察过往前端架构把控、业务突破点与手写代码。
2. **技术复试 (60-75min)**: 跨端架构设计、性能调优极限、高并发防护与算法题。
3. **技术总监/部门负责人面 (45min)**: 技术视野、团队管理与“人车家”业务协同理解。
4. **HR 面与薪酬审批**: 职级核定、背景调查与发薪发放。

---

## 题库

### P0 核心必考题

#### 1. 米家 IoT 硬件扩展插件的动态下发架构与沙箱安全隔离方案？ {#p0-iot-plugin-architecture}

<Answer>
**核心结论**：
米家 App 需承载数千家硬件生态厂商开发的控制界面，不可能将所有设备控制代码全部打包在客户端主包中。工业级解决方案采用“**React Native 动态 Bundle 拆包下发 + 运行时沙箱安全拦截 + 本地设备离线缓存**”的微应用架构。客户端仅承载核心 Runtime，硬件插件按设备 Model 动态懒加载下载，并在专用 JS 运行环境中执行，切断跨插件数据访问与越权设备控制。

**原理解析**：
1. **跨端分包与动态加载管线**：
   - 基础公共运行时（React、React Native Core、米家基础 UI 组件库、蓝牙通信 Bridge）作为公共基础包（Common Bundle）常驻 App 本地。
   - 厂商编写的设备控制界面被编译为轻量业务包（Business Bundle，通常仅 100-300KB）。
   - 用户在米家列表中点击某个设备（如“米家空气净化器”）时，客户端根据设备型号检查本地版本并增量拉取最新 Bundle，通过内存加载执行渲染。
2. **沙箱与权限隔离**：
   - **Bridge 白名单机制**：插件只能调用米家公开的安全 SDK（如控制当前设备开关、读取传感器数据），禁止直接调用文件系统、未授权网络请求或访问其他设备的数据。
   - **独立作用域与状态重置**：退出插件时，强制注销所有全局事件监听器与定时器，释放内存，防止第三方插件内存泄漏拖慢主客户端。

**面试官视角**：
- 考察点：是否具备平台型架构思维，如何平衡“第三方开放生态的灵活性”与“主客户端稳定性与安全性”。
</Answer>

#### 2. 大规模 DOM 节点渲染（如一万条列表）的浏览器卡顿机理与优化手段？ {#p0-large-scale-dom-rendering}

<Answer>
**核心结论**：
在页面一次性插入一万条 DOM 节点会导致明显的页面卡顿甚至几秒的假死。根本原因在于：**V8 大量分配 DOM 包装对象消耗大量内存，且同步插入触发极高耗时的重排（Layout/Reflow）、样式计算与图层重绘，完全阻塞浏览器主线程**。针对不同业务诉求，有三种层级的优化方案：**虚拟滚动（最佳方案，仅渲染视口十几条）**、**时间切片（Time Slicing / requestAnimationFrame 分批插入）**与**文档碎片（DocumentFragment 批量挂载）**。

**原理解析与实操方案**：
1. **方案一：虚拟滚动（Virtual List，根本治本）**：
   - 页面 DOM 树中永远只渲染当前屏幕可见的 10-20 个节点，上下留白通过滚动偏移（Transform）填充，DOM 数量始终恒定，性能与万条数据完全脱钩。
2. **方案二：时间切片分批渲染（适合必须全部挂在 DOM 树上的场景）**：
   - 利用 `requestAnimationFrame` 将 10,000 条数据切分为每次 50 条的小批次，在每一帧浏览器绘制间隙按需追加，让浏览器能够及时响应用户的滚动与输入操作，避免掉帧。

```typescript
// 时间切片分批插入示例
function renderBigData(data: string[], container: HTMLElement) {
  const totalCount = data.length;
  const batchSize = 50;
  let currentIndex = 0;

  function insertBatch() {
    const fragment = document.createDocumentFragment();
    const limit = Math.min(currentIndex + batchSize, totalCount);

    for (let i = currentIndex; i < limit; i++) {
      const li = document.createElement('li');
      li.textContent = data[i];
      fragment.appendChild(li);
    }

    container.appendChild(fragment);
    currentIndex = limit;

    if (currentIndex < totalCount) {
      // 安排到下一帧继续渲染，不阻断主线程
      requestAnimationFrame(insertBatch);
    }
  }

  requestAnimationFrame(insertBatch);
}
```

**面试官视角**：
- 考察点：对浏览器主线程渲染管线的认知，能否根据场景在“虚拟滚动”与“分片渲染”之间准确选型。
</Answer>

---

### P1 高频必会题

#### 1. 双向链表（Doubly Linked List）手写实现与在 LRU 缓存中的核心作用？ {#p1-doubly-linked-list-lru}

<Answer>
**核心结论**：
单向链表在删除指定节点时需要从头遍历找到前驱节点（$O(N)$ 复杂度），而双向链表每个节点同时保存 `prev` 和 `next` 指针，可以在已知目标节点引用的前提下实现 **$O(1)$ 常数时间复杂度的自我删除与插入**。在 LRU（Least Recently Used）缓存淘汰算法中，正是借助“哈希表快速检索节点 + 双向链表 $O(1)$ 调整节点位置”的经典组合达到整体 $O(1)$ 性能。

**标准生产级双向链表节点与基础操作**：
```typescript
export class DNode<K, V> {
  public key: K;
  public value: V;
  public prev: DNode<K, V> | null = null;
  public next: DNode<K, V> | null = null;

  constructor(key: K, value: V) {
    this.key = key;
    this.value = value;
  }
}

export class DoublyLinkedList<K, V> {
  // 使用虚拟头节点和虚拟尾节点简化边界判断
  private head: DNode<K, V>;
  private tail: DNode<K, V>;

  constructor() {
    this.head = new DNode<K, V>(null as any, null as any);
    this.tail = new DNode<K, V>(null as any, null as any);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // O(1) 插入到链表头部
  public addFirst(node: DNode<K, V>): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  // O(1) 任意节点自我摘除
  public remove(node: DNode<K, V>): void {
    node.prev!.next = node.next;
    node.next!.prev = node.prev;
  }

  // O(1) 移除末尾最久未使用的节点
  public removeLast(): DNode<K, V> | null {
    if (this.tail.prev === this.head) return null;
    const last = this.tail.prev!;
    this.remove(last);
    return last;
  }
}
```

**面试官视角**：
- 考察点：数据结构基本功，是否使用 Dummy 哑节点避免繁琐的空指针边界判断。
</Answer>

---

## 考察重点速览

1. **多端融合与平台生态**：米家 IoT 动态插件下发体系、车载大屏混合开发、React Native 深度使用。
2. **大数据量与极速渲染**：一万条 DOM 渲染优化（时间切片 vs 虚拟列表）、`requestAnimationFrame`。
3. **数据结构与经典算法**：双向链表、二叉树遍历、LRU 缓存设计。

---

## 备考建议

1. **理解小米生态技术落地**：重点关注跨端混合技术（React Native / Flutter / WebAssembly）与设备协同。
2. **手写核心数据结构**：双向链表、栈、队列与树的各类遍历必须肌肉记忆。
3. **掌握 Web 性能指标与长列表方案**：熟练说明强制重排与时间分片调度的内部机制。

