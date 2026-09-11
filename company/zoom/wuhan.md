# Zoom（武汉研发中心）✅

## 基本信息

- **业务领域**: 全球视频会议、Zoom Docs 在线协同文档、企业级多维表格、AI 协同办公助手（Zoom AI Companion）
- **技术栈**: React / TypeScript / Canvas / WebGL / WebAssembly / WebCodecs / WebSockets / Node.js
- **团队规模**: 500+ 人（Zoom 中国核心产研中心）
- **办公地点**: 武汉市东湖高新区光谷软件园 / 光谷新发展国际中心
- **公司性质**: 纳斯达克知名上市外企（NASDAQ: ZM）
- **薪资水平**: 25k-50k * 14-16薪 + 美股 RSU 股票期权 + 补充医疗与全额公积金

---

## 岗位类型

- **资深 Web 协同开发工程师**: 负责 Zoom Docs、在线多维表格、画板白板（Whiteboard）核心排版与 OT 冲突合并引擎研发。
- **WebRTC 实时流媒体工程师**: 负责基于 WebAssembly 与 WebCodecs 的网页端超高清音视频解码、虚拟背景与低延时推拉流。
- **AI 交互与前端架构师**: 负责大语言模型流式输出（SSE）解析、动态 Markdown 补齐、知识库目录树以及大型 React 架构治理。

---

## 技术特色

1. **工业级 Canvas 协同表格底层设计**：
   - 彻底摆脱原生 DOM 渲染的性能包袱，在 Canvas 上自研单元格网格系统、双向虚拟滚动、动态选区、行内富文本编辑与公式依赖拓扑图。
2. **AI 流式渲染防截断与容错机制**：
   - 面对 LLM 逐字流式打字机输出，在前端建立轻量解析器，动态捕获未闭合的 Markdown 代码块、缺失竖线与破损的表格边框并实时补齐，杜绝白屏闪烁。
3. **硅谷外企严谨的代码素养与算法深度**：
   - 4 轮深度技术面试，覆盖复杂递归与栈结构手撕、TypeScript 严格类型推导、性能测量（Layout Thrashing）与清晰的系统设计。

---

## 面试流程概览

### 校招流程
1. **在线英文编程测试 (HackerRank)**: 算法题（栈与队列、回溯、动态规划）。
2. **技术初试 (60min)**: 全英文自我介绍、数据结构手撕、浏览器事件循环。
3. **技术复试 (60min)**: 重点框架机制、DOM 渲染管线深度分析、代码设计。
4. **主管与 HR 终面 (45min)**: 团队敏捷协作能力、英文口语与文化适配。

### 社招流程
1. **一面（技术基础与编码, 60min）**: 性能监控、`requestAnimationFrame` 与 `requestIdleCallback`、重排重绘、TS 泛型约束手写、复杂数组对象扁平化（flatten）。
2. **二面（协同与流式架构, 75min）**: AI 流式输出解析、Markdown 截断与缺省表格自动补齐算法手写、高性能表格组件属性架构设计。
3. **三面（架构深挖与算法, 75min）**: 协同表格难点、单元格合并的 OT 冲突本质、内存调优、手撕支持四则运算与括号的字符串计算器。
4. **四面（系统设计与总监面, 60min）**: 知识库树形目录设计、拖拽重排（Drag and Drop）树形算法、TypeScript 条件类型、AI 前沿落地思考。
5. **HR 面与 Offer**: 薪酬与股票结构沟通、背景调查与正式聘用。

---

## 题库

### P0 核心必考题

#### 1. 复杂嵌套对象与数组的扁平化（Flatten）算法实现（保留点号与中括号下标）？ {#p0-flatten-object-array}

<Answer>
**核心结论**：
该题目要求将深度嵌套的对象与数组结构打平为单层 Key-Value 映射。核心难点在于：**对象属性使用点号 `.` 连接（如 `a.b`），而数组元素必须精确转换为中括号下标 `[index]`（如 `b[0]`、`b[2].a`）**。采用深度优先递归（DFS），并在路径累加时根据当前容器是数组还是普通对象采用不同的拼接策略。

**标准代码实现**：
```typescript
function flatten(obj: any, prefix = '', result: Record<string, any> = {}): Record<string, any> {
  if (obj === null || typeof obj !== 'object') {
    if (prefix) result[prefix] = obj;
    return result;
  }

  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      const newKey = `${prefix}[${index}]`;
      if (typeof item === 'object' && item !== null) {
        flatten(item, newKey, result);
      } else {
        result[newKey] = item;
      }
    });
  } else {
    for (const key of Object.keys(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];
      if (typeof value === 'object' && value !== null) {
        flatten(value, newKey, result);
      } else {
        result[newKey] = value;
      }
    }
  }

  return result;
}

// 验证用例
const input = {
  a: {
    b: 1,
    c: 2,
    d: { e: 5 }
  },
  b: [1, 3, { a: 2, b: 3 }],
  c: 3
};

console.log(flatten(input));
// 输出:
// {
//   'a.b': 1,
//   'a.c': 2,
//   'a.d.e': 5,
//   'b[0]': 1,
//   'b[1]': 3,
//   'b[2].a': 2,
//   'b[2].b': 3,
//   'c': 3
// }
```

