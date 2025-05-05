<script setup>
import { defineStore, createPinia } from 'pinia'
import { getCurrentInstance } from 'vue'

// 确保 pinia 已挂载到 app
const app = getCurrentInstance()?.appContext.app
if (app && !app._context.provides.pinia) {
  app.use(createPinia())
}

const useStore = defineStore('main', {
  state: () => ({ count: 0 }),
  actions: { inc() { this.count++ } }
})
const store = useStore()
</script>
<template>
  <button @click="store.inc">Pinia +1</button>
  <div>Pinia count: {{ store.count }}</div>
</template>
