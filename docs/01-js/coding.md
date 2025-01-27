# 编码题

## 防抖和节流的原理及实现

* debounce 阻止函数的高频执行,只有当频率小于等于限定频率是才延迟触发
* throttle 按照固定的频率触发函数,当函数执行频率高于设定频率是忽略执行

## 实现 call 或 apply 方法?

核心考点:

1. 利用成员调用对 this 的修改模拟 call,apply 对 this 的变换

3. bind 函数的特性,参见 [mdn bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

语法格式 `function.bind(thisArg[, arg1[, arg2[, ...]]])`

* `thisArg`
  * 如果使用 new 运算符构造绑定函数
  * thisArg 传递的任何原始值都将转换为 object

## 实现 bind

[corejs](https://github.com/zloirock/core-js/blob/master/packages/core-js/internals/function-bind.js)

```js
function customBind (context, ...bindParams) {
  const self = this; const bound = function (...params) {
    return self.apply(self instanceof bound ? self : context, bindParams.concat(params))
  }
  const noop = function () {}
  if (this.prototype) {
    // eslint-disable-next-line
    noop.prototype = this.prototype; bound.prototype = new noop()

  }
  return bound
}
```

## 深拷贝和浅拷贝

1. 浅拷贝只拷贝第一层引用
   1. 采用 `Object.assign`
   2. 采用对象扩展
2. 深拷贝,递归拷贝三种方法
   1. 采用递归实现拷贝
   2. 考试引用类型判断
   3. 考察 null 判断

## 实现 loadash get

## async await 原理， 手写 async 函数？{#p0-async-await-implementation}

## 检测对象循环引用

## 实现一个处理长字符串的函数 {#p2-process-long-string}

* created_at: 2024-11-06T15:53:43Z
* updated_at: 2024-11-06T15:53:44Z
* labels: 代码实现/算法
* milestone: 初

> 描述
>
> 实现一个处理字符串的函数: 字符串长度不能超过 256，如果超过 256， 字符串中间字符 【...】处理，且处理结果字符串长度还是为 256

以下是使用 JavaScript 实现的函数：

```javascript
function processString (str) {
  if (str.length <= 256) {
    return str
  }
  const halfLength = Math.floor((256 - 3) / 2)
  return str.slice(0, halfLength) + '... ' + str.slice(str.length - halfLength)
}
```

这个函数首先检查输入字符串的长度是否超过 256。如果不超过，则直接返回原字符串。如果超过，它会计算出前后两端保留的字符长度，使得加上中间的“... ”后总长度为 256。然后，它从字符串的开头和结尾分别截取相应长度的子字符串，并将它们与“... ”拼接起来返回。

## 统计前端请求耗时 {#p2-request-time-statistics}

在前端业务中，可以通过以下几种方法统计请求耗时：

 初级手段

**一、使用`fetch`结合时间戳**

1. 在发送请求前记录当前时间戳：

* `const startTime = performance.now();`

2. 使用`fetch`发送请求：

* `fetch('your-api-url')`

3. 在请求的`.then()`或`.catch()`中记录结束时间戳并计算耗时：

```javascript
Promise.resolve().then(response => {
  const endTime = performance.now()
  const duration = endTime - startTime
  console.log(`Request took ${duration} milliseconds.`)
  return response
})
  .catch(error => {
    const endTime = performance.now()
    const duration = endTime - startTime
    console.log(`Request took ${duration} milliseconds with error: ${error}`)
  })
```

**二、使用`XMLHttpRequest`结合时间戳**

1. 创建`XMLHttpRequest`对象并记录开始时间：

```javascript
const xhr = new XMLHttpRequest()
const startTime = performance.now()
```

2. 配置请求并发送：

* `xhr.open('GET', 'your-api-url'); xhr.send();`

3. 在请求的`onload`、`onerror`等事件处理函数中记录结束时间并计算耗时：

```javascript
xhr.onload = function () {
  const endTime = performance.now()
  const duration = endTime - startTime
  console.log(`Request took ${duration} milliseconds.`)
}
xhr.onerror = function () {
  const endTime = performance.now()
  const duration = endTime - startTime
  console.log(`Request took ${duration} milliseconds with error.`)
}
```

**三、利用拦截器（`axios`）**

1. 如果使用`axios`或类似的库，可以设置请求拦截器和响应拦截器：

* 在请求拦截器中记录开始时间，在响应拦截器中记录结束时间并计算耗时。

```javascript
axios.interceptors.request.use((config) => {
  config.startTime = performance.now()
  return config
})
axios.interceptors.response.use(
  (response) => {
    const endTime = performance.now()
    const duration = endTime - response.config.startTime
    console.log(`Request to ${response.config.url} took ${duration} milliseconds.`)
    return response
  },
  (error) => {
    const endTime = performance.now()
    const duration = endTime - error.config.startTime
    console.log(`Request to ${error.config.url} took ${duration} milliseconds with error.`)
    return Promise.reject(error)
  }
)
```

**总结**

上面都属于一些初级手段，因为还是在浏览器进程里面， 一旦出现长任务阻塞了浏览器， 这个统计就不太准确了。

 进阶手段 - Performance API

Performance API 可以用来统计请求耗时。

Performance API 提供了一系列的性能测量工具，可以测量网页加载和运行过程中的各种性能指标。其中，可以通过以下方式来统计网络请求的耗时：

1. 使用`performance.timing`：

* `performance.timing`对象包含了网页加载过程中的各个时间点信息。可以通过计算不同时间点之间的差值来得到特定阶段的耗时。
* 例如，可以计算`responseEnd`（服务器响应结束的时间）和`requestStart`（开始请求的时间）之间的差值来得到请求的耗时。

2. 使用`performance.getEntriesByType('resource')`：

* 这个方法可以获取所有资源加载的性能条目。对于每个资源条目，可以获取其`startTime`（开始时间）和`responseEnd`（响应结束时间）等属性，从而计算出资源加载的耗时。
* 可以遍历这些条目，找到特定的网络请求资源，并计算其耗时。

以下是一个示例代码：

```javascript
// 计算页面加载过程中第一个请求的耗时
const timing = performance.timing
const requestDuration = timing.responseEnd - timing.requestStart
console.log(`First request took ${requestDuration} milliseconds.`)

// 遍历所有资源加载条目，找到特定请求并计算耗时
const resources = performance.getEntriesByType('resource')
for (const resource of resources) {
  if (resource.name === 'https://example.com/specific-resource') {
    const resourceDuration = resource.responseEnd - resource.startTime
    console.log(`Specific resource request took ${resourceDuration} milliseconds.`)
    break
  }
}
```

 高级手段 - Web Worker

Web Worker 可以用于统计请求耗时。

以下是一种使用 Web Worker 统计请求耗时的方法：

1. 创建一个 Web Worker 文件，例如`worker.js`：

```javascript
self.onmessage = function (event) {
  const url = event.data.url
  const startTime = performance.now()
  fetch(url)
    .then((response) => {
      const endTime = performance.now()
      const duration = endTime - startTime
      self.postMessage({ duration })
    })
    .catch((error) => {
      self.postMessage({ error: `Error fetching ${url}: ${error}` })
    })
}
```

2. 在主页面中使用 Web Worker：

```javascript
const worker = new Worker('worker.js')
const url = 'your-api-url'
worker.postMessage({ url })
worker.onmessage = function (event) {
  if (event.data.duration) {
    console.log(`Request to ${url} took ${event.data.duration} milliseconds.`)
  } else {
    console.error(event.data.error)
  }
}
```

在这个例子中，Web Worker 负责发送请求并计算耗时，然后将结果发送回主页面。这样可以在不阻塞主页面 UI 线程的情况下进行请求耗时统计。

## 1如何判定一个属性来自于对象本身， 还是来自于原型链 {#p0-check-property}

在 JavaScript 中，可以通过以下几种方式来判断一个属性是来自对象本身还是来自原型链：

**一、使用 `hasOwnProperty()` 方法**

1. 方法介绍：

* `hasOwnProperty()`是 JavaScript 对象的一个方法，用于判断一个对象自身是否具有指定的属性。
* 它不会检查原型链上的属性，只关注对象本身是否拥有该属性。

2. 示例代码：

```javascript
function Person () {}
Person.prototype.name = 'prototype name'

const person = new Person()
person.age = 30

// eslint-disable-next-line no-prototype-builtins
console.log(person.hasOwnProperty('age')) // true，说明 age 属性是对象本身的属性
// eslint-disable-next-line no-prototype-builtins
console.log(person.hasOwnProperty('name')) // false，说明 name 属性不在对象本身，而是在原型链上
```

**二、使用 `in` 操作符结合 `hasOwnProperty()`**

1. 方法介绍：

* `in`操作符用于检查一个对象及其原型链中是否具有指定的属性。
* 可以结合`hasOwnProperty()`来判断属性的来源。

2. 示例代码：

 ```javascript
 function Person () {}
 Person.prototype.name = 'prototype name'
 
 const person = new Person()
 person.age = 30
 
 const propertyName = 'name'
 // eslint-disable-next-line
 if (person.hasOwnProperty(propertyName)) {
   console.log(`${propertyName} is an own property of the object.`)
 } else if (propertyName in person) {
   console.log(`${propertyName} is inherited from the prototype.`)
 } else {
   console.log(`${propertyName} is not found in the object or its prototype.`)
 }
 ```

**三、使用 `Object.getOwnPropertyDescriptor()` 方法**

1. 方法介绍：

* `Object.getOwnPropertyDescriptor()`方法返回指定对象上一个自有属性的属性描述符。
* 如果对象没有指定的自有属性，则返回`undefined`。

2. 示例代码：

 ```javascript
 function Person () {}
 Person.prototype.name = 'prototype name'
 
 const person = new Person()
 person.age = 30
 
 const ageDescriptor = Object.getOwnPropertyDescriptor(person, 'age')
 const nameDescriptor = Object.getOwnPropertyDescriptor(person, 'name')
 
 if (ageDescriptor) {
   console.log('age is an own property of the object.')
 }
 if (!nameDescriptor) {
   console.log('name is not an own property of the object.')
 }
 ```

## 创建一个禁止修改的对象， 只能通过指定方法去修改属性 {#p2-create-object}

```js
// 实现 createObject 函数， 用例如下；

// 比如：
const obj = createObject({ name: 'name' })

obj.name = 'name2' // 错误， 禁止修改；
obj.set('name', 'name2') // 正确方式， 允许修改；
obj.set('address.info', 'chongqing') // 正确方式， 允许添加属性。
```

**实现**

以下是使用 JavaScript 实现的`createObject`函数：

```javascript
function createObject (initialData) {
  const data = initialData
  return new Proxy(data, {
    set (target, property, value, receiver) {
      if (property === 'set') {
        const keys = property.split('.')
        let obj = target
        for (let i = 0; i < keys.length - 1; i++) {
          obj = obj[keys[i]] || (obj[keys[i]] = {})
        }
        obj[keys[keys.length - 1]] = value
        return true
      } else {
        return false
      }
    },
    get (target, property, receiver) {
      if (property === 'set') {
        return function (key, value) {
          const keys = key.split('.')
          let obj = target
          for (let i = 0; i < keys.length - 1; i++) {
            obj = obj[keys[i]] || (obj[keys[i]] = {})
          }
          obj[keys[keys.length - 1]] = value
        }
      } else {
        return target[property]
      }
    }
  })
}
```

你可以使用以下方式测试这个函数：

```javascript
const obj = createObject({ name: 'name' })

obj.name = 'name2' // 不会生效，禁止直接修改属性
console.log(obj.name) // 'name'

obj.set('name', 'name2')
console.log(obj.name) // 'name2'

obj.set('address.info', 'chongqing')
console.log(obj.address.info) // 'chongqing'
```

## 洗牌算法 {#p2-shuffle-algorithm}

在 JavaScript 中，可以使用以下几种方法来随机打乱一个数组：

**一、使用`sort`方法结合随机函数**

1. **基本原理**：

* JavaScript 的数组`sort`方法可以接受一个比较函数作为参数。通过提供一个随机的比较函数，可以实现对数组的随机排序，从而打乱数组的顺序。

2. **示例代码**：

```javascript
const array = [1, 2, 3, 4, 5]

array.sort(() => Math.random() - 0.5)

console.log(array)
```

在这个例子中，`sort`方法的比较函数每次都会返回一个随机的正负值，使得数组元素的排序顺序完全随机，从而实现数组的随机打乱。

**二、Fisher-Yates 洗牌算法**

1. **基本原理**：

* Fisher-Yates 洗牌算法是一种经典的随机打乱数组的算法。它的基本思想是从数组的最后一个元素开始，随机选择一个位置与当前元素交换，然后逐步向前移动，重复这个过程，直到处理完第一个元素。

2. **示例代码**：

```javascript
function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random()(i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const array = [1, 2, 3, 4, 5]

const shuffledArray = shuffleArray(array)

console.log(shuffledArray)
```

在这个例子中，定义了一个`shuffleArray`函数，该函数使用 Fisher-Yates 洗牌算法随机打乱输入的数组，并返回打乱后的数组。

## 铺平嵌套数组 {#p2-flatten-array}

以下是用 JavaScript 手写实现类似于 `lodash.flattenDeep` 的函数来将数组递归展平为一维数组：

```javascript
function flattenDeep (arr) {
  let result = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenDeep(item))
    } else {
      result.push(item)
    }
  }
  return result
}
```

你可以使用以下方式测试这个函数：

```javascript
const nestedArray = [1, [2, [3, [4]]]]
const flattenedArray = flattenDeep(nestedArray)
console.log(flattenedArray) // [1, 2, 3, 4]
```

## 判断一个对象是否为空，包含了其原型链上是否有自定义数据或者方法。 该如何判定 {#check-empty}

要判断一个对象是否为空，并且考虑到对象自身及其原型链上是否有自定义数据或方法，您可以使用以下的 JavaScript 函数来实现：

```javascript
function isObjectEmpty (obj) {
  // 首先获取对象自身的属性
  const ownProperties = Object.getOwnPropertyNames(obj)

  // 遍历自身属性
  for (const property of ownProperties) {
    const descriptor = Object.getOwnPropertyDescriptor(obj, property)
    // 如果属性是数据属性并且有值，或者是方法（可调用函数），则对象不为空
    if (
      (descriptor.value && descriptor.value !== null && descriptor.value !== undefined) ||
 typeof descriptor.value === 'function'
    ) {
      return false
    }
  }

  // 获取对象的原型
  const prototype = Object.getPrototypeOf(obj)

  // 如果有原型并且原型不是 `Object.prototype`（避免误判普通对象的默认方法）
  while (prototype && prototype !== Object.prototype) {
    const prototypeProperties = Object.getOwnPropertyNames(prototype)

    // 遍历原型的属性
    for (const property of prototypeProperties) {
      const descriptor = Object.getOwnPropertyDescriptor(prototype, property)
      // 如果原型上的属性是数据属性并且有值，或者是方法（可调用函数），则对象不为空
      if (
        (descriptor.value && descriptor.value !== null && descriptor.value !== undefined) ||
 typeof descriptor.value === 'function'
      ) {
        return false
      }
    }

    // 继续沿着原型链向上查找
    // eslint-disable-next-line
    prototype = Object.getPrototypeOf(prototype)
  }

  // 如果以上检查都没有找到非空属性或方法，则对象为空
  return true
}
```

可以使用这个函数来判断对象是否为空，例如：

```javascript
function MyClass () {}

MyClass.prototype.myMethod = function () {}

const instance = new MyClass()

console.log(isObjectEmpty(instance))
```

## cookies 解析函数， 输出结果为一个对象 {#cp2-ookie-parser}

当然可以，以下是一个简单的 JavaScript 函数，用于解析当前页面的 cookie 并将它们存储到一个对象中：

```javascript
function parseCookies () {
  // 创建一个空对象来存储解析后的 cookie
  const cookiesObj = {}

  // 获取 cookie 字符串，然后分割每个键值对
  const cookies = document.cookie.split(';')

  // 遍历每个键值对
  cookies.forEach(function (cookie) {
    // 去除键值对前后的空格
    const cleanCookie = cookie.trim()
    // 找到键和值之间的等号位置
    const separatorIndex = cleanCookie.indexOf('=')

    // 如果找不到等号，则不是有效的键值对，跳过当前循环
    if (separatorIndex === -1) return

    // 获取键名
    let key = cleanCookie.substring(0, separatorIndex)
    // 获取值
    let value = cleanCookie.substring(separatorIndex + 1)

    // 解码因为 cookie 键和值是编码过的
    key = decodeURIComponent(key)
    value = decodeURIComponent(value)

    // 将解析后的值存储到对象中
    cookiesObj[key] = value
  })

  // 返回解析后的 cookie 对象
  return cookiesObj
}

// 使用示例
const cookies = parseCookies()
console.log(cookies)
```

这个函数首先会以分号 `;` 分割 `document.cookie` 字符串来得到各个 cookie 键值对，然后移除键值对前后的任何空格。接着寻找每个键值对中的等号 `=` 位置，以此来分割键和值。最后，它会使用 `decodeURIComponent` 函数来解码键名和键值，因为通过 `document.cookie` 读取的键名和键值通常是编码过的。

调用 `parseCookies` 函数将返回一个对象，其中包含了当前页面的所有 cookie，键名和值都已被解码。然后你可以像访问普通对象一样访问这些值，例如 `cookies['username']` 来获取 'username' 键对应的值。

## 实现并发异步调度器

保证同时运行的任务限制。完善代码中 Scheduler 类，使得以下程序能正确输出：

// 实现带并发限制的异步调度器
```js
class Scheduler {
  // Your code
}

// 异步任务函数
const fetchUser = (name, delay) => {
  return () => new Promise((resolve) => {
    setTimeout(() => {
      () => console.log(name)
      resolve()
    }, delay)
  })
}
const scheduler = new Scheduler(2) // 控制并发数 2
scheduler.add(fetchUser('A', 2000))
scheduler.add(fetchUser('B', 1000))
scheduler.add(fetchUser('C', 800))
scheduler.add(fetchUser('D', 500))
```

// 打印顺序: B C A D

```js
class Scheduler {
  constructor (concurrency) {
    this.concurrency = concurrency
    this.tasks = []
    this.running = 0
  }

  add (task) {
    return new Promise((resolve) => {
      this.tasks.push({
        task,
        resolve
      })
      this.schedule()
    })
  }

  schedule () {
    while (this.tasks.length > 0 && this.running < this.concurrency) {
      const current = this.tasks.shift()
      this.running++
      current.task().then((result) => {
        this.running--
        current.resolve(result)
        this.schedule()
      })
    }
  }
}
```

## JS 执行 100 万个任务， 如何保证浏览器不卡顿？{#p2js-1m-task}

**Web Workers**

要确保浏览器在执行100万个任务时不会卡顿，你可以考虑使用Web Workers来将这些任务从主线程中分离出来。Web Workers允许在后台线程中运行脚本，从而避免阻塞主线程，保持页面的响应性。

以下是一个使用Web Workers的简单示例：

```javascript
// 主线程代码
const worker = new Worker('worker.js') // 创建一个新的Web Worker

worker.postMessage({ start: 0, end: 1000000 }) // 向Web Worker发送消息

worker.onmessage = function (event) {
  const result = event.data
  console.log('任务完成：', result)
}

// worker.js - Web Worker代码
onmessage = function (event) {
  const start = event.data.start
  const end = event.data.end
  let sum = 0
  for (let i = start; i <= end; i++) {
    sum += i
  }
  postMessage(sum) // 向主线程发送消息
}
```

在这个示例中，主线程创建了一个新的Web Worker，并向其发送了一个包含任务范围的消息。Web Worker在后台线程中执行任务，并将结果发送回主线程。

**requestAnimationFrame 来实现任务分割**

使用`requestAnimationFrame`来实现任务分割是一种常见的方式，它可以确保任务在浏览器的每一帧之间执行，从而避免卡顿。以下是一个使用`requestAnimationFrame`来分割任务的简单例子：

```javascript
// 假设有一个包含大量元素的数组
const bigArray = Array.from({ length: 1000000 }, (_, i) => i + 1)

// 定义一个处理函数，例如对数组中的每个元素进行平方操作
function processChunk (chunk) {
  return chunk.map(num => numnum)
}

// 分割任务并使用requestAnimationFrame
const chunkSize = 1000 // 每个小块的大小
let index = 0

function processArrayWithRAF () {
  function processChunkWithRAF () {
    const chunk = bigArray.slice(index, index + chunkSize) // 从大数组中取出一个小块
    const result = processChunk(chunk) // 处理小块任务
    console.log('处理完成：', result)
    index += chunkSize

    if (index < bigArray.length) {
      requestAnimationFrame(processChunkWithRAF) // 继续处理下一个小块
    }
  }

  requestAnimationFrame(processChunkWithRAF) // 开始处理大数组
}

processArrayWithRAF()
```

在这个例子中，我们使用`requestAnimationFrame`来循环执行处理小块任务的函数`processChunkWithRAF`，从而实现对大数组的任务分割。这样可以确保任务在每一帧之间执行，避免卡顿。

**针对上面的改进一下**

`const chunkSize = 1000; // 每个小块的大小` 是不能保证不卡的， 那么久需要动态调整 `chunkSize` 的大小， 代码可以参考下面的示范：

```javascript
const $result = document.getElementById('result')

// 假设有一个包含大量元素的数组
const bigArray = Array.from({ length: 1000000 }, (_, i) => i + 1)

// 定义一个处理函数，对数组中的每个元素执行一次
function processChunk (chunk) {
  return `chunk: ${chunk}`
}

// 动态调整 chunkSize 的优化方式
let chunkSize = 1000 // 初始的 chunkSize
let index = 0

function processArrayWithDynamicChunkSize () {
  function processChunkWithRAF () {
    const startTime = performance.now() // 记录结束时间
    for (let i = 0; i < chunkSize; i++) {
      if (index < bigArray.length) {
        const result = processChunk(bigArray[index]) // 对每个元素执行处理函数
        $result.innerText = result
        index++
      }
    }
    const endTime = performance.now()
    const timeTaken = endTime - startTime // 计算处理时间

    // 根据处理时间动态调整 chunkSize
    if (timeTaken > 16) { // 如果处理时间超过一帧的时间（16毫秒），则减小 chunkSize
      chunkSize = Math.floor(chunkSize * 0.9) // 减小10%
    } else if (timeTaken < 16) { // 如果处理时间远小于一帧的时间（8毫秒），则增加 chunkSize
      chunkSize = Math.floor(chunkSize * 1.1) // 增加10%
    }

    if (index < bigArray.length) {
      requestAnimationFrame(processChunkWithRAF) // 继续处理下一个小块
    }
  }

  requestAnimationFrame(processChunkWithRAF) // 开始处理大数组
}

processArrayWithDynamicChunkSize()
```

在这个例子中，我们动态调整`chunkSize`的大小，根据处理时间来优化任务分割。根据处理时间的表现，动态调整`chunkSize`的大小，以确保在处理大量任务时，浏览器能够保持流畅，避免卡顿。

参考文档： [100万个函数执行保证浏览器不卡](https://yanlele.github.io/node-index/#/?id=index)

**requestIdleCallback**

`window.requestIdleCallback` 是一个用于在浏览器空闲时执行任务的API。它允许开发者在浏览器的主线程空闲时执行一些任务，而不会影响用户界面的流畅性和响应性。

这个 API 的基本思想是利用浏览器在空闲时的空闲时间来执行任务，这样就可以避免在用户执行交互操作时造成卡顿。`requestIdleCallback` 接受一个回调函数作为参数，该回调函数会在浏览器空闲时被调用。

以下是 `window.requestIdleCallback` 的基本用法：

```javascript
window.requestIdleCallback(function (deadline) {
  // 在空闲时执行的任务
  // deadline 参数提供了一些信息，比如剩余的空闲时间等
})
```

`requestIdleCallback` 的回调函数接收一个 `deadline` 参数，它包含了一些有关当前空闲时间的信息。通过这个参数，你可以决定是否继续执行任务或者推迟到下一次空闲时段。

此外，还有一个配套的 `window.cancelIdleCallback` 方法，用于取消通过 `requestIdleCallback` 请求的回调：

```javascript
const id = window.requestIdleCallback(function (deadline) {
  // 在空闲时执行的任务
})

// 取消回调
window.cancelIdleCallback(id)
```

需要注意的是，`requestIdleCallback` 并不是所有浏览器都支持的标准，因此在使用时要注意检查浏览器的兼容性。在一些现代浏览器中，这个 API 已经得到了广泛的支持，但在某些老旧的浏览器中可能并不可用。

## 实现一个 sum 函数，支持任意个参数的累加，在 console.log 时输出结果？{#p1-sum-function}

```js
// example1
console.log(sum(1)(2)(3, 4)) // 10

// example2
console.log(sum(1, 2, 3, 4)) // 10
```

## 实现日期格式化 format 函数{#p0-time-format}

**关键词**：日期format函数、日期format实现

**问题**

```ts
// js 实现日期的 format 函数
//
// YYYY 对应年
// MM 对应月
// DD 对应日
//
// HH 对应 24 小时制度
// hh 对应 12 小时制度
// mm 对应分钟
// ss 对应秒

const date = new Date()
const formattedDate = date.format('YYYY-MM-DD HH:mm:ss')
console.log(formattedDate) // 输出结果为当前日期和时间的格式化字符串
```

**解答**
以下是使用JavaScript实现日期格式化的`format`函数：

```js
const format = function (format) {
  const date = this

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  format = format.replace('YYYY', year)
  format = format.replace('MM', month.toString().padStart(2, '0'))
  format = format.replace('DD', day.toString().padStart(2, '0'))
  format = format.replace('HH', hours.toString().padStart(2, '0'))
  format = format.replace('hh', (hours % 12).toString().padStart(2, '0'))
  format = format.replace('mm', minutes.toString().padStart(2, '0'))
  format = format.replace('ss', seconds.toString().padStart(2, '0'))

  return format
}

// 示例用法
const date = new Date()
const formattedDate = date.format('YYYY-MM-DD HH:mm:ss')
console.log(formattedDate) // 输出结果为当前日期和时间的格式化字符串
```

上述代码中，我们通过在`Date`对象的原型上定义`format`函数，使得所有的`Date`对象都可以调用`format`函数进行日期格式化。在函数内部，我们使用`getFullYear`、`getMonth`、`getDate`等方法获取日期的年、月、日、时、分、秒的值，并将其替换到传入的`format`字符串中对应的占位符。最后返回格式化后的字符串。

## 实现一个函数， 计算两个日期之间的天数差 {#p0-time-diff}

以下是使用JavaScript实现计算两个日期之间的天数差的函数：

```javascript
function calculateDateDifference (date1, date2) {
  // 将日期字符串转换为 Date 对象
  const d1 = new Date(date1)
  const d2 = new Date(date2)

  // 计算两个日期的时间差（毫秒数）
  const timeDiff = Math.abs(d2.getTime() - d1.getTime())

  // 将时间差转换为天数
  const daysDiff = Math.ceil(timeDiff / (1000360024))

  return daysDiff
}

// 示例用法
const date1 = '2022-01-01'
const date2 = '2022-01-10'

const difference = calculateDateDifference(date1, date2)
console.log(difference) // 输出结果为 9
```

上述函数首先将两个日期字符串转换为Date对象，然后计算两个日期对象之间的时间差（以毫秒表示），最后将时间差转换为天数。通过调用`calculateDateDifference`函数，可以获取两个日期之间的天数差。

## 实现 map 函数

> map.js

> ['1', '2', '3'].map(parseInt) 的使用

## JS 中数组深对比实现 {#p0-array-nest-diff}

在JavaScript中，可以使用递归的方式实现数组的深度对比。以下是一个示例函数，用于比较两个数组是否相等：

```javascript
// 判断对象是否相同
function deepEqual (obj1, obj2) {
  // 检查类型是否相同
  if (typeof obj1 !== typeof obj2) {
    return false
  }

  // 检查是否是对象或数组
  if (typeof obj1 === 'object' && obj1 !== null && obj2 !== null) {
    // 检查对象或数组长度是否相同
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false
    }

    for (const key in obj1) {
      // 递归比较每个属性的值
      if (!deepEqual(obj1[key], obj2[key])) {
        return false
      }
    }

    return true
  }

  // 比较基本类型的值
  return obj1 === obj2
}

function deepArrayEqual (arr1, arr2) {
  // 检查数组长度是否相同
  if (arr1.length !== arr2.length) {
    return false
  }

  for (let i = 0; i < arr1.length; i++) {
    const value1 = arr1[i]
    const value2 = arr2[i]

    // 递归比较每个元素的值
    if (Array.isArray(value1) && Array.isArray(value2)) {
      if (!deepArrayEqual(value1, value2)) {
        return false
      }
    } else if (typeof value1 === 'object' && typeof value2 === 'object') {
      if (!deepEqual(value1, value2)) {
        return false
      }
    } else {
      // 比较基本类型的值
      if (value1 !== value2) {
        return false
      }
    }
  }

  return true
}
```

使用示例：

```javascript
const arr1 = [1, [2, 3], { name: 'John' }]
const arr2 = [1, [2, 3], { name: 'John' }]
const arr3 = [1, [2, 3], { name: 'Jane' }]

console.log(deepArrayEqual(arr1, arr2)) // true
console.log(deepArrayEqual(arr1, arr3)) // false
```

在上述示例中，`deepArrayEqual`函数会递归比较两个数组的每个元素的值，包括嵌套的数组和对象。如果两个数组是相等的，则返回`true`，否则返回`false`。注意，该函数不会检查函数、正则表达式、日期等复杂类型的值。

## JS 中如何实现大对象深度对比 {#p0-object-nest-diff}

在JavaScript中，可以使用递归的方式实现大对象的深度对比。以下是一个示例函数，用于比较两个大对象的每个属性是否相等：

```javascript
function deepEqual (obj1, obj2) {
  // 检查类型是否相同
  if (typeof obj1 !== typeof obj2) {
    return false
  }

  // 检查是否是对象或数组
  if (typeof obj1 === 'object' && obj1 !== null && obj2 !== null) {
    // 检查对象或数组长度是否相同
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false
    }

    for (const key in obj1) {
      // 递归比较每个属性的值
      if (!deepEqual(obj1[key], obj2[key])) {
        return false
      }
    }

    return true
  }

  // 比较基本类型的值
  return obj1 === obj2
}
```

使用示例：

```javascript
const obj1 = {
  name: 'John',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'New York'
  }
}

const obj2 = {
  name: 'John',
  age: 30,
  address: {
    street: '123 Main St',
    city: 'New York'
  }
}

const obj3 = {
  name: 'Jane',
  age: 25,
  address: {
    street: '456 Park Ave',
    city: 'Los Angeles'
  }
}

console.log(deepEqual(obj1, obj2)) // true
console.log(deepEqual(obj1, obj3)) // false
```

在上述示例中，`deepEqual`函数会递归比较两个对象的每个属性的值，包括嵌套的对象或数组。如果两个对象是相等的，则返回`true`，否则返回`false`。注意，该函数不会检查函数、正则表达式、日期等复杂类型的值。

## 根据 path 来解析数组，生成多维度的数组对象

请手写一个函数， 将下面的树形结构， 进行转换：

输入数据结构

```js
const data = [
  { id: 0, label: '测试 - 0', path: 'demo.info' },
  { id: 1, label: '测试 - 1', path: 'demo.info' },
  { id: 2, label: '测试 - 2', path: 'common.base' },
  { id: 3, label: '测试 - 3', path: 'common.base' },
  { id: 4, label: '测试 - 4', path: 'demo.info' },
  { id: 5, label: '测试 - 5', path: 'demo.info' },
  { id: 6, label: '测试 - 6', path: 'common' },
  { id: 7, label: '测试 - 7', path: 'common' },
  { id: 8, label: '测试 - 8', path: 'common.address' },
  { id: 9, label: '测试 - 9', path: 'common.address' },
  { id: 10, label: '测试 - 10', path: 'demo.info' },
  { id: 11, label: '测试 - 11', path: 'demo.sence' },
  { id: 12, label: '测试 - 12', path: 'demo.sence' },
  { id: 13, label: '测试 - 13', path: 'demo.hash' },
  { id: 14, label: '测试 - 14', path: 'demo.hash' },
  { id: 15, label: '测试 - 15', path: 'demo.hash' },
  { id: 16, label: '测试 - 16', path: 'demo' },
  { id: 17, label: '测试 - 17', path: 'demo' },
  { id: 18, label: '测试 - 18', path: 'demo.info' },
  { id: 19, label: '测试 - 19', path: 'demo.info' }
]
```

输出数据结构

```json
[
 {
 "value": "demo",
 "label": "Demo",
 "children": [
 {
 "value": "info",
 "label": "Info",
 "children": [
 {
 "value": 0,
 "label": "测试 - 0"
 },
 {
 "value": 1,
 "label": "测试 - 1"
 },
 {
 "value": 4,
 "label": "测试 - 4"
 },
 {
 "value": 5,
 "label": "测试 - 5"
 },
 {
 "value": 10,
 "label": "测试 - 10"
 },
 {
 "value": 18,
 "label": "测试 - 18"
 },
 {
 "value": 19,
 "label": "测试 - 19"
 }
 ]
 },
 {
 "value": "sence",
 "label": "Sence",
 "children": [
 {
 "value": 11,
 "label": "测试 - 11"
 },
 {
 "value": 12,
 "label": "测试 - 12"
 }
 ]
 },
 {
 "value": "hash",
 "label": "Hash",
 "children": [
 {
 "value": 13,
 "label": "测试 - 13"
 },
 {
 "value": 14,
 "label": "测试 - 14"
 },
 {
 "value": 15,
 "label": "测试 - 15"
 }
 ]
 },
 {
 "value": 16,
 "label": "测试 - 16"
 },
 {
 "value": 17,
 "label": "测试 - 17"
 }
 ]
 },
 {
 "value": "common",
 "label": "Common",
 "children": [
 {
 "value": "base",
 "label": "Base",
 "children": [
 {
 "value": 2,
 "label": "测试 - 2"
 },
 {
 "value": 3,
 "label": "测试 - 3"
 }
 ]
 },
 {
 "value": 6,
 "label": "测试 - 6"
 },
 {
 "value": 7,
 "label": "测试 - 7"
 },
 {
 "value": "address",
 "label": "Address",
 "children": [
 {
 "value": 8,
 "label": "测试 - 8"
 },
 {
 "value": 9,
 "label": "测试 - 9"
 }
 ]
 }
 ]
 }
]
```

**实现如下**：

```js
function convertToThreeDimensionalArray (data) {
  const result = []

  // Create a map to store the path hierarchy
  const pathMap = new Map()

  // Iterate through the data
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    const pathArr = item.path.split('.') // Split the path into an array of sub-paths

    let parent = result
    for (let j = 0; j < pathArr.length; j++) {
      const subPath = pathArr[j]

      // Check if the subPath exists in the parent
      let child = parent.find(obj => obj.value === subPath)

      if (!child) {
        // Create a new child object
        child = {
          value: subPath,
          label: capitalizeFirstLetter(subPath),
          children: []
        }

        // Add the child object to the parent
        parent.push(child)
      }

      // Update the parent to be the child's children array
      parent = child.children
    }

    // Add the item to the final child array
    parent.push({
      value: item.id,
      label: item.label
    })
  }

  return result
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const threeDimensionalArray = convertToThreeDimensionalArray(data)
console.log(threeDimensionalArray)
```

## 如何封装一个请求，让其多次调用的时候，实际只发起一个请求的时候，返回同一份结果 {#p1-sigleton-request}

最优解： **使用deferred思想来实现请求的等待队列，可以借助Promise和async/await语法**。

下面是使用`deferred`思想来实现的代码示例：

```js
class Deferred {
  constructor () {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
}

// 创建一个全局的锁标识
let lock = false

// 创建一个缓存对象
const cache = {}

// 创建一个等待队列数组
const waitingRequests = []

// 封装请求函数
async function request (url, params) {
  const cacheKey = `${url}-${JSON.stringify(params)}`

  // 判断锁的状态
  if (lock) {
    const deferred = new Deferred()
    // 如果锁已经被占用，将请求添加到等待队列中
    waitingRequests.push({
      deferred,
      cacheKey
    })
    await deferred.promise
    return cache[cacheKey]
  }

  // 设置锁的状态为true，表示当前请求正在执行
  lock = true

  try {
    // 发起实际的请求
    const response = await fetch(url, params)
    const data = await response.json()
    // 将结果存入缓存对象
    cache[cacheKey] = data
    return data
  } finally {
    // 释放锁，将锁的状态设置为false
    lock = false

    // 处理等待队列中的请求
    if (waitingRequests.length > 0) {
      const request = waitingRequests.shift()
      request.deferred.resolve(cache[request.cacheKey])
    }
  }
}

// 调用请求函数
request('https://api.example.com/data', { method: 'GET' })
  .then(data => {
    // 处理请求结果
    console.log(data)
  })

// 同时发起另一个请求
request('https://api.example.com/data', { method: 'GET' })
  .then(data => {
    // 直接从缓存中获取结果，而不发起实际的请求
    console.log(data)
  })
```

在上述代码中，`Deferred`类用于创建一个延迟对象，其中`promise`属性是一个`Promise`对象，`resolve`和`reject`方法分别用于解决和拒绝该延迟对象的`promise`。通过`await`关键字等待延迟对象的`promise`完成，当锁被占用时，将请求添加到等待队列中，并使用`await`等待对应的延迟对象的`promise`完成后再返回结果。当请求完成后，解锁并处理等待队列中的请求。

## 实现管道函数 {#p0-pipe}

管道函数是一种函数编程的概念，它可以将多个函数串联起来，将前一个函数的输出作为后一个函数的输入。以下是一个简单的实现示例：

```javascript
// 简化版的管道函数实现
function pipe (...fns) {
  return function (input) {
    return fns.reduce((output, fn) => fn(output), input)
  }
}

// 示例函数
function addOne (num) {
  return num + 1
}

function double (num) {
  return num2
}

function square (num) {
  return num2
}

// 创建一个管道函数
const myPipe = pipe(addOne, double, square)

// 使用管道函数进行计算
const result = myPipe(2) // 2 -> addOne -> 3 -> double -> 6 -> square -> 36

console.log(result) // 输出 36
```

在上述示例中，我们首先定义了三个简单的示例函数：addOne、double和square。然后，通过调用pipe函数，将这三个函数串联起来创建了一个管道函数myPipe。最后，我们可以通过调用myPipe函数并传入初始值2，得到最终的计算结果36。

在管道函数的实现中，使用了ES6的扩展运算符（...）和Array的reduce方法。reduce方法接受一个累加器函数和初始值，并将累加器函数应用于数组的每个元素，返回最终的累积结果。在这里，累加器函数将前一个函数的输出作为后一个函数的输入，从而实现了函数的串联。

## 模拟new操作 {#p0-simulate-new}

在js中new关键字主要做了：首先创建一个空对象，这个对象会作为执行new构造函数之后返回的对象实例，将创建的空对象原型`（__proto__）`指向构造函数的prototype属性，同时将这个空对象赋值给构造函数内部的this，并执行构造函数逻辑，根据构造函数的执行逻辑，返回初始创建的对象或构造函数的显式返回值。

```js
function newFn (...args) {
  const constructor = args.shift()
  const obj = Object.create(constructor.prototype)
  const result = constructor.apply(obj, args)
  return typeof result === 'object' && result !== null ? result : obj
}

function Person (name) {
  this.name = name
}

const p = newFn(Person, 'Jerome')

console.log('p.name :>> ', p.name) // p.name :>> Jerome
```

可以使用以下代码来模拟`new`操作：

```javascript
function myNew (constructor, ...args) {
  // 创建一个新对象，该对象继承自构造函数的原型
  const obj = Object.create(constructor.prototype)

  // 调用构造函数，并将新对象作为this值传递进去
  const result = constructor.apply(obj, args)

  // 如果构造函数返回一个对象，则返回该对象，否则返回新创建的对象
  return typeof result === 'object' && result !== null ? result : obj
}
```

使用示例：

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}

Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)
}

