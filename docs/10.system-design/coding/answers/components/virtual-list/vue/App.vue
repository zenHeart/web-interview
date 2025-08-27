<template>
  <VirtualList
    :count="1000"
    :height="300"
    :estimatedItemHeight="36"
    :renderItem="i => `#${i+1} ` + '内容 '.repeat((i % 5) + 1)"
  />
</template>

<script setup lang="ts">
  import VirtualList from './VirtualList.vue'
</script>
