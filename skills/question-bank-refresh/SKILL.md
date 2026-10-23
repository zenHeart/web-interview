---
name: question-bank-refresh
description: 每日增量刷新 web-interview 题库的标准作业流程（SOP）：从数据源镜像、真题差集分析、deep-research 采集、按 interview-question-architect 规范出题、question-lint 与 build 门禁、gh-pages 部署、README 考题索引与数据源基线同步。当需要"更新题库/补充真题/对齐 zencareer 面经/巡检题库过期断言"时使用本技能，不要凭记忆写版本号或出题。
---

# 题库增量刷新技能（Question Bank Refresh SOP）

本技能是 `web-interview` 题库的**日常增量维护作业标准**。它把「采集 → 差集 → 出题 → 门禁 → 部署 → 回写索引」固化成可重复执行的流水线，并把每一步的**已知坑**写在明面上，避免下一轮重踩。

执行本技能前先读：
- `skills/interview-question-architect/SKILL.md` —— **出题与答案架构的权威规范**（本技能只管流程，规范以它为准）
- `contributors/authoritative-sources.md` —— **数据源 SSOT + 版本基线快照**（所有版本断言以此为准）
- `docs/06.03.ai/README.md` —— 学科导读与考题索引（新增题必须回写）

---

## 0. 铁律（违反即返工）

1. **不凭记忆写版本号。** 任何「X 框架第几版 / Y 提案第几阶段 / Z 规范是否定稿」的断言，必须回 `repos/` 本地镜像或官方原文核对后再写。真实教训：MCP 协议版本曾长期写 `2024-11-05`，而 2026-07-28 已是**无状态大版本**（移除 `initialize` 握手、Roots/Sampling/Logging 废弃、`tasks` 降级为扩展、服务端发起请求改为 MRTR）——照抄旧写法等于教错。
2. **真题必须有出处。** 每道新题要能定位到：牛客面经帖 URL，或 `repos/<仓>/<相对路径>:<行号>`。L3 聚合站只能当线索，不能当事实源。
3. **`<Answer>` 内禁止任何 Markdown 标题。** 区块用 `**核心结论:**` / `**原理解析:**` / `**规范实现:**` / `**面试官视角:**` / `**延伸阅读:**`。
4. **锚点唯一且规范。** `{#p0~p5-全小写字母数字连字符}`，全库不得重复。
5. **新增题必须回写索引。** `docs/06.03.ai/README.md` 的「核心主题与考题索引」与全景图，否则索引与正文脱节。
6. **不泄露凭据。** `GH_TOKEN` / `gh auth` 只从环境变量与 keychain 取；仓库内、Skill 内、报告内一律不写 token、cookie、私钥。提交前必须扫一遍。
7. **不删历史。** 远端分支一律保留；禁止 `git branch -D` / `git push --delete` / `--force`（`gh-pages` 由部署脚本按既有契约推送，不额外操作）。

---

## 1. 环境准备

```bash
export PATH="/usr/local/bin:$PATH"   # node / npm / pnpm / gh 都在 /usr/local/bin
cd /Users/chengle/code/github/web-interview
```

**工作区约定**：源码分支是 `main`，构建产物分支是 `gh-pages`。**在 `main` 上工作**，用隔离 worktree，不要在 `gh-pages` 上改源码。

需要**两个** worktree，因为 `scripts/deploy.sh` 硬性要求「当前分支是 `main`」，而同一个分支不能被两个 worktree 同时检出：

```bash
git fetch origin --prune

# A) 长期保留的 main 工作区（部署用）
git worktree add ../.worktrees/web-interview-main -b main origin/main   # 已存在则跳过

# B) 当天的一次性工作区（改题库用，分支名带日期避免撞车）
git worktree add ../.worktrees/qb-refresh-$(date +%Y%m%d) -b feature/question-bank-refresh-$(date +%Y%m%d) origin/main
cd ../.worktrees/qb-refresh-$(date +%Y%m%d) && pnpm install
```

> ⚠️ `main` 上**没有** `pnpm-lock.yaml`，所以不能用 `--frozen-lockfile`。用 `pnpm install`（corepack 固定 `pnpm@9.15.4`）即可；装出来的 `pnpm-lock.yaml` 不要提交。
>
> ⚠️ 部署工作区也要 `pnpm install`——`deploy.sh` 会在那里跑 `npm run build`，没有 `node_modules` 直接失败。

---

## 2. 刷新数据源镜像（`repos/`）

`repos/` 是本地数据源镜像，**已在 `.gitignore`，不入库**。刷新脚本：

```bash
bash skills/question-bank-refresh/scripts/refresh-sources.sh
```

镜像分两类：

| 类别 | 用途 | 克隆方式 |
| :--- | :--- | :--- |
| **L2 真题仓** | 挖真题题面（带热度/出题公司标注的 pro-collection 系列价值最高） | `--depth 1` |
| **L0 官方仓** | 核对版本断言、规范原文、CHANGELOG | `--depth 1 --filter=blob:none` |

> **坑 1**：`--filter=blob:none` 的仓读文件时会触发按需下载，**必须联网**；离线环境会读失败。此时改用 `web_fetch` 取官方原文。
> **坑 2**：目录名是**扁平化**的 `repos/<basename>`，没有 `tc39/`、`vuejs/` 这类组织层级，且不同仓可能撞名（如 `awesome-interview-questions` 与 `MaxAbramchuck/awesome-interview-questions` 同名）。克隆前先看目录是否已存在。
> **坑 3**：部分仓**已停更**（`vuejs/rfcs` 停在 2023-10、`vuejs/core-vapor` 声明不再维护、`proposal-signals` 停在 2025-08）。**停更仓不能作为一手依据**，只能作背景参考。

---

## 3. 真题差集分析（决定「补什么」）

### 3.1 三条数据流

```
[1] zencareer 面经快照  careers/resume/2026/jobs/agents/mianjing.json   （E 层，本机一手）
[2] 牛客面经帖          nowcoder.com 只读抓取                            （L2，一线真题）
[3] 本地题库仓          repos/interview-question/ 等                     （L2，滞后但带热度）
                          |
                          v
              [4] 与 docs/ 现有题目标题做差集
                          |
                          v
              [5] 布鲁姆过滤 + 岗位画像加权  ->  候选新题清单
```

### 3.2 差集脚本

```bash
python3 skills/question-bank-refresh/scripts/gap-audit.py
```

它会输出：**面经题对题库的覆盖打分**（低分 = 高概率未覆盖）与**主题级空白清单**。

