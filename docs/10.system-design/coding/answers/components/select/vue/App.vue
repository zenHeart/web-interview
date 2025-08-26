<template>
  <div>
    <Select :options="options" v-model="value" />
    <div style="margin-top:8px">当前值：{{ value || '未选择' }}</div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import Select from './Select.vue'
  const options = Array.from({ length: 50 }, (_, i) => ({ value: String(i+1), label: `选项 ${i+1}` }))
  const value = ref<string|undefined>()
</script>
