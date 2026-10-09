# Web Interview 权威数据源矩阵与行业追踪标准

> 采集与对齐基准：2026-10。作为全库学科与主题差量扫描、题目架构与去伪存真的物理基准（Single Source of Truth, SSOT）。
> 遵循 `/deep-research` 信源分层金字塔：E（实证） > L0（官方规范/源码/RFC） > L1（核心维护者） > L2（GitHub 高星/真题库） > L3（广角聚合）。

---

## 一、权威信源层级（Standards & Source Repositories）

| 学科/领域 | L0 官方标准与规范委员会 | L0 官方源码核心仓库 (GitHub) | L0 官方 RFCs 与路线图 (Roadmap) | 关键追踪状态 / Baseline |
| :--- | :--- | :--- | :--- | :--- |
| **JavaScript / ECMAScript** | [TC39 Proposals](https://github.com/tc39/proposals)<br/>[ECMA-262 规范](https://tc39.es/ecma262/) | [v8/v8](https://github.com/v8/v8)<br/>[nodejs/node](https://github.com/nodejs/node) | [TC39 Finished Proposals](https://github.com/tc39/proposals/blob/main/finished-proposals.md)<br/>[TC39 Stage 3 Proposals](https://github.com/tc39/proposals/blob/main/stage-3-proposals.md) | ES2024 - ES2026<br/>AsyncContext, Temporal, ArrayBuffer.transfer |
| **HTML & DOM 原生规范** | [WHATWG HTML Living Standard](https://html.spec.whatwg.org/)<br/>[W3C Web Components](https://w3c.github.io/webcomponents/) | [whatwg/html](https://github.com/whatwg/html)<br/>[chromium/src](https://chromium.googlesource.com/chromium/src/) | [WHATWG Commits & Issues](https://github.com/whatwg/html/commits/main)<br/>[Chrome Platform Status](https://chromestatus.com/features) | Baseline Newly/Widely Available<br/>Popover API, Declarative Shadow DOM |
| **CSS 样式体系与布局** | [W3C CSS Working Group](https://drafts.csswg.org/)<br/>[W3C CSS Specifications](https://www.w3.org/Style/CSS/specs.en.html) | [w3c/csswg-drafts](https://github.com/w3c/csswg-drafts) | [CSSWG Drafts Issues](https://github.com/w3c/csswg-drafts/issues)<br/>[Chrome Status CSS](https://chromestatus.com/features#css) | Baseline 2024-2026<br/>Anchor Positioning, Container Queries, :has, View Transitions |
| **React 核心与全栈生态** | [React 官方规范指南](https://react.dev)<br/>[Next.js 官方架构文档](https://nextjs.org/docs) | [facebook/react](https://github.com/facebook/react)<br/>[vercel/next.js](https://github.com/vercel/next.js) | [reactjs/rfcs](https://github.com/reactjs/rfcs)<br/>[next.js releases & discussions](https://github.com/vercel/next.js/releases) | React 19 (Actions, use, Compiler)<br/>Next.js 15+ (App Router, PPR, Server Actions) |
| **Vue 核心与现代生态** | [Vue 3 官方文档](https://vuejs.org)<br/>[Nuxt 官方架构指南](https://nuxt.com) | [vuejs/core](https://github.com/vuejs/core)<br/>[nuxt/nuxt](https://github.com/nuxt/nuxt) | [vuejs/rfcs](https://github.com/vuejs/rfcs)<br/>[vuejs/vapor](https://github.com/vuejs/core-vapor) | Vue 3.5 (双向链表/Reactive Props)<br/>Vapor Mode 无虚拟 DOM 编译 |
| **现代响应式范式演化** | [TC39 Signals 规范提案](https://github.com/tc39/proposal-signals) | [preactjs/signals](https://github.com/preactjs/signals)<br/>[solidjs/solid](https://github.com/solidjs/solid) | [TC39 Signals Discussion](https://github.com/tc39/proposal-signals/issues)<br/>[Svelte 5 Runes RFC](https://github.com/sveltejs/svelte) | 细粒度响应式 (Fine-grained Signals)<br/>Runes 编译器宏驱动 |
| **现代构建与编译工具链** | [Webpack 5 规范文档](https://webpack.js.org)<br/>[Vite 8 官方指南](https://vite.dev) | [vitejs/vite](https://github.com/vitejs/vite)<br/>[rolldown/rolldown](https://github.com/rolldown/rolldown)<br/>[web-infra-dev/rspack](https://github.com/web-infra-dev/rspack)<br/>[biomejs/biome](https://github.com/biomejs/biome) | [module-federation/universe](https://github.com/module-federation/universe)<br/>[Vite Environment API Discussions](https://github.com/vitejs/vite/discussions) | Vite 8 + Rolldown (Rust 单引擎)<br/>Module Federation 2.0<br/>Rspack 高性能兼容器 |
| **跨端桌面与移动架构** | [Electron 官方架构规范](https://www.electronjs.org/docs)<br/>[React Native 新架构指南](https://reactnative.dev/architecture/overview) | [electron/electron](https://github.com/electron/electron)<br/>[facebook/react-native](https://github.com/facebook/react-native) | [react-native-community/discussions-and-proposals](https://github.com/react-native-community/discussions-and-proposals)<br/>[Electron Releases](https://github.com/electron/electron/releases) | Electron UtilityProcess 隔离<br/>RN Bridgeless + JSI + Fabric<br/>微信小程序 Skyline 引擎 |
| **底座算力与浏览器管线** | [W3C WebAssembly Working Group](https://www.w3.org/wasm/)<br/>[W3C WebGPU 规范](https://www.w3.org/TR/webgpu/) | [WebAssembly/spec](https://github.com/WebAssembly/spec)<br/>[gpuweb/gpuweb](https://github.com/gpuweb/gpuweb) | [Wasm GC 提案](https://github.com/WebAssembly/gc)<br/>[WebGPU Implementation Status](https://github.com/gpuweb/gpuweb/wiki/Implementation-Status) | Wasm GC (组件模型 Component Model)<br/>WebGPU 计算着色器 (Compute Shader) |
| **AI 智能工程与 Agent** | [Model Context Protocol 规范](https://modelcontextprotocol.io/)<br/>[Vercel AI SDK 规范](https://sdk.vercel.ai/) | [modelcontextprotocol/specification](https://github.com/modelcontextprotocol/specification)<br/>[vercel/ai](https://github.com/vercel/ai)<br/>[huggingface/transformers.js](https://github.com/huggingface/transformers.js) | [MCP Spec Releases & Discussions](https://github.com/modelcontextprotocol/specification/releases)<br/>[OpenAI Agents SDK](https://github.com/openai/openai-agents-python) | MCP Client/Tool 标准<br/>端侧 WebGPU 向量检索<br/>流式 SSE 排版与 Generative UI 沙箱 |

---

## 二、信源采集与差量比对（Diffing）工作流

在评估或扩充任何学科主题时，必须执行确定性的差量对账流程：

```
[1. 确定学科] -> [2. 提取权威数据源中的特性全集 (L0)] -> [3. 提取本地题库已有特性映射表]
                       |
                       v
         [4. 集合差集计算: Missing = L0_Features - Local_Features]
                       |
                       v
         [5. 布鲁姆认知目标过滤 (拒绝对死记硬背琐事的无效录入)]
                       |
                       v
         [6. 结合 careers/2026 大厂核心痛点加权] -> [7. 金字塔架构化出题录入]
```

---

## 三、大厂岗责诉求对账（Careers 2026 锚点）

根据 `careers/resume/2026/jobs/frontend/` 中一线互联网与科技外企的资深/架构前端岗位画像，核心命题必须直接回答以下四大战役级诉求：

1. **工程化与效能革新**：Rust 原生工具链（Rolldown / Rspack / Biome）在大型 Monorepo 中的增量构建与缓存命中率；微前端与模块联邦跨版本仲裁。
2. **极致用户体验与端到端度量**：现代 Core Web Vitals（INP 彻底替代 FID、LoAF 长动画帧细粒度归因）；基于 View Transitions 与 CSS 现代特性的免渲染颠覆。
3. **复杂大前端与跨端治理**：跨 Web/小程序/桌面端的 SDK 分层、有限状态机、跨端离线同步与 CRDTs/OT 冲突消除；Electron 多 Tab 内存挂起与崩溃恢复。
4. **AI-Native 前端载体与人机协同**：流式 Markdown 防抖排版、Generative UI 动态组件安全沙箱、MCP 协议集成、长会话上下文压缩与端侧轻量 RAG。
