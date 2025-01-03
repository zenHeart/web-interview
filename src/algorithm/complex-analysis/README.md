## 什么是大 O 表示法，它的作用是什么？ ⭐️⭐️⭐️⭐️⭐️

复杂度分析用于评估算法的优劣。
复杂度分析分为两个方面

* **时间复杂度** 评估算法执行效率
* **空间复杂度** 评估算法资源占用

由于代码的执行效率多和输入数据规模相关。采用大 O 表示法评估时间或空间复杂度随数据规模的增长趋势。

由于目前计算机硬件能力提升,主要关心时间复杂度。典型的时间复杂度的大 O 表示如下:

* `O(1)` 常量型操作,不随数据量增大发生变化效率最高
* `O(logn)` 对数增长
* `O(n)` 线性增长
* `O(nlogn)`
* `O(n^2)`
* `O(n!)` 阶乘增长

> **空间复杂度同理**

利用如下规则简化复杂度分析

1. 忽略常数项
    `O(2n) => O(n)`
2. 相加取复杂度大的
    `O(n) + O(n^2) => O(n^2)`
3. 相乘则复杂度也相乘
    `O(n)*O(n) => O(n^2)`

## 复杂度分类

* 最好
* 最坏
* 平均

### 练习

1. 编写输出次数和输入数据 n 之间,符合上述典型复杂度的函数,答案参见 [bigO](./bigO.js)
