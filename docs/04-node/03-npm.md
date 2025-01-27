# npm

## package.json 配置了解多少？ {#p0-package}

`package.json`常见配置分类：

* 描述配置

* 文件配置

* 脚本配置

* 依赖配置

* 发布配置

* 系统配置

* 第三方配置

`package.json` 作用：存储一切与项目相关的配置，例如项目基本信息、外界访问项目的方式、项目内置脚本、项目依赖等。

 描述配置

主要是项目的基本信息，包括名称，版本，描述，仓库，作者等，部分会展示在 npm 官网上。

```js
{
 "name": "react", // 项目名称 or npm包名
 "version": "18.2.0", // 版本号，开源项目的版本号通常遵循 semver 语义化规范
 "repository": {
 "type": "git",
 "url": "https://github.com/facebook/react.git",
 "directory": "packages/react"
 }, // 项目的仓库地址及版本控制信息
 "description": "React is a JavaScript library for building user interfaces.", // 项目描述 (展示于 npm 官网)
 "keywords": [
 "ant",
 "component",
 "components",
 "design",
 "framework",
 "frontend",
 "react",
 "react-component",
 "ui"
 ], // 项目技术关键词
 "homepage": "https://reactjs.org/", // 项目的主页链接，通常是项目 github 链接，项目官网或文档首页
 "bugs": "https://github.com/vuejs/core/issues", // 项目 bug 反馈地址，通常是 github issue 页面的链接
 "author": "Li jiaxun", // 作者信息
 "private": true, // 私有项目, 若为 true 则无法发布到 npm 官网上
}
```

 文件配置

包括项目所包含的文件，以及入口等信息。

```js
{
 // 🔥@files: 指定需要跟随一起发布的内容，控制 npm 包的大小。
 // 发布时默认会包括 package.json，license，README 和main 字段里指定的文件。忽略 node_modules，lockfile 等文件。在此基础上，可以指定更多需要一起发布的内容。(单独的文件/整个文件夹/使用通配符匹配到的文件)
 // 一般情况下，files 里会指定构建出来的产物以及类型文件，而 src，test 等目录下的文件不需要跟随发布。
 "files": [
 "filename.js",
 "directory/",
 "glob/*.{js,json}"
 ],
 // 🔥@type: 'module' => 用 ESM 解释 .js 文件(此时访问 CJS 模块文件需要 .cjs 后缀)；反之同理。
 "type": "module",
 // 🔥@main: 项目入口文件。
 // if "type: 'module'" => 指向 ESM 模块规范的项目入口文件 else => CommonJS 模块规范的项目入口文件。
 "main": "./index.cjs",
 // @browser: web端项目入口文件路径。该路径下文件不允许在 server 端使用。
 "browser": "./browser/index.js",
 // 🔥@module: ESM 规范模块的项目入口文件。
 "module": "./index.js",
 // 🔥@exports: 配置不同环境对应的模块入口文件(优先级最高 > main)。
 // 作用1: 以别名形式封装包的子路径。"import packageA/dist/css/index.css" => "import packageA/style"
 // 作用2: 以 '.' 为别名时，表示模块主入口，可以看做是 "mian"/"module" 等字段功能的集合。
 // 作用3: 设置模块访问权限。exports 限制使用者不可以访问未在"exports"中定义的任何其他路径。
 // 作用4: 提供了项目(包)多入口访问的途径。例如下面的 './docs' 和 './components'
 "exports": {
 ".": {
 "require": "./index.cjs",
 "import": "./index.js"
 },
 "./docs": {
 "require": "./docs/index.cjs",
 "import": "./docs/index.js"
 },
 "./components": {
 "require": "./components/index.cjs",
 "import": "./components/index.js"
 },
 "./style": "./dist/css/index.css'
 },
 // 🔥@workspaces: 项目的工作区配置，用于在本地的根目录下管理多个子项目。
 // 可以自动地在 npm install 时将 workspaces 下面的包，软链到根目录的 node_modules 中，不用手动执行 npm link 操作。
 // 通常子项目都会平铺管理在 packages 目录下，"packages/*" 表示将该路径下所有子项目的 node_modules 软链到根目录。
 "workspaces": [
 "packages/*",
 ],
}
```

> 当一个项目同时定义了 main，browser 和 module，像 webpack，rollup 等构建工具会感知这些字段，并会根据环境以及不同的模块规范来进行不同的入口文件查找。

 `exports` 字段详解

