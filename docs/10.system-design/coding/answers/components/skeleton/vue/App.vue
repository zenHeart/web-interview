<template>
  <Skeleton :loading="loading"><div>内容已加载</div></Skeleton>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import Skeleton from './Skeleton.vue'
  const loading = ref(true)
  onMounted(()=>{ setTimeout(()=> loading.value=false, 1000) })
</script>
