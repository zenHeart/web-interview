# 人人（人人公司）✅

- **业务领域**: 社交网络（人人网）、海外房产交易服务平台（北美地产 CMS 与经纪人 CRM 协同系统）
- **技术栈**: Vue 3、Vue 2、Vue Router、Pinia/Vuex、TypeScript、Webpack/Vite、Node.js
- **团队规模**: 前端研发团队约80人
- **办公地点**: 北京（朝阳总部）、武汉
- **公司性质**: 互联网上市公司（美股上市）
- **薪资水平**: 校招15-26万，社招18-42万

## 岗位类型

- **Vue 前端开发工程师** - 负责面向北美终端用户的房产检索 CMS 门户与移动响应式页面研发
- **中后台全栈开发工程师** - 负责房产经纪人 CRM 作业系统、房源合同流转与数据看板研发
- **前端组件库与工程化工程师** - 负责企业级通用复杂表格/表单物料库与微前端框架建设

## 技术特色

- **复杂表单与动态表头表格深度抽象**: 针对海外房源多维度属性，深度运用 Vue 作用域插槽（Scoped Slots）与动态行列配置实现高性能表格。
- **跨时区与国际化多币种结算体系**: 完善处理海外房产货币单位、度量衡（平方英尺/平方米）与本地化时区防抖转换。
- **高频响应式状态批处理优化**: 深入探索 Vue 异步更新批处理队列、微任务 `nextTick` 与多级过滤组件的状态解耦。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **在线笔试（JS/CSS/算法）** → **技术一面** → **技术二面** → **HR面试**
   - 总流程约2-3周
   - 难度: 3/5星
   - 通过率: 约18%

### 社会招聘

1. **简历筛选** → **线下/线上笔试（核心算法与手写题）** → **技术一面（基础语言追问与 CSS 布局）** → **技术二面（Vue 框架底层与组件设计）** → **技术三面（算法与系统架构）** → **HR面试**
   - 总流程约2周
   - 难度: 4/5星
   - 通过率: 约15%

## 题库

### P0 必考知识点

#### 函数柯里化与隐式类型转换：实现无限链式调用累加器 `add(2)(3)(4) == 9`？ {#p0-curry-infinite-add}

<Answer>

### 核心结论

满足 `add(2)(3) == 5`、`add(2) + 3 == 5` 且支持无限链式调用的核心在于：**函数闭包持续保存所有历史入参，并重写该函数的 `Symbol.toPrimitive` 或 `valueOf` 与 `toString` 原型方法**，使函数在参与相等比较（`==`）或算术运算（`+`）时自动触发隐式转换，返回累加计算值。

---

### 规范代码实现

```javascript
function add(...args) {
  // 1. 内部递归收集所有参数
  const fn = function (...innerArgs) {
    return add(...args, ...innerArgs)
  }

  // 2. 计算当前所有参数的和
  const sum = args.reduce((acc, curr) => acc + curr, 0)

  // 3. 拦截隐式类型转换（现代标准优先 Symbol.toPrimitive）
  fn[Symbol.toPrimitive] = function (hint) {
    return sum
  }

  // 兼容传统运行时的 valueOf 与 toString
  fn.valueOf = function () {
    return sum
  }
  fn.toString = function () {
    return sum
  }

  return fn
}

// 测试用例
console.log(add(2)(3) == 5)        // true
console.log(add(2) + 3 == 5)        // true
console.log(add(2)(3)(4) == 9)      // true
console.log(add(1)(2)(3)(4)(5) == 15) // true
```

---

### 面试官视角

面试官考察候选人对 JavaScript 函数式编程（Currying）、闭包记忆性以及 ECMAScript 对象到原始值转换协议（ToPrimitive 内部运算）的深层掌握。

</Answer>

#### Vue 中 `vm.data` 被频繁修改为何不会导致视图多次重绘？`nextTick` 底层机制是什么？ {#p0-vue-nexttick-mechanism}

<Answer>

### 核心结论

