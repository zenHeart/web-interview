# 金山软件✅

## 基本信息

- **业务领域**: 办公软件（WPS Office/金山文档）、云服务（金山云）、数字娱乐（西山居）
- **技术栈**: Vue3 / TypeScript / Electron / WebAssembly / Canvas / WebGL / Node.js
- **团队规模**: 10,000+ 人（前端团队数百人，分布于珠海、北京、武汉、广州、成都）
- **办公地点**: 珠海总部（金山软件园）、北京总部、武汉研发中心（光谷金融港/金山武汉总部）、广州、成都
- **公司性质**: 知名上市公司（金山软件 03888.HK / 金山办公 688111.SH）
- **薪资水平**: 校招 15k-25k * 14-16薪；社招 20k-45k * 15-18薪 + 股票激励

---

## 岗位类型

- **Web 前端工程师**: 负责金山文档、WPS 365 企业协作平台、开放平台等 Web 核心业务研发。
- **PC 桌面端工程师 (Electron/C++)**: 负责 WPS 客户端内嵌 Web 模块、私有化部署客户端及跨平台桌面工具开发。
- **协同引擎/图形渲染专家**: 负责在线表格、文档、PPT 的富文本排版、Canvas/WebGL 高性能渲染与多人协同算法研发。
- **前端架构师**: 主导大型 Monorepo 基建、微前端治理、CI/CD 自动化与团队效能提升。

---

## 技术特色

1. **工业级在线排版与图形渲染引擎**：
   - 金山文档摆脱了传统浏览器 DOM 的局限，深度采用 Canvas/WebGL 进行百万级单元格和复杂版面的底层绘制，并结合 WebAssembly 实现 C++ 核心排版引擎的复用，在浏览器中达到原生级排版保真度与 60FPS 流畅滚动。
2. **多端融合与 Electron 深度优化**：
   - 客户端大量使用 Electron 与 C++ Addon 混合架构，在私有化部署、安全沙箱、跨进程通信性能调优、内存泄漏治理与启动测速方面积累了深厚的工业实践经验。
3. **高并发多人实时在线协同 (OT / CRDT)**：
   - 支持万人级超大表格与在线文档的多人无冲突并发编辑，底层具备完善的 Operation 变换树、向量时钟与离线缓存恢复机制。

---

## 面试流程概览

### 校招流程
1. **在线网申与笔试**: 计算机基础（数据结构、网络、算法）与前端核心语法编码。
2. **专业一面 (45-60min)**: 考察 JavaScript 核心机制、浏览器原理、CSS 布局及框架核心原理（Vue/React）。
3. **专业二面 (60min)**: 深挖复杂项目、协同/富文本/Canvas/虚拟列表等硬核实现、手撕代码与系统设计。
4. **HR 面 (30min)**: 考察文化认同度、求职动机、沟通表达与发展意向。

### 社招流程
1. **简历筛选与初试 (45-60min)**: 业务与技术基础考察，重点对应聘者过往主力项目的架构和难点深挖。
2. **技术复试 (60min)**: 架构设计、性能瓶颈排查、Electron/Node 底层、工程化与跨端方案选型。
3. **技术总监/部门负责人面 (45min)**: 业务技术前瞻性、团队管理/协作赋能、复杂系统权衡。
4. **HR 面与薪酬沟通**: 背景调查、薪酬职级沟通与 Offer 发放。

---

## 题库

### P0 核心必考题

#### 1. WPS 网页版中 Canvas/WebAssembly 高性能排版渲染与 DOM 渲染的区别与选型思考？ {#p0-canvas-wasm-rendering}

<Answer>
**核心结论**：
传统富文本或表格若使用纯 DOM 渲染，当节点数量突破数万时，DOM 树的内存占用激增，浏览器的重排（Reflow）与重绘（Repaint）耗时将呈指数级上升，产生严重掉帧。WPS 网页版与金山文档采用“虚拟画布（Canvas/WebGL）+ WebAssembly 核心排版引擎 + 顶层轻量 DOM 交互层”的混合架构，将渲染开销从浏览器渲染引擎剥离，实现百万级数据与复杂格式下的原生级保真与 60FPS 丝滑体验。

