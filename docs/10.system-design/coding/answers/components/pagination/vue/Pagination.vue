<template>
  <nav class="pager" role="navigation" aria-label="Pagination">
    <button class="pager-btn" :disabled="current===1" @click="go(current-1)" aria-label="上一页">上一页</button>
    <ul class="pager-list" role="list">
      <li v-for="(p,i) in pages" :key="i" :class="p==='...'?'pager-ellipsis':''">
        <template v-if="p==='...'">…</template>
        <button v-else class="pager-page" :class="p===current?'is-current':''" :aria-current="p===current?'page':undefined" @click="go(Number(p))">{{ p }}</button>
      </li>
    </ul>
    <button class="pager-btn" :disabled="current===totalPages" @click="go(current+1)" aria-label="下一页">下一页</button>
  </nav>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  const props = defineProps<{ total: number; pageSize: number; modelValue: number }>()
  const emit = defineEmits<{ (e:'update:modelValue', v:number): void }>()
  const totalPages = computed(()=> Math.max(1, Math.ceil(props.total / props.pageSize)))
  const current = computed(()=> props.modelValue)
  function go (p:number){ if (p<1 || p>totalPages.value || p===current.value) return; emit('update:modelValue', p) }
  function range (a:number,b:number){ const r:number[]=[]; for(let i=a;i<=b;i++) r.push(i); return r }
  const pages = computed<(number|'...')[]>(()=>{
    if (totalPages.value <= 7) return range(1, totalPages.value)
    const left = Math.max(2, current.value - 1)
    const right = Math.min(totalPages.value - 1, current.value + 1)
    const arr:(number|'...')[] = [1]
    if (left>2) arr.push('...')
    arr.push(...range(left,right))
    if (right<totalPages.value-1) arr.push('...')
    arr.push(totalPages.value)
    return arr
  })
</script>

<style scoped>
  .pager{display:flex;align-items:center;gap:8px}
  .pager-btn{padding:4px 8px}
  .pager-list{display:flex;gap:4px;list-style:none;margin:0;padding:0}
  .pager-page{padding:4px 8px;border:1px solid #d9d9d9;border-radius:4px;background:#fff;cursor:pointer}
  .pager-page.is-current{background:#1677ff;color:#fff;border-color:#1677ff}
  .pager-ellipsis{padding:4px 8px;color:#999}
</style>
