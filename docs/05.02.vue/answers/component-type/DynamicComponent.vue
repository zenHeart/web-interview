<script setup>
import { ref } from 'vue'
import FunctionalComponent from './FunctionalComponent.vue'
import StatefulComponent from './StatefulComponent.vue'

const current = ref('FunctionalComponent')
const components = {
  FunctionalComponent,
  StatefulComponent
}
</script>

<template>
  <div>
    <button @click="current = 'FunctionalComponent'">显示函数组件</button>
    <button @click="current = 'StatefulComponent'">显示状态组件</button>
    <component :is="components[current]" msg="Hello Dynamic!" />
  </div>
</template>
