---
applyTo: "**/*.md"
---

# 前端面试回答规范

## 1. 目录与内容组织

- **题库（docs）**  
  - 一级目录为科目（Subject），如 `01.01.js`、`02.html`，命名格式 `<序号>.<科目名>`。
  - 科目下为主题（Topic），文件命名 `<序号>.<主题名>.md`，如 `01.type.md`。
  - 主题文件内为问题（Knowledge），以二级标题 `##` 标记，需带问题ID（如 `{#p0-question-id}`）。
  - 复杂主题可拆分为子主题，命名如 `03.02.bundler-webpack.md`。

- **公司（company）**  
  - 每家公司单独文件，内容结构参考 `contributors/template/03.company.md`。

- **贡献者文档（contributors）**  
  - 包含项目说明、工作流、题目标准、模板等，便于协作和规范化。

## 2. 内容格式化规范

- 标题：主题用一级标题 `#`，问题用二级标题 `##`。
- 代码块必须指定语言（如 ` ```js `）。
- 列表统一使用 `*`。
- 表格需对齐，标题行下有分隔线。
- 答案用 `<Answer>` 标签包裹，支持 `meta` 属性（如难度、预计时间）。
- 代码示例可用代码块、`<Sandpack>` 或 `<TestCode>` 组件。
- 延伸阅读用列表，注明资源名称、链接、简要说明。
- 特殊提示用 `:::tip:::`, `:::warning:::`, `:::note:::`。

## 3. 问题与答案标准

- 问题需符合收录标准（详见 `contributors/03.good_interview_question.md`），各评分维度至少6分。
- 答案结构应包含：核心概念、详细解释、代码示例、延伸阅读。
- 答案内容简明扼要，200-300字，代码示例简洁实用。
- 若涉及表格，确保表格尽量紧凑，删除不必要的空格和 `-` 符号。

## 4. 文件命名与目录规范

- 主题文件：`xx.xx.topic-name.md`
- 问题ID：`{#p0-question-id}`，p0-p4表示优先级/难度。
- 目录、文件命名需英文，序号两位数字，保持连续性。
- 图片放在主题相关 assets 目录，引用用相对路径。

## 5. 工作流与协作

- 新增主题/问题前，先查重，确保无重复内容。
- 主题/问题添加、重构、优化流程详见 `contributors/02.workflow.md`。
- 优化模板、流程需兼容现有内容，提 issue 说明理由。

## 6. 参考模板

- 主题模板：`contributors/template/02.topic.md`
- 问题模板：`contributors/template/01.question.md`
- 公司模板：`contributors/template/03.company.md`

## 7. 其他

- 所有 PR 须符合上述规范，CI 检查目录命名、内容格式。
- 详细规则见 `.cursor/rules` 目录。

如有疑问，先查阅 `contributors` 目录文档，或提 issue 讨论。
