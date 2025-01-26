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
````
