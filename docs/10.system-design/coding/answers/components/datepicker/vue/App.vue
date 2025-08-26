<template>
  <div>
    <DatePicker v-model="value" min="2020-01-01" max="2030-12-31" />
    <div style="margin-top:8px">当前日期：{{ value || '未选择' }}</div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import DatePicker from './DatePicker.vue'
  const value = ref('')
</script>
