# 编码题

**放置所有典型的编码问题**

----

## 深拷贝和浅拷贝


## 手动实现 bind 方法
1. bind 函数的特性,参见 [mdn bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

语法格式 `function.bind(thisArg[, arg1[, arg2[, ...]]])`
* `thisArg`
    * 如果使用new运算符构造绑定函数
    * thisArg传递的任何原始值都将转换为object


## 内存分配原理
js 语言有内置的垃圾回收机制。
内存分配的申明周期如下
1. 分配内存 (申明语句会触发内存分配操作)
2. 使用内存 (函数调用,局域执行触发内存读写)
3. 内存释放 (gc 自动完成)

node 采用标记清除算法。

## 实现 promise
1. 读懂 [promise 规范](http://www.ituring.com.cn/article/66566)
2. [promise 实现 ](https://zhuanlan.zhihu.com/p/25178630)