<template>
  <div>
    <div class="lt" :style="{ maxHeight: open? 'none' : collapsedHeight + 'px' }">{{ text }}</div>
    <button class="lt-btn" @click="open=!open">{{ open ? '收起' : '展开' }}</button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const props = withDefaults(defineProps<{ text:string; collapsedHeight?: number }>(), { collapsedHeight: 60 })
  const open = ref(false)
  const collapsedHeight = props.collapsedHeight
  const text = props.text
</script>

<style scoped>
  .lt{overflow:hidden;line-height:20px;padding-right:20px;transition:max-height .2s ease}
  .lt-btn{margin-top:6px}
</style>
