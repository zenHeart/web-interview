<template>
  <>
    <button class="pop-trigger" ref="triggerRef" @click="open=!open" :aria-expanded="open"><slot>打开 Popover</slot></button>
    <div v-if="open" class="popover" ref="popRef" :style="style" role="dialog" aria-modal="false">{{ content }}</div>
  </>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
  const props = withDefaults(defineProps<{ content: string; placement?: 'top'|'bottom'|'left'|'right' }>(), { placement: 'bottom' })
  const open = ref(false)
  const triggerRef = ref<HTMLElement>()
  const popRef = ref<HTMLElement>()
  const style = reactive<{ top?: string; left?: string }>({})

  function compute(){
    const t = triggerRef.value, p = popRef.value
    if (!t || !p) return
    const tr = t.getBoundingClientRect(), pr = p.getBoundingClientRect()
    let top=0, left=0
    if (props.placement==='bottom'){ top = tr.bottom + 8; left = tr.left + tr.width/2 - pr.width/2 }
    if (props.placement==='top'){ top = tr.top - pr.height - 8; left = tr.left + tr.width/2 - pr.width/2 }
    if (props.placement==='left'){ top = tr.top + tr.height/2 - pr.height/2; left = tr.left - pr.width - 8 }
    if (props.placement==='right'){ top = tr.top + tr.height/2 - pr.height/2; left = tr.right + 8 }
    const vw = window.innerWidth, vh = window.innerHeight
    if (top + pr.height > vh && props.placement==='bottom') top = tr.top - pr.height - 8
    if (top < 0 && props.placement==='top') top = tr.bottom + 8
    if (left + pr.width > vw) left = vw - pr.width - 8
    if (left < 0) left = 8
    style.top = `${top + window.scrollY}px`
    style.left = `${left + window.scrollX}px`
  }

  function onScroll(){ if (open.value) compute() }
  onMounted(()=>{ window.addEventListener('scroll', onScroll, { passive:true }); window.addEventListener('resize', onScroll) })
  onUnmounted(()=>{ window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) })
  watch(open, v=>{ if (v) setTimeout(compute) })
</script>

<style scoped>
  .pop-trigger{padding:6px 12px;border:1px solid #d9d9d9;border-radius:6px;background:#fff;cursor:pointer}
  .popover{position:absolute;background:#fff;border:1px solid #d9d9d9;border-radius:6px;box-shadow:0 6px 16px rgba(0,0,0,.08);padding:8px 12px;z-index:1000}
</style>
