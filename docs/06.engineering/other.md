# 杂项

## seo {#p0-seo}

深度 SEO 优化涉及到一些技术层面的优化策略，以下是一些常见的方式：

1. 网站结构优化：优化网站的结构，确保每个页面都可以被搜索引擎爬取和索引。使用合适的 HTML 标签和语义化的内容结构，使搜索引擎能够更好地理解页面的内容。

2. 网站速度优化：提升网站的加载速度对 SEO 很重要。通过压缩和合并 CSS 和 JavaScript 文件、优化图像、使用浏览器缓存、使用 CDN（内容分发网络）等技术手段来减少页面加载时间。

3. 页面渲染优化：确保搜索引擎可以正常渲染和索引使用 JavaScript 技术构建的单页面应用（SPA）或动态生成的内容。使用服务端渲染（SSR）或预渲染技术，确保搜索引擎能够获取到完整的页面内容。

4. URL 优化：使用短、描述性的 URL，并使用关键词来优化 URL 结构。避免使用动态参数或过长的 URL。

5. 链接优化：内部链接和外部链接都对 SEO 有影响。在网站内部设置相关性强的链接，使页面之间相互连接。外部链接是获取更多外部网站链接指向自己网站的重要手段，可以通过内容创作和社交媒体推广来获得更多高质量的外部链接。

6. Schema 标记：使用结构化数据标记（Schema Markup）来标识网页内容，帮助搜索引擎更好地理解和展示网页信息。可以使用 JSON-LD、Microdata 或 RDFa 等标记格式。

7. XML 网站地图：创建和提交 XML 网站地图，提供网站的结构和页面信息，帮助搜索引擎更好地索引网站内容。

8. Robots.txt 文件：通过 Robots.txt 文件来指示搜索引擎哪些页面可以被爬取和索引，哪些页面不可访问。

9. HTTPS 加密：使用 HTTPS 协议来加密网站通信，确保数据安全和用户隐私，同时搜索引擎更倾向于收录和排名使用 HTTPS 的网站。

10. 移动友好性：优化网站在移动设备上的显示和用户体验，确保网站具备响应式设计或移动版网站，以及快速加载和友好的操作性。

这些是深度 SEO 优化的一些常见技术层面的策略，通过综合运用这些策略，可以提升网站的搜索引擎可见性和排名。需要根据具体情况和搜索引擎的最佳

## eslint 该如何配置 {#p2-eslint-config}

在前端项目中，配置 ESLint 可以帮助你保持代码风格的一致性和提高代码质量。以下是配置 ESLint 的一般步骤：

**一、安装 ESLint**

1. 首先，确保你已经安装了 Node.js 和 npm（或 yarn）。
2. 在项目目录中，使用以下命令安装 ESLint：

* 使用 npm：`npm install eslint --save-dev`
* 使用 yarn：`yarn add eslint --dev`

**二、初始化 ESLint 配置**

1. 在项目根目录下，运行以下命令来初始化 ESLint 配置：

* `npx eslint --init`

 这个命令会引导你通过一系列问题来生成一个基本的 ESLint 配置文件。你可以根据项目的需求选择不同的选项，例如：

* 选择编程语言（JavaScript、TypeScript 等）。
* 选择代码运行的环境（浏览器、Node.js 等）。
* 选择风格指南（例如，Airbnb、Standard 等）。

2. 回答完问题后，ESLint 会在项目根目录下生成一个`.eslintrc.*`文件（可能是`.eslintrc.js`、`.eslintrc.json`或`.eslintrc.yaml`等，具体取决于你的选择）。

**三、配置文件选项详解**

1. **解析器（Parser）**：

* 根据你使用的编程语言，可能需要指定一个解析器。例如，对于 TypeScript 项目，你可以使用`@typescript-eslint/parser`。
* 在`.eslintrc.*`文件中，可以这样配置：

 ```js
 module.exports = {
   parser: '@typescript-eslint/parser'
 }
 ```

2. **插件（Plugins）**：

* ESLint 插件可以提供额外的规则和功能。例如，`@typescript-eslint/eslint-plugin`是用于 TypeScript 的插件。
* 配置插件如下：

 ```js
 module.exports = {
   plugins: ['@typescript-eslint']
 }
 ```

3. **规则（Rules）**：

