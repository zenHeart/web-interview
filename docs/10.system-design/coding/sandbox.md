# 如何实现一个前端沙箱系统？  {#P0-sandbox}

<Answer>

**核心概念/解决方案:**

- 隔离粒度：JS（作用域/Proxy）、CSS（Shadow DOM/CSS Modules）、DOM（影子树）
- 实现路线：IIFE/with/new Function、Snapshot/Legacy/Proxy Sandbox，逃逸与防护
- 多实例与性能：多例 Proxy/fakeWindow、绑定函数与 getter、快照还原

微前端已经成为前端领域比较火爆的话题，在技术方面，微前端有一个始终绕不过去的话题就是前端沙箱

 什么是沙箱

> Sandboxie(又叫沙箱、沙盘)即是一个虚拟系统程序，允许你在沙盘环境中运行浏览器或其他程序，因此运行所产生的变化可以随后删除。它创造了一个类似沙盒的独立作业环境，在其内部运行的程序并不能对硬盘产生永久性的影响。 在网络安全中，沙箱指在隔离环境中，用以测试不受信任的文件或应用程序等行为的工具

简单来说沙箱（sandbox）就是与外界隔绝的一个环境，内外环境互不影响，外界无法修改该环境内任何信息，沙箱内的东西单独属于一个世界。

 JavaScript 的沙箱

对于 JavaScript 来说，沙箱并非传统意义上的沙箱，它只是一种语法上的 Hack 写法，沙箱是一种安全机制，把一些不信任的代码运行在沙箱之内，使其不能访问沙箱之外的代码。当需要解析或着执行不可信的 JavaScript 的时候，需要隔离被执行代码的执行环境的时候，需要对执行代码中可访问对象进行限制，通常开始可以把 JavaScript 中处理模块依赖关系的闭包称之为沙箱。

 JavaScript 沙箱实现

我们大致可以把沙箱的实现总体分为两个部分：

- 构建一个闭包环境
- 模拟原生浏览器对象

 构建闭包环境

我们知道 JavaScript 中，关于作用域（scope）,只有全局作用域（global scope）、函数作用域（function scope）以及从 ES6 开始才有的块级作用域（block scope）。如果要将一段代码中的变量、函数等的定义隔离出来，受限于 JavaScript 对作用域的控制，只能将这段代码封装到一个 Function 中，通过使用 function scope 来达到作用域隔离的目的。也因为需要这种使用函数来达到作用域隔离的目的方式，于是就有 IIFE（立即调用函数表达式）,这是一个被称为 自执行匿名函数的设计模式

```js
(function foo () {
  const a = 1
  console.log(a)
})()
// 无法从外部访问变量 name
console.log(a) // 抛出错误："Uncaught ReferenceError: a is not defined"
```

当函数变成立即执行的函数表达式时，表达式中的变量不能从外部访问，它拥有独立的词法作用域。不仅避免了外界访问 IIFE 中的变量，而且又不会污染全局作用域，弥补了 JavaScript 在 scope 方面的缺陷。一般常见于写插件和类库时，如 JQuery 当中的沙箱模式

```js
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

```js
const sum = new Function('a', 'b', 'return a + b')

console.log(sum(1, 2))// 3
```

同样也会遇到和 eval 类似的的安全问题和相对较小的性能问题。

```js
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

```js
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

```js
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

```js
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

```js
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

```js
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

```js
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

```js
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

```js
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

```js

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

- CSS Module
- namespace
- Dynamic StyleSheet
- css in js
- Shadow DOM 常见的我们这边不再赘述，这里我们重点提一下Shadow DO。

 Shadow DOM

Shadow DOM 允许将隐藏的 DOM 树附加到常规的 DOM 树中——它以 shadow root 节点为起始根节点，在这个根节点的下方，可以是任意元素，和普通的 DOM 元素一样。

### 延伸阅读

- [sandbox](https://zhuanlan.zhihu.com/p/675043217)

**面试官视角:**

- 关注逃逸场景（top/self/window）、DOM/CSS 污染、性能与兼容性权衡

</Answer>
