<template>
  <div style="display:flex;gap:8px;">
    <button @click="() => Message.info('信息提示')">Info</button>
    <button @click="() => Message.success('成功提示')">Success</button>
    <button @click="() => Message.warning('警告提示')">Warning</button>
    <button @click="() => Message.error('错误提示')">Error</button>
  </div>
</template>

<script setup lang="ts">
  import * as Message from './MessageApi.tsx'
</script>
