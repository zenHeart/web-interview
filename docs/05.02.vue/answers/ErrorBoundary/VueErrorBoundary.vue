<script setup lang="ts">
  import { ref, onErrorCaptured } from "vue";
  import DefaultFallback from "./VDefaultFallback.vue";
  import type { ErrorContext } from "./VDefaultFallback.vue";

  const errorCtx = ref<ErrorContext | null>(null);

  onErrorCaptured((error: Error, vm, info: string) => {
    errorCtx.value = {
      err: error,
      instance: vm,
      info,
    };
    return false;
  });
</script>

<template>
  <slot />
  <slot name="error" v-if="errorCtx" v-bind="errorCtx">
    <DefaultFallback v-bind="errorCtx" />
  </slot>
</template>
