<template>
  <div>
    <Cascader :options="options" v-model="value" :loadData="loadData" />
    <div style="margin-top:8px">选中路径：{{ (value||[]).join(' / ') || '未选择' }}</div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Cascader from './Cascader.vue'
  interface CascaderOption { value: string; label: string; isLeaf?: boolean; children?: CascaderOption[] }
  const options = ref<CascaderOption[]>([
    { value: 'zj', label: '浙江', children:[ { value:'hz', label:'杭州', children:[ { value:'xh', label:'西湖', isLeaf:true }, { value:'yl', label:'余杭', isLeaf:true } ] }, { value:'nb', label:'宁波', isLeaf:true } ] },
    { value: 'js', label: '江苏', isLeaf:false }
  ])
  const value = ref<string[] | undefined>()
  async function loadData (path: CascaderOption[]){
    const last = path[path.length-1]
    await new Promise(r=>setTimeout(r,300))
    if (last.value==='js') return [ { value:'nj', label:'南京', isLeaf:true }, { value:'sz', label:'苏州', isLeaf:true } ]
    return []
  }
</script>
