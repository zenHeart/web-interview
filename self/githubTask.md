# 问题交互（点赞 / 点踩 / 评论）设计文档

## 目标 / 背景

站点包含大量“面试问题”条目，需要在“问题粒度”实现：

1. 点赞（Upvote）/ 点踩（Downvote）。
2. 独立评论区（或跳转讨论）。
3. 统计数据稳定依赖 questionId，不受文档重排、分类迁移、合并拆分影响。
4. 尽量利用 GitHub 生态（Discussions / Issues + Reactions），减少自建后端；在后期需要更强控制时可平滑过渡到 Serverless/KV。

本设计提供：需求拆解 → 技术方案 → 数据与流程 → 实施计划（可落地） → 风险与扩展。

---

## 术语定义

| 名称 | 含义 |
| ---- | ---- |
| Question | 单个面试题（页面中的一个条目） |
| questionId | 全局唯一、稳定标识（不依赖文件路径或排序） |
| Discussion | GitHub 讨论，用于承载某 Question 的互动数据 |
| Reaction | GitHub 中的点赞/点踩（THUMBS_UP / THUMBS_DOWN） |
| Snapshot | 构建或定时生成的聚合静态 JSON（批量元数据） |

---

## 核心需求拆解

### 功能性 (FR)

1. 展示每个问题的：up 数、down 数、评论数。
2. 用户可在站内发起点赞/点踩（登录后）；重复点击同一方向=取消，点击相反方向=切换。
3. 评论：初期可跳 GitHub Discussion；后期可内嵌加载列表。
4. questionId 与 GitHub Discussion 一一映射；位置变动不影响映射。
5. 首屏快速：批量元数据静态加载，再按需增量刷新。
6. 未登录可查看统计；交互需登录 GitHub。
7. 脚本化增量创建缺失 Discussion；无需手工逐个开贴。

### 非功能性 (NFR)

1. 性能：单页面出现大量问题组件时 ≤1 次静态请求 + 懒加载增量；交互延迟 < 500ms（乐观更新）。
2. 稳定：内容大规模重排后统计仍正确。
3. 安全：不在前端硬编码 PAT；OAuth 处理在 serverless（可选阶段）。
4. 可维护：脚本/Action + 缓存文件清晰；结构允许未来迁移到自建存储。
5. 速率控制：匿名访问主要走静态 Snapshot，减少直击 API。

### 范围外 (Out of Scope / 暂缓)

- 富文本内联编辑评论。
- 多维度排序/推荐算法（后续扩展）。
- 复杂权限（当前仅公共内容）。

---

## 总体方案概览

阶段化策略：

1. MVP：生成 questionId + 创建 Discussions + 静态快照 + 页面只读展示（点击跳讨论）。
2. 交互增强：站内投票（OAuth）+ 乐观更新。
3. 评论内嵌：懒加载讨论内容（或 iframe → API 渲染）。
4. 优化与扩展：排行、热度、个性化统计。

核心设计点：

- 存储载体：GitHub Discussions，每 Question 一个 Discussion（分类：Questions）。
- 投票：使用 Discussion 的 reactionGroups（THUMBS_UP / THUMBS_DOWN）。
- 评论：Discussion replies 原生能力。
- 快照：GitHub Action 定时/Push 生成 static/data/q-meta.json。
- 运行时增量：仅对用户交互或滚动到视口的问题做实时刷新。

---

## 方案细节

### 1. questionId 生成

优先级：frontmatter 显式 id > 既有映射缓存 > 自动生成。

自动生成规则：

1. slug = 标题（lowercase + 去空格/符号）。
2. 内容主体（去 Markdown 标记）做 sha1，取前 6 位 base36。
3. questionId = q_${slugPrefix}_${hash6}（控制长度 < 30，超长标题截断）。

生成与缓存：
运行脚本 scripts/generate-question-ids.ts 扫描所有问题，
在原 Markdown frontmatter 写入 id（若缺失）或产出一个映射 JSON（避免污染源文件亦可二选一）。

### 2. GitHub Discussion 映射

Title 规范: [qid:{questionId}] {Readable Title}

Discussion Body 头部元数据：

```yaml
---
questionId: q_xxx
source: docs/01.js/xxx.md#anchor
contentHash: 3fa4c2d
createdAt: 2025-08-01T12:00:00Z
---
```

映射文件：.cache/question-discussions.json

结构：{ [questionId]: { discussionNumber, discussionId } }