> **坑 4（最容易犯）**：做覆盖判定时**必须只扫「题目标题 + slug」**。若扫全文，`import ... from '!!raw-loader!...'` 引入的代码正文、`memory`/`stream`/`rag` 这类词会把覆盖率算成 100%，得到「全覆盖」的假结论。第一轮就是因为扫全文而误判为「零缺口」。
> **坑 5**：行为题与 HR 题（"为什么没留用""怎么学习新技术"）天然低分，**不是缺口**——本库定位是技术面试题库，行为题另见 `docs/99.interview/`。

### 3.3 牛客只读抓取要点

牛客帖子是 SSR 渲染，**正文在 HTML 内联 JSON 里**，不在 `<article>` 标签中：

- 字段优先级：`content` > `desc`（`desc` 常是截断预览）
- 正则：`"desc":"((?:[^"\\]|\\.)*)"` / `"content":"..."`，取值后 `json.loads('"'+raw+'"')` 反转义
- 部分帖子 `data-server-rendered="true"` 且正文直接落在 `nc-slate-editor-content` 里，可用 HTML 兜底
- 抓取要**逐个 URL 抓、逐个落盘**，不要一次打包；单页 HTML 可达 50KB+，直接读会冲掉上下文

```bash
python3 skills/question-bank-refresh/scripts/fetch-nowcoder.py <url> [<url>...]
```

> **坑 6**：牛客有频控，连抓会返回不含正文的骨架页。**看到 `TITLE: 牛客网 - 找工作神器` 就是没抓到正文**，换 URL 或隔开重试。
> **坑 7**：`web_fetch` 抓牛客会被截断（50KB 中段被丢），而正文常在中段。**抓牛客一律用脚本落盘后定向 grep，不要用 web_fetch 整页读。**

---

## 4. 采集（deep-research）

按 `/deep-research` 的 D-S-C-C-S 流程执行，**三路并行**：

| 路 | 目标 | 产出 |
| :--- | :--- | :--- |
| **A. 一线真题** | 牛客 + zencareer 面经快照 | 候选题面 + 出处 + 出现次数 |
| **B. 本地语料** | `repos/` 里的题库仓 | 候选题面 + 仓内路径行号 + 热度/出题公司 |
| **C. L0 核验** | 官方规范/CHANGELOG/官网 | 版本基线 + 证据路径 + 反证检查 |

**C 路（版本核验）的必查清单**（每条都要给「直接断言 / 官方声称 / 未核实」三档措辞）：

- MCP：当前协议版本、该版本相对上一版的破坏性变更、哪些能力已 Deprecated
- 构建工具：Vite / Rolldown / Rspack / Biome 的当前主版本与迁移要点
- 框架：React / Vue 的当前版本与最近两个小版本的新特性
- TC39：finished 表的「Expected Publication Year」↔ ES 版本映射；**特别核 Stage 3/2.7 的「看起来快定稿实际被退回」项**
- 浏览器特性：分列「规范定稿 / 首个实现版本 / Baseline 状态与日期」
- 底座：WebGPU 规范状态（W3C CR Draft ≠ Recommendation）、Wasm 规范版本、WasmGC 是否已进核心规范

> **坑 8**：`reactjs/rfcs` 仓 `pushed_at` 停在 2024-06，**已合入 RFC 文本只到 0227**；`use` 的 RFC 至今仍是 open PR。**不能**写"`use` 出自 reactjs/rfcs RFC #xxx"。
> **坑 9**：厂商性能与兼容性宣称（「10-30x faster」「full plugin compatibility」）是**利益相关方陈述**，写成「官方声称」，不写成事实；官方自己的兼容性矩阵里若存在 "Partially compatible" 条目，要一并说明。
> **坑 10**：**克隆的官方仓也可能停更**。`vuejs/core-vapor` 的 README 指向的 `vapor` 分支已不存在——**先读仓的 README 再信它的指向**。

---

## 5. 出题与回写

1. 每道新题先过 `skills/interview-question-architect/SKILL.md` 的**五维质量评估**（有效性/信度/区分度/时间合理性/贴近实际），五维都 ≥6 才收录；
2. 题目必须是**面试官口吻**、**单一考点**、含疑问代词或真实情境；
3. 答案按**答案金字塔**写：`核心结论` → `原理解析` → `规范实现` → `面试官视角`（含追问链）→ `延伸阅读`；
4. MDX v3 兼容：正文不得出现未转义的 `<数字`（写「小于 100ms」或用反引号），反引号内不得有裸 `${...}`；
5. **回写 `docs/06.03.ai/README.md`**：全景图节点 + 「核心主题与考题索引」条目；
6. 涉及版本断言的题目，**同步更新 `contributors/authoritative-sources.md` 的「版本基线快照」表**。

---

## 6. 门禁（必须全绿才允许提交）

```bash
cd /Users/chengle/code/github/.worktrees/web-interview-refview 2>/dev/null || cd <worktree>
node scripts/question-lint.js          # 锚点格式/重复 slug；WARN 也要清零
python3 skills/question-bank-refresh/scripts/spec-audit.py   # TOC 纯净度 / MDX 转义 / 答案金字塔
npm run typecheck
npm run build                         # Docusaurus 构建 0 错误
```

再自查：
- 新增/修改的 `docs/**/*.md` 里 `<Answer>` 外无游离的 Markdown 标题；
- 全文搜索未转义的 `<` + 数字；
- 锚点全库唯一：`grep -rho '{#[pP][0-5]-[^}]*}' docs/ | sort | uniq -d` 的结果里，**README 索引复述属正常**（仓库既有结构），真正要关注的是**同一文件内**重复。

