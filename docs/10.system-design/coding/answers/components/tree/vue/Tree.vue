<template>
  <div class="tree">
    <ul class="tree-level" role="tree">
      <TreeNode
        v-for="n in data"
        :key="n.key"
        :node="n"
        :level="0"
        v-model:selectedKey="selectedKey"
        :expandedKeys="expanded"
        @toggle="onToggle"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import TreeNode from './TreeNode.vue'
  interface TreeNodeData { key: string; title: string; children?: TreeNodeData[] }
  const props = defineProps<{ data: TreeNodeData[]; defaultExpandedKeys?: string[] }>()
  const selectedKey = defineModel<string | undefined>('selectedKey')
  const expanded = ref(new Set(props.defaultExpandedKeys || []))
  function onToggle (key: string){ const s = new Set(expanded.value); s.has(key) ? s.delete(key) : s.add(key); expanded.value = s }
</script>

<style scoped>
  .tree{font-size:14px}
  .tree-level{list-style:none;margin:0;padding:0}
  .tree-item{line-height:24px;display:block}
  .tree-toggle{display:inline-block;width:16px;cursor:pointer;color:#666}
  .tree-title{cursor:pointer}
  .tree-title.is-selected{background:#e6f4ff}
</style>
