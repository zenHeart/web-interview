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
| **牛客 AI Agent 专场面经（2026-09/10 高频）** | 一线真题的主要增量来源 | `scripts/fetch-nowcoder.py <url>` | 2026-10-20 已核到并录题的高价值帖：<br/>· `nowcoder.com/feed/main/detail/8ee12044e8284a8d8d6140dc2d0840ff`（深圳外企 Agent 开发 18 问）→ 工具定义膨胀/两层工具调用/意图识别/企业 Word·PDF RAG/召回质量<br/>· `nowcoder.com/discuss/800426409796624384`（蚂蚁国际一面 19 问）→ NDCG/搜索排序指标/重排序/Agent 评测<br/>· `nowcoder.com/feed/main/detail/54b3374bbfec494dba76294891edd9b4`（金山办公大模型实习一面）→ ROUGE 计算原理/LCS |
| **牛客 AI Agent 专场面经（2026-10-21 批次）** | 本轮 6 道新题的一线出处 | `scripts/fetch-nowcoder.py <url>` | 已核到并录题的高价值帖：<br/>· `nowcoder.com/discuss/860538803759386624`（**AI-Agent 面试题汇总 - 大模型篇**）→ **位置编码 RoPE/ALiBi**、**复读机退化生成**（正文在 11500 字符处被作者截断，见坑 28）<br/>· `nowcoder.com/feed/main/detail/54b3374bbfec494dba76294891edd9b4`（金山办公大模型实习一面）→ **vLLM 原理与 batch 优化**（同帖另问「知道哪些位置编码？」）<br/>· `nowcoder.com/discuss/800426409796624384`（蚂蚁国际一面 19 问）→ **A2A 协议与 Agent 间通信**<br/>· `zchary1106.github.io/agent-interview-hub/question-signals.html`（L2 面经信号站，**带独立来源数、公司与轮次标注**）→ **Agent/Orchestrator/Harness/Runtime 四层职责**（4 个独立来源：字节/小红书/阿里）、**多步工具轨迹 Reward 与信用分配**（3 个独立来源：阿里/腾讯/字节） |
| **牛客 AI Agent 专场面经（2026-10-22 批次）** | 本轮 6 道新题的一线出处 | `scripts/fetch-nowcoder.py <url>` | **用「帖 id 差集」找未开采帖**（见 SKILL.md 坑 34）：`mianjing.json` 的 `sources` 里共 14 个 distinct 帖 id，减去已记录的 8 个即为未开采。本轮开采并录题的高价值帖：<br/>· `nowcoder.com/discuss/922659050167226368`（**字节跳动 AI Agent 开发岗面经 01~22 轮**，2026-08 集中面经，信息量最大）→ **RAG 父子索引**（面经21）、**LoRA vs QLoRA**（面经16）、**流式 ASR 的稳定前缀/临时结果/最终结果**（面经10）、**WER 降低但下游准确率下降**（面经10）、**业务状态机扩展到二十多种状态**（面经04，**未录**：属通用软件设计，非 AI 考点）、**多个 Agent 同时改文件的冲突**（面经01，**已被既有「多 Agent 并发协作三类冲突」覆盖**）<br/>· `nowcoder.com/feed/main/detail/2b4b7cf9b1ab45e58a60794d7d92cc68`（**真实公司 Agent 面试偏好**，2025-09-01）→ **审批后写操作的一致性保证 / 审批后是否该重新调用大模型**（#16、#17）<br/>· `nowcoder.com/feed/main/detail/657ebb5f2c74407485651aa37f75e825`（**网易 agent 测试一二面**）→ **Skill 路由命中率评测**（一面 #2、#3、#12，二面 #3）<br/>· `nowcoder.com/discuss/867788300126347264`（**字节 ai agent 评测实习生**）→ Skill 路由 / 上下文压缩（已被既有题覆盖）<br/>· `nowcoder.com/feed/main/detail/1baaa14d062541239527e3eb20228f47`（金山办公大模型实习二面，2025-01）→ RAG 切分策略（已被既有题覆盖）<br/>· `nowcoder.com/feed/main/detail/67dc21f616c5459f8699357a53a2c7d5`（Shopee AI 开发二面）→ 无新增考点 |
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
| 牛客「标题正常但抽不到正文」 | 该帖当轮不可用 | **判据是抓下的 HTML 里有没有 `"content":"` 字段**（与 host 无关，`api-cdn` 与 `www` 返回同一后端同一结果）；隔开约 1 分钟重试即可恢复；另注意正文极短的帖子会被 `extract_blocks` 的长度阈值判成未抓到 |
| 「延时消息 / 内存态持久化」主题空白 | 2026-10-21 确认为**真空白**（非探针假阳性）；**2026-10-22 二次复核仍为真空白** | **两轮均不录**——2026 面经池与 14 个镜像仓里都找不到该主题的 L2 一线出处，硬凑等于自拟题面；留待后续牛客出现相关帖再补 |
| 「同域并发连接数」主题空白 | **探针假阳性**（坑 20）：`docs/08.network/04.http/01-http-basics.md` 已写「同域最多 6 个并行连接」，探针正则匹配不到这种语序 | 不用录，也**不要**因为探针报错就改既有正文 |
| 中文题的覆盖度打分 | 按空白切词会让中文整句变成单 token，**所有中文题覆盖率塌到 0.1 以下** | 用 **CJK 2-gram** 切词（SKILL.md 坑 35），语料仍只扫「标题 + slug」 |
| 写中文正文可能产生 U+FFFD | 文件能渲染、lint 与构建全绿，**只有肉眼能看出某字变成替换字符**；2026-10-22 在 `origin/main` 里发现存量 1 处 | 写完必扫全库替换字符（SKILL.md 坑 33），本轮已修掉存量 |
| `mianjing.json` 的 `company` 字段看不出信源层级 | 容易把 L3 聚合站题面当真题录入 | 读 `source_url`：`github.com` / `raw.githubusercontent.com` / `*.github.io` = L2 可用；`developer.aliyun.com` / `developer.cloud.tencent.cn` / `gitcode.csdn.net` = **L3 只作线索** |
| `web_search` 偶发 `MATRIX_TOOL_REQUEST_FAILED` | 检索通道不可用 | 改 `web_fetch` / `curl` 直接取官方页（arXiv abs 页、ACL Anthology 页） |
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
>
> **2026-10-22 补充**：连续两天从「公开克隆仓」挖到 0 道可用新题，而从**牛客未开采帖**一次挖到 6 道——**真题增量必须走面经帖，不能走题库仓**。配套发现「帖 id 差集」法（坑 34）比主题探针更快定位未读原文。
