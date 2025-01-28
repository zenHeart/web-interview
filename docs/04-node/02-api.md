# node

## commonjs 规范

commonjs 模块引用管理规范

规范定义：
每一个文件是一个模块，有自己的作用域
在模块内部的module变量代表模块本身
module.exports属性代表模块对外接口

require规则：
/表示绝路径，./表示相对于当前文件的路径
支持js、json、node扩展名，不写就依次尝试
不写路径名就认为是build-in模块或者各级node_modules内第三方模块

require特性：
module被加载的时候执行，加载后缓存；
一旦出现模块被循环加载，就只输出已经执行的部分，还没有执行的部分就不会输出

入理解module.exports和moudle和exports

 01、为什么node需要用module.exports

* 1、Node程序由很多模块组成，每个模块就是一个文件。
* 2、并且Node模块采用了个CommonJs规范(下文会详细说明)
* 3、根据CommonJs规范一个单独的文件就是一个模块。每个模块都是一个 单独的作用域。也就是说：一个文件中的所有变量、类、方法都是私有的， 别的文件是不可见，不能直接引用的。
例如：我们创建一个js文件a.js

```javascript
const name1 = 'bangbang'
const name2 = function (name) {
  return name
}
```

上面文件中：变量name1和name2在当前的文件中是私有的，其他文件不 可见。