**原理解析**：
1. **传统 DOM 渲染的瓶颈**：
   - **对象体积巨大**：每一个 HTML 元素挂载了数百个原型属性和样式计算开销。
   - **排版不可控**：不同浏览器（Blink、WebKit、Gecko）的文字度量、字形微调及换行算法存在细微差异，无法做到跨端“像素级版面一致”。
   - **回流级联**：单点文本变动可能导致整个父容器乃至页面的重新布局。
2. **Canvas/WebGL 自研排版管线**：
   - **数据与排版分离**：底层数据为线性结构或抽象语法树（AST），排版引擎（Layout Engine）将文字、段落、样式计算为一个个带坐标（x, y, width, height）的图元（Glyph/Block）。
   - **视口裁剪与按需绘制**：仅计算并绘制当前 Viewport 视口可见区域内的图元，滚动时以固定频率调度 `requestAnimationFrame` 重绘局部或全屏。
   - **离屏双缓冲与分层绘制**：将静态网格/背景与高频变动的内容（如光标、选区）分置于不同的 Canvas 图层，避免无效全量重绘。
3. **WebAssembly 的关键价值**：
   - **C++ 核心代码复用**：金山自 1988 年起积累了数百万行 C++ 排版与计算核心算法，借助 Emscripten 将其编译为 Wasm，无需用 JS 重写排版引擎。
   - **高吞吐运算**：复杂表格的公式链式计算依赖拓扑排序与密集数值计算，Wasm 的近原生执行效率为秒级计算海量数据提供保障。

**规范代码/架构示意**：
```typescript
// 现代在线文档分层渲染架构简要示意
class DocumentRenderer {
  private bgCanvas: HTMLCanvasElement;      // 静态底图/网格/页面阴影
  private contentCanvas: HTMLCanvasElement; // 动态图元绘制层
  private uiLayer: HTMLDivElement;          // 辅助交互层（输入框、选择锚点、悬浮工具栏）
  private wasmEngine: WasmLayoutEngine;

  constructor(container: HTMLElement, wasmEngine: WasmLayoutEngine) {
    this.wasmEngine = wasmEngine;
    this.bgCanvas = this.createCanvas(container);
    this.contentCanvas = this.createCanvas(container);
    this.uiLayer = this.createInteractiveLayer(container);
  }

  public render(viewport: { scrollX: number; scrollY: number; width: number; height: number }) {
    // 1. 调用 Wasm 获取当前视口可见区域图元切片
    const glyphs = this.wasmEngine.computeVisibleGlyphs(viewport);
    
    // 2. 在 contentCanvas 上进行批处理绘制
    const ctx = this.contentCanvas.getContext('2d')!;
    ctx.clearRect(0, 0, viewport.width, viewport.height);
    
    ctx.save();
    ctx.translate(-viewport.scrollX, -viewport.scrollY);
    for (const item of glyphs) {
      if (item.type === 'text') {
        ctx.font = item.font;
        ctx.fillStyle = item.color;
        ctx.fillText(item.text, item.x, item.y);
      } else if (item.type === 'image') {
        ctx.drawImage(item.bitmap, item.x, item.y, item.width, item.height);
      }
    }
    ctx.restore();
  }
}
```

**面试官视角**：
- 面试官通常会追问：“既然 Canvas 只是位图，文本选区、搜索光标和中文输入法（IME）如何处理？”
- **回答要点**：必须指出使用一个不可见的、绝对定位在当前光标位置的 `textarea` 或 `contenteditable` 容器接收原生键盘与 IME 组合输入（`compositionstart` / `compositionend`），将输入的字符同步给排版引擎，再重绘 Canvas，选区则通过几何碰撞算法计算并在上层绘制半透明高亮矩形。

