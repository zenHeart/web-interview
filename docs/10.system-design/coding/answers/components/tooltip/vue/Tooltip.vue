<template>
  <span class="tip-trigger" ref="triggerRef" tabindex="0" @mouseenter="open=true" @mouseleave="open=false" @focus="open=true" @blur="open=false" aria-describedby="tooltip">
    <slot>悬停查看</slot>
    <div v-if="open" class="tooltip" ref="tipRef" :style="style" role="tooltip" id="tooltip">{{ title }}</div>
  </span>
</template>

<script setup lang="ts">
  import { reactive, ref, watch } from 'vue'
  const props = defineProps<{ title: string }>()
  const open = ref(false); const triggerRef = ref<HTMLElement>(); const tipRef = ref<HTMLElement>()
  const style = reactive<{ top?: string; left?: string }>({})
  function place(){
    const t=triggerRef.value, p=tipRef.value; if(!t||!p) return
    const tr=t.getBoundingClientRect(), pr=p.getBoundingClientRect();
    const top = tr.bottom + 8 + window.scrollY
    let left = tr.left + tr.width/2 - pr.width/2 + window.scrollX
    const vw = window.innerWidth
    if (left + pr.width > vw) left = vw - pr.width - 8
    if (left < 0) left = 8
    style.top = `${top}px`; style.left = `${left}px`
  }
  watch(open, v=>{ if (v) setTimeout(place) })
</script>

<style scoped>
  .tip-trigger{position:relative}
  .tooltip{position:absolute;background:#000;color:#fff;padding:4px 8px;border-radius:4px;font-size:12px;z-index:1000}
</style>
