<template>
  <div class="shared-state">
    <h2>共享状态与 effectScope</h2>
    
    <div class="description">
      <p>使用 effectScope 在多个组件之间共享状态，当所有组件卸载后，状态会自动清理。</p>
    </div>
    
    <div class="components-container">
      <div v-for="(comp, index) in activeComponents" :key="index" class="component-card">
        <h4>组件 {{ index + 1 }}</h4>
        <SharedCounter :index="index + 1" @remove="removeComponent(index)" />
      </div>
      
      <button 
        class="add-component-btn" 
        @click="addComponent"
        v-if="activeComponents.length < 5"
      >
        添加组件
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SharedCounter from './SharedCounter.vue'

const activeComponents = ref([])

function addComponent() {
  if (activeComponents.value.length < 5) {
    activeComponents.value.push({})
  }
}

function removeComponent(index) {
  activeComponents.value.splice(index, 1)
}

// 默认添加一个组件
addComponent()
</script>

<style scoped>
.shared-state {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.description {
  background-color: #f0f7ff;
  padding: 10px 15px;
  border-radius: 4px;
  border-left: 4px solid #42b883;
}

.components-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.component-card {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
  width: 200px;
}

.component-card h4 {
  margin-top: 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  margin-bottom: 10px;
}

.add-component-btn {
  height: 150px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border: 2px dashed #ddd;
  cursor: pointer;
  border-radius: 4px;
}

.add-component-btn:hover {
  background-color: #eee;
  border-color: #ccc;
}
</style>
