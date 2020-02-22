# 详解 diff 算法

## diff 算法的作用

比较修改前和修改后的 virtual dom
计算需要修改的内容,精简 dom 的操作

## react dom 比对流程

1. 比较根节点
    1. 类型不同直接替换
    2. 类型相同比较属性
        1. 记录变化的属性
2. 遍历比较子节点
    1.

## 参考资料

-   [A Survey on Tree Edit Distance and Related
    Problems](https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf) 讲解 dom 编辑距离
-   [Reconciliation](https://reactjs.org/docs/reconciliation.html) react 官方文档