> **坑 13（构建报 ENOENT 但内容没问题）**：`build/` 目录残留时，Docusaurus 可能显示「Server: Compiled successfully」后抛
> `ENOENT: ... open 'build/__server/server.bundle.js'`——**这不是 MDX 错误**，是产物目录脏了。清干净再构建：
> ```bash
> npm run clear
> rm -rf "$PWD/build" "$PWD/.docusaurus"     # 必须用绝对路径
> npm run build
> ```
> 相对路径的 `rm -rf build` 在某些受管 shell 下会被安全策略拦下，导致脏目录没清掉、构建继续失败。
>
> **坑 14（自检脚本的判定口径）**：`spec-audit.py` 判 ERROR 的只有三类——`<Answer>` 内出现 Markdown 标题、正文出现 `<` **紧跟**数字（`< 100ms` 带空格是安全的）、**纯正文**出现 `${...}`（围栏代码与行内反引号里都是字面量，安全）。答案金字塔与字数偏差只报 WARN，因为旧文档大量使用「核心概念 / 机制说明」等变体。
>
> **坑 15（镜像刷新会被网络拖死）**：`git clone` / `git fetch` 在网络拥塞时可能**长时间挂住**（实测一次 `biome` 的 fetch 挂了几分钟），整轮刷新就此卡住。脚本已内置三道保护：`GIT_TERMINAL_PROMPT=0`（禁止交互式凭据提示）、`http.lowSpeedLimit=1000 / lowSpeedTime=30`（传输过慢主动中断）、以及单仓墙钟看门狗 `CLONE_TIMEOUT`（默认 300 秒，超时放弃该仓并继续下一个）。**不要为了让脚本「跑完」而删掉这些保护**——单仓失败是可接受的，整轮卡死不可接受。
>
> **坑 16（串行刷 22 个大仓会把整轮墙钟吃光）**：看门狗只保证「不挂死」，不保证「跑得完」。22 个 L0 大仓（`rolldown` / `rspack` / `universe` / `specification` …）串行更新，每个最长 90s，一轮就是 30 分钟以上——实测直接吃满 3000s 超时，**一个新仓都没补上**。
> 正确做法（已落地在 `refresh-sources.sh`）：
> - **克隆优先于更新**：新仓带来新考点，旧仓更新只是保鲜，先保证覆盖面；
> - **分批并行**：默认 4 并发（macOS 自带 bash 3.2 没有 `wait -n`，用「分批 `wait`」实现）；
> - **`SKIP_UPDATE=1`**：只补齐不更新，网络拥塞时用。
> 实测 34 个仓（12 真题仓 + 22 L0 官方仓）**4 分钟内补齐**，其中 `openai-agents-python` / `whatwg-html` / `vercel-ai` 三个仓 HEAD 为当日。
>
> **坑 17（镜像放按日期新建的工作区里，每晚会重克隆 1.2GB）**：每日任务的工作区是 `qb-refresh-<日期>`，镜像若跟着工作区走，每晚都要把 34 个仓重新克隆一遍、结束时再删一遍 1.2GB。
> 正确做法：**镜像放持久共享目录，工作区里用符号链接指过去**。
> ```bash
> SHARED=/Users/chengle/code/github/.cache/web-interview-repos
> mkdir -p "$(dirname "$SHARED")"
> [ -d "$SHARED" ] || mv "$WT/repos" "$SHARED"     # 已有镜像直接搬过去
> cd "$WT" && ln -sfn "$SHARED" repos
> REPOS_DIR="$SHARED" bash skills/question-bank-refresh/scripts/refresh-sources.sh
> ```
> 两个配套细节：
> - `.gitignore` 里要写 `repos`（**不带尾斜杠**）——目录模式 `repos/` 不匹配符号链接，会让它变成未跟踪文件；
> - 脚本里统计仓数要用 `ls -1 "$REPOS"` 而不是 `find ... -type d`——`find` 默认不跟随符号链接，会数成 0。
>
> **坑 18（在别的 worktree 里 `git checkout -B main` 会悄悄弄坏 main 工作区）**：分支引用 `refs/heads/main` 是**所有 worktree 共享**的。在 A 工作区执行 `git checkout -B main origin/main`，git 会把 `main` 引用推到新提交，但**不会更新已经检出 main 的 B 工作区的索引与文件**——B 工作区的 `git status` 于是显示一堆「已暂存的修改」（内容其实是旧版本），而 `git pull` 却说「Already up to date」。
> 后果很阴险：部署工作区一旦带脏状态，`scripts/deploy.sh` 会直接拒绝执行（要求工作区干净），而看起来又「已经是最新的」。
> 正确做法：**要更新 main 工作区就进到它里面操作**——
> ```bash
> git -C /Users/chengle/code/github/.worktrees/web-interview-main fetch origin --prune
> git -C /Users/chengle/code/github/.worktrees/web-interview-main pull --ff-only origin main
> ```
> 其它工作区一律用**带日期的独立分支名**（`feature/question-bank-refresh-<日期>`），永远不要在它们里面动 `main`。
> 万一已经弄脏，`git restore --source=HEAD --staged --worktree -- .`（**不要**用 `git reset --hard`）即可复原，内容不会丢——因为改动早已在提交里。
>
> **坑 19（镜像刷新的 update 阶段会跑超 1 小时，必须与采集并行）**：坑 15/16 只覆盖了「单仓不挂死」和「补齐不超时」，但**「补齐 + 全量更新」合起来仍然会超时**。2026-10-20 实测：34 个仓全部已存在（clone 阶段瞬间完成），光 update 阶段就**跑满 60 分钟仍未结束**（理论上限 34 ÷ 4 × 120s ≈ 17 分钟，实际远超——大仓 `git fetch --depth 1` 的看门狗是软约束）。
> 正确做法：
> - **采集与镜像刷新并行**：update 阶段丢后台跑，主流程直接用**已有镜像**做采集与 L0 核验，不要串行等它；
> - 镜像已齐时用 `SKIP_UPDATE=1`（只补齐不更新）——多数轮次不需要保鲜；
> - 需要更新时**分两次跑**：`bash refresh-sources.sh l0` 与 `bash refresh-sources.sh l2`；
> - 提高 `CONCURRENCY`（默认 4，可设 8）换取更短墙钟。
> **镜像是否健康，用「各仓最后提交时间」判断，不要用「脚本是否跑完」判断**——脚本被超时杀掉时，镜像里已更新的那部分仓依然是新的（2026-10-20 实测：超时后 34 仓齐全，biome / rolldown / rspack / vite / vercel-ai / openai-agents-python 等关键 L0 仓均为当日或前日，`specification` 为 2026-10-17，足够支撑版本断言）。
>
> **坑 20（`gap-audit.py` 的主题探针有假阳性，报空白后必须手工 grep 复核）**：探针是**固定的正则短语匹配**，语序一变就漏判。实测：探针把「同域并发连接数」判为空白，但 `docs/08.network/04.http/01-http-basics.md:566` 实际已写「同域最多 6 个并行连接」——探针正则 `同域.*并发` 匹配不到「同域最多 6 个并行连接」这种语序。
> **处置：探针报出的每个空白项，录题前都要手工 `grep` 一遍正文确认**。否则会对已覆盖的主题重复出题，破坏「同文件内锚点唯一」并稀释题库。
>
> **坑 21（`mianjing.json` 的 `company` 字段不是信源层级，要读 `source_url`）**：`company` 标着「题库」的条目，`source_url` 实际分两类——
> - **L2 可用**：`github.com/youngyangyang04/llm-master/...`、`raw.githubusercontent.com/zgd716/AgentGuide/...`、`zchary1106.github.io/agent-interview-hub/...`（GitHub 原始仓 / Pages）；
> - **L3 只能用做线索**：`developer.aliyun.com/article/...`、`developer.cloud.tencent.cn/article/...`、`gitcode.csdn.net/...`（大厂开发者社区转载）。
> 2026-10-20 实测：「Harness Hill-Climbing」只出自 aliyun（L3）且**在 34 个镜像仓里 0 命中**，无 L0/L1/L2 佐证 → **不录**；而「BLEU/ROUGE 的局限」「过程指标」出自 GitHub 原始仓（L2）→ **可录**。
> **判断信源层级要读 `source_url`，不能读 `company`**。L3 来源的题面不得直接录成真题，除非另找 L0/L1/L2 出处。
>
> **坑 22（论文级断言也要回原文核对，别凭记忆写年份）**：「某方法是哪一年提出的」和「框架第几版」是同一类风险。实测：容易写成「PRM 是 2024 年的新方法」，而原文是 Lightman 等 **2023-05-31** 的 arXiv:2305.20050《Let's Verify Step by Step》，开源 PRM800K（80 万条步骤级标注），且其结论**限于数学推理任务**（MATH），不可外推为「所有业务 Agent 都该上 PRM」。
> 核对入口：arXiv `https://arxiv.org/abs/<id>`（abs 页含 authors / submitted 日期 / 摘要 / BibTeX）、ACL Anthology `https://aclanthology.org/<id>/`（含 venue / 页码 / 作者）。
>
> **坑 23（`web_search` 挂掉时，`web_fetch` + `curl` 照样能核原文，且更省上下文）**：`web_search` 偶发返回 `MATRIX_TOOL_REQUEST_FAILED`。此时直接取官方页面即可：
> - `web_fetch "https://arxiv.org/abs/2305.20050"` —— 拿到 authors、submitted 日期、摘要；
> - `curl -sL <url> | grep -iE "citation_author|citation_date|<title>" | sed 's/<[^>]*>//g'` —— 比整页 `web_fetch` 省得多，ACL Anthology 走这个套路能一次核到 venue / 页码 / 作者。
> 注意 `web_fetch` 会把整页塞进上下文，**大页面一律用 `curl` + `grep` 定向取字段**。
>
> **坑 24（MCP 规范站有两套 URL 前缀，别拼错）**：
> - 规范正文树：`https://modelcontextprotocol.io/specification/2026-07-28/...`（如 `changelog`、`basic/index`）；
> - 文档树（client-best-practices、architecture 等在 `docs/docs/<version>/develop/clients/`）：`https://modelcontextprotocol.io/docs/2026-07-28/develop/clients/client-best-practices`。
> 把文档树拼成 `/specification/<version>/develop/...` 会 **404**（实测）。从镜像仓找路径时对应关系是 `repos/specification/docs/docs/<version>/develop/clients/*.mdx` → 站点 `/docs/<version>/develop/clients/*`。用 `curl -sL -o /dev/null -w "%{http_code}"` 逐个探活再写进「延伸阅读」。