const john = myNew(Person, 'John', 25)
john.sayHello() // 输出：Hello, my name is John and I'm 25 years old.
```

在上述代码中，`myNew`函数模拟了`new`操作的过程：

1. 首先，通过`Object.create`创建了一个新对象`obj`，并将构造函数的原型对象赋值给该新对象的原型。
2. 然后，使用`apply`方法调用构造函数，并传入新对象`obj`作为`this`值，以及其他参数。
3. 最后，根据构造函数的返回值判断，如果返回的是一个非空对象，则返回该对象；否则，返回新创建的对象`obj`。

这样，我们就可以使用`myNew`函数来模拟`new`操作了。

## 手写实现 instanceof {#p0-instanceof}

instanceof 运算符用于检测一个对象是否是某个构造函数的实例。其作用是判断一个对象是否属于某个类（或其父类）的实例，类似于类的继承关系，如果是则返回 true，否则返回 false。通常情况下，用于判断一个对象的类型或类别。可以结合构造函数和原型链来理解。

示例代码：

```javascript
function Person (name) {
  this.name = name
}

const person = new Person('张三')
console.log(person instanceof Person) // Output: true
console.log(person instanceof Object) // Output: true
console.log(person instanceof Array) // Output: false
```

在上面的示例中，我们通过 `new` 关键字创建了一个 Person 类的实例 `person`。然后我们使用 `instanceof` 运算符检测 `person` 对象是否是 `Person` 类的实例，结果为 true。同样地，我们也可以检测 `person` 对象是否是 `Object` 类的实例，结果也为 true，因为 `Person` 类是 `Object` 类的子类。而 `Array` 类则是 `Object` 类的子类，但不是 `Person` 类的子类，因此检测 `person` 对象是否是 `Array` 类的实例，结果为 false。

**手写实现**

instanceof 运算符用于检测一个对象是否是某个构造函数的实例。可以通过以下方式手写实现 instanceof 运算符。

```javascript
function myInstanceof (obj, constructor) {
  let proto = Object.getPrototypeOf(obj)
  while (proto) {
    if (proto === constructor.prototype) {
      return true
    }
    proto = Object.getPrototypeOf(proto)
  }
  return false
}

