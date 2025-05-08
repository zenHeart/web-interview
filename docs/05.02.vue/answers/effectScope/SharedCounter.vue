<template>
  <div class="shared-counter">
    <div class="counter-display">
      共享计数: <strong>{{ counter.count }}</strong>
    </div>
    
    <div class="counter-actions">
      <button @click="counter.increment">+1</button>
      <button @click="counter.decrement">-1</button>
    </div>
    
    <button class="remove-btn" @click="$emit('remove')">
      移除组件
    </button>
  </div>
</template>

<script setup>
import { useSharedCounter } from './useSharedState'

const props = defineProps({
  index: {
    type: Number,
    default: 0
  }
})

defineEmits(['remove'])

// 使用共享计数器状态
const counter = useSharedCounter()
</script>

<style scoped>
.shared-counter {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.counter-display {
  font-size: 16px;
  text-align: center;
}

.counter-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.counter-actions button {
  width: 40px;
  height: 30px;
}

.remove-btn {
  margin-top: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
  border-radius: 4px;
}

.remove-btn:hover {
  background-color: #ff5252;
}
</style>