---

## 7. 提交与部署

```bash
git add -A && git diff --cached | grep -nE "gh[pousr]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY" && echo "WARN: 疑似凭据" 
```
命中即**停止提交**，先清理。

```bash
git commit -m "feat(docs): 补充 <主题> 面试题并同步索引（<日期>）"
git push origin feature/question-bank-refresh
```

部署由 `scripts/deploy.sh` 完成，它要求：
- 当前分支是 `main`、工作区干净；
- 存在名为 `web` 的远端（`git remote add web git@github.com:zenHeart/web-interview.git`）与 `origin` 远端；
- 脚本自身会 `npm run build` 并把产物推到 `gh-pages`，并写入 `deployment-meta.json` 记录源 commit。

> **坑 11**：`web` 远端默认**不存在**，部署前要先 `git remote add web <url>`。
> **坑 12**：部署脚本要求**在 `main` 分支上**且工作区干净，所以流程是：功能分支改完 → 合到 `main` → 在 `main` 上跑部署。
> **坑 25（部署后立刻 curl 可能拿到 CDN 旧页，误判成"部署失败"）**：`blog.zenheart.site` 前面挂了 CDN，响应头带 `cache-control: max-age=600` 与 `x-cache: HIT`。2026-10-20 实测：`deploy.sh` 推送成功（`gh-pages` 已前进、`deployment-meta.json` 的 `sourceCommit` 正确），但紧接着 curl 两个内容页，新锚点**全部 grep 到 0 个**；再过一两分钟重查，全部命中。
> **处置：线上校验失败时，先看 `last-modified` 与 `x-cache` 头再下结论**——
> ```bash
> curl -sI "https://blog.zenheart.site/web-interview/docs/ai/protocols-ecosystem/" | grep -iE "last-modified|x-cache|age"
> ```
> `last-modified` 早于本次部署的构建时间 = 拿到的是旧缓存，**等 1~2 分钟或加 cache-busting 查询串重查**；`last-modified` 已更新却仍无锚点，才是真失败。
> **另外别只校验内容页**：本次实测中 README 学科索引页**先**更新（命中 1），内容页**后**更新（先 0 后 1）——两者不同步是常态，**五个锚点都要逐个查，且以内容页为准**。
>
> **坑 26（`skills/` 下的改动也要走完整部署回路）**：本技能的坑列表、`references/sources.md` 不在站点构建范围内，但**改了它们就要重新走「提交 → PR → squash 合 main → 在 main 工作区 deploy」**，否则 `deployment-meta.json` 记录的 `sourceCommit` 会落后于 `main` HEAD，可追溯性断链。代价是一次约 3 分钟的 build，值得。
>
> **坑 27（牛客正文抽取失败与 host 无关，判据是 `content` 字段在不在）**：2026-10-21 实测，同一帖子用 `api-cdn.nowcoder.com` 与 `www.nowcoder.com` 抓，**返回的是同一后端的同一结果**——两者的字节数与 `content` 字段数完全一致。所以**不存在「换个 host 就能绕过」这回事**，别在这上面浪费时间。真正的失败形态有两种：
> - `TITLE: 牛客网 - 找工作神器` = 整页骨架（原坑 6）；
> - **标题正常但 `(未抽取到正文)`** = 页面拿到了、SSR 内联 JSON 的 `desc`/`content`/`richText` 没抽到（本次实测同一 URL 首次失败、约 1 分钟后重试即恢复）。
>
> 处置：**判据是抓下来的 HTML 里有没有 `"content":"` 字段**，不是 URL host；失败就隔开重试（同 URL 重试即可，无需换源）。另注意 `fetch-nowcoder.py` 的 `extract_blocks` 只收长度 > 40 的块，**正文极短的帖子会被判成「未抽取到正文」**，此时先看原始 HTML 再下结论。
>
> **坑 28（牛客「汇总帖」是有效 L2 出处，但正文可能被作者自己截断）**：`discuss/860538803759386624`（AI-Agent 面试题汇总）这类汇总帖的 `content` 字段长度是**作者粘贴时的上限**（实测恰好 11500 字符，且结尾停在代码块中间）。**抓到的正文「戛然而止」不一定是抓取失败，可能是原帖就这样**——重试无用，别把时间花在「补全正文」上。汇总帖里成组的真实题面（如位置编码、复读机、vLLM、A2A）依然是可用的一线出处。
>
> **坑 29（`question-lint.js` 的重复锚点检测是「按文件」的，不是全库）**：`scripts/question-lint.js` 里 `const seen = new Map()` 在 `lintFile()` **内部**创建，因此它只拦**同一文件内**的重复锚点；跨文件的重复锚点不会报错——这正是各学科 README 索引可以复述锚点的原因（实测全库有 96 种锚点跨文件重复）。
> 后果：**question-lint 全绿 ≠ 锚点全库唯一**。新增题目后仍要自己确认全局唯一：
> ```bash
> grep -rho '{#[pP][0-5]-[^}]*}' docs/ | tr 'A-Z' 'a-z' | sort | uniq -d
> ```
> 命中项里绝大多数是「README 索引复述 + 正文定义」这一对，属仓库既有结构；**只需确认新加的锚点没有第三处出现**。
>
> **坑 30（`gap-audit.py` 的主题探针报空白后，仍要分「假阳性」与「真空白」两类处置）**：2026-10-21 实测两个报空白的项，处置方式完全不同：
> - 「同域并发连接数」= **假阳性**（坑 20 再确认）——`docs/08.network/04.http/01-http-basics.md` 已写「同域最多 6 个并行连接」，探针正则匹配不到这种语序；
> - 「延时消息 / 内存态持久化」= **真空白**（正文里只有 webpack 延迟队列的代码示例，语义无关），但**本轮仍不录**——不是不能录，而是**没有 L2 一线出处**（2026 面经池里无信号）。
>
> 处置准则：**真空白 + 有 L2 出处 → 录；真空白 + 无 L2 出处 → 记进缺口清单，不硬凑**。宁可留缺口，也不要为填空白而自拟题面。
>
> **坑 31（数学结论要在自己的实现上跑一遍才算核过）**：像「RoPE 的注意力内积只依赖相对距离」这类结论，光看论文不够。2026-10-21 用 TypeScript 复刻 `ropeRotate` 并数值验证：整体平移后内积差 **1.22e-8**（float32 精度内），而改变相对距离内积变化 **9.04e-1**——结论与实现同时成立。**面试官追问「怎么证明」时，能当场跑出这两组数字比背公式强得多。**
> 核对时注意主流实现的两个细节：**半拆分布局**（`x[:d/2]` 与 `x[d/2:]`）与 **频率公式 `invFreq = base^(-2d/dim)`**，两者共同决定数值，别写错成交错配对。
>
> **坑 33（用 heredoc / 脚本批量写中文，可能悄悄写入 U+FFFD 替换字符，且仓库里已有存量）**：`cat >> file <<'EOF'` 与 `python3` 写文件在处理中文时**偶发把某个汉字写成 `U+FFFD`（码点 U+FFFD）**，且**文件能正常渲染、构建全绿、lint 全绿**——只有肉眼读那一句才会发现。2026-10-22 实测：`docs/06.03.ai/05.runtime-internals.md` 的「重试一个必然失败的请求」里的「的」在 **origin/main 里就已经是 `U+FFFD`**（2 个替换字符），已在线上站点存在多日，本轮顺带修掉。
> 处置：**每次批量写完中文正文，必须全库扫一次替换字符**（这是最便宜的"内容体检"）：
> ```bash
> python3 - <<'PY'
> from pathlib import Path
> bad = 0
> for p in list(Path('docs').rglob('*.md')) + list(Path('contributors').rglob('*.md')) + list(Path('skills').rglob('*.md')):
>     n = p.read_text(encoding='utf-8', errors='replace').count('\ufffd')
>     if n:
>         print(f"CORRUPT {p}: {n}")
>         bad += n
> print("total:", bad)
> PY
> ```
> 输出 `total: 0` 才算通过。**注意这个检查要覆盖 `origin/main` 已有的存量**——先跑一次全库扫描再动手改，能把"我新引入的"和"历史遗留的"分开归因。