// Example usage
const arr = [1, 2, 3]
console.log(myInstanceof(arr, Array)) // Output: true
console.log(myInstanceof(arr, Object)) // Output: true
console.log(myInstanceof(arr, RegExp)) // Output: false
```

该实现方式获取传入对象的原型对象，并逐层向上搜索其原型链，直到找到目标构造函数的原型对象或者原型链到达最顶层 Object.prototype。如果找到目标构造函数的原型对象，则返回 true，否则返回 false。

## 手写实现 Object.create {#p1-object-create}

Object.create() 方法可以用于创建一个新对象，使其原型与指定的对象完全相同。可以通过以下方式手写实现 Object.create() 方法。

```javascript
function createObject (proto) {
  function F () {}
  F.prototype = proto
  return new F()
}

// Example usage
const person = {
  firstName: 'John',
  lastName: 'Doe',
  fullName: function () {
    return this.firstName + ' ' + this.lastName
  }
}

const anotherPerson = createObject(person)
anotherPerson.firstName = 'Jane'
console.log(anotherPerson.fullName()) // Output: "Jane Doe"
```

该实现方式创建了一个名为 F 的空函数，将其原型设置为传入的 proto 对象，然后返回一个新创建的 F 函数对象。这个新对象的原型与传入的 proto 对象相同，从而实现了 Object.create() 的功能。

## 实现一个缓存函数 {#p0-cache}

用于创建一个带有缓存功能的函数。下面是一个简化版本的手写实现，展示了如何自己实现 `memoize` 函数：

```javascript
function memoize (func) {
  const cache = {}

  return function (...args) {
    const key = JSON.stringify(args)

    if (cache[key]) {
      return cache[key]
    }

    const result = func.apply(this, args)
    cache[key] = result

    return result
  }
}

