<template>
  <button @click="open">API 弹窗</button>
</template>

<script setup lang="ts">
  import * as ModalApi from "./ModalApi.tsx";
  import { h } from "vue";

  function open() {
    const modal = ModalApi.open({
      title: () => h("h1", "标题"),
      content: () => h("p", "内容"),
      onClose: () => console.log("Modal closed"),
      onConfirm: () => console.log("Modal confirmed"),
      onCancel: () => console.log("Modal canceled"),
    });
  }
</script>
