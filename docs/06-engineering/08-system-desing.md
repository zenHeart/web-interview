
# 系统设计

## 短链系统

短地址设计,进一步采用 LRU 实现短地址替换功能

## 如何做好前端监控方案 {#p2-monitor}

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

## 技术选型上有一些什么标准 {#p3}

> 作者推荐一下五个标准，适用于编程语言、框架、大小工具库 等方向

* 可控性
* 稳定性
* 适用性
* 易用性
* 唯一性

当然，以下是对你提出的五个前端技术选型原则的详细描述：

1. **可控性**：

* **定义**：选择的技术应该使团队能够对产品的开发过程有充分的控制，包括代码质量、部署流程、性能优化和错误处理等方面。
* **细节**：
* 允许定制化和扩展：技术栈应该支持自定义功能，以满足特定业务需求。
* 易于维护：代码库应该易于维护和升级，方便团队应对长远的技术演进。
* 开放源代码或支持社区：最好选择有活跃社区支持的开源技术，以便在遇到问题时可以获得帮助。
* 文档和工具：有充分的文档和开发工具，帮助团队理解并控制技术实现。
*

2. **稳定性**：

* **定义**：选用的技术需要稳固可靠，拥有良好的社区支持和持续的发展。
* **细节**：
* 成熟度：技术应该是经过时间检验，市场验证的成熟解决方案。
* 庞大的用户基础：广泛的用户和使用案例保证了技术的稳定性和可靠性。
* 正式的版本管理：应该有一个清晰的版本管理政策，以及频繁可靠的更新和安全补丁。
* 抗脆弱性：即使在意外情况下也能表现出良好的弹性和错误恢复能力。

3. **适用性**：

* **定义**：技术选择应该针对特定项目的需求和团队的技能水平。
* **细节**：
* 业务需求匹配：选用的技术应能高效解决实际业务问题，并支持业务即将来临的挑战。
* 团队的技能和经验：需要考量团队成员对技术栈的熟悉程度，以便能快速有效地产生结果。
* 开发周期： 要考虑该技术是否能够在开发周期类完成对应需求开发。

4. **易用性**：

* **定义**：技术应该简单易懂，易于团队成员学习和使用。
* **细节**：
* 学习曲线：技术栈的学习曲线不应过于陡峭，以免增加新团队成员的入职门槛。
* 开发效率：提供良好的开发体验，如源代码清晰、API 简洁、丰富的开发工具。
* 调试和测试：应包含易于进行故障排除、调试和测试的工具或功能。
* 文档和学习资源：应有良好、全面的文档和在线学习资源助于团队成员快速上手。

5. **唯一性**：

* **定义**：确保在项目开发过程中， 同一个类型的问题解决方向只选用一个技术体系。
* **细节**：
* 避免同类型库重复：选择最适合特定用例的工具和库，避免在项目中引入重复功能的库。

在选择前端技术栈时，这些原则可以帮助团队做出更符合项目需求、更利于长期维护和开发效率的决策。需要注意的是，这些原则并不是孤立的，他们之间相互影响，有时候在某些方面需要妥协以满足其他更为重要的需求。

## 如何从 0 到 1 搭建前端基建 {#p1-base-constructure}

如何从 0 到 1 搭建前端基建

