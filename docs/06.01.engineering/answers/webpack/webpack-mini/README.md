# Webpack Mini

这是一个简化版的 Webpack 实现，用于演示 Webpack 的核心原理。

## 核心概念演示

1. **模块依赖图生成**
   - 从入口文件开始解析
   - 使用 AST 分析依赖关系
   - 构建模块依赖图

2. **Chunk 生成**
   - 基于入口文件创建初始 chunk
   - 动态导入处理
   - Chunk 分割策略

3. **Loader 和 Plugin 机制**
   - Loader 链式处理
   - Plugin 钩子系统
   - 自定义 loader 和 plugin 示例

4. **资源生成**
   - Chunk 到 Assets 的转换
   - 模板渲染
   - 文件输出

## 项目结构

```
src/
  ├── index.js          # 主入口文件
  ├── Compiler.js       # 编译器核心类
  ├── Module.js         # 模块类
  ├── Chunk.js          # Chunk 类
  ├── Parser.js         # 解析器
  ├── Template.js       # 模板生成器
  ├── loaders/          # 示例 loader
  └── plugins/          # 示例 plugin
```

## 使用方法

1. 安装依赖：
```bash
npm install
```

2. 运行构建：
```bash
npm run build
```

## 示例说明

这个示例将展示一个简单的项目构建过程，包括：
- 入口文件解析
- 依赖收集
- 模块转换
- 代码生成
- 资源输出 