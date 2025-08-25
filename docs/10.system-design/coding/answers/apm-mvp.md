# APM/RUM MVP 示例答案

## 1. 目标与范围

- 2 周内交付可用的 RUM 基线：性能（LCP/CLS/INP/TTFB）、错误、请求（成功率/P95）、PV/路由。
- 端侧影响 < 1% TTI；SDK gzip < 8KB；90% 数据 2 分钟内可查；上报成功率 > 98%。

## 2. 端侧 SDK（最小实现）

- 采集：PerformanceObserver（fallback timing）、window.onerror、unhandledrejection、XHR/Fetch hook、history 路由变更。
- 发送：优先 navigator.sendBeacon，退化 fetch；批量（20/5s），不可见/卸载 flush。
- 可靠：IndexedDB 简易离线缓存（<=1MB，TTL 24h），指数退避重试；URL Query 裁剪与字段黑名单脱敏。
- 采样：会话采样 20%，错误/慢请求全量。

## 3. 后端与存储

- 接入：CDN/边缘 + API 网关（签名/时间戳/限流/压缩）。
- 队列：Kafka 分区（租户/事件类型），死信队列。
- 存储：ClickHouse（趋势/分位/分布）、Elasticsearch（错误详情）、对象存储归档（7~30 天）。
- 源图：CI 上传 Source Map；查询错误时符号化并缓存。

## 4. 看板与告警

- 看板：Web Vitals 趋势与分布、Top 页面/资源、请求成功率与 P95、错误指纹与影响面。
- 告警：阈值/分位规则（如 LCP P95 > 2.5s，5 分钟）；Webhook/飞书渠道、静默期与合并。

## 5. 数据事件格式（简版）

```json
{
  "event":"perf|error|xhr|route",
  "timestamp":1710000000,
  "productId":"web",
  "sessionId":"s_xxx",
  "pageUrl":"https://x/y",
  "traceId":"00-<trace>-<span>-01",
  "env":"prod",
  "release":"2025.03.01-1234",
  "extra":{}
}
```

## 6. 里程碑

- Week1：SDK 基线、Ingest API、CH 表、错误符号化。
- Week2：看板与告警、灰度接入两个业务、自监控。

## 7. 容量样例

- DAU 100 万、事件/UV 30、采样 20% → 日 6000 万；峰值 QPS ≈ 7000。
- CH 增量 8~12 GB/日；ES 错误 1~3 GB/日。
