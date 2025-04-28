<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>

  import {
    ref,
    onBeforeMount,
    onMounted,
    onBeforeUpdate,
    onUpdated,
    onBeforeUnmount,
    onUnmounted,
  } from "vue";
  console.group("composition API");

  const message = ref("Hello, Vue!");

  onBeforeMount(() => {
    console.log("onBeforeMount: DOM 尚未挂载");
  });

  onMounted(() => {
    console.log("onMounted: DOM 已挂载");
  });

  onBeforeUpdate(() => {
    console.log("onBeforeUpdate: 数据更新，DOM 尚未更新");
  });

  onUpdated(() => {
    console.log("onUpdated: 数据更新，DOM 已更新");
  });

  onBeforeUnmount(() => {
    console.log("onBeforeUnmount: 组件即将卸载");
  });

  onUnmounted(() => {
    console.log("onUnmounted: 组件已卸载");
    console.groupEnd("composition API");
  });
</script>
