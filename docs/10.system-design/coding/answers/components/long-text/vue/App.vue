<template>
  <LongText :text="text" />
</template>

<script setup lang="ts">
  import LongText from './LongText.vue'
  const text = '这是一段可能很长的文本，初始显示收起，点击展开查看更多内容。'.repeat(10)
</script>
