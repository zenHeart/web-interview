# 实现 call 或 apply 方法?

核心考点:

1. 利用成员调用对 this 的修改模拟 call,apply 对 this 的变换

3. bind 函数的特性,参见 [mdn bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

语法格式 `function.bind(thisArg[, arg1[, arg2[, ...]]])`

* `thisArg`
  * 如果使用 new 运算符构造绑定函数
  * thisArg 传递的任何原始值都将转换为 object
