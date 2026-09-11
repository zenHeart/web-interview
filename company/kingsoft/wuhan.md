# 金山软件（武汉研发中心）✅

## 基本信息

- **业务领域**: WPS 办公套件、企业级私有化交付、PC 桌面端（Electron/C++）混合架构、金山云办公
- **技术栈**: Vue3 / TypeScript / Electron / Pinia / Node.js / C++ Addon / Webpack / Vite
- **团队规模**: 2,000+ 人（金山武汉研发园区，光谷高新四路）
- **办公地点**: 武汉市东湖高新区金山软件武汉研发中心 / 光谷金融港
- **公司性质**: 知名上市公司（金山软件 03888.HK / 金山办公 688111.SH）
- **薪资水平**: 18k-35k * 14-16薪 + 年终绩效 + 六险一金

---

## 岗位类型

- **PC 桌面端研发工程师 (Electron/Vue3)**: 负责 WPS 办公套件桌面端私有化交付、内嵌 Chromium 进程架构优化、本地离线与云端数据无缝同步。
- **高级 Web 前端工程师**: 负责企业级云协同工作台、表单组件库、复杂数据可视化看板与管理后台研发。
- **前端性能与工程化专家**: 主导构建流水线优化、微前端跨工程复用、多平台打包分发及客户端内存/白屏治理。

---

## 技术特色

1. **企业级私有化深度交付**：
   - 针对金融、央国企及大型机构的内网物理隔离环境，提供完整的离线包部署、局域网协同服务与多环境打包自动化流水线。
2. **Electron 桌面架构深度定制**：
   - 深入结合 C++ 动态链接库与 Electron 主/渲染进程，解决多 Tab 页多实例并发下的内存驻留控制、崩溃自愈及软硬件加速适配。
3. **海量数据高保真富文本/表格组件**：
   - 涉及千行百列的不定高表格排版、虚拟滚动视口计算、极速渲染和 DOM 回流重绘的极致批处理优化。

---

## 面试流程概览

### 校招流程
1. **在线机试 (90min)**: 算法题目（动态规划、二叉树/链表、字符串编辑）与前端基础单选/多选。
2. **专业一面 (50min)**: JavaScript 核心闭包/原型链/事件循环、Vue3 响应式原理、CSS 核心布局。
3. **专业二面 (60min)**: 项目难点深挖、手撕复杂代码、组件库设计与前端工程化。
4. **HR 终面 (30min)**: 薪酬沟通、职业规划与稳定性考察。

### 社招流程
1. **技术初试 (60min)**: 考察过往主力项目，重点核查 Electron 实践、组件设计与核心编码能力。
2. **技术复试 (60min)**: 架构深度剖析，考察内存泄漏排查、私有化打包方案、高并发/大数据量下的性能调优。
3. **部门总监面 (45min)**: 考察业务理解、跨团队协作推动力与技术视野。
4. **HR 面与发薪**: 背景调查与 Offer 审批。

---

## 题库

### P0 核心必考题

#### 1. 不定高虚拟列表的实现原理与滚动白屏优化策略？ {#p0-virtual-list-dynamic-height}

<Answer>
**核心结论**：
不定高虚拟列表（Dynamic Height Virtual List）的核心痛点在于无法通过“索引 × 固定高度”直接算出各元素的实际偏移量。标准解决方案是采用**位置预估 + 动态渲染后真实高度回填修正（Position Cache / 二分查找定位）**；针对快速滚动导致的白屏问题，综合运用**超量渲染缓冲区（Buffer）、滚动距离预测（Velocity Prediction）与骨架占位**进行协同治理。

**原理解析**：
1. **位置预估与缓存机制**：
   - 初始化时为每项设定预估默认高度 `estimatedHeight`，并在内存中维护一个位置信息数组 `positions = [{ index, height, top, bottom }]`。
   - 当用户滚动时，通过**二分查找（Binary Search）**在 `positions` 数组中快速找出第一个 `bottom > scrollTop` 的元素作为起始可视索引 `startIndex`。
2. **DOM 真实高度修正（ResizeObserver / updated）**：
   - 渲染可视项后，在生命周期钩子中测量 DOM 元素的真实 `getBoundingClientRect().height`。
   - 若真实高度与缓存高度不符，更新该项的 `height` 与 `bottom`，并将后续所有项的 `top` 与 `bottom` 进行累加偏移修正。
