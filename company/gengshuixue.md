# 跟谁学✅

- **业务领域**: 在线直播大班课、K12/成人职业教育、考研与大学生辅导、智能互动教学系统
- **技术栈**: Vue 3、React、TypeScript、Node.js、WebRTC、Canvas（互动白板）、Electron
- **团队规模**: 前端团队约200+人
- **办公地点**: 北京（总部）、武汉（光谷研发中心）、郑州、杭州、成都
- **公司性质**: 在线教育上市公司（美股上市，现更名高途集团）
- **薪资水平**: 校招16-28万，社招22-50万

## 岗位类型

- **互动教学前端开发工程师** - 负责大班直播互动答题器、多方音视频连麦、实时电子白板研发
- **Web 业务前端开发工程师** - 负责高途课堂 PC/移动官网、学习中心、课件播放器与营销中台
- **跨端桌面应用工程师** - 负责基于 Electron 研发教师端/助教端教学上课客户端

## 技术特色

- **实时多人协同教学白板**: 结合 Canvas/SVG 与 WebSocket，支持教师与多名学生实时画笔、几何图形同步与激光笔互动。
- **高可用互动课堂与弱网保障**: 面向百万学员并发听课，沉淀动态多 CDN 线路测速优选、音视频卡顿监测与课件离线预热机制。
- **复杂递归树形课件与题型渲染**: 自研高度可配置的富交互题型组件库与层级化课程目录组件。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **在线笔试（选择题 + 编程题）** → **技术一面** → **技术二面** → **HR面试**
   - 总流程约3-4周
   - 难度: 3.5/5星
   - 通过率: 约15%

### 社会招聘

1. **简历筛选** → **技术一面（计算机基础与代码手写，有时由后端全栈技术面试官主导）** → **技术二面（业务项目与架构设计）** → **技术三面/总监面（架构演进、性能优化与综合素质）** → **HR面试**
   - 总流程约2周
   - 难度: 4/5星
   - 通过率: 约12%

## 题库

### P0 必考知识点

#### Git 底层对象模型与 `git rebase` vs `git merge` 的深层原理？ {#p0-git-rebase-principle}

<Answer>

### 核心结论

- **Git 底层对象模型**：Git 本质是一个基于内容寻址的文件系统（Content-addressable KV Store）。主要包含四种核心对象：
  1. **Blob**：存储文件纯内容，计算 SHA-1 作为哈希名；
  2. **Tree**：对应目录，记录目录下的 Blob 与子 Tree 的文件名、权限与哈希指针；
  3. **Commit**：包含指向顶层 Tree 的指针、Parent 提交哈希、作者与提交信息；
  4. **Tag**：指向特定 Commit 的带注解标签。
- **Rebase vs Merge 核心差异**：
  - **`git merge`**：保留所有提交的历史顺序，产生一个包含两个父节点的**合并提交（Merge Commit）**，历史真实但分支线交错繁杂。
  - **`git rebase`（变基）**：以目标分支最新提交为基底，将当前分支的独有 commit 依次作为 patch “在基底上重放（Replay）”，生成全新 Commit SHA，保持线性的提交历史，但会改写历史。

---

### 团队协作黄金准则

**绝不在公共共享分支（如 main/dev）上执行 rebase**。只能在个人的 feature 分支向主分支对齐时使用 rebase，避免他人基于已被重写的 commit 继续开发引发冲突灾难。

---

### 面试官视角

面试官考察候选人对工程协作工具的理解是否停留在表面命令，能说出 `.git/objects` 底层哈希指针模型及变基冲突解决机制的候选人具备扎实的工程素养。

</Answer>

#### 寻找数组中首次匹配目标子序列的起始索引（KMP 算法思想）？ {#p0-subsequence-first-index}

<Answer>

### 核心结论

给定主数组 `arr` 和目标子序列 `sub`（如 `arr = [3,2,7,21,9,3,1,5,8,3]`, `sub = [3,1,5]`），寻找首次完全匹配的起始索引。常规双指针滑动窗口的时间复杂度为 $O(N \times M)$；引入 KMP 算法基于前缀表的失配跳跃，可将时间复杂度优化至线性 $O(N + M)$。

---

### 规范双指针实现

```javascript
function findSubsequenceIndex(arr, sub) {
  if (!sub || sub.length === 0) return 0
  if (!arr || arr.length < sub.length) return -1

  const n = arr.length
  const m = sub.length

  for (let i = 0; i <= n - m; i++) {
    let match = true
    for (let j = 0; j < m; j++) {
      if (arr[i + j] !== sub[j]) {
        match = false
        break
      }
    }
    if (match) return i
  }

  return -1
}

// 测试用例
const arr = [3, 2, 7, 21, 9, 3, 1, 5, 8, 3]
const sub = [3, 1, 5]
console.log(findSubsequenceIndex(arr, sub)) // 输出 5
```

---

### 面试官视角

跟谁学面试中注重算法思维，面试官通常先要求候选人写出无 bug 的双指针滑动窗口代码，随后引导探讨当子序列存在大量重复前缀元素时，如何利用 KMP 算法的 `next` 数组实现避免主指针回溯的优化。

</Answer>

### P1 高频知识点

#### 递归树形多级文件夹折叠/展开组件设计？ {#p1-folder-tree-component}

<Answer>

### 核心结论

多级知识点树、课程大纲目录与资源管理系统依赖树形组件（Tree）。实现方案分为**组件递归自嵌套模式（Component Recursion）**与**扁平化数组（Flattened Array + 虚拟滚动）模式**。在大数据量（千级以上节点）下优先采用平铺模式。

---

### 递归组件关键设计

1. **数据模型**：
   ```typescript
   interface TreeNode {
     id: string | number
     title: string
     children?: TreeNode[]
     isExpanded?: boolean
   }
   ```
2. **递归组件核心实现（Vue 3 SFC 模式）**：
   - 组件内部调用自身组件名 `<FolderTree :data="item.children" />`。
   - 维护展开状态集合 `expandedKeys = ref(new Set())`，点击文件夹图标切换状态。
   - 动画效果：使用 CSS `max-height` 或 Transition 容器平滑收展。

---

### 延伸阅读

- [Pro Git 官方文档（深入 Git 内部原理）](https://git-scm.com/book/zh/v2)
- [LeetCode 28. 找出字符串中第一个匹配项的下标](https://leetcode.cn/problems/find-the-index-of-the-first-occurrence-in-a-string/)

</Answer>

## 考察重点速览

- **必考知识点**: Git 底层模型与协作流、数组常用算法、递归与动态规划基础、Vue/React 组件设计。
- **高频面试题**: Git rebase 与 merge 区别、寻找子序列首次索引、多级树形目录折叠展开、Express 中间件机制。
- **编程挑战**: 快速排序与冒泡排序手写、递归树遍历与扁平化转换、二分查找算法。

## 备考建议

**针对性准备策略**
- **复习计算机基础与算法**: 跟谁学技术一面常有全栈/后端工程师交叉评审，非常看重数据结构、算法复杂度与计算机基础。
- **准备工程协作与 Git 技巧**: 熟悉分支管理策略（GitFlow/Trunk-based）、自动化构建与 CI/CD 流程。

**推荐准备资源**
- [高途技术团队官方博客](https://www.gaotu.cn/)
- [LeetCode 算法基础专栏](https://leetcode.cn/)

**差异化准备建议**
- **校招生**: 重点考察算法手写熟练度、Git 常用操作及对技术书籍的学习沉淀。
- **社招生**: 突出在线教育互动直播技术方案、性能调优经验与中后台组件化架构设计。

