<script setup>
import { defineAsyncComponent } from 'vue'

const InnerAsync = defineAsyncComponent(() =>
  import('./InnerAsync.vue')
)
</script>

<template>
  <div>
    <p>异步组件外层</p>
    <InnerAsync />
  </div>
</template>