* 规则用于定义代码的风格和质量要求。每个规则都有一个可配置的选项，可以设置为`off`（关闭规则）、`warn`（警告）或`error`（错误）。
* 例如，以下配置禁止使用未声明的变量，并要求使用分号：

 ```js
 module.exports = {
   rules: {
     'no-undef': 'error',
     semi: ['error', 'always']
   }
 }
 ```

4. **环境（Environments）**：

* 指定代码运行的环境，以便 ESLint 可以正确地识别全局变量和内置模块。
* 例如，如果你的代码在浏览器中运行，可以配置`browser`环境：

 ```js
 module.exports = {
   env: {
     browser: true
   }
 }
 ```

**四、在项目中使用 ESLint**

1. **命令行使用**：

* 可以在命令行中使用`eslint`命令来检查项目中的文件。例如：
* `npx eslint.`将检查当前目录下的所有文件。

2. **集成到编辑器**：

* 许多代码编辑器都有 ESLint 插件，可以在编辑代码时实时显示错误和警告。
* 配置编辑器的 ESLint 插件，使其使用项目中的`.eslintrc.*`文件进行代码检查。

3. **集成到构建工具**：

* 可以将 ESLint 集成到构建工具（如 Webpack、Gulp 等）中，以便在构建过程中自动检查代码。
* 例如，对于 Webpack，可以使用`eslint-webpack-plugin`插件来集成 ESLint。

## eslint 有哪些实用的插件， 该如何配置 {#p2-eslint-plugin}

ESLint 有很多实用的插件，可以帮助提高代码质量和开发效率。以下是一些常见的 ESLint 插件及配置方法：

**一、常见插件介绍**

1. `eslint-plugin-import`：

* 作用：用于检查和规范导入语句。可以确保导入路径的正确性、防止重复导入、检查导入顺序等。
* 例如，它可以检测未使用的导入、循环导入等问题，并给出相应的错误提示。

2. `eslint-plugin-vue`：

* 作用：专门为 Vue.js 项目设计的插件。可以检查 Vue 单文件组件（`.vue`文件）中的模板、脚本和样式部分的代码规范。
* 例如，它可以检测模板中的错误使用的指令、脚本中的未定义变量等问题。

3. `eslint-plugin-prettier`：

* 作用：将 Prettier 的代码格式化规则集成到 ESLint 中，确保代码在风格上的一致性。
* 例如，它可以自动修复代码的缩进、空格、换行等格式问题，使代码更加美观易读。

4. `eslint-plugin-jsx-a11y`：

* 作用：用于检查 React 和 Vue 等框架中的 JSX 代码的可访问性问题。
* 例如，它可以检测图像是否缺少替代文本、表单元素是否有正确的标签等问题，以提高应用的可访问性。

**二、配置方法**

1. 安装插件：

* 使用 npm 或 yarn 安装所需的插件。例如，安装`eslint-plugin-import`插件：

 ```bash
 npm install eslint-plugin-import --save-dev
 ```

* 或者使用 yarn：

 ```bash
 yarn add eslint-plugin-import --dev
 ```

2. 创建`.eslintrc`文件：

* 在项目根目录下创建一个`.eslintrc`文件，用于配置 ESLint。

3. 配置插件：

* 在`.eslintrc`文件中，添加插件的名称到`plugins`数组中，并在`rules`对象中配置相应的规则。
* 例如，配置`eslint-plugin-import`插件：

 ```json
 {
 "plugins": ["import"],
 "rules": {
 "import/no-unresolved": "error",
 "import/order": [
 "error",
 {
 "groups": ["builtin", "external", "internal"],
 "pathGroups": [
 {
 "pattern": "vue",
 "group": "external",
 "position": "before"
 }
 ],
 "pathGroupsExcludedImportTypes": [],
 "alphabetize": {
 "order": "asc",
 "caseInsensitive": true
 }
 }
 ]
 }
 }
 ```

* 上述配置中，`plugins`数组中添加了`import`插件，`rules`对象中配置了两个规则：`import/no-unresolved`用于检查导入的模块是否存在，`import/order`用于规范导入的顺序。

4. 集成到开发流程中：

* 根据你的开发环境和工具，将 ESLint 集成到你的开发流程中。例如，在 VS Code 中，可以安装 ESLint 扩展，并在设置中配置自动修复和实时检查。

## slint 如何集成到 webpack {#p2-eslint-webpack}

