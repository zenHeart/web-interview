<script setup>
import ScopedSlotChild from './ScopedSlotChild.vue'
</script>
<template>
  <ScopedSlotChild v-slot="{ info }">
    <div>父组件拿到: {{ info }}</div>
  </ScopedSlotChild>
</template>
