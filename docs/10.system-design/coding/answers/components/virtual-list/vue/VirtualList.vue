<template>
  <div class="vl-container" ref="containerRef" :style="{ height: height + 'px' }">
    <div :style="{ height: totalHeight + 'px', position: 'relative' }">
      <div :style="{ transform: `translateY(${offsetY}px)` }">
        <div
          v-for="i in indices"
          :key="i"
          class="vl-item"
          :data-index="i"
          :ref="el => el && observe(el, i)"
        >
          {{ render(i) }}
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup lang="ts">
  import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue'
  
  const props = defineProps<{
    count: number;
    height: number;
    estimatedItemHeight?: number;
    overscanPx?: number;
    renderItem?: (i:number)=>string
  }>()
  
  const estimated = props.estimatedItemHeight ?? 30
  const overscan = props.overscanPx ?? 120

  const containerRef = ref<HTMLElement|null>(null)
  const scrollTop = ref(0)

  // heights cache and version for recompute
  const heights = ref<number[]>(Array.from({ length: props.count }, () => estimated))
  const measureVersion = ref(0)

  // offsets (prefix sum) and totalHeight
  const offsets = computed(() => {
    const arr:number[] = new Array(props.count)
    let acc = 0
    for (let i = 0; i < props.count; i++) {
      arr[i] = acc
      acc += heights.value[i] ?? estimated
    }
    ;(offsets as any).total = acc
    return arr
  }) as unknown as (number[] & { total?: number })

  const totalHeight = computed(() => (offsets as any).total as number)

  function findStartIndex (top:number): number {
    let low = 0, high = props.count - 1
    while (low <= high) {
      const mid = (low + high) >>> 1
      const h = heights.value[mid] ?? estimated
      if (offsets.value[mid] + h < top) low = mid + 1
      else high = mid - 1
    }
    return Math.max(0, Math.min(props.count - 1, low))
  }

  function findEndIndex (bottom:number): number {
    let low = 0, high = props.count - 1
    while (low <= high) {
      const mid = (low + high) >>> 1
      if (offsets.value[mid] <= bottom) low = mid + 1
      else high = mid - 1
    }
    return Math.max(0, Math.min(props.count - 1, low))
  }

  const start = computed(() => findStartIndex(Math.max(0, scrollTop.value - overscan)))
  const end = computed(() => findEndIndex(scrollTop.value + props.height + overscan))
  const offsetY = computed(() => offsets.value[start.value] ?? 0)

  const indices = computed(() => {
    const s = start.value
    const e = Math.min(props.count - 1, Math.max(s, end.value))
    const arr:number[] = []
    for (let i = s; i <= e; i++) arr.push(i)
    return arr
  })

  const render = (i:number) => (props.renderItem ? props.renderItem(i) : `行 ${i + 1}`)

  function onScroll(){ if (containerRef.value) scrollTop.value = containerRef.value.scrollTop }
  onMounted(()=>{ containerRef.value?.addEventListener('scroll', onScroll, { passive:true }) })
  onUnmounted(()=>{ containerRef.value?.removeEventListener('scroll', onScroll) })

  // ResizeObserver for dynamic height
  let ro: ResizeObserver | null = null
  onMounted(() => {
    if (typeof ResizeObserver === 'undefined') return
    ro = new ResizeObserver(entries => {
      let changed = false
      for (const entry of entries) {
        const el = entry.target as HTMLElement
        const idxAttr = el.getAttribute('data-index')
        if (!idxAttr) continue
        const idx = Number(idxAttr)
        const next = Math.ceil(entry.contentRect.height)
        if (next > 0 && heights.value[idx] !== next) {
          heights.value[idx] = next
          changed = true
        }
      }
      if (changed) measureVersion.value++
    })
  })
  onUnmounted(() => { ro?.disconnect(); ro = null })

  function observe (el: HTMLElement, i:number) {
    el.setAttribute('data-index', String(i))
    ro && ro.observe(el)
  }

  // touch measureVersion to recompute offsets when heights change
  watchEffect(() => { void measureVersion.value })
</script>

<style scoped>
  .vl-container{overflow:auto;border:1px solid #d9d9d9;border-radius:6px}
  .vl-item{display:flex;align-items:center;padding:4px 8px;border-bottom:1px solid #f0f0f0}
</style>
