
# 打包工具

## webpack 原理 {#p0-webpack-principle}

[资料](https://www.webpackjs.com/concepts/under-the-hood/)

## webpack 的主要配置项有哪些 {#webpack-config}

Webpack 是一个现代 JavaScript 应用程序的静态模块打包器。配置文件名通常为 `webpack.config.js`，它提供了一种配置 Webpack 的方式。下面是一些主要的 Webpack 配置选项：

1. **entry**: 入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。可以指定一个或多个入口起点。

2. **output**: output 属性告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 `./dist`。

3. **module**: module 属性用于决定如何处理项目中的不同类型的模块。

* **rules**: 配置模块的读取和解析规则，通常用来配置 loader。

4. **resolve**: 配置模块如何解析。

* **extensions**: 自动解析确定的扩展，此选项能够使用户在引入模块时不带扩展。

5. **plugins**: 插件是用来扩展 webpack 功能的。它们会在构建流程中的特定时机注入运行逻辑来改变构建结果或做你想要的事情。

6. **devServer**: 通过来自 `webpack-dev-server` 的这些选项能够对开发服务器的行为进行控制。

7. **devtool**: 此选项控制是否生成，以及如何生成 source map。

8. **mode**: 通过设置 `development` 或 `production` 之中的一个，来为流程提供相应模式下的内置优化。
  
在 webpack 中，`mode` 属性用来指定当前的构建环境是：`development`、`production` 或者是 `none`。设置 `mode` 可以使用 webpack 内置的函数，默认值为 `production`。

`mode` 属性的主要作用是：根据当前的构建环境，启用 webpack 内置在该环境下推荐的优化。

 mode 的具体作用包括

1. **development**

* 主要优化了增量构建速度和开发体验。
* `process.env.NODE_ENV` 的值设为 `development`。
* 启用热替换模块（Hot Module Replacement）。
* 启用开发工具（如调试源码的 source map）以更好地进行调试。

2. **production**

* 一些处理优化，以提升应用在生产环境的性能。
* `process.env.NODE_ENV` 的值设为 `production`。
* 启用代码压缩（例如 TerserPlugin）。
* 删除 dead code（通过 Tree Shaking）。
* 作用域提升等各种性能优化措施。

3. **none**

* `mode` 设置为 `none` 则不启用任何默认优化选项，`process.env.NODE_ENV` 也不会被设置，默认为 `production`。

 使用方法

在 webpack 配置文件中，可以直接设置 `mode` 的值：

```javascript
module.exports = {
  mode: 'development' // 'production' 或 'none'
  // 其他配置...
}
```

或者，在命令行中使用 `--mode` 参数：

```bash
webpack --mode=production
```

设置 mode 是告诉 webpack 使用其内部的优化策略，各个模式预定义了一些 webpack 的行为，开发者可以不需要进行详细的配置，也能快速启动一个针对特定环境优化过的构建过程。

9. **optimization**: 包含一组可用来调整构建输出的选项。

* **splitChunks**: 配置模块的拆分，可以将公共的依赖模块提取到已有的入口 chunk 中，或者提取到一个新生成的 chunk。
* **runtimeChunk**: 为每个 entry 创建一个运行时文件。

10. **performance**: 允许 webpack 根据某些参数，控制资产和入口起点的最大大小。

11. **externals**: 防止将某些 import 包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖。

每个项目的具体需求不同，Webpack 的配置也会有所不同。这些选项提供了强大的配置能力和灵活性，可以用来定制 Webpack 的打包、加载和转换行为。

## 如何优化产物大小 {#p1-webpack-principle}

性能分析：使用 webpack-bundle-analyzer 分析产物大小，speed-measure-webpack-plugin 分析构建速度
产物压缩：JS、CSS、图片
提取公共库：配置 splitChunks
预编译：DllPlugin
使用构建缓存：cache-loader 或者 hard-source-webpack-plugin，推荐 webpack 5 cache
按需加载：使用动态 import() 加载
多线程：thread-loader
Module Federation：Umi 的 MFSU、Eden 的 ESMF

在使用 Webpack 进行项目构建时，减少包体积是提升加载速度、改善用户体验的关键措施之一。以下是一些通用的方法和技巧来减小构建结果的包体积：

* [性能优化](https://juejin.cn/post/6996816316875161637)

 1. **使用 Tree Shaking**

Tree Shaking 是一个通过清除未引用代码（dead-code）的过程，可以有效减少最终包的大小。确保你的代码使用 ES6 模块语法（import 和 export），因为这允许 Webpack 更容易地识别并删除未被使用的代码。

在 `webpack.config.js` 中设置 `mode` 为 `production` 可自动启用 Tree Shaking。

 2. **启用压缩(Uglification)**

Webpack 通过压缩输出文件来减小包大小，如删除未使用的代码、缩短变量名等。确保在生产环境中启用了 UglifyJS 插件或 TerserPlugin。

```javascript
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
 optimization: {
 minimize: true,
 minimizer: [
 new TerserPlugin({
 /Applications /Library /System /Users /Volumes /bin /cores /dev /etc /home /opt /private /sbin /tmp /usr /var 附加选项 */
 }),
 ],
 },
};
```

 3. **代码分割(Code Splitting)**

通过代码分割，你可以把代码分成多个 bundle，然后按需加载，从而减少初始加载时间。Webpack 提供了多种分割代码的方式，最常见的是动态导入（Dynamic Imports）。

```javascript
import(/* webpackChunkName: "my-chunk-name" */ 'path/to/myModule').then((module) => {
  // 使用module
})
```

 4. **使用 Externals 减轻体积**

通过配置 externals 选项，可以阻止 Webpack 将某些 import 的包打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖。

```javascript
module.exports = {
  externals: {
    jquery: 'jQuery'
  }
}
```

 5. **利用缓存(Caching)**

使用 `[contenthash]` 替换 `[hash]` 或 `[chunkhash]` 来为输出文件命名，这确保了只有当文件内容改变时，文件名称才会改变，可以更好地利用浏览器缓存。

```javascript
output: {
 filename: '[name].[contenthash].js',
}
```

 6. **移除未使用的 CSS**

使用 PurgeCSS 或`purify-css`等工具检查你的 CSS 文件，自动去除未使用的 CSS，可以极大地压缩 CSS 的体积。

```javascript
const PurgecssPlugin = require('purgecss-webpack-plugin')
```

 7. **优化图片**

使用`image-webpack-loader`等图片压缩插件，可以减小图片文件的体积。

```javascript
module: {
 rules: [
 {
 test: /\.(png|svg|jpg|jpeg|gif)$/i,
 use: [
 'file-loader',
 {
 loader: 'image-webpack-loader',
 options: {
 // 配置选项
 },
 },
 ],
 },
 ],
}
```

 8. **使用动态 Polyfills**

只为那些实际需要它们的浏览器提供 polyfills，而不是所有浏览器都提供。

以上方法和技巧可以根据项目的具体需求和情况灵活使用，有的方法可能会对构建和重构现有代码产生较大影响，因此在采用前应评估其必要性和影响。

 9. **高版本浏览器直接使用 es6 代码**

将代码编译（或者说不编译）为 ES6（ECMAScript 2015）或更高版本的 JavaScript 代码，确实可以减少产物体积。

## 代码分割中，让所有的外部依赖打成一个包，源码 source 打成一个包，该如何配置 {#p1-webpack-compile}

为了实现你的需求，即将所有外部依赖（`node_modules` 中的依赖）打包成一个单独的包，而你自己的源码打包成另一个包，可以通过配置 Webpack 的 `optimization.splitChunks` 选项来实现。下面是具体的实施方案：

 1. 编辑 `webpack.config.js`

在你的 `webpack.config.js` 配置文件中，找到或添加 `optimization` 部分，并在 `splitChunks` 中配置如下：

```javascript
module.exports = {
  // ...其他配置

  optimization: {
    runtimeChunk: 'single', // 为 webpack 运行时代码创建一个额外的包
    splitChunks: {
      cacheGroups: {
        vendor: {
          // 定义一个缓存组用以分离外部依赖
          test: /[\\/]node_modules[\\/]/, // 检索 node_modules 目录下的模块
          name: 'vendors', // 分离后的包名称
          chunks: 'all' // 对所有模块生效
        },
        source: {
          // 我们可以通过添加另一个缓存组来实现源码的分离（如果需要）
          test: /[\\/]src[\\/]/, // 检索 src 目录
          name: 'source',
          chunks: 'all'
        }
      }
    }
  }
}
```

 解释

* `runtimeChunk: 'single'` 创建一个运行时文件，管理模块化交互，比如加载和解析模块。
* 在`splitChunks.cacheGroups` 中定义了两个缓存组:
* `vendor`：这个缓存组的目标是将来自 `node_modules` 目录的所有代码移动到命名为 `vendors` 的包中。它通过 `test` 属性来匹配 `node_modules` 目录下的模块。
* `source`：这个部分是为了演示如何单独将 `src` 目录下的源代码打包成一个文件。这不是必须的，因为默认情况下，Webpack 会将未被上述规则匹配到的模块（即你的源代码）打包到主包中。

在 Webpack 中提取源码里被多个入口点复用的代码，例如一个 `utils` 文件，可以通过配置 `optimization.splitChunks` 来实现。Webpack 会将这些频繁复用的模块提取出来，打包到一个独立的 chunk 中，使得浏览器可以单独缓存这部分代码，并在多个页面间共享使用，优化加载性能。

使用 `splitChunks` 的基本配置如下：

```javascript
module.exports = {
  // ...其他配置...
  optimization: {
    splitChunks: {
      chunks: 'all', // 对所有的 chunk 有效，包括异步和非异步 chunk
      cacheGroups: {
        commons: {
          name: 'commons', // 提取出来的文件命名为 'commons.js'
          chunks: 'initial', // 提取出的 chunk 类型，'initial' 为初始 chunk，'async' 为异步 chunk，'all' 表示全部 chunk
          minChunks: 2, // 模块被引用>=2次，便分割
          minSize: 0 // 模块的最小体积
        }
      }
    }
  }
}
```

这个配置的含义是：

* `chunks: 'all'` 指定要优化的 chunk 类型，这里设置为 `all` 代表所有的 chunk，不管是动态还是非动态加载的模块。
* `cacheGroups` 是一个对象，用于定义缓存组，可以继承和/或覆盖 `splitChunks` 的任何选项。每个缓存组可以有自己的配置，将不同的模块提取到不同的文件中。
* `cacheGroups.commons` 定义了一个缓存组，专门用于提取 `initial` chunk（最初依赖的模块）中被至少两个 chunk 所共享的模块。
* `name: 'commons'` 为生成的文件定义了一个自定义名称。
* `minChunks: 2` 表示模块至少被两个入口点引用时，才会被提取。
* `minSize: 0` 指定模块的最小体积是 0，即任意大小的模块都被提取。

这会让任何从 `node_modules` 目录导入，并在至少两个入口点中使用的模块，都会被打包到一个名为 `commons.js` 的文件中（当然，实际的文件名会受到 `output` 配置的影响，例如是否包含哈希值等）。

正确配置这些参数后，`utils` 这样的模块就会被自动提取并共享，而不是在每个入口点的 bundle 中重复包含。这样做的好处是，任何更新业务逻辑的时候，只要 `utils` 没有发生变化，用户浏览器上已缓存的 `commons.js` 文件就不需要重新下载。

在 webpack 中，`splitChunks`选项是`optimization`对象的一个属性，可以用来定义如何分割代码块。默认情况下，webpack 会将所有来自`node_modules`的模块分割到一个叫做`vendors`的 chunk 中，并且将共享或来自异步请求的模块分割成不同的 chunks。通过配置`splitChunks`选项，你可以控制这些行为，创建更细致的代码分割策略。以下是如何使用`splitChunks`来优化你的 bundle。

 基本配置

```javascript
module.exports = {
  // ...
  optimization: {
    splitChunks: {
      chunks: 'all' // 分割所有类型的chunks：初始和动态加载的chunk
    }
  }
}
```

在这个配置中，`chunks: 'all'`指示 webpack 对同步和异步引入的模块都进行分割。webpack 会根据内部的一些默认标准（如模块大小、请求的 chunks 数目等）来决定是否分割一个模块。

 基础属性配置

下面的表格详细描述了 `splitChunks` 配置选项及其作用：

| 配置选项 | 类型 | 默认值 | 说明 |
| -------------------------------- | ------------------------------- | -------------- | -------------------------------------------------------------------------------------------- |
| `chunks` | `'all'`, `'async'`, `'initial'` | `'async'` | 设置优化哪些类型的 chunk。 |
| `minSize` | Number | `20000` (20kb) | 生成 chunk 的最小体积（以字节为单位）。 |
| `maxSize` | Number | `0` | 尝试将 chunk 分割成不大于指定体积的块。此选项正在实验中，并可能在将来的 webpack 版本中更改。 |
| `minChunks` | Number | `1` | 模块被分享到的最少 chunk 数。 |
| `maxAsyncRequests` | Number | `5` | 按需加载时的最大并行请求数。 |
| `maxInitialRequests` | Number | `3` | 一个入口点的最大并行请求数。 |
| `automaticNameDelimiter` | String | `'~'` | 用于生成名称的分隔符。 |
| `name` | Boolean or String or Function | `true` | 分割块的名称。 |
| `cacheGroups` | Object | - | 一个对象，它定义了对于.cacheGroups 的子选项，用来控制缓存组聚合和生成的 chunks。 |
| `cacheGroups.test` | RegExp or Function | - | 控制哪些模块被这个缓存组捕捉。 |
| `cacheGroups.priority` | Number | `0` | 缓存组点击时的优先级，数值越大，优先级越高。 |
| `cacheGroups.reuseExistingChunk` | Boolean | `true` | 如果当前块包含已从主 bundle 分割的模块，则重用它。 |
| `cacheGroups.filename` | String or Function | - | 允许为生成的 chunk 自定义文件名。 |

以下是针对上述表格中提及的某些属性的进一步说明：

* `chunks`选项指定是对哪些 chunks 应用这些优化措施。它可以是三个值之一：'all'会影响所有的 chunks，这使得在异步和非异步 chunks 之间共享模块成为可能；'async' 仅仅影响被异步加载的 chunks；'initial' 仅影响初始加载的 chunks。

* `minSize`和`maxSize`用于控制 webpack 试图以多大的 chunk 为目标。`minSize`可以避免 chunks 过小，而`maxSize`可以帮助进一步分割大的 chunks。

* `cacheGroups`是配置高度定制化的代码分割策略的地方。默认情况下 webpack 会将来自 `node_modules` 文件夹的代码分割到一个叫做 `vendors`的 chunk 中，另外 webpack 会将重复引入的代码分割到一个叫做 `default` 的 chunk 中。在这里可以覆盖这些默认设置，或是增加新的缓存组。

使用实例：

```javascript
module.exports = {
  // ...
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000, // 最小 30kb
      maxSize: 0, // 默认无上限
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name (module) {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `vendor.${packageName.replace('@', '')}`
          }
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
```

 高级配置 - 缓存组

缓存组（cacheGroups）能让你对分割出来的 chunks 进一步细分和控制。

```javascript
module.exports = {
  // ...
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity, // 允许在一个入口处无限多的并行请求
      minSize: 0, // 生成chunk的最小体积（以字节为单位）
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, // 正则表达式，用于测试模块路径，匹配node_modules目录下的模块
          name (module) {
            // 得到模块名，可能是node_modules包名称的一部分
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
            return `npm.${packageName.replace('@', '')}` // 创建chunk名
          }
        }
      }
    }
  }
}
```

这个配置创建了一个缓存组`vendor`，它会将所有从`node_modules`目录导入的模块分割到不同的 chunk 中，并为每个包创建一个以`npm`开头的 chunk 名。例如，如果你的应用依赖于`lodash`和`react`，应用中就会有`npm.lodash`和`npm.react`两个额外的 chunks。

 动态导入

当你使用像`import()`这样的动态导入语法时，`splitChunks`插件会自动进行代码分割。

```javascript
function getComponent () {
  // 当我们调用 import() 时，webpack 会对 lodash 进行代码分割
  return import('lodash').then(({ default: _ }) => {
    const element = document.createElement('div')
    element.innerHTML = _.join(['Hello', 'webpack'], ' ')
    return element
  })
}

getComponent().then((component) => {
  document.body.appendChild(component)
})
```

在这个例子中，`lodash`会被分成一个单独的 chunk。当`getComponent`函数执行并调用`import()`时，`lodash`库会作为一个单独的异步 chunk 加载进来。

通过`splitChunks`的适当配置，我们可以大幅度减小初始加载所需的时间，并确保用户只下载当前真正需要的代码，这样就可以加快应用程序的交互速度。

## webpack 编译如何将源码和依赖打包到不同路径 {#p1-webpack-compile}

1. **使用 Webpack 的`optimize-module-ids`插件（用于区分模块来源）**

* **原理**：Webpack 在打包过程中会为每个模块分配一个唯一的`module.id`。`optimize-module-ids`插件可以帮助控制模块标识符的生成方式，使得能够根据模块是源文件还是外部依赖来区分它们。
* **配置步骤**：

* 首先，安装`optimize-module-ids`插件（可能需要自行开发类似功能插件或寻找已有合适插件）。
* 然后，在 Webpack 配置文件中添加插件配置。例如：

 ```javascript
 const CustomModuleIdsPlugin = require('optimize-module-ids')
 module.exports = {
 // ...其他配置
   plugins: [
     new CustomModuleIdsPlugin((module) => {
       if (module.resource && module.resource.includes('node_modules')) {
         return 'external'
       } else {
         return 'source'
       }
     })
   ]
 }
 ```

 这个插件会依据模块的资源路径（`module.resource`）来判别模块是源自`node_modules`（外部依赖）还是其他源文件路径。若为外部依赖，模块的`id`会被标记为`external`，否则标记为`source`。如此一来，在最终的打包产物或构建信息里，就能通过这个`id`区分不同来源的模块。

2. **通过构建工具的输出信息区分（适用于简单区分）**

* **查看构建日志**：Webpack 在构建过程中会输出大量的日志信息。可在构建日志里查找模块的路径信息以区分源文件和外部依赖。比如，日志中来自`src`目录的模块通常是源文件，而来自`node_modules`目录的模块则是外部依赖。
* **分析统计信息（`stats`）**：Webpack 提供了`stats`选项，可生成详细的构建统计信息。通过将`stats`配置为`'verbose'`或其他详细级别，能获取每个模块的路径、大小、依赖关系等信息。在这些信息中，可轻易识别出源文件和外部依赖。例如，配置`stats`如下：

 ```javascript
 module.exports = {
 // ...其他配置
   stats: 'verbose'
 }
 ```

 之后便可通过分析生成的统计文件或在终端输出的详细统计信息来区分不同来源的模块。

3. **自定义打包结构或命名规则（在输出阶段区分）**

* **分离输出目录**：在 Webpack 的输出配置（`output`）中，可以设置不同的输出路径来分离源文件和外部依赖的打包产物。例如：

 ```javascript
 module.exports = {
 // ...其他配置
   output: {
     path: path.resolve(__dirname, 'dist'),
     filename: (chunkData) => {
       if (chunkData.chunk.name.includes('external')) {
         return 'external-bundles/[name].js'
       } else {
         return 'source-bundles/[name].js'
       }
     }
   }
 }
 ```

 这里依据模块所属的`chunk`名称（可在构建过程中通过某些方式将模块所属的`chunk`标记为`external`或`source`），把外部依赖和源文件分别打包到不同的目录（`external-bundles`和`source-bundles`）下，这样在最终的打包产物中就能很直观地进行区分。

* **命名规则**：除了分离输出目录，还可通过命名规则来区分。例如，在输出文件名中添加前缀以表示模块来源，如`source-[name].js`和`external-[name].js`，如此在查看打包文件时就能快速识别模块来源。

在 Webpack 中，将一些通用的依赖，如 React、React DOM、React Router 等库和框架，打包成一个独立的 bundle，通常是为了长期缓存和减少每次部署更新的下载量。这可以通过 "代码分割" (code splitting) 和 "优化" (optimization) 配置来实现。

以下是 Webpack 中分离通用依赖的几个步骤：

1. **使用 `entry` 来定义不同的入口点**: 可以通过配置一个额外的入口来创建一个只包含通用库的 bundle，也就是所谓的 "vendor" bundle。

```javascript
module.exports = {
  entry: {
    main: './src/index.js', // 你的应用代码
    vendor: ['react', 'react-dom', 'react-router'] // 指定共享库
  }
  // ...
}
```

2. **使用 `SplitChunksPlugin`**: 这个插件可以将共享代码分割成不同的 chunks，并可以通过配置将其从业务代码中分离出来。在 Webpack 4 及之后的版本中，默认内置了 `optimization.splitChunks`，就是这个插件的配置方法。

```javascript
module.exports = {
  // ...
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, // 指定是 node_modules 下的第三方包
          name: 'vendors', // 打包后的文件名，任意命名
          chunks: 'all' // 对所有的 chunk 生效
        }
      }
    }
  }
}
```

3. **配置 `output`**: 虽然不是必须的，你还可以在 output 中定义 `filename` 和 `chunkFilename`，来控制主入口和非主入口 chunks 的文件名。

```javascript
output: {
 filename: '[name].[contenthash].js',
 chunkFilename: '[name].[contenthash].js'
}
```

通过这样的配置，Webpack 在打包时会自动将 node_modules 中的依赖和业务代码分离开来，业务代码会被打包到 `main` chunk 中，而第三方库则会打包到 `vendors` chunk。

默认情况下，每个入口 chunk 保存了全部其用的模块(modules)。使用 dependOn 选项你可以与另一个入口 chunk 共享模块:

```js
module.exports = {
  // ...
  entry: {
    app: { import: './app.js', dependOn: 'react-vendors' },
    'react-vendors': ['react', 'react-dom', 'prop-types']
  }
}
```

app 这个 chunk 就不会包含 react-vendors 拥有的模块了.

dependOn 选项的也可以为字符串数组：

```js
module.exports = {
  // ...
  entry: {
    moment: { import: 'moment-mini', runtime: 'runtime' },
    reactvendors: { import: ['react', 'react-dom'], runtime: 'runtime' },
    testapp: {
      import: './wwwroot/component/TestApp.tsx',
      dependOn: ['reactvendors', 'moment']
    }
  }
}
```

此外，你还可以使用数组为每个入口指定多个文件：

```js
module.exports = {
  // ...
  entry: {
    app: { import: ['./app.js', './app2.js'], dependOn: 'react-vendors' },
    'react-vendors': ['react', 'react-dom', 'prop-types']
  }
}
```

**看一个完整案例**

```js
module.exports = {
  // ...
  entry: {
    home: './home.js',
    shared: ['react', 'react-dom', 'redux', 'react-redux'],
    catalog: {
      import: './catalog.js',
      filename: 'pages/catalog.js',
      dependOn: 'shared',
      chunkLoading: false // Disable chunks that are loaded on demand and put everything in the main chunk.
    },
    personal: {
      import: './personal.js',
      filename: 'pages/personal.js',
      dependOn: 'shared',
      chunkLoading: 'jsonp',
      asyncChunks: true, // Create async chunks that are loaded on demand.
      layer: 'name of layer' // set the layer for an entry point
    }
  }
}
```

## 手写 webpack loader 有哪些重要 api 与注意事项？ {#p1-webpack-loader}

在开发一个 webpack loader 时，除了理解 loader 的基本概念和功能之外，还有一些重要的 API 和注意事项是必需了解的。这些能够帮助你更高效地编写和调试 loader。

 重要 API

1. **this.callback**:

* 在 loader 函数内部，`this.callback` 是一个允许 loader 异步返回结果的函数。你可以通过 `this.callback(err, content, sourceMap, meta)` 来传递错误或返回结果。

2. **this.async**:

* 调用 `this.async` 会返回一个 callback 函数，你可以在异步操作完成后通过这个函数返回结果。如果 loader 要进行异步处理，这个方法非常有用。

3. **this.loaders**:

* `this.loaders` 是一个包含所有需要应用到当前处理文件的 loaders 的数组，当前 loader 的信息也包含在内。

4. **this.resourcePath** 和 **this.resourceQuery**:

* 这两个属性提供了当前正在处理的资源文件的路径和查询字符串。

5. **this.data**:

* 在 loader 的 pitch 阶段和普通阶段之间共享数据的自由对象。

6. **Loader Utils (loader-utils)**:

* `loader-utils` 提供了一些实用的工具函数，比如 `getOptions(this)` 用于获取 loader 配置项。

 注意事项

1. **使用异步 API 处理异步任务**:

* 对于需要进行异步操作的 loader，应使用 `this.async` 来获取异步 callback 函数，而不是直接返回内容。

2. **保持 loader 的简单**:

* 按照最佳实践，每个 loader 只做一件事情。这让 loader 链更加灵活和可维护。

3. **避免使用箭头函数**:

* 在编写 loader 时，避免使用箭头函数来声明 loader 函数，因为箭头函数会绑定父作用域的 `this`，而你需要访问 webpack 传递给 loader 函数的 `this` 上下文。

4. **处理异常**:

* 在处理资源的过程中，如果遇到错误，应该使用 `this.emitError` 方法或通过 `this.callback` 函数的第一个参数传递错误。

5. **缓存**:

* 除非有特定的理由，否则避免关闭 loader 的缓存。webpack 默认会缓存 loader 的结果，以提升构建性能。

6. **资源映射（Source Maps）**:

* 如果你的 loader 转换源内容，生成新的源内容，应当生成新的 source map。然后，使用 `this.callback` 来返回更新后的代码和对应的 source map。

7. **通信**:

* 如果有多个 loader 对同一个资源进行处理，它们之间可以通过 `this.data` 来共享数据。

掌握并妥当使用上述 API 和注意事项，将帮助你开发出高效、健壮且易于维护的 webpack loader。

要在方法调用时上报调用源文件的地址，并且希望通过 webpack 编译时来实现，你可以通过编写一个自定义的 webpack loader 来操作源代码，为特定的方法调用插入上报的代码。自定义 loader 本质上是一个函数，该函数接收源码作为输入，对源码进行处理后返回新的源码。

 步骤 1: 设计你的上报逻辑

首先明确你想要上报的信息和上报的方式。比如，你可能想要在方法调用时，插入一个上报函数调用，该函数包含当前文件的路径和文件名。

 步骤 2: 创建自定义 Loader

你可以开始编写你的 loader。假设你有一个上报函数 `reportFunction(filePath)`，你希望自动为所有 `targetMethod()` 调用注入这个上报函数。

loader 文件 `report-loader.js` 可能看起来像这样：

```javascript
module.exports = function (source) {
  // 使用此 loader 处理的文件的路径
  const filePath = this.resourcePath

  // 定义一个正则表达式匹配特定的方法调用，比如 targetMethod()
  const methodCallRegex = /targetMethod\(\)/g

  // 替换匹配到的方法调用
  const modifiedSource = source.replace(methodCallRegex, function (match) {
    // 插入上报函数调用，传入文件路径
    return `reportFunction('${filePath}'); ${match}`
  })

  return modifiedSource
}
```

这个简单的 loader 使用正则表达式查找文件中所有的 `targetMethod()` 调用，并在每个调用前插入 `reportFunction(filePath)` 的调用。注意，考虑到文件路径可能需要处理才能安全地用作字符串字面量（例如，转义特殊字符），这里的实现做得很简单，可能需要根据你的具体需求调整。

 步骤 3: 在 webpack 配置中使用你的 Loader

在你的 `webpack.config.js` 文件中，添加一个 `module.rules` 条目，以确定哪些文件应该通过你的 loader 处理：

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/, // 匹配 JavaScript 文件
        use: [
          {
            loader: 'path/to/your/report-loader.js' // 使用自定义 loader 的路径
          }
        ]
      }
    ]
  }
}
```

确保将 `loader` 属性设置为你自定义 loader 文件的路径。

 注意事项

1. **正则表达式**: 我在例子中使用的正则表达式非常简单，只匹配特定形式的方法调用。根据你的需要，可能要编写更复杂的正则表达式或使用其他方法（比如抽象语法树解析库，如 Babel）来更准确地识别和修改代码。

2. **安全性**: 自动修改源代码会带来风险，确保你的匹配和替换逻辑不会导致代码中出现意外的改变。

3. **性能**: 增加自定义 loader 可能会影响构建的速度，特别是匹配和修改逻辑比较复杂的时候。

编写和测试好你的 loader 后，就可以集成到你的项目中，通过 webpack 构建过程中自动执行所需的代码注入了。

## loader 通信 {#p1-loader-commucation}

在 webpack 中，loader 之间传递数据的常见方式是通过资源文件（即要处理的源文件本身）的内容。每个 loader 接收上一个 loader 的处理结果作为输入，并提供自己的输出给下一个 loader。这种方式适用于大多数使用场景。然而，在某些情况下，loader 需要在它们之间共享额外的状态或数据，而不仅仅是文件内容。对于这种需求，webpack 提供了一种机制，允许 loader 之间共享数据。

 使用 `this.data`

在 webpack 4 及以后的版本中，一个 loader 可以利用它的 `this.data` 属性来共享会话数据。这个属性是特定于当前 loader 运行实例的，可以在 loader 的 `pitch` 阶段和正常的加载阶段之间共享数据。

```javascript
// pitch 阶段
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  data.sharedValue = 'Hello from pitch phase'
}
```

在上面的代码片段中，`pitch` 方法设置了 `data.sharedValue`。这个 `pitch` 方法是可选的，它在 loader 处理资源之前执行。`data` 对象会从 `pitch` 阶段传递到正常的加载阶段，从而可以在后者中访问之前设置的共享值。

```javascript
// 正常的加载阶段
module.exports = function (content) {
  const callback = this.async()
  const sharedValue = this.data.sharedValue

  // 这里可以根据 sharedValue 来处理 content
  console.log(sharedValue) // 将输出 "Hello from pitch phase"

  callback(null, content)
}
```

 使用自定义属性

一些特定的 loader 实现可能通过向源文件内容附加额外的信息来实现间接的通信。例如，一个 loader 可以在文件内容的末尾追加一些注释或者特殊标记，然后下一个 loader 可以读取这些注释或标记来获取必要的信息。然而，这种方法是高度依赖上下文且难以维护的，不推荐在实际项目中使用。

 注意事项

当使用一种方法在 loader 之间共享数据时，请注意数据的共享是在每个模块的构建过程中进行的，这些数据是特定于当前处理中的资源文件的。通过这种方式共享的数据不应该包含敏感信息，也不应该用于在不同模块或不同构建之间共享全局状态。

理解这些机制以及如何在 loader 之间正确共享数据是创建高效可维护 webpack 构建流程的关键。

## webpack plugin 有那些重要 api 与注意的地方？ {#p2-plugin}

* [ ] [plugin](https://webpack.js.org/contribute/writing-a-plugin/)

创建一个 webpack 插件需要遵循 webpack 插件的基本结构和原则，同时为了实现统计源码里的 `console.log` 调用数量与调用路径的目标，我们可能需要对 webpack 的编译过程有一定的了解，尤其是如何操作 webpack 的模块系统内部的原始源代码。

以下是创建这样一个插件的步骤与代码示例：

 步骤 1: 定义插件类

首先，你需要定义一个 JavaScript 类。在类的 `apply` 方法中，你将会监听 webpack 的 `compilation` 钩子来访问并处理模块的源代码。

 步骤 2: 监听适当的 webpack 钩子

针对源代码的处理，我们选择监听 `compilation` 阶段的 `optimizeModules` 钩子。在这个阶段，模块的原始源代码可以被访问和修改。

 步骤 3: 处理源代码

处理每个模块的源代码，你可以使用简单的正则表达式或更高级的方法（如 AST 解析）来识别 `console.log` 的调用。在这个示例中，我将使用正则表达式来简化处理流程。

 代码示例

下面是一个插件的基本实现：

```javascript
class ConsoleLogStatsPlugin {
  apply (compiler) {
    compiler.hooks.compilation.tap('ConsoleLogStatsPlugin', (compilation) => {
      compilation.moduleTemplates.javascript.hooks.render.tap('ConsoleLogStatsPlugin', (moduleSource, module) => {
        // 计算当前模块的 console.log 调用并记录文件路径
        const source = moduleSource.source()
        const consoleLogMatches = source.match(/console\.log\(/g) || []

        if (consoleLogMatches.length > 0) {
          console.log(`模块 ${module.resource} 包含 ${consoleLogMatches.length} 次 console.log 调用。`)
        }

        return moduleSource
      })
    })
  }
}

module.exports = ConsoleLogStatsPlugin
```

 使用该插件

要在你的 webpack 配置中使用这个插件，首先要导入它，然后将它的一个实例添加到配置的 `plugins` 数组中：

```javascript
const ConsoleLogStatsPlugin = require('./path/to/ConsoleLogStatsPlugin')

module.exports = {
  // ...其他配置...
  plugins: [
    new ConsoleLogStatsPlugin()
    // ...其他插件...
  ]
}
```

 注意事项

* **性能考虑**：直接操作源码可能对构建性能有一定影响。如果项目较大，可能需要考虑更高效的方式，例如仅在生产构建中运行该插件，或者使用更高效的代码分析方法。
* **正则表达式的局限性**：简单的正则表达式可能无法准确匹配所有 `console.log` 调用的场景，尤其是当代码中包含多行语句或复杂表达式时。更复杂的场景可能需要使用抽象语法树（AST）解析工具，如 Babel。
* **webpack 版本兼容性**：webpack 的插件 API 在不同的版本之间可能会有所变化。上述代码示例是基于假定的 API 结构编写的，实际使用时需要根据你的 webpack 版本调整 API 的使用。

此插件可以视为检测源代码中 `console.log` 使用情况的起点，可以根据具体需求进行扩展和优化。

* webpack-dashboard：可以更友好的展示相关打包信息。
* webpack-merge：提取公共配置，减少重复配置代码
* speed-measure-webpack-plugin：简称 SMP，分析出 Webpack 打包过程中 Loader 和 Plugin 的耗时，有助于找到构建过程中的性能瓶颈。
* size-plugin：监控资源体积变化，尽早发现问题
* HotModuleReplacementPlugin：模块热替换
* webpack.ProgressPlugin：打包进度分析
* webpack-bundle-analyzer：打包结果分析
* friendly-errors-webpack-plugin： 代码源码编译报错友好提示

## webpack externals 是如何加载外部依赖的 {#p2-webpack-externals}

1. externals 配置, 是忽略此依赖，不打包，
2. 基于运行环境确定处理方式
   1. 浏览器环境，通过 script 标签加载
   2. 非浏览器环境，通过 require 加载
   3. 不同 module 类型，处理方式不同

## rollup 为什么快 {#p1-rollup-webpack-difference}

1. esm 静态分析，优于 commonjs 动态分析

## webpack 和 vite 区别 {#p2-webpack-vite-difference}

1. dev 模式 vite 采用 esm, 而 webpack 采用 commonjs
2. prod webpack 产物更灵活基于 chunk ，而 vite 产物更固定基于 esm 可能产生大量小文件

## vite 开发和构建有何不同？

## vite 和 rollup 的区别 {#p2-vite-rollup-difference}

## vite 与 esbuild 的关系 {#p4-vite-esbuild}

## vite dev  是如何工作的, 为什么快，有什么缺点? {#p3-vite-dev-work}

<Answer>

1. 全部都以 esm 模式 处理
2. js 直接加载
3. 其他类型文件通过及时编译处理后加载
   1. less 编译后，转为 css 插入 style
   2. typescript 编译后，转为 js 插入 script
   3. tsx 编译后，转为 jsx 转为 createElement 的 js 插入

* [why vite](https://vite.dev/guide/why.html)

</Answer>

## tree-shaking 原理 {#p1-tree-shaking-principle}

Webpack 的 Tree Shaking 主要是用来消除未被使用的代码，以减小最终打包文件的体积。其原理如下：

**一、静态分析**

1. 模块依赖分析：

* Webpack 在构建过程中，会对项目中的模块进行依赖分析。它会解析每个模块的内容，确定模块之间的导入和导出关系。
* 通过分析，可以构建出一个模块依赖图，展示了各个模块之间的引用关系。

2. 识别未使用的代码：

* 基于模块依赖图，Webpack 可以确定哪些模块被实际使用，哪些模块未被使用。
* 对于 JavaScript 模块，它可以识别出未被调用的函数、未被访问的变量等。对于其他资源文件，如 CSS 和图片，也可以根据引用情况判断是否被使用。

**二、代码优化**

1. 消除未使用的代码：

* 一旦识别出未使用的代码，Webpack 会在打包过程中将这些代码从最终的输出文件中移除。
* 这可以显著减小打包文件的大小，提高应用的加载速度和性能。

2. 作用域分析：

* 在消除未使用的代码时，Webpack 还会进行作用域分析。它会确保在移除代码的过程中，不会影响到实际使用的代码的正确性。
* 例如，如果一个函数在一个模块中未被使用，但在另一个模块中被间接引用，Webpack 会谨慎处理，避免错误地移除该函数。

**三、实现条件**

1. ES2015 模块语法：

* Tree Shaking 主要依赖于 ES2015 模块语法（`import`和`export`）。这种模块语法是静态的，使得 Webpack 能够在编译时确定模块的导入和导出关系。
* 相比之下，CommonJS 模块语法（`require`和`module.exports`）是动态的，难以在编译时进行准确的分析。

2. 支持的模块类型：

* Webpack 不仅可以对 JavaScript 模块进行 Tree Shaking，还可以对一些其他类型的模块进行处理，如 CSS 模块（通过特定的加载器和插件）。
* 对于不同类型的模块，Webpack 可能会使用不同的技术和策略来实现 Tree Shaking。

总之，Webpack 的 Tree Shaking 通过静态分析模块依赖关系，识别并消除未使用的代码，从而优化打包文件的大小和性能。它依赖于 ES2015 模块语法和准确的模块依赖分析，同时需要注意一些实现条件和潜在的问题。

## babel-runtime 作用是啥 {#p2-babel}

`babel-runtime` 是一个包含 `babel` 模块化运行时助手的库。

在使用 `babel` 进行代码转换时，有时会注入一些在多个文件中相同且可能被重复使用的代码。例如，使用类转换（无松散模式）时，每个包含类的文件都会重复出现类似 `_classcallcheck` 这样的函数。

`babel-runtime` 的主要作用就是将这些可能被重用的代码抽取成单独的模块，以避免在每个文件中重复出现相同的代码。它通过模块导入的方式引入这些功能，从而避免了对全局作用域的修改或污染。

具体来说，`babel-runtime` 包含了诸如 `core-js`（提供 JavaScript 内置库的垫片，如 `array`、`json`、`math`、`promise`、`symbol` 等）、`regenerator-runtime`（实现了 `generator/yield`、`async/await`）以及一些语法转换的辅助函数（如 `es5` 与 `es6` 的继承转换等）。

使用 `babel-runtime` 通常需要配合 `babel-plugin-transform-runtime` 插件一起使用。`babel-plugin-transform-runtime` 插件会进行一些处理，例如自动导入 `babel-runtime/core-js`，并将全局静态方法、全局内置对象映射到对应的模块；将内联的工具函数移除，改成通过 `babel-runtime/helpers` 模块进行导入；如果使用了 `async/generator` 函数，则自动导入 `babel-runtime/regenerator` 模块等。

这样，在代码中如果需要使用特定的功能，只需从 `babel-runtime` 相应的模块中导入即可，而不是直接使用全局的对象或函数。

例如，如果代码中使用了 `promise`，可以这样导入：

```javascript
import promise from 'babel-runtime/core-js/promise'
```

总的来说，`babel-runtime` 更像是一种按需加载的实现方式，适用于开发库、工具等场景，可避免对全局作用域的污染，同时减少重复代码。
