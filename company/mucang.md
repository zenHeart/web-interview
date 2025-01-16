# 木仓科技

## 面试题

1. 聊一下最近的项目
2. 说一下最近项目的难点
3. 正则,博客富文本提取 a 标签
    1. 提取 a 标签内容区块
    2. 提取包含属性的 a 标签区块
4. 现在有一个地图模块,显示行车路径,输入为行车轨迹的离散点(假设为最近 2 小时行驶的经纬度,2 万个点),如何保证在缩放情况下,渲染不崩掉
    1. 如何提取在可视区域的点
    2. 如何确定改用哪些点画轨迹
5. 小程序无限滚动,如何保证渲染正常
    1. setData 有 1MB 数据限制
    2. 滚动渲染触发条件
6. 实现发布订阅机制
7.

## 面试流程

### 社招

1. 1 面 技术面试,问项目相关经验和问题
2. 2 面 主管面试,考察技术范围和岗位匹配度

## 公司概述

### 工作内容

1. 内部针对客户的运营广告宣传页前端,2 人
2. 针对驾考宝典等应用的相关业务,会对接多个平台小程序,快应用等

### 技术架构

1. 内部多采用 ssr 设计的网页版驾考宝典
2. 内部自行设计的模板语言,语法类似 pug
3. 大量使用 node 技术
    1. ssr 渲染
    2. node 管理后台
4. 发布部署使用 Jenkins 实现自动化