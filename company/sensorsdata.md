# 神策数据✅

- **业务领域**: 大数据用户行为分析、神策分析云（Sensors Analytics）、标签画像、智能运营与推荐平台
- **技术栈**: React、Vue 3、TypeScript、ECharts、D3.js、Web/小程序采集 SDK、Node.js、Canvas
- **团队规模**: 前端与数据可视化团队约150+人
- **办公地点**: 北京（总部）、上海、深圳、合肥、武汉、成都
- **公司性质**: 大数据与企业级软件科技公司（独角兽）
- **薪资水平**: 校招18-32万，社招25-60万

## 岗位类型

- **数据分析平台前端工程师** - 负责神策分析、智能看板、漏斗分析、留存分析等核心可视化报表系统
- **数据采集 SDK 研发工程师** - 负责 Web、H5、小程序、App 等多端数据采集埋点 SDK 核心研发
- **前端可视化架构师** - 负责自研高性能透视表、关系拓扑图谱及大规模低代码大屏搭建引擎

## 技术特色

- **无侵入式全埋点（Auto-Track）机制**: 深度拦截全局 DOM 点击事件、History/Hash 路由变动、页面生命周期，智能提取唯一元素路径（Element Path）。
- **极速与低侵入的 SDK 运行环境**: SDK 严密控制体积（小于 30KB），异步不阻塞主业务，采用 `navigator.sendBeacon` 与本地队列防丢机制。
- **超大数据量多维透视表与图表联动**: 攻坚数十万行交叉多维报表的前端虚拟平铺渲染与千万级点线图 Canvas 降采样展示。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **线上笔试（算法与数据结构）** → **技术一面** → **技术二面** → **HR面试**
   - 总流程约3-4周
   - 难度: 4/5星
   - 通过率: 约12%

### 社会招聘

1. **简历筛选/电话初筛（腾讯文档在线手写）** → **技术一面（代码功底与数据结构）** → **技术二面（数据平台业务架构与可视化实战）** → **技术三面/VP面** → **HR面试**
   - 总流程约2周
   - 难度: 4/5星
   - 通过率: 约15%

## 题库

### P0 必考知识点

#### 手写原生 DOM 表格日期与数值字段动态点击排序（正序/倒序切换）？ {#p0-table-dom-sort}

<Answer>

### 核心结论

前端表格排序的核心在于：**解析提取行（`<tr>`）对应列的内容并规范化（去除中文年月日格式与千分位逗号），利用 `Array.prototype.sort()` 排序后，将排好序的 DOM 节点依次 `appendChild` 重新挂载至 `<tbody>`**。利用 DOM 的“同一节点被追加到新位置会自动从原位置移走”的特性，无需手动删除原节点。

---

### 规范手写实现

```javascript
function initTableSort(tableId = 'data') {
  const table = document.getElementById(tableId)
  if (!table) return

  const dateTh = table.querySelector('th.date')
  const tbody = table.querySelector('tbody')
  let isAsc = true

  // 解析日期字符串为时间戳，如 "2017年10月23日" -> timestamp
  function parseDate(str) {
    const matched = str.match(/(\d{4})年(\d{1,2})月(\d{1,2})日/)
    if (!matched) return 0
    return new Date(matched[1], matched[2] - 1, matched[3]).getTime()
  }

  dateTh.addEventListener('click', () => {
    // 1. 获取所有表格数据行
    const rows = Array.from(tbody.querySelectorAll('tr'))

    // 2. 按日期列进行时间戳比较排序
    rows.sort((rowA, rowB) => {
      const dateA = parseDate(rowA.cells[0].textContent.trim())
      const dateB = parseDate(rowB.cells[0].textContent.trim())
      return isAsc ? dateA - dateB : dateB - dateA
    })

    // 3. 将排好序的节点重新挂载至 tbody 中
    const fragment = document.createDocumentFragment()
    rows.forEach(row => fragment.appendChild(row))
    tbody.appendChild(fragment)

    // 4. 翻转正序/倒序状态
    isAsc = !isAsc
  })
}
```

---

### 面试官视角

神策数据电话笔试原题。考查候选人的原生 DOM 操作功底、文档片段（`DocumentFragment`）性能意识、正则数据提取与状态维护闭环能力。

</Answer>