// 示例用法
const expensiveFunction = memoize(function (n) {
  console.log('Computing...')
  return n2
})

console.log(expensiveFunction(5)) // 第一次调用，输出：Computing... 10
console.log(expensiveFunction(5)) // 第二次调用，直接从缓存中获取结果，输出：10
console.log(expensiveFunction(10)) // 新的参数，再次计算并缓存结果，输出：Computing... 20
console.log(expensiveFunction(10)) // 再次调用，直接从缓存中获取结果，输出：20
```

上述代码中的 `memoize` 函数接受一个函数 `func` 作为参数，并返回一个新的函数。返回的函数具有缓存的能力，即根据参数的不同缓存计算结果。

在返回的函数内部，首先将传入的参数 `args` 转换成一个唯一的字符串 `key`，以便作为缓存对象 `cache` 然后检查 `cache` 对象中是否存在对应的缓存结果，如果存在直接返回缓存结果，否则执行原始函数 `func` 并将结果缓存起来。

通过这种方式，对于相同的参数，后续的调用将直接从缓存中获取结果，而不会再次执行函数。这样可以避免重复计算，提高函数的性能。

在示例中，我们创建了一个名为 `expensiveFunction` 的函数，并使用 `memoize` 进行包装。第一次调用时，函数会执行计算，并输出 `"Computing..."`，结果为 10。第二次调用时，函数直接从缓存中获取结果，无需再次计算。最后两次调用分别使用了不同的参数，会触发新的计算并缓存结果。

需要注意的是，这个手写的 `memoize` 函数是一个简化版本，仅适用于参数为基本类型的情况。对于参数为复杂类型（如对象、数组等）的情况，需要使用更复杂的缓存键值生成方法，以确保正确的缓存行为。此外，实际的 Lodash 库中的 `memoize` 函数还提供了其他选项和功能，例如自定义缓存键生成函数、缓存过期时间等。

## 使用 Promise 实现一个异步流量控制的函数(限制并发数) {#p0-async-control}

**关键词**：异步流量控制的函数

下面是使用 Promise 实现异步流量控制的函数的示例：

```javascript
function asyncFlowControl (tasks, limit) {
  let runningCount = 0 // 当前正在运行的任务数
  let index = 0 // 当前执行的任务索引
  const results = [] // 存储任务的结果

  return new Promise((resolve, reject) => {
    function runTask () {
      if (runningCount >= limit || index >= tasks.length) {
        // 达到并发限制或所有任务已执行完毕，返回结果
        if (results.length === tasks.length) {
          resolve(results)
        }
        return
      }

      const task = tasks[index]
      const currentIndex = index // 保存当前任务索引

      index++
      runningCount++

      task().then((result) => {
        results[currentIndex] = result // 存储任务结果
        runningCount--
        runTask() // 递归执行下一个任务
      }).catch((error) => {
        reject(error)
      })

      runTask() // 递归执行下一个任务
    }

    runTask() // 开始执行任务
  })
}

