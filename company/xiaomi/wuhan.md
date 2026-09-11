# 小米（武汉研发中心）✅

## 基本信息

- **业务领域**: 小米互联网服务、全球海外电商平台、大数据分析看板、智能设备云平台
- **技术栈**: Vue3 / React / TypeScript / Node.js / Webpack / Vite / Less / WebSocket
- **团队规模**: 3,000+ 人（小米武汉研发总部主力园区）
- **办公地点**: 武汉市东湖高新区高新大道 666 号小米武汉总部大楼
- **公司性质**: 500 强知名上市公司（小米集团 01810.HK）
- **薪资水平**: 16k-32k * 14-16薪 + 年终丰厚奖金 + 六险一金

---

## 岗位类型

- **高级 Web 前端工程师**: 负责海外小米商城多语言业务、大型中后台数据治理平台、IoT 云端可视化看板研发。
- **移动端与跨端开发工程师**: 负责小米有品内嵌 H5 性能调优、微信小程序及混合容器 JSBridge 通信。
- **前端工程化与效能专家**: 负责大型 Monorepo 编译提速、自动化 CI/CD 质量门禁与跨部门通用组件物料生态建设。

---

## 技术特色

1. **亿级全球流量海外电商体验**：
   - 支持全球 100+ 国家和地区，涉及复杂多币种计算、动态多语言异步拆包分发及边缘节点 SSR 加速。
2. **海量硬件设备运行状态监控看板**：
   - 面对千万级在线智能硬件的高频状态流，自研高性能时序图表聚合看板与低延迟 WebSocket 实时预警。
3. **扎实的基础架构与工程规范**：
   - 强调底层原生 JavaScript 语言功底、标准 DOM API 渲染管线机制与经典数据结构算法的现场白板考核。

---

## 面试流程概览

### 校招流程
1. **在线笔试 (90min)**: 计算机基础、单选/多选及 2-3 道编程题（字符串处理、链表/二叉树、动态规划）。
2. **专业一面 (50min)**: 原生 JavaScript 核心（闭包/原型/事件循环）、CSS 布局（圣杯/Flex/层叠）、DOMContentLoaded 渲染时机。
3. **专业二面 (60min)**: 框架深度原理（Vue/React）、项目技术难点深挖、手撕算法代码。
4. **HR 终面 (30min)**: 综合素养评估、文化价值观认同与 Offer 发放。

### 社招流程
1. **技术初试 (60min)**: 简历项目深度复盘，考核基础语言功底、现场手写深克隆与字符频次统计。
2. **技术复试 (60-75min)**: 架构攻坚深挖，深入考察一万条 DOM 渲染调优、跨端生态、构建工具打包调优。
3. **部门总监面 (45min)**: 考察技术演进前瞻性、跨部门推动力与复杂业务建模能力。
4. **HR 面与发薪**: 背景调查与职级薪资确认。

---

## 题库

### P0 核心必考题

#### 1. 浏览器渲染流程中 `DOMContentLoaded` 与 `load` 事件的触发时机与本质区别？ {#p0-domcontentloaded-vs-load}

<Answer>
**核心结论**：
`DOMContentLoaded` 与 `load` 标志着页面加载过程中的两个完全不同的里程碑：
- **`DOMContentLoaded`（DOM 树就绪）**：当浏览器完成 HTML 文档的解析，且所有的常规同步 `<script>` 脚本均已下载并执行完毕后立即触发。**它完全不等待外部图片、样式表、视频或 `iframe` 等静态资源的下载完毕**。
- **`load`（全量资源就绪）**：当页面上的所有依赖资源（包括 HTML、所有引用的图片、音频、样式表以及外部嵌入的 `iframe` 容器）全部成功下载完成并解析后才触发。

**原理解析与时序细节**：
1. **CSS 样式表是否会阻塞 `DOMContentLoaded`？**：
   - 理论上，样式表本身不会阻碍 HTML 解析（DOM 树的构建）；
   - **但是**：如果 HTML 中样式表标签 `<link rel="stylesheet">` 后面紧跟着一段 `<script>` 同步脚本，由于 JS 脚本可能会读取计算后的样式（如 `getComputedStyle`），浏览器会强制暂停 JS 执行以等待前面的 CSS 加载完成。此时，**CSS 的加载间接推迟了 `DOMContentLoaded` 的触发！**
