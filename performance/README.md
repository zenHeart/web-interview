性能
===

**讲解性能中的考点**

----
## 问题
### 采用什么工具查找性能问题?
参见 [google 性能测量](https://developers.google.cn/web/fundamentals/performance/get-started/measuringperf-2)


### 如何改善网站滚动性能?


## 总结
性能推荐看 [google 性能教程](https://developers.google.cn/web/fundamentals/performance/rail)
基于 [RAIL](https://developers.google.cn/web/fundamentals/performance/rail) 去分析性能.

性能优化的基本思路

* 加载性能
    按照资源的类型处理
    * 文本类型资源
        * 源码区分开发和部署版本,对部署代码进行压缩混淆.例如 `uglify`
        具体工具参见 [压缩你的代码](https://developers.google.cn/web/fundamentals/performance/get-started/textcontent-3#minify_your_code)
        * 精简不需要的库和依赖
        * 服务端采用 gzip 压缩代码
    * 图片内容
        *  




### 解释 layout,painting,compositing





## 参考资料
* [google web fundamentals performance ](https://developers.google.cn/web/fundamentals/performance/why-performance-matters/)
* [Front-end-De veloper-Interview-Questions/Performance Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/93cf23ce51532d91319223c5a91e90811557ec0f/questions/performance-questions.md#performance-questions)