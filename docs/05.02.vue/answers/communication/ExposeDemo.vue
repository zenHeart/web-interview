<script setup>
import { ref, defineExpose } from 'vue'
const count = ref(0)
function inc() { count.value++ }
defineExpose({ count, inc })
</script>
<template>
  <button @click="inc">+1</button>
  <span>{{ count }}</span>
</template>
