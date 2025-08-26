<template>
  <div>
    <Tree :data="data" :defaultExpandedKeys="['zj','hz']" v-model:selectedKey="selected" />
    <div style="margin-top:8px">选中：{{ selected || '无' }}</div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Tree from './Tree.vue'
  const data = [
    { key: 'zj', title: '浙江', children: [
      { key: 'hz', title: '杭州', children: [ { key: 'xh', title: '西湖' }, { key: 'yl', title: '余杭' } ] },
      { key: 'nb', title: '宁波' }
    ]},
    { key: 'js', title: '江苏', children: [ { key: 'nj', title: '南京' }, { key: 'sz', title: '苏州' } ] }
  ]
  const selected = ref<string | undefined>()
</script>