2. **`async` 与 `defer` 对 `DOMContentLoaded` 的影响**：
   - 带 `defer` 的脚本：在 HTML 解析期间并行异步下载，等待 HTML 解析完毕后按书写顺序执行，**严格在 `DOMContentLoaded` 触发之前执行完成**。
   - 带 `async` 的脚本：异步下载完毕后立即暂停解析并执行，可能在 `DOMContentLoaded` 之前或之后触发，与该事件互不阻塞。

**面试官视角**：
- 考核候选人对浏览器底层网络与渲染流水线的微观掌控能力，能否清楚解释首屏性能监控关键指标（如 FCP、LCP、TTI）与这两个事件的对应关系。
</Answer>

#### 2. 统计字符串中出现频次最高的字符及次数（$O(N)$ 复杂度实现）？ {#p0-max-char-count}

<Answer>
**核心结论**：
该题是字符串哈希映射与极大值贪心维护的基础考题。最佳时间复杂度为 $O(N)$，空间复杂度为 $O(\Sigma)$（$\Sigma$ 为字符集大小，最多 256 或由 Unicode 决定）。解题关键是在一次线性遍历中建立频次映射表，并实时维护全局最大计数值与对应字符（若存在并列最大需全部返回）。

**标准代码手写**：
```typescript
interface MaxCharResult {
  chars: string[];
  maxCount: number;
}

function findMaxFrequencyChars(str: string): MaxCharResult {
  if (!str) return { chars: [], maxCount: 0 };

  const counter: Record<string, number> = {};
  let maxCount = 0;

  // 1. 统计每个字符出现的频次，并动态维护最大值
  for (const char of str) {
    counter[char] = (counter[char] || 0) + 1;
    if (counter[char] > maxCount) {
      maxCount = counter[char];
    }
  }

  // 2. 收集所有达到 maxCount 的字符（处理并列情况）
  const chars: string[] = [];
  for (const [char, count] of Object.entries(counter)) {
    if (count === maxCount) {
      chars.push(char);
    }
  }

  return { chars, maxCount };
}

// 验证
console.log(findMaxFrequencyChars('xiaomi_ecosystem_in_wuhan'));
```

**面试官视角**：
- 考察点：是否考虑字符串为空的边界情况；是否考虑到可能有多个字符并列最高频次的场景。
</Answer>

#### 3. 手写完备深克隆（Deep Clone），涵盖循环引用、Date、RegExp 与 Symbol 属性？ {#p0-handwritten-deep-clone}

<Answer>
**核心结论**：
一个工业级健壮的深克隆函数必须解决四大核心难点：
1. **循环引用（Circular Reference）**：使用 `WeakMap` 记录已克隆的对象引用，一旦发现环状结构直接返回缓存，防止调用栈溢出；
2. **特殊对象类型的保真克隆**：精确克隆 `Date`、`RegExp`、`Map`、`Set` 等原型实例；
3. **Symbol 属性与不可枚举属性**：使用 `Reflect.ownKeys()` 替代 `Object.keys()` 获取包含 `Symbol` 在内的全部自身键名；
4. **原型链保持**：使用 `Object.create(Object.getPrototypeOf(target))` 保留目标对象的原型链。

**标准生产级代码手写**：
```typescript
function deepClone<T>(target: T, hash = new WeakMap()): T {
  // 1. 处理原始类型与 null
  if (target === null || typeof target !== 'object') {
    return target;
  }

  // 2. 处理 Date 与 RegExp
  if (target instanceof Date) return new Date(target.getTime()) as any;
  if (target instanceof RegExp) return new RegExp(target.source, target.flags) as any;

  // 3. 处理循环引用
  if (hash.has(target)) {
    return hash.get(target);
  }

  // 4. 处理 Map 与 Set
  if (target instanceof Set) {
    const cloneSet = new Set();
    hash.set(target, cloneSet);
    target.forEach(val => cloneSet.add(deepClone(val, hash)));
    return cloneSet as any;
  }
  if (target instanceof Map) {
    const cloneMap = new Map();
    hash.set(target, cloneMap);
    target.forEach((val, key) => cloneMap.set(deepClone(key, hash), deepClone(val, hash)));
    return cloneMap as any;
  }

  // 5. 处理普通对象或数组，保持原型链
  const cloneTarget: any = Array.isArray(target)
    ? []
    : Object.create(Object.getPrototypeOf(target));
  
  hash.set(target, cloneTarget);

  // 6. 使用 Reflect.ownKeys 获取所有属性名（包含 Symbol）
  for (const key of Reflect.ownKeys(target as any)) {
    cloneTarget[key] = deepClone((target as any)[key], hash);
  }

  return cloneTarget;
}
```