要将 ESLint 集成到 Webpack 中，可以按照以下步骤进行操作：

**一、安装必要的包**

1. 确保已经安装了 Webpack 和 ESLint。如果还没有安装，可以使用以下命令进行安装：

* 使用 npm：

 ```
 npm install webpack webpack-cli eslint --save-dev
 ```

* 使用 yarn：

 ```
 yarn add webpack webpack-cli eslint --dev
 ```

2. 安装`eslint-webpack-plugin`插件，这个插件可以将 ESLint 集成到 Webpack 构建过程中。

* 使用 npm：

 ```
 npm install eslint-webpack-plugin --save-dev
 ```

* 使用 yarn：

 ```
 yarn add eslint-webpack-plugin --dev
 ```

**二、配置 ESLint**

1. 在项目根目录下，运行`eslint --init`命令来初始化 ESLint 配置。按照提示选择适合项目的选项，生成`.eslintrc.*`配置文件。

2. 根据项目需求，调整 ESLint 配置文件中的规则、解析器、插件等选项。

**三、配置 Webpack**

1. 在 Webpack 配置文件（通常是`webpack.config.js`）中，引入`eslint-webpack-plugin`插件：

 ```js
 const ESLintPlugin = require('eslint-webpack-plugin')
 ```

2. 在 Webpack 配置对象的`plugins`数组中添加`ESLintPlugin`实例：

 ```js
 module.exports = {
 // ...其他配置项
   plugins: [
     new ESLintPlugin({
       // 可以在这里配置 ESLintPlugin 的选项，例如指定要检查的文件路径
       files: ['./src/**/*.js']
     })
   ]
 }
 ```

**四、运行 Webpack 构建**

当运行 Webpack 构建时，`eslint-webpack-plugin`会在构建过程中自动运行 ESLint 检查。如果有不符合 ESLint 规则的代码，会在控制台输出错误信息。

## 如何定制化开发一个 eslint 插件， 功能是实现提示检验某一个项目里面的字符串error {#p2-eslint-plugin}

**一、创建插件项目**

1. 创建一个新的目录来存放插件项目，例如`eslint-plugin-custom-string-check`。
2. 在该目录下，运行`npm init`初始化一个 npm 项目。

**二、插件结构**

1. 在项目目录下创建一个`index.js`文件作为插件的入口文件。

2. 定义插件对象：

```js
module.exports = {
  rules: {}
}
```

**三、实现规则**

1. 定义规则函数，接收一个参数`options`，这个参数可以包含你要检测的字符串。

```js
module.exports = {
  rules: {
    'check-custom-string': (context, options) => {
      return {
        Program (node) {
          const sourceCode = context.getSourceCode()
          const text = sourceCode.getText()
          const targetString = options && options.stringToCheck ? options.stringToCheck : null
          if (targetString && text.includes(targetString)) {
            context.report({
              node,
              message: `Found custom string "${targetString}".`
            })
          }
        }
      }
    }
  }
}
```

**四、测试插件**

1. 在项目目录下创建一个`tests`目录。
2. 在`tests`目录下创建一个测试文件，例如`test.js`。

```js
const ruleTester = require("eslint").RuleTester;
const rule = require("../index").rules["check-custom-string"];

const ruleTester = new RuleTester();
ruleTester.run("check-custom-string", rule, {
 valid: [
 {
 code: 'const message = "This is a test.";',
 options: { stringToCheck: "errorMessage" },
 },
 ],
 invalid: [
 {
 code: 'const errorMessage = "This is an error.";',
 options: { stringToCheck: "errorMessage" },
 errors: [
 {
 message: 'Found custom string "errorMessage".',
 },
 ],
 },
 ],
});
```

**五、使用插件**

1. 在你的项目中安装这个插件：

```bash
npm install /path/to/your/plugin/eslint-plugin-custom-string-check --save-dev
```

2. 在项目的`.eslintrc`文件中配置插件：

```json
{
 "plugins": ["custom-string-check"],
 "rules": {
 "custom-string-check/check-custom-string": ["error", { "stringToCheck": "yourTargetString" }]
 }
}
```

## 请解释什么是 ARIA 和屏幕阅读器 (screenreaders)，以及如何使网站实现无障碍访问 (accessible)?

## Polyfill 和 shim  ？{#p1-polyfill-shim}

