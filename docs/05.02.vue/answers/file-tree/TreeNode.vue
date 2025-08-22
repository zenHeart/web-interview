<template>
  <div
    :class="[
      'tree-node',
      {
        'drag-over-before': dragPosition === 'before',
        'drag-over-after': dragPosition === 'after',
        'drag-over-inside': dragPosition === 'inside',
        'dragging': isDragging
      }
    ]"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
    @dragleave="handleDragLeave"
  >
    <!-- 节点内容 -->
    <div
      :class="['node-content', { 'is-folder': node.type === 'folder' }]"
      :style="{ paddingLeft: level * 20 + 'px' }"
      draggable="true"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
    >
      <!-- 展开/收起箭头 -->
      <span
        v-if="node.type === 'folder'"
        :class="['expand-arrow', { expanded: node.expanded }]"
        @click.stop="handleExpand"
      >
        ▶
      </span>
      <span v-else class="expand-placeholder"></span>
      
      <!-- 文件/文件夹图标 -->
      <span class="node-icon">
        {{ getIcon() }}
      </span>
      
      <!-- 文件/文件夹名称 -->
      <span class="node-name">{{ node.name }}</span>
    </div>
    
    <!-- 子节点 -->
    <template v-if="node.type === 'folder' && node.expanded && node.children">
      <TreeNode
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :level="level + 1"
        @move="$emit('move', $event)"
        @expand="$emit('expand', $event)"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  node: {
    type: Object,
    required: true
  },
  level: {
    type: Number,
    default: 0
  }
})

// Emits
const emit = defineEmits(['move', 'expand'])

// 状态
const isDragging = ref(false)
const dragPosition = ref('')

// 获取图标
const getIcon = () => {
  if (props.node.type === 'folder') {
    return props.node.expanded ? '📂' : '📁'
  }
  
  const ext = props.node.name.split('.').pop()?.toLowerCase()
  
  switch (ext) {
    case 'vue':
      return '💚'
    case 'js':
    case 'mjs':
      return '💛'
    case 'ts':
      return '🔷'
    case 'html':
      return '🟠'
    case 'css':
    case 'scss':
    case 'sass':
      return '🎨'
    case 'json':
      return '📄'
    case 'md':
      return '📝'
    case 'ico':
      return '🖼️'
    default:
      return '📄'
  }
}

// 处理展开/收起
const handleExpand = () => {
  if (props.node.type === 'folder') {
    emit('expand', props.node.id)
  }
}

// 拖拽开始
const handleDragStart = (e) => {
  isDragging.value = true
  e.dataTransfer.setData('text/plain', props.node.id)
  e.dataTransfer.effectAllowed = 'move'
  
  // 设置拖拽时的样式
  e.target.style.opacity = '0.5'
}

// 拖拽结束
const handleDragEnd = (e) => {
  isDragging.value = false
  e.target.style.opacity = '1'
  dragPosition.value = ''
}

// 拖拽悬停
const handleDragOver = (e) => {
  e.preventDefault()
  e.dataTransfer.dropEffect = 'move'
  
  const dragNodeId = e.dataTransfer.getData('text/plain')
  if (dragNodeId === props.node.id) return
  
  // 计算拖拽位置
  const rect = e.currentTarget.getBoundingClientRect()
  const nodeContentRect = e.currentTarget.querySelector('.node-content').getBoundingClientRect()
  const y = e.clientY - nodeContentRect.top
  const height = nodeContentRect.height
  
  if (props.node.type === 'folder') {
    // 文件夹可以放入内部
    if (y < height * 0.25) {
      dragPosition.value = 'before'
    } else if (y > height * 0.75) {
      dragPosition.value = 'after'
    } else {
      dragPosition.value = 'inside'
    }
  } else {
    // 文件只能放在前后
    if (y < height * 0.5) {
      dragPosition.value = 'before'
    } else {
      dragPosition.value = 'after'
    }
  }
}

// 拖拽离开
const handleDragLeave = (e) => {
  // 只有当鼠标真正离开当前元素时才清除
  if (!e.currentTarget.contains(e.relatedTarget)) {
    dragPosition.value = ''
  }
}

// 放置
const handleDrop = (e) => {
  e.preventDefault()
  
  const dragNodeId = e.dataTransfer.getData('text/plain')
  if (dragNodeId === props.node.id) return
  
  emit('move', {
    dragNodeId,
    targetNodeId: props.node.id,
    position: dragPosition.value
  })
  
  dragPosition.value = ''
}
</script>

<style scoped>
.tree-node {
  position: relative;
  user-select: none;
}

.node-content {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
  position: relative;
}

.node-content:hover {
  background-color: #f5f5f5;
}

.node-content.is-folder {
  font-weight: 500;
}

.expand-arrow {
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s;
  font-size: 10px;
  margin-right: 4px;
  color: #666;
}

.expand-arrow.expanded {
  transform: rotate(90deg);
}

.expand-placeholder {
  width: 16px;
  margin-right: 4px;
}

.node-icon {
  margin-right: 8px;
  font-size: 14px;
}

.node-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 拖拽状态样式 */
.dragging .node-content {
  opacity: 0.5;
}

/* 拖拽悬停指示器 */
.drag-over-before::before,
.drag-over-after::after,
.drag-over-inside .node-content {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #007acc;
  border-radius: 1px;
  z-index: 10;
}

.drag-over-before::before {
  top: 0;
}

.drag-over-after::after {
  bottom: 0;
}

.drag-over-inside .node-content {
  background-color: rgba(0, 122, 204, 0.1);
  border: 1px dashed #007acc;
}

.drag-over-inside .node-content::before,
.drag-over-inside .node-content::after {
  display: none;
}

/* 拖拽时的动画效果 */
.tree-node {
  transition: all 0.2s ease;
}

@keyframes dragHighlight {
  0% { background-color: transparent; }
  50% { background-color: rgba(0, 122, 204, 0.1); }
  100% { background-color: transparent; }
}

.drag-over-inside {
  animation: dragHighlight 1s ease-in-out infinite;
}
</style>
