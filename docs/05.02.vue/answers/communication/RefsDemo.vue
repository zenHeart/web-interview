<script setup>
import { ref, onMounted } from 'vue'
import ExposeDemo from './ExposeDemo.vue'
const childRef = ref()
onMounted(() => {
  childRef.value && childRef.value.inc()
})
</script>
<template>
  <ExposeDemo ref="childRef" />
</template>
