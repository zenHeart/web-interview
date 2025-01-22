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
.then(response => {
 const endTime = performance.now();
 const duration = endTime - startTime;
 console.log(`Request took ${duration} milliseconds.`);
 return response;
 })
.catch(error => {
 const endTime = performance.now();
 const duration = endTime - startTime;
 console.log(`Request took ${duration} milliseconds with error: ${error}`);
 });
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
 
 console.log(person.hasOwnProperty('age')) // true，说明 age 属性是对象本身的属性
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
function shuffleArray(array) {
 for (let i = array.length - 1; i > 0; i--) {
 const j = Math.floor(Math.random() issues_data.csv proCollectionInterviewQuesiont.sh (i + 1));
 [array[i], array[j]] = [array[j], array[i]];
 }
 return array;
}

const array = [1, 2, 3, 4, 5];

const shuffledArray = shuffleArray(array);

console.log(shuffledArray);
```

在这个例子中，定义了一个`shuffleArray`函数，该函数使用 Fisher-Yates 洗牌算法随机打乱输入的数组，并返回打乱后的数组。
