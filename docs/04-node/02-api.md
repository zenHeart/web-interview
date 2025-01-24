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
 exports = function () {
   console.log('This is a new function.')
 }
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