### 3. 数据模型（前端）

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
type QMeta = {
   id: string
   up: number
   down: number
   comments: number
   discussionNumber: number
}
type UserVoteState = 'up' | 'down' | 'none'
```

快照文件 static/data/q-meta.json：QMeta[] 列表或 {version, generatedAt, metas: {[id]: QMeta}}

### 4. 快照生成流程（GitHub Action）

步骤：

1. checkout 代码；node scripts/generate-question-ids.ts
2. node scripts/sync-discussions.ts （缺失则 createDiscussion GraphQL）
3. 批量 GraphQL 查询所有 discussion（分页）聚合 reactionGroups + comments.totalCount
4. 写入 static/data/q-meta.json（或 build 后复制到 build/assets/data）
5. 若创建了新讨论/更新映射 → 提交 PR 或直接 push（可配置）

### 5. 前端运行时流程

1. 页面加载：并行获取 q-meta.json（带 ETag）。
2. 渲染每个 Question 组件（仅显示静态计数）。
3. IntersectionObserver 监测进入视口 → 若用户已登录或刚交互，则调用单讨论实时查询（GraphQL discussion(number)）。
4. 用户点击投票：本地乐观 → 调用 add/removeReaction → 成功保持，失败回滚。
5. 评论按钮：MVP 跳转 Discussions 链接；增强阶段懒加载内嵌。

### 6. 投票逻辑状态机

| 当前状态 | 点击 Up | 点击 Down |
| -------- | ------- | --------- |
| none | add(UP) → up+1 | add(DOWN) → down+1 |
| up | remove(UP) → up-1 | remove(UP)+add(DOWN) → up-1, down+1 |
| down | remove(DOWN)+add(UP) → down-1, up+1 | remove(DOWN) → down-1 |

### 7. GraphQL 关键请求

单讨论聚合：

```graphql
query QMeta($owner:String!,$repo:String!,$number:Int!){
   repository(owner:$owner,name:$repo){
      discussion(number:$number){
         id
         reactionGroups{content users{totalCount} viewerHasReacted}
         comments{ totalCount }
      }
   }
}
```

添加 / 移除 Reaction：addReaction / removeReaction（ReactionContent = THUMBS_UP | THUMBS_DOWN）。

### 8. OAuth / 鉴权

MVP：不做站内 OAuth，点击投票跳转到 Discussion 页面用户自己点 👍/👎。

增强：

1. 配置 OAuth App（回调指向 serverless: /api/oauth/callback）。
2. serverless 交换 code → access_token（最小 scope：public_repo 或 discussions:write 若可用细粒度）。
3. 前端存储短期 token（内存 + 刷新页失效）或 HttpOnly Cookie。
4. 使用 token 发 GraphQL mutation。

### 9. 组件结构

```text
QuestionEngage
   ├── VoteButtons
   ├── CommentEntry (跳转或内嵌加载器)
   └── useQMeta(questionId)