> **2026-10-23 复现补充（重要）**：同一个坑在本轮**再次发生**，且暴露出一个更隐蔽的细节——**一个汉字会被替换成 _两个_ U+FFFD**（实测「清单」的「单」（U+5355）被写成 `U+FFFD U+FFFD`）。后果是：**「把 U+FFFD 删掉」并不等于修复**，删完会留下一个缺字的句子（「已开采清的唯一权威来源」），**而且 lint、spec-audit、构建全绿**——它们都不检查这个。正确处置：**按上下文把原字补回去**，不能只删。
> 写完中文正文的**固定动作**（每轮都要做，不能省）：
> ```bash
> python3 -c "
> from pathlib import Path
> bad=0
> for p in list(Path('docs').rglob('*.md'))+list(Path('contributors').rglob('*.md'))+list(Path('skills').rglob('*.md')):
>     t=p.read_text(encoding='utf-8',errors='replace')
>     for i,l in enumerate(t.split(chr(10)),1):
>         if chr(0xFFFD) in l: print(f'{p}:{i}: {l.strip()[:150]}'); bad+=1
> print('suspect lines:', bad)
> "
> ```
> 命中后**逐处人工读上下文补字**，不要批量替换。

> **坑 34（未开采牛客帖的最快发现路径：mianjing.json 的 `sources` 里藏着全部帖 id）**：`mianjing.json` 每条记录的 `sources` 数组**列出了该题被哪些帖子引用过**，把这些 URL 里的 nowcoder 帖 id 去重，得到的就是**该语料池涉及的全部牛客帖**（2026-10-22 实测 385 条记录共指向 **14 个 distinct 帖 id**）。与 `references/sources.md` 里已记录的高价值帖**取差集**，差集就是**尚未开采的真题帖**——本轮据此一次挖到 6 个未开采帖（字节 AI Agent 开发岗面经、网易 agent 测试一二面、字节 ai agent 评测实习生、Shopee AI 开发二面等），开出 6 道新题。
> 这个路径比 `gap-audit.py` 更直接：`gap-audit` 告诉你「哪些主题覆盖不足」，但**帖 id 差集告诉你「哪份原文还没读过」**——后者往往藏着成组的真题题面。
> ```bash
> python3 - <<'PY'
> import json, os, re, collections
> d = json.load(open(os.path.expanduser("~/code/github/careers/resume/2026/jobs/agents/mianjing.json"), encoding="utf-8"))
> ids = collections.Counter()
> for x in d:
>     for s in x["sources"] + [x["source_url"]]:
>         m = re.search(r"nowcoder\.com/(?:feed/main/detail|discuss)/([A-Za-z0-9]+)", s)
>         if m: ids[m.group(1)] += 1
> print(len(ids), "distinct nowcoder posts")
> for pid, n in ids.most_common(): print(pid, n)
> PY
> ```

