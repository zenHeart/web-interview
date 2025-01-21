# 编码题

## 防抖和节流的原理及实现

* debounce 阻止函数的高频执行,只有当频率小于等于限定频率是才延迟触发
* throttle 按照固定的频率触发函数,当函数执行频率高于设定频率是忽略执行

## 实现 call 或 apply 方法?

核心考点:

1. 利用成员调用对 this 的修改模拟 call,apply 对 this 的变换

3. bind 函数的特性,参见 [mdn bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

语法格式 `function.bind(thisArg[, arg1[, arg2[, ...]]])`

* `thisArg`
  * 如果使用 new 运算符构造绑定函数
  * thisArg 传递的任何原始值都将转换为 object

## 深拷贝和浅拷贝

1. 浅拷贝只拷贝第一层引用
   1. 采用 `Object.assign`
   2. 采用对象扩展
2. 深拷贝,递归拷贝三种方法
   1. 采用递归实现拷贝
   2. 考试引用类型判断
   3. 考察 null 判断

## 实现 loadash get

## async await 原理， 手写 async 函数？{#p0-async-await-implementation}

## 检测对象循环引用
