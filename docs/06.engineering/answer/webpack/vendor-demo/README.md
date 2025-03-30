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
plugins: [
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
