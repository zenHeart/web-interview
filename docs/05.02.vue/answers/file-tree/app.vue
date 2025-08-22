<template>
  <div class="app">
    <h1>Vue 文件夹树组件（支持拖拽排序）</h1>
    
    <div class="demo-container">
      <div class="instructions">
        <h3>使用说明：</h3>
        <ul>
          <li>🖱️ 点击文件夹图标展开/收起</li>
          <li>🎯 拖拽文件/文件夹进行排序</li>
          <li>📁 可以将文件拖入文件夹中</li>
          <li>⚠️ 不能将文件夹拖入自己的子目录</li>
        </ul>
      </div>
      
      <div class="tree-container">
        <FileTree />
      </div>
    </div>
  </div>
</template>

<script setup>
import FileTree from './FileTree.vue'
</script>

<style scoped>
.app {
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 800px;
  margin: 0 auto;
}

.demo-container {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.instructions {
  margin-bottom: 20px;
  padding: 16px;
  background: #e3f2fd;
  border-radius: 8px;
  border-left: 4px solid #2196f3;
}

.instructions h3 {
  margin: 0 0 12px 0;
  color: #1976d2;
  font-size: 16px;
}

.instructions ul {
  margin: 0;
  padding-left: 20px;
  color: #424242;
}

.instructions li {
  margin: 8px 0;
  font-size: 14px;
}

.tree-container {
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}
</style>