> **坑 35（覆盖度打分必须用 CJK bigram，按空白切词会把中文题全部低估）**：做差集时若用 `re.split(r'\W+', q)` 切词，中文整句会变成**一个 token**（因为 `\w` 在 Python 里匹配 CJK），于是「上下文压缩」这种题拿去匹配正文必然命中 0，**所有中文题的覆盖率都会塌到 0.1 以下**，得出「几乎全是缺口」的假结论。
> 正确做法：**中文按 2-gram 切，英文按词切**：
> ```python
> def grams(s):
>     s = re.sub(r"[^\w\u4e00-\u9fff]+", " ", s.lower())
>     out = set()
>     for w in s.split():
>         if re.search(r"[\u4e00-\u9fff]", w):
>             out.update(w[i:i+2] for i in range(len(w) - 1)); out.add(w)
>         elif len(w) >= 3: out.add(w)
>     return out
> ```
> 语料**仍然只扫「题目标题 + slug」**（坑 4 不变），只是切词方式要换。

> **坑 36（`spec-audit.py` 整目录跑只打印前 20 条 WARN，要定位必须逐文件传参）**：脚本第 121~125 行写死了 `for p in warns[:20]`，末尾还打印「另有 N 条」。所以**整目录跑一次只能看到前 20 条**，无法判断「自己新加的题有没有引入 WARN」。
> 处置：**逐文件传参跑**（一次一个文件，WARN 数量小到能全看完），再按 `Answer#N` 的编号**对照题目顺序**判断是不是自己新增的那道：
> ```bash
> for f in docs/06.03.ai/0*.md; do
>   echo "### $f"; python3 skills/question-bank-refresh/scripts/spec-audit.py "$f" 2>&1 | sed -n '/WARN/,$p' | tail -n +2
> done
> ```
> 2026-10-22 实测：5 个改动文件的 WARN 全部是 `Answer#1`~`Answer#6` 缺「规范实现」的**历史存量**，新增的 6 道题**一条 WARN 都没有**。

> **坑 37（找官方文档子页的最短路径：先试 `llms.txt`）**：需要在官方文档站定位某个具体子页时，**先取 `https://<site>/llms.txt`**——它通常是一份全站 Markdown 索引（含每个子页的标题、描述与精确 URL），比逐个猜路径或站内搜索快得多。
> 2026-10-22 实测：`https://agentskills.io/llms.txt`（13 行）直接给出了 `Evaluating skill output quality`（`/skill-creation/evaluating-skills.md`）、`Optimizing skill descriptions`（`/skill-creation/optimizing-descriptions.md`）等子页，且这些子页**直接给 `.md` 原文**，用 `curl` 取回就是纯文本，比解析 HTML 省事得多。

> **坑 32（链接探活只看 HTTP 状态码，会漏判「迁移后的空壳页」）**：文档站搬家时，旧域名常保留一个 **返回 200 但没有正文的壳页**（JS 跳转或 meta refresh）。2026-10-21 实测：`langchain-ai.github.io/langgraph/` 返回 **200 但整页只有 757 字节**，内容是一段 "Documentation has moved" 跳转提示；真正的文档已迁到 `docs.langchain.com`。
> 后果：**只看 `curl -w '%{http_code}'` 会以为链接有效**，但读者点进去拿不到资料；而且这类页里 `grep` 不到任何正文关键词，用「搜关键词」的方式校验也会误判为「页面没这内容」。
> 处置——**探活要同时看状态码与正文体量/关键词**：
> ```bash
> for u in <url>; do
>   curl -sL -o /tmp/p.html -w "%{http_code} %{size_download} $u\n" "$u"
>   grep -oiE "<期望出现的关键词>" /tmp/p.html | sort -u | head -3
> done
> ```
> 判据：状态码 200 **且** 体积明显大于壳页量级 **且** 能 grep 到期望关键词。2026-10-21 据此把 `docs/06.03.ai/03.agent-engineering.md` 的 3 处 LangGraph 链接（含 2 处既有链接）迁到 `docs.langchain.com`。
>
> **更省事的做法：整目录批量扫**。一次跑完某个学科的外链，把「非 200」与「体积过小」两类都捞出来，比逐条点链接快得多：
> ```bash
> python3 - <<'PY' > /tmp/links.txt
> import re, pathlib
> urls=set()
> for p in pathlib.Path('docs/06.03.ai').glob('*.md'):
>     for m in re.finditer(r'\]\((https?://[^)\s]+)\)', p.read_text(encoding='utf-8')):
>         urls.add(m.group(1))
> print("\n".join(sorted(urls)))
> PY
> while read -r u; do
>   read -r code size <<<"$(curl -sL -o /tmp/lp.html -w '%{http_code} %{size_download}' --max-time 20 "$u")"
>   { [ "$code" != 200 ] || [ "${size:-0}" -lt 3000 ]; } && printf "%-4s size=%-8s %s\n" "$code" "$size" "$u"
> done < /tmp/links.txt
> ```
> 2026-10-21 实测：`docs/06.03.ai` 84 条外链里捞出 5 类问题——**2 类真坏链**（`anthropic.com/research/evaluating-llm-models` 已 404，改用 `/engineering/evaluating-ai-systems`；`sbert.net/examples/cross_encoder/applications/semantic-search.html` 已 404，改用同目录 `README.html`）、**2 类空壳页**（LangGraph、AutoGen 的站点根）、**其余是误报**。
>
> **扫出来的东西必须逐个判「真坏」还是「环境问题」，别照单全收**：
> - `iana.org/.../application/pdf` 体积只有 1.3KB —— 那是 IANA 注册表的正常体量，**不是坏链**；
> - `zustand-demo.pmnd.rs` 817 字节 —— 是 JS 单页应用外壳，**正常**；
> - `chatgpt.com`、`nist.gov` 返回 000 —— 是**本机代理节点不可达**，不是链接坏了（同 URL 在浏览器能开），**不要改**；
> - `openai.com/...` 返回 403 —— Cloudflare 拦爬虫，浏览器可开，**不要改**；
> - `dl.acm.org/doi/...` 返回 403 —— 同理。
>
> 处置准则：**只改能确证「目标资源已不存在」的链接**（404 且站内无替代路径），**不因本机网络受限或反爬就改链接**。

