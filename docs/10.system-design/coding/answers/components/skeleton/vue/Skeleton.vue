<template>
  <div v-if="loading" class="sk" aria-busy="true">
    <div class="sk-line" /><div class="sk-line" /><div class="sk-line short" />
  </div>
  <div v-else aria-busy="false"><slot /></div>
</template>

<script setup lang="ts">
  defineProps<{ loading: boolean }>()
</script>

<style scoped>
  .sk{display:flex;flex-direction:column;gap:6px}
  .sk-line{height:12px;background:linear-gradient(90deg,#f2f3f5,#e6e8eb,#f2f3f5);background-size:200% 100%;animation:shine 1.2s infinite}
  .sk-line.short{width:60%}
  @keyframes shine{0%{background-position:200% 0}100%{background-position:-200% 0}}
</style>
