<template>
  <VirtualList :count="1000" :itemHeight="30" :height="300" :renderItem="i => `行 ${i+1}`" />
</template>

<script setup lang="ts">
  import VirtualList from './VirtualList.vue'
</script>
