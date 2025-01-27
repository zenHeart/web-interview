# node

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
