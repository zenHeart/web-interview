<template>
  <div style="height:600px;padding-top:200px">
    <Affix :offsetTop="0"><button class="affix-btn">吸顶按钮</button></Affix>
    <div style="height:1000px" />
  </div>
</template>

<script setup lang="ts">
  import Affix from './Affix.vue'
</script>
