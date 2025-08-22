<template>
  <div class="dropdown-container" v-click-outside="closeDropdown">
    <button 
      class="dropdown-trigger"
      :class="{ active: isOpen }"
      @click="toggleDropdown"
    >
      {{ title || '下拉菜单' }}
      <span class="arrow" :class="{ open: isOpen }">▼</span>
    </button>
    
    <transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu">
        <div class="dropdown-item" @click="handleItemClick('选项 1')">
          📄 选项 1
        </div>
        <div class="dropdown-item" @click="handleItemClick('选项 2')">
          📁 选项 2
        </div>
        <div class="dropdown-item" @click="handleItemClick('选项 3')">
          ⚙️ 选项 3
        </div>
        <div class="dropdown-divider"></div>
        <div class="dropdown-item danger" @click="handleItemClick('删除')">
          🗑️ 删除
        </div>
      </div>
    </transition>
    
    <div v-if="selectedItem" class="status">
      已选择: {{ selectedItem }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props
const props = defineProps({
  title: {
    type: String,
    default: '下拉菜单'
  }
})

// 响应式数据
const isOpen = ref(false)
const selectedItem = ref('')

// 方法
const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleItemClick = (item) => {
  selectedItem.value = item
  closeDropdown()
}

// 自定义指令：点击外部关闭
const vClickOutside = {
  mounted(el, binding) {
    const handleClickOutside = (event) => {
      // 检查点击的目标是否在元素内部
      if (!el.contains(event.target)) {
        // 执行传入的回调函数
        binding.value()
      }
    }
    
    // 添加全局点击事件监听器
    document.addEventListener('click', handleClickOutside)
    
    // 保存处理函数的引用，以便后续移除
    el._clickOutsideHandler = handleClickOutside
  },
  
  unmounted(el) {
    // 移除事件监听器，防止内存泄漏
    if (el._clickOutsideHandler) {
      document.removeEventListener('click', el._clickOutsideHandler)
      delete el._clickOutsideHandler
    }
  }
}
</script>

<style scoped>
.dropdown-container {
  position: relative;
  display: inline-block;
  margin: 10px;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: all 0.2s;
  min-width: 120px;
  justify-content: space-between;
}

.dropdown-trigger:hover {
  border-color: #9ca3af;
  background: #f9fafb;
}

.dropdown-trigger.active {
  border-color: #3b82f6;
  box-shadow: 0 0 0 1px #3b82f6;
}

.arrow {
  transition: transform 0.2s;
  font-size: 12px;
  color: #6b7280;
}

.arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: #ffffff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;
}

.dropdown-item {
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-item.danger {
  color: #dc2626;
}

.dropdown-item.danger:hover {
  background-color: #fef2f2;
}

.dropdown-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 4px 0;
}

.status {
  margin-top: 8px;
  padding: 8px 12px;
  background: #f0f9ff;
  color: #0369a1;
  border-radius: 4px;
  font-size: 12px;
  text-align: center;
}

/* 动画效果 */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