// 示例用法
function asyncTask (value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(value)
      resolve(value)
    }, Math.random() * 1000)
  })
}

const tasks = [
  () => asyncTask(1),
  () => asyncTask(2),
  () => asyncTask(3),
  () => asyncTask(4),
  () => asyncTask(5)
]

asyncFlowControl(tasks, 2).then((results) => {
  console.log('All tasks completed:', results)
}).catch((error) => {
  console.error('Error occurred:', error)
})
```

以上示例中的 `asyncFlowControl` 函数接受一个任务数组 `tasks` 和一个并发限制 `limit`，它会按照并发限制逐个执行任务，并返回一个 Promise 对象。在示例中，任务数组中的每个任务都是一个返回 Promise 的函数，通过 `setTimeout` 模拟异步操作。

在执行过程中，`asyncFlowControl` 函数会维护一个 `runningCount` 变量来跟踪当前正在运行的任务数，并使用递归的方式执行任务。当达到并发限制或所有任务都已执行完毕时，函数会返回结果。

通过控制并发任务的数量，我们可以限制同时执行的异步操作，实现异步流量控制。在上述示例中，设置并发限制为 2，可以确保最多同时执行 2 个任务，并在任务执行完毕后再执行下一个任务。

## 手写 JSON.stringify 和 手写 JSON.parse 实现 {#p0-json-parser}

 手写`JSON.stringify`

`JSON.stringify` 是一个将 JavaScript 对象或值转换为 JSON 字符串的函数。下面是一个简化的实现，主要考虑以下几种类型：字符串、数字、布尔值、对象和数组。

```javascript
function jsonStringify (value) {
  const type = typeof value

  if (type === 'string') {
    return `"${value}"`
  }

  if (type === 'number' || type === 'boolean' || value === null) {
    return String(value)
  }

  if (type === 'object') {
    if (Array.isArray(value)) {
      const arrayItems = value.map((item) => jsonStringify(item)).join(',')
      return `[${arrayItems}]`
    } else {
      const objectKeys = Object.keys(value)
      const objectItems = objectKeys.map((key) => {
        const keyValue = jsonStringify(value[key])
        return keyValue !== undefined ? `"${key}":${keyValue}` : undefined
      }).filter((item) => item !== undefined).join(',')
      return `{${objectItems}}`
    }
  }

  return undefined // 这里省略了对函数、Symbol、循环引用等类型的处理
}

