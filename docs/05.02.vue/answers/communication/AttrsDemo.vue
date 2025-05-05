<script setup>
import { useAttrs } from 'vue'
const attrs = useAttrs()
</script>
<template>
  <div v-bind="attrs">通过 $attrs 继承属性</div>
</template>
