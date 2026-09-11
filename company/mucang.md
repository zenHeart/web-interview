# 木仓科技（驾考宝典）✅

- **业务领域**: 互联网驾考培训（驾考宝典、车友头条）、学车智能硬件、汽车后市场与出行服务
- **技术栈**: Vue 3、React、TypeScript、Node.js (SSR 服务端渲染)、多端小程序（微信/抖音/快手）、高德/腾讯地图 API
- **团队规模**: 前端团队约100人
- **办公地点**: 武汉（光谷研发总部）、北京
- **公司性质**: 互联网科技企业
- **薪资水平**: 校招14-25万，社招18-40万

## 岗位类型

- **小程序大前端开发工程师** - 负责驾考宝典微信、抖音等多平台小程序端题库答题、模拟考试、学员社区开发
- **Web SSR 与 Node 全栈工程师** - 负责驾考宝典 Web 站万级 SEO 题库页面服务端渲染、Node.js BFF 与运营中台
- **地图与车载轨迹可视化工程师** - 负责行车轨迹回放、驾校训练场高精电子围栏与考点地图开发

## 技术特色

- **海量题库极致 SEO 与高并发 SSR**: 基于 Node.js 自研轻量级模板渲染引擎，实现百万级科目一/四题库秒级直出与搜索引擎爬虫极致抓取。
- **万级 GPS 轨迹数据实时抽稀与平滑回放**: 针对 2 小时数万个经纬度离散轨迹点，采用道格拉斯-普克（DP）算法抽稀与视口空间四叉树裁剪，避免地图缩放卡死。
- **跨平台小程序性能极致压榨**: 攻坚微信小程序 1MB `setData` 传输限额与视图线程通信瓶颈，沉淀虚拟长列表与分段 patch 更新机制。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **笔试（前端基础 + 算法）** → **技术一面** → **技术二面** → **HR面试**
   - 总流程约2-3周
   - 难度: 3/5星
   - 通过率: 约18%

### 社会招聘

1. **简历筛选** → **技术一面（项目实战、难点深挖与算法）** → **技术二面（架构设计与岗位匹配度）** → **HR面试**
   - 总流程约1-2周
   - 难度: 3.5/5星
   - 通过率: 约15%

## 题库

### P0 必考知识点

#### 地图模块中 2 万个离散行车轨迹点在频繁缩放时如何保证高性能渲染不卡顿？ {#p0-map-trajectory-sampling}

<Answer>

### 核心结论

若直接向地图绘制 20,000 个原始经纬度坐标，每次缩放都会导致大量的像素投射计算与 WebGL/Canvas 图元重绘，使浏览器主线程严重掉帧甚至崩溃。标准解决方案是**视口经纬度范围裁剪（Bounding Box BBox Filter）+ 道格拉斯-普克（Douglas-Peucker）抽稀算法 + 根据地图层级（Zoom Level）分级 LOD 动态聚合**。

---

### 关键优化策略与算法步骤

1. **空间视口裁剪（BBox 过滤）**：
   - 监听地图的 `zoomend` 与 `moveend` 事件，获取当前可视矩形经纬度范围 `bounds = map.getBounds()`。
   - 仅保留落在可视区域内的点，屏幕外的点直接过滤不参与绘制。
2. **道格拉斯-普克（DP）抽稀算法**：
   - **原理**：用一条直线连接起点与终点，计算中间所有点到该直线的最大垂距 `D_max`。若 `D_max < 阈值 ε`，则舍弃中间点；若 `D_max >= ε`，则以该最大垂距点为界将折线递归分割。
   - 算法可将 20,000 个点在视觉无损的前提下压缩至 300~800 个关键控制点。
3. **基于地图缩放等级（Zoom）自适应阈值 ε**：
   - 地图视野宏观（Zoom 8~10，远距离）时，调大容差 $\epsilon$，仅渲染主干道极少折点；
   - 缩放到街区级别（Zoom 16~18，微观）时，调小容差，恢复原始转弯细节。

---

### 面试官视角

面试官考察候选人是否具备处理工业级时空地理数据的工程经验，能否联想到计算机几何经典算法（DP 算法、R 树索引），以及在不同设备算力下的降级调度策略。

</Answer>

#### 微信小程序超长答题列表无限滚动如何避免 `setData` 1MB 限制与白屏？ {#p0-miniprogram-setdata-performance}

