<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <div>
    <p>状态组件：当前计数 {{ count }}</p>
    <button @click="count++">增加</button>
  </div>
</template>
