# virtual dom 重点
<!-- TODO: https://mp.weixin.qq.com/s?__biz=MzI1ODk2Mjk0Nw==&mid=2247484489&idx=1&sn=16e1769ebb8a4a375eba75e2daeb5f63&scene=21#wechat_redirect  -->
1. vdom 的描述 [tag,props,children]
2. 如何将 vdom 渲染为实际 dom, render 函数,但末班,采用类创建虚拟 dom
   1. style 节点的处理
   2. 文本节点的处理 
3. 新,旧 dom 树的比较,返回 patch, patch 的结构
   1. 删除旧节点
   2. 插入新节点
   3. 节点相同，实现此深度遍历算法
      1. 比较属性
      2. 比较子节点,优化点,直接替换开销太大,

# 详解 diff 算法

1. 采用 JS 模拟 dom 对象
2. 采用 diff 算法动态修改 dom 树,patch 如何计算的
3. 

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
