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

---

## 8. 复盘（每轮结束必做）

每轮刷新后，把**新发现的坑**回填到本技能（尤其第 3、4 节的「坑 N」列表），把**新的版本基线**回填到 `contributors/authoritative-sources.md` 的版本基线表。技能的价值来自累积，**不要写成一次性文档**。

---

## 参考

- `references/sources.md` —— 数据源清单、克隆 URL、采集脚本用法、已知缺口
- `scripts/refresh-sources.sh` —— 数据源镜像刷新
- `scripts/gap-audit.py` —— 面经差集与主题空白分析
- `scripts/fetch-nowcoder.py` —— 牛客面经只读抓取
