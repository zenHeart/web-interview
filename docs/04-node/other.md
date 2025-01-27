
# 杂项

## 单线程的 nodejs 是如何充分利用计算机 CPU 资源的呢？

虽然 Node.js 是单线程的，但是它能够充分利用计算机的 CPU 资源的原因在于其采用了事件驱动和异步 I/O 的方式来处理请求，而不是采用阻塞式 I/O 的方式。这使得 Node.js 能够在处理一个请求时不会因为等待 I/O 操作而阻塞，从而可以处理更多的请求。

具体来说，当 Node.js 启动一个程序时，会创建一个事件循环，不断地从事件队列中取出一个事件，然后调用相应的回调函数来处理该事件。当有新的请求到来时，Node.js 会将其添加到事件队列中，等待事件循环处理。同时，Node.js 还采用了非阻塞式 I/O 的方式，即在等待 I/O 操作时不会阻塞其他代码的执行，从而能够更好地利用 CPU 资源。

此外，Node.js 还采用了基于事件的回调机制来处理异步请求，这种机制可以避免线程切换和上下文切换带来的开销，提高 CPU 利用率。因此，虽然 Node.js 是单线程的，但是它能够充分利用计算机 CPU 资源，处理更多的请求。

## 如何使用 node 做一个全局命令行工具 {#p2-node-cli}

**一、创建项目结构**

1. 创建一个新的文件夹作为项目目录，例如`my-cli-tool`。
2. 在项目目录中，初始化一个新的 Node.js 项目，可以使用`npm init`或`yarn init`命令，根据提示填写项目的基本信息。

**二、安装必要的模块**

1. 安装`commander`模块，这是一个用于构建命令行界面的流行工具。

* 使用 npm：`npm install commander --save`
* 使用 yarn：`yarn add commander`

**三、编写命令行工具代码**

1. 创建一个主入口文件，例如`index.js`。
2. 在入口文件中，引入`commander`模块并进行配置：

 ```javascript
 const program = require('commander')
 
 program
   .version('1.0.0')
   .description('My awesome CLI tool')
   .option('-n, --name <value>', 'Your name')
   .action((options) => {
     console.log(`Hello, ${options.name || 'World'}!`)
   })
 
 program.parse(process.argv)
 ```

 在这个例子中，我们创建了一个命令行工具，它接受一个`--name`选项，并在执行时打印出问候语。

**四、设置全局安装**

1. 在项目的`package.json`文件中，添加一个`bin`字段，指定命令行工具的入口文件：

 ```json
 {
 "name": "my-cli-tool",
 "version": "1.0.0",
 "description": "My awesome CLI tool",
 "main": "index.js",
 "bin": {
 "my-tool": "./index.js"
 },
 "dependencies": {
 "commander": "^9.4.0"
 }
 }
 ```

 这里将命令行工具的名称设置为`my-tool`，对应的入口文件是`index.js`。

2. 使用`npm link`或`yarn link`命令将项目链接到全局环境中。这将使你的命令行工具在系统中可用。

* 使用 npm：`npm link`
* 使用 yarn：`yarn link`

**五、测试命令行工具**

1. 打开终端，输入`my-tool --name John`，如果一切正常，应该会看到输出`Hello, John!`。

## node 如何处理循环依赖 {#p2-node-circular-dependency}

在前端工程中，可以通过以下方法检测并避免循环依赖：

**一、检测循环依赖**

1. 手动审查代码：

* 仔细检查项目中的模块导入关系。查看每个模块的导入语句，确定是否存在一个模块被另一个模块导入，而后者又反过来导入前者的情况。
* 对于大型项目，可以使用工具辅助手动审查，如代码编辑器的搜索功能或一些专门的代码分析工具，来快速查找可能的循环依赖。

2. 使用静态分析工具：

* 有一些静态分析工具可以帮助检测循环依赖。例如，ESLint 的插件`eslint-plugin-import`可以配置规则来检测模块之间的循环依赖。
* 使用这些工具可以在开发过程中自动检测循环依赖，并给出明确的错误提示，帮助开发者及时发现和修复问题。

**二、避免循环依赖**

1. 优化模块设计：

* 重新审视项目的模块结构，确保模块之间的依赖关系清晰且单向。避免设计出相互依赖的模块结构。
* 例如，如果模块 A 和模块 B 相互依赖，可以考虑将它们共同依赖的部分提取出来，创建一个新的模块 C，然后让 A 和 B 分别依赖于 C，而不是直接相互依赖。

2. 采用依赖注入：

* 依赖注入是一种设计模式，可以帮助减少模块之间的直接依赖。通过将依赖项作为参数传递给函数或构造函数，可以在运行时动态地注入依赖项，而不是在模块内部直接导入它们。
* 这样可以降低模块之间的耦合度，减少循环依赖的可能性。

3. 延迟加载：

* 在某些情况下，可以使用延迟加载（lazy loading）来避免循环依赖。延迟加载是指在实际需要的时候才加载模块，而不是在应用程序启动时就加载所有模块。
* 例如，可以使用动态导入（dynamic import）来实现延迟加载。这样可以避免在模块加载时立即出现循环依赖的问题，因为模块只有在需要的时候才会被加载。

4. 建立清晰的模块边界：

* 每个模块应该有明确的职责和功能范围。避免模块之间的职责重叠，这样可以减少模块之间的相互依赖。
* 同时，尽量保持模块的独立性，使得模块可以独立开发、测试和维护。

## 实现一个命令行工具， 统计输入目录下面指定代码的行数 {#p0-node-cli}

要实现一个命令行工具来统计输入目录下指定代码的行数，你可以使用Node.js的`fs`模块来读取文件内容并进行行数统计。以下是一个简单的实现示例：

```javascript
const fs = require('fs')
const path = require('path')

function countLinesInDirectory (dirPath, fileExtension) {
  let totalLines = 0

  function countLinesInFile (filePath) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.split('\n')
    totalLines += lines.length
  }

  function processDirectory (directoryPath) {
    const files = fs.readdirSync(directoryPath)

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file)
      const stats = fs.statSync(filePath)

      if (stats.isFile() && path.extname(file) === fileExtension) {
        countLinesInFile(filePath)
      } else if (stats.isDirectory()) {
        processDirectory(filePath)
      }
    })
  }

  processDirectory(dirPath)

  return totalLines
}

// 命令行参数，第一个参数是目录路径，第二个参数是文件扩展名
const [_, __, dirPath, fileExtension] = process.argv

const linesCount = countLinesInDirectory(dirPath, fileExtension)
console.log(`Total lines of ${fileExtension} files in ${dirPath}: ${linesCount}`)
```

你可以将上述代码保存为一个JavaScript文件，比如`line-counter.js`。然后，在终端中运行以下命令：

```
node line-counter.js /path/to/directory .js
```

其中`/path/to/directory`是你要统计的目录路径，`.js`是你要统计的文件扩展名。运行命令后，程序将会输出指定文件类型在指定目录中的总行数。

你可以根据需要自定义输出格式、文件过滤规则等。此示例只是一个基本的实现，你可以根据具体需求进行扩展和优化。
