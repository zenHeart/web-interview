
# 打包工具

## webpack 原理 {#p0-webpack-principle}

## 如何优化产物大小 {#p1-webpack-principle}

在使用 Webpack 进行项目构建时，减少包体积是提升加载速度、改善用户体验的关键措施之一。以下是一些通用的方法和技巧来减小构建结果的包体积：

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
