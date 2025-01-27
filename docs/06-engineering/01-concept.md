# 概念

## 如何理解前端工程化？

前端工程化是指将前端开发过程中的各种工具、技术和流程进行规范化和自动化，以提高前端开发效率、代码质量和团队协作能力的一种方法。前端工程化主要涵盖以下几个方面：

1. 代码管理：使用版本控制系统（如Git）对前端项目进行代码管理，实现代码的版本控制、协作开发和代码回滚等功能。

2. 代码规范：制定和遵循统一的前端代码规范，包括缩进、命名、注释等，以提高代码的可读性和可维护性。

3. 模块化开发：使用模块化的开发方式，将前端代码拆分为独立的模块，以便于复用和维护。

4. 构建工具：使用构建工具（如Webpack、Gulp）对前端代码进行构建、打包、压缩和优化等处理，提高开发效率和应用性能。

5. 自动化测试：编写自动化测试用例，使用测试工具（如Jest、Mocha）进行自动化测试，以确保代码质量和功能的稳定性。

6. 持续集成和部署：使用持续集成工具（如Jenkins、Travis CI）将代码自动构建、测试和部署到服务器，加快代码交付速度和减少人工操作。

7. 性能优化：使用性能优化工具（如Webpack、Lighthouse）来分析和改进前端应用程序的性能，包括文件加载、资源压缩、缓存策略等方面。

8. 文档和知识管理：编写和维护开发文档、API 文档以及团队知识库，方便团队成员之间的沟通和知识分享。

通过前端工程化的实践，可以减少重复劳动、提高代码质量、加速开发流程和降低维护成本，从而更好地满足项目需求和提升用户体验。

## 前端模块化的演进过程 {#p0-module}

 1 函数作为块

最开始的时候，是以函数为块来编程，因为函数有自己的作用域，相对比较独立

```js
function add (a, b) {
  // ...
}
function add1 (a, b, c) {
  // ...
}
```

这种形式中，add和add1都是定义在全局作用域中的，会造成很多问题：

1. 污染全局作用域，容易造成命名冲突
2. 定义在全局作用域，数据不安全

 2 namespace模式

使用对象作为独立块编程

```js
const myModule = {
  a: 1,
  b: 2,
  add: function (m, n) {
  // ...
  }
}
```

优点：减少了全局变量，有效解决了命名冲突

缺点：

1. 没有私有变量，使用起来很繁琐
2. 数据不安全，模块外面可以随意修改内部的数据

 3 IIFE模式

**使用立即执行函数来创建块，可以形成独立的作用域，外面无法访问，借助window对象来向外暴露接口**

```js
(function ($) {
  const a = 1
  const b = 2
  function add (m, n) {
    // ...
  }
  $('#id').addClass('.hehe')
  window.myModule = {
    a,
    b,
    add
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
// //a.js
// function add(m,n){
//  return m+n;
// }
// module.exports={add:add}

// //b.js
// const { add } = require('./a.js');
// console.log(add(1,2)); // 3
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
  // eslint-disable-next-line
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
// a.js
// function add(m,n){
//  return m+n;
// }
// export {add};

// // b.js
// import {add} from './a.js';
// console.log(add(1,2)); //3
```

**参考文档**

* [https://github.com/careyke/frontend_knowledge_structure/blob/master/javascript/module/question01_module.md](https://github.com/careyke/frontend_knowledge_structure/blob/master/javascript/module/question01_module.md)