* 4、在javascript中有2种作用域：全局作用域和函数作用域，在浏览器端， 全局作用域就是window对象的属性，函数作用域就是函数内部的对象属性。
在node中，也有2种作用域：全局作用域和模块作用域，因此要想实现在nodejs中多个文件中分享变量，就必须定义成全局对象 (global)的属性，
global定义的变量，在任何地方都可以使用，类似于浏览器端定义在全局 范围中的变量。Global可查看[http://www.w3clog.com/20.html](http://www.w3clog.com/20.html)

 02、什么是module.exports对象

* 1、CommonJs规定
每个文件对外接口是module.exports对象。这个对象 的所有属性和方法都可以被其他文件导入。
例如：我们创建一个js文件：b1.js

```javascript
const num1 = 6
function add (a) {
  return a + num1
}
module.exports.num1 = num1
module.exports.add = add
```

再创建一个test2.js

```javascript
const b1 = require('./b1')
console.log(b1.num1) // 6
console.log(b1.add(4)) // 10
```

上面代码中的module.exports对象，定义对外接口，输出变量num1和函数add;

* 2、总结如下
* 2.1、module.exports对象可以被其他文件导入，其实他就是文件内部与文件外部通信的桥梁。
* 2.2、module.exports属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量。

 03、什么是module对象

* 1、每个模块内部，都有一个module对象，代表当前的模块，他有以下属性：还是test2.js文件，后面加一句console.log(module)

```
Module {
 id: '.',
 exports: {},
 parent: null,
 filename: 'E:\\yanlele\\webProject\\node\\node-index\\18年\\2月\\1、commonjs\\04、test.js',
 loaded: false,
 children: [],
 paths: 
 [ 'E:\\yanlele\\webProject\\node\\node-index\\18年\\2月\\1、commonjs\\node_modules',
 'E:\\yanlele\\webProject\\node\\node-index\\18年\\2月\\node_modules',
 'E:\\yanlele\\webProject\\node\\node-index\\18年\\node_modules',
 'E:\\yanlele\\webProject\\node\\node-index\\node_modules',
 'E:\\yanlele\\webProject\\node\\node_modules',
 'E:\\yanlele\\webProject\\node_modules',
 'E:\\yanlele\\node_modules',
 'E:\\node_modules' ] }
```

我们分析一下：
Module.id — 模块的识别符，通常是带有绝对路径的模块文件名；
Module.filename – 模块的文件名，含有绝对路径；
Module.loaded – 返回布尔值，代表模块是否已经完成加载；
Module.parent – 返回一个对象，表示调用该模块的模块；
Module.children – 返回一个数组，表示该模块要用到的其他模块。

 04、什么是exports变量

* 1、为了方便，Node为每个模块提供一个exports变量，（即引用赋值）指向module.exports,这等同于在每个模块头部有一行这样的命令：
`Var exports = module.exports;`

不能直接将exports变量指向一个值，因为这样等于切断了，exports与module.exports的联系。
下面的代码也是无效的，name函数无法对外输出。但是module.exports却可以直接指定一个值， 这样是有效的。

```javascript
exports.name = function () {
  return 'yanle'
}
module.exports = 'lele'
```

* 2、module和module.exports不能混用
这个很重要：因为module.exports被重新赋值了。require返回的是module.exports的值，module.exports才是真正的接口，而不是exports的值；
因此如果你觉得exports与module.exports很难分清，一个简单的处理方法就是：尽量让他们只出现一种，不要混合使用！推荐使用exports导出方法或者变量。

 05、CommonJs模块的特点

* 1、 所有代码都运行在模块中，不会污染全局作用域；

* 2、 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果 就被缓存了，以后再次加载的时候就直接读取缓存结果。要想让模块再次 运行，必须清除缓存。
 在这个地方我找到了一个模块，可以重新加载我们需想要的模块： [require-reload](https://github.com/fastest963/require-reload)

* 3、 模块加载的顺序，按照其在代码中出现的顺序。

## commonjs 模块化中 module.exports 与 exports 有什么区别 {#p1-commonjs-module-exports-exports}

在 CommonJS 模块化规范中，`module.exports`与`exports`有以下区别：

**一、`module.exports`**

1. **本质**：

* `module.exports`是一个对象，它代表当前模块要导出的内容。可以将任意类型的值（如函数、对象、字符串等）赋值给`module.exports`来决定模块导出的内容。

2. **作用范围和灵活性**：

* 可以完全覆盖模块的导出内容。例如，可以直接将一个全新的对象赋值给`module.exports`，从而完全替换模块原本可能通过`exports`添加的属性。
* 适合需要导出复杂数据结构或多个不同类型的值的情况。例如，可以导出一个包含多个函数和变量的对象。

**二、`exports`**

1. **本质**：

* `exports`最初是一个对`module.exports`的引用。这意味着通过`exports`添加的属性实际上是添加到了`module.exports`所代表的对象上。

2. **局限性**：

* 如果直接将一个值赋值给`exports`，它将不再是对`module.exports`的引用，而是变成一个独立的变量。此时，模块的导出内容将变为这个新的值，而不是原本期望的通过添加属性到`exports`来构建的导出对象。
* 例如：

 ```javascript
//  exports = function () {
//    console.log('This is a new function.')
//  }
 ```

* 在这种情况下，模块将不再导出之前可能通过`exports.xxx = yyy`添加的属性，而是只导出这个新的函数。

**三、选择建议\*\***：

1. **简单模块导出单个值**：

* 如果模块只需要导出一个简单的值，如一个函数或一个字符串，可以使用`module.exports`直接赋值的方式。例如：

 ```javascript
 module.exports = function add (a, b) {
   return a + b
 }
 ```

2. **复杂模块构建导出对象**：

* 当模块需要导出多个相关的值或功能时，可以先使用`exports`添加属性，最后确保`module.exports`指向一个包含所有需要导出内容的对象。例如：

 ```javascript
 exports.foo = function () {
   console.log('foo function.')
 }
 exports.bar = 'bar value'
 module.exports = exports // 确保 module.exports 和 exports 指向同一个对象
 ```

3. **避免混淆和错误**：

* 理解`module.exports`和`exports`的区别非常重要，以避免在导出模块内容时出现意外的结果。尽量明确使用`module.exports`或遵循使用`exports`的正确方式，避免直接赋值给`exports`而导致错误的导出行为。

## node 中 nextTick 与 setTimeout {#p1-node-next-tick-setTimeout}

**一、执行时机**

1. `process.nextTick()`：

* `nextTick`会在当前事件循环的当前阶段结束后立即执行回调函数。这意味着它会在所有同步代码执行完毕后，但在事件循环进入下一个阶段之前执行。
* 例如：

 ```javascript
 console.log('Sync code')
 process.nextTick(() => {
   console.log('NextTick callback')
 })
 console.log('After nextTick call')
 ```

* 在这个例子中，输出顺序将是“Sync code”，“After nextTick call”，然后是“NextTick callback”。

2. `setTimeout()`：

* `setTimeout`会在指定的延迟时间过后，将回调函数添加到事件循环的定时器阶段进行执行。实际的执行时间可能会比指定的延迟时间稍长，因为它取决于事件循环的负载和其他正在等待执行的任务。
* 例如：

 ```javascript
 console.log('Sync code')
 setTimeout(() => {
   console.log('Timeout callback')
 }, 0)
 console.log('After setTimeout call')
 ```

* 在这个例子中，输出顺序通常是“Sync code”，“After setTimeout call”，然后在一段时间后是“Timeout callback”。

**二、用途**

1. `process.nextTick()`：

* 通常用于在当前操作完成后尽快执行一些关键任务，而不希望阻塞事件循环的其他任务。例如，在异步函数中，可能需要在返回控制给调用者之前执行一些清理操作，可以使用`nextTick`来确保这些操作在当前阶段完成后立即执行。
* 它也可以用于避免深度递归导致的栈溢出，通过将递归操作拆分成多个`nextTick`回调，可以控制执行的深度，防止栈的过度增长。

2. `setTimeout()`：

* 主要用于在特定的延迟时间后执行某个任务。例如，实现超时处理、定期执行某个任务或者在一定时间后触发某个操作。
* `setTimeout`可以设置不同的延迟时间，以满足不同的需求。

**三、性能影响**

1. `process.nextTick()`：

* 过度使用`nextTick`可能会导致事件循环被阻塞，因为它会在当前阶段结束后立即执行回调，而如果连续调用`nextTick`，可能会导致其他任务无法及时执行。
* 在一些情况下，可能会导致性能问题，特别是当有大量的`nextTick`回调排队等待执行时。

2. `setTimeout()`：

* 由于`setTimeout`是在定时器阶段执行，它不会像`nextTick`那样立即阻塞事件循环。但是，如果设置的延迟时间过短，可能会导致频繁的定时器触发，增加事件循环的负担。
* 需要注意的是，`setTimeout`的最小延迟时间在不同的浏览器和 Node.js 环境中可能会有所不同，并且实际的延迟时间可能会受到系统负载和其他因素的影响。

## stream {#p1-stream}

* [node](https://nodejs.org/en/learn/modules/how-to-use-streams#stream-history)
* [node stream](https://nodejs.org/fr/blog/feature/streams2)
* [stream api](https://nodejs.org/api/stream.html)

## cluster {#p0-cluster}

总所周知， NodeJS 是单线程执行任务， 不同于 浏览器还可以使用 web worker 等手段多线程执行任务。那么 NodeJS 中， 是如何充分利用物理机的多核 CPU 呢？

 有三种方式

在 Node.js 中，JS 也是单线程的，只有一个主线程用于执行任务。但是，在 Node.js 中可以使用多进程来利用多核机器，以充分利用系统资源。

* **Node.js 提供了 `cluster` 模块**，可以轻松创建子进程来处理任务。通过将任务分配给不同的子进程，每个子进程可以在自己的线程上执行任务，从而实现多核机器的利用。

* **Node.js 也提供了 `worker_threads` 模块**，可以创建真正的多线程应用程序。这个模块允许开发者创建和管理多个工作线程，每个线程都可以独立地执行任务。

* **利用的是 Node.js 的事件循环机制和异步非阻塞的 I/O 操作**。Node.js 使用事件驱动的模型来处理请求，当有请求到达时，Node.js 将其放入事件队列中，然后通过事件循环来处理这些请求。在等待 I/O 操作的过程中，Node.js 不会阻塞其他请求的处理，而是继续处理其他请求。这样，即使 JavaScript 是单线程的，但在实际运行中，多个请求可以同时处理，充分利用了多核系统的能力。

 如果 Nodejs 只写同步代码， 是否意味着无法充分利用多核优势？

如果在 Node.js 的开发过程中只使用同步代码而不使用异步代码或集群模块，**那么意味着无法充分利用机器多核优势**。

Node.js的事件驱动和异步非阻塞的特性使得它在处理大量并发请求时非常高效。当你使用异步代码时，可以在等待 I/O 操作的过程中继续处理其他请求，从而提高系统的吞吐量和响应速度。而同步代码会阻塞事件循环，使得只能按顺序处理请求，无法同时处理多个请求，无法充分利用多核系统的能力。

另外，如果你不使用集群模块，那么只有一个 Node.js 进程在运行，无法充分利用多核系统的资源。使用集群模块可以创建多个子进程，每个子进程在一个核心上运行，从而并行处理请求，提高系统的并发能力。

 为何 nodejs 异步代码就可以充分利用多核优势了？

Node.js的异步代码可以充分利用多核优势，主要有两个原因：

1. 事件驱动和非阻塞 I/O：Node.js采用事件驱动的模型，通过使用异步非阻塞 I/O 操作，可以在等待 I/O 操作完成的同时继续处理其他请求。这意味着在一个请求等待 I/O 的过程中，Node.js 可以同时处理其他请求，充分利用了 CPU 的多核能力。每个核心可以处理一个请求，从而提高系统的并发能力和吞吐量。

2. 事件循环机制：Node.js的事件循环机制使得异步代码可以高效地处理大量并发请求。事件循环机制通过将请求注册为事件监听器，并在合适的时候触发事件处理函数，从而实现异步处理。这样一来，即使有大量并发请求，也能够通过事件循环机制避免线程切换的开销，提高系统的性能。

需要注意的是，虽然 Node.js 的事件驱动和异步非阻塞的特性使得它能够充分利用多核优势，但是在处理 CPU 密集型任务时，仍然可能受限于单线程的性能。在这种情况下，可以通过使用集群模块来创建多个子进程，在每个核心上运行独立的 Node.js 进程，从而实现并行处理，提高系统的性能。

 异步就能充分利用 CPU 原理是啥？

当Node.js使用异步代码时，服务器的其他CPU核心是在工作的。
这是因为Node.js的事件驱动模型和非阻塞I/O使得在等待I/O操作完成时，可以同时处理其他请求。
当一个请求在等待I/O操作时，CPU核心可以被用于处理其他请求，而不是空闲等待。
这种方式可以充分利用服务器上的多个CPU核心，提高系统的并发能力和吞吐量。通过同时处理多个请求，可以更有效地利用服务器的资源，提高系统的性能。

## node 子进程了解多少 {#p0-node-sub-process}

 开启子进程

在Node.js中，可以通过`child_process`模块来开启子进程。`child_process`模块提供了一些方法来创建和操作子进程。

以下是一些常用的方法用于开启子进程：

1. `spawn(command[, args][, options])`: 这个方法用于启动一个新的进程，并可以执行指定的命令。它返回一个`ChildProcess`对象，通过该对象可以与子进程进行通信。例如：

```javascript
const { spawn } = require('child_process')

const ls = spawn('ls', ['-l'])

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`)
})

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`)
})

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`)
})
```

2. `exec(command[, options][, callback])`: 这个方法用于执行一个命令，并返回输出结果。它将整个命令作为一个字符串参数传递。可以通过回调函数获取命令执行的结果。例如：

```javascript
const { exec } = require('child_process')

