# 编码题

## debounce {#p0-debounce}

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

## throttle {#p0-throttle}

* debounce 阻止函数的高频执行,只有当频率小于等于限定频率是才延迟触发
* throttle 按照固定的频率触发函数,当函数执行频率高于设定频率是忽略执行

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

## 实现 call 或 apply 方法?

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

```js
// eslint-disable-next-line
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
// eslint-disable-next-line
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
// eslint-disable-next-line
Function.prototype.applyTwo = function (context) {
  const args = arguments[1] // 获取传入的数组参数
  context.fn = this // 假想context对象预先不存在名为fn的属性
  let fnStr = 'context.fn('
  for (let i = 0; i < args.length; i++) {
    // eslint-disable-next-line
    fnStr += i == args.length - 1 ? args[i] : args[i] + ','
  }
  fnStr += ')'// 得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
  // eslint-disable-next-line
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
// eslint-disable-next-line
Function.prototype.applyThree = function (context) {
  // eslint-disable-next-line
  var context = context || window
  const args = arguments[1] // 获取传入的数组参数
  context.fn = this // 假想context对象预先不存在名为fn的属性
  // eslint-disable-next-line
  if (args === void 0) { // 没有传入参数直接执行
    return context.fn()
  }
  let fnStr = 'context.fn('
  for (let i = 0; i < args.length; i++) {
    // 得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
    fnStr += i === args.length - 1 ? args[i] : args[i] + ','
  }
  fnStr += ')'
  // eslint-disable-next-line
  const returnValue = eval(fnStr) // 还是eval强大
  delete context.fn // 执行完毕之后删除这个属性
  return returnValue
}
```

 模拟实现第四步

其实一开始就埋下了一个隐患，我们看看这段代码：

```javascript
// eslint-disable-next-line
Function.prototype.applyThree = function (context) {
  // eslint-disable-next-line
  var context = context || window
  const args = arguments[1] // 获取传入的数组参数
  context.fn = this // 假想context对象预先不存在名为fn的属性
// ......
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
// eslint-disable-next-line
var s1 = Symbol()
// eslint-disable-next-line
var s2 = Symbol()
s1 === s2 // false

// 有参数的情况
// eslint-disable-next-line
var s1 = Symbol('foo')
// eslint-disable-next-line
var s2 = Symbol('foo')
s1 === s2 // false
```

注意：Symbol值不能与其他类型的值进行运算。

作为属性名的Symbol

