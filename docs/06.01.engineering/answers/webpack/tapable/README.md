# Tapable

`Tapable` 是一个用于插件化架构的工具库，提供了多种钩子（Hook）类型，支持事件的创建、绑定、触发以及拦截。

## 核心概念

### 1. 事件创建、绑定与触发

- **创建事件**：通过钩子类（如 `SyncHook`、`AsyncSeriesHook` 等）创建事件。

  ```javascript
  const { SyncHook } = require('tapable')
  const hook = new SyncHook(['arg1', 'arg2'])
  ```

- **绑定事件**：使用 `tap` 方法绑定事件处理函数。

  ```javascript
  hook.tap('PluginName', (arg1, arg2) => {
    console.log(`Received: ${arg1}, ${arg2}`)
  })
  ```

- **触发事件**：调用钩子的 `call` 方法触发事件。

  ```javascript
  hook.call('value1', 'value2') // 输出: Received: value1, value2
  ```

### 2. 事件拦截器

拦截器允许在事件的生命周期中插入逻辑，用于监控或修改事件行为。

- **注册拦截器**：通过 `intercept` 方法添加拦截器。

  ```javascript
  hook.intercept({
    call: (...args) => console.log('Hook called with:', args),
    register: (tapInfo) => {
      console.log('Registering:', tapInfo.name)
      return tapInfo
    }
  })
  ```

- **拦截器功能**：
  - `call`：在事件触发时执行。
  - `register`：在事件绑定时执行，可修改绑定信息。
  - `tap`：在绑定函数时执行。
  - `loop`：在循环钩子中每次循环时执行。

### 3. 钩子类型与控制流

不同类型的钩子决定了事件处理函数的执行方式：

- **基本钩子**：按顺序执行所有绑定函数。
- **Waterfall**：将上一个函数的返回值传递给下一个函数。
- **Bail**：当某个函数返回非 `undefined` 时停止执行。
- **Loop**：当某个函数返回非 `undefined` 时重新开始执行所有函数。
- **异步钩子**：支持 `tapAsync` 和 `tapPromise`，按串行或并行方式执行。

### 示例

```javascript
const { SyncHook } = require('tapable')

// 创建钩子
const hook = new SyncHook(['arg1'])

// 添加拦截器
hook.intercept({
  call: (arg1) => console.log('Intercepted call with:', arg1)
})

// 绑定事件
hook.tap('Plugin1', (arg1) => console.log('Plugin1:', arg1))

// 触发事件
hook.call('value1')
// 输出:
// Intercepted call with: value1
// Plugin1: value1
```

## 总结

`Tapable` 的核心在于：

1. **事件的创建、绑定与触发**：通过钩子类实现插件化事件管理。
2. **拦截器与控制流**：提供灵活的事件拦截与多种执行逻辑，适应复杂的插件化需求。
