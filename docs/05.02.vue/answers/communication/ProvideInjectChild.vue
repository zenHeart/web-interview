<script setup>
import { inject } from 'vue'
const color = inject('color')
</script>
<template>
  <div>注入的 color: {{ color }}</div>
</template>
