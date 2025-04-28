<template>
  <div>
    <h1>生命周期钩子验证</h1>
    <button @click="toggleComponent">切换组件</button>
    <component :is="toggle ? OptionHook : CompositionComponent" />
  </div>
</template>

<script setup>
  import OptionHook from "./OptionHook.vue";
  import CompositionComponent from "./CompositionHook.vue";
  import { ref } from "vue";

  const toggle = ref(false);

  function toggleComponent() {
    toggle.value ^= 1;
  }
</script>