```js
// eslint-disable-next-line
const mySymbol = Symbol()

// 第一种写法
var a = {}
a[mySymbol] = 'Hello!'

// 第二种写法
// eslint-disable-next-line
var a = {
  [mySymbol]: 'Hello!'
}

// 第三种写法
// eslint-disable-next-line
var a = {}
Object.defineProperty(a, mySymbol, { value: 'Hello!' })

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

注意，Symbol值作为对象属性名时，不能用点运算符。

继续看下面这个例子：

```javascript
const a = {}
// eslint-disable-next-line
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
// eslint-disable-next-line
Function.prototype.applyFour = function (context) {
// eslint-disable-next-line
  var context = context || window
  const args = arguments[1] // 获取传入的数组参数
  // eslint-disable-next-line
  const fn = Symbol()
  context[fn] = this // 假想context对象预先不存在名为fn的属性
  // eslint-disable-next-line
  if (args === void 0) { // 没有传入参数直接执行
    return context[fn]()
  }
  let fnStr = 'context[fn]('
  for (let i = 0; i < args.length; i++) {
    // 得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
    fnStr += i === args.length - 1 ? args[i] : args[i] + ','
  }
  fnStr += ')'
  // eslint-disable-next-line
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
// eslint-disable-next-line
  const unique_proper = '00' + Math.random()
  // eslint-disable-next-line
  if (obj.hasOwnProperty(unique_proper)) {
    // eslint-disable-next-line
    arguments.callee(obj)// 如果obj已经有了这个属性，递归调用，直到没有这个属性
  } else {
    // eslint-disable-next-line
    return unique_proper
  }
}
// 原生JavaScript封装apply方法，第五版
// eslint-disable-next-line
Function.prototype.applyFive = function (context) {
// eslint-disable-next-line
  var context = context || window
  const args = arguments[1] // 获取传入的数组参数
  const fn = jawilSymbol(context)
  context[fn] = this // 假想context对象预先不存在名为fn的属性
  // eslint-disable-next-line
  if (args === void 0) { // 没有传入参数直接执行
    return context[fn]()
  }
  let fnStr = 'context[fn]('
  for (let i = 0; i < args.length; i++) {
    // 得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
    fnStr += i === args.length - 1 ? args[i] : args[i] + ','
  }
  fnStr += ')'
  // eslint-disable-next-line
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
// eslint-disable-next-line
Function.prototype.callOne = function (context) {
  return this.applyFive(([].shift.applyFive(arguments), arguments))
  // 巧妙地运用上面已经实现的applyFive函数
}
```

看不太明白也不能怪我咯，我就不细讲了，看个demo证明一下，这个写法没问题。

```js
// eslint-disable-next-line
Function.prototype.applyFive = function (context) { // 刚才写的一大串}
  // eslint-disable-next-line
  Function.prototype.callOne = function (context) {
    return this.applyFive(([].shift.applyFive(arguments)), arguments)
    // 巧妙地运用上面已经实现的applyFive函数
  }
  // 测试一下
  const obj = {
    name: 'jawil'
  }

  function sayHello (age) {
    return {
      name: this.name,
      age
    }
  }

  console.log(sayHello.callOne(obj, 24))
}
```

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
// eslint-disable-next-line
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
// eslint-disable-next-line
Function.prototype.bind = Function.prototype.bind || function (context) {
  // ...
}
```

 颗粒化（curring）实现

对于函数的柯里化不太了解的童鞋，可以先尝试读读这篇文章：[前端基础进阶（八）：深入详解函数的柯里化](https://www.jianshu.com/p/5e1899fe7d6b)。
上述的实现方式中，我们返回的参数列表里包含：atgsArray.slice(1)，他的问题在于存在预置参数功能丢失的现象。
想象我们返回的绑定函数中，如果想实现预设传参（就像bind所实现的那样），就面临尴尬的局面。真正实现颗粒化的“完美方式”是：

```javascript
// eslint-disable-next-line
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
// eslint-disable-next-line
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
// eslint-disable-next-line
  const unique_proper = '00' + Math.random()
  // eslint-disable-next-line
  if (obj.hasOwnProperty(unique_proper)) {
    // eslint-disable-next-line
    arguments.callee(obj)// 如果obj已经有了这个属性，递归调用，直到没有这个属性
  } else {
    // eslint-disable-next-line
    return unique_proper
  }
}
// 原生JavaScript封装apply方法，第五版
// eslint-disable-next-line
Function.prototype.applyFive = function (context) {
// eslint-disable-next-line
  var context = context || window
  const args = arguments[1] // 获取传入的数组参数
  const fn = jawilSymbol(context)
  context[fn] = this // 假想context对象预先不存在名为fn的属性
  // eslint-disable-next-line
  if (args === void 0) { // 没有传入参数直接执行
    return context[fn]()
  }
  let fnStr = 'context[fn]('
  for (let i = 0; i < args.length; i++) {
    // 得到"context.fn(arg1,arg2,arg3...)"这个字符串在，最后用eval执行
    fnStr += i === args.length - 1 ? args[i] : args[i] + ','
  }
  fnStr += ')'
  // eslint-disable-next-line
  const returnValue = eval(fnStr) // 还是eval强大
  delete context[fn] // 执行完毕之后删除这个属性
  return returnValue
}
// 简单模拟call函数
// eslint-disable-next-line
Function.prototype.callOne = function (context) {
  return this.applyFive(([].shift.applyFive(arguments)), arguments)
  // 巧妙地运用上面已经实现的applyFive函数
}

// 简单模拟bind函数
// eslint-disable-next-line
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
```

## 如何封装一个请求，让其多次调用的时候，实际只发起一个请求的时候，返回同一份结果 {#p1-sigleton-request}

最优解： **使用deferred思想来实现请求的等待队列，可以借助Promise和async/await语法**。

下面是使用`deferred`思想来实现的代码示例：

```js
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

## 实现管道函数 {#p0-pipe}

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

## 模拟new操作 {#p0-simulate-new}

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

## 手写实现 instanceof {#p0-instanceof}

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

## 手写实现 Object.create {#p1-object-create}

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

## 实现一个缓存函数 {#p0-cache}

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

## 使用 Promise 实现一个异步流量控制的函数(限制并发数) {#p0-async-control}

**关键词**：异步流量控制的函数

下面是使用 Promise 实现异步流量控制的函数的示例：

```javascript
function asyncFlowControl (tasks, limit) {
  let runningCount = 0 // 当前正在运行的任务数
  let index = 0 // 当前执行的任务索引
  const results = [] // 存储任务的结果

  return new Promise((resolve, reject) => {
    function runTask () {
      if (runningCount >= limit || index >= tasks.length) {
        // 达到并发限制或所有任务已执行完毕，返回结果
        if (results.length === tasks.length) {
          resolve(results)
        }
        return
      }

      const task = tasks[index]
      const currentIndex = index // 保存当前任务索引

      index++
      runningCount++

      task().then((result) => {
        results[currentIndex] = result // 存储任务结果
        runningCount--
        runTask() // 递归执行下一个任务
      }).catch((error) => {
        reject(error)
      })

      runTask() // 递归执行下一个任务
    }

    runTask() // 开始执行任务
  })
}

// 示例用法
function asyncTask (value) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(value)
      resolve(value)
    }, Math.random() * 1000)
  })
}

