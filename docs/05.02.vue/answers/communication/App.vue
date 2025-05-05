<script setup>
import PropsEmitDemo from './PropsEmitDemo.vue'
import AttrsDemo from './AttrsDemo.vue'
import ProvideInjectDemo from './ProvideInjectDemo.vue'
import ScopedSlotDemo from './ScopedSlotDemo.vue'
import ExposeDemo from './ExposeDemo.vue'
import RefsDemo from './RefsDemo.vue'
import EventBusDemo from './EventBusDemo.vue'

import { ref } from 'vue'
const emitMsg = ref('')
function handleEmit(val) {
  emitMsg.value = val
}
</script>

<template>
  <h2>父子通信（props / emit）</h2>
  <PropsEmitDemo msg="父传子数据" @update="handleEmit" />

  <h2>父子通信（$attrs）</h2>
  <AttrsDemo style="color:red" title="父组件 title" />

  <h2>跨层级通信（provide/inject）</h2>
  <ProvideInjectDemo />

  <h2>插槽通信（scoped slot）</h2>
  <ScopedSlotDemo />

  <h2>实例通信（expose/$refs）</h2>
  <ExposeDemo />
  <RefsDemo />

  <h2>全局事件通信（EventBus）</h2>
  <EventBusDemo />
</template>
