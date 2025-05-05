<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
   msg: String
})

const emit = defineEmits(['update'])

function send() {
   emit('update', '子组件数据')
}
</script>

<template>
   <div>
      <div>子组件收到: {{ props.msg }}</div>
      <button @click="send">发送数据给父组件</button>
   </div>
</template>
