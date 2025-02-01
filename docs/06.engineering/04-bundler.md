
# 打包工具

## tapable 的设计思路与实现原理是什么？ {#p0-tapable}

Webpack Tapable 的设计思路主要基于观察者模式（Observer Pattern）和发布-订阅模式（Publish-Subscribe Pattern），用于解耦各个插件之间的依赖关系，让插件能够独立作用于特定的钩子（Hook），从而实现可扩展性和灵活性。

具体来说，Tapable 采用了钩子（Hook）的概念，每个钩子对应一组事件，Webpack 在不同的时刻触发这些钩子，插件可以注册自己的事件处理函数到对应的钩子上，以实现各种功能。

为了避免插件之间的耦合，Tapable 将事件处理函数按照钩子类型分为同步钩子（Sync Hook）、异步钩子（Async Hook）、单向异步钩子（Async Parallel Hook）和多向异步钩子（Async Series Hook）四种类型。这样，不同类型的钩子对应着不同的事件处理顺序和调用方式，插件在注册自己的事件处理函数时，可以选择不同的钩子类型来适应不同的应用场景。

除此之外，Tapable 还提供了一些辅助方法和工具函数，用于方便地创建和管理钩子、向钩子注册事件处理函数、调用钩子的事件处理函数等。这些工具函数的设计思路也遵循了解耦、简单易用的原则，为插件开发提供了很大的便利性。

 Tapable 的使用

Webpack Tapable 的使用分为三个步骤：

1. 定义一个新的 Tapable 实例：在 Webpack 插件中定义一个新的 Tapable 实例，并定义需要监听的事件。

```js
const { SyncHook } = require('tapable')

class MyPlugin {
  constructor () {
    this.hooks = {
      beforeRun: new SyncHook(['compiler']),
      done: new SyncHook(['stats'])
    }
  }

  apply (compiler) {
    this.hooks.beforeRun.tap('MyPlugin', compiler => {
      console.log('Webpack is starting to run...')
    })

    this.hooks.done.tap('MyPlugin', stats => {
      console.log('Webpack has finished running.')
    })
  }
}
```

2. 触发事件：在 Webpack 的编译过程中，调用 Tapable 实例的触发方法，触发事件。

```js
compiler.hooks.beforeRun.call(compiler)
// Webpack is starting to run...

compiler.run((err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(stats)
  compiler.hooks.done.call(stats)
  // Webpack has finished running.
})
```

3. 注册插件：在 Webpack 的配置文件中，将插件实例注册到 Webpack 中。

```js
const MyPlugin = require('./my-plugin')

module.exports = {
  plugins: [new MyPlugin()]
}
```

以上是使用 Tapable 的基本流程，通过 Tapable 可以监听到编译过程中的各个事件，并对编译过程进行修改，从而实现各种插件。以下是一些常见的 Tapable 类型和用法：

* SyncHook：同步 Hook，按照注册的顺序同步执行所有回调函数。

```js
const { SyncHook } = require('tapable')

const hook = new SyncHook(['arg1', 'arg2'])

hook.tap('MyPlugin', (arg1, arg2) => {
  console.log(`Hook is triggered with arguments: ${arg1}, ${arg2}`)
})

hook.tap('MyPlugin', (arg1, arg2) => {
  console.log('Second callback is called')
})

hook.call('Hello', 'world')
// Hook is triggered with arguments: Hello, world
// Second callback is called
```

* AsyncParallelHook：异步 Hook，按照注册的顺序异步执行所有回调函数，不关心回调函数的返回值。

```js
const { AsyncParallelHook } = require('tapable')

const hook = new AsyncParallelHook(['arg1', 'arg2'])

hook.tap('MyPlugin', (arg1, arg2, callback) => {
  setTimeout(() => {
    console.log(`Hook is triggered with arguments: ${arg1}, ${arg2}`)
    callback()
  }, 1000)
})

hook.tap('MyPlugin', (arg1, arg2, callback) => {
  setTimeout(() => {
    console.log('Second callback is called')
    callback()
  }, 500)
})
```

 Tapable 是如何实现的？代码简单实现一下？

Webpack Tapable 是基于发布-订阅模式的一个插件系统，它提供了一组钩子函数，让插件可以在相应的时机执行自己的逻辑。

下面是一个简单的自定义 Tapable 的实现：

```js
class Tapable {
  constructor () {
    this.hooks = {}
  }

  // 注册事件监听函数
  tap (name, callback) {
    if (!this.hooks[name]) {
      this.hooks[name] = []
    }
    this.hooks[name].push(callback)
  }

  // 触发事件
  call (name, ...args) {
    const callbacks = this.hooks[name]
    if (callbacks && callbacks.length) {
      callbacks.forEach((callback) => callback(...args))
    }
  }
}
```

在这个例子中，我们定义了一个 `Tapable` 类，它有一个 `hooks` 对象属性，用于存储各个事件对应的监听函数。然后我们定义了 `tap` 方法，用于注册事件监听函数，以及 `call` 方法，用于触发事件。

下面是一个使用自定义 Tapable 的例子：

```js
const tapable = new Tapable()

tapable.tap('event1', (arg1, arg2) => {
  console.log('event1 is triggered with arguments:', arg1, arg2)
})

tapable.tap('event2', (arg1, arg2) => {
  console.log('event2 is triggered with arguments:', arg1, arg2)
})

tapable.call('event1', 'hello', 'world')
tapable.call('event2', 'foo', 'bar')
```

在这个例子中，我们定义了两个事件 `event1` 和 `event2`，并为它们注册了监听函数。当我们调用 `call` 方法触发事件时，注册的监听函数就会依次执行。

这个自定义 Tapable 的实现虽然简单，但它体现了 Tapable 的设计思路和核心功能。在实际使用中，Webpack 的 Tapable 提供了更多的功能和钩子，可以满足不同场景的需求。

## [webpack] module、chunk 、bundle 的区别 {#p0-bundler}