参考 [阮一峰](https://es6.ruanyifeng.com/#docs/module-loader#package-json-%E7%9A%84-exports-%E5%AD%97%E6%AE%B5)

`exports`字段的优先级高于`main`字段。它有多种用法。

1. 子目录别名

`package.json`文件的`exports`字段可以指定脚本或子目录的别名，此时它的前缀的参照拼接路径是包名。

```js
// ./node_modules/es-module-package/package.json
{
 "exports": {
 "./submodule": "./src/submodule.js"
 }
}
```

上面的代码指定`src/submodule.js`别名为`submodule`，然后就可以从别名加载这个文件。

```js
import submodule from 'es-module-package/submodule'
// 加载 ./node_modules/es-module-package/src/submodule.js
```

如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。

```js
// 报错
import submodule from 'es-module-package/private-module.js';

// 不报错
import submodule from './node_modules/es-module-package/private-module.js';
```

2. main 的别名

`exports`字段的别名如果是`.`，就代表模块的主入口，优先级高于`main`字段，并且可以直接简写成`exports`字段的值。

```js
{
 "exports": {
 ".": "./main.js"
 }
}

// 等同于
{
 "exports": "./main.js"
}
```

由于`exports`字段只有支持 ES6 的 Node.js 才认识，所以可以同时添加`main`字段来兼容旧版本的 Node.js。

```
{
 "main": "./main-legacy.cjs",
 "exports": {
 ".": "./main-modern.cjs"
 }
}
```

> 上面代码中，老版本的 Node.js （不支持 ES6 模块）的入口文件是`main-legacy.cjs`，新版本的 Node.js 的入口文件是`main-modern.cjs`。

3. 条件加载

利用`.`这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。

```json
{
 "type": "module",
 "exports": {
 ".": {
 "require": "./main.cjs",
 "default": "./main.js"
 }
 }
}
```

> 上面代码中，别名`.`的`require`条件指定`require()`命令的入口文件（即 CommonJS 的入口），`default`条件指定其他情况的入口，此处配置了 `type: 'module'`，因此默认命中 ESM 模块规范。

 脚本配置

```
{
 // npm run {scripts} / yarn {scripts} 等命令行方式启动预设置的脚本
 "scripts": {
 "build": "webpack"
 },
 // 设置 scripts 里的脚本在运行时的参数
 "config": {
 "port": "3001"
 },
}
```

 依赖配置

项目依赖其他包引用的相关信息。

```js
{
 // 项目生产环境(运行时)下需要用到的依赖
 // 使用 npm install xxx 或则 npm install xxx --save 时，会被自动插入到该字段中。
 "dependencies": {
 "react": "^18.2.0",
 "react-dom": "^18.2.0"
 },
 // 项目开发环境需要用到而运行时不需要的依赖，用于辅助开发
 // 使用 npm install xxx -D 或者 npm install xxx --save-dev 时，会被自动插入到该字段中。
 "devDependencies": {
 "webpack": "^5.69.0"
 },
 // 同伴依赖
 // 一种特殊的依赖，不会被自动安装，通常用于表示与另一个包的依赖与兼容性关系来警示使用者。
 // 比如我们安装 A，A 的正常使用依赖 B@2.x 版本，那么 B@2.x 就应该被列在 A 的 peerDependencies 下，表示“如果你使用我，那么你也需要安装 B，并且至少是 2.x 版本”。
 // 比如 React 组件库 Ant Design，它的 package.json 里 peerDependencies 为
 // 表示如果你使用 Ant Design，那么你的项目也应该安装 react 和 react-dom，并且版本需要大于等于 16.9.0。
 "peerDependencies": {
 "react": ">=16.9.0",
 "react-dom": ">=16.9.0"
 },
 // optionalDependencies
 // 可选依赖，顾名思义，表示依赖是可选的，它不会阻塞主功能的使用，安装或者引入失败也无妨。这类依赖如果安装失败，那么 npm 的整个安装过程也是成功的。
 // 比如我们使用 colors 这个包来对 console.log 打印的信息进行着色来增强和区分提示，但它并不是必需的，所以可以将其加入到 optionalDependencies，并且在运行时处理引入失败的逻辑。
 // 使用 npm install xxx -O 或者 npm install xxx --save-optional 时，依赖会被自动插入到该字段中。
 "optionalDependencies": {
 "colors": "^1.4.0"
 },
 // peerDependenciesMeta
 // 同伴依赖也可以使用 peerDependenciesMeta 将其指定为可选的。
 "peerDependencies": {
 "colors": "^1.4.0"
 },
 "peerDependenciesMeta": {
 "colors": {
 "optional": true
 }
 },
 // bundleDependencies
 // 打包依赖。它的值是一个数组，在发布包时，bundleDependencies 里面的依赖都会被一起打包。
 // 比如指定 react 和 react-dom 为打包依赖：
 // 在执行 npm pack 打包生成 tgz 压缩包中，将出现 node_modules 并包含 react 和 react-dom。
 // 需要注意的是，这个字段数组中的值必须是在 dependencies，devDependencies 两个里面声明过的依赖才行。
 // 普通依赖通常从 npm registry 安装，但当你想用一个不在 npm registry 里的包，或者一个被修改过的第三方包时，打包依赖会比普通依赖更好用。
 "bundleDependencies": [
 "react",
 "react-dom"
 ],
 // overrides
 // overrides 可以重写项目依赖的依赖，及其依赖树下某个依赖的版本号，进行包的替换。
 // 比如某个依赖 A，由于一些原因它依赖的包 foo@1.0.0 需要替换，我们可以使用 overrides 修改 foo 的版本号：
 "overrides": {
 "foo": "1.1.0-patch"
 }
}
```

 发布配置

主要是和项目发布相关的配置。

**private**

如果是私有项目，不希望发布到公共 npm 仓库上，可以将 `private` 设为 true。

```
"private": true
```

**publishConfig**

顾名思义，publishConfig 就是 npm 包发布时使用的配置。

比如在安装依赖时指定了 registry 为 taobao 镜像源，但发布时希望在公网发布，就可以指定 publishConfig.registry。

```
"publishConfig": {
 "registry": "https://registry.npmjs.org/"
}
```

 系统配置

和项目关联的系统配置，比如 node 版本或操作系统兼容性之类。这些要求只会起到提示警告的作用，即使用户的环境不符合要求，也不影响安装依赖包。

**engines**

一些项目由于兼容性问题会对 node 或者包管理器有特定的版本号要求，比如：

```
"engines": {
 "node": ">=14 <16",
 "pnpm": ">7"
}
```

要求 node 版本大于等于 14 且小于 16，同时 pnpm 版本号需要大于 7。

**os**

在 linux 上能正常运行的项目可能在 windows 上会出现异常，使用 os 字段可以指定项目对操作系统的兼容性要求。

```
"os": ["darwin", "linux"]
```

**cpu**

指定项目只能在特定的 CPU 体系上运行。

```
"cpu": ["x64", "ia32"]
```

 第三方配置

一些第三方库或应用在进行某些内部处理时会依赖这些字段，使用它们时需要安装对应的第三方库。

```js
{
 // 其他工具访问本项目 ts 类型定义时的入口文件
 "types": "./index.d.ts",
 // npm 上所有的文件都开启 CDN 服务
 "unpkg": "dist/vue.global.js",
 // 设置项目的浏览器兼容情况, babel 和 autoprefixer 等工具会使用该配置对代码进行转换
 "browserslist": [
 "> 1%",
 "last 2 versions"
 ],
 // 用于 webpack 的 tree-shaking 优化, 指定路径下的文件不参与 tree-shaking 并始终保留。
 "sideEffects": [
 "dist/*",
 "es/**/style/*",
 "lib/**/style/*",
 "*.less"
 ]
}
```

 参考文档

* [资料](https://juejin.cn/post/7145001740696289317)

* [资料](https://juejin.cn/post/7161392772665540644)

## npm {#p0-npm-function}

**npm 是如何进行依赖管理的？**

npm 是通过 package.json 文件来进行依赖管理的。当在项目中使用第三方库时，我们可以在 package.json 中添加对应的依赖项及版本号，npm 会根据 package.json 中的依赖关系，自动安装相应的依赖包及其依赖项。当我们执行 npm install 命令时，npm 会自动根据 package.json 中的依赖信息进行依赖包的安装。

npm 的依赖管理还涉及到依赖的版本控制，可以在 package.json 中指定对应的版本号，常见的版本号控制符号有：

* `^（caret）`：匹配到次要版本号（第二个数字）的最新版本。例如，^1.2.3 表示安装 1.2.x 的最新版本（除了 1.3.0）。
* `~（tilde）`：匹配到修订版本号（第三个数字）的最新版本。例如，~1.2.3 表示安装 1.2.3 到 1.2.x 的最新版本（除了 1.3.0）。
* `*`：匹配到最新的版本。
* `>=`：匹配到大于或等于指定版本的最新版本。
* `<、<=、>`：匹配到小于、小于等于或大于指定版本的最新版本。

在 npm 的依赖管理中，还有两种类型的依赖关系：生产依赖和开发依赖。生产依赖是指在应用程序运行时必须要加载的依赖，开发依赖是指在应用程序开发过程中使用的依赖。在 package.json 中，生产依赖使用 dependencies 字段，开发依赖使用 devDependencies 字段。这样可以让项目更加清晰地管理其依赖关系。

**npm 有缓存包的能力吗？**

npm有缓存包的能力。当你第一次使用npm安装一个包时，npm会自动将该包缓存在本地。这样，当你下次需要安装相同版本的该包时，npm就不必重新从网络上下载该包，而是直接使用缓存中的包。这样可以提高包的下载速度，节省网络带宽。

npm的缓存位于本地文件系统中的一个隐藏目录。默认情况下，缓存位于当前用户的主目录下的.npm目录中。你可以使用以下命令查看npm缓存的路径：

```shell
npm config get cache
```

你也可以通过npm cache命令来管理npm缓存，例如清空缓存：

```shell
npm cache clean
```

或者查看缓存的统计信息：

```shell
npm cache ls
```

**npm 是如何使用缓存中的包的？**

使用缓存中的包可以通过以下两种方式实现：

* `使用 npm ci 命令`
npm ci 命令会首先检查 package-lock.json 或 npm-shrinkwrap.json 文件，以确保安装的依赖与锁定的版本一致。然后，它会在 node_modules 目录下安装依赖，如果缓存中存在符合要求的包，npm ci 会直接从缓存中复制到 node_modules 目录下，而不需要重新下载和编译。

* `手动指定缓存路径`
如果需要手动使用缓存中的包，可以在 npm install 命令中指定缓存路径，例如：

```shell
npm install --cache /path/to/npm-cache
```

然后，执行 npm install 命令时，npm 会尝试从指定的缓存路径中获取包，如果找到匹配的包，就会直接复制到 node_modules 目录下。

需要注意的是，手动指定缓存路径的方式可能会导致不同的项目之间共用缓存，因此需要确保缓存路径的唯一性。

## package.json 依赖申明的方式有哪些， 他们有何却别 {#p2-package-json-dependencies}

**一、`dependencies`（生产依赖）**

1. **定义和用途**：

* `dependencies`用于声明项目在生产环境中运行所必需的依赖项。
* 这些依赖项是项目正常运行所不可或缺的，无论是在开发阶段还是在部署到生产环境后。

2. **示例**：

* 比如，如果你的项目使用了 Express.js 框架来构建服务器，那么 Express.js 就应该被声明在`dependencies`中。
* `"express": "^4.17.1"`表示安装 Express 版本 4.17.1 或更高的兼容版本。

3. **安装和使用**：

* 当你运行`npm install`或`yarn install`时，这些依赖项会被自动安装到项目的`node_modules`目录中。
* 在生产环境中部署项目时，这些依赖项也会被一同部署。

**二、`devDependencies`（开发依赖）**

1. **定义和用途**：

* `devDependencies`用于声明仅在开发过程中需要的依赖项。
* 这些依赖项通常包括开发工具、测试框架、代码格式化工具等，它们不是项目在生产环境中运行所必需的。

2. **示例**：

* 例如，Jest 是一个流行的 JavaScript 测试框架，如果你的项目使用 Jest 进行测试，那么 Jest 应该被声明在`devDependencies`中。
* `"jest": "^26.6.3"`表示安装 Jest 版本 26.6.3 或更高的兼容版本。

3. **安装和使用**：

* 同样，当你运行`npm install`或`yarn install`时，这些依赖项会被安装到项目的`node_modules`目录中。
* 但是，在生产环境中部署项目时，通常不会部署这些开发依赖项，以减小项目的体积和复杂性。

**区别总结**：

1. **使用场景不同**：

* `dependencies`中的依赖项是项目在生产环境中运行所必需的，而`devDependencies`中的依赖项仅在开发过程中使用。

2. **部署方式不同**：

* 生产环境部署时，通常只部署`dependencies`中的依赖项，而不部署`devDependencies`中的依赖项。

3. **影响项目体积和复杂性**：

* 将不必要的依赖项放在`devDependencies`中可以减小项目在生产环境中的体积和复杂性，提高性能和安全性。

**三、`peerDependencies`（对等依赖）**

1. **定义和用途**：

* `peerDependencies` 用于声明当前包所依赖的其他包，但这些依赖项不会被自动安装。
* 它通常用于插件或扩展的场景，表明当前包与特定版本的其他包兼容，并且期望宿主环境已经安装了这些对等依赖。

2. **示例**：

* 假设你正在开发一个 React 插件，你的插件可能需要特定版本的 React 才能正常工作。在这种情况下，你可以在 `package.json` 的 `peerDependencies` 中声明对 React 的依赖。
* `"peerDependencies": { "react": "^17.0.2" }` 表示这个插件期望宿主环境安装了 React 17.0.2 或更高的兼容版本。

3. **安装和使用**：

* 当用户安装你的包时，他们需要确保在自己的项目中手动安装了满足 `peerDependencies` 要求的包。如果没有安装或版本不匹配，可能会导致运行时错误。

**区别总结**：

* **与 `dependencies` 的区别**：
* `dependencies` 中的依赖项会在安装当前包时自动安装，而 `peerDependencies` 中的依赖项不会自动安装，需要用户在宿主项目中自行安装。
* **与 `devDependencies` 的区别**：
* `devDependencies` 是仅在开发过程中使用的依赖项，而 `peerDependencies` 是与当前包在运行时的兼容性相关的依赖项，不一定只在开发过程中使用。

## package.json 里面，表示导出包内容的配置有哪些 {#p1-package-json-export-config}

**一、`main`字段**

1. 作用：

* 指定当你的包被引入时，模块系统应该加载的主要入口文件。
* 对于 CommonJS 和 ES6 模块系统，这个文件将作为默认的入口点。

2. 示例：

* `"main": "dist/index.js"`表示当你的包被引入时，会加载`dist`目录下的`index.js`文件作为主要入口。

**二、`module`字段**

1. 作用：

* 专门为 ES6 模块系统指定入口文件。
* 一些现代的构建工具和环境（如 Webpack、Rollup 等）会优先使用这个字段来确定 ES6 模块的入口点。

2. 示例：

* `"module": "esm/index.js"`表示对于支持 ES6 模块的环境，会加载`esm`目录下的`index.js`文件。

**三、`exports`字段（在 Node.js 12+ 和一些现代构建工具中支持）**

1. 作用：

* 提供了一种更灵活的方式来指定包的不同入口点，可以根据不同的模块系统和环境来导出不同的文件。
* 可以同时为 CommonJS、ES6 模块、不同的子路径等指定特定的入口文件。

2. 示例：

```json

 "exports": {
 ".": {
 "import": "./esm/index.js",
 "require": "./cjs/index.js"
 },
 "./submodule": {
 "import": "./esm/submodule.js",
 "require": "./cjs/submodule.js"
 }
 }
 ```

* 在这个例子中，对于根路径（`.`），如果是 ES6 模块环境，会加载`./esm/index.js`；如果是 CommonJS 环境，会加载`./cjs/index.js`。对于`./submodule`子路径，也分别指定了不同模块系统的入口文件。

这些配置允许你控制包的导出内容和入口点，以便其他开发者能够正确地引入和使用你的包。根据你的项目结构和目标环境，可以选择合适的配置来确保包的可维护性和兼容性。

## 说一下你对 npm hook 的理解 {#p2-npm-hook}

| 脚本名称 | 阶段 | 描述 | 执行时机 |
|-----------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| preinstall | pre | 在 npm install 执行前运行，用于执行一些安装前的准备工作，例如检查依赖项或设置环境变量。 | 安装前 |
| install, postinstall | install | 在模块安装后执行，通常用于构建项目或者为其生成某些必须的文件，例如安装完毕后自动编译 TypeScript、ES6 等。 | 安装后 |
| preuninstall | pre | 在 npm uninstall 执行前运行，用于执行一些卸载前的准备工作。 | 卸载前 |
| uninstall | post | 在 npm uninstall 执行后运行，用于清理卸载后的一些操作。 | 卸载后 |
| postuninstall | post | 在 npm uninstall 执行后运行，用于执行一些卸载后的操作。 | 卸载后 |

 发布和更新版本

| 脚本名称 | 阶段 | 描述 | 执行时机 |
|-----------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| prepublish | pre | 在 publish（npm发布）执行前，运行 npm pack。 | 发布前 |
| prepare | pre | 在包被发布前或安装前执行，可以用来设置编译或验证文件的操作。 | 发布前、安装前 |
| prepublishOnly | pre | 在 npm publish 执行前运行，用于确保在 publish 命令执行时不会意外发布不必要的文件。 | 发布前 |
| prepack | pre | 在 npm pack（打包命令）执行前运行，用于执行一些打包前的准备工作。 | 打包前 |
| postpack | post | 在 npm pack 执行后运行，用于清理和重置打包相关的操作。 | 打包后 |
| publish | post | 在包被成功发布后执行。 | 发布后 |
| postpublish | post | 在包被成功发布后执行，用于执行一些发布后的操作。 | 发布后 |
| preversion | pre | 在项目版本号更新（npm version）之前执行。 | 更新版本号前 |
| version | post | 在 npm version 执行后执行，用于执行一些版本更新后的操作。 | 更新版本号后 |
| postversion | post | 在项目版本号更新（npm version）之后执行。 | 更新版本号后 |

 测试和运行

| 脚本名称 | 阶段 | 描述 | 执行时机 |
|-----------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| pretest | pre | 在 npm test 执行前执行，用于执行某些测试前的准备工作。 | 测试前 |
| test | test | 执行 npm run test 命令时执行。通常用于执行单元测试，并返回任何错误状态。 | 默认测试阶段 |
| posttest | post | 在 npm test 执行后执行，用于执行某些测试后的操作。 | 测试后 |
| prestart | pre | 在 npm start 执行前运行，用于执行某些启动进程前的准备工作。 | 启动前 |
| start | start | 执行 npm start 命令时执行，通常用于启动 Web 服务器、Node 服务器、实时编译器等。 | 默认启动阶段 |
| poststart | post | 在 npm start 执行后执行，用于执行某些启动进程后的操作。 | 启动后 |
| prerestart | pre | 在 npm restart 执行前执行，用于执行一些重新启动进程前的准备工作。 | 重新启动前 |
| restart | stop/start | 执行 npm restart 命令时执行，通常用于停止正在运行的 Node 服务器、Web 服务器等，然后以更新的源码重新启动服务。 | 默认重新启动阶段，但是该命令会触发停止和启动两个标准阶段 |
| postrestart | post | 在 npm restart 执行后执行，用于执行一些重新启动进程后的操作。 | 重新启动后 |

 其他生命周期

| 脚本名称 | 阶段 | 描述 | 执行时机 |
|-----------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| prestop | pre | 在 npm stop 执行前运行，用于执行某些停止进程前的准备工作。 | 停止前 |
| stop | stop | 执行 npm stop 命令时执行，通常用于停止正在运行的 Web 服务器、Node 服务器、实时编译器等。 | 默认停止阶段 |
| poststop | post | 在 npm stop 执行后执行，用于执行某些停止进程后的操作。 | 停止后 |

## npm workspaces 是什么概念， 主要是解决什么问题 {#p2-npm-workspaces}

**一、项目结构管理**

1. **多包项目组织**：

* 在大型项目中，可能包含多个独立的软件包或模块。`npm workspaces`允许将这些包组织在一个统一的项目结构中，方便管理和开发。
* 例如，一个企业级应用可能由一个前端库、一个后端服务和一个共享的工具包组成。使用`npm workspaces`，可以将这些包放在同一个项目目录下，而不是作为独立的项目进行管理。

2. **依赖共享**：

* 多个包之间可能存在共享的依赖项。`npm workspaces`可以自动管理这些共享依赖，避免重复安装和版本冲突。
* 当一个包安装了某个依赖项时，其他包可以直接使用这个依赖，而不需要再次安装。这可以减少项目的体积和安装时间，提高开发效率。

**二、开发效率提升**

1. **单一命令行界面**：

* 使用`npm workspaces`，可以在项目的根目录下使用单一的`npm`命令来管理所有的包。这避免了在每个包的目录下分别运行`npm`命令的繁琐过程。
* 例如，可以在根目录下运行`npm install`来安装所有包的依赖项，或者运行`npm run test`来执行所有包的测试。

2. **同时开发多个包**：

* 开发人员可以在同一个项目中同时开发多个包，而不需要在不同的项目目录之间切换。这可以提高开发效率，特别是在需要频繁修改多个包的情况下。
* 例如，可以在一个编辑器中打开多个包的代码，进行同时编辑和调试。

**三、版本管理和发布**

1. **统一版本控制**：

* 在多包项目中，需要确保各个包的版本保持一致。`npm workspaces`可以帮助管理包的版本，确保在发布时所有的包都使用相同的版本号。
* 可以在项目的根目录下使用`npm version`命令来统一更新所有包的版本号，并生成相应的版本标签。

2. **简化发布流程**：

* 发布多个包时，通常需要分别在每个包的目录下执行发布命令。使用`npm workspaces`，可以在项目的根目录下使用单一的发布命令来发布所有的包。
* 例如，可以使用`npm publish --workspaces`来发布项目中的所有包，而不需要分别进入每个包的目录进行发布。

## pnpm install 和 npm install 有何区别 {#p2-pnpm-install-vs-npm-install}

`pnpm install` 和 `npm install` 都是用于安装 JavaScript 项目依赖的命令，但它们背后的包管理器（分别是 `pnpm` 和 `npm`）在处理依赖安装、存储和优化方面有一些关键区别。

 1. **存储方式的区别**

* **npm**：在每个项目的 `node_modules` 文件夹中分别存储其依赖。这意味着如果你有多个项目，它们共享相同的依赖库，这些依赖库的多个副本将在你的文件系统中的每个项目内分别存储。这样做会占用更多的磁盘空间。

* **pnpm**：采用一种称为**内容寻址文件系统**的方式来存储依赖。所有项目的依赖被存储在一个共享的位置，各个项目中的 `node_modules` 目录通过硬链接（hard links）或符号链接（symlinks）指向这个共享位置。该方法有效地减少了磁盘空间的占用，并加快了依赖的安装速度。

 2. **性能与速度**

* **pnpm**：由于对依赖进行了有效的复用，并且使用硬链接来减少磁盘上的副本数量，通常可以提供比 `npm` 更快的安装速度。

* **npm**：近几个大版本中也进行了许多性能改进，但在多个项目中共享相同依赖时，它可能仍然比 `pnpm` 更慢，尤其是在首次安装依赖时。

 3. **依赖平面结构 vs. 嵌套结构**

* **npm**：自版本 3 以后，默认创建扁平的 `node_modules` 结构（尽可能），这样做是为了避免 Windows 系统中路径过长的问题。但在必要时， `npm` 仍然会创建嵌套的 `node_modules` 目录结构，以解决依赖冲突。

* **pnpm**：通过使用符号链接，`pnpm` 维护了一个严格的嵌套依赖结构，更接近每个包的 `package.json` 文件所声明的依赖树形态。这提供了更高的一致性和在某些情况下更好的包隔离性。

 4. **依赖隔离与安全性**

* **pnpm**：更好地隔离了依赖，每个包只能访问其在 `package.json` 中声明的依赖。这一特性增强了项目的安全性，因为它阻止了未声明的依赖被意外引入的情况。

* **npm**：虽然 `npm` 也遵循 `package.json` 中的声明，但其扁平化的 `node_modules` 结构有时可能会容易地让包访问到未明确声明的依赖。

 5. **命令行界面（CLI）和配置**

* 这两个工具的命令行界面（CLI）和配置都非常直观且类似，但它们的某些命令和选项可能会有细微差别。`pnpm` 为了优化性能和安全性引入了一些特有的命令和配置选项。

总的来说，`pnpm` 在多项目管理、磁盘空间和安装速度方面提供了优于 `npm` 的性能和利益。对于新项目或在寻求性能优化的既存项目，考虑试用 `pnpm` 可能是个不错的选择。

## monorepo 工程有哪些工具架构， 该如何选型 {#p3-monorepo-工程有哪些工具架构-该如何选型}

 工具推荐

| 工具 | **Turborepo** | **Rush** | **Nx** | **Lerna** | **Pnpm Workspace** |
| -------- | ------------- | -------- | ------ | --------- | ------------------ |
| 依赖管理 | ❌ | ✅ | ❌ | ❌ | ✅ |
| 版本管理 | ❌ | ✅ | ❌ | ✅ | ❌ |
| 增量构建 | ✅ | ✅ | ✅ | ❌ | ❌ |
| 插件扩展 | ✅ | ✅ | ✅ | ❌ | ❌ |
| 云端缓存 | ✅ | ✅ | ✅ | ❌ | ❌ |
| Stars | 20.4K | 4.9K | 17K | 34.3K | 22.7K |

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d85551b9ce50496d8403956b571c4635~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=2610&h=1020&s=64366&e=webp&b=fdfdfd)

 工具选型

选择合适的 Monorepo 管理工具对于确保项目的顺利进行是至关重要的。Monorepo 管理工具可以帮助你高效地管理项目依赖、统一代码风格、简化开发流程等。在进行 Monorepo 工具选型时，需要考虑几个重要的因素：

 1. **技术栈的兼容性**

* **Lerna**：与任何技术栈兼容性都很好，特别是与前端项目协同工作时。它对 NPM 和 Yarn 都有良好支持，适用于需要独立版本管理或频繁发布的项目。
* **Yarn Workspaces**：特别适合使用 Yarn 作为包管理器的 JavaScript 或 TypeScript 项目。它非常适合团队中包之间有很多交叉依赖的情形。
* **Nx**：支持多种前端和后端框架，如 Angular、React、NestJS 等。如果项目采用多技术栈，Nx 提供了一套完整的解决方案，包含了构建、测试和 linting 等一站式服务。
* **Rush**：同样适用于大型项目，兼容任何 NPM 包管理器，如 NPM、Yarn、pnpm。Rush 提供了灵活的版本控制策略，非常适合需要精细控制包版本策略的场景。
* **pnpm Workspaces**：具有高效的节点模块解析机制，非常注重节省磁盘空间及速度优化。如果磁盘空间和安装速度是关键考虑因素，pnpm 会是一个不错的选择。

 2. **项目的规模和复杂度**

* 对于大型或复杂项目，**Nx** 和 **Rush** 提供了更多的高级特性，比如增量构建、依赖图可视化等，可以有效提升大团队的开发效率。
* 对于中小型项目，**Lerna**、**Yarn Workspaces** 或 **pnpm Workspaces** 可能更易上手，配置和管理也较为简单。

 3. **构建、测试和部署的需求**

* 如果项目需要复杂的构建、测试流程，**Nx** 提供了一些很好的工具来优化这一过程。Nx 可以智能地只重新构建受影响的项目，节省 CI/CD 的时间和资源。
* **Rush** 强调在大型仓库中提供稳定而灵活的版本策略和发布管理，对于需要精细控制不同环境部署的项目非常有用。

 4. **团队协作和代码共享的便利性**

* 所有这些工具都支持代码共享和重用，但是**Nx** 和 **Rush** 在支持大型团队和多项目协作方面有一些额外的优势，如更智能的依赖管理和版本控制。

 5. **社区支持和文档**

* **Nx** 拥有强大的社区支持和丰富的文档、教程，非常适合于新技术栈的团队。
* **Lerna** 和 **Yarn Workspaces** 受众广泛，网上有很多资源和案例，学习曲线相对平缓。

 推荐策略

如果你的项目非常关注于构建效率和对多种技术栈的支持，**Nx** 是非常好的选择。如果你更关心包的独立发布和版本管理，**Lerna** 和 **Rush** 可以满足你的需求。而对于那些偏好 Yarn 并且注重依赖管理的项目来说，**Yarn Workspaces** 提供了一套简单直接的解决方案。如果磁盘空间和安装速度是你的主要考虑，不妨试试 **pnpm Workspaces**。

## 幽灵依赖是什么 {#p0-ghost-dependency}

"幽灵依赖"（Ghost Dependency）是指在项目的`node_modules`目录中存在但未被实际使用的依赖包。

在使用 npm 或者其他包管理工具安装依赖包时，有时会出现安装了一些不需要的或者不正确的依赖包的情况。这些依赖包在项目中没有被显式地引用或使用，但仍然存在于`node_modules`目录中，占用了项目的存储空间。

幽灵依赖可能会产生以下问题：

1. 占用存储空间：未使用的依赖包会增加项目的体积，占用存储空间。对于大型项目或频繁部署的项目来说，这可能会造成不必要的存储资源浪费。

2. 增加构建时间：未使用的依赖包可能会增加构建过程中的解析和处理时间，导致构建过程变慢。这会影响开发人员的开发效率和项目的部署速度。

3. 潜在的安全风险：未使用的依赖包可能包含漏洞或安全风险，但由于没有使用，可能没有及时更新或修复这些问题，增加了项目的安全隐患。

为了解决幽灵依赖的问题，可以采取以下措施：

1. 定期检查依赖：定期检查项目的依赖，识别和删除未使用的依赖包。可以使用工具如`npm-check-unused`、`depcheck`等来帮助检测和清理未使用的依赖。

2. 精简依赖：审查项目的依赖关系，仅安装和保留必要的依赖包。避免过度依赖，只安装项目所需的模块，减少项目体积和构建时间。

3. 更新依赖包：确保项目中使用的依赖包都是最新版本，并及时更新已知的安全漏洞和问题。这可以通过定期检查依赖包的更新和使用工具如`npm audit`来实现。

通过处理幽灵依赖，可以提高项目的整洁性、性能和安全性，并减少不必要的开销和风险。

 pnpm 是如何解决幽灵依赖问题的

pnpm 是一个基于 npm 的包管理工具，它采用了一种称为"快速硬链接（Fast Hard Links）"的机制来解决幽灵依赖问题。

传统的 npm 或 yarn 安装依赖时，每个项目都会在`node_modules`目录下创建依赖包的副本。这导致了大量的重复文件，尤其是对于多个项目都使用同一依赖包时。

而 pnpm 通过使用快速硬链接机制，在全局的存储位置（默认为`~/.pnpm-store`）只保存一份依赖包，而不是为每个项目都复制一份。这样就避免了幽灵依赖问题，减少了存储空间的占用。

当使用 pnpm 安装依赖时，它会在项目的`node_modules`目录下创建一个`.modules.yaml`文件，记录项目所需的依赖包和版本信息。实际的依赖包文件通过硬链接指向全局存储位置中的依赖包。这意味着不同项目之间可以共享相同的依赖包，但每个项目都拥有自己的依赖版本。

通过这种方式，pnpm 解决了幽灵依赖的问题，同时减少了存储空间的使用。它还具有一些其他的优点，如更快的安装速度、更少的网络传输和更好的缓存利用率。

需要注意的是，pnpm 仍然会将项目中的所有依赖安装在`node_modules`目录下，但它使用硬链接的方式避免了重复文件的复制，从而解决了幽灵依赖问题。

## pnpm、npm、yarn 特性 {#p1-package}

| 功能 | pnpm | Yarn | npm |
|--------------------------------|------------------------------------------------------------------------------------------------|--------------------------------------------------------|------------------------------------------------------|
| 工作区支持 | ✔️ | ✔️ | ✔️ |
| 隔离的 node_modules | ✔️ - 默认支持 | ✔️ | ✔️ |
| 提升的 node_modules | ✔️ | ✔️ | ✔️ - 默认支持 |
| 自动安装对等依赖 | ✔️ | ❌ | ✔️ |
| Plug'n'Play | ✔️ | ✔️ - 默认支持 | ❌ |
| 零安装 | ❌ | ✔️ | ❌ |
| 修补依赖 | ✔️ | ✔️ | ❌ |
| 管理 Node.js 版本 | ✔️ | ❌ | ❌ |
| 有一个锁文件 | ✔️ - 使用 pnpm-lock.yaml | ✔️ - 使用 yarn.lock | ✔️ - 使用 package-lock.json |
| 覆盖支持 | ✔️ | ✔️ - 通过 resolutions 配置 | ✔️ |
| 可寻址存储 | ✔️ | ❌ | ❌ |
| 动态包执行 | ✔️ - 通过 pnpm dlx | ✔️ - 通过 yarn dlx | ✔️ - 通过 npx |
| 副作用缓存 | ✔️ | ❌ | ❌ |
| 列出许可证 | ✔️ - 通过 pnpm licenses list | ✔️ - 通过插件 | ❌ |

## npx 了解多少？ {#p0-npx}

npx是一个由Node.js官方提供的用于快速执行npm包中的可执行文件的工具。它可以帮助我们在不全局安装某些包的情况下，直接运行该包提供的命令行工具。npx会在执行时，检查本地项目中是否安装了对应的依赖，如果没有安装则会自动下载安装，并执行命令。如果本地已经存在该依赖，则直接执行命令。

使用npx时，可以在命令行中输入要执行的包名加上其参数，例如：

```shell
npx create-react-app my-app
```

以上命令会在本地下载并运行create-react-app包中的可执行文件，创建一个名为my-app的React应用程序。

**npx 会把远端的包下载到本地吗?**

npx 不会像 npm 或 yarn 一样将包下载到本地的 node_modules 目录中。相反，它会在执行命令时，在本地缓存中寻找并下载包，然后执行该包中的命令。这样可以避免在开发过程中在全局安装大量的包，同时也可以确保使用的是最新版本的包。

**npx 执行完成之后， 下载的包是否会被删除？**

是的，npx会在执行完命令后删除下载的包。这是因为npx会在执行命令之前，将需要执行的包下载到一个临时目录中，并在执行完毕后删除该目录。这样可以避免在本地留下不必要的依赖包。如果需要保留依赖包，可以使用--no-cleanup选项来禁止删除下载的包。

## npm lock 文件了解多少？ {#p0-npm-lock}

**作用**

npm lock 文件（如 package-lock.json 或 yarn.lock）的作用是确保在不同机器上或在不同时间安装相同的依赖包时，获得相同的版本，以避免由于版本不一致而产生的问题。在安装依赖包时，npm lock 文件会锁定当前的依赖树，并记录每个依赖包的确切版本号和依赖关系。这样，在重新安装依赖包时，npm 将使用 lock 文件中记录的版本和依赖关系来安装依赖包，而不是根据 package.json 文件中的符号依赖去解析版本。这确保了依赖包版本的一致性。

**生成原理**

生成 npm lock 文件的原理如下：

* 当我们使用 npm install 或 npm ci 安装依赖包时，npm 会检查项目中的 `package.json` 文件，并根据其中的依赖包信息，生成一个 `node_modules` 目录用来存储这些依赖包。

* 在生成 node_modules 目录时，npm 会生成一个 `npm-shrinkwrap.json` 或 `package-lock.json` 文件，用来记录所有已经安装的依赖包的精确版本信息和依赖关系。这些信息是根据 `package.json` 文件和 `node_modules` 目录中实际安装的依赖包信息计算出来的。

* 在以后的安装过程中，npm 会先检查是否存在 `npm-shrinkwrap.json` 或 `package-lock.json` 文件，如果存在，就使用其中的依赖包版本信息来安装依赖包，而不是根据 `package.json` 文件中的信息重新计算依赖包版本。这样就可以确保每次安装时都使用相同的依赖包版本，避免了版本不一致导致的问题。

**npm-shrinkwrap.json 是什么文件？**

`npm-shrinkwrap.json` 文件是 Node.js 包管理工具 npm 生成的一份锁定文件，用于锁定项目依赖包的版本，确保团队成员在使用同一版本的依赖包，以避免在不同环境下因版本不一致而导致的问题。

与 `package-lock.json` 文件类似，`npm-shrinkwrap.json` 文件可以在项目中确保依赖包版本的一致性，但它与 `package-lock.json` 文件不同之处在于，它能够锁定所有的依赖包版本，包括间接依赖的包版本，而 `package-lock.json` 文件只会锁定直接依赖包的版本。

同时，使用 `npm-shrinkwrap.json` 文件也需要注意，在项目开发过程中，如果需要升级依赖包版本，需要手动更新 `npm-shrinkwrap.json` 文件中的对应依赖包版本号。

**如何启用 npm-shrinkwrap.json**

在项目根目录下使用以下命令可以生成 `npm-shrinkwrap.json` 文件：

```
npm shrinkwrap
```

如果需要在安装新的包时同时更新 `npm-shrinkwrap.json` 文件，可以使用以下命令：

```
npm shrinkwrap --dev
```

这个命令会把 devDependencies 也包括在生成的 npm-shrinkwrap.json 文件中。

## npm script 了解多少？ {#p0-npm-scripts}

npm 允许在package.json文件里面，使用scripts字段定义脚本命令。

```awk
{
 // ...
 "scripts": {
 "build": "node build.js"
 }
}
```

上面代码是`package.json`文件的一个片段，里面的scripts字段是一个对象。它的每一个属性，对应一段脚本。比如，build命令对应的脚本是`node build.js`。

命令行下使用`npm run`命令，就可以执行这段脚本。

```crmsh

$ npm run build
等同于执行
$ node build.js
```

这些定义在`package.json`里面的脚本，就称为npm脚本。它的优点很多。

* 项目的相关脚本，可以集中在一个地方。
* 不同项目的脚本命令，只要功能相同，就可以有同样的对外接口。
* 用户不需要知道怎么测试你的项目，只要运行npm run test即可。
* 可以利用 npm 提供的很多辅助功能。

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的`npm run`命令。

```applescript
npm run
```

---

 原理

npm run 实际上是 npm run-script 命令的简写

* 从 package.json 文件中读取 scripts 对象里面的全部配置；
* 以传给 npm run 的第一个参数作为键，如dev，在 scripts 对象里面获取对应的值作为接下来要执行的命令，如果没找到直接报错；

每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，npm run新建的这个 Shell，会将当前目录的node\_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。

这意味着，当前目录的node\_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 Mocha，只要直接写mocha test就可以了。

```json
"test": "mocha test"
```

 通配符

由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符。

```json
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```

上面代码中，\*表示任意文件名，\*\*表示任意一层子目录。

如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。

```json
"test": "tap test/\*.js"
```

---

 传参

给 npm script 传递参数 给 npm script 传递参数 eslint 内置了代码风格自动修复模式，只需给它传入 --fix 参数即可，在 scripts 中声明检查代码命令的同时你可能也需要声明修复代码的命令，面对这种需求，大多数同学可能会忍不住复制粘贴，如下：

```diff
@@ -5,6 +5,7 @@
 "lint:js": "eslint *.js",
+ "lint:js:fix": "eslint *.js --fix",
```

在 lint:js 命令比较短的时候复制粘贴的方法简单粗暴有效，但是当 lint:js 命令变的很长之后，难免后续会有人改了 lint:js 而忘记修改 lint:js:fix（别问我为啥，我就是踩着坑过来的），更健壮的做法是，在运行 npm script 时给定额外的参数，代码修改如下：

```diff
@@ -5,6 +5,7 @@
 "lint:js": "eslint *.js",
+ "lint:js:fix": "npm run lint:js -- --fix",
```

要格外注意 --fix 参数前面的 -- 分隔符，意指要给 npm run lint:js 实际指向的命令传递额外的参数。

---

 注释

```swift
"test": "# 运行所有代码检查和单元测试 . npm-run-all --parallel lint:* mocha"
```

或者在单独的文件中可以自由给它添加注释

---

 日志

```dockerfile
npm run test --loglevel silent
npm run test --slient
npm run test -s
```

这个日志级别，只有命令本身的输出，读起来非常的简洁

```dockerfile
npm run test --loglevel verbose
npm run test --verbose
npm run test -d
```

这个日志级别，详细打印出了每个步骤的参数、返回值

---

 执行顺序

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

如果是并行执行（即同时的平行执行），可以使用&符号。

```routeros
npm run script1.js & npm run script2.js
```

如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。

```routeros
npm run script1.js && npm run script2.js
```

这两个符号是 Bash 的功能。此外，还可以使用 node 的任务管理模块：`npm-run-all`、`script-runner`

```awk
// 串行
{
- "test": "npm run lint:js && npm run lint:css && npm run lint:json && npm run lint:markdown"
+ "test": "npm-run-all lint:js lint:css lint:json lint:markdown"
 },
// 并行 --parallel
{
- "test": "npm-run-all lint:*"
+ "test": "npm-run-all --parallel lint:* mocha"
}
```

---

 默认值

一般来说，npm 脚本由用户提供。但是，npm 对两个脚本提供了默认值。也就是说，这两个脚本不用定义，就可以直接使用。

```1c

"start": "node server.js"，
"install": "node-gyp rebuild"
```

上面代码中，npm run start的默认值是node server.js，前提是项目根目录下有server.js这个脚本；npm run install的默认值是node-gyp rebuild，前提是项目根目录下有binding.gyp文件。

---

 钩子

npm 脚本有pre和post两个钩子。举例来说，build脚本命令的钩子就是prebuild和postbuild。

```smalltalk
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```

用户执行npm run build的时候，会自动按照下面的顺序执行。

npm run prebuild && npm run build && npm run postbuild 因此，可以在这两个钩子里面，完成一些准备工作和清理工作。下面是一个例子。

```json

"clean": "rimraf ./dist && mkdir dist",
"prebuild": "npm run clean",
"build": "cross-env NODE_ENV=production webpack"
```

npm 默认提供下面这些钩子。

```
prepublish，postpublish
preinstall，postinstall
preuninstall，postuninstall
preversion，postversion
pretest，posttest
prestop，poststop
prestart，poststart
prerestart，postrestart
```

自定义的脚本命令也可以加上pre和post钩子。比如，myscript这个脚本命令，也有premyscript和postmyscript钩子。不过，双重的pre和post无效，比如prepretest和postposttest是无效的。

npm 提供一个npm\_lifecycle\_event变量，返回当前正在运行的脚本名称，比如pretest、test、posttest等等。所以，可以利用这个变量，在同一个脚本文件里面，为不同的npm scripts命令编写代码。请看下面的例子。

```arcade
const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'test') {
 console.log(`Running the test task!`);
}

if (TARGET === 'pretest') {
 console.log(`Running the pretest task!`);
}

if (TARGET === 'posttest') {
 console.log(`Running the posttest task!`);
}
```

注意，prepublish这个钩子不仅会在npm publish命令之前运行，还会在npm install（不带任何参数）命令之前运行。这种行为很容易让用户感到困惑，所以 npm 4 引入了一个新的钩子prepare，行为等同于prepublish，而从 npm 5 开始，prepublish将只在npm publish命令之前运行。

---

 简写形式

四个常用的 npm 脚本有简写形式。

```routeros
npm start是npm run start
npm stop是npm run stop的简写
npm test是npm run test的简写
npm restart是npm run stop && npm run restart && npm run start的简写
```

npm start、npm stop和npm restart都比较好理解，而npm restart是一个复合命令，实际上会执行三个脚本命令：stop、restart、start。具体的执行顺序如下。

```crmsh
prerestart
prestop
stop
poststop
restart
prestart
start
poststart
postrestart
```

---

 变量

npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。

运行 `npm run env`能拿到完整的变量列表

使用`npm run env | grep npm_package | sort` 拿到部分排序后的环境变量

通过npm\_package\_前缀，npm 脚本可以拿到package.json里面的字段。比如，下面是一个package.json。

```json
{
 "name": "foo",
 "version": "1.2.5",
 "config" : { "port" : "8080" },
 "scripts" : { "start" : "node server.js" }
}
```

那么，变量npm\_package\_name返回foo，变量npm\_package\_version返回1.2.5。

```arcade
// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```

上面代码中，我们通过环境变量process.env对象，拿到package.json的字段值。如果是 Bash 脚本，可以用`$npm_package_name`和`$npm_package_version`取到这两个值。

`$npm_package_scripts_start`

---

 结合 npm script 和 git-hooks

Git 在代码版本管理之外，也提供了类似 npm script 里 pre、post 的钩子机制，叫做 Git Hooks，钩子机制能让我们在代码 commit、push 之前（后）做自己想做的事情。

前端社区里有多种结合 npm script 和 git-hooks 的方案，比如 `pre-commit`、`husky`，相比较而言 husky 更好用，它支持更多的 Git Hooks 种类，再结合 `lint-staged` 使用就更好了。

[了解更多](https://juejin.cn/post/6844903479283040269)

---

 常用脚本示例

```awk
// 删除目录
"clean": "rimraf dist/*",

// 本地搭建一个 HTTP 服务
"serve": "http-server -p 9090 dist/",

// 打开浏览器
"open:dev": "opener http://localhost:9090",

// 实时刷新
 "livereload": "live-reload --port 9091 dist/",

// 构建 HTML 文件
"build:html": "jade index.jade > dist/index.html",

// 只要 CSS 文件有变动，就重新执行构建
"watch:css": "watch 'npm run build:css' assets/styles/",

// 只要 HTML 文件有变动，就重新执行构建
"watch:html": "watch 'npm run build:html' assets/html",

// 部署到 Amazon S3
"deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",

// 构建 favicon
"build:favicon": "node scripts/favicon.js",
```
