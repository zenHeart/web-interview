<template>
  <div class="tabs">
    <div class="tablist" role="tablist" aria-label="Tabs" @keydown="onKeyDown">
      <button
        v-for="it in items"
        :key="it.key"
        role="tab"
        :aria-selected="it.key===activeKey"
        :tabindex="it.key===activeKey? 0 : -1"
        class="tab"
        :class="it.key===activeKey?'is-active':''"
        @click="activeKey=it.key"
      >{{ it.label }}</button>
    </div>
    <div role="tabpanel" class="tabpanel">
      <component :is="activeItem?.component || 'div'">
        <template v-if="!activeItem?.component">{{ activeItem?.content }}</template>
      </component>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  interface TabItem { key: string; label: string; content?: string; component?: any }
  const props = defineProps<{ items: TabItem[]; defaultActiveKey?: string }>()
  const activeKey = ref(props.defaultActiveKey || props.items[0]?.key)
  const activeItem = computed(()=> props.items.find(i=>i.key===activeKey.value))
  function onKeyDown(e: KeyboardEvent){
    const idx = props.items.findIndex(i=>i.key===activeKey.value)
    if (e.key==='ArrowRight') activeKey.value = props.items[(idx+1)%props.items.length].key
    if (e.key==='ArrowLeft') activeKey.value = props.items[(idx-1+props.items.length)%props.items.length].key
    if (e.key==='Home') activeKey.value = props.items[0].key
    if (e.key==='End') activeKey.value = props.items[props.items.length-1].key
  }
</script>

<style scoped>
  .tablist{display:flex;gap:8px;margin-bottom:8px}
  .tab{padding:6px 12px;border:1px solid #d9d9d9;border-radius:6px;background:#fff;cursor:pointer}
  .tab.is-active{background:#1677ff;color:#fff;border-color:#1677ff}
  .tabpanel{border:1px solid #f0f0f0;border-radius:6px;padding:8px}
</style>