3. **消除快速滚动白屏的工程策略**：
   - **缓冲区（Over-scan Buffer）**：在可视区域上下各额外渲染 $N$ 个元素（例如视口显示 10 个，上下各缓冲 5 个）。
   - **滚动速度感知与节流**：计算瞬时滚动速率（$\Delta y / \Delta t$），若速度极高，动态临时扩大缓冲区或使用轻量骨架样式占位，避免主线程昂贵的 DOM 重排阻塞。
   - **CSS 属性优化**：为列表容器设置 `will-change: transform` 或 `content-visibility: auto`，让滚动由 GPU 合成器线程分担。

**标准生产代码实现**：
```typescript
interface Position {
  index: number;
  height: number;
  top: number;
  bottom: number;
}

export class DynamicVirtualList {
  private estimatedHeight: number;
  private positions: Position[] = [];

  constructor(totalCount: number, estimatedHeight: number) {
    this.estimatedHeight = estimatedHeight;
    this.initPositions(totalCount);
  }

  private initPositions(totalCount: number) {
    for (let i = 0; i < totalCount; i++) {
      this.positions.push({
        index: i,
        height: this.estimatedHeight,
        top: i * this.estimatedHeight,
        bottom: (i + 1) * this.estimatedHeight,
      });
    }
  }

  // 二分查找获取可视区域起始索引
  public getStartIndex(scrollTop: number): number {
    let low = 0;
    let high = this.positions.length - 1;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const midBottom = this.positions[mid].bottom;
      if (midBottom === scrollTop) {
        return mid + 1;
      } else if (midBottom < scrollTop) {
        low = mid + 1;
      } else {
        if (mid === 0 || this.positions[mid - 1].bottom <= scrollTop) {
          return mid;
        }
        high = mid - 1;
      }
    }
    return 0;
  }

  // 渲染后回填真实测量高度
  public updateItemSize(index: number, realHeight: number) {
    const item = this.positions[index];
    const diff = realHeight - item.height;
    if (diff === 0) return;

    item.height = realHeight;
    item.bottom += diff;

    // 累加修正后续项的 top 和 bottom
    for (let k = index + 1; k < this.positions.length; k++) {
      this.positions[k].top = this.positions[k - 1].bottom;
      this.positions[k].bottom += diff;
    }
  }
}
```

**面试官视角**：
- 考察候选人对长列表渲染性能极限的探索程度。
- 追问：“如果列表项内包含异步图片，加载完成后高度突变造成视口跳动怎么处理？”
- 答：“图片外层容器预设宽高比（aspect-ratio），或在图片 `load` 事件触发时再次调用 `updateItemSize`，并通过微调容器 `scrollTop` 补偿当前锚定项的视口位移差（Scroll Anchoring）。”

**延伸阅读**：
- [VueUse useVirtualList 核心源码与实现分析](https://vueuse.org/core/useVirtualList/)
</Answer>

#### 2. 编写对象扁平化函数，将多层嵌套对象转换成点号连接的单层对象？ {#p0-flatten-nested-object}

<Answer>
**核心结论**：
对象扁平化（Flatten Object）是处理配置项、日志解析与复杂表单传参的高频考题。考察点涵盖深度优先搜索（DFS）、递归终止条件、对象与数组类型的安全判别以及原型属性防污染。

**原理解析**：
1. 遍历当前对象的每一个自身可枚举属性（`Object.keys`）。
2. 若属性值为非 null 的纯对象（或数组），递归进入下一层，并将当前属性名拼入前缀路径中（如 `prefix ? prefix + '.' + key : key`）。
3. 若属性值为原始数据类型（字符串、数字、布尔等）或已到达叶子节点，则将拼接好的完整路径字符串作为键写入结果对象。

**标准生产级代码实现**：
```typescript
function flattenObject(obj: Record<string, any>, prefix = ''): Record<string, any> {
  const result: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    // 过滤原型链继承属性
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const newKey = prefix ? `${prefix}.${key}` : key;

    // 判断是否为需要继续递归的纯对象或数组
    if (value !== null && typeof value === 'object' && !(value instanceof Date) && !(value instanceof RegExp)) {
      const nested = flattenObject(value, newKey);
      Object.assign(result, nested);
    } else {
      result[newKey] = value;
    }
  }

  return result;
}

// 验证用例
const entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd',
      },
    },
    d: {
      xx: 'adxx',
    },
    e: 'ae',
  },
};

console.log(flattenObject(entry));
// 输出:
// {
//   'a.b.c.dd': 'abcdd',
//   'a.d.xx': 'adxx',
//   'a.e': 'ae'
// }
```

**面试官视角**：
- 考察点：代码健壮性与边界处理。
- 进阶追问：“如果对象中存在循环引用（`a.child = a`）如何处理？”
- 答：“引入 `WeakSet` 记录遍历过的对象引用，发现重复引用时抛出异常或停止向下展开，防止调用栈溢出（Maximum call stack size exceeded）。”
</Answer>

#### 3. 两个字符串差异对比（Diff）并输出最小操作序列？ {#p0-string-diff-operations}

<Answer>
**核心结论**：
字符串差异对比是在线协同文档和代码审查（Code Diff）的核心基础。其本质是**编辑距离（Levenshtein Distance）**与**最长公共子序列（LCS）**问题。通过动态规划构建二维代价矩阵，再从矩阵右下角进行反向回溯（Backtracking），即可精准输出从原始字符串转换到目标字符串所需的每一步具体操作（插入、删除、保留）。

**原理解析**：
1. **定义状态矩阵 $dp[i][j]$**：
   - 表示将字符串 `pre[0...i-1]` 转换为 `now[0...j-1]` 所需的最小编辑代价。
   - 若 `pre[i-1] === now[j-1]`，则 $dp[i][j] = dp[i-1][j-1]$（无需操作）。
   - 否则 $dp[i][j] = 1 + \min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])$（分别对应删除、插入、替换）。
