# APM/RUM 最小可行方案（VMP）

目标：以最低成本覆盖前端核心监控需求（性能、错误、请求、PV），2 周内落地可用，便于后续演进。

## 1. 指标范围

- 性能：LCP、CLS、FID/INP、TTFB、资源加载耗时（Top 资源）。
- 稳定性：JS 错误、资源错误、未处理 Promise 拒绝、白屏率（简单探针）。
- 请求：成功率、P95 耗时、错误码分布。
- 行为：PV、路由切换（SPA）。

## 2. 端侧 SDK（<8KB gzip）

- 采集：PerformanceObserver（回退 timing）、error/unhandledrejection、xhr/fetch 勾子、`history.pushState`/`popstate`。
- 发送：优先 `navigator.sendBeacon`，退化 `fetch`；批量（20 条/5s），页面不可见/卸载时 flush。
- 可靠：IndexedDB 简单离线缓存（最多 1MB，TTL 24h），指数退避重试；上报体积限制与分片。
- 采样：会话采样（默认 20%），错误与严重慢请求全量。
- 脱敏：URL 去 Query，字段黑名单；UA、IP 仅服务端解析。

## 3. 接入与后端

- 接入：CDN + API 网关；校验 `productId` 与时间戳；限流与压缩（gzip）。
- 消息：Kafka（或云托管 Pub/Sub）按租户与事件类型分区；死信队列。
- 存储：
  - ClickHouse：聚合与趋势（分位、分布、TopN）。
  - Elasticsearch：错误详情与检索。
  - 对象存储：明细冷存（7~30 天）。
- 源图：CI 上传发布产物 Source Map；查询错误时符号化（服务端缓存）。

## 4. 看板与告警

- 看板：
  - 性能：LCP/CLS/INP 趋势与分布、Top 页面与资源。
  - 错误：Top 错误指纹、影响用户数、样例栈。
  - 请求：成功率、P95、Top 慢接口。
- 告警：
  - 规则：阈值 + 分位（如 LCP P95 > 2.5s 持续 5 分钟）。
  - 渠道：Webhook/飞书/钉钉；静默期，合并告警。

## 5. 数据格式（统一事件）

```json
{
  "event":"perf|error|xhr|route|custom",
  "timestamp":1710000000,
  "productId":"web-main",
  "sessionId":"s_xxx",
  "pageUrl":"https://x/y",
  "traceId":"00-<trace>-<span>-01",
  "env":"prod",
  "release":"2025.03.01-1234",
  "extra":{}
}
```

## 6. 容量与成本（样例）

- DAU 100 万、事件/UV 30、采样 20% → 日事件 6000 万；峰值 QPS ≈ 7000。
- ClickHouse 日增量 ≈ 8~12 GB；ES 错误索引 1~3 GB。

## 7. 里程碑

- Week1：SDK 基线（采集/发送/采样/脱敏）、Ingest API、ClickHouse 表、基础查询接口。
- Week2：看板 1.0、Source Map 符号化、阈值告警、灰度接入两个业务。

备注：后续演进到智能采样、链路追踪关联、用户会话回放。
