# 千言千语（武汉研发中心）✅

## 基本信息

- **业务领域**: 海外泛娱乐社交平台、语音房多人互动、UCOO 社交应用、跨端混合研发
- **技术栈**: Vue3 / TypeScript / Uni-app / Flutter / H5 / WebSockets / WebRTC / PostCSS
- **团队规模**: 100-300 人（核心出海研发团队）
- **办公地点**: 武汉市东湖高新区光谷软件园 / 光谷金融港
- **公司性质**: 互联网出海高新技术企业
- **薪资水平**: 资深前端 18k-30k * 14-16薪

---

## 岗位类型

- **资深前端工程师 (Web/跨端)**: 负责 UCOO 核心 H5 运营活动、语音房礼物动效、公会商城与充值交易链路开发。
- **混合跨端开发工程师 (Hybrid/Uni-app)**: 负责原生客户端内嵌 Web 容器深度调优、JSBridge 双向通信桥接与端侧安全区适配。
- **WebRTC 音视频前端研发**: 负责多人实时语音连麦信令交互、网络抗抖动与音视频状态监控看板。

---

## 技术特色

1. **复杂移动多机型异形屏适配体系**：
   - 深入覆盖 iOS 与 Android 各类刘海屏、水滴屏、折叠屏及物理打孔屏，通过 CSS 原生安全区环境变量与原生客户端状态栏高度注入实现像素级无缝占位。
2. **轻量级动态指令与组件库扩展**：
   - 团队基于 Vue 3 底层指令 API 自研轻量级动画、点击防抖、动态加载（`v-loading`）与埋点上报指令，保证包体积最小化。
3. **出海弱网高性能与流式交互**：
   - 面向东南亚、中东等海外网络波动较大的地区，优化首屏静态资源 CDN 分发、长连接断线自动恢复与低延迟礼物动效渲染（SVGA / Lottie）。

---

## 面试流程概览

### 校招流程
1. **基础笔试/面试 (45min)**: 考察 CSS 布局（定位/盒模型/弹性盒）、JavaScript 核心与 Vue 基础。
2. **技术复试 (45min)**: 移动端 H5 开发特有问题（点击穿透、DPR 适配、安全区）与手写指令。
3. **HR 面 (30min)**: 综合素养沟通与 Offer 发放。

### 社招流程
1. **专业技术面 (60min, CTO + 客户端技术负责人同场)**:
   - CTO 侧重点：CSS 底层机制（定位、层叠上下文）、Vue3 深入原理（生命周期、KeepAlive 缓存机制、自定义指令原理）、点击穿透防护；
   - 客户端侧重点：端侧顶部状态栏适配、DPR 像素换算方案、网络请求底层 API（XHR vs Fetch vs Beacon）。
2. **HR 终面 (30min)**: 薪资福利沟通、过往出海业务背景核验。

---

## 题库

### P0 核心必考题

#### 1. 移动端 H5 在全面屏与刘海屏下的安全区域（Safe Area）适配与顶部状态栏占位方案？ {#p0-safe-area-adaptation}

<Answer>
**核心结论**：
在移动端异形屏（如 iPhone 刘海屏、灵动岛，Android 挖孔屏）中，页面顶部易被系统状态栏遮挡，底部易与系统手势横条（Home Indicator）冲突。工业级解决方案采用“**视口元标签扩展（`viewport-fit=cover`）+ CSS 环境变量（`env(safe-area-inset-*)`）+ 客户端 JSBridge 动态注入物理高度兜底**”的多层防御体系。

