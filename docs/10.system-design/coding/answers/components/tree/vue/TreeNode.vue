<template>
  <li
    role="treeitem"
    :aria-expanded="hasChildren ? isExpanded : undefined"
    class="tree-item"
    :style="{ paddingLeft: `${level * 16}px` }"
  >
    <span class="tree-toggle" @click="onToggle">{{ hasChildren ? (isExpanded ? '▾' : '▸') : '·' }}</span>
    <span :class="['tree-title', selectedKey === node.key ? 'is-selected' : '']" @click="onSelect">{{ node.title }}</span>
    <ul v-if="hasChildren && isExpanded" class="tree-level" role="group">
      <TreeNode
        v-for="c in node.children"
        :key="c.key"
        :node="c"
        :level="level + 1"
        v-model:selectedKey="selectedKey"
        :expandedKeys="expandedKeys"
        @toggle="$emit('toggle', $event)"
      />
    </ul>
  </li>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  interface TreeNodeData { key: string; title: string; children?: TreeNodeData[] }
  const props = defineProps<{ node: TreeNodeData; level: number; expandedKeys: Set<string> }>()
  const emit = defineEmits<{ (e:'toggle', key: string): void }>()
  const selectedKey = defineModel<string | undefined>('selectedKey')

  const hasChildren = computed(() => !!(props.node.children && props.node.children.length))
  const isExpanded = computed(() => props.expandedKeys.has(props.node.key))

  function onToggle(){ if (hasChildren.value) emit('toggle', props.node.key) }
  function onSelect(){ selectedKey.value = props.node.key }
</script>

<style scoped>
</style>
