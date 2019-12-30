## 深拷贝
所谓深拷贝的重点是循环克隆值。
1. 采用 `JSON.parse(JSON.stringfy(obj))` 的方式解决,该解决方案存在如下漏洞
   1. 键值为 undefined 的项会被忽略
   2. 键名为 Symbol 类型会被忽略
   3. 不能序列化函数
   4. 不能解决循环引用对象

详见此文 [javascript 深拷贝](https://dassur.ma/things/deep-copy/)

## 浅拷贝
1. Object.assign()
2. 对象扩展

## instanceof 的使用


## 手写实现四种继承


## Object.create 实现原型继承