// 使用示例
const obj = {
  a: 'hello',
  b: 42,
  c: true,
  d: { e: 'world', f: [1, 2, 3] }
}

console.log(jsonStringify(obj)) // {"a":"hello","b":42,"c":true,"d":{"e":"world","f":[1,2,3]}}
```

请注意，这个实现有很多限制，适用于简单场景。它没有处理循环引用、函数、`Symbol` 类型等复杂情况。实际项目中，你还是应该使用内置的 `JSON.stringify` 函数。

 手写 `JSON.parse`

`JSON.parse` 是一个将 JSON 字符串转换为 JavaScript 对象或值的函数。手写一个简化版的 `JSON.parse` 可能不会涵盖所有的细节和兼容性问题，这里提供一个基于 JavaScript 的 eval 函数实现的简单版本。请注意，在实际项目中应使用原生的 `JSON.parse` 函数以保证安全性和性能。

```javascript
function jsonParse (jsonString) {
  // eslint-disable-next-line
  return eval('(' + jsonString + ')')
}

// 使用示例
const jsonString = '{"a": "hello", "b": 42, "c": true, "d": {"e": "world", "f": [1, 2, 3]}}'

console.log(jsonParse(jsonString))
/* 输出：
{
 a: "hello",
 b: 42,
 c: true,
 d: { e: "world", f: [1, 2, 3] },
}
*/
```

虽然使用 `eval` 函数能简单地实现 JSON 字符串的解析，但在实践过程中使用 `eval` 并不安全，因为它会执行任意字符串中包含的 JavaScript 代码。因此，强烈建议实际项目中使用 `JSON.parse` 和 `JSON.stringify` 函数。

## 如何将JavaScript代码解析成抽象语法树(AST) {#ast}

 如何将JavaScript代码解析成抽象语法树

要将JavaScript代码解析成抽象语法树（Abstract Syntax Tree，AST），你可以使用工具或库来实现。以下是几种常用的方法：

1. Esprima: Esprima 是一个流行的JavaScript解析器，它可以将JavaScript代码解析成AST。你可以使用它的 JavaScript API 来将代码解析成AST对象。

```javascript
const esprima = require('esprima')
const code = 'var x = 5;'
const ast = esprima.parseScript(code)
console.log(ast)
```

2. Acorn: Acorn 是另一个广泛使用的JavaScript解析器，它也可以将JavaScript代码解析成AST。你可以使用它的 JavaScript API 来解析代码并获取AST对象。

```javascript
const acorn = require('acorn')
const code = 'var x = 5;'
const ast = acorn.parse(code, { ecmaVersion: 2020 })
console.log(ast)
```

3. Babel: Babel 是一个功能强大的JavaScript编译器，它可以将代码转换为AST，并提供了丰富的插件系统，用于转换和操作AST。你可以使用 Babel 的 API 来解析代码并获取AST对象。

```javascript
const babelParser = require('@babel/parser')
const code = 'const x = 5;'
const ast = babelParser.parse(code, { sourceType: 'module' })
console.log(ast)
```

这些工具和库都可以将JavaScript代码解析成AST对象，从而使你能够对代码进行进一步的分析、转换或处理。你可以根据自己的需求选择其中之一，并根据其文档了解更多关于解析选项和AST节点的信息。

 JavaScript代码解析成抽象语法树的原理是什么

JavaScript代码解析成抽象语法树（Abstract Syntax Tree，AST）的过程涉及以下几个主要步骤：

1. 词法分析（Lexical Analysis）：词法分析器（Lexer）将源代码拆分成词法单元（tokens），比如变量名、关键字、操作符、标点符号等。它根据一组定义好的规则（词法规范）来识别和分类这些词法单元。

2. 语法分析（Syntax Analysis）：语法分析器（Parser）接收词法分析器生成的词法单元，并根据语法规则构建AST。语法分析器使用上下文无关文法（Context-Free Grammar）来定义语言的语法规则，它通过递归下降、LR(1) 等算法来处理这些规则，以确定输入是否符合语法规则并生成相应的AST。

3. 构建AST：在语法分析的过程中，语法分析器根据语法规则构建AST。AST是一个树状结构，其中每个节点表示源代码中的一个语法结构，如表达式、语句、函数等。不同节点类型代表不同的语法结构，它们之间通过父子关系和兄弟关系来表示源代码的层次结构和逻辑关联。

4. 后续处理：生成AST后，可以进行进一步的处理和分析。这可能包括语义分析、类型推断、符号解析、代码优化等。这些步骤可以根据具体的需求和工具进行。

总结：将JavaScript代码解析成AST的过程是通过词法分析器将源代码拆分成词法单元，然后语法分析器根据语法规则构建AST。AST提供了对代码结构的抽象表示，便于进一步分析、转换和操作代码。

## 如何做 promise 缓存？上一次调用函数的 promise 没有返回， 那么下一次调用函数依然返回上一个 promise {#p0-async-cache}

可以使用闭包实现 promise 缓存的功能。下面是一个示例代码：

```js
function cachedPromise (promiseFunction) {
  let lastPromise = null

  return function () {
    if (lastPromise !== null) {
      return lastPromise
    }

    lastPromise = promiseFunction()
    return lastPromise
  }
}