**原理解析与实施方案**：
1. **视口元标签声明**：
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
   ```
   - 必须显式声明 `viewport-fit=cover`，通知 Web 渲染引擎允许网页内容铺满整个屏幕物理边界，否则浏览器会默认居中并产生左右/上下白边。
2. **CSS 标准安全区域环境变量**：
   - iOS 11.2+ 支持标准函数 `env()`（早期版本为 `constant()`）：
     - `env(safe-area-inset-top)`：顶部状态栏预留安全边距。
     - `env(safe-area-inset-bottom)`：底部手势条预留安全边距。
3. **CSS 生产代码实践**：
   ```css
   /* 导航栏顶部防遮挡 */
   .nav-header {
     /* 优雅降级：先写 constant 再写 env */
     padding-top: constant(safe-area-inset-top);
     padding-top: env(safe-area-inset-top);
     background-color: #ffffff;
   }

   /* 底部操作固定栏防误触 */
   .fixed-footer {
     position: fixed;
     bottom: 0;
     left: 0;
     right: 0;
     padding-bottom: constant(safe-area-inset-bottom);
     padding-bottom: env(safe-area-inset-bottom);
   }
   ```
4. **端侧混合开发（Hybrid）兜底机制**：
   - 在某些 Android Webview 或沉浸式原生容器中，系统不会向 Web 引擎暴露 `safe-area-inset` 变量。此时原生客户端在打开 Webview 时，通过 URL Query（如 `?statusBarHeight=44`）或在 `window.nativeInfo` 中直接注入设备物理像素高度，前端通过 CSS 变量绑定：`document.documentElement.style.setProperty('--status-bar-height', h + 'px')`。

**面试官视角**：
- 考核候选人在移动端与端内 H5 开发中的工程成熟度，能否兼顾 iOS 规范与各类碎片化 Android 设备。
</Answer>

#### 2. 手写 Vue 3 自定义指令 `v-loading` 深度模拟 Element Plus 遮罩与加载动画？ {#p0-vue3-v-loading-directive}

<Answer>
**核心结论**：
Element Plus 的 `v-loading` 指令本质是在宿主 DOM 元素上通过 Vue 底层指令生命周期钩子（`mounted`、`updated`、`unmounted`），根据绑定的布尔值动态创建并挂载一个独立的 Vue Loading 遮罩组件实例，并自动为宿主元素设置相对定位（`position: relative`），将生成的 Loading DOM 节点插入为宿主的子节点。

**原理解析与手写实现**：
1. **Vue 3 指令生命周期**：
   - `mounted(el, binding)`：首次绑定且值为 true 时创建并插入 Loading 节点。
   - `updated(el, binding)`：响应式值变化时，在 true 与 false 间切换 DOM 的挂载与卸载。
   - `unmounted(el)`：宿主元素销毁时清理 Loading 实例防止内存泄漏。
2. **使用 `createVNode` 与 `render` 动态挂载组件**：

```typescript
import { createVNode, render, Directive, DirectiveBinding, Component } from 'vue';

// 简易 Loading UI 遮罩组件
const LoadingComponent: Component = {
  template: `
    <div class="custom-loading-mask">
      <div class="custom-spinner"></div>
      <p class="custom-loading-text">加载中...</p>
    </div>
  `
};

interface CustomHTMLElement extends HTMLElement {
  __loading_instance__?: {
    container: HTMLDivElement;
    originalPosition: string;
  };
}

export const vLoading: Directive<CustomHTMLElement, boolean> = {
  mounted(el: CustomHTMLElement, binding: DirectiveBinding<boolean>) {
    if (binding.value) {
      appendLoading(el);
    }
  },
  updated(el: CustomHTMLElement, binding: DirectiveBinding<boolean>) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        appendLoading(el);
      } else {
        removeLoading(el);
      }
    }
  },
  unmounted(el: CustomHTMLElement) {
    removeLoading(el);
  }
};

function appendLoading(el: CustomHTMLElement) {
  if (el.__loading_instance__) return;

  // 1. 获取宿主现有定位，若为 static 则设为 relative 便于绝对定位覆盖
  const currentPos = window.getComputedStyle(el).position;
  if (currentPos === 'static' || currentPos === '') {
    el.style.position = 'relative';
  }

  // 2. 动态创建挂载容器并编译 VNode
  const container = document.createElement('div');
  const vnode = createVNode(LoadingComponent);
  render(vnode, container);

  el.appendChild(container);

  // 3. 将引用挂载在 DOM 上便于后续检索
  el.__loading_instance__ = {
    container,
    originalPosition: currentPos
  };
}