**面试官视角**：
- 考核候选人处理树形递归结构时的边界判断，能否精准处理数组与对象的交替嵌套。
</Answer>

#### 2. LLM 流式输出场景下的 Markdown 缺省表格动态解析与结构自动补齐算法？ {#p0-markdown-table-completion}

<Answer>
**核心结论**：
在接入 ChatGPT / Claude 等大模型流式输出（Server-Sent Events / SSE）时，大模型经常在输出表格的中间状态被截断（例如表头生成完毕，但数据行末尾缺少竖线 `|`，或仅输出了表头而分隔行尚未吐出）。若直接送入普通 Markdown 渲染器，会导致整个表格排版破损、闪烁跳动。算法核心逻辑：**按行扫描，提取表头列数 $N$；若缺少表头分隔行 `| --- |` 则自动补齐；对于未闭合或缺失单元格的数据行，自动在末尾补充空格与 `|` 使其列数与表头对齐**。

**标准代码实现**：
```typescript
function completeTable(markdown: string): string {
  const lines = markdown.trim().split('\n');
  if (lines.length === 0) return markdown;

  // 1. 检查第一行是否为表格头部
  const headerLine = lines[0].trim();
  if (!headerLine.startsWith('|')) return markdown;

  // 计算表头实际列数（去除首尾空元素）
  const headerCols = headerLine.split('|').map(s => s.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
  const colCount = headerCols.length;
  if (colCount === 0) return markdown;

  const resultLines: string[] = [];
  resultLines.push(ensureClosedRow(headerLine, colCount));

  // 2. 检查是否有合法的分隔行（| --- | --- |）
  let dataStartIndex = 1;
  const standardSeparator = '| ' + new Array(colCount).fill('---').join(' | ') + ' |';

  if (lines.length === 1) {
    // 只有表头，自动补齐分隔行
    resultLines.push(standardSeparator);
    return resultLines.join('\n');
  }

  const secondLine = lines[1].trim();
  if (secondLine.startsWith('|') && secondLine.includes('-')) {
    resultLines.push(ensureClosedRow(secondLine, colCount, '---'));
    dataStartIndex = 2;
  } else {
    // 第二行直接是数据行或不规范，强制插入标准分隔行
    resultLines.push(standardSeparator);
  }

  // 3. 补齐后续各数据行
  for (let i = dataStartIndex; i < lines.length; i++) {
    const rawLine = lines[i].trim();
    if (!rawLine) continue;
    resultLines.push(ensureClosedRow(rawLine, colCount));
  }

  return resultLines.join('\n');
}

// 辅助函数：补齐单行使其闭合且单元格列数达标
function ensureClosedRow(line: string, expectedCols: number, fillContent = ''): string {
  let content = line;
  if (!content.startsWith('|')) content = '| ' + content;
  if (!content.endsWith('|')) content = content + ' |';

  const cells = content.split('|').slice(1, -1).map(s => s.trim());
  while (cells.length < expectedCols) {
    cells.push(fillContent);
  }

  return '| ' + cells.slice(0, expectedCols).join(' | ') + ' |';
}

// 验证
const brokenTable = `
| 姓名 | 年龄 |
| ---- | ---- |
| 张三 | 18
`;
console.log(completeTable(brokenTable));
```

**面试官视角**：
- 考核候选人结合现代 Generative AI 前端落地痛点解决真实工程问题的能力。
</Answer>

#### 3. 手写支持四则运算优先级与括号的字符串计算器（双栈求值算法）？ {#p0-string-calculator}

<Answer>
**核心结论**：
实现支持 `+`、`-`、`*`、`/`、空格及 `(` `)` 的字符串计算器（**LeetCode 224 / 227 / 772. 基本计算器**）。经典工业级方案采用**双栈模型（操作数栈 `nums` + 运算符栈 `ops`）**。遇到数字压入数字栈；遇到左括号压入符号栈；遇到右括号计算到最近的左括号；遇到普通运算符，只要栈顶符号优先级更高或相同，就先弹出栈顶符号和两个操作数执行局部计算，维护严格的算符优先级。

