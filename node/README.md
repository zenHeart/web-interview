## 基础
### 什么类型是引用类型?
该题考察 js 中类型知识.
可分为基础类型和引用类型两类.
* 基础类型
    * null
    * string
    * number
    * boolean
    * symbol
    * undefined
* 引用类型
    所有对象包括,array,object 等

详情参考 [js 面向对象基础](https://www.amazon.com/Principles-Object-Oriented-JavaScript-Nicholas-Zakas/dp/1593275404/ref=as_li_ss_tl?ie=UTF8&qid=1450209311&sr=8-1&keywords=object+oriented+javascript&linkCode=sl1&tag=nczonline-20&linkId=e0f6e60219cd225f63fc7cb649635e8a)

### js 0.1 + 0.2 === 0.3 是否为 true,如何判断相等?
首先 js [number 类型](https://tc39.github.io/ecma262/#sec-ecmascript-language-types-number-type)
基于 IEEE-754-2008,此问题可参考 [Why is 0.1+0.2 not equal to 0.3 in most programming languages?](https://www.quora.com/Why-is-0-1+0-2-not-equal-to-0-3-in-most-programming-languages)
重点是理解浮点在计算机是二进制表示,所以是近似值.
这就意味着存在误差而,0.1 + 0.2 的结果是两个二进制数相加的结果.
所以在做浮点判断时,必须确定允许的误差限度.
利用 `a + b - c < 1e-10` 绝对误差或相对误差的方式确定相等.

### `==` 和 `===` 在基础类型和引用类型的比较区别?
参看 
* [抽象比较](https://tc39.github.io/ecma262/#sec-abstract-equality-comparison)
* [严格比较](https://tc39.github.io/ecma262/#sec-strict-equality-comparison)

`==` 会对不同类型做一个隐式转换.

### let var 区别
核心在于作用域.
* let 作用域为最近的块结构
* var 为最近的函数结构


## 内存



## 参考资料
* [饿了么 node 面试](https://github.com/ElemeFE/node-interview)

