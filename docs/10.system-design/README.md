# 系统设计

**学科目标**

- 建立一套可落地的系统设计方法论与清单，覆盖从需求澄清、容量预估、数据建模、缓存与存储、负载均衡与 CDN、消息与流式、可用性与弹性治理、可观测性与 SLO，到演进与权衡。
- 所有题目遵循贡献模板与答案规范：问题标题需带锚点 `{#P?-question-id}`，答案使用 `<Answer>` 并包含四区块（核心概念、示例说明、面试官视角、延伸阅读）。

**学习路径**

1. 方法论与流程 → 2. 容量与算量 → 3. 缓存策略 → 4. CDN/LB → 5. 存储与一致性 → 6. 队列/流式 → 7. 可用性与弹性 → 8. 实时通道与背压 → 9. 可观测性与 SLO

**目录（收敛为 5 个主题）**

- [01.methodology-capacity.md](./01.methodology-capacity.md) — 方法论/容量/SLO/治理
- [02.delivery-cache.md](./02.delivery-cache.md) — CDN/LB/渲染与缓存/边缘
- [03.storage-consistency.md](./03.storage-consistency.md) — 存储/分区/幂等/一致性
- [04.integration-apis.md](./04.integration-apis.md) — BFF/API/鉴权/上传/安全
- [05-realtime-resilience.md](./05-realtime-resilience.md) — 实时/队列/回压/可观测
- [06.system-architecture.md](./06.system-architecture.md) — 非系统设计类架构问题承载

:::tip 关联学科

- 架构（Architecture）：分层/边界、组件化、微前端/隔离、工程与治理
- 网络（Network）：HTTP、DNS、TCP、TLS 基础
:::
