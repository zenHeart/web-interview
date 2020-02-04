
-   基础类型
    -   Number 采用 IEEE 754 标准
    -   String
    -   Null
    -   undefined
    -   Boolean
    -   Symbol
-   引用类型
    -   内建对象 EMACScipt 定义
    -   宿主对象 取决于运行环境


**null undefined 区别?**

1. 详细区别参考 [阮一峰 undefined 与 null 的区别](https://www.ruanyifeng.com/blog/2014/03/undefined-vs-null.html)

准确说明如下

1. **undeclared** 表示为分配空间,可以采用 `try catch` 捕获右引用错误
2. **null** 表示初始化为空,说明此处不该有对象
3. **undefined** 表示缺省值,说明变量已创建但未赋值