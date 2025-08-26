<template>
  <div class="cascader">
    <div class="cascader-trigger" role="combobox" :aria-expanded="open" @click="open=!open">
      <span :class="displayText ? '' : 'cascader-placeholder'">{{ displayText || placeholder }}</span>
      <span class="cascader-arrow">▾</span>
    </div>
    <div v-if="open" class="cascader-panel" role="tree">
      <ul v-for="(opts, level) in columns" :key="level" class="cascader-col" role="group">
        <li v-if="opts.length===0" class="cascader-empty">暂无数据</li>
        <li v-for="o in opts" :key="o.value" :class="['cascader-option', activePath[level]?.value===o.value?'is-active':'', o.disabled?'is-disabled':'']" @click="onSelect(level, o)">
          <span>{{ o.label }}</span>
          <span v-if="!o.isLeaf" class="cascader-next">›</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref, watch } from 'vue'
  interface CascaderOption { value: string; label: string; isLeaf?: boolean; children?: CascaderOption[]; disabled?: boolean }
  const props = withDefaults(defineProps<{ options: CascaderOption[]; modelValue?: string[]; placeholder?: string; loadData?: (path: CascaderOption[]) => Promise<CascaderOption[]> }>(), { placeholder:'请选择' })
  const emit = defineEmits<{ (e:'update:modelValue', v:string[]|undefined, opts:CascaderOption[]):void }>()

  const open = ref(false)
  const activePath = ref<CascaderOption[]>([])

  const columns = computed(() => {
    const cols: CascaderOption[][] = []
    cols.push(props.options)
    for (const opt of activePath.value) cols.push(opt.children || [])
    return cols
  })

  const displayText = computed(() => {
    if (props.modelValue?.length){
      const labels: string[] = []
      let level = props.options
      for (const v of props.modelValue){
        const found = level?.find(o=>o.value===v); if (!found) break
        labels.push(found.label); level = found.children
      }
      return labels.join(' / ')
    }
    return ''
  })

  async function onSelect (levelIndex: number, opt: CascaderOption){
    if (opt.disabled) return
    const nextPath = activePath.value.slice(0, levelIndex)
    nextPath[levelIndex] = opt
    if (!opt.isLeaf && (!opt.children || opt.children.length===0) && props.loadData){
      const children = await props.loadData(nextPath)
      opt.children = children
    }
    activePath.value = nextPath
    if (opt.isLeaf || !opt.children || opt.children.length===0){
      emit('update:modelValue', nextPath.map(o=>o.value), nextPath)
      open.value=false
    }
  }
</script>

<style scoped>
  .cascader{position:relative;display:inline-block;min-width:240px;font-size:14px}
  .cascader-trigger{border:1px solid #d9d9d9;border-radius:6px;padding:6px 28px 6px 10px;cursor:pointer;display:flex;justify-content:space-between;align-items:center}
  .cascader-placeholder{color:#999}
  .cascader-arrow{position:absolute;right:8px}
  .cascader-panel{position:absolute;left:0;top:100%;display:flex;background:#fff;border:1px solid #d9d9d9;border-radius:6px;margin-top:4px;box-shadow:0 6px 16px rgba(0,0,0,.08);z-index:10}
  .cascader-col{width:180px;max-height:220px;overflow:auto;margin:0;padding:4px 0;list-style:none;border-right:1px solid #f0f0f0}
  .cascader-col:last-child{border-right:0}
  .cascader-option{padding:6px 10px;cursor:pointer;display:flex;justify-content:space-between;align-items:center}
  .cascader-option.is-active{background:#e6f4ff}
  .cascader-option.is-disabled{color:#aaa;cursor:not-allowed}
  .cascader-empty{padding:8px 10px;color:#999}
</style>
