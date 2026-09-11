# 江西志豪新材料（武汉研发中心）✅

- **业务领域**: 新材料研发与制造、产业数字化办公协同、供应链 ERP、企业微信生态中台
- **技术栈**: Vue 3、TypeScript、微信小程序、React、Node.js、Webpack/Vite
- **团队规模**: 武汉数字化研发中心约30人
- **办公地点**: 武汉市洪山区光谷新发展国际中心 A 座 25 楼
- **公司性质**: 高新技术民营制造企业 / 产业数字化中心
- **薪资水平**: 校招12-18万，社招20-35万（月薪约 18-25K）

## 岗位类型

- **高级前端开发工程师** - 主导大型 Vue 3 + TypeScript 供应链后台与微信小程序架构设计，负责跨端技术选型与团队带教
- **小程序与 Web 前端工程师** - 负责生产制造物料流转小程序、移动端 H5 及运营系统研发
- **全栈开发工程师** - 负责企业微信内部应用打通、单点登录 SSO、数据中台接口与自动化部署

## 技术特色

- **企业微信与小程序深度生态集成**: 深度对接企微开放平台，攻坚移动端审批流、消息卡片推送与生产扫码报工。
- **跨端架构与 TypeScript 强类型约束**: 小程序与 Web 端共享通用数据模型与枚举类型，基于 TypeScript 杜绝隐式类型缺陷。
- **制造大屏与移动端高帧率动画优化**: 针对产线物联网看板，运用 CSS3 硬件加速、`requestAnimationFrame` 与虚拟列表攻坚性能。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **专业笔试（Vue 3 + JS 基础）** → **技术面试1-2轮** → **HR面试**
   - 总流程约2-3周
   - 难度: 3/5星
   - 通过率: 约20%

### 社会招聘

1. **简历筛选** → **技术一面（Vue 3 核心机制与小程序性能调优）** → **技术二面/技术负责人面（架构设计与跨端方案）** → **综合HR面试**
   - 总流程约1-2周
   - 难度: 3.5/5星
   - 通过率: 约15%

## 题库

### P0 必考知识点

#### 微信小程序中复杂交互与动效如何进行 60FPS 极致性能优化？ {#p0-miniprogram-animation-perf}

<Answer>

### 核心结论

小程序传统的 JS 驱动动画因逻辑层与视图层双线程频繁通信，极易发生掉帧卡顿。优化动效的核心原则是**“尽可能在渲染层（WebView）内部闭环执行”**，首选**纯 CSS3 动画/硬件加速**，复杂手势跟随采用**WXS 响应事件（WXS Event）**或**官方 `wx.createAnimation` 批量导出一帧**。

---

### 核心优化实践

1. **启用 CSS3 动画并开启 GPU 硬件加速**：
   - 动画属性仅使用 `transform`（平移、缩放、旋转）与 `opacity`，这两个属性直接在 GPU 合成线程（Compositor Thread）处理，不会触发 Layout（重排）和 Paint（重绘）。
   - 添加 `will-change: transform;` 告知浏览器提前分配独立图层。
2. **WXS 视图层脚本拦截手势**：
   - 在拖拽滑动等连续手势动效中，严禁用 JS 监听 `touchmove` 并调用 `setData`（必然延迟卡死）。
   - 改用 WXS 直接在视图层监听手势，直接操作原生 DOM 节点的样式 `ins.setStyle({ transform: ... })`，零线程通信延迟。
3. **分层渲染与 Canvas 离屏动画**：
   - 极为复杂的产线工艺流程图或粒子动效，统一交由小程序的 2D Canvas 绘制，避免上百个 `<view>` 节点重排。

---

### 面试官视角

面试官考察候选人对小程序双线程机制的本质认识，以及是否掌握 WXS 事件响应机制，能否根据业务场景权衡 CSS、WXS 与 Canvas。

</Answer>

#### 企业微信生态单点登录（SSO）与第三方授权认证流程？ {#p0-wecom-sso-oauth}

<Answer>

### 核心结论

在企业数字化系统中，实现免登的核心是基于 **OAuth 2.0 授权码模式**。流程核心是：**前端构造企微 OAuth2 链接重定向 → 用户静默授权携带 `code` 回跳 → 后端通过 `code + secret` 换取 `userId` 与 `access_token` 并下发系统自定义 JWT**。

---

### 授权流转步骤

1. **构造授权重定向**：
   ```http
   https://open.weixin.qq.com/connect/oauth2/authorize?appid=CORPID&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_base#wechat_redirect
   ```
2. **静默获取 Code 与票据置换**：
   - 前端拦截 URL query 中的 `code` 参数，调用业务后台登录接口 `loginByWecom({ code })`。
   - 业务后端向企微服务器请求 `https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=ACCESS_TOKEN&code=CODE` 换取用户员工工号。
3. **JS-SDK 权限签名注入（wx.config / wx.agentConfig）**：
   - 获取当前页面的全路径 URL（不包含 `#` 后哈希），后端使用 `jsapi_ticket` 结合随机串与时间戳进行 SHA-1 签名，前端注入成功后方可调用扫一扫（`wx.scanQRCode`）等高级原生能力。

---

### 延伸阅读

- [企业微信开放平台开发者文档](https://developer.work.weixin.qq.com/)
- [微信小程序 WXS 事件响应规范](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxs/event.html)

</Answer>

## 考察重点速览

- **必考知识点**: Vue 3 与 TypeScript 结合最佳实践、微信小程序双线程机制与性能优化、企业微信生态鉴权与 SDK 调用。
- **高频面试题**: 小程序 60FPS 动画优化策略、企业微信 SSO 流程、虚拟滚动列表原理、动态组件封装。
- **编程挑战**: 实现虚拟列表可见区间计算、防抖节流函数封装、TypeScript 联合类型与高级类型推导。

## 备考建议

**针对性准备策略**
- **突出中后台与微信生态全栈工程落地**: 面试中重点准备基于 Vue 3 + TypeScript 的企业级后台系统治理、企业微信/小程序扫码报工与流程审批实战经验。
- **注重代码质量与自测意识**: 强调规范编码风格、类型防空判断与生产异常兜底方案。

**推荐准备资源**
- [Vue 3 官方文档](https://vuejs.org/)
- [微信小程序官方开发指南](https://developers.weixin.qq.com/)

**差异化准备建议**
- **校招生**: 掌握 Vue 基础语法、TypeScript 类型注解及小程序开发基础。
- **社招生**: 突出中大型制造/企服系统架构设计能力、企业数字化转型经验及端到端独立负责能力。

