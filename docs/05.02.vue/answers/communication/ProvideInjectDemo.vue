<script setup>
import { provide } from 'vue'
import InjectChild from './ProvideInjectChild.vue'
provide('color', 'red')
</script>
<template>
  <InjectChild />
</template>
