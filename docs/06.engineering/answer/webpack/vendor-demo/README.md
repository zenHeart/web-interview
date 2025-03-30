# Webpack 代码分割与加载顺序示例

这个示例展示了 Webpack 代码分割的工作原理，特别说明了为什么分割后的文件加载顺序不会影响代码的正常执行。

## 快速开始

1. 安装依赖：

```bash
npm install
```

2. 启动开发服务器：

```bash
npm run dev
```

3. 在浏览器中打开演示页面（会自动打开）：

- 使用页面上的按钮切换不同的脚本加载顺序
- 观察控制台输出，验证代码执行的一致性

## 项目结构

```
/src
  ├── index.html   # 演示页面模板
  ├── utils.js     # 公共工具函数
  ├── vendor.js    # 模拟第三方库代码
  ├── main.js      # 主应用代码
```

## 演示功能

1. **交互式加载顺序切换**：
   - 页面提供两个按钮用于切换加载顺序
   - 可以在运行时观察不同加载顺序下的执行结果
   - 输出会直接显示在页面上，方便观察

2. **可视化执行过程**：
   - 页面上会显示当前使用的加载顺序
   - 所有的日志输出都会实时显示在页面上
   - 可以直观地看到模块初始化和执行的顺序

## 源码示例

```javascript
// src/utils.js - 公共工具函数
export const createLogger = (prefix) => {
  return (message) => {
    console.log(`[${prefix}] ${message} at ${new Date().toISOString()}`);
  };
};

// src/vendor.js - 模拟第三方库代码
export const vendorFunction = () => {
  return 'Hello from vendor!';
};

// src/main.js - 主应用代码
import { createLogger } from './utils';
import { vendorFunction } from './vendor';

const logger = createLogger('Main');
logger('Initializing main module');

const result = vendorFunction();
logger(`Got result from vendor: ${result}`);
```

## Webpack 配置

```javascript
const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        },
        commons: {
          test: /[\\/]src[\\/]utils\.js/,
          name: 'commons',
          chunks: 'all'
        }
      }
    }
  }
}
```

## 开发服务器配置

```javascript
devServer: {
  static: {
    directory: path.join(__dirname, 'dist'),
  },
  hot: true,
  open: true
}
```

## HTML 模板配置

```javascript
[
  new HtmlWebpackPlugin({
    template: './src/index.html',
    scriptLoading: 'blocking',
    inject: false,
    templateParameters: {
      scriptOrder: 'normal'
    },
    minify: false
  })
]
```

## 验证步骤

1. **启动开发服务器**：

   ```bash
   npm run dev
   ```

2. **观察正常顺序加载**：
   - 点击"正常顺序加载"按钮
   - 观察输出日志
   - 注意模块初始化的顺序

3. **观察反向顺序加载**：
   - 点击"反向顺序加载"按钮
   - 观察输出日志
   - 验证执行结果的一致性

4. **验证结果**：
   - 无论使用哪种加载顺序，应用都能正常运行
   - 模块的初始化顺序保持一致
   - 所有的依赖关系都被正确处理

## 原理解释

1. **Webpack 运行时保证**：
   - `runtime.js` 包含模块加载和依赖解析的核心逻辑
   - 维护模块的加载状态和依赖关系
   - 确保模块按正确的顺序初始化

2. **模块注册机制**：
   - 每个分割出的文件都会向运行时注册自己的模块
   - 模块在首次被需要时才会执行
   - 运行时会等待所有必要的依赖加载完成

3. **执行顺序保证**：
   - 即使脚本标签的顺序被打乱
   - Webpack 运行时会确保正确的执行顺序
   - 依赖关系决定了最终的执行顺序，而不是加载顺序

这个交互式演示清晰地展示了 Webpack 的模块加载机制如何在不同的脚本加载顺序下保证应用的正确执行。通过实际操作和观察，可以直观地理解 Webpack 运行时是如何处理模块依赖和确保执行顺序的。

# Webpack 如何实现模块加载顺序不影响主模块执行的原理

Webpack 的运行时通过模块缓存、分块加载状态管理和延迟执行队列等机制，确保模块的加载顺序不会影响主模块（如 `main.js`）的正常执行。以下是对关键数据结构、算法流程的详细说明，以及对不同加载顺序的模拟。

---

## 核心数据结构

1. **`moduleCache`**
   - 用于缓存已加载的模块，避免重复加载。
   - 结构：`{ [moduleId]: { exports: {} } }`

2. **`modules`**
   - 存储模块的定义，每个模块是一个函数。
   - 结构：`{ [moduleId]: (require, exports, module) => void }`

3. **`moduleStatus`**
   - 跟踪模块的加载状态。
   - 状态值：
     - `false`：模块未加载。
     - `true`：模块已加载。

4. **`deferred`**
   - 延迟执行队列，用于存储等待依赖加载完成的模块。
   - 结构：`[moduleId, ...]`

---

## 核心算法流程

### 1. **模块加载流程**

#### 加载模块的主要步骤

1. 检查模块是否已加载：
   - 如果已加载，直接从 `moduleCache` 返回模块的 `exports`。
   - 如果未加载，执行模块定义函数，并将结果存入 `moduleCache`。
2. 如果模块依赖未加载，将模块推入 `deferred` 队列。

---

### 2. **延迟执行流程**

#### 延迟执行的主要步骤

1. 遍历 `deferred` 队列，检查模块的依赖是否已加载。
2. 如果依赖已加载，执行模块代码，并从队列中移除。
3. 重复上述步骤，直到没有模块可以执行。

---

## 模拟实现

以下代码模拟了 Webpack 的模块加载机制，包括模块缓存、延迟执行队列和依赖管理。

```javascript
// 模拟模块缓存
const moduleCache = {}

// 模拟模块定义
const modules = {
  'main.js': (require) => {
    const common = require('common.js')
    console.log('Main module executed')
    common()
  },
  'common.js': (require) => {
    console.log('Common module executed')
    return () => console.log('Common module function called')
  }
}

// 模拟模块加载状态
const moduleStatus = {
  'main.js': false, // false 表示未加载，true 表示已加载
  'common.js': false
}

// 模拟延迟执行队列
const deferred = []

// 模拟模块加载函数
function require (moduleId) {
  if (moduleCache[moduleId]) {
    return moduleCache[moduleId].exports
  }

  const module = (moduleCache[moduleId] = { exports: {} })
  modules[moduleId](require, module.exports, module)
  return module.exports
}

// 模拟延迟执行函数
function loadModule (moduleId) {
  if (moduleStatus[moduleId]) {
    // 如果模块已加载，直接执行
    executeModule(moduleId)
  } else {
    // 如果模块未加载，推入延迟队列
    deferred.push(moduleId)
  }
}

// 模拟模块加载完成后执行
function executeModule (moduleId) {
  if (!moduleStatus[moduleId]) {
    moduleStatus[moduleId] = true // 标记模块为已加载
    require(moduleId) // 执行模块代码
  }
}

// 模拟依赖加载完成后执行
function executeDeferred () {
  let executed = false
  do {
    executed = false
    for (let i = 0; i < deferred.length; i++) {
      const moduleId = deferred[i]
      if (moduleId === 'main.js' && !moduleStatus['common.js']) {
        // 如果 main.js 的依赖 common.js 未加载，跳过
        continue
      }
      // 如果模块依赖已加载，执行模块
      executeModule(moduleId)
      deferred.splice(i--, 1) // 从队列中移除
      executed = true
    }
  } while (executed) // 循环直到没有模块可以执行
}
```
