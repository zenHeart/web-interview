# 石墨文档✅

- **业务领域**: 云端实时协同办公、在线文档（文档/表格/幻灯片/思维导图）、企业协同套件与私有化部署
- **技术栈**: React、TypeScript、Node.js、Canvas/WebGL、OT/CRDT 实时协同算法、Web Worker
- **团队规模**: 核心前端与协同算法团队约120人
- **办公地点**: 武汉（光谷软件园核心研发基地）、北京、上海
- **公司性质**: 协同办公科技领军企业
- **薪资水平**: 校招16-30万，社招22-55万

## 岗位类型

- **富文本协同前端开发工程师** - 负责石墨在线文档编辑器排版、选区光标同步、Markdown 快捷语法与富文本渲染
- **高性能表格引擎开发工程师** - 负责百万级单元格 Canvas 虚拟渲染、公式引擎解析与离线增量同步
- **大前端架构师** - 负责协同算法基础设施演进、多端组件化物料设计及私有化交付方案

## 技术特色

- **OT 与 CRDT 工业级协同算法落地**: 自研基于 Operational Transformation (OT) 的文本与表格数据同步协议，攻坚并发冲突消解与历史版本回滚。
- **Canvas/DOM 双引擎混合排版与光标定位**: 在线表格采用 Canvas 高帧率绘制视口单元格，文档编辑区采用精确字形测量与虚拟光标投影。
- **Web Worker 多线程计算隔离**: 将复杂的公式解析树执行、大文档序列化与版本差量计算卸载至 Worker 线程，杜绝主线程卡顿。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **在线算法笔试** → **技术一面（基础功底与原生手写）** → **技术二面（React 源码与组件设计）** → **HR面试**
   - 总流程约3-4周
   - 难度: 4/5星
   - 通过率: 约10%

### 社会招聘

1. **简历筛选** → **技术一面（JS 核心规范、TypeScript 与逻辑编程题）** → **技术二面（协同编辑原理、系统设计与工程化）** → **技术总监/CTO 面** → **HR面试**
   - 总流程约2周
   - 难度: 4.5/5星
   - 通过率: 约10%

## 题库

### P0 必考知识点

#### 在线协同编辑系统的 OT（操作转换）与 CRDT 算法核心原理？ {#p0-ot-crdt-collaborative}

<Answer>

### 核心结论

多人在弱网环境下同时编辑同一篇在线文档时，若仅按接收时序覆盖，必将导致文档错乱。
- **OT（Operational Transformation，操作转换）**：依赖中心化服务器作为裁决中枢（Centralized Arbiter），将并发操作（如 Insert/Delete）根据彼此的相对位移进行位置变换：`T(op_A, op_B) = (op_A', op_B')`，保证所有人最终收敛一致（如 Google Docs、石墨文档主流）。
- **CRDT（Conflict-free Replicated Data Types，无冲突复制数据类型）**：采用去中心化、基于数学半格（Semi-lattice）的强最终一致性模型，每个字符拥有全序唯一全局 ID，操作满足结合律、交换律和幂等性（如 Yjs、Automerge）。

---

### OT 核心操作示例（Insert vs Insert）

假设文档初始为 `"cat"`：
1. 用户 1 在索引 0 插入 `'a'` -> `op_1 = Insert(0, 'a')`，意图变为 `"acat"`；
2. 用户 2 在索引 2 插入 `'s'` -> `op_2 = Insert(2, 's')`，意图变为 `"cast"`；
3. **服务端转换**：
   - 客户端 1 接收到 `op_2` 时，由于自身已在位置 0 插入了字符，后续索引整体后移，故 `op_2` 转换为 `op_2' = Insert(3, 's')`；
   - 客户端 2 接收到 `op_1` 时，插入位置在前方，因此 `op_1' = Insert(0, 'a')` 无需偏移；
   - 两端最终均收敛为：`"acast"`。

---

### 面试官视角

石墨文档核心考点。面试官考察候选人对文本协同算法分类、单字符索引位移推导、离线未确认操作堆栈（Client Undo/Redo）的深入认知。

</Answer>

#### 手写对象的深度扁平化 `flatten(obj)`（支持嵌套对象与数组下标路径）？ {#p0-object-flatten}