const tasks = [
  () => asyncTask(1),
  () => asyncTask(2),
  () => asyncTask(3),
  () => asyncTask(4),
  () => asyncTask(5)
]

asyncFlowControl(tasks, 2).then((results) => {
  console.log('All tasks completed:', results)
}).catch((error) => {
  console.error('Error occurred:', error)
})
```

以上示例中的 `asyncFlowControl` 函数接受一个任务数组 `tasks` 和一个并发限制 `limit`，它会按照并发限制逐个执行任务，并返回一个 Promise 对象。在示例中，任务数组中的每个任务都是一个返回 Promise 的函数，通过 `setTimeout` 模拟异步操作。

在执行过程中，`asyncFlowControl` 函数会维护一个 `runningCount` 变量来跟踪当前正在运行的任务数，并使用递归的方式执行任务。当达到并发限制或所有任务都已执行完毕时，函数会返回结果。

通过控制并发任务的数量，我们可以限制同时执行的异步操作，实现异步流量控制。在上述示例中，设置并发限制为 2，可以确保最多同时执行 2 个任务，并在任务执行完毕后再执行下一个任务。

## 手写 JSON.stringify 和 手写 JSON.parse 实现 {#p0-json-parser}

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
  // eslint-disable-next-line
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

## 如何将JavaScript代码解析成抽象语法树(AST) {#ast}

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

## 如何做 promise 缓存？上一次调用函数的 promise 没有返回， 那么下一次调用函数依然返回上一个 promise {#p0-async-cache}

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

## 数字千分化的实现方式有哪些？用代码实现一下 {#p0-thousnad}

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

## 集合运算 {#p0-set-operation}

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

## chain-call {#p0-call-chain}

可以通过在 Number 原型上定义 add 和 minus 方法来实现该功能，代码如下：

```javascript
// eslint-disable-next-line
Number.prototype.add = function (num) {
  return this + num
}
// eslint-disable-next-line
Number.prototype.minus = function (num) {
  return this - num
}

