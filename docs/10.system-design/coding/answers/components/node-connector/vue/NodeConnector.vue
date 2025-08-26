<template>
  <div class="nc-wrap" ref="wrapRef" @mousemove="onMove" @mouseup="onUp">
    <svg class="nc-svg" width="100%" height="100%">
      <line :x1="a.x" :y1="a.y" :x2="b.x" :y2="b.y" stroke="#1677ff" stroke-width="2" />
    </svg>
    <div class="nc-node" :style="{ left: a.x - 16 + 'px', top: a.y - 16 + 'px' }" @mousedown="onDown('a')" role="button" aria-label="节点A" />
    <div class="nc-node" :style="{ left: b.x - 16 + 'px', top: b.y - 16 + 'px' }" @mousedown="onDown('b')" role="button" aria-label="节点B" />
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue'
  const wrapRef = ref<HTMLElement|null>(null)
  const a = reactive({ x: 80, y: 80 })
  const b = reactive({ x: 260, y: 180 })
  const which = ref<'a'|'b'|null>(null)
  function onDown(w:'a'|'b'){ which.value = w }
  function onUp(){ which.value = null }
  function onMove(e: MouseEvent){
    if (!which.value || !wrapRef.value) return
    const rect = wrapRef.value.getBoundingClientRect()
    const p = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    if (which.value==='a'){ a.x = p.x; a.y = p.y } else { b.x = p.x; b.y = p.y }
  }
</script>

<style scoped>
  .nc-wrap{position:relative;width:360px;height:240px;border:1px solid #d9d9d9;border-radius:8px;background:#fafafa}
  .nc-svg{position:absolute;left:0;top:0}
  .nc-node{position:absolute;width:32px;height:32px;border-radius:50%;background:#1677ff;cursor:grab}
</style>
