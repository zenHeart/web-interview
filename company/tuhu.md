# 途虎养车✅

- **业务领域**: 汽车后市场服务电商、轮胎与机油保养、全国工场店智慧作业系统、供应链物流中台
- **技术栈**: Vue 3、React、TypeScript、Node.js、Taro/微信小程序、微前端（Qiankun）、Sass/Tailwind
- **团队规模**: 前端研发团队约200+人
- **办公地点**: 上海（闵行总部）、武汉（光谷研发中心）
- **公司性质**: 汽车后市场互联网上市公司（港交所上市）
- **薪资水平**: 校招16-28万，社招20-50万

## 岗位类型

- **C 端大前端开发工程师** - 负责途虎养车 App、微信/支付宝小程序、营销大促活动页研发
- **工场店数字化中后台工程师** - 负责全国万家门店技师平板端（Pad）接车系统、工单流转与智能排班
- **全栈与供应链前端工程师** - 负责智慧仓储 WMS、物流调度大屏、Node.js BFF 接口聚合

## 技术特色

- **万级车型库高效检索与级联匹配**: 针对数万款汽车“品牌-厂商-车系-年款-排量”复杂拓扑，攻坚本地轻量化索引与秒级级联匹配。
- **工场店平板软硬件集成与弱网离线**: 结合 Native 混合容器深度集成蓝牙 OBD 诊断仪、移动 POS 刷卡机与小票打印机，并支持断网离线录单与本地暂存。
- **超大规模跨端同构与小程序包体积优化**: 基于 Taro 框架沉淀多端代码复用，深度实践分包加载、独立分包与公共组件 Tree-shaking。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **在线笔试（计算机基础 + 编程题）** → **技术一面** → **技术二面** → **HR面试**
   - 总流程约2-3周
   - 难度: 3/5星
   - 通过率: 约18%

### 社会招聘

1. **简历筛选** → **技术一面（Vue 底层原理、JS 语言功底与手写题）** → **技术二面（业务架构、项目攻坚与跨端实践）** → **技术总监面** → **HR面试**
   - 总流程约2周
   - 难度: 3.5/5星
   - 通过率: 约15%

## 题库

### P0 必考知识点

#### Vue 3 响应式系统 Proxy 相比 Vue 2 Object.defineProperty 的技术飞跃与底层机制？ {#p0-vue3-proxy-vs-defineproperty}

<Answer>

### 核心结论

Vue 2 基于 `Object.defineProperty` 拦截对象属性的 getter/setter，天生存在**无法拦截动态新增/删除属性、无法优雅原生监听数组下标变更与深度递归初始化性能开销巨大**的缺陷。
Vue 3 全面基于 ES6 `Proxy` + `Reflect`，从**语言底层元编程代理整个对象**，实现了全方位监听与懒代理性能质的飞跃。

---

### 核心优势对比推演

1. **原生支持动态增删属性与数组索引**：
   - Vue 2 中 `obj.newProp = 1` 或 `arr[0] = 9` 无法触发更新，必须使用 `Vue.set()` 或变异数组方法（`push/splice`）。
   - Vue 3 的 `Proxy` 拥有 13 种拦截 trap（包含 `get`, `set`, `deleteProperty`, `has` 等），动态增删属性天然响应。
2. **惰性懒代理（Lazy Deep Reactivity）避免初始化卡顿**：
   - Vue 2 在组件实例化时，必须递归遍历 `data` 的所有层级深层属性进行 `defineProperty` 改造，大对象极易阻塞主线程。
   - Vue 3 仅在深层属性**被真正访问读取时（getter 阶段）**，才动态将其包裹为 `reactive(res)`，首屏初始化性能提升数倍。
3. **配合 Reflect 保证 this 指向正确**：
   - 使用 `Reflect.get(target, key, receiver)` 确保 getter 内部的 `this` 永远指向外层代理对象，防止原型链继承时依赖收集丢失。

---

### 面试官视角

途虎前端核心技术栈为 Vue，面试官不仅考查语法差别，更注重追问 WeakMap（收集 target 对象的 key 映射）与 Set（收集副作用 effect 函数）构成的响应式依赖树结构（`targetMap`）。

