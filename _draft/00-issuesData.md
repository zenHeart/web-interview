# 抓取的问提

## 30 实现一个双向链表， 具备添加节点、删除节点、在特定位置插入节点、查找节点、遍历等功能

* created_at: 2023-03-06T15:20:44Z
* updated_at: 2023-03-06T15:20:45Z
* labels: JavaScript
* milestone: 中

必须要掌握的知识

在 JavaScript 中实现双向链表需要掌握以下知识点：

* 如何使用构造函数和类创建双向链表节点，以及如何在节点之间建立双向连接。

* 双向链表的常用操作，包括`添加节点、删除节点、在特定位置插入节点、查找节点`等。

* 双向链表的遍历和迭代，包括`正向遍历、反向遍历、循环遍历`等。

* 链表的常见问题，例如`链表是否为空、链表长度、查找节点`等。

* 对 JavaScript 垃圾回收机制的理解，确保双向链表的实现不会导致内存泄漏。

以上知识点是实现双向链表所必须掌握的内容，掌握这些知识点能够帮助我们有效地创建和操作双向链表。

么是双向链表

双向链表（Doubly linked list）是一种常见的数据结构，它是由一系列节点组成的，每个节点都包含一个指向前驱节点和后继节点的指针。相比单向链表，双向链表具有双向遍历的能力，即可以从任意一个节点开始，向前或向后遍历整个链表。

双向链表的每个节点通常包含两个指针，即 prev 指针和 next 指针。prev 指针指向当前节点的前驱节点，而 next 指针指向当前节点的后继节点。由于每个节点都包含两个指针，因此双向链表的节点通常比单向链表的节点更占用空间。

双向链表可以用于实现各种数据结构和算法，如LRU（Least Recently Used）缓存淘汰算法，双向队列（Deque）等。由于它具有双向遍历的能力，因此在某些场景下可以比单向链表更加高效和方便。

现一个双向链表

```js
class Node {
  constructor (value) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

class DoublyLinkedList {
  constructor () {
    this.head = null
    this.tail = null
    this.length = 0
  }

  // 在链表末尾添加节点
  push (value) {
    const node = new Node(value)
    if (this.length === 0) {
      this.head = node
      this.tail = node
    } else {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }
    this.length++
    return this
  }

  // 从链表末尾移除节点
  pop () {
    if (this.length === 0) {
      return undefined
    }
    const node = this.tail
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      this.tail = node.prev
      this.tail.next = null
      node.prev = null
    }
    this.length--
    return node.value
  }

  // 在链表开头添加节点
  unshift (value) {
    const node = new Node(value)
    if (this.length === 0) {
      this.head = node
      this.tail = node
    } else {
      this.head.prev = node
      node.next = this.head
      this.head = node
    }
    this.length++
    return this
  }

  // 从链表开头移除节点
  shift () {
    if (this.length === 0) {
      return undefined
    }
    const node = this.head
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      this.head = node.next
      this.head.prev = null
      node.next = null
    }
    this.length--
    return node.value
  }

  // 获取指定位置的节点
  get (index) {
    if (index < 0 || index >= this.length) {
      return undefined
    }
    let node = null
    if (index < this.length / 2) {
      node = this.head
      for (let i = 0; i < index; i++) {
        node = node.next
      }
    } else {
      node = this.tail
      for (let i = this.length - 1; i > index; i--) {
        node = node.prev
      }
    }
    return node
  }

  // 在指定位置插入节点
  insert (index, value) {
    if (index < 0 || index > this.length) {
      return false
    }
    if (index === 0) {
      return !!this.unshift(value)
    }
    if (index === this.length) {
      return !!this.push(value)
    }
    const node = new Node(value)
    const prevNode = this.get(index - 1)
    const nextNode = prevNode.next
    prevNode.next = node
    node.prev = prevNode
    node.next = nextNode
    nextNode.prev = node
    this.length++
    return true
  }

  // 移除指定位置的节点
  remove (index) {
    if (index < 0 || index >= this.length) {
      return undefined
    }
    if (index === 0) {
      return this.shift()
    }
    if (index === this.length - 1) {
      return this.pop()
    }
    const nodeToRemove = this.get(index)
    const prevNode = nodeToRemove.prev
    const nextNode = nodeToRemove.next
    prevNode.next = nextNode
    nextNode.prev = prevNode
    nodeToRemove.next = null
    nodeToRemove.prev = null
    this.length--
    return nodeToRemove.value
  }

  // 反转链表
  reverse () {
    let node = this.head
    this.head = this.tail
    this.tail = node
    let prevNode = null
    let nextNode = null
    for (let i = 0; i < this.length; i++) {
      nextNode = node.next
      node.next = prevNode
      node.prev = nextNode
      prevNode = node
      node = nextNode
    }
    return this
  }

  // 通过 value 来查询 index
  findIndexByValue (value) {
    let currentNode = this.head
    let index = 0

    while (currentNode) {
      if (currentNode.value === value) {
        return index
      }
      currentNode = currentNode.next
      index++
    }

    return -1 // 如果链表中没有找到该值，返回 -1
  }

  // 正向遍历链表，并返回遍历结果
  forwardTraversal () {
    const result = []
    let current = this.head
    while (current) {
      result.push(current.value)
      current = current.next
    }
    return result
  }

  // 反向遍历链表，并返回遍历结果
  backwardTraversal () {
    const result = []
    let current = this.tail
    while (current) {
      result.push(current.value)
      current = current.prev
    }
    return result
  }

  // 循环遍历链表，并返回遍历结果
  loopTraversal () {
    const result = []
    let current = this.head
    while (current) {
      result.push(current.value)
      current = current.next
      if (current === this.head) {
        break
      }
    }
    return result
  }
}
```

## 31 JS 中继承方式有哪些？

* created_at: 2023-03-06T15:20:47Z
* updated_at: 2023-03-29T08:35:16Z
* labels: JavaScript
* milestone: 初

 1、借助构造函数实现继承

call和apply改变的是JS运行的上下文:

```javascript
/* 借助构造函数实现继承 */
function Parent (name) {
  this.name = name
  this.getName = function () {
    console.log(this.name)
  }
}

function Child (name) {
  Parent.call(this, name)
  this.type = 'child1'
}

const child = new Child('yanle')
child.getName()
console.log(child.type)
```

父类的this指向到了子类上面去，改变了实例化的this 指向，导致了父类执行的属性和方法，都会挂在到 子类实例上去；
缺点：父类原型链上的东西并没有被继承；

 2、通过原型链实现继承

```javascript
/* 通过原型链实现继承 */
function Parent2 () {
  this.name = 'parent2'
}

function Child2 () {
  this.type = 'child2'
}

Child2.prototype = new Parent2()
console.log(new Child2())
```

Child2.prototype是Child2构造函数的一个属性，这个时候prototype被赋值了parent2的一个实例，实例化了新的对象Child2()的时候，
会有一个__proto__属性，这个属性就等于起构造函数的原型对象，但是原型对象被赋值为了parent2的一个实例，
所以new Child2的原型链就会一直向上找parent2的原型

var s1=new Child2();
var s2=new Child2();
s1.**proto**===s2.**proto**;//返回true

缺点：通过子类构造函数实例化了两个对象，当一个实例对象改变其构造函数的属性的时候，
那么另外一个实例对象上的属性也会跟着改变（期望的是两个对象是隔离的赛）；原因是构造函数的原型对象是公用的；

 3、组合方式

```javascript
/* 组合方式 */
function Parent3 () {
  this.name = 'parent3'
  this.arr = [1, 2, 3]
}

function Child3 () {
  Parent3.call(this)
  this.type = 'child'
}

Child3.prototype = new Parent3()
const s3 = new Child3()
const s4 = new Child3()
s3.arr.push(4)
console.log(s3, s4)
```

**优点:**这是最通用的使用方法，集合了上面构造函数继承，原型链继承两种的优点。
**缺点:**父类的构造函数执行了2次，这是没有必要的，
constructor指向了parent了

 4、组合继承的优化

```javascript
/* 组合继承的优化1 */
function Parent4 () {
  this.name = 'parent3'
  this.arr = [1, 2, 3]
}

function Child4 () {
  Parent4.call(this)
  this.type = 'child5'
}

Child4.prototype = Parent4.prototype
const s5 = new Child4()
const s6 = new Child4()
```

**缺点：**s5 instaceof child4 //true, s5 instanceof Parent4//true
我们无法区分一个实例对象是由其构造函数实例化，还是又其构造函数的父类实例化的
s5.constructor 指向的是Parent4;//原因是子类原型对象的constructor 被赋值为了父类原型对象的 constructor,所以我们使用constructor的时候，肯定是指向父类的
Child3.constructor 也有这种情况

 5、组合继承的优化2

```javascript
function Parent5 () {
  this.name = 'parent5'
  this.play = [1, 2, 3]
}

function Child5 () {
  Parent5.call(this)
  this.type = 'child5'
}

Child5.prototype = Object.create(Parent5.prototype)
// 这个时候虽然隔离了，但是constructor还是只想的Parent5的，因为constructor会一直向上找
Child5.prototype.constructor = Child5

const s7 = new Child5()
console.log(s7 instanceof Child5, s7 instanceof Parent5)
console.log(s7.constructor)
```

通过Object.create来创建原型中间对象，那么这么来的话，chiild5的对象prototype获得的是parent5 父类的原型对象；
Object.create创建的对象，原型对象就是参数；

 6、ES 中的继承

Class 可以通过extends关键字实现继承，让子类继承父类的属性和方法。extends 的写法比 ES5 的原型链继承，要清晰和方便很多。

```js
class Point { // ... */ }

class ColorPoint extends Point {
 constructor(x, y, color) {
 super(x, y); // 调用父类的constructor(x, y)
 this.color = color;
 }

 toString() {
 return this.color + ' ' + super.toString(); // 调用父类的toString()
 }
}
```

## 32 解释一下 原型、构造函、实例、原型链 之间的关系？

* created_at: 2023-03-06T15:20:50Z
* updated_at: 2023-03-06T15:20:51Z
* labels: JavaScript
* milestone: 初

创建对象有哪几种方式？

```js
// 面向字面量
const o1 = { name: '01' }
const o11 = new Object({ name: 'o11' })

// 使用显示的构造函数：
const M = function () { this.name = '02' }
const o2 = new M()

// 通过Object.create()创建
const P = { name: 'o3' }
const o3 = Object.create(P)
```

解释一下 原型、构造函、实例、原型链 之间的关系？

![01_01](https://user-images.githubusercontent.com/22188674/221917767-022a2d09-3539-4e54-a462-34299be8eb0b.png)

**1、基础**

构造函数可以通过new来生成一个实例、构造函数也是函数；
函数都有一个prototype属性，这个就是原型对象；
原型对象可以通过构造器constructor来指向它的构造函数；
实例的__proto__属性，指向的是其构造函数的原型对象；

**原型链**：从一个实例对象，向上找构造这个实例相关联的对象，相关联的对象又向上找，找到创造它的一个实例对象，
一直到Object.prototype截止。原型链是通过prototype和__proto__向上找的。构造函数通过prototype创建了很多方法，
被其所有实例所公用，存放在原型对象上；

例子：

```javascript
const M = function (name) { this.name = name }
const o3 = new M('o3')
```

当我们需要扩展实例的时候，我们可以对构造函数添加方法，但是这样会创建每一个实例都拷贝一份它自己的添加的方法，
占用内存，而且也没有必要，这个时候就可以新添加的方法写进原型里面去，添加到原型链中去，
在实例的原型链中我们可以在原型对象上找到添加的方法；

```javascript
const M = function (name) { this.name = name }
const o3 = new M('o3')
M.prototype.say = function () {
  Console.log('say hi')
}
const o5 = new M('o5')
```

通过这种方式o3和o5都有say方法；原型链的优势是原型对象的方法是被所有实例共有的；

当访问一个实例方法的时候，首先在实例本身找这个方法，如果没有找到就会到其构建函数的原型对象去找，如果还是没有找到，
那么它会继续通过原型链在原型对象的更上一级查找，一直到object.prototype;

一定要记住只有函数才有proptotype,对象是没有的；

只有实例对象又__proto__ , 因为函数也是对象，所以函数也有__proto__ , 但是和实例对象的__proto__是有区别的，函数的__proto__是function这个对象的构造实例；

**2、instanceof 原理**

实例对象上面有一个__proto__ ，这个是引用的它构造函数的原型对象；

instanceof是用来判断实例是不是由某个构造函数实例化出来的对象，其原理是判断实例对象是否指向构造函数的原型；
只要是在原型链上的函数，都会被instanceof看做是实例对象的一个构造函数，所以都会返回true;

```
m1.__proto__===m1.prototype;返回true
m1.prototype.__proto===Object.prototype;返回true

o3.__proto__.constructor===Object;//返回false
所以我们判断一个实例对象的构造函数，用constructor;
```

**3、new 运算符**

后面跟着的是一个构造函数

一个新对象被创建。它继承自 foo.prototype->
构造函数foo会被执行，执行的时候，相应的传参会被传入，同时上下文（this）会被指定为这个新实例。 new foo等同于new foo(),只能在不传递任何参数的情况->
如果构造函数返回了一个‘对象’，那么这个对象会取代整个new 出来的结果。如果构造函数没有返回值， 那么new出来的结果为步骤1创建的对象

**4、Object.create()**

创建的实例对象是指向的对象原型，实例对象本身是不具备创建对象的属性和方法的，是通过原型链来链接的。

## 33 Http协议基础

* created_at: 2023-03-06T15:20:53Z
* updated_at: 2023-03-06T15:20:55Z
* labels: 网络
* milestone: 中

http 协议有什么特点？

**简单快速，灵活、无连接、无状态**

每一个资源对应一个URI，请求只要输入资源地址uri就可以了；
在每一个http头部协议中都有一个数据类型，通过一个http协议就可以完成不同类型数据的传输；
链接一次就会断开；
每一次链接不会记住链接状态的，服务器不区分两次链接的身份；

http报文组成部分？

求报文

**请求报文**：请求行、请求头、空行、请求体
**请求行**：HTTP请求方法、页面地址、协议版本等
**请求头**：key,value值，告诉服务端我要什么内容、要什么数据类型
**空行**：分割请求头和请求体的，遇到空行，服务器就知道，请求头结束了，接下来是请求体了
**请求体**：就是给服务端的一些入参数据；
我所了解的请求体有两种格式，Content-Type: application/x-www-form-urlencoded 和 payload 和 json

应报文

状态行、响应头、空行、响应体

**状态行**：协议版本 状态码 状态
其他的一样的

通信协议？

建立在 TCP 之上的

常见请求头数据和相应头数据（以github某请求为例子）

**Request Headers**

```
Accept: */* // 告诉服务器，客户机支持的数据类型
Accept-Encoding: gzip, deflate, br // 告诉服务器，客户机支持的数据压缩格式
Accept-Language: zh-CN,zh;q=0.9 // 编码格式
Connection: keep-alive // 是否支持场链接
Content-Length: 12308 // 获取文件的总大小
Content-Type: application/json // 返回数据格式
Host: api.github.com
Origin: https://github.com
Referer: https://github.com/yanlele/node-index/blob/master/book/05%E3%80%81%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E7%82%B9%E4%B8%93%E9%A2%98/01_01%E3%80%81%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86%E9%83%A8%E5%88%861-10.md
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36
```

**Response Headers:**

```
Access-Control-Allow-Origin:// 允许跨域策略
Access-Control-Expose-Headers: ETag, Link, Location... // 列出了哪些首部可以作为响应的一部分暴露给外部
Cache-Control: no-cache // 缓存失效时间
Content-Length: 5 // 获取文件的总大小
Content-Security-Policy: default-src 'none' // 配置内容安全策略涉
Content-Type: application/json; charset=utf-8 // 返回数据格式
Date: Wed, 21 Nov 2018 09:55:47 GMT
Referrer-Policy: origin-when-cross-origin, strict-origin-when-cross-origin
Server: GitHub.com
Status: 200 OK // 状态码
Strict-Transport-Security: max-age=31536000; includeSubdomains; preload
Vary: Accept-Encoding
X-Content-Type-Options: nosniff
X-Frame-Options: deny
X-GitHub-Media-Type: github.v3; format=json
X-GitHub-Request-Id: A3D4:2AE5:13372C:19E45C:5BF52BA3
X-XSS-Protection: 1; mode=block
```

HTTP方法相关？

GET请求资源、post传输资源、put更新资源、delete删除资源、head获取报文首部

et和post区别

* get只能url 编码、post支持多种编码方式

* get在传输参数有长度限制的，而post是没有长度限制的
* get通过url传递，post放在request body中
* get不安全，post是一种安全的传输协议方式
* get会把参数保存到浏览器记录里，而post中的参数不会保存
* get 会被浏览器缓存

http 常见状态码有哪些？

**1.XX**:指示信息-表示请求已经接受，继续处理

**2.XX:成功**
 200：请求成功
 206：客户端发送一个range头的get请求，服务器完成了他

**3.XX：重定向**
 301：请求的页面转移到新的url;
 302:临时转移到新的url
 304：客户端缓存的文件并发出了一个条件性的请求，服务器告诉客户，原来缓冲的文档还可以继续使用

**4.XX：客户端错误**
 400：语法错误
 401：请求未授权
 403：请求禁止访问
 404：请求资源不存在

**5.XX：服务端错误**
 500：服务器发生不可预期的错误
 503：服务器请求未完成

什么是 HTTP持久链接？

http采用的是 "请求-应答" 模式
当使用keep-Alive 模式（又称持久链接、链接重用）时、http1.1版本才支持的
`Connection: keep-alive`

什么是管线化？

持久链接下：链接传递消息类似于请求1->响应1->请求2->响应2->请求3->响应3
管线化：请求1-》请求2-》请求3-》响应1-》响应2-》响应3
需要通过持久链接完成，所以仅HTTP1.1版本支持
只有get和head请求支持管线化，post请求是有所限制的

深入研究 HTTPS

ttps涉及到的主体

1、客户端。通常是浏览器(Chrome、IE、FireFox等)，也可以自己编写的各种语言的客户端程序。
2、服务端。一般指支持Https的网站，比如github、支付宝。
3、CA(Certificate Authorities)机构。Https证书签发和管理机构，比如Symantec、Comodo、GoDaddy、GlobalSign。

图示这三个角色：
![01-05-01](https://user-images.githubusercontent.com/22188674/221914484-98831a29-4af5-472c-be59-f54dcd46b15d.png)

明 Https 的动机

`认证正在访问的网站。` 什么叫认证网站？比如你正在访问支付宝，怎样确定你正在访问的是阿里巴巴提供的支付宝而不是假冒伪劣的钓鱼网站呢？
`保证所传输数据的私密性和完整性。` 众所周知，Http是明文传输的，所以处在同一网络中的其它用户可以通过网络抓包来窃取和篡改数据包的内容，
甚至运营商或者wifi提供者，有可能会篡改http报文，添加广告等信息以达到盈利的目的。

ttps的工作流程

![01-05-02](https://user-images.githubusercontent.com/22188674/221914949-a44091ea-57f5-49b4-87ad-b777ca1313c3.png)

可以看到工作流程，基本分为**三个阶段**：

**1、`认证服务器。`** 浏览器内置一个受信任的CA机构列表，并保存了这些CA机构的证书。
第一阶段服务器会提供经CA机构认证颁发的服务器证书，如果认证该服务器证书的CA机构，存在于浏览器的受信任CA机构列表中，
并且服务器证书中的信息与当前正在访问的网站（域名等）一致，那么浏览器就认为服务端是可信的，
并从服务器证书中取得服务器公钥，用于后续流程。
否则，浏览器将提示用户，根据用户的选择，决定是否继续。
当然，我们可以管理这个受信任CA机构列表，添加我们想要信任的CA机构，或者移除我们不信任的CA机构。

**2、`协商会话密钥。`** 客户端在认证完服务器，获得服务器的公钥之后，利用该公钥与服务器进行加密通信，
协商出两个会话密钥，分别是用于加密客户端往服务端发送数据的客户端会话密钥，用于加密服务端往客户端发送数据的服务端会话密钥。
在已有服务器公钥，可以加密通讯的前提下，还要协商两个对称密钥的原因，是因为非对称加密相对复杂度更高，在数据传输过程中，使用对称加密，可以节省计算资源。
另外，会话密钥是随机生成，每次协商都会有不一样的结果，所以安全性也比较高。

**3、`加密通讯。`**此时客户端服务器双方都有了本次通讯的会话密钥，之后传输的所有Http数据，都通过会话密钥加密。
这样网路上的其它用户，将很难窃取和篡改客户端和服务端之间传输的数据，从而保证了数据的私密性和完整性。

结

说是讨论Https，事实上Https就是Http跑在SSL或者TLS上，所以本文讨论的原理和流程其实是SSL和TLS的流程，对于其它使用SSL或者TLS的应用层协议，本文内容一样有效。
本文只讨论了客户端验证服务端，服务端也可以给客户端颁发证书并验证客户端，做双向验证，但应用没有那么广泛，原理类似。
由于采用了加密通讯，Https无疑要比Http更耗费服务器资源，这也是很多公司明明支持Https却默认提供Http的原因。

## 34 DOM事件类相关问题

* created_at: 2023-03-06T15:20:56Z
* updated_at: 2023-04-24T03:50:54Z
* labels: JavaScript
* milestone: 初

DOM事件级别、DOM事件模型、DOM事件流、DOM事件捕获的具体流程、Event对象的常见应用、自动以事件

dom 级别

DOM级别一共可以分为四个级别：DOM0级、DOM1级、DOM2级和DOM3级。
DOM级别其实就是标准的迭代，对于版本的称呼，类似ES5、ES6。

**1、DOM0级**

DOM没有被W3C定为标准之前。

***2、DOM1级**
1998年10月成为W3C的标准后，称为DOM1级。DOM1级由两个模块组成：DOM核心（DOM Core）和DOM HTML。其中，DOM核心规定的是如何映射基于XML的文档结构，以便简化对文档中任意部分的访问和操作。DOM HTML模块则在DOM核心的基础上加以扩展，添加了针对HTML的对象和方法

**3、DOM2级**

在DOM1级的基础上进行了扩展。为节点添加了更多方法和属性等。
添加新的模块，包括：视图、事件、范围、遍历、样式等。

**4、DOM3级**

DOM3级进一步扩展了DOM，增加了XPath模块、加载和保存（DOM Load and Save）模块等，开始支持XML1.0规范。

DOM事件

DOM0级事件

DOM0级处理事件就是将一个函数赋值给一个事件处理属性。

```js
<button id="btn" type="button"></button>

const btn = document.getElementById('btn')
btn.onclick = function () {
  console.log('Hello World')
}
// 将一个函数赋值给了一个事件处理属性onclick 这样的方法就是DOM0级。
// 可以通过给事件处理属性赋值null来解绑事件。
```

OM2级事件

DOM2级处理事件是在DOM0级处理事件的基础上再添加了一些处理程序。

* 可以同时绑定多个事件处理函数。
* 定义了 addEventListener 和 removeEventListener 两个方法。

```js
element.addEventListener(eventName, fn, useCapture)
// 第三个参数 useCapture：指定事件是否在捕获或冒泡阶段执行。布尔值，可选，默认false
// 可能值：true - 事件句柄在捕获阶段执行；false- 默认。事件句柄在冒泡阶段执行

<button id="btn" type="button"></button> 
 
var btn = document.getElementById('btn')
function showFn() { 
 alert('Hello World')
}
function LogFn() { 
 alert('Hello World')
}
// 同时绑定多个事件处理函数
btn.addEventListener('click', showFn);
btn.addEventListener('click', LogFn);

// 解绑事件 
btn.removeEventListener('click', showFn); 
```

OM3级事件

DOM3级处理事件是在DOM2级处理事件的基础上再添加了很多事件类型。

* UI事件，当用户与页面上的元素交互时触发，如：`load`、`scroll`
* 焦点事件，当元素获得或失去焦点时触发，如：`blur`、`focus`
* 鼠标事件，当用户通过鼠标在页面执行操作时触发如：`dbclick`、`mouseup`
* 滚轮事件，当使用鼠标滚轮或类似设备时触发，如：`mousewheel`
* 文本事件，当在文档中输入文本时触发，如：`textInput`
* 键盘事件，当用户通过键盘在页面上执行操作时触发，如：`keydown`、`keypress`
* 合成事件，当为IME（输入法编辑器）输入字符时触发，如：`compositionstart`
* 变动事件，当底层DOM结构发生变化时触发，如：`DOMsubtreeModified`

同时DOM3级事件也允许使用者自定义一些事件。

事件模型

捕获（从上到下）、冒泡（从下到上）；

事件流

用户和浏览器做交互的过程中，事件的传递，比如点击左键，怎么传递到页面上的。

捕获->目标阶段->冒泡

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>事件冒泡</title>
</head>
<body>
 <div id="parent">
 我是父元素
 <span id="son">我是子元素</span>
 </div>
</body>
<script type="text/javascript">
var parent = document.getElementById('parent');
var son = document.getElementById('son');

parent.addEventListener('click', () => {
 alert('父级冒泡');
}, false);
parent.addEventListener('click', () => {
 alert('父级捕获');
}, true);
son.addEventListener('click', () => {
 alert('子级捕获');
}, true);
son.addEventListener('click', () => {
 alert('子级冒泡');
}, false);
</script>
</html>
```

当点击父元素：父级捕获 -> 父级冒泡
当点击子元素：父级捕获 -> 子级捕获 -> 子级冒泡 -> 父级冒泡

## 35 解释边距重叠

* created_at: 2023-03-06T15:20:59Z
* updated_at: 2023-03-06T15:21:00Z
* labels: CSS
* milestone: 初

什么是BFC

BFC （block formatting context） 及块级格式化上下文，从样式上看，具有 BFC 的元素与普通的容器没有什么区别，从功能上看，BFC相当于构建了一个密闭的盒子模型，在BFC中的元素不受外部元素的影响；

**个人理解**：BFC就是将盒子中子元素的属性锁在父元素中，例如margin,float 使其不影响盒子外的元素。

如何构建BFC

以下情况都会使元素产生BFC

* 根元素或其它包含它的元素 (也就是html元素本身就是BFC)
* float:left ,right
* position:absolute,fixed
* display:inline-block,table-cell,table-caption;(行内块元素与表格元素)
* overflow：hidden，auto，scroll （非 visible属性）
* display: flow-root
* column-span: all

BFC的作用

**1. 解决高度塌陷**

由于浮动元素脱离了文档流，普通盒子是无法包裹住已经浮动的元素；父级元素的高度为0；

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Document</title>
 <style>
{ box-sizing: border-box; }

 .outer {
 background-color: #ccc;
 width: 200px;
 }
 .outer div{
 width: 100px;
 margin: 10px 20px;
 background-color: red;
 width: 100px;
 height: 100px;
 }

 </style>
</head>
<body >
 <div class="outer ">
 <div style="float: left;"></div>
 </div>
</body>
</html>
```

当子元素浮动 父级获取不到浮动元素的高度，造成高度塌陷

当父元素转变为BFC时，浮动元素被包裹住：

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Document</title>
 <style>
{ box-sizing: border-box; }

 .outer {
 background-color: #ccc;
 width: 200px;
 overflow: hidden; //转变为BFC
 }
 .outer div{
 width: 100px;
 margin: 10px 20px;
 background-color: red;
 width: 100px;
 height: 100px;
 }

 </style>
</head>
<body >
 <div class="outer ">
 <div style="float: left;"></div>
 </div>
</body>
</html>
```

**2.浮动重叠**

当一个元素浮动，后面的元素没浮动，那么后面的元素就会与浮动元素发生重叠

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Document</title>
 <style>
{ box-sizing: border-box; }

 .outer {
 background-color: #ccc;
 width: 200px;
 overflow: hidden;
 }
 .outer div{
 width: 100px;
 margin: 10px 20px;
 background-color: red;
 width: 100px;
 height: 100px;
 }

 </style>
</head>
<body >
 <div class="outer ">
 <div style="float: left;"></div>
 <div ></div>
 </div>
</body>
</html>
```

后一个元素 与前一个浮动元素发生重叠

根据BFC不与浮动元素重叠的特性，为没有浮动的元素创建BFC环境

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Document</title>
 <style>
{ box-sizing: border-box; }

 .outer {
 background-color: #ccc;
 width: 200px;
 overflow: hidden;
 }
 .outer div{
 width: 100px;
 margin: 10px 20px;
 background-color: red;
 width: 100px;
 height: 100px;
 }

 </style>
</head>
<body >
 <div class="outer ">
 <div style="float: left;"></div>
 <div style="overflow: hidden;"></div>
 </div>
</body>
</html>
```

**3.边距重叠**

边距重叠分为两种情况

* 父子重叠

```html
当 父级没有 
- 垂直方向的border，
- 垂直方向 padding，
- 父级不是内联元素，
- 父级不是BFC,
- 父级没有清除浮动，

这五个条件时，子元素的上下边距会和父级发生重叠 
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Document</title>
 <style>
{ box-sizing: border-box; }

 .outer {
 background-color: #ccc;
 width: 200px;
 }
 .outer div{
 width: 100px;
 margin: 10px 20px;
 background-color: red;
 width: 100px;
 height: 100px;
 }

 </style>
</head>
<body >
 <div class="outer ">
 <div></div>
 </div>
</body>
</html>
```

解决办法：

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Document</title>
 <style>
{ box-sizing: border-box; }

 .outer {
 background-color: #ccc;
 width: 200px;
 /*padding: 1px;*/ 加padding 
 /*border: 1px solid yellow;*/ 加border
 /*display: inline-block;*/ 内联块
 /*overflow: hidden;*/ BFC
 }
 .clearfix:after{ 清除浮动
 content: '';
 display: table;
 clear:both;
 }
 .outer div{
 width: 100px;
 margin: 10px 20px;
 background-color: red;
 width: 100px;
 height: 100px;
 }

 </style>
</head>
<body >
 <div class="outer clearfix">
 <div></div>
 </div>
</body>
</html>
```

* 兄弟重叠
当两个元素的垂直边距相互接触时，两者边距会发生合并，合并的规则为

```html
- 如果是正数比大小，大的覆盖小的
- 都为负数比绝对值大小，大的覆盖小的
- 正负都有取其差

1.将两个元素浮动
2.将两个元素display：inline-block
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>Document</title>
 <style>
{ box-sizing: border-box; }

 .outer {
 background-color: #ccc;
 width: 200px;
 overflow: hidden;
 }
 .outer div{
 width: 100px;
 margin: 10px 20px;
 background-color: red;
 width: 100px;
 height: 100px;
 /*下面两种方式*/
 float: left;
 display: inline-block;
 }
 </style>
</head>
<body >
 <div class="outer ">
 <div ></div>
 <div ></div>
 </div>
</body>
</html>
```

其实兄弟重叠完全可以设置一个最大值的边距就可达到想要的效果，完全没有必要去使用上面的两个方法。

参考文档

* [test](https://blog.csdn.net/itseven7/article/details/79009215)

## 36 水平垂直居中定位

* created_at: 2023-03-06T15:21:02Z
* updated_at: 2023-03-06T15:21:04Z
* labels: CSS
* milestone: 初

水平垂直居中定位

直居中的方案

1、

```
line-height: 200px;
vertical-align: middle;
```

2、CSS Table

```
#parent {display: table;}
#child {
display: table-cell;
vertical-align: middle;
}
```

3、Absolute Positioning and Negative Margin

```
#parent {position: relative;}
#child {
 position: absolute;
 top: 50%;
 left: 50%;
 height: 30%;
 width: 50%;
 margin: -15% 0 0 -25%;
}
```

4、Absolute Positioning and Stretching

```
#parent {position: relative;}
#child {
position: absolute;
 top: 0;
 bottom: 0;
 left: 0;
 right: 0;
 width: 50%;
 height: 30%;
 margin: auto;
}
```

5、Equal Top and Bottom Padding

```
#parent {
 padding: 5% 0;
}
#child {
 padding: 10% 0;
}
```

平居中的方案

1、要实现行内元素`<span>、<a>`等的水平居中：text-align:center;

2、要实现块状元素（display:block）的水平居中: margin:0 auto;

3、多个水平排列的块状元素的水平居中:

```
#container{
 text-align:center;
}
#center{
 display:inline-block;
}
```

4、flexbox

```
#container {
 display: flex;
}
#container {
 display: inline-flex;
}
```

5、一直宽度水平居中:绝对定位与负边距实现。

```
#container{
 position:relative;
}

#center{
 width:100px;
 height:100px;
 position:absolute;
 top:50%;
 left:50%;
 margin:-50px 0 0 -50px;
}
```

6、绝对定位与margin：

```
#container{
 position:relative;
}
#center{
 position:absolute;
 margin:auto;
 top:0;
 bottom:0;
 left:0;
 right:0;
}
```

知高度和宽度元素的水平垂直居中

1、当要被居中的元素是inline或者inline-block元素

```
 #container{
 display:table-cell;
 text-align:center;
 vertical-align:middle;
}

#center{

}
```

2、利用Css3的transform，可以轻松的在未知元素的高宽的情况下实现元素的垂直居中。

```
#container{
 position:relative;
}
#center{
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
}
```

3、flex

```
#container{
 display:flex;
 justify-content:center;
 align-items: center;
}

#center{

}
```

## 37 关于 JS 闭包了解多少

* created_at: 2023-03-09T14:47:10Z
* updated_at: 2023-03-09T14:53:04Z
* labels: JavaScript
* milestone: 中

关于闭包的研究

`<div id="class01">一、什么是闭包和闭包的几种写法和用法</div>`

 1.1、什么是闭包

闭包，官方对闭包的解释是：一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），因而这些变量也是该表达式的一部分。闭包的特点：

1. 作为一个函数变量的一个引用，当函数返回时，其处于激活状态。
2. 一个闭包就是当一个函数返回时，一个没有释放资源的栈区。

简单的说，Javascript允许使用内部函数---即函数定义和函数表达式位于另一个函数的函数体内。
而且，这些内部函数可以访问它们所在的外部函数中声明的所有局部变量、参数和声明的其他内部函数。
当其中一个这样的内部函数在包含它们的外部函数之外被调用时，就会形成闭包。

 1.2、闭包的几种写法和用法

JavaScript中闭包的应用使用闭包需要注意的地方：闭包使得函数中的变量都保存在内存中，内训消耗大，IE中有可能导致内存泄漏在父函数外部改变父函数内部变量的值。

第一种写法：

```javascript
// 第1种写法
function Circle (r) {
  this.r = r
}
Circle.PI = 3.14159
Circle.prototype.area = function () {
  return Circle.PIthis.rthis.r
}

const c = new Circle(1.0)
alert(c.area())
```

**第二种写法：**

```javascript
// 第2种写法
const Circle = function () {
  const obj = new Object()
  obj.PI = 3.14159

  obj.area = function (r) {
    return this.PIrr
  }
  return obj
}

const c = new Circle()
alert(c.area(1.0))
```

第三种写法：

```javascript
// 第3种写法
const Circle = new Object()
Circle.PI = 3.14159
Circle.Area = function (r) {
  return this.PIrr
}

alert(Circle.Area(1.0))
```

**第四种写法：**

```javascript
// 第4种写法
const Circle = {
  PI: 3.14159,
  area: function (r) {
    return this.PIrr
  }
}
alert(Circle.area(1.0))
```

第五种写法：

```javascript
// 第5种写法
const Circle = new Function('this.PI = 3.14159;this.area = function( r ) {return r*r*this.PI;}')

alert((new Circle()).area(1.0))
```

**基础用法：**
示例1：解决作用域问题

```javascript
function f1 () {
  let n = 1
  test = function () {
    n += 1
  }
  function f2 () {
    console.log('f2():', n)
  }
  return f2
}
const res = f1() // 初始化f1()
console.log(res()) // 相当于调用f2()，结果1和undefined
test() // 将n的值改变了
console.log(res()) // 结果2和undefined
```

示例2：实现get 和 set

```javascript
let setValue, getValue;
(function () {
  let n = 0
  getValue = function () {
    return n
  }
  setValue = function (x) {
    n = x
  }
})()

// console.log(n); n is not defined
console.log(getValue())
setValue(567)
console.log(getValue())
```

示例3：用闭包实现迭代器的效果

```javascript
// 迭代器中得应用
function test (x) {
  let i = 0
  return function () {
    return x[i++]
  }
}
const next = test(['a', 'b', 'c', 'd'])
console.log(next())
console.log(next())
console.log(next())
console.log(next()) // 每调用一次，都可以将数组指针向下移动一次
```

示例4：
错误的示范：

```javascript
function f () {
  const a = []
  let i
  for (i = 0; i < 3; i++) {
    a[i] = function () {
      return i
    }
  }
  return a
}
const test = f()
console.log(test[0]())
console.log(test[1]())
console.log(test[2]()) // 结果都是 3 3 3 这种写法是错误的
```

正确的示范：

```javascript
function f () {
  const a = []
  let i
  for (i = 0; i < 3; i++) {
    a[i] = (function (x) {
      return function () {
        return x
      }
    })(i)
  }
  return a
}
const test = f()
console.log(test[0]())
console.log(test[1]())
console.log(test[2]())
```

示例5：对示例4的优化

```javascript
function f () {
  function test (x) {
    return function () {
      return x
    }
  }
  const a = []
  let i
  for (i = 0; i < 3; i++) {
    a[i] = test(i)
  }
  return a
}
const res = f()
alert(res[0]())
alert(res[1]())
alert(res[2]())
```

 1.3、关于prototype的一些理解

上面代码中出现了JS中常用的Prototype，那么Prototype有什么用呢？下面我们来看一下：

```javascript
const dom = function () {

}

dom.Show = function () {
  alert('Show Message')
}

dom.prototype.Display = function () {
  alert('Property Message')
}

dom.Display() // error
dom.Show()
const d = new dom()
d.Display()
d.Show() // error
```

我们首先声明一个变量，将一个函数赋给他，因为在Javascript中每个函数都有一个Portotype属性，而对象没有。添加两个方法，分别直接添加和添加打破Prototype上面，来看下调用情况。分析结果如下：
**1、不使用prototype属性定义的对象方法，是静态方法，只能直接用类名进行调用！另外，此静态方法中无法使用this变量来调用对象其他的属性！**
**2、使用prototype属性定义的对象方法，是非静态方法，只有在实例化后才能使用！其方法内部可以this来引用对象自身中的其他属性！**

下面我们再来看一段代码：

```javascript
const dom = function () {
  const Name = 'Default'
  this.Sex = 'Boy'
  this.success = function () {
    alert('Success')
  }
}

alert(dom.Name)
alert(dom.Sex)
```

大家先看看，会显示什么呢？ 答案是两个都显示Undefined,为什么呢？这是由于在Javascript中每个function都会形成一个作用域，而这些变量声明在函数中，
所以就处于这个函数的作用域中，外部是无法访问的。要想访问变量，就必须new一个实例出来。

```javascript
const html = {
  Name: 'Object',
  Success: function () {
    this.Say = function () {
      alert('Hello,world')
    }
    alert('Obj Success')
  }
}
```

再来看看这种写法，其实这是Javascript的一个"语法糖"，这种写法相当于：

```javascript
var html = new Object();
html.Name = 'Object';
html.Success = function(){
 this.Say = function(){
 alert("Hello,world");
 };
alert("Obj Success");
```

变量html是一个对象，不是函数，所以没有Prototype属性，其方法也都是公有方法，html不能被实例化。
但是他可以作为值赋给其它变量，如var o = html; 我们可以这样使用它：

```javascript
alert(html.Name)
html.Success()
```

说到这里，完了吗？细心的人会问，怎么访问Success方法中的Say方法呢？是html.Success.Say()吗？
当然不是，上面刚说过由于作用域的限制，是访问不到的。所以要用下面的方法访问：

```javascript
var s = new html.Success()
s.Say()

// 还可以写到外面
html.Success.prototype.Show = function () {
  alert('HaHa')
}
var s = new html.Success()
s.Show()
```

`<div id="class02">二、Javascript闭包的用途</div>`

 1、匿名自执行函数

我们知道所有的变量，如果不加上var关键字，则默认的会添加到全局对象的属性上去，这样的临时变量加入全局对象有很多坏处，比如：别的函数可能误用这些变量；
造成全局对象过于庞大，影响访问速度(因为变量的取值是需要从原型链上遍历的)。
除了每次使用变量都是用var关键字外，我们在实际情况下经常遇到这样一种情况，即有的函数只需要执行一次，其内部变量无需维护，
比如UI的初始化，那么我们可以使用闭包：

```javascript
const data = {
  table: [],
  tree: {}
};

(function (dm) {
  for (let i = 0; i < dm.table.rows; i++) {
    const row = dm.table.rows[i]
    for (let j = 0; j < row.cells; i++) {
      drawCell(i, j)
    }
  }

})(data)
```

我们创建了一个匿名的函数，并立即执行它，由于外部无法引用它内部的变量，因此在函数执行完后会立刻释放资源，关键是不污染全局对象。

 2、结果缓存

我们开发中会碰到很多情况，设想我们有一个处理过程很耗时的函数对象，每次调用都会花费很长时间，
那么我们就需要将计算出来的值存储起来，当调用这个函数的时候，首先在缓存中查找，如果找不到，则进行计算，然后更新缓存并返回值，如果找到了，直接返回查找到的值即可。
闭包正是可以做到这一点，因为它不会释放外部的引用，从而函数内部的值可以得以保留。

```javascript
const CachedSearchBox = (function () {
  const cache = {}
  const count = []
  return {
    attachSearchBox: function (dsid) {
      if (dsid in cache) { // 如果结果在缓存中
        return cache[dsid]// 直接返回缓存中的对象
      }
      const fsb = new uikit.webctrl.SearchBox(dsid)// 新建
      cache[dsid] = fsb// 更新缓存
      if (count.length > 100) { // 保正缓存的大小<=100
        delete cache[count.shift()]
      }
      return fsb
    },

    clearSearchBox: function (dsid) {
      if (dsid in cache) {
        cache[dsid].clearSelection()
      }
    }
  }
})()

CachedSearchBox.attachSearchBox('input')
```

这样我们在第二次调用的时候，就会从缓存中读取到该对象。

 3、封装

```javascript
const person = (function () {
  // 变量作用域为函数内部，外部无法访问
  let name = 'default'

  return {
    getName: function () {
      return name
    },
    setName: function (newName) {
      name = newName
    }
  }
}())

print(person.name)// 直接访问，结果为undefined
print(person.getName())
person.setName('abruzzi')
print(person.getName())

// 得到结果如下：

// undefined
// default
// abruzzi
```

 4、实现类和继承

```javascript
function Person () {
  let name = 'default'

  return {
    getName: function () {
      return name
    },
    setName: function (newName) {
      name = newName
    }
  }
}

const p = new Person()
p.setName('Tom')
alert(p.getName())

const Jack = function () {}
// 继承自Person
Jack.prototype = new Person()
// 添加私有方法
Jack.prototype.Say = function () {
  alert('Hello,my name is Jack')
}
const j = new Jack()
j.setName('Jack')
j.Say()
alert(j.getName())
```

我们定义了Person，它就像一个类，我们new一个Person对象，访问它的方法。
下面我们定义了Jack，继承Person，并添加自己的方法。

## 38 手写实现一下 lodash.get？

* created_at: 2023-03-09T14:51:22Z
* updated_at: 2023-03-09T14:51:23Z
* labels: JavaScript
* milestone: 中

lodash.get 是一个 JavaScript 库 Lodash 中的函数，它允许您在对象中安全地获取深层嵌套的属性值，即使在中间的属性不存在时也不会引发错误。以下是一个简单的实现：

```js
function get (object, path, defaultValue) {
  // 如果对象或路径不存在，则返回默认值
  if (!object || !path) {
    return defaultValue
  }

  // 将路径拆分为一个数组，并过滤掉空值
  const pathArray = path.split('.').filter(Boolean)

  // 循环遍历路径数组，以获取嵌套属性值
  let value = object
  for (let i = 0; i < pathArray.length; i++) {
    const key = pathArray[i]
    value = value[key]
    if (value === undefined) {
      return defaultValue
    }
  }

  // 如果找到了属性值，则返回它，否则返回默认值
  return value || defaultValue
}
```

使用示例：

```js
const object = {
  a: {
    b: {
      c: 'Hello World'
    }
  }
}

get(object, 'a.b.c') // 返回 'Hello World'
get(object, 'a.b.d') // 返回 undefined
get(object, 'a.b.d', 'default') // 返回 'default'
```

## 39 JS 中 this 指向问题了解多少？

* created_at: 2023-03-09T14:58:41Z
* updated_at: 2023-05-31T14:27:18Z
* labels: JavaScript
* milestone: 中

关于 this 指针的研究

础实例说明

实例1：

```html
<script>
 var name = "Kevin Yang";
 function sayHi(){
 console.log("你好，我的名字叫" + this.name);
 }
 sayHi()
</script>
```

如果在html 端， 这个this.name 是可以调用全局对象name的， 这个this实际上是指向的window的， var 也是把变量挂在到window对象上面的。

但是同样的这个实例如果放在node 端，就是一个undefined ,原因是node端没有window对象。

实例2：

```javascript
const name = 'Kevin Yang'
function sayHi () {
  console.log('你好，我的名字叫' + this.name)
}
const person = {}
person.sayHello = sayHi
person.sayHello()
```

这一次打招呼的内容就有点无厘头了，我们发现this.name已经变成undefined了。这说明，在sayHello函数内部执行时已经找不着this.name对象了。,原因是这儿时候，this指向的person 对象，但是this对象上面是没有name属性的。
如果改为这样 `var person = {name:"Marry"};` 就可以得到我们想要的内容了。

别this指针的指导性原则

**在Javascript里面，this指针代表的是执行当前代码的对象的所有者。**

在上面的示例中我们可以看到，第一次，我们定义了一个全局函数对象sayHi并执行了这个函数，函数内部使用了this关键字，
那么执行this这 行代码的对象是sayHi（一切皆对象的体现），sayHi是被定义在全局作用域中。其实在Javascript中所谓的全局对象，
无非是定义在 window这个根对象下的一个属性而已。因此，sayHi的所有者是window对象。也就是说，在全局作用域下，
你可以通过直接使用name去引用这 个对象，你也可以通过window.name去引用同一个对象。因而**this.name就可以翻译为window.name了**。

再来看第二个this的示例。第一次，person里面没有name属性，因此弹 出的对话框就是this.name引用的就是undefined对象
（Javascript中所有只声明而没有定义的变量全都指向undefined对象）；
而第二次我们在定义person的时候加了name属性了，那么this.name指向的自然就是我们定义的字符串了。

理解了上面所说的之后，我们将上面最后一段示例改造成面向对象式的代码。

```javascript
const name = 'Kevin Yang'
function sayHi () {
  console.log('你好，我的名字叫' + this.name)
}
function Person (name) {
  this.name = name
}
Person.prototype.sayHello = sayHi
const marry = new Person('Marry')
marry.sayHello()
const kevin = new Person('Kevin')
kevin.sayHello()
```

易误用的情况

 示例1——内联式绑定Dom元素的事件处理函数

```html
<body>
<input id="btnTest" type="button" value="点击我" onclick="sayHi()">
<script type="text/javascript"> 
 function sayHi(){ 
  alert("当前点击的元素是" + this.tagName); 
 } 
</script> 
</body>
```

在此例代码中，我们绑定了button的点击事件，期望在弹出的对话框中打印出点击元素的标签名。但运行结果却是： 当前点击的元素是 undefined

也就是this指针并不是指向input元素。这是因为当使用内联式绑定Dom元素的事件处理函数时，实际上相当于执行了以下代码：

在这种情况下sayHi函数对象的所有权并没有发生转移，**还是属于window所有**。用上面的指导原则一套我们就很好理解为什么this.tagName是undefined了。

那么如果我们要引用元素本身怎么办呢？
我们知道，onclick函数是属于btnTest元素的，那么在此函数内部，this指针正是指向此Dom对象，于是我们只需要把this作为参数传入sayHi即可。

```html
<input id="btnTest" type="button" value="点击我" onclick="sayHi(this)">
<script type="text/javascript"> 
 function sayHi(el){ 
  alert("当前点击的元素是" + el.tagName); } 
</script> 
```

等价代码如下：

```html
<script type="text/javascript"> 
 document.getElementById("btnTest").onclick = function(){ sayHi(this); } 
</script>
```

 示例2——临时变量导致的this指针丢失

```html
<script type="text/javascript"> 
 var Utility = { 
  decode:function(str){ return unescape(str); }, 
  getCookie:function(key){ 
   // ... 省略提取cookie字符串的代码 
   var value = "i%27m%20a%20cookie"; 
   return this.decode(value); 
  } 
 }; 
 console.log(Utility.getCookie("identity")) 
</script>
```

一般都会自己封装一个Utility的类，然后将一些常用的函数作为Utility类的属性，如客户端经常会 用到的getCookie函数和解码函数。
如果每个函数都是彼此独立的，那么还好办，问题是，函数之间有时候会相互引用。例如上面的getCookie函 数，
会对从document.cookie中提取到的字符串进行decode之后再返回。如果我们通过Utility.getCookie去调用的话，那 么没有问题，
我们知道，getCookie内部的this指针指向的还是Utility对象，而Utility对象时包含decode属性的。代码可以成 功执行。

但是有个人不小心这样使用Utility对象呢？

```html
<script type="text/javascript"> 
 function showUserIdentity(){ 
  // 保存getCookie函数到一个局部变量，因为下面会经常用到 
  var getCookie = Utility.getCookie; 
  alert(getCookie("identity")); 
 } 
 showUserIdentity(); 
</script>
```

这个时候运行代码会抛出异常“this.decode is not a function”。
运用上面我们讲到的指导原则，很好理解，因为此时Utility.getCookie对象被赋给了临时变量getCookie，
而临 时变量是属于window对象的——只不过外界不能直接引用，只对Javascript引擎可见——于是在getCookie函数内部的this指针指向 的就是window对象了，
而window对象没有定义一个decode的函数对象，因此就会抛出这样的异常来。

这个问题是由于引入了临时变量导致的this指针的转移。解决此问题的办法有几个：
不引入临时变量，每次使用均使用Utility.getCookie进行调用
getCookie函数内部使用Utility.decode显式引用decode对象而不通过this指针隐式引用（如果Utility是一个实例化的对象，也即是通过new生成的，那么此法不可用）
**使用Funtion.apply或者Function.call函数指定this指针**

第三种使用apply 和 call 修正的办法实例如下：

```html
<script type="text/javascript"> 
 function showUserIdentity(){ 
  // 保存getCookie函数到一个局部变量，因为下面会经常用到 
  var getCookie = Utility.getCookie; 
  alert(getCookie.call(Utility,"identity")); 
  alert(getCookie.apply(Utility,["identity"])); 
 } 
 showUserIdentity(); 
</script>
```

 示例3——函数传参时导致的this指针丢失

```html
<script type="text/javascript"> 
 var person = { 
  name:"Kevin Yang", 
  sayHi:function(){ 
   alert("你好，我是"+this.name); 
  } 
 } 
 setTimeout(person.sayHi,5000); 
</script>
```

这段代码期望在访客进入页面5秒钟之后向访客打声招呼。setTimeout函数接收一个函数作为参数，并在指定的触发时刻执行这个函数。
可是，当我们等了5秒钟之后，弹出的对话框显示的this.name却是undefined。

其实这个问题和上一个示例中的问题是类似的，都是因为临时变量而导致的问题。
当我们执行函数的时候，如果函数带有参数，那么这个时候Javascript引擎会创建一个临时变量，
并将传入的参数复制（注意，Javascript里面都是值传递的，没有引用传递的概念）给此临时变量。
也就是说，整个过程就跟上面我们定义了一个getCookie的临时变量，再将Utility.getCookie赋值给这个临时变量一样。只不过在这个示例中，容易忽视临时变量导致的bug。

数对象传参

Prototype的解决方案——传参之前使用bind方法将函数封装起来，并返回封装后的对象

```html
<script type="text/javascript"> 
 var person = { 
  name:"Kevin Yang", 
  sayHi:function(){ 
   alert("你好，我是"+this.name); 
  } 
 } 
 var boundFunc = person.sayHi.bind(person,person.sayHi); 
 setTimeout(boundFunc,5000); 
</script>
```

bind方法的实现其实是用到了Javascript又一个高级特性——**闭包**。我们来看一下源代码：

```javascript
function bind () {
  if (arguments.length < 2 && arguments[0] === undefined) { return this }
  const __method = this; const args = $A(arguments); const object = args.shift()
  return function () { return __method.apply(object, args.concat($A(arguments))) }
}
```

首先将this指针存入函数内部临时变量，然后在返回的函数对象中引用此临时变量从而形成闭包。

化的this

在JavaScript中，this通常 指向的是我们正在执行的函数本身，或者是指向该函数所属的对象（运行时）。
当我们在页面中定义了函数 doSomething()的时候，它的owner是页面，或者是JavaScript中的window对象（或 global对象）。
对于一个onclick属性，它为它所属的HTML元素所拥有，this应该指向该HTML元素。

在几种常见场景中this的变化

 ```javascript
function doSomething () {
   alert(this.navigator) // appCodeName
   this.value = 'I am from the Object constructor'
   this.style.backgroundColor = '# 000000'
 }
```

* 作为普通函数直接调用时，this指向window对象.
* 作为控件事件触发时
* inline event registration 内联事件注册 .将事件直接写在HTML代码中`(<element onclick=”doSomething()”>)`, 此时this指向 window对象 。
* Traditional event registration 传统事件注册 （DHTML方式）. 形如 element.onclick = doSomething; 此时this指向 element对象
* `<element onclick=”doSomething(this)”>` 作为参数传递可以指向element
* 作为对象使用时this指向当前对象。形如：new doSomething();
* 使用apply 或者call方法时，this指向所传递的对象。 形如：var obj={}; doSomething.apply(obj,new Array(”nothing”));

下来文章中我们将要讨论的问题是：在函数doSomething()中this所指的是什么？

```javascript
function doSomething () {
  this.style.color = '#cc0000'
}
```

在 JavaScript中，this通常指向的是我们正在执行的函数本身（译者注：用owner代表this所指向的内容），或者是，指向该函数所属的对 象。
当我们在页面中定义了函数doSomething()的时候，它的owner是页面，或者是JavaScript中的window对象（或 global对象）。
对于一个onclick属性，它为它所属的HTML元素所拥有，this应该指向该HTML元素。
这种“所有权”就是JavaScript中面向对象的一种方式。在Objects as associative arrays中可以查看一些更多的信息。
![11_02](https://user-images.githubusercontent.com/22188674/224062543-ec8a9e13-6a90-400b-a54d-16dfc33c64fc.gif)

结

怎样在一个代码环境中快速的找到this所指的对象呢？

* 1、 要清楚的知道对于函数的每一步操作是拷贝还是引用（调用）
* 2、 要清楚的知道函数的拥有者（owner）是什么
* 3、 对于一个function，我们要搞清楚我们是把它当作函数使用还是在当作类使用

## 40 JS 深拷贝有哪些方式， 手写实现一下？

* created_at: 2023-03-09T15:11:57Z
* updated_at: 2023-03-09T15:14:05Z
* labels: JavaScript
* milestone: 中

关于深拷贝和浅拷贝的实现

目录

<!-- toc -->

* [No.1 浅拷贝存在的问题](#no1-%E6%B5%85%E6%8B%B7%E8%B4%9D%E5%AD%98%E5%9C%A8%E7%9A%84%E9%97%AE%E9%A2%98)
* [No.2 普通的深拷贝](#no2-%E6%99%AE%E9%80%9A%E7%9A%84%E6%B7%B1%E6%8B%B7%E8%B4%9D)
* [No.3 数组对象深拷贝的简单实现](#no3-%E6%95%B0%E7%BB%84%E5%AF%B9%E8%B1%A1%E6%B7%B1%E6%8B%B7%E8%B4%9D%E7%9A%84%E7%AE%80%E5%8D%95%E5%AE%9E%E7%8E%B0)
* [No.4 利用对象实现深拷贝](#no4-%E5%88%A9%E7%94%A8%E5%AF%B9%E8%B1%A1%E5%AE%9E%E7%8E%B0%E6%B7%B1%E6%8B%B7%E8%B4%9D)
* [No.5 利用class实现深拷贝](#no5-%E5%88%A9%E7%94%A8class%E5%AE%9E%E7%8E%B0%E6%B7%B1%E6%8B%B7%E8%B4%9D)
* [No.6 解决深拷贝终极奥义](#no6-%E8%A7%A3%E5%86%B3%E6%B7%B1%E6%8B%B7%E8%B4%9D%E7%BB%88%E6%9E%81%E5%A5%A5%E4%B9%89)

<!-- tocstop -->

o.1 浅拷贝存在的问题

```javascript
const person = {
  name: 'yanle',
  age: 24,
  address: {
    home: 'home address',
    office: 'office address'
  },
  schools: ['xiaoxue', 'daxue']
}
const programer = {
  language: 'javascript'
}
function extend (p, c) {
  var c = c || {}
  for (const prop in p) {
    c[prop] = p[prop]
  }
  return c
}
```

extend(person,programer)
programer.schools[0]='lelele'
person.schools[0] //输出结果也是lelele，
说明了不仅是父对象里面还有个对象这种情况，子对象发生改变影响父对象，如果父对象里面是一个数组，也是会影响的！
请参考： 浅拷贝存在的问题

o.2 普通的深拷贝

```javascript
const person = {
  name: 'yanle',
  age: 24,
  address: {
    home: 'home address',
    office: 'office address'
  },
  schools: ['xiaoxue', 'daxue']
}
const programer = {
  language: 'javascript'
}

function extendDeeply (p, c = {}) {
  for (const prop in p) {
    if (typeof p[prop] === 'object') {
      c[prop] = (p[prop].constructor === Array) ? [] : {}
      extendDeeply(p[prop], c[prop])
    } else {
      c[prop] = p[prop]
    }
  }
  return c
}

extendDeeply(person, programer)
console.log(programer)
programer.name = 'lelelelele'
console.log(programer)
console.log(person)
```

这种情况无论是数组还是对象，子类发生改变都不会影响父类了
原理：这里的c对象并不是直接就取的p对象里面的值，而是先赋予了一个空的对象或者数据，再拿空的对象或者数据去装填p对象的数据，这样就可以断开引用关系；
请参考：普通的深拷贝

o.3 数组对象深贝的简单实现

如果对象是一个数组对象，那么可以用字符串方法来实现深拷贝（就是断开引用连接，赋予新的对象实例）
`arr.slice(0)` 这样得到的数组对象就会指向自己心的引用了;

o.4 利用对象实现深拷贝

```javascript
function Parent () {
  this.name = 'abc'
  this.address = { home: 'home' }
}
function Child () {
  Parent.call(this)
  this.language = 'java'
}

const parent = new Parent()
const child = new Child()

console.log(parent)
console.log(child)

console.log('=======================')

child.name = '123'
console.log(parent)
console.log(child)
```

原理：返回的是不同对象的实例，所以不存在公用一个this指向的问题
请参考：利用对象实现深拷贝

o.5 利用class实现深拷贝

```javascript
class Person {
  constructor (name, age) {
    this.name = name
    this.age = age
  }

  run () {
    console.log('person can run')
  }
}

class Child extends Person {
  constructor (name, age, address) {
    super(name, age)
    this.address = address
  }
}

const person = new Person('yanle', 25)
const child = new Child('yanle', 25, 'chongqing')
console.log(person)
console.log(child)
console.log('=========================')
child.name = 'lelellelelele'
console.log(person)
console.log(child)
```

o.6 解决深拷贝终极奥义

github有开源模块专门解决这个问题的： [https://github.com/unclechu/node-deep-extend](https://github.com/unclechu/node-deep-extend)
其源码实例如下： [deep-extend.js](https://github.com/unclechu/node-deep-extend/blob/master/lib/deep-extend.js)
也可以参考本地目录： deep-extend.js

## 41 垂直居中的方案有哪些， 简单手写一下？

* created_at: 2023-03-09T15:15:34Z
* updated_at: 2023-03-09T15:15:35Z
* labels: CSS
* milestone: 初

直居中的方案

1、

```
line-height: 200px;
vertical-align: middle;
```

2、CSS Table

```
#parent {display: table;}
#child {
display: table-cell;
vertical-align: middle;
}
```

3、Absolute Positioning and Negative Margin

```
#parent {position: relative;}
#child {
 position: absolute;
 top: 50%;
 left: 50%;
 height: 30%;
 width: 50%;
 margin: -15% 0 0 -25%;
}
```

4、Absolute Positioning and Stretching

```
#parent {position: relative;}
#child {
position: absolute;
 top: 0;
 bottom: 0;
 left: 0;
 right: 0;
 width: 50%;
 height: 30%;
 margin: auto;
}
```

5、Equal Top and Bottom Padding

```
#parent {
 padding: 5% 0;
}
#child {
 padding: 10% 0;
}
```

## 42 水平居中的方案有哪些， 简单手写一下？

* created_at: 2023-03-09T15:16:09Z
* updated_at: 2023-03-09T15:16:09Z
* labels: CSS
* milestone: 初

平居中的方案

1、要实现行内元素 `<span>、<a>` 等的水平居中：text-align:center;

2、要实现块状元素（display:block）的水平居中: margin:0 auto;

3、多个水平排列的块状元素的水平居中:

```
#container{
 text-align:center;
}
#center{
 display:inline-block;
}
```

4、flexbox

```
#container {
 display: flex;
}
#container {
 display: inline-flex;
}
```

5、一直宽度水平居中:绝对定位与负边距实现。

```
#container{
 position:relative;
}

#center{
 width:100px;
 height:100px;
 position:absolute;
 top:50%;
 left:50%;
 margin:-50px 0 0 -50px;
}
```

6、绝对定位与margin：

```
#container{
 position:relative;
}
#center{
 position:absolute;
 margin:auto;
 top:0;
 bottom:0;
 left:0;
 right:0;
}
```

## 43 未知高度和宽度元素的水平垂直居中的方案有哪些， 简单手写一下？

* created_at: 2023-03-09T15:17:13Z
* updated_at: 2023-03-09T15:17:14Z
* labels: CSS
* milestone: 初

知高度和宽度元素的水平垂直居中

1、当要被居中的元素是inline或者inline-block元素

```
 #container{
 display:table-cell;
 text-align:center;
 vertical-align:middle;
}

#center{

}
```

2、利用Css3的transform，可以轻松的在未知元素的高宽的情况下实现元素的垂直居中。

```
#container{
 position:relative;
}
#center{
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translate(-50%, -50%);
}
```

3、flex

```
#container{
 display:flex;
 justify-content:center;
 align-items: center;
}

#center{

}
```

## 44 数组去重方式有哪些，简单手写一下？

* created_at: 2023-03-09T15:18:20Z
* updated_at: 2024-07-23T08:12:21Z
* labels: JavaScript
* milestone: 中

组去重

**1、双层循环，外层循环元素，内层循环时比较值如果有相同的值则跳过，不相同则push进数组**

```javascript
Array.prototype.distinct = function () {
  const arr = this
  const result = []
  let i
  let j
  const len = arr.length
  for (i = 0; i < len; i++) {
    for (j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        j = ++i
      }
    }
    result.push(arr[i])
  }
  return result
}
const arra = [1, 2, 3, 4, 4, 1, 1, 2, 1, 1, 1]
arra.distinct() // 返回[3,4,2,1]
```

**2、利用splice直接在原数组进行操作**

双层循环，外层循环元素，内层循环时比较值
值相同时，则删去这个值
注意点:删除元素之后，需要将数组的长度也减1.

```javascript
Array.prototype.distinct = function () {
  const arr = this
  let i
  let j
  let len = arr.length
  for (i = 0; i < len; i++) {
    for (j = i + 1; j < len; j++) {
      if (arr[i] == arr[j]) {
        arr.splice(j, 1)
        len--
        j--
      }
    }
  }
  return arr
}
const a = [1, 2, 3, 4, 5, 6, 5, 3, 2, 4, 56, 4, 1, 2, 1, 1, 1, 1, 1, 1]
const b = a.distinct()
console.log(b.toString()) // 1,2,3,4,5,6,56
```

**3、利用对象的属性不能相同的特点进行去重**

```javascript
Array.prototype.distinct = function () {
  const arr = this
  let i
  const obj = {}
  const result = []
  const len = arr.length
  for (i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) { // 如果能查找到，证明数组元素重复了
      obj[arr[i]] = 1
      result.push(arr[i])
    }
  }
  return result
}
const a = [1, 2, 3, 4, 5, 6, 5, 3, 2, 4, 56, 4, 1, 2, 1, 1, 1, 1, 1, 1]
const b = a.distinct()
console.log(b.toString()) // 1,2,3,4,5,6,56
```

**4、数组递归去重**

```javascript
Array.prototype.distinct = function () {
  const arr = this
  const len = arr.length
  arr.sort(function (a, b) { // 对数组进行排序才能方便比较
    return a - b
  })
  function loop (index) {
    if (index >= 1) {
      if (arr[index] === arr[index - 1]) {
        arr.splice(index, 1)
      }
      loop(index - 1) // 递归loop函数进行去重
    }
  }
  loop(len - 1)
  return arr
}
const a = [1, 2, 3, 4, 5, 6, 5, 3, 2, 4, 56, 4, 1, 2, 1, 1, 1, 1, 1, 1, 56, 45, 56]
const b = a.distinct()
console.log(b.toString()) // 1,2,3,4,5,6,45,56
```

**5、利用indexOf以及forEach**

```javascript
Array.prototype.distinct = function () {
  const arr = this
  const result = []
  const len = arr.length
  arr.forEach(function (v, i, arr) { // 这里利用map，filter方法也可以实现
    const bool = arr.indexOf(v, i + 1) // 从传入参数的下一个索引值开始寻找是否存在重复
    if (bool === -1) {
      result.push(v)
    }
  })
  return result
}
const a = [1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 2, 1, 23, 1, 23, 2, 3, 2, 3, 2, 3]
const b = a.distinct()
console.log(b.toString()) // 1,23,2,3
```

**6、利用ES6的set**

```javascript
// 利用Array.from将Set结构转换成数组
function dedupe (array) {
  return Array.from(new Set(array))
}
dedupe([1, 1, 2, 3]) // [1,2,3]
// 拓展运算符(...)内部使用for...of循环
const arr = [1, 2, 3, 3]
const resultarr = [...new Set(arr)]
console.log(resultarr) // [1,2,3]
```

## 45 cookie 和 session 有什么区别？

* created_at: 2023-03-09T15:31:46Z
* updated_at: 2023-03-09T15:32:14Z
* labels: 网络
* milestone: 中

ookie 和 session 有什么区别？

 工作方式有所不同

Cookie和Session都是用来在Web应用程序中维护用户状态的机制，但是它们的工作方式有所不同：

**Cookie**：
Cookie是存储在用户计算机中的小文件，通常由Web服务器发送给Web浏览器。当用户在Web浏览器中发送请求时，浏览器会将Cookie发送回服务器，从而让服务器了解用户的状态信息。Cookie通常用于存储持久性数据，例如用户的首选项、购物车内容等。Cookie可以在Web浏览器中设置过期时间，一旦过期，它就不再有效。

**Session**：
Session是存储在服务器端的会话信息。当用户在Web浏览器中发送请求时，服务器会为每个会话创建一个唯一的标识符（Session ID），并将Session ID发送给Web浏览器。Web浏览器将Session ID存储在Cookie中（或者在URL参数中，如果Cookie不可用），然后将Session ID发送回服务器，从而让服务器知道用户的状态信息。Session通常用于存储短期数据，例如用户登录状态、购物车信息等。Session的数据会在一定时间内保持有效，一旦超过这个时间，数据就会被销毁。

总的来说，Cookie通常用于存储持久性数据，Session通常用于存储短期数据。Cookie存储在用户计算机中，Session存储在服务器端。另外，Cookie的安全性相对较差，因为Cookie中的数据可以被用户查看和修改，而Session的安全性相对较高，因为Session数据存储在服务器端，不容易被篡改。

 还有啥区别？

除了上述提到的区别，Cookie和Session还有以下几个方面的区别：

存储位置：
Cookie数据存储在用户的浏览器中，而Session数据存储在服务器端的内存或者文件系统中。

安全性：
Cookie的数据可以被用户查看和修改，而Session数据存储在服务器端，对于客户端来说是不可见的，因此相对来说更加安全。

大小限制：
Cookie的大小通常受浏览器和操作系统的限制，一般不能超过4KB。而Session的大小没有明确的限制，可以存储大量的数据。

性能：
由于Session数据存储在服务器端，因此每次请求都需要从服务器端读取Session数据，对服务器造成了一定的负担，而Cookie数据存储在客户端，因此每次请求都不需要从服务器端读取数据，对服务器的负担相对较小。

总的来说，Cookie和Session都是常用的用于在Web应用程序中维护用户状态的机制，它们各自有其优点和缺点，需要根据具体应用场景选择合适的机制。

## 46 银行卡号四位空一位， 例如：6222023100014763381 -->6222 0231 0001 4763 381

* created_at: 2023-03-09T15:34:45Z
* updated_at: 2024-12-21T04:20:08Z
* labels: JavaScript
* milestone: 中

```javascript
var str = '6222023100014763381'
var str = str.replace(/\s/g, '').replace(/(.{4})/g, '$1 ')
console.log(str)
```

## 47 js 宏任务与微任务都是指什么， 优先级如何？

* created_at: 2023-03-09T15:54:34Z
* updated_at: 2023-03-09T16:29:12Z
* labels: JavaScript
* milestone: 中

在JavaScript中，宏任务（macro-task）和微任务（micro-task）是指异步操作的两种类型。

本操作

**宏任务通常包括以下操作：**

* setTimeout和setInterval定时器回调函数
* 事件回调函数（例如，鼠标点击、键盘输入等）
* AJAX请求的回调函数
* 请求动画帧（requestAnimationFrame）回调函数
* script标签的onload和onerror事件

当一个宏任务开始执行时，JavaScript 引擎会将其放入调用堆栈的底部，然后继续执行其他代码。当调用堆栈为空时，JavaScript引擎会取出下一个宏任务并执行。

**微任务通常包括以下操作：**

* Promise的回调函数
* Generator函数
* MutationObserver 的回调函数
* process.nextTick（Node.js环境下）

当一个微任务被添加到任务队列中时，它会在当前宏任务执行完成后立即执行，而不是等待下一个宏任务开始执行。这使得微任务可以在当前宏任务执行期间处理异步操作的结果，从而提高应用程序的响应性能。

任务与微任务的优先级是怎样的？

在 JavaScript 中，宏任务和微任务的执行优先级是不同的。**通常情况下，微任务的优先级高于宏任务**，也就是说，在一个宏任务中，如果有微任务存在，那么微任务会优先于宏任务执行。

具体来说，当一个宏任务开始执行时，如果在它的执行过程中产生了微任务，那么这些微任务会被添加到微任务队列中，等待当前宏任务执行完成后立即执行。如果在这个过程中产生了新的微任务，则会一直执行微任务，直到微任务队列为空，然后JavaScript引擎才会继续执行下一个宏任务。

例如，以下代码演示了宏任务和微任务的执行顺序：

```js
console.log('start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

Promise.resolve().then(function () {
  console.log('promise')
})

console.log('end')
```

上述代码中，先执行同步代码 console.log('start') 和 console.log('end')。接着，使用 setTimeout 添加一个宏任务，然后使用 Promise.resolve().then 添加一个微任务。由于微任务优先级高于宏任务，因此 Promise 的回调函数会在 setTimeout 回调函数之前执行。因此，上述代码的输出顺序如下：

```
start
end
promise
setTimeout
```

## 48 commonjs 模块引用规范有哪些？

* created_at: 2023-03-09T15:58:10Z
* updated_at: 2023-09-24T13:12:08Z
* labels: JavaScript
* milestone: 中

ommonjs 模块引用管理规范

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

## 49 fetch 了解多少？

* created_at: 2023-03-09T16:03:43Z
* updated_at: 2023-03-09T16:03:44Z
* labels: 网络
* milestone: 中

深入fetch

etch 的简单介绍

Fetch 被称为下一代Ajax技术,采用Promise方式来处理数据。
是一种简洁明了的API，比XMLHttpRequest更加简单易用。

页面中需要向服务器请求数据时，基本上都会使用Ajax来实现。
Ajax的本质是使用XMLHttpRequest对象来请求数据，而XMLHttpRequest对象是通过事件的模式来实现返回数据的处理。
与XMLHttpRequest类似，Fetch允许你发出AJAX请求。
区别在于Fetch API使用Promise方式，Promise是已经正式发布的ES6的内容之一，
因此是一种简洁明了的API，比XMLHttpRequest更加简单易用。

MLHttpRequest 的使用

AJAX半遮半掩的底层API是饱受诟病的一件事情. XMLHttpRequest 并不是专为Ajax而设计的。
虽然各种框架对 XHR 的封装已经足够好用, 但我们可以做得更好。更好用的API是 fetch 。
下面简单介绍 window.fetch 方法, 在最新版的 Firefox 和 Chrome 中已经提供支持。

在我看来 XHR 有点复杂。使用XHR的方式大致如下:

```javascript
const getJson = function (url) {
  return new Promise(function (resolve, reject) {
    const client = new XMLHttpRequest()
    client.open('GET', url)
    client.setRequestHeader('Accept', 'application/json')
    client.responseType = 'json'
    client.onreadystatechange = function () {
      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(this.statusText)
      }
    }
    client.send()
  })
}
```

etch 的使用

fetch 是全局量 window 的一个方法, 第一个参数是URL:

```javascript
// url (必须), options (可选)
fetch('/some/url', {
  method: 'get'
}).then(function (response) {

}).catch(function (err) {
  // 出错了;等价于 then 的第二个参数,但这样更好用更直观 :(
})
```

fetch API 也使用了 JavaScript Promises 来处理结果/回调:

```javascript
// 对响应的简单处理
fetch('/some/url').then(function (response) {

}).catch(function (err) {
  // 出错了;等价于 then 的第二个参数,但这样更直观 :(
})

// 链式处理,将异步变为类似单线程的写法: 高级用法.
fetch('/some/url').then(function (response) {
  return new Promise() // ... 执行成功, 第1步...
}).then(function (returnedValue) {
  // ... 执行成功, 第2步...
}).catch(function (err) {
  // 中途任何地方出错...在此处理 :(
})
```

求头(Request Headers)

自定义请求头信息极大地增强了请求的灵活性。我们可以通过 new Headers() 来创建请求头:

```javascript
// 创建一个空的 Headers 对象,注意是Headers，不是Header
var headers = new Headers()

// 添加(append)请求头信息
headers.append('Content-Type', 'text/plain')
headers.append('X-My-Custom-Header', 'CustomValue')

// 判断(has), 获取(get), 以及修改(set)请求头的值
headers.has('Content-Type') // true
headers.get('Content-Type') // "text/plain"
headers.set('Content-Type', 'application/json')

// 删除某条请求头信息(a header)
headers.delete('X-My-Custom-Header')

// 创建对象时设置初始化信息
var headers = new Headers({
  'Content-Type': 'text/plain',
  'X-My-Custom-Header': 'CustomValue'
})
```

可以使用的方法包括: append, has, get, set, 以及 delete 。

需要创建一个 Request 对象来包装请求头:

```javascript
var request = new Request('/some-url', {
 headers: new Headers({
 'Content-Type': 'text/plain'
 })
});

fetch(request).then(function() { // handle response */ });
```

equest 简介

Request 对象表示一次 fetch 调用的请求信息。传入 Request 参数来调用 fetch, 可以执行很多自定义请求的高级用法:

* method - 支持 GET, POST, PUT, DELETE, HEAD
* url - 请求的 URL
* body(String): HTTP的请求参数
* headers - 对应的 Headers 对象
* referrer - 请求的 referrer 信息
* mode - 可以设置 cors, no-cors, same-origin
* credentials - 设置 cookies 是否随请求一起发送。可以设置: omit, same-origin
* redirect - follow, error, manual
* integrity - subresource 完整性值(integrity value)
* cache - 设置 cache 模式 (default, reload, no-cache)

Request 的示例如下:

```javascript
var request = new Request('/users.json', {
 method: 'POST', 
 mode: 'cors', 
 redirect: 'follow',
 headers: new Headers({
 'Content-Type': 'text/plain'
 })
});

fetch(request).then(function() { // handle response */ });
```

只有第一个参数 URL 是必需的。在 Request 对象创建完成之后, 所有的属性都变为只读属性.
请注意, Request 有一个很重要的 clone 方法, 特别是在 Service Worker API 中使用时 —— 一个 Request 就代表一串流(stream), 如果想要传递给另一个 fetch 方法,则需要进行克隆。

fetch 的方法签名(signature,可理解为配置参数), 和 Request 很像, 示例如下:

```javascript
fetch('/users.json', {
 method: 'POST', 
 mode: 'cors', 
 redirect: 'follow',
 headers: new Headers({
 'Content-Type': 'text/plain'
 })
}).then(function() { // handle response */ });
```

esponse 简介

Response 代表响应, fetch 的 then 方法接收一个 Response 实例,
当然你也可以手动创建 Response 对象 —— 比如在 service workers 中可能会用到. Response 可以配置的参数包括:

* type - 类型,支持: basic, cors
* url
* useFinalURL - Boolean 值, 代表 url 是否是最终 URL
* status - 状态码 (例如: 200, 404, 等等)
* ok - Boolean值,代表成功响应(status 值在 200-299 之间)
* statusText - 状态值(例如: OK)
* headers - 与响应相关联的 Headers 对象.

```javascript
// 在 service worker 测试中手动创建 response
// new Response(BODY, OPTIONS)
const response = new Response('.....', {
  ok: false,
  status: 404,
  url: '/'
})

// fetch 的 `then` 会传入一个 Response 对象
fetch('/')
  .then(function (responseObj) {
    console.log('status: ', responseObj.status)
  })
```

**Response 提供的方法如下:**

* clone() - 创建一个新的 Response 克隆对象.
* error() - 返回一个新的,与网络错误相关的 Response 对象.
* redirect() - 重定向,使用新的 URL 创建新的 response 对象..
* arrayBuffer() - Returns a promise that resolves with an ArrayBuffer.
* blob() - 返回一个 promise, resolves 是一个 Blob.
* formData() - 返回一个 promise, resolves 是一个 FormData 对象.
* json() - 返回一个 promise, resolves 是一个 JSON 对象.
* text() - 返回一个 promise, resolves 是一个 USVString (text).

 处理 JSON响应

假设需要请求 JSON —— 回调结果对象 response 中有一个json()方法,用来将原始数据转换成 JavaScript 对象:

```javascript
fetch('https://davidwalsh.name/demo/arsenal.json').then(function (response) {
  // 转换为 JSON
  return response.json()
}).then(function (j) {
  // 现在, `j` 是一个 JavaScript object
  console.log(j)
})
```

 处理基本的Text / HTML响应

JSON 并不总是理想的请求/响应数据格式, 那么我们看看如何处理 HTML或文本结果:

```javascript
fetch('/next/page')
  .then(function (response) {
    return response.text()
  }).then(function (text) {
    // <!DOCTYPE ....
    console.log(text)
  })
```

 处理Blob结果

如果你想通过 fetch 加载图像或者其他二进制数据, 则会略有不同:

```javascript
fetch('flowers.jpg')
  .then(function (response) {
    return response.blob()
  })
  .then(function (imageBlob) {
    document.querySelector('img').src = URL.createObjectURL(imageBlob)
  })
```

 提交表单数据(Posting Form Data)

另一种常用的 AJAX 调用是提交表单数据 —— 示例代码如下:

```javascript
fetch('/submit', {
  method: 'post',
  body: new FormData(document.getElementById('comment-form'))
})
```

提交 JSON 的示例如下:

```javascript
fetch('/submit-json', {
 method: 'post',
 body: JSON.stringify({
 email: document.getElementById('email').value
 answer: document.getElementById('answer').value
 })
});
```

etch取消

fetch 并不支持 取消请求的功能

## 50 数字字符串千分位处理(正则与非正则)？

* created_at: 2023-03-09T16:09:01Z
* updated_at: 2023-03-09T16:09:27Z
* labels: JavaScript
* milestone: 中

介绍几种基本的数字处理技巧

```javascript
// 保留两位小数
// 将1234567转换为1234567.00
function to2bits (flt) {
  if (parseFloat(flt) == flt) {
    return Math.round(flt100) / 100 // 到2位小数
  } else return 0
}

// 转换为千分位格式
// 将1234567.00转换为1,234,567.00
function numToMoneyField (inputString) {
  regExpInfo = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g
  const ret = inputString.toString().replace(regExpInfo, '$1,')
  return ret
}
```

现数字千分法方法总结

```javascript
/**
字符串拆分方法 - 效率极低
存在问题： 没有办法解决小数点之后的位数问题
@param num
@returns {string}
 */
function fun1 (num) {
  const result = []; let counter = 0
  num = (num || 0).toString().split('') // 这个地方就直接格式化为一个字符串了
  for (let i = num.length - 1; i >= 0; i--) {
    counter++
    result.unshift(num[i])
    if (!(counter % 3) && i !== 0) { // 边界限定条件
      result.unshift(',')
    }
  }
  return result.join('')
}

/**
字符串操作大法
@param num
@returns {string}
 */
function fun2 (num) {
  let result = ''; let counter = 0
  num = (num || 0).toString()
  for (let i = num.length - 1; i >= 0; i--) {
    counter++
    result = num.charAt(i) + result
    if (!(counter % 3) && i !== 0) {
      result = ',' + result
    }
  }
  return result
}

/**
循环匹配末尾的三个数字
通过正则表达式循环匹配末尾的三个数字，每匹配一次，就把逗号和匹配到的内容插入到结果字符串的开头，然后把匹配目标（num）赋值为还没匹配的内容（RegExp.leftContext）。
1.如果数字的位数是3的倍数时，最后一次匹配到的内容肯定是三个数字，但是最前面的三个数字前不需要加逗号；
2.如果数字的位数不是3的倍数，那num变量最后肯定会剩下1到2个数字，循环过后，要把剩余的数字插入到结果字符串的开头。
虽然方法三减少了循环次数（一次循环处理三个字符），但由于用到了正则表达式，一定程度上增加了消耗。
@param num
@returns {string}
 */
function fun3 (num) {
  num = (num || 0).toString()
  const re = /\d{3}$/
  let result = ''
  while (re.test(num)) {
    result = RegExp.lastMatch + result
    console.log(RegExp.lastMatch)
    if (num !== RegExp.lastMatch) {
      result = ',' + result
      num = RegExp.leftContext
    } else {
      num = ''
      break
    }
  }
  if (num) {
    result = num + result
  }
  return result
}

/**
方法三的字符串版
没啥好说的额，就是避免写正则而已
@param num
@returns {string}
 */
function fun4 (num) {
  num = (num || 0).toString()
  let result = ''
  while (num.length > 3) {
    result = ',' + num.slice(-3) + result
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return result
}

/**
分组合并法
@param num
@returns {string}
 */
function fun5 (num) {
  num = (num || 0).toString()
  const temp = num.length % 3
  switch (temp) {
    case 1:
      num = '00' + num
      break
    case 2:
      num = '0' + num
      break
  }
  console.log(num.match(/\d{3}/g))
  return num.match(/\d{3}/g).join(',').replace(/^0+/, '')
}

/**
正则大法
@returns {string}
 */
function fun6 () {
  return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}
```

以上方法性能总结：
![01-30](https://user-images.githubusercontent.com/22188674/224083189-437e4726-1d79-4785-a255-4c47049d53c4.png)

生api大法

```js
Number.toLocaleString()
```

## 51 手写防抖函数

* created_at: 2023-03-09T16:11:06Z
* updated_at: 2023-03-09T16:11:07Z
* labels: JavaScript
* milestone: 中

实现函数防抖

参考文档：
[https://blog.csdn.net/beijiyang999/article/details/79832604](https://blog.csdn.net/beijiyang999/article/details/79832604)

数防抖是什么

函数防抖是指对于在事件被触发n秒后再执行的回调，如果在这n秒内又重新被触发，则重新开始计时，是常见的优化，适用于

* 表单组件输入内容验证
* 防止多次点击导致表单多次提交
等情况，防止函数过于频繁的不必要的调用。

码实现

 思路

用 setTimeout 实现计时，配合 clearTimeout 实现“重新开始计时”。
即只要触发，就会清除上一个计时器，又注册新的一个计时器。直到停止触发 wait 时间后，才会执行回调函数。
不断触发事件，就会不断重复这个过程，达到防止目标函数过于频繁的调用的目的。

 初步实现

```javascript
function debounce (func, wait) {
  let timer
  return function () {
    clearTimeout(timer)
    timer = setTimeout(func, wait) // 返回计时器 ID
  }
}
container.onmousemove = debounce(doSomething, 1000)
```

 注解：关于闭包

每当事件被触发，执行的都是那个被返回的闭包函数。
因为闭包带来的其作用域链中引用的上层函数变量声明周期延长的效果，
debounce 函数的 settimeout计时器 ID timeout 变量可以在debounce 函数执行结束后依然留存在内存中，供闭包使用。

 优化：修复

相比于未防抖时的

```javascript
container.onmousemove = doSomething
```

防抖优化后，指向 HTMLDivElement 的从 doSomething 函数的 this 变成了闭包匿名函数的 this ，前者变成了指向全局变量。
同理，doSomething 函数参数也接收不到 MouseEvent 事件了。

 修复代码

```javascript
function debounce (func, wait) {
  let timeout
  return function () {
    const context = this // 传给目标函数
    clearTimeout(timeout)
    timeout = setTimeout(
      () => { func.apply(context, arguments) } // 修复
      , wait)
  }
}
```

化：立即执行

相比于 一个周期内最后一次触发后，等待一定时间再执行目标函数；
我们有时候希望能实现 在一个周期内第一次触发，就立即执行一次，然后一定时间段内都不能再执行目标函数。
这样，在限制函数频繁执行的同时，可以减少用户等待反馈的时间，提升用户体验。

 代码

在原来基础上，添加一个是否立即执行的功能

```javascript
function debounce (func, wait, immediate) {
  let time
  const debounced = function () {
    const context = this
    if (time) clearTimeout(time)

    if (immediate) {
      const callNow = !time
      if (callNow) func.apply(context, arguments)
      time = setTimeout(
        () => { time = null } // 见注解
        , wait)
    } else {
      time = setTimeout(
        () => { func.apply(context, arguments) }
        , wait)
    }
  }
  return debounced
}
```

把保存计时器 ID 的 time 值设置为 null 有两个作用:

* 作为开关变量，表明一个周期结束。使得 callNow 为 true，目标函数可以在新的周期里被触发时被执行
* timeout 作为闭包引用的上层函数的变量，是不会自动回收的。手动将其设置为 null ，让它脱离执行环境，一边垃圾收集器下次运行是将其回收。

化：取消立即执行

添加一个取消立即执行的功能。
函数也是对象，也可以为其添加属性。
为了添加 “取消立即执行”功能，为 debounced 函数添加了个 cancel 属性，属性值是一个函数

```javascript
debounced.cancel = function () {
  clearTimeout(time)
  time = null
}
```

示意：

```javascript
const setSomething = debounce(doSomething, 1000, true)
container.onmousemove = setSomething
document.getElementById('button').addEventListener('click', function () {
  setSomething.cancel()
})
```

整代码

```javascript
function debounce (func, wait, immediate) {
  let time
  const debounced = function () {
    const context = this
    if (time) clearTimeout(time)

    if (immediate) {
      const callNow = !time
      if (callNow) func.apply(context, arguments)
      time = setTimeout(
        () => { time = null } // 见注解
        , wait)
    } else {
      time = setTimeout(
        () => { func.apply(context, arguments) }
        , wait)
    }
  }

  debounced.cancel = function () {
    clearTimeout(time)
    time = null
  }
  return debounced
}
```

## 52 process.nextTick, setTimeout 以及 setImmediate 三者的执行顺序？

* created_at: 2023-03-09T16:30:06Z
* updated_at: 2023-03-09T16:30:07Z
* labels: JavaScript
* milestone: 中

rocess.nextTick, setTimeout 以及 setImmediate 三者的执行顺序

[前端碎碎念 之 nextTick, setTimeout 以及 setImmediate 三者的执行顺序](https://segmentfault.com/a/1190000008595101)

首先来看一个非常经典的例子：

```javascript
setImmediate(function () {
  console.log(1) // 7
}, 0)
setTimeout(function () {
  console.log(2) // 8
}, 0)
new Promise(function (resolve) {
  console.log(3) // 1
  resolve()
  console.log(4) // 2
}).then(function () {
  console.log(5) // 6
})
console.log(6) // 3
process.nextTick(function () {
  console.log(7) // 5
})
console.log(8) // 4
// 输出结果是3 4 6 8 7 5 2 1
```

macro-task(宏任务): script (整体代码)，setTimeout, setInterval, setImmediate, I/O, UI rendering.
micro-task(微任务): process.nextTick, Promise(原生)，Object.observe，MutationObserver

除了script整体代码，micro-task的任务优先级高于macro-task的任务优先级。其中，script(整体代码) ，可以理解为待执行的所有代码。

所以执行顺序如下：

第一步. script整体代码被执行，执行过程为

* 创建setImmediate macro-task
* 创建setTimeout macro-task
* 创建micro-task Promise.then 的回调，并执行script console.log(3); resolve(); console.log(4); 此时输出3和4，虽然resolve调用了，执行了但是整体代码还没执行完，无法进入Promise.then 流程。
* console.log(6)输出6
* process.nextTick 创建micro-task
* console.log(8) 输出8

第一个过程过后，已经输出了3 4 6 8

第二步. 由于其他micro-task 的 优先级高于macro-task。
此时micro-task 中有两个任务按照优先级 process.nextTick 高于 Promise。
所以先输出7，再输出5

第三步，micro-task 任务列表已经执行完毕，家下来执行macro-task. 由于setTimeout的优先级高于setIImmediate，所以先输出2，再输出1。

整个过程描述起来像是同步操作，实际上是基于Event Loop的事件循环。
关于micro-task和macro-task的执行顺序，可看下面这个例子(来自《深入浅出Node.js》)：

```javascript
// 加入两个nextTick的回调函数
process.nextTick(function () {
  console.log('nextTick延迟执行1')
})
process.nextTick(function () {
  console.log('nextTick延迟执行2')
})
// 加入两个setImmediate()的回调函数
setImmediate(function () {
  console.log('setImmediate延迟执行1')
  // 进入下次循环
  process.nextTick(function () {
    console.log('强势插入')
  })
})
setImmediate(function () {
  console.log('setImmediate延迟执行2')
})
console.log('正常执行')
```

书中给出的执行结果是：

```
正常执行
nextTick延迟执行1
nextTick延迟执行2
setImmediate延迟执行1
强势插入
setImmediate延迟执行2
```

朴老师写那本书的时候，node最新版本为0.10.13，而我的版本是6.x

老版本的Node会优先执行process.nextTick。
当process.nextTick队列执行完后再执行一个setImmediate任务。
然后再次回到新的事件循环。所以执行完第一个setImmediate后，队列里只剩下第一个setImmediate里的process.nextTick和第二个setImmediate。
所以process.nextTick会先执行。

而在新版的Node中，process.nextTick执行完后，会循环遍历setImmediate，将setImmediate都执行完毕后再跳出循环。
所以两个setImmediate执行完后队列里只剩下第一个setImmediate里的process.nextTick。最后输出"强势插入"。

**关于优先级的另一个比较清晰的版本：**
观察者优先级
在每次轮训检查中，各观察者的优先级分别是：
idle观察者 > I/O观察者 > check观察者。
idle观察者：process.nextTick
I/O观察者：一般性的I/O回调，如网络，文件，数据库I/O等
check观察者：setImmediate，setTimeout

**setImmediate 和 setTimeout 的优先级**
看下面这个例子：

```javascript
setImmediate(function () {
  console.log('1')
})
setTimeout(function () {
  console.log('2')
}, 0)
console.log('3')
// 输出结果是3 2 1
```

我们知道现在HTML5规定setTimeout的最小间隔时间是4ms，也就是说0实际上也会别默认设置为最小值4ms。我们把这个延迟加大
上面说到setTimeout 的优先级比 setImmediate的高，其实这种说法是有条件的。
再看下面这个例子，为setTimeout增加了一个延迟20ms的时间：

```javascript
setImmediate(function () {
  console.log('1')
})
setTimeout(function () {
  console.log('2')
}, 20)
console.log('3')
// 输出结果是3 2 1
```

试试打印出这个程序的执行时间：

```javascript
const t1 = +new Date()
setImmediate(function () {
  console.log('1')
})
setTimeout(function () {
  console.log('2')
}, 20)

console.log('3')
const t2 = +new Date()
console.log('time: ' + (t2 - t1))
// 输出
3
23
2
1
```

程序执行用了23ms, 也就是说，在script(整体代码)执行完之前，setTimeout已经过时了，所以当进入macro-task的时候setTimeout依然优先于setImmediate执行。如果我们把这个值调大一点呢？

```javascript
const t1 = +new Date()
setImmediate(function () {
  console.log('1')
})
setTimeout(function () {
  console.log('2')
}, 30)

console.log('3')
const t2 = +new Date()
console.log('time: ' + (t2 - t1))
// 输出
3
23
1
2
```

setImmediate早于setTimeout执行了，因为进入macro-task 循环的时候，setTimeout的定时器还没到。
以上实验是基于6.6.0版本Node.js测试，实际上在碰到类似这种问题的时候，最好的办法是参考标准，并查阅源码，不能死记概念和顺序，因为标准也是会变的。包括此文也是自学总结，经供参考。

## 53 手写实现函数节流

* created_at: 2023-03-10T15:08:23Z
* updated_at: 2023-03-10T15:08:24Z
* labels: JavaScript
* milestone: 中

现函数节流

[https://blog.csdn.net/beijiyang999/article/details/79836463](https://blog.csdn.net/beijiyang999/article/details/79836463)

 函数节流是什么

**对于持续触发的事件，规定一个间隔时间（n秒），每隔一段只能执行一次。**
函数防抖（debounce）与本篇说的函数节流（throttle）相似又不同。
函数防抖一般是指对于**在事件被触发n秒后再执行的回调，如果在这n秒内又重新被触发，则重新开始计时。**
二者都能防止函数过于频繁的调用。
区别在于，当事件持续被触发，如果触发时间间隔短于规定的等待时间（n秒），那么

* 函数防抖的情况下，函数将一直推迟执行，造成不会被执行的效果；
* 函数节流的情况下，函数将每个 n 秒执行一次。

 函数节流的实现

函数节流的实现有不同的思路，可以通过**时间戳实现**，也可以通过**定时器实现**。

 时间戳

 思路

只要触发，就用 Date 获取现在的时间，与上一次的时间比较。
如果时间差大于了规定的等待时间，就可以执行一次；
目标函数执行以后，就更新 previous 值，确保它是“上一次”的时间。
否则就等下一次触发时继续比较。

 代码如下

```javascript
function throttle (func, wait) {
  let previous = 0
  return function () {
    const now = +new Date()
    const context = this
    if (now - previous >= wait) {
      func.apply(context, arguments)
      previous = now // 执行后更新 previous 值
    }
  }
}
container.onmousemove = throttle(doSomething, 1000)
```

 定时器

 思路

用定时器实现时间间隔。
当定时器不存在，说明可以执行函数，于是定义一个定时器来向任务队列注册目标函数
目标函数执行后设置保存定时器ID变量为空
当定时器已经被定义，说明已经在等待过程中。则等待下次触发事件时再进行查看。

 代码

```javascript
function throttle (func, wait) {
  let time, context
  return function () {
    context = this
    if (!time) {
      time = setTimeout(function () {
        func.apply(context, arguments)
        time = null
      }, wait)
    }
  }
}
```

 效果差异

一个周期内：
时间戳实现的：先执行目标函数，后等待规定的时间段；
计时器实现的：先等待够规定时间，再执行。 即停止触发后，若定时器已经在任务队列里注册了目标函数，它也会执行最后一次。

 优化：二者结合

结合二者，实现一次触发，两次执行（先立即执行，结尾也有执行）

```javascript
function throttle (func, wait) {
  let previous = 0
  let context, args, time
  return function () {
    const now = +new Date()
    context = this
    args = arguments
    if (now - previous >= wait) { // 当距上一次执行的间隔大于规定，可以直接执行
      func.apply(context, args)
      previous = now
    } else { // 否则继续等待，结尾执行一次
      if (time) clearTimeout(time)
      time = setTimeout(
        () => {
          func.apply(context, args)
          time = null
        }
        , wait)
    }
  }
}
```

 问题

已经实现了一次触发，两次执行，有头有尾的效果。
问题是，上一个周期的“尾”和下一个周期的“头”之间，失去了对时间间隔的控制。

 修复

仔细查看，发现问题出在了 previous 的设置上。
仅仅在“可直接执行”的情况下更新了 previous 值，在通过计时器注册入任务队列后执行的情况下，忽略了 previous 的更新。
导致了 previous 的值不再是“上一次执行”时的时间，而是“上一次直接可执行情况下执行”的时间。
同时，引入变量 remaining 表示还需要等待的时间，来让尾部那一次的执行也符合时间间隔。

 完善后代码

```javascript
function throttle (func, wait) {
  let previous = 0
  let context, args, time, remaining

  return function () {
    const now = +new Date()
    context = this
    args = arguments
    remaining = wait - (now - previous) // 剩余的还需要等待的时间
    if (remaining <= 0) {
      func.apply(context, args)
      previous = now // 重置“上一次执行”的时间
    } else {
      if (time) {
        clearTimeout(time)
      }
      time = setTimeout(() => {
        func.apply(context, args)
        time = null
        previous = +new Date() // 重置“上一次执行”的时间
      }, remaining) // 等待还需等待的时间
    }
  }
}
```

 更进一步的优化

参考 underscore 与 mqyqingfeng ，实现是否启用第一次 / 尾部最后一次计时回调的执行。
设置 options 作为第三个参数，然后根据传的值判断到底哪种效果，约定:

* leading：false 表示禁用第一次执行
* trailing: false 表示禁用停止触发的回调

```javascript
function throttle (func, wait, options) {
  let time, context, args, result
  let previous = 0
  if (!options) options = {}

  const later = function () {
    previous = options.leading === false ? 0 : new Date().getTime()
    time = null
    func.apply(context, args)
    if (!time) context = args = null
  }

  const throttled = function () {
    const now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    const remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (time) {
        clearTimeout(time)
        time = null
      }
      previous = now
      func.apply(context, args)
      if (!time) context = args = null
    } else if (!time && options.trailing !== false) {
      time = setTimeout(later, remaining)
    }
  }
  return throttled
}
```

如果想添加一个取消功能：

```javascript
throttled.cancel = function () {
  clearTimeout(time)
  time = null
  previous = 0
}
```

## 54 请设计一个算法, 将两个有序数组合并为一个数组, 请不要使用concat以及sort方法

* created_at: 2023-03-10T15:12:33Z
* updated_at: 2023-07-25T06:15:51Z
* labels: JavaScript
* milestone: 中

可以使用双指针法来合并两个有序数组。具体步骤如下：

1. 创建一个新的数组来存储合并后的结果。
2. 初始化两个指针，分别指向两个数组的起始位置。
3. 比较两个指针所指向的元素，将较小的元素添加到新数组中，并将对应指针向后移动一位。
4. 重复步骤3，直到其中一个数组的指针超出了数组的范围。
5. 将剩余的未合并元素直接添加到新数组的末尾。
6. 返回新数组作为结果。

以下是用 JavaScript 实现的代码：

```javascript
function mergeArrays (arr1, arr2) {
  const merged = []
  let i = 0 // 第一个数组的指针
  let j = 0 // 第二个数组的指针

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i])
      i++
    } else {
      merged.push(arr2[j])
      j++
    }
  }

  // 将剩余的未合并元素添加到新数组的末尾
  while (i < arr1.length) {
    merged.push(arr1[i])
    i++
  }

  while (j < arr2.length) {
    merged.push(arr2[j])
    j++
  }

  return merged
}

// 示例
const arr1 = [1, 3, 5, 7]
const arr2 = [2, 4, 6, 8]
const mergedArray = mergeArrays(arr1, arr2)
console.log(mergedArray) // 输出 [1, 2, 3, 4, 5, 6, 7, 8]
```

这个算法的时间复杂度是 O(n)，其中 n 是两个数组的总长度。

## 55 常见清除浮动的解决方案有哪些

* created_at: 2023-03-10T15:13:18Z
* updated_at: 2024-10-22T07:14:27Z
* labels: CSS
* milestone: 中

除浮动的解决方案 （以下提供了八种解决方式）

 1、利用div定义height

```html
<style type="text/css">
 .div1 {
 background: #000080;
 border: 1px solid red; /*解决代码*/
 height: 200px;
 }

 .div2 {
 background: #800080;
 border: 1px solid red;
 height: 100px;
 margin-top: 10px
 }

 .left {
 float: left;
 width: 20%;
 height: 200px;
 background: #DDD
 }

 .right {
 float: right;
 width: 30%;
 height: 80px;
 background: #DDD
 }
</style>
<div class="div1">
 <div class="left">Left</div>
 <div class="right">Right</div>
</div>
<div class="div2">
 div2
</div>
```

原理：父级div手动定义height，就解决了父级div无法自动获取到高度的问题。

优点：简单、代码少、容易掌握

缺点：只适合高度固定的布局，要给出精确的高度，如果高度和父级div不一样时，会产生问题

**建议：不推荐使用，只建议高度固定的布局时使用**

 2、结尾处加空div标签 clear:both

```html
<style type="text/css">
 .div1 {
 background: #000080;
 border: 1px solid red
 }

 .div2 {
 background: #800080;
 border: 1px solid red;
 height: 100px;
 margin-top: 10px
 }

 .left {
 float: left;
 width: 20%;
 height: 200px;
 background: #DDD
 }

 .right {
 float: right;
 width: 30%;
 height: 80px;
 background: #DDD
 }

 /*清除浮动代码*/
 .clearfloat {
 clear: both
 }
</style>
<div class="div1">
 <div class="left">Left</div>
 <div class="right">Right</div>
 <div class="clearfloat"></div>
</div>
<div class="div2">
 div2
</div>
```

原理：添加一个空div，利用css提高的clear:both清除浮动，让父级div能自动获取到高度

优点：简单、代码少、浏览器支持好、不容易出现怪问题

缺点：不少初学者不理解原理；如果页面浮动布局多，就要增加很多空div，让人感觉很不好

**建议：不推荐使用，但此方法是以前主要使用的一种清除浮动方法**

 3、父级div定义 伪类:after 和 zoom

```html
<style type="text/css">
 .div1 {
 background: #000080;
 border: 1px solid red;
 }

 .div2 {
 background: #800080;
 border: 1px solid red;
 height: 100px;
 margin-top: 10px
 }

 .left {
 float: left;
 width: 20%;
 height: 200px;
 background: #DDD
 }

 .right {
 float: right;
 width: 30%;
 height: 80px;
 background: #DDD
 }

 /*清除浮动代码*/
 .clearfloat:after {
 display: block;
 clear: both;
 content: "";
 visibility: hidden;
 height: 0
 }

 .clearfloat {
 zoom: 1
 }
</style>
<div class="div1 clearfloat">
 <div class="left">Left</div>
 <div class="right">Right</div>
</div>
<div class="div2">
 div2
</div>
```

原理：IE8以上和非IE浏览器才支持:after，原理和方法2有点类似，zoom(IE转有属性)可解决ie6,ie7浮动问题

优点：浏览器支持好、不容易出现怪问题（目前：大型网站都有使用，如：腾迅，网易，新浪等等）

缺点：代码多、不少初学者不理解原理，要两句代码结合使用才能让主流浏览器都支持。

**建议：推荐使用，建议定义公共类，以减少CSS代码。**

 4、父级div定义 overflow:hidden

```html
<style type="text/css">
 .div1 {
 background: #000080;
 border: 1px solid red; /*解决代码*/
 width: 98%;
 overflow: hidden
 }

 .div2 {
 background: #800080;
 border: 1px solid red;
 height: 100px;
 margin-top: 10px;
 width: 98%
 }

 .left {
 float: left;
 width: 20%;
 height: 200px;
 background: #DDD
 }

 .right {
 float: right;
 width: 30%;
 height: 80px;
 background: #DDD
 }
</style>
<div class="div1">
 <div class="left">Left</div>
 <div class="right">Right</div>
</div>
<div class="div2">
 div2
</div>
```

原理：必须定义width或zoom:1，同时不能定义height，使用overflow:hidden时，浏览器会自动检查浮动区域的高度

优点：简单、代码少、浏览器支持好

缺点：不能和position配合使用，因为超出的尺寸的会被隐藏。

**建议：只推荐没有使用position或对overflow:hidden理解比较深的朋友使用。**

 5、父级div定义 overflow:auto

```html
<style type="text/css">
 .div1 {
 background: #000080;
 border: 1px solid red; /*解决代码*/
 width: 98%;
 overflow: auto
 }

 .div2 {
 background: #800080;
 border: 1px solid red;
 height: 100px;
 margin-top: 10px;
 width: 98%
 }

 .left {
 float: left;
 width: 20%;
 height: 200px;
 background: #DDD
 }

 .right {
 float: right;
 width: 30%;
 height: 80px;
 background: #DDD
 }
</style>
<div class="div1">
 <div class="left">Left</div>
 <div class="right">Right</div>
</div>
<div class="div2">
 div2
</div>
```

原理：必须定义width或zoom:1，同时不能定义height，使用overflow:auto时，浏览器会自动检查浮动区域的高度

优点：简单、代码少、浏览器支持好

缺点：内部宽高超过父级div时，会出现滚动条。

**建议：不推荐使用，如果你需要出现滚动条或者确保你的代码不会出现滚动条就使用吧。**

 6、父级div 也一起浮动

```html
<style type="text/css">
 .div1 {
 background: #000080;
 border: 1px solid red; /*解决代码*/
 width: 98%;
 margin-bottom: 10px;
 float: left
 }

 .div2 {
 background: #800080;
 border: 1px solid red;
 height: 100px;
 width: 98%; /*解决代码*/
 clear: both
 }

 .left {
 float: left;
 width: 20%;
 height: 200px;
 background: #DDD
 }

 .right {
 float: right;
 width: 30%;
 height: 80px;
 background: #DDD
 }
</style>
<div class="div1">
 <div class="left">Left</div>
 <div class="right">Right</div>
</div>
<div class="div2">
 div2
</div>
```

原理：所有代码一起浮动，就变成了一个整体

优点：没有优点

缺点：会产生新的浮动问题。

**建议：不推荐使用，只作了解。**

 7、父级div定义 display:table

```html
<style type="text/css">
 .div1 {
 background: #000080;
 border: 1px solid red; /*解决代码*/
 width: 98%;
 display: table;
 margin-bottom: 10px;
 }

 .div2 {
 background: #800080;
 border: 1px solid red;
 height: 100px;
 width: 98%;
 }

 .left {
 float: left;
 width: 20%;
 height: 200px;
 background: #DDD
 }

 .right {
 float: right;
 width: 30%;
 height: 80px;
 background: #DDD
 }
</style>
<div class="div1">
 <div class="left">Left</div>
 <div class="right">Right</div>
</div>
<div class="div2">
 div2
</div>
```

原理：将div属性变成表格

优点：没有优点

缺点：会产生新的未知问题。

**建议：不推荐使用，只作了解。**

 8、结尾处加 br标签 clear:both

```html
<style type="text/css">
 .div1 {
 background: #000080;
 border: 1px solid red;
 margin-bottom: 10px;
 zoom: 1
 }

 .div2 {
 background: #800080;
 border: 1px solid red;
 height: 100px
 }

 .left {
 float: left;
 width: 20%;
 height: 200px;
 background: #DDD
 }

 .right {
 float: right;
 width: 30%;
 height: 80px;
 background: #DDD
 }

 .clearfloat {
 clear: both
 }
</style>
<div class="div1">
 <div class="left">Left</div>
 <div class="right">Right</div>
 <br class="clearfloat"/>
</div>
<div class="div2">
 div2
</div>
```

原理：父级div定义zoom:1来解决IE浮动问题，结尾处加 br标签 clear:both

**建议：不推荐使用，只作了解。**

## 56 [ES6]模块与[CommonJS]模块的差异有哪些？

* created_at: 2023-03-10T15:14:01Z
* updated_at: 2023-08-22T16:26:07Z
* labels: JavaScript
* milestone: 中

差异主要有如下几点：

* CommonJS 输出是值的拷贝，即原来模块中的值改变不会影响已经加载的该值，ES6静态分析，动态引用，输出的是值的引用，值改变，引用也改变，即原来模块中的值改变则该加载的值也改变。
* CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
* CommonJS 加载的是整个模块，即将所有的接口全部加载进来，ES6 可以单独加载其中的某个接口（方法），
* CommonJS this 指向当前模块，ES6 this 指向undefined

CommonJS 模块输出的是值的拷贝，也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
ES6 模块的运行机制与 CommonJS 不一样。
JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。
等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。
ES6 模块不会缓存运行结果，而是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。

-----------------------------------
> 2023.08.23 补充

下面是一个表格，展示了ES6模块与CommonJS模块之间的差异：

| 特点 | ES6模块 | CommonJS模块 |
|------------------------------|-------------------------------------------|-------------------------------------------|
| 语法 | 使用`import`和`export`语法 | 使用`require`和`module.exports`语法 |
| 动态导入 | 支持动态导入，可以根据条件导入不同的模块 | 不支持动态导入，导入的模块在脚本加载时确定 |
| 导入和导出的类型 | 可以导入和导出变量、函数、类、默认导出等多种类型 | 只能导入和导出整个模块对象 |
| 导入方式 | 可以使用命名导入和默认导入方式 | 只支持命名导入方式 |
| 导出方式 | 可以使用命名导出和默认导出方式 | 只支持命名导出方式 |
| 模块加载时机 | 在编译时就会生成所有模块的依赖关系，可以进行静态分析 | 在运行时加载模块，无法进行静态分析 |
| 模块间的关系 | 每个ES6模块都有自己的作用域，相互之间没有依赖关系 | 模块之间共享相同的作用域，可以直接访问和修改导出的变量和函数 |
| 浏览器支持 | 部分浏览器原生支持，可以使用Babel转译实现兼容性 | 不支持，需要使用工具如Browserify、Webpack进行转译和打包 |
| Node.js使用 | 需要使用`--experimental-modules`标志启用ES模块支持 | 原生支持CommonJS模块 |

请注意，这些是一般规则，具体的差异可能因为不同的运行环境和工具而有所不同。

## 57 手写 Promise , 并描述其原理与实现

* created_at: 2023-03-10T15:16:34Z
* updated_at: 2023-03-10T15:18:47Z
* labels: JavaScript
* milestone: 高

rimise原理与实现

目录

<!-- toc -->

* [Promise 核心](#promise-%E6%A0%B8%E5%BF%83)
* [ES6 Promise细节](#es6-promise%E7%BB%86%E8%8A%82)
* [动手实现](#%E5%8A%A8%E6%89%8B%E5%AE%9E%E7%8E%B0)
[内部属性](#%E5%86%85%E9%83%A8%E5%B1%9E%E6%80%A7)
[执行器](#%E6%89%A7%E8%A1%8C%E5%99%A8)
[then方法](#then%E6%96%B9%E6%B3%95)

* [异步实现](#%E5%BC%82%E6%AD%A5%E5%AE%9E%E7%8E%B0)
* [then 返回值](#then-%E8%BF%94%E5%9B%9E%E5%80%BC)
* [具体代码](#%E5%85%B7%E4%BD%93%E4%BB%A3%E7%A0%81)

* [七段经典的Promise](#%E4%B8%83%E6%AE%B5%E7%BB%8F%E5%85%B8%E7%9A%84promise)
[demo1](#demo1)
[demo2](#demo2)
[demo3](#demo3)
[demo4](#demo4)
[demo5](#demo5)
[demo6](#demo6)
[demo7](#demo7)

* [参考文章](#%E5%8F%82%E8%80%83%E6%96%87%E7%AB%A0)

<!-- tocstop -->

 Promise 核心

* Promise 概括来说是对异步的执行结果的描述对象。（这句话的理解很重要）

* Promise 规范中规定了，promise 的状态只有3种：
* pending
* fulfilled
* rejected
 Promise 的状态一旦改变则不会再改变。
* Promise 规范中还规定了 Promise 中必须有 then 方法，这个方法也是实现异步的链式操作的基本。

S6 Promise细节

* Promise 构造器中必须传入函数，否则会抛出错误。(没有执行器还怎么做异步操作。。。)

* Promise.prototype上的 catch(onrejected) 方法是 then(null,onrejected) 的别名,并且会处理链之前的任何的reject。
* Promise.prototype 上的 then和 catch 方法总会返回一个全新的 Promise 对象。
* 如果传入构造器的函数中抛出了错误,该 promise 对象的[[PromiseStatus]]会赋值为 rejected，并且[[PromiseValue]]赋值为 Error 对象。
* then 中的回调如果抛出错误，返回的 promise 对象的[[PromiseStatus]]会赋值为 rejected，并且[[PromiseValue]]赋值为 Error 对象。
* then 中的回调返回值会影响 then 返回的 promise 对象。(下文会具体分析)

手实现

做了上面的铺垫，实现一个 Promise 的思路就清晰很多了，本文使用 ES6 来进行实现，
暂且把这个类取名为 GPromise吧(不覆盖原生的，便于和原生进行对比测试)。
下文中 GPromise 代指将要实现的类，Promise 代指 ES6中的 Promise 类。

 内部属性

在浏览器中打印出一个 Promise 实例会发现其中会包括两用”[[ ]]”包裹起来的属性，这是系统内部属性，只有JS 引擎能够访问。

```
[[PromiseStatus]]
[[PromiseValue]]
```

以上两个属性分别是 Promise 对象的状态和最终值。

我们自己不能实现内部属性，JS中私有属性特性(#修饰符现在还是提案)暂时也没有支持，
所以暂且用”_”前缀规定私有属性，这样就模拟了Promise 中的两个内部属性。

```js
class GPromise {
  constructor (executor) {
    this._promiseStatus = GPromise.PENDING
    this._promiseValue
    this.execute(executor)
  }

  execute (executor) {
    // ...
  }

  then (onfulfilled, onrejected) {
    // ...
  }
}

GPromise.PENDING = 'pedding'
GPromise.FULFILLED = 'resolved'
GPromise.REJECTED = 'rejected'
```

 执行器

* 传入构造器的executor为函数，并且在构造时就会执行。

* 我们给 executor 中传入 resolve 和 reject 参数，这两个参数都是函数，用于改变改变 _promiseStatus和_promiseValue 的值。
* 并且内部做了捕获异常的操作，一旦传入的executor 函数执行抛出错误，GPromise 实例会变成 rejected状态，
 即 _promiseStatus赋值为’rejected’，并且_promiseValue赋值为Error对象。

```js
execute(executor) {
 if (typeof executor != 'function') {
 throw new Error(` GPromise resolver ${executor} is not a function`);
 }
 //捕获错误
 try {
 executor(data => {
 this.promiseStatus = GPromise.FULFILLED;
 this.promiseValue = data;
 }, data => {
 this.promiseStatus = GPromise.REJECTED;
 this.promiseValue = data; 
 });
 } catch (e) {
 this.promiseStatus = GPromise.REJECTED;
 this.promiseValue = e;
 }
}
```

 then方法

 异步实现

then 方法内部逻辑稍微复杂点，并且有一点一定一定一定要注意到: then 方法中的回调是异步执行的，思考下下段代码:

```js
console.log(1)
new Promise((resolve, reject) => {
  console.log(2)
  resolve()
})
  .then(() => console.log(3))
console.log(4)
```

执行结果是什么呢？答案其实是:1 2 4 3。

then 方法中的难点就是处理异步,其中一个方案是通过 setInterval来监听GPromise 对象的状态改变，
一旦改变则执行相应then 中相应的回调函数(onfulfilled和onrejected),这样回调函数就能够插入事件队列末尾，
异步执行，实验证明可行，这种方案是最直观也最容易理解的。

 then 返回值

then 方法的返回值是一个新的 GPromise 对象，并且这个对象的状态和 then 中的回调返回值相关，回调指代传入的 onfulfilled 和 rejected。

1. 如果 then 中的回调抛出了错误，返回的 GPromise 的 _promiseStatus 赋值为’rejected’，_promiseValue赋值为抛出的错误对象。
2. 如果回调返回了一个非 GPromise 对象， then返回的 GPromise 的 _promiseStatus 赋值为’resolved’，_promiseValue赋值为回调的返回值。
3. 如果回调返回了一个 GPromise 对象，then返回的GPromise对象 的_promiseStatus和_promiseValue 和其保持同步。也就是 then 返回的GPromise记录了回调返回的状态和值，不是直接返回回调的返回值。

 具体代码

```js
then(onfulfilled, onrejected) {
 let _ref = null,
 timer = null,
 result = new GPromise(() => {});

 //因为 promise 的 executor 是异步操作,需要监听 promise 对象状态变化，并且不能阻塞线程
 timer = setInterval(() => {
 if ((typeof onfulfilled == 'function' && this._promiseStatus == GPromise.FULFILLED) ||
 (typeof onrejected == 'function' && this._promiseStatus == GPromise.REJECTED)) {
 //状态发生变化，取消监听
 clearInterval(timer);
 //捕获传入 then 中的回调的错误，交给 then 返回的 promise 处理
 try {
 if (this._promiseStatus == GPromise.FULFILLED) {
 _ref = onfulfilled(this._promiseValue);
 } else {
 _ref = onrejected(this._promiseValue);
 }

 //根据回调的返回值来决定 then 返回的 GPromise 实例的状态
 if (_ref instanceof GPromise) {
 //如果回调函数中返回的是 GPromise 实例，那么需要监听其状态变化，返回新实例的状态是根据其变化相应的
 timer = setInterval(()=>{
 if (_ref._promiseStatus == GPromise.FULFILLED ||
 _ref._promiseStatus == GPromise.REJECTED) {
 clearInterval(timer);
 result._promiseValue = _ref._promiseValue;
 result._promiseStatus = _ref._promiseStatus;
 }
 },0);

 } else {
 //如果返回的是非 GPromise 实例
 result._promiseValue = _ref;
 result._promiseStatus = GPromise.FULFILLED;
 }
 } catch (e) {
 //回调中抛出错误的情况
 result._promiseStatus = GPromise.REJECTED;
 result._promiseValue = e;
 }
 }
 }, 0);
 //promise 之所以能够链式操作，因为返回了GPromise对象
 return result;
 }
```

段经典的Promise

Promise 的 then 的 注册微任务队列 和 执行 是分离的。
注册 : 是完全遵循 JS 和 Promise 的代码的执行过程。
执行 : 先 同步，再 微任务 ，再 宏观任务。

 demo1

```js
/**
promise 是可连续执行的？
是可以的！
 */

new Promise((resolve, reject) => {
  console.log(1)
  // return reject();
  return resolve()
})
  .then(() => {
    console.log(2)
  })
  .then(() => {
    console.log(3)
  })
  .then(() => {
    console.log(4)
  })
  .catch(() => {
    console.log('catch')
  })
  .finally(() => {
    console.log('finally')
  })
```

 demo2

```js
new Promise((resolve, reject) => {
  console.log(1)
  return resolve()
}).then(() => {
  console.log(2)
  // 外部第一个 then 方法里面 return 一个 Promise，这个 return ，代表 外部的第二个 then 的执行需要等待 return 之后的结果。
  return new Promise((resolve) => {
    console.log(3)

    return resolve()
  })
    .then(() => {
      console.log(4)
    })
    .then(() => {
      console.log(5)
    })
}).then(() => {
  console.log(6)
}).then(() => {
  console.log(7)
})
```

 demo3

```js
// 我们核心要看 then 的回调函数是啥时候注册的，我们知道，事件机制是 “先注册先执行”，
// 即数据结构中的 “栈” 的模式，first in first out。那么重点我们来看下他们谁先注册的。

// 外部的第二个 then 的注册，需要等待 外部的第一个 then 的同步代码执行完成。
// 当执行内部的 new Promise 的时候，然后碰到 resolve，resolve 执行完成，
// 代表此时的该 Promise 状态已经扭转，之后开始内部的第一个 .then 的微任务的注册，此时同步执行完成。
new Promise((resolve) => {
  console.log(1)
  return resolve()
}).then(() => {
  console.log(2)
  // 内部的 resolve 之后，当然是先执行内部的 new Promise 的第一个 then 的注册，这个 new Promise 执行完成，立即同步执行了后面的 .then 的注册。
  new Promise((resolve) => {
    console.log(3)
    return resolve()
  })
    .then(() => {
      console.log(4)
    })
  // 然而这个内部的第二个 then 是需要第一个 then 的的执行完成来决定的，而第一个 then 的回调是没有执行，仅仅只是执行了同步的 .then 方法的注册，所以会进入等待状态。
    .then(() => {
      console.log(5)
    })
    .then(() => {
      console.log(6)
    })
}).then(() => {
  // 外部的第一个 then 的同步操作已经完成了，
  // 然后开始注册外部的第二个 then，此时外部的同步任务也都完成了。
  // 外部第二个 then 完成之后， 进入等待， 内部的第二个 then 注册之后在执行
  console.log(7)
}).then(() => {
  console.log(8)
}).then(() => {
  console.log(9)
})
```

 demo4

```js
/**
链式调用的注册是前后依赖的 比如上面的外部的第二个 then 的注册，是需要外部的第一个的 then 的执行完成。
 *
变量定义的方式，注册都是同步的 比如这里的 p.then 和 var p = new Promise 都是同步执行的。
 */
new Promise(resolve => {
  console.log('1')
  resolve()
})
  .then(() => {
    console.log(2)
    const p = new Promise(resove => {
      console.log(3)
      resove()
    })

    p.then(() => {
      console.log(4)
    })

    p.then(() => {
      console.log(5)
    })
  })
  .then(() => {
    console.log(6)
  })
  .then(() => {
    console.log(7)
  })
```

 demo5

```js
/**
这段代码中，外部的注册采用了非链式调用的写法，根据上面的讲解，
我们知道了外部代码的 p.then 是并列同步注册的。
所以代码在内部的 new Promise 执行完，p.then 就都同步注册完了。
 *
内部的第一个 then 注册之后，
就开始执行外部的第二个 then 了（外部的第二个 then 和 外部的第一个 then 都是同步注册完了）。
然后再依次执行内部的第一个 then ,内部的第二个 then。
@type {Promise}
 */
const p = new Promise(resolve => {
  console.log(1)
  resolve()
})

p.then(() => {
  console.log(2)
  new Promise(resolve => {
    console.log(3)
    resolve()
  })
    .then(() => {
      console.log(4)
    })
    .then(() => {
      console.log(5)
    })
})

p.then(() => {
  console.log(6)
})

p.then(() => {
  console.log(7)
})
```

 demo6

```js
new Promise(resolve => {
  console.log(1)
  resolve()
})
  .then(() => {
    console.log(2)
    new Promise(resolve => {
      console.log(3)
      resolve()
    })
      .then(() => {
        console.log(4)
      })
      .then(() => {
        console.log(5)
      })

    return new Promise(resolve => {
      console.log(6)
      resolve()
    })
      .then(() => {
        console.log(7)
      })
      .then(() => {
        console.log(8)
      })
  })
  .then(() => {
    console.log(9)
  })
  .then(() => {
    console.log(10)
  })
```

 demo7

```js
new Promise((resolve, reject) => {
  console.log('外部promise')
  resolve()
})
  .then(() => {
    console.log('外部第一个then')
    new Promise((resolve, reject) => {
      console.log('内部promise')
      resolve()
    })
      .then(() => {
        console.log('内部第一个then')
        return Promise.resolve()
      })
      .then(() => {
        console.log('内部第二个then')
      })
  })
  .then(() => {
    console.log('外部第二个then')
  })
  .then(() => {
    console.log('外部第三个then')
  })
```

考文章

* [解析 Promise 原理，实现一个Promise](https://blog.csdn.net/u014775861/article/details/78030508)

* [深度揭秘 Promise 微任务注册和执行过程](https://juejin.im/post/5dc028dcf265da4d4b5fe94f)
* [Promise 执行过程的正确理解姿势](https://juejin.im/post/5dad3405f265da5bb252ff32)

## 58 `display: none;`与`visibility: hidden;`的区别是啥

* created_at: 2023-03-10T15:17:41Z
* updated_at: 2023-03-10T15:18:10Z
* labels: CSS
* milestone: 中

联系：它们都能让元素不可见

区别：

1. display:none;会让元素完全从渲染树中消失，渲染的时候不占据任何空间；
 visibility: hidden;不会让元素从渲染树消失，渲染师元素继续占据空间，只是内容不可见
2. display: none;是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示；
 visibility: hidden;是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式
3. 修改常规流中元素的display通常会造成文档重排。修改visibility属性只会造成本元素的重绘。
4. 读屏器不会读取display: none;元素内容；会读取visibility: hidden;元素内容

## 59 `display: block;`和`display: inline;`的区别

* created_at: 2023-03-10T15:19:36Z
* updated_at: 2023-03-10T15:19:37Z
* labels: CSS
* milestone: 中

``block``元素特点：

1.处于常规流中时，如果``width``没有设置，会自动填充满父容器
2.可以应用``margin/padding``
3.在没有设置高度的情况下会扩展高度以包含常规流中的子元素
4.处于常规流中时布局时在前后元素位置之间（独占一个水平空间）
5.忽略``vertical-align``

``inline``元素特点

1.水平方向上根据``direction``依次布局
2.不会在元素前后进行换行
3.受``white-space``控制
4.``margin/padding``在竖直方向上无效，水平方向上有效
5.``width/height``属性对非替换行内元素无效，宽度由元素内容决定
6.非替换行内元素的行框高由``line-height``确定，替换行内元素的行框高由``height``,``margin``,``padding``,``border``决定
6.浮动或绝对定位时会转换为``block``
7.``vertical-align``属性生效

## 60 海量数据的处理问题: 如何从10亿个数中找出最大的10000个数？

* created_at: 2023-03-10T15:24:14Z
* updated_at: 2024-12-25T01:40:02Z
* labels: JavaScript
* milestone: 中

从10亿个数中找出最大的10000个数是一项非常具有挑战性的任务，需要使用高效的算法和数据结构来处理。

以下是一种基于分治思想的常见方法：

将10亿个数分成1000个小文件，每个文件包含100万个数。
对每个小文件进行排序，选出每个文件中最大的1000个数，并将它们放入一个临时文件中。
将1000个临时文件合并成一个大文件，并再次对其进行排序。
选出最大的10000个数。

这种方法的时间复杂度为O(N*log(N/K))，其中N是所有数据的数量，K是每个小文件中的数据量。由于K相对较小，因此这种方法非常高效。

## 61 浏览器的主要组成部分是什么？

* created_at: 2023-03-11T06:44:18Z
* updated_at: 2023-03-11T06:44:19Z
* labels: 浏览器
* milestone: 初

浏览器的主要组成部分是什么

* **用户界面** - 包括地址栏、前进/后退按钮、书签菜单等。除了浏览器主窗口显示的您请求的页面外，其他显示的各个部分都属于用户界面。
* **浏览器引擎** - 在用户界面和呈现引擎之间传送指令。
* **呈现引擎** - 负责显示请求的内容。如果请求的内容是 HTML，它就负责解析 HTML 和 CSS 内容，并将解析后的内容显示在屏幕上。
* **网络** - 用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。
* **用户界面后端** - 用于绘制基本的窗口小部件，比如组合框和窗口。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。
* **JavaScript 解释器** - 用于解析和执行 JavaScript 代码。
* **数据存储。这是持久层** - 浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范 (HTML5) 定义了“网络数据库”，这是一个完整（但是轻便）的浏览器内数据库。

## 62 浏览器如何解析css选择器？

* created_at: 2023-03-11T06:47:36Z
* updated_at: 2023-03-11T08:15:20Z
* labels: 浏览器
* milestone: 高

浏览器会『从右往左』解析CSS选择器。

 CSS选择器的解析顺序

相信很多人在一开始接触CSS的时候都会看到一条规则就是尽量少使用层级关系，比如尽量不要写成：

```css
#div P.class {
 color: red;
}
```

而是写成：

```css
.class {
 color: red;
}
```

之所以需要这么写，给的解释是这样可以减少选择器匹配的次数。
初看觉得哦，有点道理啊，但是往细了再想想：
如果我把层级定的足够的清晰分明，那不是可以直接去掉很多不对应的CSS选择器的索引路径的么？为什么都是建议少使用层级关系呢？

原因其实很简单，我们犯了一个经验主义错误，默认CSS选择器是从左往右进行解析的，实际上恰恰相反，CSS选择器是从右往左解析的。

 CSS选择器进行优化的必要性

再次看下图：
![img](https://img-blog.csdn.net/20160805094241153)

在图中我们可以看到HTML解析出了一颗DOM tree，与此同时样式脚本则解析生成了一个style rules，也可以说是一个CSS tree。
最后，DOM tree同style rules一同结合解析出一颗Render Tree，
而Render Tree就是包含了一个dom对象以及为其计算好的样式规则，提供了布局以及显示方法。

因为不清楚一个DOM对象上究竟对应着哪些样式规则，所以只能选择一个最笨的办法，
即每一个DOM对象都遍历一遍style rules，DOM对象的数量相信大家也都清楚，
如果每次遍历style rules都是像一个晒太阳的老大爷一样的悠哉游哉，因此对CSS选择器进行优化就是一个必须的事情了。

 从右往左解析到底好在哪里

假如有如下的一段HTML：

```html
<div id="div1">
 <div class="a">
 <div class="b">
 ...
 </div>
 <div class="c">
 <div class="d">
 ...
 </div>
 <div class="e">
 ...
 </div>
 </div>
 </div>
 <div class="f">
 <div class="c">
 <div class="d">
 ...
 </div>
 </div>
 </div>
</div>
```

和如下的CSS：

```css
#div1 .c .d {}
.f .c .d {}
.a .c .e {}
#div1 .f {}
.c .d{}
```

假如我们的CSS解析器是从左往右进行匹配的，那么会生成如下的style rules：
![01_47_03](https://user-images.githubusercontent.com/22188674/224469670-1156d32e-ea84-4a5a-9323-308d2db320b3.jpg)

首先，#div1 .c .d ｛｝ .f .c .d ｛｝.c .d｛｝这三个选择器里面都含有 **.c .d｛｝这么一个公用样式，**
所以哪怕是我们的DOM节点明确了是在#div1下面都必须对style rules进行全部的匹配查找，
这样一来基本上可以说是**每一个DOM节点都必须完全遍历一遍style rules**，
不然搞不好就会漏掉一些公用样式之类的，所以想着将层级写的更加详细就能去掉很多不对应的CSS选择器的索引路径的就不要想了，
不管你写的多细，你总是需要把整个style rules都遍历一遍，不然万一漏掉了某个公用样式不就思密达了？

那么如果我们换成从右向左进行解析就能够避免这种情况了么？请看下面这个style rules：
![01_47_04](https://user-images.githubusercontent.com/22188674/224469699-0dc5d98b-3995-4cb9-b4ae-375441dcc995.jpeg)

别的先不提，**最少这个节点就少了很多**嘛，哪怕我这里同样是需要全部遍历一遍就冲着减少了这么多个节点也要从右往左进行解析啊！
更重要的是，只要有公用样式，那么选择器最右边的那个类型选择器一定是相同的，如此公共样式就很自然的都集中到一个分支上，
这个时候我们**完全可以将其他不匹配的路径全部去掉而不用担心会漏掉某些个公用样式了**。
虽然当这颗CSS树在遍历的时候还有有部分节点会遍历到最后才能确定到底是不是匹配的，
但总的来说从**右往左进行解析还是会比从左往右解析要少很多次的匹配**，这样带来的效率提升是显而易见的！

同时，这也是不建议使用*通配符来进行样式匹配的原因：浏览器专门建立了一个反常规思维的从右往左的匹配规则就是为了避免对所有元素进行遍历。

最后，从右往左进行解析还有一个好处那就是从右往左进行匹配的时候，匹配的全部是DOM元素的父节点，
而从左往右进行匹配的时候时候，匹配的全部是DOM元素的子节点，这样就**避免了HTML与CSS没有下载完需要进行等待的情形**。

## 63 浏览器是如何渲染UI的？

* created_at: 2023-03-11T06:50:04Z
* updated_at: 2023-03-11T06:50:05Z
* labels: 浏览器
* milestone: 中

浏览器渲染UI的过程通常被称为渲染流水线（rendering pipeline），它可以分为以下几个步骤：

1. 解析HTML：浏览器首先解析HTML代码，创建DOM（文档对象模型）树。DOM树是由节点和对象组成的层次结构，它表示了文档的内容和结构。

2. 解析CSS：浏览器接着解析CSS代码，创建CSSOM（CSS对象模型）树。CSSOM树是由CSS规则和对应的元素组成的层次结构，它表示了文档中的元素的样式信息。

3. 创建渲染树：浏览器将DOM树和CSSOM树结合起来，生成渲染树。渲染树只包含需要显示的元素，它是一种按照渲染顺序排列的树形结构。

4. 布局：浏览器对渲染树进行布局（layout），计算每个元素在屏幕上的位置和大小。

5. 绘制：浏览器将渲染树中的每个元素绘制到屏幕上。

6. 合成：如果有多个层叠的元素，浏览器将它们合成一个图层，以提高性能。

这些步骤通常是逐步完成的，而且它们是相互依赖的。例如，布局必须在绘制之前完成，因为绘制需要知道每个元素的位置和大小。为了提高性能，浏览器通常会对这些步骤进行优化，例如使用异步布局和延迟合成等技术。

## 64 浏览器 DOM Tree是如何构建的？

* created_at: 2023-03-11T06:51:52Z
* updated_at: 2023-03-11T06:51:53Z
* labels: 浏览器
* milestone: 中

浏览器构建DOM树的过程包括以下几个步骤：

1. 解析HTML代码：浏览器会将HTML代码解析成一个DOM树的结构。

2. 创建根节点：DOM树的根节点通常是HTML元素。

3. 创建子节点：根据HTML标记的嵌套关系，浏览器会在DOM树中创建相应的子节点，每个节点表示一个HTML元素。

4. 创建属性节点：HTML元素可能有一些属性，例如id、class、src等，浏览器会将这些属性创建为节点的属性节点。

5. 创建文本节点：如果HTML元素中包含文本内容，浏览器会将这些文本内容创建为文本节点，并将它们作为元素的子节点插入到DOM树中。

6. 创建注释节点：HTML代码中可能包含注释，浏览器会将注释创建为注释节点，并将它们插入到DOM树中。

7. 构建完整的DOM树：经过以上步骤，浏览器会将所有HTML代码解析成一个完整的DOM树。

需要注意的是，浏览器构建DOM树是一个逐步进行的过程，解析器会逐个读取HTML标记，并创建相应的节点，直到解析完整个HTML代码。在这个过程中，如果遇到错误的HTML标记，浏览器也会尽可能地将其解析成一个节点，以保证DOM树的完整性。

## 65 常见的浏览器内核有哪些，有啥区别？

* created_at: 2023-03-11T06:56:01Z
* updated_at: 2023-03-11T06:56:02Z
* labels: 浏览器
* milestone: 中

常见的浏览器内核包括：

* **Trident内核**：由Microsoft开发，主要用于Internet Explorer浏览器，也是Windows系统自带的默认浏览器内核。该内核在HTML和CSS的解释、渲染方面存在一些问题，但在JavaScript引擎的处理上表现较为出色。

* **Gecko内核**：由Mozilla开发，主要用于Firefox浏览器。该内核在HTML和CSS的解释、渲染方面表现较好，同时也有较强的JavaScript引擎。

* **WebKit内核**：由苹果公司开发，最初是为Safari浏览器所用。该内核在HTML、CSS和JavaScript处理方面都表现出色，支持的CSS特性较多。

* **Blink内核**：由Google和Opera Software共同开发，用于Chrome浏览器和Opera浏览器。该内核是Webkit内核的一个分支，对Web标准的支持也非常好。

这些浏览器内核之间的主要区别在于对Web标准的支持程度、渲染引擎的处理能力、JavaScript引擎的性能、浏览器的兼容性等方面。此外，不同的浏览器内核也会有一些独特的特性和优化，以满足不同用户的需求。

面是一个简单的表格对比

## 66 重绘与重排的区别？

* created_at: 2023-03-11T07:47:40Z
* updated_at: 2023-09-09T06:17:28Z
* labels: 浏览器
* milestone: 中

浏览器重绘（Repaint）和重排（Reflow）是Web页面中常见的两种渲染方式，它们的区别如下：

1. 重排（Reflow）：当DOM元素的结构或者布局发生变化时，浏览器需要重新计算元素的几何属性（比如位置、大小等），然后重新构建渲染树，这个过程叫做重排。重排的代价比较高，因为需要浏览器重新计算和布局，会消耗较多的CPU资源和时间。

2. 重绘（Repaint）：当元素的样式（如背景颜色、字体颜色、边框颜色等）发生变化时，浏览器会重新绘制元素的样式，这个过程叫做重绘。重绘的代价比较低，因为不需要重新计算元素的位置和大小，只需要重新绘制元素的样式即可。

因此，重排会触发重绘，但是重绘不一定会触发重排。在Web开发中，我们应该尽量避免频繁的重排和重绘，以提高页面的性能。一些常见的优化方式包括：减少DOM操作、使用CSS3动画代替JavaScript动画、避免使用table布局等。

下面是它们的区别：

| 区别 | 重绘 | 重排 |
|--------------|--------------------------------------------------------|--------------------------------------------------------|
| 定义 | 更新元素的可见样式，但不影响布局 | 更新元素的布局和尺寸 |
| 影响范围 | 仅影响元素的外观，不影响其他元素 | 影响元素及其周围的布局、尺寸和位置 |
| 执行顺序 | 在重排之后执行 | 在重绘之前执行 |
| 开销 | 开销较小，不涉及元素的重新布局和计算 | 开销较大，需要重新计算元素的布局和位置 |
| 触发条件 | 元素的可见样式属性发生变化，例如颜色、背景、阴影等 | 元素的尺寸、布局属性发生变化，例如宽度、高度、边距等 |
| 优化建议 | 使用 CSS3 的 transform 和 opacity 属性实现动画效果 | 批量更新样式，使用文档片段进行 DOM 操作，禁用动画效果，减少样式计算 |
| 示例 | 更改颜色、背景、边框等 | 更改尺寸、位置、边距、文本内容等 |

请注意，重绘和重排是相互关联的，当发生重排时，会随之引发重绘。因此，为了提高性能，应该尽量减少重绘和重排的次数。

## 68 如何避免重绘或者重排？

* created_at: 2023-03-11T08:05:32Z
* updated_at: 2023-03-11T08:15:20Z
* labels: JavaScript
* milestone: 高

何触发重排和重绘

任何改变用来构建渲染树的信息都会导致一次重排或重绘：

* 添加、删除、更新DOM节点
* 通过display: none隐藏一个DOM节点-触发重排和重绘
* 通过visibility: hidden隐藏一个DOM节点-只触发重绘，因为没有几何变化
* 移动或者给页面中的DOM节点添加动画
* 添加一个样式表，调整样式属性
* 用户行为，例如调整窗口大小，改变字号，或者滚动。

何避免重绘或者重排

 集中改变样式

我们往往通过改变class的方式来集中改变样式

```js
// 判断是否是黑色系样式
const theme = isDark ? 'dark' : 'light'

// 根据判断来设置不同的class
ele.setAttribute('className', theme)
```

 使用DocumentFragment

我们可以通过createDocumentFragment创建一个游离于DOM树之外的节点，然后在此节点上批量操作，最后插入DOM树中，因此只触发一次重排

```js
const fragment = document.createDocumentFragment()

for (let i = 0; i < 10; i++) {
  const node = document.createElement('p')
  node.innerHTML = i
  fragment.appendChild(node)
}

document.body.appendChild(fragment)
```

 提升为合成层

元素提升为合成层有以下优点：

* 合成层的位图，会交由 GPU 合成，比 CPU 处理要快
* 当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
* 对于 transform 和 opacity 效果，不会触发 layout 和 paint

提升合成层的最好方式是使用 CSS 的 will-change 属性：

```css
#target {
 will-change: transform;
}
```

## 69 前端如何实现即时通讯？

* created_at: 2023-03-11T08:06:25Z
* updated_at: 2023-03-28T15:48:17Z
* labels: 网络
* milestone: 高

端如何实现即时通讯

 短轮询

短轮询的原理很简单，每隔一段时间客户端就发出一个请求，去获取服务器最新的数据，一定程度上模拟实现了即时通讯。

* 优点：兼容性强，实现非常简单
* 缺点：延迟性高，非常消耗请求资源，影响性能

 comet

comet有两种主要实现手段，
一种是基于 AJAX 的长轮询（long-polling）方式，
另一种是基于 Iframe 及 htmlfile 的流（streaming）方式，通常被叫做长连接。

具体两种手段的操作方法请移步 [Comet技术详解：基于HTTP长连接的Web端实时通信技术](http://www.52im.net/thread-334-1-1.html)

* 长轮询优缺点：
* 优点：兼容性好，资源浪费较小
* 缺点：服务器hold连接会消耗资源，返回数据顺序无保证，难于管理维护

* 长连接优缺点：
* 优点：兼容性好，消息即时到达，不发无用请求
* 缺点：服务器维护长连接消耗资源

 SSE

SSE（Server-Sent Event，服务端推送事件）是一种允许服务端向客户端推送新数据的HTML5技术。

* 优点：基于HTTP而生，因此不需要太多改造就能使用，使用方便，而websocket非常复杂，必须借助成熟的库或框架
* 缺点：基于文本传输效率没有websocket高，不是严格的双向通信，客户端向服务端发送请求无法复用之前的连接，需要重新发出独立的请求

 Websocket

Websocket是一个全新的、独立的协议，基于TCP协议，与http协议兼容、却不会融入http协议，仅仅作为html5的一部分，其作用就是在服务器和客户端之间建立实时的双向通信。

* 优点：真正意义上的实时双向通信，性能好，低延迟
* 缺点：独立与http的协议，因此需要额外的项目改造，使用复杂度高，必须引入成熟的库，无法兼容低版本浏览器

 Web Worker

Web Worker 的作用，就是为 JavaScript 创造多线程环境，允许主线程创建 Worker 线程，将一些任务分配给后者运行

 Service workers

Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理，创建有效的离线体验。

## 70 前端做错误监控？

* created_at: 2023-03-11T08:09:14Z
* updated_at: 2023-03-11T08:15:21Z
* labels: JavaScript
* milestone: 高

误监控

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

```javascript
window.addEventListener('error', function (e) {
  console.log('捕获', e)
}, true)
```

跨域是可以捕获的:
1）、在script标签添加crossorigin属性
2)、在js响应头添加Access-Control-Allow-Origin:*;

上报错误：ajax通信方式上报、通过Image对象上报,非常简单
(new Image()).src='[资料](http://baidu.com/test/sdflijsd?=sdlfkj)';

## 72 TCP 和 UDP的区别？

* created_at: 2023-03-11T08:14:27Z
* updated_at: 2023-03-11T08:14:57Z
* labels: 网络
* milestone: 高

CP和UDP的区别

 TCP、UDP和HTTP关系

1、TCP/IP是个协议组，可分为三个层次：网络层、传输层和应用层。

在网络层有IP协议、ICMP协议、ARP协议、RARP协议和BOOTP协议。
在传输层中有TCP协议与UDP协议。
在应用层有FTP、HTTP、TELNET、SMTP、DNS等协议。
因此，HTTP本身就是一个协议，是从Web服务器传输超文本到本地浏览器的传送协议。

TCP 是基于 TCP 协议实现的网络文本协议,属于传输层。
UDP 是和TCP 对等的，属于传输层，UDP 和 TCP 有重要的区别。

2、HTTP协议是建立在请求/响应模型上的。

首先由客户建立一条与服务器的TCP链接，并发送一个请求到服务器，请求中包含请求方法、URI、协议版本以及相关的MIME样式的消息。
服务器响应一个状态行，包含消息的协议版本、一个成功和失败码以及相关的MIME式样的消息。
HTTP/1.0为每一次HTTP的请求/响应建立一条新的TCP链接，因此一个包含HTML内容和图片的页面将需要建立多次的短期的TCP链接。一次TCP链接的建立将需要3次握手。
另外，为了获得适当的传输速度，则需要TCP花费额外的回路链接时间（RTT）。
每一次链接的建立需要这种经常性的开销，而其并不带有实际有用的数据，只是保证链接的可靠性，
因此HTTP/1.1提出了可持续链接的实现方法。HTTP/1.1将只建立一次TCP的链接而重复地使用它传输一系列的请求/响应消息，因此减少了链接建立的次数和经常性的链接开销。

三次握手的过程:
第一次握手：建立连接时，客户端发送syn包（syn=j）到服务器，并进入SYN_SENT状态，等待服务器确认；SYN：同步序列编号（Synchronize Sequence Numbers）。
第二次握手：服务器收到syn包，必须确认客户的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN_RECV状态；ACK:确认字符(Acknowledgement)
第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1），此包发送完毕，客户端和服务器进入ESTABLISHED（TCP连接成功）状态，完成三次握手。

3、结论：虽然HTTP本身是一个协议，但其最终还是基于TCP的。

Socket是应用层与TCP/IP协议族通信的中间软件抽象层，它是一组接口。在设计模式中，Socket其实就是一个门面模式，它把复杂的TCP/IP协议族隐藏在Socket接口后面，对用户来说，一组简单的接口就是全部，让Socket去组织数据，以符合指定的协议。

![02-05-01](https://user-images.githubusercontent.com/22188674/224473152-067c338d-86d5-48ff-8197-85396a77b3c8.jpg)

HTTPS：（全称：Hypertext Transfer Protocol over Secure Socket Layer），是以安全为目标的HTTP通道，简单讲是HTTP的安全版。
即HTTP下加入SSL层，HTTPS的安全基础是SSL，因此加密的详细内容就需要SSL。

优点：**协议较成熟，应用广泛、基于TCP/IP，拥有TCP优点、研发成本很低，开发快速、开源软件较多**，nginx,apache,tomact等
缺点：**无状态、无连接**、只有PULL模式，不支持PUSH、数据报文较大
特性：**基于TCP/IP应用层协议、无状态，无连接**、支持C/S模式、适用于文本传输

 TCP

TCP（Transmission Control Protocol，传输控制协议）是基于连接的协议，也就是说，在正式收发数据前，必须和对方建立可靠的连接。
一个TCP连接必须要经过三次“对话”才能建立起来，其中的过程非常复杂，我们这里只做简单、形象的介绍，你只要做到能够理解这个过程即可。
我们来看看这三次对话的简单过程：主机A向主机B发出连接请求数据包：“我想给你发数据，可以吗？”，
这是第一次对话；主机B向主机A发送同意连接和要求同步（同步就是两台主机一个在发送，一个在接收，协调工作）的数据包：“可以，你什么时候发？”，这是第二次对话；
主机A再发出一个数据包确认主机B的要求同步：“我现在就发，你接着吧！”，这是第三次对话。
三次“对话”的目的是使数据包的发送和接收同步，经过三次“对话”之后，主机A才向主机B正式发送数据。

TCP：（Transmission Control Protocol，传输控制协议）是面向连接的协议，也就是说，在收发数据前，必须和对方建立可靠的连接。
一个TCP连接必须要经过三次“对话”才能建立起来，其中的过程非常复杂。
建立一个连接需要三次握手，而终止一个连接要经过四次握手，这是由TCP的半关闭（half-close）造成的。

优点：**可靠性 、全双工协议、开源支持多、应用较广泛、面向连接**、研发成本低、报文内容不限制（IP层自动分包，重传，不大于1452bytes）
缺点：操作系统：较耗内存，支持连接数有限、设计：协议较复杂，自定义应用层协议、网络：网络差情况下延迟较高、传输：效率低于UDP协议特性： 面向连接、可靠性、全双工协议、基于IP层、OSI参考模型位于传输层、适用于二进制传输

**三次握手 与 四次挥手**
当客户端和服务器通过三次握手建立了TCP连接以后，当数据传送完毕，肯定是要断开TCP连接的啊。那对于TCP的断开连接，这里就有了神秘的“四次挥手”。
1.第一次挥手：主机1(可以使客户端，也可以是服务器端)，设置Sequence Number和Acknowledgment Number，向主机2发送一个FIN报文段;此时，主机1进入FIN_WAIT_1状态;这表示主机1没有数据要发送给主机2了;
2.第二次挥手：主机2收到了主机1发送的FIN报文段，向主机1回一个ACK报文段，Acknowledgment Number为Sequence Number加1;主机1进入FIN_WAIT_2状态;主机2告诉主机1，我也没有数据要发送了，可以进行关闭连接了;
3.第三次挥手：主机2向主机1发送FIN报文段，请求关闭连接，同时主机2进入CLOSE_WAIT状态;
4.第四次挥手：主机1收到主机2发送的FIN报文段，向主机2发送ACK报文段，然后主机1进入TIME_WAIT状态;主机2收到主机1的ACK报文段以后，就关闭连接;此时，主机1等待2MSL后依然没有收到回复，则证明Server端已正常关闭，那好，主机1也可以关闭连接了。
至此，TCP的四次挥手就这么愉快的完成了。

 UDP

UDP（User Data Protocol，用户数据报协议）是与TCP相对应的协议。它是面向非连接的协议，它不与对方建立连接，而是直接就把数据包发送过去！
UDP适用于一次只传送少量数据、对可靠性要求不高的应用环境。
比如，我们经常使用“ping”命令来测试两台主机之间TCP/IP通信是否正常，其实“ping”命令的原理就是向对方主机发送UDP数据包，
然后对方主机确认收到数据包，如果数据包是否到达的消息及时反馈回来，那么网络就是通的。
例如，在默认状态下，一次“ping”操作发送4个数据包（如图2所示）。大家可以看到，发送的数据包数量是4包，
收到的也是4包（因为对方主机收到后会发回一个确认收到的数据包）。这充分说明了UDP协议是面向非连接的协议，
没有建立连接的过程。正因为UDP协议没有连接的过程，所以它的通信效果高；但也正因为如此，它的可靠性不如TCP协议高。
QQ就使用UDP发消息，因此有时会出现收不到消息的情况。

UDP：UDP是一个无连接协议，传输数据之前源端和终端不建立连接，当它想传送时就简单地去抓取来自应用程序的数据，
并尽可能快地把它扔到网络上。在发送端，UDP传送数据的速度仅仅是受应用程序生成数据的速度、计算机的能力和传输带宽的限制；
在接收端，UDP把每个消息段放在队列中，应用程序每次从队列中读一个消息段。
优点：操作系统：并发高，内存消耗较低、传输：效率高，网络延迟低、传输模型简单，研发成本低
缺点：协议不可靠、单向协议、开源支持少、报文内容有限，不能大于1464bytes、设计：协议设计较复杂、网络：网络差，而且丢数据报文
特性：无连接，不可靠，基于IP协议层，OSI参考模型位于传输层，最大努力交付，适用于二进制传输

 对比

场景 | TCP | UDP
:- | :- |:-
是否连接 | 面向连接 | 面向非连接
传输可靠性 | 可靠 | 不可靠
应用场合 | 传输大量数据 |少量数据
速度 | 慢 | 快

## 73 express middleware(中间件) 工作原理是什么？？

* created_at: 2023-03-11T08:28:39Z
* updated_at: 2023-03-19T13:33:14Z
* labels: Nodejs
* milestone: 中

xpress middleware 工作原理是什么？

Express middleware 的工作原理是通过拦截 HTTP 请求，对请求进行处理，然后将请求传递给下一个中间件或应用程序的路由处理。在 Express 中，中间件可以是一个或多个函数，每个函数都可以对请求进行操作或响应，从而实现对请求的处理和过滤。

当 Express 应用程序接收到一个 HTTP 请求时，请求将首先被传递给第一个注册的中间件函数。这个中间件函数可以对请求进行操作，例如修改请求的头信息、检查请求是否包含有效的身份验证令牌等等。当这个中间件函数完成操作后，它可以选择将请求传递给下一个中间件函数，或者直接将响应返回给客户端。

如果中间件函数选择将请求传递给下一个中间件函数，它可以调用 next() 函数来将控制权传递给下一个中间件。这个过程可以一直持续到所有中间件函数都被执行完毕，最后将请求传递给应用程序的路由处理函数。

通过使用中间件，开发人员可以将应用程序的功能模块化，从而实现更好的代码组织和可维护性。同时，中间件还可以实现各种功能，例如身份验证、日志记录、错误处理等等，从而为应用程序提供更丰富的功能和更好的用户体验。

的设计模式是啥？写一个简单的示例呢

Express middleware 的设计模式是基于责任链模式。在责任链模式中，每个对象都有机会处理请求，并将其传递给下一个对象，直到请求被完全处理为止。在 Express 中，每个中间件函数都有机会对请求进行处理，并可以选择将请求传递给下一个中间件函数或应用程序的路由处理函数。

以下是一个简单的示例，演示如何使用 Express middleware 实现身份验证：

```javascript
const express = require('express')
const app = express()

// 定义一个中间件函数，用于验证用户身份
function authenticate (req, res, next) {
  const token = req.headers.authorization
  if (token === 'secret-token') {
    // 如果令牌有效，则将控制权传递给下一个中间件函数
    next()
  } else {
    // 否则，返回 401 错误
    res.status(401).send('Unauthorized')
  }
}

// 注册中间件函数，用于验证用户身份
app.use(authenticate)

// 定义一个路由处理函数，用于返回受保护的资源
app.get('/protected', (req, res) => {
  res.send('Protected resource')
})

// 启动应用程序
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
```

在上面的示例中，我们定义了一个名为 authenticate 的中间件函数，它用于验证用户的身份。在这个函数中，我们检查请求头中是否包含有效的身份验证令牌。如果令牌有效，则将控制权传递给下一个中间件函数或路由处理函数。否则，返回 401 错误。

然后，我们通过调用 app.use() 方法来注册这个中间件函数，以便在每个请求中都进行身份验证。最后，我们定义一个名为 /protected 的路由处理函数，它表示受保护的资源。只有在身份验证通过后，才能访问这个路由处理函数。

通过这个简单的示例，我们可以看到如何使用 Express middleware 实现基本的身份验证功能。中间件函数充当责任链中的一个环节，通过对请求进行处理和过滤，为应用程序提供更好的安全性和用户体验。

## 75 [vue]: 手写 vue 双向绑定？

* created_at: 2023-03-11T08:32:37Z
* updated_at: 2023-03-11T08:32:38Z
* labels: web框架
* milestone: 中

向绑定核心知识点

如果一个对象中有属性有方法，那么调用属性可以直接. 就可以调用，但是如果是调用方法的时候，是通过入参来决定key的值来调用的话，请用[]来表示：

```html
<!DOCTYPE html>
<html lang="en" xmlns:v-on="http://www.w3.org/1999/xhtml">
 <head>
 <meta charset="UTF-8">
 <title>MVVM 双项绑定</title>
 <style>
 #app {
 text-align: center;
 margin-top: 100px;
 color: #888;
 }

 h1 {
 color: #aaa;
 }

 input {
 padding: 0 10px;
 width: 600px;
 line-height: 2.5;
 border: 1px solid #ccc;
 border-radius: 2px;
 }

 .bind {
 color: #766;
 }

 strong {
 color: #05BC00;
 }

 button {
 padding: 5px 10px;
 border: 1px solid #777777;
 border-radius: 5px;
 background: #ffffff;
 color: #777777;
 cursor: pointer;

 }
 </style>
 </head>
 <body>
 <div id="app">
 <h1>Hi，MVVM</h1>
 <input v-model="name" placeholder="请输入内容" type="text">
 <h1 class="bind">{{name}} 's age is <strong>{{age}}</strong></h1>
 <button v-on:click="sayHi">点击欢迎您</button>
 </div>
 <script>
 function observe(data) {
 //如果不是一个对象，直接终止程序
 if (!data || typeof data !== 'object') {
 return false;
 }
 for (let key in data) {
 let val = data[key];
 let subject = new Subject();
 Object.defineProperty(data, key, {
 enumerable: true,
 configurable: true,
 get: function () {
 if (currentObserver) {
 currentObserver.subscribeTo(subject)
 }
 return val
 },
 set: function (newVal) {
 val = newVal;
 subject.notify()
 }
 });
 if (typeof val === 'object') {
 observe(val)
 }
 }
 }

 let id = 0;
 let currentObserver = null;

 /bin /sbin订阅者对象
 */
 class Subject {
 constructor() {
 this.id = id++;
 this.observers = []
 }

 addObserver(observer) {
 this.observers.push(observer)
 }

 removeObserver(observer) {
 let index = this.observers.indexOf(observer)
 if (index > -1) {
 this.observers.splice(index, 1)
 }
 }

 notify() {
 this.observers.forEach(observer => {
 observer.update()
 })
 }
 }

 /bin /sbin观察者对象
 */
 class Observer {
 constructor(vm, key, cb) {
 this.subjects = {};
 this.vm = vm;
 this.key = key;
 this.cb = cb;
 this.value = this.getValue()
 }

 //如果新旧数据不相同，就直接调用cb方法
 update() {
 let oldVal = this.value;
 let value = this.getValue();
 if (value !== oldVal) {
 this.value = value;
 this.cb.bind(this.vm)(value, oldVal)
 }
 }

 //添加观察者
 subscribeTo(subject) {
 if (!this.subjects[subject.id]) { //如果当前换擦着中不存在这个当前id的一个对象，那么吧这个对象添加为观察者
 subject.addObserver(this);
 this.subjects[subject.id] = subject //放在观察者对象中，根据自增id来区分
 }
 }

 getValue() {
 currentObserver = this;
 let value = this.vm.$data[this.key]; //获取vm实例兑现中的data数据
 currentObserver = null;
 return value
 }
 }

 /bin /sbin编译对象
 */
 class Compile {
 constructor(vm) {
 this.vm = vm; //vm对象
 this.node = vm.$el; //获取挂载的元素dom
 this.compile();//执行核心功能
 }

 compile() {
 this.traverse(this.node);//传入的参数是挂载元素dom
 }

 traverse(node) {
 if (node.nodeType === 1) { //节点类型1：element元素
 this.compileNode(node); //触发节点事件 双向绑定和事件触发
 node.childNodes.forEach(childNode => {
 this.traverse(childNode); // 递归调用，如果是有子节点，重新递归
 })
 } else if (node.nodeType === 3) { // 节点类型3： 文本元素
 this.compileText(node); // 处理文本元素的编译
 }
 }

 // 文本编译入口
 compileText(node) {
 let reg = /{{(.+?)}}/g;
 let match;
 while (match = reg.exec(node.nodeValue)) { //获取到文本内容
 let raw = match[0]
 let key = match[1].trim()
 node.nodeValue = node.nodeValue.replace(raw, this.vm.$data[key]);
 new Observer(this.vm, key, function (val, oldVal) { // 订阅者核心方法
 node.nodeValue = node.nodeValue.replace(oldVal, val)
 })
 }
 }

 // 节点编译入口
 compileNode(node) {
 let attrs = [...node.attributes];//获取标签属性
 attrs.forEach(attr => {
 if (this.isModelDirective(attr.name)) { //截取是绑定数据的情况
 this.bindModel(node, attr); //绑定数据
 } else if (this.isEventDirective(attr.name)) { //截取是绑定事件的情况
 this.bindEventHander(node, attr); //触发事件
 }
 })
 }

 /bin /sbin双向绑定数据
@param node 标签节点
@param attr 标签节点的属性名
 */
 bindModel(node, attr) {
 let key = attr.value;// 获取到传递过来的属性的key的值
 node.value = this.vm.$data[key]; //给节点绑定值，对应的值就是vm实例里面data对应key的值
 new Observer(this.vm, key, function (newVal) {
 node.value = newVal
 });
 node.oninput = (e) => { //监听节点的input事件
 this.vm.$data[key] = e.target.value //过去输入框中输入的value值，把这个值放入到vm的data实例中去
 }
 }

 /bin /sbin *
@param node
@param attr
 */
 bindEventHander(node, attr) {
 let eventType = attr.name.substr(5); //获取节点属性,从第五个下标开始截取后面的字符串作为：key(事件类型)
 let methodName = attr.value; //获取节点的属性的value
 node.addEventListener(eventType, this.vm.$methods[methodName]);//通过事件类型，来触发事件，事件就是vm实例中方法
 }

 //赛选出传入的node属性是v-model的情况
 isModelDirective(attrName) {
 return attrName === 'v-model'
 }

 //赛选出传入的node属性是 v-on的情况
 isEventDirective(attrName) {
 return attrName.indexOf('v-on') === 0
 }
 }

 class mvvm {
 constructor(opts) { //这里面的函数是实例化的时候执行的
 this.init(opts);
 observe(this.$data);
 new Compile(this); //变异当前对象
 }

 init(opts) {
 if (opts.el.nodeType === 1) {
 this.$el = opts.el
 } else {
 this.$el = document.querySelector(opts.el)
 }

 this.$data = opts.data || {};
 this.$methods = opts.methods || {};
 //把$data 中的数据直接代理到当前 vm 对象
 for (let key in this.$data) {
 Object.defineProperty(this, key, {
 enumerable: true,
 configurable: true,
 get: () => {
 return this.$data[key]
 },
 set: newVal => {
 this.$data[key] = newVal
 }
 })
 }
 //让 this.$methods 里面的函数中的 this，都指向当前的 this，也就是 vm对象实例
 for (let key in this.$methods) {
 this.$methods[key] = this.$methods[key].bind(this);
 }
 }
 }


 /bin /sbin实例化MVVM对象， 主入口
@type {mvvm}
 */
 let vm = new mvvm({
 el: '#app',
 data: {
 name: 'YanLe',
 age: 3
 },
 methods: {
 sayHi: function () {
 alert(`hi ${this.name}`)
 }
 }
 });

 let clock = setInterval(function () {
 vm.age++; //等同于 vm.$data.age

 if (vm.age === 10) clearInterval(clock)
 }, 1000)
 </script>
 </body>
</html>
```

## 76 JS 内存泄露问题该如何排查？

* created_at: 2023-03-11T08:48:14Z
* updated_at: 2023-03-11T08:48:38Z
* labels: JavaScript
* milestone: 资深

么是内存泄露

> 该问题转载自：[资料](https://github.com/zhansingsong/js-leakage-patterns)

> **内存泄漏**指由于疏忽或错误造成程序未能释放已经不再使用的内存。内存泄漏并非指内存在物理上的消失，而是应用程序分配某段内存后，由于设计错误，导致在释放该段内存之前就失去了对该段内存的控制，从而造成了内存的浪费。内存泄漏通常情况下只能由获得程序源代码的程序员才能分析出来。然而，有不少人习惯于把任何不需要的内存使用的增加描述为内存泄漏，即使严格意义上来说这是不准确的。
> ————[wikipedia](https://zh.wikipedia.org/wiki/%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F)

**⚠️ 注：下文中标注的 CG 是 Chrome 浏览器中 Devtools 的【Collect garbage】按钮缩写，表示回收垃圾操作。**
![image](https://user-images.githubusercontent.com/22188674/224474179-30705fda-6d94-41b9-9979-053914e02da5.png)

外的全局变量

JavaScript 对未声明变量的处理方式：在全局对象上创建该变量的引用(即全局对象上的属性，不是变量，因为它能通过`delete`删除)。如果在浏览器中，全局对象就是**window**对象。

如果未声明的变量缓存大量的数据，会导致这些数据只有在窗口关闭或重新刷新页面时才能被释放。这样会造成意外的内存泄漏。

```js
function foo (arg) {
  bar = 'this is a hidden global variable with a large of data'
}
```

等同于：

```js
function foo (arg) {
  window.bar = 'this is an explicit global variable with a large of data'
}
```

另外，通过**this**创建意外的全局变量：

```js
function foo () {
  this.variable = 'potential accidental global'
}

// 当在全局作用域中调用foo函数，此时this指向的是全局对象(window)，而不是'undefined'
foo()
```

 解决方法

在 JavaScript 文件中添加`'use strict'`，开启严格模式，可以有效地避免上述问题。

```js
function foo (arg) {
  'use strict' // 在foo函数作用域内开启严格模式
  bar = 'this is an explicit global variable with a large of data' // 报错：因为bar还没有被声明
}
```

如果需要在一个函数中使用全局变量，可以像如下代码所示，在**window**上明确声明：

```js
function foo (arg) {
  window.bar = 'this is a explicit global variable with a large of data'
}
```

这样不仅可读性高，而且后期维护也方便

> 谈到全局变量，需要注意那些用来临时存储大量数据的全局变量，确保在处理完这些数据后将其设置为 null 或重新赋值。全局变量也常用来做 cache，一般 cache 都是为了性能优化才用到的，为了性能，最好对 cache 的大小做个上限限制。因为 cache 是不能被回收的，越高 cache 会导致越高的内存消耗。

onsole.log

`console.log`：向 web 开发控制台打印一条消息，常用来在开发时调试分析。有时在开发时，需要打印一些对象信息，但发布时却忘记去掉`console.log`语句，这可能造成内存泄露。

在传递给`console.log`的对象是不能被垃圾回收 ♻️，因为在代码运行之后需要在开发工具能查看对象信息。所以最好不要在生产环境中`console.log`任何对象。

 实例

```html
<!DOCTYPE html>
<html lang="en">

<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <title>Leaker</title>
</head>

<body>
 <input type="button" value="click">
 <script>
 !function () {
 function Leaker() {
 this.init();
 };
 Leaker.prototype = {
 init: function () {
 this.name = (Array(100000)).join('*');
 console.log("Leaking an object %o: %o", (new Date()), this);// this对象不能被回收
 },

 destroy: function () {
 // do something....
 }
 };
 document.querySelector('input').addEventListener('click', function () {
 new Leaker();
 }, false);
 }()
 </script>
</body>

</html>
```

这里结合 Chrome 的 Devtools–>Performance 做一些分析，操作步骤如下：

<u>**:warning:注：最好在隐藏窗口中进行分析工作，避免浏览器插件影响分析结果**</u>

1. 开启【Performance】项的记录
2. 执行一次 CG，创建基准参考线
3. 连续单击【click】按钮三次，新建三个 Leaker 对象
4. 执行一次 CG
5. 停止记录

![image](https://user-images.githubusercontent.com/22188674/224474228-13446f61-b837-4ede-88a7-38227d8ab9c5.png)

可以看出【JS Heap】线最后没有降回到基准参考线的位置，显然存在没有被回收的内存。如果将代码修改为：

```js
!(function () {
  function Leaker () {
    this.init()
  }
  Leaker.prototype = {
    init: function () {
      this.name = Array(100000).join('*')
    },

    destroy: function () {
      // do something....
    }
  }
  document.querySelector('input').addEventListener(
    'click',
    function () {
      new Leaker()
    },
    false
  )
})()
```

去掉`console.log("Leaking an object %o: %o", (new Date()), this);`语句。重复上述的操作步骤，分析结果如下：

![image](https://user-images.githubusercontent.com/22188674/224474259-46b22d10-0314-4664-adc1-fdef2a575c19.png)

从对比分析结果可知，`console.log`打印的对象是不会被垃圾回收器回收的。因此最好不要在页面中`console.log`任何大对象，这样可能会影响页面的整体性能，特别在生产环境中。除了`console.log`外，另外还有`console.dir`、`console.error`、`console.warn`等都存在类似的问题，这些细节需要特别的关注。

losures(闭包)

当一个函数 A 返回一个内联函数 B，即使函数 A 执行完，函数 B 也能访问函数 A 作用域内的变量，这就是一个闭包——————本质上闭包是将函数内部和外部连接起来的一座桥梁。

```js
function foo (message) {
  function closure () {
    console.log(message)
  }
  return closure
}

// 使用
const bar = foo('hello closure!')
bar() // 返回 'hello closure!'
```

在函数 foo 内创建的函数 closure 对象是不能被回收掉的，因为它被全局变量 bar 引用，处于一直可访问状态。通过执行`bar()`可以打印出`hello closure!`。如果想释放掉可以将`bar = null`即可。

<u>**由于闭包会携带包含它的函数的作用域，因此会比其他函数占用更多的内存。过度使用闭包可能会导致内存占用过多。**</u>

 实例

```html
<!DOCTYPE html>
<html lang="en">

<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <title>Closure</title>
</head>

<body>
 <p>不断单击【click】按钮</p>
 <button id="click_button">Click</button>
 <script>
 function f() {
 var str = Array(10000).join('#');
 var foo = {
 name: 'foo'
 }
 function unused() {
 var message = 'it is only a test message';
 str = 'unused: ' + str;
 }
 function getData() {
 return 'data';
 }
 return getData;
 }

 var list = [];

 document.querySelector('#click_button').addEventListener('click', function () {
 list.push(f());
 }, false);
 </script>
</body>

</html>
```

这里结合 Chrome 的 Devtools->Memory 工具进行分析，操作步骤如下：

<u>**:warning:注：最好在隐藏窗口中进行分析工作，避免浏览器插件影响分析结果**</u>

1. 选中【Record allocation timeline】选项
2. 执行一次 CG
3. 单击【start】按钮开始记录堆分析
4. 连续单击【click】按钮十多次
5. 停止记录堆分析

![image](https://user-images.githubusercontent.com/22188674/224474271-188cb4f6-a00d-4a29-98ab-10e02818b93d.png)

上图中蓝色柱形条表示随着时间新分配的内存。选中其中某条蓝色柱形条，过滤出对应新分配的对象：

![image](https://user-images.githubusercontent.com/22188674/224474296-a78617eb-17e6-4964-a1e5-2f9a08650872.png)

查看对象的详细信息：

![image](https://user-images.githubusercontent.com/22188674/224474311-fca18dc0-7ce8-410f-a573-55cbd32ee07f.png)

从图可知，在返回的闭包作用链(Scopes)中携带有它所在函数的作用域，作用域中还包含一个 str 字段。而 str 字段并没有在返回 getData()中使用过。为什么会存在在作用域中，按理应该被 GC 回收掉， why:question:

原因是在相同作用域内创建的多个内部函数对象是共享同一个[变量对象（variable object）](http://dmitrysoshnikov.com/ecmascript/chapter-2-variable-object/)。如果创建的内部函数没有被其他对象引用，不管内部函数是否引用外部函数的变量和函数，在外部函数执行完，对应变量对象便会被销毁。反之，如果内部函数中存在有对外部函数变量或函数的访问（可以不是被引用的内部函数），并且存在某个或多个内部函数被其他对象引用，那么就会形成闭包，外部函数的变量对象就会存在于闭包函数的作用域链中。这样确保了闭包函数有权访问外部函数的所有变量和函数。了解了问题产生的原因，便可以对症下药了。对代码做如下修改：

```js
function f () {
  const str = Array(10000).join('#')
  const foo = {
    name: 'foo'
  }
  function unused () {
    const message = 'it is only a test message'
    // str = 'unused: ' + str; //删除该条语句
  }
  function getData () {
    return 'data'
  }
  return getData
}

const list = []

document.querySelector('#click_button').addEventListener(
  'click',
  function () {
    list.push(f())
  },
  false
)
```

getData()和 unused()内部函数共享 f 函数对应的变量对象，因为 unused()内部函数访问了 f 作用域内 str 变量，所以 str 字段存在于 f 变量对象中。加上 getData()内部函数被返回，被其他对象引用，形成了闭包，因此对应的 f 变量对象存在于闭包函数的作用域链中。这里只要将函数 unused 中`str = 'unused: ' + str;`语句删除便可解决问题。

![image](https://user-images.githubusercontent.com/22188674/224474321-74c7546e-4e2a-4d06-b32d-b25ac5f4235b.png)

查看一下闭包信息：

![image](https://user-images.githubusercontent.com/22188674/224474341-9c7ec3b8-e3a1-40ad-9bcc-f570ca7d2bd6.png)

OM 泄露

在 JavaScript 中，DOM 操作是非常耗时的。因为 JavaScript/ECMAScript 引擎独立于渲染引擎，而 DOM 是位于渲染引擎，相互访问需要消耗一定的资源。如 Chrome 浏览器中 DOM 位于 WebCore，而 JavaScript/ECMAScript 位于 V8 中。假如将 JavaScript/ECMAScript、DOM 分别想象成两座孤岛，两岛之间通过一座收费桥连接，过桥需要交纳一定“过桥费”。JavaScript/ECMAScript 每次访问 DOM 时，都需要交纳“过桥费”。因此访问 DOM 次数越多，费用越高，页面性能就会受到很大影响。[了解更多:information_source:](http://www.phpied.com/dom-access-optimization/)

![](http://www.phpied.com/wp-content/uploads/2009/12/domlandia.png)

为了减少 DOM 访问次数，一般情况下，当需要多次访问同一个 DOM 方法或属性时，会将 DOM 引用缓存到一个局部变量中。<u>但如果在执行某些删除、更新操作后，可能会忘记释放掉代码中对应的 DOM 引用，这样会造成 DOM 内存泄露。</u>

 实例------>

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <title>Dom-Leakage</title>
</head>
<body>
 <input type="button" value="remove" class="remove" style="display:none;">
 <input type="button" value="add" class="add">

 <div class="container">
 <pre class="wrapper"></pre>
 </div>
 <script>
 // 因为要多次用到pre.wrapper、div.container、input.remove、input.add节点，将其缓存到本地变量中，
 var wrapper = document.querySelector('.wrapper');
 var container = document.querySelector('.container');
 var removeBtn = document.querySelector('.remove');
 var addBtn = document.querySelector('.add');
 var counter = 0;
 var once = true;
 // 方法
 var hide = function(target){
 target.style.display = 'none';
 }
 var show = function(target){
 target.style.display = 'inline-block';
 }
 // 回调函数
 var removeCallback = function(){
 removeBtn.removeEventListener('click', removeCallback, false);
 addBtn.removeEventListener('click', addCallback, false);
 hide(addBtn);
 hide(removeBtn);
 container.removeChild(wrapper);
 }
 var addCallback = function(){
 wrapper.appendChild(document.createTextNode('\t' + ++counter + '：a new line text\n'));
 // 显示删除操作按钮
 if(once){
 show(removeBtn);
 once = false;
 }
 }
 // 绑定事件
 removeBtn.addEventListener('click', removeCallback, false);
 addBtn.addEventListener('click', addCallback, false);
 </script>
</body>
</html>
```

这里结合 Chrome 浏览器的 Devtools–>Performance 做一些分析，操作步骤如下：

<u>**:warning:注：最好在隐藏窗口中进行分析工作，避免浏览器插件影响分析结果**</u>

1. 开启【Performance】项的记录
2. 执行一次 CG，创建基准参考线
3. 连续单击【add】按钮 6 次，增加 6 个文本节点到 pre 元素中
4. 单击【remove】按钮，删除刚增加 6 个文本节点和 pre 元元素
5. 执行一次 CG
6. 停止记录堆分析

![image](https://user-images.githubusercontent.com/22188674/224474368-2e72c152-76f6-4246-983a-bd4793eac45b.png)

从分析结果图可知，虽然 6 次 add 操作增加 6 个 Node，但是 remove 操作并没有让 Nodes 节点数下降，即 remove 操作失败。尽管还主动执行了一次 CG 操作，Nodes 曲线也没有下降。因此可以断定内存泄露了！那问题来了，如何去查找问题的原因呢？这里可以通过 Chrome 浏览器的 Devtools–>Memory 进行诊断分析，执行如下操作步骤：

<u>**:warning:注：最好在隐藏窗口中进行分析工作，避免浏览器插件影响分析结果**</u>

1. 选中【Take heap snapshot】选项
2. 连续单击【add】按钮 6 次，增加 6 个文本节点到 pre 元素中
3. 单击【Take snapshot】按钮，执行一次堆快照
4. 单击【remove】按钮，删除刚增加 6 个文本节点和 pre 元元素
5. 单击【Take snapshot】按钮，执行一次堆快照
6. 选中生成的第二个快照报告，并将视图由"Summary"切换到"Comparison"对比模式，在[class filter]过滤输入框中输入关键字：**Detached**

![image](https://user-images.githubusercontent.com/22188674/224474384-936ed2c1-3e5d-4e86-bb50-291b53500de0.png)

从分析结果图可知，导致整个 pre 元素和 6 个文本节点无法别回收的原因是：代码中存在全局变量`wrapper`对 pre 元素的引用。知道了产生的问题原因，便可对症下药了。对代码做如下就修改：

```js
// 因为要多次用到pre.wrapper、div.container、input.remove、input.add节点，将其缓存到本地变量中，
let wrapper = document.querySelector('.wrapper')
const container = document.querySelector('.container')
const removeBtn = document.querySelector('.remove')
const addBtn = document.querySelector('.add')
let counter = 0
let once = true
// 方法
const hide = function (target) {
  target.style.display = 'none'
}
const show = function (target) {
  target.style.display = 'inline-block'
}
// 回调函数
const removeCallback = function () {
  removeBtn.removeEventListener('click', removeCallback, false)
  addBtn.removeEventListener('click', addCallback, false)
  hide(addBtn)
  hide(removeBtn)
  container.removeChild(wrapper)

  wrapper = null // 在执行删除操作时，将wrapper对pre节点的引用释放掉
}
var addCallback = function () {
  wrapper.appendChild(
    document.createTextNode('\t' + ++counter + '：a new line text\n')
  )
  // 显示删除操作按钮
  if (once) {
    show(removeBtn)
    once = false
  }
}
// 绑定事件
removeBtn.addEventListener('click', removeCallback, false)
addBtn.addEventListener('click', addCallback, false)
```

在执行删除操作时，将 wrapper 对 pre 节点的引用释放掉，即在删除逻辑中增加`wrapper = null;`语句。再次在 Devtools–>Performance 中重复上述操作：

![image](https://user-images.githubusercontent.com/22188674/224474409-f5d310a6-8d94-40e8-be75-72250cf00da2.png)

 小试牛刀

再来看看网上的一个实例，代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <title>Practice</title>
</head>
<body>
 <div id="refA"><ul><li><a href="#"></a></li><li><a href="#"></a></li><li><a href="#" id="refB"></a></li></ul></div>
 <div></div>
 <div></div>

 <script>
 var refA = document.getElementById('refA');
 var refB = document.getElementById('refB');
 document.body.removeChild(refA);

 // #refA不能GC回收，因为存在变量refA对它的引用。将其对#refA引用释放，但还是无法回收#refA。
 refA = null;

 // 还存在变量refB对#refA的间接引用(refB引用了#refB，而#refB属于#refA)。将变量refB对#refB的引用释放，#refA就可以被GC回收。
 refB = null;
 </script>
</body>
</html>
```

整个过程如下图所演示：

![image](https://user-images.githubusercontent.com/22188674/224474442-b0ceefcf-a959-4cab-800c-df389737098b.png)

有兴趣的同学可以使用 Chrome 的 Devtools 工具，验证一下分析结果，实践很重要~~~:high_brightness:

imers

在 JavaScript 常用`setInterval()`来实现一些动画效果。当然也可以使用链式`setTimeout()`调用模式来实现：

```js
setTimeout(function () {
  // do something. . . .
  setTimeout(arguments.callee, interval)
}, interval)
```

如果在不需要`setInterval()`时，没有通过`clearInterval()`方法移除，那么`setInterval()`会不停地调用函数，直到调用`clearInterval()`或窗口关闭。如果链式`setTimeout()`调用模式没有给出终止逻辑，也会一直运行下去。因此再不需要重复定时器时，确保对定时器进行清除，避免占用系统资源。另外，在使用`setInterval()`和`setTimeout()`来实现动画时，无法确保定时器按照指定的时间间隔来执行动画。为了能在 JavaScript 中创建出平滑流畅的动画，浏览器为 JavaScript 动画添加了一个新 API-requestAnimationFrame()。[关于 setInterval、setTimeout 与 requestAnimationFrame 实现动画上的区别 ➹ 猛击 😊](https://github.com/zhansingsong/js-leakage-patterns/blob/master/requestAnimationFrame/requestAnimationFrame.md)

 实例

如下通过`setInterval()`实现一个 clock 的小实例，不过代码存在问题的，有兴趣的同学可以先尝试找一下问题的所在~~~~~😎
操作：

* 单击【start】按钮开始 clock，同时 web 开发控制台会打印实时信息
* 单击【stop】按钮停止 clock，同时 web 开发控制台会输出停止信息

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <title>setInterval</title>
</head>
<body>
 <input type="button" value="start" class="start">
 <input type="button" value="stop" class="stop">

 <script>
 var counter = 0;
 var clock = {
 start: function () {
 setInterval(this.step.bind(null, ++counter), 1000);
 },
 step: function (flag) {
 var date = new Date();
 var h = date.getHours();
 var m = date.getMinutes();
 var s = date.getSeconds();
 console.log("%d-----> %d:%d:%d", flag, h, m, s);
 }
 }
 document.querySelector('.start').addEventListener('click', clock.start.bind(clock), false);
 document.querySelector('.stop').addEventListener('click', function () {
 console.log('----> stop <----');
 clock = null;
 }, false);
 </script>
</body>
</html>
```

上述代码存在两个问题：

1. 如果不断的单击【start】按钮，会断生成新的 clock。

2. 单击【stop】按钮不能停止 clock。

输出结果:

![image](https://user-images.githubusercontent.com/22188674/224474541-d2ad7c5a-d465-4167-b69d-c38c09930a67.png)

针对暴露出的问题，对代码做如下修改：

```js
let counter = 0
const clock = {
  timer: null,
  start: function () {
    // 解决第一个问题
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.timer = setInterval(this.step.bind(null, ++counter), 1000)
  },
  step: function (flag) {
    const date = new Date()
    const h = date.getHours()
    const m = date.getMinutes()
    const s = date.getSeconds()
    console.log('%d-----> %d:%d:%d', flag, h, m, s)
  },
  // 解决第二个问题
  destroy: function () {
    console.log('----> stop <----')
    clearInterval(this.timer)
    node = null
    counter = void 0
  }
}
document
  .querySelector('.start')
  .addEventListener('click', clock.start.bind(clock), false)
document
  .querySelector('.stop')
  .addEventListener('click', clock.destroy.bind(clock), false)
```

ventListener

做移动开发时，需要对不同设备尺寸做适配。如在开发组件时，有时需要考虑处理横竖屏适配问题。一般做法，在横竖屏发生变化时，需要将组件销毁后再重新生成。而在组件中会对其进行相关事件绑定，如果在销毁组件时，没有将组件的事件解绑，在横竖屏发生变化时，就会不断地对组件进行事件绑定。这样会导致一些异常，甚至可能会导致页面崩掉。

 实例

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <meta http-equiv="X-UA-Compatible" content="ie=edge">
 <title>callbacks</title>
</head>
<body>
 <div class="container"></div>
 <script>
 var container = document.querySelector('.container');
 var counter = 0;
 var createHtml = function (n, counter) {
 var template = `${(new Array(n)).join(`<div>${counter}: this is a new data <input type="button" value="remove"></div>`)}`
 container.innerHTML = template;
 }

 var resizeCallback = function (init) {
 createHtml(10, ++counter);
 // 事件委托
 container.addEventListener('click', function (event){
 var target = event.target;
 if(target.tagName === 'INPUT'){
 container.removeChild(target.parentElement)
 }
 }, false);
 }
 window.addEventListener('resize', resizeCallback, false);
 resizeCallback(true);
 </script>
</body>
</html>
```

页面是存在问题的，这里结合 Devtools–>Performance 分析一下问题所在，操作步骤如下：

<u>**:warning:注：最好在隐藏窗口中进行分析工作，避免浏览器插件影响分析结果**</u>

1. 开启 Performance 项的记录
2. 执行一次 CG，创建基准参考线
3. 对窗口大小进行调整
4. 执行一次 CG
5. 停止记录

![image](https://user-images.githubusercontent.com/22188674/224474562-ee38b81c-d14c-4340-8c60-a0ffb1357029.png)

如分析结果所示，在窗口大小变化时，会不断地对`container`添加代理事件。

同一个元素节点注册了多个相同的 EventListener，那么重复的实例会被抛弃。这么做不会让得 EventListener 被重复调用，也不需要用 removeEventListener 手动清除多余的 EventListener，因为重复的都被自动抛弃了。而这条规则只是针对于命名函数。[对于匿名函数，浏览器会将其看做不同的 EventListener](https://triangle717.wordpress.com/2015/12/14/js-avoid-duplicate-listeners/)，所以只要将匿名的 EventListener，命名一下就可以解决问题：

```js
const container = document.querySelector('.container')
let counter = 0
const createHtml = function (n, counter) {
  const template = `${new Array(n).join(
 `<div>${counter}: this is a new data <input type="button" value="remove"></div>`
 )}`
  container.innerHTML = template
}
//
const clickCallback = function (event) {
  const target = event.target
  if (target.tagName === 'INPUT') {
    container.removeChild(target.parentElement)
  }
}
const resizeCallback = function (init) {
  createHtml(10, ++counter)
  // 事件委托
  container.addEventListener('click', clickCallback, false)
}
window.addEventListener('resize', resizeCallback, false)
resizeCallback(true)
```

在 Devtools–>Performance 中再重复上述操作，分析结果如下：
![image](https://user-images.githubusercontent.com/22188674/224474599-dd23494a-8bc5-4064-859b-32d2ffa60221.png)

在开发中，开发者很少关注事件解绑，因为浏览器已经为我们处理得很好了。不过在使用第三方库时，需要特别注意，因为一般第三方库都实现了自己的事件绑定，如果在使用过程中，在需要销毁事件绑定时，没有调用所解绑方法，就可能造成事件绑定数量的不断增加。如下链接是我在项目中使用 jquery，遇见到类似问题：[jQuery 中忘记解绑注册的事件，造成内存泄露 ➹ 猛击 😊](https://github.com/zhansingsong/js-leakage-patterns/blob/master/%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2%E4%B9%8BListeners/%E5%86%85%E5%AD%98%E6%B3%84%E9%9C%B2%E4%B9%8BListeners.md)

结

本文主要介绍了几种常见的内存泄露。在开发过程，需要我们特别留意一下本文所涉及到的几种内存泄露问题。因为这些随时可能发生在我们日常开发中，如果我们对它们不了解是很难发现它们的存在。可能在它们将问题影响程度放大时，才会引起我们的关注。不过那时可能就晚了，因为产品可能已经上线，接着就会严重影响产品的质量和用户体验，甚至可能让我们承受大量用户流失的损失。作为开发的我们必须把好这个关，让我们开发的产品带给用户最好的体验。

考文章

* [An interesting kind of JavaScript memory leak](https://blog.meteor.com/an-interesting-kind-of-javascript-memory-leak-8b47d2e7f156)
* [Memory Leaks in Microsoft Internet Explorer](http://isaacschlueter.com/2006/10/msie-memory-leaks/trackback/index.html)
* [Memory leak when logging complex objects](https://stackoverflow.com/questions/12996129/memory-leak-when-logging-complex-objects)

## 77 虚拟 dom 原理是啥，手写一个简单的虚拟 dom 实现？

* created_at: 2023-03-11T08:54:21Z
* updated_at: 2023-10-01T13:56:09Z
* labels: JavaScript
* milestone: 高

dom 概念

用JS模拟DOM结构。
DOM变化的对比，放在JS层来做。
提升重绘性能。

比如有abc 三个dom， 如果我们要删除b dom, 以前浏览器的做法是 全部删除abc dom ， 然后 在添加b dom 。这样做的成本会非常高。

JS模拟 dom

例如下面的一个dom 结构：

```html
<ul id="list">
 <li class="item">item1</li>
 <li class="item">item2</li>
</ul>
```

这样的dom 结构，可以模拟为下面的JS :

```javascript
const dom = {
  tag: 'ul',
  attrs: {
    id: 'list'
  },
  children: [
    {
      tag: 'li',
      attrs: { className: 'item' },
      children: ['item1']
    },
    {
      tag: 'li',
      attrs: { className: 'item' },
      children: ['item2']
    }
  ]
}
```

浏览器操作dom 是花销非常大的。执行JS花销要小非常多，所以这就是为什么虚拟dom 出现的一个根本原因。

query实现virtual-dom

 一个需求场景

1、数据生成表格。 2、随便修改一个信息，表格也会跟着修改。

```html
<body>
<div id="container"></div>
<br>
<button id="btn-change">change</button>
<script>
 let data = [
 {
 name: 'yanle',
 age: '20',
 address: '重庆'
 },
 {
 name: 'yanle2',
 age: '25',
 address: '成都'
 },
 {
 name: 'yanle3',
 age: '27',
 address: '深圳'
 }
 ];

 // 渲染函数
 function render(data) {
 let $container = document.getElementById('container');
 $container.innerHTML = '';

 let $table = document.createElement('table');
 $table.setAttribute('border', true);
 $table.insertAdjacentHTML('beforeEnd', `<tr>
 <td>name</td>
 <td>age</td>
 <td>address</td>
 </tr>`);

 data.forEach(function (item) {
 $table.insertAdjacentHTML('beforeEnd',
 `<tr>
 <td>${item.name}</td>
 <td>${item.age}</td>
 <td>${item.address}</td>
 </tr>`
 )
 });

 $container.appendChild($table);
 }

 // 修改信息
 let button = document.getElementById('btn-change');
 button.addEventListener('click', function () {
 data[1].name = '徐老毕';
 data[1].age = 30;
 data[1].address = '深圳';
 render(data);
 });
 render(data);
</script>
</body>
```

实际上上面的这段代码也是不符合预期的，因为每次使用render 方法，都会全部渲染整个table, 但是并未没有只渲染我们想要的第二行。

**遇到的问题**：
DOM 操作是非常 "昂贵" 的， JS 运行效率高。虚拟dom 的核心就是diff算法，对比出不同的dom数据，定点渲染不同的数据。

## 78 [vue]: vue2.x 虚拟 dom 是怎么实现的？

* created_at: 2023-03-11T08:57:17Z
* updated_at: 2023-03-11T09:00:32Z
* labels: web框架
* milestone: 资深

irtual-dom 实现之一: snabbdom

vue2.0就是使用的snabbdom
一个简单的使用实例：

```javascript
const snabbdom = require('snabbdom')
const patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default // attaches event listeners
])
const h = require('snabbdom/h').default // helper function for creating vnodes

const container = document.getElementById('container')

const vnode = h('div#container.two.classes', { on: { click: someFn } }, [
  h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
  ' and this is just normal text',
  h('a', { props: { href: '/foo' } }, 'I\'ll take you places!')
])
// Patch into empty DOM element – this modifies the DOM as a side effect
patch(container, vnode)

const newVnode = h('div#container.two.classes', { on: { click: anotherEventHandler } }, [
  h('span', { style: { fontWeight: 'normal', fontStyle: 'italic' } }, 'This is now italic type'),
  ' and this is still just normal text',
  h('a', { props: { href: '/bar' } }, 'I\'ll take you places!')
])
// Second `patch` invocation
patch(vnode, newVnode) // Snabbdom efficiently updates the old view to the new state
```

 snabbdom 核心api

* snabbdom.init:
 The core exposes only one single function snabbdom.init. This init takes a list of modules and returns a patch function that uses the specified set of modules.

```javascript
const patch = snabbdom.init([
  require('snabbdom/modules/class').default,
  require('snabbdom/modules/style').default
])
```

* patch:

```javascript
patch(oldVnode, newVnode)
```

* snabbdom/h:
 It is recommended that you use snabbdom/h to create vnodes. h accepts a tag/selector as a string, an optional data object and an optional string or array of children.

```javascript
const h = require('snabbdom/h').default
const vnode = h('div', { style: { color: '#000' } }, [
  h('h1', 'Headline'),
  h('p', 'A paragraph')
])
```

* snabbdom/tovnode:
 Converts a DOM node into a virtual node. Especially good for patching over an pre-existing, server-side generated content.

```javascript
const snabbdom = require('snabbdom')
const patch = snabbdom.init([ // Init patch function with chosen modules
  require('snabbdom/modules/class').default, // makes it easy to toggle classes
  require('snabbdom/modules/props').default, // for setting properties on DOM elements
  require('snabbdom/modules/style').default, // handles styling on elements with support for animations
  require('snabbdom/modules/eventlisteners').default // attaches event listeners
])
const h = require('snabbdom/h').default // helper function for creating vnodes
const toVNode = require('snabbdom/tovnode').default

const newVNode = h('div', { style: { color: '#000' } }, [
  h('h1', 'Headline'),
  h('p', 'A paragraph')
])

patch(toVNode(document.querySelector('.container')), newVNode)
```

 h函数 和 patch 的使用

例如下面的一个dom 结构：

```html
<ul id="list">
 <li class="item">item1</li>
 <li class="item">item2</li>
</ul>
```

用h函数来表示，就如下形式：

```javascript
const vnode = h('ul#list', {}, [
  h('li.item', {}, 'item1'),
  h('li.item', {}, 'item2')
])
```

作用就是模拟的一个真实节点。

patch的使用方式：
第一种方式 patch('容器', vnode); // 这种使用方式是直接渲染dom
第二种是用方式: patch(oldVnode, newVnode); // 这种方式会自动对比dom的差异性，然后只渲染我们需要dom;

一个简单的使用实例：

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <title>snabbdom</title>
 <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom.js"></script>
 <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-class.js"></script>
 <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-props.js"></script>
 <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-style.js"></script>
 <script src="https://cdn.bootcss.com/snabbdom/0.7.1/snabbdom-eventlisteners.js"></script>
 <script src="https://cdn.bootcss.com/snabbdom/0.7.1/h.js"></script>
</head>
<body>
<div id="container"></div><br>

<button id="btn-change">change</button>


<script>
 let snabbdom = window.snabbdom;
 let container = document.getElementById('container');
 let buttonChange = document.getElementById('btn-change');

 // 定义patch
 let patch = snabbdom.init([
 snabbdom_class,
 snabbdom_props,
 snabbdom_style,
 snabbdom_eventlisteners
 ]);

 // 定义h
 let h = snabbdom.h;

 // 生成vnode
 let vnode = h('ul#list', {}, [
 h('li.item', {}, 'item1'),
 h('li.item', {}, 'item2')
 ]);
 patch(container, vnode);

 // 模拟一个修改的情况
 buttonChange.addEventListener('click', function () {
 let newVnode = h('ul#list', {}, [
 h('li.item', {}, 'item1'),
 h('li.item', {}, 'item B'),
 h('li.item', {}, 'item 3')
 ]);
 patch(vnode, newVnode);
 })
</script>
</body>
</html>
```

 snabbdom 的使用实例

```html
<body>
<div id="container"></div>
<br>
<button id="btn-change">change</button>
<script>
 let snabbdom = window.snabbdom;
 let container = document.getElementById('container');
 let buttonChange = document.getElementById('btn-change');

 // 定义patch
 let patch = snabbdom.init([
 snabbdom_class,
 snabbdom_props,
 snabbdom_style,
 snabbdom_eventlisteners
 ]);

 // 定义h
 let h = snabbdom.h;
 let data = [
 {
 name: 'yanle',
 age: '20',
 address: '重庆'
 },
 {
 name: 'yanle2',
 age: '25',
 address: '成都'
 },
 {
 name: 'yanle3',
 age: '27',
 address: '深圳'
 }
 ];

 data.unshift({
 name: '姓名',
 age: '年龄',
 address: '地址'
 });

 let vnode;
 function render(data) {
 let newVnode = h('table', {style: {'font-size': '16px'}}, data.map(function (item) {
 let tds = [];
 let i ;
 for (i in item) {
 if(item.hasOwnProperty(i)) {
 tds.push(h('td', {}, h('a', {props: {href: '/foo'}}, item[i])))
 }
 }
 return h('tr', {}, tds)
 }));

 if(vnode) {
 patch(vnode, newVnode);
 } else {
 patch(container, newVnode);
 }

 vnode = newVnode;
 }

 // 初次渲染
 render(data);
 buttonChange.addEventListener('click', function () {
 data[1].age=30;
 data[1].address = '非洲';
 render(data);
 });
</script>
</body>
```

iff算法

 概念

就是找出两个文件的不同

diff 算法是非常复杂的，实现难度非常大， 源码两非常大。 所以需要去繁就简，明白流程，不关心细节。
在vdom中，需要找出本次dom 必须更新的节点来更新，其他的不用更新。找出这个过程就是diff算法实现的。找出前后两个虚拟dom的差异。

 diff实现的过程

这里以snabbdom为例子：
patch(container, vnode); patch(vnode, newVnode); 这两个方法里面就使用到了diff算法。 用patch方法来解析diff算法流程核心。

**patch(container, vnode)**
![02-11-1](https://user-images.githubusercontent.com/22188674/224475327-0b8f19b3-7a35-40ec-960b-6040852f1a7d.png)

如果上面的数据， 我们怎么构建真正的dom 结构：

```javascript
const createElement = function (vnode) {
  const tag = vnode.tag
  const attrs = vnode.attrs || {}
  const children = vnode.children || {}

  if (!tag) return null

  // 创建元素
  const elem = document.createElement(tag)

  // 属性
  let attrName
  for (attrName in attrs) {
    if (attrs.hasOwnProperty(attrName)) {
      elem.setAttribute(attrName, attrs[attrName])
    }
  }

  // 子元素
  children.forEach(function (childVnode) {
    // 给 elem 添加元素
    elem.appendChild(createElement(childVnode))
  })

  return elem
}
```

**patch(vnode, newVnode)**
![02-11-2](https://user-images.githubusercontent.com/22188674/224475289-d2f8b10a-1f02-4126-9f2e-b813b0387c84.png)
![02-11-3](https://user-images.githubusercontent.com/22188674/224475309-45c68933-3aa8-402a-8353-d09b506e0d46.png)

伪代码实现如下

```javascript
const createElement = function (vnode) {
  const tag = vnode.tag
  const attrs = vnode.attrs || {}
  const children = vnode.children || {}

  if (!tag) return null

  // 创建元素
  const elem = document.createElement(tag)

  // 属性
  let attrName
  for (attrName in attrs) {
    if (attrs.hasOwnProperty(attrName)) {
      elem.setAttribute(attrName, attrs[attrName])
    }
  }

  // 子元素
  children.forEach(function (childVnode) {
    // 给 elem 添加元素
    elem.appendChild(createElement(childVnode))
  })

  return elem
}
```

 diff算法的其他内容

* 节点的新增和删除

* 节点重新排序
* 节点属性、样式、事件绑定
* 如果极致压榨性能

## 79 [vue]: 是如何实现 MVVM 的？

* created_at: 2023-03-11T09:03:45Z
* updated_at: 2023-03-11T09:03:45Z
* labels: web框架
* milestone: 资深

入：使用jquery和其他框架的区别

 原生JS实现一个todo-list

```html
<body>
<div>
 <input type="text" name="" id="txt-title"> <br>
 <button id="btn-submit">submit</button>
</div>
<div>
 <ul id="ul-list"></ul>
</div>
<script>
 let $txtTitle = document.getElementById('txt-title');
 let $buttonSubmit = document.getElementById('btn-submit');
 let $ulList = document.getElementById('ul-list');
 $buttonSubmit.addEventListener('click', function () {
 let title = $txtTitle.value;
 if(!title) return false;

 let $li = document.createElement('li');
 $li.innerText = title;

 $ulList.appendChild($li);
 $txtTitle.value = '';
 })
</script>
</body>
```

 vue实现todo-list

```html
<body>
<div id="app">
 <div>
 <input v-model="title"> <br>
 <button id="btn-submit" v-on:click="add">submit</button>
 </div>
 <div>
 <ul id="ul-list">
 <li v-for="item in list">{{item}}</li>
 </ul>
 </div>
</div>
<script>
 let vm = new window.Vue({
 el: '#app',
 data: {
 title: '',
 list: []
 },
 methods: {
 add: function () {
 this.list.push(this.title);
 this.title = '';
 }
 }
 })
</script>
</body>
```

 两者之间的区别

* 数据和视图分离(开放封闭原则： 扩展开放，修改封闭)

* 数据驱动视图

 对mvvm的理解

具体的理解自己再去整理

MVVM框架的三大要素：
响应式、模板引擎、渲染

应式的实现

修改data属性之后，立马就能监听到。
data属性挂在到vm实例上面。

有下面的一个问题，我们是如何监听属性的获取和属性的赋值的。

```javascript
const obj = {
  name: 'yanle',
  age: 25
}
console.log(obj.name)
obj.age = 26
```

是通过**Object.defineProperty** 实现的, 下面的代码就可以实现一个完整的属性修改和获取的监听。

```javascript
const vm = {}
const data = {
  name: 'yanle',
  age: 25
}
let key, value
for (key in data) {
  (function (key) {
    Object.defineProperty(vm, key, {
      get: function () {
        console.log('get', data[key])
        return data[key] // data的属性代理到vm 上
      },
      set: function (newValue) {
        console.log('set', newValue)
        data[key] = newValue
      }
    })
  })(key)
}
```

ue中的模板

**模板**
本质就是字符串；
有逻辑： if for 等；
跟html格式很像， 但是区别很大;
最终要转为HTML来现实；
模板需要用JS代码来实现， 因为有逻辑，只能用JS来实现；

**render函数-with用法**：

```javascript
let obj = {
 name: 'yanle',
 age: 20,
 getAddress: function () {
 alert('重庆')
 }
};
// 不用with 的情况
// function fn() {
// alert(obj.name);
// alert(obj.age);
// obj.getAddress();
// }
// fn();

// 使用with的情况
function fn1() {
 with (obj) {
 alert(name);
 alert(age);
 getAddress();
 }
}
fn1();
```

这种with 的使用方法就如上所述。但是尽量不要用，因为《JavaScript语言精粹》中，作者说过，这种使用方式会给代码的调试带来非常大的困难。
但是vue源码中的render 就是用的这个;

**render函数**:

<img width="274" alt="02-12-1" src="https://user-images.githubusercontent.com/22188674/224475416-9567c516-981f-4399-9128-4efcb70e8502.png"/>

![02-12-2](https://user-images.githubusercontent.com/22188674/224475405-34baf640-f897-4a26-9817-109e8b4c1bde.png)

模板中的所有信息都包含在了render 函数中。
一个特别简单的示例:

```javascript
let vm = new Vue({
 el: '#app',
 data: {
 price: 200
 }
 });

 // 一下是手写的
 function render() {
 with (this) { // 就是vm
 _c(
 'div',
 {
 attr: {'id': 'app'}
 },
 [
 _c('p', [_v(_s(price))])
 ]
 )
 }
 }

 function render1() {
 return vm._c(
 'div',
 {
 attr: {'id': 'app'}
 },
 [
 _c('p', [vm._v(vm._s(vm.price))]) // vm._v 是创建文本， _s 就是toString
 ]
 )
 }
```

如果我们用一个复杂的例子来描述这个东西。在源码中， 搜索code.render, 然后在在此之前打印render 函数，就可以看看这个到底是什么东西了。

```javascript
const createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  console.log(code.render)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
```

然后运行， 就可以看到到底render 函数是什么东西了。 就可以截取源码出来看了。
相对应的模板如下:

```html
<div id="app">
 <div>
 <input v-model="title"> <br>
 <button id="btn-submit" v-on:click="add">submit</button>
 </div>
 <div>
 <ul id="ul-list">
 <li v-for="item in list">{{item}}</li>
 </ul>
 </div>
</div>
```

截取的render函数如下：

```javascript
function codeRender() {
 with (this) {
 return _c('div',
 {attrs: {"id": "app"}},
 [
 _c('div', [
 _c('input', {
 directives: [{
 name: "model",
 rawName: "v-model",
 value: (title), // 渲染 指定数据
 expression: "title"
 }],
 domProps: {"value": (title)}, // 渲染 指定数据
 on: { // 通过input输入事件， 修改title
 "input": function ($event) {
 if ($event.target.composing) return;
 title = $event.target.value
 }
 }
 }),
 _v(" "), // 文本节点
 _c('br'),
 _v(" "),
 _c('button', { // dom 节点
 attrs: {"id": "btn-submit"},
 on: {"click": add} // methods 里面的东西也都挂在this上面去了
 },
 [_v("submit")])]),

 _v(" "),

 _c('div', [
 _c('ul',
 {attrs: {"id": "ul-list"}},
 _l((list), function (item) { // 数组节点
 return _c('li', [_v(_s(item))])
 })
 )
 ])
 ])
 }
}
```

从vue2.0开始支持预编译， 我们在开发环境下，写模板， 编译打包之后， 模板就变成了JS代码了。vue已经有工具支持这个过程。

ue中的渲染

vue的渲染是直接渲染为虚拟dom ,这一块儿的内容，其实是借鉴的snabbdom, 非常相似，可以去看看snabbdom 就可以一目了然了。
vue中的具体渲染实现:
![02-12-03](https://user-images.githubusercontent.com/22188674/224475434-c4e33700-d223-4472-8e96-5cc7b6c04d70.png)

体流程的实现

第一步： 解析模板形成render 函数

* with 用法
* 模板中的所有数据都被render 函数包含
* 模板中data的属性，变成了JS变量
* 模板中的v-model、v-for、v-on都变成了JS的逻辑
* render函数返回vnode

第二步： 响应式开始监听数据变化

* Object.defineProperty 的使用
* 讲data中的属性代理到vm 上

第三步： 首次渲染，显示页面，而且绑定数据和依赖

* 初次渲染， 执行updateComponent, 执行vm._render();
* 执行render函数， 会访问到vm.list和vm.title等已经绑定好了的数据；
* 会被详情是的get 方法监听到
 为何一定要监听get, 直接监听set 不行吗？ data中有很多的属性，有的被用到了，有的没有被用到。被用到的会走get, 不被用到的不会走get。
 没有被get监听的属性，set的时候也不会被坚挺。为的就是减少不必要的重复渲染，节省性能。
* 执行updateComponent的时候，会执行vdom的patch方法
* patch 讲vnode渲染为DOM， 初次渲染完成

第四步： data属性变化，出发render

* 修改属性值， 会被响应式的set监听到
* set中会执行updateComponent， 重新执行vm.render()
* 生成vnode和prevVnode, 通过patch进行对比
* 渲染到html中

## 80 [Redux]: 看过 Redux 源码吗， 对 Redux 了解多少？

* created_at: 2023-03-11T09:05:32Z
* updated_at: 2023-03-11T09:07:07Z
* labels: web框架
* milestone: 资深

入Redux架构

目录：

* [1、关于redux](#01)
* [2、API](#02)
* [3、中间件与异步操作](#03)
* [4、异步操作的基本思路](#04)
* [5、React-Redux的用法](#05)

参考文章：[http://www.cnblogs.com/MuYunyun/p/6530715.html](http://www.cnblogs.com/MuYunyun/p/6530715.html)

<div id="01">1、关于redux</div>

 1.1、什么情况需要用redux？

* 用户的使用方式复杂

* 不同身份的用户有不同的使用方式（比如普通用户和管理员）
* 多个用户之间可以协作
* 与服务器大量交互，或者使用了WebSocket
* View要从多个来源获取数据

简单说，如果你的UI层非常简单，没有很多互动，Redux 就是不必要的，用了反而增加复杂性。多交互、多数据源场景就比较适合使用Redux。

 1.2、设计思想

* Web 应用是一个状态机，视图与状态是一一对应的。

* 所有的状态，保存在一个对象里面。

 1.3、Redux工作流程

![react04-01](https://user-images.githubusercontent.com/22188674/224475588-53d35049-5ed3-4921-bd35-847a3859b23b.png)

首先，用户发出 Action。
`store.dispatch(action);`

然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 Reducer 会返回新的 State 。
`let nextState = todoApp(previousState, action);`

State 一旦有变化，Store 就会调用监听函数。
// 设置监听函数
`store.subscribe(listener);`

listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。

```javascript
function listerner () {
  const newState = store.getState()
  component.setState(newState)
}
```

如果现在没理解以上流程，不要急，看完以下API就差不多能懂得Redux的核心机制了。

<div id="02">2、API</div>

 Store

Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

Redux 提供createStore这个函数，用来生成 Store。
下面代码中，createStore函数接受另一个函数作为参数，返回新生成的 Store 对象。

```javascript
import { createStore } from 'redux'
const store = createStore(fn)
```

 State

Store对象包含所有数据。如果想得到某个时点的数据，就要对 Store 生成快照。这种时点的数据集合，就叫做 State。
当前时刻的 State，可以通过store.getState()拿到。

```javascript
import { createStore } from 'redux'
const store = createStore(fn)

const state = store.getState()
```

Redux 规定， 一个 State 对应一个 View。只要 State 相同，View 就相同。你知道 State，就知道 View 是什么样，反之亦然。

 Action

State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。
Action 是一个对象。其中的type属性是必须的，表示 Action 的名称。其他属性可以自由设置，社区有一个规范可以参考。

```javascript
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
}
```

上面代码中，Action 的名称是ADD_TODO，它携带的信息是字符串Learn Redux。
可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store。

 Action Creator

View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函数就叫 Action Creator。

```javascript
const ADD_TODO = '添加 TODO'

function addTodo (text) {
  return {
    type: ADD_TODO,
    text
  }
}
const action = addTodo('Learn Redux')
```

 store.dispatch()

store.dispatch()是 View 发出 Action 的唯一方法。

```javascript
import { createStore } from 'redux'
const store = createStore(fn)

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
})
```

上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。
结合 Action Creator，这段代码可以改写如下。

```javascript
store.dispatch(addTodo('Learn Redux'))
```

 Reducer

Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。
Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。下面是一个实际的例子

```javascript
const defaultState = 0
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload
    default:
      return state
  }
}

const state = reducer(1, {
  type: 'ADD',
  payload: 2
})
```

上面代码中，reducer函数收到名为ADD的 Action 以后，就返回一个新的 State，作为加法的计算结果。
其他运算的逻辑（比如减法），也可以根据 Action 的不同来实现。
实际应用中，Reducer 函数不用像上面这样手动调用，store.dispatch方法会触发 Reducer 的自动执行。
为此，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。

```javascript
import { createStore } from 'redux'
const store = createStore(reducer)
```

上面代码中，createStore接受 Reducer 作为参数，生成一个新的 Store。
以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State。

 store.subscribe()

Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。

```javascript
import { createStore } from 'redux'
const store = createStore(reducer)

store.subscribe(listener)
```

显然，只要把 View 的更新函数（对于 React 项目，就是组件的render方法或setState方法）放入listen，就会实现 View 的自动渲染。
store.subscribe方法返回一个函数，调用这个函数就可以解除监听。

```javascript
const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
unsubscribe()
```

<div id="03">3、中间件与异步操作</div>

一个关键问题没有解决：异步操作怎么办？Action 发出以后，Reducer 立即算出 State，这叫做同步；Action 发出以后，过一段时间再执行 Reducer，这就是异步。
怎么才能 Reducer 在异步操作结束后自动执行呢？这就要用到新的工具：中间件（middleware）。

为了理解中间件，让我们站在框架作者的角度思考问题：如果要添加功能，你会在哪个环节添加？
（1）Reducer：纯函数，只承担计算 State 的功能，不合适承担其他功能，也承担不了，因为理论上，纯函数不能进行读写操作。
（2）View：与 State 一一对应，可以看作 State 的视觉层，也不合适承担其他功能。
（3）Action：存放数据的对象，即消息的载体，只能被别人操作，自己不能进行任何操作。
想来想去，只有发送 Action 的这个步骤，即store.dispatch()方法，可以添加功能。

 中间件的用法

本文不涉及如何编写中间件，因为常用的中间件都有现成的，只要引用别人写好的模块即可。

```javascript
import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'
const logger = createLogger()

const store = createStore(
  reducer,
  applyMiddleware(logger)
)
```

上面代码中，redux-logger提供一个生成器createLogger，可以生成日志中间件logger。
然后，将它放在applyMiddleware方法之中，传入createStore方法，就完成了store.dispatch()的功能增强。

这里有两点需要注意：
（1）createStore方法可以接受整个应用的初始状态作为参数，那样的话，applyMiddleware就是第三个参数了。

```javascript
const store = createStore(
  reducer,
  initial_state,
  applyMiddleware(logger)
)
```

（2）中间件的次序有讲究。

```javascript
const store = createStore(
  reducer,
  applyMiddleware(thunk, promise, logger)
)
```

上面代码中，applyMiddleware方法的三个参数，就是三个中间件。有的中间件有次序要求，使用前要查一下文档。比如，logger就一定要放在最后，否则输出结果会不正确。

<div id="04">4、异步操作的基本思路</div>

理解了中间件以后，就可以处理异步操作了。

同步操作只要发出一种 Action 即可，异步操作的差别是它要发出三种 Action。

* 操作发起时的 Action
* 操作成功时的 Action
* 操作失败时的 Action

以向服务器取出数据为例，三种 Action 可以有两种不同的写法。

```
// 写法一：名称相同，参数不同
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }

// 写法二：名称不同
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```

除了 Action 种类不同，异步操作的 State 也要进行改造，反映不同的操作状态。下面是 State 的一个例子。

```javascript
const state = {
  // ...
  isFetching: true,
  didInvalidate: true,
  lastUpdated: 'xxxxxxx'
}
```

上面代码中，State 的属性isFetching表示是否在抓取数据。didInvalidate表示数据是否过时，lastUpdated表示上一次更新时间。

现在，整个异步操作的思路就很清楚了。

* 操作开始时，送出一个 Action，触发 State 更新为"正在操作"状态，View 重新渲染
* 操作结束后，再送出一个 Action，触发 State 更新为"操作结束"状态，View 再一次重新渲染

 总结

在异步请求的时候，其实很多时候都是直接发出请求如果请求成功了之后，在存入reducers, 并不是不管成功与否，都存入reducers。

 redux-thunk中间件

异步操作至少要送出两个 Action：用户触发第一个 Action，这个跟同步操作一样，没有问题；如何才能在操作结束时，系统自动送出第二个 Action 呢？
奥妙就在 Action Creator 之中。

```javascript
class AsyncApp extends Component {
  componentDidMount () {
    const { dispatch, selectedPost } = this.props
    dispatch(getApplyList(selectedPost))
  }
}
// ...
```

上面代码是一个异步组件的例子。加载成功后（componentDidMount方法），它送出了（dispatch方法）一个 Action，向服务器要求数据 fetchPosts(selectedSubreddit)。
这里的fetchPosts就是 Action Creator。
下面就是getApplyList的代码，关键之处就在里面， 这是我在公司的代码风格写法。

```javascript
export function getApplyList (query) {
  return function (dispatch) {
    dispatch(modalUpdate({
      loadingTable: true
    }))
    fetch('apply', query)
      .then(function (res) {
        dispatch(updateApply(res.data)) // 这个是调用的action Mppper
        dispatch(modalUpdate({
          loadingTable: false
        }))
      }).catch(function (err) {
        dispatch(modalUpdate({
          pageWarn: err.message,
          loadingTable: false
        }))
      })
  }
}

// 对应的action Mapper
export function updateApply (data) {
  return {
    type: UPDATE_APPLY,
    data
  }
}
```

这里是博客文章的代码风格写法

```javascript
const fetchPosts = postTitle => (dispatch, getState) => {
  dispatch(requestPosts(postTitle))
  return fetch(`/some/API/${postTitle}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(postTitle, json)))
}

// 使用方法一
store.dispatch(fetchPosts('reactjs'))
// 使用方法二
store.dispatch(fetchPosts('reactjs')).then(() =>
  console.log(store.getState())
)
```

上面代码中，fetchPosts是一个Action Creator（动作生成器），返回一个函数。
这个函数执行后，先发出一个Action（requestPosts(postTitle)），然后进行异步操作。
拿到结果后，先将结果转成 JSON 格式，然后再发出一个 Action（ receivePosts(postTitle, json)）。

上面代码中，有几个地方需要注意。

* （1）fetchPosts返回了一个函数，而普通的 Action Creator 默认返回一个对象。
* （2）返回的函数的参数是dispatch和getState这两个 Redux 方法，普通的 Action Creator 的参数是 Action 的内容。
* （3）在返回的函数之中，先发出一个 Action（requestPosts(postTitle)），表示操作开始。
* （4）异步操作结束之后，再发出一个 Action（receivePosts(postTitle, json)），表示操作结束。

这样的处理，就解决了自动发送第二个 Action 的问题。但是，又带来了一个新的问题，Action 是由store.dispatch方法发送的。
而store.dispatch方法正常情况下，参数只能是对象，不能是函数。
这时，就要使用中间件**redux-thunk**。

```javascript
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

// Note: this API requires redux@>=3.1.0
const store = createStore(
  reducer,
  applyMiddleware(thunk)
)
```

上面代码使用redux-thunk中间件，改造store.dispatch，使得后者可以接受函数作为参数。
因此，异步操作的第一种解决方案就是，写出一个返回函数的 Action Creator，然后使用redux-thunk中间件改造store.dispatch。

<div id="05">5、React-Redux的用法</div>

为了方便使用，Redux 的作者封装了一个 React 专用的库 React-Redux，本文主要介绍它。
这个库是可以选用的。实际项目中，你应该权衡一下，是直接使用 Redux，还是使用 React-Redux。后者虽然提供了便利，但是需要掌握额外的 API，并且要遵守它的组件拆分规范。

本人项目中使用的最多的就是 react-redux;

React-Redux 将所有组件分成两大类：**UI 组件（presentational component）和容器组件（container component）**。

 UI组件

UI 组件有以下几个特征。

* 只负责 UI 的呈现，不带有任何业务逻辑
* 没有状态（即不使用this.state这个变量）
* 所有数据都由参数（this.props）提供
* 不使用任何 Redux 的 API

下面就是一个 UI 组件的例子。

```javascript
const Title = value => <h1>{value}</h1>
```

因为不含有状态，UI 组件又称为"纯组件"，即它纯函数一样，纯粹由参数决定它的值。

 容器组件

容器组件的特征恰恰相反。

* 负责管理数据和业务逻辑，不负责 UI 的呈现
* 带有内部状态
* 使用 Redux 的 API

总之，只要记住一句话就可以了：UI 组件负责 UI 的呈现，容器组件负责管理数据和逻辑。

你可能会问，如果一个组件既有 UI 又有业务逻辑，那怎么办？回答是，将它拆分成下面的结构：外面是一个容器组件，里面包了一个UI 组件。前者负责与外部的通信，将数据传给后者，由后者渲染出视图。
React-Redux 规定，所有的 UI 组件都由用户提供，容器组件则是由 React-Redux 自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。

 connect()

React-Redux 提供connect方法，用于从 UI 组件生成容器组件。connect的意思，就是将这两种组件连起来。
connect方法的完整 API 如下。下面这个例子是我在项目中使用的一个完整结构示例

```javascript
/* eslint-disable react/jsx-no-target-blank */
import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, message } from 'antd'

// mapStateToProps
function propMap (state, ownProps) {
  return {
    modal: state.modal,
    routing: ownProps
  }
}

class InvoiceList extends Component {
  constructor () {
    super()
    this.state = {
      invoiceListData: {}
    }
    this.handleGetList = this.handleGetList.bind(this)
  }

  componentDidMount () {
    // 每次刷新空拉数据一次
    this.handleGetList()
  }

  render () {
    const { routing, modal } = this.props
    return (
 <div className="app-reimbursement-invoice-list">
 <ReimbursementHeaderNav current="invoice-list"/>
 {/* ....... */}
 </div>
    )
  }

  // 点击查询数据
  handleGetList (filters, type) {
    console.log('点击查询数据')
  }
}
InvoiceList.propTypes = {
  routing: PropTypes.object.isRequired,
  modal: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}
export default connect(propMap)(InvoiceList)
```

InvoiceList就是由 React-Redux 通过connect方法自动生成的容器组件。
connect方法接受两个参数：mapStateToProps和mapDispatchToProps。
它们定义了 UI 组件的业务逻辑。前者负责输入逻辑，即将state映射到 UI 组件的参数（props），后者负责输出逻辑，即将用户对 UI 组件的操作映射成 Action。
通常我们只使用了第一个参数；

 mapStateToProps

mapStateToProps是一个函数。它的作用就是像它的名字那样，建立一个从（外部的）state对象到（UI 组件的）props对象的映射关系。
作为函数，mapStateToProps执行后应该返回一个对象，里面的每一个键值对就是一个映射。

```javascript
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
```

上面代码中，mapStateToProps是一个函数，它接受state作为参数，返回一个对象。这个对象有一个todos属性，代表 UI 组件的同名参数，
后面的getVisibleTodos也是一个函数，可以从state算出 todos 的值。
下面就是getVisibleTodos的一个例子，用来算出todos。

```javascript
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}
```

mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
mapStateToProps的第一个参数总是state对象，还可以使用第二个参数，代表容器组件的props对象

```javascript
const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}
```

使用ownProps作为参数后，如果容器组件的参数发生变化，也会引发 UI 组件重新渲染。
connect方法可以省略mapStateToProps参数，那样的话，UI 组件就不会订阅Store，就是说 Store 的更新不会引起 UI 组件的更新。

 mapDispatchToProps()

mapDispatchToProps是connect函数的第二个参数，用来建立 UI 组件的参数到store.dispatch方法的映射。
也就是说，它定义了哪些用户的操作应该当作 Action，传给 Store。它可以是一个函数，也可以是一个对象。

如果mapDispatchToProps是一个函数，会得到dispatch和ownProps（容器组件的props对象）两个参数。

```javascript
const mapDispatchToProps = (
  dispatch,
  ownProps
) => {
  return {
    onClick: () => {
      dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter: ownProps.filter
      })
    }
  }
}
```

从上面代码可以看到，mapDispatchToProps作为函数，应该返回一个对象，该对象的每个键值对都是一个映射，定义了 UI 组件的参数怎样发出 Action。

如果mapDispatchToProps是一个对象，它的每个键名也是对应 UI 组件的同名参数，键值应该是一个函数，会被当作 Action creator ，
返回的 Action 会由 Redux 自动发出。举例来说，上面的mapDispatchToProps写成对象就是下面这样。

```ecmascript 6
const mapDispatchToProps = {
 onClick: (filter) => {
 type: 'SET_VISIBILITY_FILTER',
 filter: filter
 }
}
```

总结，实际上项目开发过程中， 只用得上第一个参数，第二个参数一般来说是封装在reducers 层次里面的。不建议直接放置在组建成此调用。因为会导致使用和数据上的紊乱。

 `<Provider>` 组件

connect方法生成容器组件以后，需要让容器组件拿到state对象，才能生成 UI 组件的参数。React-Redux 提供Provider组件，可以让容器组件拿到state。

```javascript
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './components/App'

const store = createStore(todoApp)

render(
 <Provider store={store}>
 <App />
 </Provider>,
 document.getElementById('root')
)
```

上面代码中，Provider在根组件外面包了一层，这样一来，App的所有子组件就默认都可以拿到state了。

 React-Router路由库

使用React-Router的项目，与其他项目没有不同之处，也是使用Provider在Router外面包一层，毕竟Provider的唯一功能就是传入store对象。

```javascript
const Root = ({ store }) => (
 <Provider store={store}>
 <Router>
 <Route path="/" component={App} />
 </Router>
 </Provider>
)
```

## 83 react和vue的区别？

* created_at: 2023-03-11T12:15:59Z
* updated_at: 2023-03-11T12:16:00Z
* labels: web框架
* milestone: 资深

Vue与React的对比

> 文档转自：[资料](https://blog.csdn.net/CystalVon/article/details/78428036)

Vue.js与React.js从某些反面来说很相似，通过两个框架的学习，有时候对一些用法会有一点思考，为加深学习的思索，特翻阅了两个文档，从以下各方面进行了对比，加深了对这两个框架的认知。

**1.数据绑定**

 1.1 Vue中有关数据绑定的部分

* vue是双向绑定， Vue.js 最核心的功能有两个，一是响应式的数据绑定系统，二是组件系统。所谓双向绑定，指的是vue实例中的data与其渲染的DOM元素的内容保持一致，无论谁被改变，另一方会相应的更新为相同的数据。这是通过设置属性访问器实现的。
* 在vue中，与数据绑定有关的有 **插值表达式、指令系统、\*Class和Style、事件处理器和表单空间、ajax请求和计算属性**

 1.1.1插值表达式

插值和指令又称为模板语法
. 数据绑定最常见的形式就是使用“Mustache”语法 (双大括号) 的文本插值
. Mustache 语法不能作用在 HTML 特性上，遇到这种情况应该使用 v-bind 指令

 1.1.2 指令

* vue中的指令很方便，指令 (Directives) 是带有 v- 前缀的特殊属性。指令属性的值预期是单个 JavaScript 表达式 (v-for 是例外情况，稍后我们再讨论)。指令的职责是，当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM。

* vue中的12个指令： `v-bind,v-once,v-model,v-text,v-html,v-on,v-if,v-else,v-show,v-for,v-pre,v-clock`

 1.1.3 class与style绑定

* 数据绑定的一个常见需求是操作元素的 class 列表和它的内联样式。因为它们都是属性 ，我们可以用v-bind 处理它们：只需要计算出表达式最终的字符串。不过，字符串拼接麻烦又易错。因此，在 v-bind 用于 class 和 style 时，Vue.js 专门增强了它。表达式的结果类型除了字符串之外，还可以是对象或数组。
* 对象语法

我们可以传给 v-bind:class 一个对象，以动态地切换 class

* 数组语法

我们可以把一个数组传给 v-bind:class，以应用一个 class 列表：

```javascript
<div v-bind:class="[activeClass, errorClass]"></div>
1
```

 1.1.4 条件渲染和列表渲染

* v-if条件渲染一组数
* 我们用 v-for 指令根据一组数组的选项列表进行渲染。v-for 指令需要使用 item in items 形式的特殊语法，items 是源数据数组并且 item 是数组元素迭代的别名。

 1.1.5 事件处理器

* 通过v-on给元素注册事件
* 使用 v-on 有几个好处：

扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。

 1.1.6 表单控件

* v-model在表单控件元素上创建双向数据绑定
* 它会根据控件类型自动选取正确的方法来更新元素。

 1.1.7 计算属性

* 在Vue中引入了计算属性来处理模板中放入太多的逻辑会让模板过重且难以维护的问题，这样不但解决了上面的问题，而且也同时让模板和业务逻辑更好的分离。
* 简单来说，假如data里面有属性a=1，然后你需要一个变量跟着a变化，例如b=a+1，那么就需要用到计算属性，Vue实例的computed属性中，设置b为其属性，其表现为一个函数，返回值是b的值。

 注： <font>关于vue的数据双向绑定和单向数据流</font>

* **Vue 的依赖追踪是【原理上不支持双向绑定，v-model 只是通过监听 DOM 事件实现的语法糖】**

* vue的依赖追踪是通过 Object.defineProperty 把data对象的属性全部转为 getter/setter来实现的；当改变数据的某个属性值时，会触发set函数,获取该属性值的时候会触发get函数，通过这个特性来实现改变数据时改变视图；也就是说只有当数据改变时才会触发视图的改变，反过来在操作视图时，只能通过DOM事件来改变数据，再由此来改变视图，以此来实现双向绑定
* <font>双向绑定是在同一个组件内，将数据和视图绑定起来，和父子组件之间的通信并无什么关联；</font>
* 组件之间的通信采用<font>单向数据流</font>是为了组件间更好的解耦，在开发中可能有多个子组件依赖于父组件的某个数据，假如子组件可以修改父组件数据的话，一个子组件变化会引发所有依赖这个数据的子组件发生变化，所以vue不推荐子组件修改父组件的数据，直接修改props会抛出警告

 1.2 react没有数据双向绑定

* react是单向数据流
* react中通过将state（Model层）与View层数据进行双向绑定达数据的实时更新变化，具体来说就是在View层直接写JS代码Model层中的数据拿过来渲染，一旦像**表单操作、触发事件、ajax请求**等触发数据变化，则进行双同步

 1.2.1事件处理

* React 元素的事件处理和 DOM元素的很相似。但是有一点语法上的不同:

React事件绑定属性的命名采用驼峰式写法，而不是小写。
如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)
在 React 中另一个不同是你不能使用返回 false 的方式阻止默认行为。你必须明确的使用 preventDefault。

当你使用 ES6 class 语法来定义一个组件的时候，事件处理器会成为类的一个方法。一般需要显式的绑定this，例如

 `this.handleClick = this.handleClick.bind(this);`
你必须谨慎对待 JSX 回调函数中的 this，类的方法默认是不会绑定 this 的。如果你忘记绑定 this.handleClick 并把它传入 onClick, 当你调用这个函数的时候 this 的值会是 undefined。

 1.2.2 条件渲染

* React 中的条件渲染和 JavaScript 中的一致，使用 JavaScript 操作符 if 或条件运算符来创建表示当前状态的元素，然后让 React 根据它们来更新 UI。
* 你可以通过用花括号包裹代码在 JSX 中嵌入任何表达式 ，也包括 JavaScript 的逻辑与 &&，它可以方便地条件渲染一个元素。之所以能这样做，是因为在 JavaScript 中，true && expression 总是返回 expression，而 false && expression 总是返回 false。因此，如果条件是 true，&& 右侧的元素就会被渲染，如果是 false，React 会忽略并跳过它。
* 条件渲染的另一种方法是使用 JavaScript 的条件运算符 condition ? true : false。

 1.2.3 列表渲染

* 你可以通过使用{}在JSX内构建一个元素集合，使用Javascript中的map()方法循遍历数组
* Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此你应当给数组中的每一个元素赋予一个确定的标识。一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用来自数据的id作为元素的key。

 1.2.4 表单操作

* HTML表单元素与React中的其他DOM元素有所不同,因为表单元素生来就保留一些内部状态。
* 当用户提交表单时，HTML的默认行为会使这个表单会跳转到一个新页面。在React中亦是如此。但大多数情况下，我们都会构造一个处理提交表单并可访问用户输入表单数据的函数。实现这一点的标准方法是使用一种称为“受控组件”的技术。其值由React控制的输入表单元素称为“受控组件”。`this.setState({value: event.target.value});`
* 当你有处理多个受控的input元素时，你可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name的值来选择做什么。

 1.2.5 状态提升

* 在React中，状态分享是通过将state数据提升至离需要这些数据的组件最近的父组件来完成的。这就是所谓的状态提升。`this.props.xxx`
* 在React应用中，对应任何可变数据理应只有一个单一“数据源”。通常，状态都是首先添加在需要渲染数据的组件中。此时，如果另一个组件也需要这些数据，你可以将数据提升至离它们最近的父组件中。你应该在应用中保持 自上而下的数据流，而不是尝试在不同组件中同步状态。

**2.组件化以及组件数据流**

 2.1 react中的组件及数据流

* React是单向数据流，数据主要从父节点传递到子节点（通过props）。如果顶层（父级）的某个props改变了，React会重渲染所有的子节点。
* react中实现组件有两种实现方式，一种是createClass方法，另一种是通过ES2015的思想类继承React.Component来实现
* 在React应用中，按钮、表单、对话框、整个屏幕的内容等，这些通常都被表示为组件。
* React推崇的是**函数式编程**和**单向数据流**：给定原始界面（或数据），施加一个变化，就能推导出另外一个状态（界面或者数据的更新）
* 组件可以将UI切分成一些的独立的、可复用的部件，这样你就只需专注于构建每一个单独的部件。组件从概念上看就像是函数，它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素。
**1. Props的只读性**
* 无论是使用函数或是类来声明一个组件，它决不能修改它自己的props。
* 所有的React组件必须像纯函数那样使用它们的props。

**props与State的区别**
. props是property的缩写，可以理解为HTML标签的attribute。不可以使用this.props直接修改props，因为props是只读的，props是用于整个组件树中传递数据和配置。在当前组件访问props，使用this.props。
. props是一个组件的设置参数，可以在父控件中选择性设置。父组件对子控件的props进行赋值，并且props的值不可改变。一个子控件自身不能改变自己的 props。
. state:当一个组件 mounts的时候，state如果设置有默认值的会被使用，并且state可能时刻的被改变。一个子控件自身可以管理自己的state，但是需要注意的是，无法管理其子控件的state。所以可以认为，state是子控件自身私有的。
. 每个组件都有属于自己的state，state和props的区别在于前者(state)只存在于组件内部，只能从当前组件调用this.setState修改state值（不可以直接修改this.state！）。
. props是一个父组件传递给子组件的数据流，可以一直的被传递到子孙组件中。然而 state代表的是子组件自身的内部状态。从语义上讲，改变组件的状态，可能会导致dom结构的改变或者重新渲染。而props是父组件传递的参数，所以可以被用于初始化渲染和改变组件自身的状态，虽然大多数时候组件的状态是又外部事件触发改变的。我们需要知道的是，无论是state改变，还是父组件传递的 props改变，render方法都可能会被执行。
. 一般我们更新子组件都是通过改变state值，更新新子组件的props值从而达到更新。

 2.1.1 组件之间的通信

1. 父子组件数通信

父与子之间通props属性进行传递
子与父之间，父组件定义事件，子组件触发父组件中的事件时，通过实参的形式来改变父组件中的数据来通信

即：
. . 父组件更新组件状态 —–props—–> 子组件更新
. . 子组件更新父组件状态 —–需要父组件传递回调函数—–> 子组件调用触发

1. 非父子组件之间的通信，嵌套不深的非父子组件可以使共同父组件，触发事件函数传形参的方式来实现
 兄弟组件：

（1） 按照React单向数据流方式，我们需要借助父组件进行传递，通过父组件回调函数改变兄弟组件的props。
. 其实这种实现方式与子组件更新父组件状态的方式是大同小异的。

（2） 当组件层次很深的时候，在这里，React官方给我们提供了一种上下文方式，可以让子组件直接访问祖先的数据或函数，无需从祖先组件一层层地传递数据到子组件中。

 2.1.2 组件的生命周期

```javascript
construtor() // 创建组件
componentWillMount() // 组件挂载之前
componentDidMount() // 组件挂载之后
componentWillReceiveProps() // 父组件发生render的时候子组件调用该函数
shouldComponentUpdate() // 组件挂载之后每次调用setState后都会调用该函数判断是否需要重新渲染组件，默认返回true
componentDidUpdate() // 更新
render() // 渲染，react中的核心函数
componentWillUnmount() // 组件被卸载的时候调用，一般在componentDidMount注册的事件需要在这里删除

123456789
```

![组件的生命周期](http://upload-images.jianshu.io/upload_images/3333422-04ea055c73c50c98.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

 2.2 vue中的组件和数据流

 2.2.1 组件化应用构建

* 组件系统是 Vue 的另一个重要概念，因为它是一种抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。
* 在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例
* 在一个大型应用中，有必要将整个应用程序划分为组件，以使开发可管理。
* 组件(component)是 Vue 最强大的功能之一。组件可以帮助你扩展基本的 HTML 元素，以封装可重用代码。在较高层面上，组件是 Vue 编译器附加行为后的自定义元素。在某些情况下，组件也可以是原生 HTML 元素的形式，以特定的 is 特性扩展。
* 组件中，data必须是一个函数
* 组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以是原生 HTML 元素的形式，以 is 特性扩展。

 2.2.2 响应式

* 当一个 Vue 实例被创建时，它向 Vue 的响应式系统中加入了其 data 对象中能找到的所有的属性。当这些属性的值发生改变时，视图将会产生“响应”，即匹配更新为新的值。
* 当这些数据改变时，视图会进行重渲染。值得注意的是只有当实例被创建时 data 中存在的属性是响应式的。

 2.2.3 组件的生命周期

* 每个 Vue 实例在被创建之前都要经过一系列的初始化过程。例如需要设置数据监听、编译模板、挂载实例到 DOM、在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，给予用户机会在一些特定的场景下添加他们自己的代码。
* 比如 created 钩子可以用来在一个实例被创建之后执行代码，也有一些其它的钩子，在实例生命周期的不同场景下调用，如 mounted、updated、destroyed。钩子的 this 指向调用它的 Vue 实例。
* 生命周期图示：
![vue生命周期](https://cn.vuejs.org/images/lifecycle.png)

 2.2.4 组件之间的通信

* Vue默认的是单向数据流，这是Vue直接提出来说明的，父组件默认可以向子组件传递数据，但是子组件向父组件传递数据就需要额外设置了。
* Vue 也支持双向绑定，默认为单向绑定，数据从父组件单向传给子组件。在大型应用中使用单向绑定让数据流易于理解。
* 父子组件之间的数据通信是通过Prop和自定义事件实现的，而非父子组件可以使用订阅/发布模式实现（类似于Angualr中的非父子指令之间的通信），再复杂一点也是建议使用状态管理（vuex）。
* 在 Vue 中，父子组件之间的关系可以概述为：props 向下，events 向上。父组件通过 props 向下传递数据给子组件，子组件通过 events 发送消息给父组件。

**1.父向子**
. 每个组件实例都有自己的孤立隔离作用域。也就是说，不能（也不应该）直接在子组件模板中引用父组件数据。要想在子组件模板中引用父组件数据，可以使用 props 将数据向下传递到子组件。
. 每个 prop 属性,都可以控制是否从父组件的自定义属性中接收数据。子组件需要使用 props 选项显式声明 props，以便它可以从父组件接收到期望的数据。
. **动态Props**，类似于将一个普通属性绑定到一个表达式，我们还可以使用 v-bind 将 props 属性动态地绑定到父组件中的数据。无论父组件何时更新数据，都可以将数据向下流入到子组件中

**2.子向父**
. 使用自定义事件
. 每个 Vue 实例都接入了一个事件接口(events interface)，也就是说，这些 Vue 实例可以做到：

**3. 非父子组件通信**
. 可以使用一个空的 Vue 实例作为一个事件总线中心(central event bus)
 2.2.5 单向数据流

单向数据流示意图：
![单向数据流](https://vuex.vuejs.org/zh-cn/images/flow.png)

**3.状态管理**

 ~~3.1 react中的状态管理：Flux~~

* Redux 是 React 生态环境中最流行的 Flux 实现。Redux 事实上无法感知视图层，所以它能够轻松的通过一些简单绑定和 Vue 一起使用。

 1. 创建actions

定义动作，事件触发需要用dispatcher来调用
行为，如增加操作、删除操作、更新操作，就是一堆函数。
 2. 创建store

store中包含应用的状态和逻辑，用来管理应用中不同的状态和逻辑，相当于Model层
 3. 创建dispatcher

在dispatcher中通过register来给每个action注对应的的store中的方法
 4. 在view层调用action中的方法

就是各类component

![flux的示意图](https://img-blog.csdn.net/20150625201409735?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvd2VueHVhbnNvZnQ=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

 3.2 vue中的状态管理vuex

* vuex借鉴了 Flux、Redux、和 The Elm Architecture。与其他模式不同的是，Vuex 是专门为 Vue.js 设计的状态管理库，以利用 Vue.js 的细粒度数据响应机制来进行高效的状态更新。这使得它能够更好地和 Vue 进行整合，同时提供简洁的 API 和改善过的开发体验。

* 组件不允许直接修改属于 store 实例的 state，而应执行 action 来分发 (dispatch) 事件通知 store 去改变，我们最终达成了 Flux 架构。这样约定的好处是，我们能够记录所有 store 中发生的 state 改变，同时实现能做到记录变更 (mutation)、保存状态快照、历史回滚/时光旅行的先进的调试工具。

* 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态

* Vuex 和单纯的全局对象有以下两点不同：

 1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

 2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

 3. State

* Vuex 使用单一状态树——是的，用一个对象就包含了全部的应用层级状态。至此它便作为一个“唯一数据源 (SSOT)”而存在。这也意味着，每个应用将仅仅包含一个 store 实例。单一状态树让我们能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。这也意味着，每个应用将仅仅包含一个 store 实例。

 1. Getters

* 从state中获取状态值，有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数。

 1. Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数。
你不能直接调用一个 mutation handler。这个选项更像是事件注册：“当触发一个类型为 increment 的 mutation 时，调用此函数。”要唤醒一个 mutation handler，你需要以相应的 type 调用 store.commit 方法

 2. Action

Action 类似于 mutation，不同在于：

Action 提交的是 mutation，而不是直接变更状态。
Action 可以包含任意异步操作。
dispatch分发action

 3. Module

* 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
* Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

![vuex示意图](https://raw.githubusercontent.com/vuejs/vuex/dev/docs/en/images/vuex.png)

**4.路由**

* 两者的路由很相似，都是利用了组件化思想

 4.1 react中的路由

* 在路由库的问题上，React 选择把问题交给社区维护，因此创建了一个更分散的生态系统。但相对的，React 的生态系统相比 Vue 更加繁荣。
* react中，需要引入react-router库，
 使用时，路由器Router就是React的一个组件。
* Router组件本身只是一个容器，真正的路由要通过Route组件定义。
* Route组件定义了URL路径与组件的对应关系。你可以同时使用多个Route组件。

```javascript
<Router history={hashHistory}>
 <Route path="/" component={App}/>
 <Route path="/repos" component={Repos}/>
 <Route path="/about" component={About}/>
</Router>
12345
```

 4.2 vue中的路由

* Vue 的路由库和状态管理库都是由官方维护支持且与核心库同步更新的。

* 使用 Vue.js ，我们已经可以通过组合组件来组成应用程序，当你要把 vue-router 添加进来，我们需要做的是，**将组件(components)映射到路由(routes)，然后告诉 vue-router 在哪里渲染它们。**

 1. HTML中：

```javascript
<div id="app">
 <h1>Hello App!</h1>
 <p>
 <!-- 使用 router-link 组件来导航. -->
 <!-- 通过传入 `to` 属性指定链接. -->
 <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
 <router-link to="/foo">Go to Foo</router-link>
 <router-link to="/bar">Go to Bar</router-link>
 </p>
 <!-- 路由出口 -->
 <!-- 路由匹配到的组件将渲染在这里 -->
 <router-view></router-view>
</div>
12345678910111213
```

## 5. 渲染性能对比

* 在操作界面时，要尽量减少对DOM的操作，Vue 和 React 都使用虚拟DOM来实现，并且两者工作一样好。
* 尽量减少除DOM操作以外的其他操作。（vue和react的不同）

 5.1 react视图渲染

* React 的渲染建立在 Virtual DOM 上——一种在内存中描述 DOM 树状态的数据结构。当状态发生变化时，React 重新渲染 Virtual DOM，比较计算之后给真实 DOM 打补丁。

* Virtual DOM 提供了函数式的方法描述视图，它不使用数据观察机制，每次更新都会重新渲染整个应用，因此从定义上保证了视图与数据的同步。它也开辟了 JavaScript 同构应用的可能性。

* 在超大量数据的首屏渲染速度上，React 有一定优势，因为 Vue 的渲染机制启动时候要做的工作比较多，而且 React 支持服务端渲染。

* 元素是构成 React 应用的最小单位。元素用来描述你在屏幕上看到的内容，与浏览器的 DOM 元素不同，React 当中的元素事实上是普通的对象，React DOM 可以确保 浏览器 DOM 的数据内容与 React 元素保持一致。
* 我们用React 开发应用时一般只会定义一个根节点。但如果你是在一个已有的项目当中引入 React 的话，你可能会需要在不同的部分单独定义 React 根节点。我们将 元素传入一个名为 ReactDOM.render() 的方法来将其渲染到页面上，页面上就会显示该元素。

**组件渲染**
. 当React遇到的元素是用户自定义的组件，它会将JSX属性作为单个对象传递给该组件,这个对象称之为“props”。

 5.2 vue视图渲染

* Vue 通过建立一个虚拟 DOM 对真实 DOM 发生的变化保持追踪。

* vue渲染的过程如下：

new Vue，执行初始化
挂载$mount方法，通过自定义Render方法、template、el等生成Render函数
通过Watcher监听数据的变化
当数据发生变化时，Render函数执行生成VNode对象
通过patch方法，对比新旧VNode对象，通过DOM Diff算法，添加、修改、删除真正的DOM元素

## 6. 数据更新

 6.1 react数据更新

* React 元素都是immutable 不可变的。当元素被创建之后，你是无法改变其内容或属性的。一个元素就好像是动画里的一帧，它代表应用界面在某一时间点的样子。
* 根据我们现阶段了解的有关 React 知识，更新界面的唯一办法是创建一个新的元素，然后将它传入 ReactDOM.render() 方法

 6.2 vue数据更新

## 7. 开发模式及规模

 7.1 react

 7.1.1 开发模式

* React本身，是严格的view层，MVC模式

 7.1.2 规模

* Vue 提供了Vue-cli 脚手架，能让你非常容易地构建项目，包含了 Webpack，Browserify，甚至 no build system。

 7.2 vue

 7.2.1 开发模式

* Vue是MVVM模式的一种方式实现
* 虽然没有完全遵循 MVVM 模型，Vue 的设计无疑受到了它的启发。因此在文档中经常会使用 vm (ViewModel 的简称) 这个变量名表示 Vue 实例。

 7.2.2 脚手架

* React 提供了create-react-app，但是现在还存在一些局限性：

它不允许在项目生成时进行任何配置，而 Vue 支持 Yeoman-like 定制。
它只提供一个构建单页面应用的单一模板，而 Vue 提供了各种用途的模板。
它不能用用户自建的模板构建项目，而自建模板对企业环境下预先建立协议是特别有用的。

## 8. HTML&&CSS

* 在 React 中，一切都是 JavaScript。不仅仅是 HTML 可以用 JSX 来表达，现在的潮流也越来越多地将 CSS 也纳入到 JavaScript 中来处理。这类方案有其优点，但也存在一些不是每个开发者都能接受的取舍。

Vue 的整体思想是拥抱经典的 Web 技术，并在其上进行扩展。

 8.1 react

 8.1.1 JSX

* 在 React 中，所有的组件的渲染功能都依靠 JSX。JSX 是使用 XML 语法编写 JavaScript 的一种语法糖。

* JSX, 一种 JavaScript 的语法扩展。 我们推荐在 React 中使用 JSX 来描述用户界面。JSX 乍看起来可能比较像是模版语言，但事实上它完全是在 JavaScript 内部实现的。

* JSX 用来声明 React 当中的元素。
* JSX本身也是一种表达式，在编译之后呢，JSX 其实会被转化为普通的 JavaScript 对象。这也就意味着，你其实可以在 if 或者 for 语句里使用 JSX，将它赋值给变量，当作参数传入，作为返回值都可以
* JSX 说是手写的渲染函数有下面这些优势：

你可以使用完整的编程语言 JavaScript 功能来构建你的视图页面。比如你可以使用临时变量、JS 自带的流程控制、以及直接引用当前 JS 作用域中的值等等。
开发工具对 JSX 的支持相比于现有可用的其他 Vue 模板还是比较先进的 (比如，linting、类型检查、编辑器的自动完成)。

 8.1.2 组件作用域内的CSS

* 除非你把组件分布在多个文件上 (例如 CSS Modules)，CSS 作用域在 React 中是通过 CSS-in-JS 的方案实现的 (比如 styled-components、glamorous 和 emotion)。这引入了一个新的面向组件的样式范例，它和普通的 CSS 撰写过程是有区别的。另外，虽然在构建时将 CSS 提取到一个单独的样式表是支持的，但 bundle 里通常还是需要一个运行时程序来让这些样式生效。当你能够利用 JavaScript 灵活处理样式的同时，也需要权衡 bundle 的尺寸和运行时的开销。

 8.2 vue

 8.2.1 Templates模板语法

* 事实上 Vue 也提供了渲染函数，甚至支持 JSX。然而，我们默认推荐的还是模板。任何合乎规范的 HTML 都是合法的 Vue 模板，这也带来了一些特有的优势：

对于很多习惯了 HTML 的开发者来说，模板比起 JSX 读写起来更自然。这里当然有主观偏好的成分，但如果这种区别会导致开发效率的提升，那么它就有客观的价值存在。
基于 HTML 的模板使得将已有的应用逐步迁移到 Vue 更为容易。
这也使得设计师和新人开发者更容易理解和参与到项目中。
你甚至可以使用其他模板预处理器，比如 Pug 来书写 Vue 的模板。

* Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML ，所以能被遵循规范的浏览器和 HTML 解析器解析。
* 在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，在应用状态改变时，Vue 能够智能地计算出重新渲染组件的最小代价并应用到 DOM 操作上。

 8.2.2 单文件组件CSS

* Vue 设置样式的默认方法是单文件组件里类似 style 的标签。
 单文件组件让你可以在**同一个文件里完全控制 CSS**，将其作为组件代码的一部分。
* Vue 的单文件组件里的样式设置是非常灵活的。通过 vue-loader，你可以使用任意预处理器、后处理器，甚至深度集成 CSS Modules——全部都在

 8.3 小结

* 更抽象一点来看，我们可以把组件区分为两类：一类是**偏视图表现**的 (presentational)，一类则是**偏逻辑**的 (logical)。我们推荐在前者中使用模板，在后者中使用 JSX 或渲染函数。这两类组件的比例会根据应用类型的不同有所变化，但整体来说我们发现表现类的组件远远多于逻辑类组件。

## 9. 使用场景

 9.1 选择react

 9.1.1 期待构建一个大型应用程序——选择React

* 同时用Vue和React实现的简单应用程序，可能会让一个开发者潜意识中更加倾向于Vue。这是因为基于模板的应用程序第一眼看上去更加好理解，而且能很快跑起来。但是这些好处引入的技术债会阻碍应用扩展到更大的规模。模板容易出现很难注意到的运行时错误，同时也很难去测试，重构和分解。
 相比之下，Javascript模板可以组织成具有很好的分解性和干（DRY）代码的组件，干代码的可重用性和可测试性更好。Vue也有组件系统和渲染函数，但是React的渲染系统可配置性更强，还有诸如浅（shallow）渲染的特性，和React的测试工具结合起来使用，使代码的可测试性和可维护性更好。
 与此同时，React的immutable应用状态可能写起来不够简洁，但它在大型应用中意义非凡，因为透明度和可测试性在大型项目中变得至关重要。

 9.1.2 期待同时适用于Web端和原生APP的框架——选择React

* React Native是一个使用Javascript构建移动端原生应用程序（iOS，Android）的库。 它与React.js相同，只是不使用Web组件，而是使用原生组件。 如果你学过React.js，很快就能上手React Native，反之亦然。
 它的意义在于，开发者只需要一套知识和工具就能开发Web应用和移动端原生应用。如果你想同时做Web端开发和移动端开发，React为你准备了一份大礼。
 阿里的Weex也是一个跨平台UI项目，目前它以Vue为灵感，使用了许多相同的语法，同时计划在未来完全集成Vue，然而集成的时间和细节还不清楚。因为Vue将HTML模板作为它设计的核心部分，并且现有特性不支持自定义渲染，因此很难看出目前的Vue.js的跨平台能力能像React和React Native一样强大。

 9.1.3 期待最大的生态系统——选择React

* 毫无疑问，React是目前最受欢迎的前端框架。它在NPM上每个月的下载量超过了250万次，相比之下，Vue是22.5万次。人气不仅仅是一个肤浅的数字，这意味着更多的文章，教程和更多Stack Overflow的解答，还意味有着更多的工具和插件可以在项目中使用，让开发者不再孤立无援。
 这两个框架都是开源的，但是React诞生于Facebook，有Facebook背书，它的开发者和Facebook都承诺会持续维护React。相比之下，Vue是独立开发者尤雨溪的作品。尤雨溪目前在全职维护Vue，也有一些公司资助Vue，但是规模和Facebook和Google没得比。不过请对Vue的团队放心，它的小规模和独立性并没有成为劣势，Vue有着固定的发布周期，甚至更令人称道的是，Github上Vue只有54个open issue，3456个closed issue，作为对比，React有多达530个open issue，3447个closed issue。

 9.2 选择vue

 9.2.1 期待模板搭建应用——选择 Vue

* Vue应用的默认选项是把markup放在HTML文件中。数据绑定表达式采用的是和Angular相似的mustache语法，而指令（特殊的HTML属性）用来向模板添加功能。
 相比之下，React应用不使用模板，它要求开发者借助JSX在JavaScript中创建DOM。
* 对于来自标准Web开发方式的新开发者，模板更容易理解。但是一些资深开发者也喜欢模板，因为模板可以更好的把布局和功能分割开来，还可以使用Pug之类的模板引擎。
 但是使用模板的代价是不得不学习所有的HTML扩展语法，而渲染函数只需要会标准的HTML和JavaScript。而且比起模板，渲染函数更加容易调试和测试。当然你不应该因为这方面的原因错过Vue，因为在Vue2.0中提供了使用模板或者渲染函数的选项。

 9.2.2 期待简单和“能用就行”的东西——选择 Vue

* 一个简单的Vue项目可以不需要转译直接运行在浏览器中，所以使用Vue可以像使用jQuery一样简单。当然这对于React来说在技术上也是可行的，但是典型的React代码是重度依赖于JSX和诸如class之类的ES6特性的。
 Vue的简单在程序设计的时候体现更深，让我们来比较一下两个框架是怎样处理应用数据的（也就是state）。
* React中是通过比较当前state和前一个state来决定何时在DOM中进行重渲染以及渲染的内容，因此需要不可变（immutable）的state。
 Vue中的数据是可变（mutated）的，所以同样的操作看起来更加简洁。
 让我们来看看Vue中是如何进行状态管理的。当向state添加一个新对象的时候，Vue将遍历其中的所有属性并且转换为getter，setter方法，现在Vue的响应系统开始保持对state的跟踪了，当state中的内容发生变化的时候就会自动重新渲染DOM。令人称道的是，Vue中改变state的状态的操作不仅更加简洁，而且它的重新渲染系统也比React 的更快更有效率。
* Vue的响应系统还有有些坑的，例如：它不能检测属性的添加和删除和某些数组更改。这时候就要用到Vue API中的类似于React的set方法来解决。

 9.2.3 期待应用尽可能的小和快——选择Vue

* 当应用程序的状态改变时，React和Vue都将构建一个虚拟DOM并同步到真实DOM中。 两者都有各自的方法优化这个过程。
 Vue核心开发者提供了一个benchmark测试，可以看出Vue的渲染系统比React的更快。测试方法是10000个项目的列表渲染100次，结果如下图。从实用的观点来看，这种benchmark只和边缘情况有关，大部分应用程序中不会经常进行这种操作，所以这不应该被视为一个重要的比较点。但是，页面大小是与所有项目有关的，这方面Vue再次领先，它目前的版本压缩后只有25.6KB。React要实现同样的功能，你需要React DOM（37.4KB）和React with Addon库（11.4KB），共计44.8KB，几乎是Vue的两倍大。双倍的体积并不能带来双倍的功能。

## 10. 服务器端渲染（SSR）

* 客户端渲染路线：1. 请求一个html -> 2. 服务端返回一个html -> 3. 浏览器下载html里面的js/css文件 -> 4. 等待js文件下载完成 -> 5. 等待js加载并初始化完成 -> 6. js代码终于可以运行，由js代码向后端请求数据( ajax/fetch ) -> 7. 等待后端数据返回 -> 8. react-dom( 客户端 )从无到完整地，把数据渲染为响应页面

* 服务端渲染路线：1. 请求一个html -> 2. 服务端请求数据( 内网请求快 ) -> 3. 服务器初始渲染（服务端性能好，较快） -> 4. 服务端返回已经有正确内容的页面 -> 5. 客户端请求js/css文件 -> 6. 等待js文件下载完成 -> 7. 等待js加载并初始化完成 -> 8. react-dom( 客户端 )把剩下一部分渲染完成( 内容小，渲染快 )

 10.1 react

* React的虚拟DOM是其可被用于服务端渲染的关键。首先每个ReactComponent 在虚拟DOM中完成渲染，然后React通过虚拟DOM来更新浏览器DOM中产生变化的那一部分，虚拟DOM作为内存中的DOM表现，为React在Node.js这类非浏览器环境下的吮吸给你提供了可能，React可以从虚拟DoM中生成一个字符串。而不是跟新真正的DOM，这使得我们可以在客户端和服务端使用同一个React Component。

* React 提供了两个可用于服务端渲染组件的函数：React.renderToString 和React.render-ToStaticMarkup。 在设计用于服务端渲染的ReactComponent时需要有预见性，考虑以下方面。

选取最优的渲染函数。
如何支持组件的异步状态。
如何将应用的初始化状态传递到客户端。
哪些生命周期函数可以用于服务端的渲染。
如何为应用提供同构路由支持。
单例、实例以及上下文的用法。

 10.2 vue

**1. 什么是服务器端渲染（SSR）？**

* Vue.js 是构建客户端应用程序的框架。默认情况下，可以在浏览器中输出 Vue 组件，进行生成 DOM 和操作 DOM。然而，也可以将同一个组件渲染为服务器端的 HTML 字符串，将它们直接发送到浏览器，最后将静态标记”混合”为客户端上完全交互的应用程序。

* 服务器渲染的 Vue.js 应用程序也可以被认为是”同构”或”通用”，因为应用程序的大部分代码都可以在服务器和客户端上运行。

**2. 服务器端渲染优势**
. 更好的 SEO，由于搜索引擎爬虫抓取工具可以直接查看完全渲染的页面。
. 更快的内容到达时间(time-to-content)，特别是对于缓慢的网络情况或运行缓慢的设备。无需等待所有的 JavaScript 都完成下载并执行，才显示服务器渲染的标记，所以你的用户将会更快速地看到完整渲染的页面。通常可以产生更好的用户体验，并且对于那些「内容到达时间(time-to-content)与转化率直接相关」的应用程序而言，服务器端渲染(SSR)至关重要。

 1. 把UI图划分出组件层级

 2. 用React创建一个静态版本

* 传入数据模型，渲染 UI 但没有任何交互。最好把这些过程解耦，因为创建一个静态版本更多需要的是码代码，不太需要逻辑思考，而添加交互则更多需要的是逻辑思考，不是码代码。
* 在创建静态版本的时候不要使用 state。
* 你可以自顶向下或者自底向上构建应用。也就是，你可以从层级最高的组件开始构建(即 FilterableProductTable开始)或层级最低的组件开始构建(ProductRow)。在较为简单的例子中，通常自顶向下更容易，而在较大的项目中，自底向上会更容易并且在你构建的时候有利于编写测试。
* React 的单向数据流(也叫作单向绑定)保证了一切是模块化并且是快速的。

 3. 定义 UI 状态的最小(但完整)表示

* 想想实例应用中的数据，让我们来看看每一条，找出哪一个是 state。每个数据只要考虑三个问题：

它是通过 props 从父级传来的吗？如果是，他可能不是 state。
它随着时间推移不变吗？如果是，它可能不是 state。
你能够根据组件中任何其他的 state 或 props 把它计算出来吗？如果是，它不是 state。

 4. 确定你的State应该位于哪里

* 对你应用的每一个 state：

确定每一个需要这个 state 来渲染的组件。
找到一个公共所有者组件(一个在层级上高于所有其他需要这个 state 的组件的组件)
这个公共所有者组件或另一个层级更高的组件应该拥有这个 state。
如果你没有找到可以拥有这个 state 的组件，创建一个仅用来保存状态的组件并把它加入比这个公共所有者组件层级更高的地方。

 5. 添加反向数据流

结

总结一下，我们发现，
. Vue的优势包括：
. 模板和渲染函数的弹性选择
. 简单的语法及项目创建
. 更快的渲染速度和更小的体积
. React的优势包括：
. 更适用于大型应用和更好的可测试性
. 同时适用于Web端和原生App
. 更大的生态圈带来的更多支持和工具
. 而实际上，React和Vue都是非常优秀的框架，它们之间的相似之处多过不同之处，并且它们大部分最棒的功能是相通的：
. 利用**虚拟DOM**实现快速渲染
. 轻量级
. 响应式和组件化
. 服务器端渲染
. 易于集成路由工具，打包工具以及状态管理工具
. 优秀的支持和社区

文章参考来源：

* [vue官方文档关于框架的对比](https://cn.vuejs.org/v2/guide/comparison.html)
* [react中文文档](https://discountry.github.io/react/docs/hello-world.html)
* [vue官方文档](https://cn.vuejs.org/v2/guide/installation.html)

## 84 手写实现 call、apply、bind？

* created_at: 2023-03-11T12:20:22Z
* updated_at: 2023-03-11T12:20:23Z
* labels: JavaScript
* milestone: 高

入 call、apply、bind实现原理

[https://www.jianshu.com/p/6a1bc149b598](https://www.jianshu.com/p/6a1bc149b598)

简单粗暴地来说，call，apply，bind是用于绑定this指向的。

么是call和apply方法

我们单独看看ECMAScript规范对apply的定义，看个大概就行：

通过定义简单说一下call和apply方法，他们就是参数不同，作用基本相同。

1、每个函数都包含两个非继承而来的方法：apply()和call()。
2、他们的用途相同，都是在特定的作用域中调用函数。
3、接收参数方面不同，apply()接收两个参数，一个是函数运行的作用域(this)，另一个是参数数组。
4、call()方法第一个参数与apply()方法相同，但传递给函数的参数必须列举出来。

一个简单的demo:

```javascript
const yanle = {
  name: 'yanle',
  sayHello: function (age) {
    console.log(`hello, i am ${this.name} and ${age} years old`)
  }
}
const lele = {
  name: 'lele'
}
yanle.sayHello(26) // hello, i am yanle and 26 years old

yanle.sayHello.call(lele, 20) // hello, i am lele and 20 years old
yanle.sayHello.apply(lele, [21]) // hello, i am lele and 21 years old
```

结果都相同。从写法上我们就能看出二者之间的异同。
相同之处在于，第一个参数都是要绑定的上下文，后面的参数是要传递给调用该方法的函数的。
不同之处在于，call方法传递给调用函数的参数是逐个列出的，而apply则是要写在数组中。

总结一句话介绍call和apply
call()方法在使用一个指定的this值和若干个指定的参数值的前提下调用某个函数或方法。
apply()方法在使用一个指定的this值和参数值必须是数组类型的前提下调用某个函数或方法

析call和apply的原理

上面代码，我们注意到了两点：
1、call和apply改变了this的指向，指向到lulin
2、sayHello函数执行了

这里默认大家都对this有一个基本的了解，知道什么时候this该指向谁，
我们结合这两句话来分析这个通用函数：f.apply(o),我们直接看一本书对其中原理的解读，
具体什么书，我也不知道，参数我们先不管，先了解其中的大致原理。

知道了这个基本原来我们再来看看刚才jawil.sayHello.call(lulin, 24)执行的过程：

```javascript
// 第一步
lulin.fn = jawil.sayHello
// 第二步
lulin.fn()
// 第三步
delete lulin.fn
```

上面的说的是原理，可能你看的还有点抽象，下面我们用代码模拟实现apply一下。

现aplly方法

 模拟实现第一步

根据这个思路，我们可以尝试着去写第一版的 applyOne 函数：

```javascript
Function.prototype.applyOne = function (context) {
  context.fn = this
  context.fn()
  delete context.fn
}
const yanle = {
  name: 'yanle',
  sayHello: function (age) {
    console.log(`hello, i am ${this.name} and ${age} years old`)
  }
}
const lele = {
  name: 'lele'
}
yanle.sayHello.applyOne(lele) // hello, i am lele and undefined years old
```

正好可以打印lulin而不是之前的jawil了。

 模拟实现第二步

最一开始也讲了，apply函数还能给定参数执行函数。
注意：传入的参数就是一个数组，很简单，我们可以从Arguments对象中取值，
Arguments不知道是何物，赶紧补习，此文也不太适合初学者，第二个参数就是数组对象，
但是执行的时候要把数组数值传递给函数当参数，然后执行，这就需要一点小技巧。

参数问题其实很简单，我们先偷个懒，我们接着要把这个参数数组放到要执行的函数的参数里面去。

```javascript
Function.prototype.applyTwo = function (context) {
  context.fn = this
  const args = arguments[1]
  context.fn(args.join(','))
  delete context.fn
}
```

很简单是不是，那你就错了，数组join方法返回的是啥？
`typeof [1,2,3,4].join(',')//string`
最后是一个 "1,2,3,4" 的字符串，其实就是一个参数，肯定不行啦。

也许有人会想到用ES6的一些奇淫方法，不过apply是ES3的方法，
我们为了模拟实现一个ES3的方法，要用到ES6的方法，反正面试官也没说不准这样。
但是我们这次用eval方法拼成一个函数，类似于这样：
`eval('context.fn(' + args +')')`

先简单了解一下eval函数吧
定义和用法:
eval() 函数可计算某个字符串，并执行其中的的 JavaScript 代码。

语法：`eval(string)`
string必需。要计算的字符串，其中含有要计算的 JavaScript 表达式或要执行的语句。
该方法只接受原始字符串作为参数，如果 string 参数不是原始字符串，那么该方法将不作任何改变地返回。
因此请不要为 eval() 函数传递 String 对象来作为参数。

简单来说吧，就是用JavaScript的解析引擎来解析这一堆字符串里面的内容，这么说吧，你可以这么理解，**你把eval看成是`<script>`标签**。

`eval('function Test(a,b,c,d){console.log(a,b,c,d)};Test(1,2,3,4)')`就是相当于这样：

```html
<script>
function Test(a,b,c,d){
 console.log(a,b,c,d)
};
Test(1,2,3,4)
</script>
```

第二版代码大致如下：

```javascript
Function.prototype.applyTwo = function (context) {
  const args = arguments[1] // 获取传入的数组参数
  context.fn = this // 假想context对象预先不存在名为fn的属性
  let fnStr = 'context.fn('
  for (let i = 0; i < args.length; i++) {
    fnStr += i == args.length - 1 ? args[i] : args[i] + ','
  }
  fnStr += ')'// 得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
  eval(fnStr) // 还是eval强大
  delete context.fn // 执行完毕之后删除这个属性
}
// 测试一下
const jawil = {
  name: 'jawil',
  sayHello: function (age) {
    console.log(this.name, age)
  }
}

const lulin = {
  name: 'lulin'
}

jawil.sayHello.applyTwo(lulin, [24])// lulin 24
```

好像就行了是不是，其实这只是最粗糙的版本，能用，但是不完善，完成了大约百分之六七十了。

 模拟实现第三步

1.this参数可以传null或者不传，当为null的时候，视为指向window

demo1:

```javascript
const name = 'jawil'
function sayHello () {
  console.log(this.name)
}
sayHello.apply(null) // 'jawil'
```

demo2:

```javascript
const name = 'jawil'
function sayHello () {
  console.log(this.name)
}
sayHello.apply() // 'jawil'
```

2.函数是可以有返回值的

```javascript
const obj = {
  name: 'jawil'
}

function sayHello (age) {
  return {
    name: this.name,
    age
  }
}

console.log(sayHello.apply(obj, [24]))// {name: "jawil", age: 24}
```

这些都是小问题，想到了，就很好解决。我们来看看此时的第三版apply模拟方法。

```javascript
// 原生JavaScript封装apply方法，第三版
Function.prototype.applyThree = function (context) {
  var context = context || window
  const args = arguments[1] // 获取传入的数组参数
  context.fn = this // 假想context对象预先不存在名为fn的属性
  if (args == void 0) { // 没有传入参数直接执行
    return context.fn()
  }
  let fnStr = 'context.fn('
  for (let i = 0; i < args.length; i++) {
    // 得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
    fnStr += i == args.length - 1 ? args[i] : args[i] + ','
  }
  fnStr += ')'
  const returnValue = eval(fnStr) // 还是eval强大
  delete context.fn // 执行完毕之后删除这个属性
  return returnValue
}
```

 模拟实现第四步

其实一开始就埋下了一个隐患，我们看看这段代码：

```javascript
Function.prototype.applyThree = function(context) {
 var context = context || window
 var args = arguments[1] //获取传入的数组参数
 context.fn = this //假想context对象预先不存在名为fn的属性
 ......
}
```

就是这句话， `context.fn = this //假想context对象预先不存在名为fn的属性` ,这就是一开始的隐患,
我们只是假设，但是并不能防止contenx对象一开始就没有这个属性，要想做到完美，就要保证这个context.fn中的fn的唯一性。

于是我自然而然的想到了强大的ES6,这玩意还是好用啊，幸好早就了解并一直在使用ES6,还没有学习过ES6的童鞋赶紧学习一下，没有坏处的。

重新复习下新知识：
基本数据类型有6种：Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

ES5对象属性名都是字符串容易造成属性名的冲突。

```javascript
const a = { name: 'jawil' }
a.name = 'lulin'
// 这样就会重写属性
```

ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。
注意，Symbol函数前不能使用new命令，否则会报错。这是因为生成的Symbol是一个原始类型的值，不是对象
Symbol函数可以接受一个字符串作为参数，表示对Symbol实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。

```javascript
// 没有参数的情况
var s1 = Symbol()
var s2 = Symbol()
s1 === s2 // false

// 有参数的情况
var s1 = Symbol('foo')
var s2 = Symbol('foo')
s1 === s2 // false
```

注意：Symbol值不能与其他类型的值进行运算。

作为属性名的Symbol

```javascript
const mySymbol = Symbol()

// 第一种写法
var a = {}
a[mySymbol] = 'Hello!'

// 第二种写法
var a = {
  [mySymbol]: 'Hello!'
}

// 第三种写法
var a = {}
Object.defineProperty(a, mySymbol, { value: 'Hello!' })

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

注意，Symbol值作为对象属性名时，不能用点运算符。

继续看下面这个例子：

```javascript
const a = {}
const name = Symbol()
a.name = 'jawil'
a[name] = 'lulin'
console.log(a.name, a[name]) // jawil,lulin
```

Symbol值作为属性名时，该属性还是公开属性，不是私有属性。
这个有点类似于java中的protected属性
（protected和private的区别：在类的外部都是不可以访问的，在类内的子类可以继承protected不可以继承private）
但是这里的Symbol在类外部也是可以访问的，只是不会出现在for...in、for...of循环中，
也不会被Object.keys()、Object.getOwnPropertyNames()返回。
但有一个 `Object.getOwnPropertySymbols` 方法，可以获取指定对象的所有Symbol属性名。

看看第四版的实现demo，想必大家了解上面知识已经猜得到怎么写了，很简单。
直接加个var fn = Symbol()就行了

```javascript
// 原生JavaScript封装apply方法，第四版
Function.prototype.applyFour = function (context) {
  var context = context || window
  const args = arguments[1] // 获取传入的数组参数
  const fn = Symbol()
  context[fn] = this // 假想context对象预先不存在名为fn的属性
  if (args == void 0) { // 没有传入参数直接执行
    return context[fn]()
  }
  let fnStr = 'context[fn]('
  for (let i = 0; i < args.length; i++) {
    // 得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
    fnStr += i == args.length - 1 ? args[i] : args[i] + ','
  }
  fnStr += ')'
  const returnValue = eval(fnStr) // 还是eval强大
  delete context[fn] // 执行完毕之后删除这个属性
  return returnValue
}
```

 模拟实现第五步

呃呃呃额额，慢着，ES3就出现的方法，你用ES6来实现，你好意思么？
你可能会说，不管黑猫白猫，只要能抓住老鼠的猫就是好猫，面试官直说不准用call和apply方法但是没说不准用ES6语法啊。
反正公说公有理婆说婆有理，这里还是不用Symbol方法实现一下，我们知道，ES6其实都是语法糖，ES6能写的，
咋们ES5都能实现，这就导致了babel这类把ES6语法转化成ES5的代码了。
至于babel把Symbol属性转换成啥代码了，我也没去看，有兴趣的可以看一下稍微研究一下，这里我说一下简单的模拟。
ES5 没有 Sybmol，属性名称只可能是一个字符串，如果我们能做到这个字符串不可预料，
那么就基本达到目标。要达到不可预期，一个随机数基本上就解决了。

```javascript
// 简单模拟Symbol属性
function jawilSymbol (obj) {
  const unique_proper = '00' + Math.random()
  if (obj.hasOwnProperty(unique_proper)) {
    arguments.callee(obj)// 如果obj已经有了这个属性，递归调用，直到没有这个属性
  } else {
    return unique_proper
  }
}
// 原生JavaScript封装apply方法，第五版
Function.prototype.applyFive = function (context) {
  var context = context || window
  const args = arguments[1] // 获取传入的数组参数
  const fn = jawilSymbol(context)
  context[fn] = this // 假想context对象预先不存在名为fn的属性
  if (args == void 0) { // 没有传入参数直接执行
    return context[fn]()
  }
  let fnStr = 'context[fn]('
  for (let i = 0; i < args.length; i++) {
    // 得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
    fnStr += i == args.length - 1 ? args[i] : args[i] + ','
  }
  fnStr += ')'
  const returnValue = eval(fnStr) // 还是eval强大
  delete context[fn] // 执行完毕之后删除这个属性
  return returnValue
}
const obj = {
  name: 'jawil'
}
function sayHello (age) {
  return {
    name: this.name,
    age
  }
}
console.log(sayHello.applyFive(obj, [24]))// 完美输出{name: "jawil", age: 24}
```

现Call方法

这个不需要讲了吧，道理都一样，就是参数一样，这里我给出我实现的一种方式，看不懂，自己写一个去。

```javascript
// 原生JavaScript封装call方法
Function.prototype.callOne = function (context) {
  return this.applyFive(([].shift.applyFive(arguments), arguments))
  // 巧妙地运用上面已经实现的applyFive函数
}
```

看不太明白也不能怪我咯，我就不细讲了，看个demo证明一下，这个写法没问题。

```javascript
Function.prototype.applyFive = function(context) {//刚才写的一大串}
Function.prototype.callOne = function(context) {
 return this.applyFive(([].shift.applyFive(arguments)), arguments)
 //巧妙地运用上面已经实现的applyFive函数
};
//测试一下
var obj = {
 name: 'jawil'
};

function sayHello(age) {
 return {
 name: this.name,
 age: age
 }
}
console.log(sayHello.callOne(obj,24));// 完美输出{name: "jawil", age: 24}
```

现bind方法

什么是bind函数
如果掌握了上面实现apply的方法，我想理解起来模拟实现bind方法也是轻而易举，原理都差不多，我们还是来看看bind方法的定义。
我们还是简单的看下ECMAScript规范对bind方法的定义，暂时看不懂不要紧，获取几个关键信息就行。

bind() 方法会创建一个新函数，当这个新函数被调用时，它的 this 值是传递给 bind() 的第一个参数,
它的参数是 bind() 的其他参数和其原本的参数，
bind返回的绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。
提供的this值被忽略，同时调用时的参数被提供给模拟函数。。

语法是这样样子的： `fun.bind(thisArg[, arg1[, arg2[, ...]]])`

是不是似曾相识，这不是call方法的语法一个样子么，，，但它们是一样的吗？

bind方法传递给调用函数的参数可以逐个列出，也可以写在数组中。
bind方法与call、apply最大的不同就是前者返回一个绑定上下文的函数，
而后两者是直接执行了函数。由于这个原因，上面的代码也可以这样写:

```javascript
jawil.sayHello.bind(lulin)(24) // hello, i am lulin 24 years old
jawil.sayHello.bind(lulin)([24]) // hello, i am lulin 24 years old
```

bind方法还可以这样写 fn.bind(obj, arg1)(arg2).

**用一句话总结bind的用法：**
该方法创建一个新函数，称为绑定函数，绑定函数会以创建它时传入bind方法的第一个参数作为this，
传入bind方法的第二个以及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数。

以前解决这个问题的办法通常是缓存this，例如：

```javascript
function Person (name) {
  this.nickname = name
  this.distractedGreeting = function () {
    const self = this // <-- 注意这一行!
    setTimeout(function () {
      console.log('Hello, my name is ' + self.nickname) // <-- 还有这一行!
    }, 500)
  }
}

const alice = new Person('jawil')
alice.distractedGreeting()
// after 500ms logs "Hello, my name is jawil"
```

但是现在有一个更好的办法！您可以使用bind。上面的例子中被更新为：

```javascript
function Person (name) {
  this.nickname = name
  this.distractedGreeting = function () {
    setTimeout(function () {
      console.log('Hello, my name is ' + this.nickname)
    }.bind(this), 500) // <-- this line!
  }
}

const alice = new Person('jawil')
alice.distractedGreeting()
// after 500ms logs "Hello, my name is jawil"
```

**用法总结：**
bind() 最简单的用法是创建一个函数，使这个函数不论怎么调用都有同样的 this 值。
JavaScript新手经常犯的一个错误是将一个方法从对象中拿出来，然后再调用，希望方法中的 this 是原来的对象。
（比如在回调中传入这个方法。）如果不做特殊处理的话，一般会丢失原来的对象。
从原来的函数和原来的对象创建一个绑定函数，则能很漂亮地解决这个问题：

```javascript
this.x = 9
const module = {
  x: 81,
  getX: function () { return this.x }
}

module.getX() // 81

const getX = module.getX
getX() // 9, 因为在这个例子中，"this"指向全局对象

// 创建一个'this'绑定到module的函数
const boundGetX = getX.bind(module)
boundGetX() // 81
```

备注：
很不幸，Function.prototype.bind 在IE8及以下的版本中不被支持，
所以如果你没有一个备用方案的话，可能在运行时会出现问题。
bind 函数在 ECMA-262 第五版才被加入；它可能无法在所有浏览器上运行。
你可以部份地在脚本开头加入以下代码，就能使它运作，让不支持的浏览器也能使用 bind() 功能。

 初级实现

了解了以上内容，我们来实现一个初级的bind函数Polyfill:

```javascript
Function.prototype.bind = function (context) {
  const me = this
  const argsArray = Array.prototype.slice.callOne(arguments)
  return function () {
    return me.applyFive(context, argsArray.slice(1))
  }
}
```

简单解读：
基本原理是使用apply进行模拟。函数体内的this，就是需要绑定this的实例函数，或者说是原函数。
最后我们使用apply来进行参数（context）绑定，并返回。
同时，将第一个参数（context）以外的其他参数，作为提供给原函数的预设参数，这也是基本的“颗粒化（curring）”基础。

 初级实现的加分项

进行兼容处理，就是锦上添花了。

```javascript
Function.prototype.bind = Function.prototype.bind || function (context) {
 ...
}
```

 颗粒化（curring）实现

对于函数的柯里化不太了解的童鞋，可以先尝试读读这篇文章：[前端基础进阶（八）：深入详解函数的柯里化](https://www.jianshu.com/p/5e1899fe7d6b)。
上述的实现方式中，我们返回的参数列表里包含：atgsArray.slice(1)，他的问题在于存在预置参数功能丢失的现象。
想象我们返回的绑定函数中，如果想实现预设传参（就像bind所实现的那样），就面临尴尬的局面。真正实现颗粒化的“完美方式”是：

```javascript
Function.prototype.bind = Function.prototype.bind || function (context) {
  const me = this
  const args = Array.prototype.slice.callOne(arguments, 1)
  return function () {
    const innerArgs = Array.prototype.slice.callOne(arguments)
    const finalArgs = args.concat(innerArgs)
    return me.applyFive(context, finalArgs)
  }
}
```

 构造函数场景下的兼容

```javascript
Function.prototype.bind = Function.prototype.bind || function (context) {
  const me = this
  const args = Array.prototype.slice.callOne(arguments, 1)
  const F = function () {}
  F.prototype = this.prototype
  const bound = function () {
    const innerArgs = Array.prototype.slice.callOne(arguments)
    const finalArgs = args.concat(innerArgs)
    return me.apply(this instanceof F ? this : context || this, finalArgs)
  }
  bound.prototype = new F()
  return bound
}
```

 更严谨的做法

我们需要调用bind方法的一定要是一个函数，所以可以在函数体内做一个判断：

```javascript
if (typeof this !== 'function') {
  throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
}
```

做到所有这一切，基本算是完成了。其实MDN上有个自己实现的polyfill，就是如此实现的。
另外，《JavaScript Web Application》一书中对bind()的实现，也是如此。

 最终答案

```javascript
// 简单模拟Symbol属性
function jawilSymbol (obj) {
  const unique_proper = '00' + Math.random()
  if (obj.hasOwnProperty(unique_proper)) {
    arguments.callee(obj)// 如果obj已经有了这个属性，递归调用，直到没有这个属性
  } else {
    return unique_proper
  }
}
// 原生JavaScript封装apply方法，第五版
Function.prototype.applyFive = function (context) {
  var context = context || window
  const args = arguments[1] // 获取传入的数组参数
  const fn = jawilSymbol(context)
  context[fn] = this // 假想context对象预先不存在名为fn的属性
  if (args == void 0) { // 没有传入参数直接执行
    return context[fn]()
  }
  let fnStr = 'context[fn]('
  for (let i = 0; i < args.length; i++) {
    // 得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
    fnStr += i == args.length - 1 ? args[i] : args[i] + ','
  }
  fnStr += ')'
  const returnValue = eval(fnStr) // 还是eval强大
  delete context[fn] // 执行完毕之后删除这个属性
  return returnValue
}
// 简单模拟call函数
Function.prototype.callOne = function (context) {
  return this.applyFive(([].shift.applyFive(arguments)), arguments)
  // 巧妙地运用上面已经实现的applyFive函数
}

// 简单模拟bind函数
Function.prototype.bind = Function.prototype.bind || function (context) {
  const me = this
  const args = Array.prototype.slice.callOne(arguments, 1)
  const F = function () {}
  F.prototype = this.prototype
  const bound = function () {
    const innerArgs = Array.prototype.slice.callOne(arguments)
    const finalArgs = args.concat(innerArgs)
    return me.applyFive(this instanceof F ? this : context || this, finalArgs)
  }
  bound.prototype = new F()
  return bound
}
const obj = {
  name: 'jawil'
}

function sayHello (age) {
  return {
    name: this.name,
    age
  }
}

console.log(sayHello.bind(obj, 24)())// 完美输出{name: "jawil", age: 24}
```

## 85 知道 JS 中的尾调用吗，如何做尾调优化？

* created_at: 2023-03-11T12:21:58Z
* updated_at: 2023-03-11T12:21:59Z
* labels: JavaScript
* milestone: 高

入理解 JavaScript 中的尾调用

[es6 javascript 尾调用](https://blog.csdn.net/qq_30100043/article/details/53406001)
[深入理解JavaScript中的尾调用(Tail Call)](https://www.jb51.net/article/104875.htm)

 1、什么是尾调用

尾调用是函数式编程里比较重要的一个概念，尾调用的概念非常简单，
一句话就能说清楚，它的意思是在函数的执行过程中，如果最后一个动作是一个函数的调用，
即这个调用的返回值被当前函数直接返回，则称为尾调用。

```javascript
function f (x) {
  return g(x)
}
```

上面代码中，函数 f 的最后一步是调用函数 g ，这就叫尾调用。**以下三种情况，都不属于尾调用。**

```javascript
// 情况一
function f(x){
 let y = g(x);
 return y;
}
// 情况二
function f(x){
 return g(x) + 1;
}
// 情况三
function f(x){
 g(x);
}
```

上面代码中，情况一是调用函数 g 之后，还有赋值操作，所以不属于尾调用，即使语义完全一样。情况二也属于调用后还有操作，即使写在一行内。情况三等同于下面的代码。

```javascript
function f (x) {
  g(x)
  return undefined
}
```

尾调用不一定出现在函数尾部，只要是最后一步操作即可。

```javascript
function f (x) {
  if (x > 0) {
    return m(x)
  }
  return n(x)
}
```

上面代码中，函数 m 和 n 都属于尾调用，因为它们都是函数 f 的最后一步操作。

 2、尾调用优化

尾调用之所以与其他调用不同，就在于它的特殊的调用位置。

我们知道，函数调用会在内存形成一个 “ 调用记录 ” ，又称 “ 调用帧 ” （ call frame ），保存调用位置和内部变量等信息。
如果在函数 A 的内部调用函数 B ，那么在 A 的调用帧上方，还会形成一个 B 的调用帧。
等到 B 运行结束，将结果返回到 A ， B 的调用帧才会消失。
如果函数 B 内部还调用函数 C ，那就还有一个 C 的调用帧，以此类推。
所有的调用帧，就形成一个 “ 调用栈 ” （ call stack ）。

尾调用由于是函数的最后一步操作，所以不需要保留外层函数的调用帧，
因为调用位置、内部变量等信息都不会再用到了，只要直接用内层函数的调用帧，取代外层函数的调用帧就可以了。

```javascript
function f() {
 let m = 1;
 let n = 2;
 return g(m + n);
}
f();
// 等同于
function f() {
 return g(3);
}
f();
// 等同于
g(3);
```

上面代码中，如果函数 g 不是尾调用，函数 f 就需要保存内部变量 m 和 n 的值、 g 的调用位置等信息。
但由于调用 g 之后，函数 f 就结束了，所以执行到最后一步，完全可以删除 f(x) 的调用帧，只保留 g(3) 的调用帧。

这就叫做 “ 尾调用优化 ” （ Tail call optimization ），即只保留内层函数的调用帧。
如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是 “ 尾调用优化 ” 的意义。

注意，只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行 “ 尾调用优化 ” 。

```javascript
function addOne (a) {
  const one = 1
  function inner (b) {
    return b + one
  }
  return inner(a)
}
```

上面的函数不会进行尾调用优化，因为内层函数inner用到了外层函数addOne的内部变量one。

 3、尾递归

函数调用自身，称为递归。如果尾调用自身，就称为尾递归。
递归非常耗费内存，因为需要同时保存成千上百个调用帧，很容易发生 “ 栈溢出 ” 错误（ stack overflow ）。
但对于尾递归来说，由于只存在一个调用帧，所以永远不会发生 “ 栈溢出 ” 错误。

```javascript
function factorial (n) {
  if (n === 1) return 1
  return nfactorial(n - 1)
}
factorial(5) // 120
```

上面代码是一个阶乘函数，计算 n 的阶乘，最多需要保存 n 个调用记录，复杂度 O(n) 。

如果改写成尾递归，只保留一个调用记录，复杂度 O(1) 。

```javascript
function factorial (n, total) {
  if (n === 1) return total
  return factorial(n - 1, ntotal)
}
factorial(5, 1) // 120
```

还有一个比较著名的例子，就是计算 fibonacci（斐波那契） 数列，也能充分说明尾递归优化的重要性
如果是非尾递归的 fibonacci 递归方法

```javascript
function Fibonacci (n) {
  if (n <= 1) { return 1 }
  return Fibonacci(n - 1) + Fibonacci(n - 2)
}
Fibonacci(10) // 89
// Fibonacci(100)
// Fibonacci(500)
// 堆栈溢出了
```

如果我们使用尾递归优化过的 fibonacci 递归算法

```javascript
function Fibonacci2 (n, ac1 = 1, ac2 = 1) {
  if (n <= 1) { return ac2 }
  return Fibonacci2(n - 1, ac2, ac1 + ac2)
}
Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity
```

由此可见， “ 尾调用优化 ” 对递归操作意义重大，所以一些函数式编程语言将其写入了语言规格。
ES6 也是如此，第一次明确规定，所有 ECMAScript 的实现，都必须部署 “ 尾调用优化 ” 。这就是说，在 ES6 中，只要使用尾递归，就不会发生栈溢出，相对节省内存。

 4、递归函数的改写

尾递归的实现，往往需要改写递归函数，确保最后一步只调用自身。做到这一点的方法，就是把所有用到的内部变量改写成函数的参数。
比如上面的例子，阶乘函数 factorial 需要用到一个中间变量 total ，那就把这个中间变量改写成函数的参数。
这样做的缺点就是不太直观，第一眼很难看出来，为什么计算 5 的阶乘，需要传入两个参数 5 和 1 ？

两个方法可以解决这个问题。
**方法一是在尾递归函数之外，再提供一个正常形式的函数。**

```javascript
function tailFactorial (n, total) {
  if (n === 1) return total
  return tailFactorial(n - 1, ntotal)
}
function factorial (n) {
  return tailFactorial(n, 1)
}
factorial(5) // 120
```

上面代码通过一个正常形式的阶乘函数 factorial ，调用尾递归函数 tailFactorial ，看起来就正常多了。

函数式编程有一个概念，**叫做柯里化（ currying ）**，意思是将多参数的函数转换成单参数的形式。这里也可以使用柯里化。

```javascript
function currying (fn, n) {
  return function (m) {
    return fn.call(this, m, n)
  }
}
function tailFactorial (n, total) {
  if (n === 1) return total
  return tailFactorial(n - 1, ntotal)
}
const factorial = currying(tailFactorial, 1)
factorial(5) // 120
```

上面代码通过柯里化，将尾递归函数 tailFactorial 变为只接受 1 个参数的 factorial 。

**第二种方法就简单多了，就是采用 ES6 的函数默认值。**

```javascript
function factorial (n, total = 1) {
  if (n === 1) return total
  return factorial(n - 1, ntotal)
}
factorial(5) // 120
```

上面代码中，参数 total 有默认值 1 ，所以调用时不用提供这个值。

总结一下，递归本质上是一种循环操作。纯粹的函数式编程语言没有循环操作命令，所有的循环都用递归实现，这就是为什么尾递归对这些语言极其重要。
对于其他支持 “ 尾调用优化 ” 的语言（比如 Lua ， ES6 ），只需要知道循环可以用递归代替，而一旦使用递归，就最好使用尾递归。

 5、严格模式

ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。
这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。
func.arguments：返回调用时函数的参数。
func.caller：返回调用当前函数的那个函数。
尾调用优化发生时，函数的调用栈会改写，因此上面两个变量就会失真。严格模式禁用这两个变量，所以尾调用模式仅在严格模式下生效。

```javascript
function restricted () {
  'use strict'
  restricted.caller // 报错
  restricted.arguments // 报错
}
restricted()
```

 6、尾递归优化的实现

尾递归优化只在严格模式下生效，那么正常模式下，或者那些不支持该功能的环境中，有没有办法也使用尾递归优化呢？回答是可以的，就是自己实现尾递归优化。
它的原理非常简单。尾递归之所以需要优化，原因是调用栈太多，造成溢出，那么只要减少调用栈，就不会溢出。
怎么做可以减少调用栈呢？就是采用 “ 循环 ” 换掉 “ 递归 ” 。

下面是一个正常的递归函数。

```javascript
function sum (x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  } else {
    return x
  }
}
sum(1, 100000)
// Uncaught RangeError: Maximum call stack size exceeded(…)
```

上面代码中，sum是一个递归函数，参数x是需要累加的值，参数y控制递归次数。
一旦指定sum递归 100000 次，就会报错，提示超出调用栈的最大次数。
**蹦床函数(trampoline)** 可以将递归执行转为循环执行。

```javascript
function trampoline (f) {
  while (f && f instanceof Function) {
    f = f()
  }
  return f
}
```

上面就是蹦床函数的一个实现，它接受一个函数f作为参数。只要f执行后返回一个函数，就继续执行。
注意，这里是返回一个函数，然后执行该函数，而不是函数里面调用函数，这样就避免了递归执行，从而就消除了调用栈过大的问题。

然后，要做的就是将原来的递归函数，改写为每一步返回另一个函数。

```javascript
function sum (x, y) {
  if (y > 0) {
    return sum.bind(null, x + 1, y - 1)
  } else {
    return x
  }
}
```

上面代码中，sum函数的每次执行，都会返回自身的另一个版本。
现在，使用蹦床函数执行sum，就不会发生调用栈溢出。

```javascript
trampoline(sum(1, 100000))
// 100001
// 蹦床函数并不是真正的尾递归优化，下面的实现才是。
function tco (f) {
  let value
  let active = false
  const accumulated = []
  return function accumulator () {
    accumulated.push(arguments)
    if (!active) {
      active = true
      while (accumulated.length) {
        value = f.apply(this, accumulated.shift())
      }
      active = false
      return value
    }
  }
}
var sum = tco(function (x, y) {
  if (y > 0) {
    return sum(x + 1, y - 1)
  } else {
    return x
  }
})
sum(1, 100000)
// 100001
```

上面代码中，tco函数是尾递归优化的实现，它的奥妙就在于状态变量active。
默认情况下，这个变量是不激活的。一旦进入尾递归优化的过程，这个变量就激活了。
然后，每一轮递归sum返回的都是undefined，所以就避免了递归执行；
而accumulated数组存放每一轮sum执行的参数，总是有值的，这就保证了accumulator函数内部的while循环总是会执行。
这样就很巧妙地将 “ 递归 ” 改成了 “ 循环 ” ，而后一轮的参数会取代前一轮的参数，保证了调用栈只有一层。

## 86 V8 引擎了解多少？

* created_at: 2023-03-11T12:24:46Z
* updated_at: 2023-03-11T12:25:08Z
* labels: Nodejs, 网络
* milestone: 资深

目录

* [渲染引擎与网页渲染](#渲染引擎与网页渲染)
* [编程分类](#编程分类)
* [渲染引擎](#渲染引擎)
* [网页渲染流程简析](#网页渲染流程简析)
* [JavaScript引擎](#JavaScript引擎)
* [V8引擎](#V8引擎)
* [数据解析](#数据解析)
* [V8引擎渲染过程](#V8引擎渲染过程)
* [JavaScript代码编译过程](#JavaScript代码编译过程)
* [优化回滚](#优化回滚)
* [内存管理](#内存管理)
* [垃圾回收](#垃圾回收)
* [快照](#快照)
* [V8 VS JavaScriptCore](#v8-vs-javascriptcore)
* [功能扩展](#功能扩展)
* [绑定](#绑定)
* [Extension](#extension)
* [总结](#总结)

染引擎与网页渲染

 编程分类

编程语言分为 **编译型语言和解释型语** 言两类。
编译型语言在执行之前要先进行完全编译，而 **解释型语言一边编译一边执行**，
很明显解释型语言的执行速度是慢于编译型语言的，而JavaScript就是一种解释型脚本语言，
支持动态类型、弱类型、基于原型的语言，内置支持类型。

 渲染引擎

就是将HTML/CSS/JavaScript等文本或图片等信息转换成浏览器上可见的可视化图像结果的转换程序。
WebKit，一个由苹果发起的一个开源项目，如今它在移动端占据着垄断地位，更有基于WebKit的web操作系统不断涌现(如：Chrome OS、Web OS)。

WebKit内部结构大体如下
![01](https://user-images.githubusercontent.com/22188674/224484181-6bb95a67-aae8-46bb-a3ce-7565bf891ed0.png)

上图中实线框内模块是所有移植的共有部分，虚线框内不同的厂商可以自己实现。由上图可知，WebKit主要有操作系统、WebCore 、WebKit嵌入式接口和第三方库组成。

**操作系统**: 是管理和控制计算机硬件与软件资源的计算机程序。
**WebCore**: JavaScriptCore是WebKit的默认引擎，在谷歌系列产品中被替换为V8引擎。
**WebKit嵌入式接口**: 该接口主要供浏览器调用，与移植密切相关，不同的移植有不同的接口规范。
**第三方库**: 主要是诸如图形库、网络库、视频库、数据存储库等第三方库。

 网页渲染流程简析

首先，系统将网页输入到HTML解析器，HTML解析器解析，然后构建DOM树，在这期间如果遇到JavaScript代码则交给JavaScript引擎处理；
如果遇到CSS样式信息，则构建一个内部绘图模型。该模型由布局模块计算模型内部各个元素的位置和大小信息，最后由绘图模块完成从该模型到图像的绘制。

对于网页的绘制过程，大体可以分为3个阶段：

**1、从输入URL到生成DOM树**
在这个阶段中，主要会经历一下几个步骤：
地址栏输入URL，WebKit调用资源加载器加载相应资源；
加载器依赖网络模块建立连接，发送请求并接收答复；
WebKit接收各种网页或者资源数据，其中某些资源可能同步或异步获取；
网页交给HTML解析器转变为词语；
解释器根据词语构建节点，形成DOM树；
如果节点是JavaScript代码，调用JavaScript引擎解释并执行；
JavaScript代码可能会修改DOM树结构；
如果节点依赖其他资源，如图片、视频等，调用资源加载器加载它们，但这些是异步加载的，不会阻碍当前DOM树继续创建；如果是JavaScript资源URL（没有标记异步方式），则需要停止当前DOM树创建，直到JavaScript加载并被JavaScript引擎执行后才继续DOM树的创建。

**2、从DOM树到构建WebKit绘图上下文**
CSS文件被CSS解释器解释成内部表示；
CSS解释器完成工作后，在DOM树上附加样式信息，生成RenderObject树；
RenderObject节点在创建的同时，WebKit会根据网页层次结构构建RenderLayer树，同时构建一个虚拟绘图上下文。

**3、绘图上下文内容并呈现图像内容**
绘图上下文是一个与平台无关的抽象类，它将每个绘图操作桥接到不同的具体实现类，也就是绘图具体实现类；
绘图实现类也可能有简单的实现，也可能有复杂的实现，软件渲染、硬件渲染、合成渲染等；
绘图实现类将2D图形库或者3D图形库绘制结果保存，交给浏览器界面进行展示。

* `books/专题知识库/05、基础知识点专题/02_01、进阶知识部分1-10.md#no01-%E6%B8%B2%%9F%93%E6%9C%BA%E5%88%B6`

avaScript引擎

JavaScript这种解释性语言来讲，如何提高解析速度就是当务之急。JavaScript引擎和渲染引擎的关系如下图所示
![02](https://user-images.githubusercontent.com/22188674/224484189-606623ef-308f-4b4e-a931-49cccf2f7b9a.png)

为了提高性能，JavaScript引入了Java虚拟机和C++编译器中的众多技术。
而一个完整JavaScript引擎的执行过程大致流程如下：**源代码-→抽象语法树-→字节码-→JIT-→本地代码**。一个典型的抽象语法树如下图所示：

题外话 关于 JIT:
JIT 编译 (JIT compilation)，运行时需要代码时。
JIT具体的做法是这样的:当载入一个类型时,CLR为该类型创建一个内部数据结构和相应的函数,当函数第一被调用时,JIT将该函数编译成机器语言.当再次遇到该函数时则直接从cache中执行已编译好的机器语言.

为了节约将抽象语法树通过JIT技术转换成本地代码的时间，V8放弃了生成字节码阶段的性能优化。而通过Profiler采集一些信息，来优化本地代码。
在2017年4月底，v8 发布了5.9 版本，在此版本中新增了一个 Ignition 字节码解释器，并默认开启。
做出这一改变的原因为：（主要动机）减轻机器码占用的内存空间，即牺牲时间换空间；
提高代码的启动速度；对 v8 的代码进行重构，降低 v8 的代码复杂度（[详细介绍请查阅：JS 引擎与字节码的不解之缘](https://cnodejs.org/topic/59084a9cbbaf2f3f569be482)）

8引擎

前面，我们介绍了V8引擎的一些历史，下面我们重点来看看V8项目一些知识。首先，V8项目的结构如下：
![03](https://user-images.githubusercontent.com/22188674/224484198-70bd0c01-6b45-43ba-acb5-69453aa11b80.png)

 数据解析

JavaScript作为一种无类型的语言，在编译时并不能准确知道变量的类型，只可以在运行时确定。因而JavaScript运行效率比C++或Java低。
而对于JavaScript 来说，并不能像C++那样在执行时已经知道变量的类型和地址，所以在代码解析过程中，会产生很多的临时变量，而变量的存取是非常普遍和频繁的。
在JavaScript中，除boolean，number，string，null，undefined这个五个简单变量外，其他的数据都是对象，V8使用一种特殊的方式来表示它们，进而优化JavaScript的内部表示问题。

JavaScript对象在V8中的实现包含三个部分：隐藏类指针，这是v8为JavaScript对象创建的隐藏类；属性值表指针，指向该对象包含的属性值；元素表指针，指向该对象包含的属性。

在V8中，数据的内部表示由数据的实际内容和数据的句柄构成。数据的实际内容是变长的，类型也是不同的；句柄固定大小，包含指向数据的指针。
这种设计可以方便V8进行垃圾回收和移动数据内容，如果直接使用指针的话就会出问题或者需要更大的开销，
使用句柄的话，只需修改句柄中的指针即可，使用者使用的还是句柄，指针改动是对使用者透明的。

除少数数据(如整型数据)由handle本身存储外，其他内容限于句柄大小和变长等原因，都存储在堆中。
整数直接从value中取值，然后使用一个指针指向它，可以减少内存的占用并提高访问速度。
一个句柄对象的大小是4字节(32位设备)或者8字节(64位设备)，而在JavaScriptCore中，使用的8个字节表示句柄。
在堆中存放的对象都是4字节对齐的，所以它们指针的后两位是不需要的，V8用这两位表示数据的类型，00为整数，01为其他。

 V8引擎渲染过程

V8引擎在执行JavaScript的过程中，主要有两个阶段：编译和运行。
在V8引擎中，源代码先被解析器转变为抽象语法树(AST)，然后使用JIT编译器的全代码生成器从AST直接生成本地可执行代码。
但由于缺少了转换为字节码这一中间过程，也就减少了优化代码的机会。

V8引擎编译本地代码时使用的主要类如下所示：
**Script**：表示JavaScript代码，即包含源代码，又包含编译之后生成的本地代码，即是编译入口，又是运行入口；
**Compiler**：编译器类，辅组Script类来编译生成代码，调用解释器(Parser)来生成AST和全代码生成器，将AST转变为本地代码；
**AstNode**：抽象语法树节点类，是其他所有节点的基类，包含非常多的子类，后面会针对不同的子类生成不同的本地代码；
**FullCodeGenerator**：AstVisitor类的子类，通过遍历AST来为JavaScript生成本地可执行代码。

 JavaScript代码编译过程

Script类调用Compiler类的Compile函数为其生成本地代码；
Compile函数先使用Parser类生成AST，再使用FullCodeGenerator类来生成本地代码；
本地代码与具体的硬件平台密切相关，FullCodeGenerator使用多个后端来生成与平台相匹配的本地汇编代码。

大体的流程图如下所示：
![04](https://user-images.githubusercontent.com/22188674/224484204-a4d766cc-3179-4d40-bb8a-9bd8e574886e.png)

在执行编译之前，V8会构建众多全局对象并加载一些内置的库（如math库），来构建一个运行环境。
但是，在JavaScript源代码中，并非所有的函数都被编译生成本地代码，而是采用在调用时才会编译的逻辑来动态编译。

由于V8缺少了生成中间字节码这一环节，为了提升性能，V8会在生成本地代码后，使用数据分析器(profiler)采集一些信息，
然后根据这些数据将本地代码进行优化，生成更高效的本地代码，这是一个逐步改进的过程。
当发现优化后代码的性能还不如未优化的代码，V8将退回原来的代码，也就是优化回滚。

在这一阶段涉及的类主要有：
Script：表示JavaScript代码，即包含源代码，又包含编译之后生成的本地代码，即是编译入口，又是运行入口；
Execution：运行代码的辅组类，包含一些重要函数，如Call函数，它辅组进入和执行Script代码；
JSFunction：需要执行的JavaScript函数表示类；
Runtime：运行这些本地代码的辅组类，主要提供运行时所需的辅组函数，如：属性访问、类型转换、编译、算术、位操作、比较、正则表达式等；
Heap：运行本地代码需要使用的内存堆类；
MarkCompactCollector：垃圾回收机制的主要实现类，用来标记、清除和整理等基本的垃圾回收过程；
SweeperThread：负责垃圾回收的线程。

在V8中，函数是一个基本单位，当某个JavaScript函数被调用时，V8会查找该函数是否已经生成本地代码，如果已经生成，则直接调用该函数。
否则，V8引擎会生成属于该函数的本地代码。
这样，对于那些不用的代码就可以减少执行时间。再次借助Runtime类中的辅组函数，将不用的空间进行标记清除和垃圾回收。

 优化回滚

因为V8是基于AST直接生成本地代码，没有经过中间表示层的优化，所以本地代码尚未经过很好的优化。
于是，在2010年，V8引入了新的编译器-Crankshaft，它主要针对热点函数进行优化，
基于JavaScript源代码开始分析而非本地代码，同时构建Hydroger图并基于此来进行优化分析。

Crankshaft编译器为了性能考虑，通常会做出比较乐观和大胆的预测—代码稳定且变量类型不变，所以可以生成高效的本地代码。
但是，鉴于JavaScript的一个弱类型的语言，变量类型也可能在执行的过程中进行改变，鉴于这种情况，V8会将该编译器做的想当然的优化进行回滚，称为优化回滚。

例如，下面的示例：

```javascript
let counter = 0
function test (x, y) {
  counter++
  if (counter < 1000000) {
    // do something
    return 'jeri'
  }
  const unknown = new Date()
  console.log(unknown)
}
```

该函数被调用多次之后，V8引擎可能会触发Crankshaft编译器对其进行优化，而优化代码认为示例代码的类型信息都已经被确定。
当程序执行到new Date()这个地方，并未获取unknown这个变量的类型，V8只得将该部分代码进行回滚。

优化回滚是一个很耗时的操作，在写代码过程中，尽量不要触发优化该操作。在最近发布的 V8 5.9 版本中，新增了一个 Ignition 字节码解释器，
TurboFan 和 Ignition 结合起来共同完成JavaScript的编译。
这个版本中消除 Cranshaft 这个旧的编译器，并让新的 Turbofan 直接从字节码来优化代码，
并当需要进行反优化的时候直接反优化到字节码，而不需要再考虑 JS 源代码。

 内存管理

Node中通过JavaScript使用内存时就会发现只能使用部分内存（64位系统下约为1.4 GB，32位系统下约为0.7 GB），
其深层原因是 V8 垃圾回收机制的限制所致（如果可使用内存太大，V8在进行垃圾回收时需耗费更多的资源和时间，严重影响JS的执行效率）。下面对内存管理进行介绍。

内存的管理组要由分配和回收两个部分构成。V8的内存划分如下：
**Zone**：管理小块内存。其先自己申请一块内存，然后管理和分配一些小内存，当一块小内存被分配之后，不能被Zone回收，
只能一次性回收Zone分配的所有小内存。当一个过程需要很多内存，Zone将需要分配大量的内存，却又不能及时回收，会导致内存不足情况。
**堆**：管理JavaScript使用的数据、生成的代码、哈希表等。为方便实现垃圾回收，堆被分为三个部分(这和Java等的堆不一样)：
 **年轻分代**：为新创建的对象分配内存空间，经常需要进行垃圾回收。
 为方便年轻分代中的内容回收，可再将年轻分代分为两半，一半用来分配，另一半在回收时负责将之前还需要保留的对象复制过来。
 **年老分代**：根据需要将年老的对象、指针、代码等数据保存起来，较少地进行垃圾回收。
 **大对象**：为那些需要使用较多内存对象分配内存，当然同样可能包含数据和代码等分配的内存，一个页面只分配一个对象。

用一张图可以表示如下：
![05](https://user-images.githubusercontent.com/22188674/224484225-4b86d1f8-1b8f-4eda-8cbf-9b7dec04556b.png)

 垃圾回收

V8 使用了分代和大数据的内存分配，在回收内存时使用精简整理的算法标记未引用的对象，然后消除没有标记的对象，最后整理和压缩那些还未保存的对象，即可完成垃圾回收。
在V8中，使用较多的是年轻分代和年老分代。年轻分代中的对象垃圾回收主要通过 **Scavenge** 算法进行垃圾回收。在Scavenge的具体实现中，主要采用了 **Cheney** 算法。

Cheney算法：通过复制的方式实现的垃圾回收算法。
它将堆内存分为两个 semispace（半空间），一个处于使用中（From空间），另一个处于闲置状态（To空间）。
当分配对象时，先是在From空间中进行分配。
当开始进行垃圾回收时，会检查From空间中的存活对象，这些存活对象将被复制到To空间中，而非存活对象占用的空间将会被释放。
完成复制后，From空间和To空间的角色发生对换。在垃圾回收的过程中，就是通过将存活对象在两个 semispace 空间之间进行复制。

年轻分代中的对象有机会晋升为年老分代，条件主要有两个：一个是对象是否经历过Scavenge回收，一个是To空间的内存占用比超过限制。

对于年老分代中的对象，由于存活对象占较大比重，再采用上面的方式会有两个问题：
一个是存活对象较多，复制存活对象的效率将会很低；另一个问题依然是浪费一半空间的问题。
为此，V8在年老分代中主要采用了**Mark-Sweep（标记清除）标记清除和Mark-Compact（标记整理）** 相结合的方式进行垃圾回收。

 快照

在V8引擎启动时，需要构建JavaScript运行环境，需要加载很多内置对象，
同时也需要建立内置的函数，如Array，String，Math等。为了使V8更加整洁，
加载对象和建立函数等任务都是使用JavaScript文件来实现的，V8引擎负责提供机制来支持，就是在编译和执行JavaScript前先加载这些文件。

V8引擎需要编译和执行这些内置的JavaScript代码，同时使用堆等来保存执行过程中创建的对象、代码等，这些都需要时间。
为此，V8引入了快照机制，将这些内置的对象和函数加载之后的内存保存并序列化。经过快照机制的启动时间可以缩减几毫秒。

8 VS JavaScriptCore

JavaScriptCore引擎是WebKit中默认的JavaScript引擎，也是苹果开源的一个项目，应用较为广泛。
最初，性能不是很好，从2008年开始了一系列的优化，重新实现了编译器和字节码解释器，使得引擎的性能有较大的提升。
随后内嵌缓存、基于正则表达式的JIT、简单的JIT及字节码解释器等技术引入进来，JavaScriptCore引擎也在不断的迭代和发展。

JavaScriptCore 的大致流程为：源代码-→抽象语法树-→字节码-→JIT-→本地代码。
JavaScriptCore与V8有一些不同之处，其中最大的不同就是新增了字节码的中间表示，
并加入了多层JIT编译器（如：简单JIT编译器、DFG JIT编译器、LLVM等）优化性能，不停的对本地代码进行优化(在V8 的 5.9 版本中，新增了一个 Ignition 字节码解释器)。

能扩展

JavaScript引擎的主要功能是解析和执行JavaScript代码，往往不能满足使用者多样化的需要，
那么就可以增加扩展以提升它的能力。V8引擎有两种扩展机制：绑定和扩展。

 绑定

使用IDL文件或接口文件生成绑定文件，将这些文件同V8引擎一起编译。
WebKit中使用IDL来定义JavaScript，但又与IDL有所不同，有一些改变。定义一个新的接口的步骤大致如下：
1.定义新的接口文件，可以在JavaScript代码进行调用，如mymodule.MyObj.myAttr：

```javascript
module mymodule {
 interface [
 InterfaceName = MyObject
 ] MyObj { 
 readonly attribute long myAttr;
 DOMString myMethod (DOMString myArg);
 };
}
```

2.按照引擎定义的标准接口为基础实现接口类，生成JavaScript引擎所需的绑定文件。
WebKit提供了工具帮助生成所需的绑定类，根据引擎不同和引擎开发语言的不同而有所差异。
V8引擎会为上述示例代码生成 v8MyObj.h (MyObj类具体的实现代码)和 V8MyObj.cpp (桥接代码，辅组注册桥接的函数到V8引擎)两个绑定文件。

JavaScript引擎绑定机制需要将扩展代码和JavaScript引擎一块编译和打包，
不能根据需要在引擎启动后再动态注入这些本地代码。
在实际WEB开发中，开发者都是基于现有浏览器的，根本不可能介入到JavaScript引擎的编译中，
绑定机制有很大的局限性，但其非常高效，适用于对性能要求较高的场景。

 Extension

通过V8的基类Extension进行能力扩展，无需和V8引擎一起编译，可以动态为引擎增加功能特性，具有很强的灵活性。
Extension机制的大致思路就是，V8提供一个基类Extension和一个全局注册函数，要想扩展JavaScript能力，需要经过以下步骤：

```c++
class MYExtension : public v8::Extension {
 public:
 MYExtension() : v8::Extension("v8/My", "native function my();") {}
 virtual v8::Handle<v8::FunctionTemplate> GetNativeFunction (
 v8::Handle<v8::String> name) {
 // 可以根据name来返回不同的函数
 return v8::FunctionTemplate::New(MYExtention::MY);
 }
 static v8::Handle<v8::Value> MY(const v8::Arguments& args) {
 // Do sth here
 return v8::Undefined();
 }
};
MYExtension extension;
RegisterExtension(&extension);
```

1.基于Extension基类构建一个它的子类，并实现它的虚函数—GetNativeFunction，根据参数name来决定返回实函数；
2.创建一个该子类的对象，并通过注册函数将该对象注册到V8引擎，当JavaScript调用’my’函数时就可被调用到。
Extension机制是调用V8的接口注入新函数，动态扩展非常方便，但没有绑定机制高效，适用于对性能要求不高的场景。

结

作为一个提高JavaScript渲染的高效引擎，学习V8引擎应该重点掌握以下几个概念：

* 类型。
 对于函数，JavaScript是一种动态类型语言，JavaScriptCore和V8都使用隐藏类和内嵌缓存来提高性能，
 为了保证缓存命中率，一个函数应该使用较少的数据类型；
 对于数组，应尽量存放相同类型的数据，这样就可以通过偏移位置来访问。
* 数据表示。
 简单类型数据（如整型）直接保存在句柄中，可以减少寻址时间和内存占用，
 如果可以使用整数表示的，尽量不要用浮点类型。
* 内存。
 虽然JavaScript语言会自己进行垃圾回收，但我们也应尽量做到及时回收不用的内存，
 对不再使用的对象设置为null或使用delete方法来删除(使用delete方法删除会触发隐藏类新建，需要更多的额外操作)。
* 优化回滚。
 在执行多次之后，不要出现修改对象类型的语句，尽量不要触发优化回滚，否则会大幅度降低代码的性能。
* 新机制。
 使用JavaScript引擎或者渲染引擎提供的新机制和新接口提高性能。

参考文章如下：
[Google V8 引擎【翻】](https://blog.csdn.net/xiangzhihong8/article/details/74996757)

## 87 如何进行 node 内存优化？

* created_at: 2023-03-11T12:26:19Z
* updated_at: 2023-03-11T12:26:58Z
* labels: Nodejs
* milestone: 资深

目录

* [V8 内存生命周期](#V8内存生命周期)
* [垃圾回收器](#垃圾回收器)
* [JavaScript的垃圾回收器](#JavaScript的垃圾回收器)
* [内存管理问题](#内存管理问题)
* [Chrome的内存限制](#Chrome的内存限制)
* [存在限制](#存在限制)
* [为何限制](#为何限制)
* [Chrome-V8的堆构成](#ChromeV8的堆构成)
* [ChromeV8的垃圾回收机制](#ChromeV8的垃圾回收机制)
* [如何判断回收内容](#如何判断回收内容)
* [如何识别指针和数据](#如何识别指针和数据)
* [V8的回收策略](#V8的回收策略)
* [V8的分代内存](#V8的分代内存)
* [新生代](#新生代)
* [新生代的特点](#新生代的特点)
* [新生代的垃圾回收算法](#新生代的垃圾回收算法)
* [写屏障](#写屏障)
* [对象的晋升](#对象的晋升)
* [老生代](#老生代)
* [老生代的特点](#老生代的特点)
* [老生代的垃圾回收算法](#老生代的垃圾回收算法)
* [算法思路](#算法思路)
* [结合使用标记清除和标记整理](#结合使用标记清除和标记整理)

`/books/专题知识库/05、基础知识点专题/other/14、V8引擎初步介绍/README.md`

8内存生命周期

假设代码中有一个对象 jerry ，这个对象从创建到被销毁，刚好走完了整个生命周期，通常会是这样一个过程：
1、这个对象被分配到了 new space；
2、随着程序的运行，new space 塞满了，gc 开始清理 new space 里的死对象，jerry 因为还处于活跃状态，所以没被清理出去；
3、gc 清理了两遍 new space，发现 jerry 依然还活跃着，就把 jerry 移动到了 old space；
4、随着程序的运行，old space 也塞满了，gc 开始清理 old space，这时候发现 jerry 已经没有被引用了，就把 jerry 给清理出去了。

说明：
第二步里，清理 new space 的过程叫做 **Scavenge**，这个过程采用了空间换时间的做法，
用到了上面图中的 **inactive new space**，过程如下：
当活跃区满了之后，交换活跃区和非活跃区，交换后活跃区变空了；
将非活跃区的两次清理都没清理出去的对象移动到 old space；
将还没清理够两次的但是活跃状态的对象移动到活跃区。

第四步里，清理 old space 的过程叫做 **Mark-sweep** ，这块占用内存很大，所以没有使用 Scavenge，
这个回收过程包含了若干次标记过程和清理过程：
标记从根（root）可达的对象为黑色；
遍历黑色对象的邻接对象，直到所有对象都标记为黑色；
循环标记若干次；
清理掉非黑色的对象。

简单来说，**Mark-sweep 就是把从根节点无法获取到的对象清理掉了。**

圾回收器

 JavaScript的垃圾回收器

JavaScript使用垃圾回收机制来自动管理内存。
垃圾回收是一把双刃剑，其好处是可以大幅简化程序的内存管理代码，降低程序员的负担，减少因 长时间运转而带来的内存泄露问题。
但使用了垃圾回收即意味着程序员将无法掌控内存。
ECMAScript没有暴露任何垃圾回收器的接口。我们无法强迫其进 行垃圾回收，更无法干预内存管理

 内存管理问题

在浏览器中，Chrome V8引擎实例的生命周期不会很长（谁没事一个页面开着几天几个月不关），而且运行在用户的机器上。
如果不幸发生内存泄露等问题，仅仅会 影响到一个终端用户。
且无论这个V8实例占用了多少内存，最终在关闭页面时内存都会被释放，几乎没有太多管理的必要（当然并不代表一些大型Web应用不需 要管理内存）。
但如果使用Node作为服务器，就需要关注内存问题了，一旦内存发生泄漏，久而久之整个服务将会瘫痪（服务器不会频繁的重启）。

hrome的内存限制

 存在限制

Chrome限制了所能使用的内存极限（64位为1.4GB，32位为1.0GB），这也就意味着将无法直接操作一些大内存对象。

 为何限制

Chrome之所以限制了内存的大小，表面上的原因是V8最初是作为浏览器的JavaScript引擎而设计，不太可能遇到大量内存的场景，
而深层次的原因 则是由于**V8的垃圾回收机制的限制。**
由于V8需要保证JavaScript应用逻辑与垃圾回收器所看到的不一样，V8在执行垃圾回收时会阻塞 JavaScript应用逻辑，
直到垃圾回收结束再重新执行JavaScript应用逻辑，这种行为被称为“全停顿”（stop-the-world）。
若V8的堆内存为1.5GB，V8做一次小的垃圾回收需要50ms以上，做一次非增量式的垃圾回收甚至要1秒以上。
这样浏览器将在1s内失去对用户的响 应，造成假死现象。如果有动画效果的话，动画的展现也将显著受到影响。

hromeV8的堆构成

V8的堆其实并不只是由老生代和新生代两部分构成，可以将堆分为几个不同的区域：
*新生代内存区：大多数的对象被分配在这里，这个区域很小但是垃圾回特别频繁
*　老生代指针区：属于老生代，这里包含了大多数可能存在指向其他对象的指针的对象，大多数从新生代晋升的对象会被移动到这里
*老生代数据区：属于老生代，这里只保存原始数据对象，这些对象没有指向其他对象的指针
*　大对象区：这里存放体积超越其他区大小的对象，每个对象有自己的内存，垃圾回收其不会移动大对象
*代码区：代码对象，也就是包含JIT之后指令的对象，会被分配在这里。唯一拥有执行权限的内存区
*　Cell区、属性Cell区、Map区：存放Cell、属性Cell和Map，每个区域都是存放相同大小的元素，结构简单

每个区域都是由一组内存页构成，内存页是V8申请内存的最小单位，除了大对象区的内存页较大以外，
其他区的内存页都是1MB大小，而且按照1MB对 齐。
内存页除了存储的对象，还有一个包含元数据和标识信息的页头，以及一个用于标记哪些对象是活跃对象的位图区。
另外每个内存页还有一个单独分配在另外内 存区的槽缓冲区，里面放着一组对象，这些对象可能指向其他存储在该页的对象。
垃圾回收器只会针对新生代内存区、老生代指针区以及老生代数据区进行垃圾回收

hromeV8的垃圾回收机制

 如何判断回收内容

如何确定哪些内存需要回收，哪些内存不需要回收，这是垃圾回收期需要解决的最基本问题。
我们可以这样假定，一个对象为活对象当且仅当它被一个根对象 或另一个活对象指向。根对象永远是活对象，它是被浏览器或V8所引用的对象。

 如何识别指针和数据

垃圾回收器需要面临一个问题，它需要判断哪些是数据，哪些是指针。由于很多垃圾回收算法会将对象在内存中移动（紧凑，减少内存碎片），所以经常需要进行指针的改写。

目前主要有三种方法来识别指针：

1. 保守法：
 将所有堆上对齐的字都认为是指针，那么有些数据就会被误认为是指针。
 于是某些实际是数字的假指针，会背误认为指向活跃对象，
 导致内存泄露（假指针指向的对象可能是死对象，但依旧有指针指向——这个假指针指向它）同时我们不能移动任何内存区域。
1. 编译器提示法：
 如果是静态语言，编译器能够告诉我们每个类当中指针的具体位置，
 而一旦我们知道对象时哪个类实例化得到的，就能知道对象中所有指针。
 这是JVM实现垃圾回收的方式，但这种方式并不适合JS这样的动态语言
1. 标记指针法：
 这种方法需要在每个字末位预留一位来标记这个字段是指针还是数据。
 这种方法需要编译器支持，但实现简单，而且性能不错。
 V8采用的是这种方式。V8将所有数据以32bit字宽来存储，其中最低一位保持为0，而指针的最低两位为01

 V8的回收策略

自动垃圾回收算法的演变过程中出现了很多算法，但是由于不同对象的生存周期不同，没有一种算法适用于所有的情况。
所以V8采用了一种分代回收的策 略，将内存分为两个生代：新生代和老生代。
新生代的对象为存活时间较短的对象，老生代中的对象为存活时间较长或常驻内存的对象。
分别对新生代和老生代使用 不同的垃圾回收算法来提升垃圾回收的效率。
对象起初都会被分配到新生代，当新生代中的对象满足某些条件（后面会有介绍）时，会被移动到老生代（晋升）

 V8的分代内存

默认情况下，64位环境下的V8引擎的新生代内存大小32MB、老生代内存大小为1400MB，而32位则减半，分别为16MB和700MB。
V8内存的最大保留空间分别为1464MB（64位）和732MB（32位）。
具体的计算公式是4*reserved_semispace_space_+ max_old_generation_size_，
新生代由两块reserved_semispace_space_组成，每块16MB（64位）或8MB（32位）

生代

 新生代的特点

大多数的对象被分配在这里，这个区域很小但是垃圾回特别频繁。
在新生代分配内存非常容易，我们只需要保存一个指向内存区的指针，不断根据新对象的大小进行递增即可。
当该指针到达了新生代内存区的末尾，就会有一次清理（仅仅是清理新生代）

 新生代的垃圾回收算法

新生代使用Scavenge算法进行回收。在Scavenge算法的实现中，主要采用了Cheney算法。

具体的执行过程大致是这样：
首先将From空间中所有能从根对象到达的对象复制到To区，
然后维护两个To区的指针scanPtr和allocationPtr，分别指向即将 扫描的活跃对象和即将为新对象分配内存的地方，开始循环。
循环的每一轮会查找当前scanPtr所指向的对象，确定对象内部的每个指针指向哪里。
如果指向 老生代我们就不必考虑它了。
如果指向From区，我们就需要把这个所指向的对象从From区复制到To区，具体复制的位置就是allocationPtr 所指向的位置。
复制完成后将scanPtr所指对象内的指针修改为新复制对象存放的地址，并移动allocationPtr。
如果一个对象内部的所有指针 都被处理完，scanPtr就会向前移动，进入下一个循环。
若scanPtr和allocationPtr相遇，则说明所有的对象都已被复制完，From 区剩下的都可以被视为垃圾，可以进行清理了。

举个栗子(以及凑篇幅)，如果有类似如下的引用情况：

```
 +----- A对象
 |
根对象----+----- B对象 ------ E对象
 |
 +----- C对象 ----+---- F对象 
 |
 +---- G对象 ----- H对象

 D对象
```

在执行Scavenge之前，From区长这幅模样

```
+---+---+---+---+---+---+---+---+--------+
| A | B | C | D | E | F | G | H | |
+---+---+---+---+---+---+---+---+--------+
```

那么首先将根对象能到达的ABC对象复制到To区，于是乎To区就变成了这个样子：

```
 allocationPtr
 ↓ 
+---+---+---+----------------------------+
| A | B | C | |
+---+---+---+----------------------------+
 ↑
scanPtr 
```

接下来进入循环，扫描scanPtr所指的A对象，发现其没有指针，于是乎scanPtr移动，变成如下这样

```
 allocationPtr
 ↓ 
+---+---+---+----------------------------+
| A | B | C | |
+---+---+---+----------------------------+
 ↑
 scanPtr 
```

接下来扫描B对象，发现其有指向E对象的指针，且E对象在From区，那么我们需要将E对象复制到allocationPtr所指的地方并移动allocationPtr指针：

```
 allocationPtr
 ↓ 
+---+---+---+---+------------------------+
| A | B | C | E | |
+---+---+---+---+------------------------+
 ↑
 scanPtr 
```

B对象里所有指针都已被复制完，所以移动scanPtr：

```
 allocationPtr
 ↓ 
+---+---+---+---+------------------------+
| A | B | C | E | |
+---+---+---+---+------------------------+
 ↑
 scanPtr 
```

接下来扫描C对象，C对象中有两个指针，分别指向F对象和G对象，且都在From区，先复制F对象到To区：

```
 allocationPtr
 ↓ 
+---+---+---+---+---+--------------------+
| A | B | C | E | F | |
+---+---+---+---+---+--------------------+
 ↑
 scanPtr 
```

然后复制G对象到To区

```
 allocationPtr
 ↓ 
+---+---+---+---+---+---+----------------+
| A | B | C | E | F | G | |
+---+---+---+---+---+---+----------------+
 ↑
 scanPtr 
```

这样C对象内部的指针已经复制完成了，移动scanPtr：

```
 allocationPtr
 ↓ 
+---+---+---+---+---+---+----------------+
| A | B | C | E | F | G | |
+---+---+---+---+---+---+----------------+
 ↑
 scanPtr 
```

逐个扫描E，F对象，发现其中都没有指针，移动scanPtr：

```
 allocationPtr
 ↓ 
+---+---+---+---+---+---+----------------+
| A | B | C | E | F | G | |
+---+---+---+---+---+---+----------------+
 ↑
 scanPtr 
```

扫描G对象，发现其中有一个指向H对象的指针，且H对象在From区，复制H对象到To区，并移动allocationPtr：

```
 allocationPtr
 ↓ 
+---+---+---+---+---+---+---+------------+
| A | B | C | E | F | G | H | |
+---+---+---+---+---+---+---+------------+
 ↑
 scanPtr 
```

完成后由于G对象没有其他指针，且H对象没有指针移动scanPtr：

```
 allocationPtr
 ↓ 
+---+---+---+---+---+---+---+------------+
| A | B | C | E | F | G | H | |
+---+---+---+---+---+---+---+------------+
 ↑
 scanPtr 
```

此时scanPtr和allocationPtr重合，说明复制结束
可以对比一下From区和To区在复制完成后的结果：

```
//From区
+---+---+---+---+---+---+---+---+--------+
| A | B | C | D | E | F | G | H | |
+---+---+---+---+---+---+---+---+--------+
//To区
+---+---+---+---+---+---+---+------------+
| A | B | C | E | F | G | H | |
+---+---+---+---+---+---+---+------------+
```

D对象没有被复制，它将被作为垃圾进行回收

 写屏障

如果新生代中的一个对象只有一个指向它的指针，而这个指针在老生代中，
我们如何判断这个新生代的对象是否存活？
为了解决这个问题，需要建立一个列表用来记录所有老生代对象指向新生代对象的情况。
每当有老生代对象指向新生代对象的时候，我们就记录下来

 对象的晋升

当一个对象经过多次新生代的清理依旧幸存，这说明它的生存周期较长，也就会被移动到老生代，这称为对象的晋升。具体移动的标准有两种：

1. 对象从From空间复制到To空间时，会检查它的内存地址来判断这个对象是否已经经历过一个新生代的清理，如果是，则复制到老生代中，否则复制到To空间中
2. 对象从From空间复制到To空间时，如果To空间已经被使用了超过25%，那么这个对象直接被复制到老生代

生代

 老生代的特点

老生代所保存的对象大多数是生存周期很长的甚至是常驻内存的对象，而且老生代占用的内存较多

 老生代的垃圾回收算法

老生代占用内存较多（64位为1.4GB，32位为700MB），如果使用Scavenge算法，
浪费一半空间不说，复制如此大块的内存消耗时间将 会相当长。所以Scavenge算法显然不适合。
V8在老生代中的垃圾回收策略采用 **Mark-Sweep和Mark-Compact** 相结合

 Mark-Sweep（标记清除）

标记清除分为标记和清除两个阶段。
在标记阶段需要遍历堆中的所有对象，并标记那些活着的对象，然后进入清除阶段。
在清除阶段总，只清除没有被标记的对象。
由于标记清除只清除死亡对象，而死亡对象在老生代中占用的比例很小，所以效率较高

标记清除有一个问题就是进行一次标记清楚后，内存空间往往是不连续的，会出现很多的内存碎片。
如果后续需要分配一个需要内存空间较多的对象时，如果所有的内存碎片都不够用，将会使得V8无法完成这次分配，提前触发垃圾回收。

 Mark-Compact（标记整理）

标记整理正是为了解决标记清除所带来的内存碎片的问题。
标记整理在标记清除的基础进行修改，将其的清除阶段变为紧缩极端。
在整理的过程中，将活着的 对象向内存区的一段移动，移动完成后直接清理掉边界外的内存。
紧缩过程涉及对象的移动，所以效率并不是太好，但是能保证不会生成内存碎片。

 算法思路

标记清除和标记整理都分为两个阶段：标记阶段、清除或紧缩阶段

在标记阶段，所有堆上的活跃对象都会被标记。
每个内存页有一个用来标记对象的位图，位图中的每一位对应内存页中的一个字。
这个位图需要占据一定的空 间（32位下为3.1%，64位为1.6%）。
另外有两位用来标记对象的状态，这个状态一共有三种（所以要两位）——白，灰，黑：

* 如果一个对象为白对象，它还没未被垃圾回收器发现
* 如果一个对象为灰对象，它已经被垃圾回收器发现，但其邻接对象尚未全部处理
* 如果一个对象为黑对象，说明他步进被垃圾回收器发现，其邻接对象也全部被处理完毕了

 结合使用标记清除和标记整理

Chrome V8的老生代使用标记清除和标记整理结合的方式，主要采用标记清除算法，如果空间不足以分配从新生代晋升过来的对象时，才使用标记整理

参考文章：

* [V8 内存浅析](https://zhuanlan.zhihu.com/p/33816534)
* [浅谈Chrome V8引擎中的垃圾回收机制](https://www.cnblogs.com/liangdaye/p/4654734.html)

## 88 从浏览器地址栏输入url到显示页面所经历的流程有哪些(以HTTP为例)？

* created_at: 2023-03-11T12:30:58Z
* updated_at: 2023-03-11T12:31:13Z
* labels: 浏览器
* milestone: 高

1. 在浏览器地址栏输入URL

2. 浏览器查看**缓存**，如果请求资源在缓存中并且新鲜，跳转到转码步骤

1. 如果资源未缓存，发起新请求

2. 如果已缓存，检验是否足够新鲜，足够新鲜直接提供给客户端，否则与服务器进行验证。

3. 检验新鲜通常有两个HTTP头进行控制`Expires`和`Cache-Control`：

* HTTP1.0提供Expires，值为一个绝对时间表示缓存新鲜日期
* HTTP1.1增加了Cache-Control: max-age=,值为以秒为单位的最大新鲜时间

3. 浏览器**解析URL**获取协议，主机，端口，path

4. 浏览器**组装一个HTTP（GET）请求报文**

5. 浏览器**获取主机ip地址**，过程如下：

1. 浏览器缓存

2. 本机缓存

3. hosts文件

4. 路由器缓存

5. ISP DNS缓存

6. DNS递归查询（可能存在负载均衡导致每次IP不一样）

6. **打开一个socket与目标IP地址，端口建立TCP链接**，三次握手如下：

1. 客户端发送一个TCP的**SYN=1，Seq=X**的包到服务器端口

2. 服务器发回**SYN=1， ACK=X+1， Seq=Y**的响应包

3. 客户端发送**ACK=Y+1， Seq=Z**

7. TCP链接建立后**发送HTTP请求**

8. 服务器接受请求并解析，将请求转发到服务程序，如虚拟主机使用HTTP Host头部判断请求的服务程序

9. 服务器检查**HTTP请求头是否包含缓存验证信息**如果验证缓存新鲜，返回**304**等对应状态码

10. 处理程序读取完整请求并准备HTTP响应，可能需要查询数据库等操作

11. 服务器将**响应报文通过TCP连接发送回浏览器**

12. 浏览器接收HTTP响应，然后根据情况选择**关闭TCP连接或者保留重用，关闭TCP连接的四次握手如下**：

1. 主动方发送**Fin=1， Ack=Z， Seq= X**报文

2. 被动方发送**ACK=X+1， Seq=Z**报文

3. 被动方发送**Fin=1， ACK=X， Seq=Y**报文

4. 主动方发送**ACK=Y， Seq=X**报文

13. 浏览器检查响应状态吗：是否为1XX，3XX， 4XX， 5XX，这些情况处理与2XX不同

14. 如果资源可缓存，**进行缓存**

15. 对响应进行**解码**（例如gzip压缩）

16. 根据资源类型决定如何处理（假设资源为HTML文档）

17. **解析HTML文档，构件DOM树，下载资源，构造CSSOM树，执行js脚本**，这些操作没有严格的先后顺序，以下分别解释

18. **构建DOM树**：

1. **Tokenizing**：根据HTML规范将字符流解析为标记

2. **Lexing**：词法分析将标记转换为对象并定义属性和规则

3. **DOM construction**：根据HTML标记关系将对象组成DOM树

19. 解析过程中遇到图片、样式表、js文件，**启动下载**

20. 构建**CSSOM树**：

1. **Tokenizing**：字符流转换为标记流

2. **Node**：根据标记创建节点

3. **CSSOM**：节点创建CSSOM树

21. **[根据DOM树和CSSOM树构建渲染树](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-tree-construction)**:

1. 从DOM树的根节点遍历所有**可见节点**，不可见节点包括：1）`script`,`meta`这样本身不可见的标签。2)被css隐藏的节点，如`display: none`

2. 对每一个可见节点，找到恰当的CSSOM规则并应用

3. 发布可视节点的内容和计算样式

22. **js解析如下**：

1. 浏览器创建Document对象并解析HTML，将解析到的元素和文本节点添加到文档中，此时**document.readystate为loading**

2. HTML解析器遇到**没有async和defer的script时**，将他们添加到文档中，然后执行行内或外部脚本。
 这些脚本会同步执行，并且在脚本下载和执行时解析器会暂停。
 这样就可以用document.write()把文本插入到输入流中。
 **同步脚本经常简单定义函数和注册事件处理程序，他们可以遍历和操作script和他们之前的文档内容**

3. 当解析器遇到设置了**async**属性的script时，开始下载脚本并继续解析文档。
 脚本会在它**下载完成后尽快执行**，但是**解析器不会停下来等它下载**。
 异步脚本**禁止使用document.write()**，它们可以访问自己script和之前的文档元素

4. 当文档完成解析，document.readState变成interactive

5. 所有**defer**脚本会**按照在文档出现的顺序执行**，延迟脚本**能访问完整文档树**，禁止使用document.write()

6. 浏览器**在Document对象上触发DOMContentLoaded事件**

7. 此时文档完全解析完成，浏览器可能还在等待如图片等内容加载，
 等这些**内容完成载入并且所有异步脚本完成载入和执行**，document.readState变为complete,window触发load事件

23. **显示页面**（HTML解析过程中会逐步显示页面）

## 89 从哪些方面可以对网站性能优化？

* created_at: 2023-03-11T12:33:20Z
* updated_at: 2023-03-11T12:33:21Z
* labels: 浏览器
* milestone: 高

* content方面

 1. 减少HTTP请求：合并文件、CSS精灵、inline Image
 2. 减少DNS查询：DNS查询完成之前浏览器不能从这个主机下载任何任何文件。方法：DNS缓存、将资源分布到恰当数量的主机名，平衡并行下载和DNS查询
 3. 避免重定向：多余的中间访问
 4. 使Ajax可缓存
 5. 非必须组件延迟加载
 6. 未来所需组件预加载
 7. 减少DOM元素数量
 8. 将资源放到不同的域下：浏览器同时从一个域下载资源的数目有限，增加域可以提高并行下载量
 9. 减少iframe数量
 10. 不要404

* Server方面

 1. 使用CDN
 2. 添加Expires或者Cache-Control响应头
 3. 对组件使用Gzip压缩
 4. 配置ETag
 5. Flush Buffer Early
 6. Ajax使用GET进行请求
 7. 避免空src的img标签

* Cookie方面

 1. 减小cookie大小
 2. 引入资源的域名不要包含cookie

* css方面

 1. 将样式表放到页面顶部
 2. 不使用CSS表达式
 3. 使用`<link>`不使用@import
 4. 不使用IE的Filter

* Javascript方面

 1. 将脚本放到页面底部
 2. 将javascript和css从外部引入
 3. 压缩javascript和css
 4. 删除不需要的脚本
 5. 减少DOM访问
 6. 合理设计事件监听器

* 图片方面

 1. 优化图片：根据实际颜色需要选择色深、压缩
 2. 优化css精灵
 3. 不要在HTML中拉伸图片
 4. 保证favicon.ico小并且可缓存

* 移动方面

 1. 保证组件小于25k
 2. Pack Components into a Multipart Document

## 90 redux-thunk 和 redux 是什么关系？

* created_at: 2023-03-11T12:52:40Z
* updated_at: 2023-03-11T12:52:41Z
* labels: web框架
* milestone: 高

解redux和redux的中间件redux-thunk

目录

* [Action的认识](#Action的认识)
* [Reducer的认识](#Reducer的认识)
* [Store的认识](#Store的认识)
* [上面三者的使用案例](#上面三者的使用案例)
* [Action创建函数](#Action创建函数)
* [redux-thunk中间件的认识](#redux-thunk中间件的认识)
* [参考文章](#参考文章)

ction的认识

简单点说Action就是一个对象，一个必须带key为type的对象[value是自己定义的]，其他的key就根据用户自己喜好自己定义:
以下都是action的定义

```
1、{type:”ADD”}
2、{type:”ADD”,key1:”“,key2:”“}
```

educer的认识

别主观意识就是类似数组中的reduce，也不是只能定义reducer，它仅仅是一个称呼，纯函数，
函数名次自己随便定义都可以，但是函数的参数只能是**state与action**,
可以简单的理解为一个工厂函数，传递一个旧的state通过加工后产出一个新的state：
简单的代码如下：

```js
function count (state = 0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1
    case 'REDUCER':
      return state - 1
    default:
      return state
  }
}
```

如果当state是对象的时候上面的代码是错误的:
redux里面规定state是不能修改的。
在javascript中对象是引用数据类型，当你修改了state的时候，变化前后的两个state将会指向同一个地址的，react-redux就会以为这两个相同的state，因为不会执行渲染
解决办法，我们用Object.assign去处理，如有不清楚Object.assign，请参考Object.assign文档

tore的认识

store是一个全局对象，将action和reducer以及state联系在一起，主要职责:
维护应用的state
提供getState()方法获取state
提供dispatch(action)方法更新state
通过subscribe(方法)注册监听器

面三者的使用案例

```js
'use strict'
import { createStore } from 'redux'
function count (state = 0, action) {
  switch (action.type) {
    case 'ADD':
      return state + 1
    case 'REDUCER':
      return state - 1
    default:
      return state
  }
}

const store = createStore(count)

let currentValue = store.getState()
console.log('当前的值:', currentValue)

// 定义一个监听的方法
const listener = () => {
  const previosValue = currentValue
  currentValue = store.getState()
  console.log('上一个值:', previosValue, '当前值:', currentValue)
}
// 创建一个监听
store.subscribe(listener)
// 分发任务
store.dispatch({ type: 'ADD' })
store.dispatch({ type: 'ADD' })
store.dispatch({ type: 'ADD' })
store.dispatch({ type: 'REDUCER' })
```

ction创建函数

上面我们说的action是一个对象，只是含有type的key的对象
action创建函数的意思就是创建一个action的函数，函数返回一个对象

```js
function add () {
  return {
    type: 'ADD'
  }
}
function reducer () {
  return {
    type: 'REDUCER'
  }
}
```

使用的时候直接store.dispatch(add());就可以

action创建函数的意义:
action创建函数表面是返回一个对象
真正的意义在于逻辑的封装

edux-thunk中间件的认识

redux-thunk中间件可以让action创建函数先不返回一个action对象，而是返回一个函数，
函数传递两个参数(dispatch,getState),在函数体内进行业务逻辑的封装

```js
function add () {
  return {
    type: 'ADD'
  }
}
function addIfOdd () {
  return (dispatch, getState) => {
    const currentValue = getState()
    if (currentValue % 2 == 0) {
      return false
    }
    // 分发一个任务
    dispatch(add())
  }
}
```

考文章

* [理解redux和redux的中间件redux-thunk的认识](https://blog.csdn.net/kuangshp128/article/details/67632683)

## 91 Iterator 和 for...of 了解多少？

* created_at: 2023-03-11T12:56:33Z
* updated_at: 2023-03-11T12:56:34Z
* labels: JavaScript
* milestone: 高

terator 和 for...of 循环

<!-- toc -->

* [1、Iterator 的概念](#1iterator-%E7%9A%84%E6%A6%82%E5%BF%B5)
* [2、数据结构的默认 Iterator 接口](#2%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84%E7%9A%84%E9%BB%98%E8%AE%A4-iterator-%E6%8E%A5%E5%8F%A3)
* [3、调用 Iterator 接口的场合](#3%E8%B0%83%E7%94%A8-iterator-%E6%8E%A5%E5%8F%A3%E7%9A%84%E5%9C%BA%E5%90%88)
[3.1、解构赋值](#31%E8%A7%A3%E6%9E%84%E8%B5%8B%E5%80%BC)
[3.2、扩展运算符](#32%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6)
[3.3、yield*](#33yield)
[3.4、其他场合](#34%E5%85%B6%E4%BB%96%E5%9C%BA%E5%90%88)
* [4、Iterator 接口与 Generator 函数](#4iterator-%E6%8E%A5%E5%8F%A3%E4%B8%8E-generator-%E5%87%BD%E6%95%B0)
* [5、for...of 循环 - 重点！！！](#5forof-%E5%BE%AA%E7%8E%AF-------%E9%87%8D%E7%82%B9)
[5.1、数组](#51%E6%95%B0%E7%BB%84)
[5.2、Set 和 Map 结构](#52set-%E5%92%8C-map-%E7%BB%93%E6%9E%84)
[5.3、计算生成的数据结构](#53%E8%AE%A1%E7%AE%97%E7%94%9F%E6%88%90%E7%9A%84%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84)
[5.4、对象](#54%E5%AF%B9%E8%B1%A1)
* [6、对比JS中的几种遍历：for forEach for...in for...of](#6%E5%AF%B9%E6%AF%94js%E4%B8%AD%E7%9A%84%E5%87%A0%E7%A7%8D%E9%81%8D%E5%8E%86for-----foreach---forin---forof)
[理解 JavaScript 中的 for…of 循环](#%E7%90%86%E8%A7%A3-javascript-%E4%B8%AD%E7%9A%84-forof-%E5%BE%AA%E7%8E%AF)
[Arrays(数组)](#arrays%E6%95%B0%E7%BB%84)
[Maps(映射)](#maps%E6%98%A0%E5%B0%84)
[Set(集合)](#set%E9%9B%86%E5%90%88)
[String(字符串)](#string%E5%AD%97%E7%AC%A6%E4%B8%B2)
[Arguments Object(参数对象)](#arguments-object%E5%8F%82%E6%95%B0%E5%AF%B9%E8%B1%A1)
[Generators(生成器)](#generators%E7%94%9F%E6%88%90%E5%99%A8)
[退出迭代](#%E9%80%80%E5%87%BA%E8%BF%AD%E4%BB%A3)
[普通对象不可迭代](#%E6%99%AE%E9%80%9A%E5%AF%B9%E8%B1%A1%E4%B8%8D%E5%8F%AF%E8%BF%AD%E4%BB%A3)
[For…of vs For…in](#forof-vs-forin)

<!-- tocstop -->

 1、Iterator 的概念

JavaScript 原有的表示 “ 集合 ” 的数据结构，主要是数组（ Array ）和对象（ Object ）， ES6 又添加了 Map 和 Set 。
这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是 Map ， Map 的成员是对象。
这样就需要一种统一的接口机制，来处理所有不同的数据结构。
遍历器（ Iterator ）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。
任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令for...of循环， Iterator 接口主要供for...of消费。

Iterator 的遍历过程是这样的。

* （ 1 ）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
* （ 2 ）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
* （ 3 ）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
* （ 4 ）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。
具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

 2、数据结构的默认 Iterator 接口

Iterator 接口的目的，就是为所有数据结构，提供了一种统一的访问机制，即for...of循环（详见下文）。当使用for...of循环遍历某种数据结构时，该循环会自动去寻找 Iterator 接口。
在 ES6 中，有三类数据结构原生具备 Iterator 接口：数组、某些类似数组的对象、 Set 和 Map 结构。

实例：

```javascript
const arr = ['a', 'b', 'c']
const iter = arr[Symbol.iterator]()
iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }
```

上面提到，原生就部署 Iterator 接口的数据结构有三类，对于这三类数据结构，不用自己写遍历器生成函数，for...of循环会自动遍历它们。除此之外，其他数据结构（主要是对象）的 Iterator 接口，都需要自己在Symbol.iterator属性上面部署，这样才会被for...of循环遍历。

 3、调用 Iterator 接口的场合

有一些场合会默认调用 Iterator 接口（即Symbol.iterator方法），除了下文会介绍的for...of循环，还有几个别的场合。

 3.1、解构赋值

对数组和 Set 结构进行解构赋值时，会默认调用Symbol.iterator方法。
实例1：

```javascript
const set = new Set().add('a').add('b').add('c')
const [x, y] = set
// x='a'; y='b'
const [first, ...rest] = set
// first='a'; rest=['b','c'];
```

 3.2、扩展运算符

扩展运算符（ ... ）也会调用默认的 iterator 接口。
实例2：

```javascript
// 例一
const str = 'hello';
[...str] // ['h','e','l','l','o']
// 例二
const arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']
```

 3.3、yield*

yield* 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
实例3：

```javascript
const generator = function * () {
  yield 1
  yield * [2, 3, 4]
  yield 5
}
const iterator = generator()
iterator.next() // { value: 1, done: false }
iterator.next() // { value: 2, done: false }
iterator.next() // { value: 3, done: false }
iterator.next() // { value: 4, done: false }
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }
```

 3.4、其他场合

由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

* for...of
* Array.from()
* Map(), Set(), WeakMap(), WeakSet() （比如new Map([['a',1],['b',2]])）
* Promise.all()
* Promise.race()

 4、Iterator 接口与 Generator 函数

Symbol.iterator方法的最简单实现，还是使用下一章要介绍的 Generator 函数。
实例：

```javascript
 var myIterable = {};
 myIterable[Symbol.iterator] = function* () {
 yield 1;
 yield 2;
 yield 3;
 };
 [...myIterable] // [1, 2, 3]
 
 // 或者采用下面的简洁写法
 let obj = {
[Symbol.iterator]() {
 yield 'hello';
 yield 'world';
 }
 };
 for (let x of obj) {
 console.log(x);
 }
 // hello
 // world
```

 5、for...of 循环 - 重点

ES6 借鉴 C++ 、 Java 、 C# 和 Python 语言，引入了for...of循环，作为遍历所有数据结构的统一的方法。一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。
for...of 循环可以使用的范围包括数组、 Set 和 Map 结构、某些类似数组的对象（比如 arguments 对象、 DOM NodeList 对象）、后文的 Generator 对象，以及字符串。

 5.1、数组

数组原生具备 iterator 接口，for...of循环本质上就是调用这个接口产生的遍历器，可以用下面的代码证明。
实例1:

```javascript
const arr = ['red', 'green', 'blue']
const iterator = arr[Symbol.iterator]()

for (const v of arr) {
  console.log(v) // red green blue
}

for (const v of iterator) {
  console.log(v) // red green blue
}
```

JavaScript 原有的for...in循环，只能获得对象的键名，不能直接获取键值。 ES6 提供for...of循环，允许遍历获得键值。
实例2:

```javascript
const arr = ['a', 'b', 'c', 'd']

for (const a in arr) {
  console.log(a) // 0 1 2 3
}

for (const a of arr) {
  console.log(a) // a b c d
}
```

上面代码表明，for...in循环读取键名，for...of循环读取键值。如果要通过for...of循环，获取数组的索引，可以借助数组实例的entries方法和keys方法，参见《数组的扩展》章节。

实例3：for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟for...in循环也不一样。

```javascript
const arr = [3, 5, 7]
arr.foo = 'hello'

for (const i in arr) {
  console.log(i) // "0", "1", "2", "foo"
}

for (const i of arr) {
  console.log(i) // "3", "5", "7"
}
```

 5.2、Set 和 Map 结构

Set 和 Map 结构也原生具有 Iterator 接口，可以直接使用for...of循环。
实例1：基本使用

```javascript
 var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
 for (var e of engines) {
 console.log(e);
 }
 // Gecko
 // Trident
 // Webkit
 
 var es6 = new Map();
 es6.set("edition", 6);
 es6.set("committee", "TC39");
 es6.set("standard", "ECMA-262");
 for (var [name, value] of es6) {
 console.log(name + ": " + value);
 }
 4、通信类
 // committee: TC39
 // standard: ECMA-262
```

Set 结构遍历时，返回的是一个值，而 Map 结构遍历时，返回的是一个数组，该数组的两个成员分别为当前 Map 成员的键名和键值。
实例2：

```javascript
const map = new Map().set('a', 1).set('b', 2)
for (const pair of map) {
  console.log(pair)
}
// ['a', 1]
// ['b', 2]

for (const [key, value] of map) {
  console.log(key + ' : ' + value)
}
// a : 1
// b : 2
```

 5.3、计算生成的数据结构

有些数据结构是在现有数据结构的基础上，计算生成的。比如， ES6 的数组、 Set 、 Map 都部署了以下三个方法，调用后都返回遍历器对象。

* entries() 返回一个遍历器对象，用来遍历[ 键名 , 键值 ]组成的数组。对于数组，键名就是索引值；对于 Set ，键名与键值相同。 Map 结构的iterator 接口，默认就是调用 entries 方法。
* keys() 返回一个遍历器对象，用来遍历所有的键名。
* values() 返回一个遍历器对象，用来遍历所有的键值。

实例：

```javascript
const arr = ['a', 'b', 'c']

for (const pair of arr.entries()) {
  console.log(pair)
}
// [0, 'a']
// [1, 'b']
// [2, 'c']
```

 5.4、对象

对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 iterator 接口后才能使用。但是，这样情况下，for...in循环依然可以用来遍历键名。
实例：

```javascript
const es6 = {
  edition: 6,
  committee: 'TC39',
  standard: 'ECMA-262'
}

for (e in es6) {
  console.log(e)
}
// edition
// committee
// standard

for (e of es6) {
  console.log(e)
}
// TypeError: es6 is not iterable
```

一种解决方法是，使用Object.keys方法将对象的键名生成一个数组，然后遍历这个数组。

```javascript
for (const key of Object.keys(someObject)) {
  console.log(key + ': ' + someObject[key])
}
```

另一个方法是使用 Generator 函数将对象重新包装一下。

```javascript
function * entries (obj) {
  for (const key of Object.keys(obj)) {
    yield [key, obj[key]]
  }
}
for (const [key, value] of entries(obj)) {
  console.log(key, '->', value)
}
// a -> 1
// b -> 2
// c -> 3
```

 6、对比JS中的几种遍历：for forEach for...in for...of

 理解 JavaScript 中的 for…of 循环

for...of 语句创建一个循环来迭代可迭代的对象。
在 ES6 中引入的 for...of 循环，以替代 for...in 和 forEach() ，并支持新的迭代协议。
for...of 允许你遍历 Arrays（数组）, Strings（字符串）, Maps（映射）, Sets（集合）等可迭代的数据结构等。
对象数据结构是不可以用于for...of 的

语法：

```js
for (variable of iterable) {
  statement
}
```

* variable：每个迭代的属性值被分配给该变量。
* iterable：一个具有可枚举属性并且可以迭代的对象。

 Arrays(数组)

Arrays（数组）就是类列表（list-like）对象。数组原型上有各种方法，允许对其进行操作，比如修改和遍历等操作。
下面手在一个数组上进行的 for...of 操作：

```js
// array-example.js
const iterable = ['mini', 'mani', 'mo']

for (const value of iterable) {
  console.log(value)
}

// Output:
// mini
// mani
// mo
```

 Maps(映射)

Map 对象就是保存 key-value(键值) 对。对象和原始值可以用作 key(键)或 value(值)。
Map 对象根据其插入方式迭代元素。换句话说， for...of 循环将为每次迭代返回一个 key-value(键值) 数组。

```js
// map-example.js
const iterable = new Map([['one', 1], ['two', 2]])

for (const [key, value] of iterable) {
  console.log(`Key: ${key} and Value: ${value}`)
}

// Output:
// Key: one and Value: 1
// Key: two and Value: 2
```

 Set(集合)

Set(集合) 对象允许你存储任何类型的唯一值，这些值可以是原始值或对象。
Set(集合) 对象只是值的集合。 Set(集合) 元素的迭代基于其插入顺序。
Set(集合) 中的值只能发生一次。如果您创建一个具有多个相同元素的 Set(集合) ，那么它仍然被认为是单个元素

```js
// set-example.js
const iterable = new Set([1, 1, 2, 2, 1])

for (const value of iterable) {
  console.log(value)
}
// Output:
// 1
// 2
```

 String(字符串)

```js
// string-example.js
const iterable = 'javascript'

for (const value of iterable) {
  console.log(value)
}

// Output:
// "j"
// "a"
// "v"
// "a"
// "s"
// "c"
// "r"
// "i"
// "p"
// "t"
```

 Arguments Object(参数对象)

```js
// arguments-example.js
function args () {
  for (const arg of arguments) {
    console.log(arg)
  }
}

args('a', 'b', 'c')
// Output:
// a
// b
// c
```

 Generators(生成器)

```js
// generator-example.js
function * generator () {
  yield 1
  yield 2
  yield 3
}

for (const g of generator()) {
  console.log(g)
}

// Output:
// 1
// 2
// 3
```

 退出迭代

avaScript 提供了四种已知的终止循环执行的方法：break、continue、return 和 throw。让我们来看一个例子：

```js
const iterable = ['mini', 'mani', 'mo']

for (const value of iterable) {
  console.log(value)
  break
}

// Output:
// mini
```

 普通对象不可迭代

for...of 循环仅适用于迭代。 而普通对象不可迭代。 我们来看一下：

```js
const obj = { fname: 'foo', lname: 'bar' }

for (const value of obj) { // TypeError: obj[Symbol.iterator] is not a function
  console.log(value)
}
```

在这里，我们定义了一个普通对象 obj ，并且当我们尝试 for...of 对其进行操作时，会报错：TypeError: obj[Symbol.iterator] is not a function。

我们可以通过将类数组(array-like)对象转换为数组来绕过它。该对象将具有一个 length 属性，其元素必须可以被索引。我们来看一个例子：

```js
// object-example.js
const obj = { length: 3, 0: 'foo', 1: 'bar', 2: 'baz' }

const array = Array.from(obj)
for (const value of array) {
  console.log(value)
}
// Output:
// foo
// bar
// baz
```

Array.from() 方法可以让我通过类数组(array-like)或可迭代对象来创建一个新的 Array(数组) 实例。

 For…of vs For…in

for...of 更多用于特定于集合（如数组和对象），但不包括所有对象。
注意：任何具有 Symbol.iterator 属性的元素都是可迭代的。

for...in 不考虑构造函数原型的不可枚举属性。它只需要查找可枚举属性并将其打印出来。

## 92 如何给自己团队的大型前端项目设计单元测试？

* created_at: 2023-03-11T12:59:42Z
* updated_at: 2023-03-11T13:05:14Z
* labels: JavaScript
* milestone: 资深

本原则和步骤

1. 调研基本的前端测试框架有哪些， 有哪些优劣
2. 需要分别针对 utils 静态方法测试与 UI 交互测试（2E2测试）
3. 针对测试， 产出衡量指标与实践规范
4. 针对项目产出最佳实践
5. 通过 CI 工具进行测试检查、覆盖、定时回归

考文档

* [资料](https://juejin.cn/post/7039108357554176037)

## 93 如何做一个前端项目工程的自动化部署， 有哪些规范和流程设计？

* created_at: 2023-03-11T13:06:36Z
* updated_at: 2023-03-14T17:15:19Z
* labels: JavaScript
* milestone: 资深

// TODO 待补充

## 94 纯 TS 项目工程中, 如何使用 alias path?

* created_at: 2023-03-11T14:08:33Z
* updated_at: 2023-03-11T14:29:46Z
* labels: JavaScript
* milestone: 高

TODO 待补充内容

可以看这个文档： [资料](https://www.miganzi.com/tech/typescript-s-paths-config/)

## 95 实现：setObjectValue(obj: object, keys: string[], value: any) 方法， 支持安全设置对象的值

* created_at: 2023-03-12T15:36:16Z
* updated_at: 2023-03-12T15:36:17Z
* labels: JavaScript
* milestone: 中

可以使用递归实现安全设置对象的值。以下是一个实现setObjectValue方法的例子：

```typescript
typescriptCopy codefunction setObjectValue(obj: object, keys: string[], value: any) {
 const key = keys.shift();
 if (!key) {
 return;
 }

 if (keys.length === 0) {
 obj[key] = value;
 return;
 }

 if (!obj[key]) {
 obj[key] = {};
 }

 setObjectValue(obj[key], keys, value);
}
```

这个方法接受三个参数：要设置值的对象，一个字符串数组表示对象的键的路径，和要设置的值。例如，如果要设置对象`user`的`address`字段的`city`属性为`"New York"`，可以调用方法：

```typescript
typescriptCopy codeconst user = {};
setObjectValue(user, ['address', 'city'], 'New York');
```

在这个例子中，`keys`数组的第一个元素是`"address"`，所以我们检查`user`对象是否有一个名为`"address"`的属性。如果没有，我们创建一个新对象并将其分配给`user.address`属性。然后我们继续递归地调用`setObjectValue`方法，将新对象作为第一个参数传递，将`keys`数组的剩余部分作为第二个参数传递，将最终的值作为第三个参数传递。最终，我们将`"New York"`分配给`user.address.city`属性。

这个方法确保在设置对象值时不会引发`TypeError`异常，即使对象的某些部分尚未定义。

## 96 一个 tcp 连接能发几个 http 请求？

* created_at: 2023-03-14T14:52:22Z
* updated_at: 2023-03-14T14:52:23Z
* labels: 网络
* milestone: 中

如果是 HTTP 1.0 版本协议，一般情况下，不支持长连接，因此在每次请求发送完毕之后，TCP 连接即会断开，因此一个 TCP 发送一个 HTTP 请求，但是有一种情况可以将一条 TCP 连接保持在活跃状态，那就是通过 Connection 和 Keep-Alive 首部，在请求头带上 Connection: Keep-Alive，并且可以通过 Keep-Alive 通用首部中指定的，用逗号分隔的选项调节 keep-alive 的行为，如果客户端和服务端都支持，那么其实也可以发送多条，不过此方式也有限制，可以关注《HTTP 权威指南》4.5.5 节对于 Keep-Alive 连接的限制和规则。

而如果是 HTTP 1.1 版本协议，支持了长连接，因此只要 TCP 连接不断开，便可以一直发送 HTTP 请求，持续不断，没有上限； 同样，如果是 HTTP 2.0 版本协议，支持多用复用，一个 TCP 连接是可以并发多个 HTTP 请求的，同样也是支持长连接，因此只要不断开 TCP 的连接，HTTP 请求数也是可以没有上限地持续发送

## 97 JS 中 this 有哪些使用场景？

* created_at: 2023-03-14T14:56:49Z
* updated_at: 2023-03-14T14:56:50Z
* labels: JavaScript
* milestone: 中

this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。在实际开发中，this 的指向可以通过四种调用模式来判断。

* 第一种是`函数调用模式`，当一个函数不是一个对象的属性时，直接作为函数来调用时，this 指向全局对象。

* 第二种是`方法调用模式`，如果一个函数作为一个对象的方法来调用时，this 指向这个对象。

* 第三种是`构造器调用模式`，如果一个函数用 new 调用时，函数执行前会新创建一个对象，this 指向这个新创建的对象。

* 第四种是 `apply 、 call 和 bind 调用模式`，这三个方法都可以显示的指定调用函数的 this 指向。其中 apply 方法接收两个参数：一个是 this 绑定的对象，一个是参数数组。call 方法接收的参数，第一个是 this 绑定的对象，后面的其余参数是传入函数执行的参数。也就是说，在使用 call() 方法时，传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象，返回一个 this 绑定了传入对象的新函数。这个函数的 this 指向除了使用 new 时会被改变，其他情况下都不会改变。

这四种方式，使用构造器调用模式的优先级最高，然后是 apply、call 和 bind 调用模式，然后是方法调用模式，然后是函数调用模式。

## 98 HTTP 1.0 和 HTTP 1.1 有以下区别？

* created_at: 2023-03-14T15:00:01Z
* updated_at: 2023-03-14T15:00:03Z
* labels: 网络
* milestone: 中

* **连接方面**，http1.0 默认使用非持久连接，而 http1.1 默认使用持久连接。http1.1 通过使用持久连接来使多个 http 请求复用同一个 TCP 连接，以此来避免使用非持久连接时每次需要建立连接的时延。

* **资源请求方面**，在 http1.0 中，存在一些浪费带宽的现象，例如客户端只是需要某个对象的一部分，而服务器却将整个对象送过来了，并且不支持断点续传功能，http1.1 则在请求头引入了 range 头域，它允许只请求资源的某个部分，即返回码是 206（Partial Content），这样就方便了开发者自由的选择以便于充分利用带宽和连接。

* **缓存方面**，在 http1.0 中主要使用 header 里的 If-Modified-Since、Expires 来做为缓存判断的标准，http1.1 则引入了更多的缓存控制策略，例如 Etag、If-Unmodified-Since、If-Match、If-None-Match 等更多可供选择的缓存头来控制缓存策略。

* http1.1 中新**增了 host 字段**，用来指定服务器的域名。http1.0 中认为每台服务器都绑定一个唯一的 IP 地址，因此，请求消息中的 URL 并没有传递主机名（hostname）。但随着虚拟主机技术的发展，在一台物理服务器上可以存在多个虚拟主机，并且它们共享一个IP地址。因此有了 host 字段，这样就可以将请求发往到同一台服务器上的不同网站。

* http1.1 相对于 http1.0 还新**增了很多请求方法**，如 PUT、HEAD、OPTIONS 等。

## 100 flex 布局了解多少？

* created_at: 2023-03-14T15:09:34Z
* updated_at: 2023-03-14T15:09:35Z
* labels: CSS
* milestone: 高

lex 布局的学习

* [Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
* [Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)
* [Flex 布局教程：实例篇代码](https://github.com/JailBreakC/flex-box-demo)

器属性

以下6个属性设置在容器上。

```
flex-direction
flex-wrap
flex-flow
justify-content
align-items
align-content
```

 flex-direction属性

属性决定主轴的方向（即项目的排列方向）。

```css
.box {
 flex-direction: row | row-reverse | column | column-reverse;
}
```

* row（默认值）：主轴为水平方向，起点在左端。
* row-reverse：主轴为水平方向，起点在右端。
* column：主轴为垂直方向，起点在上沿。
* column-reverse：主轴为垂直方向，起点在下沿。

 flex-wrap属性

默认情况下，项目都排在一条线（又称"轴线"）上。flex-wrap属性定义，如果一条轴线排不下，如何换行。

```
.box{
 flex-wrap: nowrap | wrap | wrap-reverse;
}
```

它可能取三个值。
（1）nowrap（默认）：不换行。
（2）wrap：换行，第一行在上方。
（3）wrap-reverse：换行，第一行在下方。

 flex-flow

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

```css
.box {
 flex-flow: <flex-direction> || <flex-wrap>;
}
```

 justify-content属性

属性定义了项目在主轴上的对齐方式。

```
.box {
 justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

它可能取5个值，具体对齐方式与轴的方向有关。下面假设主轴为从左到右。

 flex-start（默认值）：左对齐
 flex-end：右对齐
 center： 居中
 space-between：两端对齐，项目之间的间隔都相等。
 space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

 align-items属性

定义项目在交叉轴上如何对齐。

```
.box {
 align-items: flex-start | flex-end | center | baseline | stretch;
}
```

它可能取5个值。具体的对齐方式与交叉轴的方向有关，下面假设交叉轴从上到下。

 flex-start：交叉轴的起点对齐。
 flex-end：交叉轴的终点对齐。
 center：交叉轴的中点对齐。
 baseline: 项目的第一行文字的基线对齐。
 stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

 align-content属性

定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```
.box {
 align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

 flex-start：与交叉轴的起点对齐。
 flex-end：与交叉轴的终点对齐。
 center：与交叉轴的中点对齐。
 space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
 space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
 stretch（默认值）：轴线占满整个交叉轴。

目的属性

以下6个属性设置在项目上。

 order
 flex-grow
 flex-shrink
 flex-basis
 flex
 align-self

 order属性

定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```
.item {
 order: <integer>;
}
```

 flex-grow

定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。
如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

 flex-shrink属性

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。
如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。

 flex-basis

定义了在分配多余空间之前，项目占据的主轴空间（main size）。
浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

```
.item {
 flex-basis: <length> | auto; // default auto */
}
```

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

 flex属性

是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

```
.item {
 flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：`auto (1 1 auto) 和 none (0 0 auto)`。
建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

 align-self属性

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。
默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

```
.item {
 align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

 参考文章

* [lex 布局中固定宽度不起作用，被压缩了](https://www.jianshu.com/p/4a8825a17181)

* [Flex弹性布局（附超Q小demo）](https://juejin.im/post/5cba07005188251b960f56eb)

## 102 map 和 weakMap 的区别 ?

* created_at: 2023-03-14T15:25:06Z
* updated_at: 2023-09-09T06:21:43Z
* labels: JavaScript
* milestone: 高

Map 和 WeakMap 都是 JavaScript 中的键值对数据结构，它们的主要区别在于其键的存储方式和内存管理。

Map 对象中的键可以是任何类型的值，包括基本类型和引用类型，而 WeakMap 对象中的键必须是对象。在 Map 中，如果一个键不再被引用，它仍然会被 Map 对象保留，因为 Map 对象对其进行了强引用。这会导致内存泄漏的问题。而 WeakMap 对象只会对其键进行弱引用，也就是说，如果一个键不再被引用，它会被垃圾回收器回收，因此不会导致内存泄漏的问题。

此外，WeakMap 没有 Map 中的一些方法，比如 size、keys、values 和 forEach 等方法，因为 WeakMap 的键不是强引用，所以无法确定其大小。

下表列出了 Map 和 WeakMap 的区别：

| | Map | WeakMap |
|--------------|----------------------------------------------------------|---------------------------------------------------------|
| 键的类型 | 可以使用任意类型的值作为键（包括基本类型和对象） | 只能使用对象作为键 |
| 引用关系 | 强引用键和值，不会因为键的引用被释放而自动回收值 | 弱引用键，当键的引用被释放时，对应的键值对会被自动回收 |
| 迭代顺序 | 迭代顺序与元素插入顺序一致 | 无法保证迭代顺序，因为键的引用可能被垃圾回收影响 |
| 键值对数量限制 | 无限制 | 无法获得 WeakMap 的尺寸，也无法遍历 WeakMap 的键值对数量 |
| 性能和内存占用 | 性能较好，适用于大量数据和频繁读写操作的场景 | 性能较差，内存占用较高，适用于需要弱引用特性的场景 |
| 使用场景 | 适用于需要持久存储数据或需要对键值对进行频繁操作的场景 | 适用于需要临时存储数据且希望在键的引用被释放后自动回收对应的值的场景 |

需要注意的是，WeakMap 中的键是弱引用，这意味着当键的引用被释放后，键值对会被自动回收。这在需要临时存储数据且希望在键的引用被释放后自动清理数据的场景中非常有用，例如缓存或私密数据的存储。

## 103 箭头函数和普通函数的区别？

* created_at: 2023-03-14T15:26:17Z
* updated_at: 2023-03-28T15:21:58Z
* labels: JavaScript
* milestone: 中

箭头函数和普通函数是 JavaScript 中两种不同的函数定义方式，它们有以下的区别：

* **语法不同**：箭头函数使用箭头 => 来定义函数，而普通函数使用 function 关键字来定义函数。

* **箭头函数没有自己的 this**，它会继承其所在作用域的 this 值。而普通函数的 this 则由函数调用时的上下文所决定，可以通过 call、apply、bind 方法来改变。

* **箭头函数没有自己的 arguments 对象**，它可以通过 rest 参数语法来接收不定数量的参数。而普通函数则有自己的 arguments 对象，它可以接收任意数量的参数。

* **箭头函数不能作为构造函数使用**，不能使用 new 来实例化，因为它没有自己的 this，而普通函数可以用 new 来创建新的对象。

* **箭头函数不能使用 yield 关键字**来定义生成器函数，而普通函数可以。

* **箭头函数不支持call()/apply()函数特性**

* **箭头函数没有prototype属性**

* **原型函数不能定义成箭头函数**
比如下面这个例子：

```js
function Person (name) {
  this.name = name
}

// 原型函数使用箭头函数，其中的this指向全局对象，而不会指向构造函数
// 因此访问不到构造函数本身，也就访问不到实例属性
Person.prototype.say = () => { console.log(this.name) }
```

## 104 说一说 cookie sessionStorage localStorage 区别？

* created_at: 2023-03-15T13:38:33Z
* updated_at: 2024-12-17T03:24:14Z
* labels: JavaScript
* milestone: 中

cookie、sessionStorage和localStorage都是存储在浏览器端的客户端存储方式，用于存储一些客户端数据。

它们之间的区别如下：

1. 生命周期

cookie的生命周期由Expires和Max-Age两个属性控制。当设置了Expires属性时，cookie的生命周期为设置的过期时间；当设置了Max-Age属性时，cookie的生命周期为设置的秒数。cookie在浏览器关闭时也会过期。而sessionStorage和localStorage的生命周期则与浏览器窗口相关，当窗口被关闭时，sessionStorage数据也会被清空，而localStorage数据则会一直存在，直到用户手动删除。

2. 存储容量

cookie的存储容量限制为4KB，而sessionStorage和localStorage的存储容量则较大，可以达到5MB或更高。

3. 数据共享

cookie可以被所有同源窗口（指协议、域名、端口相同）访问，而sessionStorage和localStorage只能被创建它们的窗口访问。

4. 传输方式

cookie会随着http请求发送到服务器，而sessionStorage和localStorage不会发送到服务器，只存在于浏览器端。

5. 数据类型

cookie只能存储字符串类型的数据，而sessionStorage和localStorage可以存储除了对象以外的数据类型，如数字、布尔值、数组、甚至是其他复杂的数据结构。但是，它们都可以通过JSON.stringify和JSON.parse方法将数据转化为字符串进行存储和读取。

综上所述，这三种存储方式都有各自的优缺点和适用场景。在实际应用中，我们需要根据实际情况选择合适的存储方式。

## 105 promise.race、promise.all、promise.allSettled 有哪些区别？

* created_at: 2023-03-15T13:43:12Z
* updated_at: 2023-03-15T13:43:44Z
* labels: JavaScript
* milestone: 中

`Promise.race()`、`Promise.all()`、`Promise.allSettled()` 都是 JavaScript 中的 Promise 相关 API，它们的区别如下：

1. `Promise.race()`

`Promise.race()` 接收一个包含多个 Promise 的数组作为参数，返回一个新的 Promise。该 Promise 将会在数组中的任意一个 Promise 状态变为 `fulfilled` 或 `rejected` 时被解决，且以第一个解决的 Promise 的结果作为其结果返回。

如果数组中所有 Promise 都被拒绝，则返回的 Promise 将会以最先被拒绝的 Promise 的原因作为其原因拒绝。

2. `Promise.all()`

`Promise.all()` 接收一个包含多个 Promise 的数组作为参数，返回一个新的 Promise。该 Promise 将会在数组中所有 Promise 状态均为 `fulfilled` 时被解决，并且以数组形式返回所有 Promise 的结果。

如果数组中有任何一个 Promise 被拒绝，则返回的 Promise 将会以最先被拒绝的 Promise 的原因作为其原因拒绝。

3. `Promise.allSettled()`

`Promise.allSettled()` 接收一个包含多个 Promise 的数组作为参数，返回一个新的 Promise。该 Promise 将会在数组中所有 Promise 状态都被解决时被解决，并且以数组形式返回所有 Promise 的结果。和 `Promise.all()` 不同，`Promise.allSettled()` 不会在有 Promise 被拒绝时拒绝该 Promise。

返回的 Promise 的数组中的每个元素都是一个对象，该对象表示原始 Promise 的结果。每个对象都有一个 `status` 属性，表示原始 Promise 的状态，其值为字符串 `'fulfilled'` 或 `'rejected'`。如果 Promise 被解决，对象还会包含一个 `value` 属性，表示 Promise 的解决值。如果 Promise 被拒绝，对象还会包含一个 `reason` 属性，表示 Promise 的拒绝原因。

综上所述，`Promise.race()`、`Promise.all()` 和 `Promise.allSettled()` 的主要区别在于它们对多个 Promise 的状态处理方式不同，以及返回的 Promise 所包含的数据类型和结构不同。

## 106 [代码实现] 手写代码实现 promise.race

* created_at: 2023-03-15T13:47:08Z
* updated_at: 2023-09-06T15:52:49Z
* labels: 代码实现/算法
* milestone: 中

下面是手写实现 `Promise.race()` 方法的代码：

```javascript
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise).then(resolve, reject)
    })
  })
}
```

实现原理：

`Promise.race()` 方法接收一个包含多个 Promise 的数组作为参数，并返回一个新的 Promise。该 Promise 将会在数组中的任意一个 Promise 状态变为 `fulfilled` 或 `rejected` 时被解决，且以第一个解决的 Promise 的结果作为其结果返回。

我们可以通过创建一个新的 Promise，然后遍历 Promise 数组并将每个 Promise 包装在一个 `Promise.resolve()` 中，然后使用 `.then()` 方法将它们的解决值和拒绝原因分别传递给新的 Promise 的 `resolve()` 和 `reject()` 方法。由于 Promise 的状态只能改变一次，所以一旦第一个 Promise 被解决，新的 Promise 的状态也将被解决，并且以第一个解决的 Promise 的结果作为其结果返回。

## 107 [代码实现] 手写代码实现 promise.all

* created_at: 2023-03-15T13:49:06Z
* updated_at: 2023-09-06T15:52:37Z
* labels: 代码实现/算法
* milestone: 高

下面是手写实现 `Promise.all()` 方法的代码：

```javascript
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    const results = []
    let count = 0
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (result) => {
          results[index] = result
          count++
          if (count === promises.length) {
            resolve(results)
          }
        },
        (reason) => {
          reject(reason)
        }
      )
    })
  })
}
```

实现原理：

`Promise.all()` 方法接收一个包含多个 Promise 的数组作为参数，并返回一个新的 Promise。该 Promise 将会在数组中所有 Promise 状态均为 `fulfilled` 时被解决，并且以数组形式返回所有 Promise 的结果。

我们可以通过创建一个新的 Promise，然后遍历 Promise 数组并将每个 Promise 包装在一个 `Promise.resolve()` 中，然后使用 `.then()` 方法将它们的解决值和拒绝原因分别传递给新的 Promise 的 `resolve()` 和 `reject()` 方法。我们还需要维护一个计数器和一个结果数组来跟踪所有 Promise 的状态。每当一个 Promise 被解决时，我们将其结果存储在结果数组中，然后将计数器增加 1。当计数器等于 Promise 数组的长度时，说明所有 Promise 均已被解决，此时我们可以使用 `resolve()` 方法并将结果数组作为参数传递给它。如果有任何一个 Promise 被拒绝，则使用 `reject()` 方法并将其拒绝原因作为参数传递给它。

需要注意的是，如果 Promise 数组为空，则 `Promise.all()` 将立即被解决，并返回一个空数组。

## 108 手写实现 Promise.allSettled

* created_at: 2023-03-15T13:57:05Z
* updated_at: 2023-03-15T13:57:06Z
* labels: JavaScript
* milestone: 高

`Promise.allSettled` 方法会接收一个 Promise 数组，并返回一个新的 Promise 对象。该新 Promise 对象会在所有输入的 Promise 都被 resolved 或 rejected 后变为 settled 状态，并且它的值是一个包含所有 Promise 状态的对象数组。

以下是手写实现 `Promise.allSettled` 方法的代码：

```javascript
function allSettled (promises) {
  return new Promise((resolve) => {
    const results = []
    let settledCount = 0

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (value) => {
          results[index] = { status: 'fulfilled', value }
        },
        (reason) => {
          results[index] = { status: 'rejected', reason }
        }
      ).finally(() => {
        settledCount++

        if (settledCount === promises.length) {
          resolve(results)
        }
      })
    })
  })
}
```

上述代码中，我们首先创建一个新的 Promise 对象，并在其中执行了一个异步操作。然后我们遍历了传入的 Promise 数组，并为每个 Promise 添加了一个 `then` 方法的回调函数，以便在 Promise 状态发生变化时收集 Promise 的结果。对于每个 Promise，我们都使用 `Promise.resolve` 方法将其转换为 Promise 对象，以确保我们处理的是 Promise 对象。我们使用一个 `finally` 方法来在 Promise settled 时更新 settledCount，以确保在所有 Promise settled 后我们只会执行一次 `resolve` 方法。

最终，我们将所有 Promise 的状态都收集到了 `results` 数组中，并将该数组作为 Promise 的值解析。这样，我们就实现了 `Promise.allSettled` 方法的功能。

## 109 JavaScript 有几种方法判断变量的类型（类型检测）？

* created_at: 2023-03-15T14:13:51Z
* updated_at: 2024-01-14T09:54:54Z
* labels: JavaScript
* milestone: 中

 JavaScript 中有以下几种方法可以判断变量的类型

* typeof 运算符：可以用于判断基本数据类型（如字符串、数字、布尔值、Undefined 等）和函数类型，但对于对象类型（如数组、日期、正则表达式等）不能准确判断。

* instanceof 运算符：可以用于判断一个对象是否为某个构造函数的实例，但不能判断基本数据类型。

* Object.prototype.toString() 方法：可以返回一个对象的具体类型字符串，可以判断所有数据类型，但需要注意的是需要使用 call 或 apply 方法将要判断的对象传递给 toString 方法。

* Array.isArray() 方法：可以判断一个对象是否为数组类型。

* constructor 属性：可以返回一个对象的构造函数，但需要注意的是 constructor 属性可以被修改，因此不能保证准确性。

 举例 Object.prototype.toString() 是如何判断js 类型的

Object.prototype.toString() 方法是用来返回当前对象的类型字符串，其实现方式是返回一个类似 "[object Type]" 的字符串，其中 Type 是当前对象的类型。

```js
Object.prototype.toString.call('hello') // "[object String]"
Object.prototype.toString.call(123) // "[object Number]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"

const arr = [1, 2, 3]
Object.prototype.toString.call(arr) // "[object Array]"

const date = new Date()
Object.prototype.toString.call(date) // "[object Date]"

const reg = /abc/
Object.prototype.toString.call(reg) // "[object RegExp]"

const func = function () {}
Object.prototype.toString.call(func) // "[object Function]"
```

通过这种方式，可以精确判断变量的类型，包括基本数据类型和对象类型。

## 110 样式优先级的规则是什么？

* created_at: 2023-03-15T14:19:46Z
* updated_at: 2023-03-15T14:19:47Z
* labels: CSS
* milestone: 中

在 CSS 中，当多个选择器应用于同一个元素并设置了相同的属性时，就会出现样式冲突的问题。此时，CSS 会根据一定的规则来决定哪个样式具有更高的优先级，从而确定最终的样式效果。CSS 样式优先级的规则如下：

1. !important：具有最高优先级，用于强制覆盖其它样式。

2. 内联样式：直接在 HTML 元素的 style 属性中定义的样式，其优先级高于后面提到的其它选择器。

3. ID 选择器：通过 #id 定义的样式，其优先级高于后面提到的 class 选择器和标签选择器。

4. 类选择器、属性选择器、伪类选择器：通过 .class、\[attribute. 或 :pseudo 定义的样式，其优先级高于后面提到的标签选择器。

5. 标签选择器、伪元素选择器：通过 tagname 或 ::pseudo 定义的样式，优先级最低。

需要注意的是，当出现多个选择器具有相同的优先级时，CSS 会按照样式表中出现的顺序来决定样式的优先级，越后出现的样式会覆盖前面出现的样式。此外，继承自父元素的样式的优先级比上述任何选择器都低。

## 111 null 和 undefined 的区别，如何让一个属性变为 null？

* created_at: 2023-03-15T14:36:43Z
* updated_at: 2023-03-15T14:36:44Z
* labels: JavaScript
* milestone: 初

`null`和`undefined`都是JavaScript中表示缺失或无值的特殊值。

`undefined`是一个变量没有被赋值时的默认值，或者在访问对象属性或数组元素不存在时返回的值。例如：

```javascript
let a
console.log(a) // 输出 undefined

const obj = {}
console.log(obj.nonexistentProp) // 输出 undefined
```

而`null`表示一个变量被明确地赋值为没有值。例如：

```javascript
const a = null
console.log(a) // 输出 null
```

要将一个属性的值设置为`null`，可以像这样：

```javascript
const obj = { prop: 'value' }
obj.prop = null
console.log(obj.prop) // 输出 null
```

如果要删除对象的属性并将其值设置为`null`，可以使用`delete`操作符：

```javascript
const obj = { prop: 'value' }
delete obj.prop
obj.prop = null
console.log(obj.prop) // 输出 null
```

请注意，尝试访问一个已删除的属性将返回`undefined`而不是`null`。

## 112 CSS 尺寸单位有哪些？

* created_at: 2023-03-15T14:56:09Z
* updated_at: 2023-03-15T14:56:10Z
* labels: CSS
* milestone: 高

CSS尺寸设置的单位包括：

1. 像素（Pixel，缩写为px）：是最常用的单位，表示屏幕上的一个点，可以精确地指定元素的大小。

2. 百分比（Percentage，缩写为%）：相对于父元素的大小，可以根据父元素的大小来设置子元素的大小。

3. em：相对于当前元素的字体大小，用于设置字体大小时很常用。

4. rem：相对于根元素（即html元素）的字体大小。

5. vh/vw：相对于视口（Viewport）的高度和宽度。

6. cm、mm、in、pt、pc等长度单位：用于打印样式表，不建议在Web开发中使用。

7. 自定义单位：可以通过CSS的calc()函数自定义单位，比如使用“1fr”作为网格布局中的单位。

需要注意的是，不同的浏览器可能会有不同的计算方式和默认值，因此在设置尺寸时需要进行充分的测试和兼容性处理。

## 113 React Router 中 HashRouter 和 BrowserRouter 的区别和原理？

* created_at: 2023-03-15T15:01:37Z
* updated_at: 2023-03-15T15:02:11Z
* labels: web框架
* milestone: 高

React Router 是一个流行的第三方库，它允许在 React 应用程序中实现路由功能。React Router 支持两种路由方式：HashRouter 和 BrowserRouter。

1. HashRouter

HashRouter 使用 URL 中的 hash 部分（即 #）来实现路由。在 React 中，可以使用 `<HashRouter>` 组件来创建 HashRouter。例如：

```jsx
jsxCopy codeimport { HashRouter, Route, Link } from 'react-router-dom';

function App() {
 return (
 <HashRouter>
 <nav>
 <ul>
 <li>
 <Link to="/">Home</Link>
 </li>
 <li>
 <Link to="/about">About</Link>
 </li>
 </ul>
 </nav>
 <Route exact path="/" component={Home} />
 <Route path="/about" component={About} />
 </HashRouter>
 );
}
```

在使用 HashRouter 时，URL 中的路径看起来像这样：`http://example.com/#/about`。HashRouter 不会向服务器发送请求，因为 # 符号后面的内容被浏览器认为是 URL 的一部分，而不是服务器请求的一部分。这意味着在使用 HashRouter 时，React 应用程序可以在客户端上运行，而无需服务器支持。

2. BrowserRouter

BrowserRouter 使用 HTML5 的 history API 来实现路由。在 React 中，可以使用 `<BrowserRouter>` 组件来创建 BrowserRouter。例如：

```jsx
jsxCopy codeimport { BrowserRouter, Route, Link } from 'react-router-dom';

function App() {
 return (
 <BrowserRouter>
 <nav>
 <ul>
 <li>
 <Link to="/">Home</Link>
 </li>
 <li>
 <Link to="/about">About</Link>
 </li>
 </ul>
 </nav>
 <Route exact path="/" component={Home} />
 <Route path="/about" component={About} />
 </BrowserRouter>
 );
}
```

在使用 BrowserRouter 时，URL 中的路径看起来像这样：`http://example.com/about`。BrowserRouter 通过 history API 在客户端和服务器之间发送请求，因此需要服务器支持。

3. 区别

HashRouter 和 BrowserRouter 的主要区别在于它们如何处理 URL。HashRouter 使用 URL 中的 # 部分来实现路由，而 BrowserRouter 使用 HTML5 的 history API 来实现路由。HashRouter 不需要服务器支持，而 BrowserRouter 需要服务器支持。

4. 原理

HashRouter 的原理是通过监听 `window.location.hash` 的变化来实现路由。当用户点击链接时，React Router 会根据链接的路径渲染相应的组件，并将路径添加到 URL 中的 # 部分。当用户点击浏览器的“后退”按钮时，React Router 会根据上一个 URL 中的 # 部分来渲染相应的组件。

BrowserRouter 的原理是通过 HTML5 的 history API 来实现路由。当用户点击链接时，React Router 会使用 history API 将路径添加到浏览器的历史记录中，并渲染相应的组件。当用户点击浏览器的“后退”

## 114 Vue3.0 实现数据双向绑定的方法是什么？

* created_at: 2023-03-15T15:09:05Z
* updated_at: 2023-03-15T15:09:45Z
* labels: web框架
* milestone: 高

Vue3.0 通过使用 Composition API 中的 `reactive` 和 `ref` 函数来实现数据双向绑定。

1. reactive 函数

`reactive` 函数是 Vue3.0 中用来创建响应式对象的函数。将一个 JavaScript 对象传递给 `reactive` 函数，它会返回一个新的响应式对象。响应式对象是一个 Proxy 对象，可以在应用程序中使用它来自动追踪数据的变化。

例如，我们可以这样使用 `reactive` 函数来创建一个响应式对象：

```javascript
import { reactive } from 'vue'

const state = reactive({
  message: 'Hello, world!'
})
```

在上面的示例中，我们使用 `reactive` 函数创建了一个包含一个 `message` 属性的响应式对象。

2. ref 函数

`ref` 函数是 Vue3.0 中用来创建一个包含单个值的响应式对象的函数。将一个初始值传递给 `ref` 函数，它会返回一个新的响应式对象。响应式对象是一个普通对象，它有一个名为 `value` 的属性，该属性保存了当前值。当 `value` 属性的值发生改变时，Vue3.0 会自动更新应用程序的界面。

例如，我们可以这样使用 `ref` 函数来创建一个响应式对象：

```javascript
import { ref } from 'vue'

const count = ref(0)
```

在上面的示例中，我们使用 `ref` 函数创建了一个包含初始值为 0 的响应式对象。

3. 双向绑定的实现

Vue3.0 中的双向绑定可以通过在模板中使用 `v-model` 指令来实现。`v-model` 指令是 Vue3.0 中用来实现表单元素和组件的双向数据绑定的指令。例如，我们可以这样使用 `v-model` 指令来实现一个表单输入框的双向绑定：

```html
htmlCopy code<template>
 <input v-model="message" />
 <p>{{ message }}</p>
</template>

<script>
 import { ref } from 'vue';

 export default {
 setup() {
 const message = ref('');

 return {
 message
 };
 }
 };
</script>
```

在上面的示例中，我们在模板中使用 `v-model` 指令将输入框和 `message` 响应式对象进行双向绑定。当用户在输入框中输入文本时，`message` 响应式对象的值会自动更新，当 `message` 响应式对象的值发生改变时，界面上的文本也会自动更新。

总之，Vue3.0 使用 `reactive` 和 `ref` 函数来实现数据双向绑定。使用 `reactive` 函数可以创建包含多个属性的响应式对象，使用 `ref` 函数可以创建包含单个值的响应式对象。通过在模板中使用 \`v-model

指令可以实现表单元素和组件的双向数据绑定，将表单元素的值绑定到响应式对象的属性上，当响应式对象的属性值变化时，自动更新绑定的表单元素的值。

除了使用 `v-model` 指令实现双向绑定，Vue3.0 也提供了 `watch` 函数和 `watchEffect` 函数来实现响应式数据的监听和副作用函数的执行。这些函数可以用来监听响应式数据的变化，从而执行特定的操作。下面是一个使用 `watch` 函数监听响应式数据变化的示例：

```html
htmlCopy code<template>
 <div>{{ count }}</div>
 <button @click="increment">Increment</button>
</template>

<script>
 import { ref, watch } from 'vue';

 export default {
 setup() {
 const count = ref(0);

 watch(count, (newVal, oldVal) => {
 console.log(`count changed from ${oldVal} to ${newVal}`);
 });

 const increment = () => {
 count.value++;
 };

 return {
 count,
 increment
 };
 }
 };
</script>
```

在上面的示例中，我们使用 `watch` 函数监听 `count` 响应式对象的变化，当 `count` 响应式对象的值发生变化时，会自动调用回调函数，打印出 `count` 变化前和变化后的值。

另外，Vue3.0 中还提供了 `computed` 函数用来计算一个响应式对象的值，`toRefs` 函数用来将一个响应式对象转换为普通的对象，并且在 TypeScript 中使用时可以使用 `defineComponent` 函数来定义组件的类型，从而提高代码的可读性和可维护性。

## 115 Proxy 和 Object.defineProperty 的区别是啥？

* created_at: 2023-03-15T15:15:55Z
* updated_at: 2023-08-20T07:42:35Z
* labels: JavaScript
* milestone: 中

`Proxy` 和 `Object.defineProperty` 是 JavaScript 中两个不同的特性，它们的作用也不完全相同。

`Object.defineProperty` 允许你在一个对象上定义一个新属性或者修改一个已有属性。通过这个方法你可以精确地定义属性的特征，比如它是否可写、可枚举、可配置等。该方法的使用场景通常是需要在一个对象上创建一个属性，然后控制这个属性的行为。

`Proxy` 也可以用来代理一个对象，但是相比于 `Object.defineProperty`，它提供了更加强大的功能。使用 `Proxy` 可以截获并重定义对象的基本操作，比如访问属性、赋值、函数调用等等。在这些操作被执行之前，可以通过拦截器函数对这些操作进行拦截和修改。因此，通过 `Proxy`，你可以完全重写一个对象的默认行为。该方法的使用场景通常是需要对一个对象的行为进行定制化，或者需要在对象上添加额外的功能。

**对比**

以下是 Proxy 和 Object.defineProperty 的一些区别对比：

| 方面 | Proxy | Object.defineProperty |
|----------|--------------------------------------------------------|-------------------------------------------------------|
| 语法 | 使用 `new Proxy(target, handler)` 创建代理对象 | 直接在对象上使用 `Object.defineProperty(obj, prop, descriptor)` |
| 监听属性变化 | 支持监听整个对象的变化，通过 `get` 和 `set` 方法拦截 | 只能监听单个属性的变化，通过 `get` 和 `set` 方法拦截 |
| 功能拦截 | 可以拦截并重写多种操作，如 `get`、`set`、`deleteProperty` 等 | 只能拦截属性的读取和赋值操作 |
| 可迭代性 | 支持迭代器，可以使用 `for...of`、`Array.from()` 等进行迭代 | 不支持迭代器，无法直接进行迭代操作 |
| 兼容性 | 部分浏览器不支持，如 IE | 相对较好的兼容性，支持大多数现代浏览器 |
| 性能 | 相对较低，因为每次操作都需要经过代理 | 相对较高，因为直接在对象上进行操作 |
| 扩展性 | 可以通过添加自定义的 handler 方法进行扩展 | 不支持扩展，只能使用内置的 `get` 和 `set` 方法拦截 |

需要注意的是，Proxy 和 Object.defineProperty 在功能和用法上存在一些差异，选择使用哪个取决于具体的需求和兼容性要求。

总结来说，`Object.defineProperty` 是用来定义对象的属性，而 `Proxy` 则是用来代理对象并对其进行操作拦截和修改。两者的应用场景不同，但都可以用来对对象的行为进行定制化。

**性能差异**

在性能方面，Proxy和Object.defineProperty存在一些差异。

Proxy的性能通常较Object.defineProperty要慢。这是因为Proxy代理了整个对象，每个对属性的访问都需要经过代理的拦截器。这会导致Proxy的操作相对较慢，特别是在频繁访问属性的情况下。

相比之下，Object.defineProperty仅拦截单个属性的读取和赋值操作，不会对整个对象进行代理。因此，在性能方面，Object.defineProperty通常比Proxy更高效。

然而，性能差异在实际应用中可能并不明显，并且会受到具体的应用场景和浏览器的影响。对于大多数情况，性能差异不是决定使用哪个的主要因素。相反，功能需求和兼容性更可能影响选择Proxy或Object.defineProperty。

**以下是 `Proxy` 和 `Object.defineProperty` 的一些具体应用场景的不同**：

1. `Object.defineProperty` 适用于需要精确地控制对象属性行为的场景，比如控制属性是否可写、可枚举、可配置等。它的应用场景包括但不限于：

* 对象属性访问权限控制；
* 对象属性计算；
* 对象属性懒加载。

2. `Proxy` 适用于需要代理对象并对其进行操作拦截和修改的场景。它的应用场景包括但不限于：

* 对象属性访问控制；
* 对象属性修改控制；
* 对象属性缓存；
* 对象属性计算；
* 对象属性监听；
* 对象属性校验；
* 对象属性劫持等。

总的来说，`Object.defineProperty` 主要用于单个对象属性的控制和修改，而 `Proxy` 则适用于对整个对象或对象的多个属性进行控制和修改。由于 `Proxy` 的功能更加强大，它在一些高级应用场景中比 `Object.defineProperty` 更加适用。但是在一些简单场景下，使用 `Object.defineProperty` 可能更加方便和实用。

## 116 React Diff算法是怎么实现的？

* created_at: 2023-03-15T15:19:56Z
* updated_at: 2023-03-15T15:29:45Z
* labels: JavaScript
* milestone: 资深

 原理

React 中的 Diff 算法，是用于比较新旧两个虚拟 DOM 树，找出需要更新的节点并进行更新的算法。React 的 Diff 算法实现基于以下假设：

1. 两个不同类型的元素会产生不同的树形结构。
2. 对于同一层级的一组子节点，它们可以通过唯一 id 匹配到相同的节点。
3. 每个组件都有一个唯一标识符 key。

基于以上假设，React 的 Diff 算法分为两个阶段：

1. `O(n)` 的遍历，对比新旧两棵树的每一个节点，并记录节点的变更。在这个过程中，React 使用了双端队列（Double-ended queue）作为辅助数据结构，以保证遍历的高效性。
2. `O(k)` 的反向遍历，根据记录的变更列表对 DOM 进行更新。

在第一阶段中，React 的 Diff 算法会从两棵树的根节点开始，依次对比它们的子节点。如果某个节点在新旧两个树中都存在，那么就将其进行更新。如果新树中有新节点，那么就将其插入到旧树中对应的位置。如果旧树中有节点不存在于新树中，那么就将其从 DOM 树中移除。

在第二阶段中，React 会根据记录的变更列表对 DOM 进行更新。这个过程中，React 会按照更新的优先级进行更新，优先更新需要移动的节点，其次更新需要删除的节点，最后再更新需要插入的节点。

需要注意的是，React 的 Diff 算法并不保证一定找到最优解，但是它保证了在大多数情况下，找到的解都是比较优的。同时，React 的 Diff 算法也具有一定的限制，比如无法跨越组件边界进行优化，这也是 React 中尽量避免多层嵌套组件的原因之一。

 代码模拟实现

React diff算法是一种优化算法，用于比较两个虚拟DOM树的差异，以最小化DOM操作的数量，从而提高渲染性能。
以下是一个简单的实现React diff算法的代码：

```js
function diff (oldTree, newTree) {
  const patches = {}
  const index = 0
  walk(oldTree, newTree, index, patches)
  return patches
}

function walk (oldNode, newNode, index, patches) {
  const currentPatch = []

  if (!newNode) {
    currentPatch.push({ type: 'REMOVE' })
  } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
    if (oldNode !== newNode) {
      currentPatch.push({ type: 'TEXT', content: newNode })
    }
  } else if (oldNode.type === newNode.type) {
    const attrs = diffAttrs(oldNode.props, newNode.props)
    if (Object.keys(attrs).length > 0) {
      currentPatch.push({ type: 'ATTRS', attrs })
    }
    diffChildren(oldNode.children, newNode.children, index, patches, currentPatch)
  } else {
    currentPatch.push({ type: 'REPLACE', newNode })
  }

  if (currentPatch.length > 0) {
    patches[index] = currentPatch
  }
}

function diffAttrs (oldAttrs, newAttrs) {
  const attrs = {}
  for (const key in oldAttrs) {
    if (oldAttrs[key] !== newAttrs[key]) {
      attrs[key] = newAttrs[key]
    }
  }
  for (const key in newAttrs) {
    if (!oldAttrs.hasOwnProperty(key)) {
      attrs[key] = newAttrs[key]
    }
  }
  return attrs
}

function diffChildren (oldChildren, newChildren, index, patches, currentPatch) {
  const diffs = listDiff(oldChildren, newChildren, 'key')
  newChildren = diffs.children

  if (diffs.moves.length > 0) {
    const reorderPatch = { type: 'REORDER', moves: diffs.moves }
    currentPatch.push(reorderPatch)
  }

  let lastIndex = index
  oldChildren.forEach((child, i) => {
    const newChild = newChildren[i]
    index = lastIndex + 1
    walk(child, newChild, index, patches)
    lastIndex = index
  })
}

function listDiff (oldList, newList, key) {
  const oldMap = makeKeyIndexAndFree(oldList, key)
  const newMap = makeKeyIndexAndFree(newList, key)

  const newFree = newMap.free

  const moves = []

  const children = []
  let i = 0
  let item
  let itemIndex
  let freeIndex = 0

  while (i < oldList.length) {
    item = oldList[i]
    itemIndex = oldMap.keyIndex[item[key]]
    if (itemIndex === undefined) {
      moves.push({ index: i, type: 'REMOVE' })
    } else {
      children.push(newList[itemIndex])
      if (itemIndex >= freeIndex) {
        freeIndex = itemIndex + 1
      } else {
        moves.push({ index: itemIndex, type: 'INSERT', item })
      }
    }
    i++
  }

  const remaining = newFree.slice(freeIndex)
  remaining.forEach(item => {
    moves.push({ index: newList.indexOf(item), type: 'INSERT', item })
  })

  return { moves, children }
}

function makeKeyIndexAndFree (list, key) {
  const keyIndex = {}
  const free = []
  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item[key] !== undefined) {
      keyIndex[item[key]] = i
    } else {
      free.push(item)
    }
  }
  return { keyIndex, free }
}
```

## 117 css 中 三栏布局的实现方案 的实现方案有哪些？

* created_at: 2023-03-15T15:33:31Z
* updated_at: 2023-03-15T15:33:32Z
* labels: CSS
* milestone: 中

三栏布局指的是在一个页面中，将内容分为左、中、右三栏，并使它们具有相应的宽度和高度。实现三栏布局有多种方案，以下是其中的几种：

1. 使用浮动

```css
cssCopy code.left {
 float: left;
 width: 200px;
 height: 100%;
 background-color: #ccc;
}

.right {
 float: right;
 width: 200px;
 height: 100%;
 background-color: #ccc;
}

.middle {
 margin: 0 200px;
 height: 100%;
 background-color: #eee;
}
```

在这个方案中，左栏和右栏使用浮动来实现，中间栏使用 `margin` 来占据剩余的宽度。

2. 使用绝对定位

```css
cssCopy code.container {
 position: relative;
 height: 100%;
}

.left {
 position: absolute;
 left: 0;
 width: 200px;
 height: 100%;
 background-color: #ccc;
}

.right {
 position: absolute;
 right: 0;
 width: 200px;
 height: 100%;
 background-color: #ccc;
}

.middle {
 position: absolute;
 left: 200px;
 right: 200px;
 height: 100%;
 background-color: #eee;
}
```

在这个方案中，左栏和右栏使用绝对定位来实现，中间栏使用左右 `padding` 来占据剩余的宽度。

3. 使用Flexbox布局

```css
cssCopy code.container {
 display: flex;
 height: 100%;
}

.left {
 width: 200px;
 height: 100%;
 background-color: #ccc;
}

.right {
 width: 200px;
 height: 100%;
 background-color: #ccc;
}

.middle {
 flex: 1;
 height: 100%;
 background-color: #eee;
}
```

在这个方案中，父容器使用Flexbox布局，左、中、右三栏都是Flex项，中间栏使用 `flex: 1` 来占据剩余的宽度。

这些方案都可以实现三栏布局，但每种方案都有自己的优缺点。在选择方案时，需要考虑浏览器兼容性、性能、可维护性和可扩展性等因素。

## 118 浏览器垃圾回收机制？

* created_at: 2023-03-15T15:36:39Z
* updated_at: 2023-08-31T15:25:53Z
* labels: 浏览器
* milestone: 高

浏览器垃圾回收机制是指浏览器在运行时自动回收不再使用的内存空间的过程。以下是浏览器垃圾回收机制的几个方面：

1. `标记清除`：这是一种最常用的垃圾回收机制。它的工作原理是标记所有当前正在使用的对象，然后清除未标记的对象。这种方法的优点是效率高，缺点是可能会导致内存碎片。

2. `引用计数`：这种垃圾回收机制会跟踪每个对象被引用的次数，当引用计数为零时，就会回收该对象。这种方法的优点是可以立即回收不再使用的对象，缺点是无法处理循环引用。

3. `分代回收`：这是一种结合了标记清除和引用计数的垃圾回收机制。它将对象分为几代，然后在不同的代上使用不同的回收策略。新创建的对象会被分配到第一代，随着时间的推移，如果它们仍然存活，它们会被转移到下一代。这种方法的优点是可以更精细地控制回收策略。

浏览器垃圾回收机制可以帮助开发人员避免内存泄漏和减少程序崩溃的风险。不同的浏览器和不同的 JavaScript 引擎实现可能有不同的垃圾回收机制，但它们的基本原理是相似的。

**标记清除**

在JavaScript中，垃圾回收是一种自动管理内存的机制，它负责检测不再被使用的对象，并将其释放以回收内存空间。标记清除法是垃圾回收的一种常见算法。

标记清除法的工作原理如下：

1. 标记阶段：垃圾回收器首先会从根对象开始，递归遍历所有可访问的对象，并给这些对象打上标记。根对象可以是全局对象、当前执行上下文中的变量、正在执行的函数的局部变量等。只有被标记的对象才视为可达的，未被标记的对象则被视为不可达。

2. 清除阶段：在标记阶段完成后，垃圾回收器会遍历堆内存中的所有对象，清除未被标记的对象。这些未被标记的对象是不可达的，即不再被程序所使用。清除后的空间可以用于存储新的对象。

标记清除法的特点包括：

1. 自动触发：JavaScript的垃圾回收是自动触发的，开发人员无需显式地释放内存。

2. 引用计数：标记清除法不会使用引用计数来判断对象的可达性。引用计数是一种简单的垃圾回收算法，它通过记录对象被引用的次数来判断对象是否可达。然而，引用计数法无法解决循环引用的问题。

3. 效率：标记清除法可以高效地回收不再使用的内存空间，但在回收大量内存时可能会导致一段时间的停顿，因为垃圾回收器需要暂停程序的执行来完成清除操作。

**引用计数方式**

在JavaScript中，引用计数是一种常见的垃圾回收算法。它的基本原理是通过对每个对象进行引用计数，来判断对象是否可达。当对象的引用计数为0时，即没有任何引用指向该对象，那么该对象就不再被使用，可以被回收。

引用计数法的工作原理如下：

1. 引用计数：每当一个对象被创建时，都会给该对象的引用计数设置为1。当有其他变量引用该对象时，引用计数会增加。当变量不再引用该对象时，引用计数会减少。

2. 循环引用：引用计数法无法解决循环引用的问题。循环引用指的是两个或多个对象互相引用，导致它们的引用计数都不为0，即使这些对象都不再被程序所使用，也无法回收它们。这是因为循环引用导致对象的引用计数无法归零，垃圾回收器无法判断它们是否可达。

3. 垃圾回收：垃圾回收器会定期执行垃圾回收操作，检查所有对象的引用计数。当一个对象的引用计数为0时，垃圾回收器会将其认定为垃圾对象，可以将其回收以释放内存空间。

4. 回收操作：当一个对象被回收时，垃圾回收器会释放对象所占用的内存空间，并且递归地减少该对象引用的所有其他对象的引用计数。如果被减少的对象引用计数归零，则继续回收该对象。这个过程会不断地进行，直到所有的垃圾对象都被回收。

## 119 vue 的 keep-alive 的原理是啥？

* created_at: 2023-03-19T12:38:30Z
* updated_at: 2023-10-01T13:50:21Z
* labels: web框架
* milestone: 中

`<keep-alive>` 是 Vue.js 提供的一个抽象组件，它可以使被包含的组件保留在内存中，而不是每次重新渲染的时候销毁并重建，从而提高了应用的性能。

具体来说，`<keep-alive>` 的实现原理如下：

1. 当一个组件被包裹在 `<keep-alive>` 组件内时，它会被缓存起来，而不是被销毁。
2. 如果这个组件被包裹的父组件从它的视图中移除，那么这个组件不会被销毁，而是被缓存起来。
3. 如果这个组件再次被包裹的父组件添加回视图中，那么它会被重新激活，而不是重新创建。

`<keep-alive>` 组件通过一个内部的缓存对象来缓存组件实例，这个缓存对象会在组件被包裹在 `<keep-alive>` 组件中时创建。当一个被缓存的组件需要被激活时，`<keep-alive>` 组件会从缓存中取出该组件的实例并将其挂载到视图上，从而实现了组件的复用。

需要注意的是，被缓存的组件并不是一直存在于内存中，它们会在一定条件下被销毁，比如缓存的组件数量超过了一定的阈值，或者系统内存占用过高等。

## 120 常见的 web 前端网路攻击有哪些？

* created_at: 2023-03-19T13:00:42Z
* updated_at: 2023-03-19T13:00:43Z
* labels: 网络
* milestone: 高

以下是一些常见的 web 前端网络攻击类型：

1. 跨站脚本攻击（Cross-Site Scripting, XSS）：XSS攻击利用了 Web 应用程序对用户输入的不当处理，以将恶意代码注入到 Web 页面中。当用户访问包含恶意代码的页面时，攻击者可以利用这些代码窃取用户的敏感信息、劫持用户会话等。

2. 跨站请求伪造（Cross-Site Request Forgery, CSRF）：CSRF攻击利用了用户已经登录了受信任网站的身份，通过在受害者的浏览器中执行恶意代码，将伪造的请求发送到受信任网站上，从而执行某些操作或者获取某些信息。

3. 点击劫持（Clickjacking）：点击劫持是一种利用透明 iframe 层来覆盖网页上的其他内容，欺骗用户点击不可见的按钮或链接，以执行攻击者所需的操作。

4. HTML 注入攻击：HTML 注入攻击利用了 Web 应用程序对用户输入的不当处理，以将恶意的 HTML 代码插入到 Web 页面中。这种攻击通常被用来修改页面内容、欺骗用户或者实施其他恶意行为。

5. 敏感数据泄露（Sensitive Data Leakage）：敏感数据泄露可能会发生在 Web 应用程序中，其中攻击者可以通过暴力破解、SQL 注入等攻击方式，获取存储在数据库中的敏感数据（如用户名、密码、信用卡信息等）。

6. 带宽滥用（Bandwidth Abuse）：带宽滥用是指攻击者利用 Web 应用程序或服务器的漏洞来消耗服务器的资源和带宽，从而使服务器变得缓慢或无法正常工作。

7. HTTP 请求欺骗（HTTP Request Spoofing）：HTTP 请求欺骗是一种利用 Web 应用程序对输入的不当处理，以篡改 HTTP 请求的攻击方式。攻击者可以通过伪造 HTTP 请求头信息、修改 HTTP 请求方法等方式，欺骗 Web 应用程序执行攻击者所需的操作。

需要注意的是，这些攻击类型通常会结合使用，攻击者会利用多种攻击方式，以更好地实现攻击目标。

## 121 如何防止 跨站脚本攻击（Cross-Site Scripting, XSS）?

* created_at: 2023-03-19T13:15:34Z
* updated_at: 2023-03-19T13:15:34Z
* labels: 网络
* milestone: 高

以下是一些防范跨站脚本攻击的常见方法：

1. 输入过滤：对于所有输入的数据（如表单数据、URL 参数等），应该进行过滤和验证。特别是对于敏感数据（如密码、信用卡信息等），应该进行严格的验证，防止恶意的脚本注入。可以使用一些开源的输入验证工具，如OWASP ESAPI来过滤恶意输入。

2. 对特殊字符进行转义：对于所有输出到页面上的数据，应该对特殊字符进行转义，比如将 `<` 转义为 `<`、将 `>` 转义为 `>` 等。这可以防止攻击者通过在页面上注入恶意的脚本。

3. CSP（Content Security Policy）：CSP是一种浏览器安全机制，可以限制 Web 页面可以加载哪些资源。通过设置合适的 CSP，可以防止恶意脚本的注入。

4. HttpOnly Cookie：通过设置 HttpOnly 标志，可以防止脚本访问 Cookie。这可以防止攻击者窃取用户的身份验证信息。

5. 随机化 Session ID：在用户登录后，应该为其分配一个随机化的 Session ID，防止攻击者通过猜测 Session ID 来劫持用户会话。

6. 使用安全的编程语言和框架：使用安全的编程语言和框架可以降低跨站脚本攻击的风险。比如使用最新的版本的编程语言和框架，以获得更好的安全性。

需要注意的是，防范跨站脚本攻击需要综合多种方法，单一的措施并不能完全防止攻击。此外，开发人员应该始终关注最新的安全漏洞和攻击技术，及时采取相应的防范措施。

## 122 跨站请求伪造（Cross-Site Request Forgery, CSRF）具体实现步骤是啥， 如何防止？

* created_at: 2023-03-19T13:18:38Z
* updated_at: 2023-03-19T13:18:39Z
* labels: 网络
* milestone: 高

跨站请求伪造（Cross-Site Request Forgery, CSRF）是一种常见的网络攻击方式，攻击者可以利用已登录的用户身份，通过伪造用户的请求，对服务器上的资源进行非法操作。下面是一种常见的 CSRF 攻击方式：

1. 用户在浏览器中登录了某个网站，并获取了该网站的 Cookie。

2. 攻击者诱导用户访问一个恶意网站，并在该网站上放置了一段恶意代码，用于发起 CSRF 攻击。

3. 当用户在恶意网站上执行某个操作时，比如点击某个按钮或链接，恶意代码会自动向目标网站发送一个 HTTP 请求，请求中包含攻击者想要执行的操作和参数，同时也会携带用户的 Cookie。

4. 目标网站接收到请求后，会认为这是一个合法的请求，因为它携带了用户的 Cookie。于是服务器会执行攻击者想要的操作，比如删除用户的数据、修改用户的密码等。

为了防止 CSRF 攻击，开发人员可以采取以下措施：

1. 随机化 Token：为每个请求生成一个随机化的 Token，将 Token 放入表单中，并在服务器端进行验证。这可以防止攻击者伪造合法的请求。

2. 使用 Referer 验证：在服务器端进行 Referer 验证，只允许来自合法来源的请求。这可以防止攻击者在自己的网站上放置恶意代码，进行 CSRF 攻击。

3. 使用验证码：在某些敏感操作上，比如修改密码、删除数据等，可以要求用户输入验证码。这可以降低攻击者的成功率，因为攻击者很难获取验证码。

需要注意的是，以上措施并不能完全防止 CSRF 攻击，因为攻击者总是可以通过一些复杂的方法来规避这些防御措施。因此，开发人员需要综合考虑多种防范措施，以提高网站的安全性。

## 123 script 标签 defer 和 async 区别？

* created_at: 2023-03-19T13:22:06Z
* updated_at: 2023-03-19T13:26:23Z
* labels: 浏览器
* milestone: 高

`defer` 和 `async` 是用于控制脚本加载和执行的 HTML `<script>` 标签属性。

`defer` 和 `async` 的主要区别在于它们对脚本的加载和执行的影响。

* `defer` 属性告诉浏览器立即下载脚本，但延迟执行，等到文档加载完成后再按照它们在页面中出现的顺序依次执行。这意味着脚本不会阻止文档的解析和渲染，并且它们也不会阻止其他脚本的执行。如果多个脚本都使用 `defer` 属性，则它们将按照它们在页面中出现的顺序依次执行。

* `async` 属性告诉浏览器立即下载脚本，但它们不一定按照它们在页面中出现的顺序执行。它们将在下载完成后立即执行。这意味着脚本不会阻止文档的解析和渲染，但可能会阻止其他脚本的执行。如果多个脚本都使用 `async` 属性，则它们将按照它们下载完成的顺序依次执行。

需要注意的是，当使用 `defer` 和 `async` 属性时，浏览器的支持情况可能不同。一些较旧的浏览器可能不支持这些属性，或者仅支持 `defer` 而不支持 `async`。因此，为了确保脚本的兼容性，建议在使用 `defer` 和 `async` 属性时，同时提供一个备用脚本，并考虑使用特性检测来检查浏览器是否支持这些属性。

## 124 Vue 中 $nextTick 作用与原理是啥？

* created_at: 2023-03-19T13:24:06Z
* updated_at: 2023-03-19T13:24:07Z
* labels: web框架
* milestone: 高

`$nextTick` 是 Vue.js 提供的一个实例方法，用于在 DOM 更新之后执行一些操作。具体来说，它会将回调函数推迟到下次 DOM 更新循环之后执行。

在 Vue 中，数据变化时，Vue 会异步执行视图更新。例如，当一个数据变化时，Vue 会将这个变化包装成一个更新任务，并将其推入更新队列。Vue 会在下一个事件循环周期中遍历这个队列，并依次执行更新任务，最终将视图更新为最新状态。

在某些情况下，我们需要在 DOM 更新之后执行一些操作，例如在 Vue 中更新 DOM 后获取更新后的元素尺寸、在 Vue 组件中调用子组件的方法等等。如果直接在数据变化后立即执行这些操作，可能会遇到一些问题，例如元素尺寸并未更新，子组件尚未完全挂载等等。这时候，就需要使用 `$nextTick` 方法。

`$nextTick` 的实现原理是利用了 JavaScript 的事件循环机制。具体来说，当调用 `$nextTick` 方法时，Vue 会将回调函数推入一个回调队列中。在下一个事件循环周期中，Vue 会遍历这个回调队列，并依次执行其中的回调函数。由于在这个时候 DOM 已经完成了更新，因此可以安全地执行需要在 DOM 更新之后进行的操作。

需要注意的是，`$nextTick` 是异步执行的，因此不能保证回调函数会立即执行。如果需要等待 `$nextTick` 的回调函数执行完毕后再继续执行某些操作，可以使用 Promise 或 async/await 来等待异步操作的完成。

## 125 当使用 new 关键字创建对象时, 会经历哪些步骤？

* created_at: 2023-03-19T13:30:24Z
* updated_at: 2023-03-19T13:30:24Z
* labels: JavaScript
* milestone: 中

在 JavaScript 中，`new` 关键字用于创建一个对象实例。当使用 `new` 关键字创建对象时，会发生以下几个步骤：

1. 创建一个空的对象。
2. 将这个空对象的 `[[Prototype]]` 属性设置为构造函数的 `prototype` 属性。
3. 将这个空对象赋值给构造函数内部的 `this` 关键字，用于初始化属性和方法。
4. 如果构造函数返回一个对象，那么返回这个对象；否则，返回第一步创建的对象实例。

以下是一个示例，演示如何使用 `new` 关键字创建一个对象实例：

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}

const person = new Person('John', 30)
console.log(person.name) // "John"
console.log(person.age) // 30
```

在上面的示例中，`new Person("John", 30)` 会创建一个新的对象实例。在构造函数 `Person` 中，`this.name` 和 `this.age` 会被赋值为 `"John"` 和 `30`。最终，`new` 关键字会返回这个新的对象实例。

需要注意的是，在 JavaScript 中，函数也是对象。因此，我们可以向对象一样定义属性和方法。当我们使用 `new` 关键字调用一个函数时，这个函数会被视为构造函数，从而创建一个新的对象实例。

## 126 es5 和 es6 使用 new 关键字实例化对象的流程是一样的吗？

* created_at: 2023-03-19T13:34:48Z
* updated_at: 2023-03-19T13:34:49Z
* labels: JavaScript
* milestone: 中

ES5 和 ES6 使用 `new` 关键字实例化对象的流程基本上是一样的，只是在细节上存在一些差异。

在 ES5 中，当使用 `new` 关键字调用一个函数时，会创建一个新的对象，并将这个新对象的 `[[Prototype]]` 属性指向构造函数的 `prototype` 属性。此外，`new` 关键字还会将构造函数内部的 `this` 关键字绑定到新创建的对象上，从而允许我们在构造函数内部添加属性和方法。

在 ES6 中，这些基本的流程也是相同的。但是，ES6 引入了类（class）的概念，从而为面向对象编程提供了更加便利的语法。使用类定义一个对象时，需要使用 `constructor` 方法作为构造函数，而不是普通的函数。类定义的语法糖实际上是对函数的封装，使用 `new` 关键字创建类的实例时，实际上也是在调用类的 `constructor` 方法。

在 ES6 中，可以使用类的继承来创建更复杂的对象。当使用 `new` 关键字创建一个继承自另一个类的类的实例时，会先调用父类的 `constructor` 方法，再调用子类的 `constructor` 方法，从而完成对象实例的创建过程。

需要注意的是，虽然 ES6 的类看起来像是其他面向对象语言中的类，但在 JavaScript 中，类仍然是基于原型继承的。在创建一个类的实例时，实际上是在创建一个新对象，并将这个新对象的原型指向类的原型。因此，实例化对象的流程与使用普通函数或类定义的对象的流程基本上是相同的。

## 127 如何实现可过期的 localstorage 数据?

* created_at: 2023-03-19T13:36:22Z
* updated_at: 2024-10-26T08:28:47Z
* labels: JavaScript
* milestone: 中

以下是一个封装了支持过期时间的`localStorage`的示例代码：

```javascript
class EnhancedLocalStorage {
  constructor () {
    this.prefix = 'enhanced_storage_'
  }

  setItem (key, value, expirationInSeconds) {
    const item = {
      value,
      expirationTime: expirationInSeconds ? Date.now() + expirationInSeconds1000 : null
    }
    localStorage.setItem(this.prefix + key, JSON.stringify(item))
  }

  getItem (key) {
    const itemStr = localStorage.getItem(this.prefix + key)
    if (!itemStr) return null
    const item = JSON.parse(itemStr)
    if (item.expirationTime && item.expirationTime < Date.now()) {
      localStorage.removeItem(this.prefix + key)
      return null
    }
    return item.value
  }

  removeItem (key) {
    localStorage.removeItem(this.prefix + key)
  }
}

const enhancedStorage = new EnhancedLocalStorage()
export default enhancedStorage
```

使用方法如下：

```javascript
// 设置带有过期时间的存储项
enhancedStorage.setItem('myKey', 'myValue', 60) // 60 秒后过期

// 获取存储项
const value = enhancedStorage.getItem('myKey')
console.log(value)

// 一段时间后，存储项过期
setTimeout(() => {
  const expiredValue = enhancedStorage.getItem('myKey')
  console.log(expiredValue) // null
}, 65000)
```

在这个封装中，使用了一个自定义的前缀来避免与普通的`localStorage`键冲突。设置项时，会记录一个过期时间，如果有过期时间且当前时间超过了过期时间，在获取项时会返回`null`并自动删除该项。

## 128 axios的拦截器原理及应用、简单手写核心逻辑？

* created_at: 2023-03-19T14:05:59Z
* updated_at: 2023-03-19T14:06:00Z
* labels: web框架
* milestone: 高

 axios 拦截器的使用

Axios 是一个基于 Promise 的 HTTP 客户端库，可以用于浏览器和 Node.js 环境中发送 HTTP 请求。Axios 提供了拦截器机制，可以在请求发送前和响应返回后对请求和响应进行拦截和处理，从而实现一些通用的功能，例如：添加请求头、添加认证信息、显示 loading 状态、错误处理等。

Axios 的拦截器机制主要是通过 `interceptors` 属性来实现的，该属性包含了 `request` 和 `response` 两个对象，分别代表请求拦截器和响应拦截器。每个对象都包含 `use` 方法，该方法用于注册拦截器回调函数，拦截器回调函数会在请求发送前或响应返回后被调用。

下面是一个示例代码，展示了如何使用 Axios 的拦截器：

```javascript
import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log('请求拦截器')
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log('响应拦截器')
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 发送请求
axios.get('/api/user')
  .then(function (response) {
    // 处理响应数据
  })
  .catch(function (error) {
    // 处理请求错误
  })
```

在上面的代码中，我们首先通过 `import` 语句引入了 Axios 库。然后，我们调用 `axios.interceptors.request.use` 方法注册了一个请求拦截器回调函数，该函数会在发送请求前被调用，可以在该函数中进行一些通用的操作，例如添加请求头、添加认证信息等。接着，我们调用 `axios.interceptors.response.use` 方法注册了一个响应拦截器回调函数，该函数会在响应返回后被调用，可以在该函数中进行一些通用的操作，例如显示 loading 状态、错误处理等。

最后，我们使用 `axios.get` 方法发送请求，并通过 `then` 和 `catch` 方法处理响应数据和请求错误。在请求发送前和响应返回后，我们注册的拦截器回调函数会被自动调用，可以对请求和响应进行拦截和处理。

Axios 的拦截器机制非常强大，可以用于实现一些通用的功能，例如添加请求头、添加认证信息、显示 loading 状态、错误处理等。在实际开发中，我们经常会使用 Axios 的拦截器来提高代码的复用性和可维护性。

 axios 拦截器原理

Axios 的拦截器机制是通过 `interceptors` 属性来实现的，该属性包含了 `request` 和 `response` 两个对象，分别代表请求拦截器和响应拦截器。每个对象都包含 `use` 方法，该方法用于注册拦截器回调函数，拦截器回调函数会在请求发送前或响应返回后被调用。

具体来说，当我们使用 `axios` 发送请求时，会先调用请求拦截器的回调函数，该函数会在请求发送前被调用，可以在该函数中进行一些通用的操作，例如添加请求头、添加认证信息等。如果请求拦截器返回的不是一个 Promise 对象，则会自动将其封装为一个 Promise 对象。

接着，Axios 会使用 XMLHTTPRequest 对象发送请求，并监听其状态变化事件。当响应返回后，Axios 会调用响应拦截器的回调函数，该函数会在响应返回后被调用，可以在该函数中进行一些通用的操作，例如显示 loading 状态、错误处理等。如果响应拦截器返回的不是一个 Promise 对象，则会自动将其封装为一个 Promise 对象。

需要注意的是，Axios 的拦截器是按照添加顺序依次执行的，也就是说，先添加的拦截器回调函数先执行，后添加的拦截器回调函数后执行。如果一个拦截器回调函数中没有调用 `next` 方法，则后面的拦截器回调函数将不会被执行。

下面是一个示例代码，展示了如何使用 Axios 的拦截器：

```javascript
import axios from 'axios'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log('请求拦截器')
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log('响应拦截器')
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 发送请求
axios.get('/api/user')
  .then(function (response) {
    // 处理响应数据
  })
  .catch(function (error) {
    // 处理请求错误
  })
```

在上面的代码中，我们首先通过 `import` 语句引入了 Axios 库。然后，我们调用 `axios.interceptors.request.use` 方法注册了一个请求拦截器回调函数，该函数会在发送请求前被调用，可以在该函数中进行一些通用的操作，例如添加请求头、添加认证信息等。接着，我们调用 `axios.interceptors.response.use` 方法注册了一个响应拦

 axios 拦截器核心逻辑代码实现

下面是一个简单实现 Axios 拦截器核心逻辑的示例代码：

```javascript
class Axios {
  constructor () {
    // 请求拦截器
    this.requestInterceptors = []
    // 响应拦截器
    this.responseInterceptors = []
  }

  // 注册请求拦截器
  useRequestInterceptor (callback) {
    this.requestInterceptors.push(callback)
  }

  // 注册响应拦截器
  useResponseInterceptor (callback) {
    this.responseInterceptors.push(callback)
  }

  // 发送请求
  async request (config) {
    // 执行请求拦截器
    for (const interceptor of this.requestInterceptors) {
      config = await interceptor(config)
    }

    // 发送请求
    const response = await fetch(config.url, {
      method: config.method,
      headers: config.headers,
      body: config.data
    })

    // 执行响应拦截器
    for (const interceptor of this.responseInterceptors) {
      response = await interceptor(response)
    }

    return response
  }
}

// 创建 Axios 实例
const axios = new Axios()

// 注册请求拦截器
axios.useRequestInterceptor(config => {
  // 在请求头中添加认证信息
  config.headers.Authorization = 'Bearer xxx'
  return config
})

// 注册响应拦截器
axios.useResponseInterceptor(response => {
  // 处理响应数据
  return response.json()
})

// 发送请求
axios.request({
  url: '/api/user',
  method: 'GET'
}).then(data => {
  // 处理响应数据
  console.log(data)
}).catch(error => {
  // 处理请求错误
  console.error(error)
})
```

在上面的代码中，我们首先定义了一个 `Axios` 类，该类包含了请求拦截器和响应拦截器两个属性，分别用于保存注册的拦截器回调函数。然后，我们定义了 `useRequestInterceptor` 和 `useResponseInterceptor` 两个方法，用于注册请求拦截器和响应拦截器回调函数。在这两个方法中，我们将回调函数保存到对应的属性中。

接着，我们定义了 `request` 方法，该方法用于发送请求。在 `request` 方法中，我们首先执行请求拦截器回调函数，将请求配置传递给回调函数，并将回调函数返回的结果赋值给请求配置。接着，我们使用 `fetch` 函数发送请求，并将响应保存到 `response` 变量中。然后，我们执行响应拦截器回调函数，将响应对象传递给回调函数，并将回调函数返回的结果赋值给响应对象。最后，我们返回响应对象。

在最后几行代码中，我们创建了一个 `axios` 实例，并使用 `useRequestInterceptor` 方法和 `useResponseInterceptor` 方法注册了请求拦截器和响应拦截器回调函数。然后，我们调用 `request` 方法发送请求，并使用 `then` 方法处理响应数据，使用 `catch` 方法处理请求错误。

## 129 有什么方法可以保持前后端实时通信？

* created_at: 2023-03-19T14:08:54Z
* updated_at: 2023-03-19T14:08:54Z
* labels: 网络
* milestone: 高

实时通信是一种双向的通信方式，前后端都能实时地获取对方的数据和状态变化，目前主要有以下几种方法可以实现：

1. WebSocket：WebSocket 是一种基于 TCP 协议的双向通信协议，它可以在客户端和服务器之间建立持久性的连接，并且支持服务器主动向客户端推送数据。WebSocket 协议通过 HTTP 协议的 101 状态码进行握手，握手成功后，客户端和服务器之间的通信就不再使用 HTTP 协议，而是使用 WebSocket 协议。WebSocket 协议具有低延迟、高效、实时等优点，适用于实时通信、在线游戏、股票行情等场景。

2. Server-Sent Events（SSE）：SSE 是一种基于 HTTP 协议的服务器推送技术，它允许服务器向客户端推送文本数据或事件数据，而无需客户端发起请求。SSE 协议通过 HTTP 的长连接机制实现服务器向客户端的推送，客户端通过 EventSource API 接口接收服务器推送的数据。SSE 协议比较简单，实现也比较容易，适用于需要推送数据而不需要客户端与服务器进行双向通信的场景。

3. 长轮询（Long Polling）：长轮询是一种基于 HTTP 协议的服务器推送技术，它通过客户端向服务器发送一个长时间的请求，服务器在有数据更新时返回响应，否则将一直等待一段时间后才返回响应。客户端收到响应后立即发起下一次请求。长轮询比较容易实现，适用于需要实时通知客户端数据变化但不需要高实时性的场景。

4. WebRTC：WebRTC 是一种实时通信协议，它基于 P2P 技术，可以在浏览器之间直接建立通信，并实现视频、音频、数据等多媒体的实时传输。WebRTC 协议支持点对点通信，不需要经过服务器转发，因此具有低延迟、高效、实时等优点，适用于实时视频、音频等场景。

总的来说，WebSocket 和 SSE 协议适用于需要服务器主动向客户端推送数据的场景，长轮询适用于需要实时通知客户端数据变化但不需要高实时性的场景，WebRTC 协议适用于实时视频、音频等场景。选择哪种方法要根据具体的业务场景和需求来决定。

## 130 react 遍历渲染节点列表， 为什么要加 key ?

* created_at: 2023-03-19T14:43:47Z
* updated_at: 2023-03-19T14:47:57Z
* labels: web框架
* milestone: 高

在 React 中，当我们使用数组渲染节点列表时，通常需要给每个节点添加一个 `key` 属性，这是因为 React 需要通过 `key` 属性来判断是否需要更新某个节点，从而提高渲染性能。

具体来说，React 在进行更新时，会根据 `key` 属性来判断哪些节点需要更新，哪些节点需要删除，哪些节点需要新增。如果两个节点的 `key` 值相同，则 React 认为它们是同一个节点，会尝试进行复用，否则会销毁旧节点并创建新节点。如果没有 `key` 属性，React 无法判断哪些节点是同一个节点，就需要进行全量更新，这会导致性能下降。

另外，添加 `key` 属性还可以解决一些潜在的问题。例如，当我们通过 `map` 函数生成节点列表时，如果没有给节点添加 `key` 属性，当列表中的某个节点发生变化时，可能会导致其他节点的 `props` 或状态也被重置。如果给每个节点添加了唯一的 `key` 属性，就可以避免这种问题。

因此，总的来说，为节点列表添加 `key` 属性可以提高渲染性能，并避免潜在的问题。

## 131 react lazy import 实现懒加载的原理是什么？

* created_at: 2023-03-19T14:47:35Z
* updated_at: 2023-03-19T14:47:35Z
* labels: web框架
* milestone: 高

React 的 `lazy` 函数可以实现代码分割，即将代码按需加载，以达到优化页面加载速度的目的。它的原理是基于 JavaScript 的动态 `import()` 方法实现的。

当我们使用 `lazy` 函数加载一个组件时，React 会自动将该组件的代码单独打包成一个单独的 JavaScript 文件，并在需要时通过网络请求加载该文件。具体来说，`lazy` 函数返回的是一个特殊的组件，该组件在加载时会调用传入的函数并异步加载组件代码。一般来说，我们会将异步加载的组件通过 `import()` 方法引入，例如：

```js
jsCopy codeconst MyComponent = React.lazy(() => import('./MyComponent'));
```

这里的 `import()` 方法会返回一个 Promise，该 Promise 在组件代码加载完成后会 resolve，然后通过 React 渲染该组件。

需要注意的是，由于异步加载组件的代码是在运行时执行的，而不是在构建时，因此需要使用符合 ECMAScript 标准的动态 `import()` 方法。此外，在使用 `lazy` 函数时还需要将组件包裹在 `Suspense` 组件中，以处理组件加载时的占位符或错误状态。例如：

```js
jsCopy codeimport React, { lazy, Suspense } from 'react';

const MyComponent = lazy(() => import('./MyComponent'));

function App() {
 return (
 <div>
 <Suspense fallback={<div>Loading...</div>}>
 <MyComponent />
 </Suspense>
 </div>
 );
}
```

这里的 `fallback` 属性指定了组件加载时的占位符，当组件加载完成后会自动替换成真正的组件。

综上所述，React 的 `lazy` 函数通过使用动态 `import()` 方法实现了组件代码的按需加载，以达到优化页面加载速度的目的。

## 132 React setState 是同步还是异步的？

* created_at: 2023-03-19T14:52:06Z
* updated_at: 2023-10-04T10:21:43Z
* labels: web框架
* milestone: 中

在 React 中，`setState` 方法有时是异步的，有时是同步的，具体取决于使用方式和环境。

当我们在 React 中调用 `setState` 方法时，React 会将新状态合并到组件的状态队列中，并在未来的某个时间更新组件的状态。这个更新过程是异步的，即不能保证在 `setState` 调用后立即更新状态，而是会将状态更新推迟到下一个渲染周期中。这种情况下，`setState` 方法会返回一个 `Promise` 对象，但该对象不包含任何有用的信息。

然而，当 `setState` 方法被直接调用，而不是在事件处理函数、异步代码或生命周期函数中被调用时，更新过程是同步的。在这种情况下，React 会立即更新组件的状态，并在更新后立即执行一次重新渲染。这种情况下，`setState` 方法不会返回任何信息。

需要注意的是，在 React 中异步更新状态的机制可以提高性能和优化页面渲染速度，因为它可以让 React 在适当的时候批量更新组件状态，从而避免过多的渲染和浏览器的性能问题。如果我们需要在更新状态后立即执行某些操作，可以使用 `setState` 方法的回调函数或生命周期函数 `componentDidUpdate` 来实现。例如：

```js
jsCopy codeclass MyComponent extends React.Component {
 constructor(props) {
 super(props);
 this.state = { count: 0 };
 }

 handleClick() {
 this.setState({ count: this.state.count + 1 }, () => {
 console.log('New count:', this.state.count);
 });
 }

 render() {
 return (
 <div>
 <p>Count: {this.state.count}</p>
 <button onClick={() => this.handleClick()}>Increment</button>
 </div>
 );
 }
}
```

这里的 `setState` 方法接受一个回调函数作为第二个参数，在状态更新完成后调用该函数并传递更新后的状态作为参数。在这个回调函数中可以执行任何需要在状态更新后立即执行的操作，例如输出调试信息、发送网络请求等。

---------------------
> 2023.04.19 更新

如果**直接在setState后面获取state的值是获取不到的。**

* 在React内部机制能检测到的地方， setState就是异步的；
* 在React检测不到的地方，例如 原生事件`addEventListener`,`setInterval`,`setTimeout`，setState就是同步更新的

setState并不是单纯的异步或同步，这其实与调用时的环境相关

* 在合成事件 和 生命周期钩子(除componentDidUpdate) 中，setState是"异步"的；
* 在 原生事件 和setTimeout 中，setState是同步的，可以马上获取更新后的值；

**批量更新**
多个顺序的setState不是同步地一个一个执行滴，会一个一个加入队列，然后最后一起执行。在 合成事件 和 生命周期钩子 中，setState更新队列时，存储的是 合并状态(Object.assign)。因此前面设置的 key 值会被后面所覆盖，最终只会执行一次更新。

**异步现象原因**

`setState 的“异步”并不是说内部由异步代码实现`，其实本身执行的过程和代码都是同步的，只是合成事件和生命钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，`当然可以通过第二个参数setState(partialState, callback)中的callback拿到更新后的结果。`

`setState 并非真异步，只是看上去像异步。在源码中，通过 isBatchingUpdates 来判断`

setState调用流程：

1. 调用this.setState(newState)
2. 将新状态newState存入pending队列
3. 判断是否处于batch Update（isBatchingUpdates是否为true）

* isBatchingUpdates=true，保存组件于dirtyComponents中，走异步更新流程，合并操作，延迟更新；
* isBatchingUpdates=false，走同步过程。遍历所有的dirtyComponents，调用updateComponent，更新pending state or props

![流程](https://foruda.gitee.com/images/1681866680280312338/0308d34b_7819612.png)

**为什么直接修改this.state无效**

setState本质是通过一个队列机制实现state更新的。 执行setState时，会将需要更新的state合并后放入状态队列，而不会立刻更新state，队列机制可以批量更新state。

如果不通过setState而直接修改this.state，那么这个state不会放入状态队列中，下次调用setState时对状态队列进行合并时，会忽略之前直接被修改的state，这样我们就无法合并了，而且实际也没有把你想要的state更新上去

参考文档：

* [资料](https://juejin.cn/post/7204307381689532474#heading-5)

## 133 react 18 版本中 setState 是同步还是异步的？

* created_at: 2023-03-19T14:55:03Z
* updated_at: 2023-10-04T10:21:06Z
* labels: web框架
* milestone: 中

在 React 18 中，`setState` 的行为仍然是异步的。React 团队并没有改变 `setState` 的默认行为，因为这会带来一些潜在的性能问题和不确定性。异步更新状态可以让 React 在适当的时候批量更新组件状态，从而避免过多的渲染和浏览器的性能问题。

但是，React 18 引入了一个新的特性：批量更新（Batching）。当我们在事件处理函数、异步代码或生命周期函数中调用 `setState` 时，React 会将多个状态更新合并到同一个批次中，从而减少渲染的次数，提高应用的性能。这意味着，即使我们在多个地方调用 `setState` 方法，React 也会将这些调用合并到同一个更新队列中，并在下一个渲染周期中一次性更新所有状态。

在 React 18 中，我们可以使用新的 `startTransition` API 来告诉 React，我们正在进行一次可中断的异步操作，并且希望在操作完成后批量更新组件状态。这个 API 的用法如下：

```js
jsCopy codeimport { startTransition } from 'react';

function handleClick() {
 startTransition(() => {
 setState({ count: count + 1 });
 // 执行其他异步操作
 });
}
```

在这个例子中，我们通过 `startTransition` API 包装 `setState` 和其他异步操作，告诉 React 我们正在进行一次可中断的异步操作，并且希望在操作完成后批量更新组件状态。这样做可以让我们的应用更加流畅和响应，并且可以提高用户体验。

需要注意的是，`startTransition` API 并不是必须的，如果我们不使用这个 API，React 仍然会在适当的时候批量更新组件状态。这个 API 只是为了让我们更加精确地控制更新的时机，并在必要时进行优化。

## 134 【React】合成事件了解多少

* created_at: 2023-03-19T14:57:58Z
* updated_at: 2023-03-19T14:57:59Z
* labels: web框架
* milestone: 中

在 React 中，合成事件是一种封装了浏览器原生事件对象的高级事件机制。它是由 React 提供的一种用于处理事件的抽象层，可以让开发者更方便地处理和管理事件。

React 的合成事件机制提供了一些优秀的特性：

1. 跨浏览器兼容性：React 的合成事件可以屏蔽浏览器的差异，保证在各种浏览器上运行一致。

2. 性能优化：React 的合成事件可以对事件进行池化处理，重用事件对象，避免创建大量的事件对象，从而提高性能。

3. 事件委托：React 的合成事件可以实现事件委托机制，将事件处理程序绑定在组件树的根节点上，统一管理和处理组件内部和外部的事件，从而避免多次绑定事件处理程序的问题。

4. 支持自定义事件：React 的合成事件可以支持自定义事件，开发者可以自定义组件事件，提供更多的自定义能力。

React 的合成事件机制通过事件冒泡和事件委托来实现。当在组件中触发事件时，React 会将该事件包装成一个合成事件对象，并在组件树中冒泡传递，直到根节点处。在组件树中，React 使用事件委托机制将事件处理程序绑定到根节点上，统一处理所有组件的事件。

在处理合成事件时，React 提供了一些常用的事件处理函数，例如 `onClick`、`onMouseOver`、`onSubmit` 等，可以在组件中直接使用。此外，开发者还可以自定义事件处理函数，通过 `on` 前缀加上事件名称的方式来绑定自定义事件。例如，我们可以定义一个 `onCustomEvent` 方法来处理自定义事件：

```jsx
jsxCopy codeclass MyComponent extends React.Component {
 handleCustomEvent() {
 // 处理自定义事件
 }

 render() {
 return (
 <div>
 <button onClick={this.handleCustomEvent}>触发自定义事件</button>
 </div>
 );
 }
}
```

在这个例子中，我们定义了一个名为 `handleCustomEvent` 的方法来处理自定义事件，然后在组件中通过 `onClick` 属性来绑定该方法。当用户点击按钮时，React 会将该事件包装成一个合成事件对象，并调用 `handleCustomEvent` 方法来处理事件。

## 135 【React】绑定事件的原理是什么？

* created_at: 2023-03-19T15:00:05Z
* updated_at: 2023-03-19T15:00:06Z
* labels: web框架
* milestone: 中

在 React 中，绑定事件的原理是基于合成事件（SyntheticEvent）的机制。合成事件是一种由 React 自己实现的事件系统，它是对原生 DOM 事件的封装和优化，提供了一种统一的事件处理机制，可以跨浏览器保持一致的行为。

当我们在 React 组件中使用 `onClick` 等事件处理函数时，实际上是在使用合成事件。React 使用一种称为“事件委托”的技术，在组件的最外层容器上注册事件监听器，然后根据事件的目标元素和事件类型来触发合适的事件处理函数。这种机制可以大大减少事件监听器的数量，提高事件处理的性能和效率。

在使用合成事件时，React 会将事件处理函数包装成一个合成事件对象（SyntheticEvent），并将其传递给事件处理函数。合成事件对象包含了与原生 DOM 事件相同的属性和方法，例如 `target`、`currentTarget`、`preventDefault()` 等，但是它是由 React 实现的，并不是原生的 DOM 事件对象。因此，我们不能在合成事件对象上调用 `stopPropagation()` 或 `stopImmediatePropagation()` 等方法，而应该使用 `nativeEvent` 属性来访问原生 DOM 事件对象。

绑定事件的实现原理也涉及到 React 的更新机制。当组件的状态或属性发生变化时，React 会对组件进行重新渲染，同时重新注册事件监听器。为了避免不必要的事件处理函数的创建和注册，React 会对事件处理函数进行缓存和复用，只有在事件处理函数发生变化时才会重新创建和注册新的事件处理函数。这种机制可以大大提高组件的性能和效率，尤其是在处理大量事件和频繁更新状态的情况下。

## 136 如何分析页面加载慢？

* created_at: 2023-03-19T15:11:12Z
* updated_at: 2023-03-19T15:11:13Z
* labels: 工程化
* milestone: 高

* [如何分析页面加载慢](https://www.jianshu.com/p/24b93b13e5a9)

## 137 【性能】以用户为中心的前端性能指标有哪些？

* created_at: 2023-03-20T15:59:33Z
* updated_at: 2023-03-23T16:26:43Z
* labels: 工程化
* milestone: 高

* [以用户为中心的前端性能指标「译」](https://www.jianshu.com/p/456e6eff59c8)

## 138 浏览器渲染进程了解多少？

* created_at: 2023-03-20T16:23:57Z
* updated_at: 2023-03-20T16:23:58Z
* labels: 浏览器
* milestone: 高

 浏览器进程

浏览器是一个多进程的架构，当我们每开一个tab页面，就会开一个新的进程，所以如果一个页面崩溃也不会影响到别的页面。面试的时候经常会问从输入url到页面显示都发生了什么，这次主要说说针对渲染这块而浏览器具体都做了些什么，都有哪些进程？

首先浏览器进程有如下几部分：**主进程**，**第三方插件进程，GPU进程，渲染进程**。

而渲染进程又包含了很多线程：**js引擎线程，事件触发线程，定时器触发线程，异步http请求线程，GUI渲染线程。**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e40c867849c4911a6c16491a9bcf739~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

主进程：负责页面的显示与交互，各个页面的管理，创建和销毁其他进程。网络的资源管理和下载。

GPU进程： 最多有一个，3d绘制等。

插件进程： 每种类型的插件对应一个进程。

渲染进程：称为浏览器渲染或浏览器内核，内部是多线程的；主要负责页面渲染，脚本执行，事件处理等。

GUI渲染线程：

```markdown
1. 负责渲染浏览器界面，解析html，css，构建dom树和render树，布局和绘制。
2. 当重绘和回流的时候就会执行这个线程
3. GUI渲染线程和js引擎线程互斥，当js引擎执行时，GUI线程就会被挂起（相当于冻结了），GUI更新会被保存在一个队列中等到js引擎空闲时立即执行。


```

js引擎线程：

```markdown
1. 也称js内核，负责处理js脚本程序，例如v8引擎
2. 负责解析js脚本，运行代码
3. 等待任务队列中的任务，一个tab页只有一个js进程
4. 因为与GUI渲染线程互斥，所以js执行过长时间，就会造成页面渲染不连贯，导致页面渲染阻塞

```

事件触发线程：

```markdown
1. 归属于浏览器而不是js引擎，用了控制事件循环
2. 当js引擎执行settimeout类似的代码块时，会将对应任务添加到事件线程
3. 当对应的事件符合触发条件时，会被放到任务队列的队尾，等待js引擎线程处理
4. 由于js单线程的关系，这些等待处理的事件都需要排队等待js引擎处理

```

定时器触发线程：

```markdown
1. settimeout和setinterval所在的线程
2. 浏览器定时计数器不是由js引擎线程计数的，因此通过单独线程来计时触发定时，计时完毕后，添加到事件队列，等待js引擎执行。

```

异步http请求进程：

```markdown
1. 在 XMLHttpRequest 在连接后是通过浏览器新开一个线程请求。
2. 将检测到状态变更时,如果设置有回调函数,异步线程就产生状态变更事件,将这个回调再放入事件队列中。再由 JavaScript 引擎执行

```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e0e27b8d2954ab18ddf0ba13bdf70ee~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0bb32540e484bff8c162417e8112154~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

看图能大致了解渲染流程的七七八八，我按照我的理解重新梳理一下：

```css
1. 构建DOM树。因为浏览器无法理解和直接使用html所以需要转换成dom树的形式，对html进行解析。
2. 样式计算，对css进行解析。首先把css文本转化成浏览器可以理解的结构--stylesheets，然后对stylesheets进行标准化处理，就是将一些属性值转化为渲染引擎更容易理解，标准化的计算值（例如，color单词形式转化为rgb，em单位转化为px），其次计算dom节点的样式属性。
3. 布局阶段。
 a. 首先创建布局：遍历dom中所有节点，并添加到布局树中。
 b. 布局计算：通过js和css，计算dom在页面上的位置。
 c. 最后创建布局树。
4. 分层。根据复杂的3d转换，页面滚动，还有z-index属性都会形成单独图层，把图层按照正确顺序排列。生成分层树。
5. 图层绘制，栅格化以及图层显示。对每个图层进行单独的绘制，并提交到合成器线程。
6. 合成线程将图层分为图块，并在栅格化线程池中将图块转化为位图。
7. 合成线程发送绘制图块命令drawquads给浏览器进程。
8. 浏览器根据drawquads消息生成页面展示出来

```

 css阻塞，js阻塞

关于提高页面性能经常听到建议说：把css代码放头部，js代码放底部。还有如果script和link都在头部，应该把script放上面。

css不会阻塞DOM解析，css阻塞DOM渲染：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cbba082d94a4241b2c2ab9e1e73c2c5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

从这个渲染流程图可以看出，dom解析的时候，也可以进行css的解析

js阻塞DOM解析：

如果“script”和link都在头部，把link放在头部。就会发生阻塞，浏览器会先去下载css样式，再执行js，再执行dom。 因为浏览器不知道js脚本会写些什么，如果有删除dom操作，那提前解析dom就是无用功。不过浏览器也会先“偷看”下html中是否有碰到如link、script和img等标签时，它会帮助我们先行下载里面的资源，不会傻等到解析到那里时才下载。

我们在优化js阻塞的时候经常会用**defer和async异步进行js的解析，那这两个有什么区别呢？**

 async

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d5baa0a68b84c65b8b9059edf12be5c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bde046b1318a4cc2849607734cd6653c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

在html解析的时候，async异步的解析js，如果js解析完毕，html还没解析完，就会停止html解析，立即执行js； 如果html解析完了就正好，直接执行js。所以还是有可能阻塞html。

 defer

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df533c40559640b78c0806288e60dc48~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

在html解析的时候，defer可以异步的支持解析js，等到html解析完成后，才会执行js。必然不会阻塞html。

## 139 pnpm 和 npm 的区别？

* created_at: 2023-03-21T15:56:45Z
* updated_at: 2023-03-21T15:57:18Z
* labels: 工程化
* milestone: 中

`pnpm` 和 `npm` 是两个不同的 JavaScript 包管理工具，它们有以下区别：

1. **包的存储方式：**`npm` 将每个包都下载到项目的 `node_modules` 目录中，而 `pnpm` 会在全局安装一个存储库，并在项目中创建一个符号链接到该存储库中的每个包。

2. **空间占用：** 由于 `pnpm` 使用符号链接，它的空间占用通常比 `npm` 小，因为它避免了在多个项目中重复存储相同的依赖项。

3. **安装速度：** 由于 `pnpm` 在全局安装中共享依赖项，因此安装速度通常比 `npm` 更快。

4. **命令行接口：**`pnpm` 的命令行接口与 `npm` 不同，但它们都提供了一组相似的命令来管理包。

5. **兼容性：** 由于 `pnpm` 的存储方式不同于 `npm`，因此某些与 `npm` 兼容的工具可能无法与 `pnpm` 一起使用。

总的来说，`pnpm` 与 `npm` 相比具有更小的空间占用和更快的安装速度，但由于其不同的存储方式可能会导致与某些工具的不兼容。

## 140 pnpm 了解多少？

* created_at: 2023-03-21T16:03:46Z
* updated_at: 2023-03-21T16:07:02Z
* labels: 工程化
* milestone: 高

pnpm，英文里面的意思叫做 `performant npm` ，意味“高性能的 npm”，官网地址可以参考 [pnpm.io/。](https://link.juejin.cn?target=https%3A%2F%2Fpnpm.io%2F%25E3%2580%2582 "https://pnpm.io/%E3%80%82")

pnpm 相比较于 yarn/npm 这两个常用的包管理工具在性能上也有了极大的提升，根据目前官方提供的 [benchmark](https://link.juejin.cn?target=https%3A%2F%2Fpnpm.io%2Fbenchmarks "https://pnpm.io/benchmarks") 数据可以看出在一些综合场景下比 npm/yarn 快了大概两倍：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aa38fc979f4f4ed6a5ec4af64a73c34e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

在这篇文章中，将会介绍一些关于 pnpm 在依赖管理方面的优化，在 monorepo 中相比较于 yarn workspace 的应用，以及也会介绍一些 pnpm 目前存在的一些缺陷，包括讨论一下未来 pnpm 会做的一些事情。

 依赖管理

这节会通过 pnpm 在依赖管理这一块的一些不同于正常包管理工具的一些优化技巧。

 hard link 机制

介绍 pnpm 一定离不开的就是关于 pnpm 在安装依赖方面做的一些优化，根据前面的 benchmark 图可以看到其明显的性能提升。

那么 pnpm 是怎么做到如此大的提升的呢？是因为计算机里面一个叫做 **[Hard link](https://link.juejin.cn?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FHard_link "https://en.wikipedia.org/wiki/Hard_link")** 的机制，`hard link` 使得用户可以通过不同的路径引用方式去找到某个文件。pnpm 会在全局的 store 目录里存储项目 `node_modules` 文件的 `hard links` 。

举个例子，例如项目里面有个 1MB 的依赖 a，在 pnpm 中，看上去这个 a 依赖同时占用了 1MB 的 node\_modules 目录以及全局 store 目录 1MB 的空间(加起来是 2MB)，但因为 `hard link` 的机制使得两个目录下相同的 1MB 空间能从两个不同位置进行寻址，因此实际上这个 a 依赖只用占用 1MB 的空间，而不是 2MB。

 Store 目录

上一节提到 store 目录用于存储依赖的 hard links，这一节简单介绍一下这个 store 目录。

一般 store 目录默认是设置在 `${os.homedir}/.pnpm-store` 这个目录下，具体可以参考 `@pnpm/store-path` 这个 pnpm 子包中的代码:

```js
const homedir = os.homedir()
if (await canLinkToSubdir(tempFile, homedir)) {
 await fs.unlink(tempFile)
 // If the project is on the drive on which the OS home directory
 // then the store is placed in the home directory
 return path.join(homedir, relStore, STORE_VERSION)
}

```

当然用户也可以在 `.npmrc` 设置这个 store 目录位置，不过一般而言 store 目录对于用户来说感知程度是比较小的。

因为这样一个机制，导致每次安装依赖的时候，如果是个相同的依赖，有好多项目都用到这个依赖，那么这个依赖实际上最优情况(即版本相同)只用安装一次。

如果是 npm 或 yarn，那么这个依赖在多个项目中使用，在每次安装的时候都会被重新下载一次。

![03](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ba60f4713bc46318ee139d3b8a9bc82~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

如图可以看到在使用 pnpm 对项目安装依赖的时候，如果某个依赖在 sotre 目录中存在了话，那么就会直接从 store 目录里面去 hard-link，避免了二次安装带来的时间消耗，如果依赖在 store 目录里面不存在的话，就会去下载一次。

当然这里你可能也会有问题：如果安装了很多很多不同的依赖，那么 store 目录会不会越来越大？

答案是当然会存在，针对这个问题，pnpm 提供了一个命令来解决这个问题: [pnpm store | pnpm](https://link.juejin.cn?target=https%3A%2F%2Fpnpm.io%2Fcli%2Fstore "https://pnpm.io/cli/store")。

同时该命令提供了一个选项，使用方法为 `pnpm store prune` ，它提供了一种用于删除一些不被全局项目所引用到的 packages 的功能，例如有个包 `axios@1.0.0` 被一个项目所引用了，但是某次修改使得项目里这个包被更新到了 `1.0.1` ，那么 store 里面的 1.0.0 的 axios 就就成了个不被引用的包，执行 `pnpm store prune` 就可以在 store 里面删掉它了。

该命令推荐偶尔进行使用，但不要频繁使用，因为可能某天这个不被引用的包又突然被哪个项目引用了，这样就可以不用再去重新下载这个包了。

 node\_modules 结构

在 pnpm 官网有一篇很经典的文章，关于介绍 pnpm 项目的 node\_modules 结构: [Flat node\_modules is not the only way | pnpm](https://link.juejin.cn?target=https%3A%2F%2Fpnpm.io%2Fblog%2F2020%2F05%2F27%2Fflat-node-modules-is-not-the-only-way "https://pnpm.io/blog/2020/05/27/flat-node-modules-is-not-the-only-way")。

在这篇文章中介绍了 pnpm 目前的 node\_modules 的一些文件结构，例如在项目中使用 pnpm 安装了一个叫做 `express` 的依赖，那么最后会在 node\_modules 中形成这样两个目录结构:

```bash
node_modules/express/...
node_modules/.pnpm/express@4.17.1/node_modules/xxx

```

其中第一个路径是 nodejs 正常寻找路径会去找的一个目录，如果去查看这个目录下的内容，会发现里面连个 `node_modules` 文件都没有：

```bash
▾ express
 ▸ lib
 History.md
 index.js
 LICENSE
 package.json
 Readme.md

```

实际上这个文件只是个软连接，它会形成一个到第二个目录的一个软连接(类似于软件的快捷方式)，这样 node 在找路径的时候，最终会找到 .pnpm 这个目录下的内容。

其中这个 `.pnpm` 是个虚拟磁盘目录，然后 express 这个依赖的一些依赖会被平铺到 `.pnpm/express@4.17.1/node_modules/` 这个目录下面，这样保证了依赖能够 require 到，同时也不会形成很深的依赖层级。

在保证了 nodejs 能找到依赖路径的基础上，同时也很大程度上保证了依赖能很好的被放在一起。

`pnpm` 对于不同版本的依赖有着极其严格的区分要求，如果项目中某个依赖实际上依赖的 `peerDeps` 出现了具体版本上的不同，对于这样的依赖会在虚拟磁盘目录 `.pnpm` 有一个比较严格的区分，具体可以参考: [pnpm.io/how-peers-a…](https://link.juejin.cn?target=https%3A%2F%2Fpnpm.io%2Fhow-peers-are-resolved "https://pnpm.io/how-peers-are-resolved") 这篇文章。

综合而言，本质上 pnpm 的 `node_modules` 结构是个网状 + 平铺的目录结构。这种依赖结构主要基于软连接(即 symlink)的方式来完成。

 symlink 和 hard link 机制

在前面知道了 pnpm 是通过 hardlink 在全局里面搞个 store 目录来存储 node\_modules 依赖里面的 hard link 地址，然后在引用依赖的时候则是通过 symlink 去找到对应虚拟磁盘目录下(.pnpm 目录)的依赖地址。

这两者结合在一起工作之后，假如有一个项目依赖了 `bar@1.0.0` 和 `foo@1.0.0` ，那么最后的 node\_modules 结构呈现出来的依赖结构可能会是这样的:

```bash
node_modules
└── bar // symlink to .pnpm/bar@1.0.0/node_modules/bar
└── foo // symlink to .pnpm/foo@1.0.0/node_modules/foo
└── .pnpm
 ├── bar@1.0.0
 │ └── node_modules
 │ └── bar -> <store>/bar
 │ ├── index.js
 │ └── package.json
 └── foo@1.0.0
 └── node_modules
 └── foo -> <store>/foo
 ├── index.js
 └── package.json

```

`node_modules` 中的 bar 和 foo 两个目录会软连接到 .pnpm 这个目录下的真实依赖中，而这些真实依赖则是通过 hard link 存储到全局的 store 目录中。

 兼容问题

读到这里，可能有用户会好奇: 像 hard link 和 symlink 这种方式在所有的系统上都是兼容的吗？

实际上 hard link 在主流系统上(`Unix/Win`)使用都是没有问题的，但是 symlink 即软连接的方式可能会在 windows 存在一些兼容的问题，但是针对这个问题，pnpm 也提供了对应的解决方案：

在 win 系统上使用一个叫做 [junctions](https://link.juejin.cn?target=https%3A%2F%2Fdocs.microsoft.com%2Fen-us%2Fwindows%2Fwin32%2Ffileio%2Fhard-links-and-junctions "https://docs.microsoft.com/en-us/windows/win32/fileio/hard-links-and-junctions") 的特性来替代软连接，这个方案在 win 上的兼容性要好于 symlink。

或许你也会好奇为啥 pnpm 要使用 hard links 而不是全都用 symlink 来去实现。

实际上存在 store 目录里面的依赖也是可以通过软连接去找到的，nodejs 本身有提供一个叫做 `--preserve-symlinks` 的参数来支持 symlink，但实际上这个参数实际上对于 symlink 的支持并不好导致作者放弃了该方案从而采用 hard links 的方式:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90ad9850716547d08bfbfea212d6d653~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

具体可以参考 [github.com/nodejs/node…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fnodejs%2Fnode-eps%2Fissues%2F46 "https://github.com/nodejs/node-eps/issues/46") 该issue 讨论。

 Monorepo 支持

`pnpm` 在 monorepo 场景可以说算得上是个完美的解决方案了，因为其本身的设计机制，导致很多关键或者说致命的问题都得到了相当有效的解决。

 workspace 支持

对于 monorepo 类型的项目，pnpm 提供了 workspace 来支持，具体可以参考官网文档: [pnpm.io/workspaces/…](https://link.juejin.cn?target=https%3A%2F%2Fpnpm.io%2Fworkspaces%2F%25E3%2580%2582 "https://pnpm.io/workspaces/%E3%80%82")

 痛点解决

Monorepo 下被人诟病较多的问题，一般是依赖结构问题。常见的两个问题就是 `Phantom dependencies` 和 `NPM doppelgangers`，用 [rush 官网](https://link.juejin.cn?target=https%3A%2F%2Frushjs.io%2F "https://rushjs.io/") 的图片可以很贴切的展示着两个问题:

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/977bd60346d04cc8a4565e3e398bd962~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

下面会针对两个问题一一介绍。

 Phantom dependencies

Phantom dependencies 被称之为幽灵依赖，解释起来很简单，即某个包没有被安装(`package.json` 中并没有，但是用户却能够引用到这个包)。

引发这个现象的原因一般是因为 node\_modules 结构所导致的，例如使用 yarn 对项目安装依赖，依赖里面有个依赖叫做 foo，foo 这个依赖同时依赖了 bar，yarn 会对安装的 node\_modules 做一个扁平化结构的处理(npm v3 之后也是这么做的)，会把依赖在 node\_modules 下打平，这样相当于 foo 和 bar 出现在同一层级下面。那么根据 nodejs 的寻径原理，用户能 require 到 foo，同样也能 require 到 bar。

```bash
package.json -> foo(bar 为 foo 依赖)

node_modules

 /foo

 /bar -> 👻依赖

```

那么这里这个 bar 就成了一个幽灵依赖，如果某天某个版本的 foo 依赖不再依赖 bar 或者 foo 的版本发生了变化，那么 require bar 的模块部分就会抛错。

以上其实只是一个简单的例子，但是根据笔者在字节内部见到的一些 monorepo(主要为 `lerna + yarn` )项目中，这其实是个比较常见的现象，甚至有些包会直接去利用这种残缺的引入方式去减轻包体积。

还有一种场景就是在 lerna + yarn workspace 的项目里面，因为 yarn 中提供了 hoist 机制(即一些底层子项目的依赖会被提升到顶层的 `node_modules` 中)，这种 phantom dependencies 会更多，一些底层的子项目经常会去 require 一些在自己里面没有引入的依赖，而直接去找顶层 node\_modules 的依赖(nodejs 这里的寻径是个递归上下的过程)并使用。

而根据前面提到的 pnpm 的 `node_modules` 依赖结构，这种现象是显然不会发生的，因为被打平的依赖会被放到 `.pnpm` 这个虚拟磁盘目录下面去，用户通过 require 是根本找不到的。

> 值得一提的是，pnpm 本身其实也提供了将依赖提升并且按照 yarn 那种形式组织的 node\_modules 结构的 Option，作者将其命名为 `--shamefully-hoist` ，即 "羞耻的 hoist".....

 NPM doppelgangers

这个问题其实也可以说是 hoist 导致的，这个问题可能会导致有大量的依赖的被重复安装，举个例子:

例如有个 package，下面依赖有 lib\_a、lib\_b、lib\_c、lib\_d，其中 a 和 b 依赖 [util\_e@1.0.0](https://link.juejin.cn?target=mailto%3Autil_e%401.0.0 "mailto:util_e@1.0.0")，而 c 和 d 依赖 [util\_e@2.0.0](https://link.juejin.cn?target=mailto%3Autil_e%402.0.0 "mailto:util_e@2.0.0")。

那么早期 npm 的依赖结构应该是这样的:

```bash
- package
- package.json
- node_modules
- lib_a
 - node_modules <- util_e@1.0.0
- lib_b
 - node_modules <- util_e@1.0.0
_ lib_c
 - node_modules <- util_e@2.0.0
- lib_d
 - node_modules <- util_e@2.0.0

```

这样必然会导致很多依赖被重复安装，于是就有了 hoist 和打平依赖的操作:

```bash
- package
- package.json
- node_modules
- util_e@1.0.0
- lib_a
- lib_b
_ lib_c
 - node_modules <- util_e@2.0.0
- lib_d
 - node_modules <- util_e@2.0.0

```

但是这样也只能提升一个依赖，如果两个依赖都提升了会导致冲突，这样同样会导致一些不同版本的依赖被重复安装多次，这里就会导致使用 npm 和 yarn 的性能损失。

如果是 pnpm 的话，这里因为依赖始终都是存在 store 目录下的 hard links ，一份不同的依赖始终都只会被安装一次，因此这个是能够被彻彻底底的消除的。

 目前不适用的场景

前面有提到关于 pnpm 的主要问题在于 symlink(软链接)在一些场景下会存在兼容的问题，可以参考作者在 nodejs 那边开的一个 discussion：[github.com/nodejs/node…](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fnodejs%2Fnode%2Fdiscussions%2F37509 "https://github.com/nodejs/node/discussions/37509")

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2fb3e4b6b5ef43dc9e8437389d2cb46e~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

在里面作者提到了目前 nodejs 软连接不能适用的一些场景，希望 nodejs 能提供一种 link 方式而不是使用软连接，同时也提到了 pnpm 目前因为软连接而不能使用的场景:

* Electron 应用无法使用 pnpm
* 部署在 [lambda](https://link.juejin.cn?target=https%3A%2F%2Fdocs.aws.amazon.com%2Flambda%2Flatest%2Fdg%2Fgettingstarted-package.html "https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html") 上的应用无法使用 pnpm

笔者在字节内部使用 pnpm 时也遇到过一些 nodejs 基础库不支持 symlink 的情况导致使用 pnpm 无法正常工作，不过这些库在迭代更新之后也会支持这一特性。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b702b38ff6704651976c4c3eab540566~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

## 141 如何组织 monorepo 工程？

* created_at: 2023-03-21T16:16:01Z
* updated_at: 2023-03-29T08:24:59Z
* labels: 工程化
* milestone: 高

参考文档：

* [pnpm + workspace + changesets 构建你的 monorepo 工程](https://juejin.cn/post/7098609682519949325)
* [现代 Monorepo 工程技术选型，聊聊我的思考](https://juejin.cn/post/7102452341210611720)
* [前端工程化之多个项目如何同时高效管理 — monorepo](https://juejin.cn/post/6985336835459252260)

## 142 事件循环原理?

* created_at: 2023-03-23T15:48:30Z
* updated_at: 2023-03-23T15:50:30Z
* labels: JavaScript
* milestone: 中

通过一道题进入浏览器事件循环原理：

```arcade
console.log('script start')
setTimeout(function () {
 console.log('setTimeout')
}, 0);
Promise.resolve().then(function () {
 console.log('promise1')
}).then(function () {
 console.log('promise2')
})
console.log('script end')
```

可以先试一下，手写出执行结果，然后看完这篇文章以后，在运行一下这段代码，看结果和预期是否一样

 单线程

 定义

单线程意味着所有的任务需要排队，前一个任务结束，才能够执行后一个任务。如果前一个任务耗时很长，后面一个任务不得不一直等着。

 原因

`javascript`的单线程，与它的用途有关。作为浏览器脚本语言，`javascript`的主要用途是与用户互动，以及操作`DOM`。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定`javascript`同时有两个线程，一个在添加`DOM`节点，另外一个是删除`DOM`节点，那浏览器应该应该以哪个为准，如果在增加一个线程进行管理多个线程，虽然解决了问题，但是增加了复杂度，为什么不使用单线程呢，执行有个先后顺序，某个时间只执行单个事件。
为了利用多核`CPU`的计算能力，`HTML5`提出`Web Worker`标准，运行`javascript`创建多个线程，但是子线程完全受主线程控制，且不得操作`DOM`。所以，这个标准并没有改变`javascript`单线程的本质

 浏览器中的`Event Loop`

事件循环这个名字来源于它往往这么实现:

```cpp
while(queue.waitForMessage()) {
 queue.processNextMessage();
}
```

这个模型的优势在于它必须处理完一个消息(run to completion),才会处理下一个消息,使程序可追溯性更强。不像C语言可能随时从一个线程切换到另一个线程。但是缺点也在于此,若同步代码阻塞则会影响用户交互

 `macroTask`和`microTask`

宏队列，`macroTask`也叫`tasks`。包含同步任务，和一些异步任务的回调会依次进入`macro task queue`中，`macroTask`包含:

* script代码块
* setTimeout
* requestAnimationFrame
* I/O
* UI rendering

微队列, `microtask`，也叫`jobs`。另外一些异步任务的回调会依次进入`micro task queue`，等待后续被调用，这些异步任务包含:

* Promise.then
* MutationObserver

下面是`Event Loop`的示意图

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/24/16dfca86d30dc6d0~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
一段`javascript`执行的具体流程就是如下：

1. 首先执行宏队列中取出第一个，一段`script`就是相当于一个`macrotask`,所以他先会执行同步代码，当遇到例如`setTimeout`的时候，就会把这个异步任务推送到宏队列队尾中。
2. 当前`macrotask`执行完成以后，就会从微队列中取出位于头部的异步任务进行执行，然后微队列中任务的长度减一。
3. 然后继续从微队列中取出任务，直到整个队列中没有任务。如果在执行微队列任务的过程中，又产生了`microtask`，那么会加入整个队列的队尾，也会在当前的周期中执行
4. 当微队列的任务为空了，那么就需要执行下一个`macrotask`，执行完成以后再执行微队列，以此反复。
 总结下来就是不断从`task`队列中按顺序取`task`执行，每执行完一个`task`都会检查`microtask`是否为空，不让过不为空就执行队列中的所有`microtask`。然后在取下一个`task`以此循环

 调用栈和任务队列

调用栈是一个栈结构，函数调用会形成一个栈帧。栈帧：调用栈中每个实体被称为栈帧，帧中包含了当前执行函数的参数和局部变量等上下文信息，函数执行完成后，它的执行上下文会从栈中弹出。 下面是调用栈和任务队列的关系:

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/25/16e01c44735fee30~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
分析文章开头的题目，可以通过在题目前面添加`debugger`，结合`chrome`的`call stack`进行分析:

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/10/25/16e01cbeaa6b1c05~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
(这里不知道怎么画动图，在晚上找的一张图，小伙伴们有好的工具，求分享); 下面借助三个数组来分析一下这段代码的执行流程，`call stack`表示调用栈，`macroTasks`表示宏队列，`microTasks`表示微队列：

1. 首先代码执行之前都是三个队列都是空的:

```apache
callStack: []
macroTasks: [main]
microTasks: []
```

在前面提到，整个代码块就相当于一个`macroTask`，所以首先向`callStack`中压入`main()`，`main`相当于整个代码块
2. 执行`main`，输出同步代码结果:

```apache
callStack: [main]
macroTasks: []
microTasks: []
```

在遇到`setTimeout`和`promise`的时候会向`macroTasks`与`microTasks`中分别推入
3. 此时的三个队列分别是:

```apache
callStack: [main]
macroTasks: [setTimeout]
microTasks: [promise]
```

当这段代码执行完成以后，会输出:

```applescript
script start
script end
```

4. 当`main`执行完成以后，会取`microTasks`中的任务，放入`callStack`中，此时的三个队列为:

```apache
callStack: [promise]
macroTasks: [setTimeout]
microTask: []
```

当这个`promise`执行完成后会输出

```
promise1
```

后面又有一个`then`，在前面提到如果还有`microtask`就在微队列队尾中加入这个任务，并且在当前`tick`执行。所以紧接着输出`promise2`
5. 当前的`tick`也就完成了，最后在从`macroTasks`取出`task`，此时三个队列的状态如下：

```apache
callStack: [setTimeout]
macroTasks: []
microTask: []
```

最后输出的结果就是`setTimeout`。
所谓的事件循环就是从两个队列中不断取出事件，然后执行，反复循环就是事件循环。经过上面的示例，理解起来是不是比较简单

## 143 [vue] 双向数据绑定原理?

* created_at: 2023-03-23T15:59:38Z
* updated_at: 2023-03-23T15:59:39Z
* labels: web框架
* milestone: 中

> 在目前的前端面试中，vue的双向数据绑定已经成为了一个非常容易考到的点，即使不能当场写出来，至少也要能说出原理。本篇文章中我将会仿照vue写一个双向数据绑定的实例，名字就叫myVue吧。结合注释，希望能让大家有所收获。

 1、原理

Vue的双向数据绑定的原理相信大家也都十分了解了，主要是通过`Object对象的defineProperty属性，重写data的set和get函数来实现的`,这里对原理不做过多描述，主要还是来实现一个实例。为了使代码更加的清晰，这里只会实现最基本的内容，主要实现v-model，v-bind 和v-click三个命令，其他命令也可以自行补充。

添加网上的一张图

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/4/10/162ad3d5be3e5105~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

 2、实现

页面结构很简单，如下

```xml
<div id="app">
 <form>
 <input type="text" v-model="number">
 <button type="button" v-click="increment">增加</button>
 </form>
 <h3 v-bind="number"></h3>
 </div>

```

包含：

```css
1. 一个input，使用v-model指令
2. 一个button，使用v-click指令
3. 一个h3，使用v-bind指令。

```

我们最后会通过类似于vue的方式来使用我们的双向数据绑定，结合我们的数据结构添加注释

```php
var app = new myVue({
 el:'#app',
 data: {
 number: 0
 },
 methods: {
 increment: function() {
 this.number ++;
 },
 }
 })

```

首先我们需要定义一个myVue构造函数：

```javascript
function myVue (options) {

}
```

为了初始化这个构造函数，给它添加一 个\_init属性

```kotlin
function myVue(options) {
 this._init(options);
}
myVue.prototype._init = function (options) {
 this.$options = options; // options 为上面使用时传入的结构体，包括el,data,methods
 this.$el = document.querySelector(options.el); // el是 #app, this.$el是id为app的Element元素
 this.$data = options.data; // this.$data = {number: 0}
 this.$methods = options.methods; // this.$methods = {increment: function(){}}
 }

```

接下来实现\_obverse函数，对data进行处理，重写data的set和get函数

并改造\_init函数

```javascript
myVue.prototype._obverse = function (obj) { // obj = {number: 0}
  let value
  for (key in obj) { // 遍历obj对象
    if (obj.hasOwnProperty(key)) {
      value = obj[key]
      if (typeof value === 'object') { // 如果值还是对象，则遍历处理
        this._obverse(value)
      }
      Object.defineProperty(this.$data, key, { // 关键
        enumerable: true,
        configurable: true,
        get: function () {
          console.log(`获取${value}`)
          return value
        },
        set: function (newVal) {
          console.log(`更新${newVal}`)
          if (value !== newVal) {
            value = newVal
          }
        }
      })
    }
  }
}

myVue.prototype._init = function (options) {
  this.$options = options
  this.$el = document.querySelector(options.el)
  this.$data = options.data
  this.$methods = options.methods

  this._obverse(this.$data)
}
```

接下来我们写一个指令类Watcher，用来绑定更新函数，实现对DOM元素的更新

```kotlin
function Watcher(name, el, vm, exp, attr) {
 this.name = name; //指令名称，例如文本节点，该值设为"text"
 this.el = el; //指令对应的DOM元素
 this.vm = vm; //指令所属myVue实例
 this.exp = exp; //指令对应的值，本例如"number"
 this.attr = attr; //绑定的属性值，本例为"innerHTML"

 this.update();
 }

 Watcher.prototype.update = function () {
 this.el[this.attr] = this.vm.$data[this.exp]; //比如 H3.innerHTML = this.data.number; 当number改变时，会触发这个update函数，保证对应的DOM内容进行了更新。
 }

```

更新\_init函数以及\_obverse函数

```javascript
myVue.prototype._init = function (options) {
 //...
 this._binding = {}; //_binding保存着model与view的映射关系，也就是我们前面定义的Watcher的实例。当model改变时，我们会触发其中的指令类更新，保证view也能实时更新
 //...
 }

 myVue.prototype._obverse = function (obj) {
 //...
 if (obj.hasOwnProperty(key)) {
 this._binding[key] = { // 按照前面的数据，_binding = {number: _directives: []} 
 _directives: []
 };
 //...
 var binding = this._binding[key];
 Object.defineProperty(this.$data, key, {
 //...
 set: function (newVal) {
 console.log(`更新${newVal}`);
 if (value !== newVal) {
 value = newVal;
 binding._directives.forEach(function (item) { // 当number改变时，触发_binding[number]._directives 中的绑定的Watcher类的更新
 item.update();
 })
 }
 }
 })
 }
 }
 }

```

那么如何将view与model进行绑定呢？接下来我们定义一个\_compile函数，用来解析我们的指令（v-bind,v-model,v-clickde）等，并在这个过程中对view与model进行绑定。

```ini
 myVue.prototype._init = function (options) {
 //...
 this._complie(this.$el);
 }

myVue.prototype._complie = function (root) { root 为 id为app的Element元素，也就是我们的根元素
 var _this = this;
 var nodes = root.children;
 for (var i = 0; i < nodes.length; i++) {
 var node = nodes[i];
 if (node.children.length) { // 对所有元素进行遍历，并进行处理
 this._complie(node);
 }

 if (node.hasAttribute('v-click')) { // 如果有v-click属性，我们监听它的onclick事件，触发increment事件，即number++
 node.onclick = (function () {
 var attrVal = nodes[i].getAttribute('v-click');
 return _this.$methods[attrVal].bind(_this.$data); //bind是使data的作用域与method函数的作用域保持一致
 })();
 }

 if (node.hasAttribute('v-model') && (node.tagName == 'INPUT' || node.tagName == 'TEXTAREA')) { // 如果有v-model属性，并且元素是INPUT或者TEXTAREA，我们监听它的input事件
 node.addEventListener('input', (function(key) {
 var attrVal = node.getAttribute('v-model');
 //_this._binding['number']._directives = [一个Watcher实例]
 // 其中Watcher.prototype.update = function () {
 // node['vaule'] = _this.$data['number']; 这就将node的值保持与number一致
 // }
 _this._binding[attrVal]._directives.push(new Watcher(
 'input',
 node,
 _this,
 attrVal,
 'value'
 ))

 return function() {
 _this.$data[attrVal] = nodes[key].value; // 使number 的值与 node的value保持一致，已经实现了双向绑定
 }
 })(i));
 }

 if (node.hasAttribute('v-bind')) { // 如果有v-bind属性，我们只要使node的值及时更新为data中number的值即可
 var attrVal = node.getAttribute('v-bind');
 _this._binding[attrVal]._directives.push(new Watcher(
 'text',
 node,
 _this,
 attrVal,
 'innerHTML'
 ))
 }
 }
 }

```

至此，我们已经实现了一个简单vue的双向绑定功能，包括v-bind, v-model, v-click三个指令。效果如下图

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2018/4/10/162ad3d5beb544b6~tplv-t2oaga2asx-zoom-in-crop-mark:4536:0:0:0.image)

附上全部代码，不到150行

```html
<!DOCTYPE html>
<head>
 <title>myVue</title>
</head>
<style>
 #app {
 text-align: center;
 }
</style>
<body>
 <div id="app">
 <form>
 <input type="text" v-model="number">
 <button type="button" v-click="increment">增加</button>
 </form>
 <h3 v-bind="number"></h3>
 <form>
 <input type="text" v-model="count">
 <button type="button" v-click="incre">增加</button>
 </form>
 <h3 v-bind="count"></h3>
 </div>
</body>

<script>

 function myVue(options) {
 this._init(options);
 }

 myVue.prototype._init = function (options) {
 this.$options = options;
 this.$el = document.querySelector(options.el);
 this.$data = options.data;
 this.$methods = options.methods;

 this._binding = {};
 this._obverse(this.$data);
 this._complie(this.$el);
 }

 myVue.prototype._obverse = function (obj) {
 var _this = this;
 Object.keys(obj).forEach(function (key) {
 if (obj.hasOwnProperty(key)) {
 _this._binding[key] = {
 _directives: []
 };
 console.log(_this._binding[key])
 var value = obj[key];
 if (typeof value === 'object') {
 _this._obverse(value);
 }
 var binding = _this._binding[key];
 Object.defineProperty(_this.$data, key, {
 enumerable: true,
 configurable: true,
 get: function () {
 console.log(`${key}获取${value}`);
 return value;
 },
 set: function (newVal) {
 console.log(`${key}更新${newVal}`);
 if (value !== newVal) {
 value = newVal;
 binding._directives.forEach(function (item) {
 item.update();
 })
 }
 }
 })
 }
 })
 }

 myVue.prototype._complie = function (root) {
 var _this = this;
 var nodes = root.children;
 for (var i = 0; i < nodes.length; i++) {
 var node = nodes[i];
 if (node.children.length) {
 this._complie(node);
 }

 if (node.hasAttribute('v-click')) {
 node.onclick = (function () {
 var attrVal = nodes[i].getAttribute('v-click');
 return _this.$methods[attrVal].bind(_this.$data);
 })();
 }

 if (node.hasAttribute('v-model') && (node.tagName = 'INPUT' || node.tagName == 'TEXTAREA')) {
 node.addEventListener('input', (function(key) {
 var attrVal = node.getAttribute('v-model');
 _this._binding[attrVal]._directives.push(new Watcher(
 'input',
 node,
 _this,
 attrVal,
 'value'
 ))

 return function() {
 _this.$data[attrVal] = nodes[key].value;
 }
 })(i));
 }

 if (node.hasAttribute('v-bind')) {
 var attrVal = node.getAttribute('v-bind');
 _this._binding[attrVal]._directives.push(new Watcher(
 'text',
 node,
 _this,
 attrVal,
 'innerHTML'
 ))
 }
 }
 }

 function Watcher(name, el, vm, exp, attr) {
 this.name = name; //指令名称，例如文本节点，该值设为"text"
 this.el = el; //指令对应的DOM元素
 this.vm = vm; //指令所属myVue实例
 this.exp = exp; //指令对应的值，本例如"number"
 this.attr = attr; //绑定的属性值，本例为"innerHTML"

 this.update();
 }

 Watcher.prototype.update = function () {
 this.el[this.attr] = this.vm.$data[this.exp];
 }

 window.onload = function() {
 var app = new myVue({
 el:'#app',
 data: {
 number: 0,
 count: 0,
 },
 methods: {
 increment: function() {
 this.number ++;
 },
 incre: function() {
 this.count ++;
 }
 }
 })
 }
 </script>
```

如果喜欢请关注我的[Github](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flouzhedong%2Fblog "https://github.com/louzhedong/blog")，给个[Star](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Flouzhedong%2Fblog "https://github.com/louzhedong/blog")吧，我会定期分享一些JS中的知识，^\_^

## 144 [vue] 是怎么解析template的?

* created_at: 2023-03-23T16:16:59Z
* updated_at: 2023-03-23T16:18:45Z
* labels: web框架
* milestone: 高

整体流程图：
![image](https://user-images.githubusercontent.com/22188674/227268064-b92063be-ca08-419b-9241-d23f7980847c.png)

参考文档：

* [Vue 编译三部曲：如何将 template 编译成 AST ?](https://juejin.cn/post/7116296421816418311)
* [Vue 编译三部曲：模型树优化](https://juejin.cn/post/7117085295798911012)
* [Vue 编译三部曲：最后一曲，render code 生成](https://juejin.cn/post/7121504219588198413)

## 145 实现 JS 沙盒的方式有哪些？

* created_at: 2023-03-23T16:44:40Z
* updated_at: 2023-03-23T16:45:35Z
* labels: 工程化
* milestone: 资深

微前端已经成为前端领域比较火爆的话题，在技术方面，微前端有一个始终绕不过去的话题就是前端沙箱

 什么是沙箱

> Sandboxie(又叫沙箱、沙盘)即是一个虚拟系统程序，允许你在沙盘环境中运行浏览器或其他程序，因此运行所产生的变化可以随后删除。它创造了一个类似沙盒的独立作业环境，在其内部运行的程序并不能对硬盘产生永久性的影响。 在网络安全中，沙箱指在隔离环境中，用以测试不受信任的文件或应用程序等行为的工具

简单来说沙箱（sandbox）就是与外界隔绝的一个环境，内外环境互不影响，外界无法修改该环境内任何信息，沙箱内的东西单独属于一个世界。

 JavaScript 的沙箱

对于 JavaScript 来说，沙箱并非传统意义上的沙箱，它只是一种语法上的 Hack 写法，沙箱是一种安全机制，把一些不信任的代码运行在沙箱之内，使其不能访问沙箱之外的代码。当需要解析或着执行不可信的 JavaScript 的时候，需要隔离被执行代码的执行环境的时候，需要对执行代码中可访问对象进行限制，通常开始可以把 JavaScript 中处理模块依赖关系的闭包称之为沙箱。

 JavaScript 沙箱实现

我们大致可以把沙箱的实现总体分为两个部分：

* 构建一个闭包环境
* 模拟原生浏览器对象

 构建闭包环境

我们知道 JavaScript 中，关于作用域（scope）,只有全局作用域（global scope）、函数作用域（function scope）以及从 ES6 开始才有的块级作用域（block scope）。如果要将一段代码中的变量、函数等的定义隔离出来，受限于 JavaScript 对作用域的控制，只能将这段代码封装到一个 Function 中，通过使用 function scope 来达到作用域隔离的目的。也因为需要这种使用函数来达到作用域隔离的目的方式，于是就有 IIFE（立即调用函数表达式）,这是一个被称为 自执行匿名函数的设计模式

```javascript
(function foo () {
  const a = 1
  console.log(a)
})()
// 无法从外部访问变量 name
console.log(a) // 抛出错误："Uncaught ReferenceError: a is not defined"
```

当函数变成立即执行的函数表达式时，表达式中的变量不能从外部访问，它拥有独立的词法作用域。不仅避免了外界访问 IIFE 中的变量，而且又不会污染全局作用域，弥补了 JavaScript 在 scope 方面的缺陷。一般常见于写插件和类库时，如 JQuery 当中的沙箱模式

```javascript
(function (window) {
  const jQuery = function (selector, context) {
    return new jQuery.fn.init(selector, context)
  }
  jQuery.fn = jQuery.prototype = function () {
    // 原型上的方法，即所有jQuery对象都可以共享的方法和属性
  }
  jQuery.fn.init.prototype = jQuery.fn
  window.jQeury = window.$ = jQuery // 如果需要在外界暴露一些属性或者方法，可以将这些属性和方法加到window全局对象上去
})(window)
```

当将 IIFE 分配给一个变量，不是存储 IIFE 本身，而是存储 IIFE 执行后返回的结果。

```ini
var result = (function () {
 var name = "张三";
 return name;
})();
console.log(result); // "张三"

```

 原生浏览器对象的模拟

模拟原生浏览器对象的目的是为了，防止闭包环境，操作原生对象。篡改污染原生环境；完成模拟浏览器对象之前我们需要先关注几个不常用的 API。

 eval

eval 函数可将字符串转换为代码执行，并返回一个或多个值

```css
 var b = eval("({name:'张三'})")
 console.log(b.name);

```

由于 eval 执行的代码可以访问闭包和全局范围，因此就导致了代码注入的安全问题，因为代码内部可以沿着作用域链往上找，篡改全局变量，这是我们不希望的

 new Function

Function 构造函数创建一个新的 Function 对象。直接调用这个构造函数可用动态创建函数

> 语法

`new Function ([arg1[, arg2[, ...argN]],] functionBody)`

**arg1, arg2, ... argN** 被函数使用的参数的名称必须是合法命名的。参数名称是一个有效的 JavaScript 标识符的字符串，或者一个用逗号分隔的有效字符串的列表;例如“×”，“theValue”，或“a,b”。

**functionBody** 一个含有包括函数定义的 JavaScript 语句的字符串。

```javascript
const sum = new Function('a', 'b', 'return a + b')

console.log(sum(1, 2))// 3
```

同样也会遇到和 eval 类似的的安全问题和相对较小的性能问题。

```javascript
const a = 1

function sandbox () {
  const a = 2
  return new Function('return a;') // 这里的 a 指向最上面全局作用域内的 1
}
const f = sandbox()
console.log(f())
```

与 eval 不同的是 Function 创建的函数只能在全局作用域中运行。它无法访问局部闭包变量，它们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量，不能访问它们被 Function 构造器创建时所在的作用域的变量；但是，它仍然可以访问全局范围。new Function()是 eval()更好替代方案。它具有卓越的性能和安全性，但仍没有解决访问全局的问题。

 with

with 是 JavaScript 中一个关键字,扩展一个语句的作用域链。它允许半沙盒执行。那什么叫半沙盒？语句将某个对象添加到作用域链的顶部，如果在沙盒中有某个未使用命名空间的变量，跟作用域链中的某个属性同名，则这个变量将指向这个属性值。如果沒有同名的属性，则将拋出 ReferenceError。

```javascript
function sandbox(o) {
 with (o){
 //a=5; 
 c=2;
 d=3;
 console.log(a,b,c,d); // 0,1,2,3 //每个变量首先被认为是一个局部变量，如果局部变量与 obj 对象的某个属性同名，则这个局部变量会指向 obj 对象属性。
 }

}
var f = {
 a:0,
 b:1
}
sandbox(f);
console.log(f);
console.log(c,d); // 2,3 c、d被泄露到window对象上

```

究其原理，`with`在内部使用`in`运算符。对于块内的每个变量访问，它都在沙盒条件下计算变量。如果条件是 true，它将从沙盒中检索变量。否则，就在全局范围内查找变量。但是 with 语句使程序在查找变量值时，都是先在指定的对象中查找。所以对于那些本来不是这个对象的属性的变量，查找起来会很慢，对于有性能要求的程序不适合（JavaScript 引擎会在编译阶段进行数项的性能优化。其中有些优化依赖于能够根据代码的词法进行静态分析，并预先确定所有变量和函数的定义位置，才能在执行过程中快速找到标识符。）。with 也会导致数据泄漏(在非严格模式下，会自动在全局作用域创建一个全局变量)

 in 运算符

> in 运算符能够检测左侧操作数是否为右侧操作数的成员。其中，左侧操作数是一个字符串，或者可以转换为字符串的表达式，右侧操作数是一个对象或数组。

```javascript
const o = {
  a: 1,
  b: function () {}
}
console.log('a' in o) // true
console.log('b' in o) // true
console.log('c' in o) // false
console.log('valueOf' in o) // 返回true，继承Object的原型方法
console.log('constructor' in o) // 返回true，继承Object的原型属性
```

 with + new Function

配合 with 用法可以稍微限制沙盒作用域，先从当前的 with 提供对象查找，但是如果查找不到依然还能从上获取，污染或篡改全局环境。

```javascript
function sandbox (src) {
  src = 'with (sandbox) {' + src + '}'
  return new Function('sandbox', src)
}
const str = 'let a = 1;window.name="张三";console.log(a);console.log(b)'
const b = 2
sandbox(str)({})
console.log(window.name)// '张三'
```

 基于 Proxy 实现的沙箱(ProxySandbox)

由上部分内容思考,假如可以做到在使用`with`对于块内的每个变量访问都限制在沙盒条件下计算变量，从沙盒中检索变量。那么是否可以完美的解决JavaScript沙箱机制。

使用 with 再加上 proxy 实现 JavaScript 沙箱

> ES6 Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，属于一种“元编程”（meta programming）

```javascript
function sandbox (code) {
  code = 'with (sandbox) {' + code + '}'
  const fn = new Function('sandbox', code)

  return function (sandbox) {
    const sandboxProxy = new Proxy(sandbox, {
      has (target, key) {
        return true
      }
    })
    return fn(sandboxProxy)
  }
}
const a = 1
const code = 'console.log(a)' // TypeError: Cannot read property 'log' of undefined
sandbox(code)({})
```

我们前面提到`with`在内部使用`in`运算符来计算变量，如果条件是 true，它将从沙盒中检索变量。理想状态下没有问题，但也总有些特例独行的存在，比如 Symbol.unscopables。

**Symbol.unscopables**

> Symbol.unscopables 对象的 Symbol.unscopables 属性，指向一个对象。该对象指定了使用 with 关键字时，哪些属性会被 with 环境排除。

```javascript
Array.prototype[Symbol.unscopables]
// {
// copyWithin: true,
// entries: true,
// fill: true,
// find: true,
// findIndex: true,
// keys: true
// }

Object.keys(Array.prototype[Symbol.unscopables])
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'keys']
```

由此我们的代码还需要修改如下：

```javascript
function sandbox (code) {
  code = 'with (sandbox) {' + code + '}'
  const fn = new Function('sandbox', code)

  return function (sandbox) {
    const sandboxProxy = new Proxy(sandbox, {
      has (target, key) {
        return true
      },
      get (target, key) {
        if (key === Symbol.unscopables) return undefined
        return target[key]
      }
    })
    return fn(sandboxProxy)
  }
}
const test = {
  a: 1,
  log () {
    console.log('11111')
  }
}
const code = 'log();console.log(a)' // 1111,TypeError: Cannot read property 'log' of undefined
sandbox(code)(test)
```

Symbol.unscopables 定义对象的不可作用属性。Unscopeable 属性永远不会从 with 语句中的沙箱对象中检索，而是直接从闭包或全局范围中检索。

 快照沙箱(SnapshotSandbox)

以下是 qiankun 的 snapshotSandbox 的源码，这里为了帮助理解做部分精简及注释。

```javascript
function iter (obj, callbackFn) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      callbackFn(prop)
    }
  }
}

/**
基于 diff 方式实现的沙箱，用于不支持 Proxy 的低版本浏览器
 */
class SnapshotSandbox {
  constructor (name) {
    this.name = name
    this.proxy = window
    this.type = 'Snapshot'
    this.sandboxRunning = true
    this.windowSnapshot = {}
    this.modifyPropsMap = {}
    this.active()
  }

  // 激活
  active () {
    // 记录当前快照
    this.windowSnapshot = {}
    iter(window, (prop) => {
      this.windowSnapshot[prop] = window[prop]
    })

    // 恢复之前的变更
    Object.keys(this.modifyPropsMap).forEach((p) => {
      window[p] = this.modifyPropsMap[p]
    })

    this.sandboxRunning = true
  }

  // 还原
  inactive () {
    this.modifyPropsMap = {}

    iter(window, (prop) => {
      if (window[prop] !== this.windowSnapshot[prop]) {
        // 记录变更，恢复环境
        this.modifyPropsMap[prop] = window[prop]

        window[prop] = this.windowSnapshot[prop]
      }
    })
    this.sandboxRunning = false
  }
}
const sandbox = new SnapshotSandbox();
// test
((window) => {
  window.name = '张三'
  window.age = 18
  console.log(window.name, window.age) // 张三,18
  sandbox.inactive() // 还原
  console.log(window.name, window.age) // undefined,undefined
  sandbox.active() // 激活
  console.log(window.name, window.age) // 张三,18
})(sandbox.proxy)
```

快照沙箱实现来说比较简单，主要用于不支持 Proxy 的低版本浏览器，原理是基于`diff`来实现的,在子应用激活或者卸载时分别去通过快照的形式记录或还原状态来实现沙箱，snapshotSandbox 会污染全局 window。

 legacySandBox

qiankun 框架 singular 模式下 proxy 沙箱实现，为了便于理解，这里做了部分代码的精简和注释。

```javascript
//legacySandBox
const callableFnCacheMap = new WeakMap();

function isCallable(fn) {
 if (callableFnCacheMap.has(fn)) {
 return true;
 }
 const naughtySafari = typeof document.all === 'function' && typeof document.all === 'undefined';
 const callable = naughtySafari ? typeof fn === 'function' && typeof fn !== 'undefined' : typeof fn ===
 'function';
 if (callable) {
 callableFnCacheMap.set(fn, callable);
 }
 return callable;
};

function isPropConfigurable(target, prop) {
 const descriptor = Object.getOwnPropertyDescriptor(target, prop);
 return descriptor ? descriptor.configurable : true;
}

function setWindowProp(prop, value, toDelete) {
 if (value === undefined && toDelete) {
 delete window[prop];
 } else if (isPropConfigurable(window, prop) && typeof prop !== 'symbol') {
 Object.defineProperty(window, prop, {
 writable: true,
 configurable: true
 });
 window[prop] = value;
 }
}


function getTargetValue(target, value) {
 /*
 仅绑定 isCallable && !isBoundedFunction && !isConstructable 的函数对象，如 window.console、window.atob 这类。目前没有完美的检测方式，这里通过 prototype 中是否还有可枚举的拓展方法的方式来判断
 @warning 这里不要随意替换成别的判断方式，因为可能触发一些 edge case（比如在 lodash.isFunction 在 iframe 上下文中可能由于调用了 top window 对象触发的安全异常）
 */
 if (isCallable(value) && !isBoundedFunction(value) && !isConstructable(value)) {
 const boundValue = Function.prototype.bind.call(value, target);
 for (const key in value) {
 boundValue[key] = value[key];
 }
 if (value.hasOwnProperty('prototype') && !boundValue.hasOwnProperty('prototype')) {
 Object.defineProperty(boundValue, 'prototype', {
 value: value.prototype,
 enumerable: false,
 writable: true
 });
 }

 return boundValue;
 }

 return value;
}

/**
基于 Proxy 实现的沙箱
 */
class SingularProxySandbox {
 // 沙箱期间新增的全局变量 */
 addedPropsMapInSandbox = new Map();

 // 沙箱期间更新的全局变量 */
 modifiedPropsOriginalValueMapInSandbox = new Map();

 // 持续记录更新的(新增和修改的)全局变量的 map，用于在任意时刻做 snapshot */
 currentUpdatedPropsValueMap = new Map();

 name;

 proxy;

 type = 'LegacyProxy';

 sandboxRunning = true;

 latestSetProp = null;

 active() {
 if (!this.sandboxRunning) {
 this.currentUpdatedPropsValueMap.forEach((v, p) => setWindowProp(p, v));
 }

 this.sandboxRunning = true;
 }

 inactive() {
 // console.log(' this.modifiedPropsOriginalValueMapInSandbox', this.modifiedPropsOriginalValueMapInSandbox)
 // console.log(' this.addedPropsMapInSandbox', this.addedPropsMapInSandbox)
 //删除添加的属性，修改已有的属性
 this.modifiedPropsOriginalValueMapInSandbox.forEach((v, p) => setWindowProp(p, v));
 this.addedPropsMapInSandbox.forEach((_, p) => setWindowProp(p, undefined, true));

 this.sandboxRunning = false;
 }

 constructor(name) {
 this.name = name;
 const {
 addedPropsMapInSandbox,
 modifiedPropsOriginalValueMapInSandbox,
 currentUpdatedPropsValueMap
 } = this;

 const rawWindow = window;
 //Object.create(null)的方式，传入一个不含有原型链的对象
 const fakeWindow = Object.create(null);

 const proxy = new Proxy(fakeWindow, {
 set: (_, p, value) => {
 if (this.sandboxRunning) {
 if (!rawWindow.hasOwnProperty(p)) {
 addedPropsMapInSandbox.set(p, value);
 } else if (!modifiedPropsOriginalValueMapInSandbox.has(p)) {
 // 如果当前 window 对象存在该属性，且 record map 中未记录过，则记录该属性初始值
 const originalValue = rawWindow[p];
 modifiedPropsOriginalValueMapInSandbox.set(p, originalValue);
 }

 currentUpdatedPropsValueMap.set(p, value);
 // 必须重新设置 window 对象保证下次 get 时能拿到已更新的数据
 rawWindow[p] = value;

 this.latestSetProp = p;

 return true;
 }

 // 在 strict-mode 下，Proxy 的 handler.set 返回 false 会抛出 TypeError，在沙箱卸载的情况下应该忽略错误
 return true;
 },

 get(_, p) {
 //避免使用 window.window 或者 window.self 逃离沙箱环境，触发到真实环境
 if (p === 'top' || p === 'parent' || p === 'window' || p === 'self') {
 return proxy;
 }
 const value = rawWindow[p];
 return getTargetValue(rawWindow, value);
 },

 has(_, p) { //返回boolean
 return p in rawWindow;
 },

 getOwnPropertyDescriptor(_, p) {
 const descriptor = Object.getOwnPropertyDescriptor(rawWindow, p);
 // 如果属性不作为目标对象的自身属性存在，则不能将其设置为不可配置
 if (descriptor && !descriptor.configurable) {
 descriptor.configurable = true;
 }
 return descriptor;
 },
 });

 this.proxy = proxy;
 }
}

let sandbox = new SingularProxySandbox();

((window) => {
 window.name = '张三';
 window.age = 18;
 window.sex = '男';
 console.log(window.name, window.age,window.sex) // 张三,18,男
 sandbox.inactive() // 还原
 console.log(window.name, window.age,window.sex) // 张三,undefined,undefined
 sandbox.active() // 激活
 console.log(window.name, window.age,window.sex) // 张三,18,男
})(sandbox.proxy); //test

```

legacySandBox 还是会操作 window 对象，但是他通过激活沙箱时还原子应用的状态，卸载时还原主应用的状态来实现沙箱隔离的，同样会对 window 造成污染，但是性能比快照沙箱好，不用遍历 window 对象。

 proxySandbox(多例沙箱)

在 qiankun 的沙箱 proxySandbox 源码里面是对 fakeWindow 这个对象进行了代理，而这个对象是通过 createFakeWindow 方法得到的，这个方法是将 window 的 document、location、top、window 等等属性拷贝一份，给到 fakeWindow。

源码展示：

```javascript

function createFakeWindow(global: Window) {
 // map always has the fastest performance in has check scenario
 // see https://jsperf.com/array-indexof-vs-set-has/23
 const propertiesWithGetter = new Map<PropertyKey, boolean>();
 const fakeWindow = {} as FakeWindow;

 /*
 copy the non-configurable property of global to fakeWindow
 see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor
 > A property cannot be reported as non-configurable, if it does not exists as an own property of the target object or if it exists as a configurable own property of the target object.
 */
 Object.getOwnPropertyNames(global)
 .filter((p) => {
 const descriptor = Object.getOwnPropertyDescriptor(global, p);
 return !descriptor?.configurable;
 })
 .forEach((p) => {
 const descriptor = Object.getOwnPropertyDescriptor(global, p);
 if (descriptor) {
 const hasGetter = Object.prototype.hasOwnProperty.call(descriptor, 'get');

 /*
 make top/self/window property configurable and writable, otherwise it will cause TypeError while get trap return.
 see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
 > The value reported for a property must be the same as the value of the corresponding target object property if the target object property is a non-writable, non-configurable data property.
 */
 if (
 p === 'top' ||
 p === 'parent' ||
 p === 'self' ||
 p === 'window' ||
 (process.env.NODE_ENV === 'test' && (p === 'mockTop' || p === 'mockSafariTop'))
 ) {
 descriptor.configurable = true;
 /*
 The descriptor of window.window/window.top/window.self in Safari/FF are accessor descriptors, we need to avoid adding a data descriptor while it was
 Example:
 Safari/FF: Object.getOwnPropertyDescriptor(window, 'top') -> {get: function, set: undefined, enumerable: true, configurable: false}
 Chrome: Object.getOwnPropertyDescriptor(window, 'top') -> {value: Window, writable: false, enumerable: true, configurable: false}
 */
 if (!hasGetter) {
 descriptor.writable = true;
 }
 }

 if (hasGetter) propertiesWithGetter.set(p, true);

 // freeze the descriptor to avoid being modified by zone.js
 // see https://github.com/angular/zone.js/blob/a5fe09b0fac27ac5df1fa746042f96f05ccb6a00/lib/browser/define-property.ts#L71
 rawObjectDefineProperty(fakeWindow, p, Object.freeze(descriptor));
 }
 });

 return {
 fakeWindow,
 propertiesWithGetter,
 };
}

```

proxySandbox 由于是拷贝复制了一份 fakeWindow，不会污染全局 window，同时支持多个子应用同时加载。 详细源码请查看[：proxySandbox](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fumijs%2Fqiankun%2Fblob%2Fmaster%2Fsrc%2Fsandbox%2FproxySandbox.ts "https://github.com/umijs/qiankun/blob/master/src/sandbox/proxySandbox.ts")

 关于 CSS 隔离

常见的有：

* CSS Module
* namespace
* Dynamic StyleSheet
* css in js
* Shadow DOM 常见的我们这边不再赘述，这里我们重点提一下Shadow DO。

 Shadow DOM

Shadow DOM 允许将隐藏的 DOM 树附加到常规的 DOM 树中——它以 shadow root 节点为起始根节点，在这个根节点的下方，可以是任意元素，和普通的 DOM 元素一样。

## 146 nodejs 进程间如何通信?

* created_at: 2023-03-23T16:51:57Z
* updated_at: 2023-03-23T16:51:58Z
* labels: Nodejs
* milestone: 中

在 Node.js 中，进程间通信（IPC）可以通过以下几种方式进行：

1. 使用子进程模块：可以使用 Node.js 的子进程模块（child\_process）来创建子进程，并使用进程间通信机制（如进程间管道）来实现通信。

2. 使用共享内存：Node.js 中的共享内存模块（sharedArrayBuffer）可以在多个进程间共享内存，从而实现进程间通信。

3. 使用进程间消息传递：Node.js 提供了一个内置的进程间通信机制，可以使用 process.send() 方法在不同的进程之间发送消息。

4. 使用进程间的 TCP 通信：可以使用 Node.js 的 net 模块建立 TCP 服务器和客户端，从而在不同的进程之间进行通信。

需要注意的是，不同的进程之间通信可能会导致一些并发问题，例如竞态条件和死锁。因此，在设计进程间通信方案时，需要仔细考虑并发问题，并采取相应的措施来保证并发安全。

## 147 HTTP 与 HTTPS 的区别？

* created_at: 2023-03-26T05:46:42Z
* updated_at: 2023-03-26T05:46:43Z
* labels: 网络
* milestone: 中

 HTTPS

 基础

https 是 http 的“升级”版本：

```ini
HTTPS = HTTP+ SSL/TLS

```

SSL 是安全层，TLS 是传输层安全，是SSL 的继承。使用SSL或TLS 可确保传输数据的安全性。

使用 HTTP 可能看到传输数据是： “这是明文信息”

使用 HTTPS 可能看到： “283hd9saj9cdsncihquhs99ndso”

HTTPS 传输的不再是文本，而是二进制流，使得传输更高效，且加密处理更加安全。

 HTTPS 的工作流程

1、客户端请求 HTTPS 请求并连接到服务器的 443 端口，此过程和请求 HTTP 请求一样，进行三次握手；

2、服务端向客户端发送数字证书，其中包含公钥、证书颁发者、到期日期

现比较流行的加解密码对，即公钥和私钥。公钥用于加密，私钥用于解密。所以服务端会保留私钥，然后发送公钥给客户端。

3、客户端收到证书，会验证证书的有效性。验证通过后会生成一个随机的 pre-master key。再将密钥通过接收到的公钥加密然后发送给服务端

4、服务端接收后使用私钥进行解密得到 pre-master key

5、获得 pre-master key 后，服务器和客户端可以使用主密钥进行通信。

 HTTP 与 HTTPS 区别

所以在回答 HTTP 与 HTTPS 的区别的问题，可以从下面几个方面进行回答：

* 加密： HTTPS 是 HTTP 协议的更加安全的版本，通过使用SSL/TLS进行加密传输的数据；
* 连接方式： HTTP（三次握手）和 HTTPS （三次握手+数字证书）连接方式不一样；
* 端口： HTTP 默认的端口是 80和 HTTPS 默认端口是 443

 HTTP2 是什么？

HTTP/2 超文本传输协议第2版，是 HTTP/1.x 的扩展。所以 HTTP/2没有改动HTTP的应用语义，仍然使用HTTP的请求方法、状态码和头字段等规则。

它主要修改了HTTP的报文传输格式，通过引入二进制分帧层实现性能的提升。

现有很多主流浏览器的 HTTPS/2 的实现都是基于SSL/TLS的，所以基于 SSL/TLS 的 HTTP/2 连接建立过程和 HTTPS 差不多。在建立连接过程中会携带标识期望使用 HTTP/2 协议，服务端同样方式回应。

 参考文档

* [资料](https://juejin.cn/post/7144400185731317768)

## 148 HTTPS 解决了什么问题？

* created_at: 2023-03-26T05:49:14Z
* updated_at: 2023-03-26T05:50:19Z
* labels: 网络
* milestone: 中

 HTTPS 解决了什么问题

一个简单的回答可能会是 `HTTP` 它不安全。由于 HTTP 天生明文传输的特性，在 HTTP 的传输过程中，任何人都有可能从中截获、修改或者伪造请求发送，所以可以认为 HTTP 是不安全的；在 HTTP 的传输过程中不会验证通信方的身份，因此 HTTP 信息交换的双方可能会遭到伪装，也就是`没有用户验证`；在 HTTP 的传输过程中，接收方和发送方并`不会验证报文的完整性`，综上，为了结局上述问题，HTTPS 应用而生。

 什么是 HTTPS

你还记得 HTTP 是怎么定义的吗？HTTP 是一种 `超文本传输协议(Hypertext Transfer Protocol)` 协议，**它 是一个在计算机世界里专门在两点之间传输文字、图片、音频、视频等超文本数据的约定和规范**，那么我们看一下 HTTPS 是如何定义的

`HTTPS` 的全称是 `Hypertext Transfer Protocol Secure`，它用来在计算机网络上的两个端系统之间进行`安全的交换信息(secure communication)`，它相当于在 HTTP 的基础上加了一个 `Secure 安全`的词眼，那么我们可以给出一个 HTTPS 的定义：**HTTPS 是一个在计算机世界里专门在两点之间安全的传输文字、图片、音频、视频等超文本数据的约定和规范**。 HTTPS 是 HTTP 协议的一种扩展，它本身并不保传输的证安全性，那么谁来保证安全性呢？在 HTTPS 中，使用`传输层安全性(TLS)`或`安全套接字层(SSL)`对通信协议进行加密。也就是 HTTP + SSL(TLS) = HTTPS。

 HTTPS 做了什么

HTTPS 协议提供了三个关键的指标

* `加密(Encryption)`， HTTPS 通过对数据加密来使其免受窃听者对数据的监听，这就意味着当用户在浏览网站时，没有人能够监听他和网站之间的信息交换，或者跟踪用户的活动，访问记录等，从而窃取用户信息。

* `数据一致性(Data integrity)`，数据在传输的过程中不会被窃听者所修改，用户发送的数据会`完整`的传输到服务端，保证用户发的是什么，服务器接收的就是什么。

* `身份认证(Authentication)`，是指确认对方的真实身份，也就是`证明你是你`（可以比作人脸识别），它可以防止中间人攻击并建立用户信任。

有了上面三个关键指标的保证，用户就可以和服务器进行安全的交换信息了。那么，既然你说了 HTTPS 的种种好处，那么我怎么知道网站是用 HTTPS 的还是 HTTP 的呢？给你两幅图应该就可以解释了。

HTTPS 协议其实非常简单，RFC 文档很小，只有短短的 7 页，里面规定了新的协议名，默认`端口号443`，至于其他的**应答模式、报文结构、请求方法、URI、头字段、连接管理**等等都完全沿用 HTTP，没有任何新的东西。

也就是说，除了协议名称和默认端口号外（HTTP 默认端口 80），HTTPS 协议在语法、语义上和 HTTP 一样，HTTP 有的，HTTPS 也照单全收。那么，HTTPS 如何做到 HTTP 所不能做到的`安全性呢`？关键在于这个 `S` 也就是 `SSL/TLS` 。

## 149 HTTPS 中的 SSL/TLS 是什么？

* created_at: 2023-03-26T05:52:25Z
* updated_at: 2023-03-26T05:52:26Z
* labels: 网络
* milestone: 中

 什么是 SSL/TLS

 认识 SSL/TLS

`TLS(Transport Layer Security)` 是 `SSL(Secure Socket Layer)` 的后续版本，它们是用于在互联网两台计算机之间用于`身份验证`和`加密`的一种协议。

> 注意：在互联网中，很多名称都可以进行互换。

我们都知道一些在线业务（比如在线支付）最重要的一个步骤是创建一个值得信赖的交易环境，能够让客户安心的进行交易，SSL/TLS 就保证了这一点，SSL/TLS 通过将称为 `X.509` 证书的数字文档将网站和公司的实体信息绑定到`加密密钥`来进行工作。每一个`密钥对(key pairs)` 都有一个 `私有密钥(private key)` 和 `公有密钥(public key)`，私有密钥是独有的，一般位于服务器上，用于解密由公共密钥加密过的信息；公有密钥是公有的，与服务器进行交互的每个人都可以持有公有密钥，用公钥加密的信息只能由私有密钥来解密。

> 什么是 `X.509`：X.509 是`公开密钥`证书的标准格式，这个文档将加密密钥与（个人或组织）进行安全的关联。
>
> X.509 主要应用如下
>
>SSL/TLS 和 HTTPS 用于经过身份验证和加密的 Web 浏览
>通过 [S/MIME](https://link.juejin.cn?target=https%3A%2F%2Fwww.ssl.com%2Farticle%2Fsending-secure-email-with-s-mime%2F "https://www.ssl.com/article/sending-secure-email-with-s-mime/") 协议签名和加密的电子邮件
>代码签名：它指的是使用数字证书对软件应用程序进行签名以安全分发和安装的过程。
>>
>>
> 通过使用由知名公共证书颁发机构（例如SSL.com）颁发的证书对软件进行数字签名，开发人员可以向最终用户保证他们希望安装的软件是由已知且受信任的开发人员发布；并且签名后未被篡改或损害。
>
>还可用于文档签名
>还可用于客户端认证

>政府签发的电子身份证（详见 [www.ssl.com/article/pki…](https://link.juejin.cn?target=https%3A%2F%2Fwww.ssl.com%2Farticle%2Fpki-and-digital-certificates-for-government%2F%25EF%25BC%2589 "https://www.ssl.com/article/pki-and-digital-certificates-for-government/%EF%BC%89")
>
> 我们后面还会讨论。

 HTTPS 的内核是 HTTP

HTTPS 并不是一项新的应用层协议，只是 HTTP 通信接口部分由 SSL 和 TLS 替代而已。通常情况下，HTTP 会先直接和 TCP 进行通信。在使用 SSL 的 HTTPS 后，则会先演变为和 SSL 进行通信，然后再由 SSL 和 TCP 进行通信。也就是说，**HTTPS 就是身披了一层 SSL 的 HTTP**。（我都喜欢把骚粉留在最后。。。）

SSL 是一个独立的协议，不只有 HTTP 可以使用，其他应用层协议也可以使用，比如 `SMTP(电子邮件协议)`、`Telnet(远程登录协议)` 等都可以使用。

## 151 HTTPS 加密算法和加解密过程是啥？

* created_at: 2023-03-26T05:58:20Z
* updated_at: 2023-03-26T05:58:21Z
* labels: 网络
* milestone: 资深

 探究 HTTPS

我说，你起这么牛逼的名字干嘛，还想吹牛批？你 HTTPS 不就抱上了 TLS/SSL 的大腿么，咋这么牛批哄哄的，还想探究 HTTPS，瞎胡闹，赶紧改成 TLS 是我主，赞美我主。

SSL 即`安全套接字层`，它在 OSI 七层网络模型中处于第五层，SSL 在 1999 年被 `IETF(互联网工程组)`更名为 TLS ，即`传输安全层`，直到现在，TLS 一共出现过三个版本，1.1、1.2 和 1.3 ，目前最广泛使用的是 1.2，所以接下来的探讨都是基于 TLS 1.2 的版本上的。

TLS 用于两个通信应用程序之间提供保密性和数据完整性。TLS 由**记录协议、握手协议、警告协议、变更密码规范协议、扩展协议**等几个子协议组成，综合使用了**对称加密、非对称加密、身份认证**等许多密码学前沿技术（如果你觉得一项技术很简单，那你只是没有学到位，任何技术都是有美感的，牛逼的人只是欣赏，并不是贬低）。

说了这么半天，我们还没有看到 TLS 的命名规范呢，下面举一个 TLS 例子来看一下 TLS 的结构（可以参考 [www.iana.org/assignments…](https://link.juejin.cn?target=https%3A%2F%2Fwww.iana.org%2Fassignments%2Ftls-parameters%2Ftls-parameters.xhtml%25EF%25BC%2589 "https://www.iana.org/assignments/tls-parameters/tls-parameters.xhtml%EF%BC%89")

```
ECDHE-ECDSA-AES256-GCM-SHA384

```

这是啥意思呢？我刚开始看也有点懵啊，但其实是有套路的，因为 TLS 的密码套件比较规范，基本格式就是 **密钥交换算法 - 签名算法 - 对称加密算法 - 摘要算法** 组成的一个密码串，有时候还有`分组模式`，我们先来看一下刚刚是什么意思

使用 ECDHE 进行密钥交换，使用 ECDSA 进行签名和认证，然后使用 AES 作为对称加密算法，密钥的长度是 256 位，使用 GCM 作为分组模式，最后使用 SHA384 作为摘要算法。

TLS 在根本上使用`对称加密`和 `非对称加密` 两种形式。

 对称加密

在了解对称加密前，我们先来了解一下`密码学`的东西，在密码学中，有几个概念：**明文、密文、加密、解密**

* `明文(Plaintext)`，一般认为明文是有意义的字符或者比特集，或者是通过某种公开编码就能获得的消息。明文通常用 m 或 p 表示
* `密文(Ciphertext)`，对明文进行某种加密后就变成了密文
* `加密(Encrypt)`，把原始的信息（明文）转换为密文的信息变换过程
* `解密(Decrypt)`，把已经加密的信息恢复成明文的过程。

`对称加密(Symmetrical Encryption)`顾名思义就是指**加密和解密时使用的密钥都是同样的密钥**。只要保证了密钥的安全性，那么整个通信过程也就是具有了机密性。

TLS 里面有比较多的加密算法可供使用，比如 DES、3DES、AES、ChaCha20、TDEA、Blowfish、RC2、RC4、RC5、IDEA、SKIPJACK 等。目前最常用的是 AES-128, AES-192、AES-256 和 ChaCha20。

`DES` 的全称是 `Data Encryption Standard(数据加密标准)` ，它是用于数字数据加密的对称密钥算法。尽管其 56 位的短密钥长度使它对于现代应用程序来说太不安全了，但它在加密技术的发展中具有很大的影响力。

`3DES` 是从原始数据加密标准（DES）衍生过来的加密算法，它在 90 年代后变得很重要，但是后面由于更加高级的算法出现，3DES 变得不再重要。

AES-128, AES-192 和 AES-256 都是属于 AES ，AES 的全称是`Advanced Encryption Standard(高级加密标准)`，它是 DES 算法的替代者，安全强度很高，性能也很好，是应用最广泛的对称加密算法。

`ChaCha20` 是 Google 设计的另一种加密算法，密钥长度固定为 256 位，纯软件运行性能要超过 AES，曾经在移动客户端上比较流行，但 ARMv8 之后也加入了 AES 硬件优化，所以现在不再具有明显的优势，但仍然算得上是一个不错算法。

（其他可自行搜索）

 加密分组

对称加密算法还有一个`分组模式` 的概念，对于 GCM 分组模式，只有和 AES，CAMELLIA 和 ARIA 搭配使用，而 AES 显然是最受欢迎和部署最广泛的选择，它可以让算法用固定长度的密钥加密任意长度的明文。

最早有 ECB、CBC、CFB、OFB 等几种分组模式，但都陆续被发现有安全漏洞，所以现在基本都不怎么用了。最新的分组模式被称为 `AEAD（Authenticated Encryption with Associated Data）`，在加密的同时增加了认证的功能，常用的是 GCM、CCM 和 Poly1305。

比如 `ECDHE_ECDSA_AES128_GCM_SHA256` ，表示的是具有 128 位密钥， AES256 将表示 256 位密钥。GCM 表示具有 128 位块的分组密码的现代认证的关联数据加密（AEAD）操作模式。

我们上面谈到了对称加密，对称加密的加密方和解密方都使用同一个`密钥`，也就是说，加密方必须对原始数据进行加密，然后再把密钥交给解密方进行解密，然后才能解密数据，这就会造成什么问题？这就好比《小兵张嘎》去送信（信已经被加密过），但是嘎子还拿着解密的密码，那嘎子要是在途中被鬼子发现了，那这信可就是被完全的暴露了。所以，对称加密存在风险。

 非对称加密

`非对称加密(Asymmetrical Encryption)` 也被称为`公钥加密`，相对于对称加密来说，非对称加密是一种新的改良加密方式。密钥通过网络传输交换，它能够确保及时密钥被拦截，也不会暴露数据信息。非对称加密中有两个密钥，一个是公钥，一个是私钥，公钥进行加密，私钥进行解密。公开密钥可供任何人使用，私钥只有你自己能够知道。

使用公钥加密的文本只能使用私钥解密，同时，使用私钥加密的文本也可以使用公钥解密。公钥不需要具有安全性，因为公钥需要在网络间进行传输，非对称加密可以解决`密钥交换`的问题。网站保管私钥，在网上任意分发公钥，你想要登录网站只要用公钥加密就行了，密文只能由私钥持有者才能解密。而黑客因为没有私钥，所以就无法破解密文。

非对称加密算法的设计要比对称算法难得多（我们不会探讨具体的加密方式），常见的比如 DH、DSA、RSA、ECC 等。

其中 `RSA` 加密算法是最重要的、最出名的一个了。例如 `DHE_RSA_CAMELLIA128_GCM_SHA256`。它的安全性基于 `整数分解`，使用两个超大素数的乘积作为生成密钥的材料，想要从公钥推算出私钥是非常困难的。

`ECC（Elliptic Curve Cryptography）`也是非对称加密算法的一种，它基于`椭圆曲线离散对数`的数学难题，使用特定的曲线方程和基点生成公钥和私钥， ECDHE 用于密钥交换，ECDSA 用于数字签名。

TLS 是使用`对称加密`和`非对称加密` 的混合加密方式来实现机密性。

 混合加密

RSA 的运算速度非常慢，而 AES 的加密速度比较快，而 TLS 正是使用了这种`混合加密`方式。在通信刚开始的时候使用非对称算法，比如 RSA、ECDHE ，首先解决`密钥交换`的问题。然后用随机数产生对称算法使用的`会话密钥（session key）`，再用`公钥加密`。对方拿到密文后用`私钥解密`，取出会话密钥。这样，双方就实现了对称密钥的安全交换。

现在我们使用混合加密的方式实现了机密性，是不是就能够安全的传输数据了呢？还不够，在机密性的基础上还要加上`完整性`、`身份认证`的特性，才能实现真正的安全。而实现完整性的主要手段是 `摘要算法(Digest Algorithm)`

 摘要算法

如何实现完整性呢？在 TLS 中，实现完整性的手段主要是 `摘要算法(Digest Algorithm)`。摘要算法你不清楚的话，MD5 你应该清楚，MD5 的全称是 `Message Digest Algorithm 5`，它是属于`密码哈希算法(cryptographic hash algorithm)`的一种，MD5 可用于从任意长度的字符串创建 128 位字符串值。尽管 MD5 存在不安全因素，但是仍然沿用至今。MD5 最常用于`验证文件`的完整性。但是，它还用于其他安全协议和应用程序中，例如 SSH、SSL 和 IPSec。一些应用程序通过向明文加盐值或多次应用哈希函数来增强 MD5 算法。

> 什么是加盐？在密码学中，`盐`就是一项随机数据，用作哈希数据，密码或密码的`单向`函数的附加输入。盐用于保护存储中的密码。例如
> 什么是单向？就是在说这种算法没有密钥可以进行解密，只能进行单向加密，加密后的数据无法解密，不能逆推出原文。

我们再回到摘要算法的讨论上来，其实你可以把摘要算法理解成一种特殊的压缩算法，它能够把任意长度的数据`压缩`成一种固定长度的字符串，这就好像是给数据加了一把锁。

除了常用的 MD5 是加密算法外，`SHA-1(Secure Hash Algorithm 1)` 也是一种常用的加密算法，不过 SHA-1 也是不安全的加密算法，在 TLS 里面被禁止使用。目前 TLS 推荐使用的是 SHA-1 的后继者：`SHA-2`。

SHA-2 的全称是`Secure Hash Algorithm 2` ，它在 2001 年被推出，它在 SHA-1 的基础上做了重大的修改，SHA-2 系列包含六个哈希函数，其摘要（哈希值）分别为 224、256、384 或 512 位：**SHA-224, SHA-256, SHA-384, SHA-512**。分别能够生成 28 字节、32 字节、48 字节、64 字节的摘要。

有了 SHA-2 的保护，就能够实现数据的完整性，哪怕你在文件中改变一个标点符号，增加一个空格，生成的文件摘要也会完全不同，不过 SHA-2 是基于明文的加密方式，还是不够安全，那应该用什么呢？

安全性更高的加密方式是使用 `HMAC`，在理解什么是 HMAC 前，你需要先知道一下什么是 MAC。

MAC 的全称是`message authentication code`，它通过 MAC 算法从消息和密钥生成，MAC 值允许验证者（也拥有秘密密钥）检测到消息内容的任何更改，从而保护了消息的数据完整性。

HMAC 是 MAC 更进一步的拓展，它是使用 MAC 值 + Hash 值的组合方式，HMAC 的计算中可以使用任何加密哈希函数，例如 SHA-256 等。

现在我们又解决了完整性的问题，那么就只剩下一个问题了，那就是`认证`，认证怎么做的呢？我们再向服务器发送数据的过程中，黑客（攻击者）有可能伪装成任何一方来窃取信息。它可以伪装成你，来向服务器发送信息，也可以伪装称为服务器，接受你发送的信息。那么怎么解决这个问题呢？

 认证

如何确定你自己的唯一性呢？我们在上面的叙述过程中出现过公钥加密，私钥解密的这个概念。提到的私钥只有你一个人所有，能够辨别唯一性，所以我们可以把顺序调换一下，变成私钥加密，公钥解密。使用私钥再加上摘要算法，就能够实现`数字签名`，从而实现认证。

到现在，综合使用对称加密、非对称加密和摘要算法，我们已经实现了**加密、数据认证、认证**，那么是不是就安全了呢？非也，这里还存在一个**数字签名的认证问题**。因为私钥是是自己的，公钥是谁都可以发布，所以必须发布经过认证的公钥，才能解决公钥的信任问题。

所以引入了 `CA`，CA 的全称是 `Certificate Authority`，证书认证机构，你必须让 CA 颁布具有认证过的公钥，才能解决公钥的信任问题。

全世界具有认证的 CA 就几家，分别颁布了 DV、OV、EV 三种，区别在于可信程度。DV 是最低的，只是域名级别的可信，EV 是最高的，经过了法律和审计的严格核查，可以证明网站拥有者的身份（在浏览器地址栏会显示出公司的名字，例如 Apple、GitHub 的网站）。不同的信任等级的机构一起形成了层级关系。

通常情况下，数字证书的申请人将生成由私钥和公钥以及证书`签名请求（CSR）`组成的密钥对。CSR是一个编码的文本文件，其中包含公钥和其他将包含在证书中的信息（例如域名，组织，电子邮件地址等）。密钥对和 CSR生成通常在将要安装证书的服务器上完成，并且 CSR 中包含的信息类型取决于证书的验证级别。与公钥不同，申请人的私钥是安全的，永远不要向 CA（或其他任何人）展示。

生成 CSR 后，申请人将其发送给 CA，CA 会验证其包含的信息是否正确，如果正确，则使用颁发的私钥对证书进行数字签名，然后将其发送给申请人。

 总结

本篇文章我们主要讲述了 HTTPS 为什么会出现 ，HTTPS 解决了 HTTP 的什么问题，HTTPS 和 HTTP 的关系是什么，TLS 和 SSL 是什么，TLS 和 SSL 解决了什么问题？如何实现一个真正安全的数据传输？

 文章参考

* [资料](https://juejin.cn/post/6844904089495535624)

[www.ssl.com/faqs/what-i…](https://link.juejin.cn?target=https%3A%2F%2Fwww.ssl.com%2Ffaqs%2Fwhat-is-a-certificate-authority%2F "https://www.ssl.com/faqs/what-is-a-certificate-authority/")

[www.ibm.com/support/kno…](https://link.juejin.cn?target=https%3A%2F%2Fwww.ibm.com%2Fsupport%2Fknowledgecenter%2Fen%2FSSFKSJ_7.1.0%2Fcom.ibm.mq.doc%2Fsy10670_.htm "https://www.ibm.com/support/knowledgecenter/en/SSFKSJ_7.1.0/com.ibm.mq.doc/sy10670_.htm")

[en.wikipedia.org/wiki/Messag…](https://link.juejin.cn?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FMessage_authentication_code "https://en.wikipedia.org/wiki/Message_authentication_code")

[en.wikipedia.org/wiki/HMAC](https://link.juejin.cn?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FHMAC "https://en.wikipedia.org/wiki/HMAC")

[www.quora.com/What-does-i…](https://link.juejin.cn?target=https%3A%2F%2Fwww.quora.com%2FWhat-does-it-mean-to-add-a-salt-to-a-password-hash "https://www.quora.com/What-does-it-mean-to-add-a-salt-to-a-password-hash")

[hpbn.co/transport-l…](https://link.juejin.cn?target=https%3A%2F%2Fhpbn.co%2Ftransport-layer-security-tls%2F "https://hpbn.co/transport-layer-security-tls/")

[www.ssl2buy.com/wiki/symmet…](https://link.juejin.cn?target=https%3A%2F%2Fwww.ssl2buy.com%2Fwiki%2Fsymmetric-vs-asymmetric-encryption-what-are-differences "https://www.ssl2buy.com/wiki/symmetric-vs-asymmetric-encryption-what-are-differences")

[crypto.stackexchange.com/questions/2…](https://link.juejin.cn?target=https%3A%2F%2Fcrypto.stackexchange.com%2Fquestions%2F26410%2Fwhats-the-gcm-sha-256-of-a-tls-protocol "https://crypto.stackexchange.com/questions/26410/whats-the-gcm-sha-256-of-a-tls-protocol")

[en.wikipedia.org/wiki/Advanc…](https://link.juejin.cn?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FAdvanced_Encryption_Standard "https://en.wikipedia.org/wiki/Advanced_Encryption_Standard")

[www.comparitech.com/blog/inform…](https://link.juejin.cn?target=https%3A%2F%2Fwww.comparitech.com%2Fblog%2Finformation-security%2F3des-encryption%2F "https://www.comparitech.com/blog/information-security/3des-encryption/")

《极客时间-透析 HTTP 协议》

[www.tutorialsteacher.com/https/how-s…](https://link.juejin.cn?target=https%3A%2F%2Fwww.tutorialsteacher.com%2Fhttps%2Fhow-ssl-works "https://www.tutorialsteacher.com/https/how-ssl-works")

[baike.baidu.com/item/密码系统/5…](https://link.juejin.cn?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%25E5%25AF%2586%25E7%25A0%2581%25E7%25B3%25BB%25E7%25BB%259F%2F5823651 "https://baike.baidu.com/item/%E5%AF%86%E7%A0%81%E7%B3%BB%E7%BB%9F/5823651")

[baike.baidu.com/item/对称加密/2…](https://link.juejin.cn?target=https%3A%2F%2Fbaike.baidu.com%2Fitem%2F%25E5%25AF%25B9%25E7%25A7%25B0%25E5%258A%25A0%25E5%25AF%2586%2F2152944%3Ffr%3Daladdin "https://baike.baidu.com/item/%E5%AF%B9%E7%A7%B0%E5%8A%A0%E5%AF%86/2152944?fr=aladdin")

[www.ssl.com/faqs/faq-wh…](https://link.juejin.cn?target=https%3A%2F%2Fwww.ssl.com%2Ffaqs%2Ffaq-what-is-ssl%2F "https://www.ssl.com/faqs/faq-what-is-ssl/")

[en.wikipedia.org/wiki/HTTPS](https://link.juejin.cn?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FHTTPS "https://en.wikipedia.org/wiki/HTTPS")

[support.google.com/webmasters/…](https://link.juejin.cn?target=https%3A%2F%2Fsupport.google.com%2Fwebmasters%2Fanswer%2F6073543%3Fhl%3Den "https://support.google.com/webmasters/answer/6073543?hl=en")

[www.cloudflare.com/learning/ss…](https://link.juejin.cn?target=https%3A%2F%2Fwww.cloudflare.com%2Flearning%2Fssl%2Fwhy-is-http-not-secure%2F "https://www.cloudflare.com/learning/ssl/why-is-http-not-secure/")

[www.cisco.com/c/en/us/pro…](https://link.juejin.cn?target=https%3A%2F%2Fwww.cisco.com%2Fc%2Fen%2Fus%2Fproducts%2Fsecurity%2Fwhat-is-network-security.html "https://www.cisco.com/c/en/us/products/security/what-is-network-security.html")

[www.freecodecamp.org/news/web-se…](https://link.juejin.cn?target=https%3A%2F%2Fwww.freecodecamp.org%2Fnews%2Fweb-security-an-introduction-to-http-5fa07140f9b3%2F "https://www.freecodecamp.org/news/web-security-an-introduction-to-http-5fa07140f9b3/")

## 152 页面崩溃如何监控？

* created_at: 2023-03-26T06:04:12Z
* updated_at: 2023-03-26T06:04:13Z
* labels: 网络
* milestone: 高

 页面崩溃如何监控？

对于 web 页面线上监控，如果页面崩溃了，通常会出现 500 或 404 状态码，或者页面停止响应或显示白屏等情况。

以下是一些监控崩溃的方法：

1. 使用网站性能监测工具：这些工具可以检测页面的状态码和响应时间，如果页面崩溃了，就会发出警报。一些流行的性能监测工具包括 New Relic, Pingdom, 和 UptimeRobot 等。

2. 设置异常检测：异常检测可以监测页面异常的行为，例如页面响应时间超过特定时间限制，或者页面元素加载失败等。通过设置这些异常检测，可以在页面崩溃时自动触发警报。

3. 实时用户行为监测：实时监测用户行为可以帮助识别用户在页面上的行为，例如页面停留时间，点击按钮的位置等，以便检测页面异常行为。这些监测可以使用 Google Analytics, Mixpanel 等网站分析工具实现。

4. 前端代码错误监测：使用前端监测工具，例如 Sentry, Raygun, 和 Bugsnag 等，可以监测前端代码错误，包括 JavaScript 和 CSS 错误，以便快速识别和解决问题。

通过以上方法的一些组合使用，可以帮助您监控 web 页面的崩溃，及时发现和解决问题，提升用户体验和网站可靠性。

 如果是页面运行时页面崩溃， 如何监控？

如果在运行时发生页面崩溃，可以使用以下方法进行监控：

1. 实时监控日志：可以设置日志监控，将日志实时发送到日志收集工具，例如 ELK Stack、Splunk 等。这些工具可以分析和提取有关页面崩溃的信息，例如错误消息、堆栈跟踪等，以便快速识别和解决问题。

2. 页面截图：当页面崩溃时，可以使用截图工具进行截屏，以捕获页面的当前状态。这些截图可以用于快速检查页面崩溃的根本原因。

3. 人工检测：可以雇用专业的质量测试人员或专业服务公司进行页面质量测试，以便在页面崩溃时进行手动检测和识别。

4. 实时异常检测：实时监测页面异常的行为，例如页面响应时间超过特定时间限制，或者页面元素加载失败等。通过设置这些异常检测，可以在页面崩溃时自动触发警报。

通过以上方法的一些组合使用，可以帮助您在运行时监控 web 页面的崩溃，及时发现和解决问题，提升用户体验和网站可靠性。

## 153 如何监控前端页面内存持续增长情况？

* created_at: 2023-03-26T06:07:49Z
* updated_at: 2023-03-26T06:07:50Z
* labels: 网络
* milestone: 高

监控前端页面内存持续增长可以帮助我们及时发现内存泄漏和其他内存问题，从而优化前端页面的性能和稳定性。以下是一些监控前端页面内存持续增长的方法：

1. 使用浏览器开发工具：现代浏览器的开发工具提供了内存监控功能。您可以使用 Chrome 开发者工具、Firefox 开发者工具等浏览器工具来监控内存的使用情况，并在内存使用超过阈值时进行警报。

2. 手动检查页面代码：您可以手动检查页面的代码，特别是 JavaScript 代码和其他 DOM 操作，以查找可能导致内存泄漏的问题。例如，可能存在未清理的定时器、事件监听器、未释放的 DOM 元素等。

3. 使用性能监测工具：性能监测工具，例如 New Relic、AppDynamics 等，可以监测前端页面的性能，并提供关于内存使用的警报和报告。

4. 使用内存检测工具：内存检测工具，例如 memoryjs、heapdump.js 等，可以帮助检测内存泄漏和内存问题。这些工具可以生成内存快照，分析内存使用情况，以及识别潜在的内存泄漏问题。

通过以上方法的一些组合使用，可以帮助您监控前端页面内存持续增长的情况，及时发现和解决内存问题，提升用户体验和网站可靠性。

## 154 常见的前端内存泄露场景有哪些？

* created_at: 2023-03-26T06:15:29Z
* updated_at: 2023-03-26T06:15:30Z
* labels: JavaScript, 浏览器
* milestone: 中

大多数情况下，垃圾回收器会帮我们及时释放内存，一般不会发生内存泄漏。但是有些场景是内存泄漏的高发区，我们在使用的时候一定要注意：

* 我们在开发的时候经常会使用`console`在控制台打印信息，但这也会带来一个问题：被`console`使用的对象是不能被垃圾回收的，这就可能会导致内存泄漏。因此在生产环境中不建议使用`console.log()`的理由就又可以加上一条避免内存泄漏了。

* 被全局变量、全局函数引用的对象，在Vue组件销毁时未清除，可能会导致内存泄漏

 ```js
 // Vue3
 <script setup>
 import {onMounted, onBeforeUnmount, reactive} from 'vue'
 const arr = reactive([1,2,3]);
 onMounted(() => {
 window.arr = arr; // 被全局变量引用
 window.arrFunc = () => {
 console.log(arr); // 被全局函数引用
 }
 })
 // 正确的方式
 onBeforeUnmount(() => {
 window.arr = null;
 window.arrFunc = null;
 })
 </script>
 
 ```

* 定时器未及时在Vue组件销毁时清除，可能会导致内存泄漏

 ```js
 // Vue3
 <script setup>
 import {onMounted, onBeforeUnmount, reactive} from 'vue'
 const arr = reactive([1,2,3]);
 const timer = reactive(null);
 onMounted(() => {
 setInterval(() => {
 console.log(arr); // arr被定时器占用，无法被垃圾回收
 }, 200);
 // 正确的方式
 timer = setInterval(() => {
 console.log(arr);
 }, 200);
 })
 // 正确的方式
 onBeforeUnmount(() => {
 if (timer) {
 clearInterval(timer);
 timer = null;
 }
 })
 </script>
 
 ```

 `setTimeout`和`setInterval`两个定时器在使用时都应该注意是否需要清理定时器，特别是`setInterval`，一定要注意清除。

* 绑定的事件未及时在Vue组件销毁时清除，可能会导致内存泄漏

 绑定事件在实际开发中经常遇到，我们一般使用`addEventListener`来创建。

 ```js
 // Vue3
 <script setup>
 import {onMounted, onBeforeUnmount, reactive} from 'vue'
 const arr = reactive([1,2,3]);
 const printArr = () => {
 console.log(arr)
 }
 onMounted(() => {
 // 监听事件绑定的函数为匿名函数，将无法被清除
 window.addEventListener('click', () => {
 console.log(arr); // 全局绑定的click事件，arr被引用，将无法被垃圾回收
 })
 // 正确的方式
 window.addEventListener('click', printArr);
 })
 // 正确的方式
 onBeforeUnmount(() => {
 // 注意清除绑定事件需要前后是同一个函数，如果函数不同将不会清除
 window.removeEventListener('click', printArr);
 })
 </script>
 
 ```

* 被自定义事件引用，在Vue组件销毁时未清除，可能会导致内存泄漏

 自定义事件通过`emit/on`来发起和监听，清除自定义事件和绑定事件差不多，不同的是需要调用`off`方法

 ```js
 // Vue3
 <script setup>
 import {onMounted, onBeforeUnmount, reactive} from 'vue'
 import event from './event.js'; // 自定义事件
 const arr = reactive([1,2,3]);
 const printArr = () => {
 console.log(arr)
 }
 onMounted(() => {
 // 使用匿名函数，会导致自定义事件无法被清除
 event.on('printArr', () => {
 console.log(arr)
 })
 // 正确的方式
 event.on('printArr', printArr)
 })
 // 正确的方式
 onBeforeUnmount(() => {
 // 注意清除自定义事件需要前后是同一个函数，如果函数不同将不会清除
 event.off('printArr', printArr)
 })
 </script>
 
 ```

除了及时清除监听器、事件等，对于全局变量的引用，我们可以选择`WeakMap`、`WeakSet`等弱引用数据类型。这样的话，即使我们引用的对象数据要被垃圾回收，弱引用的全局变量并不会阻止GC。

## 155 常见的前端检测内存泄露的方法有哪些？

* created_at: 2023-03-26T06:20:42Z
* updated_at: 2023-03-26T06:21:50Z
* labels: JavaScript, 浏览器
* milestone: 高

 怎么检测内存泄漏

内存泄漏主要是指的是内存持续升高，但是如果是正常的内存增长的话，不应该被当作内存泄漏来排查。排查内存泄漏，我们可以借助`Chrome DevTools`的`Performance`和`Memory`选项。举个栗子：

我们新建一个`memory.html`的文件，完整代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta http-equiv="X-UA-Compatible" content="IE=edge">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>Document</title>
 <style>
 body {
 text-align: center;
 }
 </style>
</head>
<body>
 <p>检测内存变化</p>
 <button id="btn">开始</button>
 <script>
 const arr = [];
 // 数组中添加100万个数据
 for (let i = 0; i < 10010000; i++) {
 arr.push(i)
 }
 function bind() {
 const obj = {
 str: JSON.stringify(arr) // 浅拷贝的方式创建一个比较大的字符串
 }
 // 每次调用bind函数，都在全局绑定一个onclick监听事件，不一定非要执行
 // 使用绑定事件，主要是为了保持obj被全局标记
 window.addEventListener('click', () => {
 // 引用对象obj
 console.log(obj);
 })
 }
 let n = 0;
 function start() {
 setTimeout(() => {
 bind(); // 调用bind函数
 n++; // 循环次数增加
 if (n < 50) {
 start(); // 循环执行50次，注意这里并没有使用setInterval定时器
 } else {
 alert('done');
 }
 }, 200);
 }
 document.getElementById('btn').addEventListener('click', () => {
 start();
 })
 </script>
</body>
</html>

```

页面上有一个按钮用来开始函数调用，方便我们控制。点击按钮，每个200毫秒执行一次bind函数，即在全局监听click事件，循环次数为50次。

在无法确定是否发生内存泄漏时，我们可以先使用Performance来录制一段页面加载的性能变化，先判断是否有内存泄漏发生。

 Performance

本次案例仅以Chrome浏览器展开描述，其他浏览器可能会有些许差异。首先我们鼠标右键选择检查或者直接F12进入DevTools页面，面板上选择`Performance`，选择后应该是如下页面：

在开始之前，我们先点击一下`Collect garbage`和`clear`来保证内存干净，没有其他遗留内存的干扰。然后我们点击`Record`来开始录制，并且同时我们也要点击页面上的`开始`按钮，让我们的代码跑起来。等到代码结束后，我们再点击`Record`按钮以停止录制，录制的时间跟代码执行的时间相比会有出入，只要保证代码是完全执行完毕的即可。停止录制后，我们会得到如下的结果：

`Performance`的内容很多，我们只需要关注内存的变化，由此图可见，内存这块区域的曲线是在一直升高的并且到达顶点后并没有回落，这就有可能发生了内存泄漏。因为正常的内存变化曲线应该是类似于“锯齿”，也就是有上有下，正常增长后会有一定的回落，但不一定回落到和初始值一样。而且我们还可以隐约看到程序运行结束后，内存从初始的6.2MB增加到了差不多351MB，这个数量级的增加还是挺明显的。我们只是执行了50次循环，如果执行的次数更多，将会耗尽浏览器的内存空间，导致页面卡死。

虽然是有内存泄漏，但是如果我们想进一步看内存泄漏发生的地方，那么`Performance`就不够用了，这个时候我们就需要使用`Memory`面板。

 Memory

DevTools的Memory选项主要是用来录制堆内存的快照，为的是进一步分析内存泄漏的详细信息。有人可能会说，为啥不一开始就直接使用`Memory`呢，反而是先使用`Performance`。因为我们刚开始就说了，内存增长不表示就一定出现了内存泄漏，有可能是正常的增长，直接使用Memory来分析可能得不到正确的结果。

我们先来看一下怎么使用`Memory`：

首先选择`Memory`选项，然后清除缓存，在配置选项中选择堆内存快照。内存快照每次点击录制按钮都会记录当前的内存使用情况，我们可以在程序开始前点击一下记录初始的内存使用，代码结束后再点一下记录最终的内存使用，中间可以点击也可以不点击。最后在快照列表中至少可以得到两个内存记录：

初始内存我们暂时不深究，我们选择列表的最后一条记录，然后在筛选下拉框选择最后一个，即第一个快照和第二个快照的差异。

这里我们重点说一下`Shallow Size`和`Retained Size`的区别：

* Shallow Size：对象自身占用的内存大小，一般来说字符串、数组的Shallow Size都会比较大
* Retained Size：这个是对象自身占用的内存加上无法被GC释放的内存的大小，如果Retained Size和Shallow Size相差不大，基本上可以判定没有发生内存泄漏，但是**如果相差很大**，例如上图的`Object`，这就表明发生了内存泄漏。

我们再来细看一下`Object`，任意展开一个对象，可以在树结构中发现每一个对象都有一个全局事件绑定，并且占用了较大的内存空间。解决本案例涉及的内存泄漏也比较简单，就是及时释放绑定的全局事件。

关于`Performance`和`Memory`的详细使用可以参考：[手把手教你排查Javascript内存泄漏](https://link.juejin.cn?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F322356761 "https://zhuanlan.zhihu.com/p/322356761")

## 156 实现 table header 吸顶， 有哪些实现方式？

* created_at: 2023-03-26T06:25:35Z
* updated_at: 2023-03-26T06:25:36Z
* labels: CSS
* milestone: 中

实现 table header 吸顶的方法有多种，以下是一些基于 CSS 的实现方式：

1. 使用 position: sticky 属性：在表格头部的 CSS 中，使用 position: sticky 属性可以使表格头部保持在视窗的顶部或底部，而不会随着滚动而消失。例如：

 ```css
 cssCopy codeth {
 position: sticky;
 top: 0;
 background-color: #fff;
 }
 ```

2. 使用 CSS transform 属性：在表格头部的 CSS 中，使用 CSS transform 属性可以使表格头部保持固定位置，而不会随着滚动而消失。例如：

 ```css
 cssCopy codeth {
 position: relative;
 z-index: 1;
 }
 thead {
 position: fixed;
 top: 0;
 visibility: hidden;
 z-index: 2;
 transform: translateY(0);
 }
 tbody {
 margin-top: 50px;
 }
 ```

3. 使用 JavaScript 和 CSS：使用 JavaScript 和 CSS 可以使表格头部保持在视窗的顶部或底部，而不会随着滚动而消失。例如：

 ```html
 htmlCopy code<div class="table-wrapper">
 <table>
 <thead>
 <tr>
 <th>Column 1</th>
 <th>Column 2</th>
 <th>Column 3</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td>Row 1, Column 1</td>
 <td>Row 1, Column 2</td>
 <td>Row 1, Column 3</td>
 </tr>
 <tr>
 <td>Row 2, Column 1</td>
 <td>Row 2, Column 2</td>
 <td>Row 2, Column 3</td>
 </tr>
 ...
 </tbody>
 </table>
 </div>
 <script>
 window.onscroll = function() {
 var header = document.querySelector(".table-wrapper thead");
 if (window.pageYOffset > 150) {
 header.classList.add("sticky");
 } else {
 header.classList.remove("sticky");
 }
 };
 </script>
 <style>
 .table-wrapper {
 position: relative;
 }
 .table-wrapper thead {
 position: fixed;
 top: 0;
 z-index: 1;
 background-color: #fff;
 }
 .table-wrapper th {
 height: 50px;
 }
 .table-wrapper.sticky thead {
 position: absolute;
 top: 50px;
 }
 </style>
 ```

通过以上方法的一些组合使用，可以实现 table header 吸顶，提升表格的用户体验和易用性。

## 157 CSS 文档流 是什么概念？

* created_at: 2023-03-26T06:27:52Z
* updated_at: 2023-03-26T06:27:53Z
* labels: CSS
* milestone: 初

CSS 的文档流（Document Flow）是指文档中元素按照其在 HTML 中出现的顺序自上而下布局的方式，也称为常规流（Normal Flow）或默认流。文档流定义了元素的布局顺序和定位方式，包括元素的位置、大小、间距等属性。

在文档流中，每个元素都会占据一定的空间并尽可能充满其包含块的宽度。每个元素的位置都会受到前面元素的影响，如果前面的元素发生位置变化，那么后面的元素的位置也会发生相应的变化。

文档流中的元素按照下面的规则排列：

1. 块级元素：块级元素会独占一行，并在前面自动添加一个垂直间距。例如：`<p>`、`<div>`、`<h1>` 等。

2. 行内元素：行内元素会在一行中排列，并且宽度根据内容自适应。例如：`<a>`、`<span>`、`<img>` 等。

3. 行内块级元素：行内块级元素与行内元素类似，但是它可以设置宽度、高度等块级元素的属性。例如：`<input>`、`<button>`、`<textarea>` 等。

文档流是 CSS 中最基本、最重要的概念之一，它决定了网页的整体布局和排版方式，也是实现网页布局的基础。在实际开发中，我们需要理解文档流的特性和工作原理，以便更好地掌握网页布局和样式的设计。

## 158 CSS 中 position 常见属性有哪些，大概讲一下？

* created_at: 2023-03-26T06:29:30Z
* updated_at: 2023-03-26T06:29:31Z
* labels: CSS
* milestone: 初

CSS 中 `position` 属性用于指定元素的定位方式，它有以下常见的属性值：

1. `static`：默认值，元素在文档流中正常排列。

2. `relative`：元素在文档流中正常排列，但是可以通过设置 `top`、`right`、`bottom`、`left` 属性相对于其正常位置进行偏移，不会影响其它元素的位置。

3. `absolute`：元素脱离文档流，相对于最近的非 `static` 定位的祖先元素进行定位，如果没有则相对于 `<html>` 元素进行定位。通过设置 `top`、`right`、`bottom`、`left` 属性进行偏移，如果祖先元素发生位置变化，则元素的位置也会发生相应的变化。

4. `fixed`：元素脱离文档流，相对于浏览器窗口进行定位，始终保持在窗口的固定位置，不会随页面滚动而滚动。通过设置 `top`、`right`、`bottom`、`left` 属性进行偏移。

5. `sticky`：元素在文档流中正常排列，当元素滚动到指定的位置时，停止滚动并固定在该位置，直到其祖先元素发生滚动时才会取消固定。通过设置 `top`、`right`、`bottom`、`left` 属性和 `z-index` 属性进行设置。

以上是 `position` 属性的常见属性值和简单说明，不同的值会对元素进行不同的定位方式，开发人员可以根据需要选择合适的值来实现页面布局。

## 159 [Vue] 父子组件通信方式有哪些？

* created_at: 2023-03-26T06:34:56Z
* updated_at: 2023-03-26T06:35:48Z
* labels: web框架
* milestone: 中

Vue 父子组件通信

* Prop（常用）
* $emit (组件封装用的较多)
* .sync语法糖 （较少）
* $attrs & $listeners (组件封装用的较多)
* provide & inject （高阶组件/组件库用的较多）
* slot-scope & v-slot （vue@2.6.0+）新增
* scopedSlots 属性
* 其他方式通信

具体使用场景参考链接：[资料](https://juejin.cn/post/6844903700243316749)

## 160 什么是洋葱模型？

* created_at: 2023-03-26T06:38:58Z
* updated_at: 2023-03-26T06:38:58Z
* labels: web框架
* milestone: 中

说到洋葱模型，就必须聊一聊中间件，中间件这个概念，我们并不陌生，比如平时我们用的 `redux`、`express` 、`koa` 这些库里，都离不开中间件。

那 `koa` 里面的中间件是什么样的呢？其本质上是一个函数，这个函数有着特定，单一的功能，`koa`将一个个中间件注册进来，通过**组合**实现强大的功能。

先看 `demo` ：

```js
// index.js
const Koa = require('koa')
const app = new Koa()

// 中间件1
app.use(async (ctx, next) => {
  console.log('1')
  await next()
  console.log('2')
})
// 中间件2
app.use(async (ctx, next) => {
  console.log('3')
  await next()
  console.log('4')
})
// 中间件3
app.use(async (ctx, next) => {
  console.log('5')
  await next()
  console.log('6')
})
app.listen(8002)
```

先后注册了三个中间件，运行一下`index.js` ，可以看到输出结果为：

```js
1
3
5
6
4
2
```

没接触过洋葱模型的人第一眼可能会疑惑，为什么调用了一个 `next` 之后，直接从`1` 跳到了 `3` ，而不是先输出`1` ，再输出`2`呢。 其实这就是洋葱模型特点，下图是它的执行过程：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/80798be002944d67a46c456d4af3c03c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 一开始我们先后注册了三个中间件，分别是中间件1，中间件2，中间件3，调用`listen`方法，打开对应端口的页面，触发了中间件的执行。

首先会先执行第一个中间件的 `next` 的前置语句，相当于 `demo` 里面的 `console.log('1')` ，当调用 `next()` 之后，会直接进入第二个中间件，继续重复上述逻辑，直至最后一个中间件，就会执行 `next` 的后置语句，然后继续上一个中间件的后置语句，继续重复上述逻辑，直至执行第一个中间件的后置语句，最后输出。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/935675e49480426eb517a68c224673c7~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 正是因为它这种执行机制，才被称为**洋葱模型**。

## 161 如何实现洋葱模式？

* created_at: 2023-03-26T06:44:01Z
* updated_at: 2023-03-26T06:44:02Z
* labels: web框架
* milestone: 高

**思路**

* 首先调用 `use` 方法收集中间件，调用 `listen` 方法执行中间件。
* 每一个中间件都有一个`next`参数（暂时不考虑ctx参数），`next`参数可以控制进入下一个中间件的时机。

**需要解决的问题**

* 最后一个中间件调用next如何处理
* 如何解决同一个中间件多次调用next

**完整代码**

其中最精华的部分就是`compose`函数，细数一下，只有`11`行代码，1比1还原了`koa`的`compose`函数（去除了不影响主逻辑判断）。

> koa是利用koa-compose这个库进行组合中间件的，在koa-compose里面，next返回的都是一个promise函数。

```js
function Koa () {
  this.middleares = []
}
Koa.prototype.use = function (middleare) {
  this.middleares.push(middleare)
  return this
}
Koa.prototype.listen = function () {
  const fn = compose(this.middleares)
}
function compose (middleares) {
  let index = -1
  const dispatch = (i) => {
    if (i <= index) throw new Error('next（） 不能调用多次')
    index = i
    if (i >= middleares.length) return
    const middleare = middleares[i]
    return middleare('ctx', dispatch.bind(null, i + 1))
  }
  return dispatch(0)
}

const app = new Koa()
app.use(async (ctx, next) => {
  console.log('1')
  next()
  console.log('2')
})
app.use(async (ctx, next) => {
  console.log('3')
  next()
  console.log('4')
})
app.use(async (ctx, next) => {
  console.log('5')
  next()
  console.log('6')
})

app.listen()
```

**使用**

```js
const Koa = require('koa')
const app = new Koa()

// 中间件过多，可以创建一个middleares文件夹，将cors函数放到middleares/cors.js文件里面
const cors = () => {
  return async (ctx, next) => {
    ctx.set('Access-Control-Allow-Headers', 'X-Requested-With')
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')
    await next()
  }
}

app.use(cors())
app.use(async (ctx, next) => {
  console.log('第一个中间件', ctx.request.method, ctx.request.url)
  await next()
  ctx.body = 'hello world'
})
```

`koa`的中间件都是有固定模板的，首先是一个函数，并且返回一个`async`函数（闭包的应用），这个`async`函数有两个参数，一个是`koa`的`context`，一个是`next`函数。

## 164 [koa] 中间件的异常处理是怎么做的？

* created_at: 2023-03-26T07:34:30Z
* updated_at: 2023-03-26T07:34:30Z
* labels: web框架
* milestone: 中

在 Koa 中，中间件函数的异常处理可以通过两种方式来实现：

1. 使用 `try...catch` 捕获异常：在中间件函数中使用 `try...catch` 语句来捕获异常，然后通过 `ctx.throw()` 方法抛出异常信息，例如：

```vbnet
vbnetCopy codeasync function myMiddleware(ctx, next) {
 try {
 await next();
 } catch (err) {
 ctx.throw(500, 'Internal Server Error');
 }
}
```

在这个例子中，`await next()` 表示调用下一个中间件函数，如果这个函数抛出异常，就会被捕获到，然后通过 `ctx.throw()` 方法抛出一个包含错误状态码和错误信息的异常。

2. 使用 Koa 的错误处理中间件：Koa 提供了一个错误处理中间件 `koa-json-error`，可以通过在应用程序中使用该中间件来处理异常。这个中间件会自动捕获应用程序中未被处理的异常，并将错误信息以 JSON 格式返回给客户端。例如：

```javascript
const Koa = require('koa')
const jsonError = require('koa-json-error')

const app = new Koa()

// 注册错误处理中间件
app.use(jsonError())

// 中间件函数
async function myMiddleware (ctx, next) {
  await next()
  throw new Error('Internal Server Error')
}

// 应用中间件
app.use(myMiddleware)

// 启动服务器
app.listen(3000)
```

在这个例子中，`koa-json-error` 中间件会自动捕获应用程序中未被处理的异常，并将错误信息以 JSON 格式返回给客户端。开发人员可以通过自定义错误处理函数来处理异常，例如：

```javascript
const Koa = require('koa')
const jsonError = require('koa-json-error')

const app = new Koa()

// 自定义错误处理函数
function errorHandler (err, ctx) {
  ctx.status = err.status || 500
  ctx.body = {
    message: err.message,
    status: ctx.status
  }
}

// 注册错误处理中间件
app.use(jsonError(errorHandler))

// 中间件函数
async function myMiddleware (ctx, next) {
  await next()
  throw new Error('Internal Server Error')
}

// 应用中间件
app.use(myMiddleware)

// 启动服务器
app.listen(3000)
```

在这个例子中，我们自定义了一个错误处理函数 `errorHandler`，将错误信息格式化为 JSON 格式，并设置响应状态码。然后将这个函数作为参数传递给 `koa-json-error` 中间件，用于处理异常。

## 168 [koa] 在没有async await 的时候, koa是怎么实现的洋葱模型？

* created_at: 2023-03-26T07:51:12Z
* updated_at: 2023-03-26T07:51:12Z
* labels: web框架
* milestone: 高

在没有 `async/await` 的时候，Koa 通过使用 ES6 的生成器函数来实现洋葱模型。具体来说，Koa 中间件函数是一个带有 `next` 参数的生成器函数，当中间件函数调用 `next` 方法时，它会挂起当前的执行，转而执行下一个中间件函数，直到执行完最后一个中间件函数，然后将执行权返回到前一个中间件函数，继续执行下面的代码。这个过程就像一层一层剥开洋葱一样，因此被称为洋葱模型。

下面是一个使用生成器函数实现的简单的 Koa 中间件函数：

```javascript
function * myMiddleware (next) {
  // 中间件函数的代码
  console.log('Start')
  yield next
  console.log('End')
}
```

在这个中间件函数中，`yield next` 表示挂起当前的执行，执行下一个中间件函数。假设我们有两个中间件函数 `middleware1` 和 `middleware2`，它们的代码如下：

```javascript
function * middleware1 (next) {
  console.log('middleware1 Start')
  yield next
  console.log('middleware1 End')
}

function * middleware2 (next) {
  console.log('middleware2 Start')
  yield next
  console.log('middleware2 End')
}
```

我们可以使用 `compose` 函数将它们组合成一个洋葱模型：

```scss
scssCopy codeconst compose = require('koa-compose');

const app = compose([middleware1, middleware2]);

app();
```

在这个例子中，`compose` 函数将 `middleware1` 和 `middleware2` 组合成一个函数 `app`，然后调用这个函数即可执行整个中间件链。执行的结果如下：

```sql
sqlCopy codemiddleware1 Start
middleware2 Start
middleware2 End
middleware1 End
```

可以看到，这个结果与洋葱模型的特点相符。

## 169 [koa] body-parser 中间件实现原理？

* created_at: 2023-03-26T07:53:06Z
* updated_at: 2023-03-26T07:53:06Z
* labels: web框架
* milestone: 高

Koa 中间件 `koa-bodyparser` 的原理是将 HTTP 请求中的 `request body` 解析成 JavaScript 对象，并将其挂载到 `ctx.request.body` 属性上，方便后续的处理。

具体来说，`koa-bodyparser` 中间件会监听 HTTP 请求的 `data` 事件和 `end` 事件，然后将请求中的数据流解析成一个 JavaScript 对象，并将其作为参数传递给 `ctx.request.body` 属性，最后调用 `await next()`，将控制权交给下一个中间件。

在实现过程中，`koa-bodyparser` 中间件会根据请求头中的 `Content-Type` 字段来判断请求体的类型，支持解析的请求体类型有 `application/json`、`application/x-www-form-urlencoded` 和 `multipart/form-data`。对于其他类型的请求体，`koa-bodyparser` 会将其解析成一个空对象 `{}`。

下面是一个简单的 `koa-bodyparser` 中间件的实现示例：

```javascript
function bodyParser () {
  return async (ctx, next) => {
    if (ctx.request.method === 'POST' || ctx.request.method === 'PUT') {
      let data = ''
      ctx.req.on('data', (chunk) => {
        data += chunk
      })
      ctx.req.on('end', () => {
        if (ctx.request.headers['content-type'] === 'application/json') {
          ctx.request.body = JSON.parse(data)
        } else if (ctx.request.headers['content-type'] === 'application/x-www-form-urlencoded') {
          ctx.request.body = querystring.parse(data)
        } else if (ctx.request.headers['content-type'].startsWith('multipart/form-data')) {
          // 解析 multipart/form-data 请求体
          // ...
        } else {
          ctx.request.body = {}
        }
        return next()
      })
    } else {
      return next()
    }
  }
}
```

在这个实现中，如果请求方法为 `POST` 或者 `PUT`，则开始监听 `data` 事件和 `end` 事件，将请求体数据解析成一个 JavaScript 对象并挂载到 `ctx.request.body` 上，最后调用 `next()` 将控制权交给下一个中间件。对于其他请求方法，则直接调用 `next()` 交给下一个中间件处理。注意，这个实现只支持解析 `application/json` 和 `application/x-www-form-urlencoded` 类型的请求体，对于其他类型的请求体需要进行特殊处理。

## 170 文件上传和上传文件解析的原理是啥？

* created_at: 2023-03-26T07:57:45Z
* updated_at: 2023-03-26T07:57:46Z
* labels: 网络, 浏览器
* milestone: 高

 前端如何上传图片等文件

在前端上传图片或其他文件字段，一般使用 HTML 中的 `<input>` 元素，并设置 `type="file"`，这样就可以让用户选择本地的文件进行上传。

例如：

```html
htmlCopy code<form enctype="multipart/form-data">
 <input type="file" name="image" accept="image/*">
 <input type="submit" value="上传">
</form>
```

在这个例子中，`<form>` 元素的 `enctype` 属性设置为 `multipart/form-data`，这样就可以将文件作为二进制数据进行上传。

当用户选择了本地的文件后，提交表单时就会将文件作为 `FormData` 对象的一部分进行发送。在 JavaScript 中，可以通过 `FormData` 构造函数来创建一个 `FormData` 对象，并使用 `append()` 方法向其中添加上传的文件数据。例如：

```javascript
const formData = new FormData()
const fileInput = document.querySelector('input[type="file"]')
formData.append('image', fileInput.files[0])
```

这样就可以将文件数据添加到 `formData` 对象中，然后使用 `fetch()` 方法或其他方式将其发送到后端进行处理。

需要注意的是，由于安全原因，浏览器限制了用户上传文件的大小和类型。可以使用 `accept` 属性来限制文件的类型，例如 `accept="image/*"` 表示只允许上传图片类型的文件。可以使用 `multiple` 属性来允许用户选择多个文件进行上传。同时，还需要在后端对上传的文件进行处理和验证，以确保安全性和正确性。

 后端如何解析？koa 为例

在 Koa 中解析上传的文件需要使用一个叫做 `koa-body` 的中间件，它可以自动将 `multipart/form-data` 格式的请求体解析成 JavaScript 对象，从而获取到上传的文件和其他表单数据。

以下是一个使用 `koa-body` 中间件解析上传文件的例子：

```javascript
const Koa = require('koa')
const koaBody = require('koa-body')

const app = new Koa()

// 注册 koa-body 中间件
app.use(koaBody({
  multipart: true // 支持上传文件
}))

// 处理上传文件的请求
app.use(async (ctx) => {
  const { files, fields } = ctx.request.body // 获取上传的文件和其他表单数据
  const file = files && files.image // 获取上传的名为 image 的文件

  if (file) {
    console.log(`Received file: ${file.name}, type: ${file.type}, size: ${file.size}`)
    // 处理上传的文件
  } else {
    console.log('No file received')
  }

  // 返回响应
  ctx.body = 'Upload success'
})

app.listen(3000)
```

在上述代码中，使用 `koa-body` 中间件注册了一个解析请求体的函数，并在请求处理函数中获取到了上传的文件和其他表单数据。其中，`files` 对象包含了所有上传的文件，`fields` 对象包含了所有非文件类型的表单数据。

可以根据实际需要从 `files` 对象中获取到需要处理的文件，例如上面的例子中使用了 `files.image` 来获取名为 `image` 的上传文件。可以使用上传文件的属性，如 `name`、`type` 和 `size` 来获取文件的信息，并进行处理。最后返回响应，表示上传成功。

需要注意的是，`koa-body` 中间件需要设置 `multipart: true` 才能支持上传文件。另外，在处理上传文件时需要注意安全性和正确性，可以使用第三方的文件上传处理库来进行处理。

 解析上传文件的原理是啥？

在 HTTP 协议中，上传文件的请求通常使用 `multipart/form-data` 格式的请求体。这种格式的请求体由多个部分组成，每个部分以一个 boundary 字符串作为分隔符，每个部分都代表一个字段或一个文件。

对于一个上传文件的请求，浏览器会将请求体按照 `multipart/form-data` 格式构造，其中每个部分都有一些描述信息和内容，例如文件名、文件类型、文件大小、内容等。

服务器端需要对这些部分进行解析，提取出所需要的信息。常见的解析方式有两种：

1. 手动解析：根据 `multipart/form-data` 格式的规范，按照 boundary 字符串将请求体切分为多个部分，然后解析每个部分的头部和内容，提取出文件名、文件类型、文件大小等信息。这种方式比较麻烦，需要手动处理较多的细节，容易出错。

2. 使用第三方库：可以使用第三方的解析库，如 `multer`、`formidable`、`busboy` 等，来方便地解析 `multipart/form-data` 格式的请求体。这些库通常会将解析出的信息存储到一个对象中，方便进一步处理。

在 Node.js 中，使用 `http` 模块自己实现 `multipart/form-data` 的解析比较麻烦，常见的做法是使用第三方库来解析上传文件，例如在 Koa 中使用 `koa-body` 中间件就可以方便地处理上传文件。

## 171 [Vue] 响应式数据流驱动页面 和 传统的事件绑定命令式驱动页面， 有何优劣？

* created_at: 2023-03-26T08:04:06Z
* updated_at: 2023-03-26T08:04:21Z
* labels: web框架
* milestone: 初

Vue 响应式数据流驱动页面和传统的事件绑定命令式驱动页面是两种不同的前端开发方式，它们的优劣势主要体现在代码编写方式、页面效果、开发效率和维护难度上。

* 响应式数据流驱动页面：Vue 使用响应式的数据流来驱动页面的渲染和更新。Vue 的响应式系统会自动侦测数据的变化，并且重新渲染页面，开发者只需要专注于数据和页面的关系，而不用手动操作 DOM 元素。相比传统的命令式开发方式，响应式数据流驱动页面的代码更简洁、易于维护，开发效率更高。同时，Vue 的组件化开发模式也可以让开发者轻松地实现组件复用和代码复用。

* 传统的事件绑定命令式驱动页面：传统的事件绑定命令式驱动页面是通过手动绑定事件和操作 DOM 元素来实现页面交互效果。这种开发方式需要编写大量的事件处理函数和 DOM 操作代码，容易出现逻辑混乱和代码冗余的问题。同时，由于每个事件都需要手动绑定和处理，开发效率也会受到一定的影响。

综上所述，响应式数据流驱动页面和传统的事件绑定命令式驱动页面都有其优缺点，选择何种开发方式需要根据具体的需求和实际情况来决定。一般来说，响应式数据流驱动页面更适合用于构建数据驱动的、组件化的页面，而传统的事件绑定命令式驱动页面更适合用于构建交互性强、动态性高的页面。

## 172 es6 class 装饰器是如何实现的？

* created_at: 2023-03-26T08:06:20Z
* updated_at: 2023-03-26T08:06:21Z
* labels: JavaScript
* milestone: 高

ES6 中的装饰器是一种特殊的语法，用于动态修改类的行为。在 JavaScript 中，装饰器本质上是一个函数，它可以接受一个类作为参数，并返回一个新的类，实现了类的增强或修改。装饰器可以被用于类、方法、属性等各种地方，可以方便地实现类似 AOP、元编程等功能。

装饰器是 ES7 中的一个提案，目前还没有正式纳入标准。在 ES6 中使用装饰器需要借助第三方库，如 babel-plugin-transform-decorators-legacy。

装饰器实现的基本原理是，在装饰器函数和被装饰对象之间建立一个代理层，通过代理层来实现装饰器的逻辑。在类的装饰器中，装饰器函数的第一个参数是被装饰的类本身，装饰器函数内部可以访问、修改该类的属性和方法。在方法和属性的装饰器中，装饰器函数的第一个参数分别是被装饰的方法或属性所在的类的原型对象，装饰器函数内部可以访问、修改该方法或属性的属性描述符等信息。

以下是一个简单的装饰器示例，用于给类的方法添加一个计时器：

```javascript
function timer(target, name, descriptor) {
 const originalMethod = descriptor.value;
 descriptor.value = function (...args) {
 console.time(name);
 const result = originalMethod.apply(this, args);
 console.timeEnd(name);
 return result;
 };
 return descriptor;
}

class MyClass {
 @timer
 myMethod() {
 // do something
 }
}
```

在上面的示例中，timer 函数就是一个装饰器函数，它接受三个参数，分别是被装饰的方法所在类的原型对象、被装饰的方法的名称、被装饰的方法的属性描述符。在 timer 函数内部，将被装饰的方法替换为一个新的方法，新方法先执行 console.time() 方法，再执行原始方法，最后执行 console.timeEnd() 方法。最后将新的属性描述符返回，完成方法的装饰。

通过类似这种方式，我们可以方便地实现各种类型的装饰器，以增强或修改类的行为。

## 174 Promise then 第二个参数和 Promise.catch 的区别是什么?

* created_at: 2023-03-26T08:10:06Z
* updated_at: 2023-03-26T08:10:06Z
* labels: JavaScript
* milestone: 高

`Promise.then()` 方法可以接受两个参数，第一个参数是 `onFulfilled` 回调函数，第二个参数是 `onRejected` 回调函数。当 Promise 状态变为 `fulfilled` 时，将会调用 `onFulfilled` 回调函数；当 Promise 状态变为 `rejected` 时，将会调用 `onRejected` 回调函数。其中，第二个参数 `onRejected` 是可选的。

`Promise.catch()` 方法是一个特殊的 `Promise.then()` 方法，它只接受一个参数，即 `onRejected` 回调函数。如果 Promise 状态变为 `rejected`，则会调用 `onRejected` 回调函数；如果状态变为 `fulfilled`，则不会调用任何回调函数。因此，`Promise.catch()` 方法可以用来捕获 Promise 中的错误，相当于使用 `Promise.then(undefined, onRejected)`。

区别主要在于使用的方式不同。`Promise.then(onFulfilled, onRejected)` 可以同时传递两个回调函数，用来处理 Promise 状态变为 `fulfilled` 或者 `rejected` 的情况；而 `Promise.catch(onRejected)` 则只能用来处理 Promise 状态变为 `rejected` 的情况，并且使用更加简洁明了。

## 175 Promise finally 怎么实现的？

* created_at: 2023-03-26T08:11:20Z
* updated_at: 2023-03-26T08:11:20Z
* labels: JavaScript
* milestone: 高

`Promise.finally()` 方法是在 ES2018 中引入的，用于指定不管 Promise 状态如何都要执行的回调函数。与 `Promise.then()` 和 `Promise.catch()` 不同的是，`Promise.finally()` 方法不管 Promise 是成功还是失败都会执行回调函数，而且不会改变 Promise 的状态。如果返回的值是一个 Promise，那么 `Promise.finally()` 方法会等待该 Promise 执行完毕后再继续执行。

`Promise.finally()` 方法的实现思路如下：

1. `Promise.finally()` 方法接收一个回调函数作为参数，返回一个新的 Promise 实例。

2. 在新的 Promise 实例的 `then()` 方法中，首先调用原 Promise 的 `then()` 方法，将原 Promise 的结果传递给下一个 `then()` 方法。

3. 在新的 Promise 实例的 `then()` 方法中，调用回调函数并将原 Promise 的结果传递给回调函数。

4. 如果回调函数返回一个 Promise，则需要在新的 Promise 实例的 `then()` 方法中等待该 Promise 执行完毕，再将结果传递给下一个 `then()` 方法。

5. 在新的 Promise 实例的 `finally()` 方法中，返回一个新的 Promise 实例。

下面是一个简单的实现示例：

```javascript
Promise.prototype.finally = function (callback) {
  const P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
}
```

这个实现方法中，使用了 `Promise.resolve()` 来返回一个新的 Promise 实例，因此可以避免了 Promise 链的状态改变。另外，由于 `finally()` 方法只是在 Promise 链的最后执行回调函数，因此不需要使用异步函数。

## 178 [React] useRef、ref、forwardsRef 的区别是什么?

* created_at: 2023-03-26T08:29:41Z
* updated_at: 2023-03-26T08:36:50Z
* labels: web框架
* milestone: 中

在 React 中，`ref` 是一种用于访问 DOM 元素或组件实例的方法，`useRef` 和 `forwardRef` 是 `ref` 的两个相关 Hook 和高阶组件。

1. `ref`：`ref` 是 React 中用于访问 DOM 元素或组件实例的方法。在函数组件中，可以使用 `useRef` Hook 来创建一个 `ref` 对象，然后将其传递给需要引用的元素或组件。在类组件中，可以直接在类中定义 `ref` 属性，并将其设置为元素或组件的实例。

2. `useRef`：`useRef` 是 React 中的 Hook，用于创建一个 `ref` 对象，并在组件生命周期内保持其不变。`useRef` 可以用于访问 DOM 元素或组件实例，并且在每次渲染时都会返回同一个 `ref` 对象。通常情况下，`useRef` 更适合用于存储不需要触发重新渲染的值，例如定时器的 ID 或者其他副作用。

3. `forwardRef`：`forwardRef` 是一个高阶组件，用于将 `ref` 属性转发给其子组件。通常情况下，如果一个组件本身并不需要使用 `ref` 属性，但是其子组件需要使用 `ref` 属性，那么可以使用 `forwardRef` 来传递 `ref` 属性。`forwardRef` 接受一个函数作为参数，并将 `ref` 对象作为第二个参数传递给该函数，然后返回一个新的组件，该组件接受 `ref` 属性并将其传递给子组件。

简而言之，`ref` 是 React 中访问 DOM 元素或组件实例的方法，`useRef` 是一个 Hook，用于创建并保持一个不变的 `ref` 对象，`forwardRef` 是一个高阶组件，用于传递 `ref` 属性给子组件。

## 179 [React] useEffect的第二个参数，如何判断依赖是否发生变化？

* created_at: 2023-03-26T08:36:21Z
* updated_at: 2023-03-26T08:37:57Z
* labels: web框架
* milestone: 高

`useEffect`的第二个参数是一个依赖数组，用于判断副作用函数的依赖是否发生变化。React使用JavaScript的`Object.is`方法来判断依赖项是否发生变化。在比较依赖项时，React首先检查依赖项的值是否相等。如果依赖项的值是引用类型，React会比较它们的引用地址，而不是比较它们的属性值。因此，在比较引用类型时，即使对象具有相同的属性值，但它们的引用地址不同，React仍然认为它们是不同的。

需要注意的是，如果依赖项是一个数组或对象，由于它们是引用类型，因此即使数组或对象中的元素或属性没有发生变化，但数组或对象本身的引用地址发生变化，也会导致React重新执行副作用函数。在这种情况下，我们可以使用`useCallback`和`useMemo`来缓存回调函数和计算结果，以便避免在依赖数组发生变化时重新计算和创建。

## 180 HTTP协议的不同版本的主要特点有哪些？

* created_at: 2023-03-26T09:10:32Z
* updated_at: 2023-03-26T09:16:48Z
* labels: 网络
* milestone: 高

HTTP协议的不同版本的主要特点如下表所示：

|版本|发布时间|主要特点|
|---|---|---|
|HTTP/0.9|1991年|只支持GET方法，没有Header和Body|
|HTTP/1.0|1996年|引入Header、POST方法、响应码、缓存等特性|
|HTTP/1.1|1999年|引入持久连接、管道化请求、分块传输编码、Host头、缓存控制等特性|
|HTTP/2|2015年|引入二进制分帧、头部压缩、流量控制、多路复用等特性|
|HTTP/3|2021年|引入QUIC协议，改进网络传输性能|

需要注意的是，HTTP/1.x和HTTP/2都支持TLS加密传输，即HTTPS协议。HTTP/3则是基于QUIC协议的，使用TLS 1.3进行加密传输。

## 181 http1.1 持久连接 和 http2 的多路复用有什么区别？

* created_at: 2023-03-26T09:12:29Z
* updated_at: 2023-03-26T09:12:30Z
* labels: 网络
* milestone: 高

HTTP/1.1和HTTP/2都是HTTP协议的不同版本，在网络传输和性能方面有很大的差别。

HTTP/1.1使用的是“管线化请求”和“持久连接”来提高性能，而HTTP/2则引入了更多的特性，其中最重要的特性是“多路复用”。

“管线化请求”是HTTP/1.1提出的一种优化方法，它可以让浏览器同时发出多个请求，从而避免了HTTP/1.1中因为请求阻塞导致的性能问题。但是，由于HTTP/1.1的“管线化请求”存在“队头阻塞”（head-of-line blocking）问题，即前面一个请求没有得到响应时，后面的请求必须等待，导致性能并没有得到很大提升。

“持久连接”是HTTP/1.1中另一种提高性能的方法，它可以在一个TCP连接中传输多个HTTP请求和响应，避免了每个请求都需要建立和关闭连接的开销。但是，由于HTTP/1.1中的“持久连接”是按顺序发送请求和响应的，所以依然存在“队头阻塞”的问题。

HTTP/2则引入了“多路复用”（multiplexing）这一特性，可以在一个TCP连接上同时传输多个HTTP请求和响应，避免了“队头阻塞”问题。它使用二进制分帧（binary framing）技术将HTTP请求和响应分成多个帧（frame），并使用流（stream）来标识不同的请求和响应，从而实现了更高效的网络传输和更低的延迟。此外，HTTP/2还引入了头部压缩（header compression）和服务器推送（server push）等特性。

因此，HTTP/2的多路复用比HTTP/1.1的管线化请求和持久连接更为高效、灵活，能够更好地支持现代Web应用的性能要求。

## 182 http3 QUIC 是什么协议？

* created_at: 2023-03-26T09:13:35Z
* updated_at: 2023-03-26T09:13:40Z
* labels: 网络
* milestone: 中

HTTP/3（或称为HTTP-over-QUIC）是一个基于QUIC协议的新版本的HTTP协议。QUIC（Quick UDP Internet Connections）是由Google设计的一个基于UDP协议的传输层协议，旨在解决HTTP/2协议存在的一些问题。

HTTP/3中引入了QUIC的一些特性，如0-RTT连接建立、基于UDP的传输、数据流多路复用和快速恢复等，这些特性有助于提高性能和安全性。与HTTP/2相比，HTTP/3采用了新的二进制编码协议（QUIC Crypto）来加密和验证数据，以提供更好的安全性。

此外，HTTP/3还可以更好地适应现代网络环境下的多元化应用需求。由于QUIC协议基于UDP协议，因此可以更好地适应移动网络和高丢包率网络等不稳定的网络环境。同时，HTTP/3可以更好地支持多媒体内容和实时通信等应用场景。

## 183 HTTP/3 是基于 UDP 的协议， 那么他是如何保障安全性的？

* created_at: 2023-03-26T09:18:32Z
* updated_at: 2024-07-05T09:52:10Z
* labels: 网络
* milestone: 资深

HTTP/3是基于UDP的协议，因此在设计时需要考虑安全性问题。为了保障安全性，HTTP/3使用了一个新的加密协议——QUIC Crypto。

QUIC Crypto使用了一种名为"0-RTT安全连接"的机制，允许客户端在第一次请求时就可以建立安全连接，从而减少连接建立的延迟。此外，HTTP/3还使用了数字证书来验证服务器身份，以确保通信的安全性。

在HTTP/3中，每个数据包都使用一个独特的标识符（Connection ID）来标识。这个标识符会在每个数据包中包含，以便服务器能够识别它们。这种方式可以防止攻击者进行连接欺骗，从而提高了安全性。

另外，HTTP/3还使用了一些其他的技术来提高安全性，如0-RTT加密、零轮延迟、源地址验证、密钥派生和更新等。

综上所述，HTTP/3采用了一系列安全机制来保护通信安全，使其能够在基于UDP的网络环境下运行，并提供更好的性能和安全性。

## 184 前端如何防止加载外域脚本？

* created_at: 2023-03-26T09:24:28Z
* updated_at: 2023-03-26T09:24:29Z
* labels: 网络
* milestone: 高

前端可以通过以下方式防止加载外域脚本：

1. 使用 Content Security Policy (CSP)：CSP 是一个 HTTP 头，可以限制页面可以从哪些源加载资源。通过 CSP，可以禁止加载外域脚本，从而防止 XSS 攻击等安全问题。

2. 使用 Subresource Integrity (SRI)：SRI 是一个浏览器功能，可以确保在加载外部资源时，它们的内容没有被篡改过。通过在 script 标签中添加 integrity 属性，可以指定资源的校验和，浏览器会校验资源是否与 integrity 值匹配，从而确保资源没有被篡改过。

3. 避免使用动态脚本加载：使用 document.createElement('script') 创建 script 元素，并手动设置其 src 属性，可以避免使用 eval() 动态执行脚本。动态加载脚本的方式可能会受到中间人攻击，从而加载恶意脚本。

4. 避免使用不安全的协议加载资源：使用 HTTPS 加载资源可以确保资源在传输过程中不会被篡改。避免使用 HTTP 或者 file 协议加载资源，这些协议容易受到中间人攻击。

综上，前端可以通过以上方式防止加载外域脚本，提高应用程序的安全性。

## 185 TypeScript is 这个关键字是做什么呢？

* created_at: 2023-03-26T09:26:44Z
* updated_at: 2023-03-26T09:26:45Z
* labels: TypeScript
* milestone: 初

`is` 是 TypeScript 中的一个关键字，用于创建类型保护。在 TypeScript 中，类型保护是一种用于确定变量是否符合某种类型的方法。当我们使用 `is` 关键字创建一个类型保护时，它会在运行时对变量进行判断，然后返回一个布尔值。

具体来说，我们可以通过定义一个返回值为布尔类型的函数，并在函数内部进行类型判断来创建类型保护。比如：

```csharp
csharpCopy codefunction isString(value: any): value is string {
 return typeof value === 'string';
}
```

在这个例子中，我们定义了一个名为 `isString` 的函数，它接收一个任意类型的参数 `value`，并通过 `typeof` 运算符判断 `value` 是否为字符串。如果是字符串，函数返回 `true`，否则返回 `false`。

使用时，我们可以通过将变量传递给 `isString` 函数来判断变量是否为字符串类型：

```rust
rustCopy codeconst str = 'hello';
if (isString(str)) {
 console.log(str.length);
}
```

在这个例子中，由于 `str` 是字符串类型，所以 `isString(str)` 返回 `true`，`if` 语句内的代码会被执行，输出字符串的长度。如果 `str` 不是字符串类型，`isString(str)` 返回 `false`，`if` 语句内的代码不会被执行。

这样，在使用变量之前进行类型保护，可以避免在运行时出现类型错误，提高代码的健壮性。

## 186 中间人攻击是什么？

* created_at: 2023-03-26T09:29:08Z
* updated_at: 2023-03-26T09:29:09Z
* labels: 网络
* milestone: 高

中间人攻击（Man-in-the-Middle Attack, MITM），也称中间攻击，是指黑客通过拦截通信过程中的数据，然后在两个通信的用户之间进行欺骗和篡改的攻击方式。在 HTTPS 中，如果黑客能够截获用户和服务器之间的通信，那么他就可以使用类似于伪造证书、中断连接、插入恶意代码等方式，对数据进行篡改或窃取用户敏感信息。

为了防止中间人攻击，在 HTTPS 中通常采用数字证书认证机制，即服务器会向可信的第三方机构申请数字证书，证明其身份的真实性。当用户访问该服务器时，服务器会把自己的数字证书发送给用户，用户的浏览器会验证该证书是否由可信的第三方机构签发，是否过期等，如果验证通过，则可以建立安全的 HTTPS 连接。如果数字证书无效，则会弹出警告页面，提示用户存在安全风险。

## 187 前端单页应用 History 路由模式， 需要如何配置 nginx？

* created_at: 2023-03-26T09:30:59Z
* updated_at: 2023-04-03T01:27:28Z
* labels: 工程化
* milestone: 高

前端单页应用使用 History 路由模式，需要将路由的控制交给前端，而不是后端处理，因此需要配置 nginx 让其将所有请求都指向 index.html 页面，让前端来处理路由。

具体配置可以参考以下 nginx 配置：

```bash
bashCopy codeserver {
 listen 80;
 server_name example.com; # 域名或 IP 地址

 location / {
 root /path/to/your/app; # 项目根目录
 index index.html;
 try_files $uri $uri/ /index.html; # 将所有请求都指向 index.html 页面
 }
}
```

以上配置中，`try_files` 指令会尝试将请求映射到对应的文件，如果找不到，则会将请求转发到 `/index.html` 页面，由前端来处理路由。同时，`root` 指令需要指向前端应用的根目录。

## 188 前端如何实现截图？

* created_at: 2023-03-26T09:34:41Z
* updated_at: 2023-09-12T03:31:44Z
* labels: web应用场景
* milestone: 中

前端实现截图需要使用 HTML5 的 Canvas 和相关 API，具体步骤如下：

1. 首先在页面中创建一个 Canvas 元素，并设置其宽高和样式。
2. 使用 Canvas API 在 Canvas 上绘制需要截图的内容，比如页面的某个区域、某个元素、图片等。
3. 调用 Canvas API 中的 `toDataURL()` 方法将 Canvas 转化为 base64 编码的图片数据。
4. 将 base64 编码的图片数据传递给后端进行处理或者直接在前端进行显示。

以下是一个简单的例子，实现了对整个页面的截图：

```html
<!DOCTYPE html>
<html>
 <head>
 <meta charset="UTF-8">
 <title>截图示例</title>
 <style>
 #canvas {
 position: fixed;
 left: 0;
 top: 0;
 z-index: 9999;
 }
 </style>
 </head>
 <body>
 <h1>截图示例</h1>
 <p>这是一个简单的截图示例。</p>
 <button id="btn">截图</button>
 <canvas id="canvas"></canvas>
 <script>
 const canvas = document.getElementById('canvas');
 const ctx = canvas.getContext('2d');
 const btn = document.getElementById('btn');
 canvas.width = window.innerWidth;
 canvas.height = window.innerHeight;

 btn.addEventListener('click', () => {
 ctx.clearRect(0, 0, canvas.width, canvas.height);
 ctx.drawImage(document.documentElement, 0, 0);
 const imgData = canvas.toDataURL();
 console.log(imgData);
 });
 </script>
 </body>
</html>
```

这个例子中，在页面中创建了一个 `canvas` 元素，并设置其宽高和样式，将其放在页面最上方。在点击“截图”按钮时，通过 `toDataURL()` 方法将整个页面的截图转换为 base64 编码的图片数据，并打印到控制台上。

## 189 当QPS达到峰值时, 该如何处理？

* created_at: 2023-03-26T09:36:22Z
* updated_at: 2023-03-26T09:36:22Z
* labels: web应用场景
* milestone: 中

当QPS达到峰值时，可以从以下几个方面来进行优化：

1. 数据库优化：数据库的优化包括优化SQL语句、使用索引、避免全表扫描、分表分库等措施，以提高数据库的读写性能。

2. 缓存优化：缓存可以降低对数据库的访问频率，提高响应速度。可以使用Redis、Memcached等缓存技术，减轻服务器负载。

3. 代码优化：优化代码可以提高代码的执行效率，减少不必要的开销。可以通过一些优化手段，如减少不必要的代码执行、避免循环嵌套、避免不必要的递归调用等来提高代码的性能。

4. 负载均衡：负载均衡可以将请求分发到多个服务器上，减少单个服务器的负载，提高整个系统的性能和可用性。

5. 异步处理：将一些计算量大、耗时长的操作异步处理，减少对主线程的阻塞，提高响应速度。

6. CDN加速：使用CDN技术可以将静态资源缓存到CDN节点上，提高资源的加载速度，减少服务器的负载。

7. 硬件升级：可以通过升级服务器硬件，增加带宽等方式来提高系统的处理能力。

以上是一些常见的优化手段，需要根据具体情况进行选择和实施。

## 190 js 超过 Number 最大值的数怎么处理？

* created_at: 2023-03-26T09:39:36Z
* updated_at: 2023-03-26T09:39:37Z
* labels: web应用场景
* milestone: 中

 js 超过 Number 最大值的数怎么处理

在 JavaScript 中，超过 `Number.MAX_VALUE` 的数值被认为是 `Infinity`（正无穷大）。如果要处理超过 `Number.MAX_VALUE` 的数值，可以使用第三方的 JavaScript 库，如 `big.js` 或 `bignumber.js`，这些库可以处理任意精度的数值。

例如，使用 `big.js` 库可以将两个超过 `Number.MAX_VALUE` 的数相加：

```javascript
const big = require('big.js')

const x = new big('9007199254740993')
const y = new big('100000000000000000')

const result = x.plus(y)

console.log(result.toString()) // 输出：100009007194925474093
```

这里创建了两个 `big.js` 对象 `x` 和 `y`，分别存储超过 `Number.MAX_VALUE` 的数值。通过 `plus` 方法将它们相加，得到了正确的结果。最后，通过 `toString` 方法将结果转换为字符串。

 如果不依赖外部库，咋处理

JavaScript 中，数值超过了 Number 最大值时，可以使用 BigInt 类型来处理，它可以表示任意精度的整数。

使用 BigInt 类型时，需要在数值后面添加一个 `n` 后缀来表示 BigInt 类型。例如：

```javascript
const bigNum = 9007199254740993n // 注意：数字后面添加了 'n' 后缀
```

注意，BigInt 类型是 ECMAScript 2020 新增的特性，因此在某些浏览器中可能不被支持。如果需要在不支持 BigInt 的环境中使用 BigInt，可以使用 polyfill 或者第三方库来实现。

## 191 ['1', '2', '3'].map(parseInt) 结果是啥，为什么？

* created_at: 2023-03-26T09:59:54Z
* updated_at: 2023-03-26T09:59:54Z
* labels: JavaScript
* milestone: 中

执行 `['1', '2', '3'].map(parseInt)` 会得到 `[1, NaN, NaN]`，这个结果可能和人们预期的不一样。

这是因为 `map` 方法会传入三个参数：当前遍历到的元素、当前遍历到的索引、原数组本身。而 `parseInt` 函数则接受两个参数：需要被解析的值、用于解析的进制数。在执行 `['1', '2', '3'].map(parseInt)` 时，实际传入 `parseInt` 的参数如下：

* `'1'`、`0`（表示解析为十进制）：解析后得到数字 `1`。
* `'2'`、`1`（表示解析为一进制）：解析后得到 `NaN`。
* `'3'`、`2`（表示解析为二进制）：解析后得到 `NaN`。

所以结果为 `[1, NaN, NaN]`。

## 192 介绍下深度优先遍历和广度优先遍历，如何实现？

* created_at: 2023-03-26T10:03:39Z
* updated_at: 2023-03-26T10:03:40Z
* labels: JavaScript
* milestone: 中

深度优先遍历（Depth-First-Search，DFS）和广度优先遍历（Breadth-First-Search，BFS）是图和树的两种遍历方式。

 深度优先遍历（DFS）

深度优先遍历采用深度优先的策略遍历整张图或树，即从当前节点开始，先访问其所有子节点，再依次访问子节点的子节点，直到遍历完整张图或树。

DFS 可以使用递归或栈来实现。

递归实现：

```javascript
function dfsRecursive (node, visited) {
  if (!node || visited.has(node)) {
    return
  }
  visited.add(node)
  console.log(node.value)
  for (let i = 0; i < node.children.length; i++) {
    dfsRecursive(node.children[i], visited)
  }
}
```

栈实现：

```javascript
function dfsStack (node) {
  const visited = new Set()
  const stack = [node]
  while (stack.length > 0) {
    const current = stack.pop()
    if (!current || visited.has(current)) {
      continue
    }
    visited.add(current)
    console.log(current.value)
    for (let i = current.children.length - 1; i >= 0; i--) {
      stack.push(current.children[i])
    }
  }
}
```

 广度优先遍历（BFS）

广度优先遍历采用广度优先的策略遍历整张图或树，即从当前节点开始，先访问所有相邻节点，再访问所有相邻节点的相邻节点，以此类推，直到遍历完整张图或树。

BFS 可以使用队列来实现。

队列实现：

```javascript
function bfsQueue (node) {
  const visited = new Set()
  const queue = [node]
  while (queue.length > 0) {
    const current = queue.shift()
    if (!current || visited.has(current)) {
      continue
    }
    visited.add(current)
    console.log(current.value)
    for (let i = 0; i < current.children.length; i++) {
      queue.push(current.children[i])
    }
  }
}
```

总的来说，深度优先遍历和广度优先遍历都有自己的应用场景，比如：

* 深度优先遍历通常用于寻找一条路径，或者对树的节点进行递归操作。
* 广度优先遍历通常用于寻找最短路径，或者对图进行层级遍历操作。

## 193 请分别用深度优先思想和广度优先思想实现一个拷贝函数？

* created_at: 2023-03-26T10:05:58Z
* updated_at: 2023-03-26T10:05:59Z
* labels: JavaScript
* milestone: 中

深度优先思想实现拷贝函数可以采用递归的方式遍历对象或数组，对每个元素进行复制。如果当前元素是一个对象或数组，则递归调用拷贝函数，如果是基本数据类型则直接进行复制。以下是一个用深度优先思想实现拷贝函数的示例代码：

```javascript
function deepClone (obj) {
  // 如果obj是基本数据类型或null，则直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  let result
  // 判断obj是数组还是对象
  if (Array.isArray(obj)) {
    result = []
  } else {
    result = {}
  }

  // 递归遍历obj的每个属性或元素，并进行拷贝
  for (const key in obj) {
    result[key] = deepClone(obj[key])
  }

  return result
}
```

广度优先思想实现拷贝函数可以使用队列的方式，将每个元素放入队列中，然后循环遍历队列。如果当前元素是一个对象或数组，则将其属性或元素放入队列中，然后继续循环遍历队列。如果是基本数据类型则直接进行复制。以下是一个用广度优先思想实现拷贝函数的示例代码：

```javascript
function breadthClone (obj) {
  // 如果obj是基本数据类型或null，则直接返回
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  let result
  // 判断obj是数组还是对象
  if (Array.isArray(obj)) {
    result = []
  } else {
    result = {}
  }

  const queue = [obj]
  const resQueue = [result]

  // 循环遍历队列
  while (queue.length > 0) {
    const curObj = queue.shift()
    const curRes = resQueue.shift()

    // 遍历当前元素的每个属性或元素，并进行拷贝
    for (const key in curObj) {
      const val = curObj[key]
      if (typeof val === 'object' && val !== null) {
        // 如果当前属性或元素是一个对象或数组，则将其放入队列中
        const newVal = Array.isArray(val) ? [] : {}
        curRes[key] = newVal
        queue.push(val)
        resQueue.push(newVal)
      } else {
        // 如果是基本数据类型则直接进行复制
        curRes[key] = val
      }
    }
  }

  return result
}
```

## 194 JavaScript 异步解决方案的发展历程主要有哪些阶段？

* created_at: 2023-03-26T10:24:28Z
* updated_at: 2023-03-26T10:24:29Z
* labels: JavaScript
* milestone: 高

JavaScript异步解决方案的发展历程主要有以下几个阶段：

1. 回调函数

最初，JavaScript采用回调函数的方式来解决异步编程问题。回调函数即在异步任务完成后调用的回调函数。例如，`setTimeout`函数就是一个使用回调函数的例子。

```javascript
setTimeout(() => {
  console.log('Hello, world!')
}, 1000)
```

回调函数的优点是简单易懂，缺点是嵌套层次多、代码难以维护。

2. jQuery.Deferred()

jQuery.Deferred()是jQuery提供的一种异步编程解决方案。它是一种Promise风格的API，使得异步操作可以更加简单和可读性更高。

jQuery.Deferred()可以用于串行和并行异步操作的组织和控制，避免了回调地狱和代码复杂性。

在使用过程中，通过使用jQuery.Deferred()的resolve()和reject()方法来决定异步操作的成功或失败，并且可以使用then()方法添加成功和失败的回调函数。

jQuery.Deferred()主要的优点包括：

* 简单易用：可以通过链式操作来组织和控制异步操作。
* 可读性高：可以使用then()方法添加成功和失败的回调函数，使代码的意图更加明确。
* 良好的兼容性：jQuery.Deferred()已经成为了jQuery的一部分，可以与其他jQuery的功能和插件良好地协作。

而缺点则包括：

* jQuery.Deferred()不能被取消，且对于异步操作的结果状态只能被设置一次。
* 依赖于jQuery库：因为jQuery.Deferred()是jQuery的一部分，所以需要依赖于jQuery库，不适合非jQuery项目。

3. Promise

Promise是ES6引入的一种异步编程解决方案，用于解决回调函数的嵌套问题。Promise是一个对象，表示异步操作的最终完成或失败。它有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。

Promise的优点是解决了回调函数嵌套的问题，使得代码可读性和可维护性更好。缺点是语法相对复杂。

```javascript
// Promise示例
function fetchData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello, world!')
    }, 1000)
  })
}

fetchData().then((data) => {
  console.log(data)
}).catch((error) => {
  console.log(error)
})
```

4. Generator

Generator 可以使用 yield 语句来暂停函数执行，并返回一个 Generator 对象，通过这个对象可以控制函数的继续执行和结束。

5. Async/Await

ES8引入了Async/Await语法，使得异步编程更加简单和可读。Async/Await是基于Promise实现的，可以看作是对Promise的一种封装。Async/Await语法可以让异步代码像同步代码一样书写，让代码的可读性更高。

```javascript
// Async/Await示例
async function fetchData () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Hello, world!')
    }, 1000)
  })
}

async function run () {
  try {
    const data = await fetchData()
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

run()
```

Async/Await 的优点是语法简单易懂、可读性好，缺点是需要掌握Promise的基本用法。

综上，JavaScript 异步编程方案的发展历程从最初的回调函数到Promise再到Async/Await，每个阶段都解决了前一阶段存在的问题，使得异步编程更加方便和易读。但是，不同方案都有自己的优缺点，需要根据实际情况选择使用。

## 195 Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？

* created_at: 2023-03-26T10:26:27Z
* updated_at: 2023-03-26T10:26:28Z
* labels: JavaScript
* milestone: 中

Promise 构造函数是同步执行的，而 then 方法是异步执行的。

在 Promise 构造函数中，Promise 的状态（pending/resolved/rejected）是同步确定的。但是 Promise 中的异步操作可能还没有完成，因此 Promise 对象本身的值可能还没有可用的值。所以，当我们在构造函数中使用 resolve/reject 时，它们并不会立即触发 then 中注册的回调函数执行。

而 then 方法则是异步执行的。当我们在一个 Promise 对象上调用 then 方法并注册了回调函数时，这些回调函数并不会立即执行。相反，它们会被添加到一个任务队列中，等到当前 JavaScript 上下文中的所有同步代码执行完成后再执行。

这也是 Promise 非常重要的特性之一，即能够在异步任务完成后执行回调函数，避免了回调地狱等问题。

## 196 如何从 http1.1 迁移到 http2 ?

* created_at: 2023-03-26T10:37:43Z
* updated_at: 2023-03-26T10:37:43Z
* labels: JavaScript
* milestone: 高

从 HTTP 1.1 迁移到 HTTP/2 通常需要进行以下步骤：

1. 升级服务器：首先，你需要将你的服务器升级到支持 HTTP/2。大多数主流服务器，如Apache、Nginx等，都已经支持 HTTP/2。

2. 使用 HTTPS：HTTP/2 只支持加密连接，因此需要使用 HTTPS。所以，你需要获得一个 SSL 证书，并使用 HTTPS 连接来替代原来的 HTTP 连接。

3. 修改网页代码：为了利用 HTTP/2 的多路复用特性，你需要将网页中的多个小文件（例如 CSS、JavaScript、图像等）合并为一个文件，以减少请求的数量。此外，你还需要避免在一个请求中同时传输大量数据，以免阻塞其他请求的传输。

4. 配置服务器：为了使 HTTP/2 能够充分发挥性能，你需要进行一些服务器配置，例如启用 HTTP/2、调整 TLS 版本和密码套件等。

需要注意的是，HTTP/2 是一个复杂的协议，迁移过程中需要仔细审查每一个步骤，并且对性能进行监测和测试，以确保迁移后的网站性能更好。

## 197 A、B 机器正常连接后，B 机器突然重启，问 A 此时处于 TCP 什么状态？(了解即可)

* created_at: 2023-03-26T10:46:47Z
* updated_at: 2023-03-26T10:46:48Z
* labels: 网络, 网易
* milestone: 高

当 B 机器重启时，TCP 连接会被断开，此时 A 机器会检测到 TCP 连接异常断开，将 TCP 状态修改为 FIN\_WAIT\_1 状态。A 机器会继续等待来自 B 机器的响应，如果等待的时间超过了一定时间（通常为几分钟），A 机器会放弃等待并关闭 TCP 连接，将 TCP 状态修改为 CLOSED 状态。

## 198 介绍下观察者模式和订阅-发布模式的区别？

* created_at: 2023-03-26T10:53:14Z
* updated_at: 2023-03-26T10:53:15Z
* labels: JavaScript, 网易, 阿里巴巴
* milestone: 高

观察者模式和订阅-发布模式都属于事件模型，它们都是为了解耦合而存在，但是它们之间还是有一些不同之处的：

1. 观察者模式中，主题（被观察者）和观察者之间是直接联系的，观察者订阅主题，主题状态发生变化时会直接通知观察者；而订阅-发布模式中，发布者和订阅者之间没有直接的联系，发布者发布消息到消息中心，订阅者从消息中心订阅消息。

2. 在观察者模式中，主题和观察者是一对多的关系，一个主题可以有多个观察者，而在订阅-发布模式中，发布者和订阅者是多对多的关系，一个发布者可以有多个订阅者，一个订阅者也可以订阅多个发布者。

3. 在观察者模式中，主题状态发生变化时，观察者会被直接通知，通知的方式可以是同步或异步的，观察者可以决定如何处理通知；而在订阅-发布模式中，消息是通过消息中心进行传递的，订阅者从消息中心订阅消息，发布者发布消息到消息中心，消息中心再将消息发送给订阅者，这个过程是异步的，订阅者不能决定何时接收消息。

4. 在观察者模式中，主题和观察者之间存在强耦合关系，如果一个观察者被移除，主题需要知道这个观察者的身份；而在订阅-发布模式中，发布者和订阅者之间没有强耦合关系，发布者不需要知道订阅者的身份，订阅者也不需要知道发布者的身份。

综上所述，观察者模式和订阅-发布模式都是事件模型，但它们之间的区别在于关注点的不同，观察者模式更关注主题和观察者之间的交互，而订阅-发布模式更关注发布者和订阅者之间的交互。

## 199 手写 观察者模式

* created_at: 2023-03-26T10:55:18Z
* updated_at: 2023-10-13T04:26:57Z
* labels: JavaScript, 网易, 阿里巴巴, 代码实现/算法
* milestone: 中

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

## 200 手写订阅-发布模式

* created_at: 2023-03-26T10:56:48Z
* updated_at: 2023-09-25T11:48:11Z
* labels: JavaScript, 网易, 阿里巴巴, 代码实现/算法
* milestone: 高

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

## 201 Redux 和 Vuex 的设计思想是什么？

* created_at: 2023-03-26T14:01:52Z
* updated_at: 2023-03-26T14:01:53Z
* labels: JavaScript, 字节跳动
* milestone: 高

Redux和Vuex都是用于在前端应用中管理状态的JavaScript库。它们的设计思想都基于Flux架构，强调单向数据流的概念，以避免数据的混乱和不可预测的状态变化。

Redux的设计思想可以总结为三个原则：

1. 单一数据源：Redux中所有的状态数据都保存在单一的store对象中，便于管理和维护。

2. 状态只读：Redux的状态数据是只读的，唯一的改变方式是通过dispatch一个action来触发reducer函数对状态进行更新。

3. 纯函数更新状态：Redux的reducer函数必须是纯函数，即接收一个旧的状态和一个action对象，返回一个新的状态。通过这种方式，Redux保证了状态的可控和可预测性。

Vuex的设计思想类似于Redux，但又有所不同：

1. 单一数据源：Vuex也采用了单一数据源的思想，将所有状态保存在store对象中。

2. 显示状态修改：和Redux不同的是，Vuex允许组件直接修改状态，但这必须是通过commit一个mutation来实现的，mutation也必须是同步的。

3. 模块化：Vuex提供了模块化机制，可以将store对象分解成多个模块，以提高可维护性和代码复用性。

Redux和Vuex都是通过一些基本概念来实现状态管理：

1. Store：保存状态的对象，整个应用只有一个Store。

2. Action：描述状态变化的对象，由View层发起。

3. Reducer：一个纯函数，接收旧的状态和一个Action对象，返回新的状态。

4. Dispatch：一个函数，用来触发Action。

5. Mutation：类似于Redux的Reducer，但必须是同步的。用来更新状态。

总之，Redux和Vuex都是优秀的状态管理库，通过它们可以有效地管理前端应用的状态，实现数据的单向流动和可预测性。同时，Redux和Vuex都遵循了Flux架构的设计思想，使得状态管理更加规范化和可控。

## 202 浏览器 和 Node 事件循环有区别吗？

* created_at: 2023-03-26T14:04:29Z
* updated_at: 2023-05-15T15:01:54Z
* labels: JavaScript, 字节跳动
* milestone: 中

浏览器和Node.js事件循环在本质上是相同的，它们都是基于事件循环模型实现异步操作。但是它们的实现细节和环境限制有所不同。

在浏览器中，事件循环模型基于浏览器提供的`EventTarget`接口，包括浏览器环境下的DOM、XMLHttpRequest、WebSocket、Web Worker等等，所有的异步任务都会被推入任务队列，等待事件循环系统去处理。

而在Node.js中，事件循环模型则基于Node提供的`EventEmitter`接口，所有的异步任务都会被推入libuv的事件队列中，等待事件循环系统去处理。同时，Node.js还有一个特点是支持I/O操作，也就是在I/O完成之前，会把任务挂起，不会把任务加入到事件队列中，以避免事件队列阻塞。

另外，浏览器中的事件循环系统是单线程的，即所有的任务都在同一个线程中运行，因此需要注意不能有耗时的操作。而Node.js则是多线程的，它可以利用异步I/O等机制来充分利用多核CPU的能力，提高并发处理能力。

---------------

> 2023.05.15 补充

Node.js 和浏览器的 Event Loop 的差异主要体现在以下几个方面：

1.实现方法不同：Node.js 的 Event Loop 实现与浏览器中的不同。Node.js 使用了 libuv 库来实现 Event Loop，而浏览器中通常使用的是浏览器引擎自带的 Event Loop。

2.触发时机不同：Node.js 和浏览器中的 Event Loop 的触发时机也有所不同。浏览器的 Event Loop 在主线程上执行，当主线程空闲时会执行 Event Loop，而 Node.js 的 Event Loop 是在一个单独的线程中运行，与主线程分离。

3.内置的 API 不同：Node.js 的事件机制包含一些在浏览器中没有的 API，比如 fs、http、net 等模块，这些内置的 API 让 Node.js 的 Event Loop 更加强大。

4.在浏览器中，有一些 Web API 是异步的，比如 setTimeout、setInterval、XMLHTTPRequest 等，这些 Web API 在事件队列中注册了一个回调函数，然后在一定时间后由 Event Loop 触发执行。而在 Node.js 中，它们同样存在，但是它们不是 Web API 的一部分。Node.js 通过 Timers、I/O Callbacks、Immediate 和 Close Callbacks 等回调机制来执行类似的任务，这些回调函数同样会被注册到事件队列中等待执行。

总之，Node.js 和浏览器中的 Event Loop 主要差异在于实现方法、触发时机和内置 API 等方面。但无论在哪种环境中，Event Loop 都是 JavaScript 异步编程的基础。

## 203 前端模块化发展历程？

* created_at: 2023-03-26T14:06:45Z
* updated_at: 2023-08-20T14:51:20Z
* labels: 工程化, 腾讯
* milestone: 高

前端模块化是指在前端开发中，通过模块化的方式组织代码，将代码按照一定规则分割成不同的模块，便于管理和维护。

前端模块化的发展历程如下：

1. 早期，前端开发采用的是全局变量的方式进行开发，即将所有代码都放在一个文件中，通过全局变量进行交互。这种方式的问题在于，代码量较大，代码耦合度高，不易维护。

2. 后来，前端开发采用了命名空间的方式进行组织代码，即将代码放在一个命名空间下，通过命名空间进行交互。这种方式解决了全局变量带来的问题，但是在开发大型应用时，仍然存在代码耦合度高、依赖管理不便等问题。

3. 2009年，CommonJS提出了一种新的模块化规范，即将每个模块封装在一个独立的文件中，通过require和exports进行模块之间的依赖管理和导出。这种方式解决了前两种方式带来的问题，但是由于该规范是同步加载模块，不适用于浏览器环境。

4. 2011年，AMD规范提出，即异步模块定义规范，采用异步的方式加载模块，可以在浏览器环境下使用。该规范主要是通过require和define方法进行模块之间的依赖管理和导出。

5. 2013年，CommonJS和AMD的创始人合并了两种规范，提出了新的规范——CommonJS 2.0规范。该规范在CommonJS 1.0的基础上，增加了异步加载的功能，使其可以在浏览器环境下使用。

6. 2014年，ES6（即ECMAScript 2015）正式发布，引入了模块化的支持，即通过import和export语句进行模块之间的依赖管理和导出。ES6的模块化规范具有更好的可读性、可维护性和性能优势，已成为前端开发的主流方式。

7. 同时，还有一些第三方库，如RequireJS、SeaJS等，提供了更加灵活和可扩展的模块化方式，使得前端开发的模块化更加便捷和高效。

-----------------------

 1 函数作为块

最开始的时候，是以函数为块来编程，因为函数有自己的作用域，相对比较独立

```js
function add(a,b){...}
function add1(a,b,c){...}
```

这种形式中，add和add1都是定义在全局作用域中的，会造成很多问题：

1. 污染全局作用域，容易造成命名冲突
2. 定义在全局作用域，数据不安全

 2 namespace模式

使用对象作为独立块编程

```js
var myModule={
 a:1,
 b:2,
 add:function(m,n){...}
}
```

优点：减少了全局变量，有效解决了命名冲突

缺点：

1. 没有私有变量，使用起来很繁琐
2. 数据不安全，模块外面可以随意修改内部的数据

 3 IIFE模式

**使用立即执行函数来创建块，可以形成独立的作用域，外面无法访问，借助window对象来向外暴露接口**

```js
(function($){
 var a=1;
 var b=2;
 function add(m,n){
 ...
 }
 $('#id').addClass('.hehe');
 window.myModule={
 a:a,
 b:b,
 add:add
 }
})()
```

优点：

1. 减少了全局变量，解决了命名冲突
2. 创建了独立的作用域，外部无法轻易修改内部数据

缺点：

**如果多个模块分布在多个js文件中，那么在html文件中就需要引入多个js文件**

1. 会增加多个http请求，增加首屏的时候，降低用户体验
2. **模块之间的引用关系很不明显，难以维护**

 4 CommonJS

最开始出现的模块化方案是在node.js中实现的。node中的模块化方案是根据CommonJS规范实现的。

**CommonJS规定每个文件就是一个模块，以同步的方式引入其他模块**

```js
//a.js
function add(m,n){
 return m+n;
}
module.exports={add:add}


//b.js
const {add} = require('./a.js');
console.log(add(1,2)); // 3
```

这种方式是node端独有的，浏览器端如果想要使用，需要使用 **Browserify** 工具来解析。

 5 AMD和Require.js

CommonJS模块之前是同步引入的，这在服务端是没有什么问题的，因为**文件都是保存在硬盘中，读取文件的速度是非常快的，同步加载带来的阻塞基本可以忽略不计。**

但是如果在浏览器中使用CommonJS的话，因为**js文件是存在服务端需要请求获取，所以同步的方式加载会极大的阻塞页面**，显然是不可取的。

于是诞生了AMD（Asynchronous Module Definition）规范，**一种异步加载的模块方案，使用回调函数来实现**。require.js实现了AMD的规范。

```js
// 定义没有依赖的模块
// a.js
define(function () {
  function add (m, n) {
    return m + n
  }
  return { add }
})

// 定义有依赖的模块
// b.js
define(['a'], function (a) {
  const sum = a.add(1, 2)
  return { sum }
})

// 引用模块
require(['b'], function (b) {
  console.log(b.sum) // 3
})
```

由上面代码分析Require.js的特点

1. 依赖模块的代码都是放在回调函数中，等待模块都加载完成才执行这个回调函数，执行顺序可以保证
2. **内部加载其他模块的时候，使用的是动态添加script标签的方式来实现动态加载**
3. 内部需要缓存模块暴露出来的接口，避免多次执行

**AMD推崇的是依赖前置，提前执行。**

从上面代码可以看出，**在声明一个模块的时候，会在第一时间就将其依赖模块的内部代码执行完毕。而不是在真正使用的地方再去执行。**因此会带来一些资源浪费

```js
define(['a', 'b'], function (a, b) {
  let sum = a.add(1, 2)
  if (false) {
    sum = b.add(1, 2) // b模块是没有被使用的，应该是不需要执行模块内部代码的
  }
  return sum
})
```

 6 CMD和Sea.js

由于require.js自身的一些问题存在，所以后来在国内（玉伯）诞生了CMD（Common Module Definition）和Sea.js。

CMD结合了CommonJS和AMD的特点，也是一种**异步**模块的方案，**提倡就近依赖，延迟执行。**

**需要用到某个模块的时候，才用require引入，模块内部的代码也是在被引入的时候才会执行，声明的时候并没有执行。**

语法设计上比较像CommonJS

```js
// 定义模块 math.js
define(function (require, exports, module) {
  const a = require('./a.js') // 引入模块
  function add (m, n) {
    return m + n
  }
  module.exports = {
    add
  }
})

// 加载模块
seajs.use(['math.js'], function (math) {
  const sum = math.add(1, 2)
})
```

看上面的代码可能会有疑问，模块是异步加载的，但是使用的时候require是同步使用的，没有回调函数，如何能够保证执行的顺序呢？这就不得不提sea.js中的静态依赖分析机制了。

 6.1 Sea.js中的静态依赖分析机制

Sea.js中**模块加载的入口方法是use()方法，执行这个方法会开始加载所有的依赖模块**。然后sea.js中是就近依赖的，它是如何获取依赖模块的呢？

**在define的方法中，如果传入的参数factory是一个函数，内部会执行函数的toString方法，转化成字符串，然后通过正则表达式分析字符串，获取require方法中的参数，通过路径分析去加载依赖的模块**。以此链式分析下去，边分析边加载模块，等待所有的依赖都加载完成之后，才开始调用use的回调函数，正式执行模块内代码。

所以在require方法执行之前，对应的模块已经加载完成了，所以可以直接传入参数，执行模块函数体。

 6.2 Sea.js的特点

1. **就近依赖，延时执行**
2. 内部拥有静态依赖分析机制，保证require之前，模块已经加载完毕，但是函数还没有执行
3. 也是一种异步的模块化方案
4. 内部也有缓存机制，缓存模块暴露的接口
5. 内部加载模块的时候，和require.js一样，也是通过**动态增加script标签**来完成的

 7 ES Module

ES6开始，在语法标准上实现了模块化功能。简称ES Module

**ES Module是一种静态依赖的模块化方案，模块与模块之间的依赖关系是在编译期完成连接的。**

**前面所说的三种方案都是动态模块化方案，依赖模块都是动态引入的，而且模块都是一个对象。而ES Module中，模块不是一个对象，模块与模块之间也不是动态引入的，而且编译期间静态引入的，所以无法实现条件加载**

```js
//a.js
function add(m,n){
 return m+n;
}
export {add};

// b.js
import {add} from './a.js';
console.log(add(1,2)); //3
```

## 204 AMD 和 CMD 模块化有和区别？

* created_at: 2023-03-26T14:08:39Z
* updated_at: 2023-03-26T14:11:05Z
* labels: 工程化, 腾讯
* milestone: 高

AMD（Asynchronous Module Definition）和CMD（Common Module Definition）都是JavaScript模块化方案。它们的主要区别在于对依赖的处理方式上不同。

AMD是在require.js推广过程中诞生的，它的特点是提前执行，强调依赖前置。也就是说，在定义模块时就需要声明其所有依赖的模块。它的语法如下：

```javascript
define(['dependency1', 'dependency2'], function (dependency1, dependency2) {
  // 模块的定义
})
```

CMD是在Sea.js推广过程中诞生的，它和AMD非常相似，但是更加懒惰，是依赖就近，延迟执行。也就是说，在模块中需要用到依赖时，才去引入依赖。它的语法如下：

```javascript
define(function (require, exports, module) {
  const dependency1 = require('dependency1')
  const dependency2 = require('dependency2')
  // 模块的定义
})
```

简单来说，AMD是提前执行、依赖前置，CMD是延迟执行、依赖就近。两种模块化方案各有优缺点，选择哪种模块化方案需要根据实际情况和个人偏好进行考虑。

## 205 全局作用域中，用 const 和 let 声明的变量不在 window 上，那到底在哪里？如何去获取？

* created_at: 2023-03-26T14:10:46Z
* updated_at: 2023-03-26T14:11:39Z
* labels: JavaScript, 百度
* milestone: 初

用 `const` 或 `let` 声明的变量不会挂在在 `window` 对象上，而是在一个称为块级作用域（block scope）的作用域内。这个作用域可以是一个函数、一个代码块（比如 `{}` 之间的语句），或者全局作用域。

在块级作用域中声明的变量无法通过 `window` 对象访问，只能在当前作用域内访问。如果要在全局作用域中访问这个变量，需要显式地将它添加到 `window` 对象上。

以下是一个例子：

```javascript
{
  const foo = 'bar'
  const baz = 'qux'
  const quux = 'corge'
}

console.log(window.foo) // undefined
console.log(window.baz) // undefined
console.log(window.quux) // 'corge'
```

在上面的例子中，`foo` 和 `baz` 声明在一个代码块内，因此它们不会挂在在 `window` 对象上。而 `quux` 声明使用了 `var`，因此它会被挂在在 `window` 对象上。

如果我们希望在全局作用域中访问 `foo` 和 `baz`，可以将它们手动添加到 `window` 对象上：

```javascript
{
  const foo = 'bar'
  const baz = 'qux'
  const quux = 'corge'

  window.foo = foo
  window.baz = baz
}

console.log(window.foo) // 'bar'
console.log(window.baz) // 'qux'
console.log(window.quux) // 'corge'
```

但是，在实际编程中，最好尽量避免将变量挂在在 `window` 对象上，以避免命名冲突和污染全局命名空间。

## 206 浏览器缓存中 Memory Cache 和 Disk Cache， 有啥区别？

* created_at: 2023-03-26T14:24:33Z
* updated_at: 2023-04-12T13:47:16Z
* labels: 网络, 字节跳动
* milestone: 高

 Memory Cache 和 Disk Cache 的区别

在浏览器缓存中，Memory Cache 和 Disk Cache 是两种不同的缓存类型，它们有以下区别：

1. 存储位置：Memory Cache 存储在内存中，而 Disk Cache 存储在硬盘中。
2. 读取速度：Memory Cache 读取速度比 Disk Cache 快，因为内存访问速度比硬盘访问速度快。
3. 存储容量：Memory Cache 存储容量比较小，一般只有几十兆，而 Disk Cache 存储容量比较大，可以有数百兆或者更多。
4. 生命周期：Memory Cache 生命周期短暂，一般只在当前会话中有效，当会话结束或者浏览器关闭时，Memory Cache 就会被清空；而 Disk Cache 生命周期比较长，数据可以被保存很长时间，即使浏览器关闭了，下次打开还可以使用。

一般来说，浏览器在请求资源时，会优先从 Memory Cache 中读取，如果没有找到再去 Disk Cache 中查找。如果两种缓存中都没有找到，则会向服务器发送请求。如果需要强制刷新缓存，可以通过清空浏览器缓存来实现。

 什么情况下资源会缓存在 Memory Cache， 什么情况下会缓存在 Disk Cache ?

浏览器中的缓存是为了提高网页访问速度和减少网络流量而存在的。缓存分为 Memory Cache 和 Disk Cache 两种。

Memory Cache 是浏览器内存缓存，资源会被缓存在内存中，由于内存读取速度快，所以 Memory Cache 的读取速度也较快。资源被缓存在 Memory Cache 中的情况有：

1. 当前页面中通过 `<link>` 或者 `<script>` 标签引入的资源；
2. 当前页面通过 XMLHttpRequest 或 Fetch API 请求获取到的资源。

Disk Cache 是浏览器磁盘缓存，资源会被缓存在磁盘中。由于磁盘读取速度相对内存较慢，所以 Disk Cache 的读取速度也较慢。资源被缓存在 Disk Cache 中的情况有：

1. 当前页面中通过 `<img>` 标签引入的资源；
2. 当前页面中通过 `<audio>` 或 `<video>` 标签引入的资源；
3. 当前页面中通过 `iframe` 加载的资源；
4. 当前页面中通过 `WebSocket` 加载的资源；
5. 通过 `Service Worker` 缓存的资源。

一般来说，比较大的资源会被缓存到 Disk Cache 中，而较小的资源则会被缓存到 Memory Cache 中。如果需要手动清除缓存，可以在浏览器设置中找到相应选项进行操作。

## 207 使用 虚拟DOM 一定会比直接操作 真实 DOM 快吗？

* created_at: 2023-03-27T14:59:24Z
* updated_at: 2023-03-27T14:59:28Z
* labels: 工程化, 百度
* milestone: 高

大家惯有的思维模式下，我们普遍的认为，虚拟DOM一定会比原生DOM要快的多。

但实际上并不是这样。

**仅从React的角度来说 : React的官网可从来都没有说过虚拟DOM会比原生操作DOM更快。**

虚拟DOM和原生操作DOM谁更快这个问题。如果要我来回答的话，**一定是原生DOM比虚拟DOM更快性能更好。**

值得注意的是，**虚拟DOM并不是比原生DOM快，更确切的来说，虚拟DOM是比操作不当的原生DOM快**。实际上，如果对原生DOM的操作得当的话，原生DOM的性能一定优于虚拟DOM。

我们来剖析一下。

 虚拟DOM为什么而存在

**其最核心的思想是提升开发效率而非提升性能**

使用 React/Vue 这些框架的时候，我们不需要去考虑对DOM的操作，只需要关心数据的改变。我们以前还在使用JQ的时候，数据改变之后我们需要调用`$("#id").append(node)`等操作去手动追加DOM。而在使用React/Vue之后，我们只需要关心数据的改变。至于对DOM的一系列动作，在我们的数据改变之后，React/Vue会为我们代劳。这极大程度的提升了我们的开发效率。也是React/Vue的核心思想和初衷。

至于很多人都说，虚拟DOM会比操作原生DOM更快，这个说法并不全面。比如，**首次渲染或者所有节点都需要进行更新的时候。这个时候采用虚拟DOM会比直接操作原生DOM多一重构建虚拟DOM树的操作。这会更大的占用内存和延长渲染时间。**

 举个例子

**首次渲染👇不采用虚拟DOM的步骤**

1. 浏览器接受绘制指令
2. 创建所有节点

**首次渲染👇采用虚拟DOM的步骤**

1. 浏览器接受绘制指令
2. 创建虚拟DOM
3. 创建所有节点

不难发现，在首次渲染的时候，采用虚拟DOM会比不采用虚拟DOM要多一个**创建虚拟DOM**的步骤。

> 注意:虚拟DOM的存在，并不是免费的，比对新旧虚拟DOM树的差异会带来一定的性能开销。

**虚拟DOM的优势在于我们更新节点时候。它会检查哪些节点需要更新。尽量复用已有DOM，减少DOM的删除和重新创建。并且这些操作我们是可以通过自己手动操作javascript底层api实现的。只是我们手动操作会非常耗费我们的时间和精力。这个工作由虚拟DOM代劳，会让我们开发更快速便捷。**

 举个例子👇

在采用虚拟DOM的前提下

假设我们有节点A，下辖两个子节点B/C.

然后我们删除了节点C

这个时候会有两棵虚拟DOM树，

一颗是修改前的，A->B/C。

另一颗是修改后的A->B。

`diff算法会去比对两颗树的差异`，然后发现A->B没有更改，那么A->B节点保留，C节点执行删除动作。

那么，A->B两个节点的删除和创建渲染操作就被省略了。

如果不采用虚拟DOM的话。使用JQ那时候的模板.

我们可能会把A->B/C三个节点全部删除.

再全都重新创建。而A->B是完全没有改动的。

他们的删除和创建则完全不必要。

 框架的意义

我们需要知道:不论是React还是Vue或者是Angular。这些框架本身，都是基于原生的基础上创造的。它们，底层依赖的还是javascript，并不是一门新的语言。在他们的底层逻辑下。我们使用框架所做出的一切行为，都会被框架转化为对原生DOM的操作。**框架，只是一个转化语法的工具。**

既然原生DOM可以创造出这些框架。当然我们使用原生DOM自然是可以写出比这些框架更好的性能。

但是:为什么对原生DOM进行操作的性能明明可以比使用框架更好。为什么大家都在使用框架，而没有人去直接对原生DOM进行操作。

这背后涉及`成本`和`普适性`。

如果我们直接去操作真实DOM,当然，我们可以做到在性能上比虚拟DOM更快。但问题是，技术水准能做到这个地步的人，又有多少人呢。不说比虚拟DOM快。即使是做到和虚拟DOM不分上下的性能，拥有这种水平的前端玩家，也是寥寥无几。**基于这样的客观情况下，框架的出现解决了这个问题。**

框架存在的意义 : 在为我们提供只需要关注数据的前提下。框架本身已经做好了底层原理上的性能优化（包括但不限于,对DOM的调用,算法上的优化）已经是高度封装。这样就可以让我们使用一些简单的较为容易理解的技术去做我们原本做不到的事情。 这其实就像调用网上的第三方包，某一个功能，自己写是写不出来，写出来性能也不会很好。但是同样的功能，我们去网上引入其他大神已经封装完成的第三方包。我们就会用，功能就可以实现并且性能上也过得去。

如果让大家直接对DOM进行操作完成比框架更优秀的性能。这绝不是大多数人可以做到的。让大多数可以接受，框架需要做的，就是让大多数人使用尽量使用简单的技术，完成相对困难的操作。这是`普适性`。

并且，如果完成同一个性能效果，需要我们去*精通原生javascript*和*学习框架上的一些简单的API和结构*。明显后者的学习成本更低。如果说使用框架我们所能完成的某一阶段的性能所需要的学习成本是2个月的话。 那么学习javascript完成同一阶段的性能可能需要一年。

框架的初衷就是让用户使用尽量简单的技术，完成相对复杂的工作并提升一定的性能 *（这其中包括但不限于:可维护性，可复用性，渲染效率等）* 。这样，即使我们的水平不是很高，使用框架以后。项目在性能上也能过得去。

总结

1. 虚拟DOM不一定会比操作原生DOM更快。
2. 虚拟DOM的优势在于节点进行改动的时候尽量减少开销
3. React从来没说过虚拟DOM会比原生更快。
4. 框架的本质是提升开发效率，让我们的注意力更集中于数据

## 208 使用迭代的方式实现 flatten 函数？

* created_at: 2023-03-27T15:03:15Z
* updated_at: 2023-03-27T15:03:48Z
* labels: JavaScript, 百度
* milestone: 中

可以使用迭代的方式实现 `flatten` 函数，具体思路如下：

1. 创建一个新数组 `result` 来存放结果。
2. 创建一个栈 `stack`，将原数组作为第一个元素压入栈中。
3. 当栈不为空时，取出栈顶元素，如果该元素是一个数组，则将其展开后的每个元素压入栈中。
4. 如果该元素不是一个数组，则将其加入到 `result` 中。
5. 重复步骤 3 和 4，直到栈为空。

下面是代码实现：

```javascript
function flatten (array) {
  const result = []
  const stack = [array]

  while (stack.length > 0) {
    const item = stack.pop()

    if (Array.isArray(item)) {
      for (let i = item.length - 1; i >= 0; i--) {
        stack.push(item[i])
      }
    } else {
      result.push(item)
    }
  }

  return result.reverse()
}
```

这里使用了一个技巧，就是在将数组元素压入栈中时，从数组的末尾开始遍历，这样就可以保证压入栈中的顺序和展开后的顺序是一致的，最后再将结果翻转一下即可。

## 209 [Redux] 为什么 Redux 的 reducer 中不能做异步操作？

* created_at: 2023-03-27T15:06:54Z
* updated_at: 2023-03-27T15:06:55Z
* labels: web框架, 百度
* milestone: 高

Redux 的 reducer 是纯函数，它的作用是接收一个旧的状态和一个操作，返回一个新的状态，是一个纯粹的状态转换函数，因此在 reducer 中不能执行异步操作，否则会破坏 reducer 的纯函数特性。如果在 reducer 中执行异步操作，会导致 reducer 不可预测和不可重现，因为异步操作的结果是不确定的，而 reducer 必须保证在相同的输入条件下，产生相同的输出结果。同时，在 reducer 中执行异步操作可能会导致应用的状态不一致或者有延迟的问题。

为了解决这个问题，Redux 提供了中间件的机制，比如 `redux-thunk`、`redux-saga` 等，可以在中间件中进行异步操作，然后再将异步操作的结果传递给 reducer 进行状态更新。这样就可以避免在 reducer 中执行异步操作，保证 reducer 的纯函数特性，同时也可以完成异步操作的需求。

## 211 下面代码中 a 在什么情况下会打印 1 ?

* created_at: 2023-03-27T15:13:43Z
* updated_at: 2023-03-27T15:13:44Z
* labels: JavaScript, 京东
* milestone: 中

 问题

```js
var a = ?;
if(a == 1 && a == 2 && a == 3){
  console.log(1);
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

## 212 [3, 15, 8, 29, 102, 22].sort(), 结果是多少， 为什么？

* created_at: 2023-03-27T15:26:57Z
* updated_at: 2023-03-27T15:26:59Z
* labels: JavaScript, 京东
* milestone: 中

输出结果为：

```js
[102, 15, 22, 29, 3, 8]
```

原因：
`Array.prototype.sort()`

如果没有指明 compareFn ，那么元素会按照转换为的字符串的诸个字符的 Unicode 位点进行排序。例如 "Banana" 会被排列到 "cherry" 之前。当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 compareFn），比较的数字会先被转换为字符串，所以在 Unicode 顺序上 "80" 要比 "9" 要靠前。

如果指明了 compareFn ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

如果 compareFn(a, b) 大于 0，b 会被排列到 a 之前。
如果 compareFn(a, b) 小于 0，那么 a 会被排列到 b 之前；
如果 compareFn(a, b) 等于 0，a 和 b 的相对位置不变。 备注：ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；

参考文档：[资料](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

## 213 https 的证书验证过程是什么样的

* created_at: 2023-03-27T16:00:36Z
* updated_at: 2023-09-16T16:59:45Z
* labels: 网络
* milestone: 中

HTTPS的证书验证过程通常包括以下几个步骤：

1. 客户端向服务端发起HTTPS请求，服务端将其公钥证书发送给客户端。
2. 客户端接收到服务端的证书后，首先验证证书是否过期，如果过期，则证书无效，验证失败；如果证书未过期，则进行下一步。
3. 客户端使用CA证书（如系统内置的或者从服务端获取）对服务端证书进行验证，以确定该证书是否是由受信任的CA颁发的。如果验证失败，则证书无效，验证失败；如果验证成功，则进行下一步。
4. 客户端生成一个随机值，使用服务端公钥进行加密，并将加密后的随机值发送给服务端。
5. 服务端接收到客户端的随机值后，使用私钥进行解密，得到随机值。服务端再将随机值作为密钥，使用对称加密算法加密需要传输的数据，并发送给客户端。
6. 客户端接收到服务端发送的加密数据后，使用随机值进行解密，得到明文数据。

以上就是HTTPS证书验证的一般流程。客户端验证服务端证书的方式是通过验证证书的数字签名来确定证书的合法性，如果数字签名验证失败，则证书无效，验证失败。

## 214 this指向与对象继承数组方法：输出以下代码执行的结果并解释为什么？

* created_at: 2023-03-27T16:13:39Z
* updated_at: 2023-03-27T16:13:40Z
* labels: JavaScript, 京东
* milestone: 高

 代码如下

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

## 215 [Vue] 双向绑定和单向数据流原则是否冲突？

* created_at: 2023-03-28T14:39:19Z
* updated_at: 2023-03-28T14:43:42Z
* labels: web框架
* milestone: 中

Vue 的双向绑定和单向数据流原则不冲突，因为它们是针对不同的场景和目的而提出的。

Vue 的双向绑定是指，在模板中通过 `v-model` 指令可以实现表单元素和组件数据之间的双向绑定，当表单元素的值发生变化时，组件数据也会同步更新；反过来，当组件数据发生变化时，表单元素的值也会同步更新。这种双向绑定的机制可以减少手动编写事件监听器的工作量，提高代码的可读性和可维护性。

而单向数据流原则是指，在 Vue 应用中，数据的流动是单向的，即自上而下单向流动。父组件通过 props 把数据传递给子组件，子组件通过 $emit 事件把数据传递给父组件或者其他祖先组件。这种单向数据流的机制使得数据的变化更加可控和可预测，方便进行状态管理和调试。

双向绑定和单向数据流原则虽然在实现机制上有所不同，但它们都是为了解决不同的问题和提高代码的可维护性和可读性。在实际开发中，可以根据实际情况选择合适的机制来使用。

## 216 实现 (5).add(3).minus(2) 功能

* created_at: 2023-03-28T14:41:08Z
* updated_at: 2023-03-28T14:41:09Z
* labels: JavaScript, 百度
* milestone: 中

可以通过在 Number 原型上定义 add 和 minus 方法来实现该功能，代码如下：

```javascript
Number.prototype.add = function (num) {
  return this + num
}

Number.prototype.minus = function (num) {
  return this - num
}

console.log((5).add(3).minus(2)) // 输出6
```

上述代码中，通过在 Number.prototype 上定义 add 和 minus 方法，实现了将数字类型的值转换为 Number 对象，并且可以链式调用这两个方法。最终返回的结果是一个数值类型的值。

## 217 [Vue] 响应式原理中 Object.defineProperty 有什么缺陷

* created_at: 2023-03-28T14:43:24Z
* updated_at: 2024-04-13T14:00:17Z
* labels: web框架, 腾讯
* milestone: 中

Vue 2 中使用`Object.defineProperty`来实现其响应式系统存在一些限制和问题：

1. **深度检测**：
 Vue 2中对于对象的处理是递归的；对于每个属性，Vue会逐层使用`Object.defineProperty`将其转换成 getter/setter。这样，当你访问或修改嵌套较深的属性时（如`a.b.c`），Vue已经提前将`a`、`a.b`和`a.b.c`的属性转换为响应式，能够追踪它们的变化。

2. **数组限制**：
 `Object.defineProperty`无法检测到数组索引的变化，因此Vue重写了数组的变异方法（如`push`、`pop`、`splice`等）来实现对数组的响应式监听。

3. **对象属性添加或删除的限制**：
 因为`Object.defineProperty`只能在初始化的时候应用于属性，当你在一个已经创建的Vue实例上添加新属性时，这个新属性是非响应式的。如果你想要它是响应式的，需要使用`Vue.set()`或`this.$set()`方法添加新属性。

4. **性能问题**：
 因为`Object.defineProperty`是递归地对对象的每一个属性进行处理，所以在处理具有大量属性或深层嵌套对象时，可能会有较大的性能开销。

关于处理`a.b.c`类型的属性，Vue 2内部会递归地遍历对象`a`的所有属性，为它们各自使用`Object.defineProperty`定义getter和setter。如果`b`是`a`的属性，那么同样会针对`b`做这样的处理，以及它的所有属性，包括`c`等。这样，在访问或修改`a.b.c`时，Vue可以追踪到这些变化并触发相关的更新。

```javascript
function defineReactive (obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      // 依赖收集等操作
      return val
    },
    set: function reactiveSetter (newVal) {
      if (newVal === val) return
      val = newVal
      // 触发更新视图等操作
    }
  })

  // 如果val本身还是对象，则递归处理
  if (typeof val === 'object') {
    reactive(val)
  }
}

function reactive (obj) {
  for (const key in obj) {
    defineReactive(obj, key, obj[key])
  }
}
```

在上面的`reactive`函数中，我们将一个对象转换成响应式对象。这是Vue内部实现响应式的简化版原理。不过，Vue的响应式系统要复杂得多，它还涉及依赖收集和派发更新等机制。

## 218 对象引用类问题：以下代码的执行结果是什么，并解释原因

* created_at: 2023-03-28T14:50:37Z
* updated_at: 2023-03-28T14:50:38Z
* labels: JavaScript, 百度
* milestone: 中

 代码如下， 请问执行结果

```js
let a = { n: 1 }
const b = a
a.x = a = { n: 2 }

console.log(a.x)
console.log(b.x)
```

 执行结果和原因

结果是 `undefined` 和 `{n: 2}`。

这段代码可以分解为以下步骤：

1. 创建一个对象 `a`，属性 `n` 的值为 `1`。
2. 将变量 `b` 指向 `a`，`b` 现在也引用了这个对象。
3. 执行赋值语句 `a.x = a = {n: 2}`，其中 `a.x` 引用的是对象 `a` 的 `x` 属性，但是此时 `a` 的值被重新赋值为一个新的对象 `{n: 2}`。
4. 所以现在 `a` 引用的是 `{n: 2}`，而 `b` 仍然引用原始的对象 `{n: 1}`，且其 `x` 属性被赋值为 `{n: 2}`。
5. 所以 `console.log(a.x)` 结果为 `undefined`，因为 `a` 引用的对象没有 `x` 属性；而 `console.log(b.x)` 结果为 `{n: 2}`，因为 `b` 引用的对象的 `x` 属性被赋值为 `{n: 2}`。

## 220 `opacity: 0`、`visibility: hidden`、`display: none` 有啥区别， 主要使用场景是啥子？

* created_at: 2023-03-28T14:59:48Z
* updated_at: 2023-03-28T14:59:49Z
* labels: CSS
* milestone: 中

`opacity: 0`、`visibility: hidden`、`display: none` 都可以使元素不可见，但它们之间有一些区别。

* `opacity: 0`：设置元素透明度为0，元素依然占据原来的空间，并且可以接收到鼠标事件。通常用于实现淡出效果。
* `visibility: hidden`：元素不可见，但是仍然占据原来的空间，并且可以接收到鼠标事件。常用于实现菜单的展开和收起。
* `display: none`：元素不可见，且不占据空间，也不接收鼠标事件。通常用于实现元素的隐藏和显示。

因为这三种属性的区别，它们在使用场景上也有所不同：

* `opacity: 0`：适用于需要实现淡出效果的场景，比如弹出层的显示和隐藏。
* `visibility: hidden`：适用于需要占据原来空间的元素，但不需要显示的场景，比如菜单的展开和收起。
* `display: none`：适用于需要完全隐藏元素的场景，比如实现一个开关，点击开关后可以隐藏或者显示某个元素。

## 221 箭头函数为何不能作为构造函数使用？

* created_at: 2023-03-28T15:27:58Z
* updated_at: 2023-03-28T15:27:59Z
* labels: JavaScript, 腾讯
* milestone: 中

在箭头函数中，`this`指向的是定义时所在的对象，而不是使用时所在的对象。换句话说，**箭头函数没有自己的this，而是继承父作用域中的this**。

看个例子:

```javascript
const person = {
  name: '张三',
  age: 18,
  getName: function () {
    console.log('我的名字是：' + this.name)
  },
  getAge: () => {
    console.log('我的年龄是：' + this.age)
  }
}

person.getName() // 我的名字是张三
person.getAge() // 我的年龄是undefined
```

`person.getName()`中`this`指向函数的调用者，也就是`person`实例，因此`this.name = "张三"`。

`getAge()`通过箭头函数定义，而箭头函数是没有自己的`this`，会继承父作用域的`this`，因此`person.getAge()`执行时，此时的作用域指向`window`，而`window`没有定义`age`属性，所有报`undefined`。

从例子可以得出：**对象中定义的函数使用箭头函数是不合适的**。

**先解答下标题问题，为啥箭头函数不能作为构造函数？**

```javascript
// 构造函数生成实例的过程
function Person (name, age) {
  this.name = name
  this.age = age
}
var p = new Person('张三', 18)

// new关键字生成实例过程如下
// 1. 创建空对象p
var p = {}
// 2. 将空对象p的原型链指向构造器Person的原型
p.__proto__ = Person.prototype
// 3. 将Person()函数中的this指向p
// 若此处Person为箭头函数，而没有自己的this，call()函数无法改变箭头函数的指向，也就无法指向p。
Person.call(p)
```

构造函数是通过new关键字来生成对象实例，生成对象实例的过程也是通过构造函数给实例绑定this的过程，而箭头函数没有自己的this。创建对象过程，`new` 首先会创建一个空对象，并将这个空对象的`__proto__`指向构造函数的`prototype`，从而继承原型上的方法，但是箭头函数没有`prototype`。因此不能使用箭头作为构造函数，也就不能通过new操作符来调用箭头函数。

## 222 给定两个数组，写一个方法来计算它们的交集？

* created_at: 2023-03-28T15:30:22Z
* updated_at: 2023-10-13T04:26:01Z
* labels: JavaScript, 腾讯, 代码实现/算法
* milestone: 中

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

## 223 介绍下如何实现 token 加密？

* created_at: 2023-03-28T15:36:35Z
* updated_at: 2023-03-28T15:36:35Z
* labels: 网络
* milestone: 高

Token 是一种常用的身份验证机制，通常被用于 Web 应用程序的用户身份验证。Token 的生成和使用可以使用加密技术来增强安全性，下面介绍一下如何实现 Token 加密。

Token 加密一般有两个步骤：

1. 生成 Token
2. 加密 Token

1. 生成 Token

在生成 Token 时，需要将用户的一些信息进行组合，生成一个字符串，该字符串通常包括以下信息：

1. 用户的唯一标识（如用户 ID）
2. 时间戳
3. 有效期

这些信息可以用分隔符分隔开，如用“.”分隔。

 2. 加密 Token

加密 Token 有多种方式，下面介绍两种常用的方式：

 1. 对称加密

对称加密是指加密和解密使用同一密钥的加密算法。对称加密的优点是加解密速度快，缺点是密钥传输容易被截获，从而影响安全性。

常用的对称加密算法有 DES、3DES、AES 等。

 2. 非对称加密

非对称加密是指加密和解密使用不同密钥的加密算法。非对称加密的优点是密钥传输安全，缺点是加解密速度较慢。

常用的非对称加密算法有 RSA、DSA 等。

一般情况下，为了兼顾安全性和效率，通常采用混合加密，即先使用非对称加密算法对 Token 进行加密，再使用对称加密算法对加密后的 Token 进行加密。

综上所述，实现 Token 加密的关键在于对 Token 的生成和加密，需要根据具体业务需求来选择合适的加密算法和加密方式。

## 224 对象取值中 a.b.c.d 和 a['b']['c']['d'] 有何区别？

* created_at: 2023-03-28T15:40:55Z
* updated_at: 2023-03-28T15:40:57Z
* labels: JavaScript, 腾讯
* milestone: 初

 使用区别

在 JavaScript 中，对象的取值可以使用两种方式，即使用点号（.）和使用方括号（\[\]）。对于对象的多层嵌套属性，可以使用两种方式分别取值，例如：

```css
cssCopy codevar obj = {a: {b: {c: {d: 123}}}};
var d1 = obj.a.b.c.d;
var d2 = obj['a']['b']['c']['d'];
```

这两种方式获取的结果是相同的，都是 123。其中，使用点号取值的方式称为“点操作符”，使用方括号取值的方式称为“方括号操作符”。

两种方式的区别在于：

1. 点操作符必须使用标识符作为属性名，而方括号操作符可以使用任何字符串作为属性名。
2. 点操作符在代码书写上更加简洁直观，而方括号操作符可以动态地构造属性名。

因此，在使用时应根据具体的情况选择合适的方式。例如，如果属性名是固定的，建议使用点操作符；如果属性名需要根据变量或其他动态条件构造，则需要使用方括号操作符。

 性能区别

在对象属性的取值操作中，使用点号`.`和中括号`[]`两种方式都能取到相应的属性值，它们在性能上也有些许的差别。

一般情况下，使用点号`.`来获取属性的性能要高于中括号`[]`，因为在解析的过程中使用点号`.`可以直接根据属性名获取到对应的属性值，而中括号`[]`需要先进行解析里面的属性名，然后再去查找相应的属性值，因此多了一个解析的过程。

但是在以下两种情况下，只能使用中括号`[]`来获取属性值：

1. 属性名包含特殊字符或者是关键字，比如 a\['class'\]。
2. 属性名是动态生成的，比如 a\[`${name}`\]。

在这两种情况下，使用点号`.`将会出现语法错误，只能使用中括号`[]`来获取属性值。

## 225 ES6 代码转成 ES5 代码的实现思路是什么？

* created_at: 2023-03-28T15:43:52Z
* updated_at: 2023-03-28T15:43:53Z
* labels: JavaScript, 阿里巴巴
* milestone: 高

ES6 代码转成 ES5 代码的实现思路主要是通过使用 Babel 这样的工具来实现。Babel 是一个广泛使用的 JavaScript 编译器，可以将 ES6 代码转换成向后兼容的 ES5 代码，从而在现有的浏览器和环境中运行。其主要实现思路如下：

1. 词法分析：Babel 首先会将输入的代码进行词法分析，将代码分割成一个个词法单元。

2. 语法分析：接下来 Babel 会对分割后的词法单元进行语法分析，生成抽象语法树(AST)。

3. 转换：通过对 AST 进行遍历和修改，Babel 将 ES6 代码转换成 ES5 代码。

4. 代码生成：最后，Babel 会根据转换后的 AST 生成可运行的 ES5 代码。

在转换过程中，Babel 会根据预定义的插件和预设对代码进行转换。插件和预设可以分别处理一些特定的语法和功能，如箭头函数、类和模块等。同时，Babel 还支持开发者自定义插件和预设来处理更加特殊和个性化的需求。

## 226 前端动画有哪些实现方式？

* created_at: 2023-03-29T14:51:14Z
* updated_at: 2023-03-29T14:51:16Z
* labels: JavaScript, 阿里巴巴
* milestone: 中

 主要的实现方式

**JS 的实现方式**

* 通过定时器(`setTimeout`, `setInterval`)来间隔改变元素样式
* requestAnimationFrame

**CSS 3**

* 过度动画：transition
* animation 动画

**HTML 5**

* Canvas
* WebGL
* svg

 requestAnimationFrame

`window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。 该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

当你准备更新动画时你应该调用此方法。这将使浏览器在下一次重绘之前调用你传入给该方法的动画函数 (即你的回调函数)。回调函数执行次数通常是**每秒 60 次**，但在大多数遵循 W3C 建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。

回调函数会被传入 **DOMHighResTimeStamp** 参数，**DOMHighResTimeStamp**指示当前被 `requestAnimationFrame()` 排序的回调函数被触发的时间。在同一个帧中的多个回调函数，它们每一个都会接受到一个相同的时间戳，即使在计算上一个回调函数的工作负载期间已经消耗了一些时间。该时间戳是一个十进制数，单位毫秒，最小精度为 1ms(1000μs)。

**使用语法**： `window.requestAnimationFrame(callback);`

参数： 下一次重绘之前更新动画帧所调用的函数 (即上面所说的回调函数)。该回调函数会被传入 `DOMHighResTimeStamp` 参数，该参数与 `performance.now()` 的返回值相同，它表示 `requestAnimationFrame()` 开始去执行回调函数的时刻。

使用示范：

```html
<div id="demo"
 style="position: absolute;width: 100px;height: 100px;background-color: #ccc;left: 0;top: 0;">
</div>
<script>
 var demo = document.getElementById("demo");
 function reader() {
 demo.style.left = parseInt(demo.style.left) + 1 + "px";// 每一帧向右移动1px
 }
 requestAnimationFrame(function() {
 reader();

 // 当超过300px 后才停止
 if (parseInt(demo.style.left) > 1300) demo.style.left = 0;
 requestAnimationFrame(arguments.callee);
 });
</script>
```

 transition

|属性名|说明|
|---|---|
|transition|用于简写设置四个过渡属性，包括：transition-property, transition-duration, transition-timing-function 和 transition-delay|
|transition-property|规定应用过渡效果的 CSS 属性的名称，多个属性用逗号分隔，如：`transition-property: width, height;`，表示在 width 和 height 发生改变时会应用过渡效果|
|transition-duration|规定过渡效果的持续时间，如：`transition-duration: 1s;`，表示过渡效果持续时间为 1 秒|
|transition-timing-function|规定过渡效果的时间曲线，即过渡效果的速度变化。常用的值包括：`linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier(n,n,n,n)`|
|transition-delay|规定过渡效果何时开始，如：`transition-delay: 1s;`，表示在 1 秒之后开始应用过渡效果|

可以通过设置不同的 transition 属性，来实现各种各样的过渡效果。例如：

```css
cssCopy codediv {
 width: 100px;
 height: 100px;
 background-color: red;
 transition: width 1s ease-in-out;
}

<div:hover {
 width: 200px;
}
```

上述代码表示当鼠标悬停在 div 元素上时，它的宽度会从 100px 变为 200px，过渡效果会持续 1 秒，且速度曲线为缓进缓出。

 animation

下面是 CSS3 animation 的属性表格：

|属性|描述|
|---|---|
|animation-name|规定需要绑定到选择器的 keyframe 名称。|
|animation-duration|规定动画完成一个周期所花费的秒或毫秒。|
|animation-timing-function|规定动画的速度曲线。|
|animation-delay|规定在动画开始之前的延迟。|
|animation-iteration-count|规定动画应该播放的次数。|
|animation-direction|规定是否应该轮流反向播放动画。|
|animation-fill-mode|规定当动画不播放时（当动画完成之前，或当动画被暂停时），要应用到元素的样式。|
|animation-play-state|规定动画是否正在运行或已暂停。|
|animation|是 animation 属性的一个简写属性，包含六个独立属性。|

其中，animation-name、animation-duration、animation-timing-function 是必须要指定的属性。其他属性都是可选的。通过这些属性，我们可以实现更加灵活的动画效果。

一个使用 `animation` 的例子是实现旋转动画。例如，可以创建一个带有 CSS 类名 `.rotate` 的 `div` 元素，并使用以下样式：

```css
cssCopy code.rotate {
 animation: spin 2s linear infinite;
}

@keyframes spin {
 from {
 transform: rotate(0deg);
 }
 to {
 transform: rotate(360deg);
 }
}
```

这将在 `div` 元素上应用一个旋转动画，持续时间为 2 秒，并且以线性方式无限循环。在 `@keyframes` 规则中定义了旋转动画的动画过程。在 `from` 和 `to` 关键帧中，定义了元素旋转的起始和结束状态。在 `animation` 属性中，指定了动画名称、持续时间、时间函数和动画播放次数等参数。

 Canvas 实现动画

Canvas 可以通过一帧帧的绘制来实现动画。具体来说，可以通过 `requestAnimationFrame` 方法在浏览器下一次重绘之前执行指定的回调函数来不断地更新 Canvas 上的内容，从而实现动画效果。

以下是 Canvas 实现动画的一般流程：

1. 获取 Canvas 对象和上下文对象

首先，需要获取 Canvas 对象和上下文对象。

```javascript
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
```

2. 设置动画帧数和初始状态

为了实现动画，需要对 Canvas 进行重绘。重绘的次数由动画的帧数决定，通常设置为每秒 60 帧。

同时，还需要设置 Canvas 的初始状态，包括背景颜色、形状、大小等。

3. 定义动画函数

动画函数中主要包含两个部分：更新状态和绘制图形。更新状态指更新 Canvas 上的图形的位置、大小、颜色等属性，绘制图形指将更新后的图形绘制到 Canvas 上。

```javascript
function animate () {
  // 更新状态
  // ...

  // 绘制图形
  // ...
}
```

4. 使用 requestAnimationFrame 方法执行动画

最后，可以使用 `requestAnimationFrame` 方法不断执行动画函数，从而实现动画效果。

```javascript
function animate () {
  // 更新状态
  // ...

  // 绘制图形
  // ...

  // 递归调用 requestAnimationFrame 方法执行动画
  requestAnimationFrame(animate)
}

// 启动动画
requestAnimationFrame(animate)
```

在动画函数中更新状态和绘制图形后，调用 `requestAnimationFrame` 方法递归执行动画函数，从而实现不断更新和绘制的动画效果。

 svg 实现动画

SVG（可缩放矢量图形）是一种使用 XML 描述 2D 图形的格式，它可以使用 CSS 和 JavaScript 进行动画操作。在 SVG 中，可以使用两种技术实现动画，分别是 SMIL（Synchronized Multimedia Integration Language）和 JavaScript。

下面举一个使用 JavaScript 实现 SVG 动画的例子。假设有一个圆形，当鼠标悬停在圆形上时，圆形会变为红色并且向右移动：

SVG 代码：

```svg
<svg width="200" height="200">
 <circle id="circle" cx="50" cy="50" r="20" fill="blue" />
</svg>
```

CSS 代码：

```css
#circle {
 transition: fill 0.3s ease;
}
```

JavaScript 代码：

```js
const circle = document.getElementById('circle')

circle.addEventListener('mouseover', function () {
  circle.setAttribute('fill', 'red')
  circle.setAttribute('cx', '70')
})
```

上面的代码中，通过给圆形添加 mouseover 事件监听器，当鼠标悬停在圆形上时，修改圆形的 fill 属性为红色，并将圆心的 x 坐标改为 70。由于圆形在 CSS 中定义了过渡效果，因此圆形会平滑地变为红色并向右移动。

## 228 单线程的 nodejs 是如何充分利用计算机 CPU 资源的呢？

* created_at: 2023-03-29T15:06:05Z
* updated_at: 2023-03-29T15:06:06Z
* labels: Nodejs
* milestone: 中

虽然 Node.js 是单线程的，但是它能够充分利用计算机的 CPU 资源的原因在于其采用了事件驱动和异步 I/O 的方式来处理请求，而不是采用阻塞式 I/O 的方式。这使得 Node.js 能够在处理一个请求时不会因为等待 I/O 操作而阻塞，从而可以处理更多的请求。

具体来说，当 Node.js 启动一个程序时，会创建一个事件循环，不断地从事件队列中取出一个事件，然后调用相应的回调函数来处理该事件。当有新的请求到来时，Node.js 会将其添加到事件队列中，等待事件循环处理。同时，Node.js 还采用了非阻塞式 I/O 的方式，即在等待 I/O 操作时不会阻塞其他代码的执行，从而能够更好地利用 CPU 资源。

此外，Node.js 还采用了基于事件的回调机制来处理异步请求，这种机制可以避免线程切换和上下文切换带来的开销，提高 CPU 利用率。因此，虽然 Node.js 是单线程的，但是它能够充分利用计算机 CPU 资源，处理更多的请求。

## 231 不用使用 vue-cli ，如何创建一个完整的 vue 工程？

* created_at: 2023-03-29T15:13:13Z
* updated_at: 2023-03-29T15:13:14Z
* labels: 工程化
* milestone: 资深

这个一个较为复杂和庞大的话题， 不能称之为问题， 只能说它是一个话题。

主要涉及到的话题如下：

1. vue 工程初始化
2. 测试集成
3. UI 库绑定、基础组件使用
4. 开发流程
5. 代码规范（甚至包含 commit 规范）
6. 多人协作与工作流
7. 构建问题
8. 上线流程
9. 线上日志与用户反馈问题排查
10. 性能保证

## 232 使用同一个链接， 如何实现 PC 打开是 web 应用、手机打开是一个 H5 应用？

* created_at: 2023-03-29T15:15:05Z
* updated_at: 2023-03-29T15:15:06Z
* labels: web应用场景, 小米
* milestone: 资深

可以通过根据请求来源（User-Agent）来判断访问设备的类型，然后在服务器端进行适配。例如，可以在服务器端使用 Node.js 的 Express 框架，在路由中对不同的 User-Agent 进行判断，返回不同的页面或数据。具体实现可以参考以下步骤：

1. 根据 User-Agent 判断访问设备的类型，例如判断是否为移动设备。可以使用第三方库如 ua-parser-js 进行 User-Agent 的解析。

2. 如果是移动设备，可以返回一个 H5 页面或接口数据。

3. 如果是 PC 设备，可以返回一个 web 应用页面或接口数据。

具体实现方式还取决于应用的具体场景和需求，以上只是一个大致的思路。

## 235 [webpack] 什么情况下 webpack treeShaking 会失效？

* created_at: 2023-03-29T15:34:25Z
* updated_at: 2023-03-29T15:34:26Z
* labels: 工程化, 小米
* milestone: 高

 以下是一些可能导致 webpack tree shaking 失效的情况

1. 代码中使用了动态引入（Dynamic Imports）的语法，这种情况下，webpack 无法确定哪些代码会被使用，因此不会进行 tree shaking。

2. 代码使用了函数式编程的方式，比如使用了 map、filter、reduce 等高阶函数，而这些函数很难通过静态分析确定代码的执行路径，所以可能会导致 tree shaking 失效。

3. 代码中使用了 webpack 无法识别的模块系统，比如使用了 AMD 或者 CommonJS 的语法，这种情况下 webpack 也无法进行 tree shaking。

4. 代码使用了 side effect，比如改变全局变量或者函数的参数，这种情况下 webpack 也无法进行 tree shaking。

 函数式编程的方式 filter 为何会导致无法 tree shaking

函数式编程中常常使用高阶函数来组合函数，这种组合方式常常需要使用传递函数作为参数的方式，例如 map、filter 等高阶函数。这种情况下，如果参数传递的是一个函数表达式或者函数声明，那么无法进行 treeshaking。

举个例子：

```js
// 代码中定义了一个 sum 函数
// 调用了 lodash 库的 filter 函数，传递一个匿名函数表达式作为参数
import { filter } from 'lodash'

function sum (a, b) {
  return a + b
}

const arr = [1, 2, 3, 4, 5]
const result = filter(arr, item => {
  if (item > 10) return sum(item, 1)
  else return item
})
```

上述代码中，使用了 lodash 库的 filter 函数，并且传递了一个匿名函数表达式作为参数。由于函数表达式无法被静态分析，不知道 sum 是否会被调用，因此无法进行 treeshaking，最终导致整个 sum 函数也被打包进了最终的代码中。

 为什么 commonjs 模块化会导致无法 tree shaking

CommonJS 模块化语法是 Node.js 中的模块化规范，其使用了 `require()` 导入模块，使用 `module.exports` 或 `exports` 导出模块。它采用的是动态导入（require()）和同步加载的方式，这种导入方式无法在编译时确定所依赖的模块，因此在 Webpack 进行 Tree Shaking 时，这种导入方式的模块会被认为无法被静态分析，因而会被排除掉。

相反，ES6 模块化语法采用的是静态导入的方式，例如 `import foo from './foo.js'`，可以在编译时分析出所依赖的模块，因此支持 Tree Shaking。

因此，如果要使用 Tree Shaking，建议采用 ES6 模块化语法。如果必须使用 CommonJS 模块化规范，可以尝试使用动态导入`（import()）`语法，或者采用其他工具或手动实现 Tree Shaking。

 side effect 是什么，为何会导致无法 tree shaking

在编写 JavaScript 代码时，如果一个函数除了返回值外，还对外部的变量产生了其他的影响，比如修改了全局变量、读写了文件等操作，那么这个函数就被称为有“副作用”（side effect）。因为这种函数并不是纯函数，它可能会影响其他部分的代码执行结果，不便于优化和调试。

在 Tree Shaking 的过程中，webpack 将模块打包成单独的 JavaScript 文件，它会从模块中找出哪些代码没有被使用到，并删除这些代码。但是，如果模块中存在带有副作用的代码，这些代码虽然没有被使用到，但它们仍然会被保留下来，因为这些代码可能会对其他部分的代码产生影响，因此不能简单地删除。这也是为什么带有副作用的代码会导致无法 Tree Shaking 的原因。

## 236 babel 的工作流程是如何的？

* created_at: 2023-03-29T15:37:34Z
* updated_at: 2023-03-29T15:37:35Z
* labels: 工程化
* milestone: 高

Babel 是一个 JavaScript 编译器，它的主要功能是将新版本的 JavaScript 代码转换成向后兼容的代码。Babel 的工作流程可以简单概括为以下几个步骤：

1. 解析：将 JavaScript 代码解析成 AST（抽象语法树）。

2. 转换：对 AST 进行遍历，进行代码转换。

3. 生成：将转换后的 AST 生成 JavaScript 代码。

具体来说，Babel 的工作流程如下：

1. Babel 使用 babylon 解析器将 JavaScript 代码解析成 AST，babylon 是一个基于 AST 的 JavaScript 解析器。

2. Babel 使用 babel-traverse 遍历器对 AST 进行遍历，找到需要转换的节点，进行转换。

3. Babel 使用 babel-core 转换器将 AST 转换成 JavaScript 代码。babel-core 是 babel 的核心模块，它包含了所有的转换器和插件。

4. Babel 使用 babel-generator 生成器将转换后的 AST 生成 JavaScript 代码。babel-generator 是一个将 AST 转换成 JavaScript 代码的工具。

在整个流程中，Babel 还会使用 babel-preset-env、babel-plugin-transform-runtime、babel-polyfill 等插件和工具来完成更加复杂的任务，如将 ES6 模块转换成 CommonJS 模块，使用 Polyfill 来实现一些新的 API 等。

需要注意的是，Babel 的转换过程是有损的，转换后的代码不一定与原始代码完全相同，也可能存在性能问题。因此，在使用 Babel 进行转换时，需要谨慎选择转换的规则和插件，以确保转换后的代码正确、高效。

## 237 canvas 与 svg 在可视化领域优劣如何

* created_at: 2023-03-29T15:42:42Z
* updated_at: 2023-10-11T03:08:31Z
* labels: web应用场景, 腾讯
* milestone: 高

SVG、Canvas和WebGL在可视化方向各有优劣，具体如下：

**SVG（Scalable Vector Graphics）：**

* 优势：

1. 矢量图形：SVG 使用矢量图形描述，图形会根据缩放和放大而保持清晰，适用于需要无损放大的情况。
2. 文本处理：SVG 对于文本处理较好，可以方便地添加和编辑文本。
3. 简单图形绘制：SVG 支持直接绘制基本图形，如矩形、圆形、线条等，方便快速绘制简单图表。

* 劣势：

1. 复杂图形处理：当图形复杂度较高时，SVG 的性能会受到影响，特别是在处理大量数据时。
2. 动画效果：SVG 的动画效果相对较弱，复杂的动画效果可能导致性能下降。

**Canvas：**

* 优势：

1. 像素级控制：Canvas 提供了像素级别的控制，可以绘制复杂的图形和图表。
2. 性能较好：Canvas 可以通过 JavaScript 直接操作像素，适用于处理大量数据和复杂图形的场景。
3. 动画效果：Canvas 可以通过 JavaScript 控制每一帧的绘制，实现复杂的动画效果。

* 劣势：

1. 缩放和放大：Canvas 绘制的图形是像素级别的，当需要缩放和放大时会导致图形模糊。
2. 文本处理：相对于 SVG，Canvas 对于文本处理较为复杂，需要手动进行字体设置和绘制。

**WebGL（Web Graphics Library）：**

* 优势：

1. 3D 图形渲染：WebGL 可以进行硬件加速的 3D 图形渲染，适用于创建复杂的 3D 场景和效果。
2. 性能优异：WebGL 可以充分利用 GPU 的并行计算能力，具有较好的性能表现。

* 劣势：

1. 学习成本高：WebGL 使用 OpenGL ES 的接口，对于开发者要求一定的图形学和计算机图形学的知识。
2. 兼容性问题：WebGL 需要浏览器支持，并且在某些设备和浏览器上可能存在兼容性问题。

综上所述，选择适合的技术取决于具体的需求，如图形复杂性、数据量大小、动画效果的需求、对文本处理的要求等。在实际开发中，也可以结合使用不同的技术来满足不同的需求。

**表格对比**

|特性|Canvas|SVG|
|---|---|---|
|图形质量|像素级别的图形，适合绘制大量复杂动态的图形|矢量图，图形不会失真，适合绘制静态图形|
|图形渲染|快速渲染，适合处理大量图形数据|慢速渲染，适合处理小规模静态图形|
|交互性|事件处理复杂，需要手动编写交互逻辑|事件处理简单，内置事件处理机制|
|动画效果|动画效果需要手动实现，实现复杂动画困难|内置 SMIL 动画支持，可实现较复杂动画效果|
|浏览器支持|除 IE8 及以下版本外，其他浏览器都支持|除 IE9 及以下版本外，其他浏览器都支持|
|适用场景|处理大量动态图形，如游戏开发、数据可视化等|绘制简单静态图形，如图标、线条、文字等|

## 238 如何保证用户的使用体验

* created_at: 2023-03-30T16:47:54Z
* updated_at: 2023-03-30T16:47:55Z
* labels: web应用场景, 腾讯
* milestone: 高

【如何保证用户的使用体验】这个也是一个较为复杂的话题， 这个也不是问题了， 这个算是话题吧；

主要从以下几个方面思考问题：

1. 性能方向的思考

2. 用户线上问题反馈，线上 on call 的思考

3. 用户使用体验的思考， 交互体验使用方向

4. 提升用户能效方向思考

## 239 如何在前端团队快速落地代码规范

* created_at: 2023-03-30T17:10:42Z
* updated_at: 2023-03-31T01:22:24Z
* labels: 工程化, 腾讯
* milestone: 高

// todo 待整理

* [资料](https://juejin.cn/post/7033210664844066853)
* [资料](https://juejin.cn/post/7007419705543622669)
* [资料](https://juejin.cn/post/7167707693333872647)
* [资料](https://juejin.cn/post/6844904142289240071)

## 240 [Redux] 的存储过程

* created_at: 2023-04-02T14:42:37Z
* updated_at: 2023-04-02T14:42:38Z
* labels: web框架, 腾讯
* milestone: 中

Redux 的存储过程可以简单地分为以下几个步骤：

1. Action Creator 函数被调用，生成一个 Action 对象；
2. Action 对象被传递给 Store.dispatch() 方法；
3. Redux Store 调用 Reducer 函数，将当前的 State 和 Action 作为参数传入；
4. Reducer 函数根据 Action 的类型，生成一个新的 State；
5. Redux Store 将新的 State 存储下来，用于下一次的状态更新；
6. 组件通过调用 Store.subscribe() 方法，监听 Store 中 State 的变化；
7. 当 State 发生变化时，Store 会通知所有的订阅者，订阅者会重新渲染相应的组件。

这个过程可以简单地描述为：Action -> Reducer -> Store -> View。其中，Action 是一个纯对象，它描述了发生的事件；Reducer 是一个纯函数，它接收当前的 State 和 Action，返回一个新的 State；Store 是将 Action 和 Reducer 结合起来的对象，它维护了应用程序的 State；View 则是 React 组件，它通过 Store.subscribe() 方法监听 State 的变化，根据 State 的变化重新渲染页面。

## 241 [Redux] 简单实现一下核心源码

* created_at: 2023-04-02T14:46:40Z
* updated_at: 2023-04-02T15:04:35Z
* labels: web框架, 腾讯
* milestone: 高

实现 Redux 的源码主要包括以下几个步骤：

1. 实现 createStore 函数，创建 store 对象，该函数接收一个 reducer 函数作为参数，返回一个对象。
2. 在 createStore 函数内部，定义一个 state 变量来存储当前的状态值，定义一个 listeners 数组来存储所有的监听函数。
3. 实现 getState 方法，返回当前的状态值。
4. 实现 dispatch 方法，接收一个 action 对象作为参数，将当前的状态值和 action 对象传给 reducer 函数，更新状态值。然后遍历 listeners 数组，调用所有的监听函数。
5. 实现 subscribe 方法，接收一个监听函数作为参数，将该函数添加到 listeners 数组中，以便在状态更新时调用。
6. 实现 combineReducers 函数，将多个 reducer 函数合并成一个 reducer 函数。
7. 在 createStore 函数内部，将传入的 reducer 函数或者合并后的 reducer 函数赋值给一个内部的 currentReducer 变量。
8. 在 dispatch 方法内部，将 currentReducer 赋值给一个局部变量，以保证在 reducer 函数中调用 dispatch 方法时可以获取到最新的 reducer 函数。

下面是代码实现：

```javascript
// 实现 createStore 函数
function createStore (reducer) {
  let state
  const listeners = []

  function getState () {
    return state
  }

  function dispatch (action) {
    state = reducer(state, action)
    for (let i = 0; i < listeners.length; i++) {
      listeners[i]()
    }
  }

  function subscribe (listener) {
    listeners.push(listener)
  }

  dispatch({})

  return {
    getState,
    dispatch,
    subscribe
  }
}

// 实现 combineReducers 函数
function combineReducers (reducers) {
  return function (state = {}, action) {
    const nextState = {}
    for (const key in reducers) {
      nextState[key] = reducers[key](state[key], action)
    }
    return nextState
  }
}
```

在使用时，可以先定义 reducer 函数：

```javascript
function todos (state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ]
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      )
    default:
      return state
  }
}

function visibilityFilter (state = 'SHOW_ALL', action) {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}
```

然后将它们传入 combineReducers 函数，创建一个 reducer 函数：

```javascript
const reducer = combineReducers({
  todos,
  visibilityFilter
})
```

最后调用 createStore 函数，创建一个 store 对象：

```javascript
const store = createStore(reducer)
```

现在就可以使用 store 对象来获取状态值、派发 action、监听状态变化了。

可以参考文档: [资料](https://juejin.cn/post/6844903785689546760)

## 242 [Redux] react-redux 是如何更新到 UI 的, 写一下这部分的核心源码

* created_at: 2023-04-02T14:58:02Z
* updated_at: 2023-04-02T14:58:03Z
* labels: web框架, 腾讯
* milestone: 资深

 react-redux 和 redux 的关系

Redux 和 React-Redux 是两个独立的库，但它们通常一起使用，因为 Redux 库本身并不针对 React，而是一个通用的状态管理库，而 React-Redux 则是一个用于将 Redux 集成到 React 应用程序中的库。

React-Redux 提供了一组 React 组件和钩子，使得在 React 应用程序中使用 Redux 变得更加容易。它提供了一个 `Provider` 组件，可以将 Redux store 注入到整个 React 应用程序中，并且可以使用 `connect` 函数将组件连接到 Redux store，使它们可以访问和修改 store 中的数据。

使用 React-Redux，我们可以将 Redux 的状态管理能力与 React 的组件化能力结合起来，使得应用程序的状态可以很方便地被管理和共享，并且组件也可以方便地访问和修改应用程序的状态。

 react-redux 是如何集成到 UI 的？

`react-redux` 提供了两个主要的组件 `Provider` 和 `connect`，它们用于将 Redux 状态管理与 React 组件相结合。

首先，使用 `Provider` 组件将 Redux store 传递给整个应用程序。可以将 `<Provider>` 组件作为最高层的组件，这样在应用程序中的所有组件中都可以访问到 Redux store。

下一步，使用 `connect` 函数连接 Redux store 和组件。`connect` 函数是一个高阶函数，它接收两个参数：`mapStateToProps` 和 `mapDispatchToProps`，并返回另一个函数，这个函数接受一个组件作为参数，并返回一个增强版的组件。

`mapStateToProps` 函数用于从 Redux store 中获取需要的 state 数据，并将其映射到组件的 props 上。`mapDispatchToProps` 函数用于将 action creator 映射到组件的 props 上，这样组件就可以直接调用 action creator 发起 action，而不需要手动分发 dispatch。

使用 `connect` 函数生成的增强版组件可以访问到 Redux store 中的 state 和 dispatch，并将它们作为 props 传递给原始组件。在组件中，可以直接使用这些 props 来获取和更新 state，以及发起 action。当组件中的 state 或 props 发生变化时，`connect` 函数会自动更新组件，以反映最新的 state 和 props。

通过这种方式，`react-redux` 让我们可以在 React 组件中使用 Redux 进行状态管理，实现了 Redux 和 React 的无缝集成。

 简单写一下更新 UI 核心代码实现

react-redux 是基于 React 和 Redux 的，主要用于将 Redux 的状态管理功能集成到 React 应用程序中。它主要包括两个部分：Provider 和 connect。

Provider 组件是 react-redux 的核心，它将 Redux 的 store 作为 props 传递给 React 组件，并通过 React 的上下文（Context）使得后代组件能够访问到 store。

connect 函数用于连接 React 组件与 Redux store，返回一个新的组件。该函数的主要作用是在组件中提供 mapStateToProps 和 mapDispatchToProps 函数，从而使组件能够从 Redux store 中读取数据，并向 store 分发 action。

下面是一个简单的实现，用于说明 react-redux 是如何集成到 UI 的：

```javascript
// Provider.js
import React from 'react';
import PropTypes from 'prop-types';

export const StoreContext = React.createContext();

export default function Provider(props) {
 const { store, children } = props;
 return (
 <StoreContext.Provider value={store}>
 {children}
 </StoreContext.Provider>
 );
}

Provider.propTypes = {
 store: PropTypes.object.isRequired,
 children: PropTypes.any,
};

// connect.js
import React from 'react';
import PropTypes from 'prop-types';
import { StoreContext } from './Provider';

export default function connect(mapStateToProps, mapDispatchToProps) {
 return function wrapWithConnect(WrappedComponent) {
 class Connect extends React.Component {
 componentDidMount() {
 const { store } = this.context;
 this.unsubscribe = store.subscribe(this.handleChange.bind(this));
 }

 componentWillUnmount() {
 this.unsubscribe();
 }

 handleChange() {
 this.forceUpdate();
 }

 render() {
 const { store } = this.context;
 const props = {
 ...this.props,
 ...mapStateToProps(store.getState(), this.props),
 ...mapDispatchToProps(store.dispatch, this.props),
 };
 return <WrappedComponent {...props} />;
 }
 }

 Connect.contextType = StoreContext;
 Connect.propTypes = {
 store: PropTypes.object,
 };
 Connect.displayName = `Connect(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

 return Connect;
 };
}
```

这里的 Provider 组件用于将 Redux 的 store 传递给 React 组件：

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import rootReducer from './reducers'

const store = createStore(rootReducer)

ReactDOM.render(
 <Provider store={store}>
 <App />
 </Provider>,
 document.getElementById('root')
)
```

而 connect 函数用于将 React 组件连接到 Redux store：

```javascript
import React from 'react'
import { connect } from 'react-redux'
import { increment } from './actions'

function Counter (props) {
  const { count, increment } = props
  return (
 <div>
 <p>Count: {count}</p>
 <button onClick={() => increment()}>+</button>
 </div>
  )
}

const mapStateToProps = state => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increment: () => dispatch(increment())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
```

## 243 [webpack] webpack 是如何给 web 应用注入环境变量的， 原理是啥

* created_at: 2023-04-02T15:11:38Z
* updated_at: 2023-04-02T15:11:39Z
* labels: 工程化, 百度
* milestone: 高

Webpack 可以通过 DefinePlugin 插件给 web 应用注入环境变量。该插件会在编译过程中替换掉代码中指定的变量，以实现在运行时替换成环境变量的值。

在 webpack 的配置文件中，需要先引入该插件，然后将需要注入的环境变量通过该插件进行配置。例如：

```javascript
const webpack = require('webpack')

module.exports = {
  // 其他配置
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      },
      API_URL: JSON.stringify('http://api.example.com')
    })
  ]
}
```

上述配置中，定义了两个需要注入的变量，分别是 `process.env.NODE_ENV` 和 `API_URL`。其中，`process.env.NODE_ENV` 是一个常用的环境变量，用来标识当前是开发环境还是生产环境；`API_URL` 是一个自定义的环境变量，用来存储 API 的地址。

在代码中使用这些环境变量时，只需要直接引用即可：

```javascript
if (process.env.NODE_ENV === 'production') {
  console.log('当前为生产环境')
}

fetch(API_URL + '/users')
  .then(response => response.json())
  .then(data => console.log(data))
```

Webpack 在编译时会将这些变量替换成对应的值，例如：

```javascript
if ('production' === 'production') {
  console.log('当前为生产环境')
}

fetch('http://api.example.com' + '/users')
  .then(response => response.json())
  .then(data => console.log(data))
```

通过这种方式，我们就可以在代码中方便地使用环境变量，同时保证了在不同环境下都能正确地使用相应的变量值。

## 245 react 中是如何实现 下拉菜单场景， 点击区域外关闭下拉组件？

* created_at: 2023-04-02T15:32:52Z
* updated_at: 2023-09-15T06:29:39Z
* labels: web应用场景, 百度
* milestone: 中

在 React 中，要实现点击区域外关闭下拉组件，一般可以使用以下几种方法：

1. 在下拉组件的根元素上监听点击事件，当点击区域不在下拉组件内时，触发关闭下拉组件的操作。这可以通过添加全局点击事件，然后在事件处理程序中判断点击区域是否在下拉组件内来实现。具体实现如下：

```jsx
import React, { useRef, useEffect } from 'react';

function DropdownMenu(props) {
 const menuRef = useRef(null);

 useEffect(() => {
 function handleClickOutside(event) {
 if (menuRef.current && !menuRef.current.contains(event.target)) {
 props.onClose();
 }
 }

 document.addEventListener('click', handleClickOutside);
 return () => {
 document.removeEventListener('click', handleClickOutside);
 };
 }, [props]);

 return (
 <div ref={menuRef}>
 {/* 下拉菜单内容 */}
 </div>
 );
}
```

2. 在下拉组件的父元素上监听点击事件，当点击区域不在下拉组件及其父元素内时，触发关闭下拉组件的操作。具体实现如下：

```jsx
import React, { useState } from 'react';

function Dropdown(props) {
 const [isOpen, setIsOpen] = useState(false);

 function toggleDropdown() {
 setIsOpen(!isOpen);
 }

 function handleClickOutside(event) {
 if (!event.target.closest('.dropdown')) {
 setIsOpen(false);
 }
 }

 return (
 <div className="dropdown" onClick={handleClickOutside}>
 <button onClick={toggleDropdown}>Toggle Dropdown</button>
 {isOpen && <DropdownMenu onClose={() => setIsOpen(false)} />}
 </div>
 );
}
```

在上述代码中，我们在 `Dropdown` 组件的根元素上添加了点击事件处理程序 `handleClickOutside`，当点击区域不在 `.dropdown` 元素内时，触发关闭下拉组件的操作。由于 `DropdownMenu` 组件位于 `Dropdown` 组件内部，因此当点击下拉菜单时，事件会冒泡到 `Dropdown` 组件，从而不会触发关闭操作。

3. 除了上述方法外，还可以使用 `useRef` 钩子来监听鼠标点击事件。具体实现可以在下拉组件的根元素上使用 `ref` 属性来获取 DOM 元素的引用，然后在组件挂载时使用 `addEventListener` 方法绑定 `mousedown` 事件，最后在事件处理函数中判断鼠标点击的位置是否在下拉组件内，如果不在，则关闭下拉组件。

示例代码如下：

```jsx
import { useRef, useState, useEffect } from 'react';

function Dropdown() {
 const [isOpen, setIsOpen] = useState(false);
 const dropdownRef = useRef(null);

 useEffect(() => {
 function handleClickOutside(event) {
 if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
 setIsOpen(false);
 }
 }

 document.addEventListener('mousedown', handleClickOutside);
 return () => {
 document.removeEventListener('mousedown', handleClickOutside);
 };
 }, [dropdownRef]);

 return (
 <div ref={dropdownRef}>
 <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>
 {isOpen && (
 <ul>
 <li>Option 1</li>
 <li>Option 2</li>
 <li>Option 3</li>
 </ul>
 )}
 </div>
 );
}
```

这种方法可以在组件内部处理点击事件，不需要将事件处理函数传递给父组件。但是相对而言代码会比较繁琐，需要手动处理事件绑定和解绑。

## 246 [webpack] loader 和 plugin 有啥区别

* created_at: 2023-04-03T00:55:06Z
* updated_at: 2023-04-03T00:55:06Z
* labels: 工程化, 阿里巴巴
* milestone: 中

在Webpack中，Loader和Plugin是两个不同的概念，它们的作用和使用方式也有所不同。

Loader用于对源代码文件进行转换和处理，而Plugin用于对Webpack的编译过程进行扩展和增强。

* **Loader**

Loader是Webpack中的一个核心概念，它用于处理源代码文件，将它们转换成Webpack可处理的模块。Webpack在处理代码模块的过程中，会根据模块的类型来选择相应的Loader进行处理，例如，处理CSS文件需要使用css-loader，处理图片需要使用file-loader等。使用Loader可以实现代码转换、文件处理、代码压缩等功能。

Loader的使用方式是在Webpack的配置文件中定义module.rules属性，它是一个数组，每个元素是一个对象，用于描述如何处理特定类型的文件。一个Loader对象通常包括以下几个属性：

* test：用于匹配需要处理的文件类型，通常是一个正则表达式。
* use：指定需要使用的Loader，可以是一个字符串或一个数组，数组中的每个元素都是一个Loader。
* exclude/include：指定需要排除/包含的文件夹。

例如，处理CSS文件需要使用css-loader和style-loader，可以在Webpack配置文件中添加如下配置：

```javascript
{
  [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}
```

* **Plugin**

Plugin是Webpack中的另一个核心概念，它用于扩展Webpack的功能。Plugin可以用于执行任意类型的任务，例如，生成HTML文件、压缩代码、提取公共代码等。使用Plugin可以实现Webpack无法处理的复杂任务。

Plugin的使用方式是在Webpack的配置文件中定义plugins属性，它是一个数组，每个元素是一个Plugin实例。Plugin通常包括以下几个方法：

* apply：用于安装插件，接收一个compiler对象作为参数。
* 一些Webpack钩子函数的实现。

例如，生成HTML文件需要使用HtmlWebpackPlugin，可以在Webpack配置文件中添加如下配置：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My App',
      template: './src/index.html'
    })
  ]
}
```

**表格对比他们之间的差异和适用范围**

|区别|Loader|Plugin|
|---|---|---|
|输入/输出|输入文件，输出处理后的文件|可以在Webpack构建过程中处理输出结果或做额外处理|
|使用方式|在模块加载时直接调用|在Webpack配置中进行配置|
|功能|用于处理某些类型的文件|可以处理打包过程的各个环节|
|实现方式|导出一个函数|导出一个类|
|配置方式|在Webpack配置中使用|在Webpack配置中使用|
|作用|转换文件或模块|对整个构建过程进行自定义操作|
|适用场景|处理各种类型的文件，如css、图片等|执行比较复杂的操作，如代码压缩、代码分割等|
|使用方式|需要在Webpack中明确的指定|无法单独使用，必须在Webpack中明确的指定使用|
|作用对象|针对每一个文件进行处理|针对整个构建过程进行处理|

总体而言，Loader主要用于针对单个文件进行处理，可以根据不同文件类型来选择对应的Loader；Plugin则是针对整个构建过程进行自定义操作，比如代码压缩、分离CSS文件、创建HTML文件等。

## 247 [webpack] 是如何实现 treeShaking 的

* created_at: 2023-04-03T01:10:58Z
* updated_at: 2023-04-03T01:10:59Z
* labels: 工程化, 阿里巴巴
* milestone: 中

webpack实现tree shaking的原理是基于ES6模块化语法的静态特性。

在编译阶段，Webpack会根据模块的依赖关系，通过AST（抽象语法树）进行静态分析，识别出那些代码块（函数、变量、对象等）被引用并且使用了。然后将这些代码块打包输出到最终的打包文件中。在这个过程中，Webpack会自动将未被引用的代码块进行剔除，这个过程就是tree shaking。

具体来说，当Webpack在打包时遇到一个ES6模块导入语句（import），它会自动去加载这个模块并分析其导出对象。然后它会分析项目中哪些导出对象被引用了。如果一个导出对象没有被引用，那么Webpack会直接把它从最终的代码中剔除掉。

需要注意的是，tree shaking只对ES6模块生效，对于CommonJS等其他模块化规范，由于其动态加载特性，无法在静态分析阶段确定哪些代码块被引用，因此无法进行tree shaking。

另外，为了使Webpack能够正确识别和剔除未引用的代码块，开发者也需要做出一定的努力，例如将代码编写为纯函数的形式，避免使用全局变量等副作用等。

具体哪些会导致 tree shaking 失效，可以看这个文章：[资料](https://github.com/pro-collection/interview-question/issues/235)

## 249 [webpack] 如果解决重复引用 node_modules 里面的不同版本的包(包重复问题)

* created_at: 2023-04-03T01:18:02Z
* updated_at: 2023-04-26T15:20:48Z
* labels: 工程化, 美团
* milestone: 高

解决重复引用 `node_modules` 中不同版本的包的问题，可以通过以下几种方式：

**1.使用 npm 或者 yarn 的工具进行依赖的版本控制，尽量避免引用不同版本的同一个依赖库**。在 package.json 文件中使用 "^"、"~"、">=" 等方式指定依赖版本，可以有效减少不同版本的包冲突问题。

**2.使用 webpack 的 resolve.alias 配置选项**，将需要共享的模块指定到一个目录下，然后在其它模块中使用别名引用该模块。例如，将需要共享的模块指定到 src/shared 目录下，然后在其它模块中使用别名 @shared 引用该模块，这样就可以保证在不同模块中引用相同的依赖库。
假设我们在项目中同时依赖了两个库：`lodash` 和 `lodash-es`，并且它们分别被安装在了不同的目录下，如下所示：

```
Copy codenode_modules/
├── lodash/
└── lodash-es/
```

我们需要在项目中同时引用这两个库，但是如果我们在代码中分别使用 `import _ from 'lodash'` 和 `import _ from 'lodash-es'`，那么 webpack 会将它们打包成两个独立的模块，导致代码体积变大。

为了解决这个问题，我们可以通过 `resolve.alias` 配置项将它们指向同一个模块。具体做法是在 webpack 配置文件中添加以下内容：

```js
module.exports = {
  // ...
  resolve: {
    alias: {
      'lodash-es': 'lodash'
    }
  }
}
```

这样一来，当我们在代码中使用 `import _ from 'lodash-es'` 时，webpack 会自动将它解析成对 `lodash` 的引用，从而避免了重复打包的问题。

**3.使用 webpack 的 ProvidePlugin 插件**，将需要共享的模块注入到全局作用域中，这样就可以在不同模块中共享相同的依赖库。例如，在 webpack 配置文件中添加以下代码：

```javascript
const webpack = require('webpack')

module.exports = {
  // ...
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}
```

这样在不同模块中就可以使用 $、jQuery、window.jQuery 全局变量引用 jquery 依赖库，避免了重复引用不同版本的 jquery 包的问题。

**4.使用 webpack 的 resolve.modules 配置选项**，将 node\_modules 目录移动到项目根目录之外，然后在 resolve.modules 中添加该目录的绝对路径，这样就可以解决不同模块中引用相同依赖库不同版本的问题。例如，在 webpack 配置文件中添加以下代码：

```javascript
const path = require('path')

module.exports = {
  // ...
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ]
  }
}
```

这样 webpack 在查找依赖库的时候，会先在项目根目录下的 src 目录中查找，如果没有找到再去 node\_modules 目录中查找，避免了不同模块中引用相同依赖库不同版本的问题。

## 250 如何解决页面请求接口大规模并发问题

* created_at: 2023-04-03T01:31:39Z
* updated_at: 2023-04-03T01:31:40Z
* labels: web应用场景, 美团
* milestone: 高

如何解决页面请求接口大规模并发问题， 不仅仅是包含了接口并发， 还有前端资源下载的请求并发。

应该说这是一个话题讨论了；

**个人认为可以从以下几个方面来考虑如何解决这个并发问题:**

1. 后端优化：可以对接口进行优化，采用缓存技术，对数据进行预处理，减少数据库操作等。使用集群技术，将请求分散到不同的服务器上，提高并发量。另外可以使用反向代理、负载均衡等技术，分担服务器压力。

2. 做 BFF 聚合：把所有首屏需要依赖的接口， 利用服务中间层给聚合为一个接口。

3. CDN加速：使用CDN缓存技术可以有效减少服务器请求压力，提高网站访问速度。CDN缓存可以将接口的数据存储在缓存服务器中，减少对原始服务器的访问，加速数据传输速度。

4. 使用 WebSocket：使用 WebSocket 可以建立一个持久的连接，避免反复连接请求。WebSocket 可以实现双向通信，大幅降低服务器响应时间。

5. 使用 HTTP2 及其以上版本， 使用多路复用。

6. 使用浏览器缓存技术：强缓存、协商缓存、离线缓存、Service Worker 缓存 等方向。

7. 聚合一定量的静态资源： 比如提取页面公用复用部分代码打包到一个文件里面、对图片进行雪碧图处理， 多个图片只下载一个图片。

8. 采用微前端工程架构： 只是对当前访问页面的静态资源进行下载， 而不是下载整站静态资源。

9. 使用服务端渲染技术： 从服务端把页面首屏直接渲染好返回， 就可以避免掉首屏需要的数据再做额外加载和执行。

## 252 设计一套全站请求耗时统计工具

* created_at: 2023-04-03T01:44:12Z
* updated_at: 2023-04-03T15:32:35Z
* labels: web应用场景, 阿里巴巴
* milestone: 高

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

## 253 如果用户说 web 应用感觉很反应慢或者卡顿，该如何排查？

* created_at: 2023-04-05T13:23:29Z
* updated_at: 2023-09-09T06:18:59Z
* labels: 工程化
* milestone: 高

 如果用户觉得 web 应用反应卡顿， 主要从哪几个方面来排查？

* 加载慢
* 资源下载慢
* 首屏并发请求资源过多
* 首屏接口慢
* 首屏对应的 JS 执行慢
* 首屏渲染慢
* 首屏加载静态资源过大
* .......
* 执行过程慢
* 接口慢
* long tasks 太多, 阻塞 JS 执行
* 内存泄漏
* 重绘重排 过多
* 关键节点没有加 节流防抖
* .......

 主要排查手段有哪些

* **通过建立性能监控指标**: 通过真实用户数据反馈， 来判断用户是否卡顿， 包含网络监控、运行时性能监控

* **Chrome devtools: NetWork** 主要排查网络问题
*

 <img width="1469" alt="image" src="https://user-images.githubusercontent.com/22188674/229800903-409009dd-105a-49e2-a7c4-4ed54c92210e.png"/>

* **Chrome devtools: Performance** 主要细查性能运行时性能，包含了 long tasks、render 次数、重排重绘、执行时间线、阻塞场景

<img width="973" alt="image" src="https://user-images.githubusercontent.com/22188674/229800739-3b8099bb-1aca-423a-a2d7-12c151becd47.png"/>
* **Chrome devtools: Performance monitor** 主要监控用户运行时性能，看看是否有内存泄露
  
 <img width="597" alt="image" src="https://user-images.githubusercontent.com/22188674/229800314-4d1ae73a-50a2-47b0-bbf4-57d5ece7d4b7.png"/>

* **React Developer Tools**: 可以用于追踪 react 应用性能、渲染次数、重排重绘
![image](https://user-images.githubusercontent.com/22188674/229801498-3cc4fc25-64a5-4b9e-ace8-5ed7b96e4ac2.png)

* **Lighthouse**: 全面分析网页性能的一个工具、支持浏览器插件
![image](https://user-images.githubusercontent.com/22188674/229803209-505d01da-d780-4a3e-abe7-e56cd942a64b.png)

* **webpack-bundle-analyzer**: 进行产物依赖分析、包大小分析

* **抓包**: 通过抓包的方式， 看看线上请求分析、请求模拟、网络劫持之后仅仅看 JS 执行时间

* **E2E测试**: 通过 E2E 进行性能预检， 每次上线前进行一系列系统操作， 看看时间耗时和线上耗时波动

 主要解决办法和思路

**首屏加载慢的方向**

* 资源加载方向
* 使用 `tree shaking` 减少包体积
* 代码压缩和混淆
* 对于高版本浏览器， 直接使用 ES6 语法，低版本浏览器再使用 ES5（es6 语法代码量会比编译成 es5 代码量小很多， 且执行速度也快）
* 使用 `split chunks` 进行大包拆分、小包复用
* 使用 `gzip`
* 使用 图片压缩
* 使用 雪碧图
* 图标使用 `iconfont` 加载
* 懒加载， 仅加载首屏必要资源
* 使用 `tailwindcss` 等技术， 复用 css
* 使用 `微前端` 技术，首屏仅加载当前子应用页面，可以做到只加载整站很少的一部分代码
* 首屏非必要依赖尽量延后到 FMP 或者 TTI 之后再加载
* 组件微前端化

* 渲染方向
* 尽量减少重排重绘
* 减少重复渲染（useMemo、useCallback、memo 等）
* 减少 setState 次数（多次 setState 可以合并为一次）
* 尽量减少 dom 节点深度

* 网络方向
* 使用流式服务端渲染， 可以查看文档：[资料](https://juejin.cn/post/6953819275941380109)
* 使用服务端渲染， 减少首屏请求
* 使用 SSG 静态站点生成
* 首屏必要数据， 不作客户端请求， 用后端模板注入
* 使用 BFF 进行请求聚合
* 使用 CDN 进行网络请求分发
* DNS Prefetch
* 资源预加载（在闲暇时间加载后续页面所需要的资源和接口，例如：link rel preload）
* 启用 HTTP2 多路复用
* 在业务逻辑上， 首屏必要接口提前（例如在 html 加载的那一瞬间，利用一个非常小的 js 文件将首屏需要的请求发送出去, 然后缓存下来， 到业务使用的时候直接就使用即可）
* 使用缓存技术缓存资源与请求：强缓存、协商缓存、离线缓存、Service Worker 缓存、后端业务缓存

**运行时卡顿方向**

* 查看是否存在有有 `long tasks`， 有计划的拆解 `long tasks`
* 解决项目中复杂度问题： [资料](https://www.jianshu.com/p/ffbb25380904)
* 排查项目是否有内存泄露
* 排查特定业务流程是否有慢接口
* 高复杂计算逻辑放在 service worker 处理

 参考文档

* [资料](https://juejin.cn/post/7096144248713510943)

* [资料](https://juejin.cn/post/6882936217609732110)
* [资料](https://juejin.cn/post/7119074496610304031)
* [资料](https://juejin.cn/post/7159807927908302884)

## 254 Service Worker 是如何缓存 http 请求资源的？

* created_at: 2023-04-05T13:53:20Z
* updated_at: 2023-04-05T13:53:21Z
* labels: web应用场景, 京东
* milestone: 高

Service Worker 是一种在浏览器后台运行的脚本，可以拦截和处理浏览器网络请求。因此，可以使用 Service Worker 来缓存 http 请求资源。

Service Worker 可以通过以下步骤来缓存 http 请求资源：

1. 注册 Service Worker：通过在页面中注册 Service Worker，可以告诉浏览器使用 Service Worker 来处理网络请求。

2. 安装 Service Worker：一旦 Service Worker 被注册，浏览器就会下载并安装它。在安装过程中，Service Worker 可以缓存一些静态资源（如 HTML、CSS 和 JavaScript 文件）。

3. 激活 Service Worker：一旦 Service Worker 安装成功，它就可以被激活。在激活过程中，Service Worker 可以删除旧版本的缓存，或者执行其他一些操作。

4. 拦截网络请求：一旦 Service Worker 被激活，它就可以拦截浏览器发送的网络请求。

5. 处理网络请求：当 Service Worker 拦截到网络请求时，它可以执行一些自定义的逻辑来处理这些请求。例如，它可以检查缓存中是否已经存在该请求的响应，如果存在，则直接返回缓存中的响应，否则，它可以将请求发送到服务器并缓存服务器的响应。

6. 更新缓存：如果缓存中的资源发生了变化，Service Worker 可以自动更新缓存。例如，它可以在后台下载最新的资源，并更新缓存中的文件。

需要注意的是，使用 Service Worker 来缓存 http 请求资源需要一些额外的工作。例如，**需要编写 Service Worker 脚本来处理请求，并且需要将该脚本注册到浏览器中**。此外，还需要考虑一些缓存策略，以确保缓存的数据与服务器上的数据保持同步。

**下面是一个使用 Service Worker 实现缓存的示例代码：**

```js
// 注册 Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
      console.log('ServiceWorker registration successful with scope: ', registration.scope)
    }, function (err) {
      console.log('ServiceWorker registration failed: ', err)
    })
  })
}

// 安装 Service Worker
self.addEventListener('install', function (event) {
  console.log('ServiceWorker install')
  event.waitUntil(
    caches.open('my-cache').then(function (cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/image.png'
      ])
    })
  )
})

// 激活 Service Worker
self.addEventListener('activate', function (event) {
  console.log('ServiceWorker activate')
})

// 拦截网络请求
self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      if (response) {
        console.log('ServiceWorker fetch from cache:', event.request.url)
        return response
      } else {
        console.log('ServiceWorker fetch from network:', event.request.url)
        return fetch(event.request)
      }
    })
  )
})

// 更新缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('my-cache') &&
 cacheName !== 'my-cache'
        }).map(cacheName => {
          return caches.delete(cacheName)
        })
      )
    })
  )
})
```

当网络请求到来时，会首先在缓存中查找对应的资源，如果有则直接返回缓存中的资源，否则从网络中获取资源并返回。这样就可以实现基本的离线缓存功能。

在这个示例中，当 Service Worker 被安装时，我们打开一个新的缓存并将应用程序的静态资源添加到缓存中。在 fetch 事件中，我们拦截每个网络请求并尝试匹配它们到我们的缓存中，如果匹配到了则返回缓存的响应，否则通过 fetch 方法从网络中获取资源。在 activate 事件中，我们可以更新缓存，删除旧的缓存项并将新的缓存项添加到缓存中。

## 255 Long Tasks 了解多少？

* created_at: 2023-04-05T14:53:11Z
* updated_at: 2023-04-05T14:53:12Z
* labels: 浏览器, 京东
* milestone: 资深

 什么是 Long Tasks

主线程一次只能处理一个任务（任务按照队列执行）。**当任务超过某个确定的点时，准确的说是50毫秒，就会被称为长任务(Long Task)**。当长任务在执行时，如果用户想要尝试与页面交互或者一个重要的渲染更新需要重新发生，那么浏览器会等到Long Task执行完之后，才会处理它们。结果就会导致交互和渲染的延迟

所以从以上信息可以得知，如果存在Long Task，那么对于我们Load（加载时）和Runtime（运行时）的性能都有影响

阻塞主线程达 50 毫秒或以上的任务会导致以下问题：

* 可交互时间 延迟
* 严重不稳定的交互行为 (轻击、单击、滚动、滚轮等) 延迟（High/variable input latency）
* 严重不稳定的事件回调延迟（High/variable event handling latency）
* 紊乱的动画和滚动（Janky animations and scrolling）

任何连续不间断的且主 UI 线程繁忙 50 毫秒及以上的时间区间。比如以下常规场景：

* 长耗时的事件回调（long running event handlers）
* 代价高昂的回流和其他重绘（expensive reflows and other re-renders）
* 浏览器在超过 50 毫秒的事件循环的相邻循环之间所做的工作（work the browser does between different turns of the event loop that exceeds 50 ms）

 任务管理策略

软件架构中有时候会将一个任务拆分成多个函数，这不仅能增强代码可读性，也让项目更容易维护，当然这样也更容易写测试。

```js
function saveSettings () {
  validateForm()
  showSpinner()
  saveToDatabase()
  updateUI()
  sendAnalytics()
}
```

在上面的例子中，该函数saveSettings调用了另外5个函数，包括验证表单、展示加载的动画、发送数据到后端等。理论上讲，这是很合理的架构。如果需调试这些功能，也只需要在项目中查找每个函数即可。
然而，这样也有问题，就是js并不是为每个方法开辟一个单独的任务，因为这些方法都包含在saveSetting这个函数中，**也就是说这五个方法在一个任务中执行**
saveSetting这个函数调用5个函数，这个函数的执行看起来就像一个特别长的长的任务。

 如何解决 Long Tasks

那解决Long Task的方式有如下几种：

* 使用setTimeout分割任务
* 使用async/await分割任务
* isInputPending
* 专门编排优先级的api: Scheduler.postTask()
* 使用 web worker，处理逻辑复杂的计算

 SetTimeout

setTimeout本身就是个Task。假如我们给某个函数加上setTimeout，是不是就可以将某个任务分离出去，成为单独的Task了。
延迟了回调的执行，而且使用该方法，即便是将delay时间设定成0，也是有效的。

```js
function saveSettings () {
  // Do critical work that is user-visible:
  validateForm()
  showSpinner()
  updateUI()

  // Defer work that isn't user-visible to a separate task:
  setTimeout(() => {
    saveToDatabase()
    sendAnalytics()
  }, 0)
}
```

并不是所有场景都能使用这个方法。比如，如需要在循环中处理大数据量的数据，这个任务的耗时可能就会非常长（假设有数百万的数据量）

 使用async、await来创造让步点

分解任务后，按照浏览器内部的优先级别划分，其他的任务可能优先级别调整的会更高。一种让步于主线程的方式是配合用了setTimeout的promise。

```js
function yieldToMain () {
  return new Promise(resolve => {
    setTimeout(resolve, 0)
  })
}
```

在saveSettings的函数中，可以在每次await函数yieldToMain后让步于主线程：

```js
async function saveSettings () {
  // Create an array of functions to run:
  const tasks = [validateForm, showSpinner, saveToDatabase, updateUI, sendAnalytics]

  // Loop over the tasks:
  while (tasks.length > 0) {
    // Shift the first task off the tasks array:
    const task = tasks.shift()

    // Run the task:
    task()

    // Yield to the main thread:
    await yieldToMain()
  }
}
```

 isInputPending

假如有一堆的任务，但是只想在用户交互的时候才让步，该怎么办？正好有这种api--`isInputPending`

isInputPending这个函数可以在任何时候调用，它能判断用户是否要与页面元素进行交互。调用isInputPending会返回布尔值，true代表要与页面元素交互，false则不交互。

比如说，任务队列中有很多任务，但是不想阻挡用户输入，使用isInputPending和自定义方法yieldToMain方法，就能够保证用户交互时的input不会延迟。

```js
async function saveSettings () {
  // 函数队列
  const tasks = [validateForm, showSpinner, saveToDatabase, updateUI, sendAnalytics]

  while (tasks.length > 0) {
    // 让步于用户输入
    if (navigator.scheduling.isInputPending()) {
      // 如果有用户输入在等待，则让步
      await yieldToMain()
    } else {
      // Shift the the task out of the queue:
      const task = tasks.shift()

      // Run the task:
      task()
    }
  }
}
```

使用isInputPending配合让步的策略，能让浏览器有机会响应用户的重要交互，这在很多情况下，尤其是很多执行很多任务时，能够提高页面对用户的响应能力。

另一种使用isInputPending的方式，特别是担心浏览器不支持该策略，就可以使用另一种结合时间的方式。

```js
async function saveSettings () {
  // A task queue of functions
  const tasks = [validateForm, showSpinner, saveToDatabase, updateUI, sendAnalytics]

  let deadline = performance.now() + 50

  while (tasks.length > 0) {
    // Optional chaining operator used here helps to avoid
    // errors in browsers that don't support `isInputPending`:
    if (navigator.scheduling?.isInputPending() || performance.now() >= deadline) {
      // There's a pending user input, or the
      // deadline has been reached. Yield here:
      await yieldToMain()

      // Extend the deadline:
      deadline += 50

      // Stop the execution of the current loop and
      // move onto the next iteration:
      continue
    }

    // Shift the the task out of the queue:
    const task = tasks.shift()

    // Run the task:
    task()
  }
}
```

 专门编排优先级的api: Scheduler.postTask()

可以参考文档： [资料](https://developer.mozilla.org/en-US/docs/Web/API/Scheduler)

postTask允许更细粒度的编排任务，该方法能让浏览器编排任务的优先级，以便地优先级别的任务能够让步于主线程。目前postTask使用promise，接受优先级这个参数设定。

postTask方法有三个优先级别：

* `background级`，适用于优先级别最低的任务
* `user-visible级`，适用于优先级别中等的任务，如果没有入参，也是该函数的默认参数。
* `user-blocking级`，适用于优先级别最高的任务。

拿下面的代码来举例，postTask在三处分别都是最高优先级别，其他的另外两个任务优先级别都是最低。

```js
function saveSettings () {
  // Validate the form at high priority
  scheduler.postTask(validateForm, { priority: 'user-blocking' })

  // Show the spinner at high priority:
  scheduler.postTask(showSpinner, { priority: 'user-blocking' })

  // Update the database in the background:
  scheduler.postTask(saveToDatabase, { priority: 'background' })

  // Update the user interface at high priority:
  scheduler.postTask(updateUI, { priority: 'user-blocking' })

  // Send analytics data in the background:
  scheduler.postTask(sendAnalytics, { priority: 'background' })
}
```

在上面例子中，通过这些任务的优先级的编排方式，能让高浏览器级别的任务，比如用户交互等得以触发。

提醒：
postTask 并不是所有浏览器都支持。可以检测是否空，或者考虑使用polyfill。

 web worker

web worker是运行在Main线程之外的一个线程，叫做worker线程。我们可以把一些计算量大的任务放到worker中去处理

主线程上的所有Long Task都消失了，复杂的计算都到单独的worker线程去处理了。但是workder线程仍然存在Long Task，不过没有关系，只要主线程没有Long Task，那就不影响构建、渲染了。

 参考文档

* [资料](https://zhuanlan.zhihu.com/p/606276325)

* [资料](https://juejin.cn/post/7159807927908302884)
* [资料](https://developer.mozilla.org/zh-CN/docs/Web/API/PerformanceLongTaskTiming)

## 257 [React] 为什么不能在循环、条件或嵌套函数中调用 Hooks？

* created_at: 2023-04-06T15:59:44Z
* updated_at: 2023-04-06T15:59:45Z
* labels: web框架
* milestone: 高

如果在条件语句中使用hooks，React会抛出 error。

这与React Hooks的底层设计的数据结构相关，先抛出结论：**react用链表来严格保证hooks的顺序**。

一个典型的useState使用场景：

```js
const [name,setName] = useState('leo');

......

setName('Lily');
```

那么hooks在这两条语句分别作了什么？

![](https://pic.rmb.bdstatic.com/bjh/89d2fa7124b06495bbbfd4b5758bd6e5.png)

上图是 `useState` 首次渲染的路径，其中，跟我们问题相关的是 `mountState` 这个过程，简而言之，这个过程初始化了一个hooks，并且将其追加到链表结尾。

```js
// 进入 mounState 逻辑

function mountState(initialState) {

 // 将新的 hook 对象追加进链表尾部
 var hook = mountWorkInProgressHook();

 // initialState 可以是一个回调，若是回调，则取回调执行后的值

 if (typeof initialState === 'function') {

 // $FlowFixMe: Flow doesn't like mixed types

 initialState = initialState();
 }

 // 创建当前 hook 对象的更新队列，这一步主要是为了能够依序保留 dispatch

 const queue = hook.queue = {

 last: null,

 dispatch: null,

 lastRenderedReducer: basicStateReducer,

 lastRenderedState: (initialState: any),

 };

 // 将 initialState 作为一个“记忆值”存下来

 hook.memoizedState = hook.baseState = initialState;

 // dispatch 是由上下文中一个叫 dispatchAction 的方法创建的，这里不必纠结这个方法具体做了什么

 var dispatch = queue.dispatch = dispatchAction.bind(null, currentlyRenderingFiber$1, queue);

 // 返回目标数组，dispatch 其实就是示例中常常见到的 setXXX 这个函数，想不到吧？哈哈

 return [hook.memoizedState, dispatch];
}
```

从这段源码中我们可以看出，mounState 的主要工作是初始化 Hooks。在整段源码中，最需要关注的是 `mountWorkInProgressHook` 方法，它为我们道出了 Hooks 背后的数据结构组织形式。以下是 `mountWorkInProgressHook` 方法的源码：

```js
function mountWorkInProgressHook () {

  // 注意，单个 hook 是以对象的形式存在的
  const hook = {

    memoizedState: null,

    baseState: null,

    baseQueue: null,

    queue: null,

    next: null

  }

  if (workInProgressHook === null) {
    // 这行代码每个 React 版本不太一样，但做的都是同一件事：将 hook 作为链表的头节点处理
    firstWorkInProgressHook = workInProgressHook = hook
  } else {
    // 若链表不为空，则将 hook 追加到链表尾部
    workInProgressHook = workInProgressHook.next = hook
  }
  // 返回当前的 hook
  return workInProgressHook
}
```

到这里可以看出，hook 相关的所有信息收敛在一个 hook 对象里，而 hook 对象之间以单向链表的形式相互串联。

接着，我们来看更新过程

![](https://pic.rmb.bdstatic.com/bjh/1cc5bd4c72e4f22d1aa828df3c831f2d.png)

上图中，需要注意的是updateState的过程：按顺序去遍历之前构建好的链表，取出对应的数据信息进行渲染。

我们把 mountState 和 updateState 做的事情放在一起来看：mountState（首次渲染）构建链表并渲染；updateState 依次遍历链表并渲染。

hooks 的渲染是通过“依次遍历”来定位每个 hooks 内容的。如果前后两次读到的链表在顺序上出现差异，那么渲染的结果自然是不可控的。

这个现象有点像我们构建了一个长度确定的数组，数组中的每个坑位都对应着一块确切的信息，后续每次从数组里取值的时候，只能够通过索引（也就是位置）来定位数据。也正因为如此，在许多文章里，都会直截了当地下这样的定义：Hooks 的本质就是数组。但读完这一课时的内容你就会知道，Hooks 的本质其实是链表。

我们举个例子：

```js
 let mounted = false;

if(!mounted){
 // eslint-disable-next-line
 const [name,setName] = useState('leo');
 const [age,setAge] = useState(18);
 mounted = true;
}
const [career,setCareer] = useState('码农');
console.log('career',career);

......

<div onClick={()=>setName('Lily')}>
 点我点我点我
<div>
```

点击div后，我们期望的输出是 "码农"，然而事实上(尽管会error，但是打印还是执行)打印的为 "Lily"

原因是，三个useState在初始化的时候已经构建好了一个三个节点的链表结构，依次为： `name('leo') --> age(18) --> career('码农')`

每个节点都已经派发了一个与之对应的update操作，因此执行setName时候，三个节点就修改为了 `name('Lily') --> age(18) --> career('码农')`

然后执行update渲染操作，从链表依次取出值，此时，条件语句的不再执行，第一个取值操作会从链表的第一个，也就是name对应的hooks对象进行取值：此时取到的为 `name:Lily`

必须按照顺序调用从根本上来说是因为 useState 这个钩子在设计层面并没有“状态命名”这个动作，也就是说你每生成一个新的状态，React 并不知道这个状态名字叫啥，所以需要通过顺序来索引到对应的状态值

## 259 为什么普通 for 循环的性能远远高于 forEach 的性能？

* created_at: 2023-04-08T14:48:47Z
* updated_at: 2023-04-08T14:48:48Z
* labels: JavaScript
* milestone: 高

 首先问题说"for循环优于forEach"并不完全正确

循环次数不够多的时候， forEach 性能优于 for

```js
// 循环十万次
const arrs = new Array(100000)

console.time('for')
for (let i = 0; i < arrs.length; i++) {}
console.timeEnd('for') // for: 2.36474609375 ms

console.time('forEach')
arrs.forEach((arr) => {})
console.timeEnd('forEach') // forEach: 0.825927734375 ms
```

循环次数越大， for 的性能优势越明显

```js
// 循环 1 亿次
const arrs = new Array(100000000)

console.time('for')
for (let i = 0; i < arrs.length; i++) {}
console.timeEnd('for') // for: 72.7099609375 ms

console.time('forEach')
arrs.forEach((arr) => {})
console.timeEnd('forEach') // forEach: 923.77392578125 ms
```

 先做一下对比

|对比类型|for|forEach|
|:---|:---|:---|
|遍历|for循环按顺序遍历|forEach 使用 iterator 迭代器遍历|
|数据结构|for循环是随机访问元素|forEach 是顺序链表访问元素|
|性能上|对于arraylist，是顺序表，使用for循环可以顺序访问，速度较快；使用foreach会比for循环稍慢一些|对于linkedlist，是单链表，使用for循环每次都要从第一个元素读取next域来读取，速度非常慢；使用foreach可以直接读取当前结点，数据较快|

 结论

for 性能优于 forEach ， 主要原因如下：

1. foreach相对于for循环，代码减少了，但是foreach依赖IEnumerable。在运行的时候效率低于for循环。
2. for循环没有额外的函数调用栈和上下文，所以它的实现最为简单。forEach：对于forEach来说，它的函数签名中包含了参数和上下文，所以性能会低于 for 循环。

 参考文档

* [资料](https://zhuanlan.zhihu.com/p/461523927)

* [javascript 中 for 的性能比 forEach 的性能要好，为何还要使用 forEach？ - 李十三的回答 - 知乎](https://www.zhihu.com/question/556786869/answer/2706658837)
* [资料](https://juejin.cn/post/6844904159938887687)

## 260 介绍下 BFC、IFC、GFC 和 FFC？

* created_at: 2023-04-08T15:21:27Z
* updated_at: 2023-04-08T15:21:28Z
* labels: CSS, 百度
* milestone: 中

 BFC（Block Formatting Contexts）块级格式化上下文

 什么是BFC？

`BFC` 全称：`Block Formatting Context`， 名为 **块级格式化上下文**。

`W3C`官方解释为：`BFC`它决定了元素如何对其内容进行定位，以及与其它元素的关系和相互作用，当涉及到可视化布局时，`Block Formatting Context`提供了一个环境，`HTML`在这个环境中按照一定的规则进行布局。

 如何触发BFC？

* 根元素或其它包含它的元素

* 浮动 `float: left/right/inherit`

* 绝对定位元素 `position: absolute/fixed`

* 行内块`display: inline-block`

* 表格单元格 `display: table-cell`

* 表格标题 `display: table-caption`

* 溢出元素 `overflow: hidden/scroll/auto/inherit`

* 弹性盒子 `display: flex/inline-flex`

 BFC布局规则

* 内部的Box会在垂直方向，一个接一个地放置。

* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠。

* 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。

* BFC的区域不会与float box重叠。

* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。

* 计算BFC的高度时，浮动元素也参与计算

 BFC应用场景

 解决块级元素垂直方向margin重叠

我们来看下面这种情况：

```html
<style>
 .box{
 width:180px;
 height:180px;
 background:rosybrown;
 color:#fff;
 margin: 60px auto;
 }
</style>
<body>
 <div class="box">box1</div>
 <div class="box">box2</div>
</body>

```

按我们习惯性思维，上面这个box的`margin-bottom`是`60px`，下面这个box的`margin-top`也是`60px`，那他们垂直的间距按道理来说应该是`120px`才对。（可事实并非如此，我们可以来具体看一下）

这种情况下的margin边距为两者的最大值，而不是两者相加，那么我们可以使用BFC来解决这种margin塌陷的问题。

```html
<style>
 .box{
 width:180px;
 height:180px;
 background:rosybrown;
 color:#fff;
 margin: 60px auto;
 }
 .outer_box{
 overflow: hidden;
 }
</style>
<body>
 <div class="outer_box">
 <div class="box">nanjiu</div>
 </div>
 <div class="box">南玖</div>
</body>

```

 解决高度塌陷问题

我们再来看这种情况，内部box使用`float`脱离了普通文档流，导致外层容器没办法撑起高度，使得背景颜色没有显示出来。

```html
<style>
 .box{
 float:left;
 width:180px;
 height:180px;
 background:rosybrown;
 color:#fff;
 margin: 60px;
 }
 .outer_box{
 background:lightblue;
 }
</style>
<body>
 <div class="outer_box">
 <div class="box">nanjiu</div>
 <div class="box">南玖</div>
 </div>
</body>

```

我们可以看到此时的外层容器的高度为0，导致背景颜色没有渲染出来，这种情况我们同样可以使用BFC来解决，可以直接为外层容器触发BFC，我们来看看效果：

```html
<style>
 .box{
 float:left;
 width:180px;
 height:180px;
 background:rosybrown;
 color:#fff;
 margin: 60px;
 }
.outer_box{
 display:inline-block;
 background:lightblue;
}
</style>
<body>
 <div class="outer_box">
 <div class="box">nanjiu</div>
 <div class="box">南玖</div>
 </div>
</body>

```

 清除浮动

在早期前端页面大多喜欢用浮动来布局，但浮动元素脱离普通文档流，会覆盖旁边内容：

```html
<style>
.aside {
 float: left;
 width:180px;
 height: 300px;
 background:lightpink;
 }
 .container{
 width:500px;
 height:400px;
 background:mediumturquoise;
 }
</style>
<body>
 <div class="outer_box">
 <div class="aside">nanjiu</div>
 <div class="container">南玖</div>
 </div>
</body>

```

我们可以通过触发后面这个元素形成BFC，从而来清楚浮动元素对其布局造成的影响

```html
<style>
.aside {
 float: left;
 width:180px;
 height: 300px;
 background:lightpink;
 }
 .container{
 width:500px;
 height:400px;
 background:mediumturquoise;
 overflow: hidden;
 }
</style>
<body>
 <div class="outer_box">
 <div class="aside">nanjiu</div>
 <div class="container">南玖</div>
 </div>
</body>
```

 什么是IFC？

`IFC`全称：`Inline Formatting Context`，名为**行级格式化上下文**

 如何触发IFC？

* 块级元素中仅包含内联级别元素

形成条件非常简单，需要注意的是当IFC中有块级元素插入时，会产生两个匿名块将父元素分割开来，产生两个IFC。

 IFC布局规则

* 在一个IFC内，子元素是水平方向横向排列的，并且垂直方向起点为元素顶部。
* 子元素只会计算横向样式空间，【padding、border、margin】，垂直方向样式空间不会被计算，【padding、border、margin】。
* 在垂直方向上，子元素会以不同形式来对齐（vertical-align）
* 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块（containing box）和与其中的浮动来决定。
* IFC中的`line box`一般左右边贴紧其包含块，但float元素会优先排列。
* IFC中的`line box`高度由 CSS 行高计算规则来确定，同个`IFC`下的多个`line box`高度可能会不同。
* 当 `inline boxes`的总宽度少于包含它们的`line box`时，其水平渲染规则由 `text-align` 属性值来决定。
* 当一个`inline box`超过父元素的宽度时，它会被分割成多个`boxes`，这些`boxes`分布在多个`line box`中。如果子元素未设置强制换行的情况下，`inline box`将不可被分割，将会溢出父元素。

 IFC应用场景

 元素水平居中

当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。

```html
<style>
 /* IFC */
 .text_container{
 width: 650px;
 border: 3px solid salmon;
 margin-top:60px;
 text-align: center;
 }
 strong,span{
 margin: 20px;
 background-color: cornflowerblue;
 color:#fff;
 }
</style>
<body>
 <div class="text_container">
 <strong>string 1</strong>
 <span>string 2</span>
 </div>
</body>
```

 多行文本水平垂直居中

创建一个IFC，然后设置其`vertical-align:middle`，其他行内元素则可以在此父元素下垂直居中。

```html
<style>
.text_container{
 text-align: center;
 line-height: 300px;
 width: 100%;
 height: 300px;
 background-color: turquoise;
 font-size: 0;
 }
 p{
 line-height: normal;
 display: inline-block;
 vertical-align: middle;
 background-color: coral;
 font-size: 18px;
 padding: 10px;
 width: 360px;
 color: #fff;
 }
</style>
<body>
 <div class="text_container">
 <p>
 string 1
 <strong>string 2</strong>
 </p>
 </div>
</body>

```

 GFC（Grid Formatting Contexts）栅格格式化上下文

 什么是GFC？

`GFC`全称：`Grids Formatting Contexts`，名为**网格格式上下文**

> 简介： CSS3引入的一种新的布局模型——Grids网格布局，目前暂未推广使用，使用频率较低，简单了解即可。 Grid 布局与 Flex 布局有一定的相似性，都可以指定容器内部多个项目的位置。但是，它们也存在重大区别。 Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是一维布局。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是二维布局。Grid 布局远比 Flex 布局强大。

 如何触发GFC？

当为一个元素设置`display`值为`grid`或者`inline-grid`的时候，此元素将会获得一个独立的渲染区域。

 GFC布局规则

通过在`网格容器（grid container）`上定义`网格定义行（grid definition rows）`和`网格定义列（grid definition columns）`属性各在网格项目（grid item）上定义网格行（grid row）和网格列（grid columns）为每一个网格项目（grid item）定义位置和空间（具体可以在MDN上查看）

 GFC应用场景

 任意魔方布局

这个布局使用用GFC可以轻松实现自由拼接效果，换成其他方法，一般会使用相对/绝对定位，或者flex来实现自由拼接效果，复杂程度将会提升好几个等级。

```html
<style>
.magic{
 display: grid;
 grid-gap: 2px;
 width:300px;
 height:300px;
 }
 .magic div{
 border: 1px solid coral;
 }
 .m_1{
 grid-column-start: 1;
 grid-column-end: 3;
 }
 .m_3{
 grid-column-start: 2;
 grid-column-end: 4;
 grid-row-start: 2;
 grid-row-end: 3;
 }
</style>
<body>
 <div class="magic">
 <div class="m_1">1</div>
 <div class="m_2">2</div>
 <div class="m_3">3</div>
 <div class="m_4">4</div>
 <div class="m_5">5</div>
 <div class="m_6">6</div>
 <div class="m_7">7</div>
 </div>
</body>
```

 FFC（Flex Formatting Contexts）弹性格式化上下文

 什么是FFC？

`FFC`全称：`Flex Formatting Contexts`，名为**弹性格式上下文**

> 简介： **CSS3引入了一种新的布局模型——flex布局。** flex是flexible box的缩写，一般称之为**弹性盒模型**。和CSS3其他属性不一样，flexbox并不是一个属性，而是一个模块，包括多个CSS3属性。flex布局提供一种更加有效的方式来进行容器内的项目布局，以适应各种类型的显示设备和各种尺寸的屏幕，使用Flex box布局实际上就是声明创建了FFC(自适应格式上下文)

 如何触发FFC？

当 `display` 的值为 `flex` 或 `inline-flex` 时，将生成弹性容器（Flex Containers）, 一个弹性容器为其内容建立了一个新的弹性格式化上下文环境（FFC）

 FFC布局规则

* 设置为 `flex` 的容器被渲染为一个块级元素
* 设置为 `inline-flex` 的容器被渲染为一个行内元素
* 弹性容器中的每一个子元素都是一个弹性项目。弹性项目可以是任意数量的。弹性容器外和弹性项目内的一切元素都不受影响。简单地说，Flexbox 定义了弹性容器内弹性项目该如何布局

\*\*⚠️注意：\*\*FFC布局中，float、clear、vertical-align属性不会生效。

> Flex 布局是轴线布局，只能指定"项目"针对轴线的位置，可以看作是**一维布局**。Grid 布局则是将容器划分成"行"和"列"，产生单元格，然后指定"项目所在"的单元格，可以看作是**二维布局**。Grid 布局远比 Flex 布局强大。

 FFC应用场景

这里只介绍它对于其它布局所相对来说更方便的特点，其实flex布局现在是非常普遍的，很多前端人员都喜欢用flex来写页面布局，操作方便且灵活，兼容性好。

 自动撑开剩余高度/宽度

看一个经典两栏布局：左边为侧边导航栏，右边为内容区域，用我们之前的常规布局，可能就需要使用到`css`的`calc`方法来动态计算剩余填充宽度了，但如果使用flex布局的话，只需要一个属性就能解决这个问题：

**calc动态计算方法：**

```html
<style>
.outer_box {
 width:100%;
}
.aside {
 float: left;
 width:180px;
 height: 300px;
 background:lightpink;
}
.container{
 width:calc(100% - 180px);
 height:400px;
 background:mediumturquoise;
 overflow: hidden;
 }
</style>
<body>
  <div class="outer_box">
 <div class="aside">box1</div>
 <div class="container">box2</div>
 </div>
</body>

```

**使用FFC：**

```html
<style>
.outer_box {
 display:flex;
 width:100%;
}
.aside {
 float: left;
 width:180px;
 height: 300px;
 background:lightpink;
}
.container{
 flex: 1;
 height:400px;
 background:mediumturquoise;
 overflow: hidden;
 }
</style>
<body>
  <div class="outer_box">
 <div class="aside">box1</div>
 <div class="container">box2</div>
 </div>
</body>
```

 参考文档

* [资料](https://juejin.cn/post/7072174649735381029)

## 261 [Vue] 使用Proxy实现简易的vue双向数据绑定

* created_at: 2023-04-08T15:28:09Z
* updated_at: 2023-04-08T15:28:10Z
* labels: web框架, 腾讯
* milestone: 高

 proxy 的基本使用

可以直接看这个链接： [资料](https://github.com/pro-collection/interview-question/issues/8)

使用proxy实现数据劫持

```js
const data = {
  name: YoLinDeng,
  height: '176cm'
}

const p = new Proxy(data, {
  get (target, prop) {
    return Reflect.get(...arguments)
  },
  set (target, prop, newValue) {
    return Reflect.set(...arguments)
  }
})
```

 关于vue中数据响应式的原理

 对数据进行侦测

* 在vue2.X中，实现一个`observe`类，对于对象数据，通过`Object.defineProperty`来劫持对象的属性，实现`getter`和`setter`方法，这样就可以在getter的时候知道谁（订阅者）读取了数据，即谁依赖了当前的数据，将它通过`Dep类`（订阅器）收集统一管理，在setter的时候调用Dep类中的`notify`方法通知所以相关的订阅者进行更新视图。如果对象的属性也是一个对象的话，则需要递归调用`observe`进行处理。
* 对于数组则需要另外处理，通过实现一个拦截器类，并将它挂载到数组数据的原型上，当调用`push/pop/shift/unshift/splice/sort/reverse`修改数组数据时候，相当于调用的是拦截器中重新定义的方法，这样在拦截器中就可以侦测到数据改变了，并通知订阅者更新视图。
* vue3中使用Proxy替代了Object.defineProperty，优点在于可以直接监听对象而非属性、可以直接监听数组的变化、多达13种拦截方法。缺点是兼容性还不够好。Proxy作为新标准将受到浏览器厂商重点持续的性能优化。

 对模板字符串进行编译

* 实现Compile解析器类，将`template`中的模板字符串通过正则等方式进行处理生成对应的ast（抽象语法树），通过调用定义的不同钩子函数进行处理，包括开始标签（`start`）并判断是否自闭和以及解析属性、结束标签（`end`）、文本（`chars`）、注释（`comment`）
* 将通过html解析与文本解析的ast进行优化处理，在静态节点上打标记，为后面`dom-diff`算法中性能优化使用，即在对比前后vnode的时候会跳过静态节点不作对比。
* 最后根据处理好的ast生产`render`函数，在组件挂载的时候调用`render`函数就可以得到虚拟dom。

 虚拟dom

* vnode的类型包括注释节点、文本节点、元素节点、组件节点、函数式组件节点、克隆节点，`VNode`可以描述的多种节点类型，它们本质上都是`VNode`类的实例，只是在实例化的时候传入的属性参数不同而已。
* 通过将模板字符串编译生成虚拟dom并缓存起来，当数据发生变化时，通过对比变化前后虚拟dom，以变化后的虚拟dom为基准，更新旧的虚拟dom，使它和新的一样。把dom-diff过程叫做`patch`的过程，其主要做了三件事，分别是创建/删除/更新节点。
* 对于子节点的更新策略，vue中为了避免双重循环数据量大时候造成时间复杂度高带来的性能问题，而选择先从子节点数组中4个特殊位置进行对比，分别是：新前与旧前，新后与旧后，新后与旧前，新前与旧后。如果四种情况都没有找到相同的节点，则再通过循环方式查找。

 实现简易的vue双向数据绑定

vue的双向数据绑定主要是指，数据变化更新视图变化，视图变化更新数据。

**实现代码如下**

```handlebars
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width= , initial-scale=1.0">
 <title>Document</title>
 <script src="myVue.js"></script>
</head>
<body>
 <div id="app">
 {{name}}
 <div>{{message}}</div>
 <input type="text" v-model="test">
 <span>{{test}}</span>
 </div>
 <script>
 let vm = new vue({
 el: '#app',
 data: {
 name: 'YoLinDeng',
 message: '打篮球',
 test: '双向绑定数据'
 }
 })
 // console.log(vm._data)
 </script>
</body>
</html>
```

```js
class vue extends EventTarget {
  constructor (option) {
    super()
    this.option = option
    this._data = this.option.data
    this.el = document.querySelector(this.option.el)
    this.compileNode(this.el)
    this.observe(this._data)
  }

  // 实现监听器方法
  observe (data) {
    const context = this
    // 使用proxy代理，劫持数据
    this._data = new Proxy(data, {
      set (target, prop, newValue) {
        // 自定义事件
        const event = new CustomEvent(prop, {
          detail: newValue
        })
        // 发布自定义事件
        context.dispatchEvent(event)
        return Reflect.set(...arguments)
      }
    })
  }

  // 实现解析器方法，解析模板
  compileNode (el) {
    const child = el.childNodes
    const childArr = [...child]
    childArr.forEach(node => {
      if (node.nodeType === 3) {
        const text = node.textContent
        const reg = /\{\{\s*([^\s\{\}]+)\s*\}\}/g
        if (reg.test(text)) {
          const $1 = RegExp.$1
          this._data[$1] && (node.textContent = text.replace(reg, this._data[$1]))
          // 监听数据更改事件
          this.addEventListener($1, e => {
            node.textContent = text.replace(reg, e.detail)
          })
        }
      } else if (node.nodeType === 1) { // 如果是元素节点
        const attr = node.attributes
        // 判断属性中是否含有v-model
        if (attr.hasOwnProperty('v-model')) {
          const keyName = attr['v-model'].nodeValue
          node.value = this._data[keyName]
          node.addEventListener('input', e => {
            this._data[keyName] = node.value
          })
        }
        // 递归调用解析器方法
        this.compileNode(node)
      }
    })
  }
}
```

## 262 数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少？

* created_at: 2023-04-08T15:31:48Z
* updated_at: 2023-04-08T15:31:48Z
* labels: JavaScript
* milestone: 中

数组可以直接根据索引取的对应的元素，所以不管取哪个位置的元素的时间复杂度都是 O(1)

**得出结论：消耗时间几乎一致，差异可以忽略不计**

**原因**:

JavaScript 没有真正意义上的数组，所有的数组其实是对象，其“索引”看起来是数字，其实会被转换成字符串，作为属性名（对象的 key）来使用。所以无论是取第 1 个还是取第 10 万个元素，都是用 key 精确查找哈希表的过程，其消耗时间大致相同。

Chrome 浏览器JS引擎 V8中，数组有两种存储模式，一种是类似C语言中的线性结构存储（索引值连续，且都是正整数的情况下），一种是采用Hash结构存储（索引值为负数，数组稀疏，间隔比较大）

## 263 算法题之「移动零」

* created_at: 2023-04-08T15:37:15Z
* updated_at: 2023-04-08T15:37:16Z
* labels: JavaScript
* milestone: 中

 题目如下

```
给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:
输入: [0,1,0,3,12]
输出: [1,3,12,0,0]

说明:
必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。
```

 解法

解法1：

```js
function zeroMove (array) {
  const len = array.length
  let j = 0
  for (let i = 0; i < len - j; i++) {
    if (array[i] === 0) {
      array.push(0)
      array.splice(i, 1)
      i--
      j++
    }
  }
  return array
}
```

解法2：算法思路

```js
function moveZeroToLast (arr) {
  let index = 0
  for (let i = 0, length = arr.length; i < length; i++) {
    if (arr[i] === 0) {
      index++
    } else if (index !== 0) {
      arr[i - index] = arr[i]
      arr[i] = 0
    }
  }
  return arr
}
```

## 264 请实现一个 add 函数，满足以下功能

* created_at: 2023-04-08T15:42:13Z
* updated_at: 2023-10-13T04:25:20Z
* labels: JavaScript, 代码实现/算法
* milestone: 中

 题目如下

```
add(1).getValue();  // 1
add(1)(2).getValue();  // 3
add(1)(2)(3).getValue()； // 6
add(1)(2, 3).getValue(); // 6
add(1, 2)(3).getValue(); // 6
add(1, 2, 3).getValue(); // 6
```

 解法

```js
function add (...args) {
  function innerAdd (...innerArgs) {
    args.push(...innerArgs)
    return innerAdd
  }

  innerAdd.getValue = function () {
    return args.reduce((acc, curr) => acc + curr, 0)
  }

  return innerAdd
}

// console.log(add(1)(2).getValue()); // 输出: 3
```

## 265 react-router 里的 `<Link>` 标签和 `<a>` 标签有什么区别

* created_at: 2023-04-08T15:47:26Z
* updated_at: 2023-04-08T15:47:27Z
* labels: JavaScript
* milestone: 中

从最终渲染的 DOM 来看，这两者都是链接，都是 `<a>` 标签，区别是：

`<Link>` 是 react-router 里实现路由跳转的链接，一般配合 `<Route>` 使用，react-router 接管了其默认的链接跳转行为，区别于传统的页面跳转，`<Link>`
的“跳转”行为只会触发相匹配的 `<Route>` 对应的页面内容更新，而不会刷新整个页面。

而 `<a>` 标签就是普通的超链接了，用于从当前页面跳转到 href 指向的另一个页面（非锚点情况）

**源码层面**

先看Link点击事件handleClick部分源码

```js
if (_this.props.onClick) _this.props.onClick(event)

if (!event.defaultPrevented && // onClick prevented default
 event.button === 0 && // ignore everything but left clicks
 !_this.props.target && // let browser handle "target=_blank" etc.
 !isModifiedEvent(event) // ignore clicks with modifier keys
) {
  event.preventDefault()

  const history = _this.context.router.history
  const _this$props = _this.props
  const replace = _this$props.replace
  const to = _this$props.to

  if (replace) {
    history.replace(to)
  } else {
    history.push(to)
  }
}
```

Link做了3件事情：

1. 有onclick那就执行onclick
2. click的时候阻止a标签默认事件（这样子点击`<a href="/abc">123</a>`就不会跳转和刷新页面）
3. 再取得跳转href（即是to），用history（前端路由两种方式之一，history & hash）跳转，此时只是链接变了，并没有刷新页面

## 266 实现 convert 方法，把原始 list 转换成树形结构，要求尽可能降低时间复杂度

* created_at: 2023-04-08T15:55:14Z
* updated_at: 2023-04-08T15:55:15Z
* labels: JavaScript
* milestone: 中

 题目如下

以下数据结构中，id 代表部门编号，name 是部门名称，parentId 是父部门编号，为 0 代表一级部门，现在要求实现一个 convert 方法，把原始 list 转换成树形结构，parentId 为多少就挂载在该 id 的属性
children 数组下，结构如下：

```js
// 原始 list 如下
let list = [
 { id: 1, name: '部门A', parentId: 0 },
 { id: 2, name: '部门B', parentId: 0 },
 { id: 3, name: '部门C', parentId: 1 },
 { id: 4, name: '部门D', parentId: 1 },
 { id: 5, name: '部门E', parentId: 2 },
 { id: 6, name: '部门F', parentId: 3 },
 { id: 7, name: '部门G', parentId: 2 },
 { id: 8, name: '部门H', parentId: 4 }
];
const result = convert(list);

// 转换后的结果如下
let result = [
 {
 id: 1,
 name: '部门A',
 parentId: 0,
 children: [
 {
 id: 3,
 name: '部门C',
 parentId: 1,
 children: [
 {
 id: 6,
 name: '部门F',
 parentId: 3
 }, {
 id: 16,
 name: '部门L',
 parentId: 3
 }
 ]
 },
 {
 id: 4,
 name: '部门D',
 parentId: 1,
 children: [
 {
 id: 8,
 name: '部门H',
 parentId: 4
 }
 ]
 }
 ]
 },
 ···
]
;
```

 解法

解法1：
大型找爹现场
时间复杂度O(n^2)

```js
function convert (arr) {
  return arr.filter((child) => {
    child.children = arr.filter(item => item.parentId === child.id)
    return child.parentId === 0
  })
}

console.log(convert(list))
```

解法2：
先遍历出hash表O(n)
再遍历找爹O(n)
时间复杂度：O(2n)=O(n)
大型找爹现场，找到爹就把自己push到爹的房里，如果没有房间先造一个

```js
function convert (arr) {
  const res = []
  const map = arr.reduce((obj, item) => (obj[item.id] = item, obj), {})
  for (const item of arr) {
    if (item.parentId === 0) {
      res.push(item)
      continue
    }
    if (map.hasOwnProperty(item.parentId)) {
      const parent = map[item.parentId]
      parent.children = parent.children || []
      parent.children.push(item)
    }
  }
  return res
}
```

## 267 [Webpack] webpack热更新原理是什么？

* created_at: 2023-04-09T04:38:38Z
* updated_at: 2024-05-26T06:11:01Z
* labels: 工程化
* milestone: 资深

> `Hot Module Replacement`，简称`HMR`，无需完全刷新整个页面的同时，更新模块。`HMR`的好处，在日常开发工作中体会颇深：**节省宝贵的开发时间、提升开发体验**。

刷新我们一般分为两种：

* 一种是页面刷新，不保留页面状态，就是简单粗暴，直接`window.location.reload()`。
* 另一种是基于`WDS (Webpack-dev-server)`的模块热替换，只需要局部刷新页面上发生变化的模块，同时可以保留当前的页面状态，比如复选框的选中状态、输入框的输入等。

`HMR`作为一个`Webpack`内置的功能，可以通过`HotModuleReplacementPlugin`或`--hot`开启。那么，`HMR`到底是怎么实现热更新的呢？下面让我们来了解一下吧！

 1. webpack-dev-server启动本地服务

我们根据`webpack-dev-server`的`package.json`中的`bin`命令，可以找到命令的入口文件`bin/webpack-dev-server.js`。

```pgsql
// node_modules/webpack-dev-server/bin/webpack-dev-server.js

// 生成webpack编译主引擎 compiler
let compiler = webpack(config);

// 启动本地服务
let server = new Server(compiler, options, log);
server.listen(options.port, options.host, (err) => {
 if (err) {throw err};
});
```

本地服务代码：

```javascript
// node_modules/webpack-dev-server/lib/Server.js
class Server {
 constructor() {
 this.setupApp();
 this.createServer();
 }

 setupApp() {
 // 依赖了express
  this.app = new express();
 }

 createServer() {
 this.listeningApp = http.createServer(this.app);
 }
 listen(port, hostname, fn) {
 return this.listeningApp.listen(port, hostname, (err) => {
 // 启动express服务后，启动websocket服务
 this.createSocketServer();
 }
 }
}
```

这一小节代码主要做了三件事：

* 启动`webpack`，生成`compiler`实例。`compiler`上有很多方法，比如可以启动 `webpack` 所有**编译**工作，以及**监听**本地文件的变化。
* 使用`express`框架启动本地`server`，让浏览器可以请求本地的**静态资源**。
* 本地`server`启动之后，再去启动`websocket`服务，如果不了解`websocket`，建议简单了解一下[websocket速成](https://link.juejin.cn?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2017%2F05%2Fwebsocket.html "https://www.ruanyifeng.com/blog/2017/05/websocket.html")。通过`websocket`，可以建立本地服务和浏览器的双向通信。这样就可以实现当本地文件发生变化，立马告知浏览器可以热更新代码啦！

上述代码主要干了三件事，但是源码在启动服务前又做了很多事，接下来便看看`webpack-dev-server/lib/Server.js`还做了哪些事？

 2. 修改webpack.config.js的entry配置

启动本地服务前，调用了`updateCompiler(this.compiler)`方法。这个方法中有 2 段关键性代码。一个是获取`websocket`客户端代码路径，另一个是根据配置获取`webpack`热更新代码路径。

```javascript
// 获取websocket客户端代码
const clientEntry = `${require.resolve(
 '../../client/'
)}?${domain}${sockHost}${sockPath}${sockPort}`

// 根据配置获取热更新代码
let hotEntry
if (options.hotOnly) {
  hotEntry = require.resolve('webpack/hot/only-dev-server')
} else if (options.hot) {
  hotEntry = require.resolve('webpack/hot/dev-server')
}
```

修改后的`webpack`入口配置如下：

```awk
// 修改后的entry入口
{ entry:
 { index:
 [
 // 上面获取的clientEntry
 'xxx/node_modules/webpack-dev-server/client/index.js?http://localhost:8080',
 // 上面获取的hotEntry
 'xxx/node_modules/webpack/hot/dev-server.js',
 // 开发配置的入口
 './src/index.js'
  ],
 },
} 
```

为什么要新增了 2 个文件？在入口默默增加了 2 个文件，那就意味会一同打包到`bundle`文件中去，也就是线上运行时。

**（1）webpack-dev-server/client/index.js**

首先这个文件用于`websocket`的，因为`websoket`是双向通信，如果不了解`websocket`，建议简单了解一下[websocket速成](https://link.juejin.cn?target=https%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2017%2F05%2Fwebsocket.html "https://www.ruanyifeng.com/blog/2017/05/websocket.html")。我们在第 1 步 `webpack-dev-server`初始化 的过程中，启动的是本地服务端的`websocket`。那客户端也就是我们的浏览器，浏览器还没有和服务端通信的代码呢？总不能让开发者去写吧hhhhhh。因此我们需要把`websocket`客户端通信代码偷偷塞到我们的代码中。客户端具体的代码后面会在合适的时机细讲哦。

**（2）webpack/hot/dev-server.js**

这个文件主要是用于检查更新逻辑的，这里大家知道就好，代码后面会在合适的时机（**第5步**）细讲。

 3. 监听webpack编译结束

修改好入口配置后，又调用了`setupHooks`方法。这个方法是用来注册监听事件的，监听每次`webpack`编译完成。

```javascript
// node_modules/webpack-dev-server/lib/Server.js
// 绑定监听事件
setupHooks() {
 const {done} = compiler.hooks;
 // 监听webpack的done钩子，tapable提供的监听方法
 done.tap('webpack-dev-server', (stats) => {
 this._sendStats(this.sockets, this.getStats(stats));
 this._stats = stats;
 });
};
```

当监听到一次`webpack`编译结束，就会调用`_sendStats`方法通过`websocket`给浏览器发送通知，`ok`和`hash`事件，这样浏览器就可以拿到最新的`hash`值了，做检查更新逻辑。

```reasonml
// 通过websoket给客户端发消息
_sendStats() {
 this.sockWrite(sockets, 'hash', stats.hash);
 this.sockWrite(sockets, 'ok');
}
```

 4. webpack监听文件变化

每次修改代码，就会触发编译。说明我们还需要监听本地代码的变化，主要是通过`setupDevMiddleware`方法实现的。

这个方法主要执行了`webpack-dev-middleware`库。很多人分不清`webpack-dev-middleware`和`webpack-dev-server`的区别。其实就是因为`webpack-dev-server`只负责启动服务和前置准备工作，所有文件相关的操作都抽离到`webpack-dev-middleware`库了，主要是本地文件的**编译**和**输出**以及**监听**，无非就是职责的划分更清晰了。

那我们来看下`webpack-dev-middleware`源码里做了什么事:

```awk
// node_modules/webpack-dev-middleware/index.js
compiler.watch(options.watchOptions, (err) => {
 if (err) { /*错误处理*/ }
});

// 通过“memory-fs”库将打包后的文件写入内存
setFs(context, compiler); 
```

（1）调用了`compiler.watch`方法，在第 1 步中也提到过，`compiler`的强大。这个方法主要就做了 2 件事：

* 首先对本地文件代码进行编译打包，也就是`webpack`的一系列编译流程。
* 其次编译结束后，开启对本地文件的监听，当文件发生变化，重新编译，编译完成之后继续监听。

为什么代码的改动保存会自动编译，重新打包？这一系列的重新检测编译就归功于`compiler.watch`这个方法了。监听本地文件的变化主要是通过**文件的生成时间**是否有变化，这里就不细讲了。

（2）执行`setFs`方法，这个方法主要目的就是将编译后的文件打包到内存。这就是为什么在开发的过程中，你会发现`dist`目录没有打包后的代码，因为都在内存中。原因就在于访问内存中的代码比访问文件系统中的文件更快，而且也减少了代码写入文件的开销，这一切都归功于`memory-fs`。

 5. 浏览器接收到热更新的通知

我们已经可以监听到文件的变化了，当文件发生变化，就触发重新编译。同时还监听了每次编译结束的事件。当监听到一次`webpack`编译结束，`_sendStats`方法就通过`websoket`给浏览器发送通知，检查下是否需要热更新。下面重点讲的就是`_sendStats`方法中的`ok`和`hash`事件都做了什么。

那浏览器是如何接收到`websocket`的消息呢？回忆下第 2 步骤增加的入口文件，也就是`websocket`客户端代码。

```
'xxx/node_modules/webpack-dev-server/client/index.js?http://localhost:8080'
```

这个文件的代码会被打包到`bundle.js`中，运行在浏览器中。来看下这个文件的核心代码吧。

```js
// webpack-dev-server/client/index.js
const socket = require('./socket')
const onSocketMessage = {
  hash: function hash (_hash) {
    // 更新currentHash值
    status.currentHash = _hash
  },
  ok: function ok () {
    sendMessage('Ok')
    // 进行更新检查等操作
    reloadApp(options, status)
  }
}
// 连接服务地址socketUrl，?http://localhost:8080，本地服务地址
socket(socketUrl, onSocketMessage)

function reloadApp () {
  if (hot) {
    log.info('[WDS] App hot update...')

    // hotEmitter其实就是EventEmitter的实例
    const hotEmitter = require('webpack/hot/emitter')
    hotEmitter.emit('webpackHotUpdate', currentHash)
  }
}
```

`socket`方法建立了`websocket`和服务端的连接，并注册了 2 个监听事件。

* `hash`事件，更新最新一次打包后的`hash`值。
* `ok`事件，进行热更新检查。

热更新检查事件是调用`reloadApp`方法。比较奇怪的是，这个方法又利用`node.js`的`EventEmitter`，发出`webpackHotUpdate`消息。这是为什么？为什么不直接进行检查更新呢？

个人理解就是为了更好的维护代码，以及职责划分的更明确。`websocket`仅仅用于客户端（浏览器）和服务端进行通信。而真正做事情的活还是交回给了`webpack`。

那`webpack`怎么做的呢？再来回忆下第 2 步。入口文件还有一个文件没有讲到，就是：

```
'xxx/node_modules/webpack/hot/dev-server.js'
```

这个文件的代码同样会被打包到`bundle.js`中，运行在浏览器中。这个文件做了什么就显而易见了吧！先瞄一眼代码：

```javascript
// node_modules/webpack/hot/dev-server.js
const check = function check () {
  module.hot.check(true)
    .then(function (updatedModules) {
      // 容错，直接刷新页面
      if (!updatedModules) {
        window.location.reload()
        return
      }

      // 热更新结束，打印信息
      if (upToDate()) {
        log('info', '[HMR] App is up to date.')
      }
    })
    .catch(function (err) {
      window.location.reload()
    })
}

const hotEmitter = require('./emitter')
hotEmitter.on('webpackHotUpdate', function (currentHash) {
  lastHash = currentHash
  check()
})
```

这里`webpack`监听到了`webpackHotUpdate`事件，并获取最新了最新的`hash`值，然后终于进行检查更新了。检查更新呢调用的是`module.hot.check`方法。那么问题又来了，`module.hot.check`又是哪里冒出来了的！答案是`HotModuleReplacementPlugin`搞得鬼。这里留个疑问，继续往下看。

 6. HotModuleReplacementPlugin

前面好像一直是`webpack-dev-server`做的事，那`HotModuleReplacementPlugin`在热更新过程中又做了什么伟大的事业呢？

首先你可以对比下，配置热更新和不配置时`bundle.js`的区别。内存中看不到？直接执行`webpack`命令就可以看到生成的`bundle.js`文件啦。不要用`webpack-dev-server`启动就好了。

（1）没有配置的。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/1/16ec0c9e8fd12349~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
（2）配置了`HotModuleReplacementPlugin`或`--hot`的。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/1/16ec0c90092fa0ac~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
哦~ 我们发现`moudle`新增了一个属性为`hot`，再看`hotCreateModule`方法。 这不就找到`module.hot.check`是哪里冒出来的。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/1/16ec0dc36018973f~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

经过对比打包后的文件，`__webpack_require__`中的`moudle`以及代码行数的不同。我们都可以发现`HotModuleReplacementPlugin`原来也是默默的塞了很多代码到`bundle.js`中呀。这和第 2 步骤很是相似哦！为什么，因为检查更新是在浏览器中操作呀。这些代码必须在运行时的环境。

你也可以直接看浏览器`Sources`下的代码，会发现`webpack`和`plugin`偷偷加的代码都在哦。在这里调试也很方便。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/1/16ec0d4634af2b3c~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)
`HotModuleReplacementPlugin`如何做到的？这里我就不讲了，因为这需要你对`tapable`以及`plugin`机制有一定了解，可以看下我写的文章[Webpack插件机制之Tapable-源码解析](https://juejin.cn/post/6844904004435050503)。当然你也可以选择跳过，只关心热更新机制即可，毕竟信息量太大。

 7. moudle.hot.check 开始热更新

通过第 6 步，我们就可以知道`moudle.hot.check`方法是如何来的啦。那都做了什么？之后的源码都是`HotModuleReplacementPlugin`塞入到`bundle.js`中的哦，我就不写文件路径了。

* 利用上一次保存的`hash`值，调用`hotDownloadManifest`发送`xxx/hash.hot-update.json`的`ajax`请求；
* 请求结果获取热更新模块，以及下次热更新的`Hash` 标识，并进入热更新准备阶段。

```abnf
hotAvailableFilesMap = update.c; // 需要更新的文件
hotUpdateNewHash = update.h; // 更新下次热更新hash值
hotSetStatus("prepare"); // 进入热更新准备状态
```

* 调用`hotDownloadUpdateChunk`发送`xxx/hash.hot-update.js` 请求，通过`JSONP`方式。

```javascript
function hotDownloadUpdateChunk (chunkId) {
  const script = document.createElement('script')
  script.charset = 'utf-8'
  script.src = __webpack_require__.p + '' + chunkId + '.' + hotCurrentHash + '.hot-update.js'
  if (null) script.crossOrigin = null
  document.head.appendChild(script)
}
```

这个函数体为什么要单独拿出来，因为这里要解释下为什么使用`JSONP`获取最新代码？主要是因为`JSONP`获取的代码可以直接执行。为什么要直接执行？我们来回忆下`/hash.hot-update.js`的代码格式是怎么样的。

![](https://p1-jj.byteimg.com/tos-cn-i-t2oaga2asx/gold-user-assets/2019/12/1/16ec04316d6ac5e3~tplv-t2oaga2asx-zoom-in-crop-mark:3024:0:0:0.awebp)

可以发现，新编译后的代码是在一个`webpackHotUpdate`函数体内部的。也就是要立即执行`webpackHotUpdate`这个方法。

再看下`webpackHotUpdate`这个方法。

```ada
window["webpackHotUpdate"] = function (chunkId, moreModules) {
 hotAddUpdateChunk(chunkId, moreModules);
} ;
```

* `hotAddUpdateChunk`方法会把更新的模块`moreModules`赋值给全局全量`hotUpdate`。
* `hotUpdateDownloaded`方法会调用`hotApply`进行代码的替换。

```reasonml
function hotAddUpdateChunk(chunkId, moreModules) {
 // 更新的模块moreModules赋值给全局全量hotUpdate
 for (var moduleId in moreModules) {
 if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
  hotUpdate[moduleId] = moreModules[moduleId];
 }
 }
 // 调用hotApply进行模块的替换
 hotUpdateDownloaded();
}
```

 8. hotApply 热更新模块替换

热更新的核心逻辑就在`hotApply`方法了。 `hotApply`代码有将近 400 行，还是挑重点讲了，看哭😭

 ①删除过期的模块，就是需要替换的模块

通过`hotUpdate`可以找到旧模块

```cpp
var queue = outdatedModules.slice();
while (queue.length > 0) {
 moduleId = queue.pop();
 // 从缓存中删除过期的模块
 module = installedModules[moduleId];
 // 删除过期的依赖
 delete outdatedDependencies[moduleId];

 // 存储了被删掉的模块id，便于更新代码
 outdatedSelfAcceptedModules.push({
 module: moduleId
 });
}
```

 ②将新的模块添加到 modules 中

```inform7
appliedUpdate[moduleId] = hotUpdate[moduleId];
for (moduleId in appliedUpdate) {
 if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
 modules[moduleId] = appliedUpdate[moduleId];
 }
}
```

 ③通过\_\_webpack\_require\_\_执行相关模块的代码

```abnf
for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
 var item = outdatedSelfAcceptedModules[i];
 moduleId = item.module;
 try {
 // 执行最新的代码
 __webpack_require__(moduleId);
 } catch (err) {
 // ...容错处理
 }
}

```

`hotApply`的确比较复杂，知道大概流程就好了，这一小节，要求你对webpack打包后的文件如何执行的有一些了解，大家可以自去看下。

 总结

还是以阅读源码的形式画的图，①-④的小标记，是文件发生变化的一个流程。

![](https://foruda.gitee.com/images/1681014860649655814/ea9d055f_7819612.png)

 参考文档

* [轻松理解webpack热更新原理](https://juejin.cn/post/6844904008432222215)

* [websocket基础知识了解](https://www.ruanyifeng.com/blog/2017/05/websocket.html)
* [tapable: Webpack插件机制之Tapable-源码解析](https://juejin.cn/post/6844904004435050503)

* [Webpack Hot Module Replacement 的原理解析](https://github.com/Jocs/jocs.github.io/issues/15)
* [看完这篇，面试再也不怕被问 Webpack 热更新](https://juejin.cn/post/6844903953092591630)

* [Webpack HMR 原理解析](https://zhuanlan.zhihu.com/p/30669007)

## 268 [Vue] 在 v-for 时给每项元素绑定事件需要用事件代理吗？为什么？

* created_at: 2023-04-09T05:37:04Z
* updated_at: 2023-04-09T05:42:21Z
* labels: web框架
* milestone: 高

 Vue 并没有在源码中做代理

vue 并没有在源码中做代理， 至少是 2.x 是没有做事件代理的。但是理论上来说使用事件代理性能会更好一点。

阅读 vue 源码的过程中，并没有发现 vue 会自动做事件代理，但是一般给 v-for 绑定事件时，都会让节点指向同一个事件处理程序（第二种情况可以运行，但是 eslint 会警告），一定程度上比每生成一个节点都绑定一个不同的事件处理程序性能好，但是监听器的数量仍不会变，所以使用事件代理会更好一点。

react 是委托到 document 上, 然后自己生成了合成事件, 冒泡到 document 的时候进入合成事件, 然后他通过 getParent() 获取该事件源的所有合成事件, 触发完毕之后继续冒泡。但是一些特殊的比如focus这种必须放在input这些dom上。

 为何事件代理会让性能好一些

说一下我个人理解，先说结论，可以使用

事件代理作用主要是 2 个

1. 将事件处理程序代理到父节点，减少内存占用率
2. 动态生成子节点时能自动绑定事件处理程序到父节点

这里我生成了十万个 span 节点，通过 performance monitor 来监控内存占用率和事件监听器的数量，对比以下 3 种情况

1. 不使用事件代理，每个 span 节点绑定一个 click 事件，并指向同一个事件处理程序

```html
<div>
 <span 
 v-for="(item,index) of 100000" 
 :key="index" 
 @click="handleClick">
 {{item}}
 </span>
</div>
```

2. 不使用事件代理，每个 span 节点绑定一个 click 事件，并指向不同的事件处理程序

```html
<div>
 <span 
 v-for="(item,index) of 100000" 
 :key="index" 
 @click="function () {}">
 {{item}}
 </span>
</div>
```

3. 使用事件代理

```html
<div @click="handleClick">
 <span 
 v-for="(item,index) of 100000" 
 :key="index">
 {{item}}
 </span>
</div>
```

可以通过 chrome devtools performance monitor 查看内存使用情况

可以看到使用事件代理无论是监听器数量和内存占用率都比前两者要少

 为什么 Vue 不适用事件委托

首先我们需要知道事件代理主要有什么作用？

1. 事件代理能够避免我们逐个的去给元素新增和删除事件
2. 事件代理比每一个元素都绑定一个事件性能要更好

从vue的角度上来看上面两点

* 在v-for中，我们直接用一个for循环就能在模板中将每个元素都绑定上事件，并且当组件销毁时，vue也会自动给我们将所有的事件处理器都移除掉。所以事件代理能做到的第一点vue已经给我们做到了
* 在v-for中，给元素绑定的都是相同的事件，所以除非上千行的元素需要加上事件，其实和使用事件代理的性能差别不大，所以也没必要用事件代理

## 271 [Vue] Vue3 的响应式原理?

* created_at: 2023-04-09T07:02:57Z
* updated_at: 2023-04-09T07:02:58Z
* labels: web框架, 腾讯
* milestone: 高

 该话题涉及的相关内容

* 原理：Proxy、track、trigger
* 新增属性
* 遍历后新增
* 遍历后删除或者清空
* 获取 keys
* 删除对象属性
* 判断属性是否存在
* 性能

推荐阅读文档： [资料](https://juejin.cn/post/6844904122479542285)

 响应式仓库

Vue3 不同于 Vue2 也体现在源码结构上，Vue3 把耦合性比较低的包分散在 `packages` 目录下单独发布成 `npm` 包。 这也是目前很流行的一种大型项目管理方式 `Monorepo`。

其中负责响应式部分的仓库就是 `@vue/reactivity`，它不涉及 Vue 的其他的任何部分，是非常非常 「正交」 的一种实现方式。

甚至可以`轻松的集成进 React` [资料](https://juejin.cn/post/6844904095594381325)

 区别

Proxy 和 Object.defineProperty 的使用方法看似很相似，其实 Proxy 是在 「更高维度」 上去拦截属性的修改的，怎么理解呢？

Vue2 中，对于给定的 data，如 `{ count: 1 }`，是需要根据具体的 key 也就是 `count`，去对「修改 data.count 」 和 「读取 data.count」进行拦截，也就是

```javascript
Object.defineProperty(data, 'count', {
  get () {},
  set () {}
})
```

必须预先知道要拦截的 key 是什么，这也就是为什么 Vue2 里对于对象上的新增属性无能为力。

而 Vue3 所使用的 Proxy，则是这样拦截的：

```javascript
new Proxy(data, {
  get (key) { },
  set (key, value) { }
})
```

可以看到，根本不需要关心具体的 key，它去拦截的是 「修改 data 上的任意 key」 和 「读取 data 上的任意 key」。

所以，不管是已有的 key 还是新增的 key，都逃不过它的魔爪。

但是 Proxy 更加强大的地方还在于 Proxy 除了 get 和 set，还可以拦截更多的操作符。

 简单的例子🌰

先写一个 Vue3 响应式的最小案例，本文的相关案例都只会用 `reactive` 和 `effect` 这两个 api。如果你了解过 React 中的 `useEffect`，相信你会对这个概念秒懂，Vue3 的 `effect` 不过就是去掉了手动声明依赖的「进化版」的 `useEffect`。

React 中手动声明 `[data.count]` 这个依赖的步骤被 Vue3 内部直接做掉了，在 `effect` 函数内部读取到 `data.count` 的时候，它就已经被收集作为依赖了。

Vue3：

```kotlin
// 响应式数据
const data = reactive({
 count: 1
})

// 观测变化
effect(() => console.log('count changed', data.count))

// 触发 console.log('count changed', data.count) 重新执行
data.count = 2

```

React：

```scss
// 数据
const [data, setData] = useState({
 count: 1
})

// 观测变化 需要手动声明依赖
useEffect(() => {
 console.log('count changed', data.count)
}, [data.count])

// 触发 console.log('count changed', data.count) 重新执行
setData({
 count: 2
})

```

也可以把 `effect` 中的回调函数联想到视图的重新渲染、 watch 的回调函数等等…… 它们是同样基于这套响应式机制的。

而本文的核心目的，就是探究这个基于 Proxy 的 reactive api，到底能强大到什么程度，能监听到用户对于什么程度的修改。

 讲讲原理

先最小化的讲解一下响应式的原理，其实就是在 Proxy 第二个参数 `handler` 也就是陷阱操作符中，拦截各种取值、赋值操作，依托 `track` 和 `trigger` 两个函数进行依赖收集和派发更新。

`track` 用来在读取时收集依赖。

`trigger` 用来在更新时触发依赖。

 track

```vbnet
function track(target: object, type: TrackOpTypes, key: unknown) {
 const depsMap = targetMap.get(target);
 // 收集依赖时 通过 key 建立一个 set
 let dep = new Set()
 targetMap.set(ITERATE_KEY, dep)
 // 这个 effect 可以先理解为更新函数 存放在 dep 里
 dep.add(effect)
}

```

`target` 是原对象。

`type` 是本次收集的类型，也就是收集依赖的时候用来标识是什么类型的操作，比如上文依赖中的类型就是 `get`，这个后续会详细讲解。

`key` 是指本次访问的是数据中的哪个 key，比如上文例子中收集依赖的 key 就是 `count`

首先全局会存在一个 `targetMap`，它用来建立 `数据 -> 依赖` 的映射，它是一个 WeakMap 数据结构。

而 `targetMap` 通过数据 `target`，可以获取到 `depsMap`，它用来存放这个数据对应的所有响应式依赖。

`depsMap` 的每一项则是一个 Set 数据结构，而这个 Set 就存放着对应 key 的更新函数。

是不是有点绕？我们用一个具体的例子来举例吧。

```ini
const target = { count: 1}
const data = reactive(target)

const effection = effect(() => {
 console.log(data.count)
})

```

对于这个例子的依赖关系，

1. 全局的 `targetMap` 是：

```js
targetMap: {
 { count: 1 }: dep
}

```

2. dep 则是

```js
dep: {
 count: Set { effection }
}

```

这样一层层的下去，就可以通过 `target` 找到 `count` 对应的更新函数 `effection` 了。

 trigger

这里是最小化的实现，仅仅为了便于理解原理，实际上要复杂很多，

其实 `type` 的作用很关键，先记住，后面会详细讲。

```typescript
export function trigger (
  target: object,
  type: TriggerOpTypes,
  key?: unknown
) {
  // 简化来说 就是通过 key 找到所有更新函数 依次执行
  const dep = targetMap.get(target)
  dep.get(key).forEach(effect => effect())
}
```

## 272 [Vue] vue3 的响应式库是独立出来的，它单独使用的时候是什么效果

* created_at: 2023-04-09T07:23:25Z
* updated_at: 2023-04-09T07:23:26Z
* labels: web框架, 腾讯
* milestone: 资深

vue3 的响应式库是独立出来的，它可以很方便的集成进 React， 作为 React 的状态管理库使用！

 使用示范

定义 store

```typescript
// store.ts
import { reactive, computed, effect } from '@vue/reactivity'

export const state = reactive({
  count: 0
})

const plusOne = computed(() => state.count + 1)

effect(() => {
  console.log('plusOne changed: ', plusOne)
})

const add = () => (state.count += 1)

export const mutations = {
  // mutation
  add
}

export const store = {
  state,
  computed: {
    plusOne
  }
}

export type Store = typeof store;
```

消费使用

```js
// Index.tsx
import { Provider, useStore } from 'rxv'
import { mutations, store, Store } from './store.ts'
function Count() {
 const countState = useStore((store: Store) => {
 const { state, computed } = store;
 const { count } = state;
 const { plusOne } = computed;

 return {
 count,
 plusOne,
 };
 });

 return (
 <Card hoverable style={{ marginBottom: 24 }}>
 <h1>计数器</h1>
 <div className="chunk">
 <div className="chunk">store中的count现在是 {countState.count}</div>
 <div className="chunk">computed值中的plusOne现在是 {countState.plusOne.value}</div>
 <Button onClick={mutations.add}>add</Button>
 </div>
 </Card>
 );
}

export default () => {
 return (
 <Provider value={store}>
 <Count />
 </Provider>
 );
};
```

可以看出，store的定义只用到了@vue/reactivity，而rxv只是在组件中做了一层桥接，连通了Vue3和React，正如它名字的含义：React x Vue。

 如何实现

只要effect能接入到React系统中，那么其他的api都没什么问题，因为它们只是去收集effect的依赖，去通知effect触发更新。

effect接受的是一个函数，而且effect还支持通过传入schedule参数来自定义依赖更新的时候需要触发什么函数，

而rxv的核心api: useStore接受的也是一个函数selector，它会让用户自己选择在组件中需要访问的数据。

把selector包装在effect中执行，去收集依赖。

指定依赖发生更新时，需要调用的函数是当前正在使用useStore的这个组件的forceUpdate强制渲染函数。

简单的看一下核心实现

share.ts

```typescript
export const useForceUpdate = () => {
  const [, forceUpdate] = useReducer(s => s + 1, 0)
  return forceUpdate
}

export const useEffection = (...effectArgs: Parameters<typeof effect>) => {
  // 用一个ref存储effection
  // effect函数只需要初始化执行一遍
  const effectionRef = useRef<ReactiveEffect>()
  if (!effectionRef.current) {
    effectionRef.current = effect(...effectArgs)
  }

  // 卸载组件后取消effect
  const stopEffect = () => {
    stop(effectionRef.current!)
  }
  useEffect(() => stopEffect, [])

  return effectionRef.current
}
```

核心逻辑在此

```typescript
import React, { useContext } from 'react'
import { useForceUpdate, useEffection } from './share'

type Selector<T, S> = (store: T) => S;

const StoreContext = React.createContext<any>(null)

const useStoreContext = () => {
  const contextValue = useContext(StoreContext)
  if (!contextValue) {
    throw new Error(
      'could not find store context value; please ensure the component is wrapped in a <Provider>'
    )
  }
  return contextValue
}

/**
在组件中读取全局状态
需要通过传入的函数收集依赖
 */
export const useStore = <T, S>(selector: Selector<T, S>): S => {
  const forceUpdate = useForceUpdate()
  const store = useStoreContext()

  const effection = useEffection(() => selector(store), {
    scheduler: job => {
      if (job() === undefined) return
      forceUpdate()
    },
    lazy: true
  })

  const value = effection()
  return value
}

export const Provider = StoreContext.Provider
```

参考文档：

* [资料](https://github.com/sl1673495/react-composition-api)
* [资料](https://juejin.cn/post/6844904054192078855)

## 273 ts 中 type 和 interface的区别

* created_at: 2023-04-09T07:29:21Z
* updated_at: 2023-08-06T07:44:59Z
* labels: TypeScript, 腾讯
* milestone: 中

 相同点

1. 都可以描述一个对象或者函数

* interface

```typescript
interface User {
 name: string
 age: number
}

interface SetUser {
 (name: string, age: number): void;
}
```

* ts

```typescript
type User = {
 name: string
 age: number
};

type SetUser = (name: string, age: number) => void;
```

2. 都允许拓展（extends） interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。

 差异点

* **type**
* type 可以声明基本类型别名，联合类型，元组等类型
* type 语句中还可以使用 typeof 获取实例的 类型进行赋值
* 其他骚操作

```typescript
type StringOrNumber = string | number;
type Text = string | { text: string };
type NameLookup = Dictionary<string, Person>;
type Callback<T> = (data: T) => void;
type Pair<T> = [T, T];
type Coordinates = Pair<number>;
type Tree<T> = T | { left: Tree<T>, right: Tree<T> };
```

* **interface**
* interface 能够声明合并

```typescript
interface User {
 name: string
 age: number
}

interface User {
 sex: string
}

/*
User 接口为 {
 name: string
 age: number
 sex: string
}
*/
```

一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。

## 274 实现一个类似关键字new功能的函数

* created_at: 2023-04-11T14:27:45Z
* updated_at: 2023-04-11T14:27:46Z
* labels: JavaScript
* milestone: 中

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

## 275 枚举和常量枚举的区别

* created_at: 2023-04-11T14:44:32Z
* updated_at: 2023-04-11T14:44:33Z
* labels: TypeScript, 腾讯
* milestone: 中

枚举和常量枚举（const枚举）：使用枚举可以清晰地表达意图或创建一组有区别的用例

```typescript
// 枚举
enum Color { Red, Green, Blue }

// 常量枚举
const enum Color { Red, Green, Blue }
```

区别：

1. 枚举会被编译时会编译成一个对象，可以被当作对象使用

```typescript
// 枚举
enum Color {
 Red,
 Green,
 Blue
}

const sisterAn = Color.Red
// 会被编译成 JavaScript 中的 var sisterAn = Color.Red
// 即在运行执行时，它将会查找变量 Color 和 Color.Red
```

2. const 枚举会在 typescript 编译期间被删除，const 枚举成员在使用的地方会被内联进来，避免额外的性能开销

```typescript
// 常量枚举
const enum Color {
 Red,
 Green,
 Blue
}

const sisterAn = Color.Red
// 会被编译成 JavaScript 中的 var sisterAn = 0
// 在运行时已经没有 Color 变量
```

由此可见，使用 常量枚举 会有更好的性能。

定义的枚举，在经过编译器编译后是一个对象，这个对象我们可以在程序运行时使用，前面有说到。但有时定义枚举可能只是为了让程序可读性更好，而不需要编译后的代码，即不需要编译成对象。typescript中考虑到这种情况，所以加入了 const enum (完全嵌入的枚举)。

## 276 const 和 readonly 的区别

* created_at: 2023-04-11T14:48:36Z
* updated_at: 2023-04-11T14:48:37Z
* labels: TypeScript, 腾讯
* milestone: 中

TypeScript 中不可变量的实现方法有两种：

使用 ES6 的 const 关键字声明的值类型
被 readonly 修饰的属性
2、TypeScript 中 readonly：

TypeScript 中的只读修饰符，可以声明更加严谨的可读属性。通常在 interface 、 Class 、 type 以及 array 和 tuple 类型中使用它，也可以用来定义一个函数的参数。

3、两者区别：

（1）const 用于变量， readonly 用于属性

（2）const 在运行时检查， readonly 在编译时检查

（3）const 声明的变量不得改变值，这意味着，const 一旦声明变量，就必须立即初始化，不能留到以后赋值；
readonly 修饰的属性能确保自身不能修改属性，但是当你把这个属性交给其它并没有这种保证的使用者（允许出于类型兼容性的原因），他们能改变。

```typescript
const foo: {
 readonly bar: number;
} = {
  bar: 123
}
function iMutateFoo (foo: { bar: number }) {
  foo.bar = 456
}
iMutateFoo(foo)
console.log(foo.bar) // 456
```

（4）const 保证的不是变量的值不得改动，而是变量指向的那个内存地址不得改动，例如使用 const 变量保存的数组，可以使用 push ， pop 等方法。
但是如果使用 `ReaonlyArray<number>` 声明的数组不能使用 push ， pop 等方法。

## 277 [Vue] watch 和 computed 的区别和理解

* created_at: 2023-04-11T15:23:05Z
* updated_at: 2023-04-11T15:23:06Z
* labels: web框架, 腾讯
* milestone: 中

**计算属性computed :**

1. 支持缓存，只有依赖数据发生改变，才会重新进行计算，计算属性可用于快速计算视图（View）中显示的属性。这些计算将被缓存，并且只在需要时更新。computed是计算属性的; 它会根据所依赖的数据动态显示新的计算结果, 该计算结果会被缓存起来。computed的值在getter执行后是会被缓存的。如果所依赖的数据发生改变时候, 就会重新调用getter来计算最新的结果。

2. 不支持异步，当computed内有异步操作时无效，无法监听数据的变化

3. computed 属性值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data中声明过或者父组件传递的props中的数据通过计算得到的值

4. 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用computed

5. 如果computed属性属性值是函数，那么默认会走get方法；函数的返回值就是属性的属性值；在computed中的，属性都有一个get和一个set方法，当数据变化时，调用set方法。

6. 适用于一些重复使用数据或复杂及费时的运算。我们可以把它放入computed中进行计算, 然后会在computed中缓存起来, 下次就可以直接获取了。

7. 如果我们需要的数据依赖于其他的数据的话, 我们可以把该数据设计为computed中。

8. computed 是基于响应性依赖来进行缓存的。只有在响应式依赖发生改变时它们才会重新求值, 也就是说, 当msg属性值没有发生改变时, 多次访问 reversedMsg 计算属性会立即返回之前缓存的计算结果, 而不会再次执行computed中的函数。但是methods方法中是每次调用, 都会执行函数的, methods它不是响应式的。

9. computed中的成员可以只定义一个函数作为只读属性, 也可以定义成 get/set变成可读写属性, 但是methods中的成员没有这样的。

**侦听属性watch：**

1.watch它是一个对data的数据监听回调, 当依赖的data的数据变化时, 会执行回调。在回调中会传入newVal和oldVal两个参数。Vue实列将会在实例化时调用$watch(), 他会遍历watch对象的每一个属性。watch的使用场景是：当在data中的某个数据发生变化时, 我们需要做一些操作, 或者当需要在数据变化时执行异步或开销较大的操作时. 我们就可以使用watch来进行监听。watch普通监听和深度监听不支持缓存，数据变，直接会触发相应的操作；

2.watch里面有一个属性为deep，含义是：是否深度监听某个对象的值, 该值默认为false。watch支持异步；

3.监听的函数接收两个参数，第一个参数是最新的值；第二个参数是输入之前的值；

4.当一个属性发生变化时，需要执行对应的操作；一对多；

5.监听数据必须是data中声明过或者父组件传递过来的props中的数据，当数据变化时，触发其他操作，函数有两个参数，

**watch 和 computed的区别是：**

相同点：他们两者都是观察页面数据变化的。

不同点：computed只有当依赖的数据变化时才会计算, 当数据没有变化时, 它会读取缓存数据。 watch每次都需要执行函数。watch更适用于数据变化时的异步操作。

当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。这是和computed最大的区别，请勿滥用。

## 278 大文件上传了解多少

* created_at: 2023-04-11T15:43:37Z
* updated_at: 2023-04-11T15:43:38Z
* labels: web应用场景, 百度
* milestone: 高

 大文件分片上传

如果太大的文件，比如一个视频1g 2g那么大，直接采用上面的栗子中的方法上传可能会出链接现超时的情况，而且也会超过服务端允许上传文件的大小限制，所以解决这个问题我们可以将文件进行分片上传，每次只上传很小的一部分 比如2M。

`Blob` 它表示原始数据, 也就是二进制数据，同时提供了对数据截取的方法 `slice`,而 `File` 继承了 `Blob` 的功能，所以可以直接使用此方法对数据进行分段截图。

过程如下：

* 把大文件进行分段 比如2M，发送到服务器携带一个标志，暂时用当前的时间戳，用于标识一个完整的文件
* 服务端保存各段文件
* 浏览器端所有分片上传完成，发送给服务端一个合并文件的请求
* 服务端根据文件标识、类型、各分片顺序进行文件合并
* 删除分片文件

客户端 JS 代码实现如下

```js
function submitUpload () {
  const chunkSize = 210241024// 分片大小 2M
  const file = document.getElementById('f1').files[0]
  const chunks = [] // 保存分片数据
  const token = (+new Date()); const // 时间戳
    name = file.name; let chunkCount = 0; let sendChunkCount = 0

  // 拆分文件 像操作字符串一样
  if (file.size > chunkSize) {
    // 拆分文件
    let start = 0; let end = 0
    while (true) {
      end += chunkSize
      const blob = file.slice(start, end)
      start += chunkSize

      // 截取的数据为空 则结束
      if (!blob.size) {
        // 拆分结束
        break
      }

      chunks.push(blob)// 保存分段数据
    }
  } else {
    chunks.push(file.slice(0))
  }

  chunkCount = chunks.length// 分片的个数

  // 没有做并发限制，较大文件导致并发过多，tcp 链接被占光 ，需要做下并发控制，比如只有4个在请求在发送

  for (let i = 0; i < chunkCount; i++) {
    const fd = new FormData() // 构造FormData对象
    fd.append('token', token)
    fd.append('f1', chunks[i])
    fd.append('index', i)
    xhrSend(fd, function () {
      sendChunkCount += 1
      if (sendChunkCount === chunkCount) { // 上传完成，发送合并请求
        console.log('上传完成，发送合并请求')
        const formD = new FormData()
        formD.append('type', 'merge')
        formD.append('token', token)
        formD.append('chunkCount', chunkCount)
        formD.append('filename', name)
        xhrSend(formD)
      }
    })
  }
}

function xhrSend (fd, cb) {

  const xhr = new XMLHttpRequest() // 创建对象
  xhr.open('POST', 'http://localhost:8100/', true)
  xhr.onreadystatechange = function () {
    console.log('state change', xhr.readyState)
    if (xhr.readyState == 4) {
      console.log(xhr.responseText)
      cb && cb()
    }
  }
  xhr.send(fd)// 发送
}

// 绑定提交事件
document.getElementById('btn-submit').addEventListener('click', submitUpload)
```

服务端 node 实现代码如下： 合并文件这里使用 stream pipe 实现，这样更节省内存，边读边写入，占用内存更小，效率更高，代码见fnMergeFile方法。

```js
// 二次处理文件，修改名称
app.use((ctx) => {
  const body = ctx.request.body
  let files = ctx.request.files ? ctx.request.files.f1 : []// 得到上传文件的数组
  const result = []
  const fileToken = ctx.request.body.token// 文件标识
  const fileIndex = ctx.request.body.index// 文件顺序

  if (files && !Array.isArray(files)) { // 单文件上传容错
    files = [files]
  }

  files && files.forEach(item => {
    const path = item.path
    const fname = item.name// 原文件名称
    const nextPath = path.slice(0, path.lastIndexOf('/') + 1) + fileIndex + '-' + fileToken
    if (item.size > 0 && path) {
      // 得到扩展名
      const extArr = fname.split('.')
      const ext = extArr[extArr.length - 1]
      // var nextPath = path + '.' + ext;
      // 重命名文件
      fs.renameSync(path, nextPath)
      result.push(uploadHost + nextPath.slice(nextPath.lastIndexOf('/') + 1))
    }
  })

  if (body.type === 'merge') { // 合并分片文件
    const filename = body.filename
    const chunkCount = body.chunkCount
    const folder = path.resolve(__dirname, '../static/uploads') + '/'

    const writeStream = fs.createWriteStream(`${folder}${filename}`)

    let cindex = 0

    // 合并文件
    function fnMergeFile () {
      const fname = `${folder}${cindex}-${fileToken}`
      const readStream = fs.createReadStream(fname)
      readStream.pipe(writeStream, { end: false })
      readStream.on('end', function () {
        fs.unlink(fname, function (err) {
          if (err) {
            throw err
          }
        })
        if (cindex + 1 < chunkCount) {
          cindex += 1
          fnMergeFile()
        }
      })
    }

    fnMergeFile()
    ctx.body = 'merge ok 200'
  }

})
```

 大文件上传断点续传

在上面我们实现了文件分片上传和最终的合并，现在要做的就是如何检测这些分片，不再重新上传即可。 这里我们可以在本地进行保存已上传成功的分片，重新上传的时候使用`spark-md5`来生成文件 hash，区分此文件是否已上传。

* 为每个分段生成 hash 值，使用 `spark-md5` 库
* 将上传成功的分段信息保存到本地
* 重新上传时，进行和本地分段 hash 值的对比，如果相同的话则跳过，继续下一个分段的上传

**方案一**： 保存在本地 `indexDB/localStorage` 等地方， 推荐使用 `localForage` 这个库
`npm install localforage`

**客户端 JS 代码**：

```js
// 获得本地缓存的数据
function getUploadedFromStorage () {
  return JSON.parse(localforage.getItem(saveChunkKey) || '{}')
}

// 写入缓存
function setUploadedToStorage (index) {
  const obj = getUploadedFromStorage()
  obj[index] = true
  localforage.setItem(saveChunkKey, JSON.stringify(obj))
}

// 分段对比

const uploadedInfo = getUploadedFromStorage()// 获得已上传的分段信息

for (let i = 0; i < chunkCount; i++) {
  console.log('index', i, uploadedInfo[i] ? '已上传过' : '未上传')

  if (uploadedInfo[i]) { // 对比分段
    sendChunkCount = i + 1// 记录已上传的索引
    continue// 如果已上传则跳过
  }
  var fd = new FormData() // 构造FormData对象
  fd.append('token', token)
  fd.append('f1', chunks[i])
  fd.append('index', i);

  (function (index) {
    xhrSend(fd, function () {
      sendChunkCount += 1
      // 将成功信息保存到本地
      setUploadedToStorage(index)
      if (sendChunkCount === chunkCount) {
        console.log('上传完成，发送合并请求')
        const formD = new FormData()
        formD.append('type', 'merge')
        formD.append('token', token)
        formD.append('chunkCount', chunkCount)
        formD.append('filename', name)
        xhrSend(formD)
      }
    })
  })(i)
}
```

**方案2**：服务端用于保存分片坐标信息， 返回给前端

需要服务端添加一个接口只是服务端需要增加一个接口。 基于上面一个栗子进行改进，服务端已保存了部分片段，客户端上传前需要从服务端获取已上传的分片信息（上面是保存在了本地浏览器），本地对比每个分片的 hash 值，跳过已上传的部分，只传未上传的分片。

方法1是从本地获取分片信息,这里只需要将此方法的能力改为从服务端获取分片信息就行了。

## 279 [代码实现] 简单实现一个洋葱模式中间件

* created_at: 2023-04-12T14:02:02Z
* updated_at: 2023-09-06T15:52:33Z
* labels: 代码实现/算法
* milestone: 高

洋葱模型是一种常用的中间件模型，例如在 Koa 框架中就广泛应用了这种模型。这种模型的特点是请求被传递到下一个中间件之前，需要先经过当前中间件处理，然后再逐层返回。

下面是一个简单的洋葱模型的示例代码：

```javascript
function middleware1 (next) {
  return function (ctx) {
    console.log('middleware1 before')
    next(ctx)
    console.log('middleware1 after')
  }
}

function middleware2 (next) {
  return function (ctx) {
    console.log('middleware2 before')
    next(ctx)
    console.log('middleware2 after')
  }
}

function middleware3 (next) {
  return function (ctx) {
    console.log('middleware3 before')
    next(ctx)
    console.log('middleware3 after')
  }
}

function compose (middlewares) {
  return function (ctx) {
    function dispatch (i) {
      if (i === middlewares.length) {
        return
      }
      const middleware = middlewares[i]
      const next = dispatch.bind(null, i + 1)
      middleware(next)(ctx)
    }
    dispatch(0)
  }
}

const middlewares = [middleware1, middleware2, middleware3]
const composed = compose(middlewares)
composed({})
```

这个示例中有三个中间件函数 `middleware1`、`middleware2` 和 `middleware3`，它们都是接受一个 `next` 函数作为参数的高阶函数。当这个中间件被执行时，它将接受一个 `ctx` 对象作为参数，并且调用 `next(ctx)` 将请求传递给下一个中间件。

`compose` 函数接受一个中间件函数数组作为参数，返回一个新的函数，这个函数可以将请求传递给第一个中间件函数。每个中间件函数都将接收一个 `next` 函数作为参数，并返回一个新的函数，这个新的函数将接收 `ctx` 对象作为参数，并且在调用 `next(ctx)` 之前和之后都会执行一些操作。当 `next(ctx)` 被调用时，请求将被传递到下一个中间件函数。

在 `composed` 函数中，我们将一个空的 `ctx` 对象作为参数传递给第一个中间件函数。`dispatch` 函数递归地调用中间件数组中的每一个中间件函数，并将 `ctx` 对象和下一个中间件函数作为参数传递。当最后一个中间件函数完成处理时，递归调用结束，请求处理完成。

## 283 [webpack] 构建流程是怎么样的？

* created_at: 2023-04-12T14:25:39Z
* updated_at: 2023-05-31T14:45:00Z
* labels: 工程化
* milestone: 高

`webpack` 的运行流程是一个串行的过程，它的工作流程就是将各个插件串联起来

在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条`webpack`机制中，去改变`webpack`的运作，使得整个系统扩展性良好

从启动到结束会依次执行以下三大步骤：

* 初始化流程：从配置文件和 `Shell` 语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数
* 编译构建流程：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理
* 输出流程：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统

 初始化流程

从配置文件和 `Shell` 语句中读取与合并参数，得出最终的参数

配置文件默认下为`webpack.config.js`，也或者通过命令的形式指定配置文件，主要作用是用于激活`webpack`的加载项和插件

`webpack` 将 `webpack.config.js` 中的各个配置项拷贝到 `options` 对象中，并加载用户配置的 `plugins`
完成上述步骤之后，则开始初始化`Compiler`编译对象，该对象掌控者`webpack`声明周期，不执行具体的任务，只是进行一些调度工作

```js
class Compiler extends Tapable {
 constructor(context) {
 super();
 this.hooks = {
 beforeCompile: new AsyncSeriesHook(["params"]),
 compile: new SyncHook(["params"]),
 afterCompile: new AsyncSeriesHook(["compilation"]),
 make: new AsyncParallelHook(["compilation"]),
 entryOption: new SyncBailHook(["context", "entry"])
 // 定义了很多不同类型的钩子
 };
 // ...
 }
}

function webpack(options) {
 var compiler = new Compiler();
 ...// 检查options,若watch字段为true,则开启watch线程
 return compiler;
}
...

```

`Compiler` 对象继承自 `Tapable`，初始化时定义了很多钩子函数

 编译构建流程

根据配置中的 `entry` 找出所有的入口文件

```js
module.exports = {
  entry: './src/file.js'
}
```

初始化完成后会调用`Compiler`的`run`来真正启动`webpack`编译构建流程，主要流程如下：

* `compile` 开始编译
* `make` 从入口点分析模块及其依赖的模块，创建这些模块对象
* `build-module` 构建模块
* `seal` 封装构建结果
* `emit` 把各个chunk输出到结果文件

 compile 编译

执行了`run`方法后，首先会触发`compile`，主要是构建一个`Compilation`对象

该对象是编译阶段的主要执行者，主要会依次下述流程：执行模块创建、依赖收集、分块、打包等主要任务的对象

 make 编译模块

当完成了上述的`compilation`对象后，就开始从`Entry`入口文件开始读取，主要执行`_addModuleChain()`函数，如下：

```js
_addModuleChain(context, dependency, onModule, callback) {
 ...
 // 根据依赖查找对应的工厂函数
 const Dep = // @type {DepConstructor} */ (dependency.constructor);
 const moduleFactory = this.dependencyFactories.get(Dep);

 // 调用工厂函数NormalModuleFactory的create来生成一个空的NormalModule对象
 moduleFactory.create({
 dependencies: [dependency]
 ...
 }, (err, module) => {
 ...
 const afterBuild = () => {
 this.processModuleDependencies(module, err => {
 if (err) return callback(err);
 callback(null, module);
 });
 };

 this.buildModule(module, false, null, null, err => {
 ...
 afterBuild();
 })
 })
}

```

过程如下：

`_addModuleChain`中接收参数`dependency`传入的入口依赖，使用对应的工厂函数`NormalModuleFactory.create`方法生成一个空的`module`对象

回调中会把此`module`存入`compilation.modules`对象和`dependencies.module`对象中，由于是入口文件，也会存入`compilation.entries`中

随后执行`buildModule`进入真正的构建模块`module`内容的过程

 build module 完成模块编译

这里主要调用配置的`loaders`，将我们的模块转成标准的`JS`模块

在用`Loader` 对一个模块转换完后，使用 `acorn` 解析转换后的内容，输出对应的抽象语法树（`AST`），以方便 `Webpack`后面对代码的分析

从配置的入口模块开始，分析其 `AST`，当遇到`require`等导入其它模块语句时，便将其加入到依赖的模块列表，同时对新找出的依赖模块递归分析，最终搞清所有模块的依赖关系

 输出流程

 seal 输出资源

`seal`方法主要是要生成`chunks`，对`chunks`进行一系列的优化操作，并生成要输出的代码

`webpack` 中的 `chunk` ，可以理解为配置在 `entry` 中的模块，或者是动态引入的模块

根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 `Chunk`，再把每个 `Chunk` 转换成一个单独的文件加入到输出列表

 emit 输出完成

在确定好输出内容后，根据配置确定输出的路径和文件名

```js
output: {
 path: path.resolve(__dirname, 'build'),
 filename: '[name].js'
}

```

在 `Compiler` 开始生成文件前，钩子 `emit` 会被执行，这是我们修改最终文件的最后一个机会

从而`webpack`整个打包过程则结束了

 小结

![](https://foruda.gitee.com/images/1681308948652266689/0b4f6e27_7819612.png)

## 284 [webpack] 核心库 - tapable 的设计思路与实现原理是什么？

* created_at: 2023-04-12T14:51:55Z
* updated_at: 2023-04-12T14:56:38Z
* labels: 工程化
* milestone: 资深

 Webpack Tapable 的设计思路

Webpack Tapable 的设计思路主要基于观察者模式（Observer Pattern）和发布-订阅模式（Publish-Subscribe Pattern），用于解耦各个插件之间的依赖关系，让插件能够独立作用于特定的钩子（Hook），从而实现可扩展性和灵活性。

具体来说，Tapable 采用了钩子（Hook）的概念，每个钩子对应一组事件，Webpack 在不同的时刻触发这些钩子，插件可以注册自己的事件处理函数到对应的钩子上，以实现各种功能。

为了避免插件之间的耦合，Tapable 将事件处理函数按照钩子类型分为同步钩子（Sync Hook）、异步钩子（Async Hook）、单向异步钩子（Async Parallel Hook）和多向异步钩子（Async Series Hook）四种类型。这样，不同类型的钩子对应着不同的事件处理顺序和调用方式，插件在注册自己的事件处理函数时，可以选择不同的钩子类型来适应不同的应用场景。

除此之外，Tapable 还提供了一些辅助方法和工具函数，用于方便地创建和管理钩子、向钩子注册事件处理函数、调用钩子的事件处理函数等。这些工具函数的设计思路也遵循了解耦、简单易用的原则，为插件开发提供了很大的便利性。

 Tapable 的使用

Webpack Tapable 的使用分为三个步骤：

1. 定义一个新的 Tapable 实例：在 Webpack 插件中定义一个新的 Tapable 实例，并定义需要监听的事件。

```javascript
const { SyncHook } = require('tapable')

class MyPlugin {
  constructor () {
    this.hooks = {
      beforeRun: new SyncHook(['compiler']),
      done: new SyncHook(['stats'])
    }
  }

  apply (compiler) {
    this.hooks.beforeRun.tap('MyPlugin', compiler => {
      console.log('Webpack is starting to run...')
    })

    this.hooks.done.tap('MyPlugin', stats => {
      console.log('Webpack has finished running.')
    })
  }
}
```

2. 触发事件：在 Webpack 的编译过程中，调用 Tapable 实例的触发方法，触发事件。

```javascript
compiler.hooks.beforeRun.call(compiler)
// Webpack is starting to run...

compiler.run((err, stats) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(stats)
  compiler.hooks.done.call(stats)
  // Webpack has finished running.
})
```

3. 注册插件：在 Webpack 的配置文件中，将插件实例注册到 Webpack 中。

```javascript
const MyPlugin = require('./my-plugin')

module.exports = {
  plugins: [new MyPlugin()]
}
```

以上是使用 Tapable 的基本流程，通过 Tapable 可以监听到编译过程中的各个事件，并对编译过程进行修改，从而实现各种插件。以下是一些常见的 Tapable 类型和用法：

* SyncHook：同步 Hook，按照注册的顺序同步执行所有回调函数。

```javascript
const { SyncHook } = require('tapable')

const hook = new SyncHook(['arg1', 'arg2'])

hook.tap('MyPlugin', (arg1, arg2) => {
  console.log(`Hook is triggered with arguments: ${arg1}, ${arg2}`)
})

hook.tap('MyPlugin', (arg1, arg2) => {
  console.log('Second callback is called')
})

hook.call('Hello', 'world')
// Hook is triggered with arguments: Hello, world
// Second callback is called
```

* AsyncParallelHook：异步 Hook，按照注册的顺序异步执行所有回调函数，不关心回调函数的返回值。

```javascript
const { AsyncParallelHook } = require('tapable')

const hook = new AsyncParallelHook(['arg1', 'arg2'])

hook.tap('MyPlugin', (arg1, arg2, callback) => {
  setTimeout(() => {
    console.log(`Hook is triggered with arguments: ${arg1}, ${arg2}`)
    callback()
  }, 1000)
})

hook.tap('MyPlugin', (arg1, arg2, callback) => {
  setTimeout(() => {
    console.log('Second callback is called')
    callback()
  }, 500)
})
```

 Tapable 是如何实现的？代码简单实现一下？

Webpack Tapable 是基于发布-订阅模式的一个插件系统，它提供了一组钩子函数，让插件可以在相应的时机执行自己的逻辑。

下面是一个简单的自定义 Tapable 的实现：

```javascript
class Tapable {
  constructor () {
    this.hooks = {}
  }

  // 注册事件监听函数
  tap (name, callback) {
    if (!this.hooks[name]) {
      this.hooks[name] = []
    }
    this.hooks[name].push(callback)
  }

  // 触发事件
  call (name, ...args) {
    const callbacks = this.hooks[name]
    if (callbacks && callbacks.length) {
      callbacks.forEach((callback) => callback(...args))
    }
  }
}
```

在这个例子中，我们定义了一个 `Tapable` 类，它有一个 `hooks` 对象属性，用于存储各个事件对应的监听函数。然后我们定义了 `tap` 方法，用于注册事件监听函数，以及 `call` 方法，用于触发事件。

下面是一个使用自定义 Tapable 的例子：

```javascript
const tapable = new Tapable()

tapable.tap('event1', (arg1, arg2) => {
  console.log('event1 is triggered with arguments:', arg1, arg2)
})

tapable.tap('event2', (arg1, arg2) => {
  console.log('event2 is triggered with arguments:', arg1, arg2)
})

tapable.call('event1', 'hello', 'world')
tapable.call('event2', 'foo', 'bar')
```

在这个例子中，我们定义了两个事件 `event1` 和 `event2`，并为它们注册了监听函数。当我们调用 `call` 方法触发事件时，注册的监听函数就会依次执行。

这个自定义 Tapable 的实现虽然简单，但它体现了 Tapable 的设计思路和核心功能。在实际使用中，Webpack 的 Tapable 提供了更多的功能和钩子，可以满足不同场景的需求。

## 285 [React] Hooks 实现原理是什么, 简单描述一下

* created_at: 2023-04-13T16:38:09Z
* updated_at: 2023-08-20T08:02:17Z
* labels: web框架, 百度
* milestone: 高

在探索 useEffect 原理的时候，一直被一个问题困扰：useEffect 作用和用途是什么？当然，用于函数的副作用这句话谁都会讲。举个例子吧：

```typescript jsx
function App() {
 const [num, setNum] = useState(0);

 useEffect(() => {
 // 模拟异步请求后端数据
 setTimeout(() => {
 setNum(num + 1);
 }, 1000);
 }, []);

 return <div>{!num ? "请求后端数据..." : `后端数据是 ${num}`}</div>;
}
```

这段代码，虽然这样组织可读性更高，毕竟可以将这个请求理解为函数的副作用。**但这并不是必要的**。完全可以不使用`useEffect`，直接使用`setTimeout`，并且它的回调函数中更新函数组件的 state。

在 useEffect 的第二个参数中，我们可以指定一个数组，如果下次渲染时，数组中的元素没变，那么就不会触发这个副作用（可以类比 Class 类的关于 nextprops 和 prevProps 的生命周期）。好处显然易见，**相比于直接裸写在函数组件顶层，useEffect 能根据需要，避免多余的 render**。

下面是一个不包括销毁副作用功能的 useEffect 的 TypeScript 实现：

```js
// 还是利用 Array + Cursor的思路
const allDeps: any[][] = [];
let effectCursor: number = 0;

function useEffect(callback: () => void, deps: any[]) {
 if (!allDeps[effectCursor]) {
 // 初次渲染：赋值 + 调用回调函数
 allDeps[effectCursor] = deps;
 ++effectCursor;
 callback();
 return;
 }

 const currenEffectCursor = effectCursor;
 const rawDeps = allDeps[currenEffectCursor];
 // 检测依赖项是否发生变化，发生变化需要重新render
 const isChanged = rawDeps.some(
 (dep: any, index: number) => dep !== deps[index]
 );
 if (isChanged) {
 callback();
 allDeps[effectCursor] = deps; // 感谢 juejin@carlzzz 的指正
 }
 ++effectCursor;
}

function render() {
 ReactDOM.render(<App />, document.getElementById("root"));
 effectCursor = 0; // 注意将 effectCursor 重置为0
}
```

对于 useEffect 的实现，配合下面案例的使用会更容易理解。当然，你也可以在这个 useEffect 中发起异步请求，并在接受数据后，调用 state 的更新函数，不会发生爆栈的情况。

```typescript jsx
function App() {
 const [num, setNum] = useState < number > 0;
 const [num2] = useState < number > 1;

 // 多次触发
 // 每次点击按钮，都会触发 setNum 函数
 // 副作用检测到 num 变化，会自动调用回调函数
 useEffect(() => {
 console.log("num update: ", num);
 }, [num]);

 // 仅第一次触发
 // 只会在compoentDidMount时，触发一次
 // 副作用函数不会多次执行
 useEffect(() => {
 console.log("num2 update: ", num2);
 }, [num2]);

 return (
 <div>
 <div>num: {num}</div>
 <div>
 <button onClick={() => setNum(num + 1)}>加 1</button>
 <button onClick={() => setNum(num - 1)}>减 1</button>
 </div>
 </div>
 );
}

```

useEffect 第一个回调函数可以返回一个用于销毁副作用的函数，相当于 Class 组件的 unmount 生命周期。这里为了方便说明，没有进行实现。

参考文档：

* [资料](https://juejin.cn/post/6844903975838285838)

## 286 [React] 父组件调用子组件的方法

* created_at: 2023-04-16T13:45:21Z
* updated_at: 2023-04-16T13:45:22Z
* labels: web框架, 腾讯
* milestone: 中

在React中，我们经常在子组件中调用父组件的方法，一般用props回调即可。但是有时候也需要在父组件中调用子组件的方法，通过这种方法实现高内聚。有多种方法，请按需服用。

 类组件中

 React.createRef()

* 优点：通俗易懂，用ref指向。

* 缺点：使用了HOC的子组件不可用，无法指向真是子组件

 比如一些常用的写法，mobx的@observer包裹的子组件就不适用此方法。

```scala
import React, { Component } from 'react';

class Sub extends Component {
 callback() {
 console.log('执行回调');
 }
 render() {
 return <div>子组件</div>;
 }
}

class Super extends Component {
 constructor(props) {
 super(props);
 this.sub = React.createRef();
 }
 handleOnClick() {
 this.sub.callback();
 }
 render() {
 return (
 <div>
 <Sub ref={this.sub}></Sub>
 </div>
 );
 }
}


```

 ref的函数式声明

* 优点：ref写法简洁
* 缺点：使用了HOC的子组件不可用，无法指向真是子组件（同上）

使用方法和上述的一样，就是定义ref的方式不同。

```csharp
...

<Sub ref={ref => this.sub = ref}></Sub>

...


```

 使用props自定义onRef属性

* 优点：假如子组件是嵌套了HOC，也可以指向真实子组件。
* 缺点：需要自定义props属性

```typescript
import React, { Component } from 'react';
import { observer } from 'mobx-react'

@observer
class Sub extends Component {
 componentDidMount(){
 // 将子组件指向父组件的变量
  this.props.onRef && this.props.onRef(this);
 }
 callback(){
  console.log("执行我")
 }
 render(){
  return (<div>子组件</div>);
 }
}

class Super extends Component {
 handleOnClick(){
 // 可以调用子组件方法
  this.Sub.callback();
 }
 render(){
  return (
 <div>
   <div onClick={this.handleOnClick}>click</div>
   <Sub onRef={ node => this.Sub = node }></Sub>
    </div>)
 }
}


```

 函数组件、Hook组件

 useImperativeHandle

* 优点： 1、写法简单易懂 2、假如子组件嵌套了HOC，也可以指向真实子组件
* 缺点： 1、需要自定义props属性 2、需要自定义暴露的方法

```javascript
import React, { useImperativeHandle } from 'react'
import { observer } from 'mobx-react'

const Parent = () => {
  const ChildRef = React.createRef()

  function handleOnClick () {
    ChildRef.current.func()
  }

  return (
 <div>
 <button onClick={handleOnClick}>click</button>
 <Child onRef={ChildRef} />
 </div>
  )
}

const Child = observer(props => {
  // 用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(props.onRef, () => {
    // 需要将暴露的接口返回出去
    return {
      func
    }
  })
  function func () {
    console.log('执行我')
  }
  return <div>子组件</div>
})

export default Parent
```

 forwardRef

使用forwardRef抛出子组件的ref

这个方法其实更适合自定义HOC。但问题是，withRouter、connect、Form.create等方法并不能抛出ref，假如Child本身就需要嵌套这些方法，那基本就不能混着用了。forwardRef本身也是用来抛出子元素，如input等原生元素的ref的，并不适合做组件ref抛出，因为组件的使用场景太复杂了。

```javascript
import React, { useRef, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'

const FancyInput = React.forwardRef((props, ref) => {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    }
  }))

  return <input ref={inputRef} type="text" />
})

const Sub = observer(FancyInput)

const App = props => {
  const fancyInputRef = useRef()

  return (
 <div>
 <FancyInput ref={fancyInputRef} />
 <button
 onClick={() => fancyInputRef.current.focus()}
 >父组件调用子组件的 focus</button>
 </div>
  )
}

export default App
```

 总结

父组件调子组件函数有两种情况

* 子组件无HOC嵌套：推荐使用ref直接调用
* 有HOC嵌套：推荐使用自定义props的方式

## 287 [webpack] 异步加载原理是啥

* created_at: 2023-04-16T14:27:01Z
* updated_at: 2023-04-16T14:27:02Z
* labels: 工程化, 腾讯
* milestone: 高

 Webpack 异步加载模块的方式主要有以下几种

1. 使用动态 import: 使用 ES6 的 `import()` 语法，动态加载模块。

```javascript
import('./path/to/module')
  .then(module => {
    // do something with module
  })
  .catch(error => {
    // handle error
  })
```

2. 使用 require.ensure: 异步加载模块并将其放置到指定的 chunk 中。

```javascript
require.ensure(['./path/to/module'], function (require) {
  const module = require('./path/to/module')
  // do something with module
})
```

3. 使用 bundle-loader: 将模块放置到一个单独的文件中，按需加载。

```javascript
const load = require('bundle-loader!./path/to/module')
load(function (module) {
  // do something with module
})
```

4. 使用webpack的require.ensure API

```javascript
require.ensure([], function (require) {
  // require dependencies
  const foo = require('./foo')
  // ...
})
```

5. 使用webpack的import动态导入

```javascript
import('./dynamic-module.js').then(module => {
  // do something with module
})
```

这些方式都可以在 Webpack 中使用，具体使用哪种方式，取决于具体的场景和需求。

 动态加载的原理

在 Webpack 中，异步加载组件的原理是利用动态导入（Dynamic import）特性。使用动态导入可以将模块的加载从编译时刻延迟到运行时刻。

具体来说，当 Webpack 打包代码时，遇到动态导入语句时不会将其打包进入主文件，而是将其单独打包为一个新的文件。在运行时，当代码需要加载该组件时，会通过网络请求动态加载该文件。

这样做的好处是可以减小主文件的体积，从而加快页面的加载速度，并且也可以提高代码的灵活性和可维护性。同时，Webpack 还可以对动态加载的文件进行代码分割和按需加载，进一步优化页面的性能。

在使用动态导入时，需要注意一些细节。例如，在支持动态导入的浏览器中，需要使用 `import()` 函数进行动态导入；而在不支持动态导入的浏览器中，需要使用 Webpack 提供的 `require.ensure` 或 `require.include` 等方法进行模块的异步加载。同时，还需要注意动态导入的兼容性和性能问题。

## 288 [webpack] externals 作用是啥？

* created_at: 2023-04-16T14:30:00Z
* updated_at: 2023-04-16T14:30:00Z
* labels: 工程化, 腾讯
* milestone: 高

`webpack` 中的 `externals` 配置项用于指定在打包时需要排除掉的模块，这些模块会被视为外部依赖，即不会被打包进最终的输出文件中，而是通过其他方式引入。

使用 `externals` 配置项可以使得打包后的代码文件更小，同时也可以在运行时从外部获取依赖，例如通过 CDN、全局变量或者通过 `require` 的方式等。

举个例子，假设我们需要在项目中引入 `jquery` 库，但我们并不想在打包的过程中将其打包进最终的输出文件中，而是从外部引入。我们可以通过以下的配置来实现：

```js
module.exports = {
  // ...
  externals: {
    jquery: 'jQuery'
  }
}
```

这里的 `externals` 配置项告诉 `webpack` 在打包时忽略 `jquery` 模块的引用，而在代码运行时，我们需要手动将 `jquery` 通过 `script` 标签引入，并将其暴露在全局变量 `jQuery` 下，例如：

```html
<script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script>
 window.jQuery = jQuery;
</script>
```

这样在代码中引入 `jquery` 模块时，`webpack` 就会将其作为外部依赖进行处理，而不是将其打包进输出文件中。

需要注意的是，使用 `externals` 配置项需要谨慎，因为如果在运行时无法正确获取到指定的外部依赖，就会导致代码运行出错。

## 289 [webpack] 分包的方式有哪些？

* created_at: 2023-04-16T14:37:43Z
* updated_at: 2023-04-16T14:37:44Z
* labels: 工程化
* milestone: 高

 在 Webpack 中，可以通过以下方式进行分包

1. 通过 `entry` 属性指定入口文件，在打包时，Webpack 会按照入口文件生成一个 chunk，每个 chunk 包含了一组代码块，最终生成一个或多个 bundle。

2. 通过 `SplitChunksPlugin` 插件对公共依赖进行分割。该插件会把公共依赖提取出来，形成一个或多个独立的 chunk，以便在多个 bundle 中共享。

3. 使用动态导入（Dynamic Import）技术进行按需加载。在代码中使用 `import()` 或 `require.ensure()`，Webpack 会将这些代码块按照配置的策略进行分割，生成一个或多个独立的 chunk。

4. 使用 `DllPlugin` 插件将一些不经常变化的代码提取出来，形成一个动态链接库（DLL）。在打包时，可以直接引用这个 DLL，而不必重复打包。

5. 通过 `externals` 属性将一些模块声明为外部依赖。在打包时，Webpack 会跳过这些模块的打包过程，而是在运行时从外部环境中加载。

 SplitChunksPlugin 是怎么对公共依赖进行分割的 ?

Webpack的SplitChunksPlugin插件是用来对公共依赖进行分割的，其原理是将公共模块提取出来，形成一个或多个共享块，并在需要时动态加载。这个插件会分析模块之间的依赖关系，将具有相同引用模块的代码块进行提取，以便于实现缓存和更快的加载。

SplitChunksPlugin的默认配置包括以下三个块：

1. 通过异步加载（异步块）生成的代码块
2. 与初始块（即入口点）共享的代码块
3. 在两个或更多块之间共享的代码块

其中，第二个块是最常见的，它包括从多个入口点引用的公共模块。我们可以通过以下示例来说明：

```javascript
// webpack.config.js
module.exports = {
  entry: {
    main: './src/main.js',
    other: './src/other.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
}
```

在上面的配置中，我们定义了两个入口点`main`和`other`，并将`SplitChunksPlugin`配置为将从`node_modules`目录中引用的代码提取到名为`vendors`的代码块中。这个代码块将被引用到我们的入口点中，以便于减少加载时间和提高性能。

当我们打包时，Webpack将分析这两个入口点，并发现它们都引用了`node_modules`目录下的依赖，于是将这些依赖提取到`vendors`代码块中。我们可以在`main.js`和`other.js`中看到这样的代码：

```javascript
import 'lodash' // 公共模块被引用
```

通过这种方式，Webpack能够将公共代码提取到单独的代码块中，以便于更高效地加载和缓存。

 webpack DllPlugin 是如何提取依赖的？

Webpack DllPlugin 是用于将某些库（例如第三方库）提前编译和打包，以便在开发和生产构建过程中减少依赖项的分析时间，提高打包速度的插件。

具体来说，DllPlugin 分为两个步骤：第一步是生成一个包含库的映射文件（manifest.json），第二步是在开发或生产构建中使用该映射文件来引入预编译的库。

DllPlugin 的基本原理是将库单独编译成一个或多个 dll 文件（动态链接库），同时生成一个 manifest.json 文件记录这些库文件的名称、路径等信息。在开发或生产构建过程中，通过引用 manifest.json 文件，将已经预编译好的库文件引入到项目中。这样可以避免在每次打包时都去分析和打包第三方库，提高构建速度。

下面是一个简单的例子：

在 webpack.config.dll.js 中定义打包的库：

```lua
luaCopy codeconst path = require('path');
const webpack = require('webpack');

module.exports = {
 mode: 'production',
 entry: {
 vendor: ['react', 'react-dom', 'lodash']
 },
 output: {
 path: path.join(__dirname, 'dist'),
 filename: '[name].dll.js',
 library: '[name]'
 },
 plugins: [
 new webpack.DllPlugin({
 name: '[name]',
 path: path.join(__dirname, 'dist', '[name].manifest.json')
 })
 ]
};
```

然后运行 `webpack --config webpack.config.dll.js`，会生成 `vendor.dll.js` 和 `vendor.manifest.json` 文件。

在开发或生产环境中，通过引入生成的 manifest.json 文件，将预编译好的库文件引入项目中：

```lua
luaCopy codeconst path = require('path');
const webpack = require('webpack');

module.exports = {
 mode: 'production',
 entry: {
 app: './src/index.js'
 },
 output: {
 path: path.join(__dirname, 'dist'),
 filename: '[name].js'
 },
 plugins: [
 new webpack.DllReferencePlugin({
 manifest: require('./dist/vendor.manifest.json')
 })
 ]
};
```

这样，在打包过程中，webpack 会自动将 `vendor.dll.js` 中包含的第三方库从项目中分离出来，而不需要重复打包和分析这些库。

## 290 [React] useState 是如何实现的？

* created_at: 2023-04-16T15:08:27Z
* updated_at: 2023-04-16T15:13:40Z
* labels: web框架
* milestone: 高

 hooks 的实现原理

流程图如下：renderWithHooks 根据current来判断当前是首次渲染还是更新。 hooks加载时调用对应的mount函数，更新时调用对应的update函数。
hooks生成单向链表，通过next连接，最后一个next指向null。 state hooks会生成update循环链表， effects会生成另外一个effectList循环链表。

![image](https://user-images.githubusercontent.com/22188674/232322402-c4a5a5a0-feec-4bda-92b8-775cc4dfdb1a.png)

 renderWithHooks

react-reconciler/src/ReactFiberHooks.js

```jsx
// renderWithHooks中判断是否是首次渲染
function renderWithHooks(current, workInProgress, Component, props, nextRenderLanes) {

 //当前正在渲染的车道
 renderLanes = nextRenderLanes
 currentlyRenderingFiber = workInProgress;
 //函数组件更新队列里存的effect
 workInProgress.updateQueue = null;
 //函数组件状态存的hooks的链表
 workInProgress.memoizedState = null;
 //如果有老的fiber,并且有老的hook链表
 if (current !== null && current.memoizedState !== null) {
 ReactCurrentDispatcher.current = HooksDispatcherOnUpdate;
 } else {
 ReactCurrentDispatcher.current = HooksDispatcherOnMount;
 }

//需要要函数组件执行前给ReactCurrentDispatcher.current赋值

 const children = Component(props);
 currentlyRenderingFiber = null;
 workInProgressHook = null;
 currentHook = null;
 renderLanes = NoLanes;
 return children;
}
```

`HooksDispatcherOnMount和HooksDispatcherOnUpdate`对象分别存放hooks的挂载函数和更新函数

 hooks的注册

```typescript jsx
function resolveDispatcher () {
  return ReactCurrentDispatcher.current
}

/**
 *
@param {*} reducer 处理函数，用于根据老状态和动作计算新状态
@param {*} initialArg 初始状态
 */

export function useState (initialState) {
  const dispatcher = resolveDispatcher()
  return dispatcher.useState(initialState)
}
```

![image](https://user-images.githubusercontent.com/22188674/232322419-c4db85f8-f162-40b7-84a5-affc349b9b82.png)

```typescript jsx
/**
构建新的hooks， 其主要作用是在 Fiber 树中遍历到某个组件时，
根据该组件的类型和当前处理阶段（mount 或 update），处理该组件的 Hook 状态。
 */
function updateWorkInProgressHook () {
  // 获取将要构建的新的hook的老hook
  if (currentHook === null) {
    const current = currentlyRenderingFiber.alternate
    currentHook = current.memoizedState
  } else {
    currentHook = currentHook.next
  }
  // 根据老hook创建新hook
  const newHook = {
    memoizedState: currentHook.memoizedState,
    queue: currentHook.queue,
    next: null,
    baseState: currentHook.baseState,
    baseQueue: currentHook.baseQueue
  }
  if (workInProgressHook === null) {
    currentlyRenderingFiber.memoizedState = workInProgressHook = newHook
  } else {
    workInProgressHook = workInProgressHook.next = newHook
  }
  return workInProgressHook
}
```

 useState 实现

接收一个初始状态值，返回一个数组，包含当前状态值和更新状态值的方法。可以通过调用更新方法来改变状态值，并触发组件的重新渲染

```typescript
//useState其实就是一个内置了reducer的useReducer

/**
hook的属性
hook.memoizedState 当前 hook真正显示出来的状态
hook.baseState 第一个跳过的更新之前的老状态
hook.queue.lastRenderedState 上一个计算的状态
 */

function mountState(initialState) {
 const hook = mountWorkInProgressHook();
 hook.memoizedState = hook.baseState = initialState;
 const queue = {
 pending: null,
 dispatch: null,
 lastRenderedReducer: baseStateReducer,//上一个reducer
 lastRenderedState: initialState//上一个state
 }
 hook.queue = queue;
 const dispatch = (queue.dispatch = dispatchSetState.bind(null, currentlyRenderingFiber, queue));
 return [hook.memoizedState, dispatch];
}

function dispatchSetState(fiber, queue, action) {
 // 获取当前的更新赛道 1
 const lane = requestUpdateLane();
 const update = {
 lane,//本次更新优先级就是1
 action,
 hasEagerState: false,//是否有急切的更新
 eagerState: null,//急切的更新状态
 next: null
 }
 const alternate = fiber.alternate;

 //当你派发动作后，我立刻用上一次的状态和上一次的reducer计算新状态
 //只要第一个更新都能进行此项优化
 if (fiber.lanes === NoLanes && (alternate === null || alternate.lanes == NoLanes)) {
 //先获取队列上的老的状态和老的reducer
 const { lastRenderedReducer, lastRenderedState } = queue;
 //使用上次的状态和上次的reducer结合本次action进行计算新状态
 const eagerState = lastRenderedReducer(lastRenderedState, action);
 update.hasEagerState = true;
 update.eagerState = eagerState;
 if (Object.is(eagerState, lastRenderedState)) {
 return;
 }
 }
 //下面是真正的入队更新，并调度更新逻辑
 const root = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
 const eventTime = requestEventTime();
 scheduleUpdateOnFiber(root, fiber, lane, eventTime);
}

//useState其实就是一个内置了reducer的useReducer
function baseStateReducer(state, action) {
 return typeof action === 'function' ? action(state) : action;
}

function updateState(initialState) {
 return updateReducer(baseStateReducer, initialState);
}

function updateReducer(reducer) {
 const hook = updateWorkInProgressHook();
 const queue = hook.queue;
 queue.lastRenderedReducer = reducer;
 const current = currentHook;
 let baseQueue = current.baseQueue;
 const pendingQueue = queue.pending;

 //把新旧更新链表合并
 if (pendingQueue !== null) {
 if (baseQueue !== null) {
 const baseFirst = baseQueue.next;
 const pendingFirst = pendingQueue.next;
 baseQueue.next = pendingFirst;
 pendingQueue.next = baseFirst;
 }
 current.baseQueue = baseQueue = pendingQueue;
 queue.pending = null;
 }
 if (baseQueue !== null) {
 const first = baseQueue.next;
 let newState = current.baseState;
 let newBaseState = null;
 let newBaseQueueFirst = null;
 let newBaseQueueLast = null;
 let update = first;
 do {
 const updateLane = update.lane;
 const shouldSkipUpdate = !isSubsetOfLanes(renderLanes, updateLane);
 if (shouldSkipUpdate) {
 const clone = {
 lane: updateLane,
 action: update.action,
 hasEagerState: update.hasEagerState,
 eagerState: update.eagerState,
 next: null,
 };

 // 省略部分代码

 hook.memoizedState = newState;
 hook.baseState = newBaseState;
 hook.baseQueue = newBaseQueueLast;
 queue.lastRenderedState = newState;
 }
 if (baseQueue === null) {
 queue.lanes = NoLanes;
 }
 const dispatch = queue.dispatch;
 return [hook.memoizedState, dispatch];
 }
```

 参考文档

* [资料](https://juejin.cn/post/6844903981836140552)

* [资料](https://juejin.cn/post/7219129726078533693)

## 291 promise 是否可以取消？

* created_at: 2023-04-16T15:41:38Z
* updated_at: 2023-05-23T14:58:45Z
* labels: JavaScript, 百度
* milestone: 中

在原生的 JavaScript Promise 中，它没有内建的取消机制。一旦一个 Promise 被创建并开始执行，就无法直接取消它。

通常情况下，Promise 一旦被创建，就会一直执行直到成功(resolve)或失败(reject)。但是，你可以通过一些手动的方式来模拟取消 Promise 的效果。下面是几种常见的方法：

1. 忽略 Promise 的结果：当你不关心 Promise 的结果时，你可以选择忽略它。这意味着你不会处理 Promise 的 resolve 或 reject 回调函数，也不会将结果传递给其他地方。这样做相当于"取消"了对 Promise 结果的关注。

2. 基于标志位的取消机制：你可以创建一个标志位变量，并在 Promise 的执行过程中检查该变量。如果标志位被设置为取消状态，你可以选择终止 Promise 的执行，例如抛出一个特定的错误或执行一个不会产生影响的操作。

3. 使用第三方库：有一些第三方库，如`p-cancelable`和`cancelable-promise`，提供了可取消 Promise 的功能。这些库通过封装 Promise，提供了额外的方法来取消 Promise 的执行。

需要注意的是，虽然你可以使用上述方法来模拟取消 Promise 的效果，但它们并不是 Promise 的原生功能。在实际开发中，如果你需要取消异步操作，可能需要使用其他异步编程模型或使用支持取消操作的第三方库。

**以下是几个使用例子**，展示了如何通过不同的方式模拟取消 Promise 的效果：

1. 忽略 Promise 的结果：

```javascript
const promise = new Promise((resolve, reject) => {
  // 执行异步操作...
})

// 不处理 Promise 的结果
```

在上述示例中，我们创建了一个 Promise，但没有处理它的 resolve 或 reject 回调函数。这意味着我们不关心 Promise 的结果，相当于忽略了它。

2. 基于标志位的取消机制：

```javascript
let canceled = false

const promise = new Promise((resolve, reject) => {
  // 执行异步操作...
  if (canceled) {
    reject(new Error('Promise canceled'))
  } else {
    // 继续正常处理
  }
})

// 在需要取消 Promise 的时候，将 canceled 标志位设置为 true
canceled = true
```

在上述示例中，我们创建了一个标志位变量`canceled`，并在 Promise 的执行过程中检查该变量。如果`canceled`被设置为`true`，我们选择拒绝 Promise，并传递一个特定的错误作为原因，表示 Promise 被取消。

3. 使用第三方库：

```javascript
import PCancelable from 'p-cancelable'

const promise = new PCancelable((resolve, reject, onCancel) => {
  // 执行异步操作...

  // 注册取消回调函数
  onCancel(() => {
    // 在取消时执行清理操作...
  })
})

// 取消 Promise
promise.cancel()
```

在上述示例中，我们使用第三方库`p-cancelable`，它提供了可取消 Promise 的功能。我们创建了一个`PCancelable`实例，并在 Promise 的执行过程中注册了一个取消回调函数。通过调用`promise.cancel()`方法，我们可以取消 Promise 的执行，并触发取消回调函数。

这些例子展示了如何通过不同的方式模拟取消 Promise 的效果。请注意，这些方法并不是 Promise 的原生功能，而是通过不同的实现方式来达到类似的效果。

## 292 H5 如何解决移动端适配问题

* created_at: 2023-04-16T15:46:24Z
* updated_at: 2023-04-16T15:46:25Z
* labels: web应用场景, 百度
* milestone: 中

移动端适配问题是指如何让网页在不同的移动设备上显示效果相同。下面是一些常见的 H5 移动端适配方案：

1. 使用 viewport 标签

通过设置 viewport 标签的 meta 属性，来控制页面的缩放比例和宽度，以适配不同的设备。例如：

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

其中 `width=device-width` 表示设置 viewport 的宽度为设备宽度，`initial-scale=1.0` 表示初始缩放比例为 1。

2. 使用 CSS3 的媒体查询

通过 CSS3 的媒体查询，根据不同的设备宽度设置不同的样式，以适配不同的设备。例如：

```arduino
arduinoCopy code@media screen and (max-width: 640px) {
 // 样式 */
}
```

其中 `max-width` 表示最大宽度，当屏幕宽度小于等于 640px 时，应用这些样式。

3. 使用 rem 单位

通过将 px 转化为 rem 单位，根据不同的设备字体大小设置不同的样式，以适配不同的设备。例如：

```css
html {
 font-size: 16px;
}

@media screen and (max-width: 640px) {
 html {
 font-size: 14px;
 }
}

<div {
 width: 10rem;
}
```

其中 `font-size: 16px` 表示将网页的基准字体大小设置为 16px，`font-size: 14px` 表示在屏幕宽度小于等于 640px 时将基准字体大小设置为 14px，`div` 元素的 `width: 10rem` 表示该元素的宽度为 10 个基准字体大小。

4. 使用 flexible 布局方案

通过使用 flexible 布局方案，将 px 转化为 rem 单位，并且动态计算根节点的字体大小，以适配不同的设备。例如使用 lib-flexible 库：

```html
arduinoCopy code// index.html
<script src="https://cdn.bootcdn.net/ajax/libs/lib-flexible/0.3.4/flexible.js"></script>

// index.js
import 'lib-flexible/flexible.js'
```

其中 `flexible.js` 会在页面加载时动态计算根节点的字体大小，并将 px 转化为 rem 单位。在样式中可以直接使用 px 单位，例如：

```css
<div {
 width: 100px;
 height: 100px;
}
```

这个 div 元素的大小会根据设备屏幕的宽度进行适配。

## 293 站点一键换肤的实现方式有哪些？

* created_at: 2023-04-16T15:53:28Z
* updated_at: 2023-04-16T15:53:30Z
* labels: web应用场景, 百度
* milestone: 中

 网站一键换肤实现方式有以下几种

1. 使用 CSS 变量：通过定义一些变量来控制颜色、字体等，然后在切换主题时动态修改这些变量的值。

2. 使用 class 切换：在 HTML 的根元素上添加不同的 class 名称，每个 class 名称对应不同的主题样式，在切换主题时切换根元素的 class 名称即可。

3. 使用 JavaScript 切换：使用 JavaScript 动态修改页面的样式，如修改元素的背景颜色、字体颜色等。

4. 使用 Less/Sass 等 CSS 预处理器：通过预处理器提供的变量、函数等功能来实现主题切换。

需要注意的是，无论采用哪种方式实现，都需要在设计页面样式时尽量遵循一些规范，如不使用绝对的像素值，使用相对单位等，以便更好地适应不同的屏幕大小和分辨率。

 以 less 举例， 详细讲述一下具体操作流程

通过 Less 实现网页换肤可以使用 CSS 变量和 Less 变量。CSS 变量的语法如下：

```css
:root {
 --primary-color: #007bff;
}

.btn {
 background-color: var(--primary-color);
}
```

而 Less 变量则是通过 Less 预编译器提供的变量语法来实现的，如下所示：

```less
lessCopy code@primary-color: #007bff;

.btn {
 background-color: @primary-color;
}
```

通过 Less 变量来实现网页换肤的方式可以在运行时使用 JavaScript 来修改 Less 变量的值，从而实现换肤效果。具体步骤如下：

1. 使用 Less 预编译器来编译 Less 文件为 CSS 文件。
2. 在 HTML 文件中引入编译后的 CSS 文件。
3. 在 JavaScript 中动态修改 Less 变量的值。
4. 使用 JavaScript 将新的 Less 变量值注入到编译后的 CSS 文件中。
5. 将注入后的 CSS 样式应用到页面上。

以下是一段实现通过 Less 变量来实现网页换肤的示例代码：

```less
// base.less 文件
@primary-color: #007bff;

.btn {
 background-color: @primary-color;
}

// dark.less 文件
@primary-color: #343a40;
```

```html
<!-- index.html 文件 -->
<!DOCTYPE html>
<html>
<head>
 <meta charset="UTF-8">
 <title>网页换肤示例</title>
 <link rel="stylesheet/less" type="text/css" href="base.less">
 <link rel="stylesheet/less" type="text/css" href="dark.less">
</head>
<body>
 <button class="btn">按钮</button>
 <script src="less.min.js"></script>
 <script>
 function changeSkin() {
 // 修改 Less 变量的值
 less.modifyVars({
 '@primary-color': '#28a745'
 }).then(() => {
 console.log('换肤成功');
 }).catch(() => {
 console.error('换肤失败');
 });
 }
 </script>
</body>
</html>
```

在上面的示例代码中，我们引入了两个 Less 文件，一个是 `base.less`，一个是 `dark.less`。其中 `base.less` 定义了一些基础的样式，而 `dark.less` 则是定义了一个暗黑色的主题样式。在 JavaScript 中，我们使用 `less.modifyVars` 方法来修改 Less 变量的值，从而实现了换肤的效果。当然，这只是一个简单的示例代码，实际的换肤功能还需要根据实际需求来进行设计和实现。

## 294 如何实现网页加载进度条？

* created_at: 2023-04-16T15:57:53Z
* updated_at: 2023-04-16T15:57:53Z
* labels: web应用场景, 百度
* milestone: 中

 监听静态资源加载情况

可以通过 `window.performance` 对象来监听页面资源加载进度。该对象提供了各种方法来获取资源加载的详细信息。

可以使用 `performance.getEntries()` 方法获取页面上所有的资源加载信息。可以使用该方法来监测每个资源的加载状态，计算加载时间，并据此来实现一个资源加载进度条。

下面是一个简单的实现方式：

```javascript
const resources = window.performance.getEntriesByType('resource');
const totalResources = resources.length;
let loadedResources = 0;

resources.forEach((resource) => {
 if (resource.initiatorType !== 'xmlhttprequest') {
 // 排除 AJAX 请求
 resource.onload = () => {
 loadedResources++;
 const progress = Math.round((loadedResources / totalResources)100);
 updateProgress(progress);
 };
 }
});

function updateProgress(progress) {
 // 更新进度条
}
```

该代码会遍历所有资源，并注册一个 `onload` 事件处理函数。当每个资源加载完成后，会更新 `loadedResources` 变量，并计算当前的进度百分比，然后调用 `updateProgress()` 函数来更新进度条。需要注意的是，这里排除了 AJAX 请求，因为它们不属于页面资源。

当所有资源加载完成后，页面就会完全加载。

 实现进度条

网页加载进度条可以通过前端技术实现，一般的实现思路是通过监听浏览器的页面加载事件和资源加载事件，来实时更新进度条的状态。下面介绍两种实现方式。

 1. 使用原生进度条

在 HTML5 中提供了 `progress` 元素，可以通过它来实现一个原生的进度条。

```html
<progress id="progressBar" value="0" max="100"></progress>
```

然后在 JavaScript 中，监听页面加载事件和资源加载事件，实时更新 `progress` 元素的 `value` 属性。

```javascript
const progressBar = document.getElementById('progressBar');

window.addEventListener('load', () => {
 progressBar.value = 100;
});

document.addEventListener('readystatechange', () => {
 const progress = Math.floor((document.readyState / 4)100);
 progressBar.value = progress;
});
```

 2. 使用第三方库

使用第三方库可以更加方便地实现网页加载进度条，下面以 `nprogress` 库为例：

1. 安装 `nprogress` 库

```bash
bashCopy codenpm install nprogress --save
```

2. 在页面中引入 `nprogress.css` 和 `nprogress.js`

```html
<link rel="stylesheet" href="/node_modules/nprogress/nprogress.css">
<script src="/node_modules/nprogress/nprogress.js"></script>
```

3. 在 JavaScript 中初始化 `nprogress` 并监听页面加载事件和资源加载事件

```javascript
// 初始化 nprogress
NProgress.configure({ showSpinner: false })

// 监听页面加载事件
window.addEventListener('load', () => {
  NProgress.done()
})

// 监听资源加载事件
document.addEventListener('readystatechange', () => {
  if (document.readyState === 'interactive') {
    NProgress.start()
  } else if (document.readyState === 'complete') {
    NProgress.done()
  }
})
```

使用 `nprogress` 可以自定义进度条的样式，同时也提供了更多的 API 供我们使用，比如说手动控制进度条的显示和隐藏，以及支持 Promise 和 Ajax 请求的进度条等等。

## 295 [React] forwardRef 作用是什么？【热度: 2,628】

* created_at: 2023-04-17T15:54:15Z
* updated_at: 2023-04-18T01:34:07Z
* labels: web框架
* milestone: 中

`forwardRef` 是 React 提供的一个高阶函数，它可以让你在函数组件中访问子组件的 ref，并把该 ref 传递给子组件。

使用 `forwardRef` 的主要场景是，当你需要访问子组件的 DOM 节点或实例时，比如要操作子组件的滚动条、聚焦输入框等等。在这些场景下，需要用到 `ref`，而 `ref` 又不能直接在函数组件中使用。

下面是 `forwardRef` 的基本使用方式：

```jsx
jsxCopy codeimport React, { forwardRef } from 'react';

const MyComponent = forwardRef((props, ref) => {
 return <input type="text" ref={ref} />;
});

function App() {
 const inputRef = React.createRef();

 const handleClick = () => {
 inputRef.current.focus();
 };

 return (
 <div>
 <MyComponent ref={inputRef} />
 <button onClick={handleClick}>Focus Input</button>
 </div>
 );
}
```

在上面的例子中，我们创建了一个 `MyComponent` 组件，并通过 `forwardRef` 来包裹它。这样，`MyComponent` 就可以在 props 中接收一个 `ref` 属性，而 `forwardRef` 将会将该属性转发到子组件中。

在 `App` 组件中，我们创建了一个 `inputRef` 对象，并将它作为 `MyComponent` 的 `ref` 属性传递给了 `MyComponent` 组件。然后，我们在 `handleClick` 函数中使用 `inputRef` 来聚焦输入框。

需要注意的是，`forwardRef` 的回调函数接收两个参数：`props` 和 `ref`。其中，`props` 是组件的属性对象，`ref` 是回调函数中定义的 ref 对象。在函数组件中，我们必须将 `ref` 传递给要访问的子组件，否则 `ref` 将无法访问到子组件的 DOM 节点或实例。

## 296 [代码实现] 数字千分化的实现方式有哪些？用代码实现一下【热度: 3,309】

* created_at: 2023-04-18T15:48:05Z
* updated_at: 2023-09-06T15:52:29Z
* labels: 代码实现/算法
* milestone: 中

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

## 297 CDN 了解多少？【热度: 413】

* created_at: 2023-04-18T16:05:14Z
* updated_at: 2023-04-23T13:11:12Z
* labels: 网络
* milestone: 中

 CDN 是什么

CDN（Content Delivery Network）是指内容分发网络，它是由分布在不同地理位置的多台服务器组成的网络系统，用于更快地传递互联网内容和服务。CDN 可以缓存静态资源，加速用户访问速度，降低带宽消耗和服务器压力。

1. CDN 的工作原理：CDN 通过将资源缓存在离用户更近的边缘节点，使用户可以更快地获取所需的内容。当用户访问一个包含 CDN 链接的网站时，CDN 会从最接近用户的节点返回内容。

2. CDN 的优点：CDN 可以加速网站的加载速度、减轻源服务器的负载、提高网站的可用性和可靠性，同时还可以降低网络带宽使用和成本。

3. CDN 的缓存策略：CDN 缓存可以采用不同的缓存策略，如时间戳策略、版本号策略、缓存控制策略等，以便尽可能地避免缓存出错或不及时更新。

4. CDN 的常见问题：CDN 存在一些常见的问题，如缓存不一致、缓存雪崩、CDN 费用等。需要开发者和运维人员注意这些问题，并采取相应的解决方案。

5. CDN 的选择：CDN 服务提供商众多，选择合适的 CDN 服务提供商需要考虑许多因素，如价格、性能、服务范围、支持的功能和协议等。

6. CDN 的应用：CDN 被广泛应用于各种场景，如网站加速、视频点播、直播、在线游戏等。在实际应用中，需要根据具体场景来选择合适的 CDN 服务提供商和缓存策略，以达到最佳的效果。

 CDN 预热

CDN预热指在流量大涨之前，提前将资源缓存到CDN节点中，以加快用户请求响应速度，提高用户访问质量和稳定性的一种行为。通过提前将内容分发到CDN节点上，可以减少用户访问时由于第一次请求资源而导致的等待时间，从而提升用户的体验感受。一般来说，CDN预热是指在特定时间（如发布活动、重要通知等）前对资源进行CDN缓存的操作。预热完成后，用户请求相关资源时，就可以直接从CDN节点获取资源，而无需请求源站，从而提高网站的访问速度和稳定性。

 CDN 刷新是什么

CDN刷新指的是CDN缓存中的文件被更新后，需要将CDN服务器上缓存的旧文件清除，让其重新从源站拉取最新的内容，以保证CDN上的文件与源站文件保持一致。

在网站更新或修改静态资源文件后，如果用户再次请求该文件，CDN服务器上的缓存仍然是旧版本的，用户就会访问到过时的文件，影响用户体验。为了解决这个问题，CDN提供了刷新服务，即将缓存的旧版本强制失效，让用户请求时可以快速访问到更新后的最新版本。

CDN刷新通常有两种方式：

1. 目录刷新：将某个目录下的所有文件都刷新，比较适用于网站进行大规模更新。

2. 文件刷新：只将某个具体的文件刷新，比较适用于紧急情况下需要快速更新某个文件的情况。但由于刷新一次需要一定时间，因此刷新频率需要控制在合理的范围内，以避免影响CDN服务器性能和稳定性。

 CDN 缓存策略有哪些

CDN 缓存策略指的是在 CDN 服务器上缓存哪些资源以及缓存的有效期等相关规则。常见的 CDN 缓存策略有以下几种：

1. 强制缓存：在资源的有效期内，浏览器每次请求该资源时，都直接从浏览器缓存中获取，不发送请求到服务器。可以通过设置响应头的 Cache-Control 和 Expires 字段实现。

2. 协商缓存：在资源的有效期过期后，浏览器向服务器发起请求，并通过 If-Modified-Since 或者 If-None-Match 等字段验证资源是否有更新。如果资源未更新，服务器返回 304 Not Modified 响应，浏览器直接从本地缓存中获取资源。可以通过设置响应头的 Last-Modified 和 ETag 字段实现。

3. CDN 边缘缓存：CDN 服务器缓存来自源站的资源，并将其分发给全球各地的用户。当用户请求某个资源时，CDN 服务器会根据缓存策略判断是否需要重新向源站请求资源。常见的缓存策略包括时间戳缓存、版本号缓存、目录级别缓存、参数级别缓存等。

4. 客户端缓存：客户端缓存是指浏览器在本地缓存响应资源，下次请求该资源时可以直接从本地获取。可以通过设置响应头的 Cache-Control 和 Expires 字段实现。

5. 源站缓存：源站缓存是指将静态资源放到应用服务器上缓存，在应用服务器上缓存的时间要短于 CDN 边缘缓存的时间。当 CDN 服务器的缓存过期或者未命中时，CDN 服务器会向源站发起请求获取最新的资源，并将其缓存到 CDN 服务器上。

 参考文档

* [资料](https://juejin.cn/post/6913704568325046279)

* [资料](https://juejin.cn/post/7064952956201730062)
* [资料](https://juejin.cn/post/7166782260933296142)

## 298 git merge 和 git rebase 区别【热度: 1,150】

* created_at: 2023-04-18T16:20:56Z
* updated_at: 2023-11-26T15:22:03Z
* labels: web应用场景
* milestone: 中

`git merge` 和 `git rebase` 都是用来合并不同分支的命令，但是它们的实现方式和结果不同。

`git merge` 会把两个分支的最新提交点合并起来，生成一个新的合并提交，并且会保留两个分支各自的提交记录，形成一条分支合并的历史线。合并后的代码中，两个分支的修改都会被保留下来。

`git rebase` 也是用来合并分支的，但是它会将当前分支的提交“移动”到目标分支的最后面，然后再将目标分支的修改合并进来。这个过程中，会改变当前分支的提交记录，使它看起来像是在目标分支上进行的修改，从而保持一条干净的提交历史。如果发生冲突，需要手动解决冲突并进行提交。

总的来说，`git merge` 适合用于简单的合并场景，保留分支历史记录，而 `git rebase` 则适合用于合并长期存在分支的场景，可以保持一个干净的提交历史。但是在合并公共分支时，使用 `git rebase` 可能会破坏代码的协作性，因此需要谨慎使用。

---------------------
补充更新：

假设你现在基于远程分支"origin"，创建一个叫"mywork"的分支。

`$ git checkout -b mywork origin`

![image](https://github.com/pro-collection/interview-question/assets/22188674/b40fdca9-4844-4996-b008-f24d0d486acb)

现在我们在这个分支做一些修改，然后生成两个提交(commit).

```
$ vi file.txt
$ git commit
$ vi otherfile.txt
$ git commit
...
```

但是与此同时，有些人也在"origin"分支上做了一些修改并且做了提交了. 这就意味着"origin"和"mywork"这两个分支各自"前进"了，它们之间"分叉"了。

![image](https://github.com/pro-collection/interview-question/assets/22188674/82286270-6422-4b34-a1b3-9d5367b50a78)

在这里，你可以用"pull"命令把"origin"分支上的修改拉下来并且和你的修改合并； 结果看起来就像一个新的"合并的提交"(merge commit):

![image](https://github.com/pro-collection/interview-question/assets/22188674/5f29e4cd-e1c5-4b8d-b4cd-2dd4db047e8a)

但是，如果你想让"mywork"分支历史看起来像没有经过任何合并一样，你也许可以用 `git rebase`

```
git checkout mywork
git rebase origin
```

这些命令会把你的"mywork"分支里的每个提交(commit)取消掉，并且把它们临时 保存为补丁(patch)(这些补丁放到".git/rebase"目录中),然后把"mywork"分支更新 到最新的"origin"分支，最后把保存的这些补丁应用到"mywork"分支上。

![image](https://github.com/pro-collection/interview-question/assets/22188674/e0157351-163a-40e9-85d5-fbc1e35f5ba8)

当'mywork'分支更新之后，它会指向这些新创建的提交(commit),而那些老的提交会被丢弃。 如果运行垃圾收集命令(pruning garbage collection), 这些被丢弃的提交就会删除.

![image](https://github.com/pro-collection/interview-question/assets/22188674/4937b995-8e48-4c32-b101-4fb551b60d01)

现在我们可以看一下用合并(merge)和用rebase所产生的历史的区别：

![image](https://github.com/pro-collection/interview-question/assets/22188674/0d85e67e-8366-4591-8118-50695129dd3c)
![image](https://github.com/pro-collection/interview-question/assets/22188674/b871d1a2-b8e5-4807-9b97-2de8ec103e07)

在rebase的过程中，也许会出现冲突(conflict). 在这种情况，Git会停止rebase并会让你去解决 冲突；在解决完冲突后，用"git-add"命令去更新这些内容的索引(index), 然后，你无需执行 git-commit,只要执行:

`$ git rebase --continue`

这样git会继续应用(apply)余下的补丁。

在任何时候，你可以用--abort参数来终止rebase的行动，并且"mywork" 分支会回到rebase开始前的状态。

`$ git rebase --abort`

## 299 [React] React 18 的新特性有哪些【热度: 989】

* created_at: 2023-04-20T16:26:15Z
* updated_at: 2024-05-12T06:11:51Z
* labels: web框架
* milestone: 高

 18 的新特性

 新功能：自动批量处理

批量处理是指 React 将多个状态更新分组到一个重新渲染中，以获得更好的性能。如果没有自动批量处理，我们只对 React 事件处理程序中的更新进行批量处理。默认情况下，React 不会对
Promise、setTimeout、原生事件处理程序或任何其它事件中的更新进行批量处理。有了自动批量处理，这些更新将被自动的批量处理。

```typescript jsx
// 之前：只对 React 事件执行批量处理
setTimeout(() => {
  setCount(c => c + 1)
  setFlag(f => !f)
  // React 将渲染两次，每次状态更新一次（无批量处理）
}, 1000)

// 之后：超时、Promises、本机事件处理程序
// 或任何其他事件内的更新是批处理的。

setTimeout(() => {
  setCount(c => c + 1)
  setFlag(f => !f)
  // React 只会在最终重新渲染一次（这就是批量处理！）
}, 1000)
```

 新功能：过渡

过渡是 React 中的一个新概念，用以区分紧急和非紧急更新。

* 紧急更新 反映了直接的交互，如输入、点击、按压等。
* 过渡更新 将 UI 从一个视图过渡到另一个。

像输入、点击或按压这样的紧急更新，需要立即响应，以符合我们对物理对象行为方式的直觉。否则他们就会感到“不对劲儿”。然而，过渡是不同的，因为用户并不期望在屏幕上看到每个中间值。

例如，当你在一个下拉菜单中选择一个过滤器时，你希望过滤器按钮本身在你点击时能立即做出反应。然而，实际结果可能会单独过渡。一个小的延迟将是难以察觉的，而且往往是预期的。并且，如果你在结果渲染完成之前再次改变过滤器，你只关心看到最新的结果。

通常情况下，为了获得最佳的用户体验，一个用户输入应该同时导致一个紧急更新和一个非紧急更新。你可以在输入事件中使用 startTransition API 来告知 React 哪些是紧急更新，哪些是“过渡”：

```typescript jsx
import { startTransition } from 'react'

// 紧急：显示输入的内容
setInputValue(input)

// 将内部的任何状态更新都标记为过渡
startTransition(() => {
  // 过渡：显示结果
  setSearchQuery(input)
})
```

被 startTransition 包裹的更新被当作非紧急事件处理，如有更紧急更新，如点击或按键，则会被中断。如果一个过渡被用户中断（例如，连续输入多个字符），React 会丢弃未完成的无效的渲染，而只渲染最新的更新。

* useTransition：一个启动过渡的 Hook，包括一个值以跟踪待定状态。
* startTransition：当 Hook 不能使用时，一个启动过渡的方法。

过渡将选择并发渲染，这允许更新被中断。如果内容重新挂起，过渡也会告诉 React 继续显示当前内容，同时在后台渲染过渡内容。

 新的 Suspense 特性

如果组件树的某一部分还没有准备好被显示，Suspense 可以让你声明式地指定加载状态：

```typescript jsx
<Suspense fallback={<Spinner />}>
 <Comments />
</Suspense>
```

Suspense 使“UI 加载状态”成为 React 编程模型中的第一类声明式概念。这让我们可以在它上面建立更高层次的功能。

几年前，我们推出了一个有限的 Suspense 版本。然而，唯一支持的用例是用 React.lazy 拆分代码，且在服务端渲染时根本不支持。

在 React 18 中，我们增加了对服务端的 Suspense 支持，并使用并发渲染特性扩展了其功能。

React 18 中的 Suspense 在与过渡 API 结合时效果最好。如果你在过渡期间挂起，React 将防止已经可见的内容被回退取代。相反，React 会延迟渲染，直到有足够的数据加载，以防止出现糟糕的加载状态。

 新的客户端、服务端渲染 API

在这个版本中，我们借此机会重新设计了我们为在客户端和服务端渲染所暴露的 API。这些更改允许用户在升级到 React 18 中的新 API 时继续使用 React 17 模式下的旧 API。

**React DOM Client**

这些新的 API 现在从 react-dom/client 导出：

* createRoot：新的创建根的方法，以进行 render 或 unmount。使用它替代 ReactDOM.render。没有它，React 18 的新功能就不能工作。
* hydrateRoot：新的方法用以创建服务端渲染应用。使用它替代 ReactDOM.hydrate 与新的 React DOM 服务端 API 一起使用。没有它，React 18 的新功能就不能工作。

createRoot 和 hydrateRoot 都接受一个新的选项，叫做 onRecoverableError，以防你想在 React render 或 hydrate 从错误恢复时得到通知，以便记录。默认情况下，React会使用
reportError，或在较旧的浏览器中使用 console.error。

**React DOM Server**

这些新的 API 现在从 react-dom/server 导出，并且完全支持服务端的流式 Suspense：

* renderToPipeableStream：用于 Node 环境下的 Stream。
* renderToReadableStream：用于现代边缘运行环境，如 Deno 和 Cloudflare workers。

现有的 renderToString 方法仍然可用，但不鼓励使用。

 新的严格模式行为

在未来，我们希望增加一个功能，允许 React 在保留状态的同时增加和删除部分的 UI。例如，当用户从一个屏幕切出并切回时，React 应该能够立即显示之前的屏幕。要做到这一点，React 将使用与之前相同的组件状态来卸载和重新装载树。

这个功能将给 React 应用带来更好的开箱即用的性能，但需要组件对 effect 被多次装载和销毁具有弹性。大多数 effect 会正常工作而无需任何更改，但有些 effect 假设它们只被装载或销毁一次。

为了帮助浮现这些问题，React 18 为严格模式引入了一个新的仅用于开发的检查。每当组件第一次装载时，此检查将自动卸载并重新装载每个组件，并在第二次装载时恢复先前的状态。

在这个变化之前，React 会装载组件并创建 effect：

```
* React 装载组件
layout effect 创建
effect 创建
```

在 React 18 的严格模式下，React 会在开发模式下模拟卸载和重新装载组件：

```
* React 装载组件
layout effect 创建
effect 创建
* React 模拟卸载组件
layout effect 销毁
effect 销毁
* React 模拟装载组件（使用之前的状态）
layout effect 创建
effect 创建
```

 新的 Hook

**useId**

useId 是一个新的 Hook，用于在客户端和服务端上生成唯一 ID，避免 hydrate 不匹配。它主要用于组件库，这些库集成了需要唯一 ID 的可访问性 API。这解决了 React 17 及更低版本中已经存在的问题，但在 React
18 中更为重要，因为新的流式服务端渲染器对 HTML 的无序交付方式。

**useTransition**

useTransition 和 startTransition 让你把一些状态更新标记为不紧急。其他状态更新在默认情况下被认为是紧急的。React
将允许紧急的状态更新（例如，更新一个文本输入）中断非紧急的状态更新（例如，渲染一个搜索结果列表）。

**useDeferredValue**

useDeferredValue 让你推迟重新渲染树的非紧急部分。它类似于 debounce，但与之相比有一些优势。它没有固定的时间延迟，React 会在第一次渲染反映在屏幕后立即尝试延迟渲染。延迟渲染是可中断的，它不会阻塞用户输入。

**useSyncExternalStore**

useSyncExternalStore 是一个新的 Hook，它允许外部存储支持并发读取，通过强制更新到 store 以同步。在实现对外部数据源的订阅时，它消除了对 useEffect 的需求，并被推荐给任何与 React
外部状态集成的库。

**useInsertionEffect**

useInsertionEffect 是一个新的 Hook ，允许 CSS-in-JS 库解决在渲染中注入样式的性能问题。除非你已经建立了一个 CSS-in-JS 库，否则我们不希望你使用它。这个 Hook 将在 DOM 被变更后运行，但在
layout effect 读取新布局之前。这解决了一个在 React 17 及以下版本中已经存在的问题，但在 React 18 中更加重要，因为 React 在并发渲染时向浏览器让步，给它一个重新计算布局的机会。

 Concurrent Mode（并发模式）

Concurrent Mode（以下简称 CM）翻译叫并发模式，这个概念我们或许已经听过很多次了，实际上，在去年这个概念已经很成熟了，在 React 17 中就可以通过一些试验性的api开启 CM。

并发模式可帮助应用保持响应，并根据用户的设备性能和网速进行适当的调整，该模式通过使渲染可中断来修复阻塞渲染限制。在 Concurrent 模式中，React 可以同时更新多个状态。

说的太复杂可能有点拗口，总结一句话就是：**React 17 和 React 18 的区别就是：从同步不可中断更新变成了异步可中断更新。**

为了更好的管理root节点，React 18 引入了一个新的 root API，新的 root API 还支持 new concurrent renderer（并发模式的渲染），它允许你进入concurrent mode（并发模式）。

```jsx
// React 17
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root')
!;

ReactDOM.render(<App />, root);

// React 18
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = document.getElementById('root')
!;

ReactDOM.createRoot(root).render(<App />);
```

在 React 18 中，提供了新的 root api，我们只需要把 render 升级成 `createRoot(root).render(<App />)` 就可以开启并发模式了。

那么这个时候，可能有同学会提问：开启并发模式就是开启了并发更新么？

NO！ 在 React 17 中一些实验性功能里面，开启并发模式就是开启了并发更新，但是在 React 18 正式版发布后，由于官方策略调整，React 不再依赖并发模式开启并发更新了。

换句话说：**开启了并发模式，并不一定开启了并发更新！**

一句话总结：**在 18 中，不再有多种模式，而是以是否使用并发特性作为是否开启并发更新的依据。**

可以从架构角度来概括下，当前一共有两种架构：

* 采用不可中断的递归方式更新的 `Stack Reconciler`（老架构）
* 采用可中断的遍历方式更新的 `Fiber Reconciler`（新架构）

新架构可以选择是否开启并发更新，所以当前市面上所有 React 版本有四种情况：

* 老架构（v15及之前版本）
* 新架构，未开启并发更新，与情况1行为一致（v16、v17 默认属于这种情况）
* 新架构，未开启并发更新，但是启用了并发模式和一些新功能（比如 Automatic Batching，v18 默认属于这种情况）
* 新架构，开启并发模式，开启并发更新

**并发特性指开启并发模式后才能使用的特性**，比如：

* useDeferredValue
* useTransition

![1](https://foruda.gitee.com/images/1682007325938364918/c6174e9f_7819612.png)

 startTransition 并发特性举例

这个新的 API 可以通过将特定更新标记为“过渡”来显著改善用户交互，简单来说，就是被 startTransition 回调包裹的 setState 触发的渲染被标记为不紧急渲染，这些渲染可能被其他紧急渲染所抢占。

```tsx
import React, { useState, useEffect, useTransition } from 'react'

const App: React.FC = () => {
  const [list, setList] = useState<any[]>([])
  const [isPending, startTransition] = useTransition()
  useEffect(() => {
    // 使用了并发特性，开启并发更新
    startTransition(() => {
      setList(new Array(10000).fill(null))
    })
  }, [])
  return (
 <>
 {list.map((_, i) => (
 <div key={i}>{i}</div>
 ))}
 </>
  )
}

export default App
```

 useDeferredValue 并发特性举例

从介绍上来看 useDeferredValue 与 useTransition 是否感觉很相似呢？

相同：useDeferredValue 本质上和内部实现与 useTransition 一样，都是标记成了延迟更新任务。 不同：useTransition 是把更新任务变成了延迟更新任务，而 useDeferredValue
是产生一个新的值，这个值作为延时状态。（一个用来包装方法，一个用来包装值）

所以，上面 startTransition 的例子，我们也可以用 useDeferredValue 来实现：

```jsx
import React, { useState, useEffect, useDeferredValue } from 'react';

const App: React.FC = () => {
 const [list, setList] = useState < any[] > ([]);
 useEffect(() => {
 setList(new Array(10000).fill(null));
 }, []);
 // 使用了并发特性，开启并发更新
 const deferredList = useDeferredValue(list);
 return (
 <>
 {deferredList.map((_, i) => (
 <div key={i}>{i}</div>
 ))}
 </>
 );
};

export default App;
```

此时我们的任务被拆分到每一帧不同的 task 中，JS脚本执行时间大体在5ms左右，这样浏览器就有剩余时间执行样式布局和样式绘制，减少掉帧的可能性。

 setState 自动批处理

React 18 通过在默认情况下执行批处理来实现了开箱即用的性能改进。

批处理是指为了获得更好的性能，在数据层，将多个状态更新批量处理，合并成一次更新（在视图层，将多个渲染合并成一次渲染）。

 在 React 18 之前：有一些情况下并不会合并更新

在React 18 之前，我们只在 React 事件处理函数 中进行批处理更新。默认情况下，在 `promise、setTimeout、原生事件处理函数中`、或任`何其它事件内`的更新都不会进行批处理：

**情况一：React 事件处理函数**

下面的代码就会批量处理，只会渲染一次页面

```typescript jsx
import React, { useState } from 'react';

// React 18 之前
const App: React.FC = () => {
 console.log('App组件渲染了！');
 const [count1, setCount1] = useState(0);
 const [count2, setCount2] = useState(0);
 return (
 <button
 onClick={() => {
 setCount1(count => count + 1);
 setCount2(count => count + 1);
 // 在React事件中被批处理
 }}
 >
 {`count1 is ${count1}, count2 is ${count2}`}
 </button>
 );
};

export default App;
```

**情况二：setTimeout**

如果我们把状态的更新放在`promise`或者`setTimeout`里面， 组件都会渲染两次，不会进行批量更新。

```typescript jsx
import React, { useState } from 'react';

// React 18 之前
const App: React.FC = () => {
 console.log('App组件渲染了！');
 const [count1, setCount1] = useState(0);
 const [count2, setCount2] = useState(0);
 return (
 <div
 onClick={() => {
 setTimeout(() => {
 setCount1(count => count + 1);
 setCount2(count => count + 1);
 });
 // 在 setTimeout 中不会进行批处理
 }}
 >
 <div>count1： {count1}</div>
 <div>count2： {count2}</div>
 </div>
 );
};

export default App;
```

**情况三：原生js事件**

在原生js事件中，结果跟情况二是一样的，每次点击更新两个状态，组件都会渲染两次，不会进行批量更新。

```typescript jsx
import React, { useEffect, useState } from 'react';

// React 18 之前
const App: React.FC = () => {
 console.log('App组件渲染了！');
 const [count1, setCount1] = useState(0);
 const [count2, setCount2] = useState(0);
 useEffect(() => {
 document.body.addEventListener('click', () => {
 setCount1(count => count + 1);
 setCount2(count => count + 1);
 });
 // 在原生js事件中不会进行批处理
 }, []);
 return (
 <>
 <div>count1： {count1}</div>
 <div>count2： {count2}</div>
 </>
 );
};

export default App;
```

 在 React 18 中: 合并更新

在 React 18 上面的三个例子只会有一次 render，因为所有的更新都将自动批处理。这样无疑是很好的提高了应用的整体性能。

不过以下例子会在 React 18 中执行两次 render：

```typescript jsx
import React, { useState } from 'react';

// React 18
const App: React.FC = () => {
 console.log('App组件渲染了！');
 const [count1, setCount1] = useState(0);
 const [count2, setCount2] = useState(0);
 return (
 <div
 onClick={async () => {
 await setCount1(count => count + 1);
 setCount2(count => count + 1);
 }}
 >
 <div>count1： {count1}</div>
 <div>count2： {count2}</div>
 </div>
 );
};

export default App;
```

总结：

* 在 18 之前，只有在react事件处理函数中，才会自动执行批处理，其它情况会多次更新
* 在 18 之后，任何情况都会自动执行批处理，多次更新始终合并为一次

 flushSync

批处理是一个破坏性改动，如果你想退出批量更新，你可以使用 flushSync：

```typescript jsx
import React, { useState } from 'react';
import { flushSync } from 'react-dom';

const App: React.FC = () => {
 const [count1, setCount1] = useState(0);
 const [count2, setCount2] = useState(0);
 return (
 <div
 onClick={() => {
 flushSync(() => {
 setCount1(count => count + 1);
 });
 // 第一次更新
 flushSync(() => {
 setCount2(count => count + 1);
 });
 // 第二次更新
 }}
 >
 <div>count1： {count1}</div>
 <div>count2： {count2}</div>
 </div>
 );
};

export default App;
```

 其他

 Suspense 不再需要 fallback 来捕获

空的 fallback 属性的处理方式做了改变：不再跳过 缺失值 或 值为null 的 fallback 的 Suspense 边界。

**更新前**

以前，如果你的 Suspense 组件没有提供 fallback 属性，React 就会悄悄跳过它，继续向上搜索下一个边界：

```jsx
// React 17
const App = () => {
 return (
 <Suspense fallback={<Loading />}> // <--- 这个边界被使用，显示 Loading 组件
 <Suspense> // <--- 这个边界被跳过，没有 fallback 属性
 <Page />
 </Suspense>
 </Suspense>
 );
};

export default App;
```

**更新后**

现在，React将使用当前组件的 Suspense 作为边界，即使当前组件的 Suspense 的值为 null 或 undefined：

```jsx
// React 18
const App = () => {
 return (
 <Suspense fallback={<Loading />}> // <--- 不使用
 <Suspense> // <--- 这个边界被使用，将 fallback 渲染为 null
 <Page />
 </Suspense>
 </Suspense>
 );
};

export default App;
```

 关于 React 组件的返回值

* 在 React 17 中，如果你需要返回一个空组件，React只允许返回null。如果你显式的返回了 undefined，控制台则会在运行时抛出一个错误。
* 在 React 18 中，不再检查因返回 undefined 而导致崩溃。既能返回 null，也能返回 undefined（但是 React 18 的dts文件还是会检查，只允许返回 null，你可以忽略这个类型错误）。

 结论

* 并发更新的意义就是交替执行不同的任务，当预留的时间不够用时，React 将线程控制权交还给浏览器，等待下一帧时间到来，然后继续被中断的工作
* 并发模式是实现并发更新的基本前提
* 时间切片是实现并发更新的具体手段

 参考文档

* [资料](https://zh-hans.legacy.reactjs.org/blog/2022/03/29/react-v18.html)
* [资料](https://juejin.cn/post/7094037148088664078)
* [资料](https://juejin.cn/post/7027995169211285512)

## 300 canvas 性能为何会比 html/css 好？【热度: 242】

* created_at: 2023-04-23T13:22:02Z
* updated_at: 2023-04-23T13:22:03Z
* labels: JavaScript, 百度
* milestone: 中

Canvas 和 HTML/CSS 是两种不同的技术，各自有着自己的优势和适用场景。

Canvas 是一种基于 JavaScript 的 2D/3D 绘图技术，它允许开发者直接操作像素，可以实现复杂的图形、动画和游戏等效果，其性能比 HTML/CSS 要好的原因主要有以下几点：

1. 直接操作像素：Canvas 允许开发者直接操作像素，不需要经过复杂的 DOM 计算和渲染，能够更快地响应用户操作，提高交互的流畅性。

2. GPU 加速：现代浏览器已经对 Canvas 进行了 GPU 加速，使得 Canvas 能够更加高效地处理大量的图形和动画。

3. 没有样式计算：与 HTML/CSS 不同，Canvas 不需要进行样式计算和布局，能够减少浏览器的重绘和重排，从而提高渲染性能。

4. 可以缩放和裁剪：Canvas 可以进行缩放和裁剪操作，能够适应不同的屏幕分辨率和大小，同时也可以减少不必要的绘图计算。

总之，Canvas 能够更加高效地处理大量的图形和动画，适用于需要复杂绘图和动画的场景，而 HTML/CSS 更适合处理文本和静态布局，适用于构建 Web 页面。

## 301 [React] 生命周期有哪些？【热度: 889】

* created_at: 2023-04-23T13:45:38Z
* updated_at: 2023-04-23T14:17:15Z
* labels: web框架
* milestone: 中

主要生命周期分为两个版本，

分别是： `v16.0前` 和 `v16.4`

 v16.0 前

![1](https://foruda.gitee.com/images/1682257247128664078/b5848c64_7819612.png)

总共分为**四大阶段**：

1. `{初始化| Intialization}`
2. `{挂载| Mounting}`
3. `{更新| Update}`
4. `{卸载| Unmounting}`

 Intialization(初始化）

在初始化阶段,会用到 `constructor()` 这个构造函数，如：

```javascript
constructor(props) {
 super(props);
}

```

* `super`的作用
用来调用*基类*的构造方法( `constructor()` ),
也**将父组件的`props`注入给子组件，供子组件读取**
* 初始化操作，定义`this.state`的初始内容
* **只会执行一次**

---

 Mounting(挂载）（3个）

1. `componentWillMount`：**在组件挂载到`DOM`前调用**

这里面的调用的`this.setState`不会引起组件的重新渲染，也可以把写在这边的内容提到`constructor()`，所以在项目中很少。
**只会调用一次**
2. `render`: 渲染
只要`props`和`state`发生改变（无论值是否有变化,两者的重传递和重赋值，都可以引起组件重新`render`），`都会重新渲染render`。
`return`：**是必须的，是一个React元素**，不负责组件实际渲染工作，由`React`自身根据此元素去渲染出`DOM`。
`render` 是**纯函数**，不能执行`this.setState`。
3. `componentDidMount`：**组件挂载到`DOM`后调用**

**调用一次**

---

 Update(更新)（5个）

1. `componentWillReceiveProps(nextProps)`:调用于`props`引起的组件更新过程中

`nextProps`：父组件传给当前组件新的`props`
可以用`nextProps`和`this.props`来查明重传`props`是否发生改变（原因：不能保证父组件重传的`props`有变化）
只要`props`发生变化就会，引起调用

2. `shouldComponentUpdate(nextProps, nextState)`：用于性能优化

`nextProps`：当前组件的`this.props`
`nextState`：当前组件的`this.state`
通过比较`nextProps`和`nextState`,来判断当前组件是否有必要继续执行更新过程。
返回`false`：表示停止更新，用于减少组件的不必要渲染，优化性能
返回`true`：继续执行更新
像`componentWillReceiveProps（）`中执行了`this.setState`，更新了`state`，但**在`render`前**(如`shouldComponentUpdate`，`componentWillUpdate`)，`this.state`依然指向更新前的state，不然`nextState`及当前组件的`this.state`的对比就一直是`true`了

3. `componentWillUpdate(nextProps, nextState)`：组件更新前调用

在`render`方法前执行
由于组件更新就会调用，所以一般很少使用

4. `render`：重新渲染

5. `componentDidUpdate(prevProps, prevState)`：组件更新后被调用

`prevProps`：组件更新前的`props`
`prevState`：组件更新前的`state`
可以操作组件更新的DOM

---

 Unmounting(卸载)（1个）

`componentWillUnmount`：组件被卸载前调用

可以在这里执行一些**清理工作**，比如清除组件中使用的*定时器*，清除`componentDidMount`中*手动创建的DOM元素*等，以避免引起内存泄漏

---

 React v16.4

![2](https://foruda.gitee.com/images/1682257393147988566/aa702114_7819612.png)

与 `v16.0`的生命周期相比

* 新增了 -- （两个`getXX`）

 1. `getDerivedStateFromProps`
 2. `getSnapshotBeforeUpdate`

* 取消了 -- (三个`componmentWillXX`)

 1. `componentWillMount`、
 2. `componentWillReceiveProps`、
 3. `componentWillUpdate`

 getDerivedStateFromProps

`getDerivedStateFromProps(prevProps, prevState)`：组件创建和更新时调用的方法

* `prevProps`：组件更新前的`props`
* `prevState`：组件更新前的`state`

> 在`React v16.3`中，在创建和更新时，只能是由父组件引发才会调用这个函数，在`React v16.4`改为无论是`Mounting`还是`Updating`，全部都会调用。

是一个静态函数，也就是这个函数不能通过`this`访问到`class`的属性。

> 如果`props`传入的内容不需要影响到你的`state`，那么就需要返回一个`null`，这个**返回值是必须的**，所以尽量将其写到函数的末尾。

在组件创建时和更新时的render方法之前调用，它应该

* 返回一个对象来更新状态
* 或者返回`null`来不更新任何内容

 getSnapshotBeforeUpdate

`getSnapshotBeforeUpdate(prevProps,prevState)`:`Updating`时的函数，在render之后调用

* `prevProps`：组件更新前的`props`
* `prevState`：组件更新前的`state`

可以读取，但无法使用DOM的时候，在组件可以在可能更改之前从`DOM`捕获一些信息（例如滚动位置）

> **返回的任何值都将作为参数传递给`componentDidUpdate（)`**

---

 Note

在`17.0`的版本，官方彻底废除

* `componentWillMount`、
* `componentWillReceiveProps`、
* `componentWillUpdate`

## 302 [React] Hooks 有哪些？【热度: 2,594】

* created_at: 2023-04-23T14:00:05Z
* updated_at: 2023-10-02T03:40:53Z
* labels: web框架, 美团
* milestone: 中

 react 16.8 hooks

* useState
* useEffect
* useContext
* useReducer
* useMemo
* useCallback
* useRef
* useImperativeHandle
* useLayoutEffect
* useDebugValue

 React v18中的hooks

* useSyncExternalStore

* useTransition
* useDeferredValue
* useInsertionEffect
* useId

 简单介绍一下 react 18 新增的 hooks

 useSyncExternalStore

`useSyncExternalStore`:是一个推荐用于**读取和订阅外部数据源**的 `hook`，其方式与选择性的 `hydration` 和时间切片等并发渲染功能兼容

```javascript
const state = useSyncExternalStore(
 subscribe,
 getSnapshot[, getServerSnapshot]
)

```

* `subscribe`: 订阅函数，用于注册一个回调函数，**当存储值发生更改时被调用**。此外， `useSyncExternalStore` 会通过带有记忆性的 `getSnapshot` 来判别数据是否发生变化，如果发生变化，那么会**强制更新数据**。
* `getSnapshot`: 返回当前存储值的函数。必须返回缓存的值。如果 `getSnapshot` 连续多次调用，则必须返回相同的确切值，除非中间有存储值更新。
* `getServerSnapshot`：返回服务端(hydration模式下)渲染期间使用的存储值的函数

---

 useTransition

> `useTransition`：
>
>返回一个**状态值**表示过渡任务的等待状态，
>以及一个启动该过渡任务的函数。

**过渡任务** 在一些场景中，如：`输入框`、`tab切换`、`按钮`等，这些任务需要视图上立刻做出响应，这些任务可以称之为**立即更新的任务**

但有的时候，更新任务并不是那么紧急，或者来说要去请求数据等，导致新的状态不能立马更新，需要用一个`loading...`的等待状态，这类任务就是过度任务

```javascript
const [isPending, startTransition] = useTransition()
```

* `isPending`：**过渡状态的标志**，为`true`时是等待状态
* `startTransition`：可以**将里面的任务变成过渡任务**

---

 useDeferredValue

> `useDeferredValue`：接受一个值，并返回该值的新副本，该副本将**推迟**到更紧急地更新之后。

如果当前渲染是一个紧急更新的结果，比如用户输入，`React` 将**返回之前的值**，然后**在紧急渲染完成后渲染新的值**。

也就是说`useDeferredValue`可以让状态滞后派生。

```javascript
const deferredValue = useDeferredValue(value)
```

* `value`：可变的值，如`useState`创建的值
* `deferredValue`: 延时状态

> **useTransition和useDeferredValue做个对比**
>
>相同点：`useDeferredValue` 和 `useTransition` 一样，都是**过渡更新任务**
>不同点：`useTransition` 给的是一个**状态**，而`useDeferredValue`给的是一个**值**

---

 useInsertionEffect

`useInsertionEffect`：与 `useLayoutEffect` 一样，但它在所有 DOM 突变之前**同步触发**

在执行顺序上 `useInsertionEffect` > `useLayoutEffect` > `useEffect`

> `seInsertionEffect` 应仅限于 `css-in-js` 库作者使用。
> 优先考虑使用 `useEffect` 或 `useLayoutEffect` 来替代。

---

 useId

`useId` ： 是一个**用于生成横跨服务端和客户端的稳定的唯一 ID** 的同时避免`hydration`不匹配的 hook。

---

 参考文档

* [资料](https://juejin.cn/post/7118937685653192735)

## 303 dom 渲染能使用 GPU 加速吗？【热度: 494】

* created_at: 2023-04-23T14:05:01Z
* updated_at: 2023-04-23T14:16:47Z
* labels: JavaScript, 网易
* milestone: 中

只有部分情况可以使用 GPU 加速渲染。浏览器将 DOM 元素转换为图层（Layer），然后将图层绘制到屏幕上。在某些情况下，这些图层可以使用 GPU 加速，从而提高渲染性能。

浏览器将具有以下属性之一的元素视为单独的图层：

* 使用 CSS 3D 变换或透视属性的元素
* 使用 CSS 滤镜的元素
* 使用 will-change 属性显式指定的元素
* 使用 `<video>、<canvas>、<webgl>` 或其他可加速元素的元素

将元素分层后，浏览器可以将其提交到 GPU 来处理，从而加快渲染速度。这样可以避免使用 CPU 进行复杂的布局和绘制操作，而 GPU 可以更快地处理这些操作。

## 304 [React] ref 是如何拿到函数组件的实例【热度: 881】

* created_at: 2023-04-23T14:07:56Z
* updated_at: 2023-04-23T14:17:50Z
* labels: web框架
* milestone: 中

 使用`forwordRef`

将`input`单独封装成一个组件`TextInput`。

```jsx
const TextInput = React.forwardRef((props,ref) => {
 return <input ref={ref}></input>
})

```

用`TextInputWithFocusButton`调用它

```jsx
function TextInputWithFocusButton() {
 // 关键代码
 const inputEl = useRef(null);
 const onButtonClick = () => {
 // 关键代码，`current` 指向已挂载到 DOM 上的文本输入元素
 inputEl.current.focus();
 };
 return (
 <>
 // 关键代码
 <TextInput ref={inputEl}></TextInput>
 <button onClick={onButtonClick}>Focus the input</button>
 </>
 );
}

```

 useImperativeHandle

有时候，我们可能**不想将整个子组件暴露给父组件**，而只是暴露出父组件需要的值或者方法，这样可以让代码更加明确。而`useImperativeHandle` Api就是帮助我们做这件事的。

```jsx
const TextInput = forwardRef((props,ref) => {
 const inputRef = useRef();
 // 关键代码
 useImperativeHandle(ref, () => ({
 focus: () => {
 inputRef.current.focus();
 }
 }));
 return <input ref={inputRef} />
})


function TextInputWithFocusButton() {
 // 关键代码
 const inputEl = useRef(null);
 const onButtonClick = () => {
 // 关键代码，`current` 指向已挂载到 DOM 上的文本输入元素
 inputEl.current.focus();
 };
 return (
 <>
 // 关键代码
 <TextInput ref={inputEl}></TextInput>
 <button onClick={onButtonClick}>
 Focus the input
 </button>
 </>
 );
}


```

也可以使用`current.focus()`来做`input`聚焦。

> 这里要注意的是，子组件`TextInput`中的`useRef`对象，只是用来获取`input`元素的，大家不要和父组件的`useRef`混淆了。

## 305 [React] 开发过程中有哪些性能优化手段？【热度: 1,511】

* created_at: 2023-04-23T14:47:00Z
* updated_at: 2023-04-23T14:47:01Z
* labels: web框架, 小米
* milestone: 高

 路由懒加载

两种方式可实现:

* 使用 React 中 Suspense,lazy
* 使用 react-loadable

 React 中 Suspense,lazy

应用的组件需要使用 lazy 的方式引入， 且使用 Suspense 包裹异步加载的组件

```jsx
 import { Route, Switch } from 'react-router-dom';

const MainCom = lazy(() => import('../views/main/maincom'));

class RouterConfig extends React.Component {
 render() {
 return (
 <Suspense fallback={<div> 加载中 </div>}>
 <Switch>
 ...
 <Route exact path="/" component={MainCom} />
 ...
 </Switch>

 </Suspense>
 )
 }
}

export default RouterConfig;
```

 react-loadable

```jsx
 import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';

const logincom = Loadable({
 loader: () => import('../views/login/login'),
 loading() {
 return <div>正在加载</div>
 },
})

class RouterConfig extends React.Component {
 render() {
 return (
 <Suspense fallback={<div> 加载中 </div>}>
 <Switch>
 ...
 <Route exact path="/" component={logincom} />
 ...
 </Switch>

 </Suspense>
 )
 }
}

export default RouterConfig;
```

 受控性组件颗粒化 ，独立请求服务渲染单元

可控性组件颗粒化，独立请求服务渲染单元是笔者在实际工作总结出来的经验。目的就是避免因自身的渲染更新或是副作用带来的全局重新渲染。

大概思路是这样子的：
![1](https://foruda.gitee.com/images/1682260059688615416/19b33481_7819612.png)

拆分需要单独调用后端接口的细小组件，建立独立的数据请求和渲染，这种依赖数据更新 -> 视图渲染的组件，能从整个体系中抽离出来 ，好处我总结有以下几个方面。

1. 可以避免父组件的冗余渲染 ，react的数据驱动，依赖于 state 和 props 的改变，改变state 必然会对组件 render 函数调用，如果父组件中的子组件过于复杂，一个自组件的 state
 改变，就会牵一发动全身，必然影响性能，所以如果把很多依赖请求的组件抽离出来，可以直接减少渲染次数。

2. 可以优化组件自身性能，无论从class声明的有状态组件还是fun声明的无状态，都有一套自身优化机制，无论是用shouldupdate 还是用 hooks中 useMemo useCallback
 ，都可以根据自身情况，定制符合场景的渲条 件，使得依赖数据请求组件形成自己一个小的，适合自身的渲染环境。

3. 能够和redux ,以及redux衍生出来 redux-action , dva,更加契合的工作，用 connect
 包裹的组件，就能通过制定好的契约，根据所需求的数据更新，而更新自身，而把这种模式用在这种小的，需要数据驱动的组件上，就会起到物尽其用的效果。

 shouldComponentUpdate ,PureComponent 和 React.memo ,immetable.js/immer.js 助力性能调优

 PureComponent 和 React.memo

React.PureComponent 通过props和state的浅对比来实现 shouldComponentUpate()。如果对象包含复杂的数据结构(比如对象和数组)
，他会浅比较，如果深层次的改变，是无法作出判断的，React.PureComponent 认为没有变化，而没有渲染试图。

react.memo 和 PureComponent 功能类似 ，react.memo 作为第一个高阶组件，第二个参数 可以对props 进行比较 ，和shouldComponentUpdate不同的, 当第二个参数返回 true
的时候，证明props没有改变，不渲染组件，反之渲染组件。

 shouldComponentUpdate

使用 shouldComponentUpdate() 以让React知道当state或props的改变是否影响组件的重新render，默认返回ture，返回false时不会重新渲染更新，而且该方法并不会在初始化渲染或当使用
forceUpdate() 时被调用。

 immetable.js/immer.js

immetable.js 是Facebook 开发的一个js库，可以提高对象的比较性能，像之前所说的pureComponent 只能对对象进行浅比较，,对于对象的数据类型,却束手无策,所以我们可以用 immetable.js 配合
shouldComponentUpdate 或者 react.memo来使用。immutable 中 我们用react-redux来简单举一个例子，如下所示 数据都已经被 immetable.js处理。

```jsx
import { is } from 'immutable'

const GoodItems = connect(state =>
 ({ GoodItems: filter(state.getIn(['Items', 'payload', 'list']), state.getIn(['customItems', 'payload', 'list'])) || Immutable.List(), })
 // 此处省略很多代码～～～～～～ */
)(memo(({ Items, dispatch, setSeivceId }) => {
 // */
}, (pre, next) => is(pre.Items, next.Items)))

```

通过 is 方法来判断，前后Items(对象数据类型)是否发生变化。

**immer** 是 mobx 的作者写的一个 immutable 库，核心实现是利用 ES6 的 proxy，几乎以最小的成本实现了 js 的不可变数据结构，简单易用、体量小巧、设计巧妙，满足了我们对 JS 不可变数据结构的需求。

具体使用可见： [资料](https://juejin.cn/post/7157745748832944141)

 hooks 组件中， 常使用 useMemo、useCallback、useRef 等方式方式重复申明

每次点击button的时候,都会执行Index函数。handerClick1 , handerClick2,handerClick3都会重新声明。这种函数的重复申明， 会使得子组件每次都是拿到的新的应用对象， 会导致 memo 直接失效。

```jsx
function Index() {
 const [number, setNumber] = useState(0)
 const [handerClick1, handerClick2, handerClick3] = useMemo(() => {
 const fn1 = () => {
 // 一些操作 */
 }
 const fn2 = () => {
 // 一些操作 */
 }
 const fn3 = () => {
 // 一些操作 */
 }
 return [fn1, fn2, fn3]
 }, []) // 只有当数据里面的依赖项，发生改变的时候，才会重新声明函数。 */
 return <div>
 <a onClick={handerClick1}>点我有惊喜1</a>
 <a onClick={handerClick2}>点我有惊喜2</a>
 <a onClick={handerClick3}>点我有惊喜3</a>
 <button onClick={() => setNumber(number + 1)}> 点击 {number} </button>
 </div>
}
```

推荐使用 ahooks - usePersistFn、useMemoizedFn 其实现也非常简单， 就是将函数的应用绑定在了 ref 上

```jsx
function usePersistFn(fn, deps) {
 const fnRef = useRef();

 useEffect(() => {
 fnRef.current = fn;
 }, [fn, ...deps]);

 return useCallback(() => {
 return fnRef.current();
 }, [fnRef]);
}
```

 警惕 context 陷阱

使用Context可以避免的组件的层层props嵌套的问题。但是它使用consumer拿值时,会多一层组件。但得益于 useContext hook 我们可以不使用consumer组件。直接拿到值,直观。一般的使用场景,如那拿全局的class前缀，或者国际化，Ui主题颜色等。

**但是当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate、memo 等函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。**

使用 `createContext 和 useContext` 的时候， 尽量从顶层往下传递的数据是不可变的数据， 否则会引起整个链路层级的渲染。

此处推荐 使用 `recoil`， 由 facebook 官方出品， 使用语法非常简单， 跟 context 很类似。

## 306 [React] 如何监听路由变化？【热度: 679】

* created_at: 2023-04-23T14:53:27Z
* updated_at: 2023-04-23T14:53:28Z
* labels: web框架, 小米
* milestone: 中

**依赖**

* react-router-dom v6
* react v18

 实现

监听的核心原理基于useEffect，和useLocation，通过useEffect监听当前location的变化，这样就实现的最基本的监听结构：

```jsx
const location = useLocation();
useEffect(() => {
 //记录路径
}, [location]);
```

然后，我们可以在useEffect中记录和更新from、to的值，可以根据自己的需要选择from、to的数据类型，这里我使用了React-router提供的Location类型。

更新逻辑为：将to的值赋给from，然后将新的location赋值给to

```typescript jsx
import { Location, useLocation } from 'react-router-dom'

type LocationTrans = {
 from: Location;
 to: Location;
};

const location = useLocation()
const locationState = useRef<LocationTrans>({
  from: null,
  to: null
})

useEffect(() => {
  locationState.current.from = locationState.current.to
  locationState.current.to = location
}, [location])
```

最后，利用React的Context进行封装，将其封装成一个组件和一个hook，使用者可以通过这个组件来进行监听，通过hook快速访问数据。我将这些代码放在了同一个.tsx文件中，保证了逻辑的高内聚。

```typescript jsx
import React, { createContext, useContext, useEffect, useRef } from "react";
import { Location, useLocation } from "react-router-dom";


type LocationTrans = {
 from: Location;
 to: Location;
};

export const LocationContext =
 createContext<React.MutableRefObject<LocationTrans>>(null);

export function WithLocationListener(props: { children: React.ReactNode }) {
 const location = useLocation();

 const locationState = useRef<LocationTrans>({
 from: null,
 to: null,
 });

 useEffect(() => {
 locationState.current.from = locationState.current.to;
 locationState.current.to = location;
 }, [location]);

 return (
 <LocationContext.Provider value={locationState}>
 {props.children}
 </LocationContext.Provider>
 );
}

export function useLocationConsumer(): LocationTrans {
 const ref = useContext(LocationContext);
 return ref.current;
}
```

 使用

这个组件只能在RouterProvider的子组件中使用，因为useLocation只能在这个范围内使用。

```typescript jsx
//import ....

function Layout() {
 return (
 <WithLocationListener>
 {/* ..... */}
 </WithLocationListener>
 );
}
```

在需要用到路由信息的页面：

```typescript jsx
const { from, to } = useLocationConsumer()
```

 参考文档

* [资料](https://juejin.cn/post/7195910055497580600)

## 307 CSR、SSR、SSG、NSR、ESR、ISR 都是啥？【热度: 3,492】

* created_at: 2023-04-23T15:02:29Z
* updated_at: 2023-04-23T15:02:30Z
* labels: web应用场景
* milestone: 高

CSR、SSR、SSG、NSR、ESR、ISR 都是啥？

根据不同的构建、渲染过程有不同的优劣势和适用情况。

* 现代 UI 库加持下常用的 `CSR`、
* 具有更好 `SEO` 效果的 `SSR` (`SPR`)、
* 转换思路主打**构建时生成**的 `SSG`、
* 大架构视野之上的 `ISR`、`DPR`，
* 还有更少听到的 `NSR`、`ESR`。

 CSR(Client Side Rendering)

> 页面托管服务器只需要对页面的**访问请求响应**一个如下的**空页面**

```html
<!DOCTYPE html>
<html>
 <head>
 <meta charset="utf-8" />
 <!-- metas -->
 <title></title>
 <link rel="shortcut icon" href="xxx.png" />
 <link rel="stylesheet" href="xxx.css" />
 </head>
 <body>
 <div id="root"><!-- page content --></div>
 <script src="xxx/filterXss.min.js"></script>
 <script src="xxx/x.chunk.js"></script>
 <script src="xxx/main.chunk.js"></script>
 </body>
</html>

```

页面中留出一个用于填充渲染内容的视图节点 (`div#root`)，并插入指向项目**编译压缩后**的

* `JS Bundle` 文件的 `script` 节点
* 指向 `CSS` 文件的 `link.stylesheet` 节点等。

浏览器接收到这样的文档响应之后，会根据文档内的链接加载脚本与样式资源，并完成以下几方面主要工作：

> 1. **执行脚本**
> 2. 进行**网络访问以获取在线数据**
> 3. 使用 DOM API **更新页面结构**
> 4. **绑定交互事件**
> 5. **注入样式**

以此完成整个渲染过程。

CSR 模式有以下几方面优点：

* UI 库支持
* **前后端分离**
* **服务器负担轻**

 SSR (Server Side Rendering)

SSR 的概念，即与 `CSR` 相对地，在服务端完成大部分渲染工作， 服务器在响应站点访问请求的时候，就已经渲染好可供呈现的页面。

像 `React`、`Vue` 这样的 UI 生态巨头，其实都有一个关键的 `Virtual DOM` (or VDOM) 概念,先自己**建模处理视图表现与更新**、再批量调 `DOM API` 完成视图渲染更新。这就带来了一种 `SSR` 方案：

`VDOM` 是**自建模型**，是一种抽象的嵌套数据结构，也就可以在 `Node` 环境（或者说一切服务端环境）下跑起来，**把原来的视图代码拿来在服务端跑**，通过 `VDOM` 维护，再在最后**拼接好字符串作为页面响应**，生成文档作为响应页面，此时的页面内容已经基本生成完毕，把逻辑代码、样式代码附上，则可以实现完整的、可呈现页面的响应。

 SSR优点

* 呈现速度和用户体验佳
* `SEO` 友好

 SSR缺点

1. 引入成本高
将视图渲染的工作交给了服务器做，引入了新的概念和技术栈（如 Node）
2. 响应时间长
SSR 在完成访问响应的时候需要做更多的计算和生成工作
关键指标 `TTFB` (`Time To First Byte`) 将变得更大
3. 首屏交互不佳
虽然 SSR 可以让页面请求响应后更快在浏览器上渲染出来
但在首帧出现，需要客户端加载激活的逻辑代码（如事件绑定）还没有初始化完毕的时候，其实是不可交互的状态

 SSR-React 原理

1. VDOM
2. 同构
3. 双端对比

几大概念：

* VDOM
* 同构
* 双端对比
* renderToString()
* renderToStaticMarkup()

```javascript
ReactDOMServer.renderToStaticMarkup(element)
```

仅仅是为了将组件渲染为html字符串，不会带有`data-react-checksum`属性

 SPR (Serverless Pre-Rendering)

无服务预渲染，这是 `Serverless` 话题之下的一项渲染技术。`SPR` 是指在 `SSR` 架构下通过预渲染与缓存能力，将部分页面转化为静态页面，以避免其在服务器接收到请求的时候频繁被渲染的能力，同时一些框架还支持**设置静态资源过期时间**，以确保这部分“静态页面”也能有一定的即时性。

 SSG (Static Site Generation)

* 它与 `CSR` 一样，只需要**页面托管**，不需要真正编写并部署服务端，页面资源在编译完成部署之前就已经确定；
* 但它又与 `SSR` 一样，属于一种 `Prerender` 预渲染操作，即在用户浏览器得到页面响应之前，页面内容和结构就已经渲染好了。
* 当然形式和特征来看，它更接近 SSR。

> `SSG` 模式，把原本日益动态化、交互性增强的页面，变成了大部分已经填充好，托管在页面服务 / CDN 上的**静态页面**

 NSR (Native Side Rendering)

`Native` 就是客户端，万物皆可**分布式**，可以理解为这就是一种分布式的 `SSR`，不过这里的渲染工作交给了客户端去做而不是远端服务器。在用户即将访问页面的**上级页面预取页面数据，由客户端缓存 HTML 结构，以达到用户真正访问时快速响应的效果**。

NSR 见于各种移动端 + `Webview` 的 `Hybrid` 场景，是需要页面与客户端研发协作的一种优化手段。

 ESR (Edge Side Rendering)

`Edge` 就是边缘，类比前面的各种 `XSR`，`ESR` 就是将渲染工作交给边缘服务器节点，常见的就是 `CDN` 的边缘节点。这个方案主打的是**边缘节点相比核心服务器与用户的距离优势**，利用了 `CDN` 分级缓存的概念，渲染和内容填充也可以是分级进行并缓存下来的。

`ESR` 之下静态内容与动态内容是分流的，

1. 边缘 CDN 节点可以将静态页面内容先响应给用户
2. 然后再自己发起动态内容请求，得到核心服务器响应之后再返回给用户

是在大型网络架构下非常极致的一种优化，但这也就依赖更庞大的技术基建体系了。

 ISR (Incremental Site Rendering)

**增量式网站渲染**，就是对待页面内容小刀切，**有更细的差异化渲染粒度**，能渐进、分层地进行渲染。

常见的选择是：

* 对于重要页面如首屏、访问量较大的直接落地页，进行**预渲染并添加缓存**，保证最佳的访问性能；
* 对于次要页面，则确保有兜底内容可以即时 `fallback`，再将其实时数据的渲染留到 CSR 层次完成，同时触发异步缓存更新。

对于“异步缓存更新”，则需要提到一个常见的内容缓存策略：`Stale While Revalidate`，CDN 对于数据请求始终首先响应缓存内容，如果这份内容已经过期，则**在响应之后再触发异步更新**——这也是对于次要元素或页面的缓存处理方式。

## 308 web components 了解多少？【热度: 1,206】

* created_at: 2023-04-23T15:06:09Z
* updated_at: 2023-04-23T15:09:09Z
* labels: web应用场景
* milestone: 高

`Web Components` 是一套不同的技术，允许您创建可重用的定制元素并且在您的 web 应用中使用它们

 三要素

1. `Custom elements`（自定义元素）： 一组 `JavaScript` API，允许您定义 `custom elements` 及其行为，然后可以在您的用户界面中按照需要使用它们。
通过 `class A extends HTMLElement {}` 定义组件，
通过 `window.customElements.define('a-b', A)` 挂载已定义组件。
2. `Shadow DOM`（影子 DOM ）：一组 `JavaScript` API，用于将封装的“影子” DOM 树附加到元素（**与主文档 DOM 分开呈现**）并控制其关联的功能。
通过这种方式，您可以**保持元素的功能私有**，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
使用 `const shadow = this.attachShadow({mode : 'open'})` 在 `WebComponents` 中开启。
3. `HTML templates`（HTML 模板）`slot` ：`template` 可以简化生成 `dom` 元素的操作，不再需要 `createElement` 每一个节点。

虽然 `WebComponents` 有三个要素，但却不是缺一不可的，`WebComponents`

>借助 `shadow dom` 来实现**样式隔离**，
>借助 `templates` 来**简化标签**的操作。

 内部生命周期函数（4个）

1. `connectedCallback`: 当 `WebComponents`**第一次**被挂在到 `dom` 上是触发的钩子，并且只会触发一次。
类似 `React` 中的 `useEffect(() => {}, [])`，`componentDidMount`。
2. `disconnectedCallback`: 当自定义元素与文档 `DOM`**断开连接**时被调用。
3. `adoptedCallback`: 当自定义元素被**移动**到新文档时被调用。
4. `attributeChangedCallback`: 当自定义元素的被监听属性变化时被调用。

 组件通信

 传入复杂数据类型

* 传入一个 `JSON` 字符串配饰`attribute`

`JSON.stringify`配置指定属性
在组件`attributeChangedCallback`中判断对应属性，然后用`JSON.parse()`获取

* 配置DOM的`property`属性

`xx.dataSource = [{ name: 'xxx', age: 19 }]`
但是，自定义组件中没有办法监听到这个属性的变化
如果想实现，复杂的结构，不是通过配置，而是在定义组件时候，就确定

 状态的双向绑定

```kotlin
<wl-input id="ipt"
 :value="data"
 @change="(e) => { data = e.detail }">
</wl-input>

// js
(function () {
 const template = document.createElement('template')
 template.innerHTML = `
 <style>
 .wl-input {

 }
 </style>
 <input type="text" id="wlInput">
 `
 class WlInput extends HTMLElement {
 constructor() {
 super()
 const shadow = this.attachShadow({
 mode: 'closed'
 })
 const content = template.content.cloneNode(true)
 this._input = content.querySelector('#wlInput')
 this._input.value = this.getAttribute('value')
 shadow.appendChild(content)
 this._input.addEventListener("input", ev => {
 const target = ev.target;
 const value = target.value;
 this.value = value;
 this.dispatchEvent(
 new CustomEvent("change", { detail: value })
 );
 });
 }
 get value() {
 return this.getAttribute("value");
 }
 set value(value) {
 this.setAttribute("value", value);
 }
 }
 window.customElements.define('wl-input', WlInput)
})()

```

监听了这个表单的 `input` 事件，并且在每次触发 `input` 事件的时候触发自定义的 `change` 事件，并且把输入的参数回传。

 样式设置

 直接给自定义标签添加样式

```html
<style>
 wl-input{
 display: block;
 margin: 20px;
 border: 1px solid red;
 }
</style>
<wl-input></wl-input>
<script src="./index.js"></script>

```

 定义元素内部子元素设置样式

分为两种场景：

1. 在主 DOM 使用 JS
2. 在 Custom Elements 构造函数中使用 JS

 在主 DOM 使用 JS 给 Shadow DOM 增加 style 标签

```html
<script>
 class WlInput extends HTMLElement {
 constructor () {
 super();
 this.shadow = this.attachShadow({mode: "open"});

 let headerEle = document.createElement("div");
 headerEle.className = "input-header";
 headerEle.innerText = "xxxx";
 this.shadow.appendChild(headerEle);
 }
 }

 window.customElements.define("wl-input", WlInput);

 // 给 Shadow DOM 增加 style 标签
 let styleEle = document.createElement("style");
 styleEle.textContent = `
 .input-header{
 padding:10px;
 background-color: yellow;
 font-size: 16px;
 font-weight: bold;
 }
 `;
 document.querySelector("wl-input").shadowRoot.appendChild(styleEle);
</script>

```

 在 Custom Elements 构造函数中使用 JS 增加 style 标签

```html
<script>
 class WlInput extends HTMLElement {
 constructor () {
 super();
 this.shadow = this.attachShadow({mode: "open"});
 let styleEle = document.createElement("style");
 styleEle.textContent = `
 .input-header{
 padding:10px;
 background-color: yellow;
 font-size: 16px;
 font-weight: bold;
 }
 `;
 this.shadow.appendChild(styleEle);


 let headerEle = document.createElement("div");
 headerEle.className = "input-header";
 headerEle.innerText = "xxxx";
 this.shadow.appendChild(headerEle);
 }
 }
 window.customElements.define("wl-input", WlInput);
</script>

```

 引入 CSS 文件

使用 JS 创建 link 标签，然后引入 CSS 文件给自定义元素内部的子元素设置样式

```html
<script>
 class WlInput extends HTMLElement {
 constructor () {
 super();
 this.shadow = this.attachShadow({mode: "open"});
 let linkEle = document.createElement("link");
 linkEle.rel = "stylesheet";
 linkEle.href = "./my_input.css";
 this.shadow.appendChild(linkEle);


 let headerEle = document.createElement("div");
 headerEle.className = "input-header";
 headerEle.innerText = "xxxx";
 this.shadow.appendChild(headerEle);
 }
 }
 window.customElements.define("wl-input", WlInput);
</script>

```

样式文件

```css
.input-header{
 padding:10px;
 background-color: yellow;
 font-size: 16px;
 font-weight: bold;
}

```

## 309 [webpack] module、chunk 、bundle 的区别【热度: 136】

* created_at: 2023-04-26T13:01:07Z
* updated_at: 2023-04-26T13:02:02Z
* labels: 工程化
* milestone: 中

首先上图：
![3 (1)](https://user-images.githubusercontent.com/22188674/234582993-25c40cda-d3ee-4f96-b134-44a950aba11f.png)

* 手写下一个一个的文件，它们无论是 `ESM` 还是 `commonJS` 或是 `AMD`，他们都是 `module`
* 当我们写的 `module` 源文件传到 `webpack` 进行打包时，`webpack` 会根据文件引用关系生成 `chunk` 文件，`webpack` 会对这个 `chunk` 文件进行一些操作
* webpack 处理好 chunk 文件后，最后会输出 bundle 文件，这个 bundle 文件包含了经过加载和编译的最终源文件，可以直接在浏览器中运行。

一般来说一个 chunk 对应一个 bundle，比如上图中的 `utils.js -> chunks 1 -> utils.bundle.js`

但也有例外，比如说上图中，我就用 `MiniCssExtractPlugin` 从 chunks 0 中抽离出了 `index.bundle.css` 文件

**总结**：
module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字：
我们直接写出来的是 module，webpack 处理时是 chunk，最后生成浏览器可以直接运行的 bundle。

## 311 package.json 配置了解多少？【热度: 747】

* created_at: 2023-04-26T14:13:01Z
* updated_at: 2023-04-26T14:13:02Z
* labels: 工程化
* milestone: 中

`package.json`常见配置分类：

* 描述配置

* 文件配置

* 脚本配置

* 依赖配置

* 发布配置

* 系统配置

* 第三方配置

`package.json` 作用：存储一切与项目相关的配置，例如项目基本信息、外界访问项目的方式、项目内置脚本、项目依赖等。

 描述配置

主要是项目的基本信息，包括名称，版本，描述，仓库，作者等，部分会展示在 npm 官网上。

```js
{
 "name": "react", // 项目名称 or npm包名
 "version": "18.2.0", // 版本号，开源项目的版本号通常遵循 semver 语义化规范
 "repository": {
 "type": "git",
 "url": "https://github.com/facebook/react.git",
 "directory": "packages/react"
 }, // 项目的仓库地址及版本控制信息
 "description": "React is a JavaScript library for building user interfaces.", // 项目描述 (展示于 npm 官网)
 "keywords": [
 "ant",
 "component",
 "components",
 "design",
 "framework",
 "frontend",
 "react",
 "react-component",
 "ui"
 ], // 项目技术关键词
 "homepage": "https://reactjs.org/", // 项目的主页链接，通常是项目 github 链接，项目官网或文档首页
 "bugs": "https://github.com/vuejs/core/issues", // 项目 bug 反馈地址，通常是 github issue 页面的链接
 "author": "Li jiaxun", // 作者信息
 "private": true, // 私有项目, 若为 true 则无法发布到 npm 官网上
}
```

 文件配置

包括项目所包含的文件，以及入口等信息。

```js
{
 // 🔥@files: 指定需要跟随一起发布的内容，控制 npm 包的大小。
 // 发布时默认会包括 package.json，license，README 和main 字段里指定的文件。忽略 node_modules，lockfile 等文件。在此基础上，可以指定更多需要一起发布的内容。(单独的文件/整个文件夹/使用通配符匹配到的文件)
 // 一般情况下，files 里会指定构建出来的产物以及类型文件，而 src，test 等目录下的文件不需要跟随发布。
 "files": [
 "filename.js",
 "directory/",
 "glob/*.{js,json}"
 ],
 // 🔥@type: 'module' => 用 ESM 解释 .js 文件(此时访问 CJS 模块文件需要 .cjs 后缀)；反之同理。
 "type": "module",
 // 🔥@main: 项目入口文件。
 // if "type: 'module'" => 指向 ESM 模块规范的项目入口文件 else => CommonJS 模块规范的项目入口文件。
 "main": "./index.cjs",
 // @browser: web端项目入口文件路径。该路径下文件不允许在 server 端使用。
 "browser": "./browser/index.js",
 // 🔥@module: ESM 规范模块的项目入口文件。
 "module": "./index.js",
 // 🔥@exports: 配置不同环境对应的模块入口文件(优先级最高 > main)。
 // 作用1: 以别名形式封装包的子路径。"import packageA/dist/css/index.css" => "import packageA/style"
 // 作用2: 以 '.' 为别名时，表示模块主入口，可以看做是 "mian"/"module" 等字段功能的集合。
 // 作用3: 设置模块访问权限。exports 限制使用者不可以访问未在"exports"中定义的任何其他路径。
 // 作用4: 提供了项目(包)多入口访问的途径。例如下面的 './docs' 和 './components'
 "exports": {
 ".": {
 "require": "./index.cjs",
 "import": "./index.js"
 },
 "./docs": {
 "require": "./docs/index.cjs",
 "import": "./docs/index.js"
 },
 "./components": {
 "require": "./components/index.cjs",
 "import": "./components/index.js"
 },
 "./style": "./dist/css/index.css'
 },
 // 🔥@workspaces: 项目的工作区配置，用于在本地的根目录下管理多个子项目。
 // 可以自动地在 npm install 时将 workspaces 下面的包，软链到根目录的 node_modules 中，不用手动执行 npm link 操作。
 // 通常子项目都会平铺管理在 packages 目录下，"packages/*" 表示将该路径下所有子项目的 node_modules 软链到根目录。
 "workspaces": [
 "packages/*",
 ],
}
```

> 当一个项目同时定义了 main，browser 和 module，像 webpack，rollup 等构建工具会感知这些字段，并会根据环境以及不同的模块规范来进行不同的入口文件查找。

 `exports` 字段详解

参考 [阮一峰](https://es6.ruanyifeng.com/#docs/module-loader#package-json-%E7%9A%84-exports-%E5%AD%97%E6%AE%B5)

`exports`字段的优先级高于`main`字段。它有多种用法。

1. 子目录别名

`package.json`文件的`exports`字段可以指定脚本或子目录的别名，此时它的前缀的参照拼接路径是包名。

```js
// ./node_modules/es-module-package/package.json
{
 "exports": {
 "./submodule": "./src/submodule.js"
 }
}
```

上面的代码指定`src/submodule.js`别名为`submodule`，然后就可以从别名加载这个文件。

```js
import submodule from 'es-module-package/submodule'
// 加载 ./node_modules/es-module-package/src/submodule.js
```

如果没有指定别名，就不能用“模块+脚本名”这种形式加载脚本。

```js
// 报错
import submodule from 'es-module-package/private-module.js';

// 不报错
import submodule from './node_modules/es-module-package/private-module.js';
```

2. main 的别名

`exports`字段的别名如果是`.`，就代表模块的主入口，优先级高于`main`字段，并且可以直接简写成`exports`字段的值。

```js
{
 "exports": {
 ".": "./main.js"
 }
}

// 等同于
{
 "exports": "./main.js"
}
```

由于`exports`字段只有支持 ES6 的 Node.js 才认识，所以可以同时添加`main`字段来兼容旧版本的 Node.js。

```
{
 "main": "./main-legacy.cjs",
 "exports": {
 ".": "./main-modern.cjs"
 }
}
```

> 上面代码中，老版本的 Node.js （不支持 ES6 模块）的入口文件是`main-legacy.cjs`，新版本的 Node.js 的入口文件是`main-modern.cjs`。

3. 条件加载

利用`.`这个别名，可以为 ES6 模块和 CommonJS 指定不同的入口。

```json
{
 "type": "module",
 "exports": {
 ".": {
 "require": "./main.cjs",
 "default": "./main.js"
 }
 }
}
```

> 上面代码中，别名`.`的`require`条件指定`require()`命令的入口文件（即 CommonJS 的入口），`default`条件指定其他情况的入口，此处配置了 `type: 'module'`，因此默认命中 ESM 模块规范。

 脚本配置

```
{
 // npm run {scripts} / yarn {scripts} 等命令行方式启动预设置的脚本
 "scripts": {
 "build": "webpack"
 },
 // 设置 scripts 里的脚本在运行时的参数
 "config": {
 "port": "3001"
 },
}
```

 依赖配置

项目依赖其他包引用的相关信息。

```js
{
 // 项目生产环境(运行时)下需要用到的依赖
 // 使用 npm install xxx 或则 npm install xxx --save 时，会被自动插入到该字段中。
 "dependencies": {
 "react": "^18.2.0",
 "react-dom": "^18.2.0"
 },
 // 项目开发环境需要用到而运行时不需要的依赖，用于辅助开发
 // 使用 npm install xxx -D 或者 npm install xxx --save-dev 时，会被自动插入到该字段中。
 "devDependencies": {
 "webpack": "^5.69.0"
 },
 // 同伴依赖
 // 一种特殊的依赖，不会被自动安装，通常用于表示与另一个包的依赖与兼容性关系来警示使用者。
 // 比如我们安装 A，A 的正常使用依赖 B@2.x 版本，那么 B@2.x 就应该被列在 A 的 peerDependencies 下，表示“如果你使用我，那么你也需要安装 B，并且至少是 2.x 版本”。
 // 比如 React 组件库 Ant Design，它的 package.json 里 peerDependencies 为
 // 表示如果你使用 Ant Design，那么你的项目也应该安装 react 和 react-dom，并且版本需要大于等于 16.9.0。
 "peerDependencies": {
 "react": ">=16.9.0",
 "react-dom": ">=16.9.0"
 },
 // optionalDependencies
 // 可选依赖，顾名思义，表示依赖是可选的，它不会阻塞主功能的使用，安装或者引入失败也无妨。这类依赖如果安装失败，那么 npm 的整个安装过程也是成功的。
 // 比如我们使用 colors 这个包来对 console.log 打印的信息进行着色来增强和区分提示，但它并不是必需的，所以可以将其加入到 optionalDependencies，并且在运行时处理引入失败的逻辑。
 // 使用 npm install xxx -O 或者 npm install xxx --save-optional 时，依赖会被自动插入到该字段中。
 "optionalDependencies": {
 "colors": "^1.4.0"
 },
 // peerDependenciesMeta
 // 同伴依赖也可以使用 peerDependenciesMeta 将其指定为可选的。
 "peerDependencies": {
 "colors": "^1.4.0"
 },
 "peerDependenciesMeta": {
 "colors": {
 "optional": true
 }
 },
 // bundleDependencies
 // 打包依赖。它的值是一个数组，在发布包时，bundleDependencies 里面的依赖都会被一起打包。
 // 比如指定 react 和 react-dom 为打包依赖：
 // 在执行 npm pack 打包生成 tgz 压缩包中，将出现 node_modules 并包含 react 和 react-dom。
 // 需要注意的是，这个字段数组中的值必须是在 dependencies，devDependencies 两个里面声明过的依赖才行。
 // 普通依赖通常从 npm registry 安装，但当你想用一个不在 npm registry 里的包，或者一个被修改过的第三方包时，打包依赖会比普通依赖更好用。
 "bundleDependencies": [
 "react",
 "react-dom"
 ],
 // overrides
 // overrides 可以重写项目依赖的依赖，及其依赖树下某个依赖的版本号，进行包的替换。
 // 比如某个依赖 A，由于一些原因它依赖的包 foo@1.0.0 需要替换，我们可以使用 overrides 修改 foo 的版本号：
 "overrides": {
 "foo": "1.1.0-patch"
 }
}
```

 发布配置

主要是和项目发布相关的配置。

**private**

如果是私有项目，不希望发布到公共 npm 仓库上，可以将 `private` 设为 true。

```
"private": true
```

**publishConfig**

顾名思义，publishConfig 就是 npm 包发布时使用的配置。

比如在安装依赖时指定了 registry 为 taobao 镜像源，但发布时希望在公网发布，就可以指定 publishConfig.registry。

```
"publishConfig": {
 "registry": "https://registry.npmjs.org/"
}
```

 系统配置

和项目关联的系统配置，比如 node 版本或操作系统兼容性之类。这些要求只会起到提示警告的作用，即使用户的环境不符合要求，也不影响安装依赖包。

**engines**

一些项目由于兼容性问题会对 node 或者包管理器有特定的版本号要求，比如：

```
"engines": {
 "node": ">=14 <16",
 "pnpm": ">7"
}
```

要求 node 版本大于等于 14 且小于 16，同时 pnpm 版本号需要大于 7。

**os**

在 linux 上能正常运行的项目可能在 windows 上会出现异常，使用 os 字段可以指定项目对操作系统的兼容性要求。

```
"os": ["darwin", "linux"]
```

**cpu**

指定项目只能在特定的 CPU 体系上运行。

```
"cpu": ["x64", "ia32"]
```

 第三方配置

一些第三方库或应用在进行某些内部处理时会依赖这些字段，使用它们时需要安装对应的第三方库。

```js
{
 // 其他工具访问本项目 ts 类型定义时的入口文件
 "types": "./index.d.ts",
 // npm 上所有的文件都开启 CDN 服务
 "unpkg": "dist/vue.global.js",
 // 设置项目的浏览器兼容情况, babel 和 autoprefixer 等工具会使用该配置对代码进行转换
 "browserslist": [
 "> 1%",
 "last 2 versions"
 ],
 // 用于 webpack 的 tree-shaking 优化, 指定路径下的文件不参与 tree-shaking 并始终保留。
 "sideEffects": [
 "dist/*",
 "es/**/style/*",
 "lib/**/style/*",
 "*.less"
 ]
}
```

 参考文档

* [资料](https://juejin.cn/post/7145001740696289317)

* [资料](https://juejin.cn/post/7161392772665540644)

## 312 npm script 了解多少？【热度: 364】

* created_at: 2023-04-26T14:20:39Z
* updated_at: 2023-04-26T14:23:07Z
* labels: 工程化
* milestone: 中

 什么是 npm script

npm 允许在package.json文件里面，使用scripts字段定义脚本命令。

```awk
{
 // ...
 "scripts": {
 "build": "node build.js"
 }
}
```

上面代码是`package.json`文件的一个片段，里面的scripts字段是一个对象。它的每一个属性，对应一段脚本。比如，build命令对应的脚本是`node build.js`。

命令行下使用`npm run`命令，就可以执行这段脚本。

```crmsh

$ npm run build
等同于执行
$ node build.js
```

这些定义在`package.json`里面的脚本，就称为npm脚本。它的优点很多。

* 项目的相关脚本，可以集中在一个地方。
* 不同项目的脚本命令，只要功能相同，就可以有同样的对外接口。
* 用户不需要知道怎么测试你的项目，只要运行npm run test即可。
* 可以利用 npm 提供的很多辅助功能。

查看当前项目的所有 npm 脚本命令，可以使用不带任何参数的`npm run`命令。

```applescript
npm run
```

---

 原理

npm run 实际上是 npm run-script 命令的简写

* 从 package.json 文件中读取 scripts 对象里面的全部配置；
* 以传给 npm run 的第一个参数作为键，如dev，在 scripts 对象里面获取对应的值作为接下来要执行的命令，如果没找到直接报错；

每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，npm run新建的这个 Shell，会将当前目录的node\_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。

这意味着，当前目录的node\_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。比如，当前项目的依赖里面有 Mocha，只要直接写mocha test就可以了。

```json
"test": "mocha test"
```

 通配符

由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符。

```json
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```

上面代码中，\*表示任意文件名，\*\*表示任意一层子目录。

如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。

```json
"test": "tap test/\*.js"
```

---

 传参

给 npm script 传递参数 给 npm script 传递参数 eslint 内置了代码风格自动修复模式，只需给它传入 --fix 参数即可，在 scripts 中声明检查代码命令的同时你可能也需要声明修复代码的命令，面对这种需求，大多数同学可能会忍不住复制粘贴，如下：

```diff
@@ -5,6 +5,7 @@
 "lint:js": "eslint *.js",
+ "lint:js:fix": "eslint *.js --fix",
```

在 lint:js 命令比较短的时候复制粘贴的方法简单粗暴有效，但是当 lint:js 命令变的很长之后，难免后续会有人改了 lint:js 而忘记修改 lint:js:fix（别问我为啥，我就是踩着坑过来的），更健壮的做法是，在运行 npm script 时给定额外的参数，代码修改如下：

```diff
@@ -5,6 +5,7 @@
 "lint:js": "eslint *.js",
+ "lint:js:fix": "npm run lint:js -- --fix",
```

要格外注意 --fix 参数前面的 -- 分隔符，意指要给 npm run lint:js 实际指向的命令传递额外的参数。

---

 注释

```swift
"test": "# 运行所有代码检查和单元测试 . npm-run-all --parallel lint:* mocha"
```

或者在单独的文件中可以自由给它添加注释

---

 日志

```dockerfile
npm run test --loglevel silent
npm run test --slient
npm run test -s
```

这个日志级别，只有命令本身的输出，读起来非常的简洁

```dockerfile
npm run test --loglevel verbose
npm run test --verbose
npm run test -d
```

这个日志级别，详细打印出了每个步骤的参数、返回值

---

 执行顺序

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

如果是并行执行（即同时的平行执行），可以使用&符号。

```routeros
npm run script1.js & npm run script2.js
```

如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。

```routeros
npm run script1.js && npm run script2.js
```

这两个符号是 Bash 的功能。此外，还可以使用 node 的任务管理模块：`npm-run-all`、`script-runner`

```awk
// 串行
{
- "test": "npm run lint:js && npm run lint:css && npm run lint:json && npm run lint:markdown"
+ "test": "npm-run-all lint:js lint:css lint:json lint:markdown"
 },
// 并行 --parallel
{
- "test": "npm-run-all lint:*"
+ "test": "npm-run-all --parallel lint:* mocha"
}
```

---

 默认值

一般来说，npm 脚本由用户提供。但是，npm 对两个脚本提供了默认值。也就是说，这两个脚本不用定义，就可以直接使用。

```1c

"start": "node server.js"，
"install": "node-gyp rebuild"
```

上面代码中，npm run start的默认值是node server.js，前提是项目根目录下有server.js这个脚本；npm run install的默认值是node-gyp rebuild，前提是项目根目录下有binding.gyp文件。

---

 钩子

npm 脚本有pre和post两个钩子。举例来说，build脚本命令的钩子就是prebuild和postbuild。

```smalltalk
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```

用户执行npm run build的时候，会自动按照下面的顺序执行。

npm run prebuild && npm run build && npm run postbuild 因此，可以在这两个钩子里面，完成一些准备工作和清理工作。下面是一个例子。

```json

"clean": "rimraf ./dist && mkdir dist",
"prebuild": "npm run clean",
"build": "cross-env NODE_ENV=production webpack"
```

npm 默认提供下面这些钩子。

```
prepublish，postpublish
preinstall，postinstall
preuninstall，postuninstall
preversion，postversion
pretest，posttest
prestop，poststop
prestart，poststart
prerestart，postrestart
```

自定义的脚本命令也可以加上pre和post钩子。比如，myscript这个脚本命令，也有premyscript和postmyscript钩子。不过，双重的pre和post无效，比如prepretest和postposttest是无效的。

npm 提供一个npm\_lifecycle\_event变量，返回当前正在运行的脚本名称，比如pretest、test、posttest等等。所以，可以利用这个变量，在同一个脚本文件里面，为不同的npm scripts命令编写代码。请看下面的例子。

```arcade
const TARGET = process.env.npm_lifecycle_event;

if (TARGET === 'test') {
 console.log(`Running the test task!`);
}

if (TARGET === 'pretest') {
 console.log(`Running the pretest task!`);
}

if (TARGET === 'posttest') {
 console.log(`Running the posttest task!`);
}
```

注意，prepublish这个钩子不仅会在npm publish命令之前运行，还会在npm install（不带任何参数）命令之前运行。这种行为很容易让用户感到困惑，所以 npm 4 引入了一个新的钩子prepare，行为等同于prepublish，而从 npm 5 开始，prepublish将只在npm publish命令之前运行。

---

 简写形式

四个常用的 npm 脚本有简写形式。

```routeros
npm start是npm run start
npm stop是npm run stop的简写
npm test是npm run test的简写
npm restart是npm run stop && npm run restart && npm run start的简写
```

npm start、npm stop和npm restart都比较好理解，而npm restart是一个复合命令，实际上会执行三个脚本命令：stop、restart、start。具体的执行顺序如下。

```crmsh
prerestart
prestop
stop
poststop
restart
prestart
start
poststart
postrestart
```

---

 变量

npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。

运行 `npm run env`能拿到完整的变量列表

使用`npm run env | grep npm_package | sort` 拿到部分排序后的环境变量

通过npm\_package\_前缀，npm 脚本可以拿到package.json里面的字段。比如，下面是一个package.json。

```json
{
 "name": "foo",
 "version": "1.2.5",
 "config" : { "port" : "8080" },
 "scripts" : { "start" : "node server.js" }
}
```

那么，变量npm\_package\_name返回foo，变量npm\_package\_version返回1.2.5。

```arcade
// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5
```

上面代码中，我们通过环境变量process.env对象，拿到package.json的字段值。如果是 Bash 脚本，可以用`$npm_package_name`和`$npm_package_version`取到这两个值。

`$npm_package_scripts_start`

---

 结合 npm script 和 git-hooks

Git 在代码版本管理之外，也提供了类似 npm script 里 pre、post 的钩子机制，叫做 Git Hooks，钩子机制能让我们在代码 commit、push 之前（后）做自己想做的事情。

前端社区里有多种结合 npm script 和 git-hooks 的方案，比如 `pre-commit`、`husky`，相比较而言 husky 更好用，它支持更多的 Git Hooks 种类，再结合 `lint-staged` 使用就更好了。

[了解更多](https://juejin.cn/post/6844903479283040269)

---

 常用脚本示例

```awk
// 删除目录
"clean": "rimraf dist/*",

// 本地搭建一个 HTTP 服务
"serve": "http-server -p 9090 dist/",

// 打开浏览器
"open:dev": "opener http://localhost:9090",

// 实时刷新
 "livereload": "live-reload --port 9091 dist/",

// 构建 HTML 文件
"build:html": "jade index.jade > dist/index.html",

// 只要 CSS 文件有变动，就重新执行构建
"watch:css": "watch 'npm run build:css' assets/styles/",

// 只要 HTML 文件有变动，就重新执行构建
"watch:html": "watch 'npm run build:html' assets/html",

// 部署到 Amazon S3
"deploy:prod": "s3-cli sync ./dist/ s3://example-com/prod-site/",

// 构建 favicon
"build:favicon": "node scripts/favicon.js",
```

## 313 语义化版本 SemVer（Semantic Versioning）了解多少？

* created_at: 2023-04-26T14:40:53Z
* updated_at: 2023-09-12T14:13:38Z
* labels: 工程化
* milestone: 中

Semantic Versioning（语义化版本）是一种为软件组件定义版本号的规范。它使用`“major.minor.patch”`的格式来表示版本号。其中：

* Major（主版本号）：当你做了不兼容的 API 修改时，你需要更新主版本号。
* Minor（次版本号）：当你做了向下兼容的功能性新增时，你需要更新次版本号。
* Patch（修订号）：当你做了向下兼容的问题修正时，你需要更新修订号。

Semantic Versioning 的目的是为了让软件版本号的变化具有可读性和可预测性，这样用户就可以通过版本号来了解软件包的更新内容和影响。

**版本更新**

在升级版本时，常常使用一些符号来指定允许升级的范围，其中包括 ^ 和 ~ 等。

* ^ 表示向后兼容地升级版本号，只允许升级到次版本号或修订版本号，不允许升级到主版本号。
* ~ 表示只允许升级到修订版本号，不允许升级到次版本号或主版本号。

例如，对于版本号为 1.2.3：

* ^1.2.3 允许升级到 1.2.4、1.3.0 等修订号或次版号的版本，但不允许升级到 2.0.0。
* ~1.2.3 只允许升级到 1.2.4、1.2.5 等修订版本号的版本，但不允许升级到 1.3.0、2.0.0 等更高的版本。

## 314 npm lock 文件了解多少？【热度: 258】

* created_at: 2023-04-26T15:05:23Z
* updated_at: 2023-04-26T15:05:23Z
* labels: 工程化, 小米
* milestone: 中

**关键词**：npm lock 原理、npm lock 实现、npm lock 作用

**作用**

npm lock 文件（如 package-lock.json 或 yarn.lock）的作用是确保在不同机器上或在不同时间安装相同的依赖包时，获得相同的版本，以避免由于版本不一致而产生的问题。在安装依赖包时，npm lock 文件会锁定当前的依赖树，并记录每个依赖包的确切版本号和依赖关系。这样，在重新安装依赖包时，npm 将使用 lock 文件中记录的版本和依赖关系来安装依赖包，而不是根据 package.json 文件中的符号依赖去解析版本。这确保了依赖包版本的一致性。

**生成原理**

生成 npm lock 文件的原理如下：

* 当我们使用 npm install 或 npm ci 安装依赖包时，npm 会检查项目中的 `package.json` 文件，并根据其中的依赖包信息，生成一个 `node_modules` 目录用来存储这些依赖包。

* 在生成 node_modules 目录时，npm 会生成一个 `npm-shrinkwrap.json` 或 `package-lock.json` 文件，用来记录所有已经安装的依赖包的精确版本信息和依赖关系。这些信息是根据 `package.json` 文件和 `node_modules` 目录中实际安装的依赖包信息计算出来的。

* 在以后的安装过程中，npm 会先检查是否存在 `npm-shrinkwrap.json` 或 `package-lock.json` 文件，如果存在，就使用其中的依赖包版本信息来安装依赖包，而不是根据 `package.json` 文件中的信息重新计算依赖包版本。这样就可以确保每次安装时都使用相同的依赖包版本，避免了版本不一致导致的问题。

**npm-shrinkwrap.json 是什么文件？**

`npm-shrinkwrap.json` 文件是 Node.js 包管理工具 npm 生成的一份锁定文件，用于锁定项目依赖包的版本，确保团队成员在使用同一版本的依赖包，以避免在不同环境下因版本不一致而导致的问题。

与 `package-lock.json` 文件类似，`npm-shrinkwrap.json` 文件可以在项目中确保依赖包版本的一致性，但它与 `package-lock.json` 文件不同之处在于，它能够锁定所有的依赖包版本，包括间接依赖的包版本，而 `package-lock.json` 文件只会锁定直接依赖包的版本。

同时，使用 `npm-shrinkwrap.json` 文件也需要注意，在项目开发过程中，如果需要升级依赖包版本，需要手动更新 `npm-shrinkwrap.json` 文件中的对应依赖包版本号。

**如何启用 npm-shrinkwrap.json**

在项目根目录下使用以下命令可以生成 `npm-shrinkwrap.json` 文件：

```
npm shrinkwrap
```

如果需要在安装新的包时同时更新 `npm-shrinkwrap.json` 文件，可以使用以下命令：

```
npm shrinkwrap --dev
```

这个命令会把 devDependencies 也包括在生成的 npm-shrinkwrap.json 文件中。

## 315 npx 了解多少？【热度: 290】

* created_at: 2023-04-26T15:15:58Z
* updated_at: 2023-04-26T15:16:44Z
* labels: 工程化, 小米
* milestone: 中

**关键词**：npx 原理、npx 作用、npx 执行

**npx 是什么**

npx是一个由Node.js官方提供的用于快速执行npm包中的可执行文件的工具。它可以帮助我们在不全局安装某些包的情况下，直接运行该包提供的命令行工具。npx会在执行时，检查本地项目中是否安装了对应的依赖，如果没有安装则会自动下载安装，并执行命令。如果本地已经存在该依赖，则直接执行命令。

使用npx时，可以在命令行中输入要执行的包名加上其参数，例如：

```shell
npx create-react-app my-app
```

以上命令会在本地下载并运行create-react-app包中的可执行文件，创建一个名为my-app的React应用程序。

**npx 会把远端的包下载到本地吗?**

npx 不会像 npm 或 yarn 一样将包下载到本地的 node_modules 目录中。相反，它会在执行命令时，在本地缓存中寻找并下载包，然后执行该包中的命令。这样可以避免在开发过程中在全局安装大量的包，同时也可以确保使用的是最新版本的包。

**npx 执行完成之后， 下载的包是否会被删除？**

是的，npx会在执行完命令后删除下载的包。这是因为npx会在执行命令之前，将需要执行的包下载到一个临时目录中，并在执行完毕后删除该目录。这样可以避免在本地留下不必要的依赖包。如果需要保留依赖包，可以使用--no-cleanup选项来禁止删除下载的包。

## 316 npm 包管理了解多少？【热度: 1,321】

* created_at: 2023-04-26T15:28:50Z
* updated_at: 2023-04-26T15:28:50Z
* labels: 工程化, 腾讯
* milestone: 资深

**关键词**：npm 依赖管理、npm 包管理、npm 缓存

**npm 是如何进行依赖管理的？**

npm 是通过 package.json 文件来进行依赖管理的。当在项目中使用第三方库时，我们可以在 package.json 中添加对应的依赖项及版本号，npm 会根据 package.json 中的依赖关系，自动安装相应的依赖包及其依赖项。当我们执行 npm install 命令时，npm 会自动根据 package.json 中的依赖信息进行依赖包的安装。

npm 的依赖管理还涉及到依赖的版本控制，可以在 package.json 中指定对应的版本号，常见的版本号控制符号有：

* `^（caret）`：匹配到次要版本号（第二个数字）的最新版本。例如，^1.2.3 表示安装 1.2.x 的最新版本（除了 1.3.0）。
* `~（tilde）`：匹配到修订版本号（第三个数字）的最新版本。例如，~1.2.3 表示安装 1.2.3 到 1.2.x 的最新版本（除了 1.3.0）。
* `*`：匹配到最新的版本。
* `>=`：匹配到大于或等于指定版本的最新版本。
* `<、<=、>`：匹配到小于、小于等于或大于指定版本的最新版本。

在 npm 的依赖管理中，还有两种类型的依赖关系：生产依赖和开发依赖。生产依赖是指在应用程序运行时必须要加载的依赖，开发依赖是指在应用程序开发过程中使用的依赖。在 package.json 中，生产依赖使用 dependencies 字段，开发依赖使用 devDependencies 字段。这样可以让项目更加清晰地管理其依赖关系。

**npm 有缓存包的能力吗？**

npm有缓存包的能力。当你第一次使用npm安装一个包时，npm会自动将该包缓存在本地。这样，当你下次需要安装相同版本的该包时，npm就不必重新从网络上下载该包，而是直接使用缓存中的包。这样可以提高包的下载速度，节省网络带宽。

npm的缓存位于本地文件系统中的一个隐藏目录。默认情况下，缓存位于当前用户的主目录下的.npm目录中。你可以使用以下命令查看npm缓存的路径：

```shell
npm config get cache
```

你也可以通过npm cache命令来管理npm缓存，例如清空缓存：

```shell
npm cache clean
```

或者查看缓存的统计信息：

```shell
npm cache ls
```

**npm 是如何使用缓存中的包的？**

使用缓存中的包可以通过以下两种方式实现：

* `使用 npm ci 命令`
npm ci 命令会首先检查 package-lock.json 或 npm-shrinkwrap.json 文件，以确保安装的依赖与锁定的版本一致。然后，它会在 node_modules 目录下安装依赖，如果缓存中存在符合要求的包，npm ci 会直接从缓存中复制到 node_modules 目录下，而不需要重新下载和编译。

* `手动指定缓存路径`
如果需要手动使用缓存中的包，可以在 npm install 命令中指定缓存路径，例如：

```shell
npm install --cache /path/to/npm-cache
```

然后，执行 npm install 命令时，npm 会尝试从指定的缓存路径中获取包，如果找到匹配的包，就会直接复制到 node_modules 目录下。

需要注意的是，手动指定缓存路径的方式可能会导致不同的项目之间共用缓存，因此需要确保缓存路径的唯一性。

## 317 [React] react 是如何实现页面的快速响应？【热度: 696】

* created_at: 2023-04-27T14:49:35Z
* updated_at: 2023-04-27T15:13:20Z
* labels: web框架
* milestone: 中

**关键词**：react 快速响应实现、react 可中断更新、react IO瓶颈、react CPU瓶颈

 react 是如何实现快速响应的？

我们日常使用App，浏览网页时，有两类场景会制约快速响应：

当遇到大计算量的操作或者设备性能不足使页面掉帧，导致卡顿。

发送网络请求后，由于需要等待数据返回才能进一步操作导致不能快速响应。

这两类场景可以概括为：

* CPU的瓶颈
* IO的瓶颈

 CPU的瓶颈

**主流浏览器刷新频率为60Hz，即每（1000ms / 60Hz）16.6ms浏览器刷新一次。**

我们知道，JS可以操作DOM，GUI渲染线程与JS线程是互斥的。所以JS脚本执行和浏览器布局、绘制不能同时执行。

在每16.6ms时间内，需要完成如下工作： `JS脚本执行 ----- 样式布局 ----- 样式绘制`

当JS执行时间过长，超出了16.6ms，这次刷新就没有时间执行样式布局和样式绘制了。

比如我们可以通过一个循环， 渲染列表 3000 个组件， 那么这种渲染时间， 就肯定是远超过 16.6 ms 的， 页面就会感觉到卡顿。

如何解决这个问题呢？

**答案是：在浏览器每一帧的时间中，预留一些时间给JS线程，React利用这部分时间更新组件（可以看到，在源码中，预留的初始时间是5ms）。**
源码位置： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/scheduler/src/forks/SchedulerHostConfig.default.js#L119)

当预留的时间不够用时，React将线程控制权交还给浏览器使其有时间渲染UI，React则等待下一帧时间到来继续被中断的工作。

这种将长任务分拆到每一帧中，像蚂蚁搬家一样一次执行一小段任务的操作，被称为时间切片（time slice）

**所以，解决CPU瓶颈的关键是实现时间切片，而时间切片的关键是：将同步的更新变为可中断的异步更新。**

 IO的瓶颈

网络延迟是前端开发者无法解决的。如何在网络延迟客观存在的情况下，减少用户对网络延迟的感知？

简单点儿来说， 就是在点击页面跳转的是时候提前去加载下一个页面的内容。 或者在当前页面 hold .5s 左右时间， 利用这个时间去加载下一个页面的内容。
从而达到下一个页面的快速交互

React实现了 `Suspense` 功能及配套的 hook——`useDeferredValue`。

而在源码内部，为了支持这些特性，**同样需要将同步的更新变为可中断的异步更新。**

## 318 [React] React15 架构存在什么样的问题？【热度: 1,613】

* created_at: 2023-04-27T14:59:36Z
* updated_at: 2023-04-27T15:13:34Z
* labels: web框架
* milestone: 高

**关键词**：react15 架构、react 架构、react Reconciler、react 渲染器、react 协调器

React15 架构可以分为两层：

* Reconciler（协调器）—— 负责找出变化的组件
* Renderer（渲染器）—— 负责将变化的组件渲染到页面上

 Reconciler（协调器）

我们知道，在React中可以通过 `this.setState、this.forceUpdate、ReactDOM.render` 等API触发更新。

每当有更新发生时，Reconciler会做如下工作：

* 调用函数组件、或class组件的render方法，将返回的JSX转化为虚拟DOM
* 将虚拟DOM和上次更新时的虚拟DOM对比
* 通过对比找出本次更新中变化的虚拟DOM
* 通知Renderer将变化的虚拟DOM渲染到页面上

 Renderer（渲染器）

由于React支持跨平台，所以不同平台有不同的Renderer。我们前端最熟悉的是负责在浏览器环境渲染的Renderer —— `ReactDOM`

除此之外，还有：

* ReactNative 渲染器，渲染App原生组件
* ReactTest 渲染器，渲染出纯Js对象用于测试
* ReactArt 渲染器，渲染到Canvas, SVG 或 VML (IE8)

在每次更新发生时，Renderer接到 `Reconciler` 通知，将变化的组件渲染在当前宿主环境。

 React15 架构的缺点

**react15 是通过递归去更新组件的**

在 Reconciler 中，mount的组件会调用 mountComponent (opens new window)，update 的组件会调用 updateComponent (opens new window)。这两个方法都会递归更新子组件。

**由于递归执行，所以更新一旦开始，中途就无法中断。当层级很深时，递归更新时间超过了16ms，用户交互就会卡顿。**

本质上说是因为 递归 的架构， 是不允许中断的， 因为 react 希望有更好的渲染性能，那么面对大规模 dom diff 更新渲染的时候， 就不能让每一递归时间超过 16 ms。
递归是做不到这个功能的。 所以只有重写 react15 架构。引入了 react16 fiber 架构。

## 319 [React] React16 是什么样的架构特点？【热度: 2,403】

* created_at: 2023-04-27T15:12:52Z
* updated_at: 2023-04-27T15:13:45Z
* labels: web框架
* milestone: 高

**关键词**：react16 架构、react Reconciler、react fiber、react 渲染器、react 协调器

React16架构可以分为三层：

Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
Reconciler（协调器）—— 负责找出变化的组件
Renderer（渲染器）—— 负责将变化的组件渲染到页面上
可以看到，相较于React15，React16中新增了Scheduler（调度器）。

 Scheduler（调度器）

以浏览器是否有剩余时间作为任务中断的标准，那么**需要一种机制，当浏览器有剩余时间时通知我们**。

其实部分浏览器已经实现了这个API，这就是 `requestIdleCallback` (opens new window)。但是由于以下因素，React放弃使用：

* 浏览器兼容性
* 触发频率不稳定，受很多因素影响。比如当我们的浏览器切换tab后，之前tab注册的 `requestIdleCallback` 触发的频率会变得很低

基于以上原因，React实现了功能更完备的 `requestIdleCallback polyfill`，这就是`Scheduler`。除了在空闲时触发回调的功能外，`Scheduler` 还提供了多种调度优先级供任务设置。

Scheduler (opens new window) 是独立于React的库

 Reconciler（协调器）

在 React15 中 `Reconciler` 是递归处理虚拟DOM的

在 React16 中更新工作从递归变成了可以中断的循环过程。每次循环都会调用 `shouldYield` 判断当前是否有剩余时间。

```js
/** @noinline */
function workLoopConcurrent () {
  // Perform work until Scheduler asks us to yield
  while (workInProgress !== null && !shouldYield()) {
    workInProgress = performUnitOfWork(workInProgress)
  }
}
```

**那么React16是如何解决中断更新时DOM渲染不完全的问题呢？**

在React16中，Reconciler与Renderer不再是交替工作。当Scheduler将任务交给Reconciler后，Reconciler会为变化的虚拟DOM打上代表增/删/更新的标记；

全部标记可以见这里： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactSideEffectTags.js)

整个Scheduler与 Reconciler 的工作都在内存中进行。只有当所有组件都完成Reconciler的工作，才会统一交给Renderer。

可以看这里 react16 对 Reconciler 的解释：[资料](https://zh-hans.legacy.reactjs.org/docs/codebase-overview.html#fiber-reconciler)

Reconciler 内部采用了 `Fiber` 的架构。

 Renderer（渲染器）

Renderer根据Reconciler为虚拟DOM打的标记，同步执行对应的DOM操作。

 参考资料

* [资料](https://react.iamkasong.com/preparation/newConstructure.html#react16%E6%9E%B6%E6%9E%84)

```js
``

## 320 [React] React Reconciler 为何要采用 fiber 架构？【热度: 1,794】

* created_at: 2023-04-27T15:37:45Z
* updated_at: 2023-04-27T15:37:45Z
* labels: web框架
* milestone: 资深

**关键词**：react16 架构、react Reconciler、react fiber、react 协调器

 代数效应的实践

React中做的就是践行代数效应（Algebraic Effects）。

简单点儿来说就是： **用于将副作用从函数调用中分离。**

举例子：
比如我们要获取用户的姓名做展示：

```js
const resource = fetchProfileData()

function ProfileDetails () {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read()
  return <h1>{user.name}</h1>
}
```

代码如上， 但是 resource 是通过异步获取的。 这个时候代码就要改为下面这种形式

```js
const resource = fetchProfileData()

async function ProfileDetails () {
  // Try to read user info, although it might not have loaded yet
  const user = await resource.user.read()
  return <h1>{user.name}</h1>
}
```

但是 async/await 是具有传染性的。 这个穿践行就是副作用， 我们不希望有这样的副作用， 尽管里面有异步调用， 不希望这样的副作用传递给外部的函数， 只希望外部的函数是一个纯函数。

 代数效应在React中的应用

在 react 代码中， 每一个函数式组件， 其实都是一个纯函数， 但是内部里面可能会有各种各样的副作用。 这些副作用就是我们使用的 hooks;

对于类似useState、useReducer、useRef这样的Hook，我们不需要关注FunctionComponent的state在Hook中是如何保存的，React会为我们处理。

我们只需要假设useState返回的是我们想要的state，并编写业务逻辑就行。

可以看官方的 Suspense demo, 可以是通过 Suspense 让内部直接可以同步的方式调用异步代码；
代码链接： [资料](https://codesandbox.io/s/frosty-hermann-bztrp?file=/src/index.js:152-160)

```jsx
import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { fetchProfileData } from "./fakeApi";

const resource = fetchProfileData();

function ProfilePage() {
 return (
 <Suspense
 fallback={<h1>Loading profile...</h1>}
 >
 <ProfileDetails />
 <Suspense
 fallback={<h1>Loading posts...</h1>}
 >
 <ProfileTimeline />
 </Suspense>
 </Suspense>
 );
}

function ProfileDetails() {
 // Try to read user info, although it might not have loaded yet
 const user = resource.user.read();
 return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
 // Try to read posts, although they might not have loaded yet
 const posts = resource.posts.read();
 return (
 <ul>
 {posts.map(post => (
 <li key={post.id}>{post.text}</li>
 ))}
 </ul>
 );
}

const rootElement = document.getElementById(
 "root"
);
ReactDOM.createRoot(rootElement).render(
 <ProfilePage />
);
```

 Generator 架构

从React15到React16，协调器（Reconciler）重构的一大目的是：将老的同步更新的架构变为异步可中断更新。

异步可中断更新可以理解为：更新在执行过程中可能会被打断（浏览器时间分片用尽或有更高优任务插队），当可以继续执行时恢复之前执行的中间状态。

其实，浏览器原生就支持类似的实现，这就是Generator。

但是Generator的一些缺陷使React团队放弃了他：

* 类似async，Generator也是传染性的，使用了Generator则上下文的其他函数也需要作出改变。这样心智负担比较重。
* Generator执行的中间状态是上下文关联的。

例如这样的例子：

```js
function * doWork (A, B, C) {
  const x = doExpensiveWorkA(A)
  yield
  const y = x + doExpensiveWorkB(B)
  yield
  const z = y + doExpensiveWorkC(C)
  return z
}
```

但是当我们考虑“高优先级任务插队”的情况，如果此时已经完成doExpensiveWorkA与doExpensiveWorkB计算出x与y。

此时B组件接收到一个高优更新，由于Generator执行的中间状态是上下文关联的，所以计算y时无法复用之前已经计算出的x，需要重新计算。

如果通过全局变量保存之前执行的中间状态，又会引入新的复杂度。

 fiber 架构

他的中文翻译叫做纤程，与进程（Process）、线程（Thread）、协程（Coroutine）同为程序执行过程。

在很多文章中将纤程理解为协程的一种实现。在JS中，协程的实现便是Generator。

所以，我们可以将纤程(Fiber)、协程(Generator)理解为代数效应思想在JS中的体现。

React Fiber可以理解为：

React内部实现的一套状态更新机制。支持任务不同优先级，可中断与恢复，并且恢复后可以复用之前的中间状态。

其中每个任务更新单元为React Element对应的Fiber节点。

## 322 [React] fiber 架构 的工作原理？【热度: 1,774】

* created_at: 2023-04-28T16:23:02Z
* updated_at: 2023-04-28T16:37:43Z
* labels: web框架
* milestone: 高

**关键词**：react16 架构、react Reconciler、react fiber、react 协调器

 双缓存Fiber树

如果当前帧画面计算量比较大，导致清除上一帧画面到绘制当前帧画面之间有较长间隙，就会出现白屏。

为了解决这个问题， 就有了图像处理中的**双缓存技术**。

双缓存是一种技术，用于在图像处理中减少闪烁和图像模糊等视觉问题。在使用双缓存时，图像处理器会将图像绘制到一个“后台缓存”中，而不是直接绘制到屏幕上。一旦绘制完成，新的图像将与当前显示的图像交换，使得新图像无缝地显示在屏幕上，避免了闪烁和模糊的问题。因此，双缓存有助于提高图像处理的质量和可靠性，特别是在高速显示和实时处理应用中。

React使用“双缓存”来完成Fiber树的构建与替换——对应着DOM树的创建与更新。

在React中最多会同时存在两棵Fiber树。当前屏幕上显示内容对应的Fiber树称为current Fiber树，正在内存中构建的Fiber树称为workInProgress Fiber树。

React Fiber 的双缓存机制是一种优化技术，用于在 UI 更新过程中避免视觉问题，如闪烁、撕裂和卡顿等。React Double Buffer 在 React Fiber 内部实现了两个缓存区域：当前显示的缓存（Current Buffer）和等待显示的缓存（Work Buffer）。

```js
currentFiber.alternate === workInProgressFiber
workInProgressFiber.alternate === currentFiber
```

当应用程序状态发生更改，并需要更新 UI 时，React Fiber 首先在 Work Buffer 中执行所有渲染操作，以避免将中间状态呈现在屏幕上。一旦 Work Buffer 中的所有渲染操作完成，React Fiber 将当前缓存与工作缓存进行切换，即将 Work Buffer 设置为当前缓存，以此来更新屏幕上的 UI。

这样一来，React Fiber 就可以确保在任何时候，所有呈现在屏幕上的内容都是完整和稳定的。

 mount与update 场景

当组件第一次被挂载时：

```jsx
class MyComponent extends React.Component {

 constructor(props) {
 super(props);
 this.state = {
 count: 0,
 };
 }

 handleClick = () => {
 this.setState((prevState) => ({
 count: prevState.count + 1,
 }));
 }

 render() {
 return (
 <div onClick={this.handleClick}>
 Click me: {this.state.count}
 </div>
 );
 }
}

ReactDOM.render(<MyComponent />, document.getElementById('root'));
```

当我们将 `<MyComponent />` 挂载到页面上时，React Fiber 首先会在内存中创建一个空的 Fiber 树，然后根据组件的定义，为组件创建一个初始的“工作单元”（Work In Progress）。

在这个工作单元内部，React Fiber 会为状态和 props 建立初始的 Fiber 对象，并在之后的更新过程中使用这些 Fiber 对象来跟踪组件的状态和变化。这样可以确保任何时候都可以根据状态和 props 的变化来更新 UI，而不会出现任何问题。

接下来，React Fiber 开始在工作单元中执行所有的渲染操作，生成一棵虚拟 DOM 树，并将其添加到 Work Buffer 中。然后，React Fiber 会检查 Work Buffer 是否有更改，如果有更改，就将 Work Buffer 与 Current Buffer 进行对比，以查找差异并更新到 DOM 上。

这个初次渲染的过程不太会涉及到双缓存树，因为当前缓存是空的，所有的操作都是在 Work Buffer 中进行的。但是，一旦初次渲染完成，并且组件状态发生变化时，双缓存树就开始发挥作用了。

当我们通过点击按钮更新组件状态时，React Fiber 将启动一个新的渲染周期，并为更新创建一个新的工作单元。React Fiber 会在新的工作单元中更新状态、生成新的虚拟 DOM 树，并将其添加到 Work Buffer 中。

然后，React Fiber 会将 Work Buffer 与 Current Buffer 进行对比，找出差异并将其更新到 DOM 上。但是，由于双缓存树的存在，React Fiber 不会立即将 Work Buffer 切换到 Current Buffer，以避免将中间状态显示在屏幕上。

 执行流程

好的，下面是 React Fiber 在页面初次更新时的工作过程的流程图：

1. 应用程序启动，ReactDOM 调用 `ReactDOM.render()` 方法，并将组件渲染到 DOM 中，React Fiber 创建一个空的 Fiber 树。
2. React Fiber 为组件创建初始的“工作单元”，并在其中创建状态和 props 的 Fiber 对象。
3. React Fiber 执行组件的 `render()` 方法，生成虚拟 DOM 树并添加到工作单元中。
4. React Fiber 将工作单元中的虚拟 DOM 树添加到 Work Buffer 中。
5. React Fiber 检查 Work Buffer 是否有更改，如果有更改，则将其与 Current Buffer 进行对比，并将差异更新到 DOM 上。
6. 由于这是初次渲染，Current Buffer 为空，所有更新操作都在 Work Buffer 中完成，然后将 Work Buffer 设置为 Current Buffer。
7. React Fiber 在内存中保留 Fiber 树的副本，并用于后续的更新操作。此时，组件初次渲染流程结束。

## 323 [React] Fiber的含义与数据结构【热度: 1,778】

* created_at: 2023-04-28T17:31:23Z
* updated_at: 2023-04-28T17:31:24Z
* labels: web框架
* milestone: 高

**关键词**：react16 架构、react Reconciler、react fiber、react 协调器

 Fiber的含义

1. 作为架构来说，之前React15的Reconciler采用递归的方式执行，数据保存在递归调用栈中，所以被称为stack Reconciler。React16的Reconciler基于Fiber节点实现，被称为Fiber Reconciler。

2. 作为静态的数据结构来说，每个Fiber节点对应一个React element，保存了该组件的类型（函数组件/类组件/原生组件...）、对应的DOM节点等信息。

3. 作为动态的工作单元来说，每个Fiber节点保存了本次更新中该组件改变的状态、要执行的工作（需要被删除/被插入页面中/被更新...）。

 Fiber的结构

总的属性如下：

```js
function FiberNode(
 tag: WorkTag,
 pendingProps: mixed,
 key: null | string,
 mode: TypeOfMode,
) {
 // 作为静态数据结构的属性
 this.tag = tag;
 this.key = key;
 this.elementType = null;
 this.type = null;
 this.stateNode = null;

 // 用于连接其他Fiber节点形成Fiber树
 this.return = null;
 this.child = null;
 this.sibling = null;
 this.index = 0;

 this.ref = null;

 // 作为动态的工作单元的属性
 this.pendingProps = pendingProps;
 this.memoizedProps = null;
 this.updateQueue = null;
 this.memoizedState = null;
 this.dependencies = null;

 this.mode = mode;

 this.effectTag = NoEffect;
 this.nextEffect = null;

 this.firstEffect = null;
 this.lastEffect = null;

 // 调度优先级相关
 this.lanes = NoLanes;
 this.childLanes = NoLanes;

 // 指向该fiber在另一次更新时对应的fiber
 this.alternate = null;
}
```

可以按三层含义将他们分类来看

 作为架构

每个Fiber节点有个对应的React element，多个Fiber节点是如何连接形成树呢？靠如下三个属性：

```js
// 指向父级Fiber节点
this.return = null
// 指向子Fiber节点
this.child = null
// 指向右边第一个兄弟Fiber节点
this.sibling = null
```

举个例子，如下的组件结构：

```js
function App () {
  return (
 <div>
 i am
 <span>KaSong</span>
 </div>
  )
}
```

对应的Fiber树结构：
![image](https://user-images.githubusercontent.com/22188674/235214339-4efeccaf-95fd-420f-8ac2-7a9b89c301c0.png)

 作为静态的数据结构

作为一种静态的数据结构，保存了组件相关的信息：

```js
// Fiber对应组件的类型 Function/Class/Host...
this.tag = tag
// key属性
this.key = key
// 大部分情况同type，某些情况不同，比如FunctionComponent使用React.memo包裹
this.elementType = null
// 对于 FunctionComponent，指函数本身，对于ClassComponent，指class，对于HostComponent，指DOM节点tagName
this.type = null
// Fiber对应的真实DOM节点
this.stateNode = null
```

 作为动态的工作单元

作为动态的工作单元，Fiber中如下参数保存了本次更新相关的信息，我们会在后续的更新流程中使用到具体属性时再详细介绍

```js
// 保存本次更新造成的状态改变相关信息
this.pendingProps = pendingProps
this.memoizedProps = null
this.updateQueue = null
this.memoizedState = null
this.dependencies = null

this.mode = mode

// 保存本次更新会造成的DOM操作
this.effectTag = NoEffect
this.nextEffect = null

this.firstEffect = null
this.lastEffect = null

// 调度优先级相关
this.lanes = NoLanes
this.childLanes = NoLanes
```

## 324 [React] render 阶段的执行过程【热度: 1,793】

* created_at: 2023-04-30T15:45:51Z
* updated_at: 2023-04-30T15:45:52Z
* labels: web框架
* milestone: 高

**关键词**：react16 架构、react Reconciler、react fiber、react 协调器

render阶段开始于`performSyncWorkOnRoot`或`performConcurrentWorkOnRoot`方法的调用。这取决于本次更新是同步更新还是异步更新。

```js
// performSyncWorkOnRoot会调用该方法
function workLoopSync () {
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress)
  }
}

// performConcurrentWorkOnRoot会调用该方法
function workLoopConcurrent () {
  while (workInProgress !== null && !shouldYield()) {
    performUnitOfWork(workInProgress)
  }
}
```

可以看到，他们唯一的区别是是否调用shouldYield。如果当前浏览器帧没有剩余时间，shouldYield会中止循环，直到浏览器有空闲时间后再继续遍历。

workInProgress代表当前已创建的workInProgress fiber。

performUnitOfWork方法会创建下一个Fiber节点并赋值给workInProgress，并将workInProgress与已创建的Fiber节点连接起来构成Fiber树。

通过遍历的方式实现可中断的递归，所以performUnitOfWork的工作可以分为两部分：“递”和“归”。

 创建节点

首先从rootFiber开始向下深度优先遍历。为遍历到的每个Fiber节点调用`beginWork`方法 (opens new window)。

该方法会根据传入的Fiber节点创建子Fiber节点，并将这两个Fiber节点连接起来。

当遍历到叶子节点（即没有子组件的组件）时就会进入“归”阶段。

在“归”阶段会调用`completeWork` (opens new window)处理Fiber节点。

当某个Fiber节点执行完completeWork，如果其存在兄弟Fiber节点（即fiber.sibling !== null），会进入其兄弟Fiber的“递”阶段。

如果不存在兄弟Fiber，会进入父级Fiber的“归”阶段。

“递”和“归”阶段会交错执行直到“归”到rootFiber。至此，render阶段的工作就结束了。

**举例**

代码如下：

```js
function App () {
  return (
 <div>
 i am
 <span>KaSong</span>
 </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
```

对应的 fiber 树结构如下
![image](https://user-images.githubusercontent.com/22188674/235359287-0f448fa3-657d-40b4-8cff-92327ef5414c.png)

render 阶段会依次执行

```
1. rootFiber beginWork
2. App Fiber beginWork
3. div Fiber beginWork
4. "i am" Fiber beginWork
5. "i am" Fiber completeWork
6. span Fiber beginWork
7. span Fiber completeWork
8. div Fiber completeWork
9. App Fiber completeWork
10. rootFiber completeWork
```

 beginWork

源码链接： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberBeginWork.new.js#L3075)

工作流程图：
![image](https://user-images.githubusercontent.com/22188674/235361451-6440499a-09dc-4478-81e4-e0585e815f0b.png)

beginWork的工作是传入当前Fiber节点，创建子Fiber节点，我们从传参来看看具体是如何做的。

**传参**

```ts
function beginWork (
  current: Fiber | null, // 当前组件对应的Fiber节点在上一次更新时的Fiber节点，即workInProgress.alternate
  workInProgress: Fiber, // 当前组件对应的Fiber节点
  renderLanes: Lanes // 优先级相关，在讲解Scheduler时再讲解
): Fiber | null {
  // ...省略函数体
}
```

beginWork的工作可以分为两部分:

* `update`时：如果current存在，在满足一定条件时可以复用current节点，这样就能克隆current.child作为workInProgress.child，而不需要新建workInProgress.child。
* `mount`时：除fiberRootNode以外，current === null。会根据fiber.tag不同，创建不同类型的子Fiber节点

```ts
function beginWork (
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {

  // update时：如果current存在可能存在优化路径，可以复用current（即上一次更新的Fiber节点）
  if (current !== null) {
    // ...省略

    // 复用current
    return bailoutOnAlreadyFinishedWork(
      current,
      workInProgress,
      renderLanes
    )
  } else {
    didReceiveUpdate = false
  }

  // mount时：根据tag不同，创建不同的子Fiber节点
  switch (workInProgress.tag) {
    case IndeterminateComponent:
      // ...省略
    case LazyComponent:
      // ...省略
    case FunctionComponent:
      // ...省略
    case ClassComponent:
      // ...省略
    case HostRoot:
      // ...省略
    case HostComponent:
      // ...省略
    case HostText:
 // ...省略
 // ...省略其他类型
  }
}
```

 update时

满足如下情况时didReceiveUpdate === false（即可以直接复用前一次更新的子Fiber，不需要新建子Fiber）

```ts
if (current !== null) {
  const oldProps = current.memoizedProps
  const newProps = workInProgress.pendingProps

  if (
    oldProps !== newProps ||
 hasLegacyContextChanged() ||
 (__DEV__ ? workInProgress.type !== current.type : false)
  ) {
    didReceiveUpdate = true
  } else if (!includesSomeLane(renderLanes, updateLanes)) {
    didReceiveUpdate = false
    switch (workInProgress.tag) {
      // 省略处理
    }
    return bailoutOnAlreadyFinishedWork(
      current,
      workInProgress,
      renderLanes
    )
  } else {
    didReceiveUpdate = false
  }
} else {
  didReceiveUpdate = false
}
```

1. `oldProps === newProps && workInProgress.type === current.type`，即props与fiber.type不变
2. `!includesSomeLane(renderLanes, updateLanes)`，即当前Fiber节点优先级不够，会在讲解Scheduler时介绍

 mount

当不满足优化路径时，我们就进入第二部分，新建子Fiber。

```ts
// mount时：根据tag不同，创建不同的Fiber节点
switch (workInProgress.tag) {
  case IndeterminateComponent:
    // ...省略
  case LazyComponent:
    // ...省略
  case FunctionComponent:
    // ...省略
  case ClassComponent:
    // ...省略
  case HostRoot:
    // ...省略
  case HostComponent:
    // ...省略
  case HostText:
 // ...省略
 // ...省略其他类型
}
```

我们可以看到，根据fiber.tag不同，进入不同类型Fiber的创建逻辑。

对于我们常见的组件类型，如`（FunctionComponent/ClassComponent/HostComponent）`，最终会进入`reconcileChildren` (opens new window)方法。

 reconcileChildren

* 对于mount的组件，他会创建新的子Fiber节点
* 对于update的组件，他会将当前组件与该组件在上次更新时对应的Fiber节点比较（也就是俗称的Diff算法），将比较的结果生成新Fiber节点

```ts
export function reconcileChildren (
  current: Fiber | null,
  workInProgress: Fiber,
  nextChildren: any,
  renderLanes: Lanes
) {
  if (current === null) {
    // 对于mount的组件
    workInProgress.child = mountChildFibers(
      workInProgress,
      null,
      nextChildren,
      renderLanes
    )
  } else {
    // 对于update的组件
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren,
      renderLanes
    )
  }
}
```

从代码可以看出，和beginWork一样，他也是通过current === null ?区分mount与update。

不论走哪个逻辑，最终他会生成新的子Fiber节点并赋值给workInProgress.child，作为本次beginWork返回值 (opens new window)
，并作为下次performUnitOfWork执行时workInProgress的传参

 effectTag

我们知道，render阶段的工作是在内存中进行，当工作结束后会通知Renderer需要执行的DOM操作。要执行DOM操作的具体类型就保存在fiber.effectTag中。

```ts
// DOM需要插入到页面中
export const Placement = // */ 0b00000000000010;
// DOM需要更新
export const Update = // */ 0b00000000000100;
// DOM需要插入到页面中并更新
export const PlacementAndUpdate = // */ 0b00000000000110;
// DOM需要删除
export const Deletion = // */ 0b00000000001000;
```

通过二进制表示effectTag，可以方便的使用位操作为fiber.effectTag赋值多个effect。

那么，如果要通知Renderer将Fiber节点对应的DOM节点插入页面中，需要满足两个条件：

1. `fiber.stateNode`存在，即Fiber节点中保存了对应的DOM节点

2. `(fiber.effectTag & Placement) !== 0`，即 `Fiber节点存在Placement effectTag`

我们知道，mount时，fiber.stateNode === null，且在reconcileChildren中调用的mountChildFibers不会为Fiber节点赋值effectTag。那么首屏渲染如何完成呢？

针对第一个问题，`fiber.stateNode`会在`completeWork`中创建，我们会在下一节介绍。

第二个问题的答案十分巧妙：假设`mountChildFibers`也会赋值effectTag，那么可以预见mount时整棵Fiber树所有节点都会有Placement
effectTag。那么commit阶段在执行DOM操作时每个节点都会执行一次插入操作，这样大量的DOM操作是极低效的。

为了解决这个问题，**在mount时只有rootFiber会赋值Placement effectTag**，在commit阶段只会执行一次插入操作。

 completeWork

流程图：
![image](https://user-images.githubusercontent.com/22188674/235362048-ce278ddf-b944-4ed6-a6af-e3b1502fb6c7.png)

类似beginWork，completeWork也是针对不同fiber.tag调用不同的处理逻辑。

```ts
function completeWork (
  current: Fiber | null,
  workInProgress: Fiber,
  renderLanes: Lanes
): Fiber | null {
  const newProps = workInProgress.pendingProps

  switch (workInProgress.tag) {
    case IndeterminateComponent:
    case LazyComponent:
    case SimpleMemoComponent:
    case FunctionComponent:
    case ForwardRef:
    case Fragment:
    case Mode:
    case Profiler:
    case ContextConsumer:
    case MemoComponent:
      return null
    case ClassComponent: {
      // ...省略
      return null
    }
    case HostRoot: {
      // ...省略
      updateHostContainer(workInProgress)
      return null
    }
    case HostComponent: {
      // ...省略
      return null
    }
 // ...省略
  }
  // ...省略
}
```

我们重点关注页面渲染所必须的 `HostComponent`（即原生DOM组件对应的Fiber节点），其他类型Fiber的处理留在具体功能实现时讲解。

 处理 HostComponent

和`beginWork`一样，我们根据 `current === null` ?判断是mount还是`update`。

同时针对 `HostComponent`，判断 `update` 时我们还需要考虑 `workInProgress.stateNode != null` ?（即该Fiber节点是否存在对应的DOM节点）

```ts
case
HostComponent: {
 popHostContext(workInProgress);
 const rootContainerInstance = getRootHostContainer();
 const type = workInProgress.type;

 if (current !== null && workInProgress.stateNode != null) {
 // update的情况
 // ...省略
 } else {
 // mount的情况
 // ...省略
 }
 return null;
}
```

 update 时

当update时，Fiber节点已经存在对应DOM节点，所以不需要生成DOM节点。需要做的主要是处理props，比如：

* `onClick、onChange` 等回调函数的注册
* 处理 `style prop`
* 处理 `DANGEROUSLY_SET_INNER_HTML prop`
* 处理 `children prop`

我们去掉一些当前不需要关注的功能（比如ref）。可以看到最主要的逻辑是调用updateHostComponent方法。

```ts
if (current !== null && workInProgress.stateNode != null) {
  // update的情况
  updateHostComponent(
    current,
    workInProgress,
    type,
    newProps,
    rootContainerInstance
  )
}
```

在updateHostComponent内部，被处理完的props会被赋值给workInProgress.updateQueue，并最终会在commit阶段被渲染在页面上。

`workInProgress.updateQueue = (updatePayload: any);`

其中updatePayload为数组形式，他的偶数索引的值为变化的prop key，奇数索引的值为变化的prop value。

 mount 时

同样，我们省略了不相关的逻辑。可以看到，mount时的主要逻辑包括三个：

* 为Fiber节点生成对应的DOM节点
* 将子孙DOM节点插入刚生成的DOM节点中
* 与update逻辑中的updateHostComponent类似的处理props的过程

```ts
// mount的情况

// ...省略服务端渲染相关逻辑

const currentHostContext = getHostContext()
// 为fiber创建对应DOM节点
const instance = createInstance(
  type,
  newProps,
  rootContainerInstance,
  currentHostContext,
  workInProgress
)
// 将子孙DOM节点插入刚生成的DOM节点中
appendAllChildren(instance, workInProgress, false, false)
// DOM节点赋值给fiber.stateNode
workInProgress.stateNode = instance

// 与update逻辑中的updateHostComponent类似的处理props的过程
if (
  finalizeInitialChildren(
    instance,
    type,
    newProps,
    rootContainerInstance,
    currentHostContext
  )
) {
  markUpdate(workInProgress)
}
```

mount时只会在rootFiber存在Placement effectTag。那么commit阶段是如何通过一次插入DOM操作（对应一个Placement effectTag）将整棵DOM树插入页面的呢？

原因就在于 `completeWork中的appendAllChildren` 方法。

由于`completeWork`属于“归”阶段调用的函数，每次调用`appendAllChildren`时都会将已生成的子孙DOM节点插入当前生成的DOM节点下。那么当“归”到rootFiber时，我们已经有一个构建好的离屏DOM树。

 effectList

至此render阶段的绝大部分工作就完成了。

还有一个问题：作为DOM操作的依据，commit阶段需要找到所有有effectTag的Fiber节点并依次执行effectTag对应操作。难道需要在commit阶段再遍历一次Fiber树寻找effectTag !== null的Fiber节点么？

这显然是很低效的。

为了解决这个问题，在completeWork的上层函数completeUnitOfWork中，每个执行完completeWork且存在effectTag的Fiber节点会被保存在一条被称为effectList的单向链表中。

effectList中第一个Fiber节点保存在fiber.firstEffect，最后一个元素保存在fiber.lastEffect。

类似appendAllChildren，在“归”阶段，所有有effectTag的Fiber节点都会被追加在effectList中，最终形成一条以rootFiber.firstEffect为起点的单向链表。

```
 nextEffect nextEffect
rootFiber.firstEffect -----------> fiber -----------> fiber
```

这样，在commit阶段只需要遍历`effectList`就能执行所有`effect`了。

 流程结尾

至此，render阶段全部工作完成。在performSyncWorkOnRoot函数中fiberRootNode被传递给commitRoot方法，开启commit阶段工作流程。

`commitRoot(root);`

## 325 [React] commit 阶段的执行过程【热度: 534】

* created_at: 2023-04-30T16:18:01Z
* updated_at: 2023-04-30T16:18:01Z
* labels: web框架
* milestone: 高

**关键词**：react16 架构、react Reconciler、react commit 阶段、react 协调器

commitRoot方法是commit阶段工作的起点。fiberRootNode会作为传参。 `commitRoot(root);`

如何走到 commit 阶段的， 可以参考这个文档：[资料](https://github.com/pro-collection/interview-question/issues/324)

在rootFiber.firstEffect上保存了一条需要执行副作用的Fiber节点的单向链表effectList，这些Fiber节点的updateQueue中保存了变化的props。

这些副作用对应的DOM操作在commit阶段执行。

除此之外，一些生命周期钩子（比如componentDidXXX）、hook（比如useEffect）需要在commit阶段执行。

commit阶段的主要工作（即Renderer的工作流程）分为三部分：

before mutation阶段（执行DOM操作前）

mutation阶段（执行DOM操作）

layout阶段（执行DOM操作后）

你可以从这里看到commit阶段的完整代码： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactFiberWorkLoop.new.js#L2001)

在before mutation阶段之前和layout阶段之后还有一些额外工作，涉及到比如useEffect的触发、优先级相关的重置、ref的绑定/解绑。

 before mutation之前

`commitRootImpl`方法中直到第一句`if (firstEffect !== null)`之前属于`before mutation之前`。

我们大体看下他做的工作，现在你还不需要理解他们：

```ts
do {
  // 触发useEffect回调与其他同步任务。由于这些任务可能触发新的渲染，所以这里要一直遍历执行直到没有任务
  flushPassiveEffects()
} while (rootWithPendingPassiveEffects !== null)

// root指 fiberRootNode
// root.finishedWork指当前应用的rootFiber
const finishedWork = root.finishedWork

// 凡是变量名带lane的都是优先级相关
const lanes = root.finishedLanes
if (finishedWork === null) {
  return null
}
root.finishedWork = null
root.finishedLanes = NoLanes

// 重置Scheduler绑定的回调函数
root.callbackNode = null
root.callbackId = NoLanes

const remainingLanes = mergeLanes(finishedWork.lanes, finishedWork.childLanes)
// 重置优先级相关变量
markRootFinished(root, remainingLanes)

// 清除已完成的discrete updates，例如：用户鼠标点击触发的更新。
if (rootsWithPendingDiscreteUpdates !== null) {
  if (
    !hasDiscreteLanes(remainingLanes) &&
 rootsWithPendingDiscreteUpdates.has(root)
  ) {
    rootsWithPendingDiscreteUpdates.delete(root)
  }
}

// 重置全局变量
if (root === workInProgressRoot) {
  workInProgressRoot = null
  workInProgress = null
  workInProgressRootRenderLanes = NoLanes
} else {
}

// 将effectList赋值给firstEffect
// 由于每个fiber的effectList只包含他的子孙节点
// 所以根节点如果有effectTag则不会被包含进来
// 所以这里将有effectTag的根节点插入到effectList尾部
// 这样才能保证有effect的fiber都在effectList中
let firstEffect
if (finishedWork.effectTag > PerformedWork) {
  if (finishedWork.lastEffect !== null) {
    finishedWork.lastEffect.nextEffect = finishedWork
    firstEffect = finishedWork.firstEffect
  } else {
    firstEffect = finishedWork
  }
} else {
  // 根节点没有effectTag
  firstEffect = finishedWork.firstEffect
}
```

可以看到，before mutation之前主要做一些变量赋值，状态重置的工作。

这一长串代码我们只需要关注最后赋值的firstEffect，在commit的三个子阶段都会用到他。

 layout之后

接下来让我们简单看下layout阶段执行完后的代码，现在你还不需要理解他们：

```ts
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects

// useEffect相关
if (rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = false
  rootWithPendingPassiveEffects = root
  pendingPassiveEffectsLanes = lanes
  pendingPassiveEffectsRenderPriority = renderPriorityLevel
} else {}

// 性能优化相关
if (remainingLanes !== NoLanes) {
  if (enableSchedulerTracing) {
    // ...
  }
} else {
  // ...
}

// 性能优化相关
if (enableSchedulerTracing) {
  if (!rootDidHavePassiveEffects) {
    // ...
  }
}

// ...检测无限循环的同步任务
if (remainingLanes === SyncLane) {
  // ...
}

// 在离开commitRoot函数前调用，触发一次新的调度，确保任何附加的任务被调度
ensureRootIsScheduled(root, now())

// ...处理未捕获错误及老版本遗留的边界问题

// 执行同步任务，这样同步任务不需要等到下次事件循环再执行
// 比如在 componentDidMount 中执行 setState 创建的更新会在这里被同步执行
// 或useLayoutEffect
flushSyncCallbackQueue()

return null
```

主要包括三点内容：

1. useEffect相关的处理。

2. 性能追踪相关。
源码里有很多和interaction相关的变量。他们都和追踪React渲染时间、性能相关，在Profiler API 和DevTools 中使用。

3. 在commit阶段会触发一些生命周期钩子（如 componentDidXXX）和hook（如useLayoutEffect、useEffect）。

 before mutation 阶段

Renderer工作的阶段被称为commit阶段。commit阶段可以分为三个子阶段：

before mutation阶段（执行DOM操作前）

mutation阶段（执行DOM操作）

layout阶段（执行DOM操作后）

本节我们看看before mutation阶段（执行DOM操作前）都做了什么。

 概览

before mutation阶段的代码很短，整个过程就是遍历effectList并调用commitBeforeMutationEffects函数处理。

```ts
// 保存之前的优先级，以同步优先级执行，执行完毕后恢复之前优先级
const previousLanePriority = getCurrentUpdateLanePriority()
setCurrentUpdateLanePriority(SyncLanePriority)

// 将当前上下文标记为CommitContext，作为commit阶段的标志
const prevExecutionContext = executionContext
executionContext |= CommitContext

// 处理focus状态
focusedInstanceHandle = prepareForCommit(root.containerInfo)
shouldFireAfterActiveInstanceBlur = false

// beforeMutation阶段的主函数
commitBeforeMutationEffects(finishedWork)

focusedInstanceHandle = null
```

我们重点关注beforeMutation阶段的主函数commitBeforeMutationEffects做了什么。

 commitBeforeMutationEffects

```ts
function commitBeforeMutationEffects () {
  while (nextEffect !== null) {
    const current = nextEffect.alternate

    if (!shouldFireAfterActiveInstanceBlur && focusedInstanceHandle !== null) {
      // ...focus blur相关
    }

    const effectTag = nextEffect.effectTag

    // 调用getSnapshotBeforeUpdate
    if ((effectTag & Snapshot) !== NoEffect) {
      commitBeforeMutationEffectOnFiber(current, nextEffect)
    }

    // 调度useEffect
    if ((effectTag & Passive) !== NoEffect) {
      if (!rootDoesHavePassiveEffects) {
        rootDoesHavePassiveEffects = true
        scheduleCallback(NormalSchedulerPriority, () => {
          flushPassiveEffects()
          return null
        })
      }
    }
    nextEffect = nextEffect.nextEffect
  }
}
```

整体可以分为三部分：

* 处理DOM节点渲染/删除后的 autoFocus、blur 逻辑。

* 调用getSnapshotBeforeUpdate生命周期钩子。

* 调度useEffect。

 调用 getSnapshotBeforeUpdate

commitBeforeMutationEffectOnFiber是commitBeforeMutationLifeCycles的别名。

在该方法内会调用getSnapshotBeforeUpdate。

从Reactv16开始，componentWillXXX钩子前增加了UNSAFE_前缀。

究其原因，是因为Stack Reconciler重构为Fiber Reconciler后，render阶段的任务可能中断/重新开始，对应的组件在render阶段的生命周期钩子（即componentWillXXX）可能触发多次。

这种行为和Reactv15不一致，所以标记为UNSAFE_。

更详细的解释参照这里(opens new window)

为此，React提供了替代的生命周期钩子getSnapshotBeforeUpdate。

我们可以看见，getSnapshotBeforeUpdate是在commit阶段内的before mutation阶段调用的，由于commit阶段是同步的，所以不会遇到多次调用的问题。

 调度useEffect

在这几行代码内，scheduleCallback方法由Scheduler模块提供，用于以某个优先级异步调度一个回调函数。

```ts
// 调度useEffect
if ((effectTag & Passive) !== NoEffect) {
  if (!rootDoesHavePassiveEffects) {
    rootDoesHavePassiveEffects = true
    scheduleCallback(NormalSchedulerPriority, () => {
      // 触发useEffect
      flushPassiveEffects()
      return null
    })
  }
}
```

在此处，被异步调度的回调函数就是触发useEffect的方法flushPassiveEffects。

我们接下来讨论useEffect如何被异步调度，以及为什么要异步（而不是同步）调度。

 如何异步调度

在flushPassiveEffects方法内部会从全局变量rootWithPendingPassiveEffects获取effectList。

关于flushPassiveEffects的具体讲解参照useEffect与useLayoutEffect一节

在completeWork一节我们讲到，effectList中保存了需要执行副作用的Fiber节点。其中副作用包括

* 插入DOM节点（Placement）
* 更新DOM节点（Update）
* 删除DOM节点（Deletion）

除此外，当一个FunctionComponent含有useEffect或useLayoutEffect，他对应的Fiber节点也会被赋值effectTag。

在flushPassiveEffects方法内部会遍历rootWithPendingPassiveEffects（即effectList）执行effect回调函数。

如果在此时直接执行，rootWithPendingPassiveEffects === null。

那么rootWithPendingPassiveEffects会在何时赋值呢？

在上一节layout之后的代码片段中会根据rootDoesHavePassiveEffects === true?决定是否赋值rootWithPendingPassiveEffects。

```ts
const rootDidHavePassiveEffects = rootDoesHavePassiveEffects
if (rootDoesHavePassiveEffects) {
  rootDoesHavePassiveEffects = false
  rootWithPendingPassiveEffects = root
  pendingPassiveEffectsLanes = lanes
  pendingPassiveEffectsRenderPriority = renderPriorityLevel
}
```

**所以整个useEffect异步调用分为三步**：

* `before mutation`阶段在`scheduleCallback`中调度`flushPassiveEffects`
* `layout阶段`之后将`effectList`赋值给`rootWithPendingPassiveEffects`
* `scheduleCallback`触发`flushPassiveEffects`，`flushPassiveEffects`内部遍历`rootWithPendingPassiveEffects`

 为什么需要异步调用

与 componentDidMount、componentDidUpdate 不同的是，在浏览器完成布局与绘制之后，传给 useEffect 的函数会延迟调用。这使得它适用于许多常见的副作用场景，比如设置订阅和事件处理等情况，因此不应在函数中执行阻塞浏览器更新屏幕的操作。

可见，useEffect异步执行的原因主要是防止同步执行时阻塞浏览器渲染。

 mutation阶段

终于到了执行DOM操作的mutation阶段。

 概览

类似before mutation阶段，mutation阶段也是遍历effectList，执行函数。这里执行的是commitMutationEffects。

```ts
nextEffect = firstEffect
do {
  try {
    commitMutationEffects(root, renderPriorityLevel)
  } catch (error) {
    invariant(nextEffect !== null, 'Should be working on an effect.')
    captureCommitPhaseError(nextEffect, error)
    nextEffect = nextEffect.nextEffect
  }
} while (nextEffect !== null)
```

 commitMutationEffects

代码如下：

```ts
function commitMutationEffects (root: FiberRoot, renderPriorityLevel) {
  // 遍历effectList
  while (nextEffect !== null) {

    const effectTag = nextEffect.effectTag

    // 根据 ContentReset effectTag重置文字节点
    if (effectTag & ContentReset) {
      commitResetTextContent(nextEffect)
    }

    // 更新ref
    if (effectTag & Ref) {
      const current = nextEffect.alternate
      if (current !== null) {
        commitDetachRef(current)
      }
    }

    // 根据 effectTag 分别处理
    const primaryEffectTag =
 effectTag & (Placement | Update | Deletion | Hydrating)
    switch (primaryEffectTag) {
      // 插入DOM
      case Placement: {
        commitPlacement(nextEffect)
        nextEffect.effectTag &= ~Placement
        break
      }
      // 插入DOM 并 更新DOM
      case PlacementAndUpdate: {
        // 插入
        commitPlacement(nextEffect)

        nextEffect.effectTag &= ~Placement

        // 更新
        const current = nextEffect.alternate
        commitWork(current, nextEffect)
        break
      }
      // SSR
      case Hydrating: {
        nextEffect.effectTag &= ~Hydrating
        break
      }
      // SSR
      case HydratingAndUpdate: {
        nextEffect.effectTag &= ~Hydrating

        const current = nextEffect.alternate
        commitWork(current, nextEffect)
        break
      }
      // 更新DOM
      case Update: {
        const current = nextEffect.alternate
        commitWork(current, nextEffect)
        break
      }
      // 删除DOM
      case Deletion: {
        commitDeletion(root, nextEffect, renderPriorityLevel)
        break
      }
    }

    nextEffect = nextEffect.nextEffect
  }
}
```

commitMutationEffects会遍历effectList，对每个Fiber节点执行如下三个操作：

* 根据ContentReset effectTag重置文字节点
* 更新ref
* 根据effectTag分别处理，其中effectTag包括(Placement | Update | Deletion | Hydrating)

我们关注步骤三中的`Placement | Update | Deletion`。Hydrating作为服务端渲染相关，我们先不关注。

 Placement effect

当Fiber节点含有Placement effectTag，意味着该Fiber节点对应的DOM节点需要插入到页面中。

调用的方法为commitPlacement。

该方法所做的工作分为三步：

1. 获取父级DOM节点。其中finishedWork为传入的Fiber节点。

```ts
const parentFiber = getHostParentFiber(finishedWork)
// 父级DOM节点
const parentStateNode = parentFiber.stateNode
```

2. 获取Fiber节点的DOM兄弟节点

```ts
获取Fiber节点的DOM兄弟节点
```

3. 根据DOM兄弟节点是否存在决定调用parentNode.insertBefore或parentNode.appendChild执行DOM插入操作。

```ts
// parentStateNode是否是rootFiber
if (isContainer) {
  insertOrAppendPlacementNodeIntoContainer(finishedWork, before, parent)
} else {
  insertOrAppendPlacementNode(finishedWork, before, parent)
}
```

值得注意的是，getHostSibling（获取兄弟DOM节点）的执行很耗时，当在同一个父Fiber节点下依次执行多个插入操作，getHostSibling算法的复杂度为指数级。

这是由于Fiber节点不只包括HostComponent，所以Fiber树和渲染的DOM树节点并不是一一对应的。要从Fiber节点找到DOM节点很可能跨层级遍历。

```tsx
function Item() {
 return <li><li>;
}

function App() {
 return (
 <div>
 <Item/>
 </div>
 )
}

ReactDOM.render(<App/>, document.getElementById('root'));
```

对应的Fiber树和DOM树结构为：

```
// Fiber树
 child child child child
rootFiber -----> App -----> div -----> Item -----> li

// DOM树
#root ---> div ---> li
```

当在div的子节点Item前插入一个新节点p，即App变为：

```tsx
function App () {
  return (
 <div>
 <p></p>
 <Item/>
 </div>
  )
}
```

对应的Fiber树和DOM树结构为：

```
// Fiber树
 child child child
rootFiber -----> App -----> div -----> p 
 | sibling child
 | -------> Item -----> li 
// DOM树
#root ---> div ---> p
 |
 ---> li
```

此时DOM节点 p的兄弟节点为li，而Fiber节点 p对应的兄弟DOM节点为： `fiberP.sibling.child`

即fiber p的兄弟fiber Item的子fiber li

 Update effect

当Fiber节点含有Update effectTag，意味着该Fiber节点需要更新。调用的方法为commitWork，他会根据Fiber.tag分别处理。

这里我们主要关注FunctionComponent和HostComponent。

 FunctionComponent mutation

当fiber.tag为FunctionComponent，会调用commitHookEffectListUnmount。该方法会遍历effectList，执行所有useLayoutEffect hook的销毁函数。

所谓“销毁函数”，见如下例子

```ts
useLayoutEffect(() => {
  // ...一些副作用逻辑

  return () => {
    // ...这就是销毁函数
  }
})
```

你不需要很了解useLayoutEffect，我们会在下一节详细介绍。你只需要知道在mutation阶段会执行useLayoutEffect的销毁函数。

 HostComponent mutation

当fiber.tag为HostComponent，会调用commitUpdate。

最终会在updateDOMProperties (opens new window)中将render阶段 completeWork (opens new window)中为Fiber节点赋值的updateQueue对应的内容渲染在页面上。

```ts
for (let i = 0; i < updatePayload.length; i += 2) {
  const propKey = updatePayload[i]
  const propValue = updatePayload[i + 1]

  // 处理 style
  if (propKey === STYLE) {
    setValueForStyles(domElement, propValue)
    // 处理 DANGEROUSLY_SET_INNER_HTML
  } else if (propKey === DANGEROUSLY_SET_INNER_HTML) {
    setInnerHTML(domElement, propValue)
    // 处理 children
  } else if (propKey === CHILDREN) {
    setTextContent(domElement, propValue)
  } else {
    // 处理剩余 props
    setValueForProperty(domElement, propKey, propValue, isCustomComponentTag)
  }
}
```

 Deletion effect

当Fiber节点含有Deletion effectTag，意味着该Fiber节点对应的DOM节点需要从页面中删除。调用的方法为commitDeletion。

该方法会执行如下操作：

* 递归调用Fiber节点及其子孙Fiber节点中fiber.tag为ClassComponent的componentWillUnmount (opens new window)生命周期钩子，从页面移除Fiber节点对应DOM节点
* 解绑ref
* 调度useEffect的销毁函数

 layout阶段

该阶段之所以称为layout，因为该阶段的代码都是在DOM渲染完成（mutation阶段完成）后执行的。

该阶段触发的生命周期钩子和hook可以直接访问到已经改变后的DOM，即该阶段是可以参与DOM layout的阶段。

与前两个阶段类似，layout阶段也是遍历effectList，执行函数。

具体执行的函数是commitLayoutEffects。

 commitLayoutEffects

commitLayoutEffects一共做了两件事：

1. commitLayoutEffectOnFiber（调用生命周期钩子和hook相关操作）

2. commitAttachRef（赋值 ref）

 commitLayoutEffectOnFiber

commitLayoutEffectOnFiber方法会根据fiber.tag对不同类型的节点分别处理。

* 对于ClassComponent，他会通过current === null?区分是mount还是update，调用componentDidMount (opens new window)或componentDidUpdate

触发状态更新的this.setState如果赋值了第二个参数回调函数，也会在此时调用。

* 对于FunctionComponent及相关类型，他会调用useLayoutEffect hook的回调函数，调度useEffect的销毁与回调函数

相关类型指特殊处理后的FunctionComponent，比如ForwardRef、React.memo包裹的FunctionComponent

mutation阶段会执行useLayoutEffect hook的销毁函数。

结合这里我们可以发现，useLayoutEffect hook从上一次更新的销毁函数调用到本次更新的回调函数调用是同步执行的。

而useEffect则需要先调度，在Layout阶段完成后再异步执行。

这就是useLayoutEffect与useEffect的区别。

* 对于HostRoot，即rootFiber，如果赋值了第三个参数回调函数，也会在此时调用。

 commitAttachRef

commitLayoutEffects会做的第二件事是commitAttachRef。

代码逻辑很简单：获取DOM实例，更新ref。

 current Fiber树切换

至此，整个layout阶段就结束了。

## 326 [React] diff 算法【热度: 538】

* created_at: 2023-05-04T15:45:10Z
* updated_at: 2023-05-04T15:45:11Z
* labels: web框架
* milestone: 高

**关键词**：react16 架构、react Reconciler、react commit 阶段、react 协调器

在 react 中：一个`DOM`节点在某一时刻最多会有4个节点和他相关。

一个DOM节点在某一时刻最多会有4个节点和他相关。

1. `JSX对象`。即ClassComponent的render方法的返回结果，或FunctionComponent的调用结果。JSX对象中包含描述DOM节点的信息。

2. `workInProgress Fiber`。如果该DOM节点将在本次更新中渲染到页面中，workInProgress Fiber代表该DOM节点对应的Fiber节点。

3. `current Fiber`。如果该DOM节点已在页面中，current Fiber代表该DOM节点对应的Fiber节点。

4. `DOM节点本身`。

**Diff算法的本质是对比1和2，生成3。**

 概览

 Diff的瓶颈以及React如何应对

由于Diff操作本身也会带来性能损耗， 即使在最前沿的算法中，将前后两棵树完全比对的算法的复杂程度为 O(n 3 )，其中n是树中元素的数量。

如果在React中使用了该算法，那么展示1000个元素所需要执行的计算量将在十亿的量级范围

为了降低算法复杂度，**React的diff会预设三个限制**：

1. 只对同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他。

2. 两个不同类型的元素会产生出不同的树。如果元素由div变为p，React会销毁div及其子孙节点，并新建p及其子孙节点。

3. 开发者可以通过 key prop来暗示哪些子元素在不同的渲染下能保持稳定。

 Diff是如何实现的

我们从Diff的入口函数reconcileChildFibers出发，该函数会根据newChild（即JSX对象）类型调用不同的处理函数。

从同级的节点数量将Diff分为两类：

1. 当newChild类型为object、number、string，代表同级只有一个节点

2. 当newChild类型为Array，同级有多个节点

 单节点 diff

路程图：
![image](https://user-images.githubusercontent.com/22188674/235393691-d5355bfb-da2a-4ffd-9961-04a3927ebd11.png)

React通过先判断key是否相同，如果key相同则判断type是否相同，只有都相同时一个DOM节点才能复用。

 多节点 diff

主要分为以下几种情况

* 节点更新
* 节点属性变化
* 节点类型更新
* 节点新增或减少
* 节点位置变化

 diff 思路

React 团队发现，在日常开发中，相较于新增和删除，更新组件发生的频率更高。所以Diff会优先判断当前节点是否属于更新。

本质上是进行了两轮遍历：

* 第一轮遍历：处理更新的节点。
* 第二轮遍历：处理剩下的不属于更新的节点。

**为何不用双向指针的方式**？

虽然本次更新的JSX对象 newChildren为数组形式，但是和newChildren中每个组件进行比较的是current fiber，同级的Fiber节点是由sibling指针链接形成的单链表，即不支持双指针遍历。

即 newChildren[0]与fiber比较，newChildren[1]与fiber.sibling比较。

所以无法使用双指针优化。

 第一次遍历

第一轮遍历步骤如下：

1. `let i = 0`，遍历`newChildren`，将`newChildren[i]`与`oldFiber`比较，判断DOM节点是否可复用。

2. 如果可复用，`i++`，继续比较`newChildren[i]`与`oldFiber.sibling`，可以复用则继续遍历。

3. 如果不可复用，分两种情况：

* key不同导致不可复用，立即跳出整个遍历，第一轮遍历结束。

* key相同type不同导致不可复用，会将`oldFiber`标记为`DELETION`，并继续遍历

4. 如果`newChildren`遍历完（即`i === newChildren.length - 1`）或者`oldFiber`遍历完（即`oldFiber.sibling === null`），跳出遍历，第一轮遍历结束。

源码如下： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L818)

 第二轮遍历

**`newChildren`与`oldFiber`同时遍历完**

那就是最理想的情况：只需在第一轮遍历进行组件更新

> 源码如下： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L825)

**`newChildren`没遍历完，`oldFiber`遍历完**

已有的DOM节点都复用了，这时还有新加入的节点，意味着本次更新有新节点插入，我们只需要遍历剩下的`newChildren`为生成的`workInProgress fiber`依次标记`Placement`。

> 源码如下： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L869)

**`newChildren`遍历完，`oldFiber`没遍历完**

意味着本次更新比之前的节点数量少，有节点被删除了。所以需要遍历剩下的`oldFiber`，依次标记`Deletion`。

> [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L863)

**`newChildren`与`oldFiber`都没遍历完**

这意味着有节点在这次更新中改变了位置。

这是Diff算法最精髓也是最难懂的部分。我们接下来会重点讲解。

> 源码： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L893)

 处理移动的节点

由于有节点改变了位置，所以不能再用位置索引i对比前后的节点，那么如何才能将同一个节点在两次更新中对应上呢？

我们需要使用key。

为了快速的找到key对应的`oldFiber`，我们将所有还未处理的`oldFiber`存入以key为key，`oldFiber`为`value`的`Map`中。

`const existingChildren = mapRemainingChildren(returnFiber, oldFiber);`

> 源码： [资料](https://github.com/facebook/react/blob/1fb18e22ae66fdb1dc127347e169e73948778e5a/packages/react-reconciler/src/ReactChildFiber.new.js#L890)

接下来遍历剩余的`newChildren`，通过`newChildren[i].key`就能在`existingChildren`中找到`key`相同的`oldFiber`。

 标记节点是否移动

既然我们的目标是寻找移动的节点，那么我们需要明确：节点是否移动是以什么为参照物？

我们的参照物是：最后一个可复用的节点在`oldFiber`中的位置索引（用变量`lastPlacedIndex`表示）。

由于本次更新中节点是按`newChildren`的顺序排列。在遍历`newChildren`过程中，每个遍历到的可复用节点一定是当前遍历到的所有可复用节点中最靠右的那个，即一定在`lastPlacedIndex`对应的可复用的节点在本次更新中位置的后面。

那么我们只需要比较遍历到的可复用节点在上次更新时是否也在`lastPlacedIndex`对应的`oldFiber`后面，就能知道两次更新中这两个节点的相对位置改变没有。

我们用变量`oldIndex`表示遍历到的可复用节点在`oldFiber`中的位置索引。如果`oldIndex < lastPlacedIndex`，代表本次更新该节点需要向右移动。

`lastPlacedIndex`初始为0，每遍历一个可复用的节点，如果`oldIndex >= lastPlacedIndex`，则`lastPlacedIndex = oldIndex`。

 参考文档

* [资料](https://react.iamkasong.com/diff/prepare.html)

## 327 [React] fiber 是如何实现时间切片的？【热度: 587】

* created_at: 2023-05-04T16:15:25Z
* updated_at: 2023-05-04T16:19:06Z
* labels: web框架
* milestone: 高

**关键词**：react16 架构、react Reconciler、fiber 时间切片、fiber 时间、react 协调器

 基本原理

本质上来说就是将渲染任务拆分成多个小任务，以便提高应用程序的响应性和性能。React Fiber 实现时间切片主要依赖于两个核心功能：**任务分割和任务优先级**。

任务分割是指将一个大的渲染任务切割成多个小任务，每个小任务只负责一小部分 DOM 更新。React Fiber 使用 Fiber 节点之间的父子关系，将一个组件树分割成多个”片段“，每个“片段”内部是一颗 Fiber 子树，多个“片段”之间可以交错执行，实现时间切片。

任务优先级是指 React Fiber 提供了一套基于优先级的算法来决定哪些任务应该先执行，哪些任务可以放到后面执行。React Fiber 将任务分成多个优先级级别，较高优先级的任务在进行渲染时会优先进行，从而确保应用程序的响应性和性能。

React Fiber 实现时间切片的基本原理如下：

1. React Fiber 会将渲染任务划分成多个小任务，每个小任务一般只负责一小部分 DOM 更新。
2. React Fiber 将这些小任务保存到任务队列中，并按照优先级进行排序和调度。
3. 当浏览器处于空闲状态时，React Fiber 会从任务队列中取出一个高优先级的任务并执行，直到任务完成或者时间片用完。
4. 如果任务完成，则将结果提交到 DOM 树上并开始下一个任务。如果时间片用完，则将任务挂起，并将未完成的工作保存到 Fiber 树中，返回控制权给浏览器。
5. 当浏览器再次处于空闲状态时，React Fiber 会再次从任务队列中取出未完成的任务并继续执行，直到所有任务完成。

通过使用任务分割和任务优先级算法，React Fiber 实现了时间切片功能，保证了应用程序的响应性和性能，提高了用户的使用体验。

 是如何实现任务分割的？伪代码实现一下

React Fiber 实现任务分割的过程十分复杂，需要涉及到 Fiber 数据结构、调度器、DOM 操作等多个部分。以下是一个简单的示例代码，演示了 React Fiber 任务分割的基本工作原理。

```jsx
const workInProgressFiber = {};

const performUnitOfWork = () => {
 // 执行当前 Fiber 对应的组件
 const isFunctionComponent = workInProgressFiber.type instanceof Function; 
 if (isFunctionComponent) {
 updateFunctionComponent(workInProgressFiber);
 } else {
 updateHostComponent(workInProgressFiber);
 }

 // 返回下一个待处理的 Fiber 节点
 if (workInProgressFiber.child) {
 return workInProgressFiber.child;
 }

 let nextFiber = workInProgressFiber;
 while (nextFiber) {
 if (nextFiber.sibling) {
 return nextFiber.sibling;
 }
 nextFiber = nextFiber.parent;
 }

 return null;
};

const render = (element, container) => {
 const rootFiber = {
 dom: container,
 props: {
 children: [element],
 },
 };

 workInProgressFiber = rootFiber;
 nextUnitOfWork = rootFiber;

 requestIdleCallback(workLoop);
};

const workLoop = (deadline) => {
 while (nextUnitOfWork && deadline.timeRemaining() > 0) {
 nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
 }

 if (nextUnitOfWork) {
 requestIdleCallback(workLoop);
 }
};

const updateFunctionComponent = (fiber) => {
 const children = [fiber.type(fiber.props)];
 reconcileChildren(fiber, children);
};

const updateHostComponent = (fiber) => {
 if (!fiber.dom) {
 fiber.dom = createDom(fiber);
 }

 reconcileChildren(fiber, fiber.props.children);
};

const reconcileChildren = (fiber, children) => {
 let index = 0;
 let oldFiber = fiber.alternate ? fiber.alternate.child : null;
 let prevSibling = null;

 while (index < children.length || oldFiber) {
 const child = children[index];
 let newFiber = null;
 const sameType = oldFiber && child && child.type === oldFiber.type;

 if (sameType) {
 newFiber = {
 type: oldFiber.type,
 props: child.props,
 dom: oldFiber.dom,
 parent: fiber,
 alternate: oldFiber,
 effectTag: 'UPDATE',
 };
 }

 if (child && !sameType) {
 newFiber = {
 type: child.type,
 props: child.props,
 dom: null,
 parent: fiber,
 alternate: null,
 effectTag: 'PLACEMENT',
 };
 }

 if (oldFiber && !sameType) {
 oldFiber.effectTag = 'DELETION';
 deletions.push(oldFiber);
 }

 if (oldFiber) {
 oldFiber = oldFiber.sibling;
 }

 if (index === 0) {
 fiber.child = newFiber;
 } else if (child) {
 prevSibling.sibling = newFiber;
 }

 prevSibling = newFiber;

 index++;
 }
};
```

在这个示例中，我们定义了一个名为 `performUnitOfWork` 的函数，用于执行一个 Fiber 节点上的任务。这个函数会根据 Fiber 节点的类型，执行不同的操作，并返回下一个待处理的 Fiber 节点。

在 `updateFunctionComponent` 和 `updateHostComponent` 函数中，我们分别根据 Fiber 节点的类型执行函数组件和普通组件的更新操作。通过 `reconcileChildren` 函数，我们可以将一个组件的子节点拆分成多个 Fiber 节点，并在 `performUnitOfWork` 函数中进行遍历和处理。

React Fiber 实现任务分割的核心思想是将一个大的渲染任务切割成多个小任务，每个小任务只负责一小部分 DOM 更新。通过在 Fiber 树上进行遍历和操作，我们可以实现任务分割，提高应用程序的响应性和性能。

 react fiber 是如何实现任务优先级的？用代码简单示范一下

React Fiber 的任务优先级是通过创建多个优先级队列，并使用一个时间片策略来调度任务的。以下是一个简单的示例代码，用于演示 React Fiber 的优先级队列和任务优先级机制。

```jsx
const MAX_PRIORITY_LEVEL = 5;

const NoWork = 0;
const Sync = 1;
const DefaultPriority = 3;
const IdlePriority = 4;
const AnimationPriority = 5;

const initialScheduler = {
 didTimeout: false,
 enqueuedTasks: [],
 scheduledCallback: null,
 scheduledCallbackTimeout: null,
 taskQueue: [],
 currentTime: 0,
};

let currentScheduler = initialScheduler;

const enableScheduler = () => {
 // ...初始化 scheduler 的代码...
};

const requestCallback = (callback, options) => {
 const currentTime = getCurrentTime();
 const timeout = options != null && options.timeout != null ? options.timeout : -1;
 const expirationTime =
 timeout > 0 ? currentTime + timeout : currentTime + 51000;
 const newTask = {
 callback,
 priorityLevel: DefaultPriority,
 startTime: currentTime,
 expirationTime,
 };

 currentScheduler.taskQueue.push(newTask);
 ensureHostCallbackIsScheduled();
};

const ensureHostCallbackIsScheduled = () => {
 if (currentScheduler.scheduledCallback === null) {
 currentScheduler.scheduledCallback = performSchedulerWork;
 currentScheduler.scheduledCallbackTimeout = setTimeout(() => {
 performSchedulerWork(currentTime);
 }, 0);
 }
};

const performSchedulerWork = (currentTime) => {
 performConcurrentWorkOnRoots();

 if (currentScheduler.taskQueue.length > 0) {
 const firstTask = currentScheduler.taskQueue[0];
 if (firstTask.startTime <= currentTime) {
 currentScheduler.taskQueue.shift();
 firstTask.callback({ didTimeout: false });
 return;
 }
 }
};

const performConcurrentWorkOnRoots = () => {
 const priorityLevel = AnimationPriority;
 const deadline = {
 timeRemaining() {
 return Infinity;
 },
 };
 while (currentScheduler.taskQueue.length > 0) {
 const task = findHighestPriorityTask();
 if (task.priorityLevel > priorityLevel || task.expirationTime <= currentScheduler.currentTime) {
 break;
 }
 const root = task.callback(deadline);

 if (root !== null) {
 // ...执行任务更新...
 }
 }
};

const findHighestPriorityTask = () => {
 let highestPriorityTask = null;
 let highestPriorityLevel = NoWork;

 for (let i = 0; i < currentScheduler.taskQueue.length; i++) {
 const task = currentScheduler.taskQueue[i];
 const priorityLevel = task.priorityLevel;
 if (priorityLevel > highestPriorityLevel) {
 highestPriorityLevel = priorityLevel;
 highestPriorityTask = task;
 }
 }

 return highestPriorityTask;
};
```

在这个示例中，我们定义了多个优先级常量和优先级队列，以及与之相关的一些变量和函数。我们通过 `requestCallback` 函数，将任务以优先级的方式插入到任务队列中。在 `performConcurrentWorkOnRoots` 函数中，我们按照优先级顺序遍历任务队列，并将任务的回调函数传递给 `callback` 函数执行更新操作。

通过在任务队列和调度器中使用优先级的方式来调度和执行任务，我们可以在保证页面响应性的同时，最大化利用浏览器的空闲时间，提高应用程序整体的性能和用户体验。

## 328 script 预加载方式有哪些， 这些加载方式有何区别？【热度: 420】

* created_at: 2023-05-04T16:33:13Z
* updated_at: 2023-05-04T16:36:59Z
* labels: 浏览器, web应用场景
* milestone: 高

**关键词**：script 预加载

在浏览器中，可以通过预加载 JavaScript 脚本来提高性能和用户体验。预加载是指在浏览器解析完当前页面之前，提前加载并解析相关资源（例如 JavaScript 文件、CSS 文件等）。这样可以在用户请求访问其他页面时，减少资源加载的时间和延迟，从而提高页面加载速度和用户体验。

以下是两种预加载 JavaScript 脚本的方法：

1. defer 属性

`<script>` 标签的 `defer` 属性可以告诉浏览器，让 JavaScript 文件在页面文档解析完成之后再执行。这种方式可以保证页面不会因为脚本加载和执行而被阻塞，同时又能够保证脚本能够按照正确的顺序执行（即按照在 HTML 中出现的顺序，因为 `defer` 属性会按照这个顺序依次加载和执行）。

```html
<!DOCTYPE html>
<html>
 <head>
 <title>My Page</title>
 <script src="script1.js" defer></script>
 <script src="script2.js" defer></script>
 </head>
 <body>
 ...
 </body>
</html>
```

2. prefetch 和 preload

预加载的另一种方法是使用 `Link` 标签的 `prefetch` 或 `preload` 属性。这种方法可以在不影响当前页面加载的情况下，预先加载需要后续页面需要的 JavaScript 文件和其他资源。

其中，`prefetch` 属性指示浏览器预先加载并缓存 JavaScript 文件，但不会立即执行文件。而 `preload` 属性则会在浏览器空闲时立即加载文件，并且可以指定文件的类型、优先级等属性。

```html
<head>
 <title>My Page</title>
 <link rel="prefetch" href="script1.js" />
 <link rel="preload" href="script2.js" as="script" />
</head>
```

需要注意的是，使用 `prefetch` 和 `preload` 属性时，应该避免将其用于太多的资源文件，否则可能会引发网络瓶颈和性能问题。可以在需要优化的资源文件上使用这些属性，并通过测试和性能分析来调整其预加载的优先级和时机，以达到最优化的预加载效果。

## 329 常见图片懒加载方式有哪些？【热度: 1,001】

* created_at: 2023-05-04T16:36:26Z
* updated_at: 2023-05-04T16:36:27Z
* labels: web应用场景
* milestone: 中

**关键词**：图片懒加载、Intersection Observer API

图片懒加载可以延迟图片的加载，只有当图片即将进入视口范围时才进行加载。这可以大大减轻页面的加载时间，并降低带宽消耗，提高了用户的体验。以下是一些常见的实现方法：

1. Intersection Observer API

`Intersection Observer API` 是一种用于异步检查文档中元素与视口叠加程度的API。可以将其用于检测图片是否已经进入视口，并根据需要进行相应的处理。

```js
const observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      const lazyImage = entry.target
      lazyImage.src = lazyImage.dataset.src
      observer.unobserve(lazyImage)
    }
  })
})

const lazyImages = [...document.querySelectorAll('.lazy')]
lazyImages.forEach(function (image) {
  observer.observe(image)
})
```

2. 自定义监听器

或者，可以通过自定义监听器来实现懒加载。其中，应该避免在滚动事件处理程序中频繁进行图片加载，因为这可能会影响性能。相反，使用自定义监听器只会在滚动停止时进行图片加载。

```js
function lazyLoad () {
  const images = document.querySelectorAll('.lazy')
  const scrollTop = window.pageYOffset
  images.forEach((img) => {
    if (img.offsetTop < window.innerHeight + scrollTop) {
      img.src = img.dataset.src
      img.classList.remove('lazy')
    }
  })
}

let lazyLoadThrottleTimeout
document.addEventListener('scroll', function () {
  if (lazyLoadThrottleTimeout) {
    clearTimeout(lazyLoadThrottleTimeout)
  }
  lazyLoadThrottleTimeout = setTimeout(lazyLoad, 20)
})
```

在这个例子中，我们使用了 `setTimeout()` 函数来延迟图片的加载，以避免在滚动事件的频繁触发中对性能的影响。

无论使用哪种方法，都需要为需要懒加载的图片设置占位符，并将未加载的图片路径保存在 `data` 属性中，以便在需要时进行加载。这些占位符可以是简单的 div 或样式类，用于预留图片的空间，避免页面布局的混乱。

```html
<!-- 占位符示例 -->
<div class="lazy-placeholder" style="background-color: #ddd;height: 500px;"></div>

<!-- 图片示例 -->
<img class="lazy" data-src="path/to/image.jpg" alt="预览图" />
```

总体来说，图片懒加载是一种这很简单，但非常实用的优化技术，能够显著提高网页的性能和用户体验。

## 330 cookie 构成部分有哪些【热度: 598】

* created_at: 2023-05-04T16:41:09Z
* updated_at: 2023-05-04T16:41:24Z
* labels: 浏览器, web应用场景
* milestone: 中

**关键词**：cookie 构成部分、cookie 作用路径、cookie 作用域

在 HTTP 协议中，cookie 是一种包含在请求和响应报文头中的数据，用于在客户端存储和读取信息。cookie 是由服务器发送的，客户端可以使用浏览器 API 将 cookie 存储在本地进行后续使用。

一个 cookie 通常由以下几个部分组成：

1. 名称：cookie 的名称（键），通常是一个字符串。
2. 值：cookie 的值，通常也是一个字符串。
3. 失效时间：cookie 失效的时间，过期时间通常存储在一个 `expires` 属性中，以便浏览器自动清除失效的 cookie。
4. 作用路径：cookie 的作用路径，只有在指定路径下的请求才会携带该 cookie。
5. 作用域：cookie 的作用域，指定了该 cookie 绑定的域名，可以使用 `domain` 属性来设置。

例如，以下是一个设置了名称为 "user"、值为 "john"、失效时间为 2022 年 1 月 1 日，并且作用于全站的 cookie：

```
Set-Cookie: user=john; expires=Sat, 01 Jan 2022 00:00:00 GMT; path=/; domain=example.com
```

其中，`Set-Cookie` 是响应报文头，用于设置 cookie。在该响应报文中，将 cookie 数据设置为 "user=john"，失效时间为 "2022年1月1日"，作用路径为全站，作用域为 "example.com" 的域名。这个 cookie 就会被存储在客户端，以便在以后的请求中发送给服务器。

## 331 扫码登录实现方式【热度: 734】

* created_at: 2023-05-04T16:44:45Z
* updated_at: 2023-05-04T16:44:46Z
* labels: web应用场景
* milestone: 中

**关键词**：扫码登录

扫码登录的实现原理核心是基于一个中转站，该中转站通常由应用提供商提供，用于维护手机和PC之间的会话状态。

整个扫码登录的流程如下：

1. 用户在PC端访问应用，并选择使用扫码登录方式。此时，应用生成一个随机的认证码，并将该认证码通过二维码的形式显示在PC端的页面上。

2. 用户打开手机上的应用，并选择使用扫码登录方式。此时，应用会打开手机端的相机，用户可以对着PC端的二维码进行扫描。

3. 一旦用户扫描了二维码，手机上的应用会向应用提供商的中转站发送一个请求，请求包含之前生成的随机认证码和手机端的一个会话ID。

4. 中转站验证认证码和会话ID是否匹配，如果匹配成功，则该中转站将用户的身份信息发送给应用，并创建一个PC端和手机端之间的会话状态。

5. 应用使用收到的身份信息对用户进行认证，并创建一个与该用户关联的会话状态。同时，应用返回一个通过认证的响应给中转站。

6. 中转站将该响应返回给手机端的应用，并携带一个用于表示该会话的令牌，此时手机和PC之间的认证流程就完成了。

7. 当用户在PC端进行其他操作时，应用将会话令牌附加在请求中，并通过中转站向手机端的应用发起请求。手机端的应用使用会话令牌（也就是之前生成的令牌）来识别并验证会话状态，从而允许用户在PC端进行需要登录的操作。

## 332 DNS 协议了解多少【热度: 712】

* created_at: 2023-05-04T16:50:50Z
* updated_at: 2023-05-04T16:50:51Z
* labels: 网络, web应用场景, 腾讯
* milestone: 中

**关键词**：DNS协议、DNS加速

 DNS 基本概念

DNS（Domain Name System，域名系统）是因特网上用于将主机名转换为 IP 地址的协议。它是一个分布式数据库系统，通过将主机名映射到 IP 地址来实现主机名解析，并使用户能够通过更容易识别的主机名来访问互联网上的资源。

在使用 DNS 协议进行主机名解析时，系统首先查询本地 DNS 缓存。如果缓存中不存在结果，系统将向本地 DNS 服务器发出请求，并逐级向上查找，直到找到权威 DNS 服务器并获得解析结果。在域名解析的过程中，DNS 协议采用了分级命名空间的结构，不同的域名可以通过点分隔符分为多个级别，例如 `www.example.com` 可以分为三个级别：`www`、`example` 和 `com`。

除了将域名映射到 IP 地址之外，DNS 协议还支持多种其他功能：

1. 逆向映射：将 IP 地址解析为域名。
2. 邮件服务器设置：支持邮件服务器的自动发现和设置。
3. 负载均衡：DNS 还可以实现简单的负载均衡，通过将相同 IP 地址的主机名映射到不同的 IP 地址来分散负载。
4. 安全：DNSSEC（DNS Security Extensions，DNS 安全扩展）可以提供对域名解析的认证和完整性。

 如何加快 DNS 的解析？

有以下几种方法可以加快 DNS 的解析：

1. 使用高速 DNS 服务器：默认情况下，网络服务提供商（ISP）为其用户提供 DNS 服务器。但是，这些服务器不一定是最快的，有时会出现瓶颈。如果您想加快 DNS 解析，请尝试使用其他高速 DNS 服务器，例如 Google 的公共 DNS 服务器或 OpenDNS。

2. 缓存 DNS 记录：在本地计算机上缓存 DNS 记录可以大大加快应用程序的响应。当您访问特定的网站时，计算机会自动缓存该网站的 DNS 记录。如果您再次访问该网站，则计算机将使用缓存的 DNS 记录。

3. 减少 DNS 查找：当您访问一个网站时，您的计算机将会查找该域名的 IP 地址。如果网站有很多域名，则查找过程可能会变得非常缓慢。因此，尽可能使用较少的域名可以减少 DNS 查找的数量，并提高响应速度。

4. 使用 CDN：CDN（内容分发网络）是一种将内容存储在全球多个位置的系统。这些位置通常都有专用的 DNS 服务器，可以大大加快站点的加载速度。

5. 使用 DNS 缓存工具：一些辅助工具可以帮助您优化与 DNS 相关的设置，例如免费的 DNS Jumper 软件和 Namebench 工具，它们可以测试您的 DNS 响应时间并为您推荐最佳配置。

通过使用高速 DNS 服务器、缓存 DNS 记录、减少 DNS 查找、使用 CDN 和 DNS 缓存工具等方法，可以显著提高 DNS 解析速度，从而加快应用程序响应时间。

## 333 TCP/IP 如何保证数据包传输的有序可靠【热度: 336】

* created_at: 2023-05-04T16:58:10Z
* updated_at: 2023-05-04T16:58:11Z
* labels: 网络, 腾讯
* milestone: 高

**关键词**：TCP/IP 可靠性、TCP/IP 序列号、TCP/IP 超时

TCP/IP 采用以下几种机制来保证数据包传输的有序可靠：

1. 确认和重传：每当 TCP/IP 协议收到一个数据包时，将向发送方回送一个确认信息。如果接收方未收到数据包，则发送方将重传该数据包。这种确认和重传的机制可以确保数据包能够可靠地传输，即使在网络故障或拥塞的情况下也能保证数据包的可靠性。

2. 滑动窗口：滑动窗口是 TCP/IP 协议用来控制发送方和接收方之间数据流的一种机制。发送方会将窗口大小告知接收方，接收方在收到数据包时，会回送一个告知发送方可以继续发送数据的指令。滑动窗口机制可以通过有效地控制数据包的发送与接收，实现有序的数据传输。

3. 序列号：每个数据包都会附带一个序列号，接收方通过序列号对数据包进行排序，从而实现传输的有序性。

4. 超时重传时间：TCP/IP 建立了一个计时器，如果在指定时间内没有收到确认信息，则会重新发送未确认的数据包。这种机制可以帮助保证数据包传输的可靠性，确保数据包能够及时被送达。

总之，TCP/IP 协议通过确认和重传、滑动窗口、序列号以及超时重传时间等机制，保证了数据包传输的有序可靠性。这些机制可以确保数据包能够被及时送达，有效地防止了数据包丢失、重复和乱序等问题，从而提供了高效可靠的传输服务。

## 335 HTTP 304 状态码表达的请求过程是什么【热度: 459】

* created_at: 2023-05-05T15:16:05Z
* updated_at: 2023-05-05T15:16:05Z
* labels: 网络, 阿里巴巴
* milestone: 中

**关键词**：304状态码、304请求过程、304过程、304请求

HTTP 304 状态码是表示所请求的资源未修改，可以直接使用客户端缓存的版本。当客户端发送 GET 请求时，服务器会检查该资源的 ETag（实体标签）或 Last-Modified（最后修改时间）等信息，与客户端缓存中的相应信息进行比较。如果这些信息相同，则表示资源未发生更改，服务器返回 304 状态码，告诉客户端直接使用本地缓存的资源即可，无需重新下载，这样可以大大节省网络带宽和服务器资源消耗。

下面是 HTTP 304 的具体过程：

1. 客户端首先给服务器发送一个请求，该请求包含了一个 If-Modified-Since 或者 If-None-Match 字段，用来在服务器端判断访问的资源是否已经被修改过。

2. 如果服务器端检查发现访问的资源没有发生改变，服务器就不会发送资源内容，而是返回 304 的状态码给客户端。

3. 客户端接收到 304 的状态码后，会从本地缓存中加载相应的资源。

4. 如果服务器端发现访问的资源已经发生过改变，服务器会发送新的资源内容给客户端，并且返回 200 的状态码。

需要注意的是，客户端缓存中的资源不一定完全等同于服务器端的资源，可能由于缓存失效等原因导致客户端缓存中的资源与服务器端不完全一致，因此在实际应用中，需要谨慎使用 304 缓存机制，尤其对于那些变化频繁的资源，建议设置较短的缓存时间，以避免出现缓存失效等问题。

## 336 [React] 事件绑定原理【热度: 1,097】

* created_at: 2023-05-05T15:31:51Z
* updated_at: 2023-05-05T15:47:20Z
* labels: web框架, 小米
* milestone: 中

**关键词**：react事件绑定、react合成事件、react事件监听

 绑定原理与过程

在 React 中，事件绑定不同于传统的直接在 HTML 元素添加事件监听器的方式。React 的事件绑定是建立在自定义组件上的，因此需要对 React 组件的生命周期进行理解。

React 事件绑定的原理可以概括为三个步骤：

1. 创建 React 元素

在 React 中，事件的绑定是通过在 JSX 中创建元素时给元素添加一个事件属性实现的。例如：

```
<button onClick={this.handleClick}>点我</button>
```

这里使用 onClick 属性将组件的 handleClick 方法传递给一个按钮组件，这个按钮组件在点击之后会调用 handleClick 方法。

2. 挂载事件处理函数

当 React 元素插入文档中之后，React 会在元素宿主节点上挂载事件处理函数。这个过程是在 React 元素生成之后、组件挂载之前完成的。React 在执行组件挂载生命周期函数之前，会将所有元素上声明的事件处理函数统一挂载到 DOM 上。

3. 移除事件处理函数

当 React 元素被移除文档时，React 会自动移除对应的事件处理函数。这个过程是在组件卸载之后、元素从 DOM 中移除之前执行的。

React 的事件绑定表现为组件的方法，所以在事件处理函数中，可以通过 this 关键字来访问组件的状态和属性。

需要注意的是，React 组件中不能使用原生事件绑定方式，比如使用 `element.addEventListener('click', function(){})`，因为这样做会导致 React 无法正确地跟踪组件状态的变化，从而可能导致一些潜在问题。

 React 组件中为何不能使用原生事件绑定方式

React 组件中不能使用原生事件绑定方式是因为，React 使用的是 Virtual DOM 技术，而不是直接操作 DOM。React 的 Virtual DOM 能够自动监测组件（即数据）状态的变化和更新，从而根据更新后的状态重新渲染视图，并在必要的时候更新真实 DOM。

如果使用原生事件绑定方式，比如使用 `element.addEventListener('click', function(){})`，那么这些绑定的事件处理函数是直接绑定在真实的 DOM 元素上的，并不参与 Virtual DOM 中的数据流程，这样就会导致以下两个问题：

1. 事件绑定后，如果组件状态变化并且重新渲染，那么重新渲染后的组件实例会重新创建一个新的 DOM 元素，而旧的 DOM 元素会被销毁，导致原来的事件处理函数被绑定在了一个不存在的元素上，导致事件失效。

2. 使用原生事件绑定方式，无法在事件处理函数中直接访问组件实例的状态和属性。例如，在事件处理函数中想要访问一个组件的状态或者属性，就必须使用组件实例的引用（即 this 指针），但是这个 this 指针指向的并不是组件实例本身，而是真实的 DOM 元素，这样就无法直接访问组件状态和属性。

因此，在 React 中，我们必须使用 `onClick` 等钩子函数来绑定事件处理函数，这样 React 就能够在其 Virtual DOM 中正确地跟踪组件状态变化，并保证事件处理函数的正确性。当然，在一些极端的情况下，React 也提供了访问真实 DOM 元素的机制，比如 `ref` 属性，这个可以在某些场景下使用。

## 337 函数式编程了解多少？【热度: 1,789】

* created_at: 2023-05-05T15:49:15Z
* updated_at: 2023-05-05T15:49:16Z
* labels: web应用场景, 百度
* milestone: 中

**关键词**：函数式编程

 函数式编程的核心概念

函数式编程是一种编程范式，它将程序看做是一系列函数的组合，函数是应用的基础单位。函数式编程主要有以下核心概念：

1. 纯函数：函数的输出只取决于输入，没有任何副作用，不会修改外部变量或状态，所以对于同样的输入，永远返回同样的输出值。因此，纯函数可以有效地避免副作用和竞态条件等问题，使得代码更加可靠、易于调试和测试。

2. 不可变性：在函数式编程中，数据通常是不可变的，即不允许在内部进行修改。这样可以避免副作用的发生，提高代码可靠性。

3. 函数组合：函数可以组合成复杂的函数，从而减少重复代码的产生。

4. 高阶函数：高阶函数是指可以接收其他函数作为参数，也可以返回函数的函数。例如，函数柯里化和函数的组合就是高阶函数的应用场景。

5. 惰性计算：指在必要的时候才计算（执行）函数，而不是在每个可能的执行路径上都执行，从而提高性能。

函数式编程的核心概念是将函数作为基本构建块来组合构建程序，通过纯函数、不可变性、函数组合、高阶函数和惰性计算等概念来实现代码的简洁性、可读性和可维护性，以及高效的性能运行。

 函数式编程的优势

函数式编程有以下优势：

1. 易于理解和维护：函数式编程强调数据不变性和纯函数概念，可以提高代码的可读性和可维护性，因为它避免了按照顺序对变量进行修改，并强调函数行为的确定性。

2. 更少的 bug：由于函数式编程强调纯函数的概念，它可以消除由于副作用引起的bug。因为纯函数不会修改外部状态或数据结构，只是将输入转换为输出。这么做有助于保持代码更加可靠。

3. 更好的可测试性：由于纯函数不具有副作用，它更容易测试，因为测试数据是预测性的。

4. 更少的重构：函数式编程使用函数组合和柯里化等方法来简化代码。它将大型问题分解为微小问题，从而减少了代码重构的需要。

5. 避免并发问题：由于函数式编程强调不变性和纯函数的概念，这使得并发问题变得更简单。纯函数允许并行运行，因此，当程序在不同的线程上执行时，它更容易保持同步。

6. 代码复用：由于函数是基本构建块，并且可以组合成更高级别的功能块，使用函数式编程可以更大程度上推崇代码复用，减少代码冗余。

函数式编程通过强调纯函数、不可变数据结构和函数组合等概念，可以提高代码可读性和可维护性，降低程序bug出现的风险，更容易测试，并且更容易将问题分解为更容易处理的小部分，更好地应对并发和可扩展性。

## 338 JavaScript 对象的底层数据结构是什么【热度: 517】

* created_at: 2023-05-05T15:59:29Z
* updated_at: 2023-05-05T15:59:29Z
* labels: JavaScript
* milestone: 高

**关键词**：JavaScript 对象数据结构

在JavaScript中，对象是一种无序的键值对集合，可以保存和传递信息。对象是一种非常重要的数据类型，在JavaScript中，几乎所有东西都是对象。

在底层，JavaScript对象的数据结构是哈希表（Hash Table），也可以称为散列表。哈希表是一种使用哈希函数将键值映射到数据中的位置的数据结构。它允许效率高且快速地插入、查找和删除数据，这些操作在算法的平均情况下都需要常数时间。哈希表的主要思想是将键值对转换为索引的方式在常数时间内获取值，因此哈希表非常适合用于大量的键值对数据存储。

在JavaScript中，对象的键值对存储使用了类似哈希表的技术。JavaScript引擎使用一个称为哈希表种子的随机数字来计算键的哈希值，然后使用头插法（链表或树）将键和值存储在桶中，以实现高效的插入和查询操作。因此，JavaScript对象在实现上使用了哈希表来存储和访问键值对，从而提供了非常高效的数据存储和查找操作，使之成为了编写JavaScript代码的强大工具。

## 339 JavaScript 中的变量在内存中的具体存储形式是什么【热度: 183】

* created_at: 2023-05-05T16:03:04Z
* updated_at: 2023-05-05T16:03:05Z
* labels: JavaScript
* milestone: 高

**关键词**：JavaScript 变量存储形式

在JavaScript中，变量的存储方式是基于所存储值的数据类型。JavaScript有7种内置数据类型：undefined、null、boolean、number、string、symbol和object。

对于基础数据类型（除了object），变量值会直接存储在内存中。具体来说，这些数据类型的变量在内存中的存储形式如下：

* undefined和null：这两个数据类型都只有一个值，每个值有一个特殊的内存地址。存储它们的变量会被赋予对应的内存地址。
* boolean：这个数据类型的值只需要存储一个比特位（0或1），它们通常被存储在栈中，而不是堆中。
* number：根据规范，数字类型在内存中占用8个字节的空间（64位），它们通常被存储在栈中，而不是堆中。
* string：字符串实际上是一组字符数组，它们通常被存储在堆中，并通过引用地址存储在栈中。
* symbol：每个symbol对应于唯一的标识符。它们通常被存储在堆中，并通过引用地址存储在栈中。

而对于对象类型（包括对象、数组等），变量存储了一个指向存储对象的内存地址的指针。JavaScript采用引用计数内存管理，因此它会对每个对象进行引用计数，当一个对象不再被引用时，JavaScript会自动回收这个对象的内存空间。

总的来说，在JavaScript中，变量的存储方式基于值类型的数据类型，对于对象型变量，存储指向对象的内存地址的指针以及对象的值，而对于基础类型的变量，直接存储变量的值。

## 340 值类型和引用类型 的区别?【热度: 1,625】

* created_at: 2023-05-05T16:07:18Z
* updated_at: 2023-05-05T16:07:19Z
* labels: JavaScript
* milestone: 初

**关键词**：值类型和引用类型区别

在JavaScript中，值类型和引用类型是两种不同的数据类型，它们之间的区别在于数据存储和传递的方式不同。

值类型（也称为“原始类型”）包括 undefined、null、boolean、number和string。这些数据类型的值是可以直接存储在变量中的，这意味着如果我们将一个值类型的变量赋给另一个变量时，实际上是将值复制到新变量的内存空间中。在JavaScript中，值类型的变量是直接存储在栈中的。因此，值类型的变量永远不会出现“引用计数”错误，因为每个变量都可以被简单地复制和赋值。

引用类型包括对象、数组和函数等复杂数据类型。和值类型不同，引用类型的值是存储在堆中的，栈中存储的是变量的引用地址。当我们把一个引用类型的变量赋给另一个变量时，实际上是将变量的引用地址复制到了新变量的内存空间中。这意味着这两个变量引用同一个对象。如果我们修改一个变量，那么另一个变量也会被修改；因为它们引用同一个对象。如果我们在堆中创建多个对象，则会有多个变量引用它们。这一点需要非常小心，因为它可以导致一些问题，如“引用计数”错误。

总之，JavaScript中的值类型和引用类型之间的区别在于它们如何存储和传递。理解这两种不同的数据类型的工作原理，可以帮助我们更好地理解JavaScript的内部工作原理，从而更好地编写代码。

**举例说明**

下面是一个简单的例子，来说明值类型和引用类型在操作时的区别：

```js
// 值类型
let x = 1
const y = x
x = 2
console.log(x) // 输出2
console.log(y) // 输出1

// 引用类型
const a = { name: 'Tom', age: 20 }
const b = a
a.age = 30
console.log(a.age) // 输出30
console.log(b.age) // 输出30，原因是 a 和 b 指向同一个对象
```

在这个例子中，我们首先创建一个值类型变量 x，并将其值设置为 1。接着我们将 x 的值赋给 y 变量。然后我们将 x 的值修改为 2，这不会影响变量 y，因为 x 和 y 之间的赋值使用的是值复制。这是值类型的典型特性。

接下来，我们创建了一个包含 name 和 age 属性的对象 a，并将其赋给变量 b。然后我们修改了 a 的 age 属性的值。此时，由于 a 和 b 引用同一个对象，因此 b.age 的值也随之改变，这才是引用类型的典型特性。

在代码中我们看到，值类型的变量在赋值时是通过复制整个值本身的副本，在内存中分配了新的空间来存储。而引用类型的变量赋值时是将指针复制到新变量中，用来指向堆（heap）中存储对象的内存空间。

## 341 npm script 生命周期有哪些?【热度: 519】

* created_at: 2023-05-06T12:00:10Z
* updated_at: 2023-05-06T12:10:45Z
* labels: 工程化, 小米
* milestone: 高

**关键词**：npm 生命周期、script 生命周期

 安装和卸载

| 脚本名称 | 阶段 | 描述 | 执行时机 |
|-----------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| preinstall | pre | 在 npm install 执行前运行，用于执行一些安装前的准备工作，例如检查依赖项或设置环境变量。 | 安装前 |
| install, postinstall | install | 在模块安装后执行，通常用于构建项目或者为其生成某些必须的文件，例如安装完毕后自动编译 TypeScript、ES6 等。 | 安装后 |
| preuninstall | pre | 在 npm uninstall 执行前运行，用于执行一些卸载前的准备工作。 | 卸载前 |
| uninstall | post | 在 npm uninstall 执行后运行，用于清理卸载后的一些操作。 | 卸载后 |
| postuninstall | post | 在 npm uninstall 执行后运行，用于执行一些卸载后的操作。 | 卸载后 |

 发布和更新版本

| 脚本名称 | 阶段 | 描述 | 执行时机 |
|-----------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| prepublish | pre | 在 publish（npm发布）执行前，运行 npm pack。 | 发布前 |
| prepare | pre | 在包被发布前或安装前执行，可以用来设置编译或验证文件的操作。 | 发布前、安装前 |
| prepublishOnly | pre | 在 npm publish 执行前运行，用于确保在 publish 命令执行时不会意外发布不必要的文件。 | 发布前 |
| prepack | pre | 在 npm pack（打包命令）执行前运行，用于执行一些打包前的准备工作。 | 打包前 |
| postpack | post | 在 npm pack 执行后运行，用于清理和重置打包相关的操作。 | 打包后 |
| publish | post | 在包被成功发布后执行。 | 发布后 |
| postpublish | post | 在包被成功发布后执行，用于执行一些发布后的操作。 | 发布后 |
| preversion | pre | 在项目版本号更新（npm version）之前执行。 | 更新版本号前 |
| version | post | 在 npm version 执行后执行，用于执行一些版本更新后的操作。 | 更新版本号后 |
| postversion | post | 在项目版本号更新（npm version）之后执行。 | 更新版本号后 |

 测试和运行

| 脚本名称 | 阶段 | 描述 | 执行时机 |
|-----------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| pretest | pre | 在 npm test 执行前执行，用于执行某些测试前的准备工作。 | 测试前 |
| test | test | 执行 npm run test 命令时执行。通常用于执行单元测试，并返回任何错误状态。 | 默认测试阶段 |
| posttest | post | 在 npm test 执行后执行，用于执行某些测试后的操作。 | 测试后 |
| prestart | pre | 在 npm start 执行前运行，用于执行某些启动进程前的准备工作。 | 启动前 |
| start | start | 执行 npm start 命令时执行，通常用于启动 Web 服务器、Node 服务器、实时编译器等。 | 默认启动阶段 |
| poststart | post | 在 npm start 执行后执行，用于执行某些启动进程后的操作。 | 启动后 |
| prerestart | pre | 在 npm restart 执行前执行，用于执行一些重新启动进程前的准备工作。 | 重新启动前 |
| restart | stop/start | 执行 npm restart 命令时执行，通常用于停止正在运行的 Node 服务器、Web 服务器等，然后以更新的源码重新启动服务。 | 默认重新启动阶段，但是该命令会触发停止和启动两个标准阶段 |
| postrestart | post | 在 npm restart 执行后执行，用于执行一些重新启动进程后的操作。 | 重新启动后 |

 其他生命周期

| 脚本名称 | 阶段 | 描述 | 执行时机 |
|-----------------|--------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| prestop | pre | 在 npm stop 执行前运行，用于执行某些停止进程前的准备工作。 | 停止前 |
| stop | stop | 执行 npm stop 命令时执行，通常用于停止正在运行的 Web 服务器、Node 服务器、实时编译器等。 | 默认停止阶段 |
| poststop | post | 在 npm stop 执行后执行，用于执行某些停止进程后的操作。 | 停止后 |

## 342 Grid 布局了解多少？【热度: 653】

* created_at: 2023-05-06T12:10:32Z
* updated_at: 2023-05-06T12:10:33Z
* labels: CSS, 美团
* milestone: 初

**关键词**：Grid 布局、Grid 属性

 什么是 grid 布局

CSS Grid 布局是 CSS 中的一种新的布局系统，旨在通过 网格（grid）和 行（row）、列（column）的概念来创建灵活的、高效的、响应式网页布局。CSS Grid 布局可以将一个元素的内容划分为多个网格，根据需要，可以在这些网格中定位元素。与传统的基于盒子模型的布局方式不同，CSS Grid 布局以一种更直观、更高效的方式来处理布局问题。

可以通过 CSS Grid 属性来定义网格和元素的位置，包括大小、间距、对齐方式等等。CSS Grid 布局还支持类似 Flexbox 的弹性布局，例如自适应尺寸、重叠和层叠等特性。最重要的是，因为 CSS Grid 布局与内容的结构分离，所以它能够为设计响应式布局提供出色的支持，而不需要在内容标记中添加过多的 CSS 或者 JavaScript。

 grid 布局有哪些 api

CSS Grid 布局提供了一系列的 API 来实现网格布局，以下是常用的几个属性：

1. `display: grid;`：设置一个元素为网格容器
2. `grid-template-columns`：定义网格中每一列的大小和数量
3. `grid-template-rows`：定义网格中每一行的大小和数量
4. `grid-template-areas`：为网格中的区域命名，以便将子元素分配到特定的区域
5. `grid-column-gap` 和 `grid-row-gap`：定义网格中行和列之间的间距
6. `grid-area`：定义元素应该在网格中的哪个区域，比如指定其所在的行、列和跨越的行列数量
7. `grid-column-start` 和 `grid-column-end`：定义元素开始和结束的列位置，类似地，`grid-row-start` 和 `grid-row-end` 定义元素开始和结束的行位置
8. `grid-column` 和 `grid-row`：简写属性，组合了 `grid-column-start` 、`grid-column-end` 、`grid-row-start` 和 `grid-row-end`，用于同时设置元素在网格中的列和行位置。

这些属性可以帮助我们在网格容器中定义网格，并指定子元素在网格中的位置和大小。还有其他的属性可以进一步调整子元素的位置和大小，如 `justify-self` 和 `align-self` 用于调整子元素的水平和垂直对齐方式，`grid-auto-columns` 和 `grid-auto-rows` 用于指定未被显式指定的网格单元格的大小等等。

 如何使用 grid 布局

CSS Grid 布局可以通过以下步骤来使用：

1. 在父级元素上声明 `display: grid` 属性，将其转换为网格容器。
2. 使用 `grid-template-columns` 和 `grid-template-rows` 属性来定义行和列的网格大小和数量，或者使用 `grid-template-areas` 属性来定义网格中的区域。
3. 使用 `gap` 属性来定义行和列之间的间距。
4. 将子元素放到网格容器中，并使用 `grid-column` 和 `grid-row` 属性来指定子元素在网格中的位置，也可以通过 `grid-area` 属性来指定子元素在网格中的区域。
5. 可以使用其他属性来进一步改变子元素的位置和大小，比如 `justify-self` 和 `align-self` 等属性来设置元素的对齐方式和位置。

下面是一个简单的使用 Grid 布局的示例，创建一个 3x3 网格：

```html
<div class="grid-container">
 <div class="grid-item item1">1</div>
 <div class="grid-item item2">2</div>
 <div class="grid-item item3">3</div>
 <div class="grid-item item4">4</div>
 <div class="grid-item item5">5</div>
 <div class="grid-item item6">6</div>
 <div class="grid-item item7">7</div>
 <div class="grid-item item8">8</div>
 <div class="grid-item item9">9</div>
</div>
```

```css
.grid-container {
 display: grid;
 grid-template-columns: repeat(3, 1fr);
 grid-template-rows: repeat(3, 1fr);
 gap: 10px;
}

.grid-item {
 background-color: #ddd;
 padding: 20px;
 font-size: 30px;
 text-align: center;
}

.item1 {
 grid-column: 1 / span 2;
 grid-row: 1;
}

.item2 {
 grid-column: 3;
 grid-row: 1 / span 2;
}

.item3 {
 grid-column: 1;
 grid-row: 2 / span 2;
}

.item4 {
 grid-column: 2;
 grid-row: 2;
}

.item5 {
 grid-column: 3;
 grid-row: 3;
}

.item6 {
 grid-column: 2 / span 2;
 grid-row: 4;
}

.item7 {
 grid-column: 1;
 grid-row: 5;
}

.item8 {
 grid-column: 2;
 grid-row: 5;
}

.item9 {
 grid-column: 3;
 grid-row: 5;
}
```

在这个示例中，我们创建了一个包含 9 个子元素的网格容器。通过设置网格容器的 `grid-template-columns` 和 `grid-template-rows` 属性，我们定义了一个 3x3 的网格，并通过 `gap` 属性设置了行和列的间距。然后，我们使用 `grid-column` 和 `grid-row` 属性来指定每个子元素在网格中的位置，或使用 `grid-area` 属性来指定子元素在网格中的区域。通过这些属性的值，我们可以指定每个子元素跨越多少行和多少列，或者指定一个子元素占据网格中的多个区域。

## 343 [React] createElement 和 cloneElement 有什么区别【热度: 218】

* created_at: 2023-05-06T13:27:11Z
* updated_at: 2023-05-06T13:27:12Z
* labels: web框架, 美团
* milestone: 高

**关键词**：createElement cloneElement

 `createElement` 和 `cloneElement` 有什么区别?

React 中的 `createElement` 和 `cloneElement` 都可以用来创建元素，但它们用法有所不同。

`createElement` 用于在 React 中动态地创建一个新的元素，并返回一个 React 元素对象。它的用法如下：

```jsx
React.createElement(type, [props], [...children]);
```

其中，`type` 是指要创建的元素的类型，可以是一个 HTML 标签名（如 `div`、`span` 等），也可以是一个 React 组件类（如自定义的组件），`props` 是一个包含该元素需要设置的属性信息的对象，`children` 是一个包含其子元素的数组。`createElement` 会以这些参数为基础创建并返回一个 React 元素对象，React 将使用它来构建真正的 DOM 元素。

`cloneElement` 用于复制一个已有的元素，并返回一个新的 React 元素，同时可以修改它的一些属性。它的用法如下：

```jsx
React.cloneElement(element, [props], [...children]);
```

其中，`element` 是指要复制的 React 元素对象，`props` 是一个包含需要覆盖或添加的属性的对象，`children` 是一个包含其修改后的子元素的数组。`cloneElement` 会以这些参数为基础复制该元素，并返回一个新的 React 元素对象。

在实际使用中，`createElement` 通常用于创建新的元素（如动态生成列表），而 `cloneElement` 更适用于用于修改已有的元素，例如在一个组件内部使用 `cloneElement` 来修改传递进来的子组件的属性。

 `cloneElement` 有哪些应用场景

React 中的 `cloneElement` 主要适用于以下场景：

1. 修改 props

`cloneElement` 可以用于复制一个已有的元素并覆盖或添加一些新的属性。例如，可以复制一个带有默认属性的组件并传递新的属性，达到修改属性的目的。

```jsx
// 假设有这样一个组件
function MyComponent(props) {
 // ...
}

// 在另一个组件中使用 cloneElement 修改 MyComponent 的 props
function AnotherComponent() {
 return React.cloneElement(<MyComponent />, { color: 'red' });
}
```

2. 渲染列表

在渲染列表时，可以使用 `Array.map()` 生成一系列的元素数组，也可以使用 `React.Children.map()` 遍历子元素并返回一系列的元素数组，同时使用 `cloneElement` 复制元素并传入新的 key 和 props。

```jsx
// 使用 Children.map() 遍历子元素并复制元素
function MyList({ children, color }) {
 return (
 <ul>
 {React.Children.map(children, (child, index) =>
 React.cloneElement(child, { key: index, color })
 )}
 </ul>
 );
}

// 在组件中使用 MyList 渲染列表元素
function MyPage() {
 return (
 <MyList color="red">
 <li>Item 1</li>
 <li>Item 2</li>
 <li>Item 3</li>
 </MyList>
 );
}
```

3. 修改子元素

使用 `cloneElement` 也可以在一个组件内部修改传递进来的子组件的属性，例如修改按钮的样式。

```jsx
function ButtonGroup({ children, style }) {
 return (
 <div style={style}>
 {React.Children.map(children, (child) =>
 React.cloneElement(child, { style: { color: 'red' } })
 )}
 </div>
 );
}

function MyPage() {
 return (
 <ButtonGroup style={{ display: 'flex' }}>
 <button>Save</button>
 <button>Cancel</button>
 </ButtonGroup>
 );
}
```

总之，`cloneElement` 可以方便地复制已有的 React 元素并修改其属性，适用于许多场景，例如修改 props、渲染列表和修改子元素等。

## 344 [React] createPortal 了解多少？【热度: 597】

* created_at: 2023-05-06T13:38:43Z
* updated_at: 2023-05-06T13:38:44Z
* labels: web框架, 网易
* milestone: 中

**关键词**：react createPortal

`createPortal` 是 React 中一个用于将子元素渲染到指定 DOM 元素下的 API。

在 React 应用中，通常会通过组件树传递 props、状态等数据来渲染 UI，并由 React 自动管理 DOM 元素的创建、更新和销毁等操作。不过，有时我们需要将某些 UI 元素渲染到根节点之外的 DOM 元素下，例如弹出框、模态框等。这时，`createPortal` 就能派上用场了。

`createPortal` 的用法如下：

```jsx
ReactDOM.createPortal(child, container)
```

其中，`child` 是指要渲染的子元素，可以是任何有效的 React 元素，包括组件、HTML 元素等等；`container` 是指要将子元素渲染到的 DOM 元素，可以是一个有效的 DOM 元素对象，例如通过 `document.getElementById` 获取到的 DOM 元素。`createPortal` 会将 `child` 渲染到 `container` 中，但仍然能够受到 React 生命周期的管理，例如 `componentDidMount` 和 `componentWillUnmount` 等方法。

下面是一个例子，它展示了如何使用 `createPortal` 来将一个弹出框渲染到根节点之外的 DOM 元素下：

```jsx
function Dialog(props) {
 return ReactDOM.createPortal(
 <div className="dialog">
 <h2>{props.title}</h2>
 <div>{props.content}</div>
 </div>,
 document.getElementById('dialog-container')
 );
}

function App() {
 return (
 <div>
 <p>这是一个文本内容。</p>
 <Dialog title="提示" content="这是一个弹出框。" />
 </div>
 );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

在这个例子中，`Dialog` 组件使用 `createPortal` 将其子元素渲染到 `#dialog-container` 这个元素下，而不是直接渲染到 `#root` 下。这个功能使得我们可以在 React 应用中方便地处理弹出框等类似需求。

## 345 eval 了解多少？【热度: 538】

* created_at: 2023-05-06T14:29:24Z
* updated_at: 2023-05-06T14:29:25Z
* labels: JavaScript
* milestone: 中

**关键词**：eval 使用场景、eval 性能、eval 优点、eval 缺点

 什么是 eval

`eval()` 是 JavaScript 的一个全局函数，用于解析并执行字符串代码。

它接受一个字符串参数，该字符串包含 JavaScript 表达式或语句。在 `eval` 函数执行期间，该字符串的内容将被视为有效 JavaScript 代码，并运行当前作用域中的变量和函数。`eval()` 函数返回执行结果的值。

举个例子：

```js
const x = 1
const y = 2
const result = eval('x + y') // 将字符串作为代码执行
console.log(result) // 输出 3
```

`eval()` 常被认为是一个危险的函数，原因是它可以执行任何字符串。如果 `eval()` 执行了用户输入的文本，攻击者可能会注入恶意代码，从而窃取敏感信息或操纵应用程序。因此，最好不要在程序中使用 `eval()` 函数，除非你非常明确及了解其潜在风险。

除了 `eval()`，JavaScript 还提供了其他如 `Function()` 构造函数或 `setTimeout()` 等能够执行字符代码的方法，但它们的使用都需要非常小心。

 eval 的性能为何比静态编写和编译的代码要慢

`eval()` 函数解析并执行动态的字符串代码，因此在运行时需要进行代码分析和编译。每次调用 `eval()` 都需要重复执行这些操作，这对性能的影响非常大。同时，由于 `eval()` 执行的代码是字符串形式并不是预编译的机器代码，在执行时可能需要使用更多的内存和 CPU 资源。

相比之下，静态编写的代码在编译时已经被转化为机器代码，因此执行速度会更快。编译器可以进行多项优化，例如移除无用的代码，减少内存分配等。这些优化在运行时是不可能完成的，因此 `eval()` 函数的性能相对较低。

 eval 性能一定就很差吗

不是所有情况下 `eval()` 函数的性能都很差。在某些情况下，`eval()` 的性能可能与静态编写的代码相当。例如，如果动态代码比较简单，并且在程序运行期间只会执行一次，那么使用 `eval()` 不会造成显著的性能损失。但是如果动态代码比较复杂，并且需要经常执行，那么使用 `eval()` 的性能就会显著低于静态编写的代码。

另外，`eval()` 的性能问题还取决于运行时环境的不同。在某些浏览器中，使用 `eval()` 时会导致缓慢的 JavaScript 执行，而在其他浏览器中则表现良好。因此，在编写代码时，应该始终将性能作为一个重要的因素进行考虑，并根据实际情况来选择使用 `eval()` 或其他适当的解决方案。

 eval 有什么优势

`eval()` 函数有以下几个优势：

1. 动态执行代码：`eval()` 函数可以动态地将字符串解析为 JavaScript 代码并执行，从而可以在运行时动态生成代码并执行。这种动态性使得 `eval()` 函数在一些特定的编程场景中非常有用，例如动态计算表达式、动态生成函数等。

2. 灵活性高：由于 `eval()` 函数可以动态解析字符串并执行其中的 JavaScript 代码，因此可以根据需要在运行时动态生成代码，而不必在编写代码时预先定义。这种灵活性使得 `eval()` 函数在一些需要动态生成代码的场景中非常有用。

3. 命名空间：由于 `eval()` 函数会执行其中的 JavaScript 代码，因此代码可以利用当前作用域中的变量和函数，从而可以有效地利用命名空间并提高代码的复用性。

**缺点**

虽然 `eval()` 函数具有上述优势，但它也存在潜在的安全隐患，因此应当避免在应用程序中过度使用 `eval()` 函数，并在使用时注重安全性和可控性。

## 346 new Function 了解多少？【热度: 1,042】

* created_at: 2023-05-06T14:58:42Z
* updated_at: 2023-05-06T14:58:42Z
* labels: JavaScript
* milestone: 高

**关键词**：new Function 概念、js new Function 执行性能、js new Function 使用场景

 基本概念

`new Function()` 是 JavaScript 中的一个构造函数，它可以实例化一个新的函数对象并返回。该函数对象可以使用传递给 `new Function()` 的字符串参数作为函数体，并使用其他传递给它的参数作为函数参数，从而动态创建一个可执行的函数。

具体来说，`new Function()` 构造函数可以接受多个字符串参数作为函数的参数和函数体，其参数形式如下：

```
new Function ([arg1[, arg2[, ...argn]],] functionBody)
```

其中，`arg1, arg2, ..., argn` 为函数的参数列表，`functionBody` 为函数体的字符串表示。当调用 `new Function()` 函数时，JavaScript 引擎会将 `arg1, arg2, ..., argn` 所表示的参数和 `functionBody` 所表示的函数体组合成一个新的函数对象，并将该对象返回。

**举例**

下面是一个简单的 `new Function()` 的使用示例，它使用 `new Function()` 构造函数动态创建一个函数对象，并将该对象作为变量 `add` 的值进行赋值：

```
const add = new Function('a', 'b', 'return a + b;');
console.log(add(2, 3)); // 5
```

上述代码中，`new Function('a', 'b', 'return a + b;')` 创建了一个新的函数对象，其中 `'a'` 和 `'b'` 是函数的参数列表，`'return a + b;'` 是函数的实现代码。然后，该函数对象被赋值给变量 `add`。最后，调用 `add(2, 3)` 执行该函数，返回 `5`。

需要注意的是，`new Function()` 构造函数不能访问其上下文中的变量和函数，因此在使用时需要特别注意作用域的限制。同时，由于 `new Function()` 构造函数的执行权限较为灵活，因此在使用时需要仔细检查并确保其输入参数的合法性和安全性。

 new Function 和 eval 的区别

虽然 `new Function()` 和 `eval()` 都可以执行字符串形式的 JavaScript 代码，但是它们在执行方式、使用场景和安全性方面还是有很大的区别的。

下面是 `new Function()` 和 `eval()` 的主要区别：

1. 执行方式不同：`new Function()` 构造函数创建的函数对象只会在其被调用时才会执行，而 `eval()` 函数则立即执行其参数中的 JavaScript 代码，并返回其中的值（如果有）。

2. 作用域不同：`new Function()` 构造函数创建的函数对象没有访问父作用域的能力，只能访问自己的局部变量和全局变量；而 `eval()` 函数则可以访问其自身函数作用域和父作用域的变量和函数，因此具有更高的灵活性和不可预知性。

3. 安全性不同：由于 `new Function()` 构造函数定义的函数对象是在严格的函数作用域下运行的，因此其代码不会改变或访问父作用域中的变量。因此，使用 `new Function()` 构造函数创建函数对象时，可以更好地保证其安全性。而 `eval()` 函数则无法保证代码的安全性，因为它可以访问并改变父作用域中的变量，从而具有更高的攻击风险。

 new Function 性能

与 `eval()` 相比，`new Function()` 函数具有更好的性能。这是因为 `new Function()` 函数在编译时会创建一个新的函数对象，不会像 `eval()` 函数一样将代码注入到当前作用域中。相反，它只在需要时才编译并执行代码，因此在常规情况下，`new Function()` 的性能比 `eval()` 更好。

另外，由于 `new Function()` 在全局作用域外部定义新的函数，可以更好地掌控执行环境，因此我们可以利用 `new Function()` 函数的局部性，使其不仅取代 `eval()`，而且在一定程度上比自执行函数和即时函数表达式引入更少的全局变量。

不过需要注意的是，如果在一个循环中频繁地使用 `new Function()`，或者在函数体内创建过多的嵌套函数，可能会导致性能下降。因此，当需要使用 `new Function()` 函数时，应该尽量减少不必要的重复调用，并注意代码的优化和缓存。

 new Function 使用场景

`new Function()` 的使用场景主要是动态生成 Javascript 代码的情况。由于它可以使用字符串形式作为函数体，并接受可变数量的参数，因此很适合在需要动态生成 JavaScript 代码的场景中使用。下面列举一些常见的使用场景：

1. 动态生成函数：使用 `new Function()` 可以动态生成函数，有时候这种方式比使用函数表达式更加灵活。

2. 模板引擎：某些模板引擎使用 `new Function()` 动态生成 JavaScript 代码来进行文本渲染和数据绑定。

3. 解析 JSON：从服务端获取 JSON 数据时，可以使用 `new Function()` 将其转换为具有更好可读性的 JavaScript 对象。
举例：

```js
const json = '{"name": "张三", "age": "18", "gender": "男"}'
const parseJson = new Function(`return ${json}`)

console.log(parseJson()) // 输出：{name: "张三", age: "18", gender: "男"}
```

4. 在浏览器中查找或执行某些 DOM 元素：可以将 JavaScript 代码传递给 `new Function()` 进行动态执行和查找。

需要注意的是，由于 `new Function()` 可以动态生成和执行任意 JavaScript 代码，因此其安全性和风险需要仔细考虑和评估。在使用 `new Function()` 时，应该避免用于可疑的或不可信任的代码执行，并严格控制传递给函数构造函数的参数，以避免潜在的安全漏洞。

## 347 Javascript 数组中有那些方法可以改变自身，那些不可以

* created_at: 2023-05-06T15:41:01Z
* updated_at: 2023-06-02T06:36:31Z
* labels: JavaScript
* milestone: 初

可以改变自身的数组方法：

* `pop()`: 删除数组最后一项，并返回删除项的值。
* `push():` 向数组末尾添加一个或多个元素，并返回新数组的长度。
* `reverse()`: 反转数组的顺序，返回逆序后的原数组。
* `shift()`: 删除数组第一项，并返回删除项的值。
* `unshift()`: 方法将指定元素添加到数组的开头，并返回数组的新长度。
* `sort()`: 对数组进行排序，返回排序后的原数组。
* `splice()`: 添加或删除数组元素，返回由被删除元素组成的数组。

不可以改变自身的数组方法:

* `concat()`: 连接一或多个数组，返回新的合并的数组。
* `filter()`: 对数组筛选符合条件的项，并返回符合条件的项组成的新数组。
* `map()`: 对数组的每一项进行操作，并返回每个操作后的项组成的新数组。
* `slice()`: 返回数组的一部分作为新数组，原数组不会改变。
* `join()`: 将数组的每一项拼接起来作为一个字符串返回，原数组不会改变。

## 349 [React] memo 和 useMemo 有和区别？【热度: 654】

* created_at: 2023-05-06T15:47:10Z
* updated_at: 2023-05-06T15:47:11Z
* labels: web框架
* milestone: 中

**关键词**：memo useMemo

`React.memo` 和 `useMemo` 是在 React 中处理性能优化的两个工具，虽然它们名称相似，但是它们的作用和使用方法是不同的。

`React.memo` 是高阶组件，它可以用来优化函数组件的渲染性能。它会比较当前组件的 `props` 和 `state` 是否发生了变化，如果都没有变化，就不会重新渲染该组件，而是直接使用之前的结果。例如：

```jsx
import React from 'react';
 
const MyComponent = React.memo(props => {
 return <div>{props.value}</div>;
});
```

在上面的代码中，`React.memo` 包装了一个简单的函数组件 `MyComponent`。如果该组件的 `value` prop 和 `state` 没有发生变化，那么就会直接使用之前的结果不会重新渲染。

`useMemo` 是 `React` 中一个 hooks，它可以用来缓存计算结果，从而优化组件渲染性能。它接受两个参数：要缓存的计算函数和依赖项数组。每当依赖项发生变化时，该计算函数就会重新计算，并返回一个新的结果。例如：

```jsx
import React, { useMemo } from 'react';
 
const MyComponent = props => {
 const result = useMemo(() => expensiveComputation(props.value), [props.value]);
 return <div>{result}</div>;
};
```

在上面的代码中，我们传递了一个计算函数 `expensiveComputation`，以及一个依赖项数组 `[props.value]`。如果依赖项没有发生变化，`myValue` 就会被缓存起来，不会重新计算。

总的来说：

`React.memo` 的作用是优化函数组件的渲染性能，它可以比较组件的 `props` 和 `state` 是否发生变化，如果没有变化，就不会重新渲染。

`useMemo` 的作用是缓存计算结果，从而避免重复计算，它接受一个计算函数和一个依赖项数组，当依赖项发生变化时，计算函数就会重新计算，返回一个新的结果，否则就会使用之前的缓存结果。

## 350 如何做 promise 缓存？上一次调用函数的 promise 没有返回， 那么下一次调用函数依然返回上一个 promise

* created_at: 2023-05-06T16:22:53Z
* updated_at: 2023-05-06T16:22:54Z
* labels: JavaScript
* milestone: 高

 基础实现

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

## 351 前端水印了解多少？【热度: 641】

* created_at: 2023-05-13T16:08:21Z
* updated_at: 2023-05-13T16:08:22Z
* labels: web应用场景, 小米
* milestone: 高

**关键词**：前端 明水印 暗水印

 明水印和暗水印的区别

前端水印可以分为明水印和暗水印两种类型。它们的区别如下：

1. 明水印：明水印是通过在文本或图像上覆盖另一层图像或文字来实现的。这种水印会明显地出现在页面上，可以用来显示版权信息或其他相关信息。

2. 暗水印：暗水印是指在文本或图像中隐藏相关信息的一种技术。这种水印不会直接出现在页面上，只有在特殊的程序或工具下才能被检测到。暗水印通常用于保护敏感信息以及追踪网页内容的来源和版本。

 添加明水印手段有哪些

可以参考这个文档： [资料](https://zhuanlan.zhihu.com/p/374734095)

总计一下：

1. 重复的dom元素覆盖实现： 在页面上覆盖一个position:fixed的div盒子，盒子透明度设置较低，设置pointer-events: none;样式实现点击穿透，在这个盒子内通过js循环生成小的水印div，每个水印div内展示一个要显示的水印内容

2. canvas输出背景图： 绘制出一个水印区域，将这个水印通过toDataURL方法输出为一个图片，将这个图片设置为盒子的背景图，通过backgroud-repeat：repeat；样式实现填满整个屏幕的效果。

3. svg实现背景图： 与canvas生成背景图的方法类似，只不过是生成背景图的方法换成了通过svg生成

4. 图片加水印

 css 添加水印的方式， 如何防止用户删除对应的 css ， 从而达到去除水印的目的

使用 CSS 添加水印的方式本身并不能完全防止用户删除对应的 CSS 样式，从而删除水印。但是，可以采取一些措施来增加删除难度，提高水印的防伪能力。以下是一些常见的方法：

1. 调用外部CSS文件：将水印样式单独设置在一个CSS文件内，并通过外链的方式在网站中调用，可以避免用户通过编辑页面HTML文件或内嵌样式表的方式删除水印。

2. 设置样式为 !important：在CSS样式中使用 !important 标记可以避免被覆盖。但是，这种方式会影响网页的可读性，需慎重考虑。

3. 添加自定义类名：通过在CSS样式中加入自定义的class类名，可以防止用户直接删掉该类名，进而删除水印。但是，用户也可以通过重新定义该类名样式来替换水印。

4. 将水印样式应用到多个元素上：将水印样式应用到多个元素上，可以使得用户删除水印较为困难。例如，在网站的多个位置都加上"Power by XXX"的水印样式。

5. 使用JavaScript动态生成CSS样式：可以监听挂载水印样式的dom 节点， 如果用户改变了该 dom , 重新生成 对应的水印挂载上去即可。 这种方法可通过JS动态生成CSS样式，从而避免用户直接在网页源文件中删除CSS代码。但需要注意的是，这种方案会稍稍加重网页的加载速度，需要合理权衡。

6. 混淆CSS代码：通过多次重复使用同一样式，或者采用CSS压缩等混淆手段，可以使CSS样式表变得复杂难懂，增加水印被删除的难度。

7. 采用图片水印的方式：将水印转化为一个透明的PNG图片，然后将其作为网页的背景图片，可以更有效地防止水印被删除。

8. 使用SVG图形：可以将水印作为SVG图形嵌入到网页中进行展示。由于SVG的矢量性质，这种方式可以保证水印在缩放或旋转后的清晰度，同时也增加了删除难度。

 暗水印是如何把水印信息隐藏起来的

暗水印的基本原理是在原始数据（如文本、图像等）中嵌入信息，从而实现版权保护和溯源追踪等功能。暗水印把信息隐藏在源数据中，使得人眼难以察觉，同时对源数据的影响尽可能小，保持其自身的特征。

一般来说，暗水印算法主要包括以下几个步骤：

1. 水印信息处理：将待嵌入的信息经过处理和加密后，转化为二进制数据。

2. 源数据处理：遍历源数据中的像素或二进制数据，根据特定规则对其进行调整，以此腾出空间插入水印二进制数据。

3. 嵌入水印：将水印二进制数据插入到源数据中的指定位置，以某种方式嵌入到源数据之中。

4. 提取水印：在使用暗水印的过程中，需要从带水印的数据中提取出隐藏的水印信息。提取水印需要使用特定的解密算法和提取密钥。

暗水印的一个关键问题是在嵌入水印的过程中，要保证水印对源数据的伤害尽可能的小，同时嵌入水印后数据的分布、统计性质等不应发生明显变化，以更好地保持数据的质量和可视效果。

## 352 HTML5 中 meta 标签作用是啥【热度: 1,562】

* created_at: 2023-05-15T15:08:00Z
* updated_at: 2023-05-15T15:08:00Z
* labels: 浏览器, 阿里巴巴
* milestone: 初

**关键词**：html5 meta

HTML 5 中的 meta 标签是一个非常常用的标签，它可以用来描述一个 HTML 文档的一些基本信息与配置，包括字符编码、页面关键词、作者、视口大小等。具体来说，meta 标签可用于以下几个方面：

1.描述文档内容：通过设置 meta 标签中的一些属性，可以描述文档的主体内容、作者、关键词和摘要等信息，以便搜索引擎索引和显示。

2.控制页面行为：指定 meta 标签中的属性值可以控制页面的默认行为，比如设置视口大小可以实现响应式设计。

3.声明字符编码：通过设置 meta 标签中的 charset 属性值，可以声明文档中使用的字符编码格式，帮助浏览器正确地解读页面内容。

4.防止 XSS 攻击：设置 meta 标签的 http-equiv 属性为 content-security-policy，可以提高页面的安全性，保护页面免受跨站脚本攻击(XSS)。

5.提供缓存机制：设置一些 meta 标签属性(如cache-control、expires、pragma)，可以控制浏览器缓存页面内容的时间和方式。

## 353 CSS 选择器有哪些、优先级如何？【热度: 1,183】

* created_at: 2023-05-15T15:13:02Z
* updated_at: 2023-05-15T15:13:03Z
* labels: CSS, 腾讯
* milestone: 初

**关键词**：css 选择器、css 优先级

CSS 选择器有以下几种：

1.元素选择器：通过标签名选择元素，例如：`p {}`。

2.类选择器：通过 `.`+类名的形式选择元素，例如：`.my-class {}`。

3.ID 选择器：通过 `#`+ID名的形式选择元素，例如：`#my-id {}`。

4.通配符选择器：通过 `*` 选择所有元素，例如：`* {}`。

5.后代选择器：通过空格 `` 选择某元素下的后代元素，例如：`.my-parent .my-child {}`。

6.子元素选择器：通过 `>` 选择某元素的子元素，例如：`ul > li {}`。

7.相邻兄弟选择器：通过 `+` 选择相邻的后续同级元素，例如：`.my-class + p {}`。

8.通用兄弟选择器：通过 `~` 选择后继的同级元素，例如：`.my-class ~ p {}`。

CSS 选择器的优先级从高到低如下：

1. !important：使用该关键词的属性优先级最高。

2. 行内样式：使用元素的 style 属性设置的样式优先级最高。

3. ID 选择器：指定 ID 的样式优先级高于类选择器和元素选择器。

4. 类选择器和属性选择器：优先级相同。

5. 元素选择器和伪类选择器：优先级相同。

6. 通配符和组合选择器：在没有更具体的选择器时优先级最低。

需要注意，当优先级相同时，后面生效的样式会覆盖前面的样式。针对这种情况，我们可以通过提高选择器的优先级、使用 !important、使用行内样式等方式进行调整。

## 354 CSS 伪类和伪元素有哪些，它们的区别和实际应用【热度: 317】

* created_at: 2023-05-15T16:03:08Z
* updated_at: 2023-05-15T16:03:09Z
* labels: CSS, 京东
* milestone: 初

**关键词**：css 伪类、css 伪元素

CSS 中有伪类和伪元素两种，它们在用法和意义上有一些区别。

伪类是对元素在特定状态下的一种描述。比如 `:hover` 代表鼠标悬停状态下的样式，`:active` 代表元素被激活状态下的样式。伪类始终以冒号 `:` 开头，并放在选择器的最后。常用的 CSS 伪类有：

1. `:hover`，鼠标移动到元素上时产生的效果。

2. `:active`，鼠标按下去但没有释放时的状态。

3. `:focus`，元素获取焦点时的状态。

4. `:visited`，链接被点击并访问过时的状态。

5. `:nth-child(n)`，选中元素的第 n 个 child 元素。

6. `:first-child`，选中第一个 child 元素。

7. `:last-child`，选中最后一个 child 元素。

另一方面，伪元素是对元素局部样式的描述，允许我们对某个元素的特定部分进行样式设置。比如 `::before` 可使用内容插入做出类似插画的效果，`::after` 可用于为元素添加内容等等。双冒号 `::` 也是伪元素的标识符。常用的 CSS 伪元素有：

1. `::before`，在元素内容前插入内容。

2. `::after`，在元素内容后插入内容。

3. `::first-letter`，选择元素的第一个字母。

4. `::first-line`，选择元素的第一行。

5. `::selection`，选择用户选中文本的部分。

区别与使用：

* 伪类的作用是改变元素在特定状态下的样式，而伪元素则充当一个元素的某一部分来做样式处理。
* 由于伪元素技术强大，可以为元素添加完全独立的内容而无需改变 HTML，因此在一些需要前端动态处理或给传统HTML元素嵌入样式的情况下，往往会用到伪元素技术。比如用 `::before` 和 `::after` 实现类似插画的效果。
* 伪类和伪元素在实际应用中搭配使用，可以产生更复杂和丰富的样式效果。因此在大量的开发工程中，两者的灵活应用至关重要。

## 355 如何防止 CSS 阻塞渲染【热度: 213】

* created_at: 2023-05-15T16:23:35Z
* updated_at: 2023-05-15T16:23:36Z
* labels: CSS, 网易
* milestone: 中

**关键词**：css 阻塞渲染、css 阻塞

当浏览器遇到一个 `<link>` 标签时，它会停止解析 HTML 并发出一个单独的网络请求去加载外部样式表。
这意味着，如果样式表很大或者网络速度很慢，它将阻止页面的渲染。阻止 CSS 渲染可能会导致页面看起来很糟糕，用户无法立即看到页面内容。

有一些方法可以防止或减轻 CSS 阻塞渲染：

1. 内联样式：使用内联样式而不是外部样式表，将样式放在页面的顶部，这样 HTML 就能很快地被渲染出来。

2. 通过媒体查询加载符合指定媒体类型或条件的样式表。这样不会影响未满足条件的设备或屏幕渲染结果。

3. 使用 `rel="preload"` 或者 `rel="prefetch"` 预加载样式表，这有助于在页面渲染过程中尽早加载样式表，提高页面加载速度。

4. 通过使用 JavaScript 动态加载样式表，可以实现延迟加载和异步加载。这可以帮助查看者能够看到尽快的内容，然后在不影响查看体验的前提下加载样式表。

5. 考虑压缩和优化您的 CSS 文件，以使代码更加紧凑、加载更快。

6. 对已经被加载的字体和图片，使用 CSS Sprites 技术合并到一个文件或者减少 HTTP 请求数量。

## 356 CSS 绘制三角形【热度: 324】

* created_at: 2023-05-16T14:47:12Z
* updated_at: 2023-09-12T08:25:14Z
* labels: CSS, 小米
* milestone: 中

**关键词**：css 绘制、css 三角形

在CSS中，你可以使用多种方法来实现三角形。以下是几种常用的方法和相应的代码示例：

1. 使用边框：

```css
.triangle {
 width: 0;
 height: 0;
 border-left: 50px solid transparent;
 border-right: 50px solid transparent;
 border-bottom: 100px solid red;
}
```

这个方法通过设置元素的边框来创建三角形，其中左右边框设为透明，底边框设置为你想要的颜色。

2. 使用伪元素：

```css
.triangle {
 position: relative;
 width: 100px;
 height: 100px;
}

.triangle:before {
 content: "";
 position: absolute;
 top: 0;
 left: 0;
 border-width: 0 100px 100px 0;
 border-style: solid;
 border-color: red;
}
```

这个方法使用伪元素 `::before` 来创建三角形，通过设置其边框的宽度和样式来实现。

3. 使用旋转：

```css
.triangle {
 width: 100px;
 height: 100px;
 background-color: red;
 transform: rotate(45deg);
}
```

这个方法创建一个正方形元素，然后通过使用 `transform` 属性的 `rotate` 函数将其旋转45度，从而形成一个三角形。

## 357 如何将JavaScript代码解析成抽象语法树(AST)【热度: 1,169】

* created_at: 2023-05-16T15:03:24Z
* updated_at: 2023-05-16T15:03:25Z
* labels: 工程化, 阿里巴巴
* milestone: 高

**关键词**：解析为 AST、抽象语法树、AST 词法分析、AST 语法分析

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

## 358 base64 的编码原理是什么

* created_at: 2023-05-16T15:09:02Z
* updated_at: 2023-05-16T15:09:03Z
* labels: web应用场景, 腾讯
* milestone: 高

Base64编码是一种用于将二进制数据转换为可打印ASCII字符的编码方式。它的原理如下：

1. 将原始数据划分为连续的字节序列。

2. 将每个字节转换为8位二进制数。

3. 将这些二进制数按照6位一组进行分组，不足6位的用0补齐。

4. 将每个6位的二进制数转换为对应的十进制数。

5. 根据Base64字符表，将十进制数转换为相应的可打印ASCII字符。

Base64字符表由64个字符组成，通常使用以下字符：A-Z、a-z、0-9以及字符"+"和"/"。这些字符可以通过索引值与相应的十进制数进行对应。

编码过程中，如果原始数据的长度不是3的倍数，会根据需要进行填充。填充通常使用字符"="，每个填充字符表示4位的零值。

解码时，按照相反的过程进行操作。将Base64编码后的字符串按照4个字符一组分组，并将每个字符转换回对应的十进制数。然后将这些十进制数转换为6位二进制数，并将这些二进制数连接起来。最后，将连接后的二进制数划分为8位一组，并将每个8位二进制数转换为对应的字节数据。

Base64编码主要应用于在文本协议中传输或存储二进制数据，例如在电子邮件中传输附件或在Web中传输图像数据。它可以将二进制数据转换为ASCII字符，使其在不支持二进制传输的环境中能够正常处理。

## 359 DNS解析过程

* created_at: 2023-05-16T15:21:41Z
* updated_at: 2023-05-16T15:21:42Z
* labels: 网络, 百度
* milestone: 高

DNS（Domain Name System，域名系统）解析是将域名转换为对应的IP地址的过程。下面是DNS解析的一般步骤：

1. 用户输入域名：用户在浏览器或其他应用程序中输入要访问的域名，例如 "[www.example.com"。](http://www.example.com%22%E3%80%82)

2. 本地缓存查找：操作系统首先会检查本地的DNS缓存，看是否已经缓存了该域名的IP地址。如果有匹配的缓存记录，且仍在有效期内，将直接返回对应的IP地址。

3. 本地域名服务器查询：如果本地缓存中没有找到对应的IP地址，操作系统会向配置的本地域名服务器（通常由ISP提供）发送查询请求。本地域名服务器是存储了大量DNS记录的服务器，通常可以快速响应查询请求。

4. 递归查询或迭代查询：本地域名服务器接收到查询请求后，会根据自身的配置进行递归查询或迭代查询。

递归查询：本地域名服务器会代表客户端进行完整的查询过程，直到找到目标域名的IP地址。如果本地域名服务器已经缓存了目标域名的IP地址，它将直接返回结果给客户端。

迭代查询：本地域名服务器向根域名服务器发送查询请求，根域名服务器返回顶级域名服务器（TLD）的地址。然后本地域名服务器再向TLD发送查询请求，TLD返回该域名的授权域名服务器的地址。最后，本地域名服务器向授权域名服务器发送查询请求，授权域名服务器返回目标域名的IP地址。

5. 返回IP地址：经过递归或迭代查询后，本地域名服务器会将获取到的IP地址返回给操作系统，然后操作系统将该IP地址存储在本地DNS缓存中，并将IP地址传递给应用程序。

6. 应用程序访问目标IP地址：应用程序收到IP地址后，可以直接使用该IP地址与目标服务器建立连接，并进行相应的网络请求。

DNS解析过程中还涉及到DNS记录的缓存、DNS服务器层级结构、域名的分级管理等概念和机制，以保证高效的解析过程和互联网的正常运行。

## 360 WebSocket 协议的底层原理是什么【热度: 1,805】

* created_at: 2023-05-22T12:49:38Z
* updated_at: 2023-05-22T12:49:39Z
* labels: 网络, 百度
* milestone: 高

**关键词**：WebSocket 协议、WebSocket 与 http 区别、全双工通信的协议

 WebSocket 通信原理

WebSocket 是一种在Web浏览器和服务器之间进行全双工通信的协议，它通过一个长久的、双向的通信通道来实现实时数据传输。

下面是WebSocket协议的底层原理：

1. 握手（Handshake）：WebSocket连接的建立需要通过HTTP握手来升级到WebSocket协议。客户端首先发送一个HTTP请求，其中包含一些特定的头部信息，表明客户端希望升级到WebSocket协议。服务器收到请求后，如果支持WebSocket协议，就会返回一个带有特定头部的HTTP响应，表示握手成功。握手完成后，连接从HTTP协议切换到了WebSocket协议。

2. 数据帧（Data Frames）：一旦握手成功，WebSocket连接就处于打开状态，可以进行数据传输。数据以数据帧的形式在客户端和服务器之间进行传输。数据帧是WebSocket协议中的基本单位，它包含了有效负载（payload）和一些控制信息。有效负载可以是文本数据或二进制数据。

3. 帧格式（Frame Format）：WebSocket数据帧的格式相对简单。它以字节流的形式进行传输，通常由以下几个部分组成：

FIN（1 bit）：表示消息是否已完成，如果消息只占用一个帧，该位为1，否则为0。
RSV1、RSV2、RSV3（各占1 bit）：用于扩展使用，目前很少使用。
Opcode（4 bits）：表示消息类型，例如文本数据、二进制数据、连接关闭等。
Mask（1 bit）：指示是否对有效负载进行掩码处理。
Payload Length（7 bits或16 bits或64 bits）：表示有效负载的长度。
Masking Key（0或32 bits）：如果Mask位为1，表示用于对有效负载进行掩码处理的密钥。
Payload Data：实际的有效负载数据。

4. 数据传输：数据通过TCP连接进行传输。WebSocket建立在TCP协议之上，利用TCP的可靠性和双向通信能力来传输数据。客户端和服务器可以随时发送数据帧，数据帧可以被分割成多个TCP包进行传输，接收方会将这些包重新组装成完整的数据帧。

5. 心跳机制：为了保持连接的活跃状态，WebSocket使用心跳机制来定期发送心跳消息。这些心跳消息可以是空的数据帧或特定的控制帧，服务器可以通过检测心跳消息来确定连接是否仍然有效。

通过以上步骤，WebSocket协议能够在浏览器和服务器之间建立一个持久的、全双工的通信通道，实现实时的双向数据传输。相比传统的HTTP请求，WebSocket减少了通信的延迟，并且能够更高效地进行实时数据交换。

 WebSocket 协议 和 http 协议有什么区别

WebSocket协议和HTTP协议有以下几个主要区别：

1. 连接方式：HTTP协议是基于请求-响应模式的，每次请求都需要建立一个新的连接，并在响应完成后立即关闭连接。而WebSocket协议通过一次握手连接后，保持长久的双向连接，允许服务器主动向客户端推送数据，实现实时的双向通信。

2. 数据格式：HTTP协议传输的数据一般采用文本或二进制的形式，但每次请求和响应都需要包含HTTP头部信息，使得数据传输的开销较大。WebSocket协议支持以原始的二进制格式进行数据传输，减少了数据传输的开销，并且提供了更低的延迟。

3. 通信效率：由于HTTP协议每次请求都需要建立和关闭连接，对于频繁的数据交换场景效率较低。而WebSocket协议通过保持长连接，避免了多次建立连接的开销，从而提高了通信的效率。

4. 服务器推送：HTTP协议是一种单向的协议，客户端需要不断地向服务器发送请求以获取数据。而WebSocket协议支持服务器主动向客户端推送数据，服务器可以随时向客户端发送消息，实现实时的双向通信。

综上所述，WebSocket协议相比HTTP协议在实时通信和双向通信方面更加高效和灵活，适用于需要实时数据传输和双向交互的应用场景，如在线聊天、实时游戏、股票行情等。而HTTP协议则适用于传统的请求-响应模式的数据交换，如网页浏览、文件下载等。

## 361 函数柯里化了解多少【热度: 529】

* created_at: 2023-05-22T13:08:59Z
* updated_at: 2023-05-22T13:09:00Z
* labels: JavaScript, 京东
* milestone: 中

**关键词**：函数柯里化、柯里化应用场景、柯里化优势

 函数柯里化是什么？

函数柯里化（Currying）是一种在函数式编程中使用的技术，其主要目的是将一个接受多个参数的函数转换成一系列使用一个参数的函数。
这样做的好处是允许你创建一些部分应用的函数，预先固定一些参数，使得代码更简洁，便于复用和组合。

以下是一个简单的柯里化函数的例子：

```javascript
function curry (fn) {
  return function curried (...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      return function (...args2) {
        return curried.apply(this, args.concat(args2))
      }
    }
  }
}

// 使用 curry 函数的例子
function sum (a, b, c) {
  return a + b + c
}

const curriedSum = curry(sum)

console.log(curriedSum(1)(2)(3)) // 6
console.log(curriedSum(1, 2)(3)) // 6
console.log(curriedSum(1)(2, 3)) // 6
console.log(curriedSum(1, 2, 3)) // 6
```

在这个例子中，我们创建了一个 `curry` 函数，该函数接受一个普通的多参数函数（如 `sum`）作为输入，并返回一个新的柯里化函数。 这个柯里化函数可以用多种方式调用，其参数可以一次性传递，也可以分批传递。

 柯里化有哪些应用场景和优势

函数柯里化在函数式编程中有很多应用场景和优势。以下是一些常见的应用场景和优势：

1. 参数复用：柯里化可以使我们预先固定一些参数，形成一个部分应用的函数，这样可以将相同参数的重复使用降到最低。这有利于减少参数传递的冗余，使代码更简洁。

例：

```javascript
function multiply (a, b) {
  return ab
}

const double = curry(multiply)(2)
const triple = curry(multiply)(3)

console.log(double(5)) // 10
console.log(triple(5)) // 15
```

2. 延迟计算：柯里化允许我们将函数调用分批进行，而不是一次性传递所有参数。这样，我们可以在需要的时候进行最后的计算，提高性能。

例：

```javascript
const data = [1, 2, 3, 4, 5]
const curriedFilter = curry((predicate, arr) => arr.filter(predicate))

const greaterThanThree = (num) => num > 3
const filterGreaterThanThree = curriedFilter(greaterThanThree)

// 延迟计算：先创建过滤函数，最后传入数据时才执行
const result = filterGreaterThanThree(data)
console.log(result) // [4, 5]
```

3. 代码组合和复用：柯里化有助于创建可以被复用或组合成更复杂形式的函数。这使我们能够构建更加模块化和可扩展的代码库。

例：

```javascript
const curriedMap = curry((fn, arr) => arr.map(fn))

const doubleAll = curriedMap(double)
const tripleAll = curriedMap(triple)

console.log(doubleAll([1, 2, 3])) // [2, 4, 6]
console.log(tripleAll([1, 2, 3])) // [3, 6, 9]
```

4. 更易读的代码：柯里化技术可以让我们的代码更加模块化和函数式，进而提高代码的可读性。柯里化函数更加聚焦于单一职责，这样可以让代码逻辑更清晰。

函数柯里化有助于提高代码的可读性、可维护性和模块化程度，同时减少参数传递的冗余，使代码更简洁。在函数式编程场景中，柯里化是一种非常实用的技术。

## 362 手写 JSON.stringify 和 手写 JSON.parse 实现【热度: 134】

* created_at: 2023-05-22T13:17:27Z
* updated_at: 2023-05-22T13:17:28Z
* labels: JavaScript, 网易
* milestone: 中

**关键词**：手写 JSON.stringify、手写 JSON.parse

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

## 363 模版引擎实现原理【热度: 1,241】

* created_at: 2023-05-22T14:15:21Z
* updated_at: 2023-05-22T14:15:22Z
* labels: JavaScript, 阿里巴巴
* milestone: 高

**关键词**：模版引擎

 前端模板引擎实现原理

前端模板引擎是一种用于处理 HTML 字符串的工具，它允许开发人员在 HTML 中嵌入特殊语法，然后使用模板引擎把数据与这些语法结合，生成最终的 HTML 字符串。这种方式有助于实现数据与表示的分离，使得代码更易于维护。

前端模板引擎的实现原理通常包括以下几个步骤：

1. **编译模板**：将模板字符串解析成模板语法（如变量、循环、条件等）和普通文本。这个过程通常涉及到词法分析和语法分析两个阶段。词法分析将模板字符串切分成多个标记（Token），再通过语法分析将这些标记组织成抽象语法树（AST）。

2. **生成代码**：将抽象语法树转换成 JavaScript 代码。这个过程通常包括将语法节点（AST Nodes）转换成相应的 JavaScript 语句，以渲染数据的形式。

3. **执行代码**：对生成的 JavaScript 代码进行求值，通过传入模板数据，渲染最终的 HTML 字符串。

下面是一个简单的模板引擎实现示例：

```javascript
function simpleTemplateEngine (template, data) {
  const variableRegex = /{{\s*([\w]+)\s*}}/g // 匹配变量插值

  let match
  let lastIndex = 0
  let result = ''

  while ((match = variableRegex.exec(template)) !== null) {
    result += template.slice(lastIndex, match.index) // 添加文本
    result += data[match[1]] // 添加变量值
    lastIndex = match.index + match[0].length
  }

  result += template.slice(lastIndex) // 添加尾部文本
  return result
}

// 使用示例
const template = 'Hello, {{name}}! Today is {{day}}.'
const data = {
  name: 'John',
  day: 'Monday'
}

console.log(simpleTemplateEngine(template, data)) // 输出：Hello, John! Today is Monday.
```

这个简化的示例仅支持变量插值，完整的模板引擎需要考虑循环、条件、自定义函数等更复杂的语法和性能优化。在实际项目中，可以选择成熟的模板引擎库，例如 Handlebars、Mustache 或者 Lodash 的 `template` 函数。

 如何在模板引擎中实现条件判断

要在模板引擎中实现条件判断，你需要扩展模板引擎的语法支持和解析能力。以 Handlebars 为例，其中的 `if` 和 `else` 助手语法可以实现条件判断。首先，我们需要修改匹配变量的正则表达式以识别条件判断语句。接着，在解析过程中，根据条件判断结果添加相应的内容。

以下代码实现了一个简化的模板引擎，支持条件判断：

```javascript
function parseTemplate (template, data) {
  const tokenRegex = /{{\s*(\/?[\w\s]+\/?)\s*}}/g // 匹配模板语法 token
  const keywords = /^(if|\/if|else)$/
  let result = ''
  const stack = []

  let lastIndex = 0
  let match

  while ((match = tokenRegex.exec(template)) !== null) {
    const staticContent = template.substring(lastIndex, match.index)
    result += staticContent
    lastIndex = match.index + match[0].length

    const token = match[1].trim()
    const keywordMatch = token.match(keywords)

    if (!keywordMatch) { // 处理变量插值
      result += data[token]
      continue
    }

    switch (keywordMatch[0]) {
      case 'if':
        stack.push('if')
        const ifCondition = data[token.split(' ')[1]]
        if (ifCondition) {
          tokenRegex.lastIndex += processSubTemplate(stack, tokenRegex, template, data)
        }
        break
      case 'else':
        stack.push('else')
        tokenRegex.lastIndex += processSubTemplate(stack, tokenRegex, template, data)
        break
      case '/if':
        stack.pop()
        break
    }
  }

  result += template.substring(lastIndex)
  return result
}

function processSubTemplate (stack, tokenRegex, template, data) {
  let subTemplate = ''
  let cursor = tokenRegex.lastIndex

  while (stack.length && cursor < template.length) {
    cursor++
    const char = template[cursor]
    subTemplate += char

    if (char === '}' && template[cursor - 1] === '}') {
      const lastTwo = template.substring(cursor - 2, cursor)
      if (lastTwo === '{{') {
        const match = subTemplate.match(/{{\s*(\/?[\w\s]+\/?)\s*}}/)
        if (match) {
          const token = match[1].trim()
          const keywordMatch = token.match(/^(if|\/if|else)$/)
          if (keywordMatch) {
            if (keywordMatch[0] === stack[stack.length - 1]) {
              stack.pop()
            } else {
              stack.push(keywordMatch[0])
            }
          }
        }
      }
    }
  }

  if (stack[stack.length - 1] === 'else') {
    stack.pop()
  }

  return subTemplate.length
}

// 使用示例
const template = `
 {{name}},
 {{if isMember}}
 Welcome back, {{name}}!
 {{else}}
 Please join us!
 {{/if}}
`

const data = {
  name: 'John',
  isMember: true
}

console.log(parseTemplate(template, data).trim())
```

这个简化示例说明了如何在模板中实现条件判断。不过请注意，这个实现并没有经过优化，性能可能不佳。在实际项目中，推荐使用成熟的模板引擎库，如 Handlebars、Mustache 等。

## 364 如何优化大规模 dom 操作的场景【热度: 1,012】

* created_at: 2023-05-22T14:26:02Z
* updated_at: 2023-05-22T14:26:03Z
* labels: 浏览器, 阿里巴巴
* milestone: 高

**关键词**：dom 操作性能、dom 操作优化

在处理大规模DOM操作的场景中，可以采取以下一些优化策略：

1. 使用批量操作：避免频繁地进行单个DOM操作，而是将多个操作合并为一个批量操作。例如，使用`DocumentFragment`来创建一个离线的DOM片段，将多个元素一次性添加到片段中，然后再将整个片段插入到文档中。这样可以减少DOM操作的次数，提高性能。

2. 避免重复访问和查询：避免在循环或递归操作中重复访问和查询DOM元素。在执行循环或递归操作前，先将需要操作的DOM元素保存在变量中，以减少重复查询的开销。

3. 使用虚拟DOM（Virtual DOM）：虚拟DOM是一种将真实DOM结构映射到JavaScript对象的技术。通过在JavaScript中对虚拟DOM进行操作，然后再将变更应用到真实DOM上，可以减少对真实DOM的直接操作次数，提高性能。常见的虚拟DOM库有React和Vue等。

4. 分割任务：将大规模DOM操作拆分成多个小任务，并使用`requestAnimationFrame`或`setTimeout`等方法在每个任务之间进行异步处理，以避免长时间阻塞主线程，提高页面的响应性能。

5. 使用事件委托：利用事件冒泡机制，将事件处理程序绑定到DOM结构的父元素上，通过事件委托的方式处理子元素的事件。这样可以减少事件处理程序的数量，提高性能。

6. 避免频繁的重绘和重排：DOM的重绘（Repaint）和重排（Reflow）是比较昂贵的操作，会导致页面重新布局和重新渲染。尽量避免频繁地修改样式属性，可以使用CSS类进行批量的样式变更，或使用`display: none`将元素隐藏起来进行操作，最后再显示出来。

7. 使用合适的工具和库：选择合适的工具和库来处理大规模DOM操作的场景。例如，使用专门的数据绑定库或UI框架，如React、Vue或Angular等，它们提供了高效的组件化和数据更新机制，能够优化DOM操作的性能。

通过以上优化策略，可以减少对DOM的频繁操作，提高大规模DOM操作场景下的性能和响应性能。

## 366 浏览器有读写能力吗？

* created_at: 2023-05-22T14:39:49Z
* updated_at: 2024-05-12T08:09:54Z
* labels: 浏览器
* milestone: 中

在一般情况下，浏览器本身不具备直接的读写能力。浏览器是用于显示网页内容的客户端应用程序，其主要功能是发送HTTP请求，接收和渲染服务器返回的HTML、CSS和JavaScript等资源。然而，浏览器提供了一些特定的API，允许开发人员在浏览器中进行读写操作。

下面是一些允许浏览器进行读写操作的API：

1. Web Storage API：通过localStorage和sessionStorage提供了在浏览器中存储数据的能力。开发人员可以使用这些API将数据以键值对的形式存储在浏览器本地，读取和修改数据。

2. IndexedDB API：IndexedDB是浏览器提供的一种高性能的非关系型数据库API。开发人员可以使用IndexedDB API在浏览器中创建和管理数据库，进行复杂的数据存储、查询和索引操作。

3. File API：File API允许浏览器读取和处理本地文件。开发人员可以使用 File API选择本地文件并读取其内容，也可以通过Blob 将数据保存本地文件。

需要注意的是，浏览器的读写能力受到一些限制，如同源策略、跨域限制等。为了保障安全性和用户隐私，浏览器会限制对本地文件系统的直接读写访问。读写操作通常是通过浏览器提供的特定API进行，并且需要经过用户的授权和同意。

------------------------

**关于读写能力的讨论**：

读取是通过 FileReader: [资料](https://developer.mozilla.org/zh-CN/docs/Web/API/FileReader)

写是通过 blob 实现： [资料](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob)

但是这个写了之后， 要想保存在本地， 需要自己手动操作：

> 现代浏览器支持File API，它提供了通过JavaScript读取和操作本地文件的能力。
> 使用File API，您可以通过文件选择对话框选择本地文件，并使用JavaScript读取文件内容、将文件内容写入到本地等操作。但是需要注意的是，**出于安全性的考虑，浏览器限制了对本地文件系统的访问权限，只能在用户主动选择文件的情况下进行操作**。

**示范**：
使用File API来读写本地文档的步骤如下：

1. 通过input元素创建文件选择对话框。在HTML中添加一个input元素，设置type属性为file，例如：

```html
<input type="file" id="fileInput">
```

2. 使用JavaScript获取选择的文件。在JavaScript中，通过访问input元素的files属性来获取选择的文件对象，例如：

```javascript
const fileInput = document.getElementById('fileInput')
const selectedFile = fileInput.files[0]
```

3. 读取文件内容。使用FileReader对象来读取文件内容。创建一个新的FileReader对象，然后使用它的readAsText()方法来读取文件内容，例如：

```javascript
const reader = new FileReader()
reader.onload = function (event) {
  const fileContent = event.target.result
  // 在这里对文件内容进行操作
}
reader.readAsText(selectedFile)
```

4. 对文件内容进行操作。在上一步的回调函数中，可以获取到文件的内容，然后可以对该内容进行任何需要的操作，例如将其显示在页面上或者发送到服务器。

5. 写入文件。如果需要将内容写入本地文件，可以使用FileWriter对象来实现。创建一个新的FileWriter对象，然后使用它的write()方法来写入内容，例如：

```javascript
const fileOutput = new Blob([fileContent], { type: 'text/plain' })
const downloadLink = document.createElement('a')
downloadLink.href = URL.createObjectURL(fileOutput)
downloadLink.download = 'output.txt'
downloadLink.click()
```

------

> 2024.05.12 作者更新

可以读写本地文件： 使用 file system api

文档请看： [资料](https://developer.mozilla.org/zh-CN/docs/Web/API/File_System_API)

## 367 react native 工作原理是什么？

* created_at: 2023-05-22T14:46:30Z
* updated_at: 2023-05-22T14:46:31Z
* labels: web应用场景
* milestone: 高

React Native是一种基于JavaScript的开发框架，用于构建移动应用程序。它允许开发人员使用React的组件化开发模式来构建原生移动应用，同时跨平台共享代码。

工作原理如下：

1. JavaScript线程：React Native的应用程序逻辑是通过JavaScript代码来编写的。React Native应用在运行时会创建一个专用的JavaScript线程，负责处理JavaScript代码的解析和执行。

2. 原生桥（Native Bridge）：React Native应用通过原生桥（Native Bridge）连接JavaScript线程和原生平台，使得JavaScript代码能够与原生代码进行通信和交互。原生桥是一个双向通信通道，它将JavaScript的调用转发给原生平台，并将原生平台的事件和回调传递回JavaScript。

3. Virtual DOM：React Native使用Virtual DOM（虚拟DOM）机制来描述和管理UI的状态和变化。在React Native中，组件的UI层由React组件树构建而成，每个组件都有一个相应的虚拟DOM表示。

4. 原生渲染：React Native将虚拟DOM的变化映射到相应的原生UI组件上。通过与原生平台的交互，React Native会根据虚拟DOM的变化更新相应的原生UI组件，实现界面的渲染和更新。

5. 原生组件：React Native提供了一系列的原生组件，这些组件直接映射到原生平台上的真实UI控件，例如文本、图像、按钮等。开发人员可以使用这些原生组件来构建用户界面。

6. 原生模块：React Native还提供了原生模块的概念，允许开发人员编写原生平台相关的功能和逻辑。通过原生模块，开发人员可以访问设备功能、原生API和第三方库等。

总体来说，React Native通过JavaScript线程和原生桥实现了JavaScript代码和原生平台之间的通信。它利用虚拟DOM机制来管理UI的状态和变化，并通过与原生平台的交互实现UI的渲染和更新。开发人员可以使用React Native提供的原生组件和原生模块来构建跨平台的移动应用程序。

## 368 什么是领域模型【热度: 1,092】

* created_at: 2023-05-23T14:14:16Z
* updated_at: 2023-05-23T14:14:17Z
* labels: web应用场景
* milestone: 高

**关键词**：前端领域模型

 什么是领域模型

领域模型是软件开发中用于描述领域（业务）概念和规则的一种建模技术。它通过定义实体、值对象、关联关系、行为等元素，抽象出领域的核心概念和业务规则，帮助开发人员理解和设计软件系统。

以下是领域模型中常见的一些元素：

1. 实体（Entity）：实体是领域模型中具有唯一标识的对象，通常代表领域中的具体事物或业务对象。实体具有属性和行为，并且可以通过其标识进行唯一标识和识别。

2. 值对象（Value Object）：值对象是没有唯一标识的对象，通常用于表示没有明确生命周期的属性集合。值对象的相等性通常基于其属性值，而不是标识。例如，日期、时间、货币等都可以作为值对象。

3. 关联关系（Association）：关联关系描述了不同实体之间的关系和连接。关联关系可以是一对一、一对多、多对多等不同类型。关联关系可以带有方向和导航属性，用于表示实体之间的关联和导航。

4. 聚合（Aggregation）：聚合是一种特殊的关联关系，表示包含关系，即一个实体包含其他实体。聚合关系是一种强关联，被包含实体的生命周期受到包含实体的控制。

5. 领域事件（Domain Event）：领域事件表示领域中发生的具体事件或状态变化。它可以作为触发业务逻辑的信号，通常用于解耦和处理领域中的复杂业务流程。

6. 聚合根（Aggregate Root）：聚合根是聚合中的根实体，它代表整个聚合的一致性边界。通过聚合根，可以对整个聚合进行操作和维护。

7. 领域服务（Domain Service）：领域服务是一种封装了领域逻辑的服务，用于处理领域中的复杂业务操作或跨实体的操作。它通常与具体实体无关，提供一些无状态的操作。

通过建立领域模型，开发人员可以更好地理解和表达领域的业务需求和规则，从而指导软件系统的设计和实现。领域模型可以作为开发团队之间沟通的工具，也可以用于生成代码、进行自动化测试等。

 前端系统应该如何划分领域模型

在前端系统中划分领域模型的方式可以根据具体业务需求和系统复杂性进行灵活调整。以下是一些常见的划分领域模型的方式：

1. 模块划分：将前端系统按照模块进行划分，每个模块对应一个领域模型。模块可以根据功能、业务领域或者页面进行划分。每个模块可以有自己的实体、值对象、关联关系和业务逻辑。

2. 页面划分：将前端系统按照页面进行划分，每个页面对应一个领域模型。每个页面可以有自己的实体、值对象和关联关系，以及与页面相关的业务逻辑。

3. 组件划分：将前端系统按照组件进行划分，每个组件对应一个领域模型。每个组件可以有自己的实体、值对象和关联关系，以及与组件相关的业务逻辑。组件可以是页面级别的，也可以是更细粒度的功能组件。

4. 功能划分：将前端系统按照功能进行划分，每个功能对应一个领域模型。功能可以是用户操作的具体功能模块，例如登录、注册、购物车等。每个功能可以有自己的实体、值对象和关联关系，以及与功能相关的业务逻辑。

在划分领域模型时，需要根据具体业务的复杂性和团队的组织方式进行调整。重要的是识别系统中的核心业务概念和规则，并将其抽象成适当的实体和值对象。同时，要保持领域模型的聚合性和一致性，避免出现过于庞大和紧耦合的领域模型。划分的领域模型应该易于理解、扩展和维护，以支持前端系统的开发和演进。

## 369 一直在 window 上面挂东西是否有什么风险

* created_at: 2023-05-23T14:19:01Z
* updated_at: 2023-05-23T14:19:02Z
* labels: web应用场景, 腾讯
* milestone: 中

在前端开发中，将内容或应用程序运行在浏览器的全局`window`对象上可能会带来一些潜在的风险。以下是一些需要注意的风险：

1. 命名冲突：`window`对象是浏览器的全局对象，它包含许多内置属性和方法。如果您在全局命名空间中定义的变量或函数与现有的全局对象属性或方法发生冲突，可能会导致意外行为或错误。

2. 安全漏洞：在全局`window`对象上挂载的代码可以访问和修改全局的数据和功能。这可能导致安全漏洞，特别是当这些操作被恶意利用时。攻击者可能通过篡改全局对象来窃取用户敏感信息或执行恶意代码。

3. 代码维护性：过多地依赖全局`window`对象可能导致代码的维护困难。全局状态的过度共享可能导致代码变得难以理解和调试，尤其在大型应用程序中。

为了减轻这些风险，建议采用以下最佳实践：

1. 使用模块化开发：将代码模块化，避免对全局`window`对象的直接依赖。使用模块加载器（如ES Modules、CommonJS、AMD）来管理模块之间的依赖关系，以减少全局命名冲突和代码冗余。

2. 使用严格模式：在JavaScript代码中使用严格模式（`"use strict"`），以启用更严格的语法检查和错误处理。严格模式可以帮助捕获潜在的错误和不安全的行为。

3. 显式访问全局对象：如果确实需要访问全局`window`对象的属性或方法，请使用显式访问方式，如`window.localStorage`、`window.setTimeout()`等。避免直接引用全局属性，以减少冲突和误用的风险。

4. 谨慎处理第三方代码：在使用第三方库或框架时，注意审查其对全局`window`对象的使用方式。确保库或框架的操作不会产生潜在的安全风险或全局命名冲突。

## 370 [React] createContext 和 useContext 有什么区别， 是做什么用的【热度: 367】

* created_at: 2023-05-23T14:34:11Z
* updated_at: 2023-05-24T07:10:51Z
* labels: web框架, 百度
* milestone: 中

**关键词**：createContext useContext、useContext 使用、createContext 使用

 `createContext` 和 `useContext`

`createContext`和`useContext`是React中用于处理上下文（Context）的两个钩子函数，它们用于在组件之间共享数据。

`createContext`用于创建一个上下文对象，该对象包含`Provider`和`Consumer`两个组件。`createContext`接受一个初始值作为参数，该初始值将在没有匹配的`Provider`时被使用。

`useContext`用于在函数组件中访问上下文的值。它接受一个上下文对象作为参数，并返回当前上下文的值。

具体区别和用途如下：

1. `createContext`：`createContext`用于创建一个上下文对象，并指定初始值。它返回一个包含`Provider`和`Consumer`组件的对象。`Provider`组件用于在组件树中向下传递上下文的值，而`Consumer`组件用于在组件树中向上获取上下文的值。

```jsx
const MyContext = createContext(initialValue);
```

2. `useContext`：`useContext`用于在函数组件中访问上下文的值。它接受一个上下文对象作为参数，并返回当前上下文的值。使用`useContext`可以避免使用`Consumer`组件进行嵌套。

```jsx
const value = useContext(MyContext);
```

使用上下文的主要目的是在组件树中共享数据，避免通过逐层传递`props`的方式传递数据。上下文可以在跨组件层级的情况下方便地共享数据，使组件之间的通信更加简洁和灵活。

使用步骤如下：

1. 使用`createContext`创建一个上下文对象，并提供初始值。
2. 在组件树中的某个位置使用`Provider`组件，将要共享的数据通过`value`属性传递给子组件。
3. 在需要访问上下文数据的组件中使用`useContext`钩子，获取上下文的值。

需要注意的是，上下文中的数据变化会触发使用该上下文的组件重新渲染，因此应谨慎使用上下文，避免无谓的性能损耗。

 代码示范

当使用`createContext`和`useContext`时，以下是一个简单的代码示例：

```jsx
import React, { createContext, useContext } from 'react';

// 创建上下文对象
const MyContext = createContext();

// 父组件
function ParentComponent() {
 const value = 'Hello, World!';

 return (
 // 提供上下文的值
 <MyContext.Provider value={value}>
 <ChildComponent />
 </MyContext.Provider>
 );
}

// 子组件
function ChildComponent() {
 // 使用 useContext 获取上下文的值
 const value = useContext(MyContext);

 return <div>{value}</div>;
}

// 使用上述组件
function App() {
 return <ParentComponent />;
}
```

在上述示例中，我们首先使用`createContext`创建一个上下文对象`MyContext`。然后，在`ParentComponent`组件中，我们通过`MyContext.Provider`组件提供了上下文的值，值为`'Hello, World!'`。在`ChildComponent`组件中，我们使用`useContext`钩子获取了上下文的值，并将其显示在页面上。

最终，我们在`App`组件中使用`ParentComponent`组件作为根组件。当渲染应用程序时，`ChildComponent`将获取到上下文的值并显示在页面上。

通过这种方式，`ParentComponent`提供了上下文的值，`ChildComponent`通过`useContext`钩子获取并使用该值，实现了组件之间的数据共享。

## 371 Object.prototype.hasOwnProperty() 作用是啥【热度: 1,176】

* created_at: 2023-05-23T14:49:31Z
* updated_at: 2023-05-23T14:49:32Z
* labels: JavaScript, 小米
* milestone: 中

**关键词**：Object.prototype.hasOwnProperty

 `Object.prototype.hasOwnProperty()`

`Object.prototype.hasOwnProperty()`是JavaScript中`Object`原型对象上的方法。它用于检查一个对象是否具有指定的属性（即对象自身拥有的属性），并返回一个布尔值表示结果。

`hasOwnProperty()`方法的作用是检查对象是否包含特定的属性，而不会考虑该属性是否继承自原型链。它接受一个字符串参数，表示要检查的属性名。如果对象自身拥有该属性，则返回`true`；如果对象没有该属性或该属性是从原型链继承的，则返回`false`。

以下是`hasOwnProperty()`方法的使用示例：

```javascript
const obj = {
  prop1: 'value1',
  prop2: 'value2'
}

console.log(obj.hasOwnProperty('prop1')) // true
console.log(obj.hasOwnProperty('prop3')) // false
```

在上述示例中，`obj`对象拥有`prop1`属性，因此`obj.hasOwnProperty('prop1')`返回`true`。然而，`obj`对象没有`prop3`属性，因此`obj.hasOwnProperty('prop3')`返回`false`。

使用`hasOwnProperty()`方法可以帮助我们确定属性是对象自身的属性还是继承自原型链。这在进行属性遍历或属性存在性检查时非常有用。请注意，`hasOwnProperty()`方法只能检查对象自身的属性，不能检查原型链上的属性。如果需要检查原型链上的属性，可以使用`in`运算符或`Object.prototype.hasOwnProperty.call()`方法。

 `hasOwnProperty`和`instanceof` 区别

`hasOwnProperty`和`instanceof`是两个不同的操作符，用于在JavaScript中进行不同类型的检查。

1. `hasOwnProperty`：`hasOwnProperty`是`Object`原型对象上的方法，用于检查一个对象是否具有指定的属性（即对象自身拥有的属性），并返回一个布尔值表示结果。它是针对对象属性的检查。

2. `instanceof`：`instanceof`是JavaScript的一个操作符，用于检查一个对象是否是某个构造函数的实例。它用于检查对象的类型。

以下是两者之间的区别：

* `hasOwnProperty`是用于检查对象是否具有特定的属性，它关注的是对象自身的属性，不涉及对象的类型。它只检查对象自身的属性，不会检查原型链上的属性。

* `instanceof`是用于检查对象是否是某个构造函数的实例，它关注的是对象的类型。它会检查对象的原型链上是否存在指定构造函数的原型对象。

使用示例：

```javascript
const obj = {
  prop: 'value'
}

console.log(obj.hasOwnProperty('prop')) // true

console.log(obj instanceof Object) // true
console.log(obj instanceof Array) // false
```

在上述示例中，`obj`对象拥有`prop`属性，因此`obj.hasOwnProperty('prop')`返回`true`。同时，`obj`对象是`Object`构造函数的实例，因此`obj instanceof Object`返回`true`，但不是`Array`构造函数的实例，因此`obj instanceof Array`返回`false`。

总结而言，`hasOwnProperty`用于检查对象是否拥有特定的属性，而`instanceof`用于检查对象的类型。

## 373 Babel Polyfill 了解多少【热度: 200】

* created_at: 2023-05-23T15:27:13Z
* updated_at: 2023-05-23T15:27:14Z
* labels: 工程化, 美团
* milestone: 高

**关键词**：Babel Polyfill 原理、Babel Polyfill 作用、Babel Polyfill 使用、Babel Polyfill 按需加载

 Babel Polyfill 作用是啥

Babel Polyfill 的作用是在旧版本浏览器中提供对新的JavaScript特性和API的支持。当使用Babel进行代码转换时，它只会转换语法，而不会转换新的API和全局对象（如Promise、Map、Set等）。

旧版本的浏览器可能不支持这些新的API和全局对象，因此在运行使用这些特性的代码时会抛出错误。为了解决这个问题，可以使用Babel Polyfill来填充缺失的功能，以确保代码在旧版本浏览器中正常运行。

Babel Polyfill通过修改全局对象和原型链，添加缺失的方法和属性，使得代码能够在不支持这些功能的浏览器中运行。它会检测当前环境的特性支持情况，并根据需要自动加载所需的Polyfill代码。

使用Babel Polyfill可以让开发人员在编写代码时不必过多考虑浏览器的兼容性，而专注于使用最新的JavaScript特性和API。它提供了一种简单方便的方式来填充浏览器的功能差异，确保代码在各种浏览器环境中具有一致的行为。

 如何使用

要使用 Babel Polyfill，需要按照以下步骤进行设置：

1. 安装依赖：首先，确保你的项目已经安装了 Babel 相关的依赖包。这包括 `@babel/core`、`@babel/preset-env` 和 `@babel/polyfill`。你可以使用 npm 或者 yarn 进行安装：

```shell
npm install --save-dev @babel/core @babel/preset-env @babel/polyfill
```

2. 配置 Babel：在项目根目录下创建一个 `.babelrc` 文件，并添加以下配置：

```json
{
 "presets": ["@babel/preset-env"]
}
```

这样的配置将告诉 Babel 使用 `@babel/preset-env` 预设来进行转换。

3. 导入 Polyfill：在你的入口文件（通常是项目的主 JavaScript 文件）中导入 Babel Polyfill。你可以使用 import 语句或者 require 来导入 Polyfill：

使用 import（适用于 ES6 模块）：

```javascript
import '@babel/polyfill'
```

使用 require（适用于 CommonJS 模块）：

```javascript
require('@babel/polyfill')
```

导入 Polyfill 的位置很重要，通常应该在你的应用程序代码之前导入，以确保 Polyfill 在应用程序代码之前被加载和执行。

4. 配置目标浏览器：为了让 Babel Polyfill 根据目标浏览器进行特性填充，你可以在 `.babelrc` 文件中的 `@babel/preset-env` 配置中指定目标浏览器的选项。例如，你可以在配置中添加 `targets` 属性：

```json
{
 "presets": [
 [
 "@babel/preset-env",
 {
 "targets": {
 "browsers": ["last 2 versions", "ie >= 11"]
 }
 }
 ]
 ]
}
```

这样，Polyfill 将根据所选的目标浏览器填充相应的功能。

完成以上步骤后，Babel Polyfill 将根据配置在目标浏览器中填充所需的功能，以确保你的代码在旧版本浏览器中正常运行。请注意，Polyfill 会增加你的应用程序的大小，因此请考虑仅填充所需的功能，以减小文件大小并优化性能。

 按需加载 Polyfill

Babel Polyfill 默认会填充所有缺失的功能，但如果你只需要按需加载特定功能，可以使用 core-js 库的按需加载特性。下面是按需加载 Babel Polyfill 的步骤：

1. 安装依赖：确保你的项目已经安装了必要的依赖。除了之前提到的 Babel 相关依赖外，你还需要安装 `core-js`。

```shell
npm install --save-dev @babel/core @babel/preset-env core-js
```

2. 配置 Babel：在 `.babelrc` 文件中，添加以下配置：

```json
{
 "presets": [
 [
 "@babel/preset-env",
 {
 "useBuiltIns": "usage",
 "corejs": 3
 }
 ]
 ]
}
```

`useBuiltIns` 选项设置为 `"usage"` 表示按需加载特性，而 `"corejs": 3` 指定了使用的 `core-js` 版本。

3. 导入 Polyfill：在需要使用特定功能的文件中，按需导入所需的 Polyfill。例如，如果你需要填充 `Promise` 和 `Array.prototype.includes`，你可以按如下方式导入：

```javascript
import 'core-js/features/promise'
import 'core-js/features/array/includes'
```

这样只会加载和填充所需的功能，而不会加载整个 Polyfill 库。你可以根据具体的功能需求进行按需导入。

请注意，使用按需加载的方式可以减小应用程序的文件大小，并且只填充需要的功能，但需要确保在使用相关功能之前已经导入了相应的 Polyfill。

## 374 Antd（Ant Design）的 Tooltip 组件是如何实现的？

* created_at: 2023-05-23T15:31:49Z
* updated_at: 2023-05-23T15:31:50Z
* labels: web框架, 阿里巴巴
* milestone: 高

Antd（Ant Design）的 Tooltip 组件是通过 CSS 和 JavaScript 结合实现的。

在 CSS 方面，Tooltip 组件使用了绝对定位和一些样式规则来定义 Tooltip 的外观。它通常包括一个触发元素和一个浮动在触发元素旁边的提示框。通过设置样式属性，如 position: absolute、top、left、display 等，可以控制提示框的位置、显示和隐藏等。

在 JavaScript 方面，Tooltip 组件通过事件监听和操作 DOM 元素来实现交互行为。当鼠标悬停在触发元素上时，会触发相应的事件处理函数。在事件处理函数中，通常会修改提示框元素的样式或类名，以实现显示或隐藏提示框的效果。同时，还可以根据鼠标位置调整提示框的位置，使其相对于触发元素居中或显示在特定的位置。

另外，Tooltip 组件还支持一些额外的配置选项，如延迟显示、自定义内容等。这些选项可以通过传递属性或配置项给 Tooltip 组件来进行设置。

**Tooltip 组件的动态偏移样式计算**

1. 监听触发元素的事件：Tooltip 组件通常在触发元素上监听鼠标悬停或点击等事件。

2. 获取触发元素的位置信息：在事件处理函数中，通过 DOM 操作获取触发元素的位置信息，包括宽度、高度、左偏移和上偏移等。

3. 计算偏移样式：根据触发元素的位置信息，结合组件配置项或属性中的偏移参数，计算出提示框相对于触发元素的偏移样式。

4. 设置提示框的样式：通过修改提示框元素的样式属性，如 top、left、transform 等，将计算得到的偏移样式应用于提示框，使其出现在预期的位置。

具体实现上述步骤的方式可以有多种，取决于具体的实现框架或库。一种常见的方式是使用 JavaScript 来监听事件、获取位置信息和设置样式，配合 CSS 来定义样式规则。

在实际开发中，可以使用一些常见的技术手段来计算动态偏移样式，例如：

* 使用 CSS 的 position: absolute 将提示框定位在触发元素的相对位置上。
* 使用 JavaScript 的 getBoundingClientRect() 方法获取触发元素的位置信息，包括宽度、高度、左偏移和上偏移等。
* 结合触发元素的位置信息和组件配置项中的偏移参数，通过计算得到最终的偏移值。
* 将计算得到的偏移值应用于提示框的样式属性，如 top、left、transform 等，使其相对于触发元素进行动态偏移。

需要注意的是，具体的实现方式可能因框架、库或组件的不同而有所差异，但核心思想是通过监听事件、获取位置信息和计算样式来实现动态偏移效果。

## 375 深度 SEO 优化的方式有哪些， 从技术层面来说

* created_at: 2023-05-23T15:38:21Z
* updated_at: 2023-05-23T15:38:22Z
* labels: web应用场景, 百度
* milestone: 高

深度 SEO 优化涉及到一些技术层面的优化策略，以下是一些常见的方式：

1. 网站结构优化：优化网站的结构，确保每个页面都可以被搜索引擎爬取和索引。使用合适的 HTML 标签和语义化的内容结构，使搜索引擎能够更好地理解页面的内容。

2. 网站速度优化：提升网站的加载速度对 SEO 很重要。通过压缩和合并 CSS 和 JavaScript 文件、优化图像、使用浏览器缓存、使用 CDN（内容分发网络）等技术手段来减少页面加载时间。

3. 页面渲染优化：确保搜索引擎可以正常渲染和索引使用 JavaScript 技术构建的单页面应用（SPA）或动态生成的内容。使用服务端渲染（SSR）或预渲染技术，确保搜索引擎能够获取到完整的页面内容。

4. URL 优化：使用短、描述性的 URL，并使用关键词来优化 URL 结构。避免使用动态参数或过长的 URL。

5. 链接优化：内部链接和外部链接都对 SEO 有影响。在网站内部设置相关性强的链接，使页面之间相互连接。外部链接是获取更多外部网站链接指向自己网站的重要手段，可以通过内容创作和社交媒体推广来获得更多高质量的外部链接。

6. Schema 标记：使用结构化数据标记（Schema Markup）来标识网页内容，帮助搜索引擎更好地理解和展示网页信息。可以使用 JSON-LD、Microdata 或 RDFa 等标记格式。

7. XML 网站地图：创建和提交 XML 网站地图，提供网站的结构和页面信息，帮助搜索引擎更好地索引网站内容。

8. Robots.txt 文件：通过 Robots.txt 文件来指示搜索引擎哪些页面可以被爬取和索引，哪些页面不可访问。

9. HTTPS 加密：使用 HTTPS 协议来加密网站通信，确保数据安全和用户隐私，同时搜索引擎更倾向于收录和排名使用 HTTPS 的网站。

10. 移动友好性：优化网站在移动设备上的显示和用户体验，确保网站具备响应式设计或移动版网站，以及快速加载和友好的操作性。

这些是深度 SEO 优化的一些常见技术层面的策略，通过综合运用这些策略，可以提升网站的搜索引擎可见性和排名。需要根据具体情况和搜索引擎的最佳

## 376 SSR 了解多少【热度: 486】

* created_at: 2023-05-23T15:45:51Z
* updated_at: 2023-05-23T15:45:51Z
* labels: 工程化, 京东
* milestone: 高

**关键词**：SSR 原理、SSR 实现

 SSR 原理是啥

服务器端渲染（Server-Side Rendering，SSR）是一种前端渲染方式，其核心原理是在服务器端将动态生成的 HTML 页面发送给客户端，以便客户端在接收到页面时直接渲染显示，而不是在客户端使用 JavaScript 动态生成页面。

核心原理如下：

1. 客户端发起请求：当用户访问一个 SSR 应用的页面时，客户端会向服务器发起请求。

2. 服务器处理请求：服务器接收到请求后，根据请求的路径和参数，获取对应的数据。

3. 数据获取和页面渲染：在服务器端，通过调用后端数据接口或其他数据源获取页面所需的数据。获取到数据后，服务器使用模板引擎或渲染框架将数据填充到页面模板中，生成完整的 HTML 页面。

4. HTML 页面返回给客户端：服务器将生成的 HTML 页面作为响应返回给客户端。

5. 客户端渲染：客户端接收到服务器返回的 HTML 页面后，直接渲染显示页面内容。由于服务器已经将数据填充到了页面中，客户端无需再进行数据获取和页面渲染的过程，提升了页面的加载速度和用户体验。

SSR 的核心原理是在服务器端生成完整的 HTML 页面，并将其发送给客户端，使客户端能够更快地显示页面内容。相比于传统的客户端渲染（CSR），SSR 可以改善首次加载时的白屏时间和搜索引擎抓取等方面的问题。同时，SSR 也可以更好地支持 SEO（搜索引擎优化）和提供更好的性能体验给用户。

 实现方案

前端实现服务器端渲染（SSR）的方案有以下几种：

1. 基于 Node.js 的框架：使用 Node.js 的框架（如Express、Koa、Nest.js等）来构建服务器端应用程序，并在服务器端进行页面渲染。通过在服务器上运行 JavaScript 代码，将渲染好的页面直接返回给客户端。

2. 框架提供的 SSR 功能：一些前端框架（如Next.js、Nuxt.js、Angular Universal等）提供了内置的服务器端渲染功能，可以更方便地实现 SSR。这些框架会负责处理路由、数据预取和页面渲染等工作，并将渲染好的页面返回给客户端。

3. 预渲染：使用预渲染技术将静态页面提前生成，并部署到服务器上。在用户请求页面时，直接返回预渲染好的 HTML 页面，然后再由客户端接管页面的交互。这种方式适用于内容不经常变动或不需要动态数据的页面。

4. 后端代理：通过将前端应用程序的请求代理到服务器端，然后在服务器端进行页面渲染，并将渲染好的页面返回给客户端。这种方式适用于在现有的后端服务中添加 SSR 功能，而无需重写整个应用程序。

需要根据具体的项目需求、技术栈和框架选择合适的 SSR 实现方案。每种方案都有其优点和限制，综合考虑性能、开发体验、部署成本和维护复杂度等因素来做出决策。

## 377 如何编写一个 babel 插件【热度: 1,062】

* created_at: 2023-05-29T14:12:18Z
* updated_at: 2023-05-29T14:12:20Z
* labels: 工程化, 网易
* milestone: 高

**关键词**：babel插件、babel插件api、babel插件代码示例

 编写一个 babel 插件的基本步骤

编写一个 Babel 插件可以让你自定义转换、分析或操作 JavaScript 代码。下面是编写 Babel 插件的基本步骤：

1. 安装 Babel：首先，确保你已经安装了 Babel 的相关工具和依赖。可以使用 npm 或 yarn 安装 `@babel/core`、`@babel/preset-env` 和 `@babel/plugin-syntax-plugin-name`。

2. 创建插件文件：在项目中创建一个新的 JavaScript 文件，用于编写自定义插件的代码。命名约定是以 `babel-plugin-` 开头，例如 `babel-plugin-custom-plugin.js`。

3. 导出插件函数：在插件文件中，导出一个函数作为你的插件。这个函数将接收一个 Babel 的 `babel` 对象作为参数，包含了一些 Babel 的工具方法，如 `types` 和 `template`。

```javascript
module.exports = function (babel) {
  // 插件代码
}
```

4. 实现插件逻辑：在插件函数内部，实现你的插件逻辑。可以使用 `babel.types` 对象提供的方法来操作抽象语法树（AST）节点，例如 `babel.types.VariableDeclaration`、`babel.types.CallExpression` 等。

```javascript
module.exports = function (babel) {
  const { types: t } = babel

  return {
    visitor: {
      Identifier (path) {
        // 对每个 Identifier 节点进行处理
        const name = path.node.name
        path.node.name = name.toUpperCase()
      }
    }
  }
}
```

5. 导出插件配置：为了让 Babel 可以识别你的插件，需要在插件函数中返回一个配置对象，其中 `visitor` 属性指定了你的插件要处理的 AST 节点类型和对应的处理函数。

```javascript
module.exports = function (babel) {
  const { types: t } = babel

  return {
    visitor: {
      // ...
    }
  }
}
```

6. 配置 Babel：在项目的 `.babelrc` 或 `babel.config.js` 文件中，将你的插件添加到 Babel 的插件列表中。

```json
{
 "plugins": ["babel-plugin-custom-plugin"]
}
```

7. 使用插件：运行 Babel，它将根据你的配置和代码中的语法，应用插件并对代码进行转换。

以上是编写 Babel 插件的基本步骤，可以根据具体需求和场景，实现各种自定义的转换、分析和操作逻辑。

 babel 编写插件的时候有哪些核心方法

在编写 Babel 插件时，可以使用以下核心方法来操作抽象语法树（AST）节点：

1. `types` 对象： Babel 的 `types` 对象是你在插件中最常用的工具之一。它提供了一系列用于创建、访问和操作 AST 节点的方法。

`types.identifier(name)`: 创建一个标识符节点，表示一个变量或函数的名称。

`types.stringLiteral(value)`: 创建一个字符串字面量节点，表示一个字符串值。

`types.numericLiteral(value)`: 创建一个数值字面量节点，表示一个数字值。

`types.booleanLiteral(value)`: 创建一个布尔字面量节点，表示一个布尔值。

`types.objectExpression(properties)`: 创建一个对象表达式节点，表示一个对象字面量。

`types.arrayExpression(elements)`: 创建一个数组表达式节点，表示一个数组字面量。

`types.callExpression(callee, arguments)`: 创建一个函数调用表达式节点，表示一个函数的调用。

`types.memberExpression(object, property)`: 创建一个成员表达式节点，表示一个对象的成员访问。

 这些方法可以帮助你构建新的 AST 节点或访问现有的 AST 节点。

2. `path` 对象： Babel 的 `path` 对象代表 AST 中的一个路径，你可以通过该对象访问和操作 AST 节点。在插件的处理函数中，你将会经常使用 `path` 对象。

`path.node`: 访问当前路径对应的节点。

`path.parent`: 访问当前路径的父路径。

`path.scope`: 访问当前路径的作用域。

`path.traverse(visitor)`: 遍历当前路径的子路径，使用指定的访问者函数。

`path.replaceWith(node)`: 替换当前路径的节点。

`path.remove()`: 移除当前路径的节点。

 这些方法可以帮助你在遍历 AST 树时对节点进行修改、替换或删除。

3. `traverse` 方法： `babel-traverse` 是 Babel 提供的一个独立的模块，用于遍历和操作 AST。在插件中，你可以使用 `traverse` 方法来遍历 AST 树并应用你的插件逻辑。

`traverse(ast, visitor)`: 使用指定的访问者函数遍历给定的 AST 树。

 `visitor` 是一个对象，其中包含了处理不同类型节点的方法。通过在 `visitor` 对象中定义相应类型节点的处理函数，你可以在遍历过程中针对特定类型的节点执行你的插件逻辑。

4. `babel.template` 方法： `babel-template` 是 Babel 提供的一个独立模块，用于根据字符串模板生成 AST 节点。你可以使用 `babel.template` 方法来创建包含特定模板结构的 AST 节点。

`babel.template(code, options)`: 根据指定的代码模板生成 AST 节点。

 `code` 参数是一个包含要生成的代码模板的字符串，而 `options` 参数可以指定一些配置选项，如 `preserveComments` 来保留注释。该方法将返回一个函数，调用该函数并传入替换模板中的变量值，即可生成对应的 AST 节点。

 通过使用 `babel.template` 方法，你可以更方便地创建复杂的 AST 节点结构，尤其在需要生成大量相似结构的节点时非常有用。

5. `babel.transform` 方法： `babel-transform` 是 Babel 提供的一个独立模块，用于将 JavaScript 代码转换为 AST 或将 AST 转换回 JavaScript 代码。在编写插件时，你可以使用 `babel.transform` 方法来进行代码转换操作。

`babel.transform(code, options)`: 将指定的代码转换为 AST 或将 AST 转换回代码。

 `code` 参数是一个包含要转换的 JavaScript 代码的字符串，而 `options` 参数可以指定一些配置选项，如 `plugins` 来指定要应用的插件。该方法将返回一个包含 `ast` 和 `code` 属性的对象，`ast` 属性表示生成的 AST 树，`code` 属性表示转换后的代码。

 通过使用 `babel.transform` 方法，你可以在插件内部对代码进行转换和处理，将代码转换为 AST 进行修改，然后再将修改后的 AST 转换回代码。

 编写一个去除代码里面 console.log 的 babel 插件

以下是一个简单的 Babel 插件示例，用于去除代码中的 `console.log` 语句：

```javascript
// babel-plugin-remove-console.js

module.exports = function ({ types: t }) {
  return {
    visitor: {
      // 处理函数调用表达式
      CallExpression (path) {
        const { callee } = path.node

        // 如果函数调用的名称是 console.log
        if (
          t.isMemberExpression(callee) &&
 t.isIdentifier(callee.object, { name: 'console' }) &&
 t.isIdentifier(callee.property, { name: 'log' })
        ) {
          // 移除该函数调用
          path.remove()
        }
      }
    }
  }
}
```

该插件会遍历代码中的函数调用表达式，如果发现是 `console.log`，则会移除该函数调用。

要使用该插件，可以在项目中安装并配置它。例如，创建一个 `.babelrc` 文件，并将该插件添加到 Babel 的插件列表中：

```json
{
 "plugins": ["./path/to/babel-plugin-remove-console.js"]
}
```

然后运行 Babel 命令或构建工具，它将应用该插件，并从代码中去除所有的 `console.log` 语句。

请注意，这只是一个简单的示例插件，仅适用于演示目的。在实际开发中，你可能需要更复杂的逻辑来处理不同的情况和要求。

## 378 常见 web 安全解析【热度: 1,968】

* created_at: 2023-05-29T14:21:03Z
* updated_at: 2023-05-29T14:21:04Z
* labels: web应用场景, 小米
* milestone: 高

**关键词**：XSS攻击、CSRF攻击、点击劫持共计、URL跳转漏洞、SQL注入攻击、OS命令注入攻击

参考文档：

* [资料](https://github.com/ljianshu/Blog/issues/56)

## 379 如何定制前端项目代码规范【热度: 1,155】

* created_at: 2023-05-29T14:35:13Z
* updated_at: 2023-05-29T14:35:14Z
* labels: 工程化, 百度
* milestone: 高

**关键词**：定制前端代码规范

当按照上述步骤定制前端代码规范时，可以按照以下详细步骤执行：

1. 选择代码规范工具：

研究可用的代码规范工具，如 ESLint、Prettier 等。
比较各工具的功能、灵活性和社区支持，并选择最适合你团队和项目的工具。

2. 定义规范：

针对项目的需求和团队的编码风格，制定代码规范的具体规则和约定。
参考行业内的代码规范，如 Airbnb JavaScript Style Guide、Google JavaScript Style Guide 等，以获取最佳实践和通用规则的参考。
考虑以下方面进行规范定义：
缩进和空格：确定使用的缩进大小、空格还是制表符等。
命名约定：定义变量、函数、类、文件等的命名约定。
代码风格：确定代码的风格规则，如花括号的位置、换行符的使用等。
语法约定：定义应该使用的语言特性和语法约定，如使用严格模式、避免使用特定的语言功能等。

3. 配置规范工具：

创建代码规范工具的配置文件，如 `.eslintrc.js` 或 `.prettierrc`。
在配置文件中指定所选规范工具的规则和选项，根据定义的规范进行配置。
根据需要，可以启用或禁用不同的规则，并进行其他自定义配置。

4. 集成到开发环境：

集成代码规范工具到开发环境，以实现自动检测和修复代码规范问题。
针对使用的编辑器或集成开发环境（IDE），安装相应的插件或扩展来支持代码规范检查和格式化。
配置构建工具（如 webpack）或版本控制系统（如 Git）的钩子，以在代码提交前运行代码规范检查。

5. 告知团队：

与团队成员分享定制的代码规范，并解释规范的目的和重要性。
提供规范的文档或指南，以便团队成员参考和遵循。
组织一个会议或培训，介绍代码规范并解答团队成员的疑问。

6. 定期审查和更新：

定期审查代码规范的有效性，并根据实际需求进行更新和调整。
接收团队成员的反馈和建议，以改进和优化代码规范。
在项目演进和技术发展的过程中，适时地更新代码规范以适应变化的需求。

以上步骤是一个通用的指南，你可以根据自己的团队和项目的特定要求进行调整和执行。此外，团队中的讨论和协商也是非常重要的，确保所有成员都参与到代码规范的制定和执行中。

可以参考文档：[资料](https://juejin.cn/post/7085257325165936648)

## 380 [vue] vue 是怎么解析template的? template会变成什么?【热度: 175】

* created_at: 2023-05-29T14:42:01Z
* updated_at: 2023-05-29T15:28:45Z
* labels: web框架
* milestone: 中

**关键词**：[vue] template 解析

Vue.js在解析和编译模板时，会经过以下过程：

1. 解析模板：Vue.js使用自定义的HTML解析器将模板解析成抽象语法树（AST）。解析器会分析模板中的HTML标记、指令、表达式和事件等内容，并构建出一颗表示模板结构的AST。

2. 静态优化：在生成AST的过程中，Vue.js会对静态内容进行优化。静态内容是指在编译过程中不会发生变化的部分，例如纯文本内容。Vue.js会将静态内容标记为静态节点，以在后续更新过程中跳过对其的处理，提高性能。

3. 编译为渲染函数：Vue.js将AST编译为渲染函数。渲染函数是一个JavaScript函数，它接收数据作为参数，并返回一个虚拟DOM（VNode）树，用于渲染组件的视图。

4. 渲染视图：当组件的数据发生变化时，渲染函数会被调用，生成新的虚拟DOM树。Vue.js会通过比较新旧虚拟DOM树的差异，计算出需要更新的部分，并将其应用到实际的DOM上，从而更新组件的视图。

在上述过程中，模板会被转换成一个渲染函数。渲染函数可以是以下几种形式之一：

* 使用`render`方法编写的渲染函数：在组件中定义了一个`render`方法，该方法返回一个虚拟DOM树。
* 使用单文件组件（.vue文件）：Vue.js提供了单文件组件的支持，其中的`<template>`部分就是模板，通过编译转换为渲染函数。
* 使用Vue.js的模板语法：在Vue组件的`template`选项中使用Vue.js的模板语法，也会被编译为渲染函数。

总之，Vue.js将模板解析为AST，然后根据AST生成渲染函数，最终通过渲染函数来渲染组件的视图。这个过程使得Vue.js能够高效地根据数据动态更新视图。

## 381 [vue] vue 是如何识别和解析指令【热度: 477】

* created_at: 2023-05-29T15:01:16Z
* updated_at: 2023-05-29T15:01:17Z
* labels: web框架
* milestone: 高

**关键词**：vue 指令

 vue 是如何识别和解析指令的， 详细解释一下

Vue.js在识别和解析指令时，使用了编译器（Compiler）来完成这个过程。下面是Vue.js识别和解析指令的详细步骤：

1. 解析模板：首先，Vue.js会将模板代码转换为抽象语法树（AST）。这个过程由Vue.js的编译器完成。编译器会遍历模板代码，将其解析成一棵抽象语法树，该树表示了模板的结构和各个元素之间的关系。

2. 识别指令：在遍历抽象语法树的过程中，编译器会识别出模板中的指令。指令通常以`v-`开头，例如`v-if`、`v-for`、`v-bind`、`v-on`等。编译器会根据指令的名称和位置来确定它们的作用。

3. 提取指令参数和修饰符：对于识别出的指令，编译器会进一步提取指令的参数和修饰符。指令参数通常是指令名称后面的表达式或变量，用于指定指令的具体行为。修饰符是一些额外的标识符，用于修改指令的行为或增加一些特定功能。

4. 解析指令表达式：针对具有表达式的指令，编译器会解析指令表达式并生成对应的代码。指令表达式通常是模板中的变量或计算属性，用于动态地绑定数据到指令上。编译器会将指令表达式转化为可执行的JavaScript代码，以便在运行时进行数据绑定。

5. 生成渲染函数：最后，编译器将解析后的模板和指令转换为渲染函数。渲染函数是一个JavaScript函数，它接收数据作为参数，并返回一个虚拟DOM（VNode）树，用于渲染组件的视图。渲染函数包含了对指令的执行逻辑和对模板变量的处理。

Vue.js通过编译器对模板进行解析，识别和解析指令，并将其转化为渲染函数。这个过程包括解析模板、识别指令、提取参数和修饰符、解析指令表达式，最终生成渲染函数。通过渲染函数，Vue.js能够根据数据的变化动态更新组件的视图。

 上述指令中，例如 v-bind 是如何映射到具体可执行方法的？

在 Vue.js 中，指令的执行是通过渲染函数来实现的。指令对应的可执行方法会在渲染函数中生成，并在组件渲染时执行。下面以`v-bind`指令为例，解释它是如何映射到具体可执行方法的：

1. 解析指令：在编译模板时，Vue.js的编译器会识别到`v-bind`指令。

2. 提取指令参数和修饰符：编译器会进一步提取`v-bind`指令的参数和修饰符。对于`v-bind`，参数通常是要绑定的属性名或表达式，用于将数据绑定到对应的属性上。

3. 解析指令表达式：对于`v-bind`指令，表达式通常是要绑定的数据或计算属性。编译器会解析指令表达式，并生成对应的代码。

4. 生成渲染函数：在生成渲染函数的过程中，编译器会根据解析得到的指令信息生成可执行的JavaScript代码。对于`v-bind`，编译器会在渲染函数中生成一个函数调用，该函数会将指令参数和表达式所代表的值绑定到对应的属性上。

5. 渲染时执行：在组件渲染时，渲染函数会被调用，并执行其中的代码。对于`v-bind`，生成的函数调用会在渲染函数执行时被触发，将绑定的数据或计算属性的值应用到对应的属性上。

在渲染函数执行时，生成的函数调用会被触发，将绑定的数据或计算属性的值应用到对应的属性上。通过这种方式，`v-bind`指令实现了将数据动态绑定到属性上的功能。其他指令的执行原理也类似，通过编译器将指令解析为可执行的代码，并在渲染函数执行时进行相应的操作。

## 382 [vue] render 函数了解吗？【热度: 244】

* created_at: 2023-05-29T15:07:49Z
* updated_at: 2023-05-29T15:07:50Z
* labels: web框架
* milestone: 高

**关键词**：vue render 函数

 render 函数

在Vue.js中，`render`是一个用于生成虚拟DOM（VNode）树的函数。它是Vue.js的渲染函数，负责将组件的模板转换为可渲染的VNode树。

`render`函数接收一个上下文对象作为参数，该对象包含了渲染过程中需要的数据和方法。在`render`函数中，我们可以使用Vue.js提供的模板语法（如插值表达式、指令等）来描述组件的视图结构。

`render`函数的主要作用是根据模板和组件的状态生成VNode树，其中包含了组件的结构、属性、事件等信息。通过对VNode树的创建和更新，Vue.js能够实现高效的虚拟DOM diff算法，并将变更应用到实际的DOM上，从而实现组件视图的动态更新。

在Vue.js中，`render`函数有两种使用方式：

1. 基于模板编译：Vue.js会将组件的模板编译为`render`函数。这是Vue.js的默认行为，它会在运行时将模板编译成渲染函数，并将其作为组件的`render`选项。这种方式可以方便地使用模板语法来描述组件的视图结构。

2. 手动编写：开发者可以手动编写`render`函数，而不依赖模板编译。手动编写`render`函数需要熟悉Vue.js的虚拟DOM API和JavaScript语法，可以更精细地控制组件的渲染过程。这种方式适用于需要更高级别的自定义和优化的场景。

`render` 函数是Vue.js的渲染函数，用于生成组件的虚拟DOM树。它接收上下文对象作为参数，根据模板或手动编写的代码逻辑，生成VNode树，实现组件的动态更新和渲染。

**使用示例**

当使用基于模板编译的方式时，Vue.js会将模板编译为`render`函数，并将其作为组件的`render`选项。下面是一个简单的示例：

```vue
<template>
 <div>
 <h1>{{ message }}</h1>
 <button @click="increaseCount">Click me</button>
 </div>
</template>

<script>
export default {
 data() {
 return {
 message: 'Hello, Vue!',
 count: 0
 };
 },
 methods: {
 increaseCount() {
 this.count++;
 }
 },
 render() {
 return (
 <div>
 <h1>{this.message}</h1>
 <button onClick={this.increaseCount}>Click me</button>
 </div>
 );
 }
};
</script>
```

在上面的示例中，模板中的`<template>`标签中的内容会被编译为`render`函数。在`render`函数中，使用了Vue.js的模板语法（如插值表达式和事件绑定），并将其转化为JSX语法。

注意，当使用基于模板编译的方式时，模板中的代码会被编译为`render`函数的形式，而不是直接在组件中使用模板字符串。

另外，**如果你想手动编写`render`函数**，可以在组件的`render`选项中直接编写函数逻辑。以下是手动编写`render`函数的示例：

```vue
<script>
export default {
 data() {
 return {
 message: 'Hello, Vue!',
 count: 0
 };
 },
 methods: {
 increaseCount() {
 this.count++;
 }
 },
 render(h) {
 return h('div', [
 h('h1', this.message),
 h('button', {
 on: {
 click: this.increaseCount
 }
 }, 'Click me')
 ]);
 }
};
</script>
```

在上述示例中，我们通过手动编写`render`函数，使用了Vue.js提供的`h`函数（也可以使用`createElement`函数）来创建VNode节点。这样可以更加灵活地控制组件的渲染逻辑。

无论是基于模板编译还是手动编写，`render`函数都是用来描述组件视图结构的关键部分。通过`render`函数，Vue.js能够将组件的模板或手动编写的代码转化为可执行的VNode树，实现组件的渲染和更新。

 render函数 与 template 之间关系是啥

在Vue.js中，`render`和`template`是两种定义组件视图的方式，它们之间有一定的关系。

`template`是一种更高级别的、声明式的定义组件视图的方式。通过`template`，我们可以使用Vue.js提供的模板语法，描述组件的结构、样式和交互等，例如使用插值表达式、指令、条件渲染、循环等。`template`提供了更直观、易于理解的方式来定义组件的视图。

当使用基于模板编译的方式时，Vue.js会将`template`编译为`render`函数。这个编译过程将模板转换为可执行的JavaScript代码，最终生成VNode树用于组件的渲染。所以，可以说`render`函数是由`template`转化而来的。

`render`函数是一种更底层、编程式的定义组件视图的方式。它使用JavaScript代码直接描述组件的结构，通过创建和组装VNode节点来构建组件的虚拟DOM树。通过手动编写`render`函数，我们可以更加灵活地控制组件的渲染逻辑，但也需要对Vue.js的虚拟DOM API和JavaScript语法有一定的了解。

总结来说，`template`是一种声明式的、更高级别的定义组件视图的方式，而`render`函数是一种编程式的、更底层的定义组件视图的方式。`render`函数可以通过编译`template`生成，也可以手动编写。它们都用于定义组件的视图结构，最终生成VNode树用于组件的渲染和更新。

## 383 node 子进程了解多少【热度: 1,424】

* created_at: 2023-05-29T15:21:17Z
* updated_at: 2023-05-29T15:21:18Z
* labels: Nodejs
* milestone: 高

**关键词**：node 子进程

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

## 384 source map 了解多少【热度: 396】

* created_at: 2023-05-29T15:28:19Z
* updated_at: 2023-05-29T15:28:20Z
* labels: 工程化, 百度
* milestone: 高

**关键词**：source map 原理

 Source Map（源映射）作用

Source Map（源映射）是一种文件，用于将压缩、混淆或编译后的代码映射回原始的源代码，以便在调试过程中能够直接查看和调试源代码。它提供了压缩文件和源文件之间的映射关系，包括每个压缩文件中的代码位置、原始文件的路径和行号等信息。

Source Map的主要作用如下：

1. 调试：在开发过程中，源代码经常会被压缩、合并或转换为其他形式的代码，这使得在调试时直接查看和调试源代码变得困难。Source Map提供了一种方式，通过将压缩代码映射回源代码，开发者可以在调试器中直接查看和调试原始的、易于理解的源代码。

2. 错误追踪：当发生错误或异常时，浏览器或运行环境会提供错误信息，其中包含了压缩后的代码行号和列号。Source Map可以将这些行号和列号映射回源代码的行号和列号，帮助开发者定位和追踪错误。

3. 性能分析：Source Map可以提供压缩文件中每个代码片段对应的原始文件位置信息，这对于性能分析工具来说非常有用。性能分析工具可以使用Source Map来将性能数据映射回源代码，以便更准确地分析和优化代码性能。

Source Map的原理是通过在压缩文件中添加特定的注释或者生成独立的.map文件来存储映射关系。在调试过程中，浏览器或调试器会读取Source Map，并根据其中的映射关系将压缩代码中的行号、列号等信息映射回源代码的对应位置。

 Source Map（源映射）实现原理

Source Map 的实现原理可以简单描述如下：

1. 生成 Source Map：在代码的压缩、混淆或编译过程中，生成器会创建一个 Source Map 对象，并收集相关的映射信息。这些信息包括原始文件路径、行号、列号以及对应的压缩文件中的位置信息。

2. 生成编码字符串：将收集到的映射信息使用 VLQ（Variable Length Quantity）编码进行压缩，将数字转换为可变长度的 Base64 编码字符串。VLQ 编码能够通过特定的规则将数字转换为可变长度的字符串，以减小 Source Map 的体积。

3. 关联 Source Map：在生成的压缩文件中，通过注释或独立的 .map 文件将 Source Map 关联到压缩文件。注释方式可以通过特定的注释语法将编码字符串直接嵌入到压缩文件中，而独立的 .map 文件则将编码字符串保存在一个独立的文件中。

4. 调试时使用 Source Map：在调试过程中，当开发者需要查看或调试源代码时，浏览器或调试工具会加载关联的 Source Map 文件，根据映射关系将压缩文件中的位置信息映射回源代码的对应位置。

通过这种方式，Source Map 实现了将压缩后的代码映射回原始源代码的功能，使得在调试、错误追踪和性能分析时能够更方便地操作和理解源代码。实际上，Source Map 的实现会有更多的细节和规范，但以上是其基本的实现原理概述。

## 385 使用 Promise 实现一个异步流量控制的函数(限制并发数)【热度: 517】

* created_at: 2023-05-30T15:19:35Z
* updated_at: 2023-06-26T16:04:07Z
* labels: JavaScript, 腾讯
* milestone: 高

**关键词**：异步流量控制的函数

下面是使用 Promise 实现异步流量控制的函数的示例：

```javascript
function asyncFlowControl(tasks, limit) {
 let runningCount = 0; // 当前正在运行的任务数
 let index = 0; // 当前执行的任务索引
 const results = []; // 存储任务的结果

 return new Promise((resolve, reject) => {
 function runTask() {
 if (runningCount >= limit || index >= tasks.length) {
 // 达到并发限制或所有任务已执行完毕，返回结果
 if (results.length === tasks.length) {
 resolve(results);
 }
 return;
 }

 const task = tasks[index];
 const currentIndex = index; // 保存当前任务索引

 index++;
 runningCount++;

 task().then((result) => {
 results[currentIndex] = result; // 存储任务结果
 runningCount--;
 runTask(); // 递归执行下一个任务
 }).catch((error) => {
 reject(error);
 });

 runTask(); // 递归执行下一个任务
 }

 runTask(); // 开始执行任务
 });
}

// 示例用法
function asyncTask(value) {
 return new Promise((resolve) => {
 setTimeout(() => {
 console.log(value);
 resolve(value);
 }, Math.random()1000);
 });
}

const tasks = [
 () => asyncTask(1),
 () => asyncTask(2),
 () => asyncTask(3),
 () => asyncTask(4),
 () => asyncTask(5),
];

asyncFlowControl(tasks, 2).then((results) => {
 console.log('All tasks completed:', results);
}).catch((error) => {
 console.error('Error occurred:', error);
});
```

以上示例中的 `asyncFlowControl` 函数接受一个任务数组 `tasks` 和一个并发限制 `limit`，它会按照并发限制逐个执行任务，并返回一个 Promise 对象。在示例中，任务数组中的每个任务都是一个返回 Promise 的函数，通过 `setTimeout` 模拟异步操作。

在执行过程中，`asyncFlowControl` 函数会维护一个 `runningCount` 变量来跟踪当前正在运行的任务数，并使用递归的方式执行任务。当达到并发限制或所有任务都已执行完毕时，函数会返回结果。

通过控制并发任务的数量，我们可以限制同时执行的异步操作，实现异步流量控制。在上述示例中，设置并发限制为 2，可以确保最多同时执行 2 个任务，并在任务执行完毕后再执行下一个任务。

## 386 不使用任何中间件， koa 如何解析 post 请求参数【热度: 1,359】

* created_at: 2023-05-30T15:26:16Z
* updated_at: 2023-05-30T15:26:17Z
* labels: Nodejs, 阿里巴巴
* milestone: 高

**关键词**：koa 请求、koa 解析、koa body-parser

如果你不想使用任何中间件来解析 POST 请求参数，你可以手动解析请求体数据。在 Koa 中，你可以通过以下步骤来解析 POST 请求的参数：

1. 使用 `ctx.req` 获取原始的 Node.js 请求对象。
2. 将请求对象的数据流通过 `ctx.req.on('data', ...)` 事件监听进行读取。
3. 将读取到的数据流进行处理，根据请求头的 `Content-Type` 判断数据格式，可以是 `application/json` 或 `application/x-www-form-urlencoded`。
4. 将处理后的数据转换为 JavaScript 对象或其他格式进行进一步处理。

以下是一个示例：

```javascript
const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {
  if (ctx.method === 'POST') {
    // 手动解析 POST 请求的参数
    const requestData = await parseRequestBody(ctx.req)
    // 处理请求参数
    // ...
    ctx.body = 'POST request received'
  } else {
    ctx.body = 'Hello, Koa!'
  }
})

function parseRequestBody (req) {
  return new Promise((resolve, reject) => {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    })
    req.on('end', () => {
      // 根据请求头的 Content-Type 判断数据格式
      if (req.headers['content-type'] === 'application/json') {
        // 解析 JSON 格式数据
        try {
          resolve(JSON.parse(data))
        } catch (error) {
          reject(error)
        }
      } else if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        // 解析 URL 编码格式数据
        const parsedData = {}
        const keyValuePairs = data.split('&')
        for (const pair of keyValuePairs) {
          const [key, value] = pair.split('=')
          parsedData[key] = decodeURIComponent(value)
        }
        resolve(parsedData)
      } else {
        reject(new Error('Unsupported content type'))
      }
    })
    req.on('error', (error) => {
      reject(error)
    })
  })
}

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
```

在上述示例中，我们在中间件函数中手动解析 POST 请求的参数。`parseRequestBody` 函数使用 `ctx.req` 获取原始的 Node.js 请求对象，并通过监听 `data` 事件将请求体数据流进行读取。然后，根据请求头的 `Content-Type` 判断数据格式，如果是 `application/json`，则使用 `JSON.parse` 解析为 JavaScript 对象；如果是 `application/x-www-form-urlencoded`，则将数据转换为键值对对象。最后，将解析后的数据传递给处理函数进行进一步处理。

请注意，手动解析请求参数可能更复杂且容易出错，而使用中间件能够更方便地处理和解析请求体数据。因此，在实际开发中，推荐使用合适的中间件来解析请求参数。

## 387 Generator 是如何做到中断和恢复的【热度: 1,558】

* created_at: 2023-05-30T15:32:05Z
* updated_at: 2023-05-30T15:32:06Z
* labels: JavaScript, 百度
* milestone: 中

**关键词**：Generator 中断、Generator 回复

Generator 是 JavaScript 中一种特殊的函数，它能够通过迭代器协议（Iterator Protocol）实现中断和恢复的功能。

Generator 函数使用 `function*` 声明，内部可以使用 `yield` 关键字来定义中断点。当调用 Generator 函数时，它不会立即执行，而是返回一个迭代器对象。通过调用迭代器的 `next()` 方法，可以逐步执行 Generator 函数，并在每个 `yield` 关键字处暂停执行并返回一个包含当前值的对象。

当调用 `next()` 方法时，Generator 函数会从上次暂停的地方继续执行，直到遇到下一个 `yield` 关键字或函数结束。通过不断调用 `next()` 方法，可以逐步执行 Generator 函数的代码，并获取每个中断点处的值。

由于 Generator 函数具有中断和恢复的特性，可以用于异步编程，实现一种更直观的方式来处理异步操作。通过 `yield` 关键字，可以将异步操作分割成多个步骤，每个步骤都可以通过 `yield` 暂停，等待异步操作完成后再恢复执行。

以下是一个简单的示例，展示了 Generator 函数的中断和恢复特性：

```javascript
function * generatorFunction () {
  console.log('Step 1')
  yield
  console.log('Step 2')
  yield
  console.log('Step 3')
}

const generator = generatorFunction()

generator.next() // Step 1
generator.next() // Step 2
generator.next() // Step 3
```

在上述示例中，我们定义了一个名为 `generatorFunction` 的 Generator 函数。在函数体内，使用 `console.log` 打印了三个不同的步骤，并在每个步骤后使用 `yield` 关键字暂停执行。然后，我们通过调用 `generator.next()` 方法逐步执行 Generator 函数。每次调用 `next()` 方法时，函数会从上次暂停的地方恢复执行，打印相应的步骤。

通过使用 Generator 函数，可以实现更灵活、可控的异步编程模式，提供更好的代码可读性和维护性。

## 388 哪些原因会导致js里this指向混乱?【热度: 1,282】

* created_at: 2023-05-30T15:36:19Z
* updated_at: 2023-05-30T15:36:19Z
* labels: JavaScript, 小米
* milestone: 中

**关键词**：js 指向

JavaScript 中 this 指向混乱的原因主要有以下几个：

1. 函数调用方式不同：JavaScript 中函数的调用方式决定了 this 的指向。常见的函数调用方式有函数调用、方法调用、构造函数调用和箭头函数调用。不同的调用方式会导致 this 指向不同的对象，容易引发混乱。

2. 丢失绑定：当函数作为一个独立的变量传递时，或者作为回调函数传递给其他函数时，函数内部的 this 可能会丢失绑定。这意味着函数中的 this 不再指向原来的对象，而是指向全局对象（在浏览器环境中通常是 window 对象）或 undefined（在严格模式下）。

3. 嵌套函数：当函数嵌套在其他函数内部时，嵌套函数中的 this 通常会与外部函数的 this 不同。这可能导致 this 的指向出现混乱，特别是在多层嵌套的情况下。

4. 使用 apply、call 或 bind 方法：apply、call 和 bind 是 JavaScript 中用于显式指定函数的 this 的方法。如果不正确使用这些方法，比如传递了错误的上下文对象，就会导致 this 指向错误。

5. 箭头函数：箭头函数具有词法作用域的 this 绑定，它会捕获其所在上下文的 this 值，而不是动态绑定 this。因此，在箭头函数中使用 this 时，它指向的是箭头函数声明时的上下文，而不是调用时的上下文。

为了避免 this 指向混乱的问题，可以采取以下措施：

* 使用箭头函数，确保 this 始终指向期望的上下文。
* 在函数调用时，确保正确设置了函数的上下文对象，可以使用 bind、call 或 apply 方法。
* 使用严格模式，避免函数内部的 this 默认绑定到全局对象。
* 在嵌套函数中，使用箭头函数或者显式保存外部函数的 this 值，以避免内部函数的 this 指向错误。

理解和正确处理 this 的指向是 JavaScript 开发中重要的一环，它能帮助我们避免许多常见的错误和混乱。

## 389 JS 作用域链链接多少?【热度: 882】

* created_at: 2023-05-30T15:48:36Z
* updated_at: 2023-05-30T15:48:37Z
* labels: JavaScript, 美团
* milestone: 中

**关键词**：JS 作用域链链、JS 作用域链链应用

 概念

JavaScript 作用域链（Scope Chain）是指变量和函数的可访问性和查找规则。它是由多个执行上下文（Execution Context）的变量对象（Variable Object）按照它们被创建的顺序组成的链式结构。

在 JavaScript 中，每个函数都会创建一个新的执行上下文，并将其添加到作用域链的最前端。当访问一个变量时，JavaScript 引擎会先从当前执行上下文的变量对象开始查找，如果找不到，则沿着作用域链依次向上查找，直到全局执行上下文的变量对象。

作用域链的创建过程如下：

1. 在函数定义时，会创建一个变量对象（VO）来存储函数的变量和函数声明。这个变量对象包含了当前函数的作用域中的变量和函数。
2. 在函数执行时，会创建一个执行上下文（Execution Context），并将其添加到作用域链的最前端。执行上下文中的变量对象称为活动对象（Active Object）。
3. 当访问一个变量时，JavaScript 引擎首先会在活动对象中查找，如果找不到，则沿着作用域链依次向上查找，直到全局执行上下文的变量对象。
4. 如果在作用域链的任何一个环节找到了变量，则停止查找并返回变量的值；如果未找到，则抛出引用错误（ReferenceError）。

作用域链的特点：

1. 作用域链是一个静态的概念，它在函数定义时就确定了，不会随着函数的调用而改变。
2. 作用域链是由多个执行上下文的变量对象按照它们被创建的顺序组成的。
3. 作用域链的最后一个变量对象是全局执行上下文的变量对象，它是作用域链的终点。
4. 内部函数可以访问外部函数的变量，因为内部函数的作用域链包含了外部函数的变量对象。

 有哪些应用场景

作用域链在 JavaScript 中具有广泛的应用场景。下面列举了一些常见的应用场景：

1. 变量查找：作用域链决定了变量的访问顺序，当访问一个变量时，会按照作用域链的顺序依次查找变量，直到找到匹配的变量或到达全局作用域。

2. 闭包：闭包是指函数能够访问和操作它的外部函数中定义的变量。通过作用域链，内部函数可以访问外部函数的变量，实现了闭包的特性。闭包在许多场景中用于创建私有变量和实现函数封装。

3. 垃圾回收：JavaScript 的垃圾回收机制通过作用域链来判断变量的生命周期。当变量不再被引用时，垃圾回收器可以回收它所占用的内存空间。

4. 函数作为参数传递：在 JavaScript 中，可以将函数作为参数传递给其他函数。在传递过程中，作用域链决定了内部函数对外部函数变量的访问权限，实现了回调函数和高阶函数的功能。

5. 面向对象编程：JavaScript 中的对象和原型链是基于作用域链实现的。通过原型链，对象可以访问和继承其原型对象的属性和方法。

6. 模块化开发：作用域链可以用于实现模块化开发，通过定义私有变量和公共接口，控制模块内部变量的可访问性，避免变量冲突和全局污染。

7. 作用域链的动态改变：在 JavaScript 中，可以通过闭包和动态作用域的特性来改变作用域链。例如，使用 eval() 函数或 with 语句可以改变当前的作用域链。

总之，作用域链在 JavaScript 中扮演了重要的角色，涵盖了变量的访问、闭包、垃圾回收、模块化开发等多个方面。深入理解作用域链对于编写高质量的 JavaScript 代码和理解其底层工作原理非常重要。

## 390 [Webpack] webpack5 Module Federation 了解多少

* created_at: 2023-05-30T15:53:52Z
* updated_at: 2023-11-01T15:07:35Z
* labels: 工程化, 京东
* milestone: 高

 概念

Webpack 5 的 Module Federation 是一项功能强大的功能，它允许将 JavaScript 应用程序拆分成独立的模块，并在不同的 Webpack 构建中共享这些模块。它解决了多个独立应用程序之间共享代码的问题，使得实现微前端架构变得更加容易。

Module Federation 可以将一个应用程序拆分成多个独立的子应用，每个子应用都可以被独立开发、部署和运行。每个子应用都可以通过配置指定需要共享的模块，然后将这些共享模块以动态方式加载到其他子应用中使用，而无需将这些模块打包进每个子应用的构建文件中。

Module Federation 的核心概念是 "容器"（Container）和 "远程"（Remote）。容器是一个主应用程序，它可以加载和渲染其他子应用程序，而远程是一个独立的子应用程序，它提供了一些模块供其他子应用程序使用。

Module Federation 提供了一种简单的方式来定义远程模块，并在容器中引用这些远程模块。容器可以从远程加载模块，并通过配置将这些模块暴露给其他子应用程序。这样，子应用程序可以通过远程加载和使用容器中的模块，实现了模块的共享和动态加载。

Module Federation 在实现微前端架构时非常有用，可以将多个独立开发的子应用程序组合成一个整体，并实现共享模块和资源的灵活管理。它提供了一种解决方案，让多个团队可以独立开发和部署自己的子应用程序，同时又能够共享代码和资源，提高开发效率和整体性能。

Webpack 5 的 Module Federation 是一项用于实现微前端架构的功能，它可以将 JavaScript 应用程序拆分成独立的子应用程序，并通过动态加载和共享模块的方式实现子应用程序之间的交互和共享。

 使用示范

下面是一个简单的示例，演示如何在 Webpack 5 中使用 Module Federation。

假设我们有两个独立的应用程序：App1 和 App2。我们将使用 Module Federation 将 App2 的模块共享给 App1。

首先，我们需要在 App2 的 Webpack 配置中启用 Module Federation：

```javascript
// webpack.config.js (App2)

const { ModuleFederationPlugin } = require('webpack')

module.exports = {
  // ...其他配置
  plugins: [
    new ModuleFederationPlugin({
      name: 'app2',
      filename: 'remoteEntry.js',
      exposes: {
        './Button': './src/Button' // 暴露 App2 的 Button 模块
      }
    })
  ]
}
```

接下来，我们需要在 App1 的 Webpack 配置中配置远程加载 App2 的模块：

```javascript
// webpack.config.js (App1)

const { ModuleFederationPlugin } = require('webpack')

module.exports = {
  // ...其他配置
  plugins: [
    new ModuleFederationPlugin({
      name: 'app1',
      remotes: {
        app2: 'app2@http://localhost:3002/remoteEntry.js' // 远程加载 App2 的模块
      }
    })
  ]
}
```

在 App1 中，我们可以像使用本地模块一样使用 App2 的模块：

```javascript
// App1

import React from 'react'
import ReactDOM from 'react-dom'
import App2Button from 'app2/Button' // 远程加载 App2 的 Button 模块

ReactDOM.render(<App2Button />, document.getElementById('root'))
```

在上面的示例中，我们通过 Module Federation 将 App2 的 Button 模块暴露给了 App1，然后在 App1 中可以直接通过 `import` 语句引入并使用。

需要注意的是，App1 需要在 `remotes` 配置中指定远程加载的模块，其中 `app2` 是一个远程模块的名称，而 `http://localhost:3002/remoteEntry.js` 是 App2 构建输出的远程入口文件。

这只是一个简单的示例，实际使用中可能涉及更复杂的配置和场景。但通过以上配置，我们可以实现在不同应用程序之间共享模块，并通过动态加载的方式使用远程模块。

## 392 [React] react-router 页面跳转时，是如何传递下一个页面参数的？

* created_at: 2023-05-30T16:08:15Z
* updated_at: 2023-05-30T16:08:15Z
* labels: web框架, 腾讯
* milestone: 高

 路由数据

React Router 是一个用于管理前端路由的库，它与 React 应用程序集成在一起，提供了一种在单页面应用中处理路由的方式。React Router 并没有直接提供数据存储的功能，它主要负责路由的匹配和导航。

在 React Router 中，路由相关的数据主要存储在组件的 props 和组件的状态中。以下是一些常见的数据存储方式：

1. 路由参数（Route Parameters）：
 React Router 允许通过路径参数（如 `/users/:id`）传递参数给路由组件。这些参数可以通过 `props.match.params` 对象在路由组件中获取。路由参数通常用于标识唯一资源的ID或其他需要动态变化的数据。

2. 查询参数（Query Parameters）：
 查询参数是通过 URL 查询字符串传递的键值对数据，如 `/users?id=123&name=John`。React Router 可以通过 `props.location.search` 属性获取查询字符串，并通过解析库（如 `query-string`）将其转换为 JavaScript 对象。查询参数通常用于筛选、分页或其他需要传递额外数据的场景。

3. 路由状态（Route State）：
 在某些情况下，可能需要将一些状态信息传递给路由组件，例如从一个页面跳转到另一个页面时需要携带一些额外的状态。React Router 提供了 `props.location.state` 属性，可以用于存储和传递路由状态。

4. 上下文（Context）：
 React Router 提供了一个 `Router` 组件，可以使用 React 的上下文功能共享路由相关的数据。通过在 `Router` 组件的上下文中提供数据，可以在路由组件中访问该数据，而无需通过 props 层层传递。这在需要在多个嵌套层级中访问路由数据时非常方便。

总的来说，React Router 并没有专门的数据存储机制，它主要利用 React 组件的 props 和状态来传递和存储路由相关的数据。这些数据可以通过路由参数、查询参数、路由状态以及上下文等方式来传递和获取。根据具体的需求和场景，可以选择适合的方式来存储和管理路由相关的数据。

 路由状态是如何存储的

在 React Router 中，路由状态可以通过 `props.location.state` 属性来存储和获取。

当使用 React Router 进行页面导航时，可以通过 `history.push` 或 `history.replace` 方法传递一个包含状态数据的对象作为第二个参数。例如：

```jsx
history.push('/dashboard', { isLoggedIn: true, username: 'John' });
```

这个对象会被存储在新页面的 `props.location.state` 中，可以在目标页面的组件中通过 `props.location.state` 来访问它。例如：

```jsx
import { useLocation } from 'react-router-dom';

function Dashboard() {
 const location = useLocation();
 const { isLoggedIn, username } = location.state;

 // 使用路由状态数据
 // ...
}
```

需要注意的是，路由状态仅在通过 `history.push` 或 `history.replace` 导航到新页面时才可用。如果用户通过浏览器的前进/后退按钮进行导航，或者直接输入 URL 地址访问页面，路由状态将不会被保留。

另外，路由状态也可以在类组件中通过 `this.props.location.state` 进行访问，或者在函数组件中使用 `props.location.state`。

 props.location.state 数据是如何存储的

在 React Router 中，路由状态数据实际上是存储在客户端的内存中。

当使用 `history.push` 或 `history.replace` 方法导航到一个新页面时，React Router 将路由状态数据作为对象附加到浏览器历史记录中的对应路由条目。这个对象会存储在浏览器的会话历史中，并在新页面加载时被 React Router 读取并提供给组件。

具体地说，React Router 使用 HTML5 的 History API（`pushState` 或 `replaceState` 方法）来实现路由导航，并将路由状态数据作为一个特殊的字段存储在历史记录中。这个字段通常被称为 `state` 字段，用于存储路由状态数据。

在浏览器中，历史记录和相应的状态数据会被保存在内存中。当用户进行前进、后退或直接访问某个 URL 时，浏览器会根据历史记录加载对应的页面，并将相关的状态数据提供给 React Router。这样，组件就能够通过 `props.location.state` 来访问之前存储的路由状态数据。

需要注意的是，路由状态数据仅在客户端内存中存在，每个用户的路由状态是独立的。如果用户刷新页面或关闭浏览器，路由状态数据将丢失，并需要重新通过导航操作来设置。因此，路由状态适合存储短期或临时的数据，而对于长期或持久化的数据，应该考虑其他的数据存储方式，如服务器端存储或状态管理库。

## 393 实现一个JS 函数， 解析 url 参数， 返回一个对象

* created_at: 2023-05-30T16:13:53Z
* updated_at: 2023-09-13T06:18:18Z
* labels: Shopee, 滴滴, 代码实现/算法
* milestone: 中

 基础版本

下面是一个简单的 JavaScript 函数，用于解析 URL 参数并返回一个包含参数键值对的对象：

```javascript
function parseUrlParams (url) {
  const params = {}
  const queryString = url.split('?')[1]

  if (queryString) {
    const pairs = queryString.split('&')
    pairs.forEach(pair => {
      const [key, value] = pair.split('=')
      params[key] = decodeURIComponent(value)
    })
  }

  return params
}
```

这个函数接受一个 URL 字符串作为参数，并返回解析后的参数对象。例如：

```javascript
const url = 'https://example.com?name=John&age=30&city=New%20York'
const params = parseUrlParams(url)

console.log(params)
// Output: { name: "John", age: "30", city: "New York" }
```

这个函数的实现思路是先从 URL 字符串中提取查询字符串部分，然后将查询字符串按照 `&` 分割成键值对数组。接着遍历键值对数组，将每个键值对按照 `=` 分割，然后将键和值存储到结果对象 `params` 中，注意要对值进行 URL 解码以处理特殊字符。最后返回解析后的参数对象。

 进阶 - 支持json字符串参数

如果要支持复杂的 JSON 字符串作为查询参数，可以使用 `JSON.parse()` 方法解析 JSON 字符串，并在解析后的对象中处理参数。

下面是一个修改后的函数，支持解析复杂的 JSON 字符串作为查询参数：

```javascript
function parseUrlParams (url) {
  const params = {}
  const queryString = url.split('?')[1]

  if (queryString) {
    const pairs = queryString.split('&')
    pairs.forEach(pair => {
      const [key, value] = pair.split('=')
      const decodedValue = decodeURIComponent(value)

      try {
        params[key] = JSON.parse(decodedValue)
      } catch (error) {
        // 如果解析 JSON 失败，则将原始字符串存储到参数对象中
        params[key] = decodedValue
      }
    })
  }

  return params
}
```

现在，如果查询参数是一个 JSON 字符串，它将被解析为相应的 JavaScript 对象，并作为参数对象的值。如果解析失败（例如，不是有效的 JSON 字符串），则将保留原始字符串作为值存储在参数对象中。

以下是一个示例：

```javascript
const url = 'https://example.com?name=John&age=30&address={"city":"New York","zipcode":10001}'
const params = parseUrlParams(url)

console.log(params)
// Output: { name: "John", age: "30", address: { city: "New York", zipcode: 10001 } }
```

 再次进阶-支持更复杂的场景， 比如嵌套对象， 数组

下面是修改后的函数，支持解析复杂的查询参数，包括嵌套对象和数组：

```javascript
function parseUrlParams (url) {
  const params = {}
  const queryString = url.split('?')[1]

  if (queryString) {
    const pairs = queryString.split('&')
    pairs.forEach(pair => {
      const [key, value] = pair.split('=')
      const decodedValue = decodeURIComponent(value)

      const keys = key.split('.')
      let current = params

      for (let i = 0; i < keys.length; i++) {
        const nestedKey = keys[i]
        const isArray = /\[\]$/.test(nestedKey)

        if (isArray) {
          const arrayKey = nestedKey.slice(0, -2)

          if (!current[arrayKey]) {
            current[arrayKey] = []
          }

          if (i === keys.length - 1) {
            current[arrayKey].push(parseValue(decodedValue))
          } else {
            const newIndex = current[arrayKey].length
            if (!current[arrayKey][newIndex]) {
              current[arrayKey][newIndex] = {}
            }
            current = current[arrayKey][newIndex]
          }
        } else {
          if (i === keys.length - 1) {
            current[nestedKey] = parseValue(decodedValue)
          } else {
            if (!current[nestedKey]) {
              current[nestedKey] = {}
            }
            current = current[nestedKey]
          }
        }
      }
    })
  }

  return params
}

function parseValue (value) {
  try {
    return JSON.parse(value)
  } catch (error) {
    // 解析失败，则返回原始值
    return value
  }
}
```

现在，该函数可以正确解析包含嵌套对象和数组的查询参数。

以下是一个示例：

```javascript
const url = 'https://example.com?name=John&age=30&address.city=New%20York&address.zipcode=10001&tags[]=tag1&tags[]=tag2'
const params = parseUrlParams(url)

console.log(params)
// Output: { name: "John", age: "30", address: { city: "New York", zipcode: 10001 }, tags: ["tag1", "tag2"] }
```

在这个修改后的函数中，当遇到嵌套对象时，它会递归创建相应的对象属性。当遇到数组时，它会创建一个数组，并将值添加到数组中。

## 394 [webpack] 提高 webpack 的构建速度的办法有哪些【热度: 1,208】

* created_at: 2023-05-31T15:30:28Z
* updated_at: 2023-11-01T15:01:44Z
* labels: 工程化, 网易
* milestone: 高

**关键词**：webpack 构建、webpack 构建优化、webpack 构建速度

以下是一些可以提高Webpack构建速度的办法：

1. 使用更快的构建工具：升级Webpack到最新版本，因为每个新版本通常都会带来性能改进和优化。

2. 减少文件的数量：通过代码拆分和按需加载等技术，将代码拆分成更小的模块，减少每次构建需要处理的文件数量。

3. 使用缓存：启用Webpack的缓存功能，可以在多次构建过程中复用已经构建好的模块，从而减少重新构建的时间。

4. 使用多线程/多进程构建：通过使用工具如HappyPack或thread-loader等，可以将Webpack的构建过程并行化，利用多线程或多进程来加速构建速度。

5. 优化Loader配置：确保Loader的配置尽可能精确，只对需要处理的文件进行操作，并且使用高效的Loader插件。避免不必要的文件处理和转换，以提高构建速度。

6. 使用DLL和缓存组：使用Webpack的DLLPlugin和CacheGroups等功能，可以将一些稳定不变的依赖提前编译和缓存，减少每次构建的时间。

7. 压缩输出文件：使用Webpack的压缩插件（如UglifyJsPlugin）对输出文件进行压缩和混淆，减小文件大小，加快加载速度。

8. 配置resolve.extensions：通过配置Webpack的resolve.extensions，明确指定需要处理的文件类型，避免Webpack进行多余的文件扫描和匹配。

9. 开启持久化缓存：使用Webpack的持久化缓存插件（如HardSourceWebpackPlugin），将构建过程中的中间结果缓存到硬盘中，提高后续构建的速度。

10. 使用Tree Shaking：利用Webpack的Tree Shaking特性，移除未使用的代码，减小输出文件的体积，加快加载速度。

这些是提高Webpack构建速度的一些常见方法，可以根据具体项目的需求和情况选择适合的优化策略。同时，不同的项目和环境可能会有不同的性能瓶颈，因此需要根据实际情况进行具体的优化和调整。

## 395 [vue] vue3 性能提升主要是体现在哪些方面【热度: 324】

* created_at: 2023-05-31T15:49:39Z
* updated_at: 2023-07-26T14:56:25Z
* labels: web框架, Shopee
* milestone: 中

**关键词**：vue3 性能提升、vue3 编译优化、vue3 初始化优化、vue3 Tree-shaking支持、vue3 虚拟DOM优化

Vue 3.0在性能方面进行了多项改进和优化，主要体现在以下几个方面：

1. 响应式系统优化：Vue 3.0使用了基于Proxy的响应式系统，相比Vue 2.x中的Object.defineProperty，Proxy可以提供更高效的变更侦测和访问拦截，从而提升了响应式系统的性能。

2. 编译优化：Vue 3.0引入了静态模板提升(Static Template Hoisting)技术，将模板编译为更简洁、更高效的渲染函数。这样可以减少不必要的运行时开销，并提高组件的渲染性能。

3. 组件实例初始化优化：Vue 3.0在组件实例初始化过程中进行了一系列优化，减少了不必要的初始化工作和内存开销。例如，通过将组件的配置项合并为单个对象，避免了Vue 2.x中的原型链查找操作。

4. Tree-shaking支持：Vue 3.0的代码结构更加模块化，支持更好的Tree-shaking，可以更精确地将项目中没有使用的代码进行排除，从而减少打包体积。

5. 虚拟DOM优化：Vue 3.0对虚拟DOM进行了一些优化，比如采用了静态标记(static marking)的方式来跳过静态节点的比对和更新，减少了不必要的操作，提高了渲染性能。

这些优化和改进使得Vue 3.0在性能方面有了显著的提升，提高了应用的渲染性能、响应速度和整体的运行效率。

## 396 [vue] vue3 相比较于 vue2 在编译阶段有哪些改进

* created_at: 2023-05-31T15:53:10Z
* updated_at: 2023-05-31T15:53:10Z
* labels: web框架
* milestone: 高

Vue 3 在编译阶段相对于 Vue 2 进行了一些重要的改进，主要包括以下几个方面：

1. 静态模板提升（Static Template Hoisting）：Vue 3 引入了静态模板提升技术，通过对模板进行分析和优化，将模板编译为更简洁、更高效的渲染函数。这种优化可以减少不必要的运行时开销，并提高组件的渲染性能。

2. Fragments 片段支持：Vue 3 支持使用 Fragments 片段来包裹多个根级元素，而不需要额外的父元素。这样可以避免在编译阶段为每个组件生成额外的包裹元素，减少了虚拟 DOM 树的层级，提高了渲染性能。

3. 静态属性提升（Static Props Hoisting）：Vue 3 在编译阶段对静态属性进行了优化，将静态属性从渲染函数中提取出来，只在组件初始化时计算一次，并在后续的渲染中重用。这样可以减少不必要的属性计算和传递，提高了组件的渲染性能。

4. 事件处理函数的内联化：Vue 3 在编译阶段对事件处理函数进行了内联化，将事件处理函数直接写入模板中，而不是在运行时动态生成。这样可以减少运行时的事件绑定和查找开销，提高了事件处理的性能。

5. 静态节点提升（Static Node Hoisting）：Vue 3 通过静态节点提升技术，将静态的节点在编译阶段进行处理，避免了在每次渲染时对静态节点的比对和更新操作，提高了渲染性能。

6. 缓存事件处理器（Cached Event Handlers）：Vue 3 在编译阶段对事件处理器进行了缓存，避免了重复创建事件处理函数的开销。对于相同的事件处理器，只会创建一次，并在组件的生命周期中重复使用，减少了内存占用和运行时开销。

7. 更细粒度的组件分割（Fine-Grained Component Splitting）：Vue 3 支持更细粒度的组件分割，可以将组件的模板、脚本和样式进行独立的编译和加载，以实现更好的代码拆分和按需加载，提高了应用的加载速度和性能。

这些改进使得 Vue 3 在编译阶段能够生成更优化的代码，减少了不必要的运行时开销，并提高了组件的渲染性能和整体的运行效率。

## 397 了解哪些基础算法

* created_at: 2023-05-31T15:59:30Z
* updated_at: 2023-05-31T15:59:49Z
* labels: JavaScript
* milestone: 中

6 种基础算法思想

* 递归算法
* 分治算法
* 贪心算法
* 回溯算法
* 动态规划
* 枚举算法

**参考文档**: [资料](https://www.toutiao.com/article/7199435823970828857)

## 398 有哪些场景的 http header

* created_at: 2023-06-02T15:48:14Z
* updated_at: 2023-06-02T15:48:15Z
* labels: 网络, 阿里巴巴
* milestone: 中

常见的 HTTP Header 在请求头（Request Header）和响应头（Response Header）中有许多不同的字段，它们具有各自的作用。下面是一些常见的 HTTP Header 字段及其作用的简要说明：

**Request Header：**

1. **Host**：指定目标服务器的域名或 IP 地址。
2. **User-Agent**：发送请求的用户代理（通常是浏览器标识）。
3. **Accept**：指定客户端可以接受的内容类型。
4. **Content-Type**：指定请求体的媒体类型。
5. **Authorization**：提供身份验证凭据，用于访问受保护的资源。
6. **Cookie**：包含在上一次响应中设置的服务器的 Cookie。
7. **Referer**：指定当前请求的来源页面 URL。

**Response Header：**

1. **Content-Type**：指定响应体的媒体类型。
2. **Content-Length**：指定响应体的长度（以字节为单位）。
3. **Cache-Control**：指定缓存策略，如缓存的有效期、是否可以缓存等。
4. **Set-Cookie**：在客户端设置 Cookie。
5. **Location**：指定重定向的目标 URL。
6. **Access-Control-Allow-Origin**：指定允许跨域请求的来源（CORS）。
7. **ETag**：指定实体标签，用于缓存验证。

这只是一小部分常见的 HTTP Header 字段，实际上还有很多其他的字段可以在请求头和响应头中使用，每个字段都有特定的作用和用途。这些头部字段能够提供额外的信息、控制请求和响应的行为，以及实现各种功能，如身份验证、缓存控制、安全性等。

**`Content-Type` 作用是啥，有哪些属性**

Content-Type 是 HTTP 头部字段之一，用于指示请求或响应中实体（如消息体、文件等）的媒体类型。

Content-Type 的值通常由媒体类型和字符集组成，使用 MIME（Multipurpose Internet Mail Extensions）类型标识。以下是一些常见的 Content-Type 值及其用途：

1. **text/plain**：纯文本类型，没有指定字符集，默认使用 ASCII 编码。
2. **text/html**：HTML 文档类型，用于表示网页内容。
3. **text/css**：CSS 文件类型，用于表示样式表。
4. **application/json**：JSON 数据类型，用于表示结构化数据。
5. **application/xml**：XML 数据类型，用于表示可扩展标记语言数据。
6. **application/octet-stream**：二进制流数据类型，用于表示任意二进制数据。
7. **multipart/form-data**：用于在 HTML 表单中上传文件时，将表单数据和文件一起提交。
8. **image/jpeg**、**image/png**、**image/gif**：用于表示不同格式的图像文件。

这只是一小部分常见的 Content-Type 值，实际上还有很多其他类型，每种类型都有其特定的用途和格式。根据实际需求，选择适当的 Content-Type 值可以确保请求和响应中的实体以正确的格式进行解析和处理。

## 399 304 是什么场景的状态码， 好处和坏处分别是什么【热度: 1,425】

* created_at: 2023-06-02T15:57:38Z
* updated_at: 2023-06-02T15:58:41Z
* labels: 网络, 腾讯
* milestone: 中

**关键词**：304 状态码、缓存响应

HTTP 状态码 304 Not Modified 是在一些特定场景下返回的状态码，用于表示客户端缓存的资源仍然有效，无需重新下载。

好处：

* 减少了对服务器的请求，节省了带宽和服务器资源。
* 加快了客户端的加载速度，因为它可以使用缓存的响应而无需等待服务器的响应。

坏处：

* 如果客户端缓存的资源不是最新的，而服务器未能传递最新的版本，那么客户端将继续使用过期的资源。
* 客户端和服务器之间的缓存验证会增加一些额外的开销，包括发送验证请求和进行验证的处理。

适用场景：

* 客户端发送带有条件的请求，通常是 GET 或 HEAD 请求。
* 请求头中包含适当的缓存验证字段，如 If-Modified-Since、If-None-Match 等。
* 服务器通过验证请求中的缓存验证字段，并确定客户端缓存的资源仍然有效。

HTTP 状态码 304 对于网络请求来说可以被视为一种好的状态码，因为它可以提高性能和效率，减少不必要的数据传输和服务器负载。但需要注意在适当的场景下使用，确保客户端缓存的资源仍然有效且符合预期。

## 400 介绍一下 XMLHTTPRequest 对象【热度: 453】

* created_at: 2023-06-02T16:05:50Z
* updated_at: 2023-06-02T16:05:51Z
* labels: 网络, 百度
* milestone: 高

**关键词**：XMLHTTPRequest 对象、XMLHTTPRequest 特点、XMLHTTPRequest 属性、封装发送 GET 请求

 介绍

XMLHttpRequest 是一个在浏览器中用于发送 HTTP 请求的 JavaScript 对象。它提供了一种在客户端与服务器之间进行数据交互的方式，可以异步地发送请求并获取服务器的响应。

XMLHttpRequest 对象的特点和功能包括：

1. 异步请求：XMLHttpRequest 支持异步请求，可以在后台发送请求并在请求完成后执行回调函数，而不会阻塞浏览器的主线程。
2. 支持多种 HTTP 请求方法：XMLHttpRequest 可以发送多种类型的 HTTP 请求，包括 GET、POST、PUT、DELETE 等。
3. 发送和接收数据：XMLHttpRequest 可以发送数据到服务器并接收服务器的响应数据，支持发送请求时携带的数据和接收到的响应数据的处理。
4. 监听请求状态：XMLHttpRequest 提供了一些事件和方法来监听请求的不同状态，如请求开始、请求完成、请求成功等。
5. 设置请求头：XMLHttpRequest 允许设置请求的头部信息，如 Content-Type、Authorization 等。
6. 处理跨域请求：XMLHttpRequest 支持处理跨域请求，可以通过设置 CORS（跨域资源共享）相关的头部信息来实现跨域请求。
7. 支持上传和下载：XMLHttpRequest 可以用于上传文件到服务器或下载服务器上的文件。

使用 XMLHttpRequest 对象可以实现与服务器的数据交互，发送请求并处理响应数据。通过设置回调函数来处理异步请求的结果，可以根据请求的状态码和响应数据进行相应的处理和展示。

 示范

下面是一个简单的示例代码，展示如何基于 XMLHttpRequest 封装一个发送 GET 请求的函数：

```javascript
function sendGetRequest (url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        // 请求成功
        const response = JSON.parse(xhr.responseText)
        callback(null, response)
      } else {
        // 请求失败
        const error = new Error(`Request failed with status ${xhr.status}`)
        callback(error, null)
      }
    }
  }

  xhr.send()
}

// 使用示例
const apiUrl = 'https://api.example.com/data'
sendGetRequest(apiUrl, (error, response) => {
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Response:', response)
  }
})
```

上述代码定义了一个 `sendGetRequest` 函数，接受一个 URL 和一个回调函数作为参数。在函数内部，创建了一个 XMLHttpRequest 对象，使用 `open` 方法设置请求的类型（GET）、URL 和是否异步。然后，通过监听 `readystatechange` 事件来处理请求的状态变化。

当请求的状态为 `XMLHttpRequest.DONE`（值为 4）时，判断响应的状态码。如果状态码为 200，表示请求成功，将响应数据解析为 JSON 格式并通过回调函数返回。如果状态码不是 200，表示请求失败，将错误信息封装为 Error 对象并通过回调函数返回。

使用示例中，调用了 `sendGetRequest` 函数并传入一个 API 的 URL 和一个回调函数。在回调函数中，根据是否存在错误来处理请求结果。如果有错误，输出错误信息；如果没有错误，输出响应数据。

## 401 ajax 是否支持取消请求

* created_at: 2023-06-02T16:09:51Z
* updated_at: 2023-06-02T16:25:35Z
* labels: 网络, 小米
* milestone: 中

**`xhr.abort()` 方法用于中止当前的请求**。调用该方法会导致 XHR 对象触发 abort 事件，且触发 readystatechange 事件的处理函数，xhr.readyState 的值将变为 0。

下面是一个示例代码，展示了如何使用标志位实现取消请求的效果：

```javascript
let isRequestCanceled = false

function sendGetRequest (url, callback) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && !isRequestCanceled) {
      if (xhr.status === 200) {
        // 请求成功
        const response = JSON.parse(xhr.responseText)
        callback(null, response)
      } else {
        // 请求失败
        const error = new Error(`Request failed with status ${xhr.status}`)
        callback(error, null)
      }
    }
  }

  xhr.send()

  // 取消请求
  function cancelRequest () {
    if (xhr.readyState !== XMLHttpRequest.DONE) {
      xhr.abort()
      isRequestCanceled = true
      callback(new Error('Request canceled'), null)
    }
  }

  // 返回取消请求的函数
  return cancelRequest
}

// 使用示例
const apiUrl = 'https://api.example.com/data'
const cancelRequest = sendGetRequest(apiUrl, (error, response) => {
  if (error) {
    console.error('Error:', error)
  } else {
    console.log('Response:', response)
  }
})

// 取消请求
cancelRequest()
```

在上述示例代码中，添加了一个 `cancelRequest` 函数用于取消请求。该函数会在请求发送后立即返回，并中止请求的发送。同时，将标志位 `isRequestCanceled` 设为 true，并通过回调函数返回一个错误对象，表示请求被取消。

需要注意的是，虽然通过标志位模拟了请求的取消，但实际上请求已经发送到服务器并得到了响应。只是在客户端这边忽略了响应结果。在真实的网络请求中，服务器仍然会继续处理请求并返回响应，但客户端会忽略该响应。

**取消ajax请求的意义**

* 已发出的请求可能仍然会到达后端

* 取消后续的回调处理，避免多余的回调处理，以及特殊情况，先发出的后返回，导致回调中的数据错误覆盖

* 取消loading效果，以及该请求的其他交互效果，特别是在单页应用中，A页面跳转到B页面之后，A页面的请求应该取消，否则回调中的一些处理可能影响B页面

* 超时处理，错误处理等都省去了，节约资源

## 402 使用 ajax 封装一个上传文件的函数【热度: 206】

* created_at: 2023-06-02T16:13:21Z
* updated_at: 2023-06-02T16:13:22Z
* labels: 网络, 美团
* milestone: 中

**关键词**：ajax 上传文件、ajax 上传文件函数、ajax 上传文件封装

下面是一个使用 AJAX 封装的上传文件函数的示例代码：

```javascript
function uploadFile(file, url, progressCallback, successCallback, errorCallback) {
 const xhr = new XMLHttpRequest();
 const formData = new FormData();

 // 将文件添加到 FormData 对象
 formData.append('file', file);

 xhr.open('POST', url, true);

 // 监听上传进度
 xhr.upload.addEventListener('progress', function(event) {
 if (event.lengthComputable) {
 const progress = Math.round((event.loaded / event.total)100);
 // 调用进度回调函数
 progressCallback(progress);
 }
 });

 xhr.onreadystatechange = function() {
 if (xhr.readyState === XMLHttpRequest.DONE) {
 if (xhr.status === 200) {
 // 上传成功
 // 解析响应数据
 const response = JSON.parse(xhr.responseText);
 // 调用成功回调函数
 successCallback(response);
 } else {
 // 上传失败
 // 创建错误对象
 const error = new Error(`File upload failed with status ${xhr.status}`);
 // 调用错误回调函数
 errorCallback(error);
 }
 }
 };

 // 发送请求
 xhr.send(formData);
}

// 使用示例
const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
const progressElement = document.getElementById('progress');
const statusElement = document.getElementById('status');

uploadButton.addEventListener('click', function() {
 const file = fileInput.files[0];
 const url = 'https://api.example.com/upload';
 
 uploadFile(
 file,
 url,
 function(progress) {
 // 更新进度
 progressElement.textContent = `Upload Progress: ${progress}%`;
 },
 function(response) {
 // 上传成功
 statusElement.textContent = 'Upload Successful';
 console.log('Response:', response);
 },
 function(error) {
 // 上传失败
 statusElement.textContent = 'Upload Failed';
 console.error('Error:', error);
 }
 );
});
```

在上述示例代码中，定义了一个 `uploadFile` 函数用于上传文件。该函数接收文件对象、上传 URL、进度回调函数、成功回调函数和错误回调函数作为参数。

函数内部通过创建 `XMLHttpRequest` 对象，将文件添加到 `FormData` 对象，并使用 `POST` 方法发送请求到指定的 URL。同时，通过监听 `upload` 事件来获取上传进度，并调用进度回调函数进行更新。在请求的状态改变时，根据响应状态码判断上传成功与否，并调用相应的回调函数。

使用示例中，通过监听按钮点击事件，获取选择的文件对象，并调用 `uploadFile` 函数进行文件上传。在回调函数中更新进度和状态信息，并处理成功和失败的情况。

## 403 fetch 与 ajax 的区别是什么

* created_at: 2023-06-02T16:17:40Z
* updated_at: 2023-06-02T16:17:41Z
* labels: 网络
* milestone: 中

以下是 Fetch API 与传统的 Ajax（XMLHttpRequest）在几个方面的对比：

| 维度 | Fetch API | Ajax (XMLHttpRequest) |
| ------------ | -------------------------------------------------------------- | ------------------------------------------------------------ |
| API | 提供了更现代化的 API，使用 `fetch()` 方法进行请求 | 使用 `XMLHttpRequest` 对象进行请求 |
| 语法 | 基于 Promise，使用链式调用方式进行请求和处理响应 | 使用回调函数方式处理请求和响应 |
| 跨域支持 | 默认情况下，不发送跨域请求，可以使用 CORS 进行跨域请求 | 可以发送跨域请求，但受到同源策略的限制 |
| 请求类型 | 支持多种请求类型，如 GET、POST、PUT、DELETE 等 | 支持多种请求类型，如 GET、POST、PUT、DELETE 等 |
| 请求头 | 使用 `Headers` 对象设置请求头 | 使用 `setRequestHeader()` 方法设置请求头 |
| 请求体 | 可以直接使用 `FormData`、`Blob`、`URLSearchParams` 等作为请求体 | 可以使用字符串或 `FormData` 对象作为请求体 |
| 取消请求 | 支持使用 `AbortController` 和 `AbortSignal` 取消请求 | 需要手动处理取消请求，如终止 `XMLHttpRequest` 对象 |
| 进度事件 | 提供了更方便的进度事件处理方式，如 `upload` 和 `download` 事件 | 提供了 `progress` 事件用于跟踪请求和下载进度 |
| 错误处理 | 在请求返回时，只在网络错误或请求被中止时才会抛出异常 | 可以根据响应状态码或其他条件来处理错误 |
| JSON 处理 | 提供了 `json()` 方法用于解析 JSON 数据 | 需要手动解析返回的 JSON 数据 |
| 文件上传/下载 | 支持直接上传和下载文件，支持 `Blob` 对象 | 支持通过 `FormData` 和 `responseType` 实现文件上传和下载 |
| 浏览器兼容性 | 部分功能在旧版本浏览器中不支持，需要使用 polyfill 进行兼容性处理 | 在大多数现代浏览器中都支持 |

需要注意的是，Fetch API 是基于 Promise 的，而 Ajax 是基于回调函数的。Fetch API 提供了更现代化、更简洁的语法，并支持更多的功能，如跨域请求、取消请求、进度事件等。然而，由于 Fetch API 是较新的标准，不同浏览器的兼容性可能会有所差异，需要使用 polyfill 或考虑兼容性处理。

## 404 OSI的七层模型是什么

* created_at: 2023-06-04T13:40:51Z
* updated_at: 2023-06-04T13:40:52Z
* labels: 网络
* milestone: 高

 OSI的七层模型是什么

OSI（Open Systems Interconnection）是国际标准化组织（ISO）定义的一个用于网络协议设计的参考模型。它将网络通信的过程分为七个不同的层级，每个层级负责不同的功能和任务，以实现网络通信的可靠性和互操作性。下面是 OSI 模型的七个层级：

1. 物理层（Physical Layer）：处理物理传输介质上的原始比特流，负责传输电子信号、光信号或无线信号等。

2. 数据链路层（Data Link Layer）：负责将物理层提供的比特流划分为数据帧，并处理数据帧之间的传输错误和流控制。

3. 网络层（Network Layer）：负责对数据进行分组、寻址和路由选择，以便在不同的网络之间进行数据传输。

4. 传输层（Transport Layer）：提供端到端的可靠数据传输服务，包括分段、流量控制和错误恢复等。

5. 会话层（Session Layer）：管理不同应用程序之间的通信会话，负责建立、维护和终止会话。

6. 表示层（Presentation Layer）：负责数据的格式化、加密和压缩等操作，以确保应用程序之间的数据交换正确解释和理解。

7. 应用层（Application Layer）：提供网络服务和应用程序之间的接口，包括文件传输、电子邮件、远程登录和网页浏览等。

每个层级在 OSI 模型中具有不同的功能和责任，并且通过定义标准化的协议进行通信。通过将网络通信过程划分为不同的层级，OSI 模型帮助网络工程师和开发人员更好地理解和设计网络协议，实现网络的可扩展性和互操作性。

 有哪些对应的协议

以下是 OSI 模型的七个层级及其对应的一些常见协议的示例：

| 层级 | 协议示例 |
| --------------- | ------------------------------------------------------------ |
| 应用层（Application Layer） | HTTP，FTP，SMTP，POP3，DNS，Telnet，SSH |
| 表示层（Presentation Layer） | JPEG，GIF，PNG，ASCII，UTF-8，MPEG |
| 会话层（Session Layer） | NetBIOS，TLS，RPC，SSH |
| 传输层（Transport Layer） | TCP，UDP，SCTP |
| 网络层（Network Layer） | IP，ICMP，ARP，OSPF，BGP |
| 数据链路层（Data Link Layer） | Ethernet，PPP，MAC，Wi-Fi，HDLC，SLIP |
| 物理层（Physical Layer） | USB，Ethernet电缆，光纤，RJ45接口，无线电频谱 |

请注意，这只是每个层级的一些示例协议，实际使用中可能有更多的协议。此表旨在提供一些常见的协议示例，以便更好地理解每个层级所涉及的通信协议。

## 405 TLS/SSL的工作原理【热度: 499】

* created_at: 2023-06-04T13:47:52Z
* updated_at: 2023-06-04T13:47:53Z
* labels: 网络
* milestone: 高

**关键词**：SSL的工作原理、TLS的工作原理、密钥交换阶段

TLS（Transport Layer Security）和SSL（Secure Sockets Layer）是用于在网络上提供安全通信的协议。TLS是SSL的继任者，但两者通常被混合使用。

TLS/SSL的工作原理如下：

1. 握手阶段（Handshake）：

* 客户端发送一个用于协商加密算法和通信参数的"客户端Hello"消息给服务器。
* 服务器回应一个"服务器Hello"消息，其中包含服务器选择的加密算法和数字证书（包含公钥）。
* 客户端验证服务器的数字证书的合法性，包括验证证书的颁发机构和有效期。
* 客户端生成一个随机的对称加密密钥，使用服务器的公钥进行加密，发送给服务器。
* 服务器使用自己的私钥解密客户端发送的加密密钥。
* 客户端和服务器协商确定加密算法和密钥长度，生成用于后续通信的对称加密密钥。

2. 密钥交换阶段（Key Exchange）：

* 客户端和服务器使用协商好的对称加密密钥进行通信。
* 客户端和服务器之间的数据使用对称加密算法进行加密和解密。

3. 数据传输阶段：

* 客户端和服务器使用协商好的对称加密密钥进行数据传输，确保数据的保密性和完整性。

TLS/SSL的工作原理基于非对称加密和对称加密两种加密算法的结合。非对称加密用于安全地协商对称加密密钥，而对称加密用于实际的数据传输。通过使用数字证书对服务器进行身份验证，并对通信进行加密和认证，TLS/SSL确保了通信的安全性和可靠性。

需要注意的是，TLS/SSL的具体实现可能因应用程序、配置和版本而有所不同，但基本的工作原理和流程是相似的。

## 406 数字证书了解多少【热度: 1,834】

* created_at: 2023-06-04T13:54:09Z
* updated_at: 2023-06-04T13:54:10Z
* labels: 网络
* milestone: 高

**关键词**：数字证书 公钥、数字签名 概念、数字签名详解

 概念

数字证书是一种用于验证和证明网络实体身份的电子文件。它由证书颁发机构（Certificate Authority，CA）或类似的实体签发，并包含了一系列信息，包括公钥、证书持有者的身份信息以及数字签名等。

数字证书通常用于建立安全通信，特别是在使用加密协议（如TLS/SSL）进行数据传输时。以下是数字证书的几个重要组成部分：

1. 公钥：数字证书中包含证书持有者的公钥，用于加密和解密数据。公钥可以与证书持有者进行身份验证，并确保数据的机密性。

2. 证书持有者信息：数字证书中包含证书持有者的身份信息，例如组织名称、组织单位、国家/地区等。这些信息有助于验证证书持有者的身份。

3. 数字签名：数字证书中包含一个数字签名，由证书颁发机构使用其私钥对证书内容进行加密生成。接收方可以使用证书颁发机构的公钥来验证签名的有效性，确保证书的完整性和真实性。

数字证书的验证过程一般涉及以下步骤：

1. 客户端接收到服务器发送的数字证书。
2. 客户端使用证书颁发机构的公钥来解密数字签名，验证证书的完整性。
3. 客户端验证证书颁发机构的信任性，确认其是否为可信任的颁发机构。
4. 客户端验证证书持有者的身份信息，确保与期望的服务器身份匹配。
5. 如果验证成功，客户端可以信任证书中的公钥，用于安全通信的建立。

通过使用数字证书，可以确保通信中的数据传输安全，并防止中间人攻击等安全威胁。

 数字证书的作用

数字证书的主要作用是用于身份验证和安全通信。以下是数字证书的几个重要作用：

1. 身份验证：数字证书可以用于验证网络实体的身份。证书中包含了证书持有者的身份信息和公钥，通过验证证书的有效性，可以确认证书持有者的身份，并确保与其进行安全通信。

2. 安全通信：数字证书在安全通信中起到关键作用。通过使用证书中的公钥，可以进行加密和解密数据，确保数据的机密性。同时，通过数字签名验证证书的完整性，可以防止数据在传输过程中被篡改。

3. 防止中间人攻击：数字证书可以防止中间人攻击。由于证书是由可信任的证书颁发机构签发的，并且包含了数字签名，因此可以确保通信双方之间的身份和通信内容的安全性，防止中间人对通信进行窃听或篡改。

4. 建立信任链：数字证书形成了一个信任链。证书颁发机构（CA）签发的证书被广泛信任，而CA本身的证书也由更高级的CA签发，形成了一个信任链。通过验证证书的有效性，并验证颁发机构的信任性，可以建立起对通信方的信任。

总之，数字证书在互联网通信中起到了重要的作用，确保了身份验证和安全通信的可靠性和安全性。它们被广泛应用于各种场景，如网站的HTTPS通信、电子邮件的加密和签名等。

 数字签名

数字签名是一种用于验证数据完整性和身份认证的技术手段。它基于公钥加密算法和哈希函数，通过对数据进行加密和摘要计算，生成一个与数据相关的数字签名。该数字签名可以用于验证数据在传输过程中是否被篡改，并且可以确认数据的发送者身份。

下面是数字签名的详细解释：

1. 数据摘要：首先，使用哈希函数（如SHA-256）对待签名的数据进行摘要计算。哈希函数将数据输入转换为固定长度的哈希值，该哈希值具有唯一性，即不同的输入数据会产生不同的哈希值。

2. 私钥加密：然后，使用数据发送者的私钥对数据摘要进行加密。私钥是与发送者身份关联的一对密钥中的私有部分，只有发送者拥有。通过使用私钥加密数据摘要，产生了一个数字签名。

3. 数字签名验证：在接收数据的一方，可以使用发送者的公钥来验证数字签名的有效性。公钥是与发送者身份关联的一对密钥中的公共部分，任何人都可以访问。接收方使用公钥解密数字签名，得到解密后的数据摘要。

4. 数据完整性验证：接收方再次使用哈希函数对接收到的原始数据进行摘要计算，得到一个新的摘要值。然后，将接收到的解密后的数据摘要与新计算的摘要值进行比较。如果两个摘要值相同，说明数据在传输过程中没有被篡改，数据完整性得到验证。

5. 发送者身份认证：通过验证数字签名，接收方可以确认数据的发送者身份。由于数字签名是由发送者的私钥加密生成的，只有发送者拥有对应的私钥，所以只有发送者才能正确生成有效的数字签名。

通过数字签名的使用，可以确保数据的完整性和身份认证。即使在数据传输过程中被篡改，接收方可以通过验证数字签名来检测到篡改，并且可以确认数据的发送者身份。这为数据的安全传输和身份验证提供了重要的保障。

## 407 TCP粘包了解多少【热度: 927】

* created_at: 2023-06-04T14:02:58Z
* updated_at: 2023-06-04T14:02:59Z
* labels: 网络, 京东
* milestone: 高

**关键词**：粘包、粘包解决办法

TCP粘包（TCP packet sticking）是指在数据传输过程中，发送方连续发送的若干小数据包被接收方组合成较大的数据块或者多个小数据包粘合在一起接收的现象。

TCP是面向流的传输协议，数据在传输过程中会被拆分成TCP数据段，并在接收方重新组装。由于TCP的流式传输特性，发送方连续发送的多个小数据包可能会在接收方一次性接收，从而导致粘包现象。

TCP粘包的原因主要有以下几点：

1. 发送方连续发送的数据包很小，可能不足以填满一个TCP数据段的大小，导致多个数据包合并在一起发送。

2. 发送方发送数据的速率和接收方处理数据的速率不一致，可能会导致多个数据包在传输过程中一起到达接收方。

TCP粘包可能会导致数据解析错误或者数据处理不准确，影响通信的正确性和性能。为了解决TCP粘包问题，可以采用以下方法：

1. 使用固定长度的数据包：发送方在发送数据前，在数据包中添加固定长度的头部，接收方通过读取固定长度的数据来拆分数据包。

2. 使用特殊字符或者标记符号进行分隔：发送方在数据包之间添加特定的字符或者标记符号作为分隔符，接收方通过识别分隔符来拆分数据包。

3. 使用消息长度字段：发送方在数据包中添加表示消息长度的字段，接收方首先读取消息长度字段，然后根据长度来读取相应长度的数据。

通过采用上述方法，可以有效地解决TCP粘包问题，确保数据在传输过程中的正确性和完整性。

## 408 token过期后，页面如何实现无感刷新【热度: 485】

* created_at: 2023-06-04T14:05:08Z
* updated_at: 2023-06-04T14:05:09Z
* labels: 网络, 网易
* milestone: 中

**关键词**：token过期刷新、token刷新

当 token 过期后，实现无感刷新页面的一种常见方式是使用刷新 token 的机制。下面是一个基本的实现思路：

1. 在前端应用中，使用某种方式（例如 Cookie、Local Storage）存储 token。
2. 在每次发起请求时，通过拦截器或者请求中间件检查 token 是否过期。
3. 如果 token 过期，前端会收到一个特定的响应（例如 HTTP 状态码 401 Unauthorized）。
4. 前端通过监听该特定的响应，触发刷新 token 的操作。
5. 刷新 token 的操作可以是发送一个特定的请求到后端，后端验证并颁发新的 token。
6. 在 token 刷新成功后，前端更新存储的 token，并重新发起之前的请求，确保请求的无感刷新。

需要注意的是，具体的实现可能会因框架和后端 API 的不同而有所差异。上述步骤提供了一个基本的思路，你可以根据实际需求和使用的技术栈进行调整和扩展。

## 409 进程和线程的区别是什么？

* created_at: 2023-06-04T14:11:39Z
* updated_at: 2023-06-04T14:11:40Z
* labels: 网络, Shopee
* milestone: 中

进程（Process）和线程（Thread）是计算机操作系统中的两个核心概念，它们在程序执行和资源管理方面有着不同的特点和作用。下面是它们之间的区别：

1. 定义：进程是程序的一次执行过程，是资源分配的基本单位；线程是进程的一部分，是程序执行的最小单位。

2. 资源拥有：每个进程都拥有独立的内存空间和系统资源，包括文件、设备、网络连接等；而线程是在进程内部共享进程的资源。

3. 调度和执行：操作系统以进程为单位进行调度，给每个进程分配CPU时间片来执行；而线程是进程内部的执行单元，由线程调度器调度执行。

4. 并发性：由于进程拥有独立的内存空间和资源，不同进程之间可以并发执行，相互之间不会影响；而线程是在同一个进程内部执行，多个线程共享进程的资源，因此线程之间需要通过同步机制来保证数据的一致性和安全性。

5. 创建和销毁：创建和销毁进程需要操作系统的参与，而线程的创建和销毁相对较轻量，可以由程序自身来控制。

6. 开销：由于进程拥有独立的资源和内存空间，进程之间切换的开销较大；而线程之间的切换开销较小，因为线程共享进程的资源和内存空间。

总的来说，进程和线程是操作系统中用于实现并发执行的两种基本单位，进程是资源分配的基本单位，而线程是调度和执行的基本单位。它们在资源拥有、调度方式、并发性、创建销毁方式、开销等方面有着明显的区别。在实际应用中，可以根据需求和具体场景选择使用进程或线程来实现并发和多任务处理。

**下面是进程和线程在几个方面的对比表格**：

| 特性 | 进程 | 线程 |
|-------------|---------------------------------------------|---------------------------------------------|
| 定义 | 程序的一次执行过程，是资源分配的基本单位 | 进程的一部分，是程序执行的最小单位 |
| 资源拥有 | 拥有独立的内存空间和系统资源 | 在进程内部共享进程的资源 |
| 调度和执行 | 以进程为单位进行调度，给每个进程分配CPU时间片 | 在进程内部调度执行 |
| 并发性 | 不同进程之间可以并发执行，相互之间不会影响 | 线程在同一个进程内部执行，共享进程的资源 |
| 创建和销毁 | 需要操作系统的参与 | 可以由程序自身来控制 |
| 开销 | 进程切换开销较大 | 线程切换开销较小 |

## 410 在浏览器内多个标签页之间实现通信有哪些方式【热度: 897】

* created_at: 2023-06-04T14:18:40Z
* updated_at: 2023-06-07T15:06:22Z
* labels: 网络, 阿里巴巴
* milestone: 高

**关键词**：跨页面通信、Broadcast Channel API 通信、SharedWorker

 基本通信方式

在浏览器内多个标签页之间实现通信可以通过以下几种方式：

1. 使用 Broadcast Channel API：Broadcast Channel API 是 HTML5 提供的一种跨页面通信的机制。通过该 API，可以在不同的标签页之间发送消息，实现实时的双向通信。

2. 使用 LocalStorage 或 SessionStorage：LocalStorage 和 SessionStorage 是浏览器提供的本地存储机制。可以通过在一个标签页中修改 LocalStorage 或 SessionStorage 中的数据，然后在其他标签页中监听该数据的变化，实现跨标签页的通信。

3. 使用 SharedWorker：SharedWorker 是一种特殊的 Web Worker，可以被多个浏览器标签页所共享。通过 SharedWorker，不同标签页可以通过消息传递进行通信。

4. 使用 Cookies：通过设置同一个域名下的 Cookie，不同的标签页可以共享这些 Cookie 数据。可以在一个标签页中设置 Cookie，然后在其他标签页中读取该 Cookie 实现通信。

5. 使用 Window.postMessage：Window.postMessage 方法可以在不同的浏览器窗口之间进行跨域通信。可以通过在一个窗口中使用 postMessage 方法向其他窗口发送消息，接收窗口通过监听 message 事件来接收并处理消息。

 Broadcast Channel API

Broadcast Channel API 是 HTML5 提供的一种跨页面通信的机制，它可以在同一个域名下的多个浏览器标签页之间进行实时的双向通信。

通过 Broadcast Channel API，你可以创建一个通道（channel），然后不同的标签页可以通过这个通道发送和接收消息。每个标签页都可以监听通道中的消息，并对接收到的消息做出相应的处理。

使用 Broadcast Channel API 实现多页签之间的通信的步骤如下：

1. 创建一个 BroadcastChannel 对象，并指定一个唯一的通道名称：

```javascript
const channel = new BroadcastChannel('channelName')
```

2. 在一个标签页中发送消息：

```javascript
channel.postMessage('message')
```

3. 在其他标签页中监听消息并做出响应：

```javascript
channel.addEventListener('message', event => {
  const message = event.data
  // 处理接收到的消息
})
```

通过 Broadcast Channel API，不同的标签页可以实时地收发消息，从而实现多页签之间的通信。这对于需要在多个标签页之间共享状态、同步数据或实现协作等场景非常有用。请注意，Broadcast Channel API 只在同一域名下的标签页之间有效，不支持跨域通信。

 SharedWorker 实现多页签之间通信

SharedWorker 是 HTML5 提供的一种多页签之间共享的 Web Worker。通过 SharedWorker，多个浏览器标签页可以共享一个后台线程，实现跨页面的通信和数据共享。

下面是一个使用 SharedWorker 实现多页签之间通信的示例：

在一个 JavaScript 文件（worker.js）中创建 SharedWorker：

```javascript
// worker.js

// 在共享 Worker 中监听消息
self.onconnect = function (event) {
  const port = event.ports[0]

  // 接收消息
  port.onmessage = function (event) {
    const message = event.data

    // 处理消息
    // ...

    // 发送消息
    port.postMessage('Response from SharedWorker')
  }

  // 断开连接时的处理
  port.onclose = function () {
    // ...
  }
}
```

在多个页面中分别引入 SharedWorker，并进行通信：

```javascript
// 页面1
var sharedWorker = new SharedWorker('worker.js')

// 获取共享 Worker 的端口
var port = sharedWorker.port

// 发送消息
port.postMessage('Message from Page 1')

// 接收消息
port.onmessage = function (event) {
  const message = event.data

  // 处理接收到的消息
  // ...
}

// 页面2
var sharedWorker = new SharedWorker('worker.js')

// 获取共享 Worker 的端口
var port = sharedWorker.port

// 发送消息
port.postMessage('Message from Page 2')

// 接收消息
port.onmessage = function (event) {
  const message = event.data

  // 处理接收到的消息
  // ...
}
```

以上示例中，`worker.js` 创建了一个 SharedWorker，它会监听来自多个页面的连接请求，并为每个连接创建一个端口（port）。每个页面通过创建 SharedWorker 实例，并通过获取端口对象进行消息的发送和接收。

通过 SharedWorker，页面1和页面2可以实现跨页签的通信。它们可以向共享 Worker 发送消息，并监听共享 Worker 返回的消息，从而实现跨页面的数据交互和共享。

需要注意的是，SharedWorker 需要在支持 SharedWorker 的浏览器中运行，而且需要在服务器环境下运行，即通过 HTTP 或 HTTPS 协议访问页面才能正常工作。

 Window.postMessage 使用示例

`Window.postMessage()` 是 HTML5 提供的一种在不同窗口之间进行跨域通信的方法。它可以安全地向其他窗口发送消息，并在接收方窗口触发消息事件。

下面是一个使用 `postMessage()` 进行跨窗口通信的示例：

在发送消息的窗口中：

```javascript
// 发送消息到目标窗口
window.postMessage('Hello, World!', 'https://example.com')
```

在接收消息的窗口中：

```javascript
// 监听消息事件
window.addEventListener('message', function (event) {
  // 确保消息来自指定域名
  if (event.origin === 'https://example.com') {
    const message = event.data

    // 处理接收到的消息
    console.log('Received message:', message)
  }
})
```

在发送消息的窗口中，使用 `window.postMessage()` 发送消息，第一个参数是要发送的消息内容，第二个参数是目标窗口的源（origin），可以是 URL、域名或通配符 '*'。

在接收消息的窗口中，通过监听 `message` 事件，可以捕获来自其他窗口的消息。在事件处理程序中，通过 `event.origin` 可以判断消息来自哪个域名。可以根据需要进行安全性检查，确保只接收来自指定域名的消息。

需要注意的是，`postMessage()` 通常用于跨窗口通信，可以在不同窗口或不同域名之间进行通信。在使用时需要确保目标窗口的源是可信任的，以防止安全漏洞。同时，接收消息的窗口需要显式地监听消息事件，并进行相应的处理。

## 411 什么是文档的预解析【热度: 1,133】

* created_at: 2023-06-04T14:28:06Z
* updated_at: 2023-06-04T14:28:07Z
* labels: 网络, 腾讯
* milestone: 中

**关键词**：文档预解析

文档的预解析（Document Preloading）是浏览器在解析 HTML 文档时的一个优化技术，用于提前获取页面所需的外部资源，如样式表、脚本、字体等。通过在解析过程中预先获取这些资源，可以加快页面加载速度和渲染时间。

浏览器在解析 HTML 文档时，会遇到外部资源的引用，比如 `<link>` 标签引入的样式表和 `<script>` 标签引入的脚本。在进行实际网络请求获取这些资源之前，浏览器可以通过预解析的方式提前发起请求并获取资源内容。

文档的预解析过程会在 HTML 解析器解析到特定标签时触发，浏览器会检查这些标签是否存在可预解析的资源，然后以异步方式发起请求并下载资源。预解析的资源在下载完成后会被浏览器缓存起来，以便在后续的渲染过程中快速加载和使用。

预解析的好处是减少页面加载时间，因为浏览器可以在主 HTML 文档下载和解析过程中并行获取其他资源，而不需要等待主文档解析完毕才开始下载这些资源。这样可以提高页面的渲染速度和用户体验。

文档的预解析是由浏览器自动完成的优化过程，无需开发人员显式地进行操作。浏览器会根据特定的规则和算法，在解析 HTML 文档的过程中自动触发预解析行为。

**要让浏览器正确进行文档的预解析，可以遵循以下一些最佳实践**：

1. 合理设置资源的引入方式：将样式表放在 `<head>` 标签内，并尽量将脚本放在 `<body>` 标签底部，这样可以使浏览器更早地开始解析和预解析文档的其他部分。

2. 使用合适的资源引入标签：使用 `<link>` 标签来引入样式表，使用 `<script>` 标签来引入脚本文件，这样可以让浏览器更容易识别和处理这些资源的预解析。

3. 合理设置资源的属性和关联：为 `<link>` 标签设置 `rel` 属性，用于指定资源的关联关系，如 `stylesheet` 表示关联的是样式表；为 `<script>` 标签设置 `async` 或 `defer` 属性，用于控制脚本的执行时机。

4. 减少不必要的资源引入：避免引入无用的外部资源，减少需要预解析的资源数量，可以提高预解析的效果。

5. 合理配置服务器响应头：使用适当的缓存策略和 HTTP 响应头，可以帮助浏览器更好地处理资源的预解析和缓存。

需要注意的是，浏览器在进行文档预解析时会根据具体的算法和策略进行优化，不同浏览器可能会有略微不同的行为。此外，预解析并不一定在所有情况下都能带来明显的性能提升，具体效果会受到网络环境、服务器响应时间和页面结构等因素的影响。因此，在实际开发中，除了依赖浏览器的自动预解析外，还可以采用其他优化手段，如合并和压缩资源、使用缓存等，以提升页面加载和渲染的性能。

## 412 什么是同源策略【热度: 1,430】

* created_at: 2023-06-04T14:31:40Z
* updated_at: 2023-06-04T14:31:41Z
* labels: 网络, 百度
* milestone: 初

**关键词**：同源策略限制了什么资源

同源策略（Same-Origin Policy）是一种浏览器安全机制，用于限制不同源（域名、协议、端口）之间的交互。它是一种重要的安全措施，用于保护用户的隐私和安全，防止恶意网站通过跨域请求获取用户的敏感信息或进行恶意操作。

同源策略要求网页资源（如JavaScript、CSS、图片等）只能与来源相同的资源进行交互，即只能与相同域名、相同协议和相同端口的资源进行通信。例如，一个网页加载自`https://www.example.com`域名下的资源，就只能与同一域名下的其他资源进行交互，无法直接访问其他域名的资源。

同源策略主要限制了以下几种行为：

1. DOM访问限制：不同源的页面无法通过JavaScript等方式直接访问对方的DOM元素，即无法获取或修改对方页面的内容。

2. Cookie、LocalStorage和IndexDB限制：不同源的页面无法读取对方设置的Cookie、LocalStorage和IndexDB存储。

3. AJAX请求限制：XMLHttpRequest、Fetch等网络请求在跨域时受到限制，通常无法发送跨域请求。

同源策略的存在有效地防止了跨站脚本攻击（XSS）和跨站请求伪造（CSRF）等安全威胁。如果需要在不同源之间进行数据交互，可以通过服务器端的代理或使用CORS（跨源资源共享）等技术来实现。

**需要注意的是，同源策略只是浏览器的安全策略之一，而并非所有的网络请求都受到同源策略的限制。例如，通过`<script>`标签引入的外部JavaScript文件、通过`<img>`标签加载的图片等资源是不受同源策略限制的。此外，一些特定的标记，如`<a>`标签的`href`属性和`<form>`标签的`action`属性，也存在一些允许跨域的规则**。

## 413 什么是正向代理，反向代理【热度: 1,294】

* created_at: 2023-06-04T14:38:13Z
* updated_at: 2023-06-04T14:38:14Z
* labels: 网络, 小米
* milestone: 高

**关键词**：正向代理反向代理概念

 概念

正向代理（Forward Proxy）和反向代理（Reverse Proxy）都是常见的代理服务器架构，用于在客户端与目标服务器之间进行中转和处理请求的工作。它们的区别在于代理的位置和作用方式不同。

1. 正向代理：

* 代理位于客户端与目标服务器之间，代理服务器充当客户端的代表。
* 客户端发起请求时，请求首先发送给正向代理服务器，然后由代理服务器转发请求给目标服务器，目标服务器将响应返回给代理服务器，最后代理服务器再将响应返回给客户端。
* 客户端并不直接与目标服务器通信，而是通过正向代理服务器进行中转。
* 正向代理常用于客户端访问互联网，提供一些特定的服务，如匿名访问、访问控制、缓存、安全性等。

2. 反向代理：

* 代理位于目标服务器与客户端之间，代理服务器充当目标服务器的代表。
* 客户端发起请求时，请求直接发送给反向代理服务器，然后由代理服务器根据配置和负载均衡策略，将请求转发给后端的目标服务器。
* 客户端并不知道实际提供服务的是哪个目标服务器，而是与反向代理服务器进行通信。
* 反向代理常用于负载均衡、高可用性、安全性等方面，可以隐藏后端服务器的真实信息，并提供更好的性能和可扩展性。

 区别

下面是正向代理和反向代理的区别以及它们的特点，用表格形式表示：

| 特点 | 正向代理 | 反向代理 |
|------------------|------------------------------|------------------------------|
| 位置 | 位于客户端与目标服务器之间 | 位于目标服务器与客户端之间 |
| 代理角色 | 代理服务器充当客户端的代表 | 代理服务器充当目标服务器的代表|
| 通信流向 | 客户端 -> 代理服务器 -> 目标服务器 | 客户端 -> 代理服务器 -> 目标服务器 |
| 目的 | 隐藏客户端的真实信息，提供访问控制、缓存、安全性等 | 隐藏目标服务器的真实信息，提供负载均衡、高可用性、安全性等 |
| 请求方式 | 客户端发起请求给代理服务器，代理服务器转发请求给目标服务器 | 客户端发起请求给代理服务器，代理服务器根据配置和负载均衡策略转发请求给目标服务器 |
| 客户端感知 | 客户端知道自己使用了代理服务器 | 客户端不知道实际提供服务的是哪个目标服务器 |
| 目标服务器感知 | 目标服务器感知到代理服务器的存在 | 目标服务器不感知客户端使用了反向代理 |
| 应用场景 | 客户端访问互联网，提供匿名访问、访问控制、缓存等特定服务 | 负载均衡、高可用性、安全性、隐藏真实服务器信息等 |
| 示例 | 企业内网用户通过代理服务器访问互联网 | 多个服务器集群通过反向代理提供服务 |

这个表格总结了正向代理和反向代理的一些基本特点和区别，以及它们在网络通信中的应用场景。需要根据具体的需求和场景来选择适合的代理方式。

**总结**：
正向代理位于客户端与目标服务器之间，代理服务器充当客户端的代表；反向代理位于目标服务器与客户端之间，代理服务器充当目标服务器的代表。正向代理隐藏了客户端的真实信息，反向代理隐藏了目标服务器的真实信息。它们的作用和使用场景不同，但都能提供一定程度的代理和中转功能，增加了网络通信的灵活性和安全性。

## 415 css 隐藏元素的方法有哪些【热度: 1,076】

* created_at: 2023-06-06T14:34:22Z
* updated_at: 2023-06-06T14:34:23Z
* labels: CSS
* milestone: 初

**关键词**：隐藏元素

有多种方法可以隐藏元素的CSS。

1. `display: none;`：将元素完全隐藏，不占据任何空间。
2. `visibility: hidden;`：将元素隐藏，但仍占据空间。
3. `opacity: 0;`：将元素透明化，但仍占据空间。
4. `position: absolute; left: -9999px;`：将元素定位到屏幕外部，不显示在可见区域。
5. `height: 0; width: 0; overflow: hidden;`：将元素高度和宽度设为0，同时隐藏溢出内容。
6. `clip-path: polygon(0 0, 0 0, 0 0);`：使用剪切路径将元素隐藏。

这些方法可以根据具体的需求选择合适的方式来隐藏元素。使用 `display: none;` 是最常见和常用的隐藏元素的方法，它会完全移除元素并且不占据页面空间。而其他方法则可以根据需要在元素隐藏的同时保留占位空间或其他特殊效果。

**`display: none;`、`visibility: hidden;` 和 `opacity: 0;` 区别是啥**

`display: none;`、`visibility: hidden;` 和 `opacity: 0;` 是用于隐藏元素的CSS属性，它们之间有一些区别：

1. `display: none;`：该属性会完全移除元素，并且不占据页面空间。隐藏后的元素在文档流中不可见，也不会影响其他元素的布局。相当于元素被完全移除了，无法通过任何方式找到它。当需要彻底从页面中移除元素时，可以使用该属性。

2. `visibility: hidden;`：该属性会将元素隐藏，但仍然占据页面空间。隐藏后的元素在文档流中保留了位置，仅仅是不可见了。元素隐藏后不会影响其他元素的布局。可以通过JavaScript或其他方式找到该元素，并且可以在需要时将其重新显示。

3. `opacity: 0;`：该属性将元素设置为完全透明。元素仍然占据页面空间，但是不可见。透明元素在文档流中保留位置，并且不会影响其他元素的布局。可以通过JavaScript或其他方式找到该元素，并在需要时将其重新设置为可见。

综上所述，`display: none;` 完全移除元素并且不占据空间，`visibility: hidden;` 保留元素位置但不可见，`opacity: 0;` 使元素透明但仍然占据空间。根据具体需求选择合适的属性来隐藏元素。

## 416 css 中 伪元素和伪类的区别和作用【热度: 429】

* created_at: 2023-06-06T14:38:06Z
* updated_at: 2023-06-06T14:38:06Z
* labels: CSS
* milestone: 中

**关键词**：伪元素和伪类

伪元素和伪类是 CSS 中用于选择和样式化元素的特殊标记，它们有一些区别和不同的作用。

伪元素（Pseudo-Element）：

* 表示文档中不存在的元素，用于在元素的特定位置插入样式化内容。
* 通过双冒号 `::` 来表示，例如 `::before`、`::after`。
* 可以使用伪元素为元素添加额外的内容、样式或装饰，如插入文本、图标、边框等。
* 通过 `content` 属性设置伪元素的内容。
* 伪元素在文档中并不存在，因此无法通过 JavaScript 直接操作它们。

伪类（Pseudo-Class）：

* 表示元素在特定状态下的样式，例如鼠标悬停、被点击、处于某个状态等。
* 通过单冒号 `:` 来表示，例如 `:hover`、`:active`。
* 用于选择符合特定条件的元素，如选择第一个子元素、选择奇偶行等。
* 伪类通过 CSS 规则选择元素的特定状态或条件来应用样式，与元素本身相关。
* 伪类可以通过 JavaScript 动态地添加或移除，以改变元素的状态。

总结：

* 伪元素用于创建不存在于文档结构中的元素，并为其添加样式化内容。
* 伪类用于选择元素的特定状态或条件，并为其应用样式。
* 伪元素使用双冒号 `::` 表示，伪类使用单冒号 `:` 表示。
* 伪元素在文档中并不存在，而伪类选择的是实际存在的元素。

使用伪元素和伪类可以在 CSS 中实现更多的样式化效果和交互行为，使页面更加丰富和动态。

## 417 CSS3 中有哪些新特性【热度: 1,102】

* created_at: 2023-06-06T14:45:05Z
* updated_at: 2023-06-06T14:45:47Z
* labels: CSS
* milestone: 中

CSS3引入了许多新特性和模块，以下是一些常见的CSS3新特性：

1. 选择器增强：

* 属性选择器：支持更多的属性选择器，如属性值前缀、后缀、包含等。
* 伪类选择器：引入了新的伪类选择器，如`:nth-child()`、`:nth-of-type()`等。

2. 盒子模型：

* 边框圆角（border-radius）：可以设置元素的边框圆角。
* 阴影效果（box-shadow）：可以为元素添加阴影效果。
* 盒子大小（box-sizing）：可以调整盒子模型的尺寸计算方式。

3. 背景和渐变：

* 线性渐变（linear-gradient）：可以创建水平或垂直方向的渐变背景。
* 径向渐变（radial-gradient）：可以创建从一个中心点向外扩散的渐变背景。

4. 文字和字体：

* @font-face：允许在网页中引用自定义字体文件。
* 文字阴影（text-shadow）：可以为文字添加阴影效果。
* 多列文字（columns）：可以创建多列布局的文字。

5. 过渡和动画：

* 过渡效果（transition）：可以实现元素在不同状态之间的平滑过渡。
* 关键帧动画（@keyframes）：可以定义动画的关键帧和动画效果。
* 动画属性（animation）：用于指定动画的持续时间、重复次数等属性。

6. 弹性布局（Flexbox）：

* 引入了弹性布局模型，使元素在容器中的布局更加灵活和自适应。

7. 响应式布局（Media Queries）：

* 可以根据不同的媒体查询条件应用不同的样式，实现响应式布局。

8. 变换和变形：

* 2D变换（transform）：可以对元素进行平移、旋转、缩放等变换操作。
* 3D变换（transform）：可以实现元素的三维空间变换效果。

9. 过滤器（Filter）：

* 可以应用各种视觉效果和图像处理效果，如模糊、亮度、对比度等。

10. 多列布局（Multicolumn Layout）：

* 可以将内容分为多列进行布局。

以上只是 CSS3 中的一些常见新特性，还有许多其他的新特性和模块，使得开发者可以更加灵活和高效地进行样式设计和布局。

## 418 postcss 是什么，作用是啥？【热度: 1,155】

* created_at: 2023-06-06T14:59:03Z
* updated_at: 2023-06-06T14:59:03Z
* labels: CSS
* milestone: 中

**关键词**：postcss 作用、css 预处理、css 模块化

 概念与作用

PostCSS 是一个用 JavaScript 编写的工具，用于对 CSS 进行转换和处理。它可以通过插件机制对 CSS 进行各种自定义的转换操作，从而扩展 CSS 的功能和语法。

PostCSS 的作用主要有以下几个方面：

1. CSS 预处理器：PostCSS 可以像 Sass 或 Less 一样用于编写更简洁、可维护的 CSS 代码。通过使用类似于变量、嵌套、Mixin 等功能，可以提高 CSS 开发的效率和灵活性。

2. 自动添加浏览器前缀：PostCSS 可以根据配置自动为 CSS 属性添加适应不同浏览器的前缀，解决浏览器兼容性问题。

3. CSS 模块化：PostCSS 可以使用类似于 CSS Modules 的功能，将 CSS 代码分割为独立的模块，避免样式冲突，提供更好的可维护性和代码复用性。

4. 代码优化和压缩：PostCSS 提供了一些插件，可以对 CSS 代码进行优化和压缩，减小文件大小，提高加载性能。

5. 编写自定义插件：PostCSS 的插件机制非常灵活，可以根据项目需求编写自定义的插件，进行各种 CSS 转换和处理操作，如自定义属性、自定义函数等。

可以用于增强 CSS 的能力，并提供更好的开发体验和效果优化。它的灵活性和可扩展性使得开发者可以根据项目需求选择和定制相应的插件，实现对 CSS 的定制化处理。

 postcss css 模块化 和 css-loader 模块化有什么区别？

PostCSS 的 CSS 模块化和 css-loader 的模块化是两种不同的概念和实现方式。

1. CSS 模块化 (PostCSS): CSS 模块化是指使用 PostCSS 插件或工具来实现将 CSS 代码拆分为独立的模块，以解决样式冲突和提供更好的可维护性和代码复用性。通过使用类似于 CSS Modules 的功能，每个模块都有自己的作用域，样式定义不会影响其他模块，同时还可以通过类似于变量、嵌套、Mixin 等功能来增强 CSS 的编写能力。CSS 模块化通常需要使用 PostCSS 插件，如 postcss-modules、css-modules 等。

2. CSS 模块化 (css-loader): css-loader 是 Webpack 生态系统中的一个模块化工具，用于处理 CSS 文件。它的模块化功能是通过将 CSS 文件转换为 JavaScript 模块来实现的。每个 CSS 类名都被转换为一个唯一的标识符，以确保样式的唯一性和隔离性。在使用 css-loader 时，需要将 CSS 文件引入 JavaScript 模块中，并通过 JavaScript 代码来操作样式。

区别：

* PostCSS 的 CSS 模块化是在 CSS 层面上进行的，通过插件的方式对 CSS 代码进行拆分和处理，提供更好的作用域隔离和编写能力。
* css-loader 的模块化是在构建工具层面上进行的，将 CSS 文件转换为 JavaScript 模块，通过 JavaScript 代码来操作样式。
* PostCSS 的 CSS 模块化更加灵活，可以根据项目需求选择和定制相应的插件来实现不同的功能。
* css-loader 的模块化是集成在 Webpack 构建流程中的一部分，与模块化开发紧密结合，适用于前端项目的构建和打包过程。

## 419 css 栅格布局是什么，如何实现【热度: 368】

* created_at: 2023-06-06T15:04:55Z
* updated_at: 2023-06-06T15:04:56Z
* labels: CSS
* milestone: 中

**关键词**：栅格布局、grid 布局

CSS 栅格布局是一种用于创建响应式网格系统的布局技术。它基于将页面分为等宽的列，并使用行来组织内容。栅格布局提供了一种灵活的方式来创建自适应的网格布局，以便在不同屏幕尺寸和设备上显示良好。

实现 CSS 栅格布局的方法有多种，以下是一种常见的实现方式：

1. HTML 结构：使用 `<div>` 元素创建栅格布局的容器，并在容器内添加栅格列元素。

```html
<div class="grid-container">
 <div class="grid-item">Item 1</div>
 <div class="grid-item">Item 2</div>
 <div class="grid-item">Item 3</div>
 <!-- ... -->
</div>
```

2. CSS 样式：为容器和栅格列元素定义样式。

```css
.grid-container {
 display: grid;
 grid-template-columns: repeat(3, 1fr); // 创建三列，每列等宽 */
 gap: 10px; // 列之间的间隔 */
}

.grid-item {
 background-color: #ccc;
 padding: 10px;
}
```

上述示例中，通过设置 `display: grid;` 将容器设为栅格布局。使用 `grid-template-columns` 定义栅格的列数和宽度，这里使用 `repeat(3, 1fr)` 表示创建三列，每列宽度相等。通过 `gap` 属性设置列之间的间隔。栅格列元素则可以按需添加，根据需要进行样式设置。

通过以上方式，可以快速实现简单的 CSS 栅格布局。根据实际需求，还可以添加更多的样式和调整布局参数，如自适应布局、媒体查询等，以适应不同的屏幕尺寸和设备。

## 420 详细介绍一下 CSS Grid 布局【热度: 370】

* created_at: 2023-06-06T15:10:14Z
* updated_at: 2023-06-06T15:10:15Z
* labels: CSS
* milestone: 中

**关键词**：栅格布局、grid 布局

CSS Grid 布局是一种强大的二维网格布局系统，它允许开发者以更灵活的方式创建复杂的网页布局。通过将页面划分为行和列，开发者可以精确控制元素的位置和尺寸，并在不同屏幕尺寸下实现响应式布局。

以下是 CSS Grid 布局的一些关键概念和特性：

1. 网格容器（Grid Container）：使用 `display: grid;` 将一个元素设置为网格容器。它是网格布局的父元素，内部的子元素将参与布局。

2. 网格项目（Grid Item）：网格容器中的子元素称为网格项目。每个网格项目可以占据一个或多个网格单元，形成网格布局。

3. 网格行（Grid Row）和网格列（Grid Column）：网格布局由行和列组成。通过定义网格行和网格列，可以将网格划分为不同的区域。

4. 网格单元（Grid Cell）：网格单元是网格中的每个交叉点，形成的矩形区域。网格项目可以跨越多个网格单元。

5. 网格线（Grid Line）：网格线是划分网格行和网格列的线条。可以通过指定网格线的位置和名称来控制布局。

6. 网格轨道（Grid Track）：网格轨道是相邻网格线之间的空间，用于确定网格单元的尺寸和位置。

通过使用 CSS 属性和值，可以对网格布局进行进一步控制，例如：

* `grid-template-rows` 和 `grid-template-columns`：用于定义网格的行和列的大小和数量。
* `grid-gap`：用于设置网格行和列之间的间隔。
* `grid-auto-rows` 和 `grid-auto-columns`：用于定义自动创建的行和列的大小。
* `grid-template-areas`：用于定义网格布局的区域和位置。
* `grid-column-start`、`grid-column-end`、`grid-row-start` 和 `grid-row-end`：用于控制网格项目在网格中的位置。

CSS Grid 布局的优势包括：

* 灵活的布局：通过定义网格行和列，可以实现复杂的布局需求，如等宽列、自适应布局、多列换行等。
* 响应式设计：可以使用媒体查询和自动调整来实现在不同屏幕尺寸下的布局变化。
* 简化的嵌套布局：与传统的 float 和 position 布局相比，CSS Grid 布局可以更轻松地实现多层嵌套的布局。
* 对齐和对称：通过对网

格行和列进行对齐和调整，可以实现元素的水平和垂直对齐，以及对称布局。

总之，CSS Grid 布局为开发者提供了更强大、灵活和直观的布局工具，使网页布局更加简单和可控，同时具备响应式和可扩展性。

当涉及到 CSS Grid 布局的属性和值时，以下是一些常用的属性和相应的作用的表格示例：

下面是CSS Grid布局中常用的属性和值，以及它们的作用：

| 属性 | 值 | 作用 |
|-----------------------|---------------------------------------|------------------------------------------------------------|
| `display` | `grid` | 将元素设置为网格容器 |
| `grid-template-rows` | `value` | 定义网格的行的大小和数量 |
| `grid-template-columns` | `value` | 定义网格的列的大小和数量 |
| `grid-gap` | `length` or `percentage` | 设置网格行和列之间的间距 |
| `grid-auto-rows` | `value` | 定义自动创建的行的大小 |
| `grid-auto-columns` | `value` | 定义自动创建的列的大小 |
| `grid-template-areas` | `none`, `name`, `row`, `column`, `.` | 定义网格布局的区域和位置 |
| `grid-column-start` | `line`, `span n`, `auto` | 控制网格项目的开始列位置 |
| `grid-column-end` | `line`, `span n`, `auto` | 控制网格项目的结束列位置 |
| `grid-row-start` | `line`, `span n`, `auto` | 控制网格项目的开始行位置 |
| `grid-row-end` | `line`, `span n`, `auto` | 控制网格项目的结束行位置 |
| `justify-items` | `start`, `end`, `center`, `stretch` | 水平方向上设置网格项目的对齐方式 |
| `align-items` | `start`, `end`, `center`, `stretch` | 垂直方向上设置网格项目的对齐方式 |
| `justify-content` | `start`, `end`, `center`, `stretch`, `space-between`, `space-around` | 设置网格容器内网格项目在主轴上的对齐方式 |
| `align-content` | `start`, `end`, `center`, `stretch`, `space-between`, `space-around` | 设置网格容器内网格项目在交叉轴上的对齐方式 |
| `grid-template` | `none`, `name`, `row`, `column`, `.` | 一个简写属性，可以同时设置`grid-template-rows`和`grid-template-columns`属性 |
| `grid-auto-flow` | `row`, `column`, `dense` | 设置自动布局算法和顺序 |

这些属性和值可以用于创建网格布局，并控制网格项目在网格中的位置和尺寸。通过定义网格的行和列，以及对齐方式，可以实现灵活的网页布局。可以通过设置网格的大小、间距和自动创建行列等属性，实现不同的布局需求。同时，通过调整网格项目的起始和结束位置，以及对齐方式，可以精确控制元素在网格中的放置方式。

## 421 html 元素节点上， 有多个 class 名称，这几个class 名称对应的样式渲染优先级是如何的？【热度: 769】

* created_at: 2023-06-06T15:16:07Z
* updated_at: 2023-06-06T15:16:08Z
* labels: CSS
* milestone: 中

**关键词**：class 名称样式优先级

当一个HTML元素节点上有多个class名称，并且这些class名称对应的样式存在冲突时，CSS的渲染优先级遵循以下规则：

1. 内联样式（Inline Styles）具有最高优先级。如果在元素节点的style属性中定义了内联样式，它将覆盖所有其他样式规则。

2. 如果多个class名称对应的样式规则具有相同的优先级，将根据它们在HTML文档中出现的顺序进行应用。后面出现的样式规则将覆盖先前出现的规则。

3. 如果不同class名称对应的样式规则具有不同的优先级，将根据选择器的权重来决定应用的样式规则。选择器的权重由选择器类型、选择器的组合和使用的选择器数量等因素确定。一般而言，ID选择器的权重最高，然后是类选择器和属性选择器，最后是元素选择器和伪类选择器。

总结起来，多个class名称对应的样式渲染优先级主要受到样式规则的具体定义和选择器的权重影响。如果样式规则具有相同的优先级，则根据它们在HTML文档中的出现顺序进行应用。如果样式规则具有不同的优先级，则根据选择器的权重来决定应用的样式规则。

## 422 如何避免全局样式污染？【热度: 744】

* created_at: 2023-06-06T15:20:15Z
* updated_at: 2023-06-06T15:20:16Z
* labels: CSS
* milestone: 中

**关键词**：避免样式污染、css 模块化

**要避免全局样式污染，可以采取以下几种方式**：

1. 使用命名约定：给不同组件、模块或页面的样式类名添加特定的前缀，以确保它们的作用范围只在对应的组件、模块或页面内生效。例如，使用 BEM（Block Element Modifier）命名约定可以将样式类名划分为块、元素和修饰符，以实现更明确的样式隔离。

2. 使用 CSS-in-JS：使用 CSS-in-JS 技术，将样式直接与组件绑定，可以避免全局样式的冲突。每个组件都有自己的样式定义，不会影响其他组件。

3. 使用 CSS Modules：CSS Modules 是一种 CSS 模块化的解决方案，它通过将 CSS 文件与组件绑定，在构建过程中自动生成唯一的类名，从而实现样式的局部作用域。这样可以避免全局样式冲突。

4. 使用作用域限定符：使用 CSS 预处理器（如 Sass 或 Less）的作用域限定符（如父选择器 `&`）来限制样式的作用范围。通过嵌套样式规则，并使用作用域限定符，可以确保样式仅应用于特定的父元素。

5. 使用样式重置/规范：使用样式重置或规范库，如 Normalize.css，可以消除浏览器默认样式的差异，以确保在不同浏览器下呈现一致的样式，并避免全局样式污染。

6. 使用模块化开发框架：使用诸如 React、Vue 或 Angular 等模块化开发框架，它们提供了组件化的开发模式，每个组件具有独立的样式作用域，可以避免全局样式的冲突。

**有哪些工具库可以帮助避免全局样式污染**

以下是一些常用的工具库和技术，可以帮助避免全局样式污染：

1. CSS Modules：CSS Modules 是一种 CSS 模块化的解决方案，可以将样式文件与组件绑定，生成唯一的类名，实现样式的局部作用域。常见的 CSS Modules 实现包括 webpack 的 css-loader 和 vue-style-loader。

2. CSS-in-JS：CSS-in-JS 是一种将 CSS 样式直接写在 JavaScript 代码中的技术，通过将样式与组件绑定，可以实现样式的局部作用域。常见的 CSS-in-JS 工具库有 styled-components、Emotion、Vue的 scoped CSS 等。

3. BEM（Block Element Modifier）命名约定：BEM 是一种命名约定，通过给样式类名添加特定前缀来区分不同组件或元素的样式。使用 BEM 命名约定可以避免样式类名冲突，实现样式的隔离。

4. CSS Reset/Normalize：CSS Reset 或 Normalize.css 是一种重置或规范化浏览器默认样式的方法，通过统一浏览器样式差异，避免全局样式污染。

5. PostCSS 插件：PostCSS 是一个强大的 CSS 处理工具，可以通过使用各种插件来帮助避免全局样式污染。例如，postcss-modules 可以将样式文件转换为 CSS Modules 格式，postcss-preset-env 可以根据目标浏览器自动添加前缀。

6. CSS 预处理器：CSS 预处理器如 Sass 或 Less 提供了作用域限定符和嵌套样式规则的功能，可以帮助限制样式的作用范围，避免全局样式冲突。

这些工具库和技术可以根据项目需求选择适合的方式来避免全局样式污染。每种方式都有其优势和适用场景，根据个人偏好和项目特点选择合适的工具库和技术进行开发。

## 423 能弄个markdown文档吗

* created_at: 2023-06-07T02:31:44Z
* updated_at: 2023-06-08T16:16:41Z
* labels:
* milestone:

如题

## 424 src和href的区别是什么？【热度: 1,601】

* created_at: 2023-06-07T14:37:28Z
* updated_at: 2023-06-07T14:37:29Z
* labels: 浏览器
* milestone: 初

**关键词**：src和href的区别

`src` 和 `href` 是两个在 HTML 中常用的属性，它们具有不同的作用和用途，主要区别如下：

1. 用途：

* `src` 属性用于指定嵌入资源的 URL，如图片、音频、视频等。
* `href` 属性用于创建超链接，定义链接到的目标 URL 地址。

2. 资源加载：

* `src` 属性用于指定需要加载的资源，浏览器会根据 `src` 属性的值去请求资源，并将其嵌入到文档中。例如，`<img>`、`<script>`、`<iframe>` 等标签使用 `src` 属性加载外部资源。
* `href` 属性用于指定链接的目标 URL，通过点击链接，浏览器会导航到指定的 URL 地址。例如，`<a>`、`<link>`、`<link rel="stylesheet">` 等标签使用 `href` 属性创建超链接或引入外部样式表。

3. 标签使用：

* `src` 属性主要用于嵌入资源的标签，如 `<img>`、`<script>`、`<audio>`、`<video>` 等。
* `href` 属性主要用于超链接标签，如 `<a>`，以及用于引入外部资源的标签，如 `<link>`。

4. 加载顺序：

* `src` 属性的资源会按照标签在文档中的顺序依次加载，其中某些标签可能会阻塞页面的渲染，比如 `<script>` 标签会阻塞页面的解析和渲染。
* `href` 属性的资源加载不会阻塞页面的解析和渲染，通常用于引入外部样式表或字体等。

总结：

* `src` 属性用于嵌入资源的标签，指定需要加载的资源。
* `href` 属性用于创建超链接的标签，指定链接的目标 URL 或引入外部资源的 URL。

需要根据具体的使用场景和标签来选择使用 `src` 还是 `href` 属性。

## 425 iframe 标签有那些优点和缺点？【热度: 411】

* created_at: 2023-06-07T14:41:56Z
* updated_at: 2023-06-07T14:41:57Z
* labels: 浏览器
* milestone: 中

**关键词**：iframe优点、iframe缺点、iframe应用

`<iframe>` 标签是 HTML 中的内嵌框架元素，它具有一些优点和缺点，如下所示：

优点：

1. 分隔内容：`<iframe>` 允许将不同的 HTML 文档嵌入到当前文档中，实现内容的分隔和独立。每个 `<iframe>` 都有自己的文档上下文，可以在不同的 `<iframe>` 中加载和操作不同的内容。
2. 并行加载：每个 `<iframe>` 是独立的，可以并行加载，这样可以提高页面加载速度和性能。
3. 代码隔离：`<iframe>` 中的内容与主页面的内容相互隔离，可以避免一些 CSS 样式或 JavaScript 代码的冲突，提高代码的可维护性和可靠性。
4. 安全性：由于 `<iframe>` 是独立的文档上下文，可以用于实现一些安全隔离的措施，例如加载来自不可信源的内容，可以将其放置在 `<iframe>` 中，以保护主页面的安全性。

缺点：

1. SEO 不友好：搜索引擎对 `<iframe>` 中的内容索引能力较弱，可能影响页面的搜索引擎优化。
2. 高度难以控制：`<iframe>` 的高度默认会根据内容的高度自动调整，如果内容高度动态变化，可能导致页面布局出现问题。
3. 页面性能：每个 `<iframe>` 都会增加页面的请求量和渲染成本，特别是当页面中存在大量的 `<iframe>` 时，会影响页面的性能。
4. 安全性风险：如果在 `<iframe>` 中加载来自不受信任的源的内容，可能存在安全风险，例如跨域脚本攻击（XSS）。

**应用场景**

`<iframe>` 元素在以下场景中常被使用：

1. 嵌入其他网页：通过 `<iframe>` 可以将其他网页嵌入到当前页面中。这在一些需要展示其他网页内容的情况下非常有用，例如嵌入地图、视频、社交媒体小部件等。

2. 广告展示：广告平台通常会提供 `<iframe>` 代码片段，用于在页面上嵌入广告内容。这样可以实现广告与页面的分离，保持页面结构简洁，并且提供安全隔离，防止广告脚本对页面产生负面影响。

3. 安全隔离：通过将不受信任的内容放置在 `<iframe>` 中，可以实现安全隔离，防止不受信任的内容对主页面进行攻击。这在加载来自第三方或不可信任源的内容时非常有用。

4. 无刷新文件上传：在需要实现文件上传的场景中，可以使用 `<iframe>` 创建一个隐藏的表单，并通过该表单实现文件上传操作。由于 `<iframe>` 的独立上下文，可以实现无刷新上传，同时避免页面刷新带来的不良用户体验。

5. 跨域通信：通过使用 `<iframe>` 和窗口通信 API（如 `postMessage`），可以实现跨域的安全通信。这在需要在不同域之间进行数据交互或嵌入第三方内容时非常有用。

请注意，尽管 `<iframe>` 在上述场景中有用，但也要注意潜在的性能问题、安全风险以及对 SEO 的影响。因此，在使用 `<iframe>` 时需要谨慎权衡利弊，并根据具体需求选择适当的解决方案。

## 426 HTML5 drag(拖拽) API 了解多少【热度: 324】

* created_at: 2023-06-07T14:47:14Z
* updated_at: 2023-06-07T14:47:15Z
* labels: 浏览器
* milestone: 中

**关键词**：drag 拖拽 api、拖拽 api

 api

HTML5 Drag API 提供了一组用于实现拖放操作的接口和事件。以下是 HTML5 Drag API 中常用的一些接口和事件：

1. `draggable` 属性：将元素设置为可拖动。可以通过设置元素的 `draggable` 属性为 `true` 或 `false` 来控制元素是否可以被拖动。

2. `ondragstart` 事件：拖动操作开始时触发的事件，通常在此事件中设置被拖动的数据类型和数据内容。

3. `ondrag` 事件：拖动过程中持续触发的事件，可以在此事件中进行一些自定义的操作，如实时更新拖动元素的位置。

4. `ondragend` 事件：拖动操作结束时触发的事件，通常在此事件中执行一些清理操作，如移除拖动时设置的样式。

5. `ondragenter` 事件：拖动元素进入目标元素时触发的事件，可以在此事件中进行一些针对目标元素的操作，如改变目标元素的样式。

6. `ondragleave` 事件：拖动元素离开目标元素时触发的事件，可以在此事件中进行一些清除或还原目标元素的操作。

7. `ondragover` 事件：在目标元素上拖动时持续触发的事件，可以在此事件中阻止默认的拖放行为或执行一些自定义操作。

8. `ondrop` 事件：在目标元素上释放拖动元素时触发的事件，通常在此事件中处理拖放操作，如获取拖放数据并执行相应的操作。

以上是 HTML5 Drag API 中常用的接口和事件。通过使用这些接口和事件，可以实现灵活的拖拽功能并与其他元素进行交互。需要注意的是，拖放操作的实现还涉及到一些其他的 DOM 操作和事件处理。

 应用举例

下面是一个使用 HTML5 Drag API 的简单示例，展示了如何实现拖拽功能：

```html
<!DOCTYPE html>
<html>
 <head>
 <style>
 .draggable {
 width: 100px;
 height: 100px;
 background-color: red;
 cursor: move;
 }

 .droppable {
 width: 200px;
 height: 200px;
 background-color: blue;
 }
 </style>
 </head>
 <body>
 <div class="draggable" draggable="true">Drag Me</div>
 <div class="droppable">Drop Here</div>

 <script>
 const draggableElement = document.querySelector('.draggable');
 const droppableElement = document.querySelector('.droppable');

 draggableElement.addEventListener('dragstart', (event) => {
 // 设置拖动数据
 event.dataTransfer.setData('text/plain', 'Draggable Element');
 });

 droppableElement.addEventListener('dragover', (event) => {
 // 阻止默认的拖放行为
 event.preventDefault();
 });

 droppableElement.addEventListener('drop', (event) => {
 // 获取拖放数据
 const data = event.dataTransfer.getData('text/plain');

 // 在目标元素上执行操作
 droppableElement.textContent = data;
 });
 </script>
 </body>
</html>
```

在上面的示例中，`.draggable` 类的元素被设置为可拖动（`draggable="true"`），当开始拖动时，触发了 `dragstart` 事件，并设置了拖动数据。

`.droppable` 类的元素作为目标元素，它监听了 `dragover` 事件以阻止默认的拖放行为，并在 `drop` 事件中获取拖放数据并执行相应的操作。

通过以上代码，你可以在浏览器中看到一个红色的可拖动元素和一个蓝色的目标元素。你可以尝试将可拖动元素拖放到目标元素上，拖放完成后，目标元素的内容将会被设置为拖放的数据。

## 427 `<!DOCTYPE html>` 标签有何作用?

* created_at: 2023-06-07T14:54:39Z
* updated_at: 2023-06-07T14:54:40Z
* labels: 浏览器
* milestone: 初

`<!DOCTYPE html>` 是 HTML5 的文档类型声明（Document Type Declaration），它的作用是告诉浏览器当前文档使用的是 HTML5 规范。

具体来说，`<!DOCTYPE html>` 的作用有以下几个方面：

1. 指定文档类型：文档类型声明告诉浏览器当前文档所使用的 HTML 版本，即 HTML5。这样浏览器就可以按照 HTML5 的规范来解析和渲染文档。

2. 规范浏览器行为：文档类型声明还可以影响浏览器的行为。HTML5 的文档类型声明告诉浏览器以标准模式（standards mode）来解析文档，以确保一致的行为和渲染结果。

3. 提供更好的兼容性：使用 `<!DOCTYPE html>` 可以确保文档在不同浏览器中具有一致的处理方式。不同的浏览器对不同版本的 HTML 有不同的处理方式，而使用 HTML5 的文档类型声明可以使浏览器以最新的标准模式来解析文档，提供更好的兼容性和一致性。

总结来说，`<!DOCTYPE html>` 是 HTML5 的文档类型声明，它告诉浏览器当前文档使用的是 HTML5 规范，以规范浏览器的行为，并提供更好的兼容性和一致性。在编写 HTML5 文档时，通常将 `<!DOCTYPE html>` 放置在文档的开头作为文档类型声明。

## 428 web 应用中如何对静态资源加载失败的场景做降级处理【热度: 1,093】

* created_at: 2023-06-07T15:00:35Z
* updated_at: 2023-06-07T15:00:36Z
* labels: web应用场景
* milestone: 高

**关键词**：静态资源降级、静态资源加载失败

在 Web 应用中，可以使用以下方法对静态资源加载进行降级处理，即在某个资源加载失败时使用备用的静态资源链接：

1. 使用多个 CDN 链接：在 HTML 中使用多个静态资源链接，按照优先级顺序加载，如果其中一个链接加载失败，则尝试加载下一个链接。

```html
<script src="https://cdn1.example.com/script.js"></script>
<script src="https://cdn2.example.com/script.js"></script>
<script src="https://cdn3.example.com/script.js"></script>
```

在加载 JavaScript 脚本时，浏览器会按照给定的顺序尝试加载各个链接，如果某个链接加载失败，浏览器会自动尝试加载下一个链接。

2. 使用备用资源路径：在 JavaScript 中使用备用的资源路径，当主要的资源路径加载失败时，切换到备用路径。

```javascript
const script = document.createElement('script')
script.src = 'https://cdn.example.com/script.js'
script.onerror = function () {
  // 主要资源加载失败，切换到备用资源路径
  script.src = 'https://backup.example.com/script.js'
}
document.head.appendChild(script)
```

在加载 JavaScript 脚本时，可以通过监听 `onerror` 事件，在主要资源加载失败时切换到备用资源路径，保证资源的可靠加载。

3. 使用动态加载和错误处理：使用 JavaScript 动态加载静态资源，并处理加载失败的情况。

```javascript
function loadScript (src, backupSrc) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script')
    script.src = src
    script.onload = resolve
    script.onerror = function () {
      if (backupSrc) {
        // 主要资源加载失败，切换到备用资源路径
        script.src = backupSrc
      } else {
        reject(new Error('Failed to load script: ' + src))
      }
    }
    document.head.appendChild(script)
  })
}

// 使用示例
loadScript('https://cdn.example.com/script.js', 'https://backup.example.com/script.js')
  .then(function () {
    // 资源加载成功
  })
  .catch(function (error) {
    // 资源加载失败
    console.error(error)
  })
```

通过动态加载脚本的方式，可以在资源加载失败时切换到备用资源路径或处理加载错误。

除了前面提到的方法外，还有以下一些降级处理的方法：

4. 本地备份资源：在 Web 应用的服务器上存储备份的静态资源文件，并在主要资源加载失败时，从本地服务器上加载备份资源。这种方法需要在服务器上维护备份资源的更新和一致性。

5. 使用浏览器缓存：如果静态资源被浏览器缓存，则在资源加载失败时，浏览器可以使用缓存中的资源。可以通过设置合适的缓存策略，例如设置资源的 Cache-Control 头字段，让浏览器缓存资源并在需要时从缓存中加载。

6. 使用 Service Worker：使用 Service Worker 技术可以在浏览器中拦截网络请求，从而实现更高级的降级处理。当主要资源加载失败时，可以使用 Service Worker 拦截请求并返回备用资源，或者动态生成代替资源。

7. 使用资源加载管理工具：使用像 Webpack 这样的资源加载管理工具，可以通过配置多个资源入口点和插件来实现资源加载的灵活控制。在资源加载失败时，可以通过配置自动切换到备用资源或通过插件实现自定义的降级逻辑。

这些方法可以根据具体的需求和场景选择适合的降级处理策略。降级处理的目的是确保网页应用的正常运行，提高用户体验，并减少对单一资源的依赖性。

## 429 html 中前缀为 data- 开头的元素属性是什么？【热度：903】

* created_at: 2023-06-07T15:05:07Z
* updated_at: 2023-06-07T15:05:29Z
* labels: web应用场景, Shopee
* milestone: 中

HTML 中前缀为 `data-` 开头的元素属性被称为自定义数据属性（Custom Data Attributes）或者数据属性（Data Attributes）。

这些属性的命名以 `data-` 开头，后面可以跟上任意自定义的名称。这样的属性可以用来存储与元素相关的自定义数据，以便在 JavaScript 或 CSS 中进行访问和操作。

自定义数据属性的命名应该遵循以下规则：

* 属性名必须以 `data-` 开头。
* 属性名可以包含任意`字母、数字、连字符（-）、下划线（_）和小数点（.）`。
* 属性名不应该包含大写字母，因为 HTML 属性名是不区分大小写的。

通过自定义数据属性，我们可以在 HTML 元素中嵌入自定义的数据，然后在 JavaScript 中使用 `getAttribute()` 方法或直接通过元素对象的 `dataset` 属性来访问这些数据。

例如，在 HTML 中定义了一个自定义数据属性 `data-color="red"`：

```html
<div id="myDiv" data-color="red"></div>
```

在 JavaScript 中可以通过以下方式获取该自定义数据属性的值：

```javascript
const myDiv = document.getElementById('myDiv')
const color = myDiv.getAttribute('data-color') // 获取属性值为 "red"
const dataset = myDiv.dataset // 获取包含所有自定义数据属性的对象 { color: "red" }
const colorValue = dataset.color // 获取属性值为 "red"
```

通过自定义数据属性，我们可以将相关的数据绑定到 HTML 元素上，方便在 JavaScript 中进行处理和操作，增强了 HTML 和 JavaScript 之间的交互性。

## 431 判断数组的方式有哪些【热度: 509】

* created_at: 2023-06-08T14:58:10Z
* updated_at: 2024-06-26T10:02:38Z
* labels: JavaScript, 网易
* milestone: 初

**关键词**：js判断数组方法

在 JavaScript 中，判断一个值是否为数组有多种方式，以下是几种常见的方法：

1. `Array.isArray()`: 使用 `Array.isArray()` 方法可以判断一个值是否为数组。它是 ES5 中新增的方法，返回一个布尔值。

```javascript
const arr = [1, 2, 3]
console.log(Array.isArray(arr)) // true

const obj = { a: 1, b: 2 }
console.log(Array.isArray(obj)) // false
```

2. `instanceof` 操作符：可以使用 `instanceof` 操作符检查一个对象是否是特定类的实例。对于数组，可以使用 `instanceof Array` 判断。

```javascript
const arr = [1, 2, 3]
console.log(arr instanceof Array) // true

const obj = { a: 1, b: 2 }
console.log(obj instanceof Array) // false
```

3. `Array.prototype.isArray()`：可以通过 `Array.prototype.isArray.call()` 方法来判断一个值是否为数组。这种方式在某些特定情况下使用较多。

```javascript
const arr = [1, 2, 3]
console.log(Array.prototype.isArray.call(arr)) // true

const obj = { a: 1, b: 2 }
console.log(Array.prototype.isArray.call(obj)) // false
```

4. `Object.prototype.toString()`：可以使用 `Object.prototype.toString.call()` 方法来获取一个值的类型信息，进而判断是否为数组。返回的结果是一个包含类型信息的字符串，例如 "[object Array]"。

```javascript
const arr = [1, 2, 3]
console.log(Object.prototype.toString.call(arr) === '[object Array]') // true

const obj = { a: 1, b: 2 }
console.log(Object.prototype.toString.call(obj) === '[object Array]') // false
```

这些方法各有特点，根据实际需求选择合适的方法进行判断。通常推荐使用 `Array.isArray()` 方法来判断一个值是否为数组，因为它是专门用于判断数组的标准方法，并且在大多数现代浏览器中得到广泛支持。

## 432 typeof null 的结果是什么，为什么？

* created_at: 2023-06-08T14:59:38Z
* updated_at: 2023-06-08T14:59:39Z
* labels: JavaScript
* milestone: 中

`typeof null` 的结果是 `"object"`。

这是 JavaScript 中的一个历史遗留问题。在 JavaScript 最初的实现中，将 JavaScript 的值分为了几种类型，其中 `null` 被当作一个空对象指针。为了与其他对象类型区分开，`typeof null` 返回了 `"object"`。

实际上，`null` 是一个表示空值的特殊值，它不是对象，也不是任何对象的实例。虽然 `typeof null` 返回了 `"object"`，但这并不表示 `null` 是对象的一种类型。

由于这个历史遗留问题，判断一个值是否为 `null` 通常需要使用 `value === null` 进行比较，而不是依赖 `typeof` 运算符的结果。

## 433 js 函数有默认值的时候， 如果传递的参数是 undefined 那么会被默认值赋值吗？

* created_at: 2023-06-08T15:21:50Z
* updated_at: 2023-06-08T15:26:59Z
* labels: JavaScript
* milestone: 初

是的，如果函数在调用时某个参数被传递为 `undefined`，那么它会被默认值赋值。

当为函数的参数设置默认值时，只有当参数的值为 `undefined` 时才会生效。如果传递的参数为 `null`、空字符串 `''` 或者未提供参数，则默认值不会被应用。

以下是一个示例：

```javascript
function greet (name = 'Guest') {
  console.log(`Hello, ${name}!`)
}

greet('John') // 输出: Hello, John!
greet(undefined) // 输出: Hello, Guest!
greet() // 输出: Hello, Guest!
```

在上面的例子中，当参数 `name` 被传递为 `undefined` 或者未提供时，它会被默认值 `'Guest'` 赋值，从而在函数内部输出 `'Hello, Guest!'`。

如果传递的参数为 `null`，默认值不会被应用。当函数的参数被显式传递为 `null` 时，它将被视为有效的值，不会触发默认值的赋值。

以下是一个示例：

```javascript
function greet (name = 'Guest') {
  console.log(`Hello, ${name}!`)
}

greet(null) // 输出: Hello, null!
```

在上面的例子中，参数 `name` 被显式传递为 `null`，因此默认值 `'Guest'` 不会被应用，而是使用了传递的 `null` 值。所以输出结果为 `'Hello, null!'`。

## 434 Object.is() 与比较操作符 “===”、“==” 有什么区别【热度: 1,425】

* created_at: 2023-06-08T15:26:20Z
* updated_at: 2023-06-08T15:26:50Z
* labels: JavaScript, 京东
* milestone: 初

**关键词**：Object.is()、js 相等比较

`Object.is()` 方法和比较操作符 "==="、"==" 用于比较两个值的相等性，但它们在比较方式和行为上有一些区别。

1. `Object.is()` 方法是严格相等比较，而 "===" 操作符也是严格相等比较，但 "==" 操作符是相等比较。

* 严格相等比较（`===`）要求比较的两个值在类型和值上完全相同才会返回 `true`。
* 相等比较（`==`）会进行类型转换，将两个值转换为相同类型后再进行比较。

2. `Object.is()` 方法对于一些特殊的值比较更准确：

* 对于 NaN 和 NaN 的比较，`Object.is(NaN, NaN)` 返回 `true`，而 `NaN === NaN` 返回 `false`。
* 对于 +0 和 -0 的比较，`Object.is(+0, -0)` 返回 `false`，而 `+0 === -0` 返回 `true`。

下面是一些示例：

```javascript
console.log(Object.is(1, 1)) // true
console.log(Object.is('foo', 'foo')) // true
console.log(Object.is(true, true)) // true

console.log(Object.is(null, null)) // true
console.log(Object.is(undefined, undefined)) // true

console.log(Object.is(NaN, NaN)) // true
console.log(NaN === NaN) // false

console.log(Object.is(+0, -0)) // false
console.log(+0 === -0) // true

console.log(Object.is({}, {})) // false
console.log({} === {}) // false
```

`Object.is()` 方法更精确地比较两个值的相等性，尤其是在处理一些特殊的值时，而 "===" 操作符和 "==" 操作符则具有不同的类型转换行为和比较规则。

## 435 什么是伪数组、什么是类数组【热度: 1,510】

* created_at: 2023-06-08T15:31:01Z
* updated_at: 2023-06-08T15:31:15Z
* labels: JavaScript, 美团
* milestone: 中

**关键词**：伪数组、类数组

伪数组（Array-like）和类数组（Array-like Object）都是描述一种类似数组的对象结构，它们在外观和行为上类似于数组，但实际上不是真正的数组。

伪数组（Array-like）：

* 伪数组是指具有类似数组的结构，但不具备数组的方法和属性的对象。
* 伪数组对象通常拥有一个 length 属性，用于表示其元素的个数。
* 伪数组对象可以通过索引访问元素，类似于数组的下标访问。
* 伪数组对象不具备数组的方法，如 push、pop、slice 等。

类数组（Array-like Object）：

* 类数组是指具有类似数组的结构，但不是由 Array 构造函数创建的对象。
* 类数组对象通常拥有一个 length 属性，用于表示其元素的个数。
* 类数组对象可以通过索引访问元素，类似于数组的下标访问。
* 类数组对象不具备数组的方法，如 push、pop、slice 等。

示例：

```javascript
// 伪数组
const arrayLike = { 0: 'apple', 1: 'banana', length: 2 }
console.log(arrayLike[0]) // 'apple'
console.log(arrayLike.length) // 2
console.log(arrayLike.push) // undefined

// 类数组
const arrayLikeObject = document.querySelectorAll('div')
console.log(arrayLikeObject[0]) // DOM元素
console.log(arrayLikeObject.length) // 元素数量
console.log(arrayLikeObject.push) // undefined
```

需要注意的是，伪数组和类数组虽然具有类似数组的结构，但它们没有继承自 Array 的方法和属性，因此无法直接使用数组的方法。如果需要使用数组的方法，可以将伪数组或类数组对象转换为真正的数组，例如通过 `Array.from()`、`Array.prototype.slice.call()` 或展开运算符 `...` 等方法进行转换。

## 437 类数组转换成数组的方法有哪些【热度: 1,094】

* created_at: 2023-06-08T15:40:21Z
* updated_at: 2023-06-08T15:40:22Z
* labels: JavaScript, 百度
* milestone: 中

**关键词**：类数组对象转换为真正的数组

有几种常见的方法可以将类数组对象转换为真正的数组：

1. Array.from()：使用 Array.from() 方法可以将可迭代对象或类数组对象转换为数组。

```javascript
const arrayLike = { 0: 'apple', 1: 'banana', length: 2 }
const array = Array.from(arrayLike)
console.log(array) // ['apple', 'banana']
```

2. Array.prototype.slice.call()：通过调用 Array.prototype.slice() 方法，并将类数组对象作为参数传入，可以将其转换为数组。

```javascript
const arrayLike = { 0: 'apple', 1: 'banana', length: 2 }
const array = Array.prototype.slice.call(arrayLike)
console.log(array) // ['apple', 'banana']
```

3. Spread Operator（展开运算符）：使用展开运算符 `...` 可以将可迭代对象或类数组对象展开为数组。

```javascript
const arrayLike = { 0: 'apple', 1: 'banana', length: 2 }
const array = [...arrayLike]
console.log(array) // ['apple', 'banana']
```

这些方法都可以将类数组对象转换为真正的数组，使其具备数组的方法和属性。需要注意的是，类数组对象必须具有 length 属性和通过索引访问元素的能力才能成功转换为数组。

## 438 为什么函数的 arguments 参数是类数组而不是数组？【热度: 669】

* created_at: 2023-06-08T15:42:57Z
* updated_at: 2023-09-07T11:11:50Z
* labels: JavaScript, 腾讯
* milestone: 中

**关键词**：arguments 参数、arguments 参数遍历

在 JavaScript 中，函数的 `arguments` 参数被设计为类数组对象，而不是真正的数组。这是因为 `arguments` 对象包含了函数调用时传入的所有参数，包括未命名的参数。它提供了一种方便的方式来访问和操作这些参数。

要遍历类数组对象，可以使用以下方法：

1. 使用 for 循环和索引：通过使用普通的 for 循环和索引来遍历类数组对象。

```javascript
function sum () {
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i])
  }
}

sum(1, 2, 3) // 输出：1 2 3
```

2. 使用 for...of 循环：`arguments` 是特殊的类数组， 因为他实现了`[Symbol.iterator]`迭代器， 故可以使用 for...of 循环

```javascript
function sum () {
  for (const arg of arguments) {
    console.log(arg)
  }
}

sum(1, 2, 3) // 输出：1 2 3
```

3. 将类数组对象转换为真正的数组后遍历：可以使用上述提到的类数组转换方法将类数组对象转换为真正的数组，然后使用数组的遍历方法进行遍历，如 `forEach()`、`map()` 等。

```javascript
function sum () {
  const args = Array.from(arguments)
  args.forEach(arg => {
    console.log(arg)
  })
}

sum(1, 2, 3) // 输出：1 2 3
```

这些方法都可以用于遍历类数组对象，根据需求选择适合的方式进行操作。

## 439 escape、encodeURI、encodeURIComponent 区别【热度: 367】

* created_at: 2023-06-08T15:46:51Z
* updated_at: 2023-09-29T12:42:05Z
* labels: JavaScript, 阿里巴巴
* milestone: 中

**关键词**：js URL 编码解码

在 JavaScript 中，`escape()`、`encodeURI()` 和 `encodeURIComponent()` 都是用于编码 URL 或字符串的函数，但它们有一些区别：

1. `escape()` 函数用于编码字符串中的特殊字符，使其能够安全地传输。它对字符进行编码，包括非 ASCII 字符和特殊字符。但需要注意的是，`escape()` 不会编码 URL 中的保留字符（例如 `:/?#[]@!$&'()*+,;=`），它只会编码其他字符。

```javascript
// 输出：%48%65%6c%6c%6f%20%57%6f%72%6c%64%21
console.log(escape('Hello World!'))
```

2. `encodeURI()` 函数用于对整个 URL 进行编码，用于将 URL 中的特殊字符转换为可传输的形式。它不会编码 URL 中的保留字符和一些特殊字符（例如 `:/?#[]@!$&'()*+,;=`）。它主要用于编码整个 URL，而不是编码 URL 的参数值。

```javascript
// 输出：http://example.com/page.php?id=123
console.log(encodeURI('http://example.com/page.php?id=123'))
```

3. `encodeURIComponent()` 函数用于编码 URL 的参数值，它会对所有特殊字符进行编码，包括 URL 中的保留字符和其他特殊字符。它用于编码 URL 参数中的特殊字符，以确保它们在 URL 中的传输和解析过程中不会被误解。

```javascript
// 输出：Hello%20World%21
console.log(encodeURIComponent('Hello World!'))
```

需要注意的是，`escape()` 函数已被废弃，不推荐使用。在大多数情况下，建议使用 `encodeURI()` 或 `encodeURIComponent()` 函数进行 URL 编码。选择使用哪个函数取决于具体的需求，是否需要编码整个 URL 或只是其中的一部分（如参数值）。

----------

**补充**

| 函数 | 编码范围 | 编码空格 | 编码特殊字符 | 可逆性 |
| --------------------- | ----------------- | -------- | ------------ | ------ |
| `escape` | ASCII 字符外的所有字符 | `+` | 是 | 是 |
| `encodeURI` | URL 中的部分字符 | 否 | 否 | 是 |
| `encodeURIComponent` | URL 中的所有字符 | `%20` | 是 | 是 |

下面是对每个函数的详细解释：

1. `escape` 函数用于编码字符串中的所有字符，包括非 ASCII 字符和某些特殊字符。它会将这些字符转换为 `%xx` 形式的十六进制转义序列，其中 `xx` 是字符的 ASCII 值的十六进制表示。它还会将空格编码为 `+` 符号。该函数可以对编码后的字符串进行反转义，以还原原始字符串。

2. `encodeURI` 函数用于对 URL 中的某些字符进行编码，包括保留字符和一些特殊字符。它会将这些字符转换为 `%xx` 形式的十六进制转义序列，其中 `xx` 是字符的 ASCII 值的十六进制表示。与 `escape` 不同，`encodeURI` 不会编码空格。该函数可以对编码后的字符串进行反转义，以还原原始字符串。

3. `encodeURIComponent` 函数用于对 URL 中所有字符进行编码，包括保留字符和特殊字符。它会将这些字符转换为 `%xx` 形式的十六进制转义序列，其中 `xx` 是字符的 ASCII 值的十六进制表示。与 `encodeURI` 不同，`encodeURIComponent` 会将空格编码为 `%20`。该函数可以对编码后的字符串进行反转义，以还原原始字符串。

## 440 use strict是什么? 它有什么用？【热度: 758】

* created_at: 2023-06-08T15:51:48Z
* updated_at: 2023-06-08T15:51:49Z
* labels: JavaScript, PDD
* milestone: 初

**关键词**：JS 编译指示、JS 严格模式

`"use strict"` 是 JavaScript 中的一个编译指示（directive），用于启用严格模式（strict mode）。

严格模式是 JavaScript 的一种执行模式，它增强了代码的健壮性、可维护性和安全性，并减少了一些常见的错误。启用严格模式后，JavaScript 引擎会执行更严格的语法检查，提供更好的错误检测和提示。

使用 `"use strict"` 有以下几个特点和用途：

1. 严格模式禁止使用一些不安全或不推荐的语法和行为，例如使用未声明的变量、删除变量或函数、对只读属性赋值等。它会抛出更多的错误，帮助开发者发现并修复潜在的问题。

2. 严格模式禁止使用一些不严谨的语法解析和错误容忍行为，例如不允许在全局作用域中定义变量时省略 `var` 关键字。

3. 严格模式对函数的处理更加严格，要求函数内部的 `this` 值为 `undefined`，而非在非严格模式下默认指向全局对象。

4. 严格模式禁止使用一些具有歧义性的特性，例如禁止使用八进制字面量、重复的函数参数名。

使用严格模式可以提高代码的质量和可靠性，并避免一些常见的错误。为了启用严格模式，只需在 JavaScript 文件或函数的顶部添加 `"use strict"` 即可。严格模式默认不启用，需要显式地指定。例如：

```javascript
'use strict'

// 严格模式下的代码
```

需要注意的是，严格模式不兼容一些旧版本的 JavaScript 代码，可能会导致一些旧有的代码产生错误。因此，在使用严格模式之前，需要确保代码中不会出现与严格模式不兼容的语法和行为。

## 441 解释性语言和编译型语言的区别【热度: 858】

* created_at: 2023-06-08T15:58:05Z
* updated_at: 2023-06-08T15:58:06Z
* labels: JavaScript, 快手
* milestone: 中

**关键词**：解释性语言和编译型语言

解释性语言和编译型语言是两种不同的编程语言类型，它们在代码的执行方式和运行过程中的一些特点上存在区别。

1. 编译型语言：

* 编译型语言的代码在运行之前需要经过编译器的处理，将源代码一次性地转换成机器语言的可执行文件（通常是二进制文件）。
* 编译器将源代码转换为目标代码的过程包括词法分析、语法分析、语义分析、优化和代码生成等步骤。
* 在运行时，编译型语言的可执行文件直接在计算机上执行，无需再次进行翻译或解释。
* 典型的编译型语言包括 C、C++、Java（虚拟机字节码编译）、Go等。

2. 解释性语言：

* 解释性语言的代码在运行时逐行被解释器解释执行，无需预先编译为可执行文件。
* 解释器逐行读取源代码，将其解析并直接执行，将源代码翻译为机器指令并逐行执行。
* 解释性语言的执行过程通常边解释边执行，每次运行都需要经过解释器的处理。
* 典型的解释性语言包括 JavaScript、Python、Ruby、PHP等。

区别：

* 编译型语言在运行之前需要将代码转换为可执行文件，而解释性语言在运行时逐行解释执行。
* 编译型语言的执行速度通常较快，因为代码已经被预先编译成机器语言，无需再进行解释。解释性语言的执行速度较慢，因为每次运行都需要经过解释器的处理。
* 编译型语言一般需要根据目标平台进行编译，可执行文件通常与特定的操作系统和硬件相关。解释性语言通常是跨平台的，只需要相应的解释器即可运行。
* 编译型语言在代码运行之前会进行全面的语法和类型检查，可以在编译过程中发现一些潜在的错误。解释性语言在运行时进行解释，错误可能会在运行过程中被发现。

需要注意的是，实际上很多语言不是严格的编译型语言或解释性语言，而是在两者之间存在折中的方式。例如，Java 语言将源代码编译为字节码（中间形式），然后在虚拟机中解释执行。因此，这些概念并不是绝对的，语言的执行方式可能有所不同。

## 442 ajax、axios、fetch的区别【热度: 855】

* created_at: 2023-06-08T16:01:53Z
* updated_at: 2023-06-08T16:01:54Z
* labels: 网络, Shopee
* milestone: 中

**关键词**：ajax、axios、fetch、前端网络请求库

Ajax、Axios和Fetch都是用于进行HTTP请求的工具或技术，但它们在实现细节和功能方面有所不同。

1. Ajax（Asynchronous JavaScript and XML）:

* Ajax是一种用于在后台与服务器进行异步通信的技术。
* Ajax使用XMLHttpRequest对象发送和接收数据，可以通过JavaScript来更新页面的局部内容，而无需刷新整个页面。
* Ajax可以通过原生JavaScript编写，或者使用库如jQuery等来简化操作。

2. Axios:

* Axios是一个基于Promise的HTTP客户端，可以在浏览器和Node.js环境中使用。
* Axios提供了更简洁、易用的API，支持请求和响应拦截、请求取消、全局配置等功能。
* Axios可以处理请求的错误，并提供了更方便的错误处理机制。
* Axios支持在浏览器中自动转换JSON数据，可以方便地发送JSON格式的请求和接收JSON格式的响应。

3. Fetch:

* Fetch是Web API提供的一种用于发送HTTP请求的新特性，主要用于替代XMLHttpRequest。
* Fetch使用Promise来处理异步操作，提供了更简洁、灵活的API。
* Fetch基于Promise设计，可以更好地处理请求和响应，并支持链式调用和异步操作。
* Fetch支持跨域请求和对请求和响应进行拦截、转换等处理。

区别：

* Ajax是一种技术概念，而Axios和Fetch是具体的工具或技术实现。
* Axios相比Ajax和Fetch具有更多的功能和便捷的API，支持更多的扩展和配置。
* Fetch是基于Promise的新API，相对于Ajax和Axios更为现代化，并且支持更多的特性如跨域请求、拦截器等。
* Ajax可以通过原生JavaScript或库来实现，Axios和Fetch是专门的库。
* Axios和Fetch提供了更好的错误处理机制，而Ajax在错误处理方面相对简单。

选择使用哪种工具或技术取决于具体的需求和项目情况。如果需要较低级别的控制和自定义配置，可以选择原生的Ajax或Fetch。而如果需要更丰富的功能和更方便的API，可以选择使用Axios或其他类似的库。

## 443 深度遍历广度遍历的区别？【热度: 867】

* created_at: 2023-06-08T16:09:02Z
* updated_at: 2023-06-08T16:09:03Z
* labels: JavaScript, 快手
* milestone: 中

**关键词**：深度遍历广度遍历

深度遍历（Depth-First Search，DFS）和广度遍历（Breadth-First Search，BFS）是两种常用的图遍历算法，用于访问和搜索图或树中的节点。它们在遍历顺序和搜索策略上有所不同。

深度遍历（DFS）：

* 深度遍历从一个节点开始，递归地访问该节点的子节点，直到达到最深的节点，然后回溯到上一级节点，继续访问其未访问的子节点。
* 在深度遍历中，我们首先访问根节点，然后依次访问每个子节点。对于每个子节点，再依次访问其子节点，直到到达叶子节点。
* 深度遍历可以通过递归或使用栈来实现。

广度遍历（BFS）：

* 广度遍历从一个节点开始，首先访问该节点的所有相邻节点，然后逐层访问其他节点，直到访问完所有节点。
* 在广度遍历中，我们首先访问根节点，然后依次访问与根节点相邻的节点。然后，再依次访问与这些节点相邻的节点，以此类推，直到遍历完所有节点。
* 广度遍历可以通过使用队列来实现，即先进先出（FIFO）的数据结构。

区别：

* 深度遍历优先访问节点的子节点，然后再访问子节点的子节点，以此类推，直到到达最深的节点。而广度遍历优先访问当前层级的所有节点，然后再访问下一层级的节点。
* 在树或图结构中，深度遍历更适合查找目标节点在较深层级的情况，而广度遍历更适合查找目标节点在较浅层级的情况。
* 深度遍历可能会在较深层级上陷入递归或栈的调用，而广度遍历则需要使用队列来存储和访问节点，因此占用的内存空间较大。
* 深度遍历通常使用递归实现，而广度遍历通常使用迭代和队列实现。

选择使用深度遍历还是广度遍历取决于具体的应用场景和需求。如果需要快速到达目标节点且目标节点位于较浅的层级，可以选择广度遍历。如果需要深度探索并处理树或图中的节点，可以选择深度遍历。

## 445 执行上下文栈是什么【热度: 632】

* created_at: 2023-06-12T15:24:14Z
* updated_at: 2023-06-12T15:24:14Z
* labels: JavaScript, 网易
* milestone: 中

**关键词**：执行上下文栈

在JavaScript中，执行上下文栈（Execution Context Stack）是用于跟踪和管理函数执行的机制。每当JavaScript代码执行到一个函数时，就会创建一个执行上下文（Execution Context）并被推入执行上下文栈的顶部。当函数执行完毕后，执行上下文将从栈中弹出，控制权将返回给调用该函数的上下文。

执行上下文栈遵循"先进后出"（Last-In-First-Out）的原则。也就是说，最后一个推入栈的执行上下文会被最先弹出。

每个执行上下文都包含了以下三个重要的组成部分：

1. 变量对象（Variable Object）：变量对象存储了函数的形参、函数声明、变量声明和作用域链等信息。

2. 作用域链（Scope Chain）：作用域链是一个由当前执行上下文的变量对象和所有父级执行上下文的变量对象组成的链表结构。它用于变量查找的过程。

3. this 值：this 值指定了当前执行上下文中的 this 关键字的指向。

通过执行上下文栈，JavaScript引擎能够追踪到代码的执行位置，并根据当前执行上下文的环境来解析变量和执行函数。这种栈结构的管理方式使得JavaScript能够实现函数的嵌套调用和正确的变量作用域处理。

## 446 移动端如何实现上拉加载，下拉刷新？【热度: 718】

* created_at: 2023-06-12T15:29:22Z
* updated_at: 2023-06-12T15:29:23Z
* labels: web应用场景, 京东
* milestone: 中

**关键词**：上拉加载、下拉刷新

移动端实现上拉加载和下拉刷新通常使用一些特定的库或框架来简化开发。以下是两种常见的实现方式：

1. 使用第三方库：一些流行的移动端UI库（如iScroll、BetterScroll、Ant Design Mobile等）提供了上拉加载和下拉刷新的功能，你可以使用它们来实现。这些库通常提供了易于使用的API和配置选项，可以在你的应用中轻松地集成上拉加载和下拉刷新功能。

2. 自定义实现：如果你想更自定义地实现上拉加载和下拉刷新，可以使用原生的触摸事件（如touchstart、touchmove、touchend等）和滚动事件（如scroll）来监测用户的手势操作和滚动行为，并根据这些事件来触发相应的加载或刷新逻辑。你可以监听触摸事件来检测用户的下拉或上拉手势，当达到一定的阈值时，触发刷新或加载的操作。同时，你还需要监听滚动事件来判断当前滚动位置是否已经到达页面底部，从而触发上拉加载的操作。

当自定义实现上拉加载和下拉刷新时，你可以使用JavaScript和HTML/CSS来编写代码。下面是一个简单的示例，演示了如何通过原生事件来实现上拉加载和下拉刷新的功能：

HTML 结构：

```html
<!DOCTYPE html>
<html>
<head>
 <title>上拉加载和下拉刷新示例</title>
 <style>
 // 用于展示加载和刷新状态的样式 */
 .loading {
 text-align: center;
 padding: 10px;
 background-color: #f1f1f1;
 }

 .refresh {
 text-align: center;
 padding: 10px;
 background-color: #f1f1f1;
 }
 </style>
</head>
<body>
 <div id="content">
 <!-- 内容区域 -->
 </div>
 <div id="loading" class="loading">
 加载中...
 </div>
 <div id="refresh" class="refresh">
 下拉刷新
 </div>

 <script src="your_script.js"></script>
</body>
</html>
```

JavaScript 代码（your_script.js）：

```javascript
// 获取相关元素
const content = document.getElementById('content')
const loading = document.getElementById('loading')
const refresh = document.getElementById('refresh')

let isRefreshing = false
let isLoading = false

// 监听触摸事件
let startY = 0
let moveY = 0
content.addEventListener('touchstart', function (event) {
  startY = event.touches[0].pageY
})

content.addEventListener('touchmove', function (event) {
  moveY = event.touches[0].pageY

  // 下拉刷新
  if (moveY - startY > 100 && !isRefreshing) {
    refresh.innerHTML = '释放刷新'
  }

  // 上拉加载
  const scrollTop = content.scrollTop
  const scrollHeight = content.scrollHeight
  const offsetHeight = content.offsetHeight
  if (scrollTop + offsetHeight >= scrollHeight && !isLoading) {
    loading.style.display = 'block'
  }
})

content.addEventListener('touchend', function (event) {
  // 下拉刷新
  if (moveY - startY > 100 && !isRefreshing) {
    refresh.innerHTML = '刷新中...'
    simulateRefresh()
  }

  // 上拉加载
  const scrollTop = content.scrollTop
  const scrollHeight = content.scrollHeight
  const offsetHeight = content.offsetHeight
  if (scrollTop + offsetHeight >= scrollHeight && !isLoading) {
    loading.style.display = 'block'
    simulateLoad()
  }

  // 重置状态
  startY = 0
  moveY = 0
})

// 模拟刷新
function simulateRefresh () {
  isRefreshing = true
  setTimeout(function () {
    // 刷新完成后的操作
    refresh.innerHTML = '刷新成功'
    isRefreshing = false
  }, 2000)
}

// 模拟加载
function simulateLoad () {
  isLoading = true
  setTimeout(function () {
    // 加载完成后的操作
    loading.style.display = 'none'
    isLoading = false
  }, 2000)
}
```

上面的代码使用了`touchstart`、`touchmove`和`touchend`事件来监测用户的手势操作，实现了下拉刷新和上拉加载的功能。通过修改`refresh`和`loading`元

素的内容和样式，可以实现相应的状态展示效果。

## 447 JS 中的数组和函数在内存中是如何存储的？【热度: 815】

* created_at: 2023-06-12T15:36:02Z
* updated_at: 2023-06-12T15:36:03Z
* labels: JavaScript, PDD
* milestone: 中

**关键词**：数组和函数在内存中存储方式

在JavaScript中，数组和函数在内存中的存储方式有一些不同。

1. 数组（Array）的存储：

* 数组是一种线性数据结构，它可以存储多个值，并且这些值可以是不同类型的。在内存中，数组的存储通常是连续的。当创建一个数组时，JavaScript引擎会为其分配一段连续的内存空间来存储数组的元素。数组的每个元素都会被存储在这段内存空间中的相应位置。数组的长度可以动态改变，当向数组添加或删除元素时，JavaScript引擎会重新分配内存空间并移动元素的位置。

2. 函数（Function）的存储：

* 函数在JavaScript中被视为一种特殊的对象。函数的定义实际上是创建一个函数对象，并将其存储在内存中。函数对象本身包含了函数的代码以及其他相关信息，例如函数的名称、参数和闭包等。函数对象的代码部分通常是一段可执行的JavaScript代码，它被存储在内存中的某个位置。当调用函数时，JavaScript引擎会查找该函数对象的存储位置，并执行其中的代码。

需要注意的是，数组和函数的存储方式是由JavaScript引擎决定的，不同的引擎可能会有一些微小的差异。此外，JavaScript引擎还会使用一些优化技术，如垃圾回收和内存管理，来优化内存的使用和回收。

## 448 [代码实现] 手写实现一个缓存函数 memoize【热度: 787】

* created_at: 2023-06-12T15:45:47Z
* updated_at: 2023-09-06T15:52:23Z
* labels: 小米, 代码实现/算法
* milestone: 中

**关键词**：缓存函数实现、memoize函数

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

## 449 JS 执行上下文的生命周期阶段有哪些【热度: 713】

* created_at: 2023-06-12T15:50:30Z
* updated_at: 2023-06-12T15:50:31Z
* labels: JavaScript, 百度
* milestone: 中

**关键词**：JS 执行阶段、JS执行上下文生命周期

在JavaScript中，执行上下文的生命周期可以分为三个阶段：创建阶段（Creation phase）、执行阶段（Execution phase）和回收阶段（Cleanup phase）。

1. 创建阶段（Creation phase）：

* 在创建阶段，JavaScript引擎会做以下工作：
* 创建变量对象（Variable
 object）：变量对象是执行上下文中的一个重要部分，用于存储变量和函数声明。在该阶段，JavaScript引擎会扫描当前上下文中的代码，并创建变量对象。变量对象包括函数的参数、函数声明和变量声明。对于全局上下文，变量对象是全局对象（如`window`
 对象）。
* 建立作用域链（Scope chain）：作用域链用于解析变量的访问权限。JavaScript引擎会根据当前执行上下文的词法环境和作用域嵌套关系来建立作用域链。
* 确定this值：在创建阶段，JavaScript引擎会确定`this`关键字的值，这取决于函数的调用方式（如函数调用、方法调用、构造函数调用等）。

2. 执行阶段（Execution phase）：

* 在执行阶段，JavaScript引擎会按照代码的顺序执行语句，执行以下操作：
* 变量赋值：根据代码中的赋值操作，给变量分配内存并赋予相应的值。
* 函数引用：根据代码中的函数调用，将函数的引用添加到变量对象中。
* 代码执行：按照代码的顺序执行语句，包括表达式计算、条件判断、循环等操作。
* 创建局部变量：当函数内部存在局部变量时，在执行到相应代码行时，会为局部变量分配内存空间。

3. 回收阶段（Cleanup phase）：

* 在回收阶段，JavaScript引擎会进行垃圾回收和释放内存等清理工作。当执行上下文不再被引用或执行完毕后，会触发回收阶段，进行以下操作：
* 解除引用：将执行上下文中的变量和函数从变量对象中移除，解除对它们的引用。
* 内存回收：对不再被引用的变量和对象进行垃圾回收，释放占用的内存空间。

这三个阶段共同构成了执行上下文的生命周期。创建阶段主要用于初始化执行上下文的变量和函数，建立作用域链和确定`this`值。执行阶段是实际执行代码的阶段，按照代码顺序执行语句。回收阶段主要用于清理执行上下文，释放内存空间。这个生

命周期的循环会在代码的执行过程中反复进行，直到所有的代码都执行完毕并且没有引用指向该执行上下文时，执行上下文将被彻底回收。

## 450 普通函数动态参数 和 箭头函数的动态参数有什么区别？【热度: 927】

* created_at: 2023-06-12T15:54:28Z
* updated_at: 2023-06-12T15:54:29Z
* labels: JavaScript
* milestone: 中

**关键词**：JS函数动态参数

普通函数和箭头函数在处理动态参数方面有以下区别：

1. 普通函数的动态参数：

* 在普通函数中，可以使用 `arguments` 对象来访问传递给函数的所有参数，无论是否定义了具名参数。`arguments` 是一个类数组对象，可以通过索引访问每个参数的值。
* 普通函数可以使用剩余参数语法（Rest parameters）来声明动态参数，通过三个点（`...`）和一个参数名表示。剩余参数会被收集成一个真正的数组，可以直接使用数组的方法和属性对参数进行操作。

示例：

```javascript
function sum (a, b, ...rest) {
  console.log(a, b) // 输出前两个参数
  console.log(rest) // 输出剩余的动态参数，作为数组
}

sum(1, 2, 3, 4, 5) // 输出: 1 2， [3, 4, 5]
```

2. 箭头函数的动态参数：

* 箭头函数不具有自己的 `arguments` 对象。在箭头函数中，无法直接访问传递给函数的所有参数的类数组对象。
* 箭头函数可以使用剩余参数语法来声明动态参数，与普通函数相同。剩余参数会被收集成一个真正的数组，可以直接使用数组的方法和属性对参数进行操作。

示例：

```javascript
const sum = (a, b, ...rest) => {
  console.log(a, b) // 输出前两个参数
  console.log(rest) // 输出剩余的动态参数，作为数组
}

sum(1, 2, 3, 4, 5) // 输出: 1 2， [3, 4, 5]
```

总结：

* 普通函数和箭头函数都可以接受动态参数。
* 普通函数可以使用 `arguments` 对象访问所有参数，也可以使用剩余参数语法将参数收集成数组。
* 箭头函数没有自己的 `arguments` 对象，无法直接访问所有参数，但可以使用剩余参数语法将参数收集成数组。

## 451 函数声明与函数表达式的区别【热度: 551】

* created_at: 2023-06-12T15:59:38Z
* updated_at: 2023-06-12T15:59:38Z
* labels: JavaScript
* milestone: 中

**关键词**：函数声明、函数表达式

JavaScript中有两种主要的方式来定义函数：函数声明（Function Declaration）和函数表达式（Function Expression）。

1. 函数声明（Function Declaration）：

* 函数声明是通过使用 `function` 关键字后面跟着函数名称来创建的，通常位于作用域的顶部。
* 函数声明会被提升（Hoisting），即在执行代码之前就可以使用。这意味着可以在函数声明之前调用该函数。
* 函数声明创建的函数可以在整个作用域内部访问。

示例：

```javascript
function sayHello () {
  console.log('Hello!')
}

sayHello() // 可以在函数声明之后调用
```

2. 函数表达式（Function Expression）：

* 函数表达式是将函数赋值给变量或作为其他表达式的一部分创建的。
* 函数表达式通常是匿名函数，即没有指定函数名称。但也可以使用具名函数表达式，为函数表达式指定一个名称。
* 函数表达式不会被提升，必须在定义之后才能使用。
* 函数表达式创建的函数只能在其所在的变量或表达式作用域内访问。

示例：

```javascript
// 匿名函数表达式
const sayHello = function () {
  console.log('Hello!')
}

sayHello() // 必须在函数表达式之后调用

// 具名函数表达式
const add = function sum (a, b) {
  return a + b
}

console.log(add(2, 3)) // 输出: 5
// console.log(sum(2, 3)); // 错误，无法在外部访问具名函数表达式的名称
```

总结：

* 函数声明是使用 `function` 关键字创建的函数，会被提升，可以在声明之前调用，而且在整个作用域内都可访问。
* 函数表达式是将函数赋值给变量或作为其他表达式的一部分创建的，不会被提升，必须在定义之后才能使用，且只能在其所在的变量或表达式作用域内访问。

## 452 JS 创建对象的方式有哪些？【热度: 894】

* created_at: 2023-06-12T16:03:14Z
* updated_at: 2023-07-26T14:30:34Z
* labels: JavaScript
* milestone: 初

**关键词**：JS 创建对象

1. 使用对象字面量创建对象。

```
var obj = { 
 name: "John", 
 age: 30 
};
```

2. 使用 Object 构造函数创建对象。

```
var obj = new Object();
obj.name = "John";
obj.age = 30;
```

3. 使用构造函数创建对象。

```
function Person(name, age) {
 this.name = name;
 this.age = age;
}
var john = new Person("John", 30);
```

4. 使用 Object.create() 方法创建对象。

```
var obj = Object.create(null);
obj.name = "John";
obj.age = 30;
```

5. 使用类和继承创建对象。

```
class Person {
 constructor(name, age) {
 this.name = name;
 this.age = age;
 }
}
var john = new Person("John", 30);
```

## 453 hasOwnProperty 与 instanceof 区别【热度: 490】

* created_at: 2023-06-12T16:12:10Z
* updated_at: 2023-06-12T16:12:11Z
* labels: JavaScript
* milestone: 初

**关键词**：hasOwnProperty、instanceof、hasOwnProperty作用、instanceof作用

hasOwnProperty 和 instanceof 是两个不同的操作符，用于不同的目的。

1. hasOwnProperty

hasOwnProperty 是一个对象的原型方法，用来检测一个对象自身是否具有指定名称的属性（不会检查原型链上的属性）。其语法如下：

```
object.hasOwnProperty(property)
```

其中，object 是要检测的对象，property 是要检测的属性名。如果对象自身具有指定名称的属性，则返回 true，否则返回 false。

2. instanceof

instanceof 是一个运算符，用来检测一个对象是否是某个类的实例。其语法如下：

```
object instanceof constructor
```

其中，object 是要检测的对象，constructor 是要检测的类（构造函数）。如果对象是指定类的实例，则返回 true，否则返回 false。

举个例子来说，假设有以下代码：

```
function Person(name) {
 this.name = name;
}

var john = new Person("John");

console.log(john.hasOwnProperty("name")); // true
console.log(john instanceof Person); // true
```

上述代码中，我们创建了一个 Person 类，并使用构造函数创建了一个实例 john。然后我们分别使用 hasOwnProperty 和 instanceof 操作符检测 john 对象是否具有 name 属性和是否是 Person 类的实例，得到的结果分别为 true 和 true。

## 454 原型链的终点是什么？【热度: 1,325】

* created_at: 2023-06-13T15:42:53Z
* updated_at: 2023-06-13T15:42:54Z
* labels: JavaScript
* milestone: 初

**关键词**：原型链的终点

在JavaScript中，原型链的终点是 `null`。当访问一个对象的属性或方法时，如果当前对象没有该属性或方法，JavaScript引擎会沿着原型链向上查找，直到找到该属性或方法或者到达原型链的终点 `null`。

每个对象都有一个原型（`prototype`）属性，指向它的原型对象。原型对象也是一个对象，也有自己的原型，形成了原型链。原型链是由一系列对象的连接构成的，每个对象都有一个指向其原型的引用，通过这个引用可以沿着原型链向上查找属性和方法。

原型链的终点是 `null`，即最顶层的原型对象没有原型，它的 `[[Prototype]]` 指向 `null`。当查找属性或方法时，如果一直沿着原型链找到最顶层的原型对象仍然没有找到，则返回 `undefined`。

示例：

```javascript
const obj = {}
console.log(obj.toString()) // obj 没有定义 toString 方法，通过原型链找到 Object.prototype 上的 toString 方法

const arr = []
console.log(arr.join()) // arr 没有定义 join 方法，通过原型链找到 Array.prototype 上的 join 方法

const str = 'Hello'
console.log(str.toUpperCase()) // str 没有定义 toUpperCase 方法，通过原型链找到 String.prototype 上的 toUpperCase 方法

const num = 42
console.log(num.toFixed(2)) // num 没有定义 toFixed 方法，通过原型链找到 Number.prototype 上的 toFixed 方法

console.log(Object.prototype.__proto__) // 最顶层的原型对象 Object.prototype 的原型是 null
```

因此，原型链的终点是 `null`，表示在原型链的最顶层无法再继续向上查找。

## 455 异步编程的实现方式?【热度: 809】

* created_at: 2023-06-13T15:46:29Z
* updated_at: 2023-06-13T15:46:30Z
* labels: JavaScript
* milestone: 初

**关键词**：JS异步编程、JS异步编程实现方式

异步编程的实现方式有以下几种：

1. 回调函数

回调函数是最基本的异步编程方式。在执行异步操作时，将回调函数作为参数传递给异步函数，异步函数在操作完成后将结果传递给回调函数，回调函数再进行下一步操作。例如：

```
function getData(callback) {
 setTimeout(function () {
 callback('Data received');
 }, 1000);
}

getData(function(data) {
 console.log(data); // 'Data received'
});
```

2. Promise

Promise 是一种更高级的异步编程方式。通过 Promise 对象可以管理异步操作的状态、结果与错误。Promise 支持链式调用，使得异步操作的多个步骤可以更加清晰地表达。例如：

```
function getData() {
 return new Promise(function(resolve, reject) {
 setTimeout(function() {
 resolve('Data received');
 }, 1000);
 });
}

getData().then(function(data) {
 console.log(data); // 'Data received'
});
```

3. Async/await

Async/await 是基于 Promise 的一种语法糖，使异步操作的代码更加简单、易读。通过在函数前面加上 async 关键字，可以将函数变成 async 函数，使用 await 关键字可以等待 Promise 对象的结果。例如：

```
function getData() {
 return new Promise(function(resolve, reject) {
 setTimeout(function() {
 resolve('Data received');
 }, 1000);
 });
}

async function outputData() {
 const data = await getData();
 console.log(data); // 'Data received'
}

outputData();
```

4. Generator

Generator 是一种能够暂停和恢复执行的函数，可以用来实现异步编程。通过在函数中使用 yield 关键字可以暂停函数的执行，并在需要时恢复执行。例如：

```
function* getData() {
 yield new Promise(function(resolve, reject) {
 setTimeout(function() {
 resolve('Data received');
 }, 1000);
 });
}

const gen = getData();

gen.next().value.then(function(data) {
 console.log(data); // 'Data received'
});
```

总的来说，异步编程的实现方式有很多，不同的方式适用于不同的情况。在实际编码中，需要根据具体情况选择合适的方式来实现异步操作。

## 456 requestAnimationFrame 了解多少

* created_at: 2023-06-13T15:48:13Z
* updated_at: 2023-06-13T15:48:13Z
* labels: JavaScript
* milestone: 中

`requestAnimationFrame` 是一种优化动画性能的方法，它会在浏览器重绘之前执行指定的回调函数。相比于传统的 `setInterval` 或 `setTimeout` 方法，`requestAnimationFrame` 会在浏览器的下一次重绘之前执行回调函数，能够更好地与浏览器的渲染机制结合，减少页面的卡顿和闪烁。

`requestAnimationFrame` 的使用方法如下：

```javascript
let animationId

function animate () {
  animationId = requestAnimationFrame(animate)
  // 在这里执行动画代码
}

animate() // 启动动画
```

在上面的代码中，`requestAnimationFrame` 方法返回一个唯一的标识符，可以用来取消动画，如下所示：

```javascript
cancelAnimationFrame(animationId) // 取消动画
```

需要注意的是，`requestAnimationFrame` 并不一定每秒都会执行 60 次，它会根据浏览器的刷新频率来自动调整执行次数，保证动画的流畅性。同时，由于 `requestAnimationFrame` 是在浏览器的主线程中执行，如果动画计算量过大，会占用过多的 CPU 资源，导致页面的卡顿和性能问题。因此，需要合理使用 `requestAnimationFrame`，避免在单个动画中进行复杂的计算。

## 457 JS里的类就是构造函数的语法糖，这个说法是否正确【热度: 541】

* created_at: 2023-06-13T15:58:17Z
* updated_at: 2023-06-13T15:58:18Z
* labels: JavaScript, 腾讯
* milestone: 中

**关键词**：JS构造函数、JS类的语法糖

这个说法是正确的。

在 JavaScript 中，类实际上是构造函数的语法糖，也就是说，通过类的语法创建的对象和通过构造函数创建的对象是一样的。

例如，下面是一个通过构造函数创建对象的示例：

```javascript
function Person (name, age) {
  this.name = name
  this.age = age
}

Person.prototype.sayHello = function () {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
}

const person1 = new Person('Alice', 30)
person1.sayHello() // 输出：Hello, my name is Alice and I am 30 years old.
```

而使用类的语法创建对象的示例代码如下：

```javascript
class Person {
  constructor (name, age) {
    this.name = name
    this.age = age
  }

  sayHello () {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
  }
}

const person2 = new Person('Bob', 25)
person2.sayHello() // 输出：Hello, my name is Bob and I am 25 years old.
```

可以看到，使用类的语法创建对象时，实际上是在创建一个与构造函数相同的对象。在类中，类名即为构造函数的名称，类中的构造函数即为类的构造函数，类中的方法即为构造函数的原型方法。

在 JavaScript 中，类实际上是构造函数的语法糖，可以通过以下几个方面来体现：

1. 类的名称即为构造函数的名称，在类中通过 `constructor` 方法来初始化对象：

```javascript
class Person {
  constructor (name, age) {
    this.name = name
    this.age = age
  }

  sayHello () {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
  }
}

const person = new Person('Tom', 20)
console.log(person instanceof Person) // true
```

这里定义的 Person 类实际上就是一个构造函数，通过 `new` 关键字创建的对象也是一个 Person 类型的对象。

2. 在类中定义的方法即为构造函数的原型方法：

```javascript
class Person {
  constructor (name, age) {
    this.name = name
    this.age = age
  }

  sayHello () {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`)
  }
}

const person = new Person('Tom', 20)
person.sayHello() // 输出：Hello, my name is Tom and I am 20 years old.
```

可以看到，在类中定义的 `sayHello` 方法实际上就是 Person 构造函数的原型方法。

3. 子类继承父类时，使用 `super()` 方法调用父类的构造函数：

```javascript
class Animal {
  constructor (name) {
    this.name = name
  }

  speak () {
    console.log(this.name + ' makes a noise.')
  }
}

class Dog extends Animal {
  constructor (name, breed) {
    super(name)
    this.breed = breed
  }

  speak () {
    console.log(this.name + ' barks.')
  }
}

const dog = new Dog('Max', 'Labrador')
dog.speak() // 输出：Max barks.
```

这里定义了一个 Animal 类和一个继承自 Animal 类的 Dog 类，Dog 类在构造函数中通过 `super()` 方法调用了父类 Animal 的构造函数，实现了继承功能。可以看到，这里使用的 `super()` 方法也体现了类是构造函数的语法糖。

综上所述，JavaScript 中的类实际上是构造函数的语法糖，通过类的语法创建的对象和通过构造函数创建的对象是一样的。

## 458 如何判断dom元素是否在可视区域【热度: 846】

* created_at: 2023-06-13T16:07:11Z
* updated_at: 2023-06-13T16:07:12Z
* labels: web应用场景, 百度
* milestone: 中

**关键词**：元素是否在可视区域

判断 DOM 元素是否在可视区域可以使用以下方法：

1. getBoundingClientRect() 方法

该方法返回元素的大小及其相对于视口的位置，包括 top、right、bottom、left 四个属性。我们可以根据这四个属性来判断元素是否在可视区域内。

```javascript
function isInViewport (element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
 rect.left >= 0 &&
 rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
 rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Example usage
const element = document.getElementById('my-element')
if (isInViewport(element)) {
  console.log('Element is in viewport')
} else {
  console.log('Element is not in viewport')
}
```

2. IntersectionObserver API

该 API 可以观察元素与其祖先元素或视口交叉的情况，并且可以设置回调函数，当元素的可见性发生变化时会调用该回调函数。

```javascript
function callback (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('Element is in viewport')
    } else {
      console.log('Element is not in viewport')
    }
  })
}

const observer = new IntersectionObserver(callback)

const element = document.getElementById('my-element')
observer.observe(element)
```

使用 IntersectionObserver API 的优点是可以减少不必要的计算和事件监听，提高了性能。

## 459 [代码实现] 手写实现 Object.create【热度: 179】

* created_at: 2023-06-13T16:15:06Z
* updated_at: 2023-09-06T15:52:19Z
* labels: 小米, 代码实现/算法
* milestone: 初

**关键词**：Object.create实现、Object.create手写

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

## 460 [代码实现] 手写实现 instanceof【热度: 535】

* created_at: 2023-06-13T16:18:14Z
* updated_at: 2023-09-06T15:52:15Z
* labels: PDD, 代码实现/算法
* milestone: 初

**关键词**：instanceof原理、instanceof实现、instanceof手写

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

## 461 [代码实现] 实现数组的flat方法，支持深度层级参数

* created_at: 2023-06-14T15:13:38Z
* updated_at: 2023-09-06T15:52:11Z
* labels: 京东, 代码实现/算法
* milestone: 中

可以通过传入一个深度参数来限制 flat 方法的递归深度。实现如下：

```
function flat(arr, depth = 1) {
 let res = [];
 for (let i = 0; i < arr.length; i++) {
 if (Array.isArray(arr[i]) && depth > 0) {
 res = res.concat(flat(arr[i], depth - 1));
 } else {
 res.push(arr[i]);
 }
 }
 return res;
}
```

这里在原有的 flat 方法基础上增加了一个 depth 参数，每递归一层，深度就减一，当深度为 0 时就不再递归。

## 462 斐波拉契数列是什么，用 JS 实现，用尾调优化斐波拉契数列【热度: 923】

* created_at: 2023-06-14T15:18:25Z
* updated_at: 2023-06-14T15:18:26Z
* labels: JavaScript, 网易
* milestone: 中

**关键词**：斐波拉契数列、尾调优化

斐波那契数列是指：0、1、1、2、3、5、8、13、21、34、……，在数学上，斐波那契数列以如下被以递归的方法定义：

F(0) = 0, F(1) = 1
F(n) = F(n-1) + F(n-2) (n > 1)

用 JS 实现斐波那契数列可以如下：

```
function fibonacci(n) {
 if (n <= 1) {
 return n;
 }
 return fibonacci(n - 1) + fibonacci(n - 2);
}
```

这个函数用递归的方式实现了斐波那契数列的求解。但是递归会导致函数栈的不断扩张，当 n 很大的时候会导致栈溢出。所以为了避免这种情况，可以使用尾调用优化。

尾调用优化是指：一个函数的最后一个操作是一个函数调用，并且这个调用的返回值就是这个函数的返回值。这种情况下，函数的调用栈可以被重用，从而避免了栈溢出的问题。

用尾调用优化实现斐波那契数列可以如下：

```
function fibonacci(n, curr = 0, next = 1) {
 if (n === 0) {
 return curr;
 }
 return fibonacci(n - 1, next, curr + next);
}
```

这个函数用了 ES6 的默认参数来实现了尾调用优化。由于函数的最后一个操作是对 fibonacci 函数的递归调用，并且这个调用的返回值就是函数的返回值，所以这个递归调用被尾调用优化了。

## 463 [vue] vue2.x 响应式原理是什么【热度: 669】

* created_at: 2023-06-14T15:50:15Z
* updated_at: 2023-06-14T15:50:16Z
* labels: web框架, Shopee
* milestone: 高

**关键词**：vue响应式、Observe、Compile、Watcher

Vue.js 的响应式原理主要是通过数据劫持（Object.defineProperty()）实现。当我们在Vue实例中定义了一个 data 属性时，Vue 会对这个属性进行劫持，即在getter和setter时做一些操作。

具体实现流程如下：

1. 在Vue实例化时，Vue 会对 data 对象进行遍历，使用 Object.defineProperty() 方法将每个属性转换为 getter 和 setter。
2. 当数据发生变化时，setter 会被调用，并通知所有相关联的视图进行更新。
3. 当视图进行更新时，Vue 会对新旧 VNode 进行比对（diff）, 只对发生了变化的部分进行更新，从而提高效率。

这种数据劫持的方式能够让开发者以声明式的方式来编写代码，同时又能够监测到数据的变化，并及时地通知相关视图进行更新。

Vue 的响应式原理还包括了watcher和dep的概念。Watcher 用于监听数据的变化，并在变化时触发相应的回调函数，而 Dep 则用于收集 Watcher，当数据发生变化时通知所有相关的 Watcher 去更新视图。

Vue 的响应式原理是一种通过数据劫持实现的观察者模式，通过对数据的监听和更新，实现了数据驱动视图的变化，提高了代码的可维护性和开发效率。

响应式流程:

1. Observe：Vue 在实例化时会对 data 对象进行遍历，将每个属性转换为 getter 和 setter，以进行数据劫持。当数据发生变化时，setter 会被调用。在 setter 中，Vue 会通知所有相关的 Watcher 去更新视图。

2. Compile：Compile 是 Vue 的编译器，用于编译模板，将模板转换为 VNode。在编译模板时，Compile 会根据模板中的指令和表达式创建对应的 Watcher。当数据发生变化时，相关的 Watcher 会被触发，从而更新视图。

3. Watcher：Watcher 是订阅者，用于监听数据的变化，并在变化时触发相应的回调函数。每个 Watcher 都会对应一个数据项和一个表达式。当数据发生变化时，Watcher 会重新计算表达式的值，并触发回调函数。

4. Dep：Dep 用于收集 Watcher，当数据发生变化时通知所有相关的 Watcher 去更新视图。在 Observe 中，每个属性都会对应一个 Dep。在 getter 中，如果当前 Watcher 存在，则会将该 Watcher 添加到 Dep 中。在 setter 中，如果数据发生变化，则会通知 Dep 中所有的 Watcher 去更新视图。

综上所述，Observe、Compile、Watcher 和 Dep 一起构成了 Vue 的响应式流程。这一流程包括了数据劫持、模板编译、订阅者监听和更新视图等多个环节，从而实现了 Vue 的数据驱动视图的特性。

## 464 [react] 数组用useState做状态管理的时候，使用push，pop，splice等直接更改数组对象，会引起页面渲染吗？【热度: 488】

* created_at: 2023-06-21T00:41:28Z
* updated_at: 2023-06-21T00:41:28Z
* labels: web框架, 快手
* milestone: 中

**关键词**：useState状态管理、push 直接更改数组对象、pop 直接更改数组对象、splice 直接更改数组对象

在React中，使用useState时使用`push`，`pop`，`splice`等直接更改数组对象是不推荐的做法，因为这种直接更改数组的方式会改变原始状态，React不会检测到这种状态变化，从而无法正确地渲染页面。因此，在React中更新数组状态的正确方式是创建一个新的数组对象，然后使用`set`函数来更新状态，这样React就能够正确地检测到状态变化，并重新渲染页面。

例如，在使用useState管理数组状态时，如果想要向数组中添加一个新元素，可以使用以下方式：

```javascript
const [list, setList] = useState([])

function handleAdd () {
  // 创建一个新的数组对象
  const newList = [...list]
  // 向新数组中添加新元素
  newList.push('new item')
  // 更新状态
  setList(newList)
}
```

在这个例子中，我们首先创建了一个新的数组对象newList，然后向这个新数组中添加新元素，最后使用setList函数更新状态。这样，React就能够正确地检测到状态变化，并重新渲染页面。

## 465 [react] 如何合理使用 useContext【热度: 1,326】

* created_at: 2023-06-21T00:56:59Z
* updated_at: 2023-06-21T01:00:37Z
* labels: web框架, 腾讯
* milestone: 高

**关键词**：合理使用 context 的层级、避免滥用 context、避免context引起重复渲染、优化context重复渲染

 如何合理使用 useContext

useContext 是 React 中提供的一种跨组件传递数据的方式，可以让我们在不同层级的组件之间共享数据，避免了繁琐的 props 传递过程。使用 useContext 可以大大简化组件之间的通信方式，提高代码可维护性和可读性。

下面是一些使用 useContext 的最佳实践：

1. 合理使用 context 的层级

context 可以跨组件传递数据，但是过多的 context 层级会使代码变得复杂、难以维护，而且会影响性能。因此，应该尽量避免嵌套过多 context 的层级，保持简单的组件结构。

2. 将 context 统一定义在一个文件中

为了方便管理和使用，我们应该将 context 的定义统一放在一个文件中，这样能够避免重复代码，也能方便其他组件引用。

3. 使用 context.Provider 提供数据

使用 context.Provider 来提供数据，将数据传递给子组件。在 Provider 中可以设置 value 属性来传递数据。

4. 使用 useContext 获取数据

使用 useContext hook 来获取 context 中的数据。useContext 接收一个 context 对象作为参数，返回 context 的当前值。这样就可以在组件中直接使用 context 中的数据。

5. 避免滥用 useContext

虽然 useContext 可以方便地跨组件传递数据，但是滥用 useContext 也会使代码变得难以维护。因此，在使用 useContext 时，应该优先考虑组件通信是否真的需要使用
useContext。只有在需要跨越多级组件传递数据时，才应该使用 useContext 解决问题。

 如何避免使用 context 的时候， 引起整个挂载节点树的重新渲染？

使用 context 时，如果 context 中的值发生了变化，会触发整个组件树的重新渲染。这可能会导致性能问题，特别是在组件树较大或者数据变化频繁的情况下。

为了避免这种情况，可以采用以下方法：

1. 对 context 值进行优化

如果 context 中的值是一个对象或者数组，可以考虑使用 useMemo 或者 useCallback 对其进行优化。这样可以确保只有在值发生变化时才会触发重新渲染。

2. 将 context 的值进行拆分

如果 context 中的值包含多个独立的部分，可以考虑将其进行拆分，将不需要更新的部分放入另一个 context 中。这样可以避免因为一个值的变化而导致整个组件树的重新渲染。

3. 使用 shouldComponentUpdate 或者 React.memo 进行优化

对于一些需要频繁更新的组件，可以使用 shouldComponentUpdate 或者 React.memo 进行优化。这样可以在值发生变化时，只重新渲染需要更新的部分。

4. 使用其他数据管理方案

如果 context 不能满足需求，可以考虑使用其他数据管理方案，如 Redux 或者 MobX。这些方案可以更好地控制数据更新，避免不必要的渲染。

**如果 context 中的值是一个对象或者数组，可以考虑使用 useMemo 或者 useCallback 对其进行优化**

代码举例： 以下是一个使用 useMemo 对 context 值进行优化的示例代码：

```tsx
import React, { useMemo, createContext } from 'react'

// 创建一个 Context
const MyContext = createContext()

// 创建一个 Provider
const MyProvider = ({ children }) => {
  // 定义一个复杂的数据对象
  const data = useMemo(() => {
    // 这里可以是一些复杂的计算逻辑
    return {
      name: 'Alice',
      age: 18,
      hobbies: ['Reading', 'Traveling', 'Sports'],
      friends: [
        { name: 'Bob', age: 20 },
        { name: 'Charlie', age: 22 },
        { name: 'David', age: 24 }
      ]
    }
  }, [])

  return (
 // 将 data 作为 value 传入 context.Provider
 <MyContext.Provider value={data}>
 {children}
 </MyContext.Provider>
  )
}

// 在 Consumer 中使用 context
const MyConsumer = () => {
  return (
 <MyContext.Consumer>
 {data => (
 <div>
 <div>Name: {data.name}</div>
 <div>Age: {data.age}</div>
 <div>Hobbies: {data.hobbies.join(', ')}</div>
 <div>Friends:
 <ul>
 {data.friends.map(friend => (
 <li key={friend.name}>
 {friend.name} ({friend.age})
 </li>
 ))}
 </ul>
 </div>
 </div>
 )}
 </MyContext.Consumer>
  )
}

// 使用 MyProvider 包裹需要使用 context 的组件
const App = () => {
  return (
 <MyProvider>
 <MyConsumer />
 </MyProvider>
  )
}

export default App
```

在上面的示例中，我们使用了 useMemo 对复杂的数据对象进行了缓存。这样，当 context 中的值变化时，只会重新计算数据对象的值，而不是重新创建一个新的对象。这样可以有效地减少不必要的渲染。

## 466 [react] constructor 和 getInitialState 的区别?【热度: 785】

* created_at: 2023-06-21T01:10:15Z
* updated_at: 2023-06-21T01:10:16Z
* labels: web框架, 百度
* milestone: 中

**关键词**：react constructor 作用、react getInitialState 作用、初始化 state

在 React 中，constructor 是一个类的构造函数，用于初始化类的成员变量和方法，这个函数不仅会在组件实例化时调用，还会在后续的组件更新时调用。而 getInitialState 是一个组件的声明周期函数，用于初始化组件的状态，该函数只会在组件实例化时调用一次，后续的更新不会再调用。

具体来说，constructor 用于初始化类成员变量和方法，如下面的示例代码所示：

```
class MyComponent extends React.Component {
 constructor(props) {
 super(props);
 this.state = {
 count: 0
 };
 this.handleClick = this.handleClick.bind(this);
 }

 handleClick() {
 this.setState({ count: this.state.count + 1 });
 }

 render() {
 return (
 <div>
 <p>Count: {this.state.count}</p>
 <button onClick={this.handleClick}>Click me</button>
 </div>
 );
 }
}
```

在上面的代码中，constructor 用于初始化组件的状态 count 和绑定 handleClick 方法的 this 指向。每次组件更新时，constructor 函数都会被调用。

而 getInitialState 则是用于初始化组件的状态，如下面的示例代码所示：

```
class MyComponent extends React.Component {
 getInitialState() {
 return {
 count: 0
 };
 }

 handleClick() {
 this.setState({ count: this.state.count + 1 });
 }

 render() {
 return (
 <div>
 <p>Count: {this.state.count}</p>
 <button onClick={this.handleClick}>Click me</button>
 </div>
 );
 }
}
```

在上面的代码中，getInitialState 用于初始化组件的状态 count，该函数只会在组件实例化时调用一次。后续的更新不会再调用。需要注意的是，在 React 16.3 之后，getInitialState 已经不再被支持，需要使用 constructor 来初始化 state。

## 467 如何理解研发流程和研发效率，如何保障研发效率

* created_at: 2023-06-26T15:45:30Z
* updated_at: 2023-06-26T15:45:31Z
* labels: 工程化, 小米
* milestone: 资深

 保障研发效率

研发流程指的是从需求调研、设计、开发、测试、发布、维护等一系列环节组成的整个研发过程。它是实现软件产品的必经之路，可以帮助团队规范化、标准化研发流程，提高研发效率、降低研发成本、提高产品质量和用户满意度。

研发效率指的是在研发流程中，完成同样的工作所需要的时间和成本，也就是研发效率越高，就可以在同样的时间内完成更多的工作，并在更短的时间内推出产品，提高团队的竞争力和市场占有率。

保障研发效率可以从以下几个方面入手：

1. 优化研发流程：通过优化整个研发流程，缩短产品上线周期，降低研发成本，提高产品质量和用户满意度。

2. 确定明确的目标和任务：团队需要清楚地了解产品的目标和任务，明确每个人的责任和任务，以便更好地完成工作。

3. 提供优秀的工具和环境：为团队提供高效的工具和优秀的开发环境，帮助开发者更好地完成工作，提高工作效率。

4. 加强团队协作和沟通：团队成员之间需要建立良好的沟通和协作机制，通过有效的沟通和协作，提高工作效率和质量。

5. 持续学习和提高技能：团队成员需要不断学习新知识和提高技能，接受新技术，以便更好地完成工作，提高研发效率。

 具体讲一下如何优化研发流程

优化研发流程可以从以下几个方面入手：

1. 需求管理：建立明确的需求管理机制，包括需求收集、需求筛选、需求优化、需求变更管理等，以确保需求的准确性、完整性、一致性和可追溯性。

2. 设计管理：建立明确的设计管理机制，包括设计评审、设计文档管理、设计变更管理等，以确保设计的合理性、可行性、可维护性和可扩展性。

3. 开发管理：建立高效的开发管理机制，包括任务分配、代码管理、代码审查、编码规范管理等，以确保开发的效率、质量和一致性。

4. 测试管理：建立严格的测试管理机制，包括测试计划、测试用例管理、测试环境管理、缺陷管理等，以确保产品的质量和稳定性。

5. 发布管理：建立有效的发布管理机制，包括版本控制、发布计划、发布测试、发布文档等，以确保产品的稳定性和用户满意度。

6. 迭代管理：建立迭代管理机制，通过不断的迭代和优化，提高产品的质量和用户满意度，保持团队的创新和活力。

7. 数据分析：建立数据分析机制，通过数据分析和用户反馈，不断优化产品和流程，提高团队的效率和竞争力。

优化研发流程需要建立标准化、规范化的流程和管理机制，不断优化和改善流程，并建立有效的沟通和协作机制，以提高团队的效率和产品质量，满足用户的需求和期望。

**如何保证上述机制能够正确推进下去？**

为了确保上述机制能够正确推进下去，可以采取以下措施：

1. 建立标准化的流程和管理机制，并将其纳入团队的日常工作流程中，确保每个团队成员都能够遵循。

2. 建立监控和评估机制，对各项机制进行定期的检查、评估和反馈，并根据实际情况进行调整和改进。

3. 建立协作和沟通机制，促进团队成员之间的协作和沟通，确保各项机制能够得到正确的执行和落实。

4. 建立培训和学习机制，定期培训团队成员，提高其专业技能和管理能力，增强其执行机制的能力和信心。

5. 采用项目管理工具和平台，对各项机制进行集中管理和监控，确保团队成员能够及时获取和共享必要的信息和资源。

要保证各项机制能够正确推进下去，需要建立完善的流程和管理机制，并通过监控、评估、协作、沟通、培训和技术支持等措施，确保团队成员能够正确执行和落实机制，从而提高团队的效率和竞争力。

 确定明确需求目标和需求内容

首要任务是对需求进行拆解拆分，需要进行需求拆分来更好地管理和实现项目目标。以下是对大型项目进行需求拆分的建议：

对于一个大型项目，需要进行需求拆分来更好地管理和实现项目目标。以下是对大型项目进行需求拆分的建议：

1. 确定项目范围：明确项目的目标和范围，明确项目所需的主要功能和特性。

2. 列出项目需求：将项目所需的各种需求列出来，包括功能需求、性能需求、安全需求、可靠性需求等。

3. 进行需求分类：将需求进行分类，可以按照功能、用户、业务流程等方式进行分类。

4. 制定需求文档：根据需求分类，制定详细的需求文档，包括需求描述、优先级和验收标准等。

5. 制定项目计划：根据需求文档，制定项目计划，包括任务分解、时间安排和资源分配等。

6. 协同开发：在开发过程中，需要协同进行开发，进行需求变更和调整。

7. 进行验收和测试：在项目结束时，进行验收和测试，确保项目满足客户需求和要求。

## 468 前端如何用 canvas 来做电影院选票功能

* created_at: 2023-06-26T15:55:34Z
* updated_at: 2023-06-26T15:55:35Z
* labels: web应用场景, 网易
* milestone: 中

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

## 469 如何通过设置失效时间清除本地存储的数据？【热度: 1,085】

* created_at: 2023-07-04T15:26:21Z
* updated_at: 2023-07-04T15:26:22Z
* labels: web应用场景, Shopee
* milestone: 中

**关键词**：定时清除本地存储

要清除本地存储的数据，可以通过设置失效时间来实现。以下是一种常见的方法：

1. 将数据存储到本地存储中，例如使用localStorage或sessionStorage。

2. 在存储数据时，同时设置一个失效时间。可以将失效时间存储为一个时间戳或特定的日期时间。

3. 在读取数据时，检查当前时间是否超过了失效时间。如果超过了失效时间，则认为数据已过期，需要清除。

4. 如果数据已过期，则使用localStorage.removeItem(key)或sessionStorage.removeItem(key)方法删除该数据。

以下是一个示例代码：

```javascript
// 存储数据
function setLocalStorageData (key, data, expiration) {
  const item = {
    data,
    expiration
  }
  localStorage.setItem(key, JSON.stringify(item))
}

// 读取数据
function getLocalStorageData (key) {
  let item = localStorage.getItem(key)
  if (item) {
    item = JSON.parse(item)
    if (item.expiration && new Date().getTime() > item.expiration) {
      // 数据已过期，清除数据
      localStorage.removeItem(key)
      return null
    }
    return item.data
  }
  return null
}

// 示例用法
const data = { name: 'John', age: 30 }
const expiration = new Date().getTime() + 36001000 // 设置失效时间为当前时间后的1小时
setLocalStorageData('user', data, expiration)

const storedData = getLocalStorageData('user')
console.log(storedData)
```

在示例代码中，setLocalStorageData函数用于存储数据，并接受一个失效时间参数。getLocalStorageData函数用于读取数据，并检查失效时间是否已过期。如果数据已过期，则清除数据。示例中的失效时间设置为当前时间后的1小时。

## 470 如果不使用脚手架， 如果用 webpack 构建一个自己的 react 应用【热度: 729】

* created_at: 2023-07-04T15:35:41Z
* updated_at: 2023-07-04T15:35:42Z
* labels: web应用场景, 快手
* milestone: 高

**关键词**：构建 react 应用

 利用 webpack 初始化基本应用构建

要在Webpack配置中添加对Less和Ant Design组件库的支持，需要进行以下步骤：

1. 安装所需的依赖。

```bash
npm install less less-loader antd
```

2. 在Webpack配置文件中添加对Less的支持。

```javascript
module.exports = {
  // ...其他配置

  module: {
    rules: [
      // ...其他规则

      {
        test: /\.less$/, // 匹配Less文件
        use: [
          'style-loader', // 将CSS插入到页面中
          'css-loader', // 解析CSS文件
          'less-loader' // 将Less转换为CSS
        ]
      }
    ]
  }

  // ...其他配置
}
```

3. 在入口文件中引入Ant Design的样式文件。

```javascript
// 入口文件 index.js

import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css' // 引入Ant Design的样式文件
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```

现在你可以在React组件中使用Ant Design的组件和样式了。例如，在`App.js`中使用Ant Design的Button组件：

```javascript
// App.js

import React from 'react'
import { Button } from 'antd'

function App () {
  return (
 <div>
 <h1>Hello, React!</h1>
 <Button type="primary">Click me</Button>
 </div>
  )
}

export default App
```

重新运行Webpack开发服务器，你应该能够看到Ant Design的Button组件正常显示在页面上。

以上是一种简单的配置方法，你还可以根据需要进行更高级的配置，例如按需加载、自定义主题等。有关更多信息，请参阅Webpack和Ant Design的官方文档。

 使用 less 应该如何配置， 同时支持 css module 和 非 css module

如果你想在Webpack配置中同时支持Less和CSS Module（局部作用域的CSS），可以使用以下配置。

1. 安装所需的依赖。

```bash
npm install less less-loader css-loader style-loader
```

2. 在Webpack配置文件中添加对Less和CSS的支持。

```javascript
module.exports = {
  // ...其他配置

  module: {
    rules: [
      // ...其他规则

      {
        test: /\.less$/, // 匹配Less文件
        exclude: /\.module\.less$/, // 排除CSS Module的Less文件
        use: [
          'style-loader', // 将CSS插入到页面中
          'css-loader', // 解析CSS文件
          'less-loader' // 将Less转换为CSS
        ]
      },
      {
        test: /\.module\.less$/, // 匹配CSS Module的Less文件
        use: [
          'style-loader', // 将CSS插入到页面中
          {
            loader: 'css-loader', // 解析CSS文件
            options: {
              modules: true // 启用CSS Module
            }
          },
          'less-loader' // 将Less转换为CSS
        ]
      }
    ]
  }

  // ...其他配置
}
```

现在，你可以同时使用普通的Less文件和CSS Module的Less文件。例如，`styles.module.less`是一个CSS Module的Less文件，`styles.less`是一个普通的Less文件。

```less
/* styles.module.less */

.container {
 background-color: red;
}
```

```less
/* styles.less */

.text {
 color: blue;
}
```

在React组件中使用这些样式：

```javascript
import React from 'react'
import styles from './styles.module.less' // 导入CSS Module的样式
import './styles.less' // 导入普通的Less样式

function App () {
  return (
 <div className={styles.container}>
 <h1 className="text">Hello, React!</h1>
 </div>
  )
}

export default App
```

这样，`styles.container`将应用CSS Module的样式，`.text`将应用普通的Less样式。

重新运行Webpack开发服务器，你应该能够看到样式正常应用到组件中。

 如何引入 antd 组件并且支持按需加载

要引入antd组件并支持按需加载，你需要进行以下配置。

1. 安装antd和babel插件。

```bash
npm install antd babel-plugin-import --save
```

2. 在.babelrc文件中配置babel插件。

```json
{
 "plugins": [
 [
 "import",
 {
 "libraryName": "antd",
 "style": "css"
 }
 ]
 ]
}
```

3. 在Webpack配置文件中添加对Less和CSS的支持。

```javascript
module.exports = {
  // ...其他配置

  module: {
    rules: [
      // ...其他规则

      {
        test: /\.less$/, // 匹配Less文件
        exclude: /node_modules/,
        use: [
          'style-loader', // 将CSS插入到页面中
          'css-loader', // 解析CSS文件
          'less-loader' // 将Less转换为CSS
        ]
      }
    ]
  }

  // ...其他配置
}
```

4. 在你的组件中引入antd组件。

```javascript
import React from 'react'
import { Button } from 'antd'

function App () {
  return <Button type="primary">Hello, Antd!</Button>
}

export default App
```

现在，你可以使用antd组件并且只加载你需要的组件样式。Webpack会根据需要自动按需加载antd组件的样式文件。

## 471 webpack 如何配置按需加载的模块【热度: 693】

* created_at: 2023-07-06T13:57:35Z
* updated_at: 2023-07-06T14:25:42Z
* labels: web应用场景, Shopee
* milestone: 高

**关键词**：webpack 配置按需加载、webpack 按需加载、react lazy 加载

 如何配置 webpack 按需加载

要配置webpack项目模块按需加载，你可以使用webpack的代码分割（code splitting）功能和动态导入（dynamic import）语法。

以下是一些配置步骤：

1. 在webpack配置文件中，设置`output`选项中的`chunkFilename`属性，用于指定按需加载模块的输出文件名。例如：

```javascript
output: {
 filename: 'bundle.js',
 chunkFilename: '[name].bundle.js',
 path: path.resolve(__dirname, 'dist')
}
```

2. 在应用程序中使用动态导入语法加载需要按需加载的模块。例如：

```javascript
import(/* webpackChunkName: "moduleName" */ './module')
  .then(module => {
    // 使用加载的模块
  })
  .catch(error => {
    // 处理加载错误
  })
```

注意：在动态导入语法中，`/* webpackChunkName: "moduleName" */`是可选的，用于指定生成的输出文件的名称。

3. 运行webpack构建，它将根据动态导入语法将模块拆分为单独的文件。

4. 当需要按需加载模块时，webpack将自动异步加载并将模块添加到页面中。

 webpack 配置按需加载 和 react lazy 有什么关系

Webpack配置按需加载和React的`lazy`函数是实现按需加载的两个不同方面，它们可以一起使用来优化React应用的性能。

Webpack配置按需加载是通过代码分割（code splitting）的方式，将应用程序的代码分割成多个小块，并在需要时按需加载这些块。这样可以减小初始加载的文件大小，提高页面加载速度。Webpack提供了一些配置选项和动态导入语法来实现按需加载。

而React的`lazy`函数是React 16.6版本引入的新特性，用于实现组件的按需加载。通过使用`lazy`函数，你可以将组件的加载延迟到它们实际需要被渲染到页面上的时候。这样可以减小初始加载的组件数量，并且提高应用程序的性能。

结合Webpack配置按需加载和React的`lazy`函数，在React应用中你可以按需加载组件，并且Webpack会自动将这些组件拆分为单独的文件进行按需加载。这样可以实现在需要时动态加载组件，以及减小初始加载的文件大小，提高应用程序的性能。

下面是一个示例，展示了如何使用Webpack配置按需加载和React的`lazy`函数：

```javascript
import React, { lazy, Suspense } from 'react'

const LazyComponent = lazy(() => import('./LazyComponent'))

function App () {
  return (
 <div>
 <Suspense fallback={<div>Loading...</div>}>
 <LazyComponent />
 </Suspense>
 </div>
  )
}
```

在上面的示例中，`lazy`函数用于按需加载`./LazyComponent`组件。`Suspense`组件用于在组件加载时提供一个加载中的提示（fallback）。当`LazyComponent`组件需要渲染时，Webpack将会按需加载`./LazyComponent`组件的代码。

使用Webpack配置按需加载和React的`lazy`函数可以有效地优化React应用的性能，提高应用程序的加载速度。

 要支持 React lazy， webpack 还需要配置什么吗？

为了支持React的`lazy`函数，还需要在Webpack配置中添加一些额外的配置。

首先，你需要确保你的Webpack配置中启用了代码分割（code splitting）功能。这可以通过以下方式配置：

```javascript
// webpack.config.js

module.exports = {
  // ...其他配置
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}
```

这个配置会告诉Webpack在生成代码块时将公共的依赖模块提取到单独的文件中，以实现代码的共享和按需加载。

然后，你需要使用`@babel/preset-react`预设配置Babel，以支持React的`lazy`函数。你可以在`.babelrc`文件中添加以下配置：

```json
{
 "presets": [
 "@babel/preset-react"
 ]
}
```

最后，确保你的React代码使用了`lazy`函数进行组件的按需加载，如前面的示例所示：

```javascript
import React, { lazy, Suspense } from 'react'

const LazyComponent = lazy(() => import('./LazyComponent'))

function App () {
  return (
 <div>
 <Suspense fallback={<div>Loading...</div>}>
 <LazyComponent />
 </Suspense>
 </div>
  )
}
```

通过以上步骤配置Webpack，你就可以使用React的`lazy`函数实现组件的按需加载了。Webpack会自动将按需加载的组件拆分为单独的文件，并在需要时进行加载。这样可以提高React应用的性能和加载速度。

## 472 用 nodejs 实现一个命令行工具， 统计输入目录下面指定代码的行数【热度: 732】

* created_at: 2023-07-06T14:03:51Z
* updated_at: 2023-07-06T14:04:04Z
* labels: web应用场景, 网易
* milestone: 中

**关键词**：统计指定目录下代码行数

要实现一个命令行工具来统计输入目录下指定代码的行数，你可以使用Node.js的`fs`模块来读取文件内容并进行行数统计。以下是一个简单的实现示例：

```javascript
const fs = require('fs')
const path = require('path')

function countLinesInDirectory (dirPath, fileExtension) {
  let totalLines = 0

  function countLinesInFile (filePath) {
    const content = fs.readFileSync(filePath, 'utf-8')
    const lines = content.split('\n')
    totalLines += lines.length
  }

  function processDirectory (directoryPath) {
    const files = fs.readdirSync(directoryPath)

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file)
      const stats = fs.statSync(filePath)

      if (stats.isFile() && path.extname(file) === fileExtension) {
        countLinesInFile(filePath)
      } else if (stats.isDirectory()) {
        processDirectory(filePath)
      }
    })
  }

  processDirectory(dirPath)

  return totalLines
}

// 命令行参数，第一个参数是目录路径，第二个参数是文件扩展名
const [_, __, dirPath, fileExtension] = process.argv

const linesCount = countLinesInDirectory(dirPath, fileExtension)
console.log(`Total lines of ${fileExtension} files in ${dirPath}: ${linesCount}`)
```

你可以将上述代码保存为一个JavaScript文件，比如`line-counter.js`。然后，在终端中运行以下命令：

```
node line-counter.js /path/to/directory .js
```

其中`/path/to/directory`是你要统计的目录路径，`.js`是你要统计的文件扩展名。运行命令后，程序将会输出指定文件类型在指定目录中的总行数。

你可以根据需要自定义输出格式、文件过滤规则等。此示例只是一个基本的实现，你可以根据具体需求进行扩展和优化。

## 473 package.json 里面 sideEffects 属性的作用是啥【热度: 629】

* created_at: 2023-07-06T14:25:20Z
* updated_at: 2023-07-06T14:25:33Z
* labels: web应用场景, 京东
* milestone: 中

**关键词**：sideEffects作用、package.json sideEffects 属性、webpack Tree Shaking 优化、Tree Shaking 优化

 sideEffects 作用

`sideEffects`是`package.json`文件中的一个字段，它用于指定一个模块是否具有副作用。副作用是指模块在加载时会执行一些特定的操作，而不仅仅是导出一个函数或对象。

`sideEffects`字段可以有以下几种取值：

* `true`：表示模块具有副作用，即模块加载时会执行一些操作。这是默认值，如果没有在`package.json`中明确指定`sideEffects`字段，则假设为`true`。
* `false`：表示模块没有副作用，即模块加载时不会执行任何操作。这意味着该模块只导出函数、对象或其他静态内容，并且不依赖于其他模块的副作用。
* 数组：可以将模块的具体文件路径或文件匹配模式（使用glob模式）列在数组中，以指定哪些文件具有副作用，哪些文件没有副作用。例如，`["./src/*.js", "!./src/utils/*.js"]`表示`src`目录下的所有`.js`文件都具有副作用，但是`src/utils`目录下的`.js`文件没有副作用。

使用`sideEffects`字段可以帮助构建工具（如Webpack）进行优化。如果模块没有副作用，构建工具可以进行更好的摇树优化（tree shaking），即只保留项目所需的代码，而将未使用的代码消除，从而减小最终打包文件的大小。

注意：在使用`sideEffects`字段时，需要确保你的代码确实没有副作用，否则可能会导致意外的行为。

 sideEffects 是如何辅助 webpack 进行优化的？

`sideEffects`字段可以帮助Webpack进行摇树优化（Tree Shaking），从而减小最终打包文件的大小。摇树优化是指只保留项目所需的代码，而将未使用的代码消除。

当Webpack打包时，它会通过静态分析来确定哪些导入的模块实际上被使用了，然后只保留这些被使用的代码，并将未使用的代码从最终的打包文件中删除。

在这个过程中，Webpack会检查模块的`sideEffects`字段。如果一个模块具有`sideEffects`字段，并且设置为`false`，Webpack会认为该模块没有副作用。Webpack会在摇树优化过程中将未使用的导出从该模块中删除，因为它不会影响项目的功能。

然而，如果一个模块具有`sideEffects`字段，并且设置为`true`或是一个数组，Webpack会认为该模块具有副作用。在摇树优化过程中，Webpack会保留该模块的所有导出，因为它不能确定哪些代码是副作用的。这样可以确保项目中需要的副作用代码不会被误删除。

因此，通过正确使用`sideEffects`字段，可以帮助Webpack更好地优化打包文件，减少不必要的代码，提高应用程序的性能。

## 475 [React] 合成事件和原生事件触发的先后顺序如何？【热度: 1,445】

* created_at: 2023-07-09T11:40:34Z
* updated_at: 2023-07-09T11:40:35Z
* labels: web框架
* milestone: 中

**关键词**：React合成事件、原生事件、事件执行先后顺序

在React中，合成事件和原生事件的触发顺序是先合成事件，然后是原生事件。

React使用了一种称为"合成事件"的机制来处理事件。当你在组件中使用事件属性（例如onClick）时，React会在底层创建合成事件，并将其附加到相应的DOM元素上。合成事件是React自己实现的一套事件系统，它通过事件委托和其他技术来提供更好的性能和一致的事件处理方式。

当触发一个合成事件时，React会首先执行事件的处理函数，然后会调用合成事件的`stopPropagation()`方法来阻止事件冒泡。如果处理函数调用了`stopPropagation()`，则合成事件会终止，不再触发原生事件。

如果合成事件没有被终止，并且对应的DOM元素上还有原生事件监听器，React会触发相应的原生事件。原生事件是由浏览器提供的，React并没有对其进行改变或拦截。

因此，合成事件和原生事件的触发顺序是**先合成事件，然后是原生事件**。这意味着在事件处理函数中，你可以放心地使用合成事件对象，而不需要担心原生事件的影响。

**为何有一些文章是说， 原生事件先执行？**

原生事件先执行的说法是因为在React早期的版本中，React使用事件委托的方式来处理事件。事件委托是指将事件处理函数绑定在父元素上，然后利用事件冒泡机制，通过父元素捕获并处理子元素的事件。这种方式会导致在事件冒泡阶段，父元素的事件处理函数会先于子元素的事件处理函数执行。

在这种情况下，如果一个组件有一个合成事件和一个原生事件绑定在同一个元素上，原生事件的处理函数会在合成事件的处理函数之前执行。这就造成了一些文章中提到的原生事件先执行的观察结果。

然而，从React v16开始，React改变了事件处理的方式，不再使用事件委托，而是直接将事件处理函数绑定在目标元素上。这样做的好处是提高了性能，并且保证了事件处理函数的执行顺序与绑定顺序一致。

因此，根据React的最新版本，合成事件会先于原生事件执行。如果你发现有一些旧的文章提到原生事件先执行，那可能是因为这些文章对React的早期版本进行了描述，不适用于目前的React版本。

## 476 [React] 函数组件和 class 组件有什么区别？【热度: 1,029】

* created_at: 2023-07-09T11:46:14Z
* updated_at: 2023-07-09T11:46:15Z
* labels: web框架, PDD
* milestone: 高

**关键词**：React函数组件对比类组件、React函数组件对比类组件性能、React函数组件对比类组件状态管理、React函数组件与类组件

函数组件和类组件是React中两种定义组件的方式，它们有以下区别：

1. 语法：函数组件是使用函数声明的方式定义组件，而类组件是使用ES6的class语法定义组件。

2. 写法和简洁性：函数组件更为简洁，没有类组件中的繁琐的生命周期方法和this关键字。函数组件只是一个纯粹的JavaScript函数，可以直接返回JSX元素。

3. 状态管理：在React的早期版本中，函数组件是无法拥有自己的状态（state）和生命周期方法的。但是从React 16.8开始，React引入了Hooks（钩子）机制，使得函数组件也能够拥有状态和使用生命周期方法。

4. 性能：由于函数组件不拥有实例化的过程，相较于类组件，它的性能会稍微高一些。但是在React 16.6之后，通过React.memo和PureComponent的优化，类组件也能够具备相对较好的性能表现。

总体来说，函数组件更加简洁、易读，适合用于无需复杂逻辑和生命周期方法的场景，而类组件适合于需要较多逻辑处理和生命周期控制的场景。另外，使用Hooks后，函数组件也能够拥有与类组件类似的能力，因此在开发中可以更加灵活地选择使用哪种方式来定义组件。

**状态管理方面做对比**

从状态管理的角度来看，函数组件和类组件在React中的区别主要体现在以下几个方面：

1. 类组件中的状态管理：类组件通过使用`state`属性来存储和管理组件的状态。`state`是一个对象，可以通过`this.state`进行访问和修改。类组件可以使用`setState`方法来更新状态，并通过`this.setState`来触发组件的重新渲染。在类组件中，状态的更新是异步的，React会将多次的状态更新合并为一次更新，以提高性能。

2. 函数组件中的状态管理：在React之前的版本中，函数组件是没有自己的状态的，只能通过父组件通过`props`传递数据给它。但是从React 16.8版本开始，通过引入Hooks机制，函数组件也可以使用`useState`钩子来定义和管理自己的状态。`useState`返回一个状态值和一个更新该状态值的函数，通过解构赋值的方式进行使用。每次调用状态更新函数，都会触发组件的重新渲染。

3. 类组件的生命周期方法：类组件有很多生命周期方法，例如`componentDidMount`、`componentDidUpdate`、`componentWillUnmount`等等。这些生命周期方法可以用来在不同的阶段执行特定的逻辑，例如在`componentDidMount`中进行数据的初始化，在`componentDidUpdate`中处理状态或属性的变化等等。通过这些生命周期方法，类组件可以对组件的状态进行更加细粒度的控制。

4. 函数组件中的副作用处理：在函数组件中，可以使用`useEffect`钩子来处理副作用逻辑，例如数据获取、订阅事件、DOM操作等。`useEffect`接收一个回调函数和一个依赖数组，可以在回调函数中执行副作用逻辑，依赖数组用于控制副作用的执行时机。函数组件的副作用处理与类组件的生命周期方法类似，但是可以更灵活地控制执行时机。

函数组件和类组件在状态管理方面的主要区别是函数组件通过使用Hooks机制来定义和管理状态，而类组件通过`state`属性来存储和管理状态。
函数组件中使用`useState`来定义和更新状态，而类组件则使用`setState`方法。
另外，函数组件也可以使用`useEffect`来处理副作用逻辑，类似于类组件的生命周期方法。通过使用Hooks，函数组件在状态管理方面的能力得到了大幅度的提升和扩展。

**性能方面做对比**

在性能方面，函数组件和类组件的表现也有一些区别。

1. 初始渲染性能：函数组件相对于类组件来说，在初始渲染时具有更好的性能。这是因为函数组件本身的实现比类组件更加简单，不需要进行实例化和维护额外的实例属性。函数组件在渲染时更轻量化，因此在初始渲染时更快。

2. 更新性能：当组件的状态或属性发生变化时，React会触发组件的重新渲染。在类组件中，由于状态的更新是异步的，React会将多次的状态更新合并为一次更新，以提高性能。而在函数组件中，由于每次状态更新都会触发组件的重新渲染，可能会导致性能略低于类组件。但是，通过使用React的memo或useMemo、useCallback等优化技术，可以在函数组件中避免不必要的重新渲染，从而提高性能。

3. 代码拆分和懒加载：由于函数组件本身的实现比类组件更加简单，所以在进行代码拆分和懒加载时，函数组件相对于类组件更容易实现。React的Suspense和lazy技术可以在函数组件中实现组件的按需加载，从而提高应用的性能。

函数组件相对于类组件在初始渲染和代码拆分方面具有优势，在更新性能方面可能稍逊一筹。然而，React的优化技术可以在函数组件中应用，以提高性能并减少不必要的渲染。此外，性能的差异在实际应用中可能并不明显，因此在选择使用函数组件还是类组件时，应根据具体场景和需求进行综合考量。

## 477 [React] ref 有哪些使用场景，请举例【热度: 668】

* created_at: 2023-07-09T11:50:42Z
* updated_at: 2023-07-09T11:50:42Z
* labels: web框架, 美团
* milestone: 中

**关键词**：ref 使用场景、ref 获取dom、ref 获取子组件属性和方法

React的ref用于获取组件或DOM元素的引用。它有以下几个常见的使用场景：

1. 访问子组件的方法或属性：通过ref可以获取子组件的实例，并调用其方法或访问其属性。

```jsx
import React, { useRef } from 'react';

function ChildComponent() {
 const childRef = useRef(null);

 const handleClick = () => {
 childRef.current.doSomething();
 }

 return (
 <div>
 <button onClick={handleClick}>Click</button>
 <Child ref={childRef} />
 </div>
 );
}

const Child = React.forwardRef((props, ref) => {
 const doSomething = () => {
 console.log('Doing something...');
 }

 // 将ref引用绑定到组件的实例
 React.useImperativeHandle(ref, () => ({
 doSomething
 }));

 return <div>Child Component</div>;
});
```

2. 获取DOM元素：通过ref可以获取组件渲染后的DOM元素，并进行操作。

```jsx
import React, { useRef } from 'react';

function MyComponent() {
 const inputRef = useRef(null);

 const handleClick = () => {
 inputRef.current.focus();
 }

 return (
 <div>
 <input ref={inputRef} type="text" />
 <button onClick={handleClick}>Focus Input</button>
 </div>
 );
}
```

3. 动态引用：通过ref可以在函数组件中动态地引用不同的组件或DOM元素。

```jsx
import React, { useRef } from 'react';

function MyComponent() {
 const ref = useRef(null);
 const condition = true;

 const handleClick = () => {
 ref.current.doSomething();
 }

 return (
 <div>
 {condition ? (
 <ChildComponent ref={ref} />
 ) : (
 <OtherComponent ref={ref} />
 )}
 <button onClick={handleClick}>Click</button>
 </div>
 );
}
```

这些例子展示了一些使用React的ref的常见场景，但实际上，ref的用途非常灵活，可以根据具体需求进行扩展和应用。

## 478 下面代码的执行结果是多少（意义不大）

* created_at: 2023-07-18T14:36:08Z
* updated_at: 2023-07-18T14:38:16Z
* labels: JavaScript
* milestone: 中

**执行结果是多少， 为什么？**

```js
var foo = function () {
console.log("foo1")
}
foo()

var foo = function () {
console.log("foo2")
}
foo()


function foo() {
console.log("foo1")
}
foo()

function foo() {
console.log("foo2")
}
foo()
```

**执行结果是：**

```
foo1
foo2
foo2
foo2
```

**原因:**
首先，变量`foo`被赋值为一个函数表达式`function () { console.log("foo1") }`，然后立即调用`foo()`，输出结果为`foo1`。

接下来，变量`foo`再次被赋值为另一个函数表达式`function () { console.log("foo2") }`，然后再次调用`foo()`，输出结果为`foo2`。

然后，函数声明`function foo() { console.log("foo1") }`被解析并提升到作用域的顶部，但由于变量`foo`已经被重新赋值为函数表达式，因此这个函数声明不会对变量`foo`产生影响。

最后，另一个函数声明`function foo() { console.log("foo2") }`也被解析并提升到作用域的顶部。然后再次调用`foo()`，由于变量`foo`指向最后一个函数声明，输出结果为`foo2`。这也说明了后面的函数声明覆盖了前面的函数声明。

## 479 模拟new操作【热度: 1,186】

* created_at: 2023-07-18T14:50:21Z
* updated_at: 2023-07-18T14:50:22Z
* labels: JavaScript, 滴滴
* milestone: 中

**关键词**：模拟 new

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

## 480 讲一下Webpack设计理念（过于硬核， 直接上文档了）

* created_at: 2023-07-23T03:34:39Z
* updated_at: 2023-07-23T03:34:39Z
* labels: web框架
* milestone: 资深

参考文档： [资料](https://juejin.cn/post/7170852747749621791)

## 481 async/await 函数到底要不要加 try catch ?【热度: 645】

* created_at: 2023-07-23T03:56:33Z
* updated_at: 2024-03-21T08:17:20Z
* labels: JavaScript
* milestone: 中

**关键词**：async/await函数、async/await函数 是否需要 try/catch、async/await函数 与 try/catch 关系、try/catch 使用场景

当使用 async 函数的时候，很多文章都说建议用 `try catch` 来捕获异常, 可是实际上很多项目的代码，遵循的并不是严谨，很多都没有用，甚至 catch 函数都没写，这是为什么呢？

 示例1 ：使用 try catch

```javascript
function getUserInfo () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('请求异常')
    }, 1000)
  })
}

async function logined () {
  try {
    const userInfo = await getUserInfo()
    // 执行中断
    const pageInfo = await getPageInfo(userInfo?.userId)
  } catch (e) {
    console.warn(e)
  }
}

logined()
```

执行后会在 catch 里捕获 `请求异常`，然后 getUserInfo 函数中断执行，这是符合逻辑的，对于有依赖关系的接口，中断执行可以避免程序崩溃，这里唯一的问题是 try catch 貌似占据了太多行数，如果每个接口都写的话看起来略显冗余。

 示例2： 直接 catch

鉴于正常情况下，`await` 命令后面是一个 Promise 对象, 所以上面代码可以很自然的想到优化方案：

```javascript
function getUserInfo () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('请求异常')
    }, 1000)
  })
}

async function logined () {
  const userInfo = await getUserInfo().catch(e => console.warn(e))
  // 执行没有中断，userInfo 为 undefined
  if (!userInfo) return // 需要做非空校验
  const pageInfo = await getPageInfo(userInfo?.userId)
}

logined()
```

执行后 catch 可以正常捕获异常，但是程序没有中断，返回值 `userInfo` 为 `undefined`, 所以如果这样写的话，就需要对返回值进行非空校验, `if (!userInfo) return` 我觉得这样有点反逻辑，异常时就应该中断执行才对；

 示例3：在 catch 里 reject

可以继续优化，在 catch 里面加一行 `return Promise.reject(e)`, 可以使 await 中断执行；

完整代码：

```javascript
function getUserInfo () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('请求异常')
    }, 1000)
  })
}

async function logined () {
  const userInfo = await getUserInfo().catch(e => {
    console.warn(e)
    return Promise.reject(e) // 会导致控制台出现 uncaught (in promise) 报错信息
  })
  // 执行中断
  const pageInfo = await getPageInfo(userInfo?.userId)
}

logined()
```

一般我们在项目里都是用 axios 或者 fetch 之类发送请求，会对其进行一个封装，也可以在里面进行 catch 操作，对错误信息先一步处理，
至于是否需要 reject，就看你是否想要在 await 命令异常时候中断了；
不使用 reject 则不会中断，但是需要每个接口拿到 response 后先 非空校验， 使用 reject 则会在异常处中断，并且会在控制台暴露 `uncaught (in promise)` 报错信息。

 建议

不需要在 await 处异常时中断，可以这样写，需要做非空校验，控制台不会有报错信息

```javascript
let userInfo = await getUserInfo().catch(e => console.warn(e))
if (!userInfo) return
```

需要在 await 处异常时中断，并且在意控制台报错，可以这样写

```javascript
try {
 let userInfo = await getUserInfo()
 // 执行中断
 let pageInfo = await getPageInfo(userInfo?.userId)
} catch(e) {
 console.warn(e)
}

```

需要在 await 处异常时中断，但是不在意控制台报错，则可以这样写

```javascript

let userInfo = await getUserInfo().catch(e => {
 console.warn(e)
 return Promise.reject(e) // 会导致控制台出现 uncaught (in promise) 报错信息
})
// 执行中断
let pageInfo = await getPageInfo(userInfo?.userId)

```

 总结

几种写法，初看可能觉得第三种 catch 这种写法是最好的，但是细想下，从用户体验上来看，我觉得 try catch 是最好的，逻辑直观、符合同步编程思维，控制台不会暴露 `uncaught (in promise)` 报错信息；

而链式调用的 catch (里面再 reject)，是传统 promise 的回调写法，既然已经用 async await 这种同步编程写法了，再用 catch 链式写法，感觉没必要。

## 482 如何搭建一套灰度系统？【热度: 1,226】

* created_at: 2023-07-23T04:18:11Z
* updated_at: 2023-07-23T04:18:11Z
* labels: 工程化, 腾讯
* milestone: 资深

**关键词**：灰度上线

这个是一个非常复杂的话题， 没法直接给出答案， 进提供一些实现的思路：

**什么是灰度**

灰度系统可以把流量划分成多份，一份走新版本代码，一份走老版本代码。

而且灰度系统支持设置流量的比例，比如可以把走新版本代码的流程设置为 5%，没啥问题再放到 10%，50%，最后放到 100% 全量。

这样可以把出现问题的影响降到最低。

而且灰度系统不止这一个用途，比如产品不确定某些改动是不是要的，就要做 AB 实验，也就是要把流量分成两份，一份走 A 版本代码，一份走 B 版本代码。

**实现思路**

1. 后端支持：灰度上线需要后端的支持，通过后端的灰度发布控制，可以将不同版本的前端应用分配给不同用户。

2. 搭建网关层： 支持一部分用户分发到 A 版本， 一部分用户分发到 B 版本 （通常使用 nginx 搭建）。

3. 版本管控机制： 使用版本控制系统（如Git、package.version、hash version 等）来管理不同版本的前端应用代码。在灰度上线时，可以根据需要切换到特定的版本。

4. 动态路由：通过动态路由配置，将用户请求导向不同版本的前端应用。例如，可以使用Nginx或其他反向代理服务器来实现动态路由。

5. 流量染色：使用Cookie或Session来控制用户的灰度版本访问。可以通过设置不同的Cookie值或Session标记，将用户分配到不同的灰度版本。

6. 更复杂的漏量配置： 例如要根据部门、权限、角色等方式来开放灰度；可以使用让用户访问应用的时候， 查询其权限和角色， 根据权限和角色来分发不同的页面路由。

**参考文档**

* [基于 Nginx 实现一个灰度上线系统](https://juejin.cn/post/7250914419579944997)

## 483 如何实现页面顶部， 自定义滚动进度条样式【热度: 1,220】

* created_at: 2023-07-23T04:32:24Z
* updated_at: 2023-07-23T04:32:24Z
* labels: CSS, 快手
* milestone: 初

**关键词**：自定义滚动条、自定义顶部滚动条

要实现页面顶部的自定义滚动进度条样式，可以按照以下步骤进行：

1. 在HTML中添加滚动进度条的容器元素，通常可以使用一个`<div>`元素作为容器，放在页面顶部的合适位置。

```html
<div id="scroll-progress"></div>
```

2. 在CSS中定义滚动进度条的样式。可以使用背景颜色、高度、透明度等属性来自定义样式。

```css
#scroll-progress {
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 5px;
 background-color: #f00; // 自定义进度条颜色 */
 opacity: 0.7; // 自定义进度条透明度 */
 z-index: 9999; // 确保进度条显示在最顶层 */
}
```

3. 使用JavaScript来监听页面滚动事件，并更新滚动进度条的宽度。

```javascript
 var scrollProgress = document.getElementById('scroll-progress');
var requestId;

function updateScrollProgress() {
 var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
 var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
 var progress = (scrollTop / (scrollHeight - window.innerHeight))100;
 scrollProgress.style.width = progress + '%';
 requestId = null;
}

function scrollHandler() {
 if (!requestId) {
 requestId = requestAnimationFrame(updateScrollProgress);
 }
}

window.addEventListener('scroll', scrollHandler);
```

以上就是一个简单的实现页面顶部自定义滚动进度条样式的方法。根据自己的需求，可以调整CSS样式和JavaScript的逻辑来实现不同的效果。

完整代码：

```html
<!DOCTYPE html>
<html>
<head>
 <title>自定义滚动进度条样式</title>
 <style>
 #scroll-progress {
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 5px;
 background-color: #f00; // 自定义进度条颜色 */
 opacity: 0.7; // 自定义进度条透明度 */
 z-index: 9999; // 确保进度条显示在最顶层 */
 }
 </style>
</head>
<body>
<div id="scroll-progress"></div>

<!-- 假设有很长的内容 -->
<div style="height: 2000px;"></div>

<script>
 var scrollProgress = document.getElementById('scroll-progress');
 var requestId;

 function updateScrollProgress() {
 var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
 var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
 var progress = (scrollTop / (scrollHeight - window.innerHeight))100;
 scrollProgress.style.width = progress + '%';
 requestId = null;
 }

 function scrollHandler() {
 if (!requestId) {
 requestId = requestAnimationFrame(updateScrollProgress);
 }
 }

 window.addEventListener('scroll', scrollHandler);
</script>
</body>
</html>
```

## 484 proxy 有那些实际使用场景【热度: 849】

* created_at: 2023-07-25T16:03:10Z
* updated_at: 2023-07-25T16:03:10Z
* labels: JavaScript, 滴滴
* milestone: 中

**关键词**：proxy 应用场景、proxy 作用是什么

JavaScript的Proxy对象提供了一种拦截并定制JavaScript对象底层操作的机制。它允许你在对象上定义自定义行为，例如访问、赋值、函数调用等操作。Proxy对象包裹着目标对象，并拦截对目标对象的访问，使你能够自定义处理这些操作。

Proxy可以用于实现很多功能，包括：

1. 属性验证和拦截：可以拦截对象属性的读取、写入和删除操作，并进行验证和处理。例如，你可以拦截对属性的访问，验证属性的值是否符合特定规则。

2. 对象扩展和变形：可以拦截对象属性的读取和写入操作，并根据需求进行变形或扩展。例如，你可以在访问对象属性时，动态生成属性的值。

3. 函数调用的拦截：可以拦截函数的调用和构造，以便进行自定义处理。例如，你可以在函数调用之前或之后执行额外的逻辑。

4. 数组操作的拦截：可以拦截数组的操作，如push、pop、shift等，允许你对数组的操作进行自定义处理。例如，你可以在数组操作之后触发其他逻辑。

通过使用Proxy对象，你可以拦截和修改对象的底层操作，实现更加灵活和定制化的行为。然而需要注意的是，Proxy对象的使用可能会导致性能上的一些影响，所以在使用时要谨慎考虑。

**`Proxy`的实际使用场景有很多，以下是一些常见的示例**：

1. 数据验证和过滤：你可以使用`Proxy`来拦截对对象属性的访问和修改，从而进行数据验证和过滤。例如，你可以使用`Proxy`来确保一个对象的属性只能是特定的类型或范围。

```javascript
const person = {
  name: 'Alice',
  age: 25
}

const personProxy = new Proxy(person, {
  set (target, key, value) {
    if (key === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new Error('Invalid age')
    }

    target[key] = value
    return true
  }
})

personProxy.age = -10 // 抛出错误：Invalid age
```

2. 计算属性：你可以使用`Proxy`来动态计算属性的值，而无需实际存储它们。这对于需要根据其他属性的值来计算衍生属性的情况非常有用。

```javascript
const person = {
  firstName: 'Alice',
  lastName: 'Smith'
}

const personProxy = new Proxy(person, {
  get (target, key) {
    if (key === 'fullName') {
      return `${target.firstName} ${target.lastName}`
    }

    return target[key]
  }
})

console.log(personProxy.fullName) // Alice Smith
```

3. 资源管理和延迟加载：你可以使用`Proxy`来延迟加载资源，直到它们被真正需要。这在处理大型数据集或昂贵的资源时非常有用，可以节省内存和提高性能。

```javascript
const expensiveResource = {
  // 一些昂贵的操作
}

const expensiveResourceProxy = new Proxy(expensiveResource, {
  get (target, key) {
    // 在需要的时候才加载资源
    if (!target.loaded) {
      target.load()
      target.loaded = true
    }

    return target[key]
  }
})

console.log(expensiveResourceProxy.someProperty) // 加载资源并返回属性值
```

4. 日志记录和调试：你可以使用`Proxy`来记录对象属性的访问和修改，以便进行调试和日志记录。

```javascript
const person = {
  name: 'Alice',
  age: 25
}

const personProxy = new Proxy(person, {
  get (target, key) {
    console.log(`Getting property '${key}'`)
    return target[key]
  },
  set (target, key, value) {
    console.log(`Setting property '${key}' to '${value}'`)
    target[key] = value
    return true
  }
})

personProxy.age // 记录：Getting property 'age'
personProxy.age = 30 // 记录：Setting property 'age' to '30'
```

这些只是`Proxy`的一些实际使用场景示例，`Proxy`的强大之处在于它提供了对对象的底层操作的拦截和自定义能力，可以根据具体需求进行灵活的应用。

## 485 script 标签上有那些属性，分别作用是啥？【热度: 744】

* created_at: 2023-07-25T16:25:30Z
* updated_at: 2023-07-25T16:25:30Z
* labels: web应用场景, Shopee
* milestone: 中

**关键词**：script 标签属性、script 标签属性作用、常用 script 标签属性

在HTML中，`<script>`标签用于引入或嵌入JavaScript代码。`<script>`标签可以使用以下属性来调整脚本的行为：

**常用属性**

1. `src`：指定要引入的外部JavaScript文件的URL。例如：`<script src="script.js"></script>`。通过这个属性，浏览器会下载并执行指定的外部脚本文件。

2. `async`：可选属性，用于指示浏览器异步加载脚本。这意味着脚本会在下载的同时继续解析HTML文档，不会阻塞其他资源的加载。例如：`<script src="script.js" async></script>`。

3. `defer`：可选属性，用于指示浏览器延迟执行脚本，直到文档解析完成。这样可以确保脚本在文档完全呈现之前不会执行。例如：`<script src="script.js" defer></script>`。

4. `type`：指定脚本语言的MIME类型。通常是`text/javascript`或者`module`（用于ES6模块）。如果未指定该属性，浏览器默认将其视为JavaScript类型。例如：`<script type="text/javascript">...</script>`。

5. `charset`：指定外部脚本文件的字符编码。例如：`<script src="script.js" charset="UTF-8"></script>`。

6. `integrity`：用于指定外部脚本文件的Subresource Integrity（SRI）。SRI可以确保浏览器在加载脚本时验证其完整性，防止通过恶意更改文件来执行潜在的攻击。例如：`<script src="script.js" integrity="sha256-qznLcsROx4GACP2dm0UCKCzCG+HiZ1guq6ZZDob/Tng="></script>`。

**不常用属性**

7. `crossorigin`：正常的 script 元素将最小的信息传递给 window.onerror，用于那些没有通过标准 CORS 检查的脚本。要允许对静态媒体使用独立域名的网站进行错误记录，请使用此属性。参见 CORS 设置属性。

8. `fetchpriority`：提供一个指示，说明在获取外部脚本时要使用的相对优先级。

9. `nomodule`： 这个布尔属性被设置来标明这个脚本不应该在支持 ES 模块的浏览器中执行。实际上，这可用于在不支持模块化 JavaScript 的旧浏览器中提供回退脚本。

10. `nonce`: 在 `script-src Content-Security-Policy (en-US)` 中允许脚本的一个一次性加密随机数（nonce）。服务器每次传输策略时都必须生成一个唯一的 nonce 值。提供一个无法猜测的 nonce 是至关重要。

11. `referrerpolicy`: 表示在获取脚本或脚本获取资源时，要发送哪个 referrer。

可以参考文档：[资料](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script)

## 486 如何冻结一个 JS 对象【热度: 949】

* created_at: 2023-07-25T16:28:54Z
* updated_at: 2023-07-25T16:28:55Z
* labels: JavaScript, Shopee
* milestone: 中

**关键词**：Object.freeze、Object.freeze作用、深度冻结对象

**冻结对象**

要冻结一个 JavaScript 对象，以防止别人更改它，可以使用`Object.freeze()`方法。`Object.freeze()`方法会递归地冻结一个对象的所有属性，使其变为只读的，并防止更改、删除或添加新属性。以下是使用`Object.freeze()`方法冻结对象的示例：

```javascript
const obj = {
  prop1: 1,
  prop2: 'Hello'
}

Object.freeze(obj)

// 尝试更改属性的值
obj.prop1 = 2 // 不会生效，obj.prop1仍然为1

// 尝试删除属性
delete obj.prop2 // 不会生效，obj仍然包含prop2属性

// 尝试添加新属性
obj.prop3 = true // 不会生效，obj不会添加新属性

console.log(obj)
```

在上述示例中，通过调用`Object.freeze(obj)`方法，将`obj`对象冻结，使其变为只读。此后，无论是更改、删除还是添加属性，都不会对对象产生任何影响。最后，通过`console.log(obj)`输出对象，可以看到对象保持不变，即使尝试进行更改。

需要注意的是，`Object.freeze()`方法只会冻结对象的直接属性，而不会冻结嵌套对象的属性。如果需要递归地冻结嵌套对象的属性，可以编写一个递归函数来处理。

**深度冻结**

要冻结嵌套属性，可以使用一个递归函数来处理。该函数会遍历对象的所有属性，并对每个属性进行冻结。以下是一个示例：

```javascript
function deepFreeze (obj) {
  // 首先冻结当前对象
  Object.freeze(obj)

  // 遍历对象的所有属性
  for (const key of Object.keys(obj)) {
    const value = obj[key]

    // 如果属性是对象类型，则递归调用deepFreeze函数
    if (typeof value === 'object' && value !== null) {
      deepFreeze(value)
    }
  }

  return obj
}

const obj = {
  prop1: 1,
  prop2: {
    nestedProp1: 'Hello',
    nestedProp2: [1, 2, 3]
  }
}

const frozenObj = deepFreeze(obj)

// 尝试更改嵌套属性的值
frozenObj.prop2.nestedProp1 = 'World' // 不会生效，嵌套属性仍然为'Hello'

console.log(frozenObj)
```

在上述示例中，我们定义了一个名为`deepFreeze`的递归函数。该函数首先会对当前对象进行冻结（调用`Object.freeze(obj)`），然后遍历对象的所有属性。如果属性是对象类型，则递归调用`deepFreeze`函数，对嵌套对象进行冻结。

通过调用`deepFreeze(obj)`函数，我们将`obj`对象及其嵌套属性都冻结，并将结果赋值给`frozenObj`。尝试更改嵌套属性的值后，输出`frozenObj`，可以看到对象保持不变，嵌套属性的值没有被更改。

需要注意的是，`deepFreeze`函数并不会修改原始对象，而是返回一个新的冻结对象。如果需要修改原始对象，可以将冻结的属性逐个复制到一个新对象中。

## 487 typeof null 的输出结果是什么，为什么？【热度: 93】

* created_at: 2023-07-26T14:52:56Z
* updated_at: 2023-07-26T14:52:56Z
* labels: JavaScript, Shopee
* milestone: 初

**关键词**：typeof null 输出结果

在 JavaScript 中，`typeof null` 的输出结果是 `"object"`。

这是因为在 JavaScript 中，`null` 被视为一个特殊的空值对象。尽管 `null` 实际上不是一个对象，它是一个原始类型的值，但 `typeof null` 返回 `"object"` 是由于历史原因以及 JavaScript 的设计缺陷。

在 JavaScript 的早期版本中，`null` 被错误地标记为一个 `"object"` 类型，这个错误一直延续至今，以保持与早期版本的兼容性。所以，当我们使用 `typeof` 操作符来检查 `null` 时，它会返回 `"object"`。

需要注意的是，这个返回值是一个历史遗留问题，不应该用来判断一个变量是否为 `null`。为了准确地检查一个变量是否为 `null`，我们应该使用严格相等运算符 `===`，如 `myVariable === null`。

## 488 [Vue] Vue2.0 和 Vue3.0 有什么区别

* created_at: 2023-07-26T14:59:59Z
* updated_at: 2023-07-26T15:00:00Z
* labels: web框架
* milestone: 中

主要从以下方面做对比

1. 响应式系统的重新配置，使用proxy替换Object.defineProperty
2. typescript支持
3. 新增组合API，更好的逻辑重用和代码组织
4. v-if和v-for的优先级
5. 静态元素提升
6. 虚拟节点静态标记
7. 生命周期变化
8. 打包体积优化
9. ssr渲染性能提升
10. 支持多个根节点

* 参考文档: [资料](https://juejin.cn/post/6858558735695937544)

## 489 [Vue] 你做过哪些性能优化【热度: 969】

* created_at: 2023-07-26T15:02:39Z
* updated_at: 2023-07-26T15:03:18Z
* labels: web框架, Shopee
* milestone: 高

**关键词**：vue 项目优化、vue 开发优化

1、`v-if`和`v-show`

* 频繁切换时使用`v-show`，利用其缓存特性
* 首屏渲染时使用`v-if`，如果为`false`则不进行渲染

2、`v-for`的`key`

* 列表变化时，循环时使用唯一不变的`key`，借助其本地复用策略
* 列表只进行一次渲染时，`key`可以采用循环的`index`

3、侦听器和计算属性

* 侦听器`watch`用于数据变化时引起其他行为
* 多使用`compouter`计算属性顾名思义就是新计算而来的属性，如果依赖的数据未发生变化，不会触发重新计算

4、合理使用生命周期

* 在`destroyed`阶段进行绑定事件或者定时器的销毁
* 使用动态组件的时候通过`keep-alive`包裹进行缓存处理，相关的操作可以在`actived`阶段激活

5、数据响应式处理

* 不需要响应式处理的数据可以通过`Object.freeze`处理，或者直接通过`this.xxx = xxx`的方式进行定义
* 需要响应式处理的属性可以通过`this.$set`的方式处理，而不是`JSON.parse(JSON.stringify(XXX))`的方式

6、路由加载方式

* 页面组件可以采用异步加载的方式

7、插件引入

* 第三方插件可以采用按需加载的方式，比如`element-ui`。

8、减少代码量

* 采用`mixin`的方式抽离公共方法
* 抽离公共组件
* 定义公共方法至公共`js`中
* 抽离公共`css`

9、编译方式

* 如果线上需要`template`的编译，可以采用完成版`vue.esm.js`
* 如果线上无需`template`的编译，可采用运行时版本`vue.runtime.esm.js`，相比完整版体积要小大约`30%`

10、渲染方式

* 服务端渲染，如果是需要`SEO`的网站可以采用服务端渲染的方式
* 前端渲染，一些企业内部使用的后端管理系统可以采用前端渲染的方式

11、字体图标的使用

* 有些图片图标尽可能使用字体图标

## 490 DOM 树解析过程【热度: 416】

* created_at: 2023-07-26T15:14:56Z
* updated_at: 2023-07-26T15:18:50Z
* labels: 浏览器
* milestone: 中

**关键词**：DOM 树解析过程、DOM 树解析

DOM树的生成是由浏览器解析HTML文档时自动生成的。下面是DOM树生成的一般过程：

1. 解析HTML：浏览器从上到下逐行解析HTML文档，将文档分解为一系列的标记（tokens）。
2. 构建DOM节点：解析器根据标记构建DOM节点，并将这些节点连接到树形结构中。每个标记对应一个DOM节点，包括元素节点、文本节点、注释节点等。
3. 构建父子关系：解析器根据标记的嵌套关系，将构建的DOM节点连接成一个树形结构。嵌套关系表示了标记之间的父子关系，即一个节点可以成为另一个节点的子节点。
4. 处理样式和脚本：当解析器遇到样式（CSS）和脚本（JavaScript）时，会调用相关的解析器或执行器来处理并应用样式和脚本。
5. 生成渲染树：浏览器根据DOM树和样式信息生成渲染树（Render Tree），渲染树是用于页面渲染和绘制的树形结构。
6. 布局和绘制：浏览器根据渲染树进行布局（Layout）和绘制（Painting），确定每个节点在屏幕上的位置和样式，并将其绘制到屏幕上。

## 491 如何优化 DOM 树解析过程【热度: 414】

* created_at: 2023-07-26T15:18:29Z
* updated_at: 2023-07-26T15:18:29Z
* labels: 浏览器
* milestone: 高

**关键词**：DOM 树解析过程、DOM 树解析、优化 DOM 树解析

以下是一些优化DOM树解析的方法：

1. 减少DOM元素数量：尽可能减少页面上的DOM元素数量，可以通过合并或删除不必要的元素、使用CSS样式代替多个元素等方式来实现。

2. 使用语义化的HTML结构：使用合适的HTML标签和语义化的结构，可以提高解析的效率，减少解析错误的可能性。

3. 避免深层嵌套的DOM结构：避免过深的DOM嵌套，因为深层嵌套会增加DOM节点的数量，解析和渲染的时间也会增加。

4. 使用外部脚本和样式表：将JavaScript代码和CSS样式表尽可能地外部引入，可以避免在解析过程中阻塞DOM树的构建。

5. 使用异步加载脚本：将需要的脚本使用async或defer属性进行异步加载，可以让DOM树的解析和脚本加载并行进行，提高解析的效率。

6. 优化CSS选择器：避免使用复杂的CSS选择器，因为复杂的选择器需要进行更多的计算和匹配，会影响解析的速度。

7. 批量修改DOM：避免对DOM进行频繁的修改，尽量使用批量操作的方式来修改DOM，可以减少浏览器的重排和重绘。

8. 使用文档片段（DocumentFragment）：将需要频繁操作的DOM元素先添加到文档片段中，然后再一次性地将文档片段添加到文档中，可以减少重排和重绘的次数。

9. 使用虚拟DOM：在一些前端框架中，使用虚拟DOM可以减少对真实DOM的直接操作，通过比较虚拟DOM树的差异来进行最小化的DOM操作，从而提高效率。

## 492 [代码实现] 实现管道函数【热度: 540】

* created_at: 2023-07-26T15:22:44Z
* updated_at: 2023-09-06T15:51:44Z
* labels: Shopee, 代码实现/算法
* milestone: 中

**关键词**：JS 管道函数、JS 管道函数实现

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

## 493 为什么 SPA 应用都会提供一个 hash 路由，好处是什么？【热度: 681】

* created_at: 2023-07-26T15:41:29Z
* updated_at: 2023-07-26T15:41:30Z
* labels: web应用场景, 快手
* milestone: 中

**关键词**：hash路由优势、hash路由和history路由区别

SPA（单页应用）通常会使用 hash 路由的方式来实现页面的导航和路由功能。这种方式将路由信息存储在 URL 的片段标识符（hash）中，例如：`www.example.com/#/home`。

以下是使用 hash 路由的 SPA 的一些好处：

1. 兼容性：Hash 路由对浏览器的兼容性非常好，可以在所有主流浏览器上运行，包括较旧的浏览器版本。这是因为 hash 路由不需要对服务端进行特殊的配置或支持。

2. 简单实现：实现 hash 路由非常简单，只需要在页面中添加一个监听器来监听 `hashchange` 事件，然后根据不同的 hash 值加载对应的页面内容。这种方式不需要对服务器进行特殊配置，服务器只需传送一个初始页面，之后的页面切换完全由前端控制。

3. 防止页面刷新：使用 hash 路由可以防止页面的完全刷新。因为 hash 路由只改变 URL 的片段标识符，不会引起整个页面的重新加载，所以用户在不同页面之间切换时，不会丢失当前页面的状态和数据。

4. 前进后退支持：由于 hash 路由不会引起页面的刷新，因此可以方便地支持浏览器的前进和后退操作。浏览器的前进和后退按钮可以触发 `hashchange` 事件，从而实现页面的导航和页面状态的管理。

5. 无需服务端配置：使用 hash 路由，不需要对服务端进行特殊的配置。所有的路由和页面切换逻辑都由前端控制，服务器只提供一个初始页面。这样可以减轻服务器的负担，并且可以将更多的逻辑放在前端处理，提升用户体验。

虽然 hash 路由有一些好处，但也有一些局限性。例如，hash 路由的 URL 不够美观，也不利于 SEO（搜索引擎优化）。为了解决这些问题，现代的 SPA 框架通常使用更先进的路由方式，例如 HTML5 的 History API，它可以在不刷新整个页面的情况下改变 URL。不过，hash 路由仍然是一个简单可靠的选择，特别适用于简单的 SPA 或需要兼容较旧浏览器的情况。

## 494  HTML5 的 History API 进行导航时，页面真的进行了一个切换吗？【热度: 424】

* created_at: 2023-07-26T15:45:13Z
* updated_at: 2023-07-26T15:45:14Z
* labels: 浏览器, 滴滴
* milestone: 中

**关键词**：History 导航、History 导航页面切换、History 页面切换

当使用 HTML5 的 History API 进行导航时，页面实际上没有进行完全的刷新。相反，只是通过 JavaScript 动态地更改 URL，并通过这个新的 URL 加载相应的内容。

这种方式被称为前端路由，因为页面的切换是在前端处理的，而不是通过向服务器请求新的页面。在导航期间，浏览器会保留当前页面的状态和数据，以便在返回时恢复。

这种页面切换的方式有以下几个特点：

1. 前端渲染：页面的内容是通过 JavaScript 动态渲染的，可以实现无刷新的页面切换效果。
2. 只加载部分内容：仅加载页面中需要更新的部分，而不是整个页面的内容。
3. 保留页面状态：页面切换后，不会丢失当前页面的状态和数据，可以在返回时恢复。

虽然页面实际上没有进行完全的切换和刷新，但对于用户而言，他们会感知到页面的切换效果，因为 URL 和页面内容发生了变化。这种方式能够提供更流畅的用户体验，并提高了应用的性能。

需要注意的是，使用 History API 进行导航时，需要确保服务器配置正确，以便在直接访问 URL 或刷新页面时能够正确地返回相应的内容。这通常需要在服务器端设置一个后备规则，以便将所有请求都指向应用的入口文件，例如 index.html，从而实现前端路由的正常工作。

## 495 原生 js 如何进行监听路由的变化【热度: 906】

* created_at: 2023-07-26T15:48:43Z
* updated_at: 2023-09-05T07:30:20Z
* labels: 浏览器, 网易
* milestone: 中

**关键词**：原生路由监听

在原生 JavaScript 中，可以使用 window 对象上的 popstate 事件来监听路由的变化。popstate 事件在浏览器的历史记录发生变化时触发，包括当用户点击浏览器的前进或后退按钮、调用 history.pushState() 或 history.replaceState() 方法等。

下面是一个简单的示例代码，演示如何使用 popstate 事件监听路由的变化：

```javascript
// 监听 popstate 事件
window.addEventListener('popstate', function (event) {
  // 在这里可以执行路由变化后的处理逻辑
  console.log('路由发生了变化')
})

// 修改 URL 并添加一条历史记录
history.pushState(null, null, '/new-route')

// 或者使用 history.replaceState() 方法替换当前历史记录
// history.replaceState(null, null, '/new-route');
```

在上面的代码中，当 popstate 事件触发时，回调函数会被执行。你可以在回调函数中添加适当的处理逻辑，例如更新页面内容、重新渲染视图等。

需要注意的是，popstate 事件不会在页面加载时触发，因此如果你需要在页面加载时执行一些初始化的路由处理逻辑，可以将该逻辑封装为一个函数，并在加载时调用一次，然后再通过 popstate 事件监听路由的变化。

另外，还可以使用 history.state 属性来获取当前历史记录的状态对象，该对象可以在调用 history.pushState() 或 history.replaceState() 方法时传入。这样可以在 popstate 事件回调函数中访问和使用该状态对象。

```javascript
window.addEventListener('popstate', function (event) {
  const state = history.state
  // 在这里可以访问和使用历史记录的状态对象
})
```

通过监听 popstate 事件，可以在原生 JavaScript 中轻松地监听和响应路由的变化，从而实现相应的页面切换和处理逻辑。

## 496 [React] 如何进行路由变化监听【热度: 698】

* created_at: 2023-07-26T15:52:15Z
* updated_at: 2023-07-26T15:52:16Z
* labels: web应用场景, 百度
* milestone: 中

**关键词**：React 路由、React 路由监听

在 React 中，你可以使用 React Router 库来进行路由变化的监听。React Router 是 React 的一个常用路由库，它提供了一组组件和 API 来帮助你在应用中管理路由。

下面是一个示例代码，演示如何使用 React Router 监听路由的变化：

然后，在你的 React 组件中，使用 BrowserRouter 或 HashRouter 组件包裹你的应用：

```jsx
import React from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom';

function App() {
 return (
 // 使用 BrowserRouter 或 HashRouter 包裹你的应用
 <BrowserRouter>
 {/* 在这里编写你的应用内容 */}
 </BrowserRouter>
 );
}

export default App;
```

当使用函数组件时，可以使用 `useEffect` 钩子函数来监听路由变化。下面是修改后的示例代码：

```jsx
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function MyComponent(props) {
 useEffect(() => {
 const handleRouteChange = (location, action) => {
 // 路由发生变化时执行的处理逻辑
 console.log('路由发生了变化', location, action);
 };

 // 在组件挂载后，添加路由变化的监听器
 const unlisten = props.history.listen(handleRouteChange);

 // 在组件卸载前，移除监听器
 return () => {
 unlisten();
 };
 }, [props.history]);

 return (
 <div>
 {/* 在这里编写组件的内容 */}
 </div>
 );
}

// 使用 withRouter 高阶组件将路由信息传递给组件
export default withRouter(MyComponent);
```

在上面的代码中，我们使用了 `useEffect` 钩子函数来添加路由变化的监听器。在 `useEffect` 的回调函数中，我们定义了 `handleRouteChange` 方法来处理路由变化的逻辑。然后，通过 `props.history.listen` 方法来添加监听器，并将返回的取消监听函数赋值给 `unlisten` 变量。

同时，我们还在 `useEffect` 返回的清理函数中调用了 `unlisten` 函数，以确保在组件卸载时移除监听器。

需要注意的是，由于 `useEffect` 的依赖数组中包含了 `props.history`，所以每当 `props.history` 发生变化时（即路由发生变化时），`useEffect` 的回调函数会被调用，从而更新路由变化的监听器。

总结起来，通过使用 `useEffect` 钩子函数和 `props.history.listen` 方法，可以在函数组件中监听和响应路由的变化。

## 497 onpopstate可以监听到一个pushstate的事件吗【热度: 546】

* created_at: 2023-07-26T16:04:37Z
* updated_at: 2023-07-26T16:04:38Z
* labels: 浏览器, 百度
* milestone: 中

**关键词**：popstate

**`onpopstate` 事件只能监听到浏览器历史记录的前进和后退操作，无法直接监听到 `pushState` 或 `replaceState` 的调用**。这是因为 `pushState` 和 `replaceState` 方法可以修改浏览器历史记录而不触发 `onpopstate` 事件。

但是，您可以在调用 `pushState` 或 `replaceState` 之后手动触发 `popstate` 事件，来模拟类似的效果。示例如下：

```javascript
// 监听 popstate 事件
window.addEventListener('popstate', function (event) {
  console.log('popstate event triggered')
})

// 调用 pushState 方法
window.history.pushState(null, null, '/new-url')

// 手动触发 popstate 事件
const popStateEvent = new PopStateEvent('popstate', { state: null })
window.dispatchEvent(popStateEvent)
```

在上述示例中，我们首先通过 `addEventListener` 方法监听 `popstate` 事件。然后，我们调用 `pushState` 方法来修改浏览器历史记录，并在之后手动创建一个 `PopStateEvent` 对象，并使用 `dispatchEvent` 方法来触发 `popstate` 事件。

这样就可以实现在调用 `pushState` 或 `replaceState` 之后手动触发一个事件来模拟监听到 `pushState` 的效果。

## 498 一般项目里面对请求 request 都会做哪些统一封装？【热度: 916】

* created_at: 2023-07-26T16:08:04Z
* updated_at: 2023-07-26T16:08:05Z
* labels: 网络, 阿里巴巴
* milestone: 高

**关键词**：request封装、request封装功能、request封装作用

1. 统一处理错误：可以在请求封装中统一处理错误，例如网络错误、超时等，并进行统一的错误提示或处理逻辑。
2. 统一处理认证和授权：可以在请求中添加认证信息，例如在请求头中添加 token，或者在每个请求中验证用户权限。
3. 统一处理请求配置：可以在请求封装中设置一些全局的请求配置，例如请求超时时间、请求头部信息等。
4. 统一处理请求拦截和响应拦截：可以在请求发送前和响应返回后进行一些统一的处理，例如请求拦截器可以添加 loading 状态，响应拦截器可以对返回数据进行预处理等。
5. 统一处理请求取消：可以实现一个请求取消的机制，可以取消重复的请求或者在组件卸载时取消未完成的请求，避免造成资源浪费或者潜在的问题。
6. 统一处理请求缓存：可以实现请求结果的缓存机制，可以在多次请求相同数据时，直接从缓存中获取，避免重复发送请求。
7. 统一处理请求重试：在网络不稳定或请求失败时，可以设置请求重试的机制，可以通过封装请求函数来自动进行重试，提高请求的成功率。
8. 统一处理请求日志：可以在请求封装中添加请求日志记录，方便追踪和排查问题。
9. 统一处理请求埋点：可以在请求发送前后加入一些埋点逻辑，例如统计请求的次数、请求时长等，方便进行性能分析和优化。
10. 统一处理请求参数加密：可以将敏感数据进行加密，并在请求封装中进行解密操作，提高数据安全性。
11. 统一处理请求数据格式化：可以对请求的数据进行格式化，例如将请求参数转换为指定的数据格式（如 JSON、XML），或者进行数据的序列化和反序列化操作。
12. 统一处理请求的并发限制：可以设置请求并发数的限制，避免同时发送过多的请求导致服务器压力过大。
13. 统一处理请求的响应缓存：可以对请求的响应结果进行缓存，减少对服务器的请求压力，提高性能。
14. 统一处理请求的重定向：可以对请求的重定向进行统一处理，例如自动跳转到指定的页面或进行指定的操作。
15. 统一处理请求的跨域问题：可以在请求封装中对跨域请求进行处理，例如设置 CORS 头信息、使用代理等方式来解决跨域问题。

## 499 如何封装一个请求，让其多次调用的时候，实际只发起一个请求的时候，返回同一份结果【热度: 636】

* created_at: 2023-07-26T16:15:45Z
* updated_at: 2023-07-26T16:15:46Z
* labels: 网络, 阿里巴巴
* milestone: 高

**关键词**：defer函数、请求结果缓存在JS内存

最优解： **使用deferred思想来实现请求的等待队列，可以借助Promise和async/await语法**。

下面是使用`deferred`思想来实现的代码示例：

```javascript
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
