---
title: Agent 系统面试证据合同
description: 将系统设计题、追问、作品证据、评分和下一项能力缺口连接成可复核记录。
---

# Agent 系统面试证据合同

这份合同把一次面试从“回答得像不像”变成可复核的证据链：

`question → follow-up → evidence artifact → score → next gap`

场景默认是带知识库、引用、租户权限、工具调用、恢复和人工确认的 Agent。样例使用合成资料，不包含个人履历、雇主材料或凭据。

## 运行

~~~bash
node scripts/validate-agent-interview-eval.mjs --self-test
node --test scripts/tests/agent-interview-eval.test.mjs
npm run test:agent-interview-eval
~~~

验证器会拒绝：

- 缺少问题、追问、证据定位或 SHA-256；
- 追问超过五条；
- 评分不在 0–4；
- 非 HTTPS 的 Workflow、Career 或评测链接；
- 证据引用不存在的问题；
- 将 `qualification` 标记为通过但 `mastery` 尚未通过。

## 评分边界

| 维度 | 证据要求 |
| --- | --- |
| Architecture | 能画出数据流、状态机、边界和非目标 |
| Security | 能证明 ACL 前置过滤、注入防护和人工门 |
| Reliability | 能处理超时、响应丢失、幂等、checkpoint 和恢复 |
| Evaluation | 能定义 golden/bad case、引用正确率和回归门禁 |
| Communication | 能讲清取舍、失败归因和未支持边界 |

`qualification` 只描述岗位准入，`mastery` 描述学习者能否无提示解释、实现、调试和迁移。两者必须独立记录。

## 与其他资产的连接

- [Workflow #651](https://github.com/zenHeart/workflow/issues/651)：任务、路线、学习事件和复盘；
- [Career #211](https://github.com/zenHeart/careers/pull/211)：Agent 岗位能力与项目合同；
- [evals #35](https://github.com/zenHeart/evals/issues/35)：统一评测证据；
- [learn-llm Capstone](https://github.com/zenHeart/learn-llm/pull/13)：RAG、MCP、恢复和评估；
- [learn-python](https://github.com/zenHeart/learn-python/pull/5)、[learn-java](https://github.com/zenHeart/learn-java/pull/2)、[learn-go](https://github.com/zenHeart/learn-engineering/pull/14)：语言实现路径。

每次面试记录都应至少关联一个可读 artifact、一个故意失败样例和一个下一步能力缺口。通过面试题不等于完成真实岗位作品；真实作品通过也不自动授予掌握状态。
