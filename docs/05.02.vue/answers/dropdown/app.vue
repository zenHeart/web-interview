<template>
  <div class="app">
    <h1>Vue 点击外部关闭下拉菜单示例</h1>
    
    <div class="demo-container">
      <h3>基础下拉菜单</h3>
      <ClickOutside />
    </div>
    
    <div class="demo-container">
      <h3>多个下拉菜单</h3>
      <div class="flex-container">
        <ClickOutside title="菜单 1" />
        <ClickOutside title="菜单 2" />
        <ClickOutside title="菜单 3" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ClickOutside from './ClickOutside.vue'
</script>

<style scoped>
.app {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.demo-container {
  margin: 30px 0;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.demo-container h3 {
  margin-top: 0;
  color: #333;
}

.flex-container {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
</style>
