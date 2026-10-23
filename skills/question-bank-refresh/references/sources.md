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
| **牛客 AI Agent 专场面经（2026-10-23 批次）** | 本轮 4 道新题的一线出处 | `scripts/fetch-nowcoder.py <url>` | **先算 post id 差集再定选题**（见 SKILL.md 坑 39：`mianjing.json` 15 个 distinct id，减去 `sources.md` 已记录的 9 个后剩 **6 个未开采**）。本轮开采并录题：<br/>· `nowcoder.com/discuss/891698510574153728`（**小米 AI Agent 一面（暑期）**，8 问带答案）→ **记忆持久化分层**（Q8「memory 的持久化是怎么做的？」，正文被作者截断，**问题完整可用**）、**小模型在 Agent 场景够不够 / 失败归因分解**（Q7「外部模型参数更大，14B 在 Agent 层面会不会不够？」）。同帖另问「自部署 vs 外部 API」「模型选型」「微调 vs spec coding」——后两者**已被既有题覆盖**，不录<br/>· `nowcoder.com/feed/main/detail/5c76e85cdaf14d6c9831662a788de453`（**金山办公 NLP 算法岗凉经**，24 届秋招）→ **ChatGPT 里的强化学习是怎么实现的**（加面 Q6）。同帖的「结巴分词 / 中文 BERT / LLM 中文分词」「数据并行 vs 模型并行」「DeepSpeed」**均不录**——前者已被 `00.concept.md` 的 Token/BPE 题覆盖（含中文 token 成本追问），后两者属训练侧工程、**超出本库「AI 工程与前端」定位**，且无 L2 面经热度支撑 |
| **Agent Interview Hub 主站（L2 面经聚合站，2026-10-24 新增）** | **本轮 7 道新题的一线出处**；单站体量远超 `question-signals.html` | `curl -sL "https://zchary1106.github.io/agent-interview-hub/"`（约 1.35MB，50 个 `<section>`） | ⚠️ **`question-signals.html` 只是该站的极小子集**（12 条信号），**主站才是主矿**——见 SKILL.md 坑 44。已核到并录题的高价值内容：<br/>· 「高频拷打题-牛客热帖」→ 工具设计、Memory 三分、Plan-and-Execute vs ReAct<br/>· 「Agentic RAG 与 GraphRAG 深度解析」Q20 → **GraphRAG 与传统 RAG 的区别**（Local / Global Search、Leiden 社区检测）<br/>· 「大模型推理优化与部署」Q23 → **投机解码原理**（draft-verify、接受率）<br/>· 「核心概念详解与参考答案」→ **MHA / MQA / GQA**、**MoE 如何扩大参数不增推理成本**、**Scaling Law**<br/>· 「Agent 安全与评估体系」→ **提示注入（直接 / 间接）与防御策略**<br/>· 「八股文完整答案集」→ **Reflection（Reflexion / Self-Refine）**<br/>· 每条带**难度 ⭐ 与频率 ★**标注且**含「参考答案」全文**——是本库目前唯一带答案正文的大规模 L2 源<br/>· ⚠️ 混有大量算法题 / 行为题 / 公司战略题 / 训练侧深度学习题，**必须先过滤**（见坑 45） |
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
| 「中文分词原理」（结巴分词 / 中文 BERT / LLM 中文分词） | **2026-10-23 判定为重复覆盖**：`docs/06.03.ai/00.concept.md` 的「什么是 Token」题已含字符级/词级/子词级对比矩阵、BPE 时序流图，且**追问 1 就是「为什么早期 GPT-3 处理中文成本远高于英文」** | 不录——再录一题会与既有题争同一考点，违反单一考点原则 |
| 「Agent 路径震荡 / 无进展循环」 | **2026-10-23 判定为重复覆盖**：信号站 #12 的「动作与错误指纹去重、进展检测、失败预算」已写在既有「Agent = Model + Harness」题的**执行循环与停止条件**一节（步数预算 + 指纹去重 + 无进展检测三者缺一不可），并在 `coding.md` 的 Agent Loop 里有对应实现 | 不录 |
| 「延时消息 / 内存态持久化」主题空白 | 2026-10-21 确认为**真空白**（非探针假阳性）；**2026-10-22 二次复核仍为真空白** | **两轮均不录**——2026 面经池与 14 个镜像仓里都找不到该主题的 L2 一线出处，硬凑等于自拟题面；留待后续牛客出现相关帖再补 |
| 「同域并发连接数」主题空白 | **探针假阳性**（坑 20）：`docs/08.network/04.http/01-http-basics.md` 已写「同域最多 6 个并行连接」，探针正则匹配不到这种语序 | 不用录，也**不要**因为探针报错就改既有正文 |
| **「分布式训练 / 混合精度 / 梯度消失 / CUDA」等训练侧题** | Agent Interview Hub 主站里有完整的一组（DP/TP/PP/ZeRO、bf16 vs fp16、梯度消失爆炸、warp/block、70B 需要几张卡） | **不录**——与既有口径一致：本库定位是「AI 工程与前端」，不是训练岗；且 `sources.md` 已有先例（数据并行 / DeepSpeed 判为超范围）。**若将来扩到训练专题再开一轮** |
| **「HyDE / Step-back Prompting / Query Routing」等 RAG 检索技巧** | Hub「Agentic RAG」与「RAG 核心知识」两节各有成组技巧题，**全库 0 覆盖** | **本轮不录**——与既有「RAG 召回质量分层诊断与 Rerank 精排」考点相邻（都属于「召回后如何改善」），单独立题会争同一考点。**留作该题的追问扩展**更合适 |
| **「GPTQ vs AWQ」量化选型** | Hub「大模型推理优化与部署」节给出 GPTQ（Hessian 逐层量化）/ AWQ（激活感知量化，保护重要权重）/ GGUF / QAT 的对比 | **本轮不录**——`05.runtime-internals.md` 的 vLLM 题追问里已指向「量化解码」方向，再单开一题偏窄。**可作为 vLLM 题的追问补充** |
| **「ECharts」「水波纹动画」等前端窄知识点** | 3 个未开采牛客帖里唯一全库 0 命中的两项 | **不录**——一个是三方图表库用法、一个是纯 CSS 动画效果，**不足以支撑一道有区分度的面试题** |
| 「Hub 里 44 个未逐个核的公司分节」 | Agent Interview Hub 主站含 15+ 家公司的「面试题与面经」分节，本轮只开了 6 个 section | **下一轮继续开**——这是目前体量最大、最容易出题的 L2 源；开过的 section 见上方表格，不要重复 |
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
> **2026-10-23 补充**：牛客 post id 这条线索**已彻底用尽**（15 个 id 全部开采过），本轮改用 **`zchary1106.github.io/agent-interview-hub/question-signals.html`（L2 面经信号站）** 的 12 条信号选题——该站每条信号带**独立来源数、公司、轮次、回答骨架、评估要点**，可直接当 L2 出处。**但信号数不等于可出题数**：12 条里 9 条已被既有题覆盖，只有 #2（记忆分层）与 #9（链路延迟与成本）能出题（明细见 SKILL.md 坑 40）。> 
> 下轮的选题建议：①牛客上**新增**的面经帖（`mianjing.json` 本身不再更新，需另行发现）；②镜像仓的新提交（连续两天从公开克隆仓挖到 0 道可用新题）；③信号站新增信号。**不要重复开采已记录的帖 id。**
> **2026-10-22 补充**：连续两天从「公开克隆仓」挖到 0 道可用新题，而从**牛客未开采帖**一次挖到 6 道——**真题增量必须走面经帖，不能走题库仓**。配套发现「帖 id 差集」法（坑 34）比主题探针更快定位未读原文。
>
> **2026-10-24 更正（重要）**：上面那句「post id 线索**已彻底用尽**（15 个 id 全部开采过）」**是错的**。重算差集：`mianjing.json` 实际只有 **14 个** distinct id，而当时 `sources.md` 只记录了 **11 个**，剩下 **3 个从未开采**——
> · `470262180567400448`（金山办公前端二面，**72 次引用，是语料池里引用最多的一个**）
> · `c1e2eb280ad3496cb7886cd1bf75c80d`（金山办公前端一面，20 次）
> · `b234d314e00548f8883782b51c362c04`（金山办公 HR 面，20 次）
>
> 逐帖核完后结论是：**这 3 个帖对 AI 模块零价值**——全是**前端通用 + 行为/HR 题**（虚拟列表、回流重绘、Vuex vs EventBus、闭包内存泄漏、「为什么选择学习前端」），经全库查证均已被 `docs/01.js`、`docs/02.html`、`docs/05.02.vue` 等前端学科覆盖，且行为题按坑 5 本就不算缺口。**但上一轮「彻底用尽」的判断本身不成立**——教训见 SKILL.md 坑 46。
>
> **本轮真正的新矿是 Agent Interview Hub 主站**：`question-signals.html` 只是该站 12 条信号的极小子集，**主站 `index.html` 有 50 个 section、715 条编号条目、约 500 组带答案的 Q&A**。2026-10-24 单站开出 **7 道**新题（GraphRAG / 投机解码 / GQA / MoE / Scaling Law / 提示注入 / Reflexion）。**下一轮的选题建议**：①继续挖 Agent Interview Hub 主站未覆盖的 section（本轮已开 6 个 section，仍有 44 个含「面试题与面经」的公司分节未逐个核）；②牛客上**新增**的面经帖；③镜像仓新提交。**不要重复开采已记录的帖 id，也不要重复开采 Hub 已开过的 section。**