```

useQMeta：

- 初始：从快照内查找。
- refresh(number): 调 GitHub API 覆盖更新。

### 10. 缓存策略

| 层级 | 内容 | 失效策略 |
| ---- | ---- | -------- |
| 静态快照 | 全量元数据 | 每次 Action 运行刷新（cron/PR） |
| localStorage | 单问题增量元数据 | 10 分钟 TTL |
| 内存 Map | 会话内热数据 | 页面存活周期 |

### 11. 错误处理

| 场景 | 策略 |
| ---- | ---- |
| 403 rate limit | 回退快照数据 + 提示“稍后重试” |
| addReaction 失败 | 回滚 UI；若 401 清除登录态 |
| Discussion 缺失 | 标记“待创建”，下次 Action 自动补齐 |
| 快照缺少某问题 | 动态显示占位，交互触发 refresh 尝试补拉 |

### 12. 风险与缓解

| 风险 | 描述 | 缓解 |
| ---- | ---- | ---- |
| Discussion 数量膨胀 | 问题 > 1w 造成 GitHub 管理噪声 | 归档老问题/分仓库/合并至 batched 模式 |
| 速率限制 | 批量实时刷新耗配额 | 快照 + 懒加载 + 节流(批 20) |
| OAuth 复杂度 | 需要 serverless | 分阶段，先跳转 GitHub 页面 |
| ID 冲突 | 自动生成可能重复 | 加 hash + 检查缓存重试 |
| 内容大改 | 内容哈希变化导致难回溯 | 保留 contentHash 历史（可选日志 JSON） |

### 13. 可演进路径

1. Reactions → 迁移到 KV：运行一次同步脚本把计数写入 KV，前端切换 API 基础 URL。
2. 评论：保留 Discussion 作为“归档”，新系统写入自建存储后可双写一段时间。

---

## 实施计划（按阶段）

### 阶段 0：准备（0.5d）

1. 新建评论/互动仓库（若与主仓库分离）。
2. 开 Discussions + 建分类 Questions。

### 阶段 1：ID 与映射（1d）

1. 编写 scripts/generate-question-ids.ts 扫描 docs 目录。
2. 生成/补写 frontmatter id 或生成 mapping JSON。
3. 初次运行并提交。

### 阶段 2：创建 Discussions（1d）

1. scripts/sync-discussions.ts：读取映射，缺失的 createDiscussion。
2. 写 .cache/question-discussions.json。
3. Action: 手动触发测试；成功后加 cron(每小时/每日)。

### 阶段 3：快照与前端只读（1d）

1. 批量 GraphQL 拉取统计写 static/data/q-meta.json。
2. 新建组件 QuestionEngage（仅展示，含跳转链接）。
3. 在渲染 Question 的地方引入组件。

### 阶段 4：站内投票（1.5d）

1. serverless OAuth（Cloudflare Worker / Vercel）实现 code→token。
2. 前端添加 VoteButtons + 乐观更新 + 状态机。
3. 节流/错误处理与缓存。

### 阶段 5：内嵌评论 (可选 1d)

1. 简单：iframe Discussion。
2. 进阶：GraphQL 拉取前 20 条 + 分页加载。

### 阶段 6：扩展与优化（持续）

1. 排行榜静态页（Action 生成）。
2. 热度算法（up+down+log(comments)）。
3. 监控：记录 API 错误率与速率剩余。

---

## 里程碑 / 验收标准

| 里程碑 | 验收点 |
| ------ | ------ |
| M1 ID 稳定 | 重排/改路径后计数不变 |
| M2 映射完整 | 所有问题存在 discussionNumber |
| M3 快照上线 | 首屏一次请求加载全部统计 |
| M4 投票可用 | 登录后上下切换正确、错误回滚 |
| M5 评论可访问 | 每问题有跳转/内嵌评论 |

---

## 最小可行版本 (MVP) 详细

1. 生成 questionId。
2. 创建 Discussions（缺失补齐）。
3. 生成 q-meta.json（up/down/comments）。
4. 前端显示统计 + 跳转评论按钮。
5. 不做站内投票（用户到 GitHub 点 Reaction）。

---

## 参考实现文件结构（建议）

```text
scripts/
   generate-question-ids.ts
   sync-discussions.ts
   fetch-discussion-stats.ts
src/components/QuestionEngage/
   index.tsx
   useQMeta.ts
   voteLogic.ts
static/data/q-meta.json (生成)
.cache/question-discussions.json (内部)
cloudflare-worker/
   oauth.js (可选)
```

---

## 示例：投票按钮伪代码

```ts
/* 伪代码：投票状态切换（示例，不在生产中直接使用）
function toggleVote(target: 'up' | 'down') {
   const prev = state.userVote
   const next = deriveNext(prev, target)
   applyOptimistic(next)
   mutateGitHub(prev, next).catch(() => rollback(prev))
}
*/
```

---

## GraphQL 片段汇总（附录）

添加 Reaction:

```graphql
mutation Add($subjectId:ID!,$content:ReactionContent!){
   addReaction(input:{subjectId:$subjectId,content:$content}){
      subject{ id }
   }
}
```

移除 Reaction:

```graphql
mutation Remove($subjectId:ID!,$content:ReactionContent!){
   removeReaction(input:{subjectId:$subjectId,content:$content}){ subject{ id } }
}
```

---

## 风险回顾与后续演进

短期主要风险在速率与 OAuth 复杂度；通过阶段化（先只读+跳转，再站内交互）降低一次性实现成本。后续若增长到数万问题，可考虑：

1. 将投票计数迁移至轻量 KV（Cloudflare Workers KV / Upstash Redis），每晚与 GitHub 对账。
2. 评论继续留在 Discussions 作为主线程记录。

---

## 附：参考链接

- https://utteranc.es/
- https://giscus.app/
- https://docs.github.com/en/graphql
- https://docs.github.com/en/rest

---

如需：

1) 生成脚本初稿；2) GitHub Action workflow 样例；3) 前端组件骨架 —— 可继续指令。
