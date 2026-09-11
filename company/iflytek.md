# 科大讯飞✅

- **业务领域**: 智能语音交互、认知大模型（讯飞星火）、智慧教育、智慧医疗、智能汽车座舱
- **技术栈**: Vue 3、React、TypeScript、Node.js、WebAssembly（音频编解码）、WebSocket（流式语音传输）
- **团队规模**: 前端团队约800+人
- **办公地点**: 合肥（总部）、北京、上海、广州、深圳、武汉、成都
- **公司性质**: 人工智能领军上市公司 / 科技国家队
- **薪资水平**: 校招16-30万，社招22-55万

## 岗位类型

- **大模型应用前端工程师** - 负责讯飞星火 Web 端、桌面端客户端、智能体开发平台交互研发
- **音视频与跨端前端工程师** - 负责 Web 端实时录音、流式语音转写（ASR）、TTS 语音合成与混合跨端容器
- **智慧教育/智慧医疗 Web 工程师** - 负责智慧黑板、教育考试系统、医疗电子病历中后台研发

## 技术特色

- **Web 实时语音处理与 WebAssembly 编解码**: 结合 Web Audio API 获取麦克风音频流，利用 WebAssembly 将 PCM 实时压缩为 Opus/Speex 格式通过 WebSocket 上传。
- **大模型长文本流式排版渲染**: 针对星火大模型 Markdown、数学公式（LaTeX/KaTeX）、代码语法高亮与思维导图进行渐进式平滑流渲染。
- **成熟完备的 JSBridge 跨端基建**: 沉淀深度的 iOS 与 Android 双端 Native 与 Web 容器双向通信桥接方案。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **在线笔试（专业选择题 + 编程题）** → **技术一面** → **技术二面（综合业务面）** → **HR面试**
   - 总流程约3-4周
   - 难度: 3.5/5星
   - 通过率: 约15%

### 社会招聘

1. **简历筛选/电话初筛** → **技术一面（基础功底与工程实践）** → **技术二面（业务架构与音视频项目）** → **部门总监面** → **HR面试**
   - 总流程约2周
   - 难度: 4/5星
   - 通过率: 约15%

## 题库

### P0 必考知识点

#### JSBridge 混合应用通信原理及 iOS / Android 平台差异？ {#p0-jsbridge-principle}

<Answer>

### 核心结论

JSBridge 是 Hybrid 混合应用中连接 Web 视图（WebView）与原生 Native（iOS/Android）的双向通信通道。主要分为**Native 调用 JavaScript** 与 **JavaScript 调用 Native** 两个方向。

---

### 通信原理与平台差异

1. **Native 调用 JavaScript**：
   - 本质均是在 WebView 环境中动态执行一段 JS 脚本字符串：
     - **Android**：4.4+ 使用 `webView.evaluateJavascript(script, callback)`。
     - **iOS**：现代 WKWebView 使用 `[wkWebView evaluateJavaScript:script completionHandler:...]`。
2. **JavaScript 调用 Native（两大主流机制）**：
   - **机制一：全局注入对象（首选，现代标配）**
     - **Android**：原生通过 `addJavascriptInterface` 注入对象，JS 直接同步/异步调用 `window.androidBridge.postMessage(json)`。
     - **iOS**：WKWebView 原生支持 `WKScriptMessageHandler`，JS 通过 `window.webkit.messageHandlers[handlerName].postMessage(data)` 异步通信。
   - **机制二：URL Scheme 拦截（传统兼容方案）**
     - JS 动态创建透明 `<iframe>` 发起自定义伪协议请求（如 `mybridge://invoke?action=getLocation&cbId=123`）。
     - 原生容器通过 `shouldOverrideUrlLoading` (Android) 或 `decidePolicyForNavigationAction` (iOS) 拦截协议头并解析参数。
3. **回调匹配（Callback ID 机制）**：
   - JS 发起异步调用时生成唯一 `callbackId` 并存入全局回调映射表 `window._bridgeCallbacks[callbackId] = resolve`。
   - Native 执行完毕后，调用 `window._onBridgeCallback(callbackId, result)`，触发前端 Promise 状态流转。

---

### 面试官视角

考查候选人对 Hybrid 容器交互底层机制的掌握。面试官常追问：Android 早前 `addJavascriptInterface` 的反射漏洞原因、URL Scheme 传输数据长度限制（通常不超过 2KB~4KB）及为何现代优先推荐 WKScriptMessageHandler 与 evaluateJavaScript。

</Answer>

#### Axios 取消未完成网络请求的机制与实现？ {#p0-axios-cancel-token}