#### 神策 Web JS SDK 全埋点（Auto-Track）事件采集与防丢失机制？ {#p0-sensors-auto-track}

<Answer>

### 核心结论

神策全埋点（Web Click、Pageview、Web Stay）的核心是**利用事件委托全局捕获用户交互、劫持浏览器路由 API，结合 `navigator.sendBeacon` 与本地缓存队列解决页面跳出时请求中断丢失**。

---

### 核心技术架构

1. **点击全埋点事件捕获**：
   - 监听全局根节点：`document.addEventListener('click', handler, true)`（捕获阶段，防止业务阻止冒泡）。
   - 提取被点击元素的结构路径，如 `div#app > div.main > button.submit-btn`，并提取 `data-*` 业务自定义属性。
2. **页面浏览（PV/UV）与 SPA 路由劫持**：
   - 拦截 `history.pushState` 与 `history.replaceState` 原型方法，同时监听 `popstate` 和 `hashchange`，在路由变动时自动触发 `$pageview`。
3. **数据可靠上报与页面跳转防丢**：
   - **`navigator.sendBeacon(url, data)`**：浏览器保证在页面销毁卸载时依然在后台异步安全送达，不占用网络线程。
   - **内存队列 + LocalStorage 兜底**：SDK 维护内存发送队列；若网络离线或接口异常，将待发送事件转存至 LocalStorage，等待恢复后重试。

---

### 面试官视角

面试官考察候选人对数据埋点治理体系的理解：如何保证 SDK 本身零崩溃（严格全局 try-catch）、如何对敏感数据（密码/身份证）做脱敏剪裁，以及全埋点在复杂组件化 DOM 树中的路径稳定性。

</Answer>

### P1 高频知识点

#### 大数据多维透视表（Pivot Table）前端性能与虚拟滚动设计？ {#p1-pivot-table-virtual-render}

<Answer>

### 核心结论

面对神策报表中上百列、上万行的多维透视数据，传统 DOM 渲染会产生数百万个单元格（`<td>`），导致 DOM 树庞大内存溢出。标准方案是**二维虚拟滚动（Virtual Grid）+ 行列冻结（Sticky/Dual Table）+ Web Worker 数据聚合计算**。

---

### 核心架构

1. **二维网格虚拟化**：
   - 不仅按垂直方向虚拟化（按当前 `scrollTop` 计算可视行范围 `[startRow, endRow]`）；
   - 同时在水平方向虚拟化（按当前 `scrollLeft` 计算可视列范围 `[startCol, endCol]`），保证页面挂载的真实 DOM 单元格永远维持在数百个之内。
2. **多级行表头与列表头冻结**：
   - 采用多层分块容器布局，表头与数据体保持滚动联动同步，利用 `transform: translate3d()` 规避页面重排。

---

### 延伸阅读

- [神策数据官方 Web SDK 源码剖析](https://github.com/sensorsdata/sa-sdk-javascript)
- [W3C Beacon API 规范](https://w3c.github.io/beacon/)

</Answer>

## 考察重点速览

- **必考知识点**: 原生 JavaScript/DOM 操作、数据分析埋点原理与 SDK 设计、数据结构与算法、复杂数据表格与可视化（ECharts/Canvas）。
- **高频面试题**: 原生 DOM 表格排序、神策全埋点与无痕埋点实现、`navigator.sendBeacon` 特性与优势、Vuex/Redux 状态管理对比。
- **编程挑战**: 原生表格排序实现、元素路径回溯算法、手写事件总线与防抖节流。

## 备考建议

**针对性准备策略**
- **扎实巩固数据采集与可视化领域知识**: 神策数据是大数据的代表性企业，重点准备埋点 SDK、性能指标监控及数据图表渲染。
- **强化在线编程敏捷度**: 神策初面使用在线文档手写代码，重点考察编码规范、清晰命名与逻辑严密性。

**推荐准备资源**
- [神策数据官方技术博客](https://www.sensorsdata.cn/)
- [Web 埋点技术核心原理解析](https://github.com/sensorsdata/sa-sdk-javascript)

**差异化准备建议**
- **校招生**: 重视原生 JS 基础语法、算法能力与计算机网络。
- **社招生**: 深入考察企业级大数据报表系统架构、前端低代码设计及复杂 SDK 稳定性治理经验。