2. **操作路径回溯**：
   - 从 $(m, n)$ 逆向回溯到 $(0, 0)$：
     - 若来自 $dp[i-1][j-1]$ 且字符相同：保留。
     - 若来自 $dp[i][j-1]$：说明目标字符串中多出了字符，记录为“插入”。
     - 若来自 $dp[i-1][j]$：说明原始字符串中该字符被移除，记录为“删除”。

**标准算法实现**：
```typescript
interface DiffOperation {
  type: 'insert' | 'delete' | 'equal';
  char: string;
  preIndex?: number;
  nowIndex?: number;
}

function diffStrings(pre: string, now: string): DiffOperation[] {
  const m = pre.length;
  const n = now.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (pre[i - 1] === now[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // 反向回溯输出具体操作
  const operations: DiffOperation[] = [];
  let i = m;
  let j = n;

  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && pre[i - 1] === now[j - 1]) {
      operations.unshift({ type: 'equal', char: pre[i - 1], preIndex: i - 1, nowIndex: j - 1 });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] <= dp[i - 1][j])) {
      operations.unshift({ type: 'insert', char: now[j - 1], nowIndex: j - 1 });
      j--;
    } else if (i > 0 && (j === 0 || dp[i][j - 1] > dp[i - 1][j])) {
      operations.unshift({ type: 'delete', char: pre[i - 1], preIndex: i - 1 });
      i--;
    }
  }

  return operations;
}

// 验证
const pre = 'abcde123';
const now = '1abc123';
console.log(diffStrings(pre, now));
// 输出包含：在首位插入'1'、保留'a','b','c'、删除'd','e'、保留'1','2','3'
```

**面试官视角**：
- 考察点：动态规划矩阵的推导能力与状态路径回溯技巧。
- 深入延伸：在线文档与 Git 中更广泛使用的是 Myers 差分算法（$O(ND)$ 复杂度），空间复杂度更低，适合海量文本对比。
</Answer>

---

### P1 高频必会题

#### 1. 如何基于 LRU 缓存淘汰策略手写实现 Vue 的 keep-alive 机制？ {#p1-vue-keep-alive-lru}

<Answer>
**核心结论**：
Vue 的 `<keep-alive>` 是一个抽象组件（Abstract Component），它不会渲染真实的 DOM 节点，而是通过内部维护的 `keys` 集合（`Set` 或 `Array`）与 `cache` 映射表（`Map`）对动态组件的 VNode 及其真实 DOM 实例进行持久化保留。当缓存数量达到设定的 `max` 阈值时，使用 **LRU（最近最少使用）算法**剔除最久未被访问的组件实例，并调用其卸载生命周期。

**原理解析与手写实现**：
1. **LRU 策略**：
   - 每次访问或命中缓存中的组件时，将该组件的 `key` 从当前位置删除并追加到末尾（使其成为最新活跃项）。
   - 当加入新组件导致缓存超出 `max` 时，删除开头的首个 `key`（最久未被使用项），并销毁对应的组件实例。