const promiseFunction = () => {
  // 这里可以是任何一个返回 Promise 的异步函数
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('Resolved!')
    }, 2000)
  })
}

const cachedPromiseFunction = cachedPromise(promiseFunction)

cachedPromiseFunction().then(result => {
  console.log(result) // Resolved!
})

// 因为上次调用函数的 Promise 还未 resolve，所以这里直接返回上次的 Promise
cachedPromiseFunction().then(result => {
  console.log(result) // Resolved!
})
```

在上面的代码中，我们先定义了一个 `cachedPromise` 函数，它接收一个返回 Promise 的异步函数 `promiseFunction`，并返回一个新的函数。这个新函数会维护一个 `lastPromise` 变量，用来记录上一次调用 `promiseFunction` 函数返回的 Promise。

当第一次调用 `cachedPromiseFunction` 时，`lastPromise` 变量还没有值，因此会调用 `promiseFunction`，并将返回的 Promise 赋值给 `lastPromise` 变量。同时，返回这个 Promise。

当第二次调用 `cachedPromiseFunction` 时，由于 `lastPromise` 变量已经被赋值，表示上一次调用 `promiseFunction` 返回的 Promise 还没有返回，因此直接返回 `lastPromise` 变量，而不再调用 `promiseFunction`。

当第一个 Promise 返回时，会将 `lastPromise` 重置为空，这样下一次调用 `cachedPromiseFunction` 就会重新执行 `promiseFunction`。

通过这种方式，我们就实现了 promise 缓存的功能，即如果上一次调用的 Promise 没有返回，那么下一次调用函数依然会返回上一个 Promise。

 如果上一次的函数调用 promise 已经返回，下一次调用就是一个新的 promise

修改上述的代码，让 `cachedPromise` 函数可以检测上一次的 Promise 是否已经完成，如果已经完成，则返回新的 Promise 对象。

下面是修改后的代码：

```
function cachedPromise(promiseFunction) {
 let lastPromise = null;
 
 return function() {
 if (lastPromise !== null) {
 if (lastPromise.isFulfilled()) { // 如果上一次 Promise 已经完成
 lastPromise = null; // 重置上一次 Promise
 } else {
 return lastPromise; // 直接返回上一次 Promise
 }
 }
 
 lastPromise = promiseFunction();
 return lastPromise;
 }
}

const promiseFunction = () => {
 // 这里可以是任何一个返回 Promise 的异步函数
 return new Promise(resolve => {
 setTimeout(() => {
 resolve('Resolved!');
 }, 2000)
 })
}

const cachedPromiseFunction = cachedPromise(promiseFunction);

cachedPromiseFunction().then(result => {
 console.log(result); // Resolved!
});

// 因为上次调用函数的 Promise 还未 resolve，所以这里直接返回上次的 Promise
cachedPromiseFunction().then(result => {
 console.log(result); // Resolved!
});

