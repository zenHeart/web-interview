<template>
   <div class="v-default-fallback">
      <h2>发生错误</h2>
      <p><strong>错误信息：</strong> {{ errorMessage }}</p>
      <p v-if="info"><strong>错误来源：</strong> {{ info }}</p>
      <pre v-if="stack">{{ stack }}</pre>
   </div>
</template>

<script setup lang="ts">
import { defineProps, computed  } from 'vue'
import type { ComponentPublicInstance } from 'vue'

export interface ErrorContext {
   err: Error | string,
   instance: ComponentPublicInstance,
   info: string
}


const props = defineProps<ErrorContext>()

const errorMessage = computed(() => {
   if (props.err instanceof Error) {
      return props.err.message
   }
   return String(props.err)
})

const stack = computed(() => {
   if (props.err instanceof Error && props.err.stack) {
      return props.err.stack
   }
   return ''
})
</script>

<style scoped>
.v-default-fallback {
   padding: 1.5em;
   background: #fff0f0;
   border: 1px solid #ffcccc;
   color: #a94442;
   border-radius: 4px;
   font-family: monospace, monospace;
}
h2 {
   margin-top: 0;
}
pre {
   background: #f8d7da;
   padding: 1em;
   border-radius: 4px;
   overflow-x: auto;
}
</style>