exec('ls -l', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`)
    return
  }
  console.log(`stdout: ${stdout}`)
  console.error(`stderr: ${stderr}`)
})
```

3. `fork(modulePath[, args][, options])`: 这个方法用于创建一个新的Node.js进程，并在该进程中执行指定的模块。它是通过`child_process.fork()`方法创建的子进程。例如：

```javascript
const { fork } = require('child_process')

const child = fork('child.js')

child.on('message', (message) => {
  console.log(`received message from child: ${message}`)
})

child.send('Hello from parent')
```

以上是一些常用的方法来开启子进程。根据具体的需求，选择合适的方法来创建和操作子进程。

 node 开启的子进程之间如何通信

在Node.js中，子进程之间可以通过不同的机制进行通信。以下是一些常用的子进程间通信方式：

1. 标准输入和标准输出：子进程可以通过标准输入（stdin）和标准输出（stdout）进行通信。父进程可以通过`stdin`向子进程发送数据，子进程可以通过`stdout`向父进程发送数据。例如：

```javascript
// Parent.js
const { spawn } = require('child_process')

const child = spawn('node', ['Child.js'])

child.stdout.on('data', (data) => {
  console.log(`Received data from child: ${data}`)
})

child.stdin.write('Hello child\n')
```

```javascript
// Child.js
process.stdin.on('data', (data) => {
  console.log(`Received data from parent: ${data}`)
})

process.stdout.write('Hello parent\n')
```

2. 事件机制：子进程可以通过事件机制与父进程进行通信。子进程可以使用`process.send()`方法发送消息给父进程，父进程可以通过监听`message`事件来接收子进程发送的消息。例如：

```javascript
// Parent.js
const { fork } = require('child_process')

const child = fork('Child.js')

child.on('message', (message) => {
  console.log(`Received message from child: ${message}`)
})

child.send('Hello child')
```

```javascript
// Child.js
process.on('message', (message) => {
  console.log(`Received message from parent: ${message}`)
})

process.send('Hello parent')
```

3. 共享内存：子进程之间可以通过共享内存的方式进行通信，常见的方式包括文件、共享内存、消息队列等。子进程可以将数据写入共享的资源，其他子进程可以读取该资源获取数据。具体的实现方式需要依赖于操作系统和相关模块。

以上是一些常用的子进程间通信方式。根据具体的需求，选择合适的通信方式进行子进程间的数据交换和通信。

 node 子进程有哪些应用场景

Node.js的子进程模块提供了创建和操作子进程的能力，这在以下一些应用场景中非常有用：

1. 执行外部命令：使用子进程模块可以在Node.js中执行外部命令。这对于需要在Node.js中调用系统命令、运行脚本或执行其他可执行文件的场景非常有用。

2. 并行处理：在某些情况下，需要同时处理多个任务或操作。通过创建多个子进程，可以实现并行处理，提高处理能力和效率。

3. 资源隔离：在一些特定的情况下，可能需要将某些代码或任务隔离到一个独立的进程中。这可以防止代码中的错误或异常影响到主进程的稳定性和性能。

4. 长时间运行的任务：对于需要长时间运行的任务，可以将其放在独立的子进程中运行，这样可以避免阻塞主进程。这对于处理大量数据、复杂计算、后台任务等场景非常有用。

5. 多核利用：当机器有多个CPU核心时，可以通过创建多个子进程来利用多核处理器的并行能力，提高程序的性能和响应能力。

6. 分布式计算：使用子进程可以实现分布式计算，将计算任务分发到不同的子进程中，在多个计算资源上并行执行，加快计算速度。

以上只是一些常见的应用场景，实际上，子进程模块非常灵活，可以根据具体需求进行扩展和应用。无论是执行外部命令、并行处理、资源隔离还是利用多核等，子进程模块为Node.js提供了强大的功能，使得Node.js可以在更广泛的应用场景中发挥作用。

## nodejs 进程间如何通信?

在 Node.js 中，进程间通信（IPC）可以通过以下几种方式进行：

1. 使用子进程模块：可以使用 Node.js 的子进程模块（child\_process）来创建子进程，并使用进程间通信机制（如进程间管道）来实现通信。

2. 使用共享内存：Node.js 中的共享内存模块（sharedArrayBuffer）可以在多个进程间共享内存，从而实现进程间通信。

3. 使用进程间消息传递：Node.js 提供了一个内置的进程间通信机制，可以使用 process.send() 方法在不同的进程之间发送消息。

4. 使用进程间的 TCP 通信：可以使用 Node.js 的 net 模块建立 TCP 服务器和客户端，从而在不同的进程之间进行通信。

需要注意的是，不同的进程之间通信可能会导致一些并发问题，例如竞态条件和死锁。因此，在设计进程间通信方案时，需要仔细考虑并发问题，并采取相应的措施来保证并发安全。
