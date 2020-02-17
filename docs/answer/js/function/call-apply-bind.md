`call,apply,bind` 是函数对象三个重要的原型方法,
用来动态改变 js 函数执行时的 this 的指向,典型问题如下:

**1. `call,apply,bind` 的异同?**

* 相同点
  * 都是用来改变 this 的值
* 不同点
  * call,apply 传参方式不同,直接返回执行结果
    * call 调用格式 `function.call(thisArg, arg1, arg2, ...)`
    * apply 调用格式 `func.apply(thisArg, [argsArray])`
  * bind 调用格式为 `function.bind(thisArg[, arg1[, arg2[, ...]]])` 返回的是函数

**2. 实现 call 或 apply 方法?**
```js
{% include './custom-call-bind-apply.js' %}
```
核心考点:
1. 利用成员调用对 this 的修改模拟 call,apply 对 this 的变换





3. bind 函数的特性,参见 [mdn bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

语法格式 `function.bind(thisArg[, arg1[, arg2[, ...]]])`

-   `thisArg`
    -   如果使用 new 运算符构造绑定函数
    -   thisArg 传递的任何原始值都将转换为 object

