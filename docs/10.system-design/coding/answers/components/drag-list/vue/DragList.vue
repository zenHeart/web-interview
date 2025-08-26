<template>
  <ul class="dl" role="list" aria-label="可拖拽列表">
    <li
      v-for="(text,i) in items"
      :key="text"
      class="dl-item"
      :class="dragIndex===i?'is-drag':''"
      draggable
      @dragstart="onDragStart(i)"
      @dragover.prevent
      @drop="onDrop(i)"
      :aria-grabbed="dragIndex===i"
    >{{ text }}</li>
  </ul>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const props = defineProps<{ initial: string[] }>()
  const items = ref<string[]>([...props.initial])
  const dragIndex = ref<number|null>(null)
  function onDragStart(i:number){ dragIndex.value = i }
  function onDrop(i:number){ if(dragIndex.value==null||dragIndex.value===i) return; const next=[...items.value]; const [m]=next.splice(dragIndex.value,1); next.splice(i,0,m); items.value=next; dragIndex.value=null }
</script>

<style scoped>
  .dl{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
  .dl-item{border:1px solid #d9d9d9;border-radius:6px;padding:6px 10px;background:#fff;cursor:grab}
  .dl-item.is-drag{opacity:0.6}
</style>
