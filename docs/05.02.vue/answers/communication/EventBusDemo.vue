<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const bus = new EventTarget()
const msg = ref('')
function send() {
  bus.dispatchEvent(new CustomEvent('hello', { detail: 'bus数据' }))
}
function handler(e) {
  msg.value = e.detail
}
onMounted(() => {
  bus.addEventListener('hello', handler)
})
onUnmounted(() => {
  bus.removeEventListener('hello', handler)
})
</script>
<template>
  <button @click="send">发送事件</button>
  <div>收到: {{ msg }}</div>
</template>