**标准生产代码实现**：
```typescript
function calculate(s: string): number {
  const nums: number[] = [];
  const ops: string[] = [];

  const precedence: Record<string, number> = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };

  const applyOp = () => {
    const b = nums.pop()!;
    const a = nums.pop()!;
    const op = ops.pop()!;
    let res = 0;
    if (op === '+') res = a + b;
    else if (op === '-') res = a - b;
    else if (op === '*') res = a * b;
    else if (op === '/') res = Math.trunc(a / b);
    nums.push(res);
  };

  let i = 0;
  while (i < s.length) {
    const char = s[i];

    if (char === ' ') {
      i++;
      continue;
    }

    if (char >= '0' && char <= '9') {
      let num = 0;
      while (i < s.length && s[i] >= '0' && s[i] <= '9') {
        num = num * 10 + Number(s[i]);
        i++;
      }
      nums.push(num);
      continue;
    }

    if (char === '(') {
      ops.push(char);
    } else if (char === ')') {
      while (ops.length > 0 && ops[ops.length - 1] !== '(') {
        applyOp();
      }
      ops.pop(); // 弹出 '('
    } else if (['+', '-', '*', '/'].includes(char)) {
      // 处理负号特例，如 "(-2)"
      if (char === '-' && (i === 0 || s[i - 1] === '(')) {
        nums.push(0);
      }
      while (
        ops.length > 0 &&
        ops[ops.length - 1] !== '(' &&
        precedence[ops[ops.length - 1]] >= precedence[char]
      ) {
        applyOp();
      }
      ops.push(char);
    }
    i++;
  }

  while (ops.length > 0) {
    applyOp();
  }

  return nums[0];
}

// 验证
console.log(calculate('1+2*3-4/2')); // 输出: 5
console.log(calculate('(1 + 2) * (3 + 4)')); // 输出: 21
```

**面试官视角**：
- 考核候选人数据结构（栈）运用、逆波兰表达式本质与边界处理能力。
</Answer>

---

### P1 高频必会题

#### 1. 在线协同多维表格为什么通常以“单元格”为原子协同单位而弱化单元格合并？ {#p1-collab-table-cell-unit}

<Answer>
**核心结论**：
在实时协同多维表格（如 Zoom Docs Table、Airtable、飞书多维表格）中，**以“单元格（Row ID + Field ID）”作为原子协同单元是保证状态最终一致性与系统收敛的工程基石**：
1. **天然无锁与无冲突**：多维表格本质是“关系型数据库的视图呈现”。用户 A 编辑第一行“状态”列，用户 B 编辑第一行“截止日期”列，两者操作作用于不同字段槽位，互不冲突，无需复杂的文本级字符重排；
2. **单元格合并破坏二维索引连续性**：若允许自由合并单元格（如把 $(1, 1)$ 与 $(2, 2)$ 跨行跨列合并），会导致数据模型中出现“被隐藏/占位的空洞单元格”，当用户并发执行“插入行”、“删除列”或“列排序”时，合并区域将产生无法调和的几何撕裂与拓扑悖论；
3. **OT 复杂度爆炸**：普通关系型字段排序与过滤只需要简单的行索引置换，而跨行列合并会导致操作转换（OT）矩阵的复杂度从 $O(1)$ 急剧恶化至指数级。

**面试官视角**：
- 考核候选人对系统架构本质的探究深度，能否从底层数据模型（关系型模型 vs 几何排版模型）解释业务功能取舍。
</Answer>

---

## 真实面经问题清单（1-4 面完整回顾）

### 一面
1. 前端性能优化度量标准与实战总结。
2. 宏任务与微任务的核心差异与执行机制。
3. `requestAnimationFrame` 执行时机及其在 60FPS 动画中的优势。
4. `requestIdleCallback` 原理与它是否会阻塞下一帧渲染。
5. 浏览器重排（Reflow）与重绘（Repaint）触发路径。
6. `getBoundingClientRect()` 是否一定会触发重排？（布局抖动 Layout Thrashing 剖析）。
7. TypeScript 泛型约束 `setObject(target, key, value)` 强类型手写。
8. 复杂对象与数组的扁平化 `flatten` 算法（保留 `b[0]` 与 `a.b` 格式）。

### 二面
1. AI 流式文本渲染架构与防截断处理。
2. Markdown 缺省表格自动补齐算法 `completeTable` 手写实现。
3. 高性能在线表格组件架构设计（属性契约、视图渲染与业务调用方式）。

### 三面
1. 过往最具挑战性的协同/前端项目深度复盘。
2. 多人在线协同表格的核心难点（并发冲突消解、离线状态同步）。
3. 为什么多维表格协同以单元格为单位而不支持随意合并。
4. 字符串计算器手撕（支持四则运算、括号与运算符优先级）。

### 四面
1. 知识库目录树（Directory Tree）数据结构设计与拖拽重排（Drag & Drop）算法。
2. TypeScript 条件类型（Conditional Types）与 `infer` 关键字原理。
3. 生成式 AI 工具（Copilot / LLM）在前端架构与效能提速中的深度落地。

---

## 考察重点速览

1. **实时协同与底层数据模型**：OT 算法权衡、关系型多维表格原子操作设计、双栈计算器。
2. **现代 AI 与流式文本渲染**：Markdown 缺失字符自动补齐、SSE 流式打字机效果防闪烁。
3. **微观渲染性能与 TypeScript 功底**：强制同步重排原理、泛型约束与递归类型体操。

---

## 备考建议

1. **白板手写双栈计算器与 flatten**：做到在不借助 IDE 自动补全的情况下思路清晰、代码严密。
2. **掌握大模型流式接入工程化**：思考 SSE、Fetch Reader 接收与 Markdown 动态解析补全的方案。
3. **打磨英文技术面试**：在外企面试中，能自信流畅地用英文进行 3-5 分钟技术自我介绍与项目难点概括。