<Answer>

### 核心结论

小程序采用双线程架构（逻辑层 JSCore 与渲染层 WebView）。`setData` 的通信是通过底层的 JSON 序列化与跨进程传输实现的。频繁传输大体积数据（超过 1MB）会导致**渲染延迟严重卡顿、内存溢出与交互失灵**。核心解决方案是**自定义二维分屏虚拟列表 + 二进制局部 Key 路径更新**。

---

### 优化实操方案

1. **二维分屏虚拟长列表（分页骨架回收）**：
   - 将上千道考题按每 20 题划分为一个“屏（Screen Block）”。
   - 仅保留当前屏幕及前后各一屏的题目处于展开 DOM 状态；距离视口较远的 Block 仅保留一个与其高度相等的占位容器 `<view style="height: {{blockHeight}}px"></view>`，释放实际子节点。
2. **局部路径更新（精准定位）**：
   - 严禁全量替换大数组 `this.setData({ questionList: newList })`。
   - 必须使用特定索引属性局部更新：
     ```javascript
     this.setData({
       [`questionList[${targetIndex}].selectedAnswer`]: 'A',
       [`questionList[${targetIndex}].status`]: 'answered'
     })
     ```
3. **滚动节流与防抖**：
   - 避免在 `onPageScroll` 中高频调用 `setData`，仅在此处记录滚动偏移行情或结合 `wx.createIntersectionObserver` 进行相交检测。

---

### 面试官视角

考查候选人对小程序底层通信机制的理解，是否能准确指出双线程数据通信成本与原生 DOM 虚拟滚动的本质差异。

</Answer>

### P1 高频知识点

#### 正则表达式精确提取富文本中 `<a>` 标签属性与文本内容？ {#p1-regex-extract-a-tag}

<Answer>

### 核心结论

在 Node.js SSR 或富文本清洗中，常需解析 HTML 链接。利用**非贪婪匹配与捕获组**可精准提取超链接 `href` 属性与标签文本。

---

### 规范实现

```javascript
function extractAnchorTags(htmlString) {
  // 匹配 <a ...href="url"...>文本</a>
  const regex = /<a\b([^>]*?)href=(['"])(.*?)\2([^>]*?)>(.*?)<\/a>/gi
  const results = []
  let match

  while ((match = regex.exec(htmlString)) !== null) {
    results.push({
      raw: match[0],
      href: match[3],
      text: match[5].replace(/<[^>]+>/g, '').trim() // 清理内部可能嵌套的 HTML 标签
    })
  }

  return results
}

// 测试
const html = '<div class="content"><a href="https://jiakaobaodian.com" target="_blank">驾考宝典<span>官网</span></a></div>'
console.log(extractAnchorTags(html))
// [{ raw: '...', href: 'https://jiakaobaodian.com', text: '驾考宝典官网' }]
```

---

### 延伸阅读

- [道格拉斯-普克折线抽稀算法详解](https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm)
- [微信小程序官方性能优化指南](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips.html)

</Answer>

## 考察重点速览

- **必考知识点**: 微信小程序底层双线程通信原理、`setData` 优化、Node.js 服务端渲染（SSR）、正则表达式。
- **高频面试题**: 万级地图轨迹点抽稀优化、小程序无限滚动与 1MB 突破、富文本 a 标签匹配提取、发布-订阅模式。
- **编程挑战**: 实现道格拉斯-普克抽稀函数、手写 EventEmitter、正则提取属性值。

## 备考建议

**针对性准备策略**
- **紧扣业务核心场景**: 准备地图 SDK 二次开发（路线绘制、坐标转换、视口判断）与海量题库刷题页性能优化方案。
- **深入小程序工程细节**: 清晰理解逻辑层与视图层通信损耗，掌握组件拆分与自定义构建打包流程。

**推荐准备资源**
- [木仓科技驾考宝典开放平台](https://www.mucang.cn/)
- [高德地图 Web JS API 官方文档](https://lbs.amap.com/api/javascript-api/summary)

**差异化准备建议**
- **校招生**: 掌握原生 JS/DOM、小程序基础、常用算法（排序/字符串/数组）与计算机网络。
- **社招生**: 突出中大型小程序性能攻坚、SSR 架构在 SEO 流量场景的应用与地图可视化经验。

