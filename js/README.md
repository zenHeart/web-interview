# js

**汇集所有 js 问题**

---

## 语言特性
### js 有哪些类型?
* 基础类型
  * Number 采用 IEEE 754 标准
  * String
  * Null
  * undefined
  * Boolean
  * Symbol
* 引用类型
  * 内建对象 EMACScipt 定义
  * 宿主对象 取决于运行环境

### 类型转换
* [parseInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
测试用例参见 [type-convert](type-convert.test.js)

### 隐式转换
1. 理解 `==` 会出现类型转换,典型的例子参见如下.
	```js
	console.log(0=='0') //为 true
	console.log(0 ==[]) //为 true
	console.log('0' == []) //为 false 
	```
	
	> 详情参见 [equality operator](https://tc39.github.io/ecma262/#sec-equality-operators-runtime-semantics-evaluation)

2. 操作符导致导致的转换
   1. `+` 若存在字符串则进行字符串的连接运算
   2. `-,*,/,**` 转换为数字进行操作

3. 对象转换为数字和准换为字符串的规则,详见 js 权威指南 第六版 3.8.3 章节

#### 显示类型转换
1. Boolean,Number,String,Object 的使用



### 运算符优先级
* `||` 优先级大于三目元算符

> **tip**
> 一定养成逻辑判断加括号分组的习惯

### 核心运算符
* **+**
* **==,===**
* **&&** 短路运算
* **||** 导通运算
* **in**
* **instanceof**
* **,** 运算符


### 表达式和语句的区别?
这是语言层面的基础概念。表达式一般为求值运算,语句是逻辑操作,多用来改变程序的状态。推荐阅读 [All you need to know about Javascript's Expressions, Statements and Expression Statements](https://dev.to/promhize/javascript-in-depth-all-you-need-to-know-about-expressions-statements-and-expression-statements-5k2)

### 变量名
允许合法的 utf8 字符集。甚至可以使用中文命名(不建议这么做)

### 作用域
js 采用词法作用域,更详细的资料参见 [你不知道的JavaScript（上卷） 第一章](https://book.douban.com/subject/26351021/)
理解如下概念:
1. 静态(词法)作用域和动态作用域
2. 左查询和右查询

### 变量提升
参考 [我知道你懂 hoisting，可是你了解到多深？](https://blog.techbridge.cc/2018/11/10/javascript-hoisting/)

变量提升是 js 语言的一种机制确保在变量或函数定义后,无需考虑调用位置对变量或函数进行引用。

它具有如下机制:
1. 变量或函数声明语句会在代码执行前,完成对变量或函数的初始化
	> 注意赋值操作会在执行时触发
2. 函数提升会在变量提升
3. 同名函数提升会按照声明顺序后面覆盖前面
4. let 提升会出现 TDZ 现象

### 什么是闭包,闭包的的使用场景？
闭包就是在函数的词法作用域外访问函数内作用域的现象。
> 闭包的原理是由于外部变量持有内层函数的引用导致函数及其变量未被释放仍就可用
1. 闭包保留了内部函数所有的状态

> 使用场景

1. 私有变量
2. 回调模式保存动画状态,相比全局变量每个动画可以维持自己的状态值。避免全局污染。


### this 值的判定规则?
1. this 是一个关键字,它的值取决于当前的执行环境,而非申明环境
2. this 值的判定方法,参考 [你不知道的 javascript上卷-第二部分　this和对象原型](https://book.douban.com/subject/26351021/)
   1. **默认绑定**,当为普通函数调用或处于全局环境时
      1. 严格模式 this 为 undefined
      2. 非严格模式为 window
   2. **隐式绑定**,当未对象成员的函数调用时,this 为当前对象
		> 此种情况最易出错,当对象成员函数经过赋值等其他操作时,会转变为**默认绑定**须严格区分
   3. **显示绑定** 当采用如下方法调用函数时会改变 this 的值
      1. **call** 修改运行时 this
      2. **apply** 效果同上,传入参数维数组模式
      3. **bind** 永久改变this,返回新的函数
		> 当 this 的值为 null,undefined 时会采用 **默认绑定**,若赋值为原始值则采用原始封装对象进行替换
   4. **new** 当采用 new 运行函数时,this 指向新创建的对象
   5. **箭头函数 this** 继承外层执行环境的 this 值

> DOM 中的 this

当在回调中绑定 this 时,this 值的机制,由于是用户代理触发回调执行,**this** 的值等于申明时绑定的 dom 环境。


### 解释 IIFE
IIFE 是立即执行函数表达式。

要理解 IIFE 必须知晓函数申明和函数表达式的区别。一个最简单的判别方法是若 **function** 关键字未出现一行的开头则且不属于上一行的组成部分则为函数申明否则为函数表达式。

所以只要函数表达式被立即调用则称之为 IIFE.

此外函数表达式和函数申明具有如下区别
1. 函数表达式不会被提升
2. 函数表达式的标识符是可省略的
3. 函数表达式的标识符作用域为该函数体,外部执行环境无法使用
4. 具名函数表达式的名称作为函数名,匿名函数名称取决于申明方式

推荐阅读:

* [Named function expressions demystified](https://kangax.github.io/nfe/)

## Number
### 为什么 `0.1 + 0.2 != 0.3`, 类似还有 `.3 - .2 !=== .2 - .1`
重点是理解 js 数值采用采用 **IEEE 754 编码**表示数值,,产生原因是二级制表示浮点时某些浮点只能取近似值导致,存在编码误差

> 所以在做金融相关计算时,多采用最小货币价值对应的整数来处理计算,例如人命币采用分或者厘为单位,利用整数计算

### Number 的特殊值?
1. **NaN** 表示非法数字,利用 `NaN !=== NaN` 的特性判断
2. **Infinity** 正无穷
3. **-Infinity** 负无穷
> 注意 Number 类型上包含一系列常量,利用`Object.getOwnPropertyDescriptors(Number)` 自行查看

### Number 的进制转换
* `toString` 转换为对应进制的字符串
* 根据前缀自动判断进制
  * **0x** 开头 16 进制
  * **0** 开头 8 进制

## String
1. String 采用 UTF16 编码,单个字符取决于编码长度
2. 字符串的不可变性,尝试修改 `s = 'hello';s[0]='H' 输出 s 无效`
3. 原始封装类型,为何可直接调用 `'hello world'.toUpperCase()`
4. 操作符的对字符串类型转换的影响
   1. `+` 连接字符串
   2. `*` 转换为数字运算
5. 字符串的常用方法

## 布尔值
1. `!` 操作符对布尔值的默认操作

## null undefined
1. 详细区别参考 [阮一峰 undefined与null的区别](https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

准确说明如下
1. **undeclared** 表示为分配空间,可以采用 `try catch` 捕获右引用错误
2. **null** 表示初始化为空,说明此处不该有对象
3. **undefined** 表示缺省值,说明变量已创建但未赋值


## Function
### call 和 apply 的使用
1. 用于动态修改执行时的 this 绑定。

## ES6
### 迭代器概念和使用

## 对象章节
### 什么是原型链？
根据 [ecmascript 规范对象原型链的描述](https://tc39.es/ecma262/#sec-objects)概念如下:每一个通过构造器创建的对象都会有一个隐式索引,值指向构造器的 **prototype(原型)** 属性值。此外该原型可能包含一个值为非空的隐式索引指向它自己的原型,依次类推称为原型链。当查找某个对象属性时会顺着原型链检查,返回匹配的第一个相同属性值。

根据 js 引擎的实现,原型链实际上是指
对象基于内部 `__proto__` 的链式索引实现对象方法和属性复用的机制。

###  `prototype` 和 `__proto__` 区别
1. protoype 是函数的属性 `__proto__` 是对象的属性
	> 注意函数也是对象,所以也包含 `__proto__` 属性
2. 当采用 new 调用函数时,会将对象 `__proto__` 的值指向 `prototype` 属性

## 模块规范
1. commonjs
   1. 实现 js 模块化生态,nodejs 采用此机制,浏览器端为 browserify
2. AMD
   为了实现异步模块加载采用此机制,
3. ES6 

组件的异步加载原理?
webpack 如何实现的异步加载？


### es6 和 commonjs 的差异

