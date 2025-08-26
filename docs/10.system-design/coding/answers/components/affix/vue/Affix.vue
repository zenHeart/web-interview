<template>
  <div class="affix-wrap" ref="wrapRef">
    <div :class="['affix', fixed?'affix-fixed':'']" :style="fixed? style: undefined">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, reactive, ref } from 'vue'
  const props = withDefaults(defineProps<{ offsetTop?: number }>(), { offsetTop: 0 })
  const wrapRef = ref<HTMLElement|null>(null)
  const fixed = ref(false)
  const style = reactive<{ top?: string; left?: string; width?: string }>({})

  function compute(){
    const el = wrapRef.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const shouldFix = rect.top <= props.offsetTop
    if (shouldFix !== fixed.value) fixed.value = shouldFix
    if (shouldFix){
      style.top = `${props.offsetTop}px`
      style.left = `${rect.left + window.scrollX}px`
      style.width = `${rect.width}px`
    }
  }
  function onScroll(){ compute() }
  onMounted(()=>{ compute(); window.addEventListener('scroll', onScroll, { passive:true }); window.addEventListener('resize', onScroll) })
  onUnmounted(()=>{ window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll) })
</script>

<style scoped>
  .affix{display:inline-block}
  .affix-fixed{position:fixed;z-index:1000}
</style>
