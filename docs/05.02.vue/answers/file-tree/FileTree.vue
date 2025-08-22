<template>
  <div class="file-tree">
    <div class="tree-header">
      <h3>📁 项目文件</h3>
      <button @click="resetData" class="reset-btn">重置</button>
    </div>
    
    <div class="tree-content">
      <TreeNode
        v-for="(node, index) in treeData"
        :key="node.id"
        :node="node"
        :level="0"
        @move="handleMove"
        @expand="handleExpand"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import TreeNode from './TreeNode.vue'

// 初始数据
const initialData = [
  {
    id: '1',
    name: 'src',
    type: 'folder',
    expanded: true,
    children: [
      {
        id: '2',
        name: 'components',
        type: 'folder',
        expanded: true,
        children: [
          { id: '3', name: 'Header.vue', type: 'file' },
          { id: '4', name: 'Footer.vue', type: 'file' },
          { id: '5', name: 'Sidebar.vue', type: 'file' }
        ]
      },
      {
        id: '6',
        name: 'views',
        type: 'folder',
        expanded: false,
        children: [
          { id: '7', name: 'Home.vue', type: 'file' },
          { id: '8', name: 'About.vue', type: 'file' }
        ]
      },
      { id: '9', name: 'App.vue', type: 'file' },
      { id: '10', name: 'main.js', type: 'file' }
    ]
  },
  {
    id: '11',
    name: 'public',
    type: 'folder',
    expanded: true,
    children: [
      { id: '12', name: 'index.html', type: 'file' },
      { id: '13', name: 'favicon.ico', type: 'file' }
    ]
  },
  { id: '14', name: 'package.json', type: 'file' },
  { id: '15', name: 'README.md', type: 'file' }
]

// 响应式数据
const treeData = ref(JSON.parse(JSON.stringify(initialData)))

// 重置数据
const resetData = () => {
  treeData.value = JSON.parse(JSON.stringify(initialData))
}

// 处理展开/收起
const handleExpand = (nodeId) => {
  const findAndToggle = (nodes) => {
    for (const node of nodes) {
      if (node.id === nodeId) {
        node.expanded = !node.expanded
        return true
      }
      if (node.children && findAndToggle(node.children)) {
        return true
      }
    }
    return false
  }
  
  findAndToggle(treeData.value)
}

// 处理移动
const handleMove = ({ dragNodeId, targetNodeId, position }) => {
  console.log('移动操作:', { dragNodeId, targetNodeId, position })
  
  // 查找拖拽节点和目标节点
  let dragNode = null
  let targetNode = null
  let dragParent = null
  let dragIndex = -1
  
  const findNodes = (nodes, parent = null) => {
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      
      if (node.id === dragNodeId) {
        dragNode = node
        dragParent = parent
        dragIndex = i
      }
      
      if (node.id === targetNodeId) {
        targetNode = node
      }
      
      if (node.children) {
        findNodes(node.children, node)
      }
    }
  }
  
  findNodes(treeData.value)
  
  if (!dragNode || !targetNode) return
  
  // 防止将文件夹拖入自己的子目录
  if (isDescendant(dragNode, targetNode)) {
    console.warn('不能将文件夹拖入自己的子目录')
    return
  }
  
  // 从原位置移除
  if (dragParent) {
    dragParent.children.splice(dragIndex, 1)
  } else {
    treeData.value.splice(dragIndex, 1)
  }
  
  // 插入到新位置
  if (position === 'inside' && targetNode.type === 'folder') {
    // 插入到文件夹内部
    if (!targetNode.children) {
      targetNode.children = []
    }
    targetNode.children.push(dragNode)
    targetNode.expanded = true // 自动展开目标文件夹
  } else {
    // 插入到目标节点前/后
    const findTargetParentAndInsert = (nodes, parent = null) => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === targetNodeId) {
          const insertIndex = position === 'before' ? i : i + 1
          nodes.splice(insertIndex, 0, dragNode)
          return true
        }
        
        if (nodes[i].children) {
          if (findTargetParentAndInsert(nodes[i].children, nodes[i])) {
            return true
          }
        }
      }
      return false
    }
    
    findTargetParentAndInsert(treeData.value)
  }
}

// 检查是否为后代节点
const isDescendant = (ancestor, node) => {
  if (!ancestor.children) return false
  
  for (const child of ancestor.children) {
    if (child.id === node.id) return true
    if (isDescendant(child, node)) return true
  }
  
  return false
}
</script>

<style scoped>
.file-tree {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
}

.tree-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e0e0e0;
}

.tree-header h3 {
  margin: 0;
  color: #333;
  font-size: 16px;
}

.reset-btn {
  padding: 6px 12px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s;
}

.reset-btn:hover {
  background: #e0e0e0;
}

.tree-content {
  line-height: 1.4;
}
</style>
