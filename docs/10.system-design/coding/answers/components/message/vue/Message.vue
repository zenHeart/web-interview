<template>
  <div class="msg" :class="'msg-' + type" role="status" aria-live="polite">
    <span>{{ text }}</span>
    <button class="msg-close" @click="emit('close')" aria-label="关闭">×</button>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue'
  const props = withDefaults(defineProps<{ type?: 'info'|'success'|'warning'|'error'; content?: string | (()=>string); duration?: number }>(), { type: 'info', content: '', duration: 2000 })
  const emit = defineEmits<{ (e:'close'): void }>()
  const text = computed(() => typeof props.content === 'function' ? (props.content as any)() : props.content)
  onMounted(() => { const t = setTimeout(()=>emit('close'), props.duration); return ()=>clearTimeout(t) })
</script>

<style scoped>
  .msg { position: fixed; left: 50%; top: 24px; transform: translateX(-50%); background: #fff; border: 1px solid #e5e5e5; box-shadow: 0 6px 16px rgba(0,0,0,.08); padding: 8px 12px; border-radius: 6px; min-width: 160px; }
  .msg-success { border-color: #52c41a; }
  .msg-warning { border-color: #faad14; }
  .msg-error { border-color: #ff4d4f; }
  .msg-info { border-color: #1677ff; }
  .msg-close { margin-left: 12px; border: none; background: transparent; cursor: pointer; }
</style>
