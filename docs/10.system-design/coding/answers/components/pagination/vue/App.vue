<template>
  <div>
    <Pagination :total="200" :pageSize="10" v-model="current" />
    <div style="margin-top:8px">当前页：{{ current }}</div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Pagination from './Pagination.vue'
  const current = ref(1)
</script>
