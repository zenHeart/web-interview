# Web Interview 权威数据源矩阵与行业追踪标准

> 采集与对齐基准：**2026-10-21**（上次对齐 2026-10）。作为全库学科与主题差量扫描、题目架构与去伪存真的物理基准（Single Source of Truth, SSOT）。
> 遵循 `/deep-research` 信源分层金字塔：E（实证） > L0（官方规范/源码/RFC） > L1（核心维护者） > L2（GitHub 高星/真题库） > L3（广角聚合）。

> **本地镜像约定**：本文件所列 L0/L2 仓库在本地以 `repos/<repo-basename>` 浅克隆镜像（`--depth 1`，L0 另加 `--filter=blob:none`），`repos/` 已在 `.gitignore` 中，**不入库**。克隆脚本与清单见 `skills/question-bank-refresh/`。镜像存在的原因是：版本断言必须能在本地核对原文，不能凭记忆写。

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

## 一之二、真题信源层级（Interview Evidence, 2026 起为一级输入）

> **为什么单列**：2026-10 的全库遍历发现，公开克隆的题库仓**内容普遍滞后且 AI 方向为零**（`pro-collection/interview-question` 最新一期 2025-09；`front-end-interview-handbook` 是唯一仍活跃且含 AI 面经的仓，最后更新 2026-10-05）。因此「最新真题」这一层**不能只靠 L2 仓库**，必须引入按时间排序的一线面经源。

| 层级 | 信源 | 性质 | 采集方式 | 已知局限 |
| :--- | :--- | :--- | :--- | :--- |
| **E** | `careers/resume/2026/jobs/agents/mianjing.json`（385 条真实面经题，含公司/岗位/出现次数） | 本机一手快照，2026-09 取自牛客 | 随 `careers` 仓更新 | 只覆盖 AI Agent 方向；不含前端方向 |
| **L2** | 牛客面经帖（`nowcoder.com/discuss/*`、`/feed/main/detail/*`） | 一线真实面试记录，2026-09/10 仍高频更新 | 只读抓取公开页，抽取 `desc`/`content` 字段 | 部分帖正文仅登录可见；`desc` 为预览，长文需换字段抓 |
| **L2** | `repos/front-end-interview-handbook/`（yangshun） | 含 OpenAI / Harvey / Canva / Microsoft / Discord 轮次真题 | 本地浅克隆 | 公司向题面偏英文教材体，需改写为中文口吻 |
| **L2** | `repos/interview-question/`（pro-collection） | 带**热度**与**出题公司**标注的连续期真题 | 本地浅克隆 | 最新 2025-09；AI 方向为零 |
| **L3** | 各类题单聚合站（careerstack / ai-interview-guide 等） | 广角线索 | 仅用于发现线索 | **只作线索，不作事实源**；发布主体与题面真实性不可核实 |

**真题采集的证据纪律**：
1. 题目进入题库前，必须能在上述某一源里定位到**原文出处**（URL 或 `repos/` 相对路径 + 行号）；
2. 同一主题若只有 L3 摘要支撑，**不得**作为真题录入；
3. 「某题在多家公司反复出现」这类频次结论，必须能引用到具体计数来源（如 `mianjing.json` 的 `count` 字段）。

---

## 一之三、版本基线快照（2026-10-23 核对，题目中的版本断言以此为准）

> 题目涉及"某框架到了第几版 / 某提案到了第几阶段 / 某规范是不是定稿"时，**必须**回本地镜像或官方原文核对，禁止凭记忆写。