setTimeout(() => {
 // 上一次 Promise 已经完成，这里会返回新的 Promise 对象
 cachedPromiseFunction().then(result => {
 console.log(result); // Resolved!
 });
}, 3000);
```

在这段代码中，我们在闭包函数中判断上一次的 Promise 是否已经完成，如果已经完成，则将其重置为空，在下一次调用时会再次执行 `promiseFunction`，并返回新的 Promise 对象。

请注意，由于 `lastPromise` 变量被修改了，我们使用了一个名为 `isFulfilled()` 的方法来检测 Promise 是否已经完成。这个方法可以使用任何一个符合 Promises/A+ 规范的 Promise 库（如 bluebird.js）来实现。如果你使用的是原生的 Promise 对象，可以使用 `then()` 方法代替 `isFulfilled()`，如下所示：

```
if (typeof lastPromise.then !== 'function') {
 lastPromise = null; // 重置上一次 Promise
} else {
 return lastPromise; // 直接返回上一次 Promise
}
```

这样，我们就实现了一个可以检测 Promise 完成状态的 promise 缓存函数。

## 数字千分化的实现方式有哪些？用代码实现一下 {#p0-thousnad}

数字千分化是指将数字按照千位分隔符进行分割，使其更容易被人类阅读。在 JavaScript 中，可以通过多种方式实现数字千分化，以下是其中的几种方式：

1. 使用正则表达式

```javascript
function formatNumber (num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

console.log(formatNumber(123456789)) // 输出 123,456,789
```

2. 使用 Intl.NumberFormat

```javascript
function formatNumber (num) {
  return new Intl.NumberFormat().format(num)
}

console.log(formatNumber(123456789)) // 输出 123,456,789（在大多数环境中）
```

3. 使用自带千分位分隔符的 toLocaleString

```javascript
function formatNumber (num) {
  return num.toLocaleString()
}

console.log(formatNumber(123456789)) // 输出 123,456,789（在大多数环境中）
```

这些方法都可以实现数字千分化，具体选择哪种方法，可以根据实际需求和代码环境进行选择。

## 集合运算 {#p0-set-operation}

可以使用 ES6 的 Set 数据结构来实现数组交集。

首先，将一个数组转化为 Set，然后遍历另一个数组，将数组中存在于 Set 中的元素存入结果数组中。

以下是一个示例代码：

```javascript
function intersection (nums1, nums2) {
  const set1 = new Set(nums1)
  const res = []

  for (const num of nums2) {
    if (set1.has(num)) {
      res.push(num)
    }
  }

  return res
}
```

使用示例：

```javascript
const nums1 = [1, 2, 2, 1]
const nums2 = [2, 2]

console.log(intersection(nums1, nums2)) // [2]
```

该算法的时间复杂度为 O(m+n)，其中 m 和 n 分别为两个数组的长度。

## chain-call {#p0-call-chain}

可以通过在 Number 原型上定义 add 和 minus 方法来实现该功能，代码如下：

```javascript
// eslint-disable-next-line
Number.prototype.add = function (num) {
  return this + num
}
// eslint-disable-next-line
Number.prototype.minus = function (num) {
  return this - num
}

console.log((5).add(3).minus(2)) // 输出6
```

上述代码中，通过在 Number.prototype 上定义 add 和 minus 方法，实现了将数字类型的值转换为 Number 对象，并且可以链式调用这两个方法。最终返回的结果是一个数值类型的值。

## this指向与对象继承数组方法：输出以下代码执行的结果并解释为什么？ {#p0-this-call}

```js
const obj = {
  2: 3,
  3: 4,
  length: 2,
  splice: Array.prototype.splice,
  push: Array.prototype.push
}
obj.push(1)
obj.push(2)
console.log(obj)
```

执行结果如何， 为什么？

 执行结果

代码的执行结果是：

```perl
perlCopy code{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }
```

在代码中，我们创建了一个名为 `obj` 的对象，它包含了一些属性和方法：

* `2` 和 `3` 是对象的属性名，对应的属性值分别为 `3` 和 `4`。
* `length` 属性的值为 `2`。
* `splice` 和 `push` 是对象的两个方法，它们均继承自 `Array.prototype`。

接下来，我们先调用了 `obj.push(1)` 方法，将值 `1` 加入到了 `obj` 对象中，此时 `obj` 对象的状态如下所示：

```perl
perlCopy code{ '2': 1, '3': 4, length: 3, splice: [Function: splice], push: [Function: push] }
```

接着，我们又调用了 `obj.push(2)` 方法，将值 `2` 加入到了 `obj` 对象中，此时 `obj` 对象的状态如下所示：

```perl
perlCopy code{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }
```

可以看出，`obj` 对象的属性值发生了变化。这是因为在调用 `obj.push(1)` 方法时，由于 `obj` 对象继承了 `Array.prototype.push` 方法，因此 `push` 方法中的 `this` 指向的是 `obj` 对象本身，因此将值 `1` 加入到了 `obj` 对象的第二个属性位置上（即 `obj[2] = 1`）。而在调用 `obj.push(2)` 方法时，`push` 方法同样将值 `2` 加入到了 `obj` 对象的第三个属性位置上（即 `obj[3] = 2`）。因此最终得到的 `obj` 对象的状态为 `{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }`。

 追问：上面的代码中 obj.push(1)， 为什么会加入到第二个属性位置上？

在 JavaScript 中，数组是一种特殊的对象，其属性名是非负整数，称之为索引(index)，因此可以通过数组语法来访问这些属性。另外，对于非数组对象，其属性名可以是任意字符串。

在给数组对象添加属性时，如果属性名是非负整数，那么会被当作数组元素，会自动维护 `length` 属性；如果属性名是其他字符串，那么则被当作普通的对象属性。

根据这个规则，上述代码中的 `obj` 对象添加了两个属性 `2: 3` 和 `3: 4`，它们的属性名都是非负整数，因此被当作数组元素，被计入了 `length` 属性。而在执行 `obj.push(1)` 时，会向数组中添加一个新的元素，该元素的下标是数组的 `length` 属性值，也就是 `2`，因此添加到了第二个属性位置上。接着执行 `obj.push(2)` 时，同样会向数组中添加一个新的元素，该元素的下标是 `3`，也就是数组的第三个属性位置上。

最终，输出结果为：

```perl
perlCopy code{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }
```

其中，属性 `2` 和 `3` 被分别赋值为 `1` 和 `2`，而原来的值被覆盖了。因此，最终的结果是 `{ '2': 1, '3': 2, length: 4, splice: [Function: splice], push: [Function: push] }`。

## =下面代码中 a 在什么情况下会打印 1 ? {#p0-a}

```js
// eslint-disable-next-line
var a = '?';
// eslint-disable-next-line
if (a == 1 && a == 2 && a == 3) {
  console.log(1)
}
```

 回答

这是一个经典的面试题，可以通过重写 `valueOf` 或者 `toString` 方法来实现，在这些方法中动态返回变量 a 的值，以满足条件。例如：

```js
const a = {
  i: 1,
  toString: function () {
    return this.i++
  }
}
if (a == 1 && a == 2 && a == 3) {
  console.log(1)
}
```

在这个例子中，`a` 被定义为一个对象，有一个属性 `i` 初始化为 1，同时重写了 `toString` 方法，在每次调用时返回 `i` 的值，并且每次返回后将 `i` 自增。这样在比较 `a` 是否等于 1、2、3 的时候，会依次调用 `a.toString()` 方法，得到的结果就是满足条件的 1，依次打印出来。

## 手写订阅-发布模式 {#p0-subsribe-publish}

观察者模式（又称发布-订阅模式）是一种行为型设计模式，它定义了对象之间的一对多依赖关系，使得当一个对象的状态发生改变时，其相关的依赖对象都能够得到通知并被自动更新。

在 JavaScript 中实现观察者模式，可以分为以下几个步骤：

1. 创建一个主题对象（Subject），用来存储观察者对象，并提供添加、删除、通知观察者的接口。

2. 创建观察者对象（Observer），它有一个 update 方法，用来接收主题对象的通知，并进行相应的处理。

下面是一个简单的示例：

```javascript
class Subject {
  constructor () {
    this.observers = []
  }

  // 添加观察者
  addObserver (observer) {
    this.observers.push(observer)
  }

  // 删除观察者
  removeObserver (observer) {
    const index = this.observers.indexOf(observer)
    if (index !== -1) {
      this.observers.splice(index, 1)
    }
  }

  // 通知观察者
  notifyObservers () {
    this.observers.forEach(observer => observer.update())
  }
}

class Observer {
  constructor (name) {
    this.name = name
  }

  update () {
    console.log(`${this.name} received the notification.`)
  }
}

const subject = new Subject()
const observer1 = new Observer('Observer 1')
const observer2 = new Observer('Observer 2')

subject.addObserver(observer1)
subject.addObserver(observer2)

subject.notifyObservers()
// Output:
// Observer 1 received the notification.
// Observer 2 received the notification.
```

在这个示例中，Subject 是主题对象，Observer 是观察者对象。Subject 提供了添加、删除、通知观察者的接口，Observer 有一个 update 方法，用来接收主题对象的通知，并进行相应的处理。在使用时，我们可以通过调用 Subject 的 addObserver 方法，将 Observer 对象添加到主题对象中。当主题对象的状态发生改变时，我们可以调用 notifyObservers 方法，通知所有的观察者对象进行更新。

以上仅是一个简单的示例，实际应用中还需要考虑更多的细节问题。

订阅-发布模式是一种常用的设计模式，它可以实现对象间的解耦，让它们不需要相互知道对方的存在，只需要关注自己需要订阅的事件即可。当一个对象的状态发生变化时，它可以发布一个事件通知其他对象，其他对象可以订阅该事件，当事件发生时得到通知并执行相应的处理。

在 JavaScript 中，订阅-发布模式也被称为事件模型。事件模型由两个主要组件组成：事件触发器和事件监听器。事件触发器负责触发事件，而事件监听器则负责监听事件并执行相应的回调函数。

下面是一个简单的实现订阅-发布模式的例子：

```javascript
class EventEmitter {
  constructor () {
    this._events = {}
  }

  on (event, listener) {
    if (!this._events[event]) {
      this._events[event] = []
    }
    this._events[event].push(listener)
  }

  emit (event, ...args) {
    if (this._events[event]) {
      this._events[event].forEach((listener) => listener(...args))
    }
  }

  off (event, listener) {
    if (this._events[event]) {
      this._events[event] = this._events[event].filter((l) => l !== listener)
    }
  }
}
```

这个实现包括三个方法：

* `on(event, listener)`：订阅事件，当事件被触发时执行监听器 `listener`；
* `emit(event, ...args)`：触发事件，并将参数 `...args` 传递给监听器；
* `off(event, listener)`：取消订阅事件，不再执行监听器 `listener`。

使用方法如下：

```javascript
const emitter = new EventEmitter()

// 订阅事件
emitter.on('event', (arg1, arg2) => {
  console.log(`event: ${arg1}, ${arg2}`)
})

// 触发事件
emitter.emit('event', 'hello', 'world')

// 取消订阅事件
emitter.off('event')
```

以上代码将输出：

```csharp
csharpCopy codeevent: hello, world
```

订阅-发布模式在事件驱动的系统中非常常见，例如浏览器中的 DOM 事件、Node.js 中的异步 IO 事件等。

观察者模式和订阅-发布模式都属于事件模型，它们都是为了解耦合而存在，但是它们之间还是有一些不同之处的：

1. 观察者模式中，主题（被观察者）和观察者之间是直接联系的，观察者订阅主题，主题状态发生变化时会直接通知观察者；而订阅-发布模式中，发布者和订阅者之间没有直接的联系，发布者发布消息到消息中心，订阅者从消息中心订阅消息。

2. 在观察者模式中，主题和观察者是一对多的关系，一个主题可以有多个观察者，而在订阅-发布模式中，发布者和订阅者是多对多的关系，一个发布者可以有多个订阅者，一个订阅者也可以订阅多个发布者。

3. 在观察者模式中，主题状态发生变化时，观察者会被直接通知，通知的方式可以是同步或异步的，观察者可以决定如何处理通知；而在订阅-发布模式中，消息是通过消息中心进行传递的，订阅者从消息中心订阅消息，发布者发布消息到消息中心，消息中心再将消息发送给订阅者，这个过程是异步的，订阅者不能决定何时接收消息。

4. 在观察者模式中，主题和观察者之间存在强耦合关系，如果一个观察者被移除，主题需要知道这个观察者的身份；而在订阅-发布模式中，发布者和订阅者之间没有强耦合关系，发布者不需要知道订阅者的身份，订阅者也不需要知道发布者的身份。

综上所述，观察者模式和订阅-发布模式都是事件模型，但它们之间的区别在于关注点的不同，观察者模式更关注主题和观察者之间的交互，而订阅-发布模式更关注发布者和订阅者之间的交互。

## ['1', '2', '3'].map(parseInt) 结果是啥，为什么？

执行 `['1', '2', '3'].map(parseInt)` 会得到 `[1, NaN, NaN]`，这个结果可能和人们预期的不一样。

这是因为 `map` 方法会传入三个参数：当前遍历到的元素、当前遍历到的索引、原数组本身。而 `parseInt` 函数则接受两个参数：需要被解析的值、用于解析的进制数。在执行 `['1', '2', '3'].map(parseInt)` 时，实际传入 `parseInt` 的参数如下：

* `'1'`、`0`（表示解析为十进制）：解析后得到数字 `1`。
* `'2'`、`1`（表示解析为一进制）：解析后得到 `NaN`。
* `'3'`、`2`（表示解析为二进制）：解析后得到 `NaN`。

所以结果为 `[1, NaN, NaN]`。
