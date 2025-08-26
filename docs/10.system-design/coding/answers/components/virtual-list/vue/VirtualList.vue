<template>
  <div class="vl-container" ref="containerRef" :style="{ height: height + 'px' }">
    <div :style="{ height: totalHeight + 'px', position: 'relative' }">
      <div :style="{ transform: `translateY(${offsetY}px)` }">
        <div v-for="i in indices" :key="i" class="vl-item">{{ render(i) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  const props = defineProps<{ count: number; itemHeight: number; height: number; renderItem?: (i:number)=>string }>()
  const containerRef = ref<HTMLElement|null>(null)
  const scrollTop = ref(0)
  const totalHeight = computed(()=> props.count * props.itemHeight)
  const visibleCount = computed(()=> Math.ceil(props.height / props.itemHeight) + 2)
  const start = computed(()=> Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - 1))
  const end = computed(()=> Math.min(props.count - 1, start.value + visibleCount.value))
  const offsetY = computed(()=> start.value * props.itemHeight)
  const indices = computed(()=> { const arr:number[]=[]; for(let i=start.value;i<=end.value;i++) arr.push(i); return arr })
  const render = (i:number)=> (props.renderItem? props.renderItem(i) : `行 ${i+1}`)
  function onScroll(){ if (containerRef.value) scrollTop.value = containerRef.value.scrollTop }
  onMounted(()=>{ containerRef.value?.addEventListener('scroll', onScroll, { passive:true }) })
  onUnmounted(()=>{ containerRef.value?.removeEventListener('scroll', onScroll) })
</script>

<style scoped>
  .vl-container{overflow:auto;border:1px solid #d9d9d9;border-radius:6px}
  .vl-item{height:30px;display:flex;align-items:center;padding:0 8px;border-bottom:1px solid #f0f0f0}
</style>
