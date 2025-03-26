# mini pack

## 核心概念

1. **asset** 资源,每个文件为一个资源
   1. **id** 资源的核心标识
   2. **code** 资源的源码
   3. **dependencies** 资源所依赖的其他资源
   4. **mapping** 资源依赖和对应id的关系图
2. **entry** 入口资源被称为 entry
3. **graph** 从 entry 读入的整个资源数组
4. **modules** 将 graph 转换为对象格式
   1. 利用 `asset.id` 最为 key
   2. 包装 `asset.code` 为函数,隔离作用域
5. **bundle**
   1. 传入 modules
   2. 实现 require 方法处理资源调用
   3. 调用 entry 资源实现触发
   4. 返回执行结果

## 知识点

1. 实现了 commonjs 规范
2. 实现了文件依赖树分析
3. 实现了 es6 转换为 commonjs

## 实现步骤

1. 利用 fs.readFileSync API 读取文件
2. 利用 babylon 读取文件获取 ast 树
3. 利用 traverse 从 ast 树中提取 import 声明,保存依赖关系
4. 创建文件的资源描述对象
   1. 资源 id
   2. 资源依赖
   3. 资源属性,这里包含文件名
5.

## 参考资料

* [Build your own Webpack - Ronen Amiel](https://www.bilibili.com/video/av53379967/) 该视频实现了一个精简版打包工具
* [minipack](https://github.com/ronami/minipack) 视频对应的源码
* [Webpack founder Tobias Koppers demos bundling live by hand](https://www.bilibili.com/video/av40294417) webpack 作者讲解 webpack
* [webpack-meetup-2018-05](https://github.com/sokra/webpack-meetup-2018-05) 视频对应源码
* [Tobias Koppers：我当初为什么写webpack](https://www.zcfy.cc/article/interview-with-webpack-founder-tobias-koppers)
