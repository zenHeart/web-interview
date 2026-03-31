# web-interview 仓库学习笔记

> 学习时间：2026-04-01
> 仓库：zenHeart/web-interview
> 站点：https://blog.zenheart.site/web-interview/

## 一、项目概述

**前端面试全攻略** 是一个基于 Docusaurus v3.9.1 构建的前端面试题库网站。

### 核心特点
- 按知识领域系统整理，配有优先级（P0/P1/P2）
- 每道题配有详细解析、延伸阅读及相关题目
- 支持在线协作编辑（社区共建）
- 最近更新：2025/12/30

---

## 二、知识领域总览

### 2.1 JavaScript（核心）
| 子领域 | 题目数 | 关键主题 |
|--------|--------|---------|
| type-value | 10 | 类型系统、类型转换 |
| operator-expression | 5 | 运算符、表达式 |
| statement-declaration | 3 | let/const/var 声明 |
| object | 8 | 原型链、对象属性 |
| string-regexp | 8 | 字符串操作、正则 |
| collections | 9 | 数组方法 |
| function | 11 | 执行上下文、闭包 |
| class | 5 | 类与继承 |
| async | 4 | 异步编程 |
| module | 6 | ESM 模块 |
| engines | 9 | JS 引擎原理 |
| coding | 31 | 语法题、工具函数、业务代码 |

### 2.2 HTML/CSS
| 领域 | 题目数 | 关键主题 |
|------|--------|---------|
| HTML concept | 4 | DOCTYPE |
| HTML attributes | 6 | 全局属性 |
| HTML ui-event | 7 | 事件机制 |
| HTML accessibility | 6 | 无障碍访问 |
| HTML webapi | 57 | BOM/DOM/通信/存储/媒体设备 |
| CSS concept | 9 | 盒模型 |
| CSS selector | 6 | 选择器类型 |
| CSS layout | 8 | 布局系统 |
| CSS animation | 4 | 动画与过渡 |
| CSS modern | 5 | CSS 变量 |
| CSS engineering | 6 | 工程化实践 |

### 2.3 框架（React/Vue/RN/小程序/Nuxt）
- **React**：15+18+18+2+12+2+6+4+1 = 78题（概念/组件/Hooks/原理/工具链）
- **Vue**：8+6+19+8+5+8+4 = 58题（核心概念/响应式/组件/指令/API/工具链）
- **React Native**：9+26+5+4+6+7 = 57题（架构/引擎/认证/性能/安全）
- **小程序**：10+6+4+10+8 = 38题
- **Nuxt**：3+3+3+3+3+3 = 18题

### 2.4 Node.js
- 核心概念（7）、性能安全（3）
- API：module(8)、fs(7)、net(6)、process(6)
- 工具链：package-manager(12)、http-client(6)
- 服务端：framework(3)、database(3)、deployment(1)

### 2.5 前端工程化
- 概念（5）、Lint与测试（7）
- Git（9）、CI/CD（3）
- 安全（7）、调试（8）
- 编译打包：Webpack(18)、Babel(3)、Vite(3)、其他(2)
- 性能优化：浏览器原理(10)、指标概念(10)、加载优化(4)、渲染优化(3)、媒体优化(3)

### 2.6 网络
- OSI七层模型、DNS(5)、MAC/IP(8)
- UDP/TCP(10)、HTTP基础(12)、HTTP头部(9)
- HTTP缓存(10)、HTTP版本对比(11)、CORS(8)
- CDN(5)、WebSocket(2)

### 2.7 算法与数据结构
- 复杂度分析、数组(9)、字符串(7)、哈希表(5)
- 栈队列(5)、链表(10)、树(4)
- 图(4)、回溯(6)、动态规划(6)
- 排序、搜索(2)、编码(3)、其他(3)

### 2.8 其他领域
- **TypeScript**：核心类型(10)、高级类型(7)、声明(6)、配置(5)
- **操作系统**：inode(7)
- **系统设计**：方法论(10)、CDN/LB(12)、幂等性(10)、API设计(11)、实时性(10)
- **编程范式**：OOP(1)、函数式(11)
- **面试软技能**：冲突解决(13)

### 2.9 大厂面试题
涵盖公司：Accenture、Baidu、ChinaSoft、斗鱼、纷享办公、恒信银行、华为、科大讯飞、京东、金山软件、联想、绿云软件、MiniEye、木仓科技、平安、字节、去哪儿、人人网、神策数据、顺丰、有赞、腾讯、途虎、小米、纵享云、Zoom 等

---

## 三、贡献指南

### 3.1 目录结构
```
contributors/          # 贡献者指南
  summary/            # 项目说明
  workflow/           # 工作流
  interview/          # 什么是面试
  good_interview_question/  # 关于面试题
  resume/             # 关于简历
  interviee-flow./    # 如何面试候选人
  template/           # 模板
    company/
    question/
    topic/
docs/                 # 题库文档
  js/
  html/
  css/
  react/
  vue/
  nodejs/
  ...
company/              # 公司面试题
```

### 3.2 内容规范
- 题目按优先级分类：P0（必须掌握）、P1（重要）、P2（了解）
- 每道题包含：问题、答案解析、延伸阅读、相关题目
- 答案模板标准化

### 3.3 待办事项（产品里程碑）
**MVP 第一阶段：核心结构与基础功能**
- [x] 规则制定（题目收录标准、答案模版标准）
- [ ] 目录结构与文件命名优化
- [ ] 内容组织优化

**MVP 第二阶段：用户体验与文档**
- [ ] 用户体验改进
- [ ] 文档完善

---

## 四、技术栈

- **框架**：Docusaurus v3.9.1
- **部署**：GitHub Pages
- **域名**：blog.zenheart.site
- **构建工具**：Webpack（部分）
- **包管理**：Node.js

---

## 五、学习建议

1. **按优先级学习**：先掌握 P0 级别题目，再扩展 P1，了解 P2
2. **按领域深耕**：选择核心领域（JS/CSS/网络）深入，再扩展到框架
3. **注重原理**：理解底层原理比记忆答案更重要
4. **动手实践**：coding 题目要实际写代码验证
5. **关联学习**：注意题目之间的关联，形成知识网络

---

## 六、相关链接

- 站点：https://blog.zenheart.site/web-interview/
- GitHub：https://github.com/zenHeart/web-interview
- 公司面试题：/company/
- 贡献指南：/contributors/