**标准代码实现**：
```typescript
class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V> = new Map();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  public get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;
    // 命中缓存：先删后加，移动到最新活跃位置
    const val = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  public put(key: K, value: V, onEvict?: (evictedValue: V) => void): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // 淘汰头部最久未使用的项
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey !== undefined) {
        const oldestVal = this.cache.get(oldestKey)!;
        this.cache.delete(oldestKey);
        onEvict?.(oldestVal);
      }
    }
    this.cache.set(key, value);
  }
}
```

**面试官视角**：
- 考察点：是否理解 `<keep-alive>` 中 `activated` / `deactivated` 生命周期的触发时机（组件并未真正触发 `unmounted`，而是被移入隐藏的内存片段中）。
- 延伸：Vue 3 源码中直接借助了 ES6 `Set` 的迭代顺序天然实现了 LRU（`keys.delete(key); keys.add(key)`），比传统双向链表+哈希表的纯算法实现更为优雅精简。
</Answer>

#### 2. 不定长二维数组的笛卡尔积全排列算法？ {#p1-cartesian-product}

<Answer>
**核心结论**：
笛卡尔积全排列是电商 SKU 组合生成、多维度报表矩阵与配置组合的高频考题。使用 `Array.prototype.reduce` 结合内部双重循环，可以在线性函数式风格下高可读地生成全部组合。

**算法实现**：
```typescript
function cartesianProduct<T>(arrays: T[][]): T[][] {
  if (arrays.length === 0) return [];

  return arrays.reduce((accumulator, currentArray) => {
    const result: T[][] = [];
    for (const accItem of accumulator) {
      for (const currItem of currentArray) {
        result.push([...accItem, currItem]);
      }
    }
    return result;
  }, [[]] as T[][]);
}

// 字符串组合版本
function cartesianStringProduct(arrays: string[][]): string[] {
  const product = cartesianProduct(arrays);
  return product.map(items => items.join(''));
}

// 验证
const input = [['A', 'B'], ['1', '2'], ['a', 'b']];
console.log(cartesianStringProduct(input));
// 输出: ['A1a', 'A1b', 'A2a', 'A2b', 'B1a', 'B1b', 'B2a', 'B2b']
```

**面试官视角**：
- 考察点：函数式编程思想与递归累加器的应用。
- 复杂度分析：时间复杂度为 $O(N_1 \times N_2 \times \dots \times N_k)$，空间复杂度与结果集规模等同。
</Answer>

---

## 真实面经问题精选

1. **JavaScript 核心与底层**：
   - `say.call.call` 的最终执行结果与原理解释。
   - `script` 标签中 `async` 与 `defer` 对 DOM 解析和执行时机的影响。
   - 闭包陷阱的产生与借助 `useRef` / `useLatest` 保障实时引用的方案。
   - 常见内存泄漏场景（未清理的计时器、闭包引用、全局变量、脱离 DOM 树的节点）与 Chrome DevTools 堆快照（Heap Snapshot）分析。
2. **Vue3 与生态框架**：
   - 为什么项目中选用 Pinia 替代 Vuex？（去掉了 mutations 样板代码，天然的 TypeScript 类型推导，扁平化的 Store 结构）。
   - `<template>` 中使用动态 `:key` 强制触发组件重新挂载与完整销毁的机制。
3. **Electron 与客户端架构**：
   - Electron 主进程与渲染进程的异常捕获策略（`unhandledRejection`、`uncaughtException`、`render-process-gone`）。
   - 多窗口/多 Tab 架构下的内存治理方案（Tab 挂起休眠、不可见时卸载 Canvas 离屏缓冲）。
4. **前端工程化与安全**：
   - 跨站脚本攻击与 CSP（Content-Security-Policy）头指令在 `iframe` 安全沙箱中的应用。
   - 网页代码高亮库的底层 AST 语法树解析与 Token 染色过程。

---

## 考察重点速览

1. **算法与数据结构深度**：编辑距离、笛卡尔积、二分查找、对象树扁平化与 LRU 缓存。
2. **渲染性能与视口优化**：不定高虚拟列表动态修正、白屏预防与浏览器回流重绘批处理。
3. **Electron 客户端工程化**：安全沙箱、进程生命周期、私有化环境打包与离线网络适配。

---

## 备考建议

1. **手写核心算法**：熟练在白板/纯文本环境下默写树遍历、动态规划与深浅拷贝。
2. **掌握 Electron 核心机制**：深入研读官方安全规范与 IPC 通信的最佳实践。
3. **准备 1-2 个代表性技术攻坚点**：重点阐述“发现问题 -> 性能度量 -> 架构推导 -> 落地收益”的完整技术闭环。