**延伸阅读**：
- [WPS 官方技术博客：在线 Office 排版引擎的演进与实践](https://www.kdocs.cn)
- [WebAssembly 核心规范与多线程共享内存（SharedArrayBuffer）](https://webassembly.org)
</Answer>

#### 2. 在多人实时协同文档中，OT（Operational Transformation）算法的核心思想与状态转换？ {#p0-ot-algorithm}

<Answer>
**核心结论**：
OT（操作转换）是协同编辑系统保证强最终一致性（Convergence）的经典算法。其核心是在多客户端并发发送无序操作时，服务端或客户端通过转换函数 `transform(op1, op2) -> (op1', op2')`，对并发操作的位置索引进行动态修正，确保不论各个客户端接收操作的先后顺序如何，最终呈现的文档内容严格完全一致。

**原理解析**：
1. **并发冲突的典型场景**：
   - 初始文本为 `"cat"`。
   - 用户 A 在位置 0 插入 `'a'`，本地生成操作 `Op_A = Insert(0, 'a')`，文本变为 `"acat"`。
   - 用户 B 在位置 3 插入 `'s'`，本地生成操作 `Op_B = Insert(3, 's')`，文本变为 `"cats"`。
   - 若用户 A 直接应用未经转换的 `Op_B(3, 's')`，由于 A 已经插入了 1 个字符，位置 3 实际上变成了原来的字符 `'t'` 处，最终 A 的文本会变成 `"acast"`，而 B 在应用 `Op_A(0, 'a')` 后文本变成 `"acats"`，产生状态分叉！
2. **OT 转换函数原理**：
   - 转换函数 `T(Op_A, Op_B)` 返回修正后的操作 `Op_A'` 和 `Op_B'`。
   - 在上述例子中，由于 `Op_A` 插入在索引 0（在 `Op_B` 索引 3 之前），因此当 `Op_B` 应用于 A 的状态后，其插入位置必须向后偏移 1 位：`Op_B' = Insert(4, 's')`。
   - 最终 A 依次执行 `Op_A` 和 `Op_B'`：`"cat" -> "acat" -> "acats"`；B 依次执行 `Op_B` 和 `Op_A'`：`"cat" -> "cats" -> "acats"`。两端成功收敛！
3. **架构协作模型**：
   - **Client-Server 中心化 OT（如 Google Docs / ShareDB 方案）**：客户端维护本地未确认的变更队列（Pending Ops），服务端为每个被接受的 Operation 分配递增的版本号（Revision）。客户端收到服务端广播的他人操作时，将其与本地所有未确认操作进行双向转换，并重新对齐版本。

**核心算法实现**：
```typescript
interface TextOperation {
  type: 'insert' | 'delete';
  position: number;
  text?: string;
  length?: number;
}

// 简易 OT 文本转换函数
function transform(opA: TextOperation, opB: TextOperation): [TextOperation, TextOperation] {
  const opAPrime = { ...opA };
  const opBPrime = { ...opB };

  if (opA.type === 'insert' && opB.type === 'insert') {
    if (opA.position < opB.position || (opA.position === opB.position && opA.text! > opB.text!)) {
      opBPrime.position += opA.text!.length;
    } else {
      opAPrime.position += opB.text!.length;
    }
  } else if (opA.type === 'insert' && opB.type === 'delete') {
    if (opA.position <= opB.position) {
      opBPrime.position += opA.text!.length;
    } else {
      opAPrime.position -= Math.min(opA.position - opB.position, opB.length!);
    }
  }
  // 类似地处理 delete-insert 与 delete-delete
  return [opAPrime, opBPrime];
}
```

**面试官视角**：
- 考察点：是否真正做过/深入思考过实时协同系统中的并发一致性与网络分区容错。
- 进阶对比：OT 与 CRDT（无冲突复制数据类型，如 Yjs/Automerge）的优劣？
  - OT：需要中心化版本协调，数据体积紧凑，内存利用率高（适合金山文档、Google Docs 这类强服务端控制的商业应用）。
  - CRDT：去中心化、P2P 友好、天然支持离线无冲突合并，但元数据开销较大（每个字符带有唯一 ID 和逻辑时钟）。

**延伸阅读**：
- [OT 算法核心论文：Operational Transformation in Real-Time Group Editors](https://en.wikipedia.org/wiki/Operational_transformation)
- [协同编辑系统设计对比：石墨文档篇](/company/shimo)
</Answer>

---

### P1 高频必会题

#### 1. Electron 桌面端架构中跨进程通信机制与安全上下文隔离？ {#p1-electron-ipc-security}

<Answer>
**核心结论**：
现代 Electron 架构严格遵循安全第一原则，采用“多进程模型 + 进程间沙箱隔离”。官方强制要求开启 `contextIsolation: true` 并禁用 `nodeIntegration: false`，通过在 `preload.js` 预加载脚本中使用 `contextBridge.exposeInMainWorld` 暴露极小化受限的安全 API，切断渲染进程任意调用 Node.js 底层系统 API 的能力，彻底防御 XSS 造成的 RCE（远程代码执行）灾难。

**原理解析**：
1. **多进程架构**：
   - **主进程（Main Process）**：掌控操作系统原生能力（窗口管理、文件系统、原生菜单、系统托盘、自动更新）。
   - **渲染进程（Renderer Process）**：每个窗口独立运行 Chromium 沙箱渲染网页内容，受操作系统沙箱约束，不具备系统原生权限。
2. **上下文隔离（Context Isolation）**：
   - 渲染进程中的网页脚本运行在单独的 JavaScript Execution Context，而 `preload.js` 脚本运行在专用的上下文，两者对象原型互不污染。
   - `contextBridge.exposeInMainWorld` 会在两个上下文之间建立安全的双向代理，传递的数据自动进行结构化克隆（Structured Clone），防止恶意脚本篡改原型链。
3. **IPC 通信模式**：
   - `ipcRenderer.send` / `ipcMain.on`：单向异步通知（Fire and Forget）。
   - `ipcRenderer.invoke` / `ipcMain.handle`：双向异步 RPC 请求响应（返回 Promise），推荐替代已废弃且易阻塞主线程的 `ipcRenderer.sendSync`。

**标准生产代码示范**：
```javascript
// 1. main.js (主进程配置与安全白名单)
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // 核心安全配置：开启上下文隔离
      nodeIntegration: false,  // 核心安全配置：禁止网页直调 Node API
      sandbox: true            // 开启 OS 级别沙箱
    }
  });
  win.loadURL('https://wps.internal.com');
}

ipcMain.handle('doc:save-file', async (event, { filePath, content }) => {
  // 服务端鉴权与参数边界校验
  if (typeof content !== 'string') throw new Error('Invalid content');
  return await safeSaveFile(filePath, content);
});

// 2. preload.js (预加载通道，安全注入受控能力)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveDocument: (filePath, content) => ipcRenderer.invoke('doc:save-file', { filePath, content }),
  onUpdateDownloaded: (callback) => {
    const listener = (event, val) => callback(val);
    ipcRenderer.on('app:update-ready', listener);
    return () => ipcRenderer.removeListener('app:update-ready', listener);
  }
});

// 3. renderer.js (Web 业务层)
window.electronAPI.saveDocument('/docs/report.wps', 'content')
  .then(() => console.log('保存成功'))
  .catch(err => console.error('保存失败', err));
```

**面试官视角**：
- 考核点：候选人是否有真实的跨平台客户端工程实践，安全意识是否过关。
- 追问陷阱：“如果渲染进程页面存在反射型 XSS，攻击者能否直接调用 `require('child_process').exec('calc')` 弹出计算器？”
- 答：“在开启 `contextIsolation: true` 且 `nodeIntegration: false` 的标准生产环境下绝不可能，因为 `require` 和 Node 原生模块在渲染环境未定义，攻击者只能调用被 `contextBridge` 白名单暴露的受限业务接口。”

**延伸阅读**：
- [Electron 官方安全指南（Security Checklist）](https://www.electronjs.org/docs/latest/tutorial/security)
</Answer>

#### 2. 大型前端项目多语言国际化（i18n）的按需分包加载与动态热切换方案？ {#p1-i18n-dynamic-loading}

<Answer>
**核心结论**：
在金山办公这类面向全球市场且功能模块庞大的企业级应用中，全量打包所有语种资源会导致首屏 Bundle 体积膨胀数兆。工业级方案采用“主包仅包含骨架通用文案 + 各业务模块文案按语言/按路由异步加载（`import(/* webpackChunkName */ ...)`）+ 浏览器与用户配置持久化优先匹配 + 响应式语言热替换不刷新页面”。

**原理解析与实施关键**：
1. **语言包分割策略**：
   - 基础核心层（通用按钮、通用错误码、日期时间规则）作为共享基础包。
   - 业务特性包（表格公式说明、审阅批注文案）采用动态异步载入，例如 `loadLocaleMessages(lang, 'sheet')`。
2. **文本插值与复数处理**：
   - 采用标准 ICU 格式或 Mustache 模板语法支持动态变量替换，如 `i18n.t('export.progress', { current: 10, total: 100 })`。
3. **回退兜底机制**：
   - 若用户语言为 `fr-CA`（加拿大法语），查找优先级为：`fr-CA` -> `fr` -> `zh-CN`（系统默认回退）。

**标准实现代码**：
```typescript
// 动态语言加载管理器
import { createI18n } from 'vue-i18n';

export const i18n = createI18n({
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  messages: {}
});

const loadedLanguages = new Set<string>();

export async function setAppLanguage(lang: string) {
  if (i18n.global.locale.value === lang) return;

  if (!loadedLanguages.has(lang)) {
    // 动态异步分包拉取语言包 JSON
    const messages = await import(
      /* webpackChunkName: "lang-[request]" */ `@/locales/${lang}.json`
    );
    i18n.global.setLocaleMessage(lang, messages.default);
    loadedLanguages.add(lang);
  }

  i18n.global.locale.value = lang;
  document.querySelector('html')?.setAttribute('lang', lang);
  localStorage.setItem('user_preferred_locale', lang);
}
```

**面试官视角**：
- 考察点：工程分包、构建工具（Webpack/Vite）分块策略与国际化业务落地成熟度。
- 延伸：如何实现富文本内的占位符本地化（如：“点击 **[这里]** 下载”，其中“这里”是带超链接的交互元素）？——需使用作用域插槽组件（如 `<i18n-t>`）将局部 DOM 组件与文本模板合并。
</Answer>

---

## 考察重点速览

1. **复杂图形与排版渲染**：Canvas/WebGL 绘制管线、视口剪裁、离屏渲染、WebAssembly 与 JS 内存通信。
2. **实时多人协同编辑**：OT / CRDT 冲突消解机制、向量时钟、断网重连与服务端数据一致性同步。
3. **桌面跨端与工程化**：Electron 进程模型、安全沙箱机制、多 Tab 页内存控制与私有化定制分发。
4. **性能深度攻坚**：十万级长列表/不定高虚拟滚动、回流重绘批处理、首屏与编译构建加速。

---

## 备考建议

1. **深入阅读金山文档核心技术文章**：深入理解富文本、公式解析与 Canvas 绘制原理，切忌仅停留在普通 CRUD 业务层面。
2. **亲手搭建 Electron + Vue3 生产级工程**：掌握 `preload.js`、`contextBridge`、IPC 通信与生产打包优化技巧。
3. **夯实数据结构与算法**：金山技术面注重树（Huffman 树、AST、DOM 树）、链表、图遍历与字符串高效算法。

