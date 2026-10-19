# 数据源清单与采集说明（question-bank-refresh）

配套技能：`../SKILL.md`。本文件是**清单与已知缺口**，流程与铁律看 SKILL.md。

---

## 一、数据源分三层

| 层 | 含义 | 典型来源 | 能否直接当事实源 |
| :--- | :--- | :--- | :--- |
| **E** | 本机一手实证 | `careers/.../mianjing.json`（385 条真实面经，含公司/岗位/出现次数） | ✅ 可以 |
| **L0** | 官方规范 / 源码 / CHANGELOG | `repos/specification`、`repos/proposals`、`repos/rolldown`、vitejs/core 官方 API | ✅ 可以（版本断言必须走这一层） |
| **L1** | 核心维护者 / 官方博客 | vite.dev/blog、react.dev/blog、tc39 会议记录 | ⚠️ 官方声称的写法要标注 |
| **L2** | 真题库仓 / 一线面经帖 | `repos/interview-question`、`repos/front-end-interview-handbook`、牛客 | ✅ 可以（但需标注出处） |
| **L3** | 广角聚合 / 搜索引擎 | careerstack、各类题单站、搜索摘要 | ❌ **只作线索** |

---

## 二、克隆清单

由 `scripts/refresh-sources.sh` 维护，目录扁平化在 `repos/`。

### L2 真题仓（`--depth 1`）

| GitHub | 本地目录 | 最后更新（2026-10-20 实测） | 价值 |
| :--- | :--- | :--- | :--- |
| `pro-collection/interview-question` | `interview-question` | 2025-09-07 | ★★★★★ 1163 题，**带热度与出题公司标注**；连续期收录 Nginx / 微前端 / 工程化真题。**AI 方向为零** |
| `yangshun/front-end-interview-handbook` | `front-end-interview-handbook` | **2026-10-05** | ★★★★★ 唯一仍活跃且含 AI 面经的仓（OpenAI / Harvey / Canva / Microsoft / Discord 轮次） |
| `h5bp/Front-end-Developer-Interview-Questions` | `Front-end-Developer-Interview-Questions` | 2026-03-12 | ★★ 145 条，但绝大多数是 "What is X" 英文教材题，**需大量剔除** |
| `ElemeFE/node-interview` | `node-interview` | 2018-11-26 | ★★ Node 经典题，题库已基本覆盖 |
| `CavsZhouyou/Front-End-Interview-Notebook` | `Front-End-Interview-Notebook` | 2022-11-28 | ★★ 基础题为主 |
| `haizlin/fe-interview` | `fe-interview` | 2025-10-27（批量重提交，内容实为 2019-2020） | ★★ 体量大但陈旧 |
| `evestorm/front-end-interview` | `front-end-interview` | 2025-01-03 | ★★ 本地只有标题，正文在 Notion |
| `abc-club/free-resources` | `free-resources` | 2022-04-21 | ★ 链接索引 |
| `MaxAbramchuck/awesome-interview-questions` | `awesome-interview-questions` | 2024-07-29 | ★ 纯链接聚合 |
| `Awesome-Interview/Awesome-Interview` | `Awesome-Interview` | 2020-09-25 | ★ 链接索引 |
| `scottaohara/accessibility_interview_questions` | `accessibility_interview_questions` | 2021-12-22 | ★★★ **真题形态最佳**（conversation starter 式），但方向不在优先列表 |
| `DopplerHQ/awesome-interview-questions` | `awesome-interview-questions-doppler` | 2024-07-29 | ★ 纯链接聚合 |

### L0 官方仓（`--depth 1 --filter=blob:none`）