首先上图：
![3 (1)](https://user-images.githubusercontent.com/22188674/234582993-25c40cda-d3ee-4f96-b134-44a950aba11f.png)

* 手写下一个一个的文件，它们无论是 `ESM` 还是 `commonJS` 或是 `AMD`，他们都是 `module`
* 当我们写的 `module` 源文件传到 `webpack` 进行打包时，`webpack` 会根据文件引用关系生成 `chunk` 文件，`webpack` 会对这个 `chunk` 文件进行一些操作
* webpack 处理好 chunk 文件后，最后会输出 bundle 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，可以直接在浏览器中运行。

一般来说一个 chunk 对应一个 bundle，比如上图中的 `utils.js -> chunks 1 -> utils.bundle.js`

但也有例外，比如说上图中，我就用 `MiniCssExtractPlugin` 从 chunks 0 中抽离出了 `index.bundle.css` 文件

**总结**：
module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字：
我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle。

## 为什么现代前端应用需要打包工具进行打包编译？ {#p0-bunlder-concept}

现代前端应用需要打包工具进行打包编译的主要原因有以下几点：

1. 模块化管理：现代前端应用通常采用模块化的开发方式，将代码划分为多个模块，每个模块具有独立的功能和依赖关系。打包工具可以将这些模块进行分析，将它们打包成一个或多个静态文件，方便管理和维护。

2. 解决浏览器兼容性问题：不同的浏览器对于 JavaScript 和 CSS 的支持程度不同，而且随着新特性的不断出现，旧版浏览器可能无法完全支持。打包工具可以通过转译、压缩和兼容性处理等手段，将当前前端代码转化为浏览器可识别和运行的代码，解决兼容性问题。

3. 静态资源处理和优化：现代前端应用涉及大量的静态资源，如图片、字体等。打包工具可以对这些资源进行处理和优化，如图片压缩、字体文件打包等，以减小资源文件的体积，提高页面的加载速度和性能。

4. 代码分割和按需加载：打包工具可以将应用程序拆分成多个小块，实现代码分割和按需加载。这样可以实现懒加载，只在需要时加载特定的代码块，提高页面的加载速度。

5. 开发环境支持：打包工具通常提供开发服务器和热模块替换（HMR）等功能，方便开发人员进行开发和调试。开发服务器可以实时预览代码变化，HMR 可以在修改代码后只替换修改的部分，而不是整个页面刷新，提高开发效率。

6. 提升性能：打包工具可以通过代码优化、压缩和混淆等技术手段，减小文件体积，提升应用程序的加载速度和执行效率。

7. 支持多种前端技术：现代前端应用通常使用多种前端技术和语言，如JavaScript、CSS、TypeScript、Sass等。打包工具可以集成这些技术，并提供相应的编译、转译和处理功能，使开发人员能够更轻松地使用这些技术。

8. 自动化工作流程：打包工具可以配合其他构建工具和自动化任务运行器，如Webpack配合Grunt或Gulp，实现自动化的构建和部署流程。这可以减少手动操作，提高开发效率和代码质量。

9. 第三方库管理：现代前端应用通常使用大量的第三方库和框架，这些库可能包含多个文件和依赖关系。打包工具可以自动管理这些库的依赖关系，并将它们打包为单个文件，减少网络请求和提高代码的可维护性。

10. 高度可定制化：打包工具通常提供丰富的插件和配置选项，允许开发人员根据项目需求进行定制。可以灵活配置打包过程中的各种处理和优化方式，以满足项目的具体需求。

总结 - 现代前端应用需要打包工具进行打包编译的原因是为了： **实现模块化管理、解决兼容性问题、静态资源处理和优化、代码分割和按需加载、开发环境支持、性能提升、多技术支持、自动化工作流程、第三方库管理和可定制化等方面的需求**。

`webpack` 的运行流程是一个串行的过程，它的工作流程就是将各个插件串联起来

在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条`webpack`机制中，去改变`webpack`的运作，使得整个系统扩展性良好

从启动到结束会依次执行以下三大步骤：

* 初始化流程：从配置文件和 `Shell` 语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数
* 编译构建流程：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理
* 输出流程：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统

 初始化流程

从配置文件和 `Shell` 语句中读取与合并参数，得出最终的参数

配置文件默认下为`webpack.config.js`，也或者通过命令的形式指定配置文件，主要作用是用于激活`webpack`的加载项和插件

`webpack` 将 `webpack.config.js` 中的各个配置项拷贝到 `options` 对象中，并加载用户配置的 `plugins`
完成上述步骤之后，则开始初始化`Compiler`编译对象，该对象掌控者`webpack`声明周期，不执行具体的任务，只是进行一些调度工作

```js
class Compiler extends Tapable {
 constructor(context) {
 super();
 this.hooks = {
 beforeCompile: new AsyncSeriesHook(["params"]),
 compile: new SyncHook(["params"]),
 afterCompile: new AsyncSeriesHook(["compilation"]),
 make: new AsyncParallelHook(["compilation"]),
 entryOption: new SyncBailHook(["context", "entry"])
 // 定义了很多不同类型的钩子
 };
 // ...
 }
}

function webpack(options) {
 var compiler = new Compiler();
 ...// 检查options,若watch字段为true,则开启watch线程
 return compiler;
}
...

```

`Compiler` 对象继承自 `Tapable`，初始化时定义了很多钩子函数

 编译构建流程

根据配置中的 `entry` 找出所有的入口文件

```js
module.exports = {
  entry: './src/file.js'
}
```

初始化完成后会调用`Compiler`的`run`来真正启动`webpack`编译构建流程，主要流程如下：

* `compile` 开始编译
* `make` 从入口点分析模块及其依赖的模块，创建这些模块对象
* `build-module` 构建模块
* `seal` 封装构建结果
* `emit` 把各个chunk输出到结果文件

 compile 编译

执行了`run`方法后，首先会触发`compile`，主要是构建一个`Compilation`对象

该对象是编译阶段的主要执行者，主要会依次下述流程：执行模块创建、依赖收集、分块、打包等主要任务的对象

 make 编译模块

当完成了上述的`compilation`对象后，就开始从`Entry`入口文件开始读取，主要执行`_addModuleChain()`函数，如下：

```js
_addModuleChain(context, dependency, onModule, callback) {
 ...
 // 根据依赖查找对应的工厂函数
 const Dep = // @type {DepConstructor} */ (dependency.constructor);
 const moduleFactory = this.dependencyFactories.get(Dep);

 // 调用工厂函数NormalModuleFactory的create来生成一个空的NormalModule对象
 moduleFactory.create({
 dependencies: [dependency]
 ...
 }, (err, module) => {
 ...
 const afterBuild = () => {
 this.processModuleDependencies(module, err => {
 if (err) return callback(err);
 callback(null, module);
 });
 };

 this.buildModule(module, false, null, null, err => {
 ...
 afterBuild();
 })
 })
}

```

过程如下：

`_addModuleChain`中接收参数`dependency`传入的入口依赖，使用对应的工厂函数`NormalModuleFactory.create`方法生成一个空的`module`对象

回调中会把此`module`存入`compilation.modules`对象和`dependencies.module`对象中，由于是入口文件，也会存入`compilation.entries`中

随后执行`buildModule`进入真正的构建模块`module`内容的过程

 build module 完成模块编译

这里主要调用配置的`loaders`，将我们的模块转成标准的`JS`模块

在用`Loader` 对一个模块转换完后，使用 `acorn` 解析转换后的内容，输出对应的抽象语法树（`AST`），以方便 `Webpack`后面对代码的分析

从配置的入口模块开始，分析其 `AST`，当遇到`require`等导入其它模块语句时，便将其加入到依赖的模块列表，同时对新找出的依赖模块递归分析，最终搞清所有模块的依赖关系

 输出流程

 seal 输出资源

`seal`方法主要是要生成`chunks`，对`chunks`进行一系列的优化操作，并生成要输出的代码

`webpack` 中的 `chunk` ，可以理解为配置在 `entry` 中的模块，或者是动态引入的模块

根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表

 emit 输出完成

在确定好输出内容后，根据配置确定输出的路径和文件名

```js
const config = {
  // ...
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  }
}
```

在 `Compiler` 开始生成文件前，钩子 `emit` 会被执行，这是我们修改最终文件的最后一个机会

从而`webpack`整个打包过程则结束了

 小结

![](https://foruda.gitee.com/images/1681308948652266689/0b4f6e27_7819612.png)

## 讲一下Webpack设计理念 {#p0-webpack-design}

参考文档： [资料](https://juejin.cn/post/7170852747749621791)

## webpack 原理 {#p0-webpack-principle}

**关键词**：webpack 作用、webpack 概念

Webpack是一个现代的JavaScript模块打包工具，它的核心概念包括以下几个方面：

1. 入口（Entry）：指定Webpack开始构建依赖图谱的起点。可以通过配置文件中的entry属性来指定入口文件，也可以指定多个入口文件。

2. 输出（Output）：指定Webpack打包后的文件输出的路径和文件名。可以通过配置文件中的output属性来定义输出路径和文件名的规则。

3. 加载器（Loader）：Webpack本身只能处理JavaScript文件，通过加载器，Webpack可以处理其他类型的文件，如CSS、图片、字体等。加载器会在打包过程中对文件进行转换和处理。

4. 插件（Plugin）：插件是Webpack的核心功能扩展机制，可以用于解决很多构建过程中的复杂问题或实现特定的需求。插件可以用于优化打包结果、自动生成HTML文件、提取CSS文件等。

5. 模式（Mode）：Webpack提供了两种模式，分别是开发模式（development）和生产模式（production）。开发模式会启用一些有助于开发调试的功能，而生产模式则会启用代码压缩、优化等功能。

6. 代码分割（Code Splitting）：Webpack支持将代码分割成多个块，实现按需加载和提高应用性能。可以使用动态导入、SplitChunks插件等方式进行代码分割。

7. 解析（Resolve）：Webpack会解析模块之间的依赖关系，通过解析规则来确定模块的依赖关系。可以通过配置resolve属性来设置模块的解析规则。

**为什么选择 webpack**

想要理解为什么要使用 webpack，我们先回顾下历史，在打包工具出现之前，我们是如何在 web 中使用 JavaScript 的。

在浏览器中运行 JavaScript 有两种方法。第一种方式，引用一些脚本来存放每个功能；此解决方案很难扩展，因为加载太多脚本会导致网络瓶颈。第二种方式，使用一个包含所有项目代码的大型 .js 文件，但是这会导致作用域、文件大小、可读性和可维护性方面的问题。

**立即调用函数表达式(IIFE) - Immediately invoked function expressions**

IIFE 解决大型项目的作用域问题；当脚本文件被封装在 IIFE 内部时，你可以安全地拼接或安全地组合所有文件，而不必担心作用域冲突。

IIFE 使用方式产生出 Make, Gulp, Grunt, Broccoli 或 Brunch 等工具。这些工具称为任务执行器，它们将所有项目文件拼接在一起。

但是，修改一个文件意味着必须重新构建整个文件。拼接可以做到很容易地跨文件重用脚本，但是却使构建结果的优化变得更加困难。如何判断代码是否实际被使用？

即使你只用到 lodash 中的某个函数，也必须在构建结果中加入整个库，然后将它们压缩在一起。如何 treeshake 代码依赖？难以大规模地实现延迟加载代码块，这需要开发人员手动地进行大量工作。

**感谢 Node.js，JavaScript 模块诞生了**

Node.js 是一个 JavaScript 运行时，可以在浏览器环境之外的计算机和服务器中使用。webpack 运行在 Node.js 中。

当 Node.js 发布时，一个新的时代开始了，它带来了新的挑战。既然不是在浏览器中运行 JavaScript，现在已经没有了可以添加到浏览器中的 html 文件和 script 标签。那么 Node.js 应用程序要如何加载新的代码 chunk 呢？

CommonJS 问世并引入了 require 机制，它允许你在当前文件中加载和使用某个模块。导入需要的每个模块，这一开箱即用的功能，帮助我们解决了作用域问题。

npm + Node.js + modules - 大规模分发模块
JavaScript 已经成为一种语言、一个平台和一种快速开发和创建快速应用程序的方式，接管了整个 JavaScript 世界。

但 CommonJS 没有浏览器支持。没有 live binding(实时绑定)。循环引用存在问题。同步执行的模块解析加载器速度很慢。虽然 CommonJS 是 Node.js 项目的绝佳解决方案，但浏览器不支持模块，因而产生了 Browserify, RequireJS 和 SystemJS 等打包工具，允许我们编写能够在浏览器中运行的 CommonJS 模块。

**ESM - ECMAScript 模块**
来自 Web 项目的好消息是，模块正在成为 ECMAScript 标准的官方功能。然而，浏览器支持不完整，版本迭代速度也不够快，目前还是推荐上面那些早期模块实现。

**依赖自动收集**
传统的任务构建工具基于 Google 的 Closure 编译器都要求你手动在顶部声明所有的依赖。然而像 webpack 一类的打包工具自动构建并基于你所引用或导出的内容推断出依赖的图谱。这个特性与其它的如插件 and 加载器一道让开发者的体验更好。

**看起来都不是很好……**

`是否可以有一种方式，不仅可以让我们编写模块，而且还支持任何模块格式（至少在我们到达 ESM 之前），并且可以同时处理资源和资产？`

这就是 webpack 存在的原因。它是一个工具，可以打包你的 JavaScript 应用程序（支持 ESM 和 CommonJS），可以扩展为支持许多不同的静态资源，例如：images, fonts 和 stylesheets。

webpack 关心性能和加载时间；它始终在改进或添加新功能，例如：异步地加载 chunk 和预取，以便为你的项目和用户提供最佳体验。

**参考文档**
[资料](https://webpack.docschina.org/concepts/why-webpack/)

**参考文档**

[资料](https://webpack.docschina.org/concepts/)

[资料](https://www.webpackjs.com/concepts/under-the-hood/)

## webpack-dev-server  {#p1-webpack-de-server}

webpack-dev-server 是一个开发服务器，它提供了一个快速开发的环境，并且配合Webpack使用。它的作用主要有以下几个方面：

1. **自动编译和打包**：webpack-dev-server 可以监听源文件的变化，当文件发生改动时，它会自动重新编译和打包，保证开发过程中始终使用最新的代码。

2. **热模块替换（Hot Module Replacement）**：webpack-dev-server 支持热模块替换，即在开发过程中，当某个模块发生变化时，只会重新编译该模块，而不是整个应用，然后将变更的模块替换到浏览器中，从而实现实时更新，无需手动刷新页面。

3. **代理和反向代理**：webpack-dev-server 可以配置代理，用于解决前端开发中跨域请求的问题。可以将某些请求转发到其他服务器，或者改变请求的路径。

4. **路由处理**：webpack-dev-server 也支持将所有请求重定向到特定的 HTML 文件，用于前端单页应用的路由处理，可以通过配置实现 SPA（Single Page Application）的路由。

5. **静态文件服务**：webpack-dev-server 可以将打包后的文件提供给浏览器访问，可以通过配置指定静态文件的路径，并且通过指定的端口提供服务。

总结来说，webpack-dev-server 提供了一个方便的开发环境，可以实时编译和打包代码，并且支持热模块替换，代理和反向代理，路由处理等功能，提高了开发效率和开发体验。

**webpack-dev-server 有编译和打包的能力？**

webpack-dev-server本身并没有编译和打包的能力，它是使用Webpack来实现编译和打包的。
webpack-dev-server是基于Webpack的一个开发服务器，**它通过监听源文件的变化，自动调用Webpack进行编译和打包，并将打包后的文件提供给浏览器访问**。
这样可以在开发过程中实时更新代码，无需手动进行编译和打包操作。
webpack-dev-server还支持热模块替换等功能，提供了一个方便的开发环境。
但是需要注意的是，webpack-dev-server只适用于开发阶段，它并不会生成最终的打包文件，而是将打包后的文件保存在内存中，提供给浏览器访问。
在真正发布项目时，还需要运行Webpack的打包命令生成最终的打包文件。

## chunk 是什么概念，介绍一下？ {#p0-chunk-concept}

在Webpack中，Chunk（代码块）是指Webpack在构建过程中生成的一个或多个独立的文件，它包含了一组相关的模块。每个Chunk都有一个唯一的标识符，可以通过该标识符来访问和加载对应的Chunk。

Webpack根据指定的入口文件和依赖关系图来确定需要生成哪些Chunk。入口文件是Webpack构建的起点，而依赖关系图描述了每个模块之间的依赖关系。Webpack根据这些信息将模块分割为不同的代码块，并生成相应的Chunk。

**Chunk的主要作用是实现代码的分割和按需加载**。通过将代码拆分为多个Chunk，Webpack可以进行按需加载，只有在需要时才加载对应的Chunk，从而减少了初始加载的大小和时间。这样可以提高应用程序的性能和加载速度。

Webpack提供了多种代码分割的方式，包括使用入口配置、使用动态导入语法（如import()）和使用Webpack插件（如SplitChunksPlugin）。这些方式可以帮助开发者将代码分割为不同的Chunk，并根据实际需求进行配置和优化。

具体而言，Webpack的代码分割机制通过两种方式来创建chunk：

1. 静态代码分割（Static Code Splitting）：在Webpack配置中使用`splitChunks`或`optimization.splitChunks`选项，可以将第三方库、公共模块或重复的模块分割成独立的chunk。这些chunk可以在多个入口文件之间共享，从而减少重复加载的代码。

2. 动态代码分割（Dynamic Code Splitting）：通过使用动态导入（Dynamic Import）语法，可以将应用程序的不同部分分割成独立的chunk。例如，在React中可以使用`React.lazy()`函数和`Suspense`组件来实现动态导入和渲染。

分割成的chunk可以通过Webpack的内置功能（如代码分割插件、懒加载等）实现按需加载，即当需要时才加载对应的chunk，从而减少初始加载时间并提高网页性能。

通过使用chunk，Webpack可以自动将代码分割成更小的部分，实现按需加载和并行加载，从而提高应用程序的性能和用户体验。

Webpack 在打包过程中生成 hash 码主要用于缓存和版本管理。主要有三种类型的 hash 码：

1. hash：是和整个项目的构建相关，只要项目文件有修改，整个项目构建的 hash 值就会更改。这意味着任何一个文件的改动都会影响到整体的 hash 值。

2. chunkhash：与 webpack 打包的 chunk 有关，不同的 entry 会生成不同的 chunkhash 值。例如，如果你的配置生成了多个 chunk（例如使用了 code splitting），每个 chunk 的更新只会影响到它自身的 chunkhash。

3. contenthash：根据文件内容来定义 hash，内容不变，则 contenthash 不变。这在使用诸如 CSS 提取到单独文件的插件时特别有用，因此只有当文件的内容实际改变时，浏览器才会重新下载文件。

生成方式：

* hash 和 chunkhash 主要是通过某种 hash 算法（默认 MD5）来对文件名或者 chunk 数据进行编码。
* contenthash 是通过构建时的 webpack 插件（如 mini-css-extract-plugin）来处理的，它会对文件内容进行 hash。

Hash 码的生成可以被 webpack 配置的 hashFunction，hashDigest，hashDigestLength 等选项影响。例如，你可以选择不同的算法如 SHA256 或者 MD5，以及可以决定 hash 值的长度。

在 webpack 的配置文件中，可以通过如下方式设定 hash:

```js
const config = {
  output: {
    filename: '[name].[chunkhash].js'
  }
}
```

这会将输出的文件名设置为入口名称加上基于每个 chunk 内容的 hash。在使用 `webpack-dev-server` 或者 `webpack --watch` 时，不会生成实际的文件，所以这些 hash 值是在内存中计算并关联的。

Webpack打包运行时chunk的方式可以通过optimization.runtimeChunk选项来配置。下面是一个示例的配置：

```js
module.exports = {
  // ...
  optimization: {
    runtimeChunk: 'single'
  }
}
```

上述配置中，通过设置optimization.runtimeChunk为'single'，将会把所有的webpack运行时代码打包为一个单独的chunk。

在项目工程中加载运行时chunk有两种方式：

1. 通过script标签加载：可以使用HtmlWebpackPlugin插件来自动将运行时chunk添加到 HTML 文件中。在webpack配置文件中添加以下配置：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      // ...
      chunks: ['runtime', 'app']
    })
  ]
}
```

上述配置中，chunks选项指定了要加载的chunk，包括运行时chunk（'runtime'）和其他的业务代码chunk（'app'）。最终生成的HTML文件会自动引入这些chunk。

2. 通过import语句动态加载：可以使用动态导入的方式来加载运行时chunk。在需要加载运行时chunk的地方，使用以下代码：

```js
import(/* webpackChunkName: "runtime" */ './path/to/runtime').then((runtime) => {
  // 运行时chunk加载完成后的逻辑
})
```

上述代码中，通过import()函数动态加载运行时chunk，通过webpackChunkName注释指定要加载的chunk名称（这里是'runtime'）。加载完成后，可以进行相关逻辑处理。

总结：Webpack可以通过optimization.runtimeChunk选项配置打包运行时chunk，可以通过script标签加载或者使用动态导入的方式来加载运行时chunk。

**追问**
> 如果只想把某几个文件打包成运行时加载， 该如何处理呢？

如果你想将某几个文件打包成运行时加载，可以使用Webpack的`entry`配置和`import()`语法来实现。

首先，在Webpack的配置文件中，将这几个文件指定为单独的`entry`点。例如：

```js
module.exports = {
  // ...
  entry: {
    main: './src/main.js',
    runtime: './src/runtime.js'
  }
}
```

上述配置中，`main.js`是业务代码的入口文件，`runtime.js`是你想要打包成运行时加载的文件。

然后，在你的业务代码中，通过`import()`动态导入这些文件。例如：

```js
function loadRuntime () {
  return import('./runtime.js')
}

// 使用动态导入的方式加载运行时文件
loadRuntime().then(runtime => {
  // 运行时文件加载完成后的逻辑
})
```

使用`import()`会返回一个`Promise`，可以通过`.then()`来处理文件加载完成后的逻辑。

最后，使用Webpack进行打包时，会根据配置的`entry`点和`import()`语法自动将这几个文件打包成运行时加载的模块。运行时模块会在需要时动态加载并执行。

注意：在使用`import()`动态导入文件时，需要确保你的环境支持`Promise`和动态导入语法。

**作为上面回复的补充**

除了 `entry` 的方式可以处理自己申明的 runtime 文件以外， 还可以直接在 `import('xx')` 的时候申明；
例如：

```js
import(/* webpackChunkName: "runtime" */ './path/to/runtime').then((runtime) => {
  // 运行时chunk加载完成后的逻辑
})
```

上面的方式， 可以在也可以达到同样的效果， 只是在 `import` 的时候申明runtime文件名称而已

## webpack 的主要配置项有哪些 {#p1-webpack-config}

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

```js
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

## 如何配置多入口应用， 且区分公共依赖的？{#p1-config-entry}

在Webpack中配置多入口应用并区分公共依赖，可以通过以下步骤进行配置：

1. 在Webpack配置文件中，使用entry属性指定多个入口文件，并为每个入口文件命名一个唯一的键名。例如：

```js
module.exports = {
  entry: {
    app1: './src/app1.js',
    app2: './src/app2.js'
  }
  // 其他配置项...
}
```

上面的配置指定了两个入口文件app1.js和app2.js，并为它们分别指定了键名app1和app2。

2. 使用SplitChunks插件进行公共依赖的提取。在Webpack配置文件中添加以下配置：

```js
module.exports = {
  // 其他配置项...
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  }
}
```

上面的配置中，我们使用optimization.splitChunks.cacheGroups选项配置了一个名为commons的缓存组。该缓存组将对公共依赖进行提取，name属性指定了提取后文件的名称，chunks属性指定了提取的范围为所有类型的块（入口文件和异步加载的块），minChunks属性指定了至少被引用两次的模块才会被提取为公共依赖。

3. 添加output配置，指定打包后文件的输出路径和文件名。例如：

```js
module.exports = {
  // 其他配置项...
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

上面的配置中，使用[name]占位符来动态生成根据入口文件的键名生成对应的文件名。

通过以上配置，Webpack将会根据指定的多个入口文件进行打包，并在打包过程中自动提取公共依赖为一个独立的文件。例如，假设app1.js和app2.js都引用了lodash库，那么在打包后的结果中，lodash库将会被提取为commons.bundle.js文件，而app1.js和app2.js则分别生成对应的app1.bundle.js和app2.bundle.js。

**追问**
> 上面的配置， 最终会输出几个文件？

根据上述的打包配置，最终将会输出3个文件。假设配置的多入口应用有两个入口文件app1.js和app2.js，并且两个入口文件都引用了lodash库作为公共依赖。

根据上述的配置，Webpack将会进行以下操作：

1. 根据entry配置，将app1.js和app2.js作为入口文件进行打包。
2. 遇到公共依赖lodash库时，使用SplitChunks插件将其提取为独立的文件commons.bundle.js。
3. 根据output配置，将app1.js打包后生成app1.bundle.js，将app2.js打包后生成app2.bundle.js，将commons.bundle.js生成commons.bundle.js。
4. 最终，在输出路径下将会生成3个文件：app1.bundle.js、app2.bundle.js和commons.bundle.js。

## webpack 优化 {#p0-webpack-profile}

围绕 `webpack` 做性能优化，分为两个方面：`构建时间优化`、`构建产物优化`

<!-- toc -->
* 优化构建时间
[缩小范围](#%E7%BC%A9%E5%B0%8F%E8%8C%83%E5%9B%B4)
[文件后缀](#%E6%96%87%E4%BB%B6%E5%90%8E%E7%BC%80)
[别名](#%E5%88%AB%E5%90%8D)
[缓存](#%E7%BC%93%E5%AD%98)
[并行构建](#%E5%B9%B6%E8%A1%8C%E6%9E%84%E5%BB%BA)
[定向查找第三方模块](#%E5%AE%9A%E5%90%91%E6%9F%A5%E6%89%BE%E7%AC%AC%E4%B8%89%E6%96%B9%E6%A8%A1%E5%9D%97)
* [构建产物](#%E6%9E%84%E5%BB%BA%E7%BB%93%E6%9E%9C%E4%BC%98%E5%8C%96)
[压缩 js](#%E5%8E%8B%E7%BC%A9-js)
[压缩 css](#%E5%8E%8B%E7%BC%A9-css)
[压缩 html](#%E5%8E%8B%E7%BC%A9-html)
[压缩图片](#%E5%8E%8B%E7%BC%A9%E5%9B%BE%E7%89%87)
[按需加载](#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)
[prload、prefetch](#prloadprefetch)
[代码分割](#%E4%BB%A3%E7%A0%81%E5%88%86%E5%89%B2)
[tree shaking](#tree-shaking)
[gzip](#gzip)
[作用域提升](#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%90%E5%8D%87)

<!-- tocstop -->

 构建时间优化

 缩小范围

我们在使用 loader 时，可以配置 `include`、`exclude`缩小 loader 对文件的搜索范围，以此来提高构建速率。

像 `/node_moudles` 目录下的体积辣么大，又是第三方包的存储目录，直接 `exclude` 掉可以节省一定的时间的。

当然 `exclude` 和 `include` 可以一起配置，大部分情况下都是只需要使用 loader 编译 src 目录下的代码

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(|ts|tsx|js|jsx)$/,
        // 只解析 src 文件夹下的 ts、tsx、js、jsx 文件
        // include 可以是数组，表示多个文件夹下的模块都要解析
        include: path.resolve(__dirname, '../src'),
        use: ['thread-loader', 'babel-loader'],

        // 当然也可以配置 exclude，表示 loader 解析时不会编译这部分文件
        // 同样 exclude 也可以是数组
        exclude: /node_modules/
      }
    ]
  }
}
```

还需注意一个点就是要确保 loader 的`准确性`，**比如不要使用 less-loader 去解析 css 文件**

 文件后缀

`resolve.extensions` 是我们常用的一个配置，他可以在导入语句没有带文件后缀时，可以按照配置的列表，自动补上后缀。**我们应该根据我们项目中文件的实际使用情况设置后缀列表，将使用频率高的放在前面、同时后缀列表也要尽可能的少，减少没有必要的匹配**。同时，我们在源码中写导入语句的时候，尽量带上后缀，避免查找匹配浪费时间。

```js
module.export = {
  resolve: {
    // 按照 tsx、ts、jsx、js 的顺序匹配，若没匹配到则报错
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  }
}
```

 别名

通过配置 `resolve.alias` 别名的方式，减少引用文件的路径复杂度

```js
// 引入 src 下的某个模块时
import XXX from '@/xxx/xxx.tsx'

module.exports = {
  resolve: {
    alias: {
      // 把 src 文件夹别名为 @
      // 引入 src 下的文件就可以 import xxx from '@/xxx'
      '@': path.join(__dirname, '../src')
    }
  }
}
```

 缓存

在优化的方案中，缓存也是其中重要的一环。在构建过程中，开启缓存提升二次打包速度。

在项目中，js 文件是占大头的，当项目越来越大时，如果每次都需要去编译 JS 代码，那么构建的速度肯定会很慢的，所以我们可以配置 `babel-loader` 的缓存配置项 `cacheDirectory` 来缓存没有变过的 js 代码

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  }
}
```

上面的缓存优化只是针对像 `babel-loader` 这样可以配置缓存的 loader，那没有缓存配置的 loader 该怎么使用缓存呢，此时需要 `cache-loader`

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [
          'cache-loader',
          'babel-loader'
        ]
      }
    ]
  }
}
```

编译后同样多一个 `/node_modules/.cache/cache-loader` 缓存目录

当然还有一种方式，`webpack5`直接提供了 `cache` 配置项，开启后即可缓存

```js
module.exports = {
  cache: {
    type: 'filesystem'
  }
}
```

编译后会多出 `/node_modules/.cache/webpack` 缓存目录

 并行构建

首先，运行在`Node`里的`webpack`是单线程的，所以一次性只能干一件事，那如果利用电脑的多核优势，也能提高构建速度 ？[thread-loader](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fthread-loader "https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fthread-loader")可以开启多进程打包

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.jsx?$/,
        use: [
          // 开启多进程打包。
          {
            loader: 'thread-loader',
            options: {
              workers: 3 // 开启 3个 进程
            }
          },
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
```

放置在这个 `thread-loader` 之后的 loader 就会在一个单独的 worker 池(worker pool) 中运行。

每个 worker 都是一个单独的有 600ms 限制的 `node.js` 进程。同时跨进程的数据交换也会被限制。所以建议仅在耗时的 loader 上使用。若项目文件不算多就不要使用，毕竟开启多个线程也会存在性能开销。

 定向查找第三方模块

`resolve.modules` 配置用于指定 `webpack` 去哪些目录下寻找第三方模块。默认值是 `['node_modules']`。而在引入模块的时候，会以 `node 核心模块 -----> node_modules ------> node全局模块` 的顺序查找模块。

我们通过配置 resolve.modules 指定 webpack 搜索第三方模块的范围，提高构建速率

```js
module.export = {
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')]
  }
}
```

 构建产物优化

 压缩 js

webpack5的话通过 `terser-webpack-plugin` 来压缩 JS，但在配置了 `mode: production` 时，会默认开启

```js
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  optimization: {
    // 开启压缩
    minimize: true,
    // 压缩工具
    minimizer: [
      new TerserPlugin({})
    ]
  }
}
```

需要注意一个地方：生产环境会默认配置`terser-webpack-plugin`，所以如果你还有其它压缩插件使用的话需要将`TerserPlugin`显示配置或者使用`...`，否则`terser-webpack-plugin`会被覆盖。

```js
const TerserPlugin = require('terser-webpack-plugin')

const config = {
  optimization: {
    minimizer: [
      new TerserPlugin({}), // 显示配置
      // "...", // 或者使用展开符，启用默认插件
      // 其它压缩插件
      new CssMinimizerPlugin()
    ]
  }
}
```

 压缩 css

压缩 css 我们使用 `css-minimizer-webpack-plugin`

同时，应该把 css 提取成单独的文件，使用 `mini-css-extract-plugin`

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 提取成单独的文件
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: 'asset/css/main.css'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // 压缩 css
      new CssMinimizerPlugin({})
    ]
  }
}
```

 压缩 html

压缩 `html` 使用的还是 `html-webpack-plugin` 插件。该插件支持配置一个 [minify](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fkangax%2Fhtml-minifier%23options-quick-reference "https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fkangax%2Fhtml-minifier%23options-quick-reference") 对象，用来配置压缩 `html`。

```js
module.export = {
  plugins: [
    new HtmlWebpackPlugin({
      // 动态生成 html 文件
      template: './index.html',
      minify: {
        // 压缩HTML
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 删除空⽩符与换⾏符
        minifyCSS: true // 压缩内联css
      }
    })
  ]
}
```

 压缩图片

