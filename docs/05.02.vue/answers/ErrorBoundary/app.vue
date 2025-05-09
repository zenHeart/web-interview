<script setup lang="ts">
  import { ref } from "vue";
  import VueErrorBoundary from "./VueErrorBoundary.vue";

  // 用于模拟渲染异常的组件
  const shouldThrow = ref(false);

  const triggerError = () => {
    shouldThrow.value = true;
  };
</script>

<template>
  <h2>VueErrorBoundary 使用示例</h2>
  <button @click="triggerError">点击触发渲染异常</button>
  <h2>默认异常组件</h2>
  <VueErrorBoundary>
    <DemoComponent v-if="!shouldThrow" />
    <ErrorComponent v-else />
  </VueErrorBoundary>
  <h2>自定义异常组件</h2>
  <VueErrorBoundary>
    <DemoComponent v-if="!shouldThrow" />
    <ErrorComponent v-else />
    <template #error="errorCtx">
      <div class="v-default-fallback">
        <h2>发生错误</h2>
        <p><strong>错误信息：</strong> {{ errorCtx }}</p>
      </div>
    </template>
  </VueErrorBoundary>
</template>

<script lang="ts">
  // 模拟正常组件
  const DemoComponent = {
    template: `<div>这是一个正常渲染的组件。</div>`,
  };

  // 模拟抛出异常的组件
  const ErrorComponent = {
    setup() {
      throw new Error("模拟渲染异常！");
    },
    template: `<div>你看不到我</div>`,
  };
</script>
