<script setup>
const info = '来自子组件的数据'
</script>

<template>
  <slot :info="info"></slot>
</template>