若响应式数据每改变一次就立即同步执行 DOM Diff 和更新，若同一事件循环中修改 1000 次数据，就会触发 1000 次 DOM 重排重绘，造成极严重的性能浪费。
Vue 内部采用了**异步批处理更新队列机制（Async Batch Queue）**：响应式 setter 触发时，Watcher 不会立即更新，而是被塞入全局去重队列，利用微任务（`Promise.resolve().then()`）将所有 DOM 更新合并在当前宏任务结束前统一批量执行。

---

### 工作原理流转

1. **Watcher 去重与缓存**：
   - 依赖收集触发 `watcher.update()`，内部调用 `queueWatcher(this)`。
   - 队列内部维护 `has[id]` 哈希表，同一 Tick 内无论修改多少次同一 Watcher，仅会向队列塞入一次。
2. **异步刷新通道降级决策**：
   - `nextTick(cb)` 负责将更新任务注入到异步微任务队列中。
   - 调度降级链：`Promise.then`（首选微任务） → `MutationObserver` → `setImmediate`（IE/Node） → `setTimeout(..., 0)`（宏任务兜底）。
3. **`nextTick` 读取时机**：
   - 开发者在修改数据后立即调用 `nextTick(callback)`，该回调会被排在 Watcher 刷新 DOM 的任务之后。因此，在 `nextTick` 回调内部保证能够安全获取到渲染后的最新 DOM。

---

### 面试官视角

考查候选人对 Vue 响应式核心更新流程的全局认知，以及浏览器 Event Loop 中宏任务（MacroTask）、微任务（MicroTask）与渲染管道（Rendering Phase）先后执行时序的理解。

</Answer>

### P1 高频知识点

#### Flex 布局实现：左侧固定 50px，中间与右侧自适应 1:2 分配且具备最小宽度限制？ {#p1-flex-layout-min-width}

<Answer>

### 核心结论

利用 CSS Flex 弹性盒的 `flex-grow`、`flex-shrink`、`flex-basis` 复合属性配合 `min-width` 限制，可精准控制网格比例与边界防御。

---

### 规范 CSS 布局代码

```html
<div class="container">
  <div class="left">Left</div>
  <div class="middle">Middle</div>
  <div class="right">Right</div>
</div>

<style>
.container {
  display: flex;
  width: 100%;
}

.left {
  /* 固定宽度 50px：不可拉伸，不可压缩，基础基准值 50px */
  flex: 0 0 50px;
}

.middle {
  /* 弹性比例 1：基准为 0，按 1 份瓜分剩余空间，最小宽度 50px */
  flex: 1 1 0;
  min-width: 50px;
}

.right {
  /* 弹性比例 2：基准为 0，按 2 份瓜分剩余空间，最小宽度 100px */
  flex: 2 1 0;
  min-width: 100px;
}
</style>
```

---

### 延伸阅读

- [Vue 官方文档：深入响应式原理与异步更新队列](https://vuejs.org/)
- [CSS Flexible Box Layout 规范](https://www.w3.org/TR/css-flexbox-1/)

</Answer>

## 考察重点速览

- **必考知识点**: JavaScript 柯里化与隐式转换、Vue 响应式与 `nextTick` 批处理、Flex/Grid 现代布局、深浅拷贝与原型链。
- **高频面试题**: 无限柯里化 add 实现、Vue 异步渲染队列原理、Flex 动态比例与最小宽度限制、前端缓存函数 `memoize`。
- **编程挑战**: 数组去重与排序、数组扁平化 flat 实现、手写深克隆（处理循环引用）、实现表格动态列插槽。

## 备考建议

**针对性准备策略**
- **深挖 Vue 源码与生命周期**: 人人公司核心采用 Vue 生态，务必通读 Vue 响应式原理、Diff 算法与组件设计模式。
- **扎实手写函数式与算法题**: 人人面试包含多轮扎实的编码笔试，重点复习函数柯里化、闭包缓存、数组扁平与常见 CSS 居中/三角绘制技巧。

**推荐准备资源**
- [Vue 源码精读与原理解析](https://vuejs.org/)
- [JavaScript 深入浅出柯里化](https://github.com/mqyqingfeng/Blog)

**差异化准备建议**
- **校招生**: 掌握原生 JS/CSS 规范、常见算法手写及 Vue 常用 API。
- **社招生**: 深入考察复杂中后台/CRM 系统业务抽象、通用组件封装设计与前端性能批处理优化。

