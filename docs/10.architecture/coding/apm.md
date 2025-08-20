
## 如何做好前端监控方案 {#p2-monitor}

**错误分类**：即时运行错误（代码错误）、资源加载错误

 错误的捕获方式

**即时运行错误:**
try...catch  
window.onerror

**资源加载错误:**
1)、object.onerror  
2)、performance.getEntries()
3)、Error事件捕获
performance.getEntries()这个是可以获取到所有的家已经加载的资源

Error事件捕获使用方式:

```js
window.addEventListener('error', function (e) {
  console.log('捕获', e)
}, true)
```

跨域是可以捕获的:
1）、在script标签添加crossorigin属性
2)、在js响应头添加Access-Control-Allow-Origin:*;

上报错误：ajax通信方式上报、通过Image对象上报,非常简单
(new Image()).src='[资料](http://baidu.com/test/sdflijsd?=sdlfkj)';

> 作者推荐可以直接参考下面这个文章就好了， 写的挺不错的。
> [资料](https://juejin.cn/post/7285608128040206391)

作者在这里， 对上面的文章进行一下简单的总结

**全文总结：**
Web 前端监控的方案，包括前端监控的意义、内容、形式、总体方案设计、监控指标、前端埋点方案、上报逻辑、监控数据存储、管理平台展示、报警通知、优化整改等方面。

**重要：**

* **前端监控的意义**：如同城市探头，实时监测保证系统稳定高效，为业务赋能获取更多用户。能够快速解决用户线上问题、用户性能问题；给予产品决策提供数据支撑。
* **2-5-8 原则**：阐述不同响应时间用户的感受和可能的行为。
* **监控的内容**：包括用户行为程序异常、运行性能。
* **监控的形式**：分为主动和被动监控。
* **总体方案设计**：涵盖页面埋点、数据上报、后台存储、汇总统计、报警展示、优化整改等环节。
* **监控指标**：性能指标如 FP、FCP、FMP 等以及 Google Web Vitals 中的 LCP、FID、CLS 等，还有用户指标如 UV、PV 等。
* **前端埋点方案**：介绍了写死在业务代码、全量埋点、动态埋点三种方式，推荐动态埋点。
* **上报逻辑**：ajax、fetch 上报、image 上报、jsonp 上报、sendBeacon 上报，推荐 sendBeacon 上报。
* **监控数据的存储**：可存于 Hadoop 大数据平台、MySQL 关系数据库、NoSQL 存储。
* **管理平台展示**：包括注册和管理业务项目、查看监控数据、配置监控规则和阈值。
* **报警通知**：通过定时任务读取配置表，根据规则查询数据，有多种通知形式。
* **优化整改**：针对性能不达标和用户留存低提出多种措施。

制定监控的核心指标，包括：
性能指标：如加载耗时，Web Vitals 定义了 LCP、FID、CLS 等指标
错误指标：如加载成功率、JS 错误率、白屏频率、接口请求成功率等
拆解指标为点位，基于 Sentry 或其它监控系统上报数据
具备单点追查能力，点位具备足够的公共参数（上下文），通过 trace 或 logID 跟踪点位之间的关系，同时注意不能有敏感信息
建立数据看板及配置报警规则

 前端日志埋点 SDK 设计思路

既然涉及到了日志和埋点，分析一下需求是啥：

* 自动化上报 页面 PV、UV。 如果能自动化上报页面性能， 用户点击路径行为，就更好了。
* 自动上报页面异常。
* 发送埋点信息的时候， 不影响性能， 不阻碍页面主流程加载和请求发送。
* 能够自定义日志发送， 日志 scope、key、value。

 SDK 设计

sdk 的设计主要围绕以下几个话题来进行：

* SDK 初始化
* 数据发送
* 自定义错误上报
* 初始化错误监控
* 自定义日志上报

**最基本使用**

```tsx
import StatisticSDK from 'StatisticSDK'
// 全局初始化一次
window.insSDK = new StatisticSDK('uuid-12345')

// <button onClick={() => {
//   window.insSDK.event('click', 'confirm')
//  // ...// 其他业务代码
// }}>
// 确认
// </button>
```

 数据发送

数据发送是一个最基础的api，后面的功能都要基于此进行。这里介绍使用 `navigator.sendBeacon` 来发送请求；具体原因如下

使用 `navigator.sendBeacon()` 方法有以下优势：

1. 异步操作：`navigator.sendBeacon()` 方法会在后台异步地发送数据，不会阻塞页面的其他操作。这意味着即使页面正在卸载或关闭，该方法也可以继续发送数据，确保数据的可靠性。

2. 高可靠性：`navigator.sendBeacon()` 方法会尽可能地保证数据的传输成功。它使用浏览器内部机制进行发送，具有更高的可靠性和稳定性。即使在网络连接不稳定或断开的情况下，该方法也会尝试发送数据，确保数据的完整性。

3. 自动化处理：`navigator.sendBeacon()` 方法会自动处理数据的发送细节，无需手动设置请求头、响应处理等。它会将数据封装成 POST 请求，并自动设置请求头和数据编码，使开发者能够更专注于业务逻辑的处理。

4. 跨域支持：`navigator.sendBeacon()` 方法支持跨域发送数据。在一些情况下，例如使用第三方统计服务等，可能需要将数据发送到其他域名下的服务器，此时使用 `navigator.sendBeacon()`
 方法可以避免跨域问题。

需要注意的是，`navigator.sendBeacon()` 方法发送的数据是以 POST 请求的形式发送到服务器，通常会将数据以表单数据或 JSON 格式进行封装。因此，后端服务器需要正确处理这些数据，并进行相应的解析和处理。

**简单介绍一下 `navigator.sendBeacon` 用法**

语法：

```js
navigator.sendBeacon(url)
navigator.sendBeacon(url, data)
```

参数

* url
* url 参数表明 data 将要被发送到的网络地址。

* data 可选
* data 参数是将要发送的 `ArrayBuffer、ArrayBufferView、Blob、DOMString、FormData 或 URLSearchParams` 类型的数据。

**发送代码实现如下**

```js
class StatisticSDK {
  constructor (productID, baseURL) {
    this.productID = productID
    this.baseURL = baseURL
  }

  send (query = {}) {
    query.productID = this.productID

    const data = new URLSearchParams()
    for (const [key, value] of Object.entries(query)) {
      data.append(key, value)
    }
    navigator.sendBeacon(this.baseURL, data)
  }
}
```

 用户行为与日志上报

用户行为主要涉及到的是事件上报和 pv 曝光， 借助 send 实现即可。

```js
class StatisticSDK {
  constructor (productID, baseURL) {
    this.productID = productID
    this.baseURL = baseURL
  }

  send (query = {}) {
    query.productID = this.productID

    const data = new URLSearchParams()
    for (const [key, value] of Object.entries(query)) {
      data.append(key, value)
    }
    navigator.sendBeacon(this.baseURL, data)
  }

  event (key, value = {}) {
    this.send({ event: key, ...value })
  }

  pv () {
    this.event('pv')
  }
}
```

 性能上报

性能主要涉及的 api 为 performance.timing 里面的时间内容；

```js
class StatisticSDK {
  constructor (productID, baseURL) {
    this.productID = productID
    this.baseURL = baseURL
  }

  send (query = {}) {
    query.productID = this.productID

    const data = new URLSearchParams()
    for (const [key, value] of Object.entries(query)) {
      data.append(key, value)
    }
    navigator.sendBeacon(this.baseURL, data)
  }

  // ....
  initPerformance () {
    this.send({ event: 'performance', ...performance.timing })
  }
}
```

 错误上报

错误上报分两类：

一个是 dom 操作错误与 JS 错误报警， 也是常说的运行时报错。 该类报错直接可以通过 `addEventListener('error')` 监控即可；

另一个是Promise内部抛出的错误是无法被error捕获到的，这时需要用`unhandledrejection`事件。

```js
class StatisticSDK {
  constructor (productID, baseURL) {
    this.productID = productID
    this.baseURL = baseURL
  }

  send (query = {}) {
    query.productID = this.productID

    const data = new URLSearchParams()
    for (const [key, value] of Object.entries(query)) {
      data.append(key, value)
    }
    navigator.sendBeacon(this.baseURL, data)
  }

  // ....
  error (err, errInfo = {}) {
    const { message, stack } = err
    this.send({ event: 'error', message, stack, ...errInfo })
  }

  initErrorListenner () {
    window.addEventListener('error', event => {
      this.error(error)
    })
    window.addEventListener('unhandledrejection', event => {
      this.error(new Error(event.reason), { type: 'unhandledrejection' })
    })
  }
}
```

 React 和 vue 错误边界

错误边界是希望当应用内部发生渲染错误时，不会整个页面崩溃。我们提前给它设置一个兜底组件，并且可以细化粒度，只有发生错误的部分被替换成这个「兜底组件」，不至于整个页面都不能正常工作。

**React**

可以使用类组件错误边界来进行处理， 涉及到的生命周期为：`getDerivedStateFromError` 和 `componentDidCatch`；

```js
// 定义错误边界
class ErrorBoundary extends React.Component {

  //   state = { error: null }
  static getDerivedStateFromError (error) {
    return { error }
  }

  componentDidCatch (error, errorInfo) {
    // 调用我们实现的SDK实例
    insSDK.error(error, errorInfo)
  }

  render () {
    if (this.state.error) {
      return <h2>Something went wrong.</h2>
    }
    return this.props.children
  }
}

<ErrorBoundary>
 <BuggyCounter />
</ErrorBoundary>
```

**Vue**

vue也有一个类似的生命周期来做这件事：`errorCaptured`

```js
Vue.component('ErrorBoundary', {
  data: () => ({ error: null }),
  errorCaptured (err, vm, info) {
    this.error = `${err.stack}\n\nfound in ${info} of component`
    // 调用我们的SDK，上报错误信息
    insSDK.error(err, info)
    return false
  },
  render (h) {
    if (this.error) {
      return h('pre', { style: { color: 'red' } }, this.error)
    }
    return this.$slots.default[0]
  }
})
```

 参考文档

[资料](https://juejin.cn/post/7085679511290773534)

 首先我们要知道有哪些方式可以统计前端请求耗时

从代码层面上统计全站所有请求的耗时方式主要有以下几种：

1. Performance API：Performance API 是浏览器提供的一组 API，可以用于测量网页性能。通过 Performance API，可以获取页面各个阶段的时间、资源加载时间等。其中，Performance Timing API 可以获取到每个资源的加载时间，从而计算出所有请求的耗时。

2. XMLHttpRequest 的 load 事件：在发送 XMLHttpRequest 请求时，可以为其添加 load 事件，在请求完成时执行回调函数，从而记录请求的耗时。

3. fetch 的 Performance API：类似 XMLHttpRequest，fetch 也提供了 Performance API，可以通过 Performance API 获取请求耗时。

4. 自定义封装的请求函数：可以自己封装一个请求函数，在请求开始和结束时记录时间，从而计算请求耗时。

 设计一套前端全站请求耗时统计工具

可以遵循以下步骤：

1. 实现一个性能监控模块，用于记录每个请求的开始时间和结束时间，并计算耗时。

2. 在应用入口处引入该模块，将每个请求的开始时间记录下来。

3. 在每个请求的响应拦截器中，记录响应结束时间，并计算请求耗时。

4. 将每个请求的耗时信息发送到服务端，以便进行进一步的统计和分析。

5. 在服务端实现数据存储和展示，可以使用图表等方式展示请求耗时情况。

6. 对于请求耗时较长的接口，可以进行优化和分析，如使用缓存、使用异步加载、优化查询语句等。

7. 在前端应用中可以提供开关，允许用户自主开启和关闭全站请求耗时统计功能。

以下是一个简单的实现示例：

```js
// performance.js

const performance = {
  timings: {},
  config: {
    reportUrl: '/report'
  },
  init () {
    // 监听所有请求的开始时间
    window.addEventListener('fetchStart', (event) => {
      this.timings[event.detail.id] = {
        startTime: Date.now()
      }
    })

    // 监听所有请求的结束时间，并计算请求耗时
    window.addEventListener('fetchEnd', (event) => {
      const id = event.detail.id
      if (this.timings[id]) {
        const timing = this.timings[id]
        timing.endTime = Date.now()
        timing.duration = timing.endTime - timing.startTime

        // 将耗时信息发送到服务端
        const reportData = {
          url: event.detail.url,
          method: event.detail.method,
          duration: timing.duration
        }
        this.report(reportData)
      }
    })
  },
  report (data) {
    // 将耗时信息发送到服务端
    const xhr = new XMLHttpRequest()
    xhr.open('POST', this.config.reportUrl)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.send(JSON.stringify(data))
  }
}

export default performance
```

在应用入口处引入该模块：

```js
// main.js

import performance from './performance'

performance.init()
```

在每个请求的响应拦截器中触发 `fetchEnd` 事件：

```js
// fetch.js

import EventBus from './EventBus'

const fetch = (url, options) => {
  const id = Math.random().toString(36).slice(2)
  const fetchStartEvent = new CustomEvent('fetchStart', {
    detail: {
      id,
      url,
      method: options.method || 'GET'
    }
  })
  EventBus.dispatchEvent(fetchStartEvent)

  return window.fetch(url, options)
    .then((response) => {
      const fetchEndEvent = new CustomEvent('fetchEnd', {
        detail: {
          id,
          url,
          method: options.method || 'GET'
        }
      })
      EventBus.dispatchEvent(fetchEndEvent)

      return response
    })
}

export default fetch
```

在服务端实现数据存储和展示，可以使用图表等方式展示请求耗