参考 [What is the difference between a shim and a polyfill?](https://stackoverflow.com/questions/6599815/what-is-the-difference-between-a-shim-and-a-polyfill)

## corejs 是做什么用的

## 描述 seo 的最佳实践或你最近使用的技术

## 什么是 FOUC (无样式内容闪烁)？你如何来避免 FOUC？

## 请谈谈你对网页标准和标准制定机构重要性的理解?

## 日志监控：如何还原用户操作流程 {#debug}

一种手段来获取用户某一时段连续的操作行为，也就是录制用户行为，包括整个会话中的每一个点击、滑动、输入等行为，同时支持回放录制的操作行为，完整且真实地重现用户行为以帮助我们回溯或分析某些使用场景。

 实现方式

**方案对比**

| 对比内容 | 视频录制 | 页面截图 | Dom 快照录制 |
| ---------- | -------------------- | ------------------------ | ------------------------- |
| 开源库 | WebRTC 原生支持 | html2canvas | rrweb |
| 用户感知 | 录制有感 | 录制无感 | 录制无感 |
| 产物大小 | 大 | 大 | 相对较小 |
| 兼容性 | 详见相关 API 兼容性 | 部分场景内容截图无法显示 | 兼容性相对较好 |
| 信息安全 | 无法脱敏 | 无法脱敏 | 可以脱敏 |
| 可操作性 | 弱 | 弱 | 强（支持数据脱敏/加密等） |
| 回放清晰度 | 录制时决定，有损录制 | 录制时决定，有损录制 | 高保真 |

 实操

 视频录制

录制用户行为最容易想到的就是将屏幕操作通过视频的方式录制下来，目前浏览器本身已经提供了一套基于音视轨的实时数据流传输方案 [WebRTC](https://developer.mozilla.org/zh-CN/docs/Web/API/WebRTC_API)（Web Real-Time Communications），在我们的录屏使用场景主要关注以下几个 API：

* [getDisplayMedia()](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaDevices/getUserMedia) - 提示用户给予使用媒体输入的许可从而获取屏幕的流；
* [MediaRecorder()](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaRecorder/MediaRecorder) - 生成对指定的媒体流进行录制的 MediaRecorder 对象；
* [ondataavailable](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaRecorder/dataavailable_event) - 当 MediaRecorder 将媒体数据传递到应用程序以供使用时将触发该事件；

整体录制流程如下：

1. 调用`mediaDevices.getDisplayMedia()`由用户授权选择屏幕进行录制，获取到数据流；
2. 生成一个`new MediaRecorder()`对象录制获取的屏幕的数据流；
3. 在 MediaRecorder 对象上设置`ondataavailable`监听事件用于获取录制的 Blob 数据。

```html
<template>
 <video ref="playerRef"></video>
 <button @click="handleStart">开启录制</button>
 <button @click="handlePause">暂停录制</button>
 <button @click="handleResume">继续录制</button>
 <button @click="handleStop">结束录制</button>
 <button @click="handleReplay">播放录制</button>
 <button @click="handleReset">重置内容</button>
</template>

<script lang="ts" setup>
 import { ref, reactive } from "vue";

 const playerRef = ref();
 const state = reactive({
 mediaRecorder: null as null | MediaRecorder,
 blobs: [] as Blob[],
 });

 // 开始录制
 const handleStart = async () => {
 const stream = await navigator.mediaDevices.getDisplayMedia();
 state.mediaRecorder = new MediaRecorder(stream, {
 mimeType: "video/webm",
 });
 state.mediaRecorder.addEventListener("dataavailable", (e: BlobEvent) => {
 state.blobs.push(e.data);
 });
 state.mediaRecorder?.start();
 };
 // canvas录制(特殊处理)
 const handleCanvasRecord = () => {
 const stream = canvas.captureStream(60); // 60 FPS recording
 const recorder = new MediaRecorder(stream, {
 mimeType: "video/webm;codecs=vp9",
 });
 recorder.ondataavailable = (e) => {
 state.blobs.push(e.data);
 };
 };
 // 暂停录制
 const handlePause = () => {
 state.mediaRecorder?.pause();
 };
 // 继续录制
 const handleResume = () => {
 state.mediaRecorder?.resume();
 };
 // 停止录制
 const handleStop = () => {
 state.mediaRecorder?.stop();
 };
 // 播放录制
 const handleReplay = () => {
 if (state.blobs.length === 0 || !playerRef.value) return;
 const blob = new Blob(state.blobs, { type: "video/webm" });
 playerRef.value.src = URL.createObjectURL(blob);
 playerRef.value.play();
 };

 const handleReset = () => {
 state.blobs = [];
 state.mediaRecorder = null;
 playerRef.value.src = null;
 };
 const handleDownload = () => {
 if (state.blobs.length === 0) return;
 const blob = new Blob(state.blobs, { type: "video/webm" });
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a");
 a.href = url;
 a.style.display = "none";
 a.download = "record.webm";
 a.click();
 };
</script>
```

![Untitled 1.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7c4204442dc649d8af7027d85652bbcd~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=3582&h=2118&s=1544515&e=png&b=fcfcfc)

 页面截图

众所周知，视频是由一帧帧的画面组合而成的，因此我们可以按照一定时间间隔来截图的方式保存当前页面快照，然后将快照按照相同的截取速度播放形成视频就能实现用户行为录制了。最常用的截图方法就是以 [html2canvas](https://www.npmjs.com/package/html2canvas) 库为代表的 canvas 截图，我们在使用过程中也发现了较多问题：

1. canvas 截图有较多局限之处，例如无法绘制动画、样式错位、[不支持部分 CSS 样式](https://html2canvas.hertzen.com/features)等；
2. 截图性能开销较大，可能会导致掉帧，例如我们在尝试中 css 动画有非常明显的卡顿等；
3. 截图资源体积大，我们尝试中截图时单张图片体积为 200k 左右，以 24 帧来算一分钟录制的图片体积将近 300MB，对带宽和资源存储都是浪费；
4. 在需要忽略的元素上增加 data-html2canvas-ignore 属性或者设置 ignoreElements 属性删除特定元素可以对某些特定数据或内容进行脱敏，但会直接删除元素无法做到“有占位但无内容”效果，影响页面布局。

```html
代码解读<template>
 <el-button @click="handleStart">开启录制</el-button>
 <el-button @click="handleStop">停止录制</el-button>
 <el-button @click="handleReplay">播放录制</el-button>
 <img :src="state.imgs[state.num ?? 0]" />
</template>

<script lang="ts" setup>
 import { reactive } from "vue";
 import html2canvas from "html2canvas";

 const state = reactive({
 visible: false,
 imgs: [] as string[],
 num: 0,
 recordInterval: null as any,
 replayInterval: null as any,
 });

 const FPS = 30;
 const interval = 1000 / FPS;
 const handleStart = async () => {
 handleReset();
 state.recordInterval = setInterval(() => {
 if (state.imgs.length > 100) {
 handleStop();
 return;
 }
 html2canvas(document.body).then((canvas: any) => {
 const img = canvas.toDataURL();
 state.imgs.push(img);
 });
 }, interval);
 };

 const handleStop = () => {
 state.recordInterval && clearInterval(state.recordInterval);
 };

 const handleReplay = async () => {
 state.recordInterval && clearInterval(state.recordInterval);
 state.num = 0;
 state.visible = true;
 state.replayInterval = setInterval(() => {
 if (state.num >= state.imgs.length - 1) {
 clearInterval(state.replayInterval);
 return;
 }
 state.num++;
 }, interval);
 };

 const handleReset = () => {
 state.imgs = [];
 state.recordInterval = null;
 state.replayInterval = null;
 state.num = 0;
 };
</script>
```

 Dom 快照录制

> 💡 **Dom 快照录制 - rrweb 库** 是目前最为流行的解决方案，一些商业化平台解决方案也都主要基于 rrweb 库来进行录制与回放的功能开发。

rrweb 主要由 3 部分组成：

1. [rrweb-snapshot](https://github.com/rrweb-io/rrweb/tree/master/packages/rrweb-snapshot/)，包含 snapshot 和 rebuild 两部分，snapshot 用于将 DOM 及其状态转化为可序列化的数据结构并添加唯一标识，rebuild 是将 snapshot 记录的数据结构重建为对应 DOM。
2. [rrweb](https://github.com/rrweb-io/rrweb)，包含 record 和 replay 两个功能，record 用于记录 DOM 中的所有变更，replay 则是将记录的变更按照对应的时间一一重放。
3. [rrweb-player](https://github.com/rrweb-io/rrweb/tree/master/packages/rrweb-player/)，为 rrweb 提供一套 UI 控件，提供基于 GUI 的暂停、快进、拖拽至任意时间点播放等功能。

![Untitled 4.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c837f24b84d444db31b8941d2df4021~tplv-k3u1fbpfcp-jj-mark:3024:0:0:0:q75.awebp#?w=1822&h=602&s=18559&e=png&a=1&b=fdf2f2)

**分别设计到了【录制】和【回访】两个场景**

细节可以参考官网文档即可

 参考文档

[资料](https://juejin.cn/post/7280429214607769658)

## source map 可有办法将请求的调用源码地址包括代码行数也上报上去 {#p1-source-map}

在使用了代码混淆（例如 Webpack 的 mina-hash、chunkhash 或 contenthash）的前端代码中，即使执行了混淆，依然可以通过以下方法在日志监控时提供足够的上下文信息，主要包括被请求的源代码地址以及代码行数：

 源码映射(Source Maps)

1. **生成 Source Maps:**
 在构建过程中生成功能强大的源码映射（Source Maps）文件是标准做法。Source Maps 主要用于将混淆、压缩后的 JavaScript 代码映射回到其原始版本，允许在浏览器调试工具中查看原始代码和追踪错误。

* **保存映射文件:** 在生产版本中生成如`.map`的 Source Map 文件，并确保它们正常处理（通常是将它们放置在服务器上的一个公开但安全的位置）。
* **反映在 Source Maps 中的映射:** Source Maps 文件应将原始的源文件路径和行号映射到构建后的代码中对应的位置。

2. **错误跟踪系统集成:**
 使用错误跟踪工具（也常被称为 Error Monitoring 平台, 如 Sentry、LogRocket、Bugsnag 等），这些工具通常兼容并支持 Source Maps:

* **自动和源码追踪:**
 漏洞和崩溃报告将自动包含被未混淆的源码引用，您只需确保生产版本的 Source Maps 配置正确。

* **代码行号报告:**
 用户报告的堆栈跟踪信息将包括对应底层源文件，而非混淆后的行号。

 自定义错误日志逻辑

1. **覆盖全局的错误处理器：**
 对于更高级的错误追踪，你可能需要在前端代码中维护自定义的错误处理逻辑。

* **使用`.Window.onerror`或`try...catch`:**
 在`Window.onerror`中捕捉到运行时错误时，或者在自定义函数内`try...catch`捕获的错误，你可以从错误的堆栈跟踪中提取当前运行代码的位置，并尝试将符号化的堆栈信息发送到后端服务器。

2. **在后端查阅符号化堆栈:**
 为了安全和性能的考虑，源码映射通常不包括在客户端的部署中。因此固体堆栈信息需要在服务器端符号化，这是针对转换后的堆栈轨迹进行处理，将反向转换为源代码行。

 注意

* 确保 Source Maps 不公开到客户端以避免潜在的安全风险。应该将它们存放于受控的服务器环境，以避免源码泄露或不当使用。
* 以上方案更适合于开发或测试环境提供详细调试信息，确保在最终部署产品之前只公开给授权的人员。

## 如何做国际化？ {#i18}

前端应用实现国际化（i18n）主要是为了支持多语言环境，提高用户体验。这里有几种常用的方案：

1. **使用国际化库**：这是最常用的方法之一，可以通过引用第三方库来管理不同语言环境的资源文件。比如：

* **React**：可以使用`react-intl`或`react-i18next`。
* **Vue**：可以使用`vue-i18n`。
* **Angular**：可以使用`@ngx-translate/core`。

 这些库允许你将文本资源分开管理，并根据用户的语言偏好动态加载相应的资源。

2. **浏览器 API**：利用浏览器内置的国际化 API，如`Intl`对象，来格式化日期、时间、货币等。

3. **自建国际化框架**：根据项目的具体需求，自定义国际化实现。这通常包括：

* 创建资源文件：为每种语言创建一个资源文件，用于存储翻译字符串。
* 语言选择功能：允许用户选择偏好的语言。
* 加载对应资源文件：根据用户的语言偏好，动态加载对应的资源文件并在界面上显示相应的文本。

4. **服务端支持**：有些情况下，前端应用可能需要服务端的支持来实现国际化，如动态提供不同语言的数据内容。

5. **URL 路由**：在 URL 中包含语言参数，来确定显示哪种语言的内容。例如，`/en/about` 显示英文版“关于”页面，而 `/zh/about` 显示中文版。

6. **浏览器语言检测**：通过检测浏览器的`navigator.language`属性来自动选择最合适的语言版本。

在实际应用中，根据项目的大小、复杂度以及特定需求，可以选择一种或多种方案结合使用，以达到最佳的国际化效果。

## 站点如何防止爬虫？ {#robot}

站点防止爬虫通常涉及一系列技术和策略的组合。以下是一些常用的方法：

 1. 修改 `robots.txt`

在站点的根目录下创建或修改 `robots.txt` 文件，用来告知遵守该协议的爬虫应该爬取哪些页面，哪些不应该爬取。例如：

```txt
User-agent: *
Disallow: /
```

然而，需要注意的是遵守 `robots.txt` 不是强制性的，恶意爬虫可以忽视这些规则。

 2. 使用 CAPTCHA

对于表单提交、登录页面等，使用验证码（CAPTCHA）可以防止自动化脚本或机器人执行操作。

 3. 检查用户代理字符串

服务器可以根据请求的用户代理（User-Agent）字符串来决定是否屏蔽某些爬虫。但用户代理字符串可以伪造，所以这不是一个完全可靠的方法。

 4. 分析流量行为

分析访问者的行为，比如访问频率、访问页数、访问时长，并与正常用户的行为进行对比，从而尝试检测和屏蔽爬虫。

 5. 使用 Web 应用防火墙（WAF）

许多 Web 应用防火墙提供自动化的爬虫和机器人检测功能，可以帮助防止爬虫。

 6. 服务端渲染和动态 Token

一些网站使用 JavaScript 服务端渲染，或将关键内容（比如令牌）动态地插入到页面中，这可以使得非浏览器的自动化工具获取网站内容变得更加困难。

 7. 添加额外的 HTTP 头

一些站点要求每个请求都包括特定的 HTTP 头，这些头信息不是常规爬虫会添加的，而是通过 JavaScript 动态添加的。

 8. IP 黑名单

如果探测到某个 IP 地址的不正常行为，就可以将该 IP 地址加入黑名单，阻止其进一步的访问。

 9. 限制访问速度

通过限制特定时间内允许的请求次数来禁止爬虫执行大量快速的页面抓取。

 10. API 限流

对 API 使用率进行限制，比如基于用户、IP 地址等实施限速和配额。

 11. 使用 HTTPS

使用 HTTPS 加密您的网站，这可以避免中间人攻击，并增加爬虫的抓取难度。

 12. 更改网站结构和内容

定期更改网站的 URL 结构、内容排版等，使得爬虫开发人员需要不断更新爬虫程序来跟进网站的改动。

详见 [robot](https://datatracker.ietf.org/doc/rfc9309/)

## SemVer（Semantic Versioning） {#p0-semver}

Semantic Versioning（语义化版本）是一种为软件组件定义版本号的规范。它使用`“major.minor.patch”`的格式来表示版本号。其中：

* Major（主版本号）：当你做了不兼容的 API 修改时，你需要更新主版本号。
* Minor（次版本号）：当你做了向下兼容的功能性新增时，你需要更新次版本号。
* Patch（修订号）：当你做了向下兼容的问题修正时，你需要更新修订号。

Semantic Versioning 的目的是为了让软件版本号的变化具有可读性和可预测性，这样用户就可以通过版本号来了解软件包的更新内容和影响。

**版本更新**

在升级版本时，常常使用一些符号来指定允许升级的范围，其中包括 ^ 和 ~ 等。

* ^ 表示向后兼容地升级版本号，只允许升级到次版本号或修订版本号，不允许升级到主版本号。
* ~ 表示只允许升级到修订版本号，不允许升级到次版本号或主版本号。

例如，对于版本号为 1.2.3：

* ^1.2.3 允许升级到 1.2.4、1.3.0 等修订号或次版号的版本，但不允许升级到 2.0.0。
* ~1.2.3 只允许升级到 1.2.4、1.2.5 等修订版本号的版本，但不允许升级到 1.3.0、2.0.0 等更高的版本。

## 如何在前端团队快速落地代码规范 {#p0-rule}

* [资料](https://juejin.cn/post/7033210664844066853)
* [资料](https://juejin.cn/post/7007419705543622669)
* [资料](https://juejin.cn/post/7167707693333872647)
* [资料](https://juejin.cn/post/6844904142289240071)
