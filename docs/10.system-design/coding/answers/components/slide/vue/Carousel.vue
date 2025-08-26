<template>
  <div class="car" :style="{ width: width+'px', height: height+'px' }">
    <div class="car-track" :style="{ width: width*items.length+'px', transform: `translateX(-${index*width}px)` }">
      <div v-for="(it,i) in items" :key="i" class="car-item" :style="{ width: width+'px', height: height+'px' }">{{ it }}</div>
    </div>
    <button class="car-btn car-prev" @click="prev" aria-label="上一张">‹</button>
    <button class="car-btn car-next" @click="next" aria-label="下一张">›</button>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref, withDefaults } from 'vue'
  const props = withDefaults(defineProps<{ items: string[]; autoplay?: boolean; interval?: number; width?: number; height?: number }>(), { autoplay: true, interval: 2000, width: 300, height:160 })
  const index = ref(0)
  let timer: number | null = null
  function prev(){ index.value = (index.value - 1 + props.items.length) % props.items.length }
  function next(){ index.value = (index.value + 1) % props.items.length }
  onMounted(()=>{ if (props.autoplay) timer = window.setInterval(next, props.interval); })
  onUnmounted(()=>{ if (timer) window.clearInterval(timer) })
  const items = props.items
  const width = props.width!
  const height = props.height!
</script>

<style scoped>
  .car{position:relative;overflow:hidden;border:1px solid #d9d9d9;border-radius:8px}
  .car-track{display:flex;transition:transform .3s ease}
  .car-item{flex:0 0 auto;display:flex;align-items:center;justify-content:center;background:#fafafa}
  .car-btn{position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,.4);color:#fff;border:none;border-radius:50%;width:28px;height:28px;cursor:pointer}
  .car-prev{left:8px}.car-next{right:8px}
</style>