> **坑 38（定时任务启动时，先扫所有遗留工作区的 `git status`，别只看当天那个）**：2026-10-23 批次启动时发现，`qb-refresh-20261022` 工作区里躺着**上一轮已写完但从未提交**的 6 道题（9 个文件、+1025 行），质量很高、引用齐备，但**因为上一轮在提交前中断，工作就悬在工作区里**——既没进 `main`，也没进远端。
> 后果：如果按「建当天工作区 → 干活 → 提交」的标准流程走，这些成果会被**下一次 `git worktree remove` 静默销毁**（worktree remove 会连同未提交改动一起删掉）。
> 处置（每轮开头必做）：
> ```bash
> for d in /Users/chengle/code/github/.worktrees/qb-refresh-*; do
>   [ -d "$d" ] || continue
>   echo "=== $d"; git -C "$d" status --porcelain | head
> done
> ```
> 发现有未提交改动时：**先在它自己的分支上提交并 push 保底**（不要 `worktree remove`，不要 `--force`），再走门禁 → PR → squash 合并 → 清理。合并顺序上建议**先合旧批次再基于新 `main` 开当天批次**，避免两批都改 `docs/06.03.ai/README.md` 时撞行。
>
> **坑 39（未开采帖的差集基准要读 `references/sources.md`，不能靠记忆）**：坑 34 的「帖 id 差集」法要拿 `mianjing.json` 的 post id 全集**减去已开采清单**。已开采清单的唯一权威来源是 **`skills/question-bank-refresh/references/sources.md` 里的牛客批次表**，不是上一轮任务自己的记忆——上一轮已经开采了 6 个新帖，2026-10-23 再按记忆算差集会**重复开采同一批帖**。2026-10-23 实测：`mianjing.json` 共 385 条、**14 个 distinct post id**，扣掉已记录的 8 个后**只剩 6 个未开采**，本轮全部开采完。⚠️ **2026-10-24 复核发现该结论不成立——当时只记录了 11 个 id，仍有 3 个从未开采**（其中 `470262180567400448` 引用数高达 72，是语料池里最多的一个）。**详见坑 46。**
>
> **坑 40（信号榜条数 ≠ 可出题数，每条都要做覆盖判定）**：`zchary1106.github.io/agent-interview-hub/question-signals.html` 是 L2 面经信号站（带独立来源数、公司、轮次标注），2026-10-23 实测共 **12 条信号**，逐条与 `docs/06.03.ai/` 现有 60 题比对后：
> - **已被覆盖、直接放弃**：#1 工具边界、#3 Coding 验证、#4 Agent 评测、#5 RAG 分层定位、#6 四层职责、#8 重试幂等、#10 结构化输出、#11 Agentic RL、#12 路径震荡与无进展循环（**「无进展检测 + 循环指纹熔断」已写在既有「Agent = Model + Harness」题的执行循环一节里**）；
> - **可出题**：#2 记忆分层（→ 本轮 `{#p1-agent-memory-persistence-layers}`）、#9 链路延迟与成本（→ 本轮 `{#p1-agent-chain-latency-cost-optimization}`）。
> **结论：12 条信号里真正能出题的只有 1~2 条**。不要因为「信号很多」就规划很多题。
>
> **坑 41（链接探活要识别「Moved 空壳页」，并把 200 + 大体积当成不充分条件）**：`opentelemetry.io/docs/specs/semconv/gen-ai/` 返回 **200、体积 172KB**，但正文整页只是「**GenAI semantic conventions have moved to the OpenTelemetry GenAI semantic conventions repository**」的迁移提示——**规范的任何条目都不在页面上**。判据要再加一条：**正文里能否 grep 到期望的规范条目**（本例应有 span / metric 属性名），只有「200 + 体积大 + 标题不含 Moved」还不够。
> 同时本轮修掉两条**真漂移**：
> - vLLM 指标文档：`docs.vllm.ai/en/latest/serving/metrics.html` → **404**，现址是 `docs.vllm.ai/en/latest/usage/metrics.html`（用坑 37 的 `llms.txt` 路径一次命中）；
> - OTel GenAI 语义约定 → 迁到独立仓 `github.com/open-telemetry/semantic-conventions-genai`（该仓 README 写明覆盖 **spans / metrics / events**，并含 **MCP** 约定）。
> - **2026-10-24 追加一例**：vLLM 的投机解码文档，**`/en/latest/features/spec_decode/` 返回 200 但只有 816 字节**（空壳），真址是 **`/en/latest/features/speculative_decoding/`**（213KB），且其下还有子页 **`/acceptance_metrics/`**（讲生产环境怎么观测接受率）。**教训不变：`spec_decode` 这类「缩写路径」最容易被生成出来，但常常不存在**——**探活必须同时看体积与关键词**，只看 200 会误判。
>
> **坑 42（arXiv 日期以页面 `citation_date` meta 为准，不要凭印象写月份）**：本轮差点把 InstructGPT 记成「2022-03-16」，实际 **v1 是 2022-03-04**。一条命令核到 title / author / date 三件套：
> ```bash
> curl -sL https://arxiv.org/abs/2203.02155 | grep -oE '<meta name="citation_(title|author|date)" content="[^"]*"'
> ```
> 同一条命令还纠正了另外两处易错点：**DPO 是 2023-05-29**（不是 5 月初）、**CoALA 是 2023-09-05**、**MemGPT 是 2023-10-12**。论文**正文**里的机制细节（PPO、KL 惩罚项、CoALA 的记忆分类术语）要去 **ar5iv 全文**核：`curl -sL https://ar5iv.labs.arxiv.org/html/2309.02427`，只读 abstract 会漏掉这些。
>
> **坑 43（核证类子任务自己跑比委托可靠）**：2026-10-23 尝试把 4 组 L0 核证委托给子 Agent，**20+ 分钟零输出**，最终自己用 `curl + grep` 在几分钟内核完全部条目（见坑 42 的命令）。**核证是本任务的核心门禁，不能等一个不可观测的异步结果**；要么自己做，要么就明确接受「核不到就整条不录」。
>
> **坑 44（同一个站点的子页面 ≠ 全部：`question-signals.html` 只是 Agent Interview Hub 主站的极小子集）**：2026-10-23 用 `zchary1106.github.io/agent-interview-hub/question-signals.html`（12 条信号）选题，并据此写下「这条线索基本用尽」。**2026-10-24 发现同一个站的主站 `index.html` 才是主矿**：约 1.35MB、**50 个 `<section class="content-section">`**、展开后共 **715 条编号条目、约 500 组带答案的 Q&A**，每条带**难度（⭐）与频率（★）标注**和「参考答案」正文。**单站开出 7 道新题。**
> - **提取要点（每一条都踩过）**：
>   - `index.html` 的每个 section 里是**完整正文**；**`data-search` 属性只放约 200 字符的摘要，绝不能当正文用**——这是最容易误判「正文被截断」的地方。
>   - `new.html`（约 1.7MB）的导航是 `<button data-target="通用知识-XXX">`，它指向的正文**同样在 `index.html` 的 section 里**，不在 `new.html` 自己身上。
>   - 抽正文前必须先把 `<br>` 还原成换行、把块级标签闭合还原成换行，再剥标签；否则整篇会挤成一行，正则全部失配。
>   - 题目形态是 `N. 问题` 开头，**「参考答案：」出现在标题的下一行**（不是标题里带 `A：`）。
> - **通用做法**：遇到「某聚合站已用尽」的结论，**先把该域名下的其它页面列一遍**（`curl` 首页 + 找 `<a href>`），再决定是否放弃。
>
> **坑 45（Hub 里的题必须先过滤，否则会把 LeetCode 题和行为题录进 AI 模块）**：Agent Interview Hub 覆盖 15+ 家公司，混着大量**算法题（题干带 "LeetCode 103"）**、**公司战略题（"你对美团的 AI 战略怎么看"）**、**行为/HR 题（"怎么学习一门新技术"）**、以及**纯训练侧深度学习题（反向传播、梯度消失、CUDA warp、分布式训练）**。
> - 处置：先用一个 BAD 正则把「算法题 / 行为题 / 公司战略题」整段剔掉，**再做覆盖判定**；训练侧深度学习题**默认不录**（与既有口径一致，见 `references/sources.md` 缺口表里「数据并行 / DeepSpeed」那条先例）。
> - **更隐蔽的一种污染**：抽出来的「答案」里夹着大量 `A：` 开头的补充说明和 bullet，**它们不是题面**。只按「以问号结尾」过滤仍会混进 bullet 行——2026-10-24 实测，未过滤前 495 条候选里有一半是答案碎片；加上问号过滤 + BAD 正则后降到 **152 条真题**，再按 CJK 2-gram 覆盖度排序才拿到 7 道可录的。
>
> **坑 46（不要凭「某来源已用尽」下结论——先重算差集，再区分「没开采过」与「开采了但没价值」）**：2026-10-23 在 `references/sources.md` 写下「牛客 post id 线索**已彻底用尽**（15 个 id 全部开采过）」。2026-10-24 重算差集发现：`mianjing.json` 实际只有 **14 个** distinct id，而当时只记录了 **11 个**，剩下 3 个（`470262180567400448` **72 次引用，是语料池里最高的一个** / `c1e2eb280ad3496cb7886cd1bf75c80d` / `b234d314e00548f8883782b51c362c04`）**从未开采**。
> - 逐帖核完结论：这 3 个帖对 AI 模块**零价值**（全是前端通用 + 行为/HR 题，已被 `docs/01.js`、`docs/02.html`、`docs/05.02.vue` 覆盖，行为题按坑 5 本就不算缺口）——**但上一轮「彻底用尽」的判断本身是错的**。
> - 处置：**「线索用尽」这类结论必须用差集脚本重算后再写**，且要分两种状态记录：「**从未开采**」与「**开采了但无价值**」——后者也要写进去，否则下轮会重复挖一遍。
> - 附带修正：坑 34 / 坑 39 里写的「15 个 distinct id」也是**沿用了错误计数**，正确值是 **14 个**。
>
> **坑 47（核验模型结构时，`config.json` 是最省事的一手证据，但 Llama 系会 401）**：核「某模型用没用 GQA / MoE 开了几个专家」时，HF 的模型配置是**可机读**的最快路径：
> ```bash
> curl -sL "https://huggingface.co/mistralai/Mixtral-8x7B-v0.1/raw/main/config.json" \
>   | python3 -c "import json,sys; c=json.load(sys.stdin); print({k:c[k] for k in ['num_attention_heads','num_key_value_heads','num_local_experts','num_experts_per_tok'] if k in c})"
> ```
> 2026-10-24 实测一次拿到 `num_attention_heads=32 / num_key_value_heads=8 / num_local_experts=8 / num_experts_per_tok=2`。
> - ⚠️ **`meta-llama/*` 系列会返回 401**（Meta 仓库是 gated）——此时改用**论文里的 Table**：Llama 2 论文 Table 1 有专门的 GQA 列（34B/70B 为 ✓，7B/13B 为 ✗），arXiv HTML 版 `https://arxiv.org/html/2307.09288v2` 可直接 grep。
> - 配套：**取 arXiv 全文优先试 `https://arxiv.org/html/<id>v<n>`，比 `ar5iv` 稳**——2026-10-24 实测 ar5iv 返回 `000`（连接超时），arXiv HTML 版一次拿到 163KB 全文并 grep 成功。
>

---

## 8. 复盘（每轮结束必做）

每轮刷新后，把**新发现的坑**回填到本技能（尤其第 3、4 节的「坑 N」列表），把**新的版本基线**回填到 `contributors/authoritative-sources.md` 的版本基线表。技能的价值来自累积，**不要写成一次性文档**。

---

## 参考

- `references/sources.md` —— 数据源清单、克隆 URL、采集脚本用法、已知缺口
- `scripts/refresh-sources.sh` —— 数据源镜像刷新
- `scripts/gap-audit.py` —— 面经差集与主题空白分析
- `scripts/fetch-nowcoder.py` —— 牛客面经只读抓取
