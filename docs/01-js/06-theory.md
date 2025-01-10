# js 引擎原理

## 内存管理

js 语言有内置的垃圾回收机制。
内存分配的申明周期如下

1. 分配内存 (申明语句会触发内存分配操作)
2. 使用内存 (函数调用,局域执行触发内存读写)
3. 内存释放 (gc 自动完成)

node 采用标记清除算法。

## 什么是 Strict Mode?

<Answer open>

回答要点包括如下几个方面。

1. **Strict Mode 定义** Strict Mode 是 ECMAScript 语言的变种，详见规范 [strict-variant-of-ecmascript](https://tc39.es/ecma262/#sec-strict-variant-of-ecmascript) 。 开启 Strict Mode  后，JS 引擎会基于 ECMAScript 规范中定义的严格模式约束，排除特定的语法或语义，改变特定语义的执行流程。
2. **如何开启** 通过在代码或函数顶部声明 `'use strict'` 开启 Strict Mode 模式, 开启规则详见 [Use Strict Directive](https://tc39.es/ecma262/#sec-directive-prologues-and-the-use-strict-directive)。
3. **Strict Mode 作用** 用户通过开启来解决一些不安全的语言特性带来的安全或者其他问题。开启后的限制，详见 [The Strict Mode of ECMAScript](https://tc39.es/ecma262/#sec-strict-mode-of-ecmascript)。
4. **加分项** 理解为什么会有这个特性，为什么会设计成这样的语法。可以阅读 [JavaScript二十年 严格模式章节](https://cn.history.js.org/part-4.html#%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F)

### strict mode 细节

</Answer>

## let var const 区别? ⭐️⭐️⭐️⭐️⭐️

核心在于作用域.

- let 作用域为最近的块结构
- var 为最近的函数结构

js 采用词法作用域,更详细的资料参见 [你不知道的 JavaScript（上卷） 第一章](https://book.douban.com/subject/26351021/)
理解如下概念:

1. 静态(词法)作用域和动态作用域
2. 左查询和右查询

## 什么是闭包,闭包的的使用场景？⭐️⭐️⭐️⭐️⭐️

闭包就是在函数的词法作用域外访问函数内作用域的现象。

> 闭包的原理是由于外部变量持有内层函数的引用导致函数及其变量未被释放仍就可用

1. 闭包保留了内部函数所有的状态

> 使用场景

1. 私有变量
2. 回调模式保存动画状态,相比全局变量每个动画可以维持自己的状态值。避免全局污染。

## this

1. this 是一个关键字,它的值取决于当前的执行环境,而非申明环境
2. this 值的判定方法,参考 [你不知道的 javascript 上卷-第二部分　 this 和对象原型](https://book.douban.com/subject/26351021/)
    1. **默认绑定**,当为普通函数调用或处于全局环境时
        1. 严格模式 this 为 undefined
        2. 非严格模式为 window
    2. **隐式绑定**,当未对象成员的函数调用时,this 为当前对象 > 此种情况最易出错,当对象成员函数经过赋值等其他操作时,会转变为**默认绑定**须严格区分
    3. **显示绑定** 当采用如下方法调用函数时会改变 this 的值
        1. **call** 修改运行时 this
        2. **apply** 效果同上,传入参数维数组模式
        3. **bind** 永久改变 this,返回新的函数 > 当 this 的值为 null,undefined 时会采用 **默认绑定**,若赋值为原始值则采用原始封装对象进行替换
    4. **new** 当采用 new 运行函数时,this 指向新创建的对象
    5. **箭头函数 this** 继承外层执行环境的 this 值

> DOM 中的 this

当在回调中绑定 this 时,this 值的机制,由于是用户代理触发回调执行,**this** 的值等于申明时绑定的 dom 环境。

## 箭头函数同非箭头函数 this 的区别？

## 变量提升

参考 [我知道你懂 hoisting，可是你了解到多深？](https://blog.techbridge.cc/2018/11/10/javascript-hoisting/)

变量提升是 js 语言的一种机制确保在变量或函数定义后,无需考虑调用位置对变量或函数进行引用。

它具有如下机制:

1. 变量或函数声明语句会在代码执行前,完成对变量或函数的初始化
2. 同名函数和变量申明,变量申明提升在前
3. 重复申明的函数提升会按照声明顺序后面覆盖前面
4. let 提升会出现 TDZ 现象