可以通过 `image-webpack-loader` 来实现

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true
              },
              optipng: {
                enabled: false
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4
              },
              gifsicle: {
                interlaced: false
              }
            }
          }
        ],
        exclude: /node_modules/ // 排除 node_modules 目录
      }
    ]
  }
}
```

 按需加载

很多时候我们不需要一次性加载所有的`JS`文件，而应该在不同阶段去加载所需要的代码。

**将路由页面/触发性功能单独打包为一个文件，使用时才加载**，好处是`减轻首屏渲染的负担`。因为项目功能越多其打包体积越大，导致首屏渲染速度越慢。

实际项目中大部分是对懒加载路由，而懒加载路由可以打包到一个 chunk 里面。比如某个列表页和编辑页它们之间存在相互跳转，如果对它们拆分成两个 `import()` js 资源加载模块，在跳转过程中视图会出现白屏切换过程。

因为在跳转期间，浏览器会动态创建 script 标签来加载这个 `chunk` 文件，在这期间，页面是没有任何内容的。

所以一般会把路由懒加载打包到一个 chunk 里面

```js
const List = lazyComponent('list', () => import(/* webpackChunkName: "list" */ '@/pages/list'))
const Edit = lazyComponent('edit', () => import(/* webpackChunkName: "list" */ '@/pages/edit'))
```

但需要注意一点：**动态导入 import() 一个模块，这个模块就不能再出现被其他模块使用 `同步 import` 方式导入。**

比如，一个路由模块在注册 `<Route />` 时采用动态 import() 导入，但在这个模块对外暴露了一些变量方法供其他子模块使用，在这些子模块中使用了同步 ESModule import 方式引入，这就造成了 `动态 import()` 的失效。

 prload、prefetch

对于某些较大的模块，如果点击时再加载，那可能响应的时间反而延长。我们可以使用 `prefetch`、`preload` 去加载这些模块

`prefetch`：将来可能需要一些模块资源（一般是其他页面的代码），在核心代码加载完成之后`带宽空闲`的时候再去加载需要用到的模块代码。

`preload`：当前核心代码加载期间可能需要模块资源（**当前页面需要的但暂时还没使用到的**），其是和核心代码文件一起去加载的。

只需要通过`魔法注释`即可实现，以 `prefetch` 为例：

```js
document.getElementById('btn1').onclick = function () {
  import(
    // webpackChunkName: "btnChunk" */
    // webpackPrefetch: true*/
    './module1.js'
  ).then(fn => fn.default())
}
```

这行代码表示在浏览器空闲时加载 module1.js 模块，并且单独拆一个 chunk，叫做 btnChunk

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2e2b2771db547138ed818cd33d23139~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

可以看到，在`head`里面，我们的懒加载模块被直接引入了，并且加上了`rel='prefetch'`。

这样，页面首次加载的时候，浏览器空闲的会后会提前加载`module1.js`。当我们点击按钮的时候，会直接从缓存中读取该文件，因此速度非常快。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95cd9e7ee4b345ec8ef5eca12947f650~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

 代码分割

在项目中，一般是使用同一套技术栈和公共资源。**如果每个页面的代码中都有这些公开资源，就会导致资源的浪费**。在每一个页面下都会加载重复的公共资源，一是会浪费用户的流量，二是不利于项目的性能，造成页面加载缓慢，影响用户体验。

一般是把不变的**第三方库**、**一些公共模块**（比如 util.js）这些单独拆成一个 chunk，在访问页面的时候，就可以一直使用浏览器缓存中的资源

webpack 里面通过 `splitChunks` 来分割代码

```js
module.exports = {
  // ...
  optimization: {
    splitChunks: {
      chunks: 'async', // 值有 `all`，`async` 和 `initial`
      minSize: 20000, // 生成 chunk 的最小体积（以 bytes 为单位）。
      minRemainingSize: 0,
      minChunks: 1, // 拆分前必须共享模块的最小 chunks 数。
      maxAsyncRequests: 30, // 按需加载时的最大并行请求数。
      maxInitialRequests: 30, // 入口点的最大并行请求数。
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[/]node_modules[/]/, // 第三方模块拆出来
          priority: -10,
          reuseExistingChunk: true
        },
        vendors: {
          test: /[/]utils[/]/, // 公共模块拆出来
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
}
```

 tree shaking

tree shaking 的原理细节可以看这篇文章[：# webpack tree-shaking解析](https://juejin.cn/post/7246219936594821180 "https://juejin.cn/post/7246219936594821180")

`tree shaking`在**生产模式下已经默认开启了**

只是需要注意下面几点：

1. 只对`ESM`生效
2. 只能是静态声明和引用的 `ES6` 模块，不能是动态引入和声明的。
3. 只能处理模块级别，不能处理函数级别的冗余。
4. 只能处理 `JS` 相关冗余代码，不能处理 `CSS` 冗余代码。

而可能样式文件里面有些代码我们也没有使用，我们可以通过`purgecss-webpack-plugin` 插件来对 css 进行 tree shaking

```js
const path = require('path')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob') // 文件匹配模式

module.exports = {
  // ...
  plugins: [
    ...new PurgeCSSPlugin({
      paths: glob.sync(`${PATH.src}/**/*`, { nodir: true })
    })

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ]
}
```

 gzip

前端除了在打包的时候将无用的代码或者 `console`、注释剔除之外。我们还可以使用 `Gzip` 对资源进行进一步压缩。那么浏览器和服务端是如何通信来支持 `Gzip` 呢？

1. 当用户访问 web 站点的时候，会在 `request header` 中设置 `accept-encoding:gzip`，表明浏览器是否支持 `Gzip`。
2. 服务器在收到请求后，判断如果需要返回 `Gzip` 压缩后的文件那么服务器就会先将我们的 `JS\CSS` 等其他资源文件进行 `Gzip` 压缩后再传输到客户端，同时将 `response headers` 设置 `content-encoding:gzip`。反之，则返回源文件。
3. 浏览器在接收到服务器返回的文件后，判断服务端返回的内容是否为压缩过的内容，是的话则进行解压操作。

一般情况下我们并不会让服务器实时 `Gzip` 压缩，而是利用`webpack`提前将静态资源进行`Gzip` 压缩，然后将`Gzip` 资源放到服务器，当请求需要的时候直接将`Gzip` 资源发送给客户端。

我们只需要安装 `compression-webpack-plugin` 并在`plugins`配置就可以了

```js
const CompressionWebpackPlugin = require('compression-webpack-plugin') // 需要安装

module.exports = {
  plugins: [
    new CompressionWebpackPlugin()
  ]
}
```

 作用域提升

`Scope Hoisting` 可以让 `webpack` 打包出来的代码文件体积更小，运行更快。

在开启 `Scope Hoisting`后，**构建后的代码会按照引入顺序放到一个函数作用域里，通过适当重命名某些变量以防止变量名冲突**，从而减少函数声明和内存花销。

需要注意：`Scope Hoisting` 需要分析模块之间的依赖关系，所以源码必须采用 ES6 模块化语法

`Scope Hoisting` 是 webpack 内置功能，只需要在`plugins`里面使用即可，或者直接开启生产环境也可以让作用域提升生效。

```js
module.exports = {
  // 方式1
  mode: 'production',

  // 方式2
  plugins: [
    // 开启 Scope Hoisting 功能
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}
```

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

```js
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({

      })
    ]
  }
}
```

 3. **代码分割(Code Splitting)**

通过代码分割，你可以把代码分成多个 bundle，然后按需加载，从而减少初始加载时间。Webpack 提供了多种分割代码的方式，最常见的是动态导入（Dynamic Imports）。

```js
import(/* webpackChunkName: "my-chunk-name" */ 'path/to/myModule').then((module) => {
  // 使用module
})
```

 4. **使用 Externals 减轻体积**

通过配置 externals 选项，可以阻止 Webpack 将某些 import 的包打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖。

```js
module.exports = {
  externals: {
    jquery: 'jQuery'
  }
}
```

 5. **利用缓存(Caching)**

使用 `[contenthash]` 替换 `[hash]` 或 `[chunkhash]` 来为输出文件命名，这确保了只有当文件内容改变时，文件名称才会改变，可以更好地利用浏览器缓存。

```js
const config = {
  output: {
    filename: '[name].[contenthash].js'
  }
}
```

6. **移除未使用的 CSS**

使用 PurgeCSS 或`purify-css`等工具检查你的 CSS 文件，自动去除未使用的 CSS，可以极大地压缩 CSS 的体积。

```js
const PurgecssPlugin = require('purgecss-webpack-plugin')
```

7. **优化图片**

使用`image-webpack-loader`等图片压缩插件，可以减小图片文件的体积。

```js
const config = {
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
            }
          }
        ]
      }
    ]
  }
}
```

 8. **使用动态 Polyfills**

只为那些实际需要它们的浏览器提供 polyfills，而不是所有浏览器都提供。

以上方法和技巧可以根据项目的具体需求和情况灵活使用，有的方法可能会对构建和重构现有代码产生较大影响，因此在采用前应评估其必要性和影响。

 9. **高版本浏览器直接使用 es6 代码**

将代码编译（或者说不编译）为 ES6（ECMAScript 2015）或更高版本的 JavaScript 代码，确实可以减少产物体积。

以下是一些可以提高Webpack构建速度的办法：

1. 使用更快的构建工具：升级Webpack到最新版本，因为每个新版本通常都会带来性能改进和优化。

2. 减少文件的数量：通过代码拆分和按需加载等技术，将代码拆分成更小的模块，减少每次构建需要处理的文件数量。

3. 使用缓存：启用Webpack的缓存功能，可以在多次构建过程中复用已经构建好的模块，从而减少重新构建的时间。

4. 使用多线程/多进程构建：通过使用工具如HappyPack或thread-loader等，可以将Webpack的构建过程并行化，利用多线程或多进程来加速构建速度。

5. 优化Loader配置：确保Loader的配置尽可能精确，只对需要处理的文件进行操作，并且使用高效的Loader插件。避免不必要的文件处理和转换，以提高构建速度。

6. 使用DLL和缓存组：使用Webpack的DLLPlugin和CacheGroups等功能，可以将一些稳定不变的依赖提前编译和缓存，减少每次构建的时间。

7. 压缩输出文件：使用Webpack的压缩插件（如UglifyJsPlugin）对输出文件进行压缩和混淆，减小文件大小，加快加载速度。

8. 配置resolve.extensions：通过配置Webpack的resolve.extensions，明确指定需要处理的文件类型，避免Webpack进行多余的文件扫描和匹配。

9. 开启持久化缓存：使用Webpack的持久化缓存插件（如HardSourceWebpackPlugin），将构建过程中的中间结果缓存到硬盘中，提高后续构建的速度。

10. 使用Tree Shaking：利用Webpack的Tree Shaking特性，移除未使用的代码，减小输出文件的体积，加快加载速度。

这些是提高Webpack构建速度的一些常见方法，可以根据具体项目的需求和情况选择适合的优化策略。同时，不同的项目和环境可能会有不同的性能瓶颈，因此需要根据实际情况进行具体的优化和调整。

## webpack 打包 {#p0-webpack-bundler}

**依赖打包**

为了实现你的需求，即将所有外部依赖（`node_modules` 中的依赖）打包成一个单独的包，而你自己的源码打包成另一个包，可以通过配置 Webpack 的 `optimization.splitChunks` 选项来实现。下面是具体的实施方案：

 1. 编辑 `webpack.config.js`

在你的 `webpack.config.js` 配置文件中，找到或添加 `optimization` 部分，并在 `splitChunks` 中配置如下：

```js
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

```js
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

```js
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

```js
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

```js
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

