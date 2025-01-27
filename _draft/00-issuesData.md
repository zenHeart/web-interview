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

