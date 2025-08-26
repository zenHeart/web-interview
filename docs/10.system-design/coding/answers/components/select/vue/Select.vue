<template>
  <div class="select" @keydown="onKeyDown">
    <div class="select-control" role="combobox" :aria-expanded="open" aria-haspopup="listbox" tabindex="0" @click="toggle">
      <span :class="selected ? '' : 'select-placeholder'">{{ selected ? selected.label : placeholder }}</span>
      <span class="select-arrow">▾</span>
    </div>
    <div v-if="open" class="select-dropdown">
      <input ref="inputRef" class="select-input" placeholder="搜索..." v-model="keyword" />
      <ul ref="listRef" role="listbox" class="select-list">
        <li v-if="filtered.length === 0" class="select-empty">无匹配项</li>
        <li v-for="(o,i) in filtered" :key="o.value" role="option" :aria-selected="o.value===modelValue" :class="['select-option', i===activeIndex ? 'is-active' : '', o.disabled ? 'is-disabled' : '']" @mouseenter="activeIndex=i" @click="commit(o)">{{ o.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, nextTick, onMounted, ref, watch } from 'vue'
  interface Option { value: string; label: string; disabled?: boolean }
  const props = withDefaults(defineProps<{ options: Option[]; modelValue?: string; placeholder?: string }>(), { placeholder: '请选择' })
  const emit = defineEmits<{ (e:'update:modelValue', v: string|undefined): void }>()

  const open = ref(false)
  const keyword = ref('')
  const activeIndex = ref(-1)
  const inputRef = ref<HTMLInputElement>()
  const listRef = ref<HTMLUListElement>()

  const filtered = computed(() => {
    const k = keyword.value.trim().toLowerCase()
    return k ? props.options.filter(o => o.label.toLowerCase().includes(k)) : props.options
  })
  const selected = computed(() => props.options.find(o => o.value === props.modelValue))

  watch(open, v => { if (v) nextTick(() => inputRef.value?.focus()) })
  watch(activeIndex, () => { const el = listRef.value?.children[activeIndex.value] as HTMLElement | undefined; el?.scrollIntoView({ block: 'nearest' }) })

  function toggle(){ open.value = !open.value }
  function commit(o?: Option){ if (!o || o.disabled) return; emit('update:modelValue', o.value); open.value=false; keyword.value=''; }
  function onKeyDown(e: KeyboardEvent){
    if (!open.value && (e.key==='ArrowDown' || e.key==='Enter')) { open.value = true; return }
    if (!open.value) return
    if (e.key==='Escape'){ open.value=false; return }
    if (e.key==='ArrowDown'){ e.preventDefault(); activeIndex.value = Math.min(activeIndex.value+1, filtered.value.length-1) }
    else if (e.key==='ArrowUp'){ e.preventDefault(); activeIndex.value = Math.max(activeIndex.value-1, 0) }
    else if (e.key==='Enter'){ e.preventDefault(); commit(filtered.value[activeIndex.value]) }
  }
</script>

<style scoped>
  .select{position:relative;display:inline-block;min-width:200px;font-size:14px}
  .select-control{border:1px solid #d9d9d9;border-radius:6px;padding:6px 28px 6px 10px;cursor:pointer;display:flex;justify-content:space-between;align-items:center}
  .select-placeholder{color:#999}
  .select-arrow{position:absolute;right:8px}
  .select-dropdown{position:absolute;left:0;right:0;top:100%;background:#fff;border:1px solid #d9d9d9;border-radius:6px;margin-top:4px;box-shadow:0 6px 16px rgba(0,0,0,.08);z-index:10}
  .select-input{width:100%;padding:6px 8px;border:0;border-bottom:1px solid #f0f0f0;outline:none}
  .select-list{max-height:180px;overflow:auto;margin:0;padding:4px 0;list-style:none}
  .select-option{padding:6px 10px;cursor:pointer}
  .select-option.is-active{background:#e6f4ff}
  .select-option.is-disabled{color:#aaa;cursor:not-allowed}
  .select-empty{padding:8px 10px;color:#999}
</style>