<Answer>

### 核心结论

对象扁平化是将深层嵌套的对象/数组，依据路径访问语法（如 `'a.b'`、`'b[0]'`）拍平成扁平的单层键值映射对象。核心在于**递归遍历 + 前缀路径拼接**。

---

### 规范手写实现

```javascript
function flattenObject(obj) {
  const result = {}

  function traverse(current, prefix = '') {
    // 基础类型直接写入结果
    if (current === null || typeof current !== 'object') {
      if (prefix) result[prefix] = current
      return
    }

    if (Array.isArray(current)) {
      current.forEach((item, index) => {
        const nextKey = prefix ? `${prefix}[${index}]` : `[${index}]`
        traverse(item, nextKey)
      })
    } else {
      Object.keys(current).forEach(key => {
        const nextKey = prefix ? `${prefix}.${key}` : key
        traverse(current[key], nextKey)
      })
    }
  }

  traverse(obj)
  return result
}

// 测试用例
const obj = {
  a: { b: 1, c: 2, d: { e: 5 } },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3
}

console.log(flattenObject(obj))
/* 输出结果：
{
  'a.b': 1,
  'a.c': 2,
  'a.d.e': 5,
  'b[0]': 1,
  'b[1]': 3,
  'b[2].a': 2,
  'b[2].b': 3,
  'c': 3
}
*/
```

---

### 面试官视角

石墨技术一面高频编程题。考查递归边界保护（null、数组、普通对象）、路径拼接的下标方括号转换以及对原始引用类型的判断准确性。

</Answer>

### P1 高频知识点

#### 四则运算字符串中连续高优先级乘除法表达式加括号与计算？ {#p1-expression-parentheses-calc}

<Answer>

### 核心结论

给定算术字符串（如 `'11+2-3*4+5/2*4+10/5'`），将连续高优先级的乘除运算用小括号包裹成 `'11+2-(3*4)+(5/2*4)+(10/5)'`。核心可利用**正则表达式全局替换**或**经典栈（Stack）词法解析器**。

---

### 规范正则实现

```javascript
function wrapHighPriorityOps(str) {
  // 匹配连续的数字及其间的乘除法：(\d+(?:[*/]\d+)+)
  const regex = /(\d+(?:[*/]\d+)+)/g
  return str.replace(regex, '($1)')
}

// 测试
const str = '11+2-3*4+5/2*4+10/5'
console.log(wrapHighPriorityOps(str))
// 输出: '11+2-(3*4)+(5/2*4)+(10/5)'
```

---

### 延伸阅读

- [石墨文档李子骢：Node.js 全栈开发与协同演进](https://static001.geekbang.org/)
- [OT 协同算法交互可视化演化指南](https://operational-transformation.github.io/)

</Answer>

## 考察重点速览

- **必考知识点**: 协同编辑 OT/CRDT 算法、富文本编辑器排版原理、TypeScript 高级类型（any vs unknown、keyof/泛型）、事件循环机制。
- **高频面试题**: 对象嵌套扁平化 flatten、四则运算括号包裹、连续多个 bind 的 this 判定、React 页面卡顿性能调优。
- **编程挑战**: 表达式加括号与求值、扁平对象还原（unflatten）、实现带类型提示的 `get(data, key)`。

## 备考建议

**针对性准备策略**
- **深入富文本与协同编辑领域**: 石墨文档是协同办公标杆，务必掌握 OT 操作原理、浏览器选区 Selection 与 Range API、虚拟滚动在表格中的应用。
- **注重算法手写与细节追问**: 提前熟练在线做题与纯手写代码，重点复习递归、栈与正则。

**推荐准备资源**
- [石墨技术团队知乎专栏](https://zhuanlan.zhihu.com/p/28404573)
- [Slate.js 与 ProseMirror 富文本框架精读](https://prosemirror.net/)

**差异化准备建议**
- **校招生**: 深入理解 JS 运行机制（闭包/原型/事件循环）、算法代码规范与 TypeScript 基础。
- **社招生**: 突出富文本/大表格架构经验、OT 协同算法实践、Web Worker 异步优化及大中型 React 系统性能调优。