**面试官视角**：
- 考核候选人对 JavaScript 元编程、内存引用图谱与类型体系的掌握深度。
</Answer>

---

### P1 高频必会题

#### 1. 遍历并统计当前 HTML 页面中所有不同标签种类的出现频次？ {#p1-count-html-tags}

<Answer>
**核心结论**：
利用现代标准 DOM API `document.querySelectorAll('*')` 可以一次性获取页面所有挂载的元素节点，将 `NodeList` 转化为数组后，借助 `Array.prototype.reduce` 即可在一行函数式代码中完成各标签大写名称（`tagName`）的聚合统计。

**标准生产代码实现**：
```typescript
function countAllPageTags(): Record<string, number> {
  const elements = Array.from(document.querySelectorAll('*'));

  return elements.reduce<Record<string, number>>((acc, el) => {
    const tag = el.tagName.toLowerCase();
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
}

// 打印结果并按频次降序输出
const tagStats = countAllPageTags();
console.table(
  Object.entries(tagStats)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
);
```

**面试官视角**：
- 考察点：是否熟练运用标准 DOM API 与 ES6 数组高阶函数，避免写出冗长易错的循环嵌套。
</Answer>

#### 2. CSS 布局视口（Layout Viewport）与视觉视口（Visual Viewport）深度剖析？ {#p1-layout-visual-viewport}

<Answer>
**核心结论**：
在移动端浏览器中，为了在狭小的物理屏幕上完整显示最初为 PC 设计的网页，W3C 将视口拆分为两个独立的概念：
- **布局视口（Layout Viewport）**：CSS 样式布局的基准参照物，默认宽度通常被移动浏览器设定为 **980px**。元素以该视口为基准进行百分比布局。
- **视觉视口（Visual Viewport）**：用户当前在手机物理屏幕上**能够直接看到的网页可视区域**。
- **理想视口（Ideal Viewport）**：通过 `<meta name="viewport" content="width=device-width, initial-scale=1.0">`，强制让布局视口宽度等于设备的物理独立像素宽度，使视觉视口与布局视口达到 $1:1$ 吻合，彻底终结缩放与水平滚动条。

**面试官视角**：
- 考查候选人对移动端响应式与视口规范（CSSOM View）底层演进的理解。
</Answer>

---

## 真实面经精选汇总（小米武汉全景）

1. **JavaScript 语言核心**：
   - 原始类型与引用类型、深浅拷贝与循环引用防范。
   - 箭头函数与普通函数的四大区别（无自身 this、不可作为构造函数、无 arguments、无 prototype）。
   - `say.call.call` 执行原理推导与 `call` / `bind` 底层手写。
2. **CSS 与页面布局**：
   - 隐藏与显示（`display:none`、`visibility:hidden`、`opacity:0`）的重排重绘差异与事件响应。
   - 圣杯布局与双飞燕布局历史演进、Flexbox 弹性盒弹性基准计算（`flex-grow` / `flex-shrink` / `flex-basis`）。
   - 外边距折叠（Margin Collapse）触发条件与 BFC 隔离规则。
3. **浏览器渲染与性能**：
   - `DOMContentLoaded` 与 `load` 事件触发时机。
   - 一万条 DOM 节点极速插入与渲染优化（时间切片 vs 虚拟列表）。
   - `requestAnimationFrame` 相比 `setTimeout` 做动画的核心优势（硬件刷新率同步、后台隐藏自动节流停摆）。
4. **框架与工程化**：
   - Vue `methods`、`watch`、`computed` 内部缓存与依赖追踪机制。
   - Webpack 插件 Plugin 架构与 Compiler/Compilation 钩子执行流程。

---

## 考察重点速览

1. **原生 JavaScript 核心深度**：深克隆、闭包作用域链、事件循环微观时序。
2. **浏览器底层渲染管线**：`DOMContentLoaded` 阻塞机制、视口体系与重排重绘优化。
3. **数据结构与算法**：双向链表、字符串频次哈希、二叉树遍历。

---

## 备考建议

1. **白板手写深克隆与继承**：确保能行云流水地处理循环引用与 Symbol 边界。
2. **理解浏览器事件底层**：不仅背诵概念，要能说明 CSS 样式表如何间接推迟 `DOMContentLoaded`。
3. **掌握高频字符串与链表算法**：小米武汉非常看重基础编码速度与代码规范性。

