<template>
  <div class="app-container">
    <h1>Vue 3 effectScope 示例</h1>
    <div class="tab-container">
      <div class="tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.name }}
        </button>
      </div>
      
      <div class="tab-content">
        <component :is="currentTabComponent"></component>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, markRaw } from 'vue'
import SharedState from './SharedState.vue'

// 标签页定义
const tabs = [
  { id: 'shared', name: '共享状态', component: markRaw(SharedState) },
]

// 当前激活的标签
const activeTab = ref('shared')

// 当前要显示的组件
const currentTabComponent = computed(() => {
  const tab = tabs.find(t => t.id === activeTab.value)
  return tab ? tab.component : null
})
</script>

<style>
.app-container {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.tab-container {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.tabs {
  display: flex;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.tabs button {
  padding: 10px 15px;
  background: none;
  border: none;
  cursor: pointer;
}

.tabs button.active {
  background-color: #fff;
  border-bottom: 2px solid #42b883;
  font-weight: bold;
}

.tab-content {
  padding: 20px;
}
</style>