| GitHub | 本地目录 | 用途 |
| :--- | :--- | :--- |
| `modelcontextprotocol/specification` | `specification` | **MCP 协议版本与破坏性变更核对**（`schema/`、`docs/specification/*/changelog.mdx`、`seps/`） |
| `tc39/proposals` | `proposals` | Stage 表（`README.md`）+ `finished-proposals.md` 的 ES 版本映射 |
| `tc39/proposal-signals` | `proposal-signals` | Signals 提案状态（**已停更 2025-08，仅作背景**） |
| `rolldown/rolldown` | `rolldown` | Rolldown 版本与 CHANGELOG |
| `web-infra-dev/rspack` | `rspack` | Rspack 主版本与包版本 |
| `biomejs/biome` | `biome` | Biome 状态 |
| `vitejs/vite` | `vite` | Vite 版本与 `rolldown` 依赖位置 |
| `module-federation/universe` | `universe` | 模块联邦 |
| `reactjs/rfcs` | `rfcs-react` | **已停更（pushed_at 2024-06），不可作一手依据** |
| `vuejs/rfcs` | `rfcs` | **已停更（2023-10），不可作一手依据** |
| `vuejs/core-vapor` | `core-vapor` | **已声明不再维护**，README 指向的分支已不存在 |
| `WebAssembly/spec` / `WebAssembly/gc` | `wasm-spec` / `wasm-gc` | Wasm 规范版本与 GC 归属 |
| `gpuweb/gpuweb` | `gpuweb` | WebGPU 规范（注意仓名是 `gpuweb/gpuweb`，不是 `gpuweb/webgpu`） |
| `preactjs/signals` / `solidjs/solid` / `sveltejs/svelte` | `signals` / `solid` / `svelte` | 响应式范式 |
| `vercel/ai` / `vercel/next.js` / `openai/openai-agents-python` / `huggingface/transformers.js` | `vercel-ai` / `nextjs` / `openai-agents-python` / `transformers-js` | AI 工具链 |

---

## 三、外部渠道（不进仓库，只在采集时用）

| 渠道 | 用途 | 采集方式 | 注意 |
| :--- | :--- | :--- | :--- |
| 牛客面经帖 | 一线真实面经（2026-09/10 仍在更新） | `scripts/fetch-nowcoder.py` | SSR 内联 JSON；`desc` 常被截断，优先取 `content`；有频控 |
| 牛客题库页 | 公司真题 | 只读 | 多数需登录 |
| `web-features` (`data.json`) | Baseline 状态与日期 | CDN JSON | 1229 个 feature，可直接查 `status.baseline_high_date` |
| MDN BCD | 各特性各浏览器 `version_added` | CDN JSON | 体积大（~20MB），用脚本解析而非整读 |
| Chrome VersionHistory API | 当前稳定版 | 官方 API | — |
| web.dev / W3C / WHATWG | 官方博客与规范 | `web_fetch` | 区分「规范定稿 / 浏览器实现 / Baseline」 |

---

## 四、已知缺口（采集失败要如实记，不要用低置信内容填平）

| 缺口 | 影响 | 应对 |
| :--- | :--- | :--- |
| 牛客部分帖子正文需登录 | 该帖不可用 | 记为缺口，换其它帖；**不要**凭标题脑补正文 |
| 牛客频控导致骨架页 | 该轮抓取失效 | 隔开重试；`TITLE: 牛客网 - 找工作神器` 即判定未抓到 |
| `blog.webassembly.org` SSL 握手失败 | 取不到 Wasm 3.0 官方公告原文 | 改用 `webassembly.github.io/spec/` 的 All Versions 段 |
| Vite「10-30x faster」「full plugin compatibility」无第三方复现 | 性能宣称不可作事实 | 写成「官方声称」 |
| Rspack「Webpack Compatible」无第三方独立验证 | 兼容性宣称不可作事实 | 附官方兼容性矩阵中的 "Partially compatible" 条目 |
| Vue Vapor 是否已进 alpha 通道未核实 | 只能说「未进主线」 | 跟踪 `vapor-alpha-branch` |
| Vue 3.6 路线图未核实 | 只能说「3.6 不存在于 changelog」 | 查 Vue 官方 roadmap |
| `reactjs/rfcs` 停更 | 无法证明 React 团队流程性结论 | 只做「已合入 RFC 文本止于 0227」的直接断言 |

---

## 五、克隆的真题仓的「零覆盖区」（2026-10-20 实测，勿重复挖）

下列主题在 11 个题库仓中**题面命中为 0**，只能靠牛客 / zencareer 面经或自拟：

- **Electron**（进程模型、崩溃恢复、内存）：0 题
- **RN 新架构**（JSI / Fabric / TurboModule）：仅 2023 年旧题
- **小程序 setData 序列化瓶颈 / Skyline**：仅「为什么有两个线程」等旧题
- **Vite / Rolldown / Rspack / Biome / 构建缓存**：0 题（工具仓是文档不是题库）
- **Core Web Vitals / INP / LoAF / 长任务**：0 题（仅 FCP/LCP/TTFB/FID/TTI/CLS/TBT 释义题）
- **AI / Agent / LLM 全部**：0 题（**只有牛客与 zencareer 面经有 2026 信号**）

> 这条结论本身就是本技能存在的理由：**只靠克隆仓库，永远补不上 2026 的新考点。**
