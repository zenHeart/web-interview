设计 News Feed 应用 (类似 Facebook, Twitter 信息流)


2. 细节确定
- Feed 类型：支持文字、图片、视频等多媒体内容
- Feed 排序：基于时间、用户关系、内容互动度等多维度排序
- Feed 长度：每次返回 20 条，支持分页
- 是否需要数据分析，个性化推荐，不需要
- 是否需要搜索 feed / user，需要，根据关键字搜索
- POST 是否要设置 xx 不可见
- 评论是否可以 嵌套，类似 Reddit


## Objectives

- 可以快速查看 following / follower list
- 快速加载一个用户的所有 post
- 支持关键词搜索 post 和 用户
- 查看 feed 低延迟， < 200ms
- 项目高可用性

1. 规模相关
- DAU: 10m
- QPS 估算: 
  * 读取 Feed daily: 10m * 50次 / 86400秒 ~ 800 QPS (平均), 高峰 3k QPS
  * 发布内容 daily: 10m * 2次 / 86400秒 ~ 230 QPS avg ~ 1k QPS peak
- 存储需求: 假设每条 post 100 个字符，100 bytes + 100 byetes metadata
    - daily posts: 200bytes * 10million * 2 ~ 3GB
    - 10years ~ 10TB posts
    - avg 100 follwersl per user

## overview

- client
- load balancer
- services
    - user
    - followers
    - feed
    - post
    - meida

1. 考虑到用户量 10m DAU, 和 3k 的 qps，上 load balancer
2. 服务多副本部署 (replicas)
3. 数据库分区分表，比如 user by user_id sharding

第一个考虑到的情况，query performance

考虑场景比如
- 查询一个用户所有的关注 followering
- 查询一个用户的所有关注者 followers

user_id
followering_id

当然可以选 user id 或者 followering id 或者都建立 index，但是在分布式场景可能不太合适：
- sharding id 是什么，如果是 user id 就会在查询关注者的时候 join / agg 多个分区

可以考虑同步两张表：
- two phrase commit (too slow)
- 异步流处理：user_id (index) table => cdc(kafka) => (stream job)flink => followering_id(index) table

还有场景 news feed，要求 < 200ms
- 上缓存 redis，但是缓存 miss 的情况怎么办 f_posts(f(followerings)), 也会涉及分布式 post db 多分区查询，会被最难的 query 阻塞。
- 缓存策略上，数据库可以先写入 redis，是否可行，多点硬盘： 10million * 2 * 100bytes ~ 1.3GB/day => 450GB / years, 多部署几个高性能 256gb redis 节点也能满足

PUSH 模式 feed 缓存填充，根据 user_id 来索引他可见的 feed

- post db -> cdc -> flink (poster => its following) -> redis [user_id: feeds]
                    |  
                   cdc
                    |
                    followering_id(index) table

但是这个当遇到拥有大量粉丝的 KOL 网红，可以遇见他发布一个 post，会触发百万粉丝的 feeds 变化，写入的 cost 会变多。

我们可以引入hybrid 模式
- PUSH 来缓存非 KOL 关注列表的 post
- trigger PULL 来拉取 KOL 的
- 两者结果再 agg/jion 排序在一起返回

当然在第一次 pull 的时候仍然也可能会很慢，我们可以再在 kol 发布 post 的时候再做一个 stream job 来提前填充流行的 post

1. feed services -> followering_id(index) table
2.a feeds cache: post db -> cdc -> flink (poster => its following) -> redis [user_id: feeds]
                    |   ｜
                   cdc  cdc - user table(kol state change)
                    |
                    followering_id(index) table

2.b popular cache: kol post -> cdc -> flink -> kol redis [user_id: posts]
                       |
                      cdc
                       |
                       user table (kol state change)


### 核心架构

1. 数据模型设计

```sql
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY,
    username VARCHAR(50),
    created_at TIMESTAMP
);

CREATE TABLE posts (
    post_id BIGINT PRIMARY KEY,
    user_id BIGINT,
    content TEXT,
    media_urls JSON,
    created_at TIMESTAMP,
    INDEX idx_user_time (user_id, created_at)
);

CREATE TABLE follows (
    follower_id BIGINT,
    followee_id BIGINT,
    created_at TIMESTAMP,
    PRIMARY KEY (follower_id, followee_id)
);

```

### 优化设计

1. 性能优化
- 读写分离
- 分库分表：按用户 ID 分片
- CDN 加速多媒体内容

3. 实时性优化
- WebSocket 实时推送
- 长轮询降级方案
- 预加载下一页

### 可用性设计

1. 容错
- 服务多副本
- 数据多副本
- 降级策略

2. 限流
- 用户级限流
- 接口级限流

3. 监控告警 
- 系统指标：CPU、内存、磁盘 prometheus / grafana
- 业务指标：QPS、延迟、错误率 prometheus /grafana
- 服务日志 ETL stack
- 用户指标：DAU、互动率： kafak + flink + clickhouse

### API 设计

```http
// 发布 Feed
POST /api/v1/posts
{
    "content": "string",
    "media_urls": ["url1", "url2"],
    "visibility": "public|private"
}
// 获取 Feed
GET /api/v1/feeds?cursor=xxx&limit=20
// 获取用户发布的内容
GET /api/v1/users/{user_id}/posts?cursor=xxx&limit=20
```

### 扩展性考虑

1. 内容分发
- 地理位置就近原则
- 多媒体内容 CDN 加速

2. 功能扩展
- 话题标签系统
- 广告投放系统
- 推荐算法优化
- 反垃圾系统

3. 数据分析
- 用户行为分析
- 内容分析
- 趋势分析


### 大规模数据存储和查询优化

1. 分库分表策略
```sql
-- 按用户 ID 范围分片
CREATE TABLE posts_0000 (  -- 用户ID 0-9999
    post_id BIGINT PRIMARY KEY,
    user_id BIGINT,
    content TEXT,
    -- other fields
);

CREATE TABLE posts_0001 (  -- 用户ID 10000-19999
    -- same schema
);
```

2. 存储层设计
- 热数据存储
  * Redis: 最近 3 天的热门 Feed
- 冷数据存储
  * S3: 3个月以上的历史 Feed
  * 按时间分区存储

3. 查询优化
```sql
-- 索引优化
CREATE INDEX idx_user_time ON posts (user_id, created_at DESC);
CREATE INDEX idx_interaction_count ON posts (likes_count + comments_count DESC);

-- 分页查询优化
SELECT * FROM posts 
WHERE user_id IN (SELECT followee_id FROM follows WHERE follower_id = ?)
AND created_at < ?  -- cursor
ORDER BY created_at DESC 
LIMIT 20;
```


### 缓存策略详解

1. 多级缓存设计
# L1: 本地缓存 (进程内存)
# L2: Redis 缓存
# L3: 从存储层查询

2. 缓存更新策略
- Write Through: 同步写入存储层和缓存
- Write Behind: 异步批量写入存储层
- Cache Aside: 按需加载，超时失效

3. 缓存一致性保证
- 设置合理的 TTL
- 使用版本号控制
- 更新时同步清理相关缓存