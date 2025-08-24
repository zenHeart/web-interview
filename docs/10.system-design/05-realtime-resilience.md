# 实时与弹性✅

本主题覆盖实时通道取舍、队列/流式削峰、弹性与回压、可观测。

## WebSocket/SSE/WebRTC 取舍？ {#P1-realtime-compare}

<Answer>

**核心概念:**

- WebSocket：全双工、低延迟；需网关/协议支持
- SSE：基于 HTTP 的单向推送，简单稳定
- WebRTC：P2P 多媒体/数据通道，NAT/信令复杂

**面试官视角:**

- 场景匹配与复杂度；降级与回退

</Answer>

## 如何用消息队列与流式计算削峰填谷？ {#P1-queue-stream}

<Answer>

**核心概念:**

- 限流/排队/幂等消费；分区与局部有序；失败重试/死信

</Answer>

## 如何设计回压与排队策略？ {#P2-backpressure}

<Answer>

**核心概念:**

- 滞留长度、消费延迟、生产速率控制；指数退避 + 抖动；资源配额

</Answer>

## 连接与会话的弹性治理？ {#P2-conn-resilience}

<Answer>

**核心概念:**

- 心跳/重连/超时；断线重传；粘滞与迁移

</Answer>

## 端到端观测指标如何定义？ {#P1-obs-slo}

<Answer>

**核心概念:**

- RUM/链路/指标与 SLO；烧速与告警

</Answer>

## 在线协作/IM 的实时一致性？ {#P2-crdt-ot}

<Answer>

**核心概念:**

- OT/CRDT 概要取舍

</Answer>

## 推送/订阅的多租户隔离？ {#P2-multi-tenant}

<Answer>

**核心概念:**

- 资源配额/隔离策略

</Answer>

## 边缘推送与离线能力？ {#P2-edge-push}

<Answer>

**核心概念:**

- SW/推送/离线策略

</Answer>

## 实时系统的压测与演练？ {#P2-rt-loadtest}

<Answer>

**核心概念:**

- 模拟连接/消息分布，端到端压测

</Answer>

## 故障注入与自愈策略？ {#P2-chaos}

<Answer>

**核心概念:**

- 故障演练/自愈回路

</Answer>