<Answer>

### 核心结论

Axios 早期使用基于 Promise 的 `CancelToken` API（已废弃），现代版本（v0.22.0+）全面拥抱浏览器的标准 **`AbortController` 与 `AbortSignal`**。核心原理是**在发起请求时传入 Signal，在特定场景（如组件卸载、重复提交、路由切换）调用 `controller.abort()` 触发底层 XHR 的 `xhr.abort()` 或 Fetch 的终止**。

---

### 规范代码实现（拦截重复请求）

```typescript
import axios from 'axios'

// 维护进行中的请求映射表：key -> AbortController
const pendingMap = new Map<string, AbortController>()

function getRequestKey(config: any): string {
  return `${config.method}_${config.url}_${JSON.stringify(config.params)}_${JSON.stringify(config.data)}`
}

const service = axios.create({ baseURL: '/api' })

// 1. 请求拦截器：发现重复请求则先取消前一个
service.interceptors.request.use((config) => {
  const requestKey = getRequestKey(config)
  if (pendingMap.has(requestKey)) {
    const existingController = pendingMap.get(requestKey)!
    existingController.abort('Cancel repeated request')
    pendingMap.delete(requestKey)
  }

  const controller = new AbortController()
  config.signal = controller.signal
  pendingMap.set(requestKey, controller)
  return config
})

// 2. 响应拦截器：请求完成后移除映射
service.interceptors.response.use(
  (response) => {
    const requestKey = getRequestKey(response.config)
    pendingMap.delete(requestKey)
    return response.data
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.warn('Request canceled:', error.message)
    }
    return Promise.reject(error)
  }
)
```

---

### 面试官视角

考查候选人在网络层的高可用工程素养，是否能处理**快速连击防重**、**路由跳转取消上一页面残留挂死请求**以及组件销毁时的资源释放。

</Answer>

### P1 高频知识点

#### CSS 实现小于 12px 字体渲染的解决方案与高清屏适配？ {#p1-css-sub-12px}

<Answer>

### 核心结论

Chrome 等基于 Chromium 内核的中文版浏览器出于可读性考虑，默认限制最小字体为 `12px`。若需渲染 10px、9px 等小号字体，最主流且兼容性最佳的方案是利用 **`transform: scale(...)` 缩小视觉尺寸**，并结合 `transform-origin` 矫正对齐位置。

---

### 规范代码方案

```css
.sub-12px-text {
  font-size: 12px;
  display: inline-block; /* transform 对 inline 行内元素无效，需转为 inline-block 或 block */
  transform: scale(0.833); /* 10px / 12px ≈ 0.833 */
  transform-origin: left center; /* 根据布局对齐需求设置缩放基准点 */
}
```

### SVG 矢量矢量文字备用方案

在图标旁微型徽标（Badge）场景中，亦可使用 SVG `<text>` 元素：
```html
<svg width="20" height="20" viewBox="0 0 20 20">
  <text x="0" y="10" font-size="10" fill="#333">9+</text>
</svg>
```

---

### 延伸阅读

- [MDN AbortController 官方文档](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController)
- [WebKit WKWebView 混合开发技术指南](https://developer.apple.com/documentation/webkit/wkwebview)

</Answer>

## 考察重点速览

- **必考知识点**: JSBridge 原生跨端通信机制、Axios/Fetch 拦截与请求取消、CSS 响应式布局与移动端高清适配、WebSocket 长连接通信。
- **高频面试题**: 原生 JS 与 Native 双向通信、Axios cancel 取消原理、小于 12px 字体实现、Web 打包构建流程与 Rollup 特点。
- **编程挑战**: 实现请求防重并发拦截器、手写简易 JSBridge 桥接器、响应式视口 REM/VW 转换。

## 备考建议

**针对性准备策略**
- **结合智能语音与大模型业务背景**: 讯飞在语音和认知大模型处于领头羊地位，面试中多结合音频处理、流式文本渲染、Markdown/LaTeX 排版展现适配能力。
- **注重跨端与工程构建底层**: 深入复习 Webpack 与 Rollup 构建流转、Loader/Plugin 机制与 Hybrid 跨端通信。

**推荐准备资源**
- [科大讯飞开放平台官方文档](https://www.xfyun.cn/doc/)
- [讯飞星火认知大模型官网](https://xinghuo.xfyun.cn/)

**差异化准备建议**
- **校招生**: 掌握计算机网络、Web 基础规范、CSS 布局及算法。
- **社招生**: 突出 Hybrid App 架构设计能力、前端构建工程化深度及多媒体流式交互实战经验。