console.log((5).add(3).minus(2)) // 输出6
```

上述代码中，通过在 Number.prototype 上定义 add 和 minus 方法，实现了将数字类型的值转换为 Number 对象，并且可以链式调用这两个方法。最终返回的结果是一个数值类型的值。

## this指向与对象继承数组方法：输出以下代码执行的结果并解释为什么？ {#p0-this-call}

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

## =下面代码中 a 在什么情况下会打印 1 ? {#p0-a}

```js
// eslint-disable-next-line
var a = '?';
// eslint-disable-next-line
if (a == 1 && a == 2 && a == 3) {
  console.log(1)
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
// eslint-disable-next-line
if (a == 1 && a == 2 && a == 3) {
  console.log(1)
}
```

在这个例子中，`a` 被定义为一个对象，有一个属性 `i` 初始化为 1，同时重写了 `toString` 方法，在每次调用时返回 `i` 的值，并且每次返回后将 `i` 自增。这样在比较 `a` 是否等于 1、2、3 的时候，会依次调用 `a.toString()` 方法，得到的结果就是满足条件的 1，依次打印出来。

## 手写订阅-发布模式 {#p0-subsribe-publish}

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

观察者模式和订阅-发布模式都属于事件模型，它们都是为了解耦合而存在，但是它们之间还是有一些不同之处的：

1. 观察者模式中，主题（被观察者）和观察者之间是直接联系的，观察者订阅主题，主题状态发生变化时会直接通知观察者；而订阅-发布模式中，发布者和订阅者之间没有直接的联系，发布者发布消息到消息中心，订阅者从消息中心订阅消息。

2. 在观察者模式中，主题和观察者是一对多的关系，一个主题可以有多个观察者，而在订阅-发布模式中，发布者和订阅者是多对多的关系，一个发布者可以有多个订阅者，一个订阅者也可以订阅多个发布者。

3. 在观察者模式中，主题状态发生变化时，观察者会被直接通知，通知的方式可以是同步或异步的，观察者可以决定如何处理通知；而在订阅-发布模式中，消息是通过消息中心进行传递的，订阅者从消息中心订阅消息，发布者发布消息到消息中心，消息中心再将消息发送给订阅者，这个过程是异步的，订阅者不能决定何时接收消息。

4. 在观察者模式中，主题和观察者之间存在强耦合关系，如果一个观察者被移除，主题需要知道这个观察者的身份；而在订阅-发布模式中，发布者和订阅者之间没有强耦合关系，发布者不需要知道订阅者的身份，订阅者也不需要知道发布者的身份。

综上所述，观察者模式和订阅-发布模式都是事件模型，但它们之间的区别在于关注点的不同，观察者模式更关注主题和观察者之间的交互，而订阅-发布模式更关注发布者和订阅者之间的交互。

## ['1', '2', '3'].map(parseInt) 结果是啥，为什么？

执行 `['1', '2', '3'].map(parseInt)` 会得到 `[1, NaN, NaN]`，这个结果可能和人们预期的不一样。

这是因为 `map` 方法会传入三个参数：当前遍历到的元素、当前遍历到的索引、原数组本身。而 `parseInt` 函数则接受两个参数：需要被解析的值、用于解析的进制数。在执行 `['1', '2', '3'].map(parseInt)` 时，实际传入 `parseInt` 的参数如下：

* `'1'`、`0`（表示解析为十进制）：解析后得到数字 `1`。
* `'2'`、`1`（表示解析为一进制）：解析后得到 `NaN`。
* `'3'`、`2`（表示解析为二进制）：解析后得到 `NaN`。

所以结果为 `[1, NaN, NaN]`。

## promise.allSettled

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

## 手写代码实现 promise.all

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

## 手写代码实现 promise.race

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

## setObjectValue(obj: object, keys: string[], value: any) 方法， 支持安全设置对象的值

可以使用递归实现安全设置对象的值。以下是一个实现setObjectValue方法的例子：

```ts
function setObjectValue (obj: object, keys: string[], value: any) {
  const key = keys.shift()
  if (!key) {
    return
  }

  if (keys.length === 0) {
    obj[key] = value
    return
  }

  if (!obj[key]) {
    obj[key] = {}
  }

  setObjectValue(obj[key], keys, value)
}
```

这个方法接受三个参数：要设置值的对象，一个字符串数组表示对象的键的路径，和要设置的值。例如，如果要设置对象`user`的`address`字段的`city`属性为`"New York"`，可以调用方法：

```ts
const user = {}
setObjectValue(user, ['address', 'city'], 'New York')
```

在这个例子中，`keys`数组的第一个元素是`"address"`，所以我们检查`user`对象是否有一个名为`"address"`的属性。如果没有，我们创建一个新对象并将其分配给`user.address`属性。然后我们继续递归地调用`setObjectValue`方法，将新对象作为第一个参数传递，将`keys`数组的剩余部分作为第二个参数传递，将最终的值作为第三个参数传递。最终，我们将`"New York"`分配给`user.address.city`属性。

这个方法确保在设置对象值时不会引发`TypeError`异常，即使对象的某些部分尚未定义。
