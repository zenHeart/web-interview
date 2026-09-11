# 埃森哲✅

- **业务领域**: 跨国管理咨询、信息技术服务、企业数字化转型、全行业系统集成
- **技术栈**: Vue 3、React、Angular、TypeScript、Node.js、Webpack/Vite、微前端
- **团队规模**: 全球超70万人，大中华区技术交付团队数千人
- **办公地点**: 大连、上海、北京、广州、深圳、成都、武汉
- **公司性质**: 跨国咨询外企（Fortune Global 500）
- **薪资水平**: 校招15-25万，社招20-45万

## 岗位类型

- **前端开发工程师** - 负责国际知名企业数字化转型项目、海外电商、大型中后台系统研发
- **全栈开发工程师** - 负责 Node.js BFF 接口聚合、云原生 Serverless 部署与微服务对接
- **前端 Tech Lead / 架构师** - 负责跨国项目技术选型、架构设计、代码评审与离岸敏捷团队管理

## 技术特色

- **全球化协同与规范化敏捷交付**: 严格遵循标准敏捷（Scrum）开发模式与 CI/CD 自动化流水线，强调代码审查（PR Review）与单测覆盖率。
- **多框架生态包容性**: 咨询项目兼顾遗留系统与现代技术栈，同时服务于 Angular（企业级重型系统）、React 与 Vue 多样化生态。
- **高标准安全与多语言国际化 (i18n)**: 针对跨国企业合规要求，严格执行 GDPR 隐私保护、WCAG 无障碍访问及复杂动态多语言切换。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **在线英语与逻辑能力测评** → **专业技术面试** → **经理综合面（含英语交流）** → **HR面试**
   - 总流程约3-4周
   - 难度: 3.5/5星
   - 通过率: 约15%

### 社会招聘

1. **简历筛选** → **技术一面（基础功底与框架原理）** → **技术二面/项目经理面（项目落地与架构设计）** → **英语能力评估** → **HR面试**
   - 总流程约2-3周
   - 难度: 3.5/5星
   - 通过率: 约20%

## 题库

### P0 必考知识点

#### 观察者模式（Observer）与发布-订阅模式（Pub-Sub）的核心区别与代码实现？ {#p0-observer-vs-pubsub}

<Answer>

### 核心结论

两者都用于解耦对象间的一对多依赖关系，但**耦合度与消息调度机制不同**：
- **观察者模式**：Subject（目标）和 Observer（观察者）直接相互引用，Observer 注册在 Subject 内部，调度由 Subject 直接驱动，属于**松耦合（Loose Coupling）**。
- **发布-订阅模式**：发布者（Publisher）与订阅者（Subscriber）互不知晓对方存在，全部依赖独立的**事件通道/事件调度中心（Event Channel / Event Bus）**进行事件派发，属于**完全解耦（Decoupled）**。

---

### 规范手写发布-订阅模式（EventEmitter）

```javascript
class EventEmitter {
  constructor() {
    this.events = Object.create(null)
  }

  on(eventName, listener) {
    if (typeof listener !== 'function') throw new TypeError('Listener must be a function')
    if (!this.events[eventName]) this.events[eventName] = []
    this.events[eventName].push(listener)
    return this
  }

  emit(eventName, ...args) {
    if (!this.events[eventName]) return false
    const listeners = [...this.events[eventName]]
    listeners.forEach(fn => fn.apply(this, args))
    return true
  }

  off(eventName, listener) {
    if (!this.events[eventName]) return this
    if (!listener) {
      delete this.events[eventName]
    } else {
      this.events[eventName] = this.events[eventName].filter(fn => fn !== listener && fn.originalListener !== listener)
    }
    return this
  }

  once(eventName, listener) {
    const wrapper = (...args) => {
      this.off(eventName, wrapper)
      listener.apply(this, args)
    }
    wrapper.originalListener = listener
    this.on(eventName, wrapper)
    return this
  }
}
```

---

### 面试官视角

面试官考察候选人对面向对象设计原则的掌握，重点追问 `once` 的包装与解绑技巧，以及在真实框架（Vue 响应式 vs DOM CustomEvent）中的具体映射。

</Answer>

#### 复杂可视化组件设计：画布拖拽、组件联动与实时预览设计方案？ {#p0-lowcode-drag-canvas}

<Answer>

### 核心结论

可视化拖拽低代码平台的核心在于**Schema 数据驱动视图**。通过将画布状态抽象为一个标准化 JSON 数据树（包含组件类型、ID、定位布局属性、属性配置与事件交互配置），实现**左侧物料拖入 → 中央画布渲染 → 右侧属性修改联动 → JSON Schema 导出与预览渲染**。

---

### 关键设计架构

1. **物料区与画布拖拽交互**：
   - 采用 HTML5 Drag and Drop API 或鼠标指针事件（`pointerdown`/`pointermove`/`pointerup`）。
   - 物料节点携带组件元数据 `dragStart({ type: 'Button', defaultProps: {...} })`。
   - 画布容器监听 `dragover`（阻止默认行为）与 `drop`，计算落点相对于画布的相对坐标 `(x, y)`，生成唯一 `uuid` 并插入到页面组件列表中。
2. **状态统一管理与撤销重做（Undo/Redo）**：
   - 使用 Pinia/Redux 维护全局画布状态。
   - 维护快照历史堆栈（`snapshotStack`）与指针索引，在每一步拖拽放置或属性修改时推入深拷贝快照，实现一键撤销与重做。
3. **属性面板与动态组件联动**：
   - 选中某个组件时，右侧属性面板根据组件 Schema 动态渲染表单输入控件（ColorPicker、Input、Select）。
   - 修改属性直接双向绑定更新该组件的 `props` 对象，中央画布响应式同步刷新。

---

### 延伸阅读

- [HTML5 Drag and Drop API 官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API)
- [低代码平台架构与 JSON Schema 实践](https://github.com/alibaba/lowcode-engine)

</Answer>

## 考察重点速览

- **必考知识点**: JavaScript 原生基础（闭包、原型链、隐式类型转换）、经典设计模式（观察者、单例、策略）、常见 CSS 布局。
- **高频面试题**: 敏捷开发流程理解、发布-订阅模式实现、低代码画布设计、Vue 双向绑定与 Angular 脏检查机制对比。
- **编程挑战**: 手写 EventEmitter、数组去重与快速排序、类型转换输出分析。

## 备考建议

**针对性准备策略**
- **展现良好英语沟通与表达逻辑**: 咨询外企非常注重邮件书写、口语沟通和规范敏捷工作习惯。
- **强调工程规范与交付意识**: 面试中多阐述编写单元测试、CI 规范、代码 Review 与客户沟通技巧。

**推荐准备资源**
- [埃森哲技术展望官方报告](https://www.accenture.com/)
- [JavaScript 设计模式与开发实践](https://book.douban.com/subject/26382780/)

**差异化准备建议**
- **校招生**: 扎实掌握英语能力、计算机基础与学习自驱力。
- **社招生**: 突出大型交付项目把控能力、跨国团队沟通与端到端敏捷落地经验。