</Answer>

#### 汽车电商万级车型库多级级联选择器（品牌-车系-年款-排量）高性能联动优化？ {#p0-car-model-cascader-perf}

<Answer>

### 核心结论

汽车全量车型库数据通常包含数万条记录（体积达 5MB~10MB JSON），若全量拉取或不当递归，会导致接口超时与浏览器白屏。核心架构是**按需异步分级加载（Lazy Cascade Loading）+ 热门车型本地离线缓存（IndexedDB）+ 拼音首字母倒排索引快速检索**。

---

### 核心架构设计

1. **按需分级异步拉取**：
   - 用户点击第一级“品牌（Brand）”时仅返回顶级几百个汽车品牌；
   - 选中品牌后，再触发请求加载该品牌旗下的“车系（Series）”，逐级懒加载，避免一次性加载巨型数据树。
2. **冷热数据分层缓存**：
   - 绝大多数用户集中在 10% 的热门车型（如大众朗逸、丰田卡罗拉）。将热门车型数据直接内联在前端本地包中；
   - 配合 Service Worker / IndexedDB 将历史检索过的车型树缓存至本地，大幅提升二次访问响应速度。
3. **虚拟长列表防卡顿**：
   - 在选择器弹窗内对每一级列表启用虚拟滚动，避免上千款车型生成过多 DOM。

---

### 面试官视角

考查候选人对特定垂直领域（汽车电商）核心复杂业务组件的数据建模、网络层按需优化及本地存储治理能力。

</Answer>

### P1 高频知识点

#### Sass/SCSS 现代化变量体系与企业级动态主题换肤方案？ {#p1-sass-theme-variables}

<Answer>

### 核心结论

传统的 Sass 变量（`$primary-color: #f60;`）在编译阶段即被固化为静态 CSS 代码，无法实现运行时无刷新动态换肤。现代企业级换肤方案是**以 CSS 原生自定义属性（CSS Variables，`var(--color-primary)`）为核心，Sass 作为预编译组织工具**。

---

### 规范方案实现

```scss
// 1. 定义主题映射变量
:root {
  --color-primary: #e60012; /* 途虎红 */
  --bg-color: #ffffff;
  --text-color: #333333;
}

[data-theme='dark'] {
  --color-primary: #ff4d4f;
  --bg-color: #1f1f1f;
  --text-color: #f5f5f5;
}

// 2. Sass 混入复用
@mixin themed() {
  color: var(--text-color);
  background-color: var(--bg-color);
}

.btn-primary {
  background-color: var(--color-primary);
}
```

切换主题时仅需执行：`document.documentElement.setAttribute('data-theme', 'dark')`，全站微秒级响应且无需重新下载样式表。

---

### 延伸阅读

- [Vue 3 Reactivity 原理全解](https://vuejs.org/)
- [CSS 自定义属性变量规范](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)

</Answer>

## 考察重点速览

- **必考知识点**: Vue 3 响应式原理与组合式 API、跨端小程序架构（Taro/微信小程序）、Sass/CSS 变量动态换肤、微前端体系。
- **高频面试题**: Vue 3 Proxy 与 Vue 2 Object.defineProperty 对比、车型级联选择器大数据优化、组件封装设计模式、Node.js 服务端应用。
- **编程挑战**: 实现简易响应式 reactive/effect 系统、树形级联数据快速查找、防抖与节流手写。

## 备考建议

**针对性准备策略**
- **熟练掌握 Vue 3 生态与小程序跨端**: 途虎技术栈高度依赖 Vue 与小程序，务必深入复习 Composition API、Pinia、Taro 以及组件按需加载。
- **突出线下工场店与电商业务结合**: 准备 1-2 个涉及软硬件联动、复杂表单状态机或供应链大屏的实战案例。

**推荐准备资源**
- [途虎技术团队公开分享](https://www.tuhu.cn/)
- [Vue 3 官方生态教程](https://cn.vuejs.org/)

**差异化准备建议**
- **校招生**: 重视前端基础语法、Vue 核心生命周期与响应式原理、CSS 布局。
- **社招生**: 突出大型跨端小程序架构性能调优、工场店数字化业务系统抽象与前端工程化治理经验。

