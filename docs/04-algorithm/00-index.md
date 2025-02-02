# 草稿

* treemap和hashmap的实现以及区别？

## 一致性哈希

* 解决分布式缓存的扩展性问题
* 环形哈希空间
* 虚拟节点
* 应用：分布式缓存、负载均衡

## 双端队列的应用场景？

* 滑动窗口问题
* 任务调度系统（既可以从头部添加高优先级任务，也可以从尾部添加普通任务）

## 单调栈的应用？

* 寻找下一个更大/更小元素
* 直方图中最大矩形面积
* 接雨水问题
* 股票跨度问题

## 红黑树的平衡原理

* 特性：
  1. 节点是红色或黑色
  2. 根节点是黑色
  3. 所有叶子节点（NIL）是黑色
  4. 红色节点的子节点必须是黑色
  5. 从根到叶子的所有路径包含相同数量的黑色节点
* 平衡手段：
  * 变色
  * 左旋
  * 右旋
* 时间复杂度：O(logN)

## B树和B+树的区别

* B树：
  * 所有节点都可以存储数据
  * 适合随机访问
  * 常用于文件系统
* B+树：
  * 只有叶子节点存储数据
  * 叶子节点通过链表相连
  * 更适合范围查询
  * 常用于数据库索引

## AVL树与红黑树比较

* AVL树：
  * 更严格的平衡（左右子树高度差不超过1）
  * 查询更快
  * 插入删除代价更大
* 红黑树：
  * 平衡条件较宽松
  * 插入删除操作更快
  * 实际应用更广泛（如STL）

## Trie树的应用场景

* 字符串快速检索
* 前缀匹配
* 自动补全
* 拼写检查
* IP路由表查找

## 跳表的原理和应用

* 原理：
  * 多层链表结构
  * 每层是下层的子集
  * 类似二分查找的思想

* 应用：
  * Redis的有序集合
  * 替代平衡树的场景
* 时间复杂度：平均O(logN)

## HashMap的并发问题

* 并发问题：
  * 死循环（JDK1.7中的并发扩容问题）
  * 数据丢失
  * 数据覆盖
* 解决方案：
  * 使用Collections.synchronizedMap()
  * 使用ConcurrentHashMap
  * 使用HashTable（不推荐，性能差）
