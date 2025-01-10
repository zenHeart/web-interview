import Answer from '@site/src/components/templates/Answer.tsx';

# 函数

## 箭头函数的典型使用?

## call,apply,bind 区别？

<Answer>

`call,apply,bind` 是函数对象三个重要的原型方法,用来动态改变 js 函数执行时的 this 的指向

* 相同点
  * 都是用来改变 this 的值
* 不同点
  * call,apply 传参方式不同,直接返回执行结果
    * call 调用格式 `function.call(thisArg, arg1, arg2, ...)`
    * apply 调用格式 `func.apply(thisArg, [argsArray])`
  * bind 调用格式为 `function.bind(thisArg[, arg1[, arg2[, ...]]])` 返回的是函数

引擎是如何实现对执行环境动态改变的？

</Answer>

## IIFE 是什么？

<Answer>
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

</Answer>

## generator

1. generator 是迭代器
2. 用来实现协程
3. 典型使用场景

## async await 原理，手写 async 函数?

1. ES8 引入的特性来简化 promise 的使用
2. 采用 迭代器可以实现 async await 方法模拟