有一个非常经典的文章， 直接参考即可： [非大厂的我们，要如何去搞前端基建?](https://juejin.cn/post/7144881028661723167)

这里简单总结一下文章里面的要点

 1.什么是基建？

![01](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a1bf7ac7a6040c1b8cabb5e2c72ff65~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

 2.为什么要做前端基建？

业务复用；
提升研发效率；
规范研发流程；
团队技术提升；
团队的技术影响力；
开源建设；

 3.前端基建如何推动落地？

* 要合适的同学（资源）
* 要解决的问题（问题）
* 要解决问题方案计划书（方案）
* 要具体执行的步骤（执行）

**技术基建四大特性（切记）**

* 技术的健全性
* 基建的稳定性
* 研发的效率性
* 业务的体验性

 4.前端基建都有什么？

* 前端规范（Standard）
* 前端文档（Document）
* 前端项目模板管理（Templates）
* 前端脚手架（CLI）
* 前端组件库（UI Design）
* 前端响应式设计 or 自适应设计
* 前端工具库（类 Hooks / Utils）
* 前端工具自动化（Tools）
* 接口数据聚合（BFF）
* 前端 SSR 推进
* 前端自动化构建部署（CI/CD）
* 全链路前端监控/数据埋点系统
* 前端可视化平台
* 前端性能优化
* 前端低代码平台搭建
* 微前端（Micro App）

## 单点登录是如何实现的？ {#p1-single-login}

## 533 单点登录是什么， 具体流程是什么【热度: 1,168】

SSO 一般都需要一个独立的认证中心（passport），子系统的登录均得通过 passport，子系统本身将不参与登录操作，当一个系统成功登录以后，passport 将会颁发一个令牌给各个子系统，子系统可以拿着令牌会获取各自的受保护资源，为了减少频繁认证，各个子系统在被 passport 授权以后，会建立一个局部会话，在一定时间内可以无需再次向 passport 发起认证。

具体流程是：

1. 用户访问系统 1 的受保护资源，系统 1 发现用户未登录，跳转至 sso 认证中心，并将自己的地址作为参数
2. sso 认证中心发现用户未登录，将用户引导至登录页面
3. 用户输入用户名密码提交登录申请
4. sso 认证中心校验用户信息，创建用户与 sso 认证中心之间的会话，称为全局会话，同时创建授权令牌
5. sso 认证中心带着令牌跳转会最初的请求地址（系统 1）
6. 系统 1 拿到令牌，去 sso 认证中心校验令牌是否有效
7. sso 认证中心校验令牌，返回有效，注册系统 1
8. 系统 1 使用该令牌创建与用户的会话，称为局部会话，返回受保护资源
9. 用户访问系统 2 的受保护资源
10. 系统 2 发现用户未登录，跳转至 sso 认证中心，并将自己的地址作为参数
11. sso 认证中心发现用户已登录，跳转回系统 2 的地址，并附上令牌
12. 系统 2 拿到令牌，去 sso 认证中心校验令牌是否有效
13. sso 认证中心校验令牌，返回有效，注册系统 2
14. 系统 2 使用该令牌创建与用户的局部会话，返回受保护资源

单点登录：Single Sign On，简称SSO。用户只要登录一次，就可以访问所有相关信任应用的资源。企业里面用的会比较多，有很多内网平台，但是只要在一个系统登录就可以。

 实现方案

* 单一域名：可以把 cookie 种在根域名下实现单点登录
* 多域名：常用 CAS来解决，新增一个认证中心的服务。CAS（Central Authentication Service）是实现SSO单点登录的框架

 CAS实现单点登录的流程

1. 用户访问系统A，判断未登录，则直接跳到认证中心页面
2. 在认证中心页面输入账号，密码，生成令牌，重定向到 系统A
3. 在系统A拿到令牌到认证中心去认证，认证通过，则建立对话
4. 用户访问系统B，发现没有有效会话，则重定向到认证中心
5. 认证中心发现有全局会话，新建令牌，重定向到系统B
6. 在系统B使用令牌去认证中心验证，验证成功后，建议系统B的局部会话。

* 参考流程图：
![image](https://github.com/pro-collection/interview-question/assets/22188674/c258b9f1-e6b3-48a4-aa39-01b68b47bbde)

 关键点

下面是举例来详细说明CAS实现单点登录的流程：

一、第一次访问系统A

1. 用户访问系统A `www.app1.com` 跳转认证中心 client `www.sso.com`， 然后输入用户名，密码登录，然后认证中心 serverSSO 把 cookieSSO 种在认证中心的域名下 `www.sso.com`， 重定向到系统A，并且带上生成的 ticket 参数 `www.app1.com?ticket=xxx`

2. 系统A `www.app1.com?ticket=xxx`请求系统A的后端 serverA ，serverA 去 serverSSO 验证，通过后，将cookieA种在 `www.app1.com`下

二、第二次访问系统A 直接携带 cookieA 去访问后端，验证通过后，即登录成功。

三、第三次访问系统B

1. 访问系统B`www.app2.com` 跳转到认证中心 client`www.sso.com` 这个时候会把认证中心的cookieSSO也携带上，发现用户已登录过，则直接重定向到系统B（www.app2.com）， 并且带上生成的ticket参数`www.app2.com?ticket=xxx`

2. 系统B `www.app2.com?ticket=xxx`请求系统B的后端 serverB，serverB 去 serverSSO 验证，通过后，将cookieB种在www.app2.com下

注意cookie生成时机及种的位置。

* cookieSSO，SSO域名下的cookie
* cookieA，系统A域名下的cookie
* cookieB，系统B域名下的cookie

 参考文档

[资料](https://juejin.cn/post/7195588906809032764)
[资料](https://juejin.cn/post/7044328327762411534)

## 登录鉴权 {#p0-login}

前端登录鉴权的方式主要有以下几种：

1. 基于Session Cookie的鉴权：

* cookie: 用户在登录成功后，服务器会生成一个包含用户信息的Cookie，并返回给前端。前端在后续的请求中会自动携带这个Cookie，在服务器端进行验证和识别用户身份。
* Session: 用户登录成功后，服务器会在后端保存用户的登录状态信息，并生成一个唯一的Session ID，将这个Session ID 返回给前端。前端在后续的请求中需要携带这个Session ID，服务器通过Session ID 来验证用户身份。

2. 单点登录（Single Sign-On，SSO）：单点登录是一种将多个应用系统进行集成的认证方式。用户只需登录一次，即可在多个系统中完成认证，避免了重复登录的麻烦。常见的单点登录协议有CAS（Central Authentication Service）、SAML（Security Assertion Markup Language）等。

3. OpenID Connect（OIDC）：OIDC是基于OAuth2.0的身份验证协议，通过在认证和授权过程中引入身份提供者，使得用户可以使用第三方身份提供者（如Google、Facebook等）进行登录和授权，从而实现用户身份验证和授权的功能。

4. OAuth2.0：OAuth2.0是一个授权框架，用于授权第三方应用访问用户的资源。它通过授权服务器颁发令牌（Token），使得第三方应用可以代表用户获取资源的权限，而无需知道用户的真实凭证。

5. LDAP（Lightweight Directory Access Protocol）：LDAP是一种用于访问和维护分布式目录服务的协议。在登录鉴权中，LDAP常用于验证用户的身份信息，如用户名和密码，通过与LDAP服务器进行通信来进行用户身份验证。

6. 2FA（Two-Factor Authentication）：二次验证是一种提供额外安全层的身份验证方式。与传统的用户名和密码登录不同，2FA需要用户提供第二个验证因素，如手机验证码、指纹识别、硬件令牌等，以提高账户的安全性。

 token 概念和作用

Token是一种用于身份验证和授权的令牌。在Web应用程序中，当用户进行登录或授权时，服务器会生成一个Token并将其发送给客户端。客户端在后续的请求中将Token作为身份凭证携带，以证明自己的身份。

Token可以是一个字符串，通常是经过加密和签名的，以确保其安全性和完整性。服务器收到Token后，会对其进行解析和验证，以验证用户的身份并授权对特定资源的访问权限。

Token的使用具有以下特点：

* 无状态：服务器不需要在数据库中存储会话信息，所有必要的信息都包含在Token中。
* 可扩展性：Token可以存储更多的用户信息，甚至可以包含自定义的数据。
* 安全性：Token可以使用加密算法进行签名，以确保数据的完整性和安全性。
* 跨域支持：Token可以在跨域请求中通过在请求头中添加Authorization字段进行传递。

Token在前后端分离的架构中广泛应用，特别是在RESTful API的身份验证中常见。它比传统的基于Cookie的会话管理更灵活，并且适用于各种不同的客户端，例如Web、移动应用和第三方接入等。

 token 一般在客户端存在哪儿

Token一般在客户端存在以下几个地方：

* Cookie：Token可以存储在客户端的Cookie中。服务器在响应请求时，可以将Token作为一个Cookie发送给客户端，客户端在后续的请求中会自动将Token包含在请求的Cookie中发送给服务器。

* Local Storage/Session Storage：Token也可以存储在客户端的Local Storage或Session Storage中。这些是HTML5提供的客户端存储机制，可以在浏览器中长期保存数据。

* Web Storage API：除了Local Storage和Session Storage，Token也可以使用Web Storage API中的其他存储机制，比如IndexedDB、WebSQL等。

* 请求头：Token也可以包含在客户端发送的请求头中，一般是在Authorization头中携带Token。

需要注意的是，无论将Token存储在哪个地方，都需要采取相应的安全措施，如HTTPS传输、加密存储等，以保护Token的安全性。

 存放在 cookie 就安全了吗？

存放在Cookie中相对来说是比较常见的做法，但是并不是最安全的方式。存放在Cookie中的Token可能存在以下安全风险：

* **跨站脚本攻击（XSS）**：如果网站存在XSS漏洞，攻击者可以通过注入恶意脚本来获取用户的Cookie信息，包括Token。攻击者可以利用Token冒充用户进行恶意操作。

* **跨站请求伪造（CSRF）**：攻击者可以利用CSRF漏洞，诱使用户在已经登录的情况下访问恶意网站，该网站可能利用用户的Token发起伪造的请求，从而执行未经授权的操作。

* **不可控的访问权限**：将Token存放在Cookie中，意味着浏览器在每次请求中都会自动携带该Token。如果用户在使用公共计算机或共享设备时忘记退出登录，那么其他人可以通过使用同一个浏览器来访问用户的账户。

为了增加Token的安全性，可以采取以下措施：

* **使用HttpOnly标识**：将Cookie设置为HttpOnly，可以防止XSS攻击者通过脚本访问Cookie。

* **使用Secure标识**：将Cookie设置为Secure，只能在通过HTTPS协议传输时发送给服务器，避免明文传输。

* **设置Token的过期时间**：可以设置Token的过期时间，使得Token在一定时间后失效，减少被滥用的风险。

* **使用其他存储方式**：考虑将Token存储在其他地方，如Local Storage或Session Storage，并采取加密等额外的安全措施保护Token的安全性。

 cookie 和 token 的关系

Cookie和Token是两种不同的概念，但它们在身份验证和授权方面可以有关联。

Cookie是服务器在HTTP响应中通过Set-Cookie标头发送给客户端的一小段数据。客户端浏览器将Cookie保存在本地，然后在每次对该服务器的后续请求中将Cookie作为HTTP请求的一部分发送回服务器。Cookie通常用于在客户端和服务器之间维护会话状态，以及存储用户相关的信息。

Token是一种用于身份验证和授权的令牌。它是一个包含用户身份信息的字符串，通常是服务器生成并返回给客户端。客户端在后续的请求中将Token作为身份凭证发送给服务器，服务器通过验证Token的有效性来确认用户的身份和权限。

Cookie和Token可以结合使用来实现身份验证和授权机制。服务器可以将Token存储在Cookie中，然后发送给客户端保存。客户端在后续的请求中将Token作为Cookie发送给服务器。服务器通过验证Token的有效性来判断用户的身份和权限。这种方式称为基于Cookie的身份验证。另外，也可以将Token直接存储在请求的标头中，而不是在Cookie中进行传输，这种方式称为基于Token的身份验证。

需要注意的是，Token相对于Cookie来说更加灵活和安全，可以实现跨域身份验证，以及客户端和服务器的完全分离。而Cookie则受到一些限制，如跨域访问限制，以及容易受到XSS和CSRF攻击等。因此，在实现身份验证和授权机制时，可以选择使用Token替代或辅助Cookie。

在前端应用的权限设计中，以下是一些建议：

 角色与权限分离

将用户的权限分为不同的角色，每个角色拥有特定的权限。
这样可以简化权限管理，并且当需求变化时，只需要调整角色的权限，而不需要逐个修改用户的权限。

**在角色与权限分离的设计中，可以按照以下几个步骤进行**

1. 确定权限集合：首先，需要确定系统中所有的权限，包括操作、功能、资源等。可以根据系统需求、业务流程等确定权限的粒度和层次结构。

2. 确定角色集合：根据系统的角色需求，确定不同的角色，例如管理员、普通用户、编辑等。每个角色代表一组权限的集合，可以根据业务需求进行划分。

3. 分配权限给角色：将权限与角色进行关联，确定每个角色具备哪些权限。可以通过角色-权限的映射表或者通过角色组的方式进行管理。

4. 用户与角色关联：将用户与角色进行关联，确定每个用户属于哪些角色。可以通过用户-角色的映射表或者通过用户组的方式进行管理。

5. 权限验证：在系统中，根据用户的角色和权限配置进行权限验证。在用户进行操作或访问受限资源时，根据用户的角色与权限进行验证，决定是否允许执行相应的操作。

 功能级权限控制

对于敏感操作或者需要权限控制的功能，需要在前端实现功能级的权限控制。
通过在代码中判断用户是否拥有执行该功能的权限，来决定是否展示或者禁用相关功能。

**功能级权限控制是指在系统中对用户进行细粒度的权限控制，即控制用户是否能够执行某个具体的功能或操作。**
以下是功能级权限控制的设计步骤：

1. 确定功能点：首先，需要明确系统中的各个功能点，例如新增、编辑、删除、查询等。将系统中的所有功能进行明确定义和分类。

2. 定义权限：对于每个功能点，定义相应的权限。权限可以使用权限名或者权限码进行标识，例如新增权限可以使用"add"或者权限码"001"进行标识。

3. 角色与权限关联：将权限与角色进行关联。确定每个角色具备哪些权限。可以使用角色-权限的映射表进行管理。

4. 用户与角色关联：将用户与角色进行关联。确定每个用户属于哪些角色。可以使用用户-角色的映射表进行管理。

5. 权限验证：在系统中，对用户进行权限验证。当用户进行某个功能操作时，根据用户的角色与权限进行验证，决定是否允许执行该操作。

6. 权限控制界面：提供一个权限控制界面，用于管理角色与权限的关联。管理员可以通过该界面对角色的权限进行配置和管理。

7. 动态权限控制：可以考虑将权限控制设计成动态的。即在系统运行时，可以根据用户角色的配置动态控制用户是否具备某个功能的权限。 这样可以灵活地根据业务需求进行权限的调整。

 路由级权限控制

对于不同的页面或路由，可以根据用户的角色或权限来进行权限控制。在前端路由中配置权限信息，当用户访问特定路由时，前端会检查用户是否具备访问该路由的权限。

**前端路由级权限控制是指在前端页面中根据用户的权限配置，控制用户是否可以访问某个路由或者页面。**
以下是前端路由级权限控制的设计方案：

1. 定义路由表：首先，需要定义系统中的所有路由和对应的页面组件。将路由按照功能模块进行分类，方便后续的权限管理。

2. 定义权限配置：对于每个路由或者页面，定义相应的权限配置。可以使用权限名或者权限码进行标识，例如"add"、"edit"等。可以将权限配置与路由表一起存放在一个配置文件中，或者存放在后端数据库中。

3. 获取用户权限：在登录成功后，从后端获取当前用户的权限信息。可以将用户的权限信息存放在前端的状态管理库（如Vuex或Redux）中，以便在全局范围内进行访问。

4. 路由守卫：使用前端路由守卫机制，在路由跳转前进行权限验证。在路由守卫中，根据当前用户的权限信息和路由配置进行判断，决定是否允许用户访问该路由。如果用户没有相应的权限，可以进行跳转到无权限提示页面或者其他处理方式。

5. 权限控制组件：可以创建一个权限控制组件，在需要进行权限控制的路由组件上使用该组件进行包裹。该组件可以根据当前用户的权限和路由配置，动态显示或隐藏路由组件。

6. 动态路由：对于一些有权限控制的路由，可以在用户登录时根据权限配置动态生成。根据用户的权限配置，过滤路由表，生成用户可以访问的路由列表，并将该列表添加到路由配置中。

 动态权限管理

在前端应用中，可以实现动态权限管理，即在用户登录时从服务器获取用户的权限信息，并在前端进行缓存。这样可以保证用户权限的实时性，同时也便于后端对权限进行调整和管理。

 UI级的权限控制

对于某些敏感信息或操作，可以通过前端的界面设计来进行权限控制。例如，隐藏某些敏感字段或操作按钮，只对具有相应权限的用户可见或可操作。

 异常处理与安全验证

在前端应用中，需要实现异常处理机制，当用户越权操作时，需要给予相应提示并记录日志。同时，对于敏感操作，需要进行二次验证，例如通过输入密码或短信验证码等方式进行安全验证。

 安全性考虑

在设计前端应用的权限时，需要考虑安全性，例如防止跨站脚本攻击（XSS）、跨站请求伪造（CSRF）等攻击方式。可以采用合适的安全措施，如输入验证、加密传输等来保护应用的安全性。

综上所述，前端应用的权限设计应该考虑角色与权限分离、功能级与路由级的权限控制、动态权限管理、UI级的权限控制、异常处理与安全验证以及安全性考虑等方面。通过合理的权限设计，可以确保系统的安全性和用户权限的灵活管理。

## 低代码平台 {#p0-low-code}

渲染核心本质就是： [schema] + [组件] = [页面]

 整体架构如下

![01](https://img.alicdn.com/imgextra/i1/O1CN01i4IiSR1cMtUFXaWQq_!!6000000003587-2-tps-1686-1062.png)

* **协议层**：基于《低代码引擎搭建协议规范》 产出的 Schema 作为我们的规范协议。
* **能力层**：提供组件、区块、页面等渲染所需的核心能力，包括 Props 解析、样式注入、条件渲染等。
* **适配层**：由于我们使用的运行时框架不是统一的，所以统一使用适配层将不同运行框架的差异部分，通过接口对外，让渲染层注册/适配对应所需的方法。能保障渲染层和能力层直接通过适配层连接起来，能起到独立可扩展的作用。
* **渲染层**：提供核心的渲染方法，由于不同运行时框架提供的渲染方法是不同的，所以其通过适配层进行注入，只需要提供适配层所需的接口，即可实现渲染。
* **应用层**：根据渲染层所提供的方法，可以应用到项目中，根据使用的方法和规模即可实现应用、页面、区块的渲染。

 设计模式渲染（Simulator）

设计模式渲染就是将编排生成的《搭建协议》渲染成视图的过程，视图是可以交互的，所以必须要处理好内部数据流、生命周期、事件绑定、国际化等等。
也称为画布的渲染，画布是 UI 编排的核心，它一般融合了页面的渲染以及组件/区块的拖拽、选择、快捷配置。
画布的渲染和预览模式的渲染的区别在于，画布的渲染和设计器之间是有交互的。
所以在这里我们新增了一层 Simulator 作为设计器和渲染的连接器。
Simulator 是将设计器传入的 DocumentModel 和组件/库描述转成相应的 Schema 和 组件类。再调用 Render 层完成渲染。我们这里介绍一下它提供的能力。

![02](https://img.alicdn.com/imgextra/i2/O1CN017cYBAp1hvJKPUVLbx_!!6000000004339-2-tps-1500-864.png)

* **Project**：位于顶层的 Project，保留了对所有文档模型的引用，用于管理应用级 Schema 的导入与导出。
* **Document**：文档模型包括 Simulator 与数据模型两部分。Simulator 通过一份 Simulator Host 协议与数据模型层通信，达到画布上的 UI 操作驱动数据模型变化。通过多文档的设计及多 Tab 交互方式，能够实现同时设计多个页面，以及在一个浏览器标签里进行搭建与配置应用属性。
* **Simulator**：模拟器主要承载特定运行时环境的页面渲染及与模型层的通信。
* **Node**：节点模型是对可视化组件/区块的抽象，保留了组件属性集合 Props 的引用，封装了一系列针对组件的 API，比如修改、编辑、保存、拖拽、复制等。
* **Props**：描述了当前组件所维系的所有可以「设计」的属性，提供一系列操作、遍历和修改属性的方法。同时保持对单个属性 Prop 的引用。
* **Prop**：属性模型 Prop 与当前可视化组件/区块的某一具体属性想映射，提供了一系列操作属性变更的 API。
* **Settings**：SettingField 的集合。
* **SettingField**：它连接属性设置器 Setter 与属性模型 Prop，它是实现多节点属性批处理的关键。
* **通用交互模型**：内置了拖拽、活跃追踪、悬停探测、剪贴板、滚动、快捷键绑定。

 模拟器

![03](https://img.alicdn.com/imgextra/i2/O1CN01GF1PMj288kxovvnK8_!!6000000007888-2-tps-1500-740.png)

* **运行时环境**：从运行时环境来看，目前我们有 React 生态、Rax 生态。而在对外的历程中，我们也会拥有 Vue 生态、Angular 生态等。
* **布局模式**：不同于 C 端营销页的搭建，中后台场景大多是表单、表格，流式布局是主流的选择。对于设计师、产品来说，是需要绝对布局的方式来进行页面研发的。
* **研发场景**：从研发场景来看，低代码搭建不仅有页面编排，还有诸如逻辑编排、业务编排的场景。

 参考

[资料](https://lowcode-engine.cn/site/docs/guide/design/renderer)

低代码引擎体系基于三份协议来构建:

* [《低代码引擎搭建协议规范》](https://lowcode-engine.cn/site/docs/specs/lowcode-spec)
* [《低代码引擎物料协议规范》](https://lowcode-engine.cn/site/docs/specs/material-spec)
* [《低代码引擎资产包协议规范》](https://lowcode-engine.cn/site/docs/specs/assets-spec)

![01](https://img.alicdn.com/imgextra/i3/O1CN01axsOyW1s01YgXnT8z_!!6000000005703-2-tps-1888-1000.png)

**参考文档**
[资料](https://lowcode-engine.cn/site/docs/guide/design/specs)

自下而上分别是协议 - 引擎 - 生态 - 平台。

* 底层协议栈定义的是标准，标准的统一让上层产物的互通成为可能。
* 引擎是对协议的实现，同时通过能力的输出，向上支撑生态开放体系，提供各种生态扩展能力。
* 生态就好理解了，是基于引擎核心能力上扩展出来的，比如物料、设置器、插件等，还有工具链支撑开发体系。
* 最后，各个平台基于引擎内核以及生态中的产品组合、衔接形成满足其需求的低代码平台。

**引擎内核简述**

![02](https://img.alicdn.com/imgextra/i1/O1CN01QUUVu21LjTXqY6H8I_!!6000000001335-2-tps-1920-1080.png)

**引擎生态简述**
![03](https://img.alicdn.com/imgextra/i2/O1CN01LkRseZ23W31l8DPzS_!!6000000007262-2-tps-1920-1080.png)

![04](https://img.alicdn.com/imgextra/i4/O1CN01PYBVfZ1hL82XPrXzX_!!6000000004260-2-tps-1920-1080.png)

**分层架构描述**

![01](https://img.alicdn.com/imgextra/i4/O1CN016l8gDo1z7zlRlW1P0_!!6000000006668-2-tps-1920-1080.png)

[资料](https://lowcode-engine.cn/site/docs/guide/design/summary)

## 将静态资源缓存在本地的方式有哪些？{#p0-cached-static}

**浏览器可以使用以下几种方式将前端静态资源缓存在本地**：

1. HTTP缓存：浏览器通过设置HTTP响应头中的Cache-Control或Expires字段来指定资源的缓存策略。常见的缓存策略有：no-cache（每次都请求服务器进行验证）、no-store（不缓存资源）、max-age（设置资源缓存的最大时间）等。浏览器根据这些缓存策略来决定是否将资源缓存在本地。

2. ETag/If-None-Match：服务器可以通过在响应头中添加ETag字段，用于标识资源的版本号。当浏览器再次请求资源时，会将上次请求返回的ETag值通过If-None-Match字段发送给服务器，由服务器判断资源是否发生了变化。如果资源未发生变化，服务器会返回304 Not Modified状态码，浏览器则直接使用本地缓存的资源。

3. Last-Modified/If-Modified-Since：服务器可以通过在响应头中添加Last-Modified字段，用于标识资源的最后修改时间。浏览器再次请求资源时，会将上次请求返回的Last-Modified值通过If-Modified-Since字段发送给服务器。服务器根据资源的最后修改时间判断资源是否发生了变化，如果未发生变化，则返回304 Not Modified状态码，浏览器使用本地缓存的资源。

4. Service Worker缓存：使用Service Worker可以将前端资源缓存在浏览器的Service Worker缓存中。Service Worker是运行在浏览器后台的脚本，它可以拦截和处理网络请求，因此可以将前端资源缓存起来，并在离线状态下提供缓存的资源。

5. LocalStorage或IndexedDB：对于一些小的静态资源，可以将其存储在浏览器的LocalStorage或IndexedDB中。这些存储方式是浏览器提供的本地存储机制，可以将数据以键值对的形式存储在浏览器中，从而实现缓存的效果。

**如何将静态资源缓存在 LocalStorage或IndexedDB**

以下是一个使用LocalStorage将静态资源缓存的示例代码：

```javascript
// 定义一个数组，包含需要缓存的静态资源的URL
const resources = [
  'https://example.com/css/style.css',
  'https://example.com/js/main.js',
  'https://example.com/images/logo.png'
]

// 遍历资源数组，将资源请求并存储在LocalStorage中
resources.forEach(function (url) {
  // 发起资源请求
  fetch(url)
    .then(function (response) {
      // 检查请求是否成功
      if (!response.ok) {
        throw new Error('Request failed: ' + response.status)
      }
      // 将响应数据存储在LocalStorage中
      return response.text()
    })
    .then(function (data) {
      // 将资源数据存储在LocalStorage中，以URL作为键名
      localStorage.setItem(url, data)
      console.log('Resource cached: ' + url)
    })
    .catch(function (error) {
      console.error(error)
    })
})
```

以下是一个使用IndexedDB将静态资源缓存的示例代码：

```javascript
// 打开或创建一个IndexedDB数据库
const request = indexedDB.open('myDatabase', 1)

// 创建或更新数据库的对象存储空间
request.onupgradeneeded = function (event) {
  const db = event.target.result
  const objectStore = db.createObjectStore('resources', { keyPath: 'url' })
  objectStore.createIndex('url', 'url', { unique: true })
}

// 成功打开数据库后，将资源请求并存储在IndexedDB中
request.onsuccess = function (event) {
  const db = event.target.result
  const transaction = db.transaction('resources', 'readwrite')
  const objectStore = transaction.objectStore('resources')

  resources.forEach(function (url) {
    // 发起资源请求
    fetch(url)
      .then(function (response) {
        // 检查请求是否成功
        if (!response.ok) {
          throw new Error('Request failed: ' + response.status)
        }
        // 将响应数据存储在IndexedDB中
        return response.blob()
      })
      .then(function (data) {
        // 创建一个资源对象，以URL作为键名
        const resource = { url, data }
        // 将资源对象存储在IndexedDB中
        objectStore.put(resource)
        console.log('Resource cached: ' + url)
      })
      .catch(function (error) {
        console.error(error)
      })
  })

  // 完成事务
  transaction.oncomplete = function () {
    console.log('All resources cached in IndexedDB.')
  }

  transaction.onerror = function (event) {
    console.error('Transaction error:', event.target.error)
  }
}
```

以上代码仅为示例，实际应用中需要根据具体的需求进行相应的优化和错误处理。

## 什么是 JWT {#p0-jwt}

JWT是JSON Web Token的缩写，是一种用于在不同系统之间安全传输信息的开放标准。JWT通常用于身份验证和授权，它由三部分组成：头部（header）、载荷（payload）和签名（signature）。

头部包含了关于令牌的元数据和算法信息，通常包括令牌的类型（例如JWT）、使用的加密算法（例如HMAC SHA256或RSA）等。

载荷包含了要传输的数据，可以是用户的身份信息、权限、角色等。载荷可以自定义，但常见的标准字段有iss（令牌的签发者）、exp（令牌的过期时间）、sub（令牌的主题）等。

签名是使用头部和载荷中的数据以及秘密密钥生成的，用于验证令牌的真实性和完整性。接收方可以使用相同的密钥对收到的令牌进行验证。

JWT的优点包括可扩展性、易于使用和跨平台支持，它可以在各种语言和框架中使用。由于JWT是基于标准的JSON格式，因此它易于解析和处理。

## 前端如何用 canvas 来做电影院选票功能 {#p0-coupon}

电影院选票功能可以通过 Canvas 来实现，具体实现步骤如下：

1. 绘制座位图案：使用 Canvas 绘制座位图案，可以用矩形或圆形来表示每个座位，还可以添加不同颜色来表示该座位的状态（已售、已选、可选等）。

2. 添加鼠标事件：添加鼠标事件，如鼠标移动、鼠标单击等，来实现用户交互操作。例如，当用户点击座位时，将该座位的状态改为已选状态，并更新座位图案的颜色。

3. 统计已选座位：在用户选票的过程中，需要统计已选座位的数量和位置，并将选票信息展示给用户。可以通过遍历座位图案数组来实现。

4. 添加检查功能：为了防止用户在选票过程中出现错误，可以添加检查功能，如检查座位是否已被售出或已被其他人选中等。

5. 添加确认和支付功能：当用户选好座位后，需要确认并支付，可以通过弹出确认对话框来实现，并将用户的选票信息发送至后台进行处理。

**代码实现如下**

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Title</title>
</head>
<body>
<canvas id="canvas" width="800" height="600"></canvas>
<button id="btnPay">确认并支付</button>


<script>
 // 获取画布和按钮元素
 var canvas = document.getElementById('canvas');
 var btnPay = document.getElementById('btnPay');

 // 获取画布上下文和座位数组
 var ctx = canvas.getContext('2d');
 var seats = [];

 // 绘制座位
 function drawSeat(x, y, state) {
 switch (state) {
 case 0:
 ctx.fillStyle = '#ccc'; // 可选座位
 break;
 case 1:
 ctx.fillStyle = '#f00'; // 已售座位
 break;
 case 2:
 ctx.fillStyle = '#0f0'; // 已选座位
 break;
 default:
 ctx.fillStyle = '#000'; // 其他座位
 break;
 }
 ctx.fillRect(x, y, 30, 30);
 }

 // 初始化座位数组
 function initSeat() {
 for (var i = 0; i < 10; i++) {
 seats[i] = [];
 for (var j = 0; j < 10; j++) {
 seats[i][j] = 0; // 初始状态为可选
 drawSeat(i40 + 50, j40 + 50, 0); // 绘制座位
 }
 }
 }

 // 统计已选座位数量和位置
 function countSelectedSeats() {
 var selectedSeats = [];
 var count = 0;
 for (var i = 0; i < 10; i++) {
 for (var j = 0; j < 10; j++) {
 if (seats[i][j] == 2) {
 selectedSeats.push([i, j]);
 count++;
 }
 }
 }
 return [count, selectedSeats];
 }

 // 更新座位状态和颜色
 function updateSeat(x, y) {
 if (seats[x][y] == 0) {
 seats[x][y] = 2; // 更改为已选状态
 } else if (seats[x][y] == 2) {
 seats[x][y] = 0; // 更改为可选状态
 }
 drawSeat(x40 + 50, y40 + 50, seats[x][y]); // 更新颜色
 }

 // 检查座位状态是否可选
 function checkSeat(x, y) {
 if (seats[x][y] == 1) {
 alert('该座位已售出，请选择其他座位！');
 return false;
 } else if (seats[x][y] == 2) {
 alert('该座位已被选中，请选择其他座位！');
 return false;
 }
 return true;
 }

 // 点击事件处理函数
 function handleClick(e) {
 var x = parseInt((e.clientX - canvas.offsetLeft - 50) / 40);
 var y = parseInt((e.clientY - canvas.offsetTop - 50) / 40);
 if (x >= 0 && x < 10 && y >= 0 && y < 10) {
 if (checkSeat(x, y)) {
 updateSeat(x, y);
 var count = countSelectedSeats()[0];
 if (count > 0) {
 btnPay.innerHTML = '确认并支付（已选 ' + count + ' 座位）';
 } else {
 btnPay.innerHTML = '确认并支付';
 }
 }
 }
 }

 // 确认并支付按钮点击事件处理函数
 function handlePay() {
 var selectedSeats = countSelectedSeats()[1];
 if (selectedSeats.length == 0) {
 alert('请选择座位！');
 return;
 }
 if (confirm('您已选中以下座位：' + selectedSeats.join('、') + '，确认支付吗？')) {
 // 向后台发送选票信息，并进行支付处理
 alert('支付成功！请前往指定影院取票！');
 initSeat(); // 重新初始化座位
 btnPay.innerHTML = '确认并支付';
 }
 }

 // 初始化座位
 initSeat();

 // 绑定点击事件和确认并支付按钮点击事件
 canvas.addEventListener('click', handleClick);
 btnPay.addEventListener('click', handlePay);

</script>
</body>
</html>
```
