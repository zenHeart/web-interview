# 风行✅

- **业务领域**: 网络视频点播、OTT 智能大屏生态、短剧内容运营、家庭大屏文娱
- **技术栈**: Vue 3、React、TypeScript、Node.js、OTT WebApp、HLS.js、Webpack/Vite
- **团队规模**: 前端团队约100人
- **办公地点**: 北京（总部）、上海、深圳
- **公司性质**: 互联网文化传媒企业
- **薪资水平**: 校招14-22万，社招18-38万

## 岗位类型

- **OTT 大屏前端开发工程师** - 负责智能电视/机顶盒大屏 Launcher、视频播放器与遥控器焦点交互
- **Web 业务前端开发工程师** - 负责风行网 PC 门户、移动 H5 专题页及短剧分发平台研发
- **全栈开发工程师** - 负责 Node.js 中间层、视频分发数据统计及运营活动低代码配置平台

## 技术特色

- **智能电视 OTT 空间按键焦点系统**: 攻坚遥控器上下左右（D-Pad）空间导航算法、焦点移动记忆与按键响应防抖。
- **低端设备与大屏内存极限压榨**: 针对 TV 芯片算力偏弱、内存（1G/2G）受限场景，深度实施 DOM 极简复用、图片内存释放与纹理降噪。
- **多码率流媒体自适应播放**: 针对家庭 Wi-Fi 波动场景，基于 HLS.js 打造无缝切流与缓冲防卡顿体验。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **在线笔试（计算机基础 + 算法）** → **技术一面** → **技术二面** → **HR面试**
   - 总流程约2-3周
   - 难度: 3/5星
   - 通过率: 约18%

### 社会招聘

1. **简历筛选/HR初步沟通** → **技术一面（开发经验与组件设计）** → **技术二面（计算机基础、系统设计与算法）** → **HR面试**
   - 总流程约2周
   - 难度: 3.5/5星
   - 通过率: 约15%

## 题库

### P0 必考知识点

#### 如何准确获取元素距离视口顶部以及文档顶部的绝对距离？ {#p0-element-offset-top}

<Answer>

### 核心结论

- **距离视口（Viewport）顶部**：首选现代浏览器标准 API **`element.getBoundingClientRect().top`**，直接返回元素相对于当前视口上边缘的像素距离。
- **距离文档（Document）顶部**：使用 **`getBoundingClientRect().top + window.scrollY`**（或 `document.documentElement.scrollTop`），将视口相对距离与页面已滚动的垂直偏移量相加。

---

### 规范代码与兼容实现

```javascript
// 1. 获取距离视口顶部
function getOffsetToViewport(element) {
  return element.getBoundingClientRect().top
}

// 2. 获取距离整个文档 (Document) 顶部的绝对偏移
function getOffsetToDocument(element) {
  // 现代方案：视口偏移 + 页面滚动距离
  const rect = element.getBoundingClientRect()
  const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop
  return rect.top + scrollTop
}

// 传统递归 offsetTop 方案（理解原理备用）
function getOffsetToDocumentTraditional(element) {
  let actualTop = element.offsetTop
  let current = element.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  return actualTop
}
```

---

### 面试官视角

考查候选人对 DOM 盒模型尺寸与位置属性的掌握。面试官常追问：频繁在 `scroll` 事件中调用 `getBoundingClientRect()` 或 `offsetTop` 是否会触发**强制同步布局（Forced Synchronous Layout / Reflow）**？正确防范是结合 `requestAnimationFrame` 限频读写分离，或用 `IntersectionObserver` 替代滚动距离监听。

</Answer>

#### 智能大屏（OTT TV）与 Web 前端遥控器焦点导航系统如何设计？ {#p0-ott-focus-management}

<Answer>

### 核心结论

与移动端触控或 PC 鼠标点击不同，智能电视通过红外/蓝牙遥控器的**上下左右（D-Pad）按键**进行空间导航。核心架构包含**空间几何寻路算法（Spatial Navigation）、DOM 焦点拦截管理与长按键加速防抖**。

---

### 核心设计维度

1. **键盘事件拦截**：
   - 全局监听 `window.addEventListener('keydown')`，拦截遥控器键值（KeyUp=38, KeyDown=40, KeyLeft=37, KeyRight=39, Enter=13）。
2. **空间方向几何计算（Spatial Navigation）**：
   - 提取所有具备可聚焦属性（`data-focusable="true"`）的元素坐标矩形 `rect = el.getBoundingClientRect()`。
   - 当按“右”键时，在当前焦点右侧半平面过滤候选节点，计算两元素中心点欧氏距离与投射夹角加权值，选取代价最小的节点作为下一个焦点。
3. **焦点样式与按键防抖**：
   - 聚焦元素添加高亮类名 `.focused`，并执行 `transform: scale(1.08)` 放大放大动画。
   - 快速长按遥控器时触发节流，避免连续触发无效渲染造成 TV 端掉帧。

---

### 延伸阅读

- [W3C Spatial Navigation 标准草案](https://drafts.csswg.org/css-nav-1/)
- [MDN getBoundingClientRect 详解](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect)

</Answer>

## 考察重点速览

- **必考知识点**: DOM 定位与尺寸 API、强制重排重绘原理、计算机网络与 HTTP 状态码、前端组件拆分原则。
- **高频面试题**: 元素相对视口/文档距离计算、Webpack/Vite 模块热重载原理、活动页高复用组件拆分、数组去重算法。
- **编程挑战**: 数组去重与排序、深度遍历与广度遍历算法、实现空间焦点碰撞检测。

## 备考建议

**针对性准备策略**
- **扎实巩固计算机底层基础**: 风行技术二面非常注重计算机通识（进程与线程区别、操作系统内存管理、数据库索引与常用算法）。
- **结合大屏/多端特色答题**: 了解智能电视前端特点、音视频播放性能瓶颈及遥控器交互逻辑。

**推荐准备资源**
- [风行网技术团队实践](http://www.fun.tv/)
- [CSSOM 视图与滚动规范](https://www.w3.org/TR/cssom-view-1/)

**差异化准备建议**
- **校招生**: 重点复习数据结构、图论、进程线程基础及 JavaScript 语法底座。
- **社招生**: 突出中大型音视频平台性能调优、组件化架构设计与跨端工程化经验。

