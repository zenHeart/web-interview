
# 小程序

## 小程序的大概原理? {#p0-miniprogram}

具体流程可以看下面这个图：
![](https://foruda.gitee.com/images/1681021603016376642/cc6178f0_7819612.png)

要了解小程序架构原理， 要从以下几个方面入手探索

* 宿主环境
* 执行环境
* 小程序整体架构
* 运行机制
* 更新机制
* 数据通信机制
* 登录机制
* 性能方向问题
* JSCore

具体内容可以参考文档:

* [资料](https://juejin.cn/post/6976805521407868958)

## 391 小程序为什么会有两个线程 {#p0-miniprogram}

小程序之所以有两个线程，是为了实现小程序的高效运行和良好的用户体验。

1. 渲染线程（UI 线程）：
 渲染线程负责小程序界面的渲染和响应用户的交互。它使用 WebView 进行页面渲染，包括解析和绘制 DOM、布局、样式计算和渲染等操作。渲染线程是单线程的，所有的界面操作都在这个线程中进行。

2. 逻辑线程（JS 线程）：
 逻辑线程负责小程序的逻辑运算和数据处理。它是基于 JavaScript 运行的，负责处理用户交互、业务逻辑、数据请求、事件处理等操作。逻辑线程是独立于渲染线程的，可以并行处理多个任务，避免阻塞界面的渲染和响应。

将界面渲染和逻辑运算分离成两个线程的设计有以下好处：

* 响应速度：逻辑线程和渲染线程分开，可以并行执行，提高了小程序的响应速度和用户体验。
* 防止阻塞：逻辑线程的运行不会阻塞渲染线程，避免了长时间的计算或数据处理导致界面卡顿或无响应的情况。
* 资源隔离：渲染线程和逻辑线程是独立的，它们有各自的资源和运行环境，可以避免相互干扰和影响。

需要注意的是，小程序的渲染线程和逻辑线程之间通过微信客户端进行通信和交互。逻辑线程可以发送请求给微信客户端，然后客户端将渲染指令发送给渲染线程进行界面渲染，同时渲染线程可以将用户的交互事件发送给逻辑线程进行处理。这种通信方式保证了渲染和逻辑的协同工作，实现了小程序的正常运行。

小程序之所以有两个线程，是为了提高渲染速度、避免阻塞和资源隔离。渲染线程负责界面渲染，逻辑线程负责业务逻辑和数据处理，两者通过微信客户端进行通信和交互，共同实现小程序的功能和性能。

## 为什么小程序拿不到 dom

小程序为了追求更高的性能和更好的安全性，采用了类Webview的渲染方案，并使用了自己的渲染引擎，与浏览器的渲染引擎不同。因此，小程序的API和浏览器的API并不完全相同。

在小程序中，开发者可以使用WXML语言构建页面，WXML是一种类似HTML的标记语言，但并不是真正的HTML。小程序中的组件是由开发者提前定义好的，而不是由开发者在运行时动态生成的，因此在小程序中无法直接访问和操作DOM。相反，开发者需要使用小程序提供的API来操作组件。

同时，小程序为了保证安全性，也限制了一些操作，如不允许使用eval函数和Function构造函数等动态生成代码的方式。

## 授权登录流程

## 微信 auth 流程 OAuth2.0 是什么登录方式 {#p0-auth}

OAuth2.0并不是一种特定的登录方式，而是一种授权框架，用于授权第三方应用访问用户的资源。它被广泛应用于身份验证和授权的场景中。

OAuth2.0通过引入授权服务器、资源服务器和客户端等角色，实现了用户授权和资源访问的分离。具体流程如下：

1. 用户向客户端发起请求，请求访问某个资源。
2. 客户端将用户重定向到授权服务器，并携带自己的身份凭证（客户端ID）。
3. 用户在授权服务器登录，并授权客户端访问特定的资源。
4. 授权服务器验证用户身份，并生成访问令牌（Access Token）。
5. 授权服务器将访问令牌发送给客户端。
6. 客户端使用访问令牌向资源服务器请求访问资源。
7. 资源服务器验证访问令牌的有效性，并根据权限决定是否允许访问资源。
8. 资源服务器向客户端返回请求的资源。

在这个过程中，OAuth2.0通过访问令牌实现了用户和资源服务器之间的身份授权和资源访问分离。客户端无需知道或存储用户的凭证（如用户名和密码），而是使用访问令牌代表用户向资源服务器请求资源，提供了更安全和便捷的授权方式。

**以下是使用Fetch API来发起请求的示例代码**：

```javascript
// 1. 客户端应用程序发起授权请求，重定向用户到授权服务器的登录页面

const authorizationEndpoint = 'https://example.com/oauth2/auth'
const clientId = 'your_client_id'
const redirectUri = 'https://yourapp.com/callback'
const scope = 'read write'
const state = 'random_state_value'

const authorizationUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`

// 重定向用户到授权页面
window.location.href = authorizationUrl

// 2. 在回调URL中获取授权码

const callbackUrl = window.location.href
const urlParams = new URLSearchParams(callbackUrl.split('?')[1])
const authorizationCode = urlParams.get('code')

// 3. 客户端应用程序使用授权码向授权服务器请求访问令牌

const tokenEndpoint = 'https://example.com/oauth2/token'
const clientSecret = 'your_client_secret'

const tokenData = {
  grant_type: 'authorization_code',
  code: authorizationCode,
  redirect_uri: redirectUri,
  client_id: clientId,
  client_secret: clientSecret
}

// 使用Fetch API请求访问令牌
fetch(tokenEndpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: new URLSearchParams(tokenData)
})
  .then(response => response.json())
  .then(data => {
    const accessToken = data.access_token

    // 4. 客户端应用程序使用访问令牌向资源服务器请求受保护的资源
    const resourceEndpoint = 'https://example.com/api/resource'

    // 使用Fetch API请求受保护的资源
    fetch(resourceEndpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
      .then(response => response.json())
      .then(resourceData => {
        // 处理返回的资源数据
        console.log(resourceData)
      })
      .catch(error => {
        console.error('Failed to retrieve resource:', error)
      })
  })
  .catch(error => {
    console.error('Failed to retrieve access token:', error)
  })
```

请注意，上述代码使用了Fetch API来发送HTTP请求。它使用了`fetch`函数来发送POST请求以获取访问令牌，并使用了`Authorization`头部来发送访问令牌获取受保护的资源。确保你的浏览器支持Fetch API，或者在旧版浏览器中使用polyfill库来兼容。与之前的代码示例一样，你需要根据你的情况替换URL和参数值。