| 断言点 | 正确基线 | 常见错误写法 | 核对入口 |
| :--- | :--- | :--- | :--- |
| MCP 协议版本 | **2026-07-28**（无状态：移除 `initialize` 握手与协议级 session；Roots/Sampling/Logging 已 Deprecated；`tasks` 降级为官方扩展；服务端发起请求改为 MRTR） | 仍写 `2024-11-05` 或"先 initialize 握手再 tools/list" | `repos/specification/schema/`、`docs/specification/2026-07-28/changelog.mdx` |
| Vite | 8.0 发布于 2026-03-12，当前 8.3.x；默认引擎已是 Rolldown + Oxc，esbuild 已退役 | "Vite 8 仍在用 esbuild + Rollup" | `repos/rolldown/`、vite 官方 `package.json` |
| Rspack | **2.x**（2.0 发布于 2026-04-22，当前 2.2.x），纯 ESM，Node 20.19+/22.12+ | "Rspack 1.x" | `repos/rspack/packages/*/package.json` |
| Vue | 3.5.x（响应式改为版本计数 + 双向链表）；**Vue 3.6 不存在**；Vapor 未进主线（在 `vapor-alpha-branch`） | "Vue 3.6 已发布" | vuejs/core CHANGELOG |
| React | 19.3.0；19.2 引入 `<Activity>` / `useEffectEvent` / PPR resume；19.3 引入 `<ViewTransition>` / Fragment refs | "React 19.0 是最新" | facebook/react CHANGELOG |
| TC39 | 同步 Iterator Helpers 已进 ES2025，**异步版仍 Stage 2**；**Decorators 于 2026-05 退回 Stage 2.7**；Temporal 已 Stage 4 但**规范正文未合入**；Async Context 仅 Stage 2 | "装饰器已定稿""异步迭代器助手已进标准" | `repos/proposals/README.md`、`finished-proposals.md` |
| WebGPU | W3C **Candidate Recommendation Draft**（非 Recommendation）；规范仓是 `gpuweb/gpuweb` | "WebGPU 已是 W3C 标准" | w3.org/TR/webgpu |
| MCP 渐进式发现 / Code Mode | 写在 **2026-07-28 客户端最佳实践**（`docs/docs/2026-07-28/develop/clients/client-best-practices.mdx`）里，属**推荐做法**而非协议层强制；`Progressive Disclosure` 是 **Working Group**，章程明写"无权批准规范变更"，grouping / tool-search / code-mode 仅为**候选策略**。三层契约为 Catalog(`search_tools`) → Inspect(`get_tool_details`) → Execute，切换阈值建议为上下文窗口的 **1%~5%** | "MCP 规范已定义 tool search / 渐进式披露已是协议特性" | `repos/specification/docs/docs/2026-07-28/develop/clients/client-best-practices.mdx`、`repos/specification/docs/community/working-groups/progressive-disclosure.mdx` |
| 评测指标原始出处 | **BLEU** = Papineni et al., ACL 2002, pp. 311–318；**ROUGE** = Chin-Yew Lin, 2004（ROUGE-N/L）；**NDCG** = Järvelin & Kekäläinen, ACM TOIS 20(4), 2002, pp. 422–446；**PRM** = Lightman et al., *Let's Verify Step by Step*, arXiv:2305.20050（2023-05-31，过程监督在 MATH 上优于结果监督，模型解出 MATH 代表性子集 78%，开源 PRM800K 80 万条步骤级标注） | "PRM 是 2024 年的新方法" / 把 NDCG 当生成质量指标 / 把 BLEU 说成"已被淘汰" | aclanthology.org P02-1040 与 W04-1013、ACM TOIS 2002、arxiv.org/abs/2305.20050 |
| Wasm | Wasm 3.0 (2025) 为最新规范版本；WasmGC 的结构类型**已在核心规范正文** | "WasmGC 仍是独立提案" | webassembly.github.io/spec |
| 浏览器特性 | 必须分列**规范定稿 / 首个实现版本 / Baseline 状态与日期**三列 | 用"已支持"一笔带过 | web-features `data.json` + MDN BCD |
| 位置编码 | **RoPE** = arXiv:2104.09864（2021-04-20，Su Jianlin 等，《RoFormer: Enhanced Transformer with Rotary Position Embedding》）；**ALiBi** = arXiv:2108.12409（2021-08-27，Press Ofir 等，《Train Short, Test Long》）；**YaRN** = arXiv:2309.00071（2023-08-31，Peng Bowen 等）。RoPE 的内积只依赖**相对距离**，但**直接扩窗会退化**，必须用位置插值 / NTK-aware / YaRN 等缩放 | "位置编码就是把位置加进词向量"（那是 BERT 式绝对 PE，RoPE 不是）/ "RoPE 原生支持任意长度外推" / "ALiBi 也是一种位置 embedding" | arxiv.org/abs/2104.09864、/2108.12409、/2309.00071 |
| vLLM / 推理引擎 | **PagedAttention** 论文 = arXiv:2309.06180（2023-09-12，Kwon Woosuk 等），借鉴操作系统虚拟内存与分页；论文报告**同等延迟下吞吐提升 2~4 倍**（**官方声称，需按自身负载复现**）；**Continuous Batching** 的迭代级调度思路源自 **Orca**（USENIX OSDI '22，Yu Gyeong-In 等） | "vLLM 让模型生成更快"（提升的是**吞吐**不是单请求延迟）/ "PagedAttention 是一种注意力算法变体"（它是**显存管理**优化，不改输出） / 把 TTFT 与 TPOT 混成一个"延迟" | arxiv.org/abs/2309.06180、usenix.org/conference/osdi22/presentation/yu |
| A2A (Agent2Agent) | 传输 **HTTP(S) + JSON-RPC 2.0**（方法 `SendMessage`），媒体类型 **`application/a2a+json`**，版本协商走 **`A2A-Version` 请求头**（扩展走 `A2A-Extensions`）；核心对象 **Agent Card / Message / Part / Artifact / Task**，`contextId` 串联多轮上下文；当前发布版 **1.0.0**（历史版 0.3.0 / 0.2.6 / 0.1.0），**v1.0 有两项破坏性变更**（附录 A.2：移除多态对象的内联 `kind` 判别符、Extended Agent Card 字段迁移），版本不支持时返回 **400 + `application/problem+json` + `supportedVersions`**；治理归 **The Linux Foundation**（Apache 2.0），官方公告显示已加入 **Agentic AI Foundation**；**Artifact 的版本串联不属于规范**（由客户端维护） | "A2A 是 MCP 的替代品或升级版"（**A2A 连 Agent、MCP 连工具**，互补）/ "A2A 已定稿不会变" / "凭据要放进协议消息体"（应走 HTTP 头，与消息分离） / 用内联 `kind` 字段区分 Part 类型（v1.0 已移除） | a2a-protocol.org/latest、/latest/specification/（附录 A 迁移指引）、/latest/topics/a2a-and-mcp/ |
| 参数高效微调 LoRA / QLoRA | **LoRA** = arXiv:2106.09685（2021-06-17，Hu Edward 等，《LoRA: Low-Rank Adaptation of Large Language Models》）：冻结预训练权重、在每层注入可训练低秩分解矩阵；论文报告可训练参数量减少约 10000 倍、GPU 显存需求降低约 3 倍，**且因可合并回基座而无额外推理延迟**（这是与 adapter 的关键差别）。**QLoRA** = arXiv:2305.14314（2023-05-23，Dettmers Tim 等）：梯度穿过**冻结的 4-bit 量化基座**回传到 LoRA 适配器；三个组件为 **NF4（4-bit NormalFloat）**、**双重量化**、**分页优化器**；论文报告**单张 48GB 显卡微调 65B** 并保持 16-bit 全量微调的任务表现，Guanaco 在 Vicuna 上达 ChatGPT 的 99.3%（均为论文官方数字，需按自身负载复现）。**NF4 依赖权重近似正态分布这一前提**；**4-bit 只省显存不省算力**（前反向仍需反量化） | "QLoRA 让训练快了很多"（省的是显存不是算力）/ "4-bit 几乎无损" / 把 LoRA 说成"只训练最后一层" / 用微调给模型灌入新事实 | arxiv.org/abs/2106.09685、arxiv.org/abs/2305.14314、huggingface.co/docs/peft/index |
| ASR 转写指标 WER | **WER = (S + D + I) / N = (S + D + I) / (S + D + C)**，其中 S 替换、D 删除、I 插入、C 正确、N 参考词数；由**词级 Levenshtein 距离**（动态规划对齐）导出，0 为完美。官方指标卡明写：这类度量**不提供错误性质的任何细节**。因此 WER **对错误位置不敏感**、**分母随样本长度变化**，只能用于**同口径的引擎版本对比与回归门禁**，**不能当业务验收指标**；中文等无空格语言因缺词边界更常用 **CER**，报数必须声明口径 | "WER 降低必然意味着体验变好" / 把 WER 当业务验收指标 / 不声明中文是词级还是字级口径 / 忽略 D（删除）类错误反映的是端点检测切早 | huggingface.co/spaces/evaluate-metric/wer |
| 流式 ASR 局部一致策略 | **Whisper-Streaming**（Macháček / Dabre / Bojar，IJCNLP-AACL 2023，ACL Anthology `2023.ijcnlp-demo.3`）提出 **LocalAgreement-n**：**n 次连续更新（每次带来新音频块）对同一前缀达成一致即确认该前缀**；论文报告**自调节延迟**下在非分段长语音测试集上达 **3.3 秒延迟**（官方数字）。**该方案在 2025 年已被 SimulStreaming 取代**（官方称效率约快 5 倍，并在 IWSLT 2025 同时语音翻译共享任务取得最好成绩），**不可再当作当前唯一方案**。术语口径：**partial / hypothesis 可被后续音频推翻**，**committed / final 前缀冻结只追加** | "把 Whisper-Streaming 当成当前唯一实时方案" / "partial 和 final 差不多" / 认为 final 到达即代表整段结束（实为分段到达，需追加） | github.com/ufal/whisper_streaming、github.com/ufal/SimulStreaming、aclanthology.org/2023.ijcnlp-demo.3/ |
| Agent Skills 规范 | 官方规范（agentskills.io）：Skill 是含 `SKILL.md` 的目录，通过**渐进式披露（progressive disclosure）**三段加载——**Discovery**（启动只加载 `name` + `description`）→ **Activation**（匹配后读入完整 `SKILL.md`）→ **Execution**；**`description` 承担全部触发责任**，**规范对 description 有 1024 字符硬上限**。官方触发评测口径：**约 20 条查询（8~10 条 should-trigger + 8~10 条 should-not-trigger）**，负例须为**近似命中（near-miss）**；**每条跑多次（官方建议 3 次）取 trigger rate**，阈值起点 **0.5**；并需 **train / validation 划分**防止对着评测集过拟合。官方同时指出：**Agent 通常只对"超出自身能力范围"的任务考虑 skill**，简单请求不触发属正常 | "Skill 路由有一个专门的路由函数" / 用明显无关的负例充数 / 跑一次就判定通过 / 把"触发准确率"与"输出质量"混为一谈 | agentskills.io/home、/skill-creation/optimizing-descriptions、/specification |
| Prompt 压缩 | **LLMLingua** = arXiv:2310.05736（2023-10-09，Jiang Huiqiang 等，《LLMLingua: Compressing Prompts for Accelerated Inference of Large Language Models》）：**由粗到细的 prompt 压缩**，含**预算控制器（保语义完整性）**、**token 级迭代压缩**、**基于指令微调的分布对齐**，论文报告**最高 20 倍压缩、性能损失很小**（官方数字）。压缩是**独立于生成的研究问题**，常用**比主模型更小的专用模型**承担 | "压缩就是截断前 N 个 token" / "压缩一定用大模型才靠谱" / 把 20x 当作通用结论 | arxiv.org/abs/2310.05736 |
| RLHF / 对齐训练 | **InstructGPT** = arXiv:2203.02155（**2022-03-04**，Ouyang Long 等，《Training language models to follow instructions with human feedback》）：三段式 = **SFT**（人工示范）→ **奖励模型 RM**（对同一 prompt 的多个候选**做排序**，非绝对打分）→ **PPO** 策略优化；目标函数含**对 SFT 策略的 KL 惩罚**（防奖励黑客 / 跑偏）；论文摘要明确写「**1.3B 参数的 InstructGPT 输出被人类偏好胜过 175B 的 GPT-3，尽管参数少 100 倍**」——**这是论文自己的结论，须写「论文报告」**。**DPO** = arXiv:2305.18290（2023-05-29，Rafailov Rafael 等）：直接用偏好数据优化策略，**不训练独立 RM、不需要显式 RL 循环**。OpenAI 另有 **RFT（reinforcement fine-tuning）**：官方文档写明它「relies on a **programmable grader** that scores every candidate response」，与人工偏好对齐是两条不同路线 | "ChatGPT 就是拿 RL 训了下模型" / "RLHF 直接用人类打分当 reward" / "DPO 就是 DPO 论文里的 DPO"（DPO 是 2023 年论文，不是 RLHF 同义词） / 把 1.3B 胜过 175B 说成「小模型已经超过大模型」 | arxiv.org/abs/2203.02155、arxiv.org/abs/2305.18290、platform.openai.com/docs/guides/reinforcement-fine-tuning |
| Agent 记忆分层（学术口径） | **CoALA** = arXiv:2309.02427（**2023-09-05**，Sumers Theodore R. 等，《Cognitive Architectures for Language Agents》）：把 Agent 记忆拆为**工作记忆（working memory）** + **长期记忆三分（语义 semantic / 情节 episodic / 程序 procedural）**，语义记忆存世界事实、情节记忆存行为序列。**MemGPT** = arXiv:2310.08560（**2023-10-12**，Packer Charles 等，《MemGPT: Towards LLMs as Operating Systems》）：提出 **virtual context management**，借操作系统**分层内存**（快慢存储间搬运数据）的思路管理不同 **memory tiers**，用 interrupts 管理控制流 | "CoALA 的分类是短期 / 长期两分" / "MemGPT 就是给 LLM 加个长期记忆库" / 把会话级 / 任务级 / 项目级说成是论文里的原始术语（那是本库面向工程的分层，论文是认知科学口径） | arxiv.org/abs/2309.02427、arxiv.org/abs/2310.08560 |
| Agent 链路性能与可观测性（官方口径与链接漂移） | **OpenAI 延迟优化指南** = `platform.openai.com/docs/guides/latency-optimization`；**Anthropic Prompt Caching 文档** = `docs.anthropic.com/en/docs/build-with-claude/prompt-caching`（文档载明 **5m / 1h 两种缓存 TTL**）；**OpenTelemetry GenAI 语义约定已迁出主仓** → 现址为 `github.com/open-telemetry/semantic-conventions-genai`（覆盖 GenAI **spans / metrics / events**，并含 **MCP** 约定）；**vLLM 指标文档现址** = `docs.vllm.ai/en/latest/usage/metrics.html`（**旧路径 `serving/metrics.html` 已 404**） | "OTel GenAI 语义约定在 opentelemetry.io/docs/specs/semconv/gen-ai/"（该页现为 **Moved 空壳页**，只提示已迁移） / "vLLM 指标在 serving/metrics"（已 404） / 把 Anthropic 的 prompt cache TTL 说成只有 5 分钟（文档同时提供 1 小时） | opentelemetry.io 的 gen-ai 页 + github.com/open-telemetry/semantic-conventions-genai、docs.vllm.ai/en/latest/usage/metrics.html |
| 采样参数与复读机 | Hugging Face 官方生成参数中 **`repetition_penalty` 默认 1.0 表示不惩罚**（需显式调大才有约束力）；**`no_repeat_ngram_size` 是硬性禁止 n-gram 重复**，会破坏代码、JSON、报文等合法重复；`encoder_repetition_penalty` 只惩罚输入中未出现的序列 | "默认就开着重复惩罚" / "no_repeat_ngram_size 应该常开" / 把复读归因于"模型能力不足"（复读是**解码阶段**退化） | huggingface.co/docs/transformers/main/en/main_classes/text_generation |

**「规范定稿 / Chrome 推出 / Baseline」三者不可互相替代**——这是本库最容易写出自相矛盾答案的地方。典型反例：Anchor Positioning 的 `anchor()` 在 Chrome 125 已有，但整体 Baseline = false；View Transitions 已是 Baseline low，但 Firefox 至今没有 `@view-transition` 规则。

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
