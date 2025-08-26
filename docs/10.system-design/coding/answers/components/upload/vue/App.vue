<template>
  <Upload :chunkSize="128*1024" :concurrency="3" />
</template>

<script setup lang="ts">
  import Upload from './Upload.vue'
</script>
