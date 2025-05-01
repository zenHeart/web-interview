<script setup>
import { ref } from 'vue'
import FunctionalComponent from './FunctionalComponent.vue'
import StatefulComponent from './StatefulComponent.vue'
import DynamicComponent from './DynamicComponent.vue'
import AsyncComponent from './AsyncComponent.vue'

const showAsync = ref(false)
</script>

<template>
  <h2>1. 函数组件</h2>
  <FunctionalComponent msg="Hello from App" />

  <h2>2. 状态组件</h2>
  <StatefulComponent />

  <h2>3. 动态组件</h2>
  <DynamicComponent />

  <h2>4. 异步组件</h2>
  <button @click="showAsync = !showAsync">
    {{ showAsync ? '隐藏' : '加载' }}异步组件
  </button>
  <div v-if="showAsync">
    <AsyncComponent />
  </div>
</template>
