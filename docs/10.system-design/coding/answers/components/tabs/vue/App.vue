<template>
  <Tabs :items="items" />
</template>

<script setup lang="ts">
  import Tabs from './Tabs.vue'
  const items = [
    { key: 'a', label: '选项A', content: 'A 内容' },
    { key: 'b', label: '选项B', content: 'B 内容' },
    { key: 'c', label: '选项C', content: 'C 内容' }
  ]
</script>