```js
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

## 分包的方式有哪些？{#p0-webpack-package}

1. 通过 `entry` 属性指定入口文件，在打包时，Webpack 会按照入口文件生成一个 chunk，每个 chunk 包含了一组代码块，最终生成一个或多个 bundle。

2. 通过 `SplitChunksPlugin` 插件对公共依赖进行分割。该插件会把公共依赖提取出来，形成一个或多个独立的 chunk，以便在多个 bundle 中共享。

3. 使用动态导入（Dynamic Import）技术进行按需加载。在代码中使用 `import()` 或 `require.ensure()`，Webpack 会将这些代码块按照配置的策略进行分割，生成一个或多个独立的 chunk。

4. 使用 `DllPlugin` 插件将一些不经常变化的代码提取出来，形成一个动态链接库（DLL）。在打包时，可以直接引用这个 DLL，而不必重复打包。

5. 通过 `externals` 属性将一些模块声明为外部依赖。在打包时，Webpack 会跳过这些模块的打包过程，而是在运行时从外部环境中加载。

 SplitChunksPlugin 是怎么对公共依赖进行分割的 ?

Webpack的SplitChunksPlugin插件是用来对公共依赖进行分割的，其原理是将公共模块提取出来，形成一个或多个共享块，并在需要时动态加载。这个插件会分析模块之间的依赖关系，将具有相同引用模块的代码块进行提取，以便于实现缓存和更快的加载。

SplitChunksPlugin的默认配置包括以下三个块：

1. 通过异步加载（异步块）生成的代码块
2. 与初始块（即入口点）共享的代码块
3. 在两个或更多块之间共享的代码块

其中，第二个块是最常见的，它包括从多个入口点引用的公共模块。我们可以通过以下示例来说明：

```js
// webpack.config.js
module.exports = {
  entry: {
    main: './src/main.js',
    other: './src/other.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
```

在上面的配置中，我们定义了两个入口点`main`和`other`，并将`SplitChunksPlugin`配置为将从`node_modules`目录中引用的代码提取到名为`vendors`的代码块中。这个代码块将被引用到我们的入口点中，以便于减少加载时间和提高性能。

当我们打包时，Webpack将分析这两个入口点，并发现它们都引用了`node_modules`目录下的依赖，于是将这些依赖提取到`vendors`代码块中。我们可以在`main.js`和`other.js`中看到这样的代码：

```js
import 'lodash' // 公共模块被引用
```

通过这种方式，Webpack能够将公共代码提取到单独的代码块中，以便于更高效地加载和缓存。

 webpack DllPlugin 是如何提取依赖的？

Webpack DllPlugin 是用于将某些库（例如第三方库）提前编译和打包，以便在开发和生产构建过程中减少依赖项的分析时间，提高打包速度的插件。

具体来说，DllPlugin 分为两个步骤：第一步是生成一个包含库的映射文件（manifest.json），第二步是在开发或生产构建中使用该映射文件来引入预编译的库。

DllPlugin 的基本原理是将库单独编译成一个或多个 dll 文件（动态链接库），同时生成一个 manifest.json 文件记录这些库文件的名称、路径等信息。在开发或生产构建过程中，通过引用 manifest.json 文件，将已经预编译好的库文件引入到项目中。这样可以避免在每次打包时都去分析和打包第三方库，提高构建速度。

下面是一个简单的例子：

在 webpack.config.dll.js 中定义打包的库：

```lua
luaCopy codeconst path = require('path');
const webpack = require('webpack');

module.exports = {
 mode: 'production',
 entry: {
 vendor: ['react', 'react-dom', 'lodash']
 },
 output: {
 path: path.join(__dirname, 'dist'),
 filename: '[name].dll.js',
 library: '[name]'
 },
 plugins: [
 new webpack.DllPlugin({
 name: '[name]',
 path: path.join(__dirname, 'dist', '[name].manifest.json')
 })
 ]
};
```

然后运行 `webpack --config webpack.config.dll.js`，会生成 `vendor.dll.js` 和 `vendor.manifest.json` 文件。

在开发或生产环境中，通过引入生成的 manifest.json 文件，将预编译好的库文件引入项目中：

```lua
luaCopy codeconst path = require('path');
const webpack = require('webpack');

module.exports = {
 mode: 'production',
 entry: {
 app: './src/index.js'
 },
 output: {
 path: path.join(__dirname, 'dist'),
 filename: '[name].js'
 },
 plugins: [
 new webpack.DllReferencePlugin({
 manifest: require('./dist/vendor.manifest.json')
 })
 ]
};
```

这样，在打包过程中，webpack 会自动将 `vendor.dll.js` 中包含的第三方库从项目中分离出来，而不需要重复打包和分析这些库。

## 异步加载原理是啥 {#p0-async-load}

1. 使用动态 import: 使用 ES6 的 `import()` 语法，动态加载模块。

```js
import('./path/to/module')
  .then(module => {
    // do something with module
  })
  .catch(error => {
    console.error(error)
    // handle error
  })
```

2. 使用 require.ensure: 异步加载模块并将其放置到指定的 chunk 中。

```js
require.ensure(['./path/to/module'], function (require) {
  const module = require('./path/to/module')
  // do something with module
})
```

3. 使用 bundle-loader: 将模块放置到一个单独的文件中，按需加载。

```js
// eslint-disable-next-line
const load = require('bundle-loader!./path/to/module')
load(function (module) {
  // do something with module
})
```

4. 使用webpack的require.ensure API

```js
require.ensure([], function (require) {
  // require dependencies
  const foo = require('./foo')
  // ...
})
```

5. 使用webpack的import动态导入

```js
import('./dynamic-module.js').then(module => {
  // do something with module
})
```

这些方式都可以在 Webpack 中使用，具体使用哪种方式，取决于具体的场景和需求。

 动态加载的原理

在 Webpack 中，异步加载组件的原理是利用动态导入（Dynamic import）特性。使用动态导入可以将模块的加载从编译时刻延迟到运行时刻。

具体来说，当 Webpack 打包代码时，遇到动态导入语句时不会将其打包进入主文件，而是将其单独打包为一个新的文件。在运行时，当代码需要加载该组件时，会通过网络请求动态加载该文件。

这样做的好处是可以减小主文件的体积，从而加快页面的加载速度，并且也可以提高代码的灵活性和可维护性。同时，Webpack 还可以对动态加载的文件进行代码分割和按需加载，进一步优化页面的性能。

在使用动态导入时，需要注意一些细节。例如，在支持动态导入的浏览器中，需要使用 `import()` 函数进行动态导入；而在不支持动态导入的浏览器中，需要使用 Webpack 提供的 `require.ensure` 或 `require.include` 等方法进行模块的异步加载。同时，还需要注意动态导入的兼容性和性能问题。

## webpack 编译如何将源码和依赖打包到不同路径 {#p1-webpack-compile}

1. **使用 Webpack 的`optimize-module-ids`插件（用于区分模块来源）**

* **原理**：Webpack 在打包过程中会为每个模块分配一个唯一的`module.id`。`optimize-module-ids`插件可以帮助控制模块标识符的生成方式，使得能够根据模块是源文件还是外部依赖来区分它们。
* **配置步骤**：

* 首先，安装`optimize-module-ids`插件（可能需要自行开发类似功能插件或寻找已有合适插件）。
* 然后，在 Webpack 配置文件中添加插件配置。例如：

 ```js
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

 ```js
 module.exports = {
 // ...其他配置
   stats: 'verbose'
 }
 ```

 之后便可通过分析生成的统计文件或在终端输出的详细统计信息来区分不同来源的模块。

3. **自定义打包结构或命名规则（在输出阶段区分）**

* **分离输出目录**：在 Webpack 的输出配置（`output`）中，可以设置不同的输出路径来分离源文件和外部依赖的打包产物。例如：

 ```js
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

```js
module.exports = {
  entry: {
    main: './src/index.js', // 你的应用代码
    vendor: ['react', 'react-dom', 'react-router'] // 指定共享库
  }
  // ...
}
```

2. **使用 `SplitChunksPlugin`**: 这个插件可以将共享代码分割成不同的 chunks，并可以通过配置将其从业务代码中分离出来。在 Webpack 4 及之后的版本中，默认内置了 `optimization.splitChunks`，就是这个插件的配置方法。

```js
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

```
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

| 插件名称 | 作用 |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `HtmlWebpackPlugin` | 自动生成 HTML 文件，并将打包后的资源自动注入到 HTML 中。 |
| `MiniCssExtractPlugin` | 将 CSS 代码提取到单独的文件中，而不是内联到 JavaScript 中。 |
| `CopyWebpackPlugin` | 将指定的文件或目录复制到输出目录。 |
| `CleanWebpackPlugin` | 在每次构建之前清理输出目录，避免旧的文件残留。 |
| `DefinePlugin` | 在编译过程中创建全局常量，可以在代码中直接使用。 |
| `HotModuleReplacementPlugin` | 启用热模块更换（Hot Module Replacement），在开发过程中实现代码修改后实时更新页面，无需刷新。 |
| `ProvidePlugin` | 自动加载模块，使模块在使用时可以直接使用对应的全局变量，无需引入。 |
| `MiniCssExtractPlugin` | 将 CSS 代码提取到单独的文件中，而不是内联到 JavaScript 中。 |
| `OptimizeCSSAssetsPlugin` | 压缩提取出的 CSS 文件。 |
| `uglifyjs-webpack-plugin` | 压缩 JavaScript 代码。 |
| `webpack-bundle-analyzer` | 分析打包后的文件大小，并可视化展示，方便优化打包结果。 |
| `CompressionWebpackPlugin` | 使用 gzip 或其他压缩算法对文件进行压缩，减小文件大小，加快网络传输速度。 |
| `CopyWebpackPlugin` | 将指定的文件或目录复制到输出目录。 |
| `FriendlyErrorsWebpackPlugin` | 提供友好的构建错误提示和优化构建速度的功能。 |
| `ImageminWebpackPlugin` | 压缩图片资源，减小文件大小，提升加载速度。 |
| `HotModuleReplacementPlugin` | 启用热模块更换（Hot Module Replacement），在开发过程中实现代码修改后实时更新页面，无需刷新。 |
| `HtmlWebpackPlugin` | 自动生成 HTML 文件，并将打包后的资源自动注入到 HTML 中。 |
| `IgnorePlugin` | 忽略特定的模块，避免将其打包到最终的输出文件中。 |
| `BannerPlugin` | 在打包的文件块顶部添加自定义的注释和信息。 |
| `webpack.DefinePlugin` | 在编译过程中创建全局常量，可以在代码中直接使用。 |
| `webpack.ProgressPlugin` | 在控制台输出构建进度信息。 |
| `webpack-bundle-analyzer` | 分析打包后的文件大小，并可视化展示，方便优化打包结果。 |
| `webpackbar` | 在命令行中显示构建进度条，提供更直观的构建进度信息。 |

这些插件可以根据需要配置在 Webpack 的插件列表（`plugins`）中，以实现对构建过程的各种增强和优化操作。

| Loader 名称 | 作用 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `babel-loader` | 将 ES6+ 代码转换为 ES5 代码，以便在旧版浏览器中运行。 |
| `css-loader` | 解析 CSS 文件，处理 CSS 中的依赖关系，并将 CSS 转换为 JS 模块。 |
| `style-loader` | 将 CSS 代码以内联的方式注入到 HTML 页面中。 |
| `file-loader` | 处理文件资源（如图片、字体等），将文件复制到输出目录，并返回文件路径。 |
| `url-loader` | 与 `file-loader` 类似，但可以根据文件大小将文件转换为 Data URL（base64 格式）或文件路径。 |
| `sass-loader` | 解析 Sass/SCSS 文件，并将其转换为 CSS 代码。 |
| `less-loader` | 解析 Less 文件，并将其转换为 CSS 代码。 |
| `postcss-loader` | 使用 PostCSS 处理 CSS，可以进行自动添加前缀、压缩、CSS Modules 等操作。 |
| `ts-loader` | 将 TypeScript 代码转换为 JavaScript 代码。 |
| `eslint-loader` | 在构建过程中使用 ESLint 进行代码检查。 |
| `stylelint-webpack-plugin` | 在构建过程中使用 Stylelint 进行 CSS/SCSS 代码检查。 |
| `vue-loader` | 解析 Vue 单文件组件（.vue 文件），并将其转换为 JavaScript 代码。 |
| `image-webpack-loader` | 优化图片资源，包括压缩、转换格式等操作。 |
| `html-loader` | 解析 HTML 文件，处理其中的引用资源（如图片、字体等），并返回处理后的 HTML 代码。 |
| `markdown-loader` | 将 Markdown 文件转换为 HTML 代码。 |
| `json-loader` | 解析 JSON 文件，并返回解析后的 JavaScript 对象。 |
| `eslint-loader` | 在构建过程中使用 ESLint 进行代码检查。 |
| `tslint-loader` | 在构建过程中使用 TSLint 进行 TypeScript 代码检查。 |
| `prettier-loader` | 在构建过程中使用 Prettier 进行代码格式化。 |
| `stylelint-webpack-plugin` | 在构建过程中使用 Stylelint 进行 CSS/SCSS 代码检查。 |
| `mini-css-extract-plugin` | 提取 CSS 代码到单独的文件，而不是内联到 JavaScript 代码中。 |
| `optimize-css-assets-webpack-plugin` | 压缩 CSS 代码。 |
| `terser-webpack-plugin` | 压缩 JavaScript 代码。 |

这些 Loader 可以根据需要配置在 Webpack 的模块规则（`module.rules`）中，以实现对不同类型文件的处理和转换操作。

## loader 和 plugin 有啥区别 {#p0-loader-plugin}

* created_at: 2023-04-03T00:55:06Z
* updated_at: 2023-04-03T00:55:06Z
* labels: 工程化, 阿里巴巴
* milestone: 中

在Webpack中，Loader和Plugin是两个不同的概念，它们的作用和使用方式也有所不同。

Loader用于对源代码文件进行转换和处理，而Plugin用于对Webpack的编译过程进行扩展和增强。

* **Loader**

Loader是Webpack中的一个核心概念，它用于处理源代码文件，将它们转换成Webpack可处理的模块。Webpack在处理代码模块的过程中，会根据模块的类型来选择相应的Loader进行处理，例如，处理CSS文件需要使用css-loader，处理图片需要使用file-loader等。使用Loader可以实现代码转换、文件处理、代码压缩等功能。

Loader的使用方式是在Webpack的配置文件中定义module.rules属性，它是一个数组，每个元素是一个对象，用于描述如何处理特定类型的文件。一个Loader对象通常包括以下几个属性：

* test：用于匹配需要处理的文件类型，通常是一个正则表达式。
* use：指定需要使用的Loader，可以是一个字符串或一个数组，数组中的每个元素都是一个Loader。
* exclude/include：指定需要排除/包含的文件夹。

例如，处理CSS文件需要使用css-loader和style-loader，可以在Webpack配置文件中添加如下配置：

```js
const config = [
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  }
]
```

* **Plugin**

Plugin是Webpack中的另一个核心概念，它用于扩展Webpack的功能。Plugin可以用于执行任意类型的任务，例如，生成HTML文件、压缩代码、提取公共代码等。使用Plugin可以实现Webpack无法处理的复杂任务。

Plugin的使用方式是在Webpack的配置文件中定义plugins属性，它是一个数组，每个元素是一个Plugin实例。Plugin通常包括以下几个方法：

* apply：用于安装插件，接收一个compiler对象作为参数。
* 一些Webpack钩子函数的实现。

例如，生成HTML文件需要使用HtmlWebpackPlugin，可以在Webpack配置文件中添加如下配置：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: './src/index.html'
    })
  ]
}
```

**表格对比他们之间的差异和适用范围**

|区别|Loader|Plugin|
|---|---|---|
|输入/输出|输入文件，输出处理后的文件|可以在Webpack构建过程中处理输出结果或做额外处理|
|使用方式|在模块加载时直接调用|在Webpack配置中进行配置|
|功能|用于处理某些类型的文件|可以处理打包过程的各个环节|
|实现方式|导出一个函数|导出一个类|
|配置方式|在Webpack配置中使用|在Webpack配置中使用|
|作用|转换文件或模块|对整个构建过程进行自定义操作|
|适用场景|处理各种类型的文件，如css、图片等|执行比较复杂的操作，如代码压缩、代码分割等|
|使用方式|需要在Webpack中明确的指定|无法单独使用，必须在Webpack中明确的指定使用|
|作用对象|针对每一个文件进行处理|针对整个构建过程进行处理|

总体而言，Loader主要用于针对单个文件进行处理，可以根据不同文件类型来选择对应的Loader；Plugin则是针对整个构建过程进行自定义操作，比如代码压缩、分离CSS文件、创建HTML文件等。

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

```js
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

```js
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

```js
// pitch 阶段
module.exports.pitch = function (remainingRequest, precedingRequest, data) {
  data.sharedValue = 'Hello from pitch phase'
}
```

在上面的代码片段中，`pitch` 方法设置了 `data.sharedValue`。这个 `pitch` 方法是可选的，它在 loader 处理资源之前执行。`data` 对象会从 `pitch` 阶段传递到正常的加载阶段，从而可以在后者中访问之前设置的共享值。

```js
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

```js
class ConsoleLogStatsPlugin {
  apply (compiler) {
    compiler.hooks.compilation.tap('ConsoleLogStatsPlugin', (compilation) => {
      compilation.moduleTemplates.JavaScript.hooks.render.tap('ConsoleLogStatsPlugin', (moduleSource, module) => {
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

```js
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

| 插件名称 | 作用 |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `HtmlWebpackPlugin` | 自动生成 HTML 文件，并将打包后的资源自动注入到 HTML 中。 |
| `MiniCssExtractPlugin` | 将 CSS 代码提取到单独的文件中，而不是内联到 JavaScript 中。 |
| `CopyWebpackPlugin` | 将指定的文件或目录复制到输出目录。 |
| `CleanWebpackPlugin` | 在每次构建之前清理输出目录，避免旧的文件残留。 |
| `DefinePlugin` | 在编译过程中创建全局常量，可以在代码中直接使用。 |
| `HotModuleReplacementPlugin` | 启用热模块更换（Hot Module Replacement），在开发过程中实现代码修改后实时更新页面，无需刷新。 |
| `ProvidePlugin` | 自动加载模块，使模块在使用时可以直接使用对应的全局变量，无需引入。 |
| `MiniCssExtractPlugin` | 将 CSS 代码提取到单独的文件中，而不是内联到 JavaScript 中。 |
| `OptimizeCSSAssetsPlugin` | 压缩提取出的 CSS 文件。 |
| `uglifyjs-webpack-plugin` | 压缩 JavaScript 代码。 |
| `webpack-bundle-analyzer` | 分析打包后的文件大小，并可视化展示，方便优化打包结果。 |
| `CompressionWebpackPlugin` | 使用 gzip 或其他压缩算法对文件进行压缩，减小文件大小，加快网络传输速度。 |
| `CopyWebpackPlugin` | 将指定的文件或目录复制到输出目录。 |
| `FriendlyErrorsWebpackPlugin` | 提供友好的构建错误提示和优化构建速度的功能。 |
| `ImageminWebpackPlugin` | 压缩图片资源，减小文件大小，提升加载速度。 |
| `HotModuleReplacementPlugin` | 启用热模块更换（Hot Module Replacement），在开发过程中实现代码修改后实时更新页面，无需刷新。 |
| `HtmlWebpackPlugin` | 自动生成 HTML 文件，并将打包后的资源自动注入到 HTML 中。 |
| `IgnorePlugin` | 忽略特定的模块，避免将其打包到最终的输出文件中。 |
| `BannerPlugin` | 在打包的文件块顶部添加自定义的注释和信息。 |
| `webpack.DefinePlugin` | 在编译过程中创建全局常量，可以在代码中直接使用。 |
| `webpack.ProgressPlugin` | 在控制台输出构建进度信息。 |
| `webpack-bundle-analyzer` | 分析打包后的文件大小，并可视化展示，方便优化打包结果。 |
| `webpackbar` | 在命令行中显示构建进度条，提供更直观的构建进度信息。 |

这些插件可以根据需要配置在 Webpack 的插件列表（`plugins`）中，以实现对构建过程的各种增强和优化操作。

## webpack externals 是如何加载外部依赖的 {#p0-webpack-externals}

`webpack` 中的 `externals` 配置项用于指定在打包时需要排除掉的模块，这些模块会被视为外部依赖，即不会被打包进最终的输出文件中，而是通过其他方式引入。

使用 `externals` 配置项可以使得打包后的代码文件更小，同时也可以在运行时从外部获取依赖，例如通过 CDN、全局变量或者通过 `require` 的方式等。

举个例子，假设我们需要在项目中引入 `jquery` 库，但我们并不想在打包的过程中将其打包进最终的输出文件中，而是从外部引入。我们可以通过以下的配置来实现：

```js
module.exports = {
  // ...
  externals: {
    jquery: 'jQuery'
  }
}
```

这里的 `externals` 配置项告诉 `webpack` 在打包时忽略 `jquery` 模块的引用，而在代码运行时，我们需要手动将 `jquery` 通过 `script` 标签引入，并将其暴露在全局变量 `jQuery` 下，例如：

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script>
 window.jQuery = jQuery;
</script>
```

这样在代码中引入 `jquery` 模块时，`webpack` 就会将其作为外部依赖进行处理，而不是将其打包进输出文件中。

需要注意的是，使用 `externals` 配置项需要谨慎，因为如果在运行时无法正确获取到指定的外部依赖，就会导致代码运行出错。

1. externals 配置, 是忽略此依赖，不打包，
2. 基于运行环境确定处理方式
   1. 浏览器环境，通过 script 标签加载
   2. 非浏览器环境，通过 require 加载
   3. 不同 module 类型，处理方式不同

在使用 Webpack 打包的项目中，通常资源（如 JavaScript、CSS、图片等）会被 Webpack 处理，因为 Webpack 的设计初衷就是将所有资源视为模块，并进行有效的管理和打包。但有时候可能需要通过`<script>`标签直接引入资源，这通常有两种情况：

1. **在 HTML 文件中直接引入：**
 可以在项目的 HTML 文件中直接使用`<script>`标签来引入外部资源：

 ```html
 <!-- 若要使用 CDN 上托管的库 -->
 <script src="https://cdn.example.com/library.js"></script>
 ```

 这种方法简单直接，但要记住，由于这些资源不会被 Webpack 处理，它们不会被包含在 Webpack 的依赖图中，并且也不会享受到 Webpack 的各种优化。

2. **使用 Webpack 管理：**
 如果想要 Webpack 来处理这些通过`<script>`引入的资源，可以使用几种插件和加载器：

* `html-webpack-plugin`可以帮助你生成一个 HTML 文件，并在文件中自动引入 Webpack 打包后的 bundles。
* `externals`配置允许你将一些依赖排除在 Webpack 打包之外，但还是可以通过`require`或`import`引用它们。
* `script-loader`可以将第三方全局变量注入的库当作模块来加载使用。

 例如，使用`html-webpack-plugin`和`externals`，你可以将一个库配置为 external，然后通过`html-webpack-plugin`将其引入：

 ```js
 // webpack.config.js 文件
 const HtmlWebpackPlugin = require('html-webpack-plugin')
 
 module.exports = {
 // ...
   externals: {
     libraryName: 'LibraryGlobalVariable'
   },
   plugins: [
     new HtmlWebpackPlugin({
       template: 'src/index.html',
       scriptLoading: 'blocking' // 或者 'defer'
     })
   ]
 }
 ```

 然后，在你的`index.html`模板文件中可以这样引入资源：

 ```html
 <script src="https://cdn.example.com/library.js"></script>
 ```

 使用`externals`的方法能让你在 Webpack 打包的模块代码中用正常的`import`或`require`语句来引用那个全局变量：

 ```js
 // 你的 JavaScript 代码文件中
 import Library from 'libraryName' // 虽然定义了external，Webpack依然会处理这个import
 ```

应根据项目需求和现有的架构来决定使用哪种方法。上述两种方法中，第二种可以更好地利用 Webpack 的功能，第一种则更加简单直接。

## rollup 为什么快 {#p1-rollup-webpack-difference}

1. esm 静态分析，优于 commonjs 动态分析

## webpack 和 vite 区别 {#p0-webpack-vite-difference}

1. dev 模式 vite 采用 esm, 而 webpack 采用 commonjs
2. prod webpack 产物更灵活基于 chunk ，而 vite 产物更固定基于 esm 可能产生大量小文件

 1、开发模式的差异

在开发环境中，`Webpack` 是先打包再启动开发服务器，而 `Vite` 则是直接启动，然后再按需编译依赖文件。（大家可以启动项目后检查源码 `Sources` 那里看到）

这意味着，当使用 `Webpack` 时，所有的模块都需要在开发前进行打包，这会增加启动时间和构建时间。

而 `Vite` 则采用了不同的策略，它会在请求模块时再进行实时编译，这种按需动态编译的模式极大地缩短了编译时间，特别是在大型项目中，文件数量众多，`Vite` 的优势更为明显。

**Webpack启动**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31fa5a46d4e74c5db56928f1bb2087c4~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1029&h=552&s=47251&e=png&b=fcfcfc)

**Vite启动**

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfa5c4618b75419d8b3a9139425972e5~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=892&h=838&s=50064&e=png&b=ffffff)

 2、对ES Modules的支持

现代浏览器本身就支持 `ES Modules`，会`主动发起`请求去获取所需文件。Vite充分利用了这一点，将开发环境下的模块文件直接作为浏览器要执行的文件，而不是像 Webpack 那样`先打包`，再交给浏览器执行。这种方式减少了中间环节，提高了效率。

**什么是ES Modules？**

通过使用 `export` 和 `import` 语句，ES Modules 允许在浏览器端导入和导出模块。

当使用 ES Modules 进行开发时，开发者实际上是在构建一个`依赖关系图`，不同依赖项之间通过导入语句进行关联。

主流浏览器（除IE外）均支持ES Modules，并且可以通过在 script 标签中设置 `type="module"`来加载模块。默认情况下，模块会延迟加载，执行时机在文档解析之后，触发DOMContentLoaded事件前。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b03dbc4400c745c8bca371a9ab63f52b~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2059&h=823&s=194009&e=png&b=f0e6d2)

 3、底层语言的差异

Webpack 是基于 `Node.js` 构建的，而 Vite 则是基于 `esbuild` 进行预构建依赖。esbuild 是采用 `Go` 语言编写的，Go 语言是`纳秒`级别的，而 Node.js 是`毫秒`级别的。因此，Vite 在打包速度上相比Webpack 有 `10-100` 倍的提升。

**什么是预构建依赖？**

预构建依赖通常指的是在项目`启动或构建`之前，对项目中所需的依赖项进行预先的`处理或构建`。这样做的好处在于，当项目实际运行时，可以`直接使用`这些已经预构建好的依赖，而无需再进行实时的编译或构建，从而提高了应用程序的运行速度和效率。

 4、热更新的处理

在 Webpack 中，当一个模块或其依赖的模块内容改变时，需要`重新编译`这些模块。

而在 Vite 中，当某个模块内容改变时，只需要让浏览器`重新请求`该模块即可，这大大减少了热更新的时间。

 总结

总的来说，Vite 之所以比 Webpack 快，主要是因为它采用了`不同的开发模式`、`充分利用了现代浏览器的 ES Modules 支持`、`使用了更高效的底层语言`，`并优化了热更新的处理`。这些特点使得 Vite在大型项目中具有显著的优势，能够快速启动和构建，提高开发效率。

Vite 和 Webpack 在热更新上有一些区别：

1. 模块级别的热更新：Vite 使用浏览器原生的 ES 模块系统，可以实现模块级别的热更新，即只更新修改的模块，而不需要刷新整个页面。这样可以提供更快的开发迭代速度。而在 Webpack 中，热更新是基于文件级别的，需要重新构建并刷新整个页面。

2. 开发环境下的无构建：Vite 在开发环境下不会对代码进行打包构建，而是直接利用浏览器原生的模块导入功能，通过 HTTP 服务器提供模块的即时响应。这样可以避免了构建和重新编译的时间，更快地反映出代码的修改。而在 Webpack 中，每次修改代码都需要重新构建和编译，耗费一定的时间。

3. 构建环境下的优化：尽管 Vite 在开发环境下不进行打包构建，但在生产环境下，它会通过预构建的方式生成高性能的静态资源，以提高页面加载速度。而 Webpack 则通过将所有模块打包成 bundle 文件，进行代码压缩和优化，以及使用各种插件和配置来优化构建结果。

总的来说，Vite 在热更新上比 Webpack 更加快速和精细化，能够在开发过程中提供更好的开发体验和更快的反馈速度。但是，Webpack 在构建环境下有更多的优化和功能，适用于更复杂的项目需求。

**以下是 Vite 和 Webpack 在热更新方面的对比表格**：

| 特点 | Vite | Webpack |
|------|------|---------|
| 实时热更新 | 支持模块级别的热更新，即只更新修改的模块，无需刷新整个页面 | 支持文件级别的热更新，修改任何文件都会触发整个应用的重新构建和刷新 |
| 构建速度 | 在开发环境下，利用浏览器原生的模块导入功能，不需要进行打包构建，启动速度更快 | 需要进行打包构建，每次修改代码都需要重新构建和编译，相对较慢 |
| 开发体验 | 提供更好的开发体验，修改代码后快速反馈，无需等待全量构建 | 反馈速度较慢，需要等待每次构建和编译完成 |
| 适用场景 | 适用于中小型项目，追求开发效率的前端项目 | 适用于大型项目，有复杂需求和更多构建优化的前端项目 |

[资料](https://juejin.cn/post/7344916114204049445)

 **构建速度**

* **Webpack**: Webpack的构建速度相对较慢，尤其在大型项目中，因为它需要分析整个依赖图，进行多次文件扫描和转译。
* **Vite**: Vite以开发模式下的极速构建著称。它利用ES模块的特性，只构建正在编辑的文件，而不是整个项目。这使得它在开发环境下几乎是即时的。

 **开发模式**

* **Webpack**: Webpack通常使用热模块替换（HMR）来实现快速开发模式，但配置相对复杂。
* **Vite**: Vite的开发模式非常轻量且快速，支持HMR，但无需额外配置，因为它默认支持。

 **配置复杂度**

* **Webpack**: Webpack的配置相对复杂，特别是在处理不同类型的资源和加载器时。
* **Vite**: Vite鼓励零配置，使得项目起步非常简单，但同时也支持自定义配置，使其适用于复杂项目。

 **插件生态**

* **Webpack**: Webpack拥有庞大的插件生态系统，适用于各种不同的需求。
* **Vite**: Vite也有相当数量的插件，但相对较小，因为它的开发模式和构建方式减少了对一些传统插件的需求。

 **编译方式**

* **Webpack**: Webpack使用了多种加载器和插件来处理不同类型的资源，如JavaScript、CSS、图片等。
* **Vite**: Vite利用ES模块原生支持，使用原生浏览器导入来处理模块，不需要大规模的编译和打包。

 **应用场景**

* **Webpack**: 适用于复杂的大型项目，特别是需要大量自定义配置和复杂构建管道的项目。
* **Vite**: 更适用于小到中型项目，或者需要快速开发原型和小型应用的场景。

 **打包原理**

* **Webpack**: Webpack的打包原理是将所有资源打包成一个或多个bundle文件，通常是一个JavaScript文件。
* **Vite**: Vite的打包原理是保持开发时的模块化结构，使用浏览器原生的导入机制，在生产环境中进行代码分割和优化。

 **优缺点**

* **Webpack**:

优点：灵活、强大、适用于复杂场景、庞大的插件生态。
缺点：构建速度较慢、配置复杂、开发体验不如Vite流畅。

* **Vite**:

优点：极快的开发构建速度、零配置启动、原生ES模块支持、适用于小型项目和快速原型开发。
缺点：插件生态相对较小、不太适用于复杂大型项目。

 参考文档

* [资料](https://juejin.cn/post/7273427487588843581)

## vite 开发和构建有何不同？

Vite 是一个基于现代浏览器原生 ES 模块导入功能的开发工具和构建系统。与传统的打包工具相比，Vite 具有以下几个特点：

1. 快速冷启动：Vite 采用了一种新的开发服务器，利用浏览器原生的 ES 模块导入功能，无需提前构建和打包，可以实现快速的冷启动，并在浏览器中按需编译和加载代码。这种特性使得开发时的重新加载速度非常快，提高了开发效率。

2. 按需编译：Vite 通过解析导入的模块路径，只编译当前需要的模块，而不是像传统的打包工具一样对整个项目进行全量编译。这种按需编译的方式减少了不必要的重复编译和构建时间，提高了构建速度。

3. 零配置：Vite 提供了一种零配置的开发体验，无需繁琐的配置文件，可以快速开始项目的开发。Vite 默认支持常见的前端开发场景，如 Vue、React、TypeScript 等，开发者可以通过简单的配置进行个性化定制。

4. 原生 ES 模块支持：Vite 利用浏览器原生的 ES 模块导入功能，可以直接在浏览器中引入 ES 模块，无需经过任何编译和转换，提供了更好的开发体验和更高的性能。

5. 插件化：Vite 的构建系统采用了插件化的架构，开发者可以根据需求选择和配置不同的插件来扩展 Vite 的功能。Vite 提供了丰富的插件生态系统，使得开发者可以定制化地满足项目需求。

Vite 编译器的主要组成部分包括：

1. esbuild：一个快速的 JavaScript 打包器，用于在开发阶段进行实时编译。esbuild 提供了快速的冷启动和热模块替换功能，能够极大地加快开发环境的构建速度。

2. Rollup：一个强大的 JavaScript 模块打包器，在生产构建阶段使用。Rollup 能够将源代码打包为最终可发布的文件，支持代码分割、Tree Shaking 等优化技术，生成更小、更高效的代码包。

3. 前端开发服务器：Vite 还提供了一个内置的开发服务器，用于提供开发环境下的静态文件服务和构建工具集成。这个服务器能够利用 esbuild 实现快速的编译和热模块替换，使开发者在开发过程中可以快速地预览和调试代码。

4. 插件系统：Vite 通过插件系统来扩展其功能。开发者可以编写自定义的插件，用于处理特定的文件类型、引入额外的功能或者定制构建过程。插件系统使得 Vite 能够与各种前端框架和工具集成，并提供更灵活的开发体验。

Vite 涉及到以下几个底层原理：

1. ES 模块：Vite 使用了 ES 模块来管理和加载模块。ES 模块是 JavaScript 的标准模块系统，相比于传统的 CommonJS 或 AMD，ES 模块具有更好的静态分析能力和更高的性能。Vite 通过使用浏览器原生的 ES 模块加载器，可以实现按需加载和快速构建。

2. HTTP/2：Vite 借助于现代浏览器的 HTTP/2 支持来实现更高效的资源加载。HTTP/2 支持多路复用，可以同时请求多个资源，避免了传统的 HTTP/1 中的队头阻塞问题，加快了资源加载速度。

3. 编译器：Vite 使用了自定义的编译器来处理开发时的模块解析和转换。它能够识别模块的依赖关系，并将模块转换为浏览器可直接执行的代码。Vite 的编译器支持热模块替换（HMR），可以在代码修改时自动更新浏览器中的页面，提高开发效率。

4. 中间件：Vite 使用了基于 Koa 框架的中间件来处理开发服务器。通过中间件，Vite 可以拦截和处理开发时的 HTTP 请求，并根据请求的路径返回相应的模块文件。中间件还可以处理各种开发时的特殊需求，如代理 API 请求、路由转发等。

Vite 基于 ES 模块、HTTP/2、自定义编译器和中间件等底层原理，实现了快速的模块加载和开发体验。 这些原理的运用使得 Vite 在开发环境下能够提供更快的构建速度和更好的开发体验。

## esbuild 和 rollup 都是 vite 的基础依赖， 那么他们有啥不同？{#p1-vite}

esbuild 和 Rollup 都是 Vite 的基础依赖，但它们在 Vite 中担负着不同的角色和任务。

1. esbuild：esbuild 是一个快速、可扩展的 JavaScript 打包器，它被用作 Vite 的默认构建工具。esbuild 的主要任务是将源代码转换为浏览器可以理解的代码，同时还支持压缩、代码分割、按需加载等功能。esbuild 利用其高性能的构建能力，实现了快速的开发服务器和热模块替换。

2. Rollup：Rollup 是一个 JavaScript 模块打包工具，也是 Vite 的另一个基础依赖。在 Vite 中，Rollup 主要用于生产构建阶段。它通过静态分析模块依赖关系，将多个模块打包为一个或多个最终的输出文件。Rollup 支持多种输出格式，如 ES 模块、CommonJS、UMD 等，可以根据项目的需要进行配置。

尽管 esbuild 和 Rollup 都是 Vite 的基础依赖，但它们的分工是不同的。esbuild 用于开发服务器阶段，通过实时编译和提供模块来实现快速的冷启动和热模块替换。而 Rollup 用于生产构建阶段，将源代码打包为最终可发布的文件，以用于部署到生产环境。这样的分工使得 Vite 在开发过程中能够快速响应变化，并在构建过程中生成高效的最终输出文件。

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

## tree-shaking {#p0-tree-shaking-principle}

webpack实现tree shaking的原理是基于ES6模块化语法的静态特性。

在编译阶段，Webpack会根据模块的依赖关系，通过AST（抽象语法树）进行静态分析，识别出那些代码块（函数、变量、对象等）被引用并且使用了。然后将这些代码块打包输出到最终的打包文件中。在这个过程中，Webpack会自动将未被引用的代码块进行剔除，这个过程就是tree shaking。

具体来说，当Webpack在打包时遇到一个ES6模块导入语句（import），它会自动去加载这个模块并分析其导出对象。然后它会分析项目中哪些导出对象被引用了。如果一个导出对象没有被引用，那么Webpack会直接把它从最终的代码中剔除掉。

需要注意的是，tree shaking只对ES6模块生效，对于CommonJS等其他模块化规范，由于其动态加载特性，无法在静态分析阶段确定哪些代码块被引用，因此无法进行tree shaking。

另外，为了使Webpack能够正确识别和剔除未引用的代码块，开发者也需要做出一定的努力，例如将代码编写为纯函数的形式，避免使用全局变量等副作用等。

具体哪些会导致 tree shaking 失效，可以看这个文章：[资料](https://github.com/pro-collection/interview-question/issues/235)

在以下情况下，`webpack` 的 `tree-shaking` 可能会失效：

1. 使用了 `sideEffects` 属性：在 webpack 的配置文件中，如果设置了 `sideEffects: true`，则 webpack 会假设所有模块都有副作用，因此不会进行 tree-shaking。这通常用于避免某些模块被误标记为无用代码而被删除。

2. 动态导入：如果你使用了动态导入（例如使用了 `import()` 或 `require.ensure()`），webpack 无法静态分析模块的导入和导出，因此无法进行 tree-shaking。

3. 使用了 `commonjs` 模块语法：如果你的代码中使用了 `commonjs` 模块语法（例如使用了 `require()` 或 `module.exports`），webpack 无法进行静态分析，因此无法进行 tree-shaking。

4. 未使用 ES6 模块语法：tree-shaking 只能对 ES6 模块语法进行优化，如果你的代码中没有使用 ES6 模块语法，webpack 将无法进行 tree-shaking。

5. 模块被动态引用或条件引用：如果模块的引用方式是动态的（例如在循环或条件语句中引用），或者通过字符串拼接来引用模块，webpack 无法确定哪些模块会被引用，因此无法进行 tree-shaking。

6. 使用了副作用的代码：如果你的代码中包含有副作用的代码（例如在模块的顶级作用域中执行了一些操作），webpack 无法确定哪些代码是无用的，因此无法进行 tree-shaking。

需要注意的是，即使 tree-shaking 可能会失效，webpack 仍然会进行其他优化，例如代码压缩和代码分割等。同时，你可以通过设置 `mode` 为 `production`，来启用 webpack 的优化功能，包括 tree-shaking。

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

 webpack 如何做 tree shaking

`Webpack`通过`tree shaking`技术实现了JavaScript代码的优化和精简。`Tree shaking`是指通过静态代码分析，识别和移除未被使用的代码（被称为"dead code"），从而减小最终打包后的文件大小。

下面是Webpack如何进行tree shaking的步骤：

1. 代码标记：在代码中使用ES6模块化语法（如`import`和`export`）来明确指定模块的依赖关系。

2. 代码解析：Webpack会解析整个代码，并构建一个依赖图谱，记录模块之间的依赖关系。

3. 标记未使用代码：在构建依赖图谱的过程中，Webpack会标记那些未被使用的模块，以及这些模块中的未被使用的函数、类、变量等。

4. 无副作用标记：Webpack还会检查模块的副作用（例如对全局变量的修改、网络请求等），并将没有副作用的代码视为可安全移除的。

5. 未使用代码移除：在代码打包阶段，Webpack会根据标记的未使用代码信息，从最终的打包结果中移除这些未被使用的代码。

通过tree shaking，Webpack可以减小打包后的文件大小，提高应用的加载速度和性能。但要注意的是，tree shaking只对ES6模块化的代码有效，对于CommonJS模块化的代码则无法进行优化。另外，有些代码可能由于复杂的依赖关系无法被正确地标记为未使用，这就需要开发者自己进行配置或使用其他工具进行优化。

 webpack 处理 tree shaking 配置

要在Webpack中配置tree shaking，需要进行以下步骤：

1. 在`webpack.config.js`文件中，将`mode`设置为`production`，这会启用Webpack的优化功能，包括tree shaking。

```js
module.exports = {
  mode: 'production'
  // 其他配置...
}
```

2. 确保你的代码使用了ES6模块化语法（使用`import`和`export`），以便Webpack能够正确地进行静态代码分析。

3. 确保你的代码库中没有副作用。Webpack会假设没有副作用的代码可以安全地移除。如果你的代码确实有副作用，可以在webpack配置文件中的`optimization`选项中设置`sideEffects`为`false`来告诉Webpack可以安全地进行tree shaking。

```js
module.exports = {
  mode: 'production',
  optimization: {
    sideEffects: false
  }
  // 其他配置...
}
```

 了解一下副作用

在计算机科学中，副作用是指函数或代码的执行对除了返回一个值之外的程序状态产生了可观察的变化。换句话说，副作用是指对外部环境产生了影响或产生了可观察的行为。

以下是一些常见的副作用示例：

* 修改全局变量或外部状态：函数修改了全局变量或外部状态，例如修改了一个共享的数组、对象或文件等。

* 发送网络请求：函数通过网络发送了一个HTTP请求，这会触发网络交互并产生副作用。

* 修改函数参数：函数修改了传入的参数值，这会影响函数外部的变量。

* 控制台打印：函数在执行过程中使用了`console.log()`或其他打印语句，这会在控制台中产生可观察到的输出。

* 异步操作：函数中包含了异步操作，例如定时器、Promise或通过回调函数实现的异步操作。

 如何申明代码是有副作用

某一些代码是是需要禁止被清理掉， 这个时候该如何处理呢？

有几个办法：

**方法一：在配置文件中指定副作用**

在Webpack配置文件中，可以使用`sideEffects`选项来指定哪些文件或模块具有副作用，不允许清理。`sideEffects`接受一个正则表达式、一个文件名或一个数组。例如：

```js
module.exports = {
  // ...
  optimization: {
    usedExports: true
  },
  mode: 'production',
  sideEffects: ['./src/some-module.js']
}
```

在上面的例子中，`sideEffects`数组中的`./src/some-module.js`文件将会被标记为具有副作用，不会被清理。

请注意，为了使`sideEffects`选项生效，你需要在配置文件中启用`optimization.usedExports`选项，并将`mode`设置为`production`。

**方法二：package.json 中配置 sideEffects 属性**

可以在`package.json`文件中使用`sideEffects`字段来申明哪些文件或模块具有副作用，不允许被清理。

1. 如果将`sideEffects`设置为布尔值`false`，表示所有导入的文件都被认为没有副作用，可以被tree shaking清理。这在大多数情况下是默认的行为。

```json
{
 "name": "my-package",
 "version": "1.0.0",
 "sideEffects": false
}
```

2. 如果设置为布尔值`true`，表示所有导入的文件都被认为有副作用，不会被tree shaking清理。

```json
{
 "name": "my-package",
 "version": "1.0.0",
 "sideEffects": true
}
```

3. 如果将`sideEffects`设置为一个数组，数组中的每个元素可以是一个字符串或一个正则表达式，表示具有副作用的文件或模块。

```json
{
 "name": "my-package",
 "version": "1.0.0",
 "sideEffects": [
 "./src/some-module.js",
 "/\.css$/"
 ]
}
```

在上述示例中，`./src/some-module.js`文件和所有以`.css`结尾的文件都被认为有副作用，不会被tree shaking清理。

 如果我某一个文件配置了 sideEffects 申明该文件有副作用， 但是我又想清理其中的某个函数

魔法中的魔法注释: `/*#__PURE__*/`

通过上面的知识， 我们知道了， 如果是有如果被 sideEffects 申明了副作用的文件， 是不会被 tree shaking 清理掉的，但是也有例外。

`/*#__PURE__*/`这个注释的作用是告诉Webpack或Babel等构建工具，这一行代码是纯粹的，没有副作用，并且可以安全地进行tree shaking（摇树优化）。

对于一些库或框架，可能会有一些函数或类被导出，但实际上很少被使用，为了让构建工具知道这些代码可以被删除，可以在导出语句上添加`/*#__PURE__*/`注释。

例如，假设 `src/myModule.js` 文件有下面的代码：

```js
export /* #__PURE__ */ function add (a, b) {
  return a + b
}

export function subtract (a, b) {
  return a - b
}
```

且 webpack 已经将 `src/myModule.js` 申明为了有副作用文件

```js
module.exports = {
  // ...
  optimization: {
    sideEffects: ['./src/myModule.js']
  }
}
```

虽然通过 `sideEffects` 配置申明了 `./src/myModule.js` 文件是有副作用的，但是由于 `add` 方法前面有 `/*#__PURE__*/` 注释标记，意味着这个方法被标记为纯函数，该方法是没有副作用。

因此最终通过 `/*#__PURE__*/` 注释标记的 `add` 方法依然可以被 Webpack 的 Tree Shaking 清理。

 commonjs 模块就真的不能被 tree shaking 了？

> 下面这段来自于 webpack 官网
> 参考文档： [资料](https://webpack.docschina.org/blog/2020-10-10-webpack-5-release/#commonjs-tree-shaking)

Webpack 曾经不进行对 CommonJs 导出和 require() 调用时的导出使用分析。

Webpack 5 增加了对一些 CommonJs 构造的支持，允许消除未使用的 CommonJs 导出，并从 require() 调用中跟踪引用的导出名称。

支持以下构造：

* `exports|this|module.exports.xxx = ...`
* `exports|this|module.exports = require("...") (reexport)`
* `exports|this|module.exports.xxx = require("...").xxx (reexport)`
* `Object.defineProperty(exports|this|module.exports, "xxx", ...)`
* `require("abc").xxx`
* `require("abc").xxx()`
* 从 ESM 导入
* `require()` 一个 ESM 模块
* 被标记的导出类型 (对非严格 ESM 导入做特殊处理):
* `Object.defineProperty(exports|this|module.exports, "__esModule", { value: true|!0 })`
* `exports|this|module.exports.__esModule = true|!0`

当检测到不可分析的代码时，webpack 会放弃，并且完全不跟踪这些模块的导出信息（出于性能考虑）。

 终极必杀问：webpack tree-shaking 在什么情况下会失效

* 动态导入：如果你使用了动态导入（例如使用了 import() 或 require.ensure()），webpack 无法静态分析模块的导入和导出，因此无法进行 tree-shaking。

* 未使用 ES6 模块语法：tree-shaking 只能对 ES6 模块语法进行优化，如果你的代码中没有使用 ES6 模块语法，webpack 将无法进行 tree-shaking。

* 模块被动态引用或条件引用：如果模块的引用方式是动态的（例如在循环或条件语句中引用），或者通过字符串拼接来引用模块，webpack 无法确定哪些模块会被引用，因此无法进行 tree-shaking。

* 使用了副作用的代码：如果你的代码中包含有副作用的代码（例如在模块的顶级作用域中执行了一些操作），webpack 无法确定哪些代码是无用的，因此无法进行 tree-shaking。

可以参考这个回答：[资料](https://github.com/pro-collection/interview-question/issues/523)

 以下是一些可能导致 webpack tree shaking 失效的情况

1. 代码中使用了动态引入（Dynamic Imports）的语法，这种情况下，webpack 无法确定哪些代码会被使用，因此不会进行 tree shaking。

2. 代码使用了函数式编程的方式，比如使用了 map、filter、reduce 等高阶函数，而这些函数很难通过静态分析确定代码的执行路径，所以可能会导致 tree shaking 失效。

3. 代码中使用了 webpack 无法识别的模块系统，比如使用了 AMD 或者 CommonJS 的语法，这种情况下 webpack 也无法进行 tree shaking。

4. 代码使用了 side effect，比如改变全局变量或者函数的参数，这种情况下 webpack 也无法进行 tree shaking。

 函数式编程的方式 filter 为何会导致无法 tree shaking

函数式编程中常常使用高阶函数来组合函数，这种组合方式常常需要使用传递函数作为参数的方式，例如 map、filter 等高阶函数。这种情况下，如果参数传递的是一个函数表达式或者函数声明，那么无法进行 treeshaking。

举个例子：

```js
// 代码中定义了一个 sum 函数
// 调用了 lodash 库的 filter 函数，传递一个匿名函数表达式作为参数
import { filter } from 'lodash'

function sum (a, b) {
  return a + b
}

const arr = [1, 2, 3, 4, 5]
const result = filter(arr, item => {
  if (item > 10) return sum(item, 1)
  else return item
})
```

上述代码中，使用了 lodash 库的 filter 函数，并且传递了一个匿名函数表达式作为参数。由于函数表达式无法被静态分析，不知道 sum 是否会被调用，因此无法进行 treeshaking，最终导致整个 sum 函数也被打包进了最终的代码中。

 为什么 commonjs 模块化会导致无法 tree shaking

CommonJS 模块化语法是 Node.js 中的模块化规范，其使用了 `require()` 导入模块，使用 `module.exports` 或 `exports` 导出模块。它采用的是动态导入（require()）和同步加载的方式，这种导入方式无法在编译时确定所依赖的模块，因此在 Webpack 进行 Tree Shaking 时，这种导入方式的模块会被认为无法被静态分析，因而会被排除掉。

相反，ES6 模块化语法采用的是静态导入的方式，例如 `import foo from './foo.js'`，可以在编译时分析出所依赖的模块，因此支持 Tree Shaking。

因此，如果要使用 Tree Shaking，建议采用 ES6 模块化语法。如果必须使用 CommonJS 模块化规范，可以尝试使用动态导入`（import()）`语法，或者采用其他工具或手动实现 Tree Shaking。

 side effect 是什么，为何会导致无法 tree shaking

在编写 JavaScript 代码时，如果一个函数除了返回值外，还对外部的变量产生了其他的影响，比如修改了全局变量、读写了文件等操作，那么这个函数就被称为有“副作用”（side effect）。因为这种函数并不是纯函数，它可能会影响其他部分的代码执行结果，不便于优化和调试。

在 Tree Shaking 的过程中，webpack 将模块打包成单独的 JavaScript 文件，它会从模块中找出哪些代码没有被使用到，并删除这些代码。但是，如果模块中存在带有副作用的代码，这些代码虽然没有被使用到，但它们仍然会被保留下来，因为这些代码可能会对其他部分的代码产生影响，因此不能简单地删除。这也是为什么带有副作用的代码会导致无法 Tree Shaking 的原因。

## babel 的理解？ {#p0-babel}

Babel 是一个非常流行的 JavaScript 编译器，用于将最新版本的 ECMAScript 代码转换为向后兼容的 JavaScript 代码，以便在旧版浏览器或环境中运行。

以下是对 Babel 的理解：

1. 语法转换：Babel 可以将使用了最新 ECMAScript 标准的代码转换为被广泛支持的旧版 JavaScript 代码。例如，将使用了箭头函数、解构赋值等语法的代码转换为使用 function 关键字和传统赋值的等效代码。

2. Polyfill：Babel 可以通过添加 Polyfill 来支持新的全局函数、方法和对象，以确保代码在旧版本的浏览器中正常运行。通过使用 Polyfill，Babel 可以在浏览器中模拟缺失的特性，使旧版浏览器能够运行使用了这些特性的代码。

3. 插件系统：Babel 的核心功能可以通过插件进行扩展和定制。Babel 提供了众多的插件，用于实现不同的转换和功能。开发者可以根据自己的需求选择和配置相应的插件，以便将代码转换为特定的目标环境。

4. 预设（Presets）：Babel 提供了预设的概念，可以一次性地配置一组插件，以实现特定的转换目标。预设是一组插件的集合，可以根据应用程序的需要进行选择和配置。常见的预设包括 "@babel/preset-env"（根据目标环境自动选择转换规则）和 "@babel/preset-react"（用于处理 React 相关的代码）。

5. 与构建工具的集成：Babel 可以与构建工具（如 webpack、Rollup 等）无缝集成，作为其转换代码的一部分。通过配置构建工具，可以让 Babel 在构建过程中自动处理源代码，将其转换为目标代码。

总之，Babel 是一个功能强大的 JavaScript 编译器，可以将使用最新 ECMAScript 标准的代码转换为向后兼容的 JavaScript 代码，从而在旧版浏览器或环境中运行。通过插件和预设的配置，Babel 提供了高度的灵活性，使开发者能够根据项目需求定制转换规则。

**追问：为何要使用 babel**

使用 Babel 的主要原因是为了解决 JavaScript 代码的兼容性问题。以下是一些使用 Babel 的主要理由：

* 兼容旧版浏览器：不同的浏览器对 JavaScript 的支持程度不同，特别是旧版浏览器可能不支持最新的 ECMAScript 标准。通过使用 Babel，可以将使用了最新语法的代码转换为等效的旧版 JavaScript 语法，使代码能够在旧版浏览器中正常运行。

* 支持新特性：JavaScript 不断演进，每年都会发布新的 ECMAScript 标准，引入了很多有用的特性和语法糖。使用 Babel 可以提前使用这些新特性，而不用等待浏览器的支持。Babel 可以将这些新特性转换为旧版 JavaScript 语法，以便在当前的浏览器环境中使用。

* 模块化支持：Babel 可以转换模块化导入和导出的语法，使得开发者可以在浏览器中使用模块化的方式组织和管理代码。这样可以提高代码的可维护性和重用性。

Babel 是一个 JavaScript 编译器，主要用于将 ES6 及以上版本的代码转换为向后兼容的 JavaScript 语法，以便在当前和旧版浏览器或环境中执行。核心的 Babel 库主要包括：

1. **@babel/core**:
 这是 Babel 编译器的核心包，提供了 Babel 的主要转换引擎。它包含了解析、转换和生成代码的主要功能。几乎所有的 Babel 操作都需要这个模块作为基础。

1. **@babel/cli**:
 这是 Babel 的命令行接口，通过它可以在终端或命令提示符中运行 Babel。它允许你执行转编译操作，如将 ES6 代码转换为 ES5。

1. **@babel/preset-env**:
 这是一个智能预设，允许你使用最新的 JavaScript，而不必管理语法转换。`@babel/preset-env`会根据你的目标环境（比如特定版本的浏览器或 Node.js），自动决定使用哪些 Babel 插件和 polyfills。

1. **@babel/polyfill** (现在已经被废弃，推荐使用 `core-js` 和 `regenerator-runtime`):
 早期 Babel 版本中用于模拟完整的 ES2015+环境的包。它的目的是在全局范围内添加填充以模拟较新的环境。从 Babel 7.4.0 开始，建议直接包括 `core-js` 和 `regenerator-runtime`，因为这提供了更好的模块化和按需加载功能。

1. **babel-loader**:
 这是 Babel 的一个 webpack 插件，可以将 Babel 集成到 webpack 构建过程中，使得你可以使用 webpack 来处理和打包使用了新版 JavaScript 语法的文件。

1. **@babel/plugin-transform-runtime**:
 这个插件用于复用 Babel 注入的辅助代码，以节省代码大小，并能够在不污染全局环境的情况下使用新语言特性的 polyfills。

除了这些核心库外，还有许多可用的 Babel 插件，以支持各种 JavaScript 语法和特性（比如装饰器、类属性等）。这些插件可以按需引入，配置在 Babel 的配置文件（通常是`.babelrc`或`babel.config.js`）中。这些插件的命名通常遵循 `@babel/plugin-` 的格式。

`babel-runtime` 是一个包含 `babel` 模块化运行时助手的库。

在使用 `babel` 进行代码转换时，有时会注入一些在多个文件中相同且可能被重复使用的代码。例如，使用类转换（无松散模式）时，每个包含类的文件都会重复出现类似 `_classcallcheck` 这样的函数。

`babel-runtime` 的主要作用就是将这些可能被重用的代码抽取成单独的模块，以避免在每个文件中重复出现相同的代码。它通过模块导入的方式引入这些功能，从而避免了对全局作用域的修改或污染。

具体来说，`babel-runtime` 包含了诸如 `core-js`（提供 JavaScript 内置库的垫片，如 `array`、`json`、`math`、`promise`、`symbol` 等）、`regenerator-runtime`（实现了 `generator/yield`、`async/await`）以及一些语法转换的辅助函数（如 `es5` 与 `es6` 的继承转换等）。

使用 `babel-runtime` 通常需要配合 `babel-plugin-transform-runtime` 插件一起使用。`babel-plugin-transform-runtime` 插件会进行一些处理，例如自动导入 `babel-runtime/core-js`，并将全局静态方法、全局内置对象映射到对应的模块；将内联的工具函数移除，改成通过 `babel-runtime/helpers` 模块进行导入；如果使用了 `async/generator` 函数，则自动导入 `babel-runtime/regenerator` 模块等。

这样，在代码中如果需要使用特定的功能，只需从 `babel-runtime` 相应的模块中导入即可，而不是直接使用全局的对象或函数。

例如，如果代码中使用了 `promise`，可以这样导入：

```js
import promise from 'babel-runtime/core-js/promise'
```

总的来说，`babel-runtime` 更像是一种按需加载的实现方式，适用于开发库、工具等场景，可避免对全局作用域的污染，同时减少重复代码。

## babel-loader 来编译 tsx 文件， 应该如何配置呢？{#babel-loader}

如果你想使用 `babel-loader` 来编译 TypeScript 文件（`.tsx`），你需要在 `babel.config.js` 和 `webpack.config.js` 两个文件中进行相应的配置。

首先，在 `babel.config.js` 文件中，你需要添加 `@babel/preset-typescript` 预设，以便兼容 TypeScript：

```js
module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript']
}
```

接下来，在 `webpack.config.js` 文件中，你需要对 `.tsx` 文件使用 `babel-loader`：

```js
module.exports = {
  // ...其他配置项
  module: {
    rules: [
      // ...其他规则
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
}
```

这样，当 webpack 执行构建时，`babel-loader` 将会使用 `babel.config.js` 中配置的预设来编译 `.tsx` 文件。同时，除了 TypeScript 文件，你还可以使用该配置来编译 JavaScript 文件（`.js`）和 React JSX 文件（`.jsx`）。

**追问**
`'@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react'` 这三个插件的作用是什么？

* `@babel/preset-env`：它是 Babel 的一个预设，用于根据目标环境（浏览器、Node.js 等）自动确定需要转译的 JavaScript 特性，并将其转换为目标环境所支持的代码。它将根据你配置的目标环境和浏览器的使用情况，智能地选择需要转译的特性，以减小转译后的代码体积。它也包含了一些插件，例如转换箭头函数、解构赋值、模板字符串等。

* `@babel/preset-typescript`：它是 Babel 的一个预设，用于将 TypeScript 代码转译为 JavaScript 代码，以便在不支持 TypeScript 的环境中运行。它包含了一些插件，例如转换 TypeScript 的类型注解、类成员修饰符、泛型类型等。

* `@babel/preset-react`：它是 Babel 的一个预设，用于将 React 的 JSX 语法转译为普通的 JavaScript 代码，以便在不支持 JSX 的环境中运行。它也包含了一些插件，例如转换 JSX 语法、处理 React 的内置组件等。

## vue-cli 都做了哪些事儿，有哪些功能？{#p1-vue-cli}

Vue CLI 是一个基于 Vue.js 的命令行工具，用于快速搭建、开发和构建 Vue.js 项目。它提供了一系列的功能来简化 Vue.js 项目的开发和部署流程，包括：

1. 项目脚手架：Vue CLI 可以通过简单的命令行交互方式快速生成一个新的 Vue.js 项目的基础结构，包括目录结构、配置文件、示例代码等。

2. 开发服务器：Vue CLI 提供了一个开发服务器，用于在本地运行项目，在开发过程中实时预览和调试应用程序。它支持热模块替换（HMR），可以实时更新页面内容，提高开发效率。

3. 集成构建工具：Vue CLI 集成了 Webpack，可以自动配置和管理项目的构建过程。它通过配置文件可以进行定制，例如设置打包输出路径、优化代码、压缩资源等。

4. 插件系统：Vue CLI 提供了丰富的插件系统，可以通过安装插件来扩展项目的功能。这些插件可以帮助处理样式、路由、状态管理、国际化等方面的需求，提供更多的开发工具和功能支持。

5. 测试集成：Vue CLI 集成了测试工具，可以快速配置和运行单元测试和端到端测试。它支持多种测试框架，如 Jest、Mocha、Cypress 等，可以帮助开发人员编写和运行各种类型的测试。

6. 项目部署：Vue CLI 提供了命令行接口，可以方便地将项目部署到不同的环境，如开发环境、测试环境和生产环境。它支持生成优化过的静态文件、自动压缩和缓存等功能。

提供了一整套开发和构建 Vue.js 项目的功能和工具链，可以大大简化和加速 Vue.js 项目的开发过程。

## 浏览器本身是不支持模块化的, webpack 是如何通过文件打包，让浏览器可以读取到前端各个模块的代码的？ {#p0-webpack-browser}

浏览器本身不支持模块化的特性，无法直接读取和执行模块化的代码。Webpack通过使用一种称为"模块化打包"的方式，将模块化的代码转换为浏览器可以执行的形式。

Webpack使用了一个称为"模块系统"的机制，通过对模块的依赖关系进行分析，将所有依赖的模块打包为一个或多个包含所有依赖关系的文件。这些打包后的文件被称为“打包产物”或“bundle”。

在打包过程中，Webpack会根据配置文件中的入口点（entry point）来确定应用程序的起始模块。然后，它将从该模块开始递归地解析所有的依赖关系，包括其他模块或文件。Webpack通过识别模块之间的依赖关系，将它们合并到一个或多个打包产物中。

Webpack还会对打包产物进行一系列的优化，例如代码压缩、拆分和按需加载等，以提高应用程序的性能和加载速度。

当浏览器加载打包产物时，它会执行其中包含的代码，并通过模块系统来解决模块之间的依赖关系。Webpack为浏览器提供了一个称为"运行时"的文件，它是Webpack打包产物的一部分，负责处理模块之间的依赖关系，并提供加载和执行模块的功能。

通过Webpack的打包过程，浏览器可以读取和解析打包产物中的模块化代码，并顺利执行应用程序的逻辑。这样，开发者可以在编写代码时使用模块化的语法，而无需担心浏览器的兼容性问题。

## sideEffects 属性的作用是啥 {#p0-sideEffects}

 sideEffects 作用

`sideEffects`是`package.json`文件中的一个字段，它用于指定一个模块是否具有副作用。副作用是指模块在加载时会执行一些特定的操作，而不仅仅是导出一个函数或对象。

`sideEffects`字段可以有以下几种取值：

* `true`：表示模块具有副作用，即模块加载时会执行一些操作。这是默认值，如果没有在`package.json`中明确指定`sideEffects`字段，则假设为`true`。
* `false`：表示模块没有副作用，即模块加载时不会执行任何操作。这意味着该模块只导出函数、对象或其他静态内容，并且不依赖于其他模块的副作用。
* 数组：可以将模块的具体文件路径或文件匹配模式（使用glob模式）列在数组中，以指定哪些文件具有副作用，哪些文件没有副作用。例如，`["./src/*.js", "!./src/utils/*.js"]`表示`src`目录下的所有`.js`文件都具有副作用，但是`src/utils`目录下的`.js`文件没有副作用。

使用`sideEffects`字段可以帮助构建工具（如Webpack）进行优化。如果模块没有副作用，构建工具可以进行更好的摇树优化（tree shaking），即只保留项目所需的代码，而将未使用的代码消除，从而减小最终打包文件的大小。

注意：在使用`sideEffects`字段时，需要确保你的代码确实没有副作用，否则可能会导致意外的行为。

 sideEffects 是如何辅助 webpack 进行优化的？

`sideEffects`字段可以帮助Webpack进行摇树优化（Tree Shaking），从而减小最终打包文件的大小。摇树优化是指只保留项目所需的代码，而将未使用的代码消除。

当Webpack打包时，它会通过静态分析来确定哪些导入的模块实际上被使用了，然后只保留这些被使用的代码，并将未使用的代码从最终的打包文件中删除。

在这个过程中，Webpack会检查模块的`sideEffects`字段。如果一个模块具有`sideEffects`字段，并且设置为`false`，Webpack会认为该模块没有副作用。Webpack会在摇树优化过程中将未使用的导出从该模块中删除，因为它不会影响项目的功能。

然而，如果一个模块具有`sideEffects`字段，并且设置为`true`或是一个数组，Webpack会认为该模块具有副作用。在摇树优化过程中，Webpack会保留该模块的所有导出，因为它不能确定哪些代码是副作用的。这样可以确保项目中需要的副作用代码不会被误删除。

因此，通过正确使用`sideEffects`字段，可以帮助Webpack更好地优化打包文件，减少不必要的代码，提高应用程序的性能。

## webpack 如何配置按需加载的模块 {#p0-require-load}

如何配置 webpack 按需加载

要配置webpack项目模块按需加载，你可以使用webpack的代码分割（code splitting）功能和动态导入（dynamic import）语法。

以下是一些配置步骤：

1. 在webpack配置文件中，设置`output`选项中的`chunkFilename`属性，用于指定按需加载模块的输出文件名。例如：

```js
const config = {
  output: {
    filename: 'bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

2. 在应用程序中使用动态导入语法加载需要按需加载的模块。例如：

```js
import(/* webpackChunkName: "moduleName" */ './module')
  .then(module => {
    // 使用加载的模块
  })
  .catch(error => {
    // 处理加载错误
    console.error(error)
  })
```

注意：在动态导入语法中，`/* webpackChunkName: "moduleName" */`是可选的，用于指定生成的输出文件的名称。

3. 运行webpack构建，它将根据动态导入语法将模块拆分为单独的文件。

4. 当需要按需加载模块时，webpack将自动异步加载并将模块添加到页面中。

 webpack 配置按需加载 和 react lazy 有什么关系

Webpack配置按需加载和React的`lazy`函数是实现按需加载的两个不同方面，它们可以一起使用来优化React应用的性能。

Webpack配置按需加载是通过代码分割（code splitting）的方式，将应用程序的代码分割成多个小块，并在需要时按需加载这些块。这样可以减小初始加载的文件大小，提高页面加载速度。Webpack提供了一些配置选项和动态导入语法来实现按需加载。

而React的`lazy`函数是React 16.6版本引入的新特性，用于实现组件的按需加载。通过使用`lazy`函数，你可以将组件的加载延迟到它们实际需要被渲染到页面上的时候。这样可以减小初始加载的组件数量，并且提高应用程序的性能。

结合Webpack配置按需加载和React的`lazy`函数，在React应用中你可以按需加载组件，并且Webpack会自动将这些组件拆分为单独的文件进行按需加载。这样可以实现在需要时动态加载组件，以及减小初始加载的文件大小，提高应用程序的性能。

下面是一个示例，展示了如何使用Webpack配置按需加载和React的`lazy`函数：

```js
import React, { lazy, Suspense } from 'react'

const LazyComponent = lazy(() => import('./LazyComponent'))

function App () {
  return (
 <div>
 <Suspense fallback={<div>Loading...</div>}>
 <LazyComponent />
 </Suspense>
 </div>
  )
}
```

在上面的示例中，`lazy`函数用于按需加载`./LazyComponent`组件。`Suspense`组件用于在组件加载时提供一个加载中的提示（fallback）。当`LazyComponent`组件需要渲染时，Webpack将会按需加载`./LazyComponent`组件的代码。

使用Webpack配置按需加载和React的`lazy`函数可以有效地优化React应用的性能，提高应用程序的加载速度。

 要支持 React lazy， webpack 还需要配置什么吗？

为了支持React的`lazy`函数，还需要在Webpack配置中添加一些额外的配置。

首先，你需要确保你的Webpack配置中启用了代码分割（code splitting）功能。这可以通过以下方式配置：

```js
// webpack.config.js

module.exports = {
  // ...其他配置
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
```

这个配置会告诉Webpack在生成代码块时将公共的依赖模块提取到单独的文件中，以实现代码的共享和按需加载。

然后，你需要使用`@babel/preset-react`预设配置Babel，以支持React的`lazy`函数。你可以在`.babelrc`文件中添加以下配置：

```json
{
 "presets": [
 "@babel/preset-react"
 ]
}
```

最后，确保你的React代码使用了`lazy`函数进行组件的按需加载，如前面的示例所示：

```js
import React, { lazy, Suspense } from 'react'

const LazyComponent = lazy(() => import('./LazyComponent'))

function App () {
  return (
 <div>
 <Suspense fallback={<div>Loading...</div>}>
 <LazyComponent />
 </Suspense>
 </div>
  )
}
```

通过以上步骤配置Webpack，你就可以使用React的`lazy`函数实现组件的按需加载了。Webpack会自动将按需加载的组件拆分为单独的文件，并在需要时进行加载。这样可以提高React应用的性能和加载速度。

## webpack5 Module Federation {#p0-module-federation}

Webpack 5 的 Module Federation 是一项功能强大的功能，它允许将 JavaScript 应用程序拆分成独立的模块，并在不同的 Webpack 构建中共享这些模块。它解决了多个独立应用程序之间共享代码的问题，使得实现微前端架构变得更加容易。

Module Federation 可以将一个应用程序拆分成多个独立的子应用，每个子应用都可以被独立开发、部署和运行。每个子应用都可以通过配置指定需要共享的模块，然后将这些共享模块以动态方式加载到其他子应用中使用，而无需将这些模块打包进每个子应用的构建文件中。

Module Federation 的核心概念是 "容器"（Container）和 "远程"（Remote）。容器是一个主应用程序，它可以加载和渲染其他子应用程序，而远程是一个独立的子应用程序，它提供了一些模块供其他子应用程序使用。

Module Federation 提供了一种简单的方式来定义远程模块，并在容器中引用这些远程模块。容器可以从远程加载模块，并通过配置将这些模块暴露给其他子应用程序。这样，子应用程序可以通过远程加载和使用容器中的模块，实现了模块的共享和动态加载。

Module Federation 在实现微前端架构时非常有用，可以将多个独立开发的子应用程序组合成一个整体，并实现共享模块和资源的灵活管理。它提供了一种解决方案，让多个团队可以独立开发和部署自己的子应用程序，同时又能够共享代码和资源，提高开发效率和整体性能。

Webpack 5 的 Module Federation 是一项用于实现微前端架构的功能，它可以将 JavaScript 应用程序拆分成独立的子应用程序，并通过动态加载和共享模块的方式实现子应用程序之间的交互和共享。

 使用示范

下面是一个简单的示例，演示如何在 Webpack 5 中使用 Module Federation。

假设我们有两个独立的应用程序：App1 和 App2。我们将使用 Module Federation 将 App2 的模块共享给 App1。

首先，我们需要在 App2 的 Webpack 配置中启用 Module Federation：

```js
// webpack.config.js (App2)

const { ModuleFederationPlugin } = require('webpack')

module.exports = {
  // ...其他配置
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button' // 暴露 App2 的 Button 模块
      }
    })
  ]
}
```

接下来，我们需要在 App1 的 Webpack 配置中配置远程加载 App2 的模块：

```js
// webpack.config.js (App1)

const { ModuleFederationPlugin } = require('webpack')

module.exports = {
  // ...其他配置
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      remotes: {
        app2: 'app2@http://localhost:3002/remoteEntry.js' // 远程加载 App2 的模块
      }
    })
  ]
}
```

在 App1 中，我们可以像使用本地模块一样使用 App2 的模块：

```js
// App1

import React from 'react'
import ReactDOM from 'react-dom'
import App2Button from 'app2/Button' // 远程加载 App2 的 Button 模块

ReactDOM.render(<App2Button />, document.getElementById('root'))
```

在上面的示例中，我们通过 Module Federation 将 App2 的 Button 模块暴露给了 App1，然后在 App1 中可以直接通过 `import` 语句引入并使用。

需要注意的是，App1 需要在 `remotes` 配置中指定远程加载的模块，其中 `app2` 是一个远程模块的名称，而 `http://localhost:3002/remoteEntry.js` 是 App2 构建输出的远程入口文件。

这只是一个简单的示例，实际使用中可能涉及更复杂的配置和场景。但通过以上配置，我们可以实现在不同应用程序之间共享模块，并通过动态加载的方式使用远程模块。

## babel 的工作流程是如何的？ {#p0-babel}

Babel 是一个 JavaScript 编译器，它的主要功能是将新版本的 JavaScript 代码转换成向后兼容的代码。Babel 的工作流程可以简单概括为以下几个步骤：

1. 解析：将 JavaScript 代码解析成 AST（抽象语法树）。

2. 转换：对 AST 进行遍历，进行代码转换。

3. 生成：将转换后的 AST 生成 JavaScript 代码。

具体来说，Babel 的工作流程如下：

1. Babel 使用 babylon 解析器将 JavaScript 代码解析成 AST，babylon 是一个基于 AST 的 JavaScript 解析器。

2. Babel 使用 babel-traverse 遍历器对 AST 进行遍历，找到需要转换的节点，进行转换。

3. Babel 使用 babel-core 转换器将 AST 转换成 JavaScript 代码。babel-core 是 babel 的核心模块，它包含了所有的转换器和插件。

4. Babel 使用 babel-generator 生成器将转换后的 AST 生成 JavaScript 代码。babel-generator 是一个将 AST 转换成 JavaScript 代码的工具。

在整个流程中，Babel 还会使用 babel-preset-env、babel-plugin-transform-runtime、babel-polyfill 等插件和工具来完成更加复杂的任务，如将 ES6 模块转换成 CommonJS 模块，使用 Polyfill 来实现一些新的 API 等。

需要注意的是，Babel 的转换过程是有损的，转换后的代码不一定与原始代码完全相同，也可能存在性能问题。因此，在使用 Babel 进行转换时，需要谨慎选择转换的规则和插件，以确保转换后的代码正确、高效。

## babel 插件 {#p0-bable-plugin}

编写一个 babel 插件的基本步骤

编写一个 Babel 插件可以让你自定义转换、分析或操作 JavaScript 代码。下面是编写 Babel 插件的基本步骤：

1. 安装 Babel：首先，确保你已经安装了 Babel 的相关工具和依赖。可以使用 npm 或 yarn 安装 `@babel/core`、`@babel/preset-env` 和 `@babel/plugin-syntax-plugin-name`。

2. 创建插件文件：在项目中创建一个新的 JavaScript 文件，用于编写自定义插件的代码。命名约定是以 `babel-plugin-` 开头，例如 `babel-plugin-custom-plugin.js`。

3. 导出插件函数：在插件文件中，导出一个函数作为你的插件。这个函数将接收一个 Babel 的 `babel` 对象作为参数，包含了一些 Babel 的工具方法，如 `types` 和 `template`。

```js
module.exports = function (babel) {
  // 插件代码
}
```

4. 实现插件逻辑：在插件函数内部，实现你的插件逻辑。可以使用 `babel.types` 对象提供的方法来操作抽象语法树（AST）节点，例如 `babel.types.VariableDeclaration`、`babel.types.CallExpression` 等。

```js
module.exports = function (babel) {
  const { types: t } = babel

  return {
    visitor: {
      Identifier (path) {
        // 对每个 Identifier 节点进行处理
        const name = path.node.name
        path.node.name = name.toUpperCase()
      }
    }
  }
}
```

5. 导出插件配置：为了让 Babel 可以识别你的插件，需要在插件函数中返回一个配置对象，其中 `visitor` 属性指定了你的插件要处理的 AST 节点类型和对应的处理函数。

```js
module.exports = function (babel) {
  const { types: t } = babel

  return {
    visitor: {
      // ...
    }
  }
}
```

6. 配置 Babel：在项目的 `.babelrc` 或 `babel.config.js` 文件中，将你的插件添加到 Babel 的插件列表中。

```json
{
 "plugins": ["babel-plugin-custom-plugin"]
}
```

7. 使用插件：运行 Babel，它将根据你的配置和代码中的语法，应用插件并对代码进行转换。

以上是编写 Babel 插件的基本步骤，可以根据具体需求和场景，实现各种自定义的转换、分析和操作逻辑。

 babel 编写插件的时候有哪些核心方法

在编写 Babel 插件时，可以使用以下核心方法来操作抽象语法树（AST）节点：

1. `types` 对象： Babel 的 `types` 对象是你在插件中最常用的工具之一。它提供了一系列用于创建、访问和操作 AST 节点的方法。

`types.identifier(name)`: 创建一个标识符节点，表示一个变量或函数的名称。

`types.stringLiteral(value)`: 创建一个字符串字面量节点，表示一个字符串值。

`types.numericLiteral(value)`: 创建一个数值字面量节点，表示一个数字值。

`types.booleanLiteral(value)`: 创建一个布尔字面量节点，表示一个布尔值。

`types.objectExpression(properties)`: 创建一个对象表达式节点，表示一个对象字面量。

`types.arrayExpression(elements)`: 创建一个数组表达式节点，表示一个数组字面量。

`types.callExpression(callee, arguments)`: 创建一个函数调用表达式节点，表示一个函数的调用。

`types.memberExpression(object, property)`: 创建一个成员表达式节点，表示一个对象的成员访问。

 这些方法可以帮助你构建新的 AST 节点或访问现有的 AST 节点。

2. `path` 对象： Babel 的 `path` 对象代表 AST 中的一个路径，你可以通过该对象访问和操作 AST 节点。在插件的处理函数中，你将会经常使用 `path` 对象。

`path.node`: 访问当前路径对应的节点。

`path.parent`: 访问当前路径的父路径。

`path.scope`: 访问当前路径的作用域。

`path.traverse(visitor)`: 遍历当前路径的子路径，使用指定的访问者函数。

`path.replaceWith(node)`: 替换当前路径的节点。

`path.remove()`: 移除当前路径的节点。

 这些方法可以帮助你在遍历 AST 树时对节点进行修改、替换或删除。

3. `traverse` 方法： `babel-traverse` 是 Babel 提供的一个独立的模块，用于遍历和操作 AST。在插件中，你可以使用 `traverse` 方法来遍历 AST 树并应用你的插件逻辑。

`traverse(ast, visitor)`: 使用指定的访问者函数遍历给定的 AST 树。

 `visitor` 是一个对象，其中包含了处理不同类型节点的方法。通过在 `visitor` 对象中定义相应类型节点的处理函数，你可以在遍历过程中针对特定类型的节点执行你的插件逻辑。

4. `babel.template` 方法： `babel-template` 是 Babel 提供的一个独立模块，用于根据字符串模板生成 AST 节点。你可以使用 `babel.template` 方法来创建包含特定模板结构的 AST 节点。

`babel.template(code, options)`: 根据指定的代码模板生成 AST 节点。

 `code` 参数是一个包含要生成的代码模板的字符串，而 `options` 参数可以指定一些配置选项，如 `preserveComments` 来保留注释。该方法将返回一个函数，调用该函数并传入替换模板中的变量值，即可生成对应的 AST 节点。

 通过使用 `babel.template` 方法，你可以更方便地创建复杂的 AST 节点结构，尤其在需要生成大量相似结构的节点时非常有用。

5. `babel.transform` 方法： `babel-transform` 是 Babel 提供的一个独立模块，用于将 JavaScript 代码转换为 AST 或将 AST 转换回 JavaScript 代码。在编写插件时，你可以使用 `babel.transform` 方法来进行代码转换操作。

`babel.transform(code, options)`: 将指定的代码转换为 AST 或将 AST 转换回代码。

 `code` 参数是一个包含要转换的 JavaScript 代码的字符串，而 `options` 参数可以指定一些配置选项，如 `plugins` 来指定要应用的插件。该方法将返回一个包含 `ast` 和 `code` 属性的对象，`ast` 属性表示生成的 AST 树，`code` 属性表示转换后的代码。

 通过使用 `babel.transform` 方法，你可以在插件内部对代码进行转换和处理，将代码转换为 AST 进行修改，然后再将修改后的 AST 转换回代码。

 编写一个去除代码里面 console.log 的 babel 插件

以下是一个简单的 Babel 插件示例，用于去除代码中的 `console.log` 语句：

```js
// babel-plugin-remove-console.js

module.exports = function ({ types: t }) {
  return {
    visitor: {
      // 处理函数调用表达式
      CallExpression (path) {
        const { callee } = path.node

        // 如果函数调用的名称是 console.log
        if (
          t.isMemberExpression(callee) &&
 t.isIdentifier(callee.object, { name: 'console' }) &&
 t.isIdentifier(callee.property, { name: 'log' })
        ) {
          // 移除该函数调用
          path.remove()
        }
      }
    }
  }
}
```

该插件会遍历代码中的函数调用表达式，如果发现是 `console.log`，则会移除该函数调用。

要使用该插件，可以在项目中安装并配置它。例如，创建一个 `.babelrc` 文件，并将该插件添加到 Babel 的插件列表中：

```json
{
 "plugins": ["./path/to/babel-plugin-remove-console.js"]
}
```

然后运行 Babel 命令或构建工具，它将应用该插件，并从代码中去除所有的 `console.log` 语句。

请注意，这只是一个简单的示例插件，仅适用于演示目的。在实际开发中，你可能需要更复杂的逻辑来处理不同的情况和要求。

## Babel Polyfill 了解多少 {#p2-babel-polyfill}

**关键词**：Babel Polyfill 原理、Babel Polyfill 作用、Babel Polyfill 使用、Babel Polyfill 按需加载

 Babel Polyfill 作用是啥

Babel Polyfill 的作用是在旧版本浏览器中提供对新的JavaScript特性和API的支持。当使用Babel进行代码转换时，它只会转换语法，而不会转换新的API和全局对象（如Promise、Map、Set等）。

旧版本的浏览器可能不支持这些新的API和全局对象，因此在运行使用这些特性的代码时会抛出错误。为了解决这个问题，可以使用Babel Polyfill来填充缺失的功能，以确保代码在旧版本浏览器中正常运行。

Babel Polyfill通过修改全局对象和原型链，添加缺失的方法和属性，使得代码能够在不支持这些功能的浏览器中运行。它会检测当前环境的特性支持情况，并根据需要自动加载所需的Polyfill代码。

使用Babel Polyfill可以让开发人员在编写代码时不必过多考虑浏览器的兼容性，而专注于使用最新的JavaScript特性和API。它提供了一种简单方便的方式来填充浏览器的功能差异，确保代码在各种浏览器环境中具有一致的行为。

 如何使用

要使用 Babel Polyfill，需要按照以下步骤进行设置：

1. 安装依赖：首先，确保你的项目已经安装了 Babel 相关的依赖包。这包括 `@babel/core`、`@babel/preset-env` 和 `@babel/polyfill`。你可以使用 npm 或者 yarn 进行安装：

```shell
npm install --save-dev @babel/core @babel/preset-env @babel/polyfill
```

2. 配置 Babel：在项目根目录下创建一个 `.babelrc` 文件，并添加以下配置：

```json
{
 "presets": ["@babel/preset-env"]
}
```

这样的配置将告诉 Babel 使用 `@babel/preset-env` 预设来进行转换。

3. 导入 Polyfill：在你的入口文件（通常是项目的主 JavaScript 文件）中导入 Babel Polyfill。你可以使用 import 语句或者 require 来导入 Polyfill：

使用 import（适用于 ES6 模块）：

```js
import '@babel/polyfill'
```

使用 require（适用于 CommonJS 模块）：

```js
require('@babel/polyfill')
```

导入 Polyfill 的位置很重要，通常应该在你的应用程序代码之前导入，以确保 Polyfill 在应用程序代码之前被加载和执行。

4. 配置目标浏览器：为了让 Babel Polyfill 根据目标浏览器进行特性填充，你可以在 `.babelrc` 文件中的 `@babel/preset-env` 配置中指定目标浏览器的选项。例如，你可以在配置中添加 `targets` 属性：

```json
{
 "presets": [
 [
 "@babel/preset-env",
 {
 "targets": {
 "browsers": ["last 2 versions", "ie >= 11"]
 }
 }
 ]
 ]
}
```

这样，Polyfill 将根据所选的目标浏览器填充相应的功能。

完成以上步骤后，Babel Polyfill 将根据配置在目标浏览器中填充所需的功能，以确保你的代码在旧版本浏览器中正常运行。请注意，Polyfill 会增加你的应用程序的大小，因此请考虑仅填充所需的功能，以减小文件大小并优化性能。

 按需加载 Polyfill

Babel Polyfill 默认会填充所有缺失的功能，但如果你只需要按需加载特定功能，可以使用 core-js 库的按需加载特性。下面是按需加载 Babel Polyfill 的步骤：

1. 安装依赖：确保你的项目已经安装了必要的依赖。除了之前提到的 Babel 相关依赖外，你还需要安装 `core-js`。

```shell
npm install --save-dev @babel/core @babel/preset-env core-js
```

2. 配置 Babel：在 `.babelrc` 文件中，添加以下配置：

```json
{
 "presets": [
 [
 "@babel/preset-env",
 {
 "useBuiltIns": "usage",
 "corejs": 3
 }
 ]
 ]
}
```

`useBuiltIns` 选项设置为 `"usage"` 表示按需加载特性，而 `"corejs": 3` 指定了使用的 `core-js` 版本。

3. 导入 Polyfill：在需要使用特定功能的文件中，按需导入所需的 Polyfill。例如，如果你需要填充 `Promise` 和 `Array.prototype.includes`，你可以按如下方式导入：

```js
import 'core-js/features/promise'
import 'core-js/features/array/includes'
```

这样只会加载和填充所需的功能，而不会加载整个 Polyfill 库。你可以根据具体的功能需求进行按需导入。

请注意，使用按需加载的方式可以减小应用程序的文件大小，并且只填充需要的功能，但需要确保在使用相关功能之前已经导入了相应的 Polyfill。

## webpack热更新原理是什么？ {#p1-hotreload}

> `Hot Module Replacement`，简称`HMR`，无需完全刷新整个页面的同时，更新模块。`HMR`的好处，在日常开发工作中体会颇深：**节省宝贵的开发时间、提升开发体验**。

刷新我们一般分为两种：

* 一种是页面刷新，不保留页面状态，就是简单粗暴，直接`window.location.reload()`。
* 另一种是基于`WDS (Webpack-dev-server)`的模块热替换，只需要局部刷新页面上发生变化的模块，同时可以保留当前的页面状态，比如复选框的选中状态、输入框的输入等。

`HMR`作为一个`Webpack`内置的功能，可以通过`HotModuleReplacementPlugin`或`--hot`开启。那么，`HMR`到底是怎么实现热更新的呢？下面让我们来了解一下吧！

 1. webpack-dev-server 启动本地服务

我们根据`webpack-dev-server`的`package.json`中的`bin`命令，可以找到命令的入口文件`bin/webpack-dev-server.js`。

```pgsql
// node_modules/webpack-dev-server/bin/webpack-dev-server.js

// 生成webpack编译主引擎 compiler
let compiler = webpack(config);

// 启动本地服务
let server = new Server(compiler, options, log);
server.listen(options.port, options.host, (err) => {
 if (err) {throw err};
});
```

本地服务代码：

```js
// node_modules/webpack-dev-server/lib/Server.js
class Server {
 constructor() {
 this.setupApp();
 this.createServer();
 }

 setupApp() {
 // 依赖了express
  this.app = new express();
 }

 createServer() {
 this.listeningApp = http.createServer(this.app);
 }
 listen(port, hostname, fn) {
 return this.listeningApp.listen(port, hostname, (err) => {
 // 启动express服务后，启动websocket服务
 this.createSocketServer();
 }
 }
}
```

这一小节代码主要做了三件事：

* 启动`webpack`，生成`compiler`实例。`compiler`上有很多方法，比如可以启动 `webpack` 所有**编译**工作，以及**监听**本地文件的变化。
* 使用`express`框架启动本地`server`，让浏览器可以请求本地的**静态资源**。
* 本地`server`启动之后，再去启动`websocket`服务，如果不了解`websocket`，建议简单了解一下[websocket速成](https://link.juejin.cn?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2017%2F05%2Fwebsocket.html "https://www.ruanyifeng.com/blog/2017/05/websocket.html")。通过`websocket`，可以建立本地服务和浏览器的双向通信。这样就可以实现当本地文件发生变化，立马告知浏览器可以热更新代码啦！

上述代码主要干了三件事，但是源码在启动服务前又做了很多事，接下来便看看`webpack-dev-server/lib/Server.js`还做了哪些事？

 2. 修改webpack.config.js的entry配置

启动本地服务前，调用了`updateCompiler(this.compiler)`方法。这个方法中有 2 段关键性代码。一个是获取`websocket`客户端代码路径，另一个是根据配置获取`webpack`热更新代码路径。

```js
// 获取websocket客户端代码
const clientEntry = `${require.resolve(
 '../../client/'
)}?${domain}${sockHost}${sockPath}${sockPort}`

// 根据配置获取热更新代码
let hotEntry
if (options.hotOnly) {
  hotEntry = require.resolve('webpack/hot/only-dev-server')
} else if (options.hot) {
  hotEntry = require.resolve('webpack/hot/dev-server')
}
```

修改后的`webpack`入口配置如下：

```awk
// 修改后的entry入口
{ entry:
 { index:
 [
 // 上面获取的clientEntry
 'xxx/node_modules/webpack-dev-server/client/index.js?http://localhost:8080',
 // 上面获取的hotEntry
 'xxx/node_modules/webpack/hot/dev-server.js',
 // 开发配置的入口
 './src/index.js'
  ],
 },
} 
```

为什么要新增了 2 个文件？在入口默默增加了 2 个文件，那就意味会一同打包到`bundle`文件中去，也就是线上运行时。

**（1）webpack-dev-server/client/index.js**

首先这个文件用于`websocket`的，因为`websoket`是双向通信，如果不了解`websocket`，建议简单了解一下[websocket速成](https://link.juejin.cn?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2017%2F05%2Fwebsocket.html "https://www.ruanyifeng.com/blog/2017/05/websocket.html")。我们在第 1 步 `webpack-dev-server`初始化 的过程中，启动的是本地服务端的`websocket`。那客户端也就是我们的浏览器，浏览器还没有和服务端通信的代码呢？总不能让开发者去写吧hhhhhh。因此我们需要把`websocket`客户端通信代码偷偷塞到我们的代码中。客户端具体的代码后面会在合适的时机细讲哦。

**（2）webpack/hot/dev-server.js**

这个文件主要是用于检查更新逻辑的，这里大家知道就好，代码后面会在合适的时机（**第5步**）细讲。

 3. 监听webpack编译结束

修改好入口配置后，又调用了`setupHooks`方法。这个方法是用来注册监听事件的，监听每次`webpack`编译完成。

```js
// node_modules/webpack-dev-server/lib/Server.js
// 绑定监听事件
setupHooks() {
 const {done} = compiler.hooks;
 // 监听webpack的done钩子，tapable提供的监听方法
 done.tap('webpack-dev-server', (stats) => {
 this._sendStats(this.sockets, this.getStats(stats));
 this._stats = stats;
 });
};
```

当监听到一次`webpack`编译结束，就会调用`_sendStats`方法通过`websocket`给浏览器发送通知，`ok`和`hash`事件，这样浏览器就可以拿到最新的`hash`值了，做检查更新逻辑。

```reasonml
// 通过websoket给客户端发消息
_sendStats() {
 this.sockWrite(sockets, 'hash', stats.hash);
 this.sockWrite(sockets, 'ok');
}
```

 4. webpack监听文件变化

每次修改代码，就会触发编译。说明我们还需要监听本地代码的变化，主要是通过`setupDevMiddleware`方法实现的。

这个方法主要执行了`webpack-dev-middleware`库。很多人分不清`webpack-dev-middleware`和`webpack-dev-server`的区别。其实就是因为`webpack-dev-server`只负责启动服务和前置准备工作，所有文件相关的操作都抽离到`webpack-dev-middleware`库了，主要是本地文件的**编译**和**输出**以及**监听**，无非就是职责的划分更清晰了。

那我们来看下`webpack-dev-middleware`源码里做了什么事:

```awk
// node_modules/webpack-dev-middleware/index.js
compiler.watch(options.watchOptions, (err) => {
 if (err) { /*错误处理*/ }
});

// 通过“memory-fs”库将打包后的文件写入内存
setFs(context, compiler); 
```

（1）调用了`compiler.watch`方法，在第 1 步中也提到过，`compiler`的强大。这个方法主要就做了 2 件事：

* 首先对本地文件代码进行编译打包，也就是`webpack`的一系列编译流程。
* 其次编译结束后，开启对本地文件的监听，当文件发生变化，重新编译，编译完成之后继续监听。

为什么代码的改动保存会自动编译，重新打包？这一系列的重新检测编译就归功于`compiler.watch`这个方法了。监听本地文件的变化主要是通过**文件的生成时间**是否有变化，这里就不细讲了。

（2）执行`setFs`方法，这个方法主要目的就是将编译后的文件打包到内存。这就是为什么在开发的过程中，你会发现`dist`目录没有打包后的代码，因为都在内存中。原因就在于访问内存中的代码比访问文件系统中的文件更快，而且也减少了代码写入文件的开销，这一切都归功于`memory-fs`。

 5. 浏览器接收到热更新的通知

我们已经可以监听到文件的变化了，当文件发生变化，就触发重新编译。同时还监听了每次编译结束的事件。当监听到一次`webpack`编译结束，`_sendStats`方法就通过`websoket`给浏览器发送通知，检查下是否需要热更新。下面重点讲的就是`_sendStats`方法中的`ok`和`hash`事件都做了什么。

那浏览器是如何接收到`websocket`的消息呢？回忆下第 2 步骤增加的入口文件，也就是`websocket`客户端代码。

```
'xxx/node_modules/webpack-dev-server/client/index.js?http://localhost:8080'
```

这个文件的代码会被打包到`bundle.js`中，运行在浏览器中。来看下这个文件的核心代码吧。

```js
// webpack-dev-server/client/index.js
const socket = require('./socket')
const onSocketMessage = {
  hash: function hash (_hash) {
    // 更新currentHash值
    status.currentHash = _hash
  },
  ok: function ok () {
    sendMessage('Ok')
    // 进行更新检查等操作
    reloadApp(options, status)
  }
}
// 连接服务地址socketUrl，?http://localhost:8080，本地服务地址
socket(socketUrl, onSocketMessage)

function reloadApp () {
  if (hot) {
    log.info('[WDS] App hot update...')

    // hotEmitter其实就是EventEmitter的实例
    const hotEmitter = require('webpack/hot/emitter')
    hotEmitter.emit('webpackHotUpdate', currentHash)
  }
}
```

`socket`方法建立了`websocket`和服务端的连接，并注册了 2 个监听事件。

* `hash`事件，更新最新一次打包后的`hash`值。
* `ok`事件，进行热更新检查。

热更新检查事件是调用`reloadApp`方法。比较奇怪的是，这个方法又利用`node.js`的`EventEmitter`，发出`webpackHotUpdate`消息。这是为什么？为什么不直接进行检查更新呢？

个人理解就是为了更好的维护代码，以及职责划分的更明确。`websocket`仅仅用于客户端（浏览器）和服务端进行通信。而真正做事情的活还是交回给了`webpack`。

那`webpack`怎么做的呢？再来回忆下第 2 步。入口文件还有一个文件没有讲到，就是：

```
'xxx/node_modules/webpack/hot/dev-server.js'
```

这个文件的代码同样会被打包到`bundle.js`中，运行在浏览器中。这个文件做了什么就显而易见了吧！先瞄一眼代码：

```js
// node_modules/webpack/hot/dev-server.js
const check = function check () {
  module.hot.check(true)
    .then(function (updatedModules) {
      // 容错，直接刷新页面
      if (!updatedModules) {
        window.location.reload()
        return
      }

      // 热更新结束，打印信息
      if (upToDate()) {
        log('info', '[HMR] App is up to date.')
      }
    })
    .catch(function (err) {
      window.location.reload()
    })
}

const hotEmitter = require('./emitter')
hotEmitter.on('webpackHotUpdate', function (currentHash) {
  lastHash = currentHash
  check()
})
```

这里`webpack`监听到了`webpackHotUpdate`事件，并获取最新了最新的`hash`值，然后终于进行检查更新了。检查更新呢调用的是`module.hot.check`方法。那么问题又来了，`module.hot.check`又是哪里冒出来了的！答案是`HotModuleReplacementPlugin`搞得鬼。这里留个疑问，继续往下看。

 6. HotModuleReplacementPlugin

前面好像一直是`webpack-dev-server`做的事，那`HotModuleReplacementPlugin`在热更新过程中又做了什么伟大的事业呢？

首先你可以对比下，配置热更新和不配置时`bundle.js`的区别。内存中看不到？直接执行`webpack`命令就可以看到生成的`bundle.js`文件啦。不要用`webpack-dev-server`启动就好了。

（1）没有配置的。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/1/16ec0c9e8fd12349~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
（2）配置了`HotModuleReplacementPlugin`或`--hot`的。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/1/16ec0c90092fa0ac~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
哦~ 我们发现`moudle`新增了一个属性为`hot`，再看`hotCreateModule`方法。 这不就找到`module.hot.check`是哪里冒出来的。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/1/16ec0dc36018973f~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

经过对比打包后的文件，`__webpack_require__`中的`moudle`以及代码行数的不同。我们都可以发现`HotModuleReplacementPlugin`原来也是默默的塞了很多代码到`bundle.js`中呀。这和第 2 步骤很是相似哦！为什么，因为检查更新是在浏览器中操作呀。这些代码必须在运行时的环境。

你也可以直接看浏览器`Sources`下的代码，会发现`webpack`和`plugin`偷偷加的代码都在哦。在这里调试也很方便。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/1/16ec0d4634af2b3c~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
`HotModuleReplacementPlugin`如何做到的？这里我就不讲了，因为这需要你对`tapable`以及`plugin`机制有一定了解，可以看下我写的文章[Webpack插件机制之Tapable-源码解析](https://juejin.cn/post/6844904004435050503)。当然你也可以选择跳过，只关心热更新机制即可，毕竟信息量太大。

 7. moudle.hot.check 开始热更新

通过第 6 步，我们就可以知道`moudle.hot.check`方法是如何来的啦。那都做了什么？之后的源码都是`HotModuleReplacementPlugin`塞入到`bundle.js`中的哦，我就不写文件路径了。

* 利用上一次保存的`hash`值，调用`hotDownloadManifest`发送`xxx/hash.hot-update.json`的`ajax`请求；
* 请求结果获取热更新模块，以及下次热更新的`Hash` 标识，并进入热更新准备阶段。

```abnf
hotAvailableFilesMap = update.c; // 需要更新的文件
hotUpdateNewHash = update.h; // 更新下次热更新hash值
hotSetStatus("prepare"); // 进入热更新准备状态
```

* 调用`hotDownloadUpdateChunk`发送`xxx/hash.hot-update.js` 请求，通过`JSONP`方式。

```js
function hotDownloadUpdateChunk (chunkId) {
  const script = document.createElement('script')
  script.charset = 'utf-8'
  script.src = __webpack_require__.p + '' + chunkId + '.' + hotCurrentHash + '.hot-update.js'
  if (null) script.crossOrigin = null
  document.head.appendChild(script)
}
```

这个函数体为什么要单独拿出来，因为这里要解释下为什么使用`JSONP`获取最新代码？主要是因为`JSONP`获取的代码可以直接执行。为什么要直接执行？我们来回忆下`/hash.hot-update.js`的代码格式是怎么样的。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/1/16ec04316d6ac5e3~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

可以发现，新编译后的代码是在一个`webpackHotUpdate`函数体内部的。也就是要立即执行`webpackHotUpdate`这个方法。

再看下`webpackHotUpdate`这个方法。

```ada
window["webpackHotUpdate"] = function (chunkId, moreModules) {
 hotAddUpdateChunk(chunkId, moreModules);
} ;
```

* `hotAddUpdateChunk`方法会把更新的模块`moreModules`赋值给全局全量`hotUpdate`。
* `hotUpdateDownloaded`方法会调用`hotApply`进行代码的替换。

```reasonml
function hotAddUpdateChunk(chunkId, moreModules) {
 // 更新的模块moreModules赋值给全局全量hotUpdate
 for (var moduleId in moreModules) {
 if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
  hotUpdate[moduleId] = moreModules[moduleId];
 }
 }
 // 调用hotApply进行模块的替换
 hotUpdateDownloaded();
}
```

 8. hotApply 热更新模块替换

热更新的核心逻辑就在`hotApply`方法了。 `hotApply`代码有将近 400 行，还是挑重点讲了，看哭😭

 ①删除过期的模块，就是需要替换的模块

通过`hotUpdate`可以找到旧模块

```cpp
var queue = outdatedModules.slice();
while (queue.length > 0) {
 moduleId = queue.pop();
 // 从缓存中删除过期的模块
 module = installedModules[moduleId];
 // 删除过期的依赖
 delete outdatedDependencies[moduleId];

 // 存储了被删掉的模块id，便于更新代码
 outdatedSelfAcceptedModules.push({
 module: moduleId
 });
}
```

 ②将新的模块添加到 modules 中

```inform7
appliedUpdate[moduleId] = hotUpdate[moduleId];
for (moduleId in appliedUpdate) {
 if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
 modules[moduleId] = appliedUpdate[moduleId];
 }
}
```

 ③通过\_\_webpack\_require\_\_执行相关模块的代码

```abnf
for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
 var item = outdatedSelfAcceptedModules[i];
 moduleId = item.module;
 try {
 // 执行最新的代码
 __webpack_require__(moduleId);
 } catch (err) {
 // ...容错处理
 }
}

```

`hotApply`的确比较复杂，知道大概流程就好了，这一小节，要求你对webpack打包后的文件如何执行的有一些了解，大家可以自去看下。

 总结

还是以阅读源码的形式画的图，①-④的小标记，是文件发生变化的一个流程。

![](https://foruda.gitee.com/images/1681014860649655814/ea9d055f_7819612.png)

 参考文档

* [轻松理解webpack热更新原理](https://juejin.cn/post/6844904008432222215)

* [websocket基础知识了解](https://www.ruanyifeng.com/blog/2017/05/websocket.html)
* [tapable: Webpack插件机制之Tapable-源码解析](https://juejin.cn/post/6844904004435050503)

* [Webpack Hot Module Replacement 的原理解析](https://github.com/Jocs/jocs.github.io/issues/15)
* [看完这篇，面试再也不怕被问 Webpack 热更新](https://juejin.cn/post/6844903953092591630)

* [Webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)

## define plugin {#p1-define-plugin}

Webpack 可以通过 DefinePlugin 插件给 web 应用注入环境变量。该插件会在编译过程中替换掉代码中指定的变量，以实现在运行时替换成环境变量的值。

在 webpack 的配置文件中，需要先引入该插件，然后将需要注入的环境变量通过该插件进行配置。例如：

```js
const webpack = require('webpack')

module.exports = {
  // 其他配置
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      API_URL: JSON.stringify('http://api.example.com')
    })
  ]
}
```

上述配置中，定义了两个需要注入的变量，分别是 `process.env.NODE_ENV` 和 `API_URL`。其中，`process.env.NODE_ENV` 是一个常用的环境变量，用来标识当前是开发环境还是生产环境；`API_URL` 是一个自定义的环境变量，用来存储 API 的地址。

在代码中使用这些环境变量时，只需要直接引用即可：

```js
if (process.env.NODE_ENV === 'production') {
  console.log('当前为生产环境')
}

fetch(API_URL + '/users')
  .then(response => response.json())
  .then(data => console.log(data))
```

Webpack 在编译时会将这些变量替换成对应的值，例如：

```js
if ('production' === 'production') {
  console.log('当前为生产环境')
}

fetch('http://api.example.com' + '/users')
  .then(response => response.json())
  .then(data => console.log(data))
```

通过这种方式，我们就可以在代码中方便地使用环境变量，同时保证了在不同环境下都能正确地使用相应的变量值。

## ES6 代码转成 ES5 代码的实现思路是什么？{#p0-es6-es5}

ES6 代码转成 ES5 代码的实现思路主要是通过使用 Babel 这样的工具来实现。Babel 是一个广泛使用的 JavaScript 编译器，可以将 ES6 代码转换成向后兼容的 ES5 代码，从而在现有的浏览器和环境中运行。其主要实现思路如下：

1. 词法分析：Babel 首先会将输入的代码进行词法分析，将代码分割成一个个词法单元。

2. 语法分析：接下来 Babel 会对分割后的词法单元进行语法分析，生成抽象语法树(AST)。

3. 转换：通过对 AST 进行遍历和修改，Babel 将 ES6 代码转换成 ES5 代码。

4. 代码生成：最后，Babel 会根据转换后的 AST 生成可运行的 ES5 代码。

在转换过程中，Babel 会根据预定义的插件和预设对代码进行转换。插件和预设可以分别处理一些特定的语法和功能，如箭头函数、类和模块等。同时，Babel 还支持开发者自定义插件和预设来处理更加特殊和个性化的需求。
