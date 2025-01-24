# 安全

## 同源策略 {#po-same-origin}

同源策略是一种安全机制，它是浏览器对 JavaScript 实施的一种安全限制。所谓“同源”是指域名、协议、端口号均相同。同源策略限制了一个页面中的脚本只能与同源页面的脚本进行交互，而不能与不同源页面的脚本进行交互。这是为了防止恶意脚本窃取数据、进行 XSS 攻击等安全问题。

同源策略限制的资源包括：

* Cookie、LocalStorage 和 IndexDB 等存储性资源
* AJAX、WebSocket 等发送 HTTP 请求的方法
* DOM 节点
* 其他通过脚本或插件执行的跨域请求

这些资源只能与同源页面进行交互，不能与不同源的页面进行交互。

## CORS

**JSONP**
JSONP是通过动态创建script标签的方式，利用script标签可以跨域请求资源的特性来实现的，本质是利用了script标签没有跨域限制的特性，可以在请求的url后加一个callback参数，后端接收到请求后，将需要传递的数据作为参数传递到callback函数中，前端定义该函数来接收数据，从而实现跨域通信。
[#27](https://github.com/yanlele/interview-question/issues/27)

**CORS**
CORS是一种现代浏览器支持的跨域解决方案，CORS全称为跨域资源共享（Cross-Origin Resource Sharing），其本质是在服务端设置允许跨域访问的响应头，浏览器通过判断响应头中是否允许跨域访问来决定是否允许跨域访问。
[#28](https://github.com/yanlele/interview-question/issues/28)

**postMessage**
postMessage是HTML5引入的一种新的跨域通信方式，主要是用于在不同窗口之间进行通信，包括不同域名、协议、端口等情况，通过调用window.postMessage()方法，在两个窗口之间发送消息，接收方通过监听message事件来接收消息，从而实现跨域通信。
[#29](https://github.com/yanlele/interview-question/issues/29)

**WebSocket**
WebSocket是一种新的网络协议，可以实现客户端和服务器之间的实时双向通信，同时也可以跨域通信，WebSocket协议建立在TCP协议之上，通过HTTP协议发起握手请求，握手成功后，客户端和服务器就可以通过WebSocket协议进行实时通信了。
[#30](https://github.com/yanlele/interview-question/issues/20)

**代理转发**
代理转发是一种常用的跨域通信方式，主要是通过在同一域名下设置代理服务器，在代理服务器上实现跨域访问，再将结果返回给前端页面，从而实现跨域通信。

## 跨域手段有哪些

1. cors
2. postMessage
3. JSONP
4. websocket
5. proxy 转发

## xsrf

## xss

## 网页验证码是干嘛的，是为了解决什么安全问题？

## 加密基础概念

1. 对称加密
   * 同一密钥加解密
   * 速度快
   * 如：AES、DES
2. 非对称加密
   * 公钥加密，私钥解密
   * 速度慢
   * 如：RSA、ECC
3. 哈希算法
   * 单向加密
   * 如：MD5、SHA

## 中间人攻击?

## 参考资料

* [白帽子将 web 安全](https://book.douban.com/subject/10546925//)