function removeLoading(el: CustomHTMLElement) {
  const instance = el.__loading_instance__;
  if (!instance) return;

  // 卸载组件并移除 DOM
  render(null, instance.container);
  if (instance.container.parentNode === el) {
    el.removeChild(instance.container);
  }

  // 恢复宿主原定位
  if (instance.originalPosition === 'static' || instance.originalPosition === '') {
    el.style.position = instance.originalPosition;
  }
  delete el.__loading_instance__;
}
```

**面试官视角**：
- 考察点：是否掌握 Vue 3 底层 `createVNode` / `render` 手动挂载机制，对 DOM 节点与样式的生命周期治理能力。
</Answer>

---

### P1 高频必会题

#### 1. CSS 定位机制规范推演：static 相对何处、absolute 包含块确定规则？ {#p1-css-positioning-rules}

<Answer>
**核心结论**：
CSS 中 `position` 规定了元素在文档流与布局空间中的物理定位规则：
- **`static`（常规文档流）**：元素默认定位模式。**它严格相对于其父元素的常规内容盒（Normal Flow）依次排列**，不受 `top/bottom/left/right/z-index` 任何偏移属性的影响。
- **`absolute`（绝对定位）**：元素脱离常规文档流，其绝对坐标**严格相对于距离其最近的、`position` 属性值不为 `static` 的祖先元素（即包含块 Containing Block）的内容+内边距盒（Padding Box）**计算。若祖先元素全部为 `static`，则最终相对于**初始包含块（Initial Containing Block，通常对应视口 Viewport 尺寸）**进行定位。

**深度边界解析**：
- 除了非 `static` 属性外，CSS3 新增规范规定：若祖先元素的 `transform`、`perspective`、`filter` 不为 `none`，或 `contain: paint`，该祖先元素也会**被强制升格为绝对定位元素的包含块**！

**面试官视角**：
- 考察 CSS 基础规范掌握的严密性，是否清楚“包含块（Containing Block）”的官方标准概念与 CSS3 边缘特例。
</Answer>

#### 2. 移动端 300ms 延迟与“点击穿透（Click Through）”的形成原理与现代根治？ {#p1-mobile-click-through}

<Answer>
**核心结论**：
“点击穿透”是在移动端早期的双击缩放机制下，触控事件触发时序差异引发的经典 Bug。当用户轻触屏幕时，依次触发：`touchstart -> touchend -> (等待 300ms) -> click`。若在上层遮罩的 `touchend` 中将遮罩立即隐藏，300ms 后原本属于这套触控的 `click` 事件才在底层原位置被触发，如果底层恰好有 `<a>` 标签或 `<button>`，该元素会被意外点击。在现代移动端标准下，**最佳根治方案是设置 `<meta name="viewport" content="width=device-width">`**，现代移动浏览器检测到该元标签后会**直接禁用双击缩放并彻底废除 300ms 点击延迟**，从根源上杜绝穿透。

**原理解析与防范方案**：
1. **现代标准解法（完全废除 300ms 延迟）**：
   - 只要页面声明了 `<meta name="viewport" content="width=device-width">`，Chrome、Safari 等现代浏览器自动关闭双击缩放等待，`click` 事件在 `touchend` 后立即发出，不会发生遮罩已销毁而 `click` 滞后穿透的问题。
2. **业务级代码规范**：
   - 统一事件触发源：不要“上层监听 `touchstart` / `touchend`，底层监听 `click`”。统一全站均使用标准的 `click` 事件。
   - 动态延迟关闭：若必须使用触控事件隐藏遮罩，延迟 350ms（`setTimeout`）再将 DOM 节点移除，等待原生 `click` 消耗完毕。
   - CSS 禁用交互：遮罩隐藏动画期间为底层容器添加 `pointer-events: none`。

**面试官视角**：
- 考查移动端触控事件流的底层机制，是否了解现代移动 Web 标准的演进历程。
</Answer>

---

## 真实面经问题清单

### CTO 提问
1. CSS 常见的五种定位方式及应用场景（static, relative, absolute, fixed, sticky）。
2. `position: static` 相对什么进行排版。
3. `position: absolute` 选取的包含块（Containing Block）判定条件与规则。
4. Vue 3 核心生命周期（setup, onMounted, onUpdated, onUnmounted）与底层执行时序。
5. KeepAlive 的生命周期钩子（onActivated, onDeactivated）与缓存 DOM 复用机制。
6. Vue 自定义指令（Directives）的参数（el, binding, vnode）与生命周期。
7. Element Plus 的 `v-loading` 遮罩组件底层实现原理。
8. 移动端点击穿透（Click Through）发生机制与解决方案。

### 客户端负责人提问
1. 异形屏与刘海屏下不同设备顶部状态栏占位适配方案。
2. 不同物理设备像素密度（DPR）下 UI 稿高保真等比缩放方案（rem/vw）。
3. 构建工具中像素自动换算方案（`postcss-pxtorem` / `postcss-px-to-viewport`）。
4. 标准 CSS 盒模型（content-box）与怪异盒模型（border-box）的区别及计算公式。
5. 浏览器原生发起 HTTP 请求的三大核心 API（XMLHttpRequest, Fetch, navigator.sendBeacon）。

---

## 考察重点速览

1. **移动端与出海体验**：安全区（Safe Area）适配、DPR 像素自适应、弱网资源加载与防抖穿透。
2. **Vue3 底层机制**：自定义指令生命周期、动态组件挂载与 KeepAlive 缓存状态复用。
3. **CSS 规范与盒模型**：包含块判定、层叠上下文（Stacking Context）与现代弹性布局。

---

## 备考建议

1. **熟练手写 Vue 指令**：掌握 `createVNode` 与 `render` 在动态插入全局组件时的操作步骤。
2. **掌握移动端适配标准**：清楚阐述 `viewport-fit=cover` 与 `env(safe-area-inset-*)` 的规范定义。
3. **复习浏览器网络 API**：重点对比 `fetch` 与 `sendBeacon` 在页面卸载时的埋点可靠性保证。

