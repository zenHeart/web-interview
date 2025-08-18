# node:events 核心要点与示例

本目录包含 Node.js `node:events`（EventEmitter / EventTarget）核心能力的
最小可运行示例，便于在答案中通过 Raw-loader / TestCode 引用，或单独运行
进行验证。

* emit 同步执行监听器，按注册顺序调用；一次性监听使用 once
* 特殊事件 `error`：未监听会抛出异常并使进程崩溃
* 监听器过多会触发内存泄漏告警（默认阈值 10，可通过 setMaxListeners 调整，0 为不限制）
* `events.once()` / `events.on()` 提供 Promise / AsyncIterator 方式编排异步
* Node 也提供 `EventTarget`，API 与浏览器相似但无捕获/冒泡；与
 `EventEmitter` 存在适用差异

## 文件总览

* `emitter-basic.mjs` — 基础用法：on/once/emit、listenerCount、setMaxListeners
* `error-handling.mjs` — error 事件的处理与未处理崩溃演示（通过参数控制是否触发崩溃）
* `events-once-promise.mjs` — 使用 `events.once`（Promise）与 `events.on`（AsyncIterator）
* `memory-leak-warning.mjs` — 触发监听器过多的告警与消除方式
* `eventtarget-compare.mjs` — 与 `EventTarget` 的最小对比
* `custom-emitter.js` — 自定义发射器示例（频道化消息总线）

## 运行要求

* Node.js 16+（推荐 18/20+）
* 直接使用 `node <file>` 运行；`.mjs` 为 ESM，`.js` 示例为 CJS

## 注意事项

* 生产环境务必统一注册 `error` 监听器或隔离风险域
* 大量动态注册监听器时，合理设置 `setMaxListeners` 并及时移除监听，避免内存泄漏
* 需要按“事件一次即可”的场景优先使用 `once` 或基于 `events.once` 的 Promise 